import test from "node:test";
import assert from "node:assert/strict";
import {
  enrichCodexModelsFromGithubCatalog,
  type CodexDiscoveryModel,
} from "@/app/api/providers/[id]/models/discovery/codex";

test("enrichCodexModelsFromGithubCatalog enriches live models with github catalog metadata", () => {
  const liveModels: CodexDiscoveryModel[] = [
    {
      id: "gpt-6-sol",
      name: "gpt-6-sol",
      display_name: "GPT-6 Sol",
      context_length: 128000,
    },
  ];

  const githubCatalog: CodexDiscoveryModel[] = [
    {
      id: "gpt-6-sol",
      name: "gpt-6-sol",
      display_name: "GPT-6 Sol (Official)",
      context_length: 872000,
      capabilities: { vision: true, reasoning: true },
    },
  ];

  const result = enrichCodexModelsFromGithubCatalog(liveModels, githubCatalog);
  assert.equal(result.length, 1);
  assert.equal(result[0].id, "gpt-6-sol");
  assert.equal(result[0].display_name, "GPT-6 Sol"); // live model overrides display_name if present
  assert.equal(result[0].context_length, 128000);
  assert.equal(result[0].capabilities?.vision, true);
});

test("enrichCodexModelsFromGithubCatalog returns the GitHub catalog when there is no live list (#15525)", () => {
  const liveModels: CodexDiscoveryModel[] = [];

  const githubCatalog: CodexDiscoveryModel[] = [
    {
      id: "gpt-6-sol",
      name: "gpt-6-sol",
      display_name: "GPT-6 Sol (Official)",
    },
    {
      id: "gpt-6.1-sol",
      name: "gpt-6.1-sol",
      display_name: "GPT-6.1 Sol",
      context_length: 872000,
      capabilities: { vision: true, reasoning: true },
    },
  ];

  const result = enrichCodexModelsFromGithubCatalog(liveModels, githubCatalog);
  assert.equal(result.length, 2);
  assert.equal(result[0].id, "gpt-6-sol");
  assert.equal(result[1].id, "gpt-6.1-sol");
  assert.equal(result[1].display_name, "GPT-6.1 Sol");
  assert.equal(result[1].context_length, 872000);
  assert.equal(result[1].capabilities?.vision, true);
});
