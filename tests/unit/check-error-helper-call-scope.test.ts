// #15159 / G-03 — call-scoped trust for the Rule #12 error-sanitization gate.
//
// THE DEFECT THIS LOCKS DOWN
// --------------------------
// `findErrorHelperViolations` used to skip an ENTIRE FILE the moment it saw any
// import from a `utils/error` path:
//
//     if (ERROR_HELPER_IMPORT.test(source)) continue; // trusts the helper
//
// That is a file-scoped exemption applied to a call-scoped hazard. One
// `import { sanitizeErrorMessage } from "../utils/error.ts"` — needed and
// correct on its own line — permanently exempts every other sink in the file.
// The audit's live E-09 (`deepseek-web.ts`) shipped green through exactly this
// hole: the file imports the sanitizer for one call site while a second,
// file-local `errorResponse` builder forwarded raw `errBody.msg` to the client.
//
// The fix inverts the trust: judge the CALL, not the file. A line that actually
// routes through a sanitizer is clean; a line that forwards a raw caught error
// into a client-facing body is a violation whether or not the file imports
// anything.
//
// This file is deliberately SEPARATE from `check-error-helper.test.ts`, whose
// two "does NOT flag a file that imports utils/error" cases encoded the old
// (wrong) behaviour and had to be inverted rather than extended.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
// @ts-expect-error — .mjs gate module has no type declarations; runtime shape is known.
import { findErrorHelperViolations } from "../../scripts/check/check-error-helper.mjs";

type FileEntry = { path: string; source: string };
type FindFn = (files: FileEntry[], allowlist: Set<string>) => string[];
const find = findErrorHelperViolations as FindFn;

const EMPTY = new Set<string>();
const P = "open-sse/executors/leaky.ts";

function run(source: string, path = P): string[] {
  return find([{ path, source } as FileEntry], EMPTY);
}

// --- RED: the blind spot itself, both import styles ---

test("G-03: a utils/error import does NOT exempt an unrelated raw leak in the same file", () => {
  const src = `import { sanitizeErrorMessage } from "../utils/error.ts";
  export function a(err: Error) { return sanitizeErrorMessage(err); }
  export function b(err: Error) {
    return new Response(JSON.stringify({ error: { message: err.message } }));
  }`;
  assert.deepEqual(run(src), [P]);
});

test("G-03: same blind spot via the workspace alias import", () => {
  const src = `import { buildErrorBody } from "@omniroute/open-sse/utils/error";
  export function a(err: Error) { return buildErrorBody(502, sanitize(err)); }
  export function b(err: Error) {
    return new Response(JSON.stringify({ error: { message: err.stack } }));
  }`;
  assert.deepEqual(run(src), [P]);
});

test("G-03: the import used by a LATER function does not launder an EARLIER raw sink", () => {
  // Order matters for the temptation: the sanitized call sits after the leak, so
  // a reviewer scanning top-down sees "sanitizeErrorMessage" and waves it through.
  const src = `import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
  export function leaky(err: Error) {
    return { error: { message: err.message } };
  }
  export function safe(err: Error) {
    return sanitizeErrorMessage(err.message);
  }`;
  assert.deepEqual(run(src), [P]);
});

test("G-03: a file-local builder fed a caught err.message is flagged despite the import", () => {
  // The E-09 shape, with a CAUGHT error as the source so it sits inside this
  // gate's remit (RAW_ERR matches a caught identifier; a parsed upstream body
  // field like errBody.msg is a separate, wider class — see the note below).
  const src = `import { sanitizeErrorMessage } from "../utils/error.ts";
  function errorResponse(status: number, message: string) {
    return Response.json({ error: { message } }, { status });
  }
  export function exec(err: unknown) {
    return errorResponse(500, err instanceof Error ? err.message : String(err));
  }`;
  assert.deepEqual(run(src), [P]);
});

// DOCUMENTED LIMITATION, not a claim of coverage: this gate matches a CAUGHT
// error identifier (`err`/`error`/`e` + `.message`/`.stack`) and the specific
// `body.error.message` upstream shape. It does NOT model an arbitrary parsed
// upstream payload (`errBody.msg`, `parsed.detail`, `json.error`) being
// interpolated into a file-local builder — that is the wider "upstream body
// passthrough" class. E-09's real leak was that shape, so closing it took the
// sanitizer INSIDE the file-local builder (deepseek-web.ts:100) rather than
// teaching this gate to parse upstream payloads. Widening it here would trade a
// precise gate for a noisy one; it is tracked separately.
test("G-03: the canonical E-09 shape (sanitizer inside the local builder) is clean", () => {
  const src = `import { sanitizeErrorMessage } from "../utils/error.ts";
  function errorResponse(status: number, message: string) {
    return Response.json({ error: { message: sanitizeErrorMessage(message) } }, { status });
  }
  export function exec(err: unknown) {
    return errorResponse(500, err instanceof Error ? err.message : String(err));
  }`;
  assert.deepEqual(run(src), []);
});

// --- GREEN: the fix must not regress genuinely-clean files ---

test("G-03: a file whose every error path is sanitized stays clean", () => {
  const src = `import { buildErrorBody, sanitizeErrorMessage } from "../utils/error.ts";
  export function build(err: Error) {
    return new Response(JSON.stringify(buildErrorBody(502, sanitizeErrorMessage(err.message))));
  }`;
  assert.deepEqual(run(src), []);
});

test("G-03: an unrelated utils/error import alongside a clean static message stays clean", () => {
  // Guards against over-correction: removing the file-level skip must not start
  // flagging every file in the repo that merely imports the helper.
  const src = `import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
  export function build() {
    return new Response(JSON.stringify({ error: { message: "Upstream unavailable" } }));
  }`;
  assert.deepEqual(run(src), []);
});

test("G-03: a sanitized alias assignment is not treated as a tainted local", () => {
  const src = `import { sanitizeErrorMessage } from "../utils/error.ts";
  export function build(err: Error) {
    const msg = sanitizeErrorMessage(err.message);
    return new Response(JSON.stringify({ error: { message: msg } }));
  }`;
  assert.deepEqual(run(src), []);
});

// --- META: make the regression non-reintroducible at the source level ---

test("G-03 META: the gate never skips a whole file for importing the helper", () => {
  // Behavioral tests above could be defeated by re-adding the skip in a form
  // they do not exercise. Assert the absence of the mechanism itself, so the
  // file-scoped trust cannot come back silently.
  const gateUrl = new URL("../../scripts/check/check-error-helper.mjs", import.meta.url);
  // Strip comments first: the fix documents the removed pattern in prose, and a
  // raw-source regex would match its own explanation.
  const code = readFileSync(gateUrl, "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");

  assert.doesNotMatch(
    code,
    /if\s*\(\s*\w*ERROR_HELPER_IMPORT\w*\.test\s*\(\s*source\s*\)\s*\)\s*continue/,
    "check-error-helper.mjs must not skip a whole file because it imports utils/error"
  );
});
