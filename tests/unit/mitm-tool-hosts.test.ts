import test from "node:test";
import assert from "node:assert/strict";

import { ALL_TARGETS } from "../../src/mitm/targets/index.ts";
import { MITM_TOOL_HOSTS, getMitmToolHosts } from "../../src/shared/constants/mitmToolHosts.ts";

// The dashboard cannot import the node-only MITM target modules, so MITM_TOOL_HOSTS is a
// client-safe copy of each target's hosts. This guards against the copy drifting from the
// canonical registry (port from 9router#788).
test("MITM_TOOL_HOSTS stays in sync with the canonical MITM target registry", () => {
  const fromRegistry: Record<string, string[]> = {};
  for (const target of ALL_TARGETS) {
    fromRegistry[target.id] = target.hosts;
  }

  assert.deepEqual(
    MITM_TOOL_HOSTS,
    fromRegistry,
    "MITM_TOOL_HOSTS must exactly match ALL_TARGETS hosts — update src/shared/constants/mitmToolHosts.ts"
  );
});

test("getMitmToolHosts returns the hosts for a known tool and [] for unknown ids", () => {
  assert.ok(getMitmToolHosts("antigravity").includes("cloudcode-pa.googleapis.com"));
  assert.deepEqual(getMitmToolHosts("does-not-exist"), []);
});
