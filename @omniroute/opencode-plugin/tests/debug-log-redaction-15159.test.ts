// Regression guard for audit #15159 O-05: the OpenCode plugin's debug log wrote
// the raw `Authorization` header — and every other credential-bearing header — to
// disk as plaintext JSONL, contradicting the AES-256-GCM-at-rest guarantee.
//
// The leak path is createDebugLoggingFetch(), which copies every request and
// response header verbatim into the entry, and debugLogAppend(), which writes that
// entry to disk unredacted. `features.debugLog` defaults to false, which limits the
// exposure but does not remove it: once an operator enables it, every captured
// request persists a live bearer token on disk.
//
// These tests assert the property the audit names: the JSONL on disk never contains
// the api key. They assert on the raw file bytes (not the parsed entry) so a
// redaction that only happens on read cannot pass them.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-o05-"));
// debugLogDir() resolves OPENCODE_DATA_DIR lazily on every call, so this only needs
// to be set before the first append — no import-order gymnastics required.
process.env.OPENCODE_DATA_DIR = TEST_DATA_DIR;

const { createDebugLoggingFetch, debugLogAppend, debugLogRead, debugLogClear } =
  await import("../src/index.ts");

const SECRET = "sk-live-DO-NOT-LOG-15159";
const COOKIE_SECRET = "session=SESSIONVALUE15159";

/** Raw JSONL bytes for a provider — the real artifact that leaks to disk. */
function readRawLog(providerId: string): string {
  const p = path.join(TEST_DATA_DIR, "plugins", `omniroute-debug-${providerId}.jsonl`);
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "";
}

function assertNoSecrets(raw: string): void {
  assert.ok(!raw.includes(SECRET), `debug log leaked the api key:\n${raw}`);
  assert.ok(!raw.includes(COOKIE_SECRET), `debug log leaked a cookie:\n${raw}`);
}

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("O-05: createDebugLoggingFetch never persists the Authorization header to disk", async () => {
  const providerId = "o05-request-headers";
  debugLogClear(providerId);

  const inner: typeof fetch = async () =>
    new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  const wrapped = createDebugLoggingFetch(inner, providerId, true);

  await wrapped("https://api.example.com/v1/chat/completions", {
    method: "POST",
    headers: {
      authorization: `Bearer ${SECRET}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ model: "gpt-4o", messages: [] }),
  });

  const raw = readRawLog(providerId);
  assert.ok(raw.length > 0, "expected a debug log entry to be written");
  assertNoSecrets(raw);

  const [entry] = debugLogRead(providerId, 1);
  assert.equal(entry.reqHeaders.authorization, "[REDACTED]");
  // The log must stay useful for debugging: non-sensitive headers survive.
  assert.equal(entry.reqHeaders["content-type"], "application/json");
  assert.equal(entry.method, "POST");
  assert.equal(entry.resStatus, 200);
});

test("O-05: response headers are redacted too (set-cookie)", async () => {
  const providerId = "o05-response-headers";
  debugLogClear(providerId);

  const inner: typeof fetch = async () =>
    new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "set-cookie": COOKIE_SECRET,
      },
    });
  const wrapped = createDebugLoggingFetch(inner, providerId, true);

  await wrapped("https://api.example.com/v1/models", { method: "GET" });

  const raw = readRawLog(providerId);
  assert.ok(raw.length > 0, "expected a debug log entry to be written");
  assertNoSecrets(raw);

  const [entry] = debugLogRead(providerId, 1);
  assert.equal(entry.resHeaders["set-cookie"], "[REDACTED]");
  assert.equal(entry.resHeaders["content-type"], "application/json");
});

test("O-05: cookie, x-api-key and token/secret/key-shaped headers are all redacted", () => {
  const providerId = "o05-header-shapes";
  debugLogClear(providerId);

  debugLogAppend({
    reqId: "req-shapes",
    providerId,
    ts: 1700000000000,
    url: "https://api.example.com/v1/chat",
    method: "POST",
    reqHeaders: {
      authorization: `Bearer ${SECRET}`,
      cookie: COOKIE_SECRET,
      "x-api-key": SECRET,
      "x-session-token": SECRET,
      "x-client-secret": SECRET,
      "x-idempotency-key": "idem-123",
      "content-type": "application/json",
      accept: "application/json",
    },
    reqBody: { model: "gpt-4o" },
    resStatus: 200,
    resHeaders: { "content-type": "application/json" },
    resBody: { choices: [] },
    durationMs: 12,
  });

  const raw = readRawLog(providerId);
  assert.ok(raw.length > 0, "expected a debug log entry to be written");
  assertNoSecrets(raw);

  const [entry] = debugLogRead(providerId, 1);
  for (const header of [
    "authorization",
    "cookie",
    "x-api-key",
    "x-session-token",
    "x-client-secret",
    "x-idempotency-key",
  ]) {
    assert.equal(entry.reqHeaders[header], "[REDACTED]", `header not redacted: ${header}`);
  }
  // Harmless headers must pass through untouched.
  assert.equal(entry.reqHeaders["content-type"], "application/json");
  assert.equal(entry.reqHeaders.accept, "application/json");
});

test("O-05: redaction is case-insensitive and preserves the original header name", () => {
  const providerId = "o05-case";
  debugLogClear(providerId);

  debugLogAppend({
    reqId: "req-case",
    providerId,
    ts: 1700000000000,
    url: "https://api.example.com/v1/chat",
    method: "POST",
    // fetch normalizes header names to lowercase, but entries can also be appended
    // directly, so the matcher must not depend on casing.
    reqHeaders: { Authorization: `Bearer ${SECRET}`, "X-Api-Key": SECRET },
    reqBody: undefined,
    resStatus: null,
    resHeaders: {},
    resBody: undefined,
    durationMs: null,
  });

  const raw = readRawLog(providerId);
  assertNoSecrets(raw);

  const [entry] = debugLogRead(providerId, 1);
  assert.equal(entry.reqHeaders.Authorization, "[REDACTED]");
  assert.equal(entry.reqHeaders["X-Api-Key"], "[REDACTED]");
});

test("O-05: the error field is scrubbed too (upstream echoes the rejected credential)", async () => {
  const providerId = "o05-error-path";
  debugLogClear(providerId);

  // The realistic shape: an upstream 401 that quotes back the credential it
  // rejected. This vector is NOT in the audit's header list — the error field is
  // a second plaintext path into the same JSONL line.
  const inner: typeof fetch = async () => {
    throw new Error(
      `request failed: invalid Authorization: Bearer ${SECRET} (api_key=${SECRET}) for https://user:${SECRET}@api.example.com/v1/chat`
    );
  };
  const wrapped = createDebugLoggingFetch(inner, providerId, true);

  await assert.rejects(
    () =>
      wrapped("https://api.example.com/v1/chat", {
        method: "POST",
        headers: { authorization: `Bearer ${SECRET}` },
      }),
    /request failed/
  );

  const raw = readRawLog(providerId);
  assert.ok(raw.length > 0, "expected a debug log entry for the failed request");
  assertNoSecrets(raw);

  const [entry] = debugLogRead(providerId, 1);
  assert.equal(entry.reqHeaders.authorization, "[REDACTED]");
  assert.equal(entry.resStatus, null);
  // The message must stay diagnosable — only the credential values are gone.
  assert.match(entry.error ?? "", /request failed/);
  assert.match(entry.error ?? "", /invalid Authorization/);
  assert.match(entry.error ?? "", /api\.example\.com/);
  assert.match(entry.error ?? "", /\[REDACTED\]/);
});
