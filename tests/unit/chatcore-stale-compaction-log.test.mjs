// Regression guard for #11977: the diagnostic log fired unconditionally whenever
// promptCompressionEnabled was false, claiming "reactive context compaction still
// applies when over threshold" even on a default install where
// reactiveContextCompactionEnabled is ALSO false (DEFAULT_COMPRESSION_CONFIG.enabled
// === false, per #9200's gating). That left operators with zero diagnostic signal for
// the real failure mode: large histories reaching the upstream provider untrimmed
// (e.g. Antigravity's 400 once session history grows past its real request-size
// ceiling). The fix branches the log on reactiveContextCompactionEnabled so the
// message reflects which safety net, if any, is actually still active.
import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const source = readFileSync(
  new URL("../../open-sse/handlers/chatCore.ts", import.meta.url),
  "utf8"
);

test("gating expressions exist as documented (sanity check, tracks real source)", () => {
  assert.match(
    source,
    /let promptCompressionEnabled =\s*\n\s*compressionSettingsResult\.enabled && !compressionExcluded && apiKeyCompressionEnabled;/
  );
  assert.match(
    source,
    /reactiveContextCompactionEnabled = compressionSettingsResult\.enabled && !compressionExcluded;/
  );
});

test("on default install, reactiveContextCompactionEnabled is provably false whenever the log fires", () => {
  const compressionSettingsResultEnabled = false; // DEFAULT_COMPRESSION_CONFIG.enabled
  const compressionExcluded = false;
  const apiKeyCompressionEnabled = true;

  const promptCompressionEnabled =
    compressionSettingsResultEnabled && !compressionExcluded && apiKeyCompressionEnabled;
  const reactiveContextCompactionEnabled = compressionSettingsResultEnabled && !compressionExcluded;

  const logFires = !promptCompressionEnabled;

  assert.equal(logFires, true, "the log fires on every default-config request");
  assert.equal(
    reactiveContextCompactionEnabled,
    false,
    "reactive compaction is ALSO disabled here — the old unconditional message was false for this branch"
  );
});

test("the log statement branches on reactiveContextCompactionEnabled so it stays accurate in both cases", () => {
  const blockMatch = source.match(
    /if \(!promptCompressionEnabled\) \{[\s\S]{0,400}\}/
  );
  assert.ok(blockMatch, "expected to find the promptCompressionEnabled debug-log block");
  const block = blockMatch[0];

  assert.match(
    block,
    /reactiveContextCompactionEnabled/,
    "expected the debug-log block to branch on reactiveContextCompactionEnabled"
  );
  assert.match(
    block,
    /still applies when over threshold/,
    "expected the true-branch message (reactive compaction still active) to be preserved"
  );
  assert.match(
    block,
    /reactive context compaction is ALSO disabled/,
    "expected a distinct false-branch message for the fully-disabled default-install case"
  );
});
