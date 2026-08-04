import { test } from "node:test";
import assert from "node:assert/strict";
import {
  parseVersionArg,
  buildDockerArgs,
  CONTAINER_SCRIPT,
} from "../../scripts/release/verify-published.mjs";

// WS1.4 (v3.8.49 quality plan) — pure-function guards for the post-publish verifier
// (clean-container install of the PUBLISHED bytes + boot). The end-to-end path is
// exercised live against the registry; these pin the safety-relevant logic.

test("parseVersionArg accepts strict semver incl. prerelease", () => {
  assert.equal(parseVersionArg("3.8.48"), "3.8.48");
  assert.equal(parseVersionArg("3.9.0-rc.1"), "3.9.0-rc.1");
});

test("parseVersionArg rejects shell-hostile and malformed input", () => {
  for (const bad of ["", "3.8", "latest", "3.8.48; rm -rf /", "$(whoami)", "3.8.48 && x"]) {
    assert.equal(parseVersionArg(bad), null, `should reject: ${bad}`);
  }
});

test("buildDockerArgs passes the version via env, never into the script body", () => {
  const args = buildDockerArgs("3.8.48");
  assert.equal(args[0], "run");
  assert.ok(args.includes("VERIFY_VERSION=3.8.48"), "version must travel as -e env");
  const script = args[args.length - 1];
  assert.equal(script, CONTAINER_SCRIPT);
  assert.ok(!script.includes("3.8.48"), "script body must not embed the version (Hard Rule #13)");
  assert.ok(args.includes("node:24-slim"), "clean base image");
  assert.ok(args.includes("--rm"), "container must not linger");
});

test("container script installs from the registry and polls health with a version match", () => {
  assert.ok(CONTAINER_SCRIPT.includes('npm install -g "omniroute@${VERIFY_VERSION}"'));
  assert.ok(CONTAINER_SCRIPT.includes("/api/monitoring/health"));
  assert.ok(CONTAINER_SCRIPT.includes("body.version === want"), "must assert the served version");
  assert.ok(CONTAINER_SCRIPT.includes("WRONG VERSION"), "must fail loudly on version mismatch");
});
