/**
 * tests/unit/claude-codex-identity-version-sync.test.ts
 *
 * Guards the pinned CLI identity versions against drift. The Claude Code version
 * lives in FOUR places (claudeIdentity, anthropicHeaders, claudeCodeCompatible,
 * ccBridgeTransforms) and MUST stay in lockstep — a partial bump produces an
 * inconsistent wire fingerprint. The Codex client version lives in codexClient.
 *
 * When you capture a newer claude-cli / codex release, bump ALL constants and
 * update the pinned values below in the same change.
 */

import test from "node:test";
import assert from "node:assert/strict";

const id = await import("../../open-sse/executors/claudeIdentity.ts");
const hdr = await import("../../open-sse/config/anthropicHeaders.ts");
const compat = await import("../../open-sse/services/claudeCodeCompatible.ts");
const bridge = await import("../../open-sse/services/ccBridgeTransforms.ts");
const codexCfg = await import("../../open-sse/config/codexClient.ts");

test("Claude CLI version constants are in lockstep across all 4 sources", () => {
  const V = id.CLAUDE_CODE_VERSION;
  assert.equal(hdr.CLAUDE_CLI_VERSION, V, "anthropicHeaders.CLAUDE_CLI_VERSION drift");
  assert.equal(compat.CLAUDE_CODE_COMPATIBLE_VERSION, V, "claudeCodeCompatible version drift");
  assert.equal(bridge.DEFAULT_CLAUDE_CODE_VERSION, V, "ccBridgeTransforms version drift");
  assert.equal(
    hdr.CLAUDE_CLI_USER_AGENT,
    `claude-cli/${V} (external, cli)`,
    "CLAUDE_CLI_USER_AGENT drift"
  );
  assert.equal(
    compat.CLAUDE_CODE_COMPATIBLE_USER_AGENT,
    `claude-cli/${V} (external, sdk-cli)`,
    "CLAUDE_CODE_COMPATIBLE_USER_AGENT drift"
  );
});

test("Claude CLI is pinned to the captured 2.1.195 release", () => {
  assert.equal(id.CLAUDE_CODE_VERSION, "2.1.195");
});

test("Codex client is pinned to the captured 0.142.0 release", () => {
  assert.equal(codexCfg.getCodexClientVersion(), "0.142.0");
  assert.equal(codexCfg.getCodexUserAgent(), "codex-cli/0.142.0 (Windows 10.0.26200; x64)");
  assert.equal(codexCfg.getCodexDefaultHeaders().Version, "0.142.0");
});
