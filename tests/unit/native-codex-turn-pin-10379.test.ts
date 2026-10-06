//#10379: Native Codex turn pin must allow fill-first failover across
//compatible connections for the same provider and model.
import test from "node:test";
import assert from "node:assert/strict";

const {
  applyNativeCodexTurnPin,
  pinNativeCodexTurn,
  getNativeCodexTurnPin,
  createPinnedModelUnavailableResponse,
  NATIVE_CODEX_PINNED_MODEL_UNAVAILABLE_CODE,
  NATIVE_CODEX_PINNED_MODEL_UNAVAILABLE_MESSAGE,
  isPinnedTargetModelScopedUnusable,
  areAllPinnedTargetsModelScopedUnusable,
  clearNativeCodexTurnPinsForTests,
} = await import("../../open-sse/services/combo/nativeCodexTurnPin.ts");
const { lockExactModel, clearAllModelLockouts } =
  await import("../../open-sse/services/accountFallback.ts");
const { getCircuitBreaker, resetAllCircuitBreakers } =
  await import("../../src/shared/utils/circuitBreaker.ts");
const { recordProviderCooldown, clearCooldownState } =
  await import("../../open-sse/services/providerCooldownTracker.ts");
const { PROVIDER_PROFILES } = await import("../../open-sse/config/constants.ts");
const { resolveResilienceSettings } = await import("../../src/lib/resilience/settings.ts");

const BODY = {
  client_metadata: {
    "x-codex-turn-metadata": JSON.stringify({ thread_id: "t1", turn_id: "turn1" }),
  },
};

function makeTarget(connectionId: string, model = "gpt-5.6-sol", provider = "codex") {
  return {
    kind: "model" as const,
    stepId: `step-${connectionId}`,
    executionKey: `ek-${connectionId}`,
    modelStr: model,
    provider,
    providerId: null,
    connectionId,
    weight: 1,
    label: null,
  };
}

test("pinned connection is preferred and siblings are included as fallback", () => {
  clearNativeCodexTurnPinsForTests();
  pinNativeCodexTurn({
    body: BODY,
    comboName: "test-combo",
    target: makeTarget("conn-1"),
    connectionId: "conn-1",
  });

  const pin = getNativeCodexTurnPin(BODY, "test-combo");
  const targets = [makeTarget("conn-1"), makeTarget("conn-2"), makeTarget("conn-3")];
  const result = applyNativeCodexTurnPin(targets, pin!);

  assert.equal(result.length, 3, "all compatible connections returned");
  assert.equal(result[0].connectionId, "conn-1", "pinned connection first");
  assert.deepEqual(result[0].allowedConnectionIds, ["conn-1", "conn-2", "conn-3"]);
});

test("fallback connections share the same allowedConnectionIds", () => {
  clearNativeCodexTurnPinsForTests();
  pinNativeCodexTurn({
    body: BODY,
    comboName: "test-combo",
    target: makeTarget("conn-2"),
    connectionId: "conn-2",
  });

  const pin = getNativeCodexTurnPin(BODY, "test-combo");
  const targets = [makeTarget("conn-1"), makeTarget("conn-2"), makeTarget("conn-3")];
  const result = applyNativeCodexTurnPin(targets, pin!);

  assert.equal(result[0].connectionId, "conn-2");
  assert.equal(result[1].connectionId, "conn-1");
  assert.equal(result[2].connectionId, "conn-3");
  for (const t of result) {
    assert.deepEqual(t.allowedConnectionIds, ["conn-1", "conn-2", "conn-3"]);
  }
});

test("incompatible targets (different provider/model) are excluded", () => {
  clearNativeCodexTurnPinsForTests();
  pinNativeCodexTurn({
    body: BODY,
    comboName: "test-combo",
    target: makeTarget("conn-1"),
    connectionId: "conn-1",
  });

  const pin = getNativeCodexTurnPin(BODY, "test-combo");
  const targets = [
    makeTarget("conn-1"),
    makeTarget("conn-2"),
    makeTarget("conn-other", "different-model", "other-provider"),
  ];
  const result = applyNativeCodexTurnPin(targets, pin!);

  assert.equal(result.length, 2, "incompatible target excluded");
  assert.deepEqual(result[0].allowedConnectionIds, ["conn-1", "conn-2"]);
});

test("empty result when no compatible targets exist", () => {
  clearNativeCodexTurnPinsForTests();
  pinNativeCodexTurn({
    body: BODY,
    comboName: "test-combo",
    target: makeTarget("conn-1"),
    connectionId: "conn-1",
  });

  const pin = getNativeCodexTurnPin(BODY, "test-combo");
  const targets = [makeTarget("conn-x", "other-model", "other-provider")];
  const result = applyNativeCodexTurnPin(targets, pin!);

  assert.equal(result.length, 0);
});

test("pinNativeCodexTurn allows connectionId change on same provider+model", () => {
  clearNativeCodexTurnPinsForTests();
  pinNativeCodexTurn({
    body: BODY,
    comboName: "test-combo",
    target: makeTarget("conn-1"),
    connectionId: "conn-1",
  });

  // Should NOT throw when only connectionId changes
  pinNativeCodexTurn({
    body: BODY,
    comboName: "test-combo",
    target: makeTarget("conn-2"),
    connectionId: "conn-2",
  });

  const pin = getNativeCodexTurnPin(BODY, "test-combo");
  assert.equal(pin?.connectionId, "conn-2", "pin updated to new connection");
});

test("pinNativeCodexTurn rejects provider/model change", () => {
  clearNativeCodexTurnPinsForTests();
  pinNativeCodexTurn({
    body: BODY,
    comboName: "test-combo",
    target: makeTarget("conn-1"),
    connectionId: "conn-1",
  });

  assert.throws(
    () =>
      pinNativeCodexTurn({
        body: BODY,
        comboName: "test-combo",
        target: makeTarget("conn-1", "different-model", "codex"),
        connectionId: "conn-1",
      }),
    /Native Codex turn target changed/
  );
});

test("createPinnedModelUnavailableResponse constructs non-retryable HTTP 400 error response", async () => {
  const response = createPinnedModelUnavailableResponse();
  assert.equal(response.status, 400);
  const data = await response.json();
  assert.equal(data.error.code, NATIVE_CODEX_PINNED_MODEL_UNAVAILABLE_CODE);
  assert.equal(data.error.message, NATIVE_CODEX_PINNED_MODEL_UNAVAILABLE_MESSAGE);
  assert.equal(data.error.type, "invalid_request_error");
});

test("isPinnedTargetModelScopedUnusable distinguishes model lockout from provider/connection outages", async () => {
  clearAllModelLockouts();
  clearCooldownState();
  resetAllCircuitBreakers();

  const resilienceSettings = resolveResilienceSettings({
    resilienceSettings: {
      providerCooldown: { enabled: true, minRetryCooldownMs: 5000, maxRetryCooldownMs: 300000 },
    },
  });

  const target = makeTarget("conn-1", "antigravity/claude-opus-4-6-thinking", "antigravity");

  // 1. Healthy target -> false
  assert.equal(
    await isPinnedTargetModelScopedUnusable({
      target,
      comboName: "test-combo",
      body: BODY,
      resilienceSettings,
    }),
    false
  );

  // 2. Exact model lockout -> true
  lockExactModel("antigravity", "conn-1", "claude-opus-4-6-thinking", "quota_exhausted", 60_000);
  assert.equal(
    await isPinnedTargetModelScopedUnusable({
      target,
      comboName: "test-combo",
      body: BODY,
      resilienceSettings,
    }),
    true
  );

  // 3. Provider circuit breaker OPEN -> false (not model-scoped)
  const cb = getCircuitBreaker("antigravity", { failureThreshold: 1, resetTimeout: 60000 });
  try {
    await cb.execute(async () => {
      throw new Error("503");
    });
  } catch {}
  assert.equal(
    await isPinnedTargetModelScopedUnusable({
      target,
      comboName: "test-combo",
      body: BODY,
      resilienceSettings,
    }),
    false
  );

  // Reset breaker, test provider cooldown. Since #12247 the global provider
  // cooldown honors the PROVIDER_PROFILES window gate: the provider only counts
  // as cooling after providerFailureThreshold failures inside the window.
  cb.reset();
  for (let i = 0; i < PROVIDER_PROFILES.oauth.providerFailureThreshold; i++) {
    recordProviderCooldown("antigravity", undefined, resilienceSettings);
  }
  assert.equal(
    await isPinnedTargetModelScopedUnusable({
      target,
      comboName: "test-combo",
      body: BODY,
      resilienceSettings,
    }),
    false
  );
});

test("areAllPinnedTargetsModelScopedUnusable returns true only when all candidates are model-scoped unusable", async () => {
  clearAllModelLockouts();
  clearCooldownState();
  resetAllCircuitBreakers();

  const target1 = makeTarget("conn-1", "antigravity/claude-opus-4-6-thinking", "antigravity");
  const target2 = makeTarget("conn-2", "antigravity/claude-opus-4-6-thinking", "antigravity");

  // Both healthy -> false
  assert.equal(
    await areAllPinnedTargetsModelScopedUnusable({
      pinnedTargets: [target1, target2],
      comboName: "test-combo",
      body: BODY,
    }),
    false
  );

  // Only target1 locked -> false
  lockExactModel("antigravity", "conn-1", "claude-opus-4-6-thinking", "quota_exhausted", 60_000);
  assert.equal(
    await areAllPinnedTargetsModelScopedUnusable({
      pinnedTargets: [target1, target2],
      comboName: "test-combo",
      body: BODY,
    }),
    false
  );

  // Both locked -> true
  lockExactModel("antigravity", "conn-2", "claude-opus-4-6-thinking", "quota_exhausted", 60_000);
  assert.equal(
    await areAllPinnedTargetsModelScopedUnusable({
      pinnedTargets: [target1, target2],
      comboName: "test-combo",
      body: BODY,
    }),
    true
  );
});
