// Tests for the Rule #12 error-sanitization gate (scripts/check/check-error-helper.mjs).
// Exercises the pure findErrorHelperViolations() against synthetic file shapes so the
// conservative heuristic (flag direct + indirect raw-error leaks, never internal sinks
// or helper-importing files) is locked down as a regression guard.
import test from "node:test";
import assert from "node:assert/strict";
// @ts-expect-error — .mjs gate module has no type declarations; runtime shape is known.
import { findErrorHelperViolations, KNOWN_MISSING_ERROR_HELPER } from "../../scripts/check/check-error-helper.mjs";

type FileEntry = { path: string; source: string };
type FindFn = (files: FileEntry[], allowlist: Set<string>) => string[];
const find = findErrorHelperViolations as FindFn;
const allowlist = KNOWN_MISSING_ERROR_HELPER as Set<string>;

const EMPTY = new Set<string>();

function run(source: string, path = "open-sse/executors/x.ts"): string[] {
  return find([{ path, source } as FileEntry], EMPTY);
}

test("flags raw err.message assigned directly to an error: field", () => {
  const src = `export function exec() {
    try { doThing(); } catch (err) {
      return { success: false, status: 502, error: err.message };
    }
  }`;
  assert.deepEqual(run(src), ["open-sse/executors/x.ts"]);
});

test("flags raw err.message interpolated into a message: field", () => {
  const src = `function build(err: Error) {
    return new Response(JSON.stringify({ error: { message: \`boom: \${err.message}\` } }));
  }`;
  assert.deepEqual(run(src), ["open-sse/executors/x.ts"]);
});

test("flags err.stack placed into a message: field", () => {
  const src = `function build(err: Error) {
    return { error: { message: err.stack } };
  }`;
  assert.deepEqual(run(src), ["open-sse/executors/x.ts"]);
});

test("flags multi-line OpenAI error envelope inside new Response()", () => {
  const src = `function build(err: unknown) {
    return new Response(
      JSON.stringify({
        error: {
          message: isTls
            ? \`tls failed: \${(err as Error).message}\`
            : \`conn failed: \${err instanceof Error ? err.message : String(err)}\`,
          type: "upstream_error",
        },
      }),
      { status: 502 }
    );
  }`;
  assert.deepEqual(run(src), ["open-sse/executors/x.ts"]);
});

test("flags a tainted local variable passed into a response-builder call", () => {
  const src = `function makeErrorResponse(s: number, m: string) { return new Response(m); }
  function exec(err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { response: makeErrorResponse(401, \`auth failed: \${msg}\`) };
  }`;
  assert.deepEqual(run(src), ["open-sse/executors/x.ts"]);
});

test("flags errResp(msg) where msg is tainted", () => {
  const src = `function errResp(message: string) { return new Response(JSON.stringify({ error: { message } })); }
  function exec(err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to get nonce";
    return { response: errResp(msg) };
  }`;
  assert.deepEqual(run(src), ["open-sse/executors/x.ts"]);
});

test("flags forwarded upstream body.error.message without sanitize", () => {
  const src = `function build(body: { error: { message: string } }) {
    return { success: false, error: body.error.message };
  }`;
  assert.deepEqual(run(src), ["open-sse/executors/x.ts"]);
});

// --- Negative cases: the gate must NOT flag these (conservative, no false positives) ---

test("does NOT flag a file that imports utils/error (relative)", () => {
  const src = `import { sanitizeErrorMessage } from "../utils/error.ts";
  function build(err: Error) { return { error: { message: err.message } }; }`;
  assert.deepEqual(run(src), []);
});

test("does NOT flag a file that imports utils/error (workspace alias)", () => {
  const src = `import { buildErrorBody } from "@omniroute/open-sse/utils/error";
  function build(err: Error) { return new Response(JSON.stringify({ error: { message: \`x \${err.message}\` } })); }`;
  assert.deepEqual(run(src), []);
});

test("does NOT flag raw err.message inside a saveCallLog audit row", () => {
  const src = `function exec(err: Error) {
    saveCallLog({
      method: "POST",
      status: 502,
      error: err.message,
      requestBody: rb,
    }).catch(() => {});
    return ok;
  }`;
  assert.deepEqual(run(src), []);
});

test("does NOT flag raw err.message inside a log call", () => {
  const src = `function exec(err: Error) {
    log?.error?.("X", \`refresh error: \${err.message}\`);
    return ok;
  }`;
  assert.deepEqual(run(src), []);
});

test("does NOT flag err.message inside a thrown Error", () => {
  const src = `function exec(err: Error) {
    throw new Error(\`SPA send failed: \${err instanceof Error ? err.message : String(err)}\`);
  }`;
  assert.deepEqual(run(src), []);
});

test("does NOT flag err.message inside reject()", () => {
  const src = `new Promise((_, reject) => {
    onErr((err: Error) => reject(new Error(\`failed: \${err.message}\`)));
  });`;
  assert.deepEqual(run(src), []);
});

test("does NOT flag upstream-event read event.error.message", () => {
  const src = `function parse(event: { error: { message: string } }) {
    const content = typeof event.error === "string" ? event.error : event.error.message;
    return { choices: [{ message: { content } }] };
  }`;
  assert.deepEqual(run(src), []);
});

test("does NOT flag a sanitized body.error.message line", () => {
  const src = `function build(body: { error: { message: string } }) {
    return { error: sanitizeErrorMessage(body.error.message) };
  }`;
  assert.deepEqual(run(src), []);
});

// --- Allowlist behavior ---

test("an allowlisted path is suppressed even when it would otherwise flag", () => {
  const src = `function build(err: Error) { return { error: { message: err.message } }; }`;
  const path = "open-sse/executors/legacy.ts";
  assert.deepEqual(find([{ path, source: src } as FileEntry], EMPTY), [path]);
  assert.deepEqual(find([{ path, source: src } as FileEntry], new Set([path])), []);
});

test("the shipped allowlist freezes exactly the known current violators", () => {
  const frozen = [...allowlist].sort();
  assert.deepEqual(frozen, [
    "open-sse/executors/adapta-web.ts",
    "open-sse/executors/deepseek-web.ts",
    "open-sse/executors/perplexity-web.ts",
    "open-sse/executors/qoder.ts",
    "open-sse/executors/veoaifree-web.ts",
    "open-sse/handlers/embeddings.ts",
    "open-sse/handlers/search.ts",
  ]);
});

test("returns multiple violating paths and preserves input order", () => {
  const files: FileEntry[] = [
    { path: "open-sse/executors/a.ts", source: `return { error: { message: err.message } };` },
    { path: "open-sse/executors/b.ts", source: `import { x } from "../utils/error.ts"; return { error: err.message };` },
    { path: "open-sse/executors/c.ts", source: `return { error: e.stack };` },
  ];
  assert.deepEqual(find(files, EMPTY), ["open-sse/executors/a.ts", "open-sse/executors/c.ts"]);
});
