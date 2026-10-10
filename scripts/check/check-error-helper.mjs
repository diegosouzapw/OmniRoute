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
// Conservative by design: a line is flagged ONLY when it forwards a RAW error
// value into a client-facing response/result body WITHOUT routing it through a
// sanctioned builder/sanitizer on that same line.
//
// G-03 (#15159): trust is CALL-scoped, never FILE-scoped. This gate used to skip an
// entire file the moment it saw any import from a utils/error path, which is a
// file-scoped exemption applied to a call-scoped hazard — one correct
// `import { sanitizeErrorMessage }` permanently excused every other sink in the
// file. That is precisely how the audit's live E-09 shipped green:
// deepseek-web.ts imports the sanitizer for one call site while a second,
// file-local `errorResponse` builder forwarded raw upstream `errBody.msg` to the
// client. See SANITIZED_CALL below for the replacement.
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
//
// G-03 (#15159): every entry below was INVISIBLE to this gate until the
// file-level `if (ERROR_HELPER_IMPORT.test(source)) continue` skip was replaced
// with call-scoped trust. None is a regression from the fix — they are debt this
// gate finally reports. `assertNoStale` removes an entry automatically once its
// violation is gone, so freezing cannot ossify.
//
// TWO ENTRIES WERE REMOVED after re-auditing this list rather than trusting it.
// The first freeze pass reported 23; a line-by-line audit found two were NOT
// violations, and freezing a non-violation is how an allowlist stops meaning
// anything:
//   * src/app/api/v1/batches/delete-completed/route.ts — the raw `err.message` /
//     `err.stack` is inside `log.error("BATCHES", "sweep failed", { … })`, an audit
//     row. The client response is a static buildErrorBody. The gate's
//     INTERNAL_SINK_CALL anchor required the opener line to END with `{`, which every
//     message-first logger fails.
//   * src/app/api/headroom/start/route.ts — the message sits inside a multi-line
//     `createErrorResponse({ … })` call. That builder lives in
//     `src/lib/api/errorResponse.ts` (not `utils/error`) and sanitizes both exports
//     (#15159 E-13), and per-LINE trust cannot see a builder named on a previous line.
// Both gate bugs are fixed, with regression guards in
// tests/unit/check-error-helper-false-positives-15159.test.ts.
//
// The honest count is 21.
export const KNOWN_MISSING_ERROR_HELPER = new Set([
  // --- Provider-auth import/export routes: `error: error.message` on a thrown
  // provider error. 8 sites, one shape.
  //
  // LATENT, NOT LIVE — corrected after a second audit. An earlier version of this
  // comment claimed these "leak an upstream/credential-adjacent message verbatim", which
  // was wrong. Each route's GENERIC branch already routes through `sanitizeErrorMessage`;
  // only the TYPED branch forwards `error.message` raw, and every one of the 34
  // `new (Agy|Claude|Codex)AuthFileError(...)` throw sites across
  // `src/lib/oauth/utils/{agy,claude,codex}Auth*.ts` passes a STATIC app-authored
  // literal — zero interpolation, so no upstream body, token or path can arrive.
  // They stay frozen because the guarantee is a maintenance invariant, not a property of
  // the routes: a new `throw new CodexAuthFileError(`refresh failed: ${upstream.body}`)`
  // would leak through all eight, and this gate cannot see it (these files DO import the
  // sanitizer). Guarded by tests/unit/provider-auth-error-message-literals-15159.test.ts,
  // which fails and names the site. The right fix for such a site is the throw site.
  "src/app/api/providers/agy-auth/apply-local/route.ts",
  "src/app/api/providers/agy-auth/import/route.ts",
  "src/app/api/providers/claude-auth/import/route.ts",
  "src/app/api/providers/codex-auth/import/route.ts",
  "src/app/api/providers/[id]/claude-auth/apply-local/route.ts",
  "src/app/api/providers/[id]/claude-auth/export/route.ts",
  "src/app/api/providers/[id]/codex-auth/apply-local/route.ts",
  "src/app/api/providers/[id]/codex-auth/export/route.ts",

  // --- Image generation/upscale/video handlers: `error: err.message` on an
  // internal result object that a caller later serializes. The sibling
  // `errorText = sanitizeErrorMessage(...)` on the next line proves the intent.
  // This is the class E-15 closed at stability.ts but missed here.
  "open-sse/handlers/imageGeneration/providers/adobeFirefly.ts",
  "open-sse/handlers/imageUpscale/adobeFirefly.ts",
  "open-sse/handlers/videoGeneration/adobeFireflyHandler.ts",

  // --- UNFROZEN #15159 wave 1.2 (removed, do not re-add).
  // These two were frozen as "toJsonErrorPayload passthrough: unsanitized
  // upstream envelope -> new Response(JSON.stringify(...))". Both are now clean
  // for two independent reasons, and both were needed:
  //   1. toJsonErrorPayload() sanitizes internally (wave 1.1), so the payload
  //      itself is safe.
  //   2. Each proxy-context catch now sanitizes AT THE CAPTURE SITE
  //      (`error: sanitizeErrorMessage(err.message)`), which is what this gate
  //      actually judges — per line, unable to see through a helper call. Without
  //      (2) the entries above would still look live and assertNoStale would
  //      fail the moment (1) landed.
  // upscale/route.ts additionally now builds its response via errorResponse()
  // instead of hand-serializing with new Response(JSON.stringify(...)).
  //
  // Regression guard: tests/unit/image-routes-proxy-error-sanitization-15159.test.ts

  // --- Executors forwarding a raw caught error into the response body.
  "open-sse/executors/copilot-web.ts",
  "open-sse/executors/cloudflare-playground.ts",
  "open-sse/executors/veoaifree-web.ts",
  "open-sse/executors/yuanbao-web.ts",

  // --- API routes returning a caught error message directly. Note
  // grok-build-settings:230 forwards a TYPED `GrokBuildConfigConflictError` (an
  // app-defined message, not upstream text) and is latent for the same reason as the
  // provider-auth block above; the sibling branch one line down already sanitizes.
  "src/app/api/cli-tools/grok-build-settings/route.ts",
  "src/app/api/github-skills/route.ts", // inner per-target catch in a results map
  "src/app/api/skills/collect/install/route.ts", // inner per-target catch
  "src/app/api/webhooks/[id]/test/route.ts",
]);

// G-03 (#15159): a line that actually routes an error value through a sanitizer
// is trusted. This is what replaced the former FILE-level skip
// (`if (ERROR_HELPER_IMPORT.test(source)) continue`), which let one import
// anywhere exempt every sink in the file — the blind spot the audit's live E-09
// (deepseek-web.ts: imports the sanitizer, keeps a raw file-local builder)
// shipped green through.
//
// Judging the CALL instead of the FILE is strictly more precise: `RAW_ERR` has a
// `(?<![.\w])` lookbehind, so in `message: sanitizeErrorMessage(err.message)` the
// `err` after `(` still matches `err.message` and the field patterns fire. The
// per-line sanitize guard is therefore load-bearing, not decorative — without it
// every correctly-sanitized call in the repo would be reported.
//
// Named per-function so an aliased import cannot smuggle trust back in.
const SANITIZED_CALL =
  /\b(?:sanitizeErrorMessage|sanitizeUpstreamDetails|buildErrorBody|errorResponseWithComboDiagnostics|writeStreamError|createErrorResult|makeExecutorErrorResult|unavailableResponse|formatProviderError|toSafeMcpErrorMessage|redactSensitiveErrorText|projectPublicErrorIdentifier|sanitizeErrorMessageWithStackPolicy)\s*\(/;

// The canonical builders sanitize INTERNALLY, so `errorResponse(500, err.message)`
// is correct and common (it is how audioTranscription.ts:1025 and dozens of other
// handlers report a caught error). That makes the bare NAME untrustworthy: a
// file-local `function errorResponse(status, message)` — the deepseek-web.ts:96
// shape — is identical at the call site and does NOT sanitize. There is no
// reliable way to tell the two apart from the call alone.
//
// So canonical builders are trusted per-LINE and only when the file actually
// imports them (CANONICAL_BUILDER_IMPORT). That is strictly tighter than the old
// behavior in one specific, load-bearing way: importing ONLY
// `sanitizeErrorMessage` no longer buys blanket trust for the rest of the file,
// which is exactly the E-09 hole — deepseek-web.ts imports the sanitizer and
// keeps its own raw builder. Importing the canonical builder, by contrast, is a
// real signal that the call resolves to the sanctioned implementation.
const CANONICAL_BUILDER_NAMES = [
  "buildErrorBody",
  "errorResponse",
  "writeStreamError",
  "createErrorResult",
  "unavailableResponse",
  "makeExecutorErrorResult",
  "errorResponseWithComboDiagnostics",
  // `src/lib/api/errorResponse.ts` is the OTHER sanctioned builder family — it routes
  // both of its exports through `sanitizeErrorMessage` (#15159 E-13, PR #15215), which
  // is why ~54 route handlers are covered by editing one builder. It does NOT live
  // under `utils/error`, so omitting these reported every compliant `createErrorResponse`
  // call site as a leak.
  "createErrorResponse",
  "createErrorResponseFromUnknown",
];
const CANONICAL_BUILDER = new RegExp(`\\b(?:${CANONICAL_BUILDER_NAMES.join("|")})\\s*\\(`);

// The names imported from a utils/error specifier, so trust is granted PER SYMBOL
// rather than per file or per path. Importing `sanitizeErrorMessage` says nothing
// about whether the file's own `errorResponse` is the canonical one — which is
// precisely the E-09 hole.
// Both sanctioned builder modules: `open-sse/utils/error.ts` and
// `src/lib/api/errorResponse.ts`. The second exists because route handlers outside
// open-sse (auth, proxies, services, agent-bridge …) use it, and it sanitizes too.
//
// The group MUST be parenthesized: an ungrouped `a|b` splices a top-level alternation
// into the surrounding regex, the `import … from …` prefix stops applying to the second
// branch, and the capture group comes back undefined — silently yielding zero names.
const ERROR_HELPER_MODULES = String.raw`(?:(?:open-sse\/)?utils\/error|lib\/api\/errorResponse)`;

const ERROR_HELPER_IMPORT_STATEMENT = new RegExp(
  String.raw`import\s*(?:type\s*)?\{([^}]*)\}\s*from\s*["'][^"']*` +
    ERROR_HELPER_MODULES +
    String.raw`(?:\.[tj]s)?["']` +
    String.raw`|import\s*(?:type\s*)?\{([^}]*)\}\s*from\s*["']@omniroute/open-sse/utils/error(?:\.[tj]s)?["']`,
  "g"
);

/** @param {string} source @returns {Set<string>} names imported from a sanctioned error module. */
function importedErrorHelperNames(source) {
  const names = new Set();
  for (const match of source.matchAll(ERROR_HELPER_IMPORT_STATEMENT)) {
    const clause = match[1] ?? match[2] ?? "";
    for (const part of clause.split(",")) {
      // `errorResponse as er` -> the imported name is the ORIGINAL binding.
      const original = part
        .trim()
        .split(/\s+as\s+/)[0]
        ?.trim();
      if (original) names.add(original);
    }
  }
  return names;
}

// A caught-error identifier whose .message/.stack is RAW (not sanitized): the leading
// token must be exactly `err` / `error` / `e` (optionally `(err as Error)` cast), and
// NOT preceded by a member access — so `event.error.message` (an upstream-event read)
// does not match, only our own caught `err.message` / `error.stack` / `(err as …).msg`.
// The `(?<![.\w])` lookbehind is non-consuming so it works mid-template (e.g. `${err…`).
const RAW_ERR = String.raw`(?:\((?:err|error|e)\s+as\s+[^)]+\)|(?<![.\w])(?:err|error|e))\.(?:message|stack)\b`;
const RAW_ERR_RE = new RegExp(RAW_ERR);

// Lines that are internal sinks (never reach the client) — excluded so the gate does
// not false-positive on logging, DB audit rows, thrown Errors, or rejected promises.
const INTERNAL_SINK =
  /\b(?:log\??\.\w+\??\.?\(|console\.\w+\(|saveCallLog\s*\(|reqLogger\.|throw\s+new\s+\w*Error|reject\s*\(|\.error\??\.\(|finish\s*\()/;

// Internal-sink CALL openers — when a raw-error field sits inside one of these calls'
// argument object (e.g. `saveCallLog({ … error: err.message … })`), it is a DB audit
// row / log entry, not a client response. Matched against the line that opens the
// nearest still-unclosed call enclosing the flagged line.
// `logToolCall` is the MCP server's audit-row writer — same class as saveCallLog: it
// persists the value to the audit DB and returns nothing to the caller.
//
// The opener must END with the argument object's `{`, but a logger usually takes a
// message FIRST — `log.error("BATCHES", "sweep failed", {` — so the previous
// `\s*\(\s*\{?\s*$` anchor missed every message-first logger and reported a compliant
// audit row as a client leak. Allow leading string-literal arguments before the `{`.
// Staying anchored is load-bearing: an unanchored variant was tried and suppressed
// EVERY violation (23 -> 0), because the enclosing-construct walk tests only the line
// that opens the construct, so an unanchored match let incidental logger calls win.
const INTERNAL_SINK_CALL =
  /\b(?:saveCallLog|logToolCall|log\??\.\w+|console\.\w+|reqLogger\.\w+)\s*\(\s*(?:["'`][^"'`]*["'`]\s*,\s*)*\{?\s*$/;

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

// G-11 (#15159): the raw error may sit further right on the field line — a ternary
// or cast separates it from the field name (`error: err instanceof Error ? err.message
// : String(err)`). The relaxed form catches that alias-laundered/tool-result shape;
// lines carrying a sanitize call are trusted (same policy as RAW_BODY_ERR).
const RAW_ERR_FIELD_RELAXED = new RegExp(String.raw`\b(?:message|error)\s*:\s*[^,}\n;]*` + RAW_ERR);

// A raw caught-error value interpolated anywhere on a line that also builds a Response.
const RAW_ERR_INTERP = new RegExp(String.raw`\$\{[^}]*` + RAW_ERR);

// Upstream `body.error.message` forwarded into a field without a sanitize call.
// G-03: excludes envelopes this file built itself via a sanctioned builder —
// `const body = buildErrorBody(status, sanitizeErrorMessage(msg))` followed by
// `error: body.error.message` is the SANITIZED idiom used across the
// *-fetch.ts executors, and matching it textually flagged compliant files the
// moment the file-level skip was removed. A `body` that arrives from an upstream
// fetch (no local buildErrorBody) is still flagged.
const RAW_BODY_ERR = /\b(?:message|error)\s*:\s*[^,}\n]*\b(\w+)\.error\.message\b/;
// The pre-G-03 rule matched ONLY a literal `body.error.message`. G-03 does NOT
// widen it to any receiver — that is a separate, much larger rule change (it
// would flag every upstream-passthrough site in the repo). The receiver group
// exists only so a locally-built envelope can be excluded below.
const RAW_BODY_ERR_LEGACY = /\b(?:message|error)\s*:\s*[^,}\n]*\bbody\.error\.message\b/;

// `const <name> = <sanctionedBuilder>(` — a locally built, already-sanitized envelope.
const LOCAL_ENVELOPE_DECL = /\b(?:const|let|var)\s+(\w+)\s*=\s*(?:\w+\.)?\w+\s*\(/;

/**
 * Variable names holding an envelope this file built through a sanctioned builder.
 *
 * @param {string} source
 * @returns {Set<string>}
 */
function locallySanitizedEnvelopes(source) {
  const safe = new Set();
  for (const line of source.split("\n").map((l) => l.replace(/\/\/.*$/, ""))) {
    const name = line.match(LOCAL_ENVELOPE_DECL)?.[1];
    if (!name) continue;
    const built = line.slice(line.indexOf(name) + name.length);
    if (trustedBuilder(built)) safe.add(name);
  }
  return safe;
}

/** Does this expression call a sanctioned builder/sanitizer? */
function trustedBuilder(expression) {
  return (
    SANITIZED_CALL.test(expression) ||
    CANONICAL_BUILDER_NAMES.some((name) => new RegExp(`\\b${name}\\s*\\(`).test(expression))
  );
}

// A response-builder CALL that takes a message argument (client-facing). A tainted
// local variable (assigned from a raw error) passed here is a leak.
// `createErrorResponse` / `createErrorResponseFromUnknown` belong here for the same
// reason they are in CANONICAL_BUILDER_NAMES: they are the sanctioned builder for
// everything outside open-sse, so a raw error passed to one is the same defect as a raw
// error passed to `errorResponse`.
const RESPONSE_BUILDER_CALL =
  /\b(?:errResp|makeErrorResponse|errorResponse|createErrorResponseFromUnknown|createErrorResponse)\s*\(|\bresponse\s*:\s*(?:errResp|makeErrorResponse|errorResponse|new\s+Response)\s*\(/;

// A builder name in CALL position (not its declaration / definition). Keeps the
// G-03 ternary-argument rule from matching `function errorResponse(status, message)`.
const CALL_ARG_PREFIX = /\b(?:return|await|yield)\b|[:=]\s*$/;

// A FILE-LOCAL builder declaration: `function errorResponse(`, `const
// errorResponse = (`. When its body sanitizes, calls to it are safe even though
// the file never imported the canonical one — this is the shape E-09's fix left
// behind (sanitizeErrorMessage moved INSIDE deepseek-web.ts's local builder).
const LOCAL_BUILDER_DECL = /\b(?:function|const|let|var)\s+(\w+)\s*[=(]/;

/**
 * Names of file-local builder functions whose own body sanitizes. Those names are
 * safe to call with a raw message, so the G-03 ternary rule must not fire on them.
 *
 * @param {string} source
 * @returns {Set<string>}
 */
function sanitizingLocalBuilders(source) {
  const safe = new Set();
  const lines = source.split("\n").map((l) => l.replace(/\/\/.*$/, ""));
  for (let i = 0; i < lines.length; i++) {
    const name = lines[i].match(LOCAL_BUILDER_DECL)?.[1];
    if (!name) continue;
    // Scan the declaration body (to its closing brace, bounded) for a sanitizer.
    for (let j = i; j < lines.length && j - i < 30; j++) {
      if (SANITIZED_CALL.test(lines[j])) {
        safe.add(name);
        break;
      }
      if (j > i && /^\s*}\s*$/.test(lines[j])) break; // body ended, unsanitized
    }
  }
  return safe;
}

// G-11 (#15159): MCP tool results are `{ content: [{ type: "text", text }], isError: true }`
// — the client-facing sink for MCP tools, NOT an HTTP Response builder. A raw error
// (direct or via a tainted alias) interpolated into a result field of a returned MCP
// tool result is a Hard Rule #12 leak just like a `new Response(` body. Scoped to
// open-sse/mcp-server/ so the executors/handlers/API-route scan stays byte-identical
// to its pre-G-11 behavior (their surfaces are covered by RESPONSE_LINE above).
//
// The `(?<![.\w])` guard is load-bearing: without it the ternary tail
// `err.message : String(err)` reads as an object field named `message`, and every
// internal helper that merely formats an error message gets flagged.
const MCP_RESULT_FIELD = /(?<![.\w])(?:message|error|text)\s*:/;

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
 *  - interpolates a raw caught-error into a client-facing `text:`/`message:`/`error:`
 *    field of a returned MCP tool result (G-11: `{ content: [...], isError: true }`), or
 *  - forwards upstream `body.error.message` into a field without sanitizing, or
 *  - passes a TAINTED local (a var assigned from a raw error, never sanitized) into a
 *    response-builder call (errResp / makeErrorResponse / errorResponse / new Response)
 *    or into any client-facing result field (G-11).
 */
/**
 * Is this single line routing an error value through a sanctioned builder/sanitizer?
 *
 * Only builders actually imported from utils/error count — a file that imports just
 * `sanitizeErrorMessage` gets no builder trust at all, which is the whole point of
 * resolving per symbol rather than per file (G-03).
 *
 * @param {string} line
 * @param {Set<string>} importedNames names imported from a utils/error path
 * @param {Set<string>} localBuilders file-local builders whose body sanitizes
 * @returns {boolean}
 */
function isTrustedLine(line, importedNames, localBuilders) {
  if (SANITIZED_CALL.test(line)) return true;
  if (!CANONICAL_BUILDER.test(line)) return false;
  return CANONICAL_BUILDER_NAMES.some(
    (name) =>
      (importedNames.has(name) || localBuilders.has(name)) &&
      new RegExp(`\\b${name}\\s*\\(`).test(line)
  );
}

function forwardsRawError(source, isMcpServer = false) {
  const lines = source.split("\n").map((l) => l.replace(/\/\/.*$/, ""));
  const importedNames = importedErrorHelperNames(source);
  const localBuilders = sanitizingLocalBuilders(source);
  const safeEnvelopes = locallySanitizedEnvelopes(source);
  const trusted = (line) => isTrustedLine(line, importedNames, localBuilders);

  // Pass 1: collect tainted local variables (raw error, no sanitize on the line).
  const tainted = new Set();
  for (const line of lines) {
    if (INTERNAL_SINK.test(line)) continue;
    const m = line.match(TAINT_DECL);
    if (m && !trusted(line)) tainted.add(m[1]);
  }
  const taintedUse =
    tainted.size > 0 ? new RegExp(String.raw`\b(?:${[...tainted].join("|")})\b`) : null;

  // Pass 2: scan for leak lines.
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    if (INTERNAL_SINK.test(line)) continue; // log / audit / throw / reject
    // G-03: trust the CALL, not the file. A line that routes the error through a
    // sanctioned builder/sanitizer is clean even though it also mentions
    // err.message — the raw identifier still matches RAW_ERR here, so without
    // this guard every correct call in the repo would be reported.
    //
    // `enclosedByTrustedBuilder` is required, not decorative: sanctioned builders are
    // routinely called MULTI-LINE, with the message on a later line —
    //   return createErrorResponse({ status: 400, message: error.message, ... });
    // The `message:` line mentions err.message and contains no builder call, so a
    // same-line-only check reported compliant `createErrorResponse` / `buildErrorBody`
    // call sites as leaks.
    if (trusted(line) || enclosedByTrustedBuilder(lines, i, importedNames, localBuilders)) continue;
    if (TAINT_DECL.test(line)) continue; // the assignment itself is not the leak

    const isMcp = isMcpServer;
    const directLeak =
      // G-03: a raw caught error handed straight to a response builder as a
      // ternary argument — `errorResponse(500, err instanceof Error ? err.message
      // : String(err))`. No `message:` field, no `${}` interpolation and no
      // declared local, so neither RAW_ERR_FIELD nor RAW_ERR_INTERP nor the
      // tainted-local rule sees it. This is the shape deepseek-web.ts used at
      // :1037/:1060 and it is exactly what the old file-level skip hid.
      //
      // `return`/`await`/`: ` prefixes keep this on genuine CALL sites: without
      // them it would match the builder's own `function errorResponse(...)`
      // declaration and flag every well-formed file in the repo.
      (CALL_ARG_PREFIX.test(line) && RAW_ERR_RE.test(line) && RESPONSE_BUILDER_CALL.test(line)) ||
      RAW_ERR_FIELD.test(line) ||
      (isMcp && RAW_ERR_FIELD_RELAXED.test(line) && !/sanitize/i.test(line)) ||
      RAW_ERR_FIELD_INTERP.test(line) ||
      (RAW_ERR_INTERP.test(line) && RESPONSE_LINE.test(line)) ||
      // G-11: raw error interpolated directly into an MCP tool-result text field.
      (isMcp && RAW_ERR_INTERP.test(line) && MCP_RESULT_FIELD.test(line)) ||
      // Multi-line OpenAI error envelope: a raw-error interpolation that sits inside
      // an enclosing `error: {` / `message:` field of a `new Response(` body.
      (RAW_ERR_INTERP.test(line) && enclosedByErrorResponseBody(lines, i)) ||
      (RAW_BODY_ERR_LEGACY.test(line) &&
        !/sanitize/i.test(line) &&
        // G-03: `body.error.message` off an envelope this file built through a
        // sanctioned builder is the sanitized idiom, not a leak.
        !safeEnvelopes.has(line.match(RAW_BODY_ERR)?.[1] ?? ""));

    // G-11: a tainted alias (`const msg = err.message`) used in an MCP tool-result
    // field is a leak. A sanitize call on the use line clears the taint.
    const taintedLeak =
      taintedUse !== null &&
      taintedUse.test(line) &&
      !/sanitize/i.test(line) &&
      (RESPONSE_BUILDER_CALL.test(line) || (isMcp && MCP_RESULT_FIELD.test(line)));

    // The raw error reaches a client body unless it lives inside an internal-sink
    // call's argument object (saveCallLog / logToolCall / log / console / reqLogger).
    if (
      (directLeak || taintedLeak) &&
      !enclosedByInternalSinkCall(lines, i) &&
      !onSameLineInternalSinkCall(line)
    )
      return true;
  }
  return false;
}

// An internal-sink call OPENER anywhere on a line. Used for the same-line case:
// `logToolCall("x", args, { error: err.message })` opens and closes on one line, so
// enclosedByInternalSinkCall()'s depth walk never returns to zero on that line.
const INTERNAL_SINK_CALL_OPENER =
  /\b(?:saveCallLog|logToolCall|log\??\.\w+|console\.\w+|reqLogger\.\w+)\s*\(/;

/**
 * Same-line counterpart to enclosedByInternalSinkCall: when the internal-sink call
 * opens AND closes on the flagged line, the depth walk above cannot find its opener
 * (the balanced pair never returns to depth 0). Detect that case by looking for an
 * internal-sink opener before the flagged field on the same line.
 */
function onSameLineInternalSinkCall(line) {
  const fieldIdx = line.search(MCP_RESULT_FIELD);
  if (fieldIdx === -1) return false;
  return INTERNAL_SINK_CALL_OPENER.test(line.slice(0, fieldIdx));
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
 * Walk back to the line that opens the construct enclosing `idx`, and report whether
 * that opener is a sanctioned builder/sanitizer call.
 *
 * Same brace-depth walk as `enclosedByInternalSinkCall`, inverted in meaning: this one
 * grants trust instead of suppressing. It exists because a multi-line
 * `createErrorResponse({ ... message: err.message ... })` puts the offending field on a
 * line that names no builder at all, so a same-line check cannot see the sanitization.
 *
 * @param {string[]} lines
 * @param {number} idx
 * @returns {boolean}
 */
function enclosedByTrustedBuilder(lines, idx, importedNames, localBuilders) {
  let depth = 0;
  for (let j = idx; j >= 0 && idx - j < 80; j--) {
    const l = lines[j].replace(/\/\/.*$/, "");
    for (let k = l.length - 1; k >= 0; k--) {
      const ch = l[k];
      if (ch === ")" || ch === "}") depth++;
      else if (ch === "(" || ch === "{") {
        if (depth === 0) return isTrustedLine(l.slice(0, k + 1), importedNames, localBuilders);
        depth--;
      }
    }
  }
  return false;
}

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
    const isMcpServer = rel.startsWith("open-sse/mcp-server/");
    if (forwardsRawError(source, isMcpServer)) violations.push(rel);
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
