import type { ComboLogger, HandleSingleModel, IsModelAvailable, ResolvedComboTarget } from "./types";

/**
 * Last-resort fallback tier for combo routing (#6238).
 *
 * `filterTargetsByRequestCompatibility` drops targets that look request-incompatible
 * (tool/vision/structured-output unsupported, or below the required context window)
 * BEFORE any runtime availability check runs. Its only safety net triggers when ALL
 * targets are filtered — not when the kept targets are later all runtime-unavailable
 * (circuit-open / cooldown / no credentials). In that case a combo would return
 * `503 ALL_ACCOUNTS_INACTIVE` without ever reconsidering a compat-rejected-but-healthy
 * target.
 *
 * This helper makes those compat-rejected targets a genuine fallback tier: only after
 * the primary (compat-kept) targets were all skipped without a single real attempt do
 * we probe the rejected set. A compat-rejected target is used only if it is actually
 * available and returns a successful upstream response; otherwise the caller keeps its
 * original error surface unchanged.
 */
export interface CompatFallbackContext {
  handleSingleModel: HandleSingleModel;
  isModelAvailable?: IsModelAvailable;
  /** Returns true when the target's provider connection is in resilience cooldown. */
  isProviderInCooldown?: (target: ResolvedComboTarget) => boolean;
  log: ComboLogger;
  /** Effective combo strategy, threaded into the single-model dispatch for telemetry. */
  strategy: string;
}

/**
 * Attempt each compatibility-rejected target in order, returning the first successful
 * upstream `Response`. Targets that are unavailable, in cooldown, or return a non-ok
 * response are skipped. Returns `null` when no rejected target yields a success, so the
 * caller can fall through to its existing error/503 path with an unchanged error surface.
 */
export async function attemptCompatRejectedFallback(
  rejectedTargets: ResolvedComboTarget[],
  body: Record<string, unknown>,
  ctx: CompatFallbackContext
): Promise<Response | null> {
  if (rejectedTargets.length === 0) return null;

  for (const target of rejectedTargets) {
    if (ctx.isModelAvailable) {
      const available = await ctx.isModelAvailable(target.modelStr, target);
      if (!available) {
        ctx.log.debug(
          "COMBO",
          `Last-resort compat fallback: ${target.modelStr} still unavailable — skipping`
        );
        continue;
      }
    }

    if (ctx.isProviderInCooldown?.(target)) {
      ctx.log.debug(
        "COMBO",
        `Last-resort compat fallback: ${target.modelStr} provider in cooldown — skipping`
      );
      continue;
    }

    ctx.log.info(
      "COMBO",
      `Last-resort compat fallback → ${target.modelStr} (all compat-kept targets were unavailable)`
    );
    const result = await ctx.handleSingleModel(body, target.modelStr, {
      ...target,
      effectiveComboStrategy: ctx.strategy,
    });
    if (result.ok) {
      ctx.log.info("COMBO", `Last-resort compat fallback succeeded via ${target.modelStr}`);
      return result;
    }
    ctx.log.debug(
      "COMBO",
      `Last-resort compat fallback: ${target.modelStr} failed (${result.status}) — trying next`
    );
  }

  return null;
}
