import test from "node:test";
import assert from "node:assert/strict";

import { getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";

const { getNextFamilyFallback } = await import("../../open-sse/services/modelFamilyFallback.ts");

// Regression for #8134 — GitHub Copilot ("github", alias "gh") T5 family fallback
// returned "claude-opus-4-6" verbatim even though the github registry catalog
// (Opus 4.8 / 4.8-fast / 4.7 / 4.5) has NO 4.6 tier under any dot/hyphen
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

test("#8134: github claude-opus-4.8 fallback chain never returns an unsupported tier (claude-opus-4-6)", () => {
  const github = getRegistryEntry("github");
  assert.ok(github, "expected the github registry entry to resolve");
  const githubIds = new Set(github.models.map((m) => m.id));
  assert.ok(
    !githubIds.has("claude-opus-4-6") && !githubIds.has("claude-opus-4.6"),
    "fixture assumption broken: github registry now has a 4.6 tier"
  );

  const tried = new Set(["github/claude-opus-4.8"]);
  const first = getNextFamilyFallback("github/claude-opus-4.8", tried);
  assert.ok(first, "expected a first fallback candidate");
  const firstBareId = first.replace(/^github\//, "");
  assert.ok(
    githubIds.has(firstBareId),
    `first fallback "${first}" is not in github's registered model catalog: ${[...githubIds].join(", ")}`
  );

  tried.add(first);
  const second = getNextFamilyFallback(first, tried);
  assert.ok(second, "expected a second fallback candidate (family must not be silently exhausted)");
  const secondBareId = second.replace(/^github\//, "");
  assert.ok(
    githubIds.has(secondBareId),
    `second fallback "${second}" is not in github's registered model catalog: ${[...githubIds].join(", ")}`
  );
  assert.notEqual(secondBareId, "claude-opus-4-6");
  assert.notEqual(secondBareId, "claude-opus-4.6");
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
