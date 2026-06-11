/**
 * Shared combo (model combo) handling with fallback support
 * Supports: priority, weighted, round-robin, random, least-used, cost-optimized,
 * reset-aware, reset-window, strict-random, auto, fill-first, p2c, lkgp,
 * context-optimized, and context-relay strategies
 */

import {
  checkFallbackError,
  classifyErrorText,
  formatRetryAfter,
  getRuntimeProviderProfile,
  recordProviderFailure,
  isProviderFailureCode,
  isProviderExhaustedReason,
  type ProviderProfile,
} from "../accountFallback.ts";

import { FETCH_TIMEOUT_MS, RateLimitReason } from "../../config/constants.ts";

import { errorResponse, unavailableResponse } from "../../utils/error.ts";

import { clamp01 } from "../../utils/number.ts";

import {
  recordComboIntent,
  recordComboRequest,
  recordComboShadowRequest,
  getComboMetrics,
} from "../comboMetrics.ts";

import { parseModel } from "../model.ts";

import { getProviderModels } from "../../config/providerModels.ts";

import {
  ShadowRoutingConfig,
  ComboLike,
  ComboCollectionLike,
  ResolvedComboTarget,
  HandleSingleModel,
  IsModelAvailable,
  ComboLogger,
} from "./types.ts";
import { isRecord, toRecordedTarget } from "./utils.ts";
import { resolveNestedComboTargets } from "./dag.ts";

function normalizeShadowRoutingConfig(config: Record<string, unknown>): ShadowRoutingConfig {
  const raw = isRecord(config.shadowRouting) ? config.shadowRouting : {};
  const sampleRate = Number(raw.sampleRate ?? 1);
  const maxTargets = Number(raw.maxTargets ?? 2);
  const timeoutMs = Number(raw.timeoutMs ?? 30000);
  return {
    enabled: raw.enabled === true,
    targets: Array.isArray(raw.targets) ? raw.targets : [],
    sampleRate: Number.isFinite(sampleRate) ? Math.max(0, Math.min(1, sampleRate)) : 1,
    maxTargets: Number.isFinite(maxTargets) ? Math.max(1, Math.min(10, Math.floor(maxTargets))) : 2,
    timeoutMs: Number.isFinite(timeoutMs)
      ? Math.max(1000, Math.min(120000, Math.floor(timeoutMs)))
      : 30000,
  };
}

export function resolveShadowTargets(
  combo: ComboLike,
  config: Record<string, unknown>,
  allCombos: ComboCollectionLike
): ResolvedComboTarget[] {
  const shadowConfig = normalizeShadowRoutingConfig(config);
  if (!shadowConfig.enabled || shadowConfig.targets.length === 0) return [];
  if (shadowConfig.sampleRate <= 0 || Math.random() > shadowConfig.sampleRate) return [];

  const shadowCombo: ComboLike = {
    ...combo,
    name: `${combo.name}:shadow`,
    models: shadowConfig.targets,
  };
  return resolveNestedComboTargets(shadowCombo, allCombos, new Set([combo.name]), 0, ["shadow"])
    .slice(0, shadowConfig.maxTargets)
    .map((target) => ({
      ...target,
      trafficType: "shadow" as const,
    }));
}

async function drainShadowResponse(response: Response): Promise<void> {
  try {
    if (!response.body) return;
    await response.arrayBuffer();
  } catch {
    // Shadow draining is best-effort and must never affect the production response.
  }
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Shadow route timed out")), timeoutMs);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}

function cloneRequestBodyForShadowRouting(body: Record<string, unknown>): Record<string, unknown> {
  if (typeof structuredClone === "function") {
    return structuredClone(body) as Record<string, unknown>;
  }

  return JSON.parse(JSON.stringify(body)) as Record<string, unknown>;
}

export function scheduleShadowRouting(
  combo: ComboLike,
  config: Record<string, unknown>,
  body: Record<string, unknown>,
  targets: ResolvedComboTarget[],
  handleSingleModel: HandleSingleModel,
  isModelAvailable: IsModelAvailable | undefined,
  strategy: string,
  log: ComboLogger
): void {
  if (targets.length === 0) return;
  const shadowConfig = normalizeShadowRoutingConfig(config);
  let shadowBaseBody: Record<string, unknown>;
  try {
    shadowBaseBody = cloneRequestBodyForShadowRouting(body);
  } catch (error) {
    log.warn("COMBO", "Shadow routing skipped: failed to clone request body", {
      error: error instanceof Error ? error.message : String(error),
    });
    return;
  }
  const run = async () => {
    await Promise.all(
      targets.map(async (target) => {
        const startedAt = Date.now();
        try {
          const shadowBody = {
            ...cloneRequestBodyForShadowRouting(shadowBaseBody),
            model: target.modelStr,
            stream: false,
          };
          if (isModelAvailable) {
            const available = await isModelAvailable(target.modelStr, target);
            if (!available) {
              recordComboShadowRequest(combo.name, target.modelStr, {
                success: false,
                latencyMs: Date.now() - startedAt,
                target: toRecordedTarget(target),
              });
              log.info("COMBO", `Shadow target skipped (unavailable): ${target.modelStr}`);
              return;
            }
          }

          const response = await withTimeout(
            handleSingleModel(shadowBody, target.modelStr, {
              ...target,
              failoverBeforeRetry: true,
              trafficType: "shadow",
            }),
            shadowConfig.timeoutMs
          );
          await drainShadowResponse(response.clone());
          recordComboShadowRequest(combo.name, target.modelStr, {
            success: response.ok,
            latencyMs: Date.now() - startedAt,
            target: toRecordedTarget(target),
          });
          log.info(
            "COMBO",
            `Shadow target ${target.modelStr} completed with status ${response.status} (${strategy})`
          );
        } catch (error) {
          recordComboShadowRequest(combo.name, target.modelStr, {
            success: false,
            latencyMs: Date.now() - startedAt,
            target: toRecordedTarget(target),
          });
          log.warn("COMBO", `Shadow target ${target.modelStr} failed`, {
            error: error instanceof Error ? error.message : String(error),
          });
        }
      })
    );
  };

  setTimeout(() => void run(), 0);
}
