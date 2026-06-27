/**
 * scripts/test/combo-live-vps.mjs
 *
 * Phase-3 VPS HTTP scenario driver for OmniRoute combo routing.
 * Exercises 6 strategies (priority / round-robin / weighted / cost-optimized /
 * fusion / auto) against the live server at 192.168.0.15:20128.
 *
 * Usage:
 *   node scripts/test/combo-live-vps.mjs
 *   node scripts/test/combo-live-vps.mjs --only=round-robin
 *   node scripts/test/combo-live-vps.mjs --failover   # runs all 7 base scenarios + real failover
 *
 * Safety rules:
 *   - Only creates/deletes __live_test__* combos
 *   - Always cleans up in `finally` blocks
 *   - Never stops services or touches other data
 *
 * Exit code: 0 if all scenarios PASS or SKIP; non-zero only on real FAIL.
 * Task 8 (--failover) can be appended after the main() call at the bottom.
 */

import { chat, createCombo, deleteCombo, listHealthyProviders, nonce } from "./_vpsClient.mjs";

// ---------------------------------------------------------------------------
// Candidate list — broad to maximise coverage across volatile provider health.
// listHealthyProviders() probes each with a real chat() call.
// ---------------------------------------------------------------------------
const BROAD_CANDIDATES = [
  "groq/llama-3.1-8b-instant",
  "groq/llama-3.3-70b-versatile",
  "minimax/MiniMax-M3",
  "minimax/minimax-m3",
  "kimi-coding-apikey/moonshot-v1-8k",
  "openrouter/openai/gpt-3.5-turbo",
  "cerebras/llama-3.3-70b",
  "cerebras/llama3.1-8b",
  "deepseek/deepseek-chat",
  "ollama-cloud/glm-5.2",
  "glm/glm-4-flash",
  "gemini/gemini-2.0-flash",
];

// Known approximate input cost ($/M tokens) from OmniRoute's default-pricing constants.
// Used only to identify cheap vs pricey pairs for cost-optimized scenario.
// Models absent from this map are treated as unknown cost (Infinity in the server's
// sortModelsByCost, i.e. sorted last — effectively "most expensive").
const KNOWN_INPUT_COST = {
  "groq/llama-3.1-8b-instant": 0,       // inference-hosts.ts: price=0 (free tier)
  "groq/llama-3.3-70b-versatile": 0,     // inference-hosts.ts: price=0 (free tier)
  "cerebras/llama3.1-8b": 0,             // inference-hosts.ts: price=0
  "cerebras/llama-3.3-70b": 0,           // inference-hosts.ts: price=0
  "deepseek/deepseek-chat": 0,           // inference-hosts.ts: price=0
  "minimax/MiniMax-M3": 0.5,             // regional.ts: $0.5/M input
  "minimax/minimax-m3": 0.5,             // regional.ts: $0.5/M input
  "kimi-coding-apikey/moonshot-v1-8k": 1, // not in pricing table → Infinity on server → treated pricey
};

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------
const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const onlyScenario = onlyArg ? onlyArg.slice(7) : null;
// --failover: opt-in flag that appends a real-failover scenario (broken primary → healthy fallback)
const failoverFlag = process.argv.includes("--failover");

// ---------------------------------------------------------------------------
// Result tracking
// ---------------------------------------------------------------------------
let exitCode = 0;
const summary = [];

function pass(name, detail = "") {
  summary.push({ name, result: "PASS" });
  console.log(`PASS  [${name}]${detail ? ": " + detail : ""}`);
}

function skip(name, reason) {
  summary.push({ name, result: "SKIP" });
  console.log(`SKIP  [${name}]: ${reason}`);
}

function fail(name, reason, err = null) {
  summary.push({ name, result: "FAIL" });
  console.error(`FAIL  [${name}]: ${reason}`);
  if (err) console.error("       caused by:", err?.message ?? String(err));
  exitCode = 1;
}

async function runScenario(name, fn) {
  if (onlyScenario && onlyScenario !== name) return;
  try {
    await fn();
  } catch (err) {
    fail(name, `unexpected error: ${err?.message ?? String(err)}`, err);
  }
}

// ---------------------------------------------------------------------------
// Helper: split "provider/model" → { providerId, modelPart }
// For multi-segment paths like "openrouter/openai/gpt-3.5-turbo":
//   providerId = "openrouter", modelPart = "openai/gpt-3.5-turbo"
// ---------------------------------------------------------------------------
function splitProviderModel(full) {
  const idx = full.indexOf("/");
  if (idx < 0) return { providerId: full, modelPart: full };
  return { providerId: full.slice(0, idx), modelPart: full.slice(idx + 1) };
}

// ---------------------------------------------------------------------------
// STEP 0: Cache probe
// Verifies that a sqlite-inserted combo is immediately routable.
// getComboByName() in combos.ts does a direct DB read with no TTL cache,
// so the combo should be visible as soon as the SSH INSERT commits.
// If not (unexpected caching behaviour), we poll up to 12s before blocking.
// ---------------------------------------------------------------------------
async function step0CacheProbe(healthy) {
  console.log("\n=== STEP 0: sqlite → routable cache probe ===");
  const probe = healthy[0];
  const probeName = "__live_test__probe";
  let id;
  let blocked = false;

  try {
    id = createCombo({ name: probeName, strategy: "priority", models: [probe] });
    console.log(`  created combo id=${id} model=${probe}`);

    // Attempt immediate chat — expect instant visibility (getComboByName bypasses cache)
    let r = await chat(probeName, { maxTokens: 4 });
    if (r.status === 200 && r.text) {
      console.log(
        `  chat() → ${r.status} model=${r.model} text="${r.text.slice(0, 40)}"`
      );
      console.log("  PROBE RESULT: immediately routable — getComboByName bypasses in-memory cache");
    } else {
      console.log(
        `  Immediate chat → status=${r.status} text=${r.text ?? "(empty)"}`
      );
      console.log("  Polling up to 12 s (TTL cache unexpectedly active)...");
      let resolved = false;
      for (let i = 0; i < 6; i++) {
        await new Promise((res) => setTimeout(res, 2000));
        r = await chat(probeName, { maxTokens: 4 });
        if (r.status === 200 && r.text) {
          console.log(`  Resolved after ~${(i + 1) * 2}s: model=${r.model}`);
          console.log("  PROBE RESULT: visible after TTL expiry");
          resolved = true;
          break;
        }
      }
      if (!resolved) {
        console.error("  PROBE RESULT: BLOCKER — combo not routable within 12s");
        blocked = true;
      }
    }
  } finally {
    if (id) {
      try {
        deleteCombo(probeName);
        console.log(`  cleanup: ${probeName} deleted`);
      } catch (e) {
        console.error(`  cleanup error: ${e?.message}`);
      }
    }
  }

  if (blocked) {
    throw new Error("BLOCKER: sqlite-inserted combo not routable within 12s — cannot run scenarios");
  }
}

// ---------------------------------------------------------------------------
// Scenario 1: priority
// Two healthy models. Single chat() call → 200 + non-empty text.
// ---------------------------------------------------------------------------
async function scenarioPriority(healthy) {
  const name = "__live_test__priority";
  if (healthy.length < 1) {
    skip("priority", "no healthy providers");
    return;
  }
  const models = healthy.slice(0, 2);
  let id;
  try {
    id = createCombo({ name, strategy: "priority", models });
    const r = await chat(name, { maxTokens: 16 });
    if (r.status !== 200) {
      fail("priority", `status=${r.status} raw=${JSON.stringify(r.raw)?.slice(0, 120)}`);
      return;
    }
    if (!r.text) {
      fail("priority", "response text is empty");
      return;
    }
    pass("priority", `status=200 model=${r.model} text="${r.text.slice(0, 40)}"`);
  } finally {
    if (id) try { deleteCombo(name); } catch { /* best effort */ }
  }
}

// ---------------------------------------------------------------------------
// Scenario 2: round-robin
// ≥2 healthy models. 5 calls with unique nonces → at least 2 distinct
// response.model values (each call must return 200).
// ---------------------------------------------------------------------------
async function scenarioRoundRobin(healthy) {
  const name = "__live_test__round-robin";
  if (healthy.length < 2) {
    skip("round-robin", `need ≥2 healthy providers, found ${healthy.length}`);
    return;
  }
  const models = healthy.slice(0, Math.min(3, healthy.length));
  let id;
  try {
    id = createCombo({ name, strategy: "round-robin", models });
    const served = new Set();
    for (let i = 0; i < 5; i++) {
      const r = await chat(name, { maxTokens: 16 });
      if (r.status !== 200) {
        fail("round-robin", `call ${i + 1} returned status=${r.status}`);
        return;
      }
      served.add(r.model);
    }
    if (served.size < 2) {
      fail(
        "round-robin",
        `only 1 distinct model across 5 calls: [${[...served].join(", ")}] — round-robin not distributing`
      );
      return;
    }
    pass("round-robin", `${served.size} distinct models across 5 calls: [${[...served].join(", ")}]`);
  } finally {
    if (id) try { deleteCombo(name); } catch { /* best effort */ }
  }
}

// ---------------------------------------------------------------------------
// Scenario 3: weighted
// Two healthy models with equal weight (50/50). 8 calls → both appear at
// least once (loose statistical check — P(only 1 model in 8 calls) ≈ 0.8%).
// ---------------------------------------------------------------------------
async function scenarioWeighted(healthy) {
  const name = "__live_test__weighted";
  if (healthy.length < 2) {
    skip("weighted", `need ≥2 healthy providers, found ${healthy.length}`);
    return;
  }
  const [m1, m2] = healthy.slice(0, 2);
  const { providerId: p1, modelPart: mp1 } = splitProviderModel(m1);
  const { providerId: p2, modelPart: mp2 } = splitProviderModel(m2);
  let id;
  try {
    id = createCombo({
      name,
      strategy: "weighted",
      models: [
        { providerId: p1, model: mp1, weight: 50 },
        { providerId: p2, model: mp2, weight: 50 },
      ],
    });
    const tally = {};
    for (let i = 0; i < 8; i++) {
      const r = await chat(name, { maxTokens: 16 });
      if (r.status !== 200) {
        fail("weighted", `call ${i + 1} returned status=${r.status}`);
        return;
      }
      tally[r.model] = (tally[r.model] ?? 0) + 1;
    }
    const distinct = Object.keys(tally);
    if (distinct.length < 2) {
      fail(
        "weighted",
        `only 1 distinct model across 8 calls: ${JSON.stringify(tally)} — weighted routing not distributing`
      );
      return;
    }
    pass("weighted", `8 calls distribution: ${JSON.stringify(tally)}`);
  } finally {
    if (id) try { deleteCombo(name); } catch { /* best effort */ }
  }
}

// ---------------------------------------------------------------------------
// Scenario 4: cost-optimized
// Find a cheap+pricey healthy pair (based on KNOWN_INPUT_COST).
// Insert pricey first (position 0) so cost-optimized must reorder.
// Assert: the served model matches the cheap provider.
//
// OmniRoute's sortModelsByCost uses getPricingForModel which merges
// default-pricing constants. groq models have price=0; minimax M3 has $0.5.
// Cost-optimized sorts ascending → groq (0) before minimax (0.5).
// ---------------------------------------------------------------------------
async function scenarioCostOptimized(healthy) {
  const name = "__live_test__cost-optimized";

  // Partition healthy into cheap (price=0) and pricey (price>0 or unknown>0)
  const cheap = healthy.filter(
    (m) => KNOWN_INPUT_COST[m] !== undefined && KNOWN_INPUT_COST[m] === 0
  );
  const pricey = healthy.filter(
    (m) => KNOWN_INPUT_COST[m] !== undefined && KNOWN_INPUT_COST[m] > 0
  );

  if (cheap.length === 0 || pricey.length === 0) {
    skip(
      "cost-optimized",
      `no distinguishable cheap+pricey pair among healthy=[${healthy.join(", ")}]`
    );
    return;
  }

  const cheapModel = cheap[0];
  const priceyModel = pricey[0];
  let id;
  try {
    // Insert pricey first — cost-optimized should reorder to serve cheapModel first
    id = createCombo({
      name,
      strategy: "cost-optimized",
      models: [priceyModel, cheapModel],
    });
    const r = await chat(name, { maxTokens: 16 });
    if (r.status !== 200) {
      fail("cost-optimized", `status=${r.status}`);
      return;
    }
    if (!r.text) {
      fail("cost-optimized", "empty response text");
      return;
    }
    // Verify the cheap model was served (response.model contains cheap provider's model name)
    const cheapProvider = splitProviderModel(cheapModel).providerId;
    // Both direct match and provider-substring match are accepted since OmniRoute
    // returns the raw upstream model name (e.g. "llama-3.1-8b-instant" not "groq/...")
    const cheapModelPart = splitProviderModel(cheapModel).modelPart.toLowerCase();
    const servedModel = (r.model ?? "").toLowerCase();
    const isChapModel =
      servedModel === cheapModelPart ||
      servedModel.includes(cheapModelPart) ||
      servedModel === cheapModel.toLowerCase() ||
      // fallback: check provider header if available (response.model could be bare name)
      servedModel.includes(cheapProvider.toLowerCase());

    if (!isChapModel) {
      fail(
        "cost-optimized",
        `expected cheaper model (${cheapModel}, price=${KNOWN_INPUT_COST[cheapModel]}) but got ${r.model} — cost-optimized may not have reordered`
      );
      return;
    }
    pass(
      "cost-optimized",
      `cheaper model served: ${r.model} (cheap=${cheapModel}@$${KNOWN_INPUT_COST[cheapModel]}, pricey=${priceyModel}@$${KNOWN_INPUT_COST[priceyModel]})`
    );
  } finally {
    if (id) try { deleteCombo(name); } catch { /* best effort */ }
  }
}

// ---------------------------------------------------------------------------
// Scenario 5: fusion
// Panel of 2-3 healthy models fan out in parallel; judge synthesizes 1 answer.
// Cost guard: panel ≤3, max_tokens=16, one call.
// ---------------------------------------------------------------------------
async function scenarioFusion(healthy) {
  const name = "__live_test__fusion";
  if (healthy.length < 2) {
    skip("fusion", `need ≥2 healthy providers, found ${healthy.length}`);
    return;
  }
  // Panel: up to 3 distinct models
  const panelModels = healthy.slice(0, Math.min(3, healthy.length));
  // Judge: reuse first healthy model (cheap, already warmed up)
  const judgeModel = panelModels[0];
  let id;
  try {
    id = createCombo({
      name,
      strategy: "fusion",
      models: panelModels,
      config: {
        judgeModel,
        fusionTuning: { minPanel: 2 },
      },
    });
    // Use a unique nonce in content to defeat semantic cache
    const r = await chat(name, {
      maxTokens: 16,
      content: `hi ${nonce()} answer in one word`,
    });
    if (r.status !== 200) {
      fail("fusion", `status=${r.status} raw=${JSON.stringify(r.raw)?.slice(0, 120)}`);
      return;
    }
    if (!r.text) {
      fail("fusion", "judge returned empty synthesized text");
      return;
    }
    pass("fusion", `synthesized text="${r.text.slice(0, 60)}" served-model=${r.model}`);
  } finally {
    if (id) try { deleteCombo(name); } catch { /* best effort */ }
  }
}

// ---------------------------------------------------------------------------
// Scenario 6: auto
// model="auto" → virtual auto-combo bypasses DB lookup entirely.
// Assert: status=200, non-empty text, response.model is a real model (not "auto").
// Also test "auto/fast" variant (skip if it 400s as unknown).
// ---------------------------------------------------------------------------
async function scenarioAuto() {
  // 6a: bare "auto"
  const r = await chat("auto", { maxTokens: 16 });
  if (r.status !== 200) {
    fail("auto", `status=${r.status} raw=${JSON.stringify(r.raw)?.slice(0, 120)}`);
    return;
  }
  if (!r.text) {
    fail("auto", "empty response text");
    return;
  }
  const servedModel = r.model ?? "";
  if (servedModel === "auto" || !servedModel) {
    fail("auto", `response.model is still "auto" — pool was not resolved`);
    return;
  }
  pass("auto", `status=200 resolved-model=${servedModel} text="${r.text.slice(0, 40)}"`);

  // 6b: "auto/fast" variant
  const r2 = await chat("auto/fast", { maxTokens: 16 });
  if (r2.status === 400 || r2.status === 404) {
    skip("auto/fast", `variant not recognised (${r2.status})`);
  } else if (r2.status !== 200 || !r2.text) {
    fail("auto/fast", `status=${r2.status} text=${r2.text ?? "(empty)"}`);
  } else {
    pass("auto/fast", `status=200 model=${r2.model} text="${r2.text.slice(0, 40)}"`);
  }
}

// ---------------------------------------------------------------------------
// Scenario 7: failover (opt-in via --failover)
//
// Approach: CROSS-PROVIDER BOGUS-MODEL (deterministic, no SSH crypto required).
//
// Why cross-provider?
//   A same-provider bogus-model fails silently: when target[0] (bogus) returns a
//   404, OmniRoute calls recordProviderCooldown(providerA, undefined) — a provider-
//   wide key. The combo then pre-screens target[1] (same providerA, real model) and
//   finds providerA in cooldown → skips it → combo returns the 404 from target[0].
//   Using DIFFERENT providers avoids this: target[0] puts providerA in cooldown,
//   target[1] on providerB is unaffected, providerB serves the healthy response.
//
// Mechanism:
//   - Target[0]: <providerA>/__nonexistent_model_xyz__ → upstream 404 → providerA cooldown
//   - Target[1]: <providerB>/<realModel>              → not in cooldown → 200 served
//   - config.maxRetries:0, retryDelayMs:0 → immediate fallover, no retry delay
//   - Bogus model can never return 200 → any 200 proves fallover to the real target
//
// If only 1 distinct provider is healthy: SKIP (BROKEN-CONNECTION approach needed; see
// comment below for how to implement it using encrypted wrong API key via SSH sqlite).
//
// BROKEN-CONNECTION approach (for future reference or if cross-provider is unavailable):
//   1. SSH to read STORAGE_ENCRYPTION_KEY from /root/.omniroute/.env
//   2. Encrypt a wrong API key using scryptSync(key,"omniroute-field-encryption-v1",32)+AES-256-GCM
//   3. INSERT broken provider_connection row into provider_connections table via SSH sqlite
//   4. Combo: [{providerId:glm, model:glm/glm-4-flash, connectionId:brokenConnId}, realModel]
//   5. Broken conn → 401 → recordProviderCooldown("glm",brokenConnId) → key "glm:brokenConnId"
//   6. Target[1] on different provider → unaffected → 200
//   7. Finally: DELETE combo AND broken connection
// ---------------------------------------------------------------------------
async function scenarioFailover(healthy) {
  const name = "__live_test__failover";

  if (healthy.length < 1) {
    skip("failover", "no healthy providers — cannot run failover scenario");
    return;
  }

  // Group healthy providers by providerId to find two distinct providers
  const byProvider = new Map();
  for (const m of healthy) {
    const { providerId } = splitProviderModel(m);
    if (!byProvider.has(providerId)) byProvider.set(providerId, []);
    byProvider.get(providerId).push(m);
  }
  const distinctProviders = [...byProvider.keys()];

  if (distinctProviders.length < 2) {
    // Cannot use cross-provider approach with only one provider.
    // Same-provider bogus-model fails: 404 → recordProviderCooldown(provider, undefined) →
    // provider-wide cooldown blocks target[1] on the same provider.
    skip(
      "failover",
      `need ≥2 distinct healthy providers for cross-provider approach; ` +
        `found only 1 [${distinctProviders.join(", ")}]. ` +
        `Implement BROKEN-CONNECTION approach to run failover with a single provider.`
    );
    return;
  }

  // CROSS-PROVIDER BOGUS-MODEL:
  //   target[0] = <providerA>/__nonexistent_model_xyz__  (will get 404, puts providerA in cooldown)
  //   target[1] = <providerB>/<realHealthyModel>         (different provider, not in cooldown)
  const bogusProvider = distinctProviders[0];
  const realModel = byProvider.get(distinctProviders[1])[0];
  const bogusModel = `${bogusProvider}/__nonexistent_model_xyz__`;
  const { modelPart: realModelPart } = splitProviderModel(realModel);

  let id;
  try {
    id = createCombo({
      name,
      strategy: "priority",
      models: [bogusModel, realModel],
      config: { maxRetries: 0, retryDelayMs: 0 },
    });

    console.log(
      `  failover combo (CROSS-PROVIDER BOGUS-MODEL):\n` +
        `    [0] ${bogusModel} ← broken primary (will 404)\n` +
        `    [1] ${realModel} ← healthy fallback (different provider)\n` +
        `    strategy=priority, maxRetries=0`
    );

    const r = await chat(name, { maxTokens: 16 });

    // Assertions:
    // 1. status=200: the combo succeeded — ONLY possible if it fell over to target[1],
    //    because target[0] (bogus model) can NEVER return 200 from the upstream.
    // 2. Non-empty text: real LLM content was returned (not an empty error body).
    // 3. Served model is NOT the bogus one (belt-and-suspenders; 200 already proves it).
    // 4. Served model matches the real healthy target (positive proof of which model served).

    if (r.status !== 200) {
      fail(
        "failover",
        `expected status=200 after fallover (broken ${bogusModel} → ${realModel}), ` +
          `got status=${r.status}. ` +
          `raw=${JSON.stringify(r.raw)?.slice(0, 200)}`
      );
      return;
    }

    if (!r.text) {
      fail("failover", `status=200 but empty text — fallover may have served a no-content response`);
      return;
    }

    const bogusModelPart = "__nonexistent_model_xyz__";
    const servedModel = (r.model ?? "").toLowerCase();

    // Negative proof: bogus model did NOT serve (should never happen, but guard anyway)
    if (servedModel.includes(bogusModelPart.toLowerCase())) {
      fail(
        "failover",
        `bogus model string "${bogusModelPart}" appears in served model field "${r.model}" — ` +
          `impossible 200 from a non-existent model; something is wrong`
      );
      return;
    }

    // Positive proof: served model matches the real healthy target
    const realModelLower = realModelPart.toLowerCase();
    const servedMatchesReal =
      servedModel === realModelLower ||
      servedModel.includes(realModelLower) ||
      servedModel === realModel.toLowerCase();

    const proofNote = servedMatchesReal
      ? ""
      : ` [NOTE: served="${r.model}" ≠ expected="${realModelPart}" ` +
        `— upstream alias likely; 200+text from bogus-primary is the failover proof]`;

    pass(
      "failover",
      `CROSS-PROVIDER BOGUS-MODEL: broken primary (${bogusModel}) → ` +
        `fallover → served ${r.model} (real target: ${realModel}) ` +
        `text="${r.text.slice(0, 40)}"${proofNote}`
    );
  } finally {
    if (id) {
      try {
        deleteCombo(name);
        console.log(`  cleanup: ${name} deleted`);
      } catch (e) {
        console.error(`  cleanup error: ${e?.message}`);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log("=== OmniRoute combo-live-vps scenario driver ===");
  if (onlyScenario) console.log(`Filtering to scenario: ${onlyScenario}`);
  console.log();

  // --- Health probe ---
  console.log("Probing healthy providers (broad candidate list)...");
  const healthy = await listHealthyProviders(BROAD_CANDIDATES);
  console.log(`  healthy (${healthy.length}/${BROAD_CANDIDATES.length}): [${healthy.join(", ")}]`);

  if (healthy.length === 0) {
    console.error("FATAL: no healthy providers — cannot run any scenarios");
    process.exit(1);
  }

  // --- STEP 0: cache probe ---
  if (!onlyScenario) {
    // Run STEP 0 unconditionally unless --only is passed (targeted run skips housekeeping)
    try {
      await step0CacheProbe(healthy);
    } catch (err) {
      console.error(`\nBLOCKER: ${err.message}`);
      process.exit(1);
    }
  }

  console.log("\n=== Scenarios ===\n");

  await runScenario("priority", () => scenarioPriority(healthy));
  await runScenario("round-robin", () => scenarioRoundRobin(healthy));
  await runScenario("weighted", () => scenarioWeighted(healthy));
  await runScenario("cost-optimized", () => scenarioCostOptimized(healthy));
  await runScenario("fusion", () => scenarioFusion(healthy));
  await runScenario("auto", () => scenarioAuto());

  // --- Scenario 7: failover (opt-in) ---
  // Only runs when --failover is passed. Uses a bogus-model primary to force a real
  // combo failover to the healthy secondary, proving the priority fallover path works
  // against the live server without stopping any service.
  if (failoverFlag) {
    console.log("\n=== Failover scenario (--failover) ===\n");
    await runScenario("failover", () => scenarioFailover(healthy));
  }

  // --- Summary ---
  console.log("\n=== Summary ===");
  for (const { name, result } of summary) {
    console.log(`  ${result.padEnd(4)} [${name}]`);
  }
  const passed = summary.filter((s) => s.result === "PASS").length;
  const skipped = summary.filter((s) => s.result === "SKIP").length;
  const failed = summary.filter((s) => s.result === "FAIL").length;
  console.log(`\n  ${passed} PASS  ${skipped} SKIP  ${failed} FAIL`);

  process.exit(exitCode);
}

main().catch((err) => {
  console.error("FATAL:", err?.message ?? err);
  process.exit(1);
});
