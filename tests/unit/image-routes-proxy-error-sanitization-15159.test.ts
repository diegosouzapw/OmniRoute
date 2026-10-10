import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

// Regression guard for audit #15159 / Hard Rule #12 — Wave 1.2.
//
// Both image routes funnel a proxy-context rejection into the result object and
// then serialize it into the client response:
//
//   src/app/api/v1/images/upscale/route.ts:238-244
//     runWithProxyContext(...).catch((err) => ({
//       success: false, status: err.statusCode || 500, error: err.message }))
//   src/app/api/v1/images/upscale/route.ts:264-271   -> new Response(JSON.stringify(...))
//
//   src/app/api/v1/images/generations/route.ts:352-358
//     runWithProxyContext(...).catch((err: any) => ({
//       success: false, status: err.statusCode || 500, error: err.message }))
//   src/app/api/v1/images/generations/route.ts:385-395 -> errorResponse(...)
//
// The DIVERGENCE was the defect, and the audit called it out precisely: the
// sibling `generations/route.ts:385-395` runs the payload through `errorResponse`
// (which sanitizes internally) while `upscale/route.ts:268` serializes with a bare
// `new Response(JSON.stringify(...))`. One file apart, fixed on one side only.
//
// Wave 1.1 closed the byte-level leak for BOTH routes, because `toJsonErrorPayload`
// now sanitizes internally. But that fix lives in a HELPER, and `check:error-helper`
// judges per LINE: it cannot see through the call, so both files stayed in
// `KNOWN_MISSING_ERROR_HELPER` — the gate was green *because* the leaks were
// frozen, not because they were safe.
//
// So this guard asserts the defense-in-depth property that closes that gap: each
// site sanitizes where the raw value is captured, which is what makes the gate
// trust the line and lets the freeze entry be deleted. If either route regresses
// to a bare `error: err.message`, these fail and the gate fails.

const UPSCALE_ROUTE = "src/app/api/v1/images/upscale/route.ts";
const GENERATIONS_ROUTE = "src/app/api/v1/images/generations/route.ts";

const ROUTES = [
  { label: "images/upscale", path: UPSCALE_ROUTE },
  { label: "images/generations", path: GENERATIONS_ROUTE },
];

function routeSource(relativePath: string): string {
  return readFileSync(new URL(`../../${relativePath}`, import.meta.url), "utf8");
}

/** Lines carrying a raw `err.message`/`err.stack` into an `error:`/`message:` field. */
function rawErrorForwardingLines(source: string): string[] {
  return source
    .split("\n")
    .map((line, index) => ({ line, number: index + 1 }))
    .filter(({ line }) =>
      /^\s*(?:error|message)\s*:\s*(?:err|error|e)\.(?:message|stack)\b/.test(line)
    )
    .map(({ line, number }) => `${number}: ${line.trim()}`);
}

test("Wave 1.2: neither image route forwards a raw err.message into an error field", () => {
  for (const route of ROUTES) {
    const offenders = rawErrorForwardingLines(routeSource(route.path));
    assert.deepEqual(
      offenders,
      [],
      `${route.label}: raw caught-error value forwarded into a response field:\n${offenders.join("\n")}`
    );
  }
});

test("Wave 1.2: each image route sanitizes the caught error at the capture site", () => {
  // The point of the fix: sanitize WHERE the raw value enters, not only deep
  // inside toJsonErrorPayload. That is what `check:error-helper` trusts per
  // line, so the freeze entry can be removed instead of ossified.
  for (const route of ROUTES) {
    const source = routeSource(route.path);
    assert.match(
      source,
      /error:\s*sanitizeErrorMessage\(/,
      `${route.label}: expected the proxy-context catch to sanitize err.message at capture`
    );
  }
});

test("Wave 1.2: neither image route is frozen in KNOWN_MISSING_ERROR_HELPER", () => {
  // `assertNoStale` in scripts/check/lib/allowlist.mjs FAILS the gate when an
  // entry no longer corresponds to a live violation, so a fix must delete its
  // freeze entry in the same commit. Pin that here so the pair cannot drift.
  const gate = readFileSync(
    new URL("../../scripts/check/check-error-helper.mjs", import.meta.url),
    "utf8"
  );

  for (const route of ROUTES) {
    assert.doesNotMatch(
      gate,
      new RegExp(`"${route.path.replace(/\//g, "\\/")}"`),
      `${route.label} is still frozen in check-error-helper.mjs — remove the stale entry`
    );
  }
});

test("Wave 1.2: the upscale route builds its error response through the sanctioned builder", () => {
  // The audit's "divergence is the bug" note: upscale serialized with a bare
  // `new Response(JSON.stringify(...))` while the sibling used `errorResponse`,
  // which sanitizes internally. Pin the converged shape.
  const source = routeSource(UPSCALE_ROUTE);
  const tail = source.slice(source.indexOf("const errorPayload = toJsonErrorPayload("));

  assert.match(tail, /\berrorResponse\(/, "upscale must build its response via errorResponse");
  assert.doesNotMatch(
    tail,
    /new\s+Response\s*\(\s*JSON\.stringify\(\s*errorPayload/,
    "upscale must not hand-serialize the error payload"
  );
});
