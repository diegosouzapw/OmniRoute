import test from "node:test";
import assert from "node:assert/strict";

// Claude-Code identity aliases are consumed across several transports. They now
// resolve through one captured profile; this guard protects the compatibility
// exports and their generated User-Agent strings from drift.
const claudeIdentity = await import("../../open-sse/executors/claudeIdentity.ts");
const ccBridge = await import("../../open-sse/services/ccBridgeTransforms.ts");
const claudeCompat = await import("../../open-sse/services/claudeCodeCompatible.ts");
const anthropicHeaders = await import("../../open-sse/config/anthropicHeaders.ts");
const glmProvider = await import("../../open-sse/config/glmProvider.ts");

const CANONICAL = claudeIdentity.CLAUDE_CODE_VERSION;

// "claude-cli/2.1.219 (external, sdk-cli)" → "2.1.219". String ops only — never a RegExp over
// the value, per the project's anti-ReDoS contract.
function versionFromUserAgent(userAgent: string): string {
  const afterSlash = userAgent.split("claude-cli/")[1] ?? "";
  return afterSlash.split(" ")[0];
}

test("canonical claude-cli version constant is a sane semver value", () => {
  assert.match(CANONICAL, /^\d+\.\d+\.\d+$/);
});

test("all Claude-Code identity version constants are in lockstep", () => {
  assert.equal(
    ccBridge.DEFAULT_CLAUDE_CODE_VERSION,
    CANONICAL,
    "ccBridgeTransforms.DEFAULT_CLAUDE_CODE_VERSION drifted from claudeIdentity.CLAUDE_CODE_VERSION"
  );
  assert.equal(
    claudeCompat.CLAUDE_CODE_COMPATIBLE_VERSION,
    CANONICAL,
    "claudeCodeCompatible.CLAUDE_CODE_COMPATIBLE_VERSION drifted from the canonical version"
  );
  assert.equal(
    anthropicHeaders.CLAUDE_CLI_VERSION,
    CANONICAL,
    "anthropicHeaders.CLAUDE_CLI_VERSION drifted from the canonical version"
  );
});

test("all claude-cli User-Agent strings embed the canonical version", () => {
  assert.equal(
    versionFromUserAgent(claudeCompat.CLAUDE_CODE_COMPATIBLE_USER_AGENT),
    CANONICAL,
    "claudeCodeCompatible.CLAUDE_CODE_COMPATIBLE_USER_AGENT embeds a stale version"
  );
  assert.equal(
    versionFromUserAgent(glmProvider.GLM_CLAUDE_CODE_USER_AGENT),
    CANONICAL,
    "glmProvider.GLM_CLAUDE_CODE_USER_AGENT embeds a stale version"
  );
});
