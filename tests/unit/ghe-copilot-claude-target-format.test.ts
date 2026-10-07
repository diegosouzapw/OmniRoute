import assert from "node:assert/strict";
import { test } from "node:test";
import { getModelsByProviderId } from "../../open-sse/config/providerModels.ts";

test("GHE Copilot Claude models declare the Anthropic target format", () => {
  const missingTargetFormat = getModelsByProviderId("ghe-copilot")
    .filter((model) => model.id.startsWith("claude-"))
    .filter((model) => model.targetFormat !== "claude")
    .map((model) => model.id);

  assert.deepEqual(missingTargetFormat, []);
});
