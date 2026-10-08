import test from "node:test";
import assert from "node:assert/strict";

import { getModelsByProviderId } from "../../open-sse/config/providerModels.ts";
import { parseGitHubCopilotModels } from "../../open-sse/services/githubCopilotModels.ts";

test("Copilot excludes gpt-4o-mini from its curated and live catalogs", () => {
  const excluded = ["gpt-4o-mini"];
  const catalog = getModelsByProviderId("github");
  assert.ok(catalog.some((model) => model.id === "gpt-6-astra"));
  for (const id of excluded) assert.ok(!catalog.some((model) => model.id === id), id);
  assert.deepEqual(
    parseGitHubCopilotModels({
      data: excluded.map((id) => ({ id, capabilities: { type: "chat" } })),
    }),
    []
  );
});
