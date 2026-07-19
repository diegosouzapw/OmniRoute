/**
 * Regression test for #6773 — NVIDIA NIM models listed available:true but 404 at router.
 *
 * Root cause: the `nvidia` provider registry entry multiplexes many distinct
 * third-party vendor models (z-ai/, minimaxai/, deepseek-ai/, qwen/,
 * mistralai/, stepfun-ai/, moonshotai/, openai/, nvidia/) behind ONE base URL
 * and ONE API key connection — architecturally identical to `modelscope`,
 * `synthetic`, and `kilo-gateway`, which all set `passthroughModels: true` so
 * that a single model's 404/429 stays scoped to that model instead of cooling
 * down the whole connection (see accountFallback.ts `hasPerModelQuota` doc
 * comment). Without the flag, a single upstream 404 for one (possibly
 * stale/renamed) model poisons ALL nvidia models for the connection-cooldown
 * duration — matching the issue's "All 17 behave the same" symptom.
 */
import test from "node:test";
import assert from "node:assert/strict";

const accountFallback = await import("../../open-sse/services/accountFallback.ts");
const providerRegistry = await import("../../open-sse/config/providerRegistry.ts");

test("#6773: nvidia registry entry sets passthroughModels", () => {
  const entry = providerRegistry.getRegistryEntry("nvidia");
  assert.equal(
    entry?.passthroughModels,
    true,
    "nvidia multiplexes many third-party vendor models behind one connection " +
      "(z-ai/, minimaxai/, deepseek-ai/, qwen/, mistralai/, stepfun-ai/, " +
      "moonshotai/, openai/, nvidia/) — it should set passthroughModels: true " +
      "like modelscope/synthetic/kilo-gateway, so a single stale model 404 " +
      "does not cool down the whole connection for all other models"
  );
});

test("#6773: hasPerModelQuota('nvidia') is true, so a 404 on one nvidia model is model-scoped", () => {
  assert.equal(
    accountFallback.hasPerModelQuota("nvidia", "z-ai/glm-5.2"),
    true,
    "expected nvidia to use per-model lockout (like gemini/github/codex/compatible " +
      "providers) so a 404 on one model doesn't cool down the other nvidia models"
  );
});

test("#6773: checkFallbackError + lockModelIfPerModelQuota scope a single-model 404 to just that model for nvidia", () => {
  // A plain upstream 404 (e.g. one stale/renamed nvidia model id) falls through
  // checkFallbackError's generic catch-all: shouldFallback=true with a non-zero
  // connection cooldown. With hasPerModelQuota=true, lockModelIfPerModelQuota
  // now scopes that cooldown to just the one failing model instead of the
  // whole connection.
  const result = accountFallback.checkFallbackError(
    404,
    "Not Found",
    0,
    "z-ai/glm-5.2",
    "nvidia",
    null,
    null,
    null
  );
  assert.equal(result.shouldFallback, true, "404 triggers a connection-level fallback/cooldown");
  assert.ok(
    (result.cooldownMs ?? 0) > 0,
    "the connection-level cooldown is non-zero, so it also blocks the other nvidia models" +
      " unless it gets scoped to just this model below"
  );

  const locked = accountFallback.lockModelIfPerModelQuota(
    "nvidia",
    "conn-6773",
    "z-ai/glm-5.2",
    "unknown",
    result.cooldownMs ?? 30_000
  );
  assert.equal(
    locked,
    true,
    "expected the 404 to be scoped to just this one model (per-model lockout), " +
      "not the whole connection"
  );
});
