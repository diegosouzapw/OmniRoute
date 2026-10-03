import test from "node:test";
import assert from "node:assert/strict";
import {
  clearAllModelLockouts,
  checkFallbackError,
  isModelLocked,
} from "../../open-sse/services/accountFallback.ts";
import {
  noteUpstreamModelFailure,
  getUpstreamModelCooldown,
} from "../../open-sse/services/upstreamModelCooldown.ts";
import { shouldTripProviderBreakerForResult } from "../../src/sse/handlers/chatPredicates.ts";
import { getProviderCredentials } from "../../src/sse/services/auth.ts";

const overload =
  "Streaming response failed: [503] Upstream error from Nvidia: Service temporarily overloaded";
test("upstream overload suspends only the requested model across accounts and expires", async () => {
  clearAllModelLockouts();
  const realNow = Date.now;
  let clock = realNow();
  Date.now = () => clock;
  try {
    assert.equal(
      noteUpstreamModelFailure("opencode", "nemotron-3-ultra-free", 502, overload),
      true
    );
    assert.equal(
      getUpstreamModelCooldown("opencode", "nemotron-3-ultra-free")?.remainingMs,
      120000
    );
    assert.equal(getUpstreamModelCooldown("opencode", "big-pickle"), null);
    assert.equal(isModelLocked("opencode", "account-a", "big-pickle"), false);
    const skipped = await getProviderCredentials("opencode", null, null, "nemotron-3-ultra-free");
    assert.equal(skipped?.allRateLimited, true);
    assert.equal(skipped?.cooldownScope, "model");
    assert.equal(
      shouldTripProviderBreakerForResult({ status: 502, error: overload }, false, false),
      false
    );
    clock += 120001;
    assert.equal(getUpstreamModelCooldown("opencode", "nemotron-3-ultra-free"), null);
  } finally {
    Date.now = realNow;
    clearAllModelLockouts();
  }
});

test("model capacity classification does not become an account cooldown", () => {
  for (const status of [500, 502, 503, 504]) {
    const result = checkFallbackError(status, overload, 0, "nemotron-3-ultra-free", "opencode");
    assert.equal(result.ruleScope, "model");
    assert.equal(result.reason, "model_capacity");
    assert.equal(result.cooldownMs, 120000);
  }
  assert.equal(
    noteUpstreamModelFailure("opencode", "big-pickle", 503, "gateway unavailable"),
    false
  );
  assert.equal(noteUpstreamModelFailure("opencode", "big-pickle", 403, "invalid API key"), false);
});

test("a free-tier refusal pauses its model without pausing the provider", async () => {
  const { armOpencodeFreeTierSkipAfterRefusal } =
    await import("../../open-sse/executors/opencodeFreeTierContract.ts");
  const { clearOpencodeFreeTierSkips, isOpencodeFreeTierSkipped } =
    await import("../../open-sse/services/opencodeFreeTierSkip.ts");
  clearAllModelLockouts();
  clearOpencodeFreeTierSkips();
  try {
    armOpencodeFreeTierSkipAfterRefusal(
      "noauth",
      "opencode",
      403,
      "OpenCode's free tier can only be used from within OpenCode",
      {},
      {},
      "muse-spark-1.2-contributor-free"
    );
    assert.ok(getUpstreamModelCooldown("opencode", "muse-spark-1.2-contributor-free"));
    assert.equal(getUpstreamModelCooldown("opencode", "big-pickle"), null);
    assert.equal(isOpencodeFreeTierSkipped("opencode"), false);
  } finally {
    clearAllModelLockouts();
    clearOpencodeFreeTierSkips();
  }
});
