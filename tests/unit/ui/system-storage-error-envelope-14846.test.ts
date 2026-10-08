import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { extractApiErrorMessage } from "../../../src/shared/http/apiErrorMessage.ts";

// Regression guard for #14846. Settings > Storage "Backup now" and "Import Database"
// replaced the page with the settings error boundary ("Failed to load settings"), and
// "Export Database" showed "Export failed: [object Object]".
//
// /api/db-backups* are ALWAYS_PROTECTED (routeGuard.ts), so an unauthenticated session
// (for example under requireLogin=false with no login) gets the authz pipeline envelope
// `{ error: { code, message, correlation_id } }`. The handlers did
// `data.error || t("...")`, which put that OBJECT into the status alert and rendered it
// as a React child (crash -> error boundary), and `new Error(data.error || ...)` in the
// download helper, which stringified it to "[object Object]".

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(
  resolve(here, "../../../src/app/(dashboard)/dashboard/settings/components/SystemStorageTab.tsx"),
  "utf8"
);

// Shape emitted by rejectionResponse() in src/server/authz/pipeline.ts.
const authEnvelope = {
  error: {
    code: "AUTH_001",
    message: "Authentication required",
    correlation_id: "req-test",
  },
};

test("SystemStorageTab imports the safe API error extractor (#14846)", () => {
  assert.match(
    source,
    /import\s*\{\s*extractApiErrorMessage\s*\}\s*from\s*["']@\/shared\/http\/apiErrorMessage["']/
  );
});

test("no status message is built from the raw `data.error` value (#14846)", () => {
  assert.doesNotMatch(
    source,
    /message:\s*data\??\.error\s*\|\|/,
    "`message: data.error || ...` renders the error envelope object as a React child"
  );
});

test("the download helper never wraps the raw error value in an Error (#14846)", () => {
  assert.doesNotMatch(
    source,
    /new Error\(\s*\(data as \{ error\?: string \}\)\.error/,
    "new Error(data.error) turns the envelope object into '[object Object]'"
  );
  assert.match(source, /throw new Error\(extractApiErrorMessage\(data,\s*errorMessage\)\)/);
});

test("the authz envelope yields a readable string, not [object Object] (#14846)", () => {
  // The pre-fix expression, for contrast.
  const before = new Error((authEnvelope as { error?: unknown }).error as string).message;
  assert.equal(before, "[object Object]");

  const after = new Error(extractApiErrorMessage(authEnvelope, "Export failed")).message;
  assert.equal(after, "Authentication required");
  assert.equal(typeof extractApiErrorMessage(authEnvelope, "Backup failed"), "string");
});

test("route-level string errors and empty bodies still resolve (#14846)", () => {
  assert.equal(
    extractApiErrorMessage({ error: "Database file not found" }, "x"),
    "Database file not found"
  );
  assert.equal(extractApiErrorMessage({}, "Import failed"), "Import failed");
  assert.equal(extractApiErrorMessage(null, "Import failed"), "Import failed");
});
