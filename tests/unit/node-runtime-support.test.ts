import test from "node:test";
import assert from "node:assert/strict";

import {
  SUPPORTED_NODE_RANGE,
  getNodeRuntimeSupport,
  getNodeRuntimeWarning,
  parseNodeVersion,
} from "../../src/shared/utils/nodeRuntimeSupport.ts";
import {
  getNodeRuntimeSupport as getCliNodeRuntimeSupport,
  getNodeRuntimeWarning as getCliNodeRuntimeWarning,
} from "../../bin/nodeRuntimeSupport.mjs";

test("parseNodeVersion normalizes v-prefixed versions", () => {
  assert.deepEqual(parseNodeVersion("v22.22.2"), {
    raw: "v22.22.2",
    normalized: "22.22.2",
    major: 22,
    minor: 22,
    patch: 2,
  });
});

test("getNodeRuntimeSupport accepts patched Node 24 and 22 LTS lines", () => {
  assert.deepEqual(getNodeRuntimeSupport("22.22.2"), {
    nodeVersion: "v22.22.2",
    nodeCompatible: true,
    reason: "supported",
    supportedRange: SUPPORTED_NODE_RANGE,
    supportedDisplay:
      "Node.js 22.22.2+ (22.x LTS), 24.0.0+ (24.x LTS), 25.0.0+ (25.x), or 26.0.0+ (26.x)",
    recommendedVersion: "v24.14.1",
    minimumSecureVersion: "v22.22.2",
  });

  assert.equal(getNodeRuntimeSupport("26.0.0").nodeCompatible, true);
  assert.deepEqual(getNodeRuntimeSupport("24.1.0"), {
    nodeVersion: "v24.1.0",
    nodeCompatible: true,
    reason: "supported",
    supportedRange: SUPPORTED_NODE_RANGE,
    supportedDisplay:
      "Node.js 22.22.2+ (22.x LTS), 24.0.0+ (24.x LTS), 25.0.0+ (25.x), or 26.0.0+ (26.x)",
    recommendedVersion: "v24.14.1",
    minimumSecureVersion: "v24.0.0",
  });
});

test("getNodeRuntimeSupport rejects versions below the secure floor in a supported line", () => {
  const support = getNodeRuntimeSupport("22.22.1");

  assert.equal(support.nodeCompatible, false);
  assert.equal(support.reason, "below-security-floor");
  assert.equal(support.minimumSecureVersion, "v22.22.2");
  assert.match(getNodeRuntimeWarning("22.22.1") || "", /below the patched minimum v22\.22\.2/i);
});

test("getNodeRuntimeSupport rejects unsupported major lines", () => {
  const node18 = getNodeRuntimeSupport("18.20.8");
  const node20 = getNodeRuntimeSupport("20.20.2");
  const node27 = getNodeRuntimeSupport("27.1.0");

  assert.equal(node18.nodeCompatible, false);
  assert.equal(node18.reason, "unsupported-major");
  assert.match(getNodeRuntimeWarning("18.20.8") || "", /outside OmniRoute's approved secure/i);

  // Node 20.x is no longer supported (aligned to package.json engines >=22).
  assert.equal(node20.nodeCompatible, false);
  assert.equal(node20.reason, "unsupported-major");

  assert.equal(node27.nodeCompatible, false);
  assert.equal(node27.reason, "unreleased-major");
  assert.match(
    getNodeRuntimeWarning("27.1.0") || "",
    /currently supports Node\.js 22\.x, 24\.x, 25\.x, and 26\.x/i
  );
});

test("CLI runtime support stays aligned with the shared runtime policy", () => {
  assert.deepEqual(getCliNodeRuntimeSupport("24.1.0"), getNodeRuntimeSupport("24.1.0"));
  assert.deepEqual(getCliNodeRuntimeSupport("22.22.2"), getNodeRuntimeSupport("22.22.2"));
  assert.equal(getCliNodeRuntimeWarning("27.1.0"), getNodeRuntimeWarning("27.1.0"));
});
