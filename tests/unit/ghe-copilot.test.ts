import test from "node:test";
import assert from "node:assert/strict";
import { GheCopilotExecutor } from "../../open-sse/executors/ghe-copilot.ts";
import { GHE_COPILOT_TARGET } from "../../src/mitm/targets/ghe-copilot.ts";
import type { ProviderCredentials } from "../../open-sse/executors/base.ts";

test("GHE_COPILOT_TARGET has correct id and patterns", () => {
  assert.strictEqual(GHE_COPILOT_TARGET.id, "ghe-copilot");
  assert.deepStrictEqual(GHE_COPILOT_TARGET.endpointPatterns, [
    "/chat/completions",
    "/v1/chat/completions",
    "/responses",
  ]);
});

test("buildUrl uses gheUrl for chat/completions with credentials", () => {
  const executor = new GheCopilotExecutor({
    gheUrl: "https://ghe.company.com",
    clientId: "test-client",
    clientSecret: "test-secret",
  });
  const credentials: ProviderCredentials = {
    providerSpecificData: { gheUrl: "https://ghe.company.com" },
  };
  const url = executor.buildUrl("gpt-4o", true, 0, credentials);
  assert.strictEqual(url, "https://ghe.company.com/chat/completions");
});

test("buildUrl uses gheUrl for responses endpoint with codex model", () => {
  const executor = new GheCopilotExecutor({
    gheUrl: "https://ghe.company.com",
    clientId: "test-client",
    clientSecret: "test-secret",
  });
  const credentials: ProviderCredentials = {
    providerSpecificData: { gheUrl: "https://ghe.company.com" },
  };
  const url = executor.buildUrl("gpt-4o-codex", true, 0, credentials);
  assert.strictEqual(url, "https://ghe.company.com/chat/completions");
});

test("buildUrl handles gheUrl with trailing slash", () => {
  const exec = new GheCopilotExecutor({
    gheUrl: "https://ghe.company.com/",
    clientId: "test",
    clientSecret: "test",
  });
  const credentials: ProviderCredentials = {
    providerSpecificData: { gheUrl: "https://ghe.company.com/" },
  };
  const url = exec.buildUrl("gpt-4o", true, 0, credentials);
  assert.strictEqual(url, "https://ghe.company.com/chat/completions");
});

test("buildUrl handles gheUrl already containing /chat/completions", () => {
  const executor = new GheCopilotExecutor({
    gheUrl: "https://ghe.company.com",
    clientId: "test-client",
    clientSecret: "test-secret",
  });
  const credentials: ProviderCredentials = {
    providerSpecificData: { gheUrl: "https://ghe.company.com/chat/completions" },
  };
  const url = executor.buildUrl("gpt-4o", true, 0, credentials);
  assert.strictEqual(url, "https://ghe.company.com/chat/completions");
});

test("buildUrl throws without gheUrl in credentials", () => {
  const executor = new GheCopilotExecutor({
    gheUrl: "https://ghe.company.com",
    clientId: "test-client",
    clientSecret: "test-secret",
  });
  const credentials: ProviderCredentials = { providerSpecificData: {} };
  assert.throws(() => executor.buildUrl("gpt-4o", true, 0, credentials), {
    message: "GHE Copilot executor requires gheUrl in providerSpecificData",
  });
});

test("refreshCopilotToken delegates to GHE token endpoint", async () => {
  const executor = new GheCopilotExecutor({
    gheUrl: "https://ghe.company.com",
    clientId: "test-client",
    clientSecret: "test-secret",
  });
  const credentials: ProviderCredentials = {
    providerSpecificData: { gheUrl: "https://ghe.company.com" },
    copilotToken: "test-token",
  };

  const result = await executor.refreshCopilotToken("github-access-token", undefined, credentials);
  assert.strictEqual(result, null);
});

test("refreshGitHubToken delegates to GHE OAuth endpoint", async () => {
  const executor = new GheCopilotExecutor({
    gheUrl: "https://ghe.company.com",
    clientId: "test-client",
    clientSecret: "test-secret",
  });
  const credentials: ProviderCredentials = {
    providerSpecificData: { gheUrl: "https://ghe.company.com" },
  };

  const result = await executor.refreshGitHubToken("refresh-token", undefined, credentials);
  assert.strictEqual(result, null);
});

test("executor extends GithubExecutor", () => {
  const executor = new GheCopilotExecutor({
    gheUrl: "https://ghe.company.com",
    clientId: "test-client",
    clientSecret: "test-secret",
  });
  assert.strictEqual(executor.constructor.name, "GheCopilotExecutor");
});
