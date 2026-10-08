import test from "node:test";
import assert from "node:assert/strict";

// A 422 means the provider parsed the request and rejected its shape (Grok Build:
// `tools[0].type: unknown variant \`custom\``). Every account of that provider rejects
// the same body, so cooling the connection down only locks the account out for other
// clients. 422 fell to checkFallbackError's catch-all and got the transient cooldown;
// it is classified like the 400 request errors instead.

const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");
const { RateLimitReason } = await import("../../open-sse/config/constants.ts");
const { comboTargetDecision } =
  await import("../../open-sse/services/combo/statusDecisionTable.ts");

const GROK_CUSTOM_TOOL_422 =
  "Failed to deserialize the JSON body into the target type: tools[0].type: unknown variant " +
  "`custom`, expected one of `function`, `web_search`, `x_search`";

test("a 422 request-shape rejection does not cool the account down", () => {
  const res = checkFallbackError(422, GROK_CUSTOM_TOOL_422, 0, null, "grok-cli");
  assert.equal(res.shouldFallback, false);
  assert.equal(res.cooldownMs, 0);
});

test("a 422 carrying rate-limit text is still throttling", () => {
  const res = checkFallbackError(
    422,
    "Detected high-frequency non-compliant requests from you.",
    0,
    null,
    "mimocode"
  );
  assert.equal(res.shouldFallback, true);
  assert.equal(res.reason, RateLimitReason.RATE_LIMIT_EXCEEDED);
});

test("a 422 model-access rejection falls over without a cooldown", () => {
  const res = checkFallbackError(422, "The requested model is not supported", 0, null, "openai");
  assert.equal(res.shouldFallback, true);
  assert.equal(res.cooldownMs, 0);
});

test("combo routing still moves past a 422 to the next target", () => {
  assert.equal(comboTargetDecision(422, GROK_CUSTOM_TOOL_422), "advance");
});
