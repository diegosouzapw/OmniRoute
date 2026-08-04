/**
 * LEDGER-6 (#3821-review) — the chatCore modularization (#3598) relocated ~300 lines into
 * open-sse/handlers/chatCore/{idempotency,sanitization,semanticCache,memorySkillsInjection}.ts
 * with no direct tests at the new seam. The extraction shipped a real `ReferenceError`
 * (idempotencyKey) that no test caught. These tests pin the pure/extractable pieces:
 *  - sanitizeChatRequestBody (token-field normalization, empty-name stripping, tool filter)
 *  - checkIdempotencyCache now returns { hit, idempotencyKey } so the save site reuses the
 *    single derivation (no dual getIdempotencyKey call).
 */
import test from "node:test";
import assert from "node:assert/strict";

import { sanitizeChatRequestBody } from "../../open-sse/handlers/chatCore/sanitization.ts";
import {
  checkIdempotencyCache,
  composeIdempotencyKey,
} from "../../open-sse/handlers/chatCore/idempotency.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { saveIdempotency } from "../../src/lib/idempotencyLayer.ts";

test("sanitizeChatRequestBody: Chat Completions target maps max_output_tokens → max_tokens", () => {
  const out = sanitizeChatRequestBody({ max_output_tokens: 256 }, FORMATS.OPENAI, FORMATS.OPENAI);
  assert.equal(out.max_tokens, 256);
  assert.equal(out.max_output_tokens, undefined);
});

test("sanitizeChatRequestBody: Responses target maps max_completion_tokens → max_output_tokens", () => {
  const out = sanitizeChatRequestBody(
    { max_completion_tokens: 512 },
    FORMATS.OPENAI,
    FORMATS.OPENAI_RESPONSES
  );
  assert.equal(out.max_output_tokens, 512);
  assert.equal(out.max_completion_tokens, undefined);
});

test("sanitizeChatRequestBody: Responses target maps max_tokens → max_output_tokens", () => {
  const out = sanitizeChatRequestBody({ max_tokens: 128 }, FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI);
  assert.equal(out.max_output_tokens, 128);
  assert.equal(out.max_tokens, undefined);
});

test("sanitizeChatRequestBody: strips empty message name and filters nameless tools", () => {
  const out = sanitizeChatRequestBody(
    {
      messages: [
        { role: "user", content: "hi", name: "" },
        { role: "assistant", content: "yo", name: "keepme" },
      ],
      tools: [
        { type: "function", function: { name: "real_tool", parameters: {} } },
        { type: "function", function: { name: "" } }, // dropped — empty name
        { type: "function", function: {} }, // dropped — no name
      ],
    },
    FORMATS.OPENAI,
    FORMATS.OPENAI
  );

  const messages = out.messages as Array<Record<string, unknown>>;
  assert.ok(!("name" in messages[0]), "empty name stripped");
  assert.equal(messages[1].name, "keepme", "non-empty name kept");

  const tools = out.tools as Array<Record<string, unknown>>;
  assert.equal(tools.length, 1, "only the named tool survives");
  assert.equal((tools[0].function as Record<string, unknown>).name, "real_tool");
});

test("checkIdempotencyCache returns { hit:null, idempotencyKey } on a miss", async () => {
  const headers = new Headers({ "idempotency-key": "idem-miss-3821" });
  const result = await checkIdempotencyCache({
    clientRawRequest: { headers },
    provider: "openai",
    model: "gpt-4.1",
    effectiveServiceTier: undefined,
    startTime: 0,
    log: undefined,
  });
  assert.equal(result.hit, null);
  // #6558: the raw header key is now namespaced by provider/model + a messages
  // digest (composeIdempotencyKey) so fusion panel/judge sub-requests can't collide.
  assert.equal(
    result.idempotencyKey,
    composeIdempotencyKey({
      rawKey: "idem-miss-3821",
      provider: "openai",
      model: "gpt-4.1",
      messages: undefined,
    })
  );
});

test("checkIdempotencyCache returns a hit Response reusing the same key after a save", async () => {
  const rawKey = "idem-hit-3821";
  // #6558: the store is keyed by the COMPOSED key, so the save site saves under the
  // same derivation checkIdempotencyCache returns — reproduce that here.
  const key = composeIdempotencyKey({
    rawKey,
    provider: "openai",
    model: "gpt-4.1",
    messages: undefined,
  })!;
  saveIdempotency(key, { object: "chat.completion", choices: [], usage: {} }, 200);

  const headers = new Headers({ "idempotency-key": rawKey });
  const result = await checkIdempotencyCache({
    clientRawRequest: { headers },
    provider: "openai",
    model: "gpt-4.1",
    effectiveServiceTier: undefined,
    startTime: 0,
    log: undefined,
  });

  assert.equal(result.idempotencyKey, key, "the resolved key is returned for the save site to reuse");
  assert.ok(result.hit, "a cached entry produces a hit");
  assert.equal(result.hit!.response.headers.get("X-OmniRoute-Idempotent"), "true");
});

test("checkIdempotencyCache resolves a null key when no idempotency headers are present", async () => {
  const result = await checkIdempotencyCache({
    clientRawRequest: { headers: new Headers() },
    provider: "openai",
    model: "gpt-4.1",
    effectiveServiceTier: undefined,
    startTime: 0,
    log: undefined,
  });
  assert.equal(result.hit, null);
  assert.equal(result.idempotencyKey, null);
});
