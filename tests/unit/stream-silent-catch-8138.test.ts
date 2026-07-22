import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, "..", "..");

const src = readFileSync(join(repoRoot, "open-sse/utils/stream.ts"), "utf-8");

test("#8138: onComplete/onFailure catch blocks log errors via streamCbErr", () => {
  // The 4 callback catch blocks must capture and log the error.
  // They use the variable name "streamCbErr" to distinguish from other catch blocks.
  const streamCbErrMatches = src.match(/catch\s*\(streamCbErr\)/g);
  assert.ok(
    streamCbErrMatches && streamCbErrMatches.length === 4,
    `Expected 4 catch(streamCbErr) blocks (2 onComplete + 2 onFailure), found ${streamCbErrMatches?.length ?? 0}`,
  );

  // Each must log via console.debug
  const debugCount = (src.match(/console\.debug\(`\[stream\]/g) || []).length;
  assert.equal(debugCount, 4, "Each callback catch must have console.debug logging");

  // Verify callback names are correct
  assert.match(src, /onComplete callback threw/, "onComplete logging must exist");
  assert.match(src, /onFailure callback threw/, "onFailure logging must exist");
});
