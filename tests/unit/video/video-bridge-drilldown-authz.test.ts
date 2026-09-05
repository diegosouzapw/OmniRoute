import assert from "node:assert/strict";
import test from "node:test";

import {
  buildVideoBridgeDrilldownHeaders,
  VIDEO_BRIDGE_DRILLDOWN_PATH,
} from "../../../src/lib/guardrails/videoBridgeBrokerAuth.ts";
import { managementPolicy } from "../../../src/server/authz/policies/management.ts";

function policyContext(path: string, ip = "127.0.0.1") {
  return {
    request: {
      method: "GET",
      headers: new Headers(buildVideoBridgeDrilldownHeaders("principal-a")),
      ip,
      url: `http://localhost${path}`,
      nextUrl: { pathname: path },
    },
    classification: {
      routeClass: "MANAGEMENT" as const,
      normalizedPath: path,
      reason: "management_api",
    },
    requestId: "req_video_drilldown_authz",
  };
}

test("drill-down principal is canonical visible ASCII and is never silently trimmed", () => {
  assert.throws(() => buildVideoBridgeDrilldownHeaders(" principal-a "), /principal/i);
  assert.throws(() => buildVideoBridgeDrilldownHeaders("principal-á"), /principal/i);
  assert.doesNotThrow(() => buildVideoBridgeDrilldownHeaders("tenant:principal-a"));
});

test("management policy carries the token-bound drill-down self-hop to the route", async () => {
  const outcome = await managementPolicy.evaluate(policyContext(VIDEO_BRIDGE_DRILLDOWN_PATH));

  assert.equal(outcome.allow, true);
  if (outcome.allow) {
    assert.equal(outcome.subject.id, "video-bridge-drilldown");
    assert.equal(outcome.subject.label, "internal-video-bridge-drilldown");
  }

  const adjacent = await managementPolicy.evaluate(
    policyContext("/api/modality-bridge/video/runtime")
  );
  assert.notEqual(
    adjacent.allow ? adjacent.subject.label : "rejected",
    "internal-video-bridge-drilldown",
    "the broker token must not authenticate an adjacent Video Bridge path"
  );

  const remote = await managementPolicy.evaluate(
    policyContext(VIDEO_BRIDGE_DRILLDOWN_PATH, "203.0.113.10")
  );
  assert.equal(remote.allow, false);
  if (!remote.allow) assert.equal(remote.code, "LOCAL_ONLY");
});
