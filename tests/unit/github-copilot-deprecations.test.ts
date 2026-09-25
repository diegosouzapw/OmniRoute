import assert from "node:assert/strict";
import test from "node:test";

import { getModelsByProviderId } from "../../open-sse/config/providerModels.ts";
import { isRetiredGitHubCopilotModelId } from "../../open-sse/config/providers/registry/github/retiredModels.ts";
import {
  GITHUB_COPILOT_STATIC_FALLBACK_MODELS,
  fetchGitHubCopilotModels,
  parseGitHubCopilotModels,
} from "../../open-sse/services/githubCopilotModels.ts";

const RETIRED = [
  "gemini-3.1-pro-preview",
  "claude-opus-4.5",
  "claude-opus-4.6",
  "claude-sonnet-4.5",
  "oswe-vscode-prime",
  "gemini-3.5-flash",
  "gemini-3.6-flash",
  "kimi-k2.7-code",
  "claude-opus-4.7",
  "claude-sonnet-4.6",
  "claude-fable-5",
  "gemini-3.7-flash",
  "grok-4.5",
  "mai-code-1-flash",
  "mai-code-1-flash-picker",
  "gpt-5-mini",
  "gpt-5.3-codex",
  "gpt-5.4",
  "gpt-5.4-mini",
  "gpt-5.4-nano",
  "gpt-5.5",
  "gpt-4-0125-preview",
  "gpt-4o-2024-11-20",
  "gpt-4o-mini",
];

test("September retirements and October advance removals stay out of Copilot catalogs", () => {
  const catalog = getModelsByProviderId("github");
  for (const id of RETIRED) {
    assert.equal(isRetiredGitHubCopilotModelId("github", id), true, id);
    assert.equal(isRetiredGitHubCopilotModelId(" GH ", ` ${id.toUpperCase()} `), true, id);
    assert.equal(isRetiredGitHubCopilotModelId("openai", id), false, id);
    assert.ok(!catalog.some((model) => model.id === id), id);
    assert.ok(!new Set<string>(GITHUB_COPILOT_STATIC_FALLBACK_MODELS).has(id), id);
  }
});

test("Copilot live and fallback refreshes cannot restore announced retirements", async () => {
  const ids = [...RETIRED, "gpt-6-astra", "gemini-3.8-flash", "kimi-k3"];
  const expected = ["gpt-6-astra", "gemini-3.8-flash", "kimi-k3"];
  const data = ids.map((id) => ({
    id,
    capabilities: { type: "chat" },
    policy: { state: "enabled" },
    model_picker_enabled: true,
  }));
  assert.deepEqual(
    parseGitHubCopilotModels({ data }).map((model) => model.id),
    expected
  );
  const fallback = await fetchGitHubCopilotModels({ token: "", fallbackModels: data });
  assert.deepEqual(
    fallback.models.map((model) => model.id),
    expected
  );
});

test("Selected replacements remain eligible", () => {
  for (const id of ["claude-sonnet-5", "gemini-3.8-flash", "grok-4.6", "claude-fable-5.1"]) {
    assert.equal(isRetiredGitHubCopilotModelId("github", id), false, id);
    assert.ok(new Set<string>(GITHUB_COPILOT_STATIC_FALLBACK_MODELS).has(id), id);
  }
});

test("Copilot static catalog and fallback contain exactly the approved fourteen models", () => {
  const expected = [
    "gpt-6-astra",
    "gpt-5.6-sol",
    "gpt-5.6-terra",
    "gpt-5.6-luna",
    "claude-fable-5.1",
    "claude-opus-5",
    "claude-sonnet-5",
    "claude-opus-4.8-fast",
    "claude-opus-4.8",
    "claude-haiku-4.5",
    "gemini-3.8-flash",
    "mai-code-1.1-flash",
    "kimi-k3",
    "grok-4.6",
  ];
  assert.deepEqual(
    getModelsByProviderId("github").map((model) => model.id),
    expected
  );
  assert.deepEqual(GITHUB_COPILOT_STATIC_FALLBACK_MODELS, expected);
});
