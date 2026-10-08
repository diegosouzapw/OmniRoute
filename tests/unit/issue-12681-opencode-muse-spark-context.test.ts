import { test } from "node:test";
import assert from "node:assert/strict";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import { getTokenLimit } from "../../open-sse/services/contextManager.ts";

test("#12681: opencode registry declares an explicit real contextLength for muse-spark-1.2 models", () => {
  const opencode = REGISTRY["opencode"];
  const museSpark = opencode.models.find((m) => m.id === "muse-spark-1.2");
  const museSparkFree = opencode.models.find((m) => m.id === "muse-spark-1.2-contributor-free");
  assert.notEqual(
    museSpark?.contextLength,
    undefined,
    "muse-spark-1.2 should declare its own real contextLength instead of relying on the 200000 provider default"
  );
  assert.notEqual(
    museSparkFree?.contextLength,
    undefined,
    "muse-spark-1.2-contributor-free should declare its own real contextLength instead of relying on the 200000 provider default"
  );
});

test("#12681: opencode-zen registry declares an explicit real contextLength for muse-spark-1.2 models", () => {
  const zen = REGISTRY["opencode-zen"];
  const museSpark = zen.models.find((m) => m.id === "muse-spark-1.2");
  const museSparkFree = zen.models.find((m) => m.id === "muse-spark-1.2-contributor-free");
  assert.notEqual(museSpark?.contextLength, undefined);
  assert.notEqual(museSparkFree?.contextLength, undefined);
});

test("#12681: contextManager.getTokenLimit resolves muse-spark-1.2-contributor-free to its real 1M+ window, not the 200000 provider default", () => {
  assert.equal(getTokenLimit("opencode", "muse-spark-1.2-contributor-free"), 1048576);
  assert.equal(getTokenLimit("opencode-zen", "muse-spark-1.2-contributor-free"), 1048576);
});
