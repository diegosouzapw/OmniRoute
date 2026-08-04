import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// Regression guard for #5991 — clicking "Update now" showed an "Internal Server
// Error" screen (Minified React error #31). The handler POSTs /api/system/version
// (a loopback-only auto-update endpoint) and, on a non-OK JSON response, did:
//     notify.error(data.error || "Failed to start update.");
// OmniRoute's error envelope is `{ error: { code, message, correlation_id } }`, so
// `data.error` is an OBJECT. notify.error rendered that object as a React child →
// React #31 crash. The fix funnels the body through extractApiErrorMessage() (the
// same helper introduced in #5340) so a string always reaches the toast.

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(
  resolve(here, "../../../src/app/(dashboard)/dashboard/HomePageClient.tsx"),
  "utf8"
);

test("HomePageClient imports the safe API error extractor", () => {
  assert.match(
    source,
    /import\s*\{\s*extractApiErrorMessage\s*\}\s*from\s*["']@\/shared\/http\/apiErrorMessage["']/,
    "HomePageClient must import extractApiErrorMessage to render API errors safely (#5991)"
  );
});

test("the update-error handler funnels the body through extractApiErrorMessage (#5991)", () => {
  // The update failure path must extract a string, not hand the raw envelope object
  // (which triggers React #31) to notify.error.
  assert.match(
    source,
    /notify\.error\(\s*extractApiErrorMessage\(\s*data\s*,/,
    "the update-error notify.error must use extractApiErrorMessage(data, …) (#5991)"
  );
});

test("the update-error handler never passes the raw error object to notify.error (#5991)", () => {
  // The pre-fix pattern `notify.error(data.error || …)` rendered an object as a React
  // child. It must not come back.
  assert.doesNotMatch(
    source,
    /notify\.error\(\s*data\.error\b/,
    "notify.error(data.error …) renders the error envelope object as a React child → React #31 (#5991)"
  );
});
