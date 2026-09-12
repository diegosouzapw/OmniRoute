import test from "node:test";
import assert from "node:assert/strict";

import { getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";

const { getNextFamilyFallback } = await import("../../open-sse/services/modelFamilyFallback.ts");

// Regression for #8134 — GitHub Copilot ("github", alias "gh") T5 family fallback
// returned "claude-opus-4-6" verbatim even though the github registry catalog at
// the time (Opus 4.8 / 4.8-fast / 4.7 / 4.5) had NO 4.6 tier under any dot/hyphen
// notation. getNextFamilyFallback() resolved `supportedIds` from the provider's
// registry but only used it to try notation variants of a candidate, never to
// filter out a candidate that is provably absent from the catalog — so the
// unsupported id fell through and was returned anyway, costing a 3rd wasted
// upstream round-trip before the family was exhausted.
//
// Fix: when the provider registry is resolved, getNextFamilyFallback() now
// skips (continue) any family candidate that has no match in supportedIds
// under ANY notation (hyphen, dot, or a dated-snapshot id with the date
// suffix stripped) instead of returning it unfiltered.
//
// The curated catalog retired Opus 4.7/4.6/4.5. The ladder must now skip
// those tiers and land on the still-supported Sonnet 5.
test("#8134: github fallback skips retired Opus tiers and reaches Sonnet 5", () => {
  const github = getRegistryEntry("github");
  assert.ok(github);
  const githubIds = new Set(github.models.map((m) => m.id));
  for (const id of [
    "claude-opus-4.7",
    "claude-opus-4.6",
    "claude-opus-4.5",
    "claude-opus-4-6-thinking",
  ]) {
    assert.equal(githubIds.has(id), false);
  }
  const current = "github/claude-opus-4.8";
  const tried = new Set([current]);
  const next = getNextFamilyFallback(current, tried);
  assert.equal(next, "github/claude-sonnet-5");
  tried.add(next!);
  assert.equal(getNextFamilyFallback(next!, tried), null);
});

test("#8134: getNextFamilyFallback never returns a candidate absent from the resolved provider's catalog", () => {
  const github = getRegistryEntry("github");
  assert.ok(github);
  const githubIds = new Set(github.models.map((m) => m.id));

  let current = "github/claude-opus-4.8";
  const tried = new Set([current]);
  for (let hop = 0; hop < 5; hop++) {
    const next = getNextFamilyFallback(current, tried);
    if (!next) break;
    const bareId = next.replace(/^github\//, "");
    assert.ok(
      githubIds.has(bareId),
      `hop ${hop + 1}: "${next}" is not in github's registered model catalog`
    );
    tried.add(next);
    current = next;
  }
});
