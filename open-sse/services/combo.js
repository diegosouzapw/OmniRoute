/**
 * Shared combo (model combo) handling with fallback support
 * Supports: priority, weighted, round-robin, random, least-used, and cost-optimized strategies
 */

import { checkFallbackError, formatRetryAfter, getProviderProfile } from "./accountFallback.js";
import { unavailableResponse } from "../utils/error.js";
import { recordComboRequest, getComboMetrics } from "./comboMetrics.js";
import { resolveComboConfig, getDefaultComboConfig } from "./comboConfig.js";
import * as semaphore from "./rateLimitSemaphore.js";
import { getCircuitBreaker } from "../../src/shared/utils/circuitBreaker.js";
import { parseModel } from "./model.js";

// Status codes that should mark semaphore + record circuit breaker failures
const TRANSIENT_FOR_BREAKER = [429, 502, 503, 504];

const MAX_COMBO_DEPTH = 3;

// In-memory atomic counter per combo for round-robin distribution
// Resets on server restart (by design — no stale state)
const rrCounters = new Map();

/**
 * Normalize a model entry to { model, weight }
 * Supports both legacy string format and new object format
 */
function normalizeModelEntry(entry) {
  if (typeof entry === "string") return { model: entry, weight: 0 };
  return { model: entry.model, weight: entry.weight || 0 };
}

/**
 * Get combo models from combos data (for open-sse standalone use)
 * @param {string} modelStr - Model string to check
 * @param {Array|Object} combosData - Array of combos or object with combos
 * @returns {Object|null} Full combo object or null if not a combo
 */
export function getComboFromData(modelStr, combosData) {
  const combos = Array.isArray(combosData) ? combosData : combosData?.combos || [];
  const combo = combos.find((c) => c.name === modelStr);
  if (combo && combo.models && combo.models.length > 0) {
    return combo;
  }
  return null;
}

/**
 * Legacy: Get combo models as string array (backward compat)
 */
export function getComboModelsFromData(modelStr, combosData) {
  const combo = getComboFromData(modelStr, combosData);
  if (!combo) return null;
  return combo.models.map((m) => normalizeModelEntry(m).model);
}

/**
 * Validate combo DAG — detect circular references and enforce max depth
 * @param {string} comboName - Name of the combo to validate
 * @param {Array} allCombos - All combos in the system
 * @param {Set} [visited] - Set of already visited combo names (for cycle detection)
 * @param {number} [depth] - Current depth level
 * @throws {Error} If circular reference or max depth exceeded
 */
export function validateComboDAG(comboName, allCombos, visited = new Set(), depth = 0) {
  if (depth > MAX_COMBO_DEPTH) {
    throw new Error(`Max combo nesting depth (${MAX_COMBO_DEPTH}) exceeded at "${comboName}"`);
  }
  if (visited.has(comboName)) {
    throw new Error(`Circular combo reference detected: ${comboName}`);
  }
  visited.add(comboName);

  const combos = Array.isArray(allCombos) ? allCombos : allCombos?.combos || [];
  const combo = combos.find((c) => c.name === comboName);
  if (!combo || !combo.models) return;

  for (const entry of combo.models) {
    const modelName = normalizeModelEntry(entry).model;
    // Check if this model name is itself a combo (not a provider/model pattern)
    const nestedCombo = combos.find((c) => c.name === modelName);
    if (nestedCombo) {
      validateComboDAG(modelName, combos, new Set(visited), depth + 1);
    }
  }
}

/**
 * Resolve nested combos by expanding inline to a flat model list
 * Respects max depth and detects cycles
 * @param {Object} combo - The combo object
 * @param {Array} allCombos - All combos in the system
 * @param {Set} [visited] - For cycle detection
 * @param {number} [depth] - Current depth
 * @returns {Array} Flat array of model strings
 */
export function resolveNestedComboModels(combo, allCombos, visited = new Set(), depth = 0) {
  if (depth > MAX_COMBO_DEPTH) return combo.models.map((m) => normalizeModelEntry(m).model);
  if (visited.has(combo.name)) return []; // cycle safety
  visited.add(combo.name);

  const combos = Array.isArray(allCombos) ? allCombos : allCombos?.combos || [];
  const resolved = [];

  for (const entry of combo.models || []) {
    const modelName = normalizeModelEntry(entry).model;
    const nestedCombo = combos.find((c) => c.name === modelName);

    if (nestedCombo) {
      // Recursively expand the nested combo
      const nested = resolveNestedComboModels(nestedCombo, combos, new Set(visited), depth + 1);
      resolved.push(...nested);
    } else {
      resolved.push(modelName);
    }
  }

  return resolved;
}

/**
 * Select a model using weighted random distribution
 * @param {Array} models - Array of { model, weight } entries
 * @returns {string} Selected model string
 */
function selectWeightedModel(models) {
  const entries = models.map((m) => normalizeModelEntry(m));
  const totalWeight = entries.reduce((sum, m) => sum + m.weight, 0);

  if (totalWeight <= 0) {
    // All weights are 0 → uniform random
    return entries[Math.floor(Math.random() * entries.length)].model;
  }

  let random = Math.random() * totalWeight;
  for (const entry of entries) {
    random -= entry.weight;
    if (random <= 0) return entry.model;
  }
  return entries[entries.length - 1].model; // safety fallback
}

/**
 * Order models for weighted fallback (selected first, then by descending weight)
 */
function orderModelsForWeightedFallback(models, selectedModel) {
  const entries = models.map((m) => normalizeModelEntry(m));
  const selected = entries.find((e) => e.model === selectedModel);
  const rest = entries.filter((e) => e.model !== selectedModel).sort((a, b) => b.weight - a.weight); // highest weight first for fallback

  return [selected, ...rest].filter(Boolean).map((e) => e.model);
}

/**
 * Fisher-Yates shuffle (in-place)
 * @param {Array} arr
 * @returns {Array} The shuffled array
 */
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Sort models by pricing (cheapest first) for cost-optimized strategy
 * @param {Array<string>} models - Model strings in "provider/model" format
 * @returns {Promise<Array<string>>} Sorted model strings
 */
async function sortModelsByCost(models) {
  try {
    const { getPricingForModel } = await import("../../src/lib/localDb.js");
    const withCost = await Promise.all(
      models.map(async (modelStr) => {
        const parsed = parseModel(modelStr);
        const provider = parsed.provider || parsed.providerAlias || "unknown";
        const model = parsed.model || modelStr;
        try {
          const pricing = await getPricingForModel(provider, model);
          return { modelStr, cost: pricing?.input ?? Infinity };
        } catch {
          return { modelStr, cost: Infinity };
        }
      })
    );
    withCost.sort((a, b) => a.cost - b.cost);
    return withCost.map((e) => e.modelStr);
  } catch {
    // If pricing lookup fails entirely, return original order
    return models;
  }
}

/**
 * Sort models by usage count (least-used first) for least-used strategy
 * @param {Array<string>} models - Model strings
 * @param {string} comboName - Combo name for metrics lookup
 * @returns {Array<string>} Sorted model strings
 */
function sortModelsByUsage(models, comboName) {
  const metrics = getComboMetrics(comboName);
  if (!metrics || !metrics.byModel) return models;

  const withUsage = models.map((modelStr) => ({
    modelStr,
    requests: metrics.byModel[modelStr]?.requests ?? 0,
  }));
  withUsage.sort((a, b) => a.requests - b.requests);
  return withUsage.map((e) => e.modelStr);
}

/**
 * Handle combo chat with fallback
 * Supports all 6 strategies: priority, weighted, round-robin, random, least-used, cost-optimized
 * @param {Object} options
 * @param {Object} options.body - Request body
 * @param {Object} options.combo - Full combo object { name, models, strategy, config }
 * @param {Function} options.handleSingleModel - Function: (body, modelStr) => Promise<Response>
 * @param {Function} [options.isModelAvailable] - Optional pre-check: (modelStr) => Promise<boolean>
 * @param {Object} options.log - Logger object
 * @returns {Promise<Response>}
 */
export async function handleComboChat({
  body,
  combo,
  handleSingleModel,
  isModelAvailable,
  log,
  settings,
  allCombos,
}) {
  const strategy = combo.strategy || "priority";
  const models = combo.models || [];

  // Route to round-robin handler if strategy matches
  if (strategy === "round-robin") {
    return handleRoundRobinCombo({
      body,
      combo,
      handleSingleModel,
      isModelAvailable,
      log,
      settings,
      allCombos,
    });
  }

  // Use config cascade if settings provided
  const config = settings
    ? resolveComboConfig(combo, settings)
    : { ...getDefaultComboConfig(), ...(combo.config || {}) };
  const maxRetries = config.maxRetries ?? 1;
  const retryDelayMs = config.retryDelayMs ?? 2000;

  let orderedModels;

  // Resolve nested combos if allCombos provided
  if (allCombos) {
    const flatModels = resolveNestedComboModels(combo, allCombos);
    if (strategy === "weighted") {
      // For weighted + nested, select from original models then fallback sequentially
      const selected = selectWeightedModel(models);
      orderedModels = orderModelsForWeightedFallback(models, selected);
      // But if any were nested, they are already resolved to flat
      orderedModels = orderedModels.flatMap((m) => {
        const combos = Array.isArray(allCombos) ? allCombos : allCombos?.combos || [];
        const nested = combos.find((c) => c.name === m);
        if (nested) return resolveNestedComboModels(nested, allCombos);
        return [m];
      });
      log.info(
        "COMBO",
        `Weighted selection with nested resolution: ${orderedModels.length} total models`
      );
    } else {
      orderedModels = flatModels;
      log.info("COMBO", `${strategy} with nested resolution: ${orderedModels.length} total models`);
    }
  } else if (strategy === "weighted") {
    const selected = selectWeightedModel(models);
    orderedModels = orderModelsForWeightedFallback(models, selected);
    log.info("COMBO", `Weighted selection: ${selected} (from ${models.length} models)`);
  } else {
    orderedModels = models.map((m) => normalizeModelEntry(m).model);
  }

  // Apply strategy-specific ordering
  if (strategy === "random") {
    orderedModels = shuffleArray([...orderedModels]);
    log.info("COMBO", `Random shuffle: ${orderedModels.length} models`);
  } else if (strategy === "least-used") {
    orderedModels = sortModelsByUsage(orderedModels, combo.name);
    log.info("COMBO", `Least-used ordering: ${orderedModels[0]} has fewest requests`);
  } else if (strategy === "cost-optimized") {
    orderedModels = await sortModelsByCost(orderedModels);
    log.info("COMBO", `Cost-optimized ordering: cheapest first (${orderedModels[0]})`);
  }

  let lastError = null;
  let earliestRetryAfter = null;
  let lastStatus = null;
  const startTime = Date.now();
  let resolvedByModel = null;
  let fallbackCount = 0;

  for (let i = 0; i < orderedModels.length; i++) {
    const modelStr = orderedModels[i];
    const parsed = parseModel(modelStr);
    const provider = parsed.provider || parsed.providerAlias || "unknown";
    const profile = getProviderProfile(provider);
    const breaker = getCircuitBreaker(`combo:${provider}`, {
      failureThreshold: profile.circuitBreakerThreshold,
      resetTimeout: profile.circuitBreakerReset,
    });

    // Skip model if circuit breaker is OPEN
    if (!breaker.canExecute()) {
      log.info("COMBO", `Skipping ${modelStr}: circuit breaker OPEN for ${provider}`);
      if (i > 0) fallbackCount++;
      continue;
    }

    // Pre-check: skip models where all accounts are in cooldown
    if (isModelAvailable) {
      const available = await isModelAvailable(modelStr);
      if (!available) {
        log.info("COMBO", `Skipping ${modelStr} (all accounts in cooldown)`);
        if (i > 0) fallbackCount++;
        continue;
      }
    }

    // Retry loop for transient errors
    for (let retry = 0; retry <= maxRetries; retry++) {
      if (retry > 0) {
        log.info(
          "COMBO",
          `Retrying ${modelStr} in ${retryDelayMs}ms (attempt ${retry + 1}/${maxRetries + 1})`
        );
        await new Promise((r) => setTimeout(r, retryDelayMs));
      }

      log.info(
        "COMBO",
        `Trying model ${i + 1}/${orderedModels.length}: ${modelStr}${retry > 0 ? ` (retry ${retry})` : ""}`
      );

      const result = await handleSingleModel(body, modelStr);

      // Success — return response
      if (result.ok) {
        resolvedByModel = modelStr;
        const latencyMs = Date.now() - startTime;
        log.info(
          "COMBO",
          `Model ${modelStr} succeeded (${latencyMs}ms, ${fallbackCount} fallbacks)`
        );
        recordComboRequest(combo.name, modelStr, {
          success: true,
          latencyMs,
          fallbackCount,
          strategy,
        });
        return result;
      }

      // Extract error info from response
      let errorText = result.statusText || "";
      let retryAfter = null;
      try {
        const cloned = result.clone();
        try {
          const errorBody = await cloned.json();
          errorText =
            errorBody?.error?.message || errorBody?.error || errorBody?.message || errorText;
          retryAfter = errorBody?.retryAfter || null;
        } catch {
          try {
            const text = await result.text();
            if (text) errorText = text.substring(0, 500);
          } catch {
            /* Body consumed */
          }
        }
      } catch {
        /* Clone failed */
      }

      // Track earliest retryAfter
      if (
        retryAfter &&
        (!earliestRetryAfter || new Date(retryAfter) < new Date(earliestRetryAfter))
      ) {
        earliestRetryAfter = retryAfter;
      }

      // Normalize error text
      if (typeof errorText !== "string") {
        try {
          errorText = JSON.stringify(errorText);
        } catch {
          errorText = String(errorText);
        }
      }

      const { shouldFallback, cooldownMs } = checkFallbackError(
        result.status,
        errorText,
        0,
        null,
        provider
      );

      // Record failure in circuit breaker for transient errors
      if (TRANSIENT_FOR_BREAKER.includes(result.status)) {
        breaker._onFailure();
      }

      if (!shouldFallback) {
        log.warn("COMBO", `Model ${modelStr} failed (no fallback)`, { status: result.status });
        return result;
      }

      // Check if this is a transient error worth retrying on same model
      const isTransient = [408, 429, 500, 502, 503, 504].includes(result.status);
      if (retry < maxRetries && isTransient) {
        continue; // Retry same model
      }

      // Done retrying this model
      lastError = errorText || String(result.status);
      if (!lastStatus) lastStatus = result.status;
      if (i > 0) fallbackCount++;
      log.warn("COMBO", `Model ${modelStr} failed, trying next`, { status: result.status });
      break; // Move to next model
    }
  }

  // Early exit: check if all models have breaker OPEN
  const allBreakersOpen = orderedModels.every((m) => {
    const p = parseModel(m).provider || parseModel(m).providerAlias || "unknown";
    return !getCircuitBreaker(`combo:${p}`).canExecute();
  });

  // All models failed
  const latencyMs = Date.now() - startTime;
  recordComboRequest(combo.name, null, { success: false, latencyMs, fallbackCount, strategy });

  if (allBreakersOpen) {
    log.warn("COMBO", "All models have circuit breaker OPEN — aborting");
    return unavailableResponse(
      503,
      "All providers temporarily unavailable (circuit breakers open)"
    );
  }

  const status = lastStatus || 406;
  const msg = lastError || "All combo models unavailable";

  if (earliestRetryAfter) {
    const retryHuman = formatRetryAfter(earliestRetryAfter);
    log.warn("COMBO", `All models failed | ${msg} (${retryHuman})`);
    return unavailableResponse(status, msg, earliestRetryAfter, retryHuman);
  }

  log.warn("COMBO", `All models failed | ${msg}`);
  return new Response(JSON.stringify({ error: { message: msg } }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Handle round-robin combo: each request goes to the next model in circular order.
 * Uses semaphore-based concurrency control with queue + rate-limit awareness.
 *
 * Flow:
 * 1. Pick target model via atomic counter (counter % models.length)
 * 2. Acquire semaphore slot (may queue if at max concurrency)
 * 3. Send request to target model
 * 4. On 429 → mark model rate-limited, try next model in rotation
 * 5. On semaphore timeout → fallback to next available model
 */
async function handleRoundRobinCombo({
  body,
  combo,
  handleSingleModel,
  isModelAvailable,
  log,
  settings,
  allCombos,
}) {
  const models = combo.models || [];
  const config = settings
    ? resolveComboConfig(combo, settings)
    : { ...getDefaultComboConfig(), ...(combo.config || {}) };
  const concurrency = config.concurrencyPerModel ?? 3;
  const queueTimeout = config.queueTimeoutMs ?? 30000;
  const maxRetries = config.maxRetries ?? 1;
  const retryDelayMs = config.retryDelayMs ?? 2000;

  // Resolve models (support nested combos)
  let orderedModels;
  if (allCombos) {
    orderedModels = resolveNestedComboModels(combo, allCombos);
  } else {
    orderedModels = models.map((m) => normalizeModelEntry(m).model);
  }

  const modelCount = orderedModels.length;
  if (modelCount === 0) {
    return unavailableResponse(406, "Round-robin combo has no models");
  }

  // Get and increment atomic counter
  const counter = rrCounters.get(combo.name) || 0;
  rrCounters.set(combo.name, counter + 1);
  const startIndex = counter % modelCount;

  const startTime = Date.now();
  let lastError = null;
  let lastStatus = null;
  let earliestRetryAfter = null;
  let fallbackCount = 0;

  // Try each model starting from the round-robin target
  for (let offset = 0; offset < modelCount; offset++) {
    const modelIndex = (startIndex + offset) % modelCount;
    const modelStr = orderedModels[modelIndex];
    const parsed = parseModel(modelStr);
    const provider = parsed.provider || parsed.providerAlias || "unknown";
    const profile = getProviderProfile(provider);
    const breaker = getCircuitBreaker(`combo:${provider}`, {
      failureThreshold: profile.circuitBreakerThreshold,
      resetTimeout: profile.circuitBreakerReset,
    });

    // Skip model if circuit breaker is OPEN
    if (!breaker.canExecute()) {
      log.info("COMBO-RR", `Skipping ${modelStr}: circuit breaker OPEN for ${provider}`);
      if (offset > 0) fallbackCount++;
      continue;
    }

    // Pre-check availability
    if (isModelAvailable) {
      const available = await isModelAvailable(modelStr);
      if (!available) {
        log.info("COMBO-RR", `Skipping ${modelStr} (all accounts in cooldown)`);
        if (offset > 0) fallbackCount++;
        continue;
      }
    }

    // Acquire semaphore slot (may wait in queue)
    let release;
    try {
      release = await semaphore.acquire(modelStr, {
        maxConcurrency: concurrency,
        timeoutMs: queueTimeout,
      });
    } catch (err) {
      if (err.code === "SEMAPHORE_TIMEOUT") {
        log.warn("COMBO-RR", `Semaphore timeout for ${modelStr}, trying next model`);
        if (offset > 0) fallbackCount++;
        continue;
      }
      throw err;
    }

    // Retry loop within this model
    try {
      for (let retry = 0; retry <= maxRetries; retry++) {
        if (retry > 0) {
          log.info(
            "COMBO-RR",
            `Retrying ${modelStr} in ${retryDelayMs}ms (attempt ${retry + 1}/${maxRetries + 1})`
          );
          await new Promise((r) => setTimeout(r, retryDelayMs));
        }

        log.info(
          "COMBO-RR",
          `[RR #${counter}] → ${modelStr}${offset > 0 ? ` (fallback +${offset})` : ""}${retry > 0 ? ` (retry ${retry})` : ""}`
        );

        const result = await handleSingleModel(body, modelStr);

        // Success
        if (result.ok) {
          const latencyMs = Date.now() - startTime;
          log.info(
            "COMBO-RR",
            `${modelStr} succeeded (${latencyMs}ms, ${fallbackCount} fallbacks)`
          );
          recordComboRequest(combo.name, modelStr, {
            success: true,
            latencyMs,
            fallbackCount,
            strategy: "round-robin",
          });
          return result;
        }

        // Extract error info
        let errorText = result.statusText || "";
        let retryAfter = null;
        try {
          const cloned = result.clone();
          try {
            const errorBody = await cloned.json();
            errorText =
              errorBody?.error?.message || errorBody?.error || errorBody?.message || errorText;
            retryAfter = errorBody?.retryAfter || null;
          } catch {
            try {
              const text = await result.text();
              if (text) errorText = text.substring(0, 500);
            } catch {
              /* Body consumed */
            }
          }
        } catch {
          /* Clone failed */
        }

        if (
          retryAfter &&
          (!earliestRetryAfter || new Date(retryAfter) < new Date(earliestRetryAfter))
        ) {
          earliestRetryAfter = retryAfter;
        }

        if (typeof errorText !== "string") {
          try {
            errorText = JSON.stringify(errorText);
          } catch {
            errorText = String(errorText);
          }
        }

        const { shouldFallback, cooldownMs } = checkFallbackError(
          result.status,
          errorText,
          0,
          null,
          provider
        );

        // Transient errors → mark in semaphore AND record circuit breaker failure
        if (TRANSIENT_FOR_BREAKER.includes(result.status) && cooldownMs > 0) {
          semaphore.markRateLimited(modelStr, cooldownMs);
          breaker._onFailure();
          log.warn(
            "COMBO-RR",
            `${modelStr} error ${result.status}, cooldown ${cooldownMs}ms (breaker: ${breaker.getStatus().failureCount}/${profile.circuitBreakerThreshold})`
          );
        }

        if (!shouldFallback) {
          log.warn("COMBO-RR", `${modelStr} failed (no fallback)`, { status: result.status });
          return result;
        }

        // Transient error → retry same model
        const isTransient = [408, 429, 500, 502, 503, 504].includes(result.status);
        if (retry < maxRetries && isTransient) {
          continue;
        }

        // Done with this model
        lastError = errorText || String(result.status);
        if (!lastStatus) lastStatus = result.status;
        if (offset > 0) fallbackCount++;
        log.warn("COMBO-RR", `${modelStr} failed, trying next model`, { status: result.status });
        break;
      }
    } finally {
      // ALWAYS release semaphore slot
      release();
    }
  }

  // All models exhausted
  const latencyMs = Date.now() - startTime;
  recordComboRequest(combo.name, null, {
    success: false,
    latencyMs,
    fallbackCount,
    strategy: "round-robin",
  });

  // Early exit: check if all models have breaker OPEN
  const allBreakersOpen = orderedModels.every((m) => {
    const p = parseModel(m).provider || parseModel(m).providerAlias || "unknown";
    return !getCircuitBreaker(`combo:${p}`).canExecute();
  });

  if (allBreakersOpen) {
    log.warn("COMBO-RR", "All models have circuit breaker OPEN — aborting");
    return unavailableResponse(
      503,
      "All providers temporarily unavailable (circuit breakers open)"
    );
  }

  const status = lastStatus || 406;
  const msg = lastError || "All round-robin combo models unavailable";

  if (earliestRetryAfter) {
    const retryHuman = formatRetryAfter(earliestRetryAfter);
    log.warn("COMBO-RR", `All models failed | ${msg} (${retryHuman})`);
    return unavailableResponse(status, msg, earliestRetryAfter, retryHuman);
  }

  log.warn("COMBO-RR", `All models failed | ${msg}`);
  return new Response(JSON.stringify({ error: { message: msg } }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
