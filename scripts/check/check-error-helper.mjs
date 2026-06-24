#!/usr/bin/env node
// scripts/check/check-error-helper.mjs
// Gate Hard Rule #12 (error sanitization): error responses/results built in
// open-sse/executors/ and open-sse/handlers/ MUST route through the helpers in
// open-sse/utils/error.ts (buildErrorBody / errorResponse / sanitizeErrorMessage /
// sanitizeUpstreamDetails / makeExecutorErrorResult / formatProviderError / …) so
// raw err.stack / err.message / upstream body.error.message never reach a client.
//
// The risk: a file that builds its own `new Response(JSON.stringify({ error: {
// message: err.message } }))` (or a result object with `error: <raw msg>`) and does
// NOT import the sanitizer leaks stack traces / absolute paths / upstream internals.
// CodeQL's js/stack-trace-exposure does not understand the custom sanitizer, so this
// static gate is the canonical enforcement. See docs/security/ERROR_SANITIZATION.md.
//
// Conservative by design: a file is flagged ONLY when it both (a) appears to forward
// a RAW error value into a response/result body AND (b) imports nothing from a
// utils/error path. Files that import the helper are trusted (the `body.error.message`
// they reference is the sanitized output of buildErrorBody, not raw upstream).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { assertNoStale } from "./lib/allowlist.mjs";

const cwd = process.cwd();

// Directories to scan (Hard Rule #12 applies to ALL error-response-building surfaces).
// 6A.8: expanded from executors+handlers to include MCP server tools and API route files.
const SCAN_DIRS = [
  path.join(cwd, "open-sse/executors"),
  path.join(cwd, "open-sse/handlers"),
  path.join(cwd, "open-sse/mcp-server"),
];

// Glob-style pattern for API route files under src/app/api/ (matched by path test below).
const IS_API_ROUTE = /^src\/app\/api\/.+\/route\.tsx?$/;

// Pre-existing violators frozen so the gate is green NOW and blocks only NEW leaks.
// Each entry is a real Rule #12 gap (raw err.message forwarded into a response body
// with no utils/error import) and should become a tracked cleanup issue: route the
// message through sanitizeErrorMessage()/buildErrorBody()/makeExecutorErrorResult().
// Do NOT add new entries without a justification — that defeats the gate.
export const KNOWN_MISSING_ERROR_HELPER = new Set([
  // --- original open-sse/executors + handlers scope (pre-6A.8) ---
  // --- 6A.8 expanded scope: src/app/api/**/route.ts pre-existing violations ---
  // TODO(6A.8): pre-existing, triage — route through buildErrorBody()/sanitizeErrorMessage()
  "src/app/api/providers/test-batch/route.ts",
]);

// Import specifiers that count as "uses the error helper" (path ends in utils/error).
const ERROR_HELPER_IMPORT =
  /\bfrom\s*["'](?:\.{1,2}\/)*(?:open-sse\/)?utils\/error(?:\.[tj]s)?["']|@omniroute\/open-sse\/utils\/error/;

// A caught-error identifier whose .message/.stack is RAW (not sanitized): the leading
// token must be exactly `err` / `error` / `e` (optionally `(err as Error)` cast), and
// NOT preceded by a member access — so `event.error.message` (an upstream-event read)
// does not match, only our own caught `err.message` / `error.stack` / `(err as …).msg`.
// The `(?<![.\w])` lookbehind is non-consuming so it works mid-template (e.g. `${err…`).
const RAW_ERR = String.raw`(?:\((?:err|error|e)\s+as\s+[^)]+\)|(?<![.\w])(?:err|error|e))\.(?:message|stack)\b`;

// Lines that are internal sinks (never reach the client) — excluded so the gate does
// not false-positive on logging, DB audit rows, thrown Errors, or rejected promises.
const INTERNAL_SINK =
  /\b(?:log\??\.\w+\??\.?\(|console\.\w+\(|saveCallLog\s*\(|reqLogger\.|throw\s+new\s+\w*Error|reject\s*\(|\.error\??\.\(|finish\s*\()/;

// Internal-sink CALL openers — when a raw-error field sits inside one of these calls'
// argument object (e.g. `saveCallLog({ … error: err.message … })`), it is a DB audit
// row / log entry, not a client response. Matched against the line that opens the
// nearest still-unclosed call enclosing the flagged line.
const INTERNAL_SINK_CALL =
  /\b(?:saveCallLog|log\??\.\w+|console\.\w+|reqLogger\.\w+)\s*\(\s*\{?\s*$/;

// A line that is constructing a client-facing response/result body.
const RESPONSE_LINE =
  /new\s+Response\s*\(|\bresponse\s*:|\berrResp\s*\(|\bmakeErrorResponse\s*\(|\berrorResponse\s*\(/;

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.tsx?$/.test(e.name) && !/\.test\.tsx?$/.test(e.name)) acc.push(p);
  }
  return acc;
}

// A raw caught-error value assigned to / interpolated into a `message:`/`error:` field.
const RAW_ERR_FIELD = new RegExp(String.raw`\b(?:message|error)\s*:\s*` + RAW_ERR);
const RAW_ERR_FIELD_INTERP = new RegExp(
  String.raw`\b(?:message|error)\s*:\s*[\`"'][^\n]*\$\{[^}]*` + RAW_ERR
);

// A raw caught-error value interpolated anywhere on a line that also builds a Response.
const RAW_ERR_INTERP = new RegExp(String.raw`\$\{[^}]*` + RAW_ERR);

// Upstream `body.error.message` forwarded into a field without a sanitize call.
const RAW_BODY_ERR = /\b(?:message|error)\s*:\s*[^,}\n]*\bbody\.error\.message\b/;

// A response-builder CALL that takes a message argument (client-facing). A tainted
// local variable (assigned from a raw error) passed here is a leak.
const RESPONSE_BUILDER_CALL =
  /\b(?:errResp|makeErrorResponse|errorResponse)\s*\(|\bresponse\s*:\s*(?:errResp|makeErrorResponse|errorResponse|new\s+Response)\s*\(/;

// `const|let <id> = <expr containing a raw caught-error>` — a tainted local holding a
// raw, unsanitized error string. Captures the variable name for downstream tracking.
const TAINT_DECL = new RegExp(
  String.raw`\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*[^;\n]*` + RAW_ERR
);

/**
 * Does this source forward a RAW error value into a CLIENT-FACING response/result body?
 *
 * Line-anchored + sink-aware so it does not false-positive on logging, DB audit rows
 * (saveCallLog), thrown Errors, rejected promises, or parsed upstream-event reads.
 *
 * A line is a violation when, after skipping internal-sink lines, it either:
 *  - assigns/interpolates a raw caught-error into a `message:`/`error:` field, or
 *  - interpolates a raw caught-error AND is itself a Response/result-builder line, or
 *  - forwards upstream `body.error.message` into a field without sanitizing, or
 *  - passes a TAINTED local (a var assigned from a raw error, never sanitized) into a
 *    response-builder call (errResp / makeErrorResponse / errorResponse / new Response).
 */
function forwardsRawError(source) {
  const lines = source.split("\n").map((l) => l.replace(/\/\/.*$/, ""));

  // Pass 1: collect tainted local variables (raw error, no sanitize on the line).
  const tainted = new Set();
  for (const line of lines) {
    if (INTERNAL_SINK.test(line)) continue;
    const m = line.match(TAINT_DECL);
    if (m && !/sanitize/i.test(line)) tainted.add(m[1]);
  }
  const taintedUse =
    tainted.size > 0 ? new RegExp(String.raw`\b(?:${[...tainted].join("|")})\b`) : null;

  // Pass 2: scan for leak lines.
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    if (INTERNAL_SINK.test(line)) continue; // log / audit / throw / reject
    if (TAINT_DECL.test(line)) continue; // the assignment itself is not the leak

    const directLeak =
      RAW_ERR_FIELD.test(line) ||
      RAW_ERR_FIELD_INTERP.test(line) ||
      (RAW_ERR_INTERP.test(line) && RESPONSE_LINE.test(line)) ||
      // Multi-line OpenAI error envelope: a raw-error interpolation that sits inside
      // an enclosing `error: {` / `message:` field of a `new Response(` body.
      (RAW_ERR_INTERP.test(line) && enclosedByErrorResponseBody(lines, i)) ||
      (RAW_BODY_ERR.test(line) && !/sanitize/i.test(line));

    const taintedLeak =
      taintedUse !== null && RESPONSE_BUILDER_CALL.test(line) && taintedUse.test(line);

    // The raw error reaches a client body unless it lives inside an internal-sink
    // call's argument object (saveCallLog / log / console / reqLogger).
    if ((directLeak || taintedLeak) && !enclosedByInternalSinkCall(lines, i)) return true;
  }
  return false;
}

/**
 * Walk back from `idx`, tracking net brace/paren depth, to find the line that opens
 * the call enclosing `idx`. Returns true if that opener is an internal-sink call.
 * Bounded lookback (sink-call argument objects are small) keeps this cheap.
 */
function enclosedByInternalSinkCall(lines, idx) {
  let depth = 0;
  for (let j = idx; j >= 0 && idx - j < 80; j--) {
    const l = lines[j].replace(/\/\/.*$/, "");
    for (let k = l.length - 1; k >= 0; k--) {
      const ch = l[k];
      if (ch === ")" || ch === "}") depth++;
      else if (ch === "(" || ch === "{") {
        if (depth === 0) {
          // Unbalanced opener at this position — the enclosing construct starts here.
          return INTERNAL_SINK_CALL.test(l.slice(0, k + 1));
        }
        depth--;
      }
    }
  }
  return false;
}

// Field opener that is part of an OpenAI-style error envelope (`error: {` / `message:`).
const ERROR_FIELD_OPENER = /\b(?:error|message)\s*:\s*[`{]?\s*$/;

/**
 * Walk back from `idx` to the nearest enclosing `{`/`(` opener; if it opens an error
 * envelope field (`error: {` / `message:`) AND a `new Response(` / `response:` builder
 * appears just above it, the raw error reaches a client error body. Conservative: only
 * the canonical error-envelope shape qualifies (not `content:` / data fields).
 */
function enclosedByErrorResponseBody(lines, idx) {
  let depth = 0;
  for (let j = idx; j >= 0 && idx - j < 80; j--) {
    const l = lines[j].replace(/\/\/.*$/, "");
    for (let k = l.length - 1; k >= 0; k--) {
      const ch = l[k];
      if (ch === ")" || ch === "}") depth++;
      else if (ch === "(" || ch === "{") {
        if (depth === 0) {
          if (!ERROR_FIELD_OPENER.test(l.slice(0, k + 1))) return false;
          // Confirm a Response builder sits in the few lines above the envelope.
          const window = lines.slice(Math.max(0, j - 8), j + 1).join("\n");
          return /new\s+Response\s*\(|\bresponse\s*:/.test(window);
        }
        depth--;
      }
    }
  }
  return false;
}

export function findErrorHelperViolations(files, allowlist) {
  const violations = [];
  for (const { path: rel, source } of files) {
    if (allowlist.has(rel)) continue;
    if (ERROR_HELPER_IMPORT.test(source)) continue; // trusts the helper
    if (forwardsRawError(source)) violations.push(rel);
  }
  return violations;
}

function collectFiles() {
  const files = [];
  // Standard scan dirs (open-sse/executors, handlers, mcp-server).
  for (const dir of SCAN_DIRS) {
    for (const p of walk(dir)) {
      files.push({
        path: path.relative(cwd, p).replace(/\\/g, "/"),
        source: fs.readFileSync(p, "utf8"),
      });
    }
  }
  // 6A.8: also scan all src/app/api/**/route.ts files.
  const apiRoot = path.join(cwd, "src/app/api");
  for (const p of walk(apiRoot)) {
    const rel = path.relative(cwd, p).replace(/\\/g, "/");
    if (IS_API_ROUTE.test(rel)) {
      files.push({ path: rel, source: fs.readFileSync(p, "utf8") });
    }
  }
  return files;
}

function main() {
  const files = collectFiles();

  // 6A.8: stale-allowlist enforcement.
  // Compute live violations WITHOUT the allowlist so we can detect entries that are
  // now stale (the violation was fixed, but the freeze entry was not removed).
  const liveViolations = findErrorHelperViolations(files, new Set());
  assertNoStale(KNOWN_MISSING_ERROR_HELPER, liveViolations, "check-error-helper");

  // Suppress known pre-existing violations so only NEW leaks fail the gate.
  const violations = findErrorHelperViolations(files, KNOWN_MISSING_ERROR_HELPER);
  if (violations.length) {
    console.error(
      `[check-error-helper] ${violations.length} file(s) build an error response/result with a ` +
        `raw err.message/err.stack/body.error.message but do NOT import open-sse/utils/error:\n` +
        violations.map((v) => "  ✗ " + v).join("\n") +
        `\n  → route the message through buildErrorBody()/sanitizeErrorMessage()/` +
        `makeExecutorErrorResult() (see docs/security/ERROR_SANITIZATION.md), or — if it is a ` +
        `false positive — add it to KNOWN_MISSING_ERROR_HELPER with a justification.`
    );
    process.exit(1);
  }
  if (process.exitCode === 1) return; // stale entries already logged
  console.log(
    `[check-error-helper] OK (${files.length} files scanned, ${KNOWN_MISSING_ERROR_HELPER.size} known-missing frozen)`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
