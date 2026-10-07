/**
 * The four spoofed CLI fingerprints are captured pins. Upstream gates new
 * models on the advertised client version, so a pin that lags the published
 * CLI is a silent 400, not a cosmetic mismatch.
 *
 * This test does not hit the network. It feeds a published-version map into
 * the same comparison the check script uses, and proves a stale pin fails
 * while an equal pin passes.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  compareFingerprintPins,
  exitCodeForFingerprintCheck,
  platformVersionFromLauncherDeps,
  FINGERPRINT_SOURCES,
  type FingerprintDrift,
  type FingerprintId,
  type PublishedCliVersion,
} from "../../scripts/check/check-cli-fingerprint-drift.ts";

const PINS = Object.fromEntries(
  FINGERPRINT_SOURCES.map((source) => [source.id, source.pinned])
) as Record<FingerprintId, string>;

function published(version: string): PublishedCliVersion {
  return { version, source: "test" };
}

test("a pin behind the published CLI is drift even when the other three match", () => {
  const drift = compareFingerprintPins(
    { ...PINS, "claude-code": "0.0.1" },
    {
      "claude-code": published("2.1.280"),
      codex: published(PINS.codex),
      copilot: published(PINS.copilot),
      "grok-build": published(PINS["grok-build"]),
    }
  );

  assert.deepEqual(
    drift.map((row) => row.id),
    ["claude-code"]
  );
  assert.equal(drift[0]?.pinned, "0.0.1");
  assert.equal(drift[0]?.published, "2.1.280");
});

test("pins that match the published CLI are not drift", () => {
  const drift = compareFingerprintPins(PINS, {
    "claude-code": published(PINS["claude-code"]),
    codex: published(PINS.codex),
    copilot: published(PINS.copilot),
    "grok-build": published(PINS["grok-build"]),
  });

  assert.deepEqual(drift, []);
});

test("a missing published version is reported, not treated as equal", () => {
  const drift = compareFingerprintPins(PINS, {
    "claude-code": null,
    codex: published(PINS.codex),
    copilot: published(PINS.copilot),
    "grok-build": published(PINS["grok-build"]),
  });

  assert.equal(drift.length, 1);
  assert.equal(drift[0]?.published, null);
});

const ONE_DRIFT: FingerprintDrift[] = [
  { id: "codex", pinned: "0.0.1", published: "9.9.9", source: "test" },
];

test("one unreachable registry exits 0 even when another pin is already behind", () => {
  assert.equal(exitCodeForFingerprintCheck(["claude-code: ENOTFOUND"], ONE_DRIFT), 0);
});

test("drift exits 1 only when every published version was read", () => {
  assert.equal(exitCodeForFingerprintCheck([], ONE_DRIFT), 1);
  assert.equal(exitCodeForFingerprintCheck([], []), 0);
});

test("grok reads the platform binary package, not the launcher", () => {
  const grok = FINGERPRINT_SOURCES.find((source) => source.id === "grok-build");
  assert.equal(grok?.platformPackage, "@xai-official/grok-linux-x64");
  assert.notEqual(grok?.platformPackage, grok?.npmPackage);
});

test("grok's wire version is the platform binary the launcher installs, not the platform package's latest tag", () => {
  // Captured 2026-09-25: `@xai-official/grok@1.0.41` pins every platform binary
  // to 1.0.41, and that binary hardcodes `x-grok-client-version: 1.0.41`. The
  // platform package's own `latest` dist-tag is frozen at 0.1.220 (May 2026),
  // so `npm view @xai-official/grok-linux-x64 version` reports a binary nobody
  // installs any more.
  const launcherOptionalDeps = {
    "@xai-official/grok-linux-x64": "1.0.41",
    "@xai-official/grok-darwin-arm64": "1.0.41",
  };
  assert.equal(
    platformVersionFromLauncherDeps(launcherOptionalDeps, "@xai-official/grok-linux-x64"),
    "1.0.41"
  );
  assert.equal(
    platformVersionFromLauncherDeps([launcherOptionalDeps], "@xai-official/grok-linux-x64"),
    "1.0.41",
    "npm view --json wraps the field in an array when the version has two dist-tags"
  );
  assert.equal(platformVersionFromLauncherDeps({}, "@xai-official/grok-linux-x64"), null);
  assert.equal(
    platformVersionFromLauncherDeps(
      { "@xai-official/grok-linux-x64": "^1.0.0" },
      "@xai-official/grok-linux-x64"
    ),
    null,
    "a range is not a pinned binary version"
  );
});

test("the grok pin matches the platform binary shipped by the published launcher", () => {
  const grok = FINGERPRINT_SOURCES.find((source) => source.id === "grok-build");
  assert.equal(grok?.pinned, "1.0.41");
});
