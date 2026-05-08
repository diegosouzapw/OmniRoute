import test from "node:test";
import assert from "node:assert/strict";

import {
  CURSOR_REGISTRY_VERSION,
  GITHUB_COPILOT_API_VERSION,
  GITHUB_COPILOT_CHAT_PLUGIN_VERSION,
  GITHUB_COPILOT_CHAT_USER_AGENT,
  GITHUB_COPILOT_EDITOR_VERSION,
  GITHUB_COPILOT_REFRESH_PLUGIN_VERSION,
  GITHUB_COPILOT_REFRESH_USER_AGENT,
  KIRO_AMZ_USER_AGENT,
  KIRO_SDK_USER_AGENT,
  QWEN_CLI_VERSION,
  getCursorUsageHeaders,
  getQwenCliUserAgent,
  getGitHubCopilotChatHeaders,
  getGitHubCopilotInternalUserHeaders,
  getGitHubCopilotRefreshHeaders,
  getKiroServiceHeaders,
  getQoderDashscopeCompatHeaders,
  getQwenOauthHeaders,
} from "../../open-sse/config/providerHeaderProfiles.ts";

test("provider header profiles expose current GitHub chat and internal headers", () => {
  const chatHeaders = getGitHubCopilotChatHeaders("text/event-stream", "agent");
  assert.equal(chatHeaders["editor-version"], GITHUB_COPILOT_EDITOR_VERSION);
  assert.equal(chatHeaders["editor-plugin-version"], GITHUB_COPILOT_CHAT_PLUGIN_VERSION);
  assert.equal(chatHeaders["user-agent"], GITHUB_COPILOT_CHAT_USER_AGENT);
  assert.equal(chatHeaders["x-github-api-version"], GITHUB_COPILOT_API_VERSION);
  assert.equal(chatHeaders["X-Initiator"], "agent");
  assert.equal(chatHeaders.Accept, "text/event-stream");

  const internalHeaders = getGitHubCopilotInternalUserHeaders("token gh-access");
  assert.equal(internalHeaders.Authorization, "token gh-access");
  assert.equal(internalHeaders["User-Agent"], GITHUB_COPILOT_CHAT_USER_AGENT);
  assert.equal(internalHeaders["Editor-Version"], GITHUB_COPILOT_EDITOR_VERSION);
  assert.equal(internalHeaders["Editor-Plugin-Version"], GITHUB_COPILOT_CHAT_PLUGIN_VERSION);
  assert.equal(internalHeaders["X-GitHub-Api-Version"], GITHUB_COPILOT_API_VERSION);
});

test("provider header profiles expose dedicated refresh, qwen, qoder, kiro and cursor variants", () => {
  const refreshHeaders = getGitHubCopilotRefreshHeaders("token gh-access");
  assert.equal(refreshHeaders.Authorization, "token gh-access");
  assert.equal(refreshHeaders["User-Agent"], GITHUB_COPILOT_REFRESH_USER_AGENT);
  assert.equal(refreshHeaders["Editor-Version"], GITHUB_COPILOT_EDITOR_VERSION);
  assert.equal(refreshHeaders["Editor-Plugin-Version"], GITHUB_COPILOT_REFRESH_PLUGIN_VERSION);

  const qwenHeaders = getQwenOauthHeaders();
  assert.equal(qwenHeaders["User-Agent"], getQwenCliUserAgent());
  assert.equal(
    qwenHeaders["User-Agent"],
    `QwenCode/${QWEN_CLI_VERSION} (${process.platform}; ${process.arch})`
  );
  assert.notEqual(qwenHeaders["User-Agent"], "QwenCode/0.15.3 (linux; x64)");
  assert.equal(qwenHeaders["X-Dashscope-UserAgent"], getQwenCliUserAgent());
  assert.equal(qwenHeaders["X-Stainless-Package-Version"], "5.11.0");
  assert.equal(qwenHeaders["X-Stainless-Runtime-Version"], process.version);

  const qoderHeaders = getQoderDashscopeCompatHeaders();
  assert.equal(qoderHeaders["user-agent"], getQwenCliUserAgent());
  assert.equal(qoderHeaders["x-dashscope-useragent"], getQwenCliUserAgent());

  const kiroHeaders = getKiroServiceHeaders("application/json");
  assert.equal(kiroHeaders.Accept, "application/json");
  assert.equal(kiroHeaders["User-Agent"], KIRO_SDK_USER_AGENT);
  assert.equal(kiroHeaders["X-Amz-User-Agent"], KIRO_AMZ_USER_AGENT);

  const cursorHeaders = getCursorUsageHeaders("cursor-token");
  assert.equal(cursorHeaders.Authorization, "Bearer cursor-token");
  assert.equal(cursorHeaders["User-Agent"], `Cursor/${CURSOR_REGISTRY_VERSION}`);
  assert.equal(cursorHeaders["x-cursor-user-agent"], `Cursor/${CURSOR_REGISTRY_VERSION}`);
  assert.equal(cursorHeaders["x-cursor-client-version"], CURSOR_REGISTRY_VERSION);
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
    const qwenHeaders = getQwenOauthHeaders();
    assert.equal(qwenHeaders["User-Agent"], `QwenCode/${QWEN_CLI_VERSION} (unknown; unknown)`);
    assert.equal(qwenHeaders["X-Stainless-Runtime-Version"], "unknown");
  } finally {
    Object.defineProperty(process, "platform", { value: originalPlatform, configurable: true });
    Object.defineProperty(process, "arch", { value: originalArch, configurable: true });
    Object.defineProperty(process, "version", { value: originalVersion, configurable: true });
  }
});
