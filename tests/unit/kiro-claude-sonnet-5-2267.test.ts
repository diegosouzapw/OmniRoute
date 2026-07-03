import test from "node:test";
import assert from "node:assert/strict";

import { kiroProvider } from "../../open-sse/config/providers/registry/kiro/index.ts";

const { getNextFamilyFallback } = await import("../../open-sse/services/modelFamilyFallback.ts");

// Regression for the port of decolua/9router#2267 ("claude-sonnet-5 is not supported"),
// upstream PR diegosouzapw/OmniRoute#5796.
//
// The Kiro provider's OAuth model catalog lives in `registry/kiro/index.ts` `models[]`.
// That list is both the model selector's source and the fallback for the live
// CodeWhisperer ListAvailableModels fetch (`kiroModels.ts::toFallbackResult`). Because
// `claude-sonnet-5` — a real, shipping Anthropic model already served by Kiro — was
// missing from it, the model could not be selected or routed on the Kiro provider even
// though the account had access. The fix adds the single model entry (mirroring the
// existing Claude entries), with the 1M-context / 128K-output capability Kiro serves it at.

test("kiro registry exposes claude-sonnet-5", () => {
  const ids = kiroProvider.models.map((m) => m.id);
  assert.ok(
    ids.includes("claude-sonnet-5"),
    `expected kiro registry to include claude-sonnet-5, got: ${ids.join(", ")}`
  );
});

test("kiro claude-sonnet-5 declares the 1M-context / 128K-output capability", () => {
  const sonnet5 = kiroProvider.models.find((m) => m.id === "claude-sonnet-5");
  assert.ok(sonnet5, "claude-sonnet-5 must be present in the kiro registry");
  assert.equal(sonnet5.name, "Claude Sonnet 5");
  assert.equal(sonnet5.contextLength, 1000000);
  assert.equal(sonnet5.maxOutputTokens, 128000);
});

test("claude-sonnet-5 degrades to the Sonnet family, not Opus", () => {
  // Sonnet 5 is Sonnet-tier: its first fallback must be a cheaper Sonnet, never an Opus.
  const next = getNextFamilyFallback("kiro/claude-sonnet-5", new Set(["kiro/claude-sonnet-5"]));
  assert.ok(
    next && /claude-sonnet-4/.test(next),
    `expected claude-sonnet-5 to fall back within the Sonnet family, got: ${next}`
  );
});
