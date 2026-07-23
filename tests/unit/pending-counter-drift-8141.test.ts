import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, "..", "..");

const src = readFileSync(
  join(repoRoot, "open-sse/utils/streamHandler.ts"),
  "utf-8",
);

test("#8141: clearPendingRequest does not swallow trackPendingRequest errors silently", () => {
  // Extract just the clearPendingRequest function body
  const fnStart = src.indexOf("const clearPendingRequest");
  assert.ok(fnStart > -1, "clearPendingRequest function must exist");
  const fnSlice = src.slice(fnStart, fnStart + 800);

  // The catch after trackPendingRequest must NOT be empty
  const trackCallIdx = fnSlice.indexOf("trackPendingRequest");
  assert.ok(trackCallIdx > -1, "trackPendingRequest must be called");

  // Find the catch block after the trackPendingRequest call
  const afterTrack = fnSlice.slice(trackCallIdx);
  const catchMatch = afterTrack.match(/catch\s*\(/);
  assert.ok(catchMatch, "catch block must capture the error variable (not empty)");

  // Verify it logs the error
  assert.match(
    afterTrack,
    /console\.(error|warn)/,
    "catch block must log the error for observability",
  );
  assert.match(
    afterTrack,
    /trackPendingRequest decrement failed/,
    "error message must mention decrement failure for debuggability",
  );
});
