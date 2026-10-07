// Regression for #15149: the semantic-cache signature folded the output contract
// (response_format/tools/tool_choice — #12307/#12734) but not generation params
// (reasoning.effort, max_tokens, top_k, seed, stop, penalties, logit_bias), so two
// temperature=0 requests with identical messages but different effort levels or token
// limits collided on the same cache entry and the second was served the first's
// response verbatim under `x-omniroute-cache: HIT`. Generation params are now
// extracted by outputContractOf — so the legacy signature AND the Layer-1 direct
// hash both fold them — while bodies carrying none keep the byte-identical legacy
// key, preserving existing plain-chat cache entries.
import test from "node:test";
import assert from "node:assert/strict";

const { generateSignature, outputContractOf } = await import("../../src/lib/semanticCache.ts");
const { generateDirectHash } =
  await import("../../open-sse/services/cache/semanticCacheManager.ts");

const MESSAGES = [{ role: "user", content: "Solve 2+2." }];

const sig = (body: Record<string, unknown>) =>
  generateSignature("m", MESSAGES, 0, 1, "key", outputContractOf(body));

test("#15149 repro: different reasoning.effort over identical messages produce different signatures", () => {
  assert.notEqual(sig({ reasoning: { effort: "none" } }), sig({ reasoning: { effort: "max" } }));
});

test("reasoning.effort splits the signature from a request without reasoning", () => {
  assert.notEqual(sig({ reasoning: { effort: "max" } }), sig({}));
});

test("different max_tokens produce different signatures, and split from an absent max_tokens", () => {
  assert.notEqual(sig({ max_tokens: 1500 }), sig({ max_tokens: 800 }));
  assert.notEqual(sig({ max_tokens: 1500 }), sig({}));
});

test("every generation param named in #15149 splits the signature from plain chat", () => {
  const plain = sig({});
  for (const param of [
    { reasoning_effort: "high" },
    { max_completion_tokens: 1500 },
    { top_k: 40 },
    { seed: 7 },
    { stop: ["\n\n"] },
    { presence_penalty: 0.5 },
    { frequency_penalty: 0.5 },
    { logit_bias: { "50256": -100 } },
  ]) {
    assert.notEqual(sig(param), plain, `${JSON.stringify(param)} must not collide with plain chat`);
  }
});

test("Layer-1 direct hash folds generation params too (manager lookup/store path)", () => {
  const hash = (body: Record<string, unknown>) =>
    generateDirectHash("m", MESSAGES, 0, 1, { apiKeyId: "key" }, outputContractOf(body));
  assert.notEqual(hash({ reasoning: { effort: "none" } }), hash({ reasoning: { effort: "max" } }));
  assert.notEqual(hash({ max_tokens: 1500 }), hash({}));
});

test("plain chat keeps the legacy signature — existing cache entries stay valid", () => {
  assert.equal(
    generateSignature("m", MESSAGES, 0, 1, "key"),
    sig({ stream: true, user: "u", model: "m", temperature: 0 })
  );
});

test("outputContractOf returns null when no signature-determining field is present", () => {
  assert.equal(outputContractOf({ model: "m", messages: MESSAGES, temperature: 0 }), null);
});
