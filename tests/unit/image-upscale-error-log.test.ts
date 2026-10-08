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
import { fileURLToPath } from "node:url";

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

// ── imageGeneration.ts must not carry its own copy (LEDGER-22 follow-up) ──

test("imageGeneration.ts imports the shared stringifyImageErrorForLog instead of redefining it", () => {
  const handlerPath = fileURLToPath(
    new URL("../../open-sse/handlers/imageGeneration.ts", import.meta.url)
  );
  const source = fs.readFileSync(handlerPath, "utf8");
  assert.ok(
    !/^function stringifyImageErrorForLog\(/m.test(source),
    "imageGeneration.ts must not redefine stringifyImageErrorForLog — import it from ./imageErrorLog"
  );
  assert.ok(
    /import\s*\{[^}]*\bstringifyImageErrorForLog\b[^}]*\}\s*from\s*["']\.\/imageErrorLog(?:\.ts)?["']/.test(
      source
    ),
    "imageGeneration.ts must import stringifyImageErrorForLog from ./imageErrorLog"
  );
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

// omni-code-review 2026-09-21_release-v3.8.51_vs_main_e2e-areas LEDGER-49: the object branch is
// the one `sanitizeUpstreamDetails()` payloads and raw upstream JSON take, so its redaction
// must be pinned on a credential-bearing key — not only on the string/Error branches.
test("stringifyImageErrorForLog redacts a credential inside a null-prototype object payload", () => {
  const payload = Object.create(null) as Record<string, unknown>;
  payload.code = "upstream_error";
  payload.message = "provider rejected the upscale";
  payload.authorization = `Bearer ${SECRET}`;

  const rendered = stringifyImageErrorForLog(payload);
  assert.ok(!rendered.includes(SECRET), `credential leaked into log string: ${rendered}`);
  assert.ok(rendered.includes("[REDACTED]"), `expected a redaction marker, got ${rendered}`);
  assert.ok(rendered.includes('"code":"upstream_error"'), `structure lost: ${rendered}`);
  assert.ok(
    rendered.includes('"message":"provider rejected the upscale"'),
    `structure lost: ${rendered}`
  );
});

// omni-code-review 2026-09-21_release-v3.8.51_vs_main_e2e-areas LEDGER-56: the Error branch
// must be as total as the other three — a throwing or non-string `message`/`name` must never
// turn a handled provider failure back into an unhandled throw.
test("stringifyImageErrorForLog does not throw on an Error whose message getter throws", () => {
  const hostile = new Error("placeholder");
  Object.defineProperty(hostile, "message", {
    get() {
      throw new TypeError("message getter exploded");
    },
  });
  assert.throws(() => `${hostile.message}`, TypeError, "precondition: reading message throws");

  let rendered: string | undefined;
  assert.doesNotThrow(() => {
    rendered = stringifyImageErrorForLog(hostile);
  });
  assert.equal(typeof rendered, "string");
  assert.ok(rendered!.startsWith("Error:"), `expected "Error: …" prefix, got ${rendered}`);
  assert.ok(rendered!.length > "Error:".length, "message part must not be empty");
});

test("stringifyImageErrorForLog renders an Error carrying non-string name/message without throwing", () => {
  const hostile = new Error("placeholder");
  const nullProto = Object.create(null) as Record<string, unknown>;
  (hostile as { name: unknown }).name = nullProto;
  (hostile as { message: unknown }).message = nullProto;
  assert.throws(() => `${hostile.name}: ${hostile.message}`, TypeError, "precondition");

  const rendered = stringifyImageErrorForLog(hostile);
  assert.equal(typeof rendered, "string");
  assert.ok(rendered.startsWith("Error:"), `expected the "Error" fallback name, got ${rendered}`);
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
