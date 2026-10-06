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
// Fixture note: #10952 later added claude-opus-4.6 to the github registry, so
// the provably-absent tier used by the fixture moved to claude-opus-4-6-thinking
// (the ladder's first candidate after 4.6 — still absent from the catalog).

test("#8134: github claude-opus fallback chain never returns an unsupported tier (claude-opus-4-6-thinking)", () => {
  const github = getRegistryEntry("github");
  assert.ok(github, "expected the github registry entry to resolve");
  const githubIds = new Set(github.models.map((m) => m.id));
  // Fixture assumption: #10952 added claude-opus-4.6 to the github registry, so
  // the original absent-tier role moved to the 4.6-thinking variant, which the
  // catalog still does NOT carry under any notation.
  assert.ok(
    !githubIds.has("claude-opus-4-6-thinking") && !githubIds.has("claude-opus-4.6-thinking"),
    "fixture assumption broken: github registry now has a 4.6-thinking tier"
  );

  // Ladder reality: 4.8 -> 4.7 -> 4.6 -> [4-6-thinking (absent), 4-5-20251101,
  // sonnet-5]. The absent 4-6-thinking must be SKIPPED — the third hop resolves
  // to the dated 4.5 snapshot's undated catalog entry, never to 4-6-thinking.
  const tried = new Set(["github/claude-opus-4.8"]);
  const hops: string[] = [];
  let current = "github/claude-opus-4.8";
  for (let hop = 0; hop < 3; hop++) {
    const next = getNextFamilyFallback(current, tried);
    assert.ok(next, `hop ${hop + 1}: family must not be silently exhausted`);
    const bareId = next!.replace(/^github\//, "");
    assert.ok(
      githubIds.has(bareId),
      `hop ${hop + 1}: "${next}" is not in github's registered model catalog: ${[...githubIds].join(", ")}`
    );
    assert.notEqual(bareId, "claude-opus-4-6-thinking");
    assert.notEqual(bareId, "claude-opus-4.6-thinking");
    tried.add(next!);
    hops.push(next!);
    current = next!;
  }
  // The skip specifically fired: the ladder walks the catalogued tiers in
  // order — 4.7, then 4.6 — before jumping past the absent 4-6-thinking tier
  // straight to the dated 4.5 snapshot's undated catalog entry.
  assert.equal(hops[0].replace(/^github\//, ""), "claude-opus-4.7", "first hop must be 4.7");
  assert.equal(hops[1].replace(/^github\//, ""), "claude-opus-4.6", "second hop must be 4.6");
  assert.equal(hops[2].replace(/^github\//, ""), "claude-opus-4.5");
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
