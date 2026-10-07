import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-copilot-routing-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET ||= "copilot-routing-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const { persistDiscoveredModels, getCachedDiscoveredModels } =
  await import("../../src/lib/providerModels/modelDiscovery.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");
const { parseGitHubCopilotModels } = await import("../../open-sse/services/githubCopilotModels.ts");
const { resolveChatCoreTargetFormat } =
  await import("../../open-sse/handlers/chatCore/targetFormat.ts");
const { resolveExecutionCredentials } =
  await import("../../open-sse/handlers/chatCore/executionCredentials.ts");
const { GithubExecutor } = await import("../../open-sse/executors/github.ts");
const { isUsableChatModel } =
  await import("../../src/app/api/v1/vscode/[token]/usableChatModel.ts");

let connectionId: string;
const executor = new GithubExecutor();

test.before(async () => {
  const connection = await providers.createProviderConnection({
    provider: "github",
    authType: "oauth",
    name: "discovered-routing-test",
    isActive: true,
    testStatus: "active",
  });
  connectionId = connection.id;
  const rows = parseGitHubCopilotModels({
    data: [
      { id: "gpt-6-luna", supported_endpoints: ["/responses"] },
      {
        id: "gpt-6.1-sol",
        capabilities: { type: "chat", supported_endpoints: ["/v1/responses"] },
      },
      { id: "gpt-6-chat", supported_endpoints: ["/chat/completions"] },
      { id: "gpt-6-dual", supported_endpoints: ["/responses", "/chat/completions"] },
      { id: "gemini-future", supported_endpoints: ["/responses"] },
      { id: "claude-future", supported_endpoints: ["/responses"] },
      { id: "gpt-6-unknown" },
    ],
  });
  await persistDiscoveredModels("github", connectionId, rows);
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function resolveRouting(model: string) {
  const info = await getModelInfo(`gh/${model}`);
  assert.equal(info.provider, "github");
  assert.equal(info.model, model);
  const { targetFormat } = resolveChatCoreTargetFormat({
    provider: info.provider,
    resolvedModel: info.model,
    apiFormat: info.apiFormat,
    sourceFormat: "openai",
    customModelTargetFormat: info.targetFormat,
    providerSpecificData: {},
  });
  const credentials = resolveExecutionCredentials({
    credentials: { providerSpecificData: {} },
    provider: info.provider,
    targetFormat,
    nativeCodexPassthrough: false,
    endpointPath: "/v1/chat/completions",
    ccSessionId: null,
  });
  return { targetFormat, url: executor.buildUrl(info.model, false, 0, credentials) };
}

test("discovered GPT-6 Responses-only models retain endpoint metadata and route to Responses", async () => {
  const cached = await getCachedDiscoveredModels("github", connectionId);
  assert.deepEqual(cached.find((row) => row.id === "gpt-6-luna")?.supportedEndpoints, [
    "responses",
  ]);
  for (const model of ["gpt-6-luna", "gpt-6.1-sol"]) {
    assert.deepEqual(await resolveRouting(model), {
      targetFormat: "openai-responses",
      url: "https://api.githubcopilot.com/responses",
    });
  }
});

test("synced endpoint kinds remain usable in the VS Code model catalog", async () => {
  const cached = await getCachedDiscoveredModels("github", connectionId);
  for (const id of ["gpt-6-luna", "gpt-6.1-sol", "gpt-6-chat", "gpt-6-dual"]) {
    const model = cached.find((row) => row.id === id);
    assert.ok(model);
    assert.ok(isUsableChatModel({ id, supported_endpoints: model.supportedEndpoints }), id);
  }
});

test("chat-capable and metadata-free GPT models keep Chat Completions", async () => {
  for (const model of ["gpt-6-chat", "gpt-6-dual", "gpt-6-unknown"]) {
    assert.deepEqual(await resolveRouting(model), {
      targetFormat: "openai",
      url: "https://api.githubcopilot.com/chat/completions",
    });
  }
});

test("discovery cannot route Gemini or Claude to the Copilot Responses endpoint", async () => {
  assert.deepEqual(await resolveRouting("gemini-future"), {
    targetFormat: "openai",
    url: "https://api.githubcopilot.com/chat/completions",
  });
  assert.deepEqual(await resolveRouting("claude-future"), {
    targetFormat: "claude",
    url: "https://api.githubcopilot.com/v1/messages",
  });
});
