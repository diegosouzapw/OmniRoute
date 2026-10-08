// Regression guards for audit #15159 / G-03 — false positives found while auditing
// the gate's own frozen backlog.
//
// G-03 replaced a file-level trust skip with call-scoped trust. That is strictly more
// correct in intent, but two shapes of COMPLIANT code were reported as leaks because
// the gate only looked at the single line carrying the message. Both were discovered by
// re-auditing the 23 files frozen in `KNOWN_MISSING_ERROR_HELPER`: two of them were not
// violations at all, and freezing a non-violation is how an allowlist stops meaning
// anything.
//
// A gate that over-reports is not a safe gate — it trains reviewers to ignore it, and it
// buries the real findings. These cases are the difference between "23 pre-existing
// violations" and the honest count.
import assert from "node:assert/strict";
import { test } from "node:test";
// @ts-expect-error — .mjs gate module has no type declarations; runtime shape is known.
import { findErrorHelperViolations } from "../../scripts/check/check-error-helper.mjs";

type FileEntry = { path: string; source: string };
type FindFn = (files: FileEntry[], allowlist: Set<string>) => string[];
const find = findErrorHelperViolations as FindFn;
const EMPTY = new Set<string>();
const ROUTE = "src/app/api/probe/route.ts";

function run(source: string): string[] {
  return find([{ path: ROUTE, source } as FileEntry], EMPTY);
}

test("FP-1: a raw error inside a message-first logger call is an audit row, not a leak", () => {
  // Real shape from src/app/api/v1/batches/delete-completed/route.ts:99-103 — the
  // client response on the next lines is a static buildErrorBody, so nothing leaked:
  //
  //   log.error("BATCHES", "delete-completed sweep failed", {
  //     error: err instanceof Error ? { message: err.message, stack: err.stack } : String(err),
  //   });
  //   return NextResponse.json(buildErrorBody(500, "Failed to delete completed batches"), …);
  //
  // The old anchor required the opener line to END with `{`, which every message-first
  // logger fails. Relaxing it without keeping the anchor suppresses EVERY violation
  // (measured: 23 -> 0), so the pattern accepts leading string arguments and still
  // requires the argument object's `{`.
  const src = `export async function sweep(err: unknown) {
    log.error("BATCHES", "sweep failed", {
      route: "/api/x",
      error: err instanceof Error ? { message: err.message, stack: err.stack } : String(err),
    });
    return NextResponse.json(buildErrorBody(500, "Failed to delete completed batches"), {
      status: 500,
    });
  }`;
  assert.deepEqual(run(src), []);
});

test("FP-1b: the same log shape with a pino-style object argument is also an audit row", () => {
  const src = `export function handler(err: unknown) {
    reqLogger.error({ err, path: "/x" }, "failed");
    log.warn("upstream", { detail: err.message });
    return ok;
  }`;
  assert.deepEqual(run(src), []);
});

test("FP-2: a sanctioned builder called MULTI-LINE is not a leak on its field lines", () => {
  // Real shape from src/app/api/headroom/start/route.ts:36-40. `createErrorResponse`
  // lives in src/lib/api/errorResponse.ts — NOT under utils/error — and sanitizes both
  // its exports (#15159 E-13). The `message:` line names no builder at all, so
  // same-line-only trust reported it.
  const src = `import { createErrorResponse } from "@/lib/api/errorResponse";
  export async function start() {
    try {
      await run();
    } catch (error) {
      return createErrorResponse({
        status: 400,
        message: error.message,
        type: "invalid_request",
        details: { code: "NOT_INSTALLED" },
      });
    }
  }`;
  assert.deepEqual(run(src), []);
});

test("FP-2b: the same applies to the open-sse canonical builder across lines", () => {
  const src = `import { buildErrorBody } from "@omniroute/open-sse/utils/error";
  export function fail(err: unknown) {
    return new Response(
      JSON.stringify(
        buildErrorBody(502, err instanceof Error ? err.message : "upstream failed")
      ),
      { status: 502 }
    );
  }`;
  assert.deepEqual(run(src), []);
});

// --- The false-positive fixes must NOT blind the gate ---

test("FP-3: a multi-line RAW response envelope is still flagged", () => {
  // The control for FP-2: `new Response(` is not a sanctioned builder, so the new
  // enclosing-builder walk must NOT rescue it. Uses the `${}` interpolation shape the
  // gate documents for multi-line envelopes — the plain-ternary variant of this is a
  // separate, pre-existing blind spot recorded at the bottom of this file.
  const src = `export function fail(err: unknown) {
    return new Response(
      JSON.stringify({
        error: {
          message: \`upstream failed: \${err instanceof Error ? err.message : "?"}\`,
        },
      }),
      { status: 500 }
    );
  }`;
  assert.deepEqual(run(src), [ROUTE]);
});

test("FP-3b: an UNIMPORTED createErrorResponse name does not buy trust", () => {
  // A file can define its own `createErrorResponse` without importing the sanctioned one.
  // Trust is per symbol AND per import — this is the E-09 shape wearing a new name.
  const src = `function createErrorResponse(status: number, message: string) {
    return Response.json({ error: { message } }, { status });
  }
  export function fail(err: unknown) {
    return createErrorResponse(500, err instanceof Error ? err.message : "failed");
  }`;
  assert.deepEqual(run(src), [ROUTE]);
});

test("FP-3c: a raw error in an ordinary object literal is still flagged", () => {
  // The control for FP-1: relaxing the logger anchor must not excuse a plain result
  // object, which is how the 21 remaining frozen violations were found.
  const src = `export function build(err: unknown) {
    return { target: "a", ok: false, error: (err as Error).message };
  }`;
  assert.deepEqual(run(src), [ROUTE]);
});
