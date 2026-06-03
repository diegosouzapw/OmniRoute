import test from "node:test";
import assert from "node:assert/strict";

const { getCopilotMode, extractAccessToken, sessionPoolKey, solveHashcash } =
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

test("sessionPoolKey returns the token verbatim for any non-empty input", () => {
  // After CodeQL #245/#246/#247: we no longer hash the token at all (any hash
  // of a credential-named parameter re-triggers js/insufficient-password-hash,
  // and bcrypt/scrypt/argon2 would be inappropriate for a high-entropy bearer
  // used only as an in-memory Map key). The Map is bounded by MAX_POOL_SIZE
  // with LRU eviction, and the token is already held in CopilotSession.cookies
  // for each entry — so keying the Map by the token itself exposes nothing
  // the process did not already hold.
  assert.equal(sessionPoolKey("test-token"), "test-token");
  assert.equal(sessionPoolKey("a"), "a");
  assert.equal(sessionPoolKey("x".repeat(1024)), "x".repeat(1024));
});

test("sessionPoolKey treats an empty string the same as undefined", () => {
  assert.equal(sessionPoolKey(""), "anonymous");
});

test("sessionPoolKey output is not a SHA-256 prefix of the token (regression guard)", () => {
  // If anyone re-introduces createHash/createHmac on the token, the alert
  // resurfaces — this guard catches it before CodeQL does.
  const token = "regression-guard-token";
  const plainSha256Prefix =
    "5dd8c5e63dbfd4ccb09362efce82bcc3f5d2bb37f8f1cce03f47d7e57b1b1ec3".slice(0, 16);
  assert.notEqual(sessionPoolKey(token), plainSha256Prefix);
});

// solveHashcash difficulty bounds — CodeQL js/resource-exhaustion #244 guard.
test("solveHashcash rejects out-of-range difficulty to avoid resource exhaustion", () => {
  // Negative, zero, fractional, NaN, Infinity, and >8 must short-circuit.
  assert.equal(solveHashcash("param", 0), null);
  assert.equal(solveHashcash("param", -1), null);
  assert.equal(solveHashcash("param", 1.5), null);
  assert.equal(solveHashcash("param", Number.NaN), null);
  assert.equal(solveHashcash("param", Number.POSITIVE_INFINITY), null);
  assert.equal(solveHashcash("param", 9), null);
  assert.equal(solveHashcash("param", 1_000_000), null);
});

test("solveHashcash succeeds for difficulty=1 (a single leading zero is common)", () => {
  // ~1 in 16 chance of leading "0" — well within the 10M iteration budget.
  const result = solveHashcash("any-parameter", 1);
  assert.ok(typeof result === "number" && result >= 0, "expected a numeric nonce");
});
