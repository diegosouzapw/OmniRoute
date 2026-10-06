import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * #10427 — the packaged artifact carries `dist/BUILD_SHA`, but nothing ever checked that
 * the SHA belongs to the release line. A tarball built from a feature branch installs and
 * runs indistinguishably from a release build.
 *
 * That is exactly how the internal gateway ended up serving a build from
 * `fix/9603-qwen-token-plan-quota` (SHA 178febc50f) that predated #10373: every request
 * died with `502 … Executor result must contain a Response`, and the only way to find out
 * what was actually deployed was SSH + grepping the compiled chunks.
 *
 * Two defenses, both covered here:
 *  - `resolveBuildProvenance()` classifies a build SHA against the release line.
 *  - the health payload exposes `buildSha`, so what is deployed is auditable over HTTP.
 */

const { resolveBuildProvenance } = await import("../../scripts/build/buildProvenance.ts");
const { buildHealthPayload } = await import("../../src/lib/monitoring/observability.ts");

function makeRepo(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-prov-"));
  return dir;
}

test("P1: a SHA on the release line is accepted", () => {
  const result = resolveBuildProvenance({
    buildSha: "abc1234",
    isAncestorOfRelease: () => true,
    allowOverride: false,
  });
  assert.equal(result.ok, true);
  assert.equal(result.reason, "on-release-line");
});

test("P2: a SHA from an unrelated branch is REJECTED — the #10427 incident", () => {
  const result = resolveBuildProvenance({
    buildSha: "178febc50f",
    isAncestorOfRelease: () => false,
    allowOverride: false,
  });
  assert.equal(result.ok, false);
  assert.equal(result.reason, "off-release-line");
  assert.match(
    result.message,
    /release/i,
    "the failure must say what is wrong so a human can act on it"
  );
});

test("P3: an explicit canary override is allowed but recorded, never silent", () => {
  const result = resolveBuildProvenance({
    buildSha: "178febc50f",
    isAncestorOfRelease: () => false,
    allowOverride: true,
  });
  assert.equal(result.ok, true);
  assert.equal(result.reason, "canary-override");
  assert.match(result.message, /canary/i);
});

test("P4: a missing BUILD_SHA is a failure, not a pass-by-default", () => {
  const result = resolveBuildProvenance({
    buildSha: "",
    isAncestorOfRelease: () => true,
    allowOverride: false,
  });
  assert.equal(result.ok, false);
  assert.equal(result.reason, "missing-sha");
});

test("P5: a missing BUILD_SHA is not excused by the canary override either", () => {
  const result = resolveBuildProvenance({
    buildSha: "",
    isAncestorOfRelease: () => false,
    allowOverride: true,
  });
  assert.equal(result.ok, false, "an unidentifiable artifact can never be validated");
  assert.equal(result.reason, "missing-sha");
});

test("P6: readBuildSha returns the trimmed sentinel, or empty when absent", async () => {
  const { readBuildSha } = await import("../../scripts/build/buildProvenance.ts");
  const repo = makeRepo();
  try {
    assert.equal(readBuildSha(repo), "", "no dist/BUILD_SHA → empty, never a throw");
    fs.mkdirSync(path.join(repo, "dist"), { recursive: true });
    fs.writeFileSync(path.join(repo, "dist", "BUILD_SHA"), "e05ac345da\n");
    assert.equal(readBuildSha(repo), "e05ac345da");
  } finally {
    fs.rmSync(repo, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

/** Minimal but complete options for buildHealthPayload — only `buildSha` varies below. */
function healthOptions(buildSha?: string) {
  return {
    appVersion: "3.8.50",
    ...(buildSha === undefined ? {} : { buildSha }),
    settings: { setupComplete: true },
    connections: [],
    circuitBreakers: [],
    rateLimitStatus: {},
    learnedLimits: {},
    lockouts: {},
    localProviders: {},
    inflightRequests: 0,
    quotaMonitorSummary: {},
    quotaMonitorMonitors: [],
    activeSessions: [],
  } as unknown as Parameters<typeof buildHealthPayload>[0];
}

test("P7: the health payload exposes buildSha so deployments are auditable over HTTP", () => {
  const payload = buildHealthPayload(healthOptions("e05ac345da"));
  assert.equal(
    (payload.system as { buildSha?: string }).buildSha,
    "e05ac345da",
    "without this, identifying a bad deploy needs SSH + grepping compiled chunks"
  );
});

test("P8: health stays valid when no buildSha is known (dev runs)", () => {
  const payload = buildHealthPayload(healthOptions());
  const system = payload.system as { version?: string; buildSha?: string };
  assert.equal(system.version, "3.8.50", "the existing contract must not regress");
  assert.ok(
    system.buildSha === undefined || system.buildSha === null || system.buildSha === "",
    "an unknown build SHA must be absent/empty, never a fabricated value"
  );
});
