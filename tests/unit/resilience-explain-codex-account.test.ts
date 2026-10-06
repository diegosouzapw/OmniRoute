import assert from "node:assert/strict";
import test from "node:test";

import { inspectTargetResilience } from "../../src/lib/usage/resilienceExplain.ts";

const NOW = Date.now();
const SPARK_UNTIL = new Date(NOW + 60_000).toISOString();
const CONNECTION = {
  id: "codex-parent",
  provider: "codex",
  testStatus: "active",
  providerSpecificData: {
    codexScopeRateLimitedUntil: { spark: SPARK_UNTIL },
  },
};

async function inspect(model: string | null) {
  return inspectTargetResilience({
    provider: "codex",
    model,
    now: NOW,
    providerConnections: [CONNECTION],
  });
}

test("resilience explanation resolves Codex cooldown through the requested virtual child", async () => {
  const spark = await inspect("gpt-5.3-codex-spark");
  const normal = await inspect("gpt-5.5");
  const parent = await inspect(null);

  assert.equal(
    spark.skipReasons.some((reason) => reason.code === "codex_scope_cooldown"),
    true
  );
  assert.equal(
    normal.skipReasons.some((reason) => reason.code === "codex_scope_cooldown"),
    false
  );
  assert.equal(
    parent.skipReasons.some((reason) => reason.code === "codex_scope_cooldown"),
    false
  );
});
