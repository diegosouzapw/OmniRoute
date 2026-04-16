import test from "node:test";
import assert from "node:assert/strict";

import {
  SUPPORTED_NODE_RANGE,
  getNodeRuntimeSupport,
  getNodeRuntimeWarning,
  parseNodeVersion,
} from "../../src/shared/utils/nodeRuntimeSupport.ts";

test("parseNodeVersion normalizes v-prefixed versions", () => {
  assert.deepEqual(parseNodeVersion("v22.22.2"), {
    raw: "v22.22.2",
    normalized: "22.22.2",
    major: 22,
    minor: 22,
    patch: 2,
  });
});

test("getNodeRuntimeSupport accepts patched Node 22 and 20 LTS lines", () => {
  assert.deepEqual(getNodeRuntimeSupport("22.22.2"), {
    nodeVersion: "v22.22.2",
    nodeCompatible: true,
    reason: "supported",
    supportedRange: SUPPORTED_NODE_RANGE,
    supportedDisplay: "Node.js 20.20.2+ (20.x LTS) or 22.22.2+ (22.x LTS)",
    recommendedVersion: "v22.22.2",
    minimumSecureVersion: "v22.22.2",
  });

  assert.equal(getNodeRuntimeSupport("20.20.2").nodeCompatible, true);
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
  const node24 = getNodeRuntimeSupport("24.1.0");

  assert.equal(node18.nodeCompatible, false);
  assert.equal(node18.reason, "unsupported-major");
  assert.match(getNodeRuntimeWarning("18.20.8") || "", /outside OmniRoute's approved secure/i);

  assert.equal(node24.nodeCompatible, false);
  assert.equal(node24.reason, "native-addon-incompatible");
  assert.match(
    getNodeRuntimeWarning("24.1.0") || "",
    /better-sqlite3 does not support Node\.js 24\+/i
  );
});
