import { test } from "node:test";
import assert from "node:assert/strict";

import { redactSecrets, redactLogArgs } from "../../src/shared/utils/logRedaction.ts";

test("redactSecrets removes Authorization: Bearer tokens", () => {
  const out = redactSecrets("upstream failed; Authorization: Bearer sk-abc123DEF456ghi789");
  assert.match(out, /Authorization: Bearer \[REDACTED\]/);
  assert.doesNotMatch(out, /sk-abc123/);
});

test("redactSecrets removes a bare bearer token", () => {
  const out = redactSecrets("header bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.payload.sig");
  assert.match(out, /Bearer \[REDACTED\]/i);
});

test("redactSecrets removes x-api-key values", () => {
  const out = redactSecrets("sent x-api-key: 9f8e7d6c5b4a3210ffff");
  assert.match(out, /x-api-key: \[REDACTED\]/i);
  assert.doesNotMatch(out, /9f8e7d6c/);
});

test("redactSecrets removes a Telegram bot token in a URL", () => {
  const out = redactSecrets("posting to https://api.telegram.org/bot123456789:AAExampleTokenValue_abcdEFGH/send");
  assert.match(out, /api\.telegram\.org\/bot\[REDACTED\]/);
  assert.doesNotMatch(out, /AAExampleTokenValue/);
});

test("redactSecrets removes sk- style API keys anywhere", () => {
  const out = redactSecrets("key=sk-proj-ABCDEFGHIJ1234567890 done");
  assert.match(out, /sk-\[REDACTED\]/);
  assert.doesNotMatch(out, /ABCDEFGHIJ1234567890/);
});

test("redactSecrets returns clean strings unchanged (same reference)", () => {
  const clean = "request completed in 42ms for model gpt-4o";
  assert.equal(redactSecrets(clean), clean);
});

test("redactSecrets is bounded on adversarial input (no catastrophic backtracking)", () => {
  const huge = "Authorization: Bearer " + "a".repeat(2_000_000);
  const start = Date.now();
  const out = redactSecrets(huge);
  assert.ok(Date.now() - start < 1000, "must not hang");
  assert.match(out, /\[REDACTED\]/);
});

test("redactLogArgs scrubs a string message argument", () => {
  const [msg] = redactLogArgs(["call failed: Authorization: Bearer sk-secret1234567890abcd"]);
  assert.doesNotMatch(String(msg), /sk-secret/);
  assert.match(String(msg), /\[REDACTED\]/);
});

test("redactLogArgs scrubs nested object string values", () => {
  const [obj] = redactLogArgs([
    { req: { headers: { authorization: "Bearer sk-deadbeefdeadbeef1234" } }, model: "gpt-4o" },
  ]) as [{ req: { headers: { authorization: string } }; model: string }];
  assert.doesNotMatch(obj.req.headers.authorization, /sk-deadbeef/);
  assert.match(obj.req.headers.authorization, /\[REDACTED\]/);
  assert.equal(obj.model, "gpt-4o", "non-secret fields are preserved");
});

test("redactLogArgs scrubs an Error's message and stack when a secret is present", () => {
  const err = new Error("connect failed with Authorization: Bearer sk-leakedKey1234567890");
  const [scrubbed] = redactLogArgs([err]) as [Error];
  assert.notEqual(scrubbed, err, "a secret-bearing error is replaced with a redacted clone");
  assert.ok(scrubbed instanceof Error, "the redacted view is still a real Error");
  assert.doesNotMatch(scrubbed.message, /sk-leakedKey/);
  assert.match(scrubbed.message, /\[REDACTED\]/);
  assert.doesNotMatch(String(scrubbed.stack), /sk-leakedKey/);
});

test("redactLogArgs leaves a clean Error untouched (preserves pino's serializer)", () => {
  const err = new Error("plain timeout after 30s");
  const [same] = redactLogArgs([err]);
  assert.equal(same, err, "no secret → original Error instance is returned unchanged");
});

test("redactLogArgs returns the original object when nothing was redacted (no allocation)", () => {
  const obj = { model: "gpt-4o", tokens: 42, nested: { a: "b" } };
  const [same] = redactLogArgs([obj]);
  assert.equal(same, obj, "clean object identity is preserved");
});

test("redactLogArgs survives circular references", () => {
  const a: Record<string, unknown> = { name: "a" };
  a.self = a;
  assert.doesNotThrow(() => redactLogArgs([a]));
});

test("redactLogArgs is bounded on huge/deep objects", () => {
  const deep: Record<string, unknown> = {};
  let cur = deep;
  for (let i = 0; i < 10_000; i++) {
    cur.next = { token: "Bearer sk-xxxxxxxxxxxxxxxx" };
    cur = cur.next as Record<string, unknown>;
  }
  const start = Date.now();
  assert.doesNotThrow(() => redactLogArgs([deep]));
  assert.ok(Date.now() - start < 1000, "must stay bounded on pathological structures");
});
