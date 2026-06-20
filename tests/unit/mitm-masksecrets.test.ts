import test from "node:test";
import assert from "node:assert/strict";
import { maskSecret } from "../../src/mitm/maskSecrets.ts";

test("maskSecret — Bearer token is masked", () => {
  const input = "authorization: Bearer sk-proj-abcdefghijklmnop";
  const result = maskSecret(input);
  assert.ok(result.includes("Bearer ***"), `Expected Bearer ***, got: ${result}`);
  assert.ok(!result.includes("sk-proj-abcdefghijklmnop"), "Should not contain original token");
});

test("maskSecret — sk- key is masked with prefix and suffix", () => {
  const input = "sk-abcdefghijklmnopqrstuvwxyz123456";
  const result = maskSecret(input);
  assert.ok(result.startsWith("sk-abc"), `Expected prefix sk-abc, got: ${result}`);
  assert.ok(result.endsWith("…56"), `Expected suffix …56, got: ${result}`);
  assert.ok(!result.includes("ghijklmnopqrstuvwxyz1234"), "Middle chars should be redacted");
});

test("maskSecret — ak- key is masked", () => {
  const input = "ak-1234567890abcdefghijklmnop";
  const result = maskSecret(input);
  assert.ok(result.startsWith("ak-123"));
  assert.ok(result.endsWith("…op"));
});

test("maskSecret — pk- key is masked", () => {
  const input = "pk-supersecretkeywithmorethan16chars";
  const result = maskSecret(input);
  assert.ok(result.startsWith("pk-sup"));
  assert.ok(result.endsWith("…rs"));
});

test("maskSecret — long opaque token (≥40 chars) is masked", () => {
  const longToken = "A".repeat(40);
  const result = maskSecret(longToken);
  assert.ok(result.startsWith("AAAA"));
  assert.ok(result.endsWith("…AA"));
  assert.ok(result.length < longToken.length);
});

test("maskSecret — string without secrets is unchanged", () => {
  const safe = "Content-Type: application/json";
  assert.equal(maskSecret(safe), safe);
});

test("maskSecret — multiple secrets in same string", () => {
  const input = "sk-abcdefghijklmnopqrstuvwxyz12345678 and pk-qwertyuiopasdfghjklzxcvbnm12345";
  const result = maskSecret(input);
  assert.ok(!result.includes("abcdefghijklmno"));
  assert.ok(!result.includes("qwertyuiopasdfg"));
});

test("maskSecret — secrets embedded in quoted strings", () => {
  const input = `"api_key": "sk-abcdefghijklmnopqrstuvwxyz12345678"`;
  const result = maskSecret(input);
  assert.ok(!result.includes("abcdefghijklmno"));
});

test("maskSecret — short sk- key below 16 chars is NOT masked", () => {
  const shortKey = "sk-shortkey";
  assert.equal(maskSecret(shortKey), shortKey);
});

// Regression: sanitizeHeaders() masks header *values* ("Bearer <token>" with the
// "authorization:" key already stripped). The previous prefix-anchored BEARER
// regex never fired there, so short/opaque-<40 Bearer tokens leaked into the
// Traffic Inspector (found by the AgentBridge live capture).
test("maskSecret — Bearer token in a bare header value (no authorization: prefix) is masked", () => {
  const result = maskSecret("Bearer sk-secret-TESTE");
  assert.equal(result, "Bearer ***");
});

test("maskSecret — a short opaque Bearer token is still masked", () => {
  assert.equal(maskSecret("Bearer abc123"), "Bearer ***");
});

test("maskSecret — a realistic Google OAuth Bearer value is masked whole", () => {
  const result = maskSecret("Bearer ya29.a0AfH6SMxLONGTOKEN_1234567890-abcdefghij");
  assert.equal(result, "Bearer ***");
  assert.ok(!result.includes("LONGTOKEN"), "no part of the token should survive");
});

test("maskSecret — 'authorization: Bearer <token>' still masks (no regression)", () => {
  const result = maskSecret("authorization: Bearer sk-proj-abcdefghijklmnop");
  assert.ok(result.startsWith("authorization: Bearer ***"), `got: ${result}`);
  assert.ok(!result.includes("abcdefghijklmnop"));
});
