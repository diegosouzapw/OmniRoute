import test from "node:test";
import assert from "node:assert/strict";

import {
  GITHUB_COPILOT_API_VERSION,
  GITHUB_COPILOT_CHAT_PLUGIN_VERSION,
  GITHUB_COPILOT_CLI_USER_AGENT,
  GITHUB_COPILOT_CHAT_USER_AGENT,
  GITHUB_COPILOT_EDITOR_VERSION,
  GITHUB_COPILOT_INTEGRATION_ID,
  GITHUB_COPILOT_INTERACTION_TYPE,
  GITHUB_COPILOT_HARNESS_ID,
  GITHUB_COPILOT_REFRESH_PLUGIN_VERSION,
  GITHUB_COPILOT_REFRESH_USER_AGENT,
  KIRO_AMZ_USER_AGENT,
  KIRO_SDK_USER_AGENT,
  QWEN_CLI_VERSION,
  getGitHubCopilotMachineId,
  getQwenCliUserAgent,
  getGitHubCopilotChatHeaders,
  getGitHubCopilotInternalUserHeaders,
  getGitHubCopilotRefreshHeaders,
  getKiroServiceHeaders,
  getQoderDashscopeCompatHeaders,
} from "../../../open-sse/config/providerHeaderProfiles.ts";

test("provider header profiles expose current GitHub chat and internal headers", () => {
  const chatHeaders = getGitHubCopilotChatHeaders("text/event-stream", "agent");
  // Chat/inference path matches the @github/copilot CLI 1.0.81-6 wire identity.
  assert.equal(chatHeaders["editor-version"], GITHUB_COPILOT_EDITOR_VERSION);
  assert.equal(chatHeaders["user-agent"], GITHUB_COPILOT_CLI_USER_AGENT);
  assert.equal(chatHeaders["x-github-api-version"], GITHUB_COPILOT_API_VERSION);
  assert.equal(chatHeaders["copilot-integration-id"], GITHUB_COPILOT_INTEGRATION_ID);
  assert.equal(chatHeaders["x-interaction-type"], GITHUB_COPILOT_INTERACTION_TYPE);
  assert.equal(chatHeaders["copilot-harness-id"], GITHUB_COPILOT_HARNESS_ID);
  assert.equal(chatHeaders["x-client-machine-id"], getGitHubCopilotMachineId());
  assert.equal(chatHeaders["X-Initiator"], "agent");
  assert.equal(chatHeaders.Accept, "text/event-stream");
  // The CLI does NOT send these on inference (VS Code Copilot Chat extension only).
  assert.equal(
    chatHeaders["editor-plugin-version"],
    undefined,
    "editor-plugin-version must NOT be on the CLI inference path"
  );
  assert.equal(
    chatHeaders["x-vscode-user-agent-library-version"],
    undefined,
    "x-vscode-user-agent-library-version must NOT be on the CLI inference path"
  );

  const internalHeaders = getGitHubCopilotInternalUserHeaders("token gh-access");
  assert.equal(internalHeaders.Authorization, "token gh-access");
  assert.equal(internalHeaders["User-Agent"], GITHUB_COPILOT_CHAT_USER_AGENT);
  assert.equal(internalHeaders["Editor-Version"], GITHUB_COPILOT_EDITOR_VERSION);
  assert.equal(internalHeaders["Editor-Plugin-Version"], GITHUB_COPILOT_CHAT_PLUGIN_VERSION);
  assert.equal(internalHeaders["X-GitHub-Api-Version"], GITHUB_COPILOT_API_VERSION);
});

test("getGitHubCopilotMachineId is stable across calls and vision toggles the vision header", () => {
  // Stable per-install fingerprint: same value every call (matches the CLI).
  assert.equal(getGitHubCopilotMachineId(), getGitHubCopilotMachineId());
  const plain = getGitHubCopilotChatHeaders("application/json");
  assert.equal(plain["copilot-vision-request"], undefined);
  const vision = getGitHubCopilotChatHeaders("application/json", "user", { vision: true });
  assert.equal(vision["copilot-vision-request"], "true");
  // Machine id is consistent between two header builds in the same process.
  assert.equal(plain["x-client-machine-id"], vision["x-client-machine-id"]);
});

test("provider header profiles expose dedicated refresh, qoder and kiro variants", () => {
  const refreshHeaders = getGitHubCopilotRefreshHeaders("token gh-access");
  assert.equal(refreshHeaders.Authorization, "token gh-access");
  assert.equal(refreshHeaders["User-Agent"], GITHUB_COPILOT_REFRESH_USER_AGENT);
  assert.equal(refreshHeaders["Editor-Version"], GITHUB_COPILOT_EDITOR_VERSION);
  assert.equal(refreshHeaders["Editor-Plugin-Version"], GITHUB_COPILOT_REFRESH_PLUGIN_VERSION);

  const qoderHeaders = getQoderDashscopeCompatHeaders();
  assert.equal(qoderHeaders["user-agent"], getQwenCliUserAgent());
  assert.equal(qoderHeaders["x-dashscope-useragent"], getQwenCliUserAgent());
  assert.equal(
    qoderHeaders["user-agent"],
    `QwenCode/${QWEN_CLI_VERSION} (${process.platform}; ${process.arch})`
  );

  const kiroHeaders = getKiroServiceHeaders("application/json");
  assert.equal(kiroHeaders.Accept, "application/json");
  assert.equal(kiroHeaders["User-Agent"], KIRO_SDK_USER_AGENT);
  assert.equal(kiroHeaders["X-Amz-User-Agent"], KIRO_AMZ_USER_AGENT);
});

test("provider header profiles tolerate browser-like process shims", async () => {
  const originalPlatform = process.platform;
  const originalArch = process.arch;
  const originalVersion = process.version;

  Object.defineProperty(process, "platform", { value: undefined, configurable: true });
  Object.defineProperty(process, "arch", { value: undefined, configurable: true });
  Object.defineProperty(process, "version", { value: undefined, configurable: true });

  try {
    assert.equal(getQwenCliUserAgent(), `QwenCode/${QWEN_CLI_VERSION} (unknown; unknown)`);
    const qoderHeaders = getQoderDashscopeCompatHeaders();
    assert.equal(qoderHeaders["user-agent"], `QwenCode/${QWEN_CLI_VERSION} (unknown; unknown)`);
  } finally {
    Object.defineProperty(process, "platform", { value: originalPlatform, configurable: true });
    Object.defineProperty(process, "arch", { value: originalArch, configurable: true });
    Object.defineProperty(process, "version", { value: originalVersion, configurable: true });
  }
});
