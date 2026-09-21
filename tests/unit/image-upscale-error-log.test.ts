/**
 * LEDGER-22 / LEDGER-37 (omni-code-review, release/v3.8.51 vs main):
 * the `/v1/images/upscale` call-log sink must render `error: unknown` through the
 * same total, credential-redacting stringifier the generation sink uses — never a
 * bare `String(opts.error)`.
 *
 *   - `String(Object.create(null))` throws `TypeError: Cannot convert object to
 *     primitive value`, so a provider forwarding a `sanitizeUpstreamDetails()`
 *     payload (null-prototype on purpose, #12506) turned a handled failure into an
 *     unhandled crash.
 *   - An `Error` whose message carries an Authorization header value must reach the
 *     log with the credential masked.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-upscale-errlog-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { stringifyImageErrorForLog } = await import("../../open-sse/handlers/imageErrorLog.ts");
const { saveUpscaleErrorResult } = await import("../../open-sse/handlers/imageUpscale/shared.ts");
const { getCallLogs, waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");

const SECRET = "sk-live-ZmFrZXNlY3JldDEyMzQ1Njc4OTBhYmNkZWY";
const AUTH_MESSAGE = `upstream rejected header Authorization: Bearer ${SECRET}`;

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ── stringifyImageErrorForLog ──────────────────────────────────────────────

test("stringifyImageErrorForLog masks an Authorization header value inside an Error", () => {
  const rendered = stringifyImageErrorForLog(new Error(AUTH_MESSAGE));
  assert.equal(typeof rendered, "string");
  assert.ok(rendered.startsWith("Error:"), `expected "Error: …" prefix, got ${rendered}`);
  assert.ok(!rendered.includes(SECRET), `credential leaked into log string: ${rendered}`);
  assert.ok(rendered.includes("[REDACTED]"), `expected a redaction marker, got ${rendered}`);
});

test("stringifyImageErrorForLog masks an Authorization header value inside a plain string", () => {
  const rendered = stringifyImageErrorForLog(AUTH_MESSAGE);
  assert.ok(!rendered.includes(SECRET), `credential leaked into log string: ${rendered}`);
  assert.ok(rendered.includes("[REDACTED]"));
});

test("stringifyImageErrorForLog serializes a null-prototype object instead of throwing", () => {
  const payload = Object.create(null) as Record<string, unknown>;
  payload.code = "upstream_error";
  payload.message = "provider rejected the upscale";
  assert.throws(() => String(payload), TypeError, "precondition: String() must throw here");

  const rendered = stringifyImageErrorForLog(payload);
  assert.equal(
    rendered,
    JSON.stringify({ code: "upstream_error", message: "provider rejected the upscale" })
  );
});

test("stringifyImageErrorForLog keeps String() semantics for primitives and falls back on cycles", () => {
  assert.equal(stringifyImageErrorForLog(42), "42");
  assert.equal(stringifyImageErrorForLog(null), "null");
  assert.equal(stringifyImageErrorForLog(undefined), "undefined");

  const cyclic: Record<string, unknown> = { reason: "loop" };
  cyclic.self = cyclic;
  assert.equal(stringifyImageErrorForLog(cyclic), "[object Object]");

  const hostile = Object.create(null) as Record<string, unknown>;
  hostile.toJSON = () => {
    throw new Error("nope");
  };
  assert.equal(stringifyImageErrorForLog(hostile), "[unserializable error]");
});

// ── saveUpscaleErrorResult (the call-log sink) ─────────────────────────────

test("saveUpscaleErrorResult does not crash on a null-prototype error payload", async () => {
  const payload = Object.create(null) as Record<string, unknown>;
  payload.code = "upstream_error";
  payload.message = "null-proto upscale failure";

  const provider = "upscale-nullproto-ledger22";
  let result: ReturnType<typeof saveUpscaleErrorResult> | undefined;
  assert.doesNotThrow(() => {
    result = saveUpscaleErrorResult({
      provider,
      model: "fast",
      status: 502,
      startTime: Date.now(),
      error: payload,
    });
  });
  assert.ok(result);
  assert.equal(result.success, false);
  assert.equal(result.status, 502);
  assert.equal(result.error, payload, "the caller-facing result keeps the original error");

  assert.ok(await waitForCallLogSaves(60_000), "call-log save did not settle");
  const logs = await getCallLogs({ provider, limit: 5 });
  assert.equal(logs.length, 1, "the sink must still persist the call log");
  assert.equal(typeof logs[0].error, "string");
  assert.ok(logs[0].error.includes("null-proto upscale failure"), `got ${logs[0].error}`);
});

test("saveUpscaleErrorResult persists an Error carrying an Authorization value masked", async () => {
  const provider = "upscale-auth-ledger37";
  saveUpscaleErrorResult({
    provider,
    model: "conservative",
    status: 401,
    startTime: Date.now(),
    error: new Error(AUTH_MESSAGE),
  });

  assert.ok(await waitForCallLogSaves(60_000), "call-log save did not settle");
  const logs = await getCallLogs({ provider, limit: 5 });
  assert.equal(logs.length, 1);
  assert.equal(typeof logs[0].error, "string");
  assert.ok(!logs[0].error.includes(SECRET), `credential persisted in call log: ${logs[0].error}`);
  assert.ok(logs[0].error.startsWith("Error:"), `expected "Error: …" prefix, got ${logs[0].error}`);
});
