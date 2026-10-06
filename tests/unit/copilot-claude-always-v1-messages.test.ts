// Claude models must ALWAYS use the Anthropic-native /v1/messages shim on both
// github.com Copilot and GitHub Enterprise (GHE) Copilot — never /chat/completions
// or /responses. The base github executor and the GHE override both match on the
// model NAME (not only the registry's per-model targetFormat tag), so a Claude
// model that is missing its targetFormat tag, or a custom/newer Claude id not yet
// in the static registry, still gets the native shim. Mirrors the Hermes copilot
// routing (`if "claude" in model: return CAPI_MESSAGES_URL`).

import test from "node:test";
import assert from "node:assert/strict";

const { GithubExecutor } = await import("../../open-sse/executors/github.ts");
const { GheCopilotExecutor } = await import("../../open-sse/executors/ghe-copilot.ts");

test("github.com: an untagged Claude id still routes to /v1/messages", () => {
  const executor = new GithubExecutor();
  // A Claude id NOT in the static registry (so getModelTargetFormat is null).
  const url = executor.buildUrl("claude-opus-9.9-experimental", true);
  assert.equal(
    url,
    "https://api.githubcopilot.com/v1/messages",
    "any claude-* id must hit the native shim even without a registry targetFormat tag"
  );
});

test("github.com: a custom 'anthropic/claude' style id routes to /v1/messages", () => {
  const executor = new GithubExecutor();
  const url = executor.buildUrl("claude-sonnet-5-preview", true);
  assert.match(url, /\/v1\/messages$/);
});

test("github.com: non-claude ids are unaffected (gpt -> /responses, plain -> /chat/completions)", () => {
  const executor = new GithubExecutor();
  assert.match(executor.buildUrl("gpt-5.4", true), /\/responses$/);
  assert.match(executor.buildUrl("gpt-4o-mini", true), /\/chat\/completions$/);
});

test("GHE: Claude models route to the dynamic per-connection /v1/messages host", () => {
  const executor = new GheCopilotExecutor();
  const creds = {
    accessToken: "tok",
    providerSpecificData: { copilotApiUrl: "https://copilot.enterprise.example/api/v1" },
  };
  // GHE strips the ghe-copilot/ prefix; the Claude match must fire on the bare id.
  const url = executor.buildUrl("ghe-copilot/claude-opus-4.8", true, 0, creds);
  assert.equal(
    url,
    "https://copilot.enterprise.example/api/v1/v1/messages",
    "GHE Claude must hit the per-connection host's /v1/messages, not /chat/completions"
  );
});

test("GHE: an untagged Claude id still routes to /v1/messages", () => {
  const executor = new GheCopilotExecutor();
  const creds = {
    accessToken: "tok",
    providerSpecificData: { copilotApiUrl: "https://ghe.example/copilot" },
  };
  const url = executor.buildUrl("ghe-copilot/claude-future-x", true, 0, creds);
  assert.match(url, /\/v1\/messages$/);
});

test("GHE: non-claude ids still route to /chat/completions on the dynamic host", () => {
  const executor = new GheCopilotExecutor();
  const creds = {
    accessToken: "tok",
    providerSpecificData: { copilotApiUrl: "https://ghe.example/copilot" },
  };
  const url = executor.buildUrl("ghe-copilot/gpt-4o", true, 0, creds);
  assert.match(url, /\/chat\/completions$/);
});
