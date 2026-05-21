/**
 * Issue #2252 — BLACKBOX_WEB_VALIDATED_TOKEN env override + 403 detection.
 *
 * Blackbox's `/api/chat` rejects requests whose `validated` field doesn't
 * match the frontend `tk` token, even when the session cookie and
 * subscription are valid. These tests cover:
 *
 *   1. The new `resolveBlackboxValidatedToken()` helper:
 *      - env var wins over the random-UUID fallback
 *      - whitespace is trimmed
 *      - empty/whitespace-only env falls back to randomUUID
 *      - randomUUID fallback returns a well-formed UUID v4 shape
 *
 *   2. The 403 + token-specific error body should NOT be conflated with the
 *      generic "expired cookie" message. We assert by string-search on the
 *      executor source — the executor is hard to drive end-to-end in unit
 *      tests because it opens a streaming fetch against app.blackbox.ai.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const { resolveBlackboxValidatedToken } = await import("../../open-sse/executors/blackbox-web.ts");

const EXECUTOR_FILE = path.resolve("open-sse/executors/blackbox-web.ts");
const ORIGINAL_ENV = process.env.BLACKBOX_WEB_VALIDATED_TOKEN;

function restoreEnv() {
  if (ORIGINAL_ENV === undefined) {
    delete process.env.BLACKBOX_WEB_VALIDATED_TOKEN;
  } else {
    process.env.BLACKBOX_WEB_VALIDATED_TOKEN = ORIGINAL_ENV;
  }
}

test.after(restoreEnv);

test("#2252 — BLACKBOX_WEB_VALIDATED_TOKEN env var wins over random UUID", () => {
  process.env.BLACKBOX_WEB_VALIDATED_TOKEN = "stub-frontend-token-12345";
  try {
    assert.equal(resolveBlackboxValidatedToken(), "stub-frontend-token-12345");
  } finally {
    restoreEnv();
  }
});

test("#2252 — whitespace around the env value is trimmed", () => {
  process.env.BLACKBOX_WEB_VALIDATED_TOKEN = "   stub-with-spaces   ";
  try {
    assert.equal(resolveBlackboxValidatedToken(), "stub-with-spaces");
  } finally {
    restoreEnv();
  }
});

test("#2252 — empty env falls back to random UUID", () => {
  delete process.env.BLACKBOX_WEB_VALIDATED_TOKEN;
  const token = resolveBlackboxValidatedToken();
  // crypto.randomUUID() returns RFC 4122 v4 — 8-4-4-4-12 hex
  assert.match(token, /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
});

test("#2252 — whitespace-only env falls back to random UUID", () => {
  process.env.BLACKBOX_WEB_VALIDATED_TOKEN = "   ";
  try {
    const token = resolveBlackboxValidatedToken();
    assert.match(
      token,
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
  } finally {
    restoreEnv();
  }
});

test("#2252 — different random fallbacks return different tokens", () => {
  delete process.env.BLACKBOX_WEB_VALIDATED_TOKEN;
  const a = resolveBlackboxValidatedToken();
  const b = resolveBlackboxValidatedToken();
  assert.notEqual(a, b);
});

test("#2252 — executor uses resolveBlackboxValidatedToken in transformedBody", () => {
  const source = fs.readFileSync(EXECUTOR_FILE, "utf8");
  // The literal crypto.randomUUID() was replaced
  assert.doesNotMatch(
    source.split("transformedBody = {")[1]?.split("};")[0] ?? "",
    /validated: crypto\.randomUUID\(\)/,
    "transformedBody must call resolveBlackboxValidatedToken() instead of crypto.randomUUID() directly"
  );
  assert.match(source, /validated: resolveBlackboxValidatedToken\(\)/);
});

test("#2252 — 403 with token-specific body surfaces BLACKBOX_WEB_VALIDATED_TOKEN guidance", () => {
  const source = fs.readFileSync(EXECUTOR_FILE, "utf8");
  // The 403 disambiguation message must reference the env var so users know
  // exactly what to set.
  assert.match(source, /BLACKBOX_WEB_VALIDATED_TOKEN/);
  assert.match(source, /isBlackboxValidatedTokenError/);
});
