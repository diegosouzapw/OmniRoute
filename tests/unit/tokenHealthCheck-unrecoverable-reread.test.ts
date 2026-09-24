import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../..");
const src = await readFile(path.join(root, "src/lib/tokenHealthCheck.ts"), "utf8");

function unrecoverableSlice() {
  const idx = src.indexOf("if (isUnrecoverableRefreshError(result))");
  assert.ok(idx >= 0, "unrecoverable refresh branch must exist");
  return src.slice(idx, idx + 3500);
}

test("tokenHealthCheck_UnrecoverableRefresh_RereadsConnectionUncached", () => {
  const slice = unrecoverableSlice();
  assert.match(
    slice,
    /getProviderConnectionById\(/,
    "a concurrent Layer 2 persist can land between the sweep snapshot and invalid_grant; the cached row still holds the consumed refresh token and would skip the changed-since-sweep guard"
  );
  assert.doesNotMatch(
    slice,
    /getCachedProviderConnectionById/,
    "the 5s connection-by-id cache is how credentialsChangedSinceSweep missed the just-persisted rotation"
  );
});

test("tokenHealthCheck_UnrecoverableRefresh_DoesNotNullClaudeRefreshToken", () => {
  const slice = unrecoverableSlice();
  assert.match(
    slice,
    /shouldNullRefreshTokenAfterUnrecoverable/,
    "Claude rotating tokens must not be wiped on the first invalid_grant; the live access token plus the new refresh token in DB are still recoverable"
  );
  assert.doesNotMatch(
    slice,
    /\.\.\.\(isRotatingProvider\s*\?\s*\{\s*refreshToken:\s*null\s*\}\s*:\s*\{\}\)/,
    "the blanket rotating-provider null is what turns a dual-refresh race into sticky no_refresh_token"
  );
});

test("shouldNullRefreshTokenAfterUnrecoverable_Claude_IsFalse", async () => {
  const { shouldNullRefreshTokenAfterUnrecoverable, stopTokenHealthCheck } =
    await import("../../src/lib/tokenHealthCheck.ts");
  stopTokenHealthCheck();
  assert.equal(shouldNullRefreshTokenAfterUnrecoverable("claude"), false);
  assert.equal(shouldNullRefreshTokenAfterUnrecoverable("Claude"), false);
});

test("shouldNullRefreshTokenAfterUnrecoverable_Codex_IsTrue", async () => {
  const { shouldNullRefreshTokenAfterUnrecoverable, stopTokenHealthCheck } =
    await import("../../src/lib/tokenHealthCheck.ts");
  stopTokenHealthCheck();
  assert.equal(shouldNullRefreshTokenAfterUnrecoverable("codex"), true);
  assert.equal(shouldNullRefreshTokenAfterUnrecoverable("openai"), true);
});

test("shouldNullRefreshTokenAfterUnrecoverable_Google_IsFalse", async () => {
  const { shouldNullRefreshTokenAfterUnrecoverable, stopTokenHealthCheck } =
    await import("../../src/lib/tokenHealthCheck.ts");
  stopTokenHealthCheck();
  assert.equal(shouldNullRefreshTokenAfterUnrecoverable("gemini"), false);
  assert.equal(shouldNullRefreshTokenAfterUnrecoverable("antigravity"), false);
});
