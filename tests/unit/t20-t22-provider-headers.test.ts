import test from "node:test";
import assert from "node:assert/strict";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { antigravityUserAgent, geminiCLIUserAgent, GEMINI_CLI_VERSION } =
  await import("../../open-sse/services/antigravityHeaders.ts");

test("T20: antigravity config has updated User-Agent and sandbox fallback URL", () => {
  const antigravity = REGISTRY.antigravity;
  assert.ok(Array.isArray(antigravity.baseUrls));
  assert.ok(
    antigravity.baseUrls.some((u) => u === "https://daily-cloudcode-pa.sandbox.googleapis.com")
  );
  assert.equal(antigravity.headers["User-Agent"], antigravityUserAgent());
});

test("T20: gemini CLI fingerprint uses 0.39.1 and normalizes darwin to macos", () => {
  assert.equal(GEMINI_CLI_VERSION, "0.39.1");

  const descriptor = Object.getOwnPropertyDescriptor(process, "platform");
  Object.defineProperty(process, "platform", { value: "darwin" });
  try {
    assert.match(
      geminiCLIUserAgent("gemini-3-flash"),
      /^GeminiCLI\/0\.39\.1\/gemini-3-flash \(macos; /
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
  assert.equal(github.headers["editor-version"], "vscode/1.117.0");
  assert.equal(github.headers["editor-plugin-version"], "copilot-chat/0.45.1");
  assert.equal(github.headers["user-agent"], "GitHubCopilotChat/0.45.1");
  assert.equal(github.headers["x-github-api-version"], "2025-04-01");
  assert.equal(github.headers["x-vscode-user-agent-library-version"], "electron-fetch");
  assert.equal(github.headers["X-Initiator"], "user");
});

test("T22: github config exposes dedicated responses endpoint", () => {
  const github = REGISTRY.github;
  assert.equal(github.responsesBaseUrl, "https://api.githubcopilot.com/responses");
  assert.equal(github.baseUrl, "https://api.githubcopilot.com/chat/completions");
});

test("T20: codex config advertises current client headers and auto-review model", () => {
  const codex = REGISTRY.codex;
  assert.equal(codex.headers.Version, "0.125.0");
  assert.equal(codex.headers["Openai-Beta"], "responses=experimental");
  assert.equal(codex.headers["X-Codex-Beta-Features"], "responses_websockets");
  assert.equal(codex.headers["User-Agent"], "codex-cli/0.125.0 (Windows 10.0.26100; x64)");
  assert.ok(codex.models.some((model) => model.id === "codex-auto-review"));
});
