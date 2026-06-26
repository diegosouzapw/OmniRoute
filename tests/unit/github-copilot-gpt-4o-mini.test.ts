import { test } from "node:test";
import assert from "node:assert/strict";
import { getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";

// Regression guard: the GitHub Copilot (`gh`) provider must expose `gpt-4o-mini`
// alongside `gpt-4o`. Copilot serves the cheaper mini variant via
// chat/completions, so apps that hard-code `gpt-4o-mini` should resolve to the
// Copilot provider — not only to the separate github-models (`ghm`) marketplace
// entry, which lists it under the `openai/` prefix (`openai/gpt-4o-mini`).
//
// Ported from upstream decolua/9router (add GPT-4o mini to GitHub Copilot).

test("github (Copilot) provider exposes gpt-4o-mini next to gpt-4o", () => {
  const entry = getRegistryEntry("github");
  assert.ok(entry, "github registry entry should exist");
  assert.ok(entry.models, "github registry entry should have a models array");

  const ids = entry.models!.map((m) => m.id);
  assert.ok(ids.includes("gpt-4o"), "gpt-4o should remain registered");
  assert.ok(
    ids.includes("gpt-4o-mini"),
    "gpt-4o-mini should be registered on the Copilot (gh) provider"
  );

  const mini = entry.models!.find((m) => m.id === "gpt-4o-mini");
  assert.equal(mini?.name, "GPT-4o mini");
  assert.equal(mini?.contextLength, 128000);
});

test("Copilot gpt-4o-mini is distinct from the github-models openai/gpt-4o-mini", () => {
  const copilot = getRegistryEntry("github");
  const marketplace = getRegistryEntry("github-models");

  const copilotIds = (copilot?.models ?? []).map((m) => m.id);
  const marketplaceIds = (marketplace?.models ?? []).map((m) => m.id);

  // The two providers reference the same upstream model under different ids:
  // Copilot uses the bare `gpt-4o-mini`; the marketplace uses `openai/gpt-4o-mini`.
  assert.ok(copilotIds.includes("gpt-4o-mini"));
  assert.ok(marketplaceIds.includes("openai/gpt-4o-mini"));
  assert.ok(
    !copilotIds.includes("openai/gpt-4o-mini"),
    "Copilot should not carry the marketplace-prefixed id"
  );
});
