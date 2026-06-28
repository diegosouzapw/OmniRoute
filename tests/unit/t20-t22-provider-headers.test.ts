import test from "node:test";
import assert from "node:assert/strict";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { antigravityUserAgent } = await import("../../open-sse/services/antigravityHeaders.ts");
const { getCodexClientVersion } = await import("../../open-sse/config/codexClient.ts");
const { geminiCliUserAgent, GEMINI_CLI_VERSION, GEMINI_CLI_GOOGLE_API_NODE_CLIENT_VERSION } =
  await import("../../open-sse/services/geminiCliHeaders.ts");

test("T20: antigravity config has updated User-Agent and daily Cloud Code first URL", () => {
  const antigravity = REGISTRY.antigravity;
  assert.ok(Array.isArray(antigravity.baseUrls));
  assert.equal(antigravity.baseUrls[0], "https://daily-cloudcode-pa.googleapis.com");
  assert.equal(antigravity.headers["User-Agent"], antigravityUserAgent());
  assert.match(antigravity.headers["User-Agent"], /^Antigravity\//);
});

test("T20: gemini CLI fingerprint uses the current CLI version and normalizes darwin to macos", () => {
  assert.match(GEMINI_CLI_VERSION, /^\d+\.\d+\.\d+$/);
  assert.match(GEMINI_CLI_GOOGLE_API_NODE_CLIENT_VERSION, /^\d+\.\d+\.\d+$/);

  const descriptor = Object.getOwnPropertyDescriptor(process, "platform");
  Object.defineProperty(process, "platform", { value: "darwin" });
  try {
    const escapedCliVersion = GEMINI_CLI_VERSION.replaceAll(".", "\\.");
    const escapedClientVersion = GEMINI_CLI_GOOGLE_API_NODE_CLIENT_VERSION.replaceAll(".", "\\.");
    assert.match(
      geminiCliUserAgent("gemini-3-flash"),
      new RegExp(
        `^GeminiCLI/${escapedCliVersion}/gemini-3-flash \\(macos; .+; terminal\\) google-api-nodejs-client/${escapedClientVersion}$`
      )
    );
  } finally {
    if (descriptor) {
      Object.defineProperty(process, "platform", descriptor);
    }
  }
});

test("T25: anthropic API-key config includes the full Anthropic beta header set", () => {
  const anthropic = REGISTRY.anthropic;
  assert.equal(anthropic.headers["Anthropic-Version"], "2023-06-01");
  assert.ok(anthropic.headers["Anthropic-Beta"]?.includes("advanced-tool-use-2025-11-20"));
  assert.ok(anthropic.headers["Anthropic-Beta"]?.includes("structured-outputs-2025-12-15"));
  assert.ok(anthropic.headers["Anthropic-Beta"]?.includes("token-efficient-tools-2026-03-28"));
});

test("T22: github headers include updated editor/plugin versions and required fields", () => {
  const github = REGISTRY.github;
  assert.equal(github.headers["editor-version"], "vscode/1.126.0");
  assert.equal(github.headers["editor-plugin-version"], "copilot-chat/0.54.0");
  assert.equal(github.headers["user-agent"], "GitHubCopilotChat/0.54.0");
  assert.equal(github.headers["x-github-api-version"], "2026-06-01");
  assert.equal(github.headers["x-vscode-user-agent-library-version"], "electron-fetch");
  assert.equal(github.headers["X-Initiator"], "user");
});

test("T22: github config exposes dedicated responses endpoint", () => {
  const github = REGISTRY.github;
  assert.equal(github.responsesBaseUrl, "https://api.githubcopilot.com/responses");
  assert.equal(github.baseUrl, "https://api.githubcopilot.com/chat/completions");
});

test("T20: codex config advertises current client headers and supported models", () => {
  const codex = REGISTRY.codex;
  assert.equal(codex.headers.Version, getCodexClientVersion());
  assert.equal(codex.headers["Openai-Beta"], "responses=experimental");
  assert.equal(codex.headers["X-Codex-Beta-Features"], "responses_websockets");
  assert.equal(codex.headers["User-Agent"], "codex-cli/0.142.0 (Windows 10.0.26200; x64)");
  assert.ok(codex.models.some((model) => model.id === "gpt-5.5-medium"));
  assert.ok(!codex.models.some((model) => model.id === "codex-auto-review"));
});
