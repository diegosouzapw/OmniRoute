import { test } from "node:test";
import assert from "node:assert/strict";
import { getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";

// Regression guard: the GitHub Copilot (`gh`) provider must expose `gpt-4o-mini`
// alongside the curated date-pinned GPT-4o model. Copilot serves the cheaper mini variant via
// chat/completions, so apps that hard-code `gpt-4o-mini` should resolve to the
// Copilot provider.
//
// Ported from upstream decolua/9router (add GPT-4o mini to GitHub Copilot).

test("github (Copilot) provider exposes gpt-4o-mini next to curated GPT-4o", () => {
  const entry = getRegistryEntry("github");
  assert.ok(entry, "github registry entry should exist");
  assert.ok(entry.models, "github registry entry should have a models array");

  const ids = entry.models!.map((m) => m.id);
  assert.ok(ids.includes("gpt-4o-2024-11-20"), "date-pinned gpt-4o should remain registered");
  assert.ok(
    ids.includes("gpt-4o-mini"),
    "gpt-4o-mini should be registered on the Copilot (gh) provider"
  );

  const mini = entry.models!.find((m) => m.id === "gpt-4o-mini");
  assert.equal(mini?.name, "GPT-4o mini");
  assert.equal(mini?.contextLength, 128000);
  assert.equal(ids.includes("gpt-4o"), false, "bare gpt-4o is not in the curated list");
});
