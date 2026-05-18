import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";

const { getCopilotMode, extractAccessToken, sessionPoolKey } =
  await import("../../open-sse/executors/copilot-web.ts");

test("getCopilotMode maps known models to their Copilot modes", () => {
  assert.equal(getCopilotMode("copilot"), "chat");
  assert.equal(getCopilotMode("gpt-4o"), "chat");
  assert.equal(getCopilotMode("copilot-think"), "reasoning");
  assert.equal(getCopilotMode("o1"), "reasoning");
  assert.equal(getCopilotMode("copilot-smart"), "smart");
  assert.equal(getCopilotMode("gpt-5"), "smart");
});

test("getCopilotMode defaults to chat for unknown or missing models", () => {
  assert.equal(getCopilotMode("unknown-model"), "chat");
  assert.equal(getCopilotMode(undefined), "chat");
  assert.equal(getCopilotMode(""), "chat");
});

test("getCopilotMode is case-insensitive", () => {
  assert.equal(getCopilotMode("GPT-4O"), "chat");
  assert.equal(getCopilotMode("Copilot-Think"), "reasoning");
});

test("extractAccessToken returns direct JWT tokens", () => {
  const jwt = "eyJhbGciOiJSUzI1NiJ9." + "x".repeat(200);
  assert.equal(extractAccessToken(jwt), jwt);
});

test("extractAccessToken extracts token from cookie string", () => {
  const token = "abc123token";
  assert.equal(extractAccessToken(`session=xyz; access_token=${token}; other=1`), token);
});

test("extractAccessToken extracts Bearer token from Authorization header", () => {
  const token = "my-bearer-token";
  assert.equal(extractAccessToken(`Bearer ${token}`), token);
});

test("extractAccessToken returns null for empty input", () => {
  assert.equal(extractAccessToken(""), null);
});

test("sessionPoolKey produces unique keys per token preventing session sharing", () => {
  const key1 = sessionPoolKey("token-user-alice");
  const key2 = sessionPoolKey("token-user-bob");
  assert.notEqual(key1, key2);
});

test("sessionPoolKey is deterministic for same token", () => {
  const token = "stable-access-token";
  assert.equal(sessionPoolKey(token), sessionPoolKey(token));
});

test("sessionPoolKey for undefined returns 'anonymous'", () => {
  assert.equal(sessionPoolKey(undefined), "anonymous");
  assert.equal(sessionPoolKey(), "anonymous");
});

test("sessionPoolKey never returns 'default' (security regression guard)", () => {
  assert.notEqual(sessionPoolKey("any-token"), "default");
  assert.notEqual(sessionPoolKey(undefined), "default");
});

test("sessionPoolKey is a 16-char hex prefix of sha256", () => {
  const token = "test-token";
  const expected = createHash("sha256").update(token).digest("hex").slice(0, 16);
  assert.equal(sessionPoolKey(token), expected);
  assert.match(sessionPoolKey(token), /^[0-9a-f]{16}$/);
});
