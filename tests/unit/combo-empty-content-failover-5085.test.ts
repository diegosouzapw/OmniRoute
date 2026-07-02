/**
 * #5085 — A multi-leg combo whose first leg returns a 502 "Provider returned
 * empty content" must FAIL OVER to the next leg within the same request, not
 * surface the 502 to the caller. An empty completion is a fake-success failure
 * (HTTP 200 with no content → rewritten to 502 in chatCore), and for a combo
 * whose whole purpose is resilience it should behave like any other transient
 * leg failure and advance.
 *
 * Reproduction: a `priority` combo with two legs on DIFFERENT providers. Leg 1
 * returns the empty-content 502 (exactly the body buildErrorBody produces in
 * chatCore's isEmptyContentResponse branch); leg 2 returns a healthy 200. The
 * combo must try leg 2 and surface its 200 — never return the leg-1 502.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-5085-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-5085-test-secret";

const { handleComboChat } = await import("../../open-sse/services/combo.ts");

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

// Mirrors chatCore's empty-content branch: buildErrorBody(502, "Provider returned empty content").
function emptyContent502() {
  return new Response(
    JSON.stringify({ error: { message: "Provider returned empty content", type: "bad_gateway" } }),
    { status: 502, headers: { "Content-Type": "application/json" } }
  );
}

function healthy200(model: string) {
  return new Response(
    JSON.stringify({
      id: "ok",
      object: "chat.completion",
      model,
      choices: [{ index: 0, message: { role: "assistant", content: "hello from " + model }, finish_reason: "stop" }],
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

function makeCombo(models: string[]) {
  return {
    name: "test-combo-5085",
    strategy: "priority",
    models: models.map((m) => ({ model: m })),
  };
}

test("#5085 combo fails over to the next leg when leg 1 returns empty-content 502", async () => {
  const modelsCalled: string[] = [];
  const handleSingleModel = async (_body: unknown, modelStr: string) => {
    modelsCalled.push(modelStr);
    // First leg (different provider) returns the empty-content 502; second leg is healthy.
    if (modelsCalled.length === 1) return emptyContent502();
    return healthy200(modelStr);
  };

  const result = await handleComboChat({
    body: { model: "test", messages: [{ role: "user", content: "hi" }] },
    combo: makeCombo(["nvidia/minimaxai/minimax-m3", "openai/gpt-4o-mini"]),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  assert.equal(
    modelsCalled.length,
    2,
    `empty-content 502 on leg 1 must advance to leg 2, but tried: ${modelsCalled.join(", ")}`
  );
  assert.equal(
    result.status,
    200,
    "the combo must surface the healthy second leg's 200, not the leg-1 empty-content 502"
  );
});

// ── Precise unit test of the exhaustion classifier ──────────────────────────
// The integration test above already passes because the empty-content leg and
// the healthy leg are on different providers. The real defect is provider-level:
// an empty-content 502 is currently classified as a CONNECTION-level failure
// (502 ∈ CONNECTION_LEVEL_ERROR_STATUSES), which marks the whole provider/
// connection exhausted and skips every REMAINING SAME-PROVIDER leg (#1731v2).
// An empty completion arrived on a HEALTHY connection (HTTP 200, no content) and
// must not be treated as a bad connection.
const { applyComboTargetExhaustion } = await import("../../open-sse/services/combo/targetExhaustion.ts");

function makeTarget(provider: string, modelStr: string, connectionId: string | null = null) {
  return {
    kind: "model" as const,
    stepId: "s",
    executionKey: "e",
    modelStr,
    provider,
    providerId: provider,
    connectionId,
    weight: 1,
    label: null,
  };
}

function freshSets() {
  return {
    exhaustedProviders: new Set<string>(),
    exhaustedConnections: new Set<string>(),
    transientRateLimitedProviders: new Set<string>(),
  };
}

test("#5085 empty-content 502 must NOT mark the provider/connection exhausted (model-level, not connection-level)", () => {
  const sets = freshSets();
  const providerExhausted = applyComboTargetExhaustion(makeTarget("nvidia", "nvidia/minimaxai/minimax-m3"), {
    result: { status: 502, headers: new Headers() },
    fallbackResult: { reason: "server_error" },
    errorText: "Provider returned empty content",
    rawModel: "minimaxai/minimax-m3",
    isTokenLimitBreach: false,
    allAccountsRateLimited: false,
    sets,
    log,
    tag: "COMBO",
    exhaustedLogLevel: "info",
  });

  assert.equal(providerExhausted, false, "empty-content is not a quota exhaustion");
  assert.equal(
    sets.exhaustedProviders.has("nvidia"),
    false,
    "empty-content 502 must NOT mark the whole provider exhausted — remaining same-provider legs must still be tried"
  );
});

test("#5085 a real connection-level 502 (gateway error) STILL marks the provider exhausted", () => {
  const sets = freshSets();
  applyComboTargetExhaustion(makeTarget("nvidia", "nvidia/minimaxai/minimax-m3"), {
    result: { status: 502, headers: new Headers() },
    fallbackResult: { reason: "server_error" },
    errorText: "Bad gateway: upstream connection reset",
    rawModel: "minimaxai/minimax-m3",
    isTokenLimitBreach: false,
    allAccountsRateLimited: false,
    sets,
    log,
    tag: "COMBO",
    exhaustedLogLevel: "info",
  });

  assert.equal(
    sets.exhaustedProviders.has("nvidia"),
    true,
    "a genuine gateway 502 must still mark the provider connection-exhausted (#1731v2 preserved)"
  );
});
