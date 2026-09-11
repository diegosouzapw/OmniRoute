/**
 * Regression for #12417 — Anthropic gates models (Fable 5.1) on the advertised
 * Claude Code client version. Codex already has CODEX_CLIENT_VERSION; Claude
 * and Copilot did not. A CLAUDE_USER_AGENT override is not enough: billing
 * (`cc_version=`), stainless headers, and the four identity aliases all read
 * the captured pin.
 *
 * Env override is a safe token (same shape as Codex). Garbage is ignored.
 */
import test from "node:test";
import assert from "node:assert/strict";

const canonical = await import("../../src/shared/constants/claudeCodeClient.ts");
const copilot = await import("../../open-sse/config/providerHeaderProfiles.ts");
const claudeHeaders = await import("../../open-sse/config/providers/shared.ts");

async function withEnv<T>(
  entries: Record<string, string | undefined>,
  fn: () => T | Promise<T>
): Promise<T> {
  const previous = new Map<string, string | undefined>();
  for (const [key, value] of Object.entries(entries)) {
    previous.set(key, process.env[key]);
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
  try {
    return await fn();
  } finally {
    for (const [key, value] of previous.entries()) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
}

test("#12417 Claude pin stays the captured 2.1.258 binary", () => {
  assert.equal(canonical.CLAUDE_CODE_CLIENT_VERSION, "2.1.258");
});

test("#12417 getClaudeCodeClientVersion falls back to the captured pin", async () => {
  await withEnv({ CLAUDE_CODE_CLIENT_VERSION: undefined }, () => {
    assert.equal(canonical.getClaudeCodeClientVersion(), canonical.CLAUDE_CODE_CLIENT_VERSION);
  });
});

test("#12417 getClaudeCodeClientVersion honors a safe env override", async () => {
  await withEnv({ CLAUDE_CODE_CLIENT_VERSION: "2.1.259" }, () => {
    assert.equal(canonical.getClaudeCodeClientVersion(), "2.1.259");
    assert.equal(canonical.getClaudeCodeUserAgent("cli"), "claude-cli/2.1.259 (external, cli)");
    assert.equal(
      canonical.getClaudeCodeUserAgent("sdk-cli"),
      "claude-cli/2.1.259 (external, sdk-cli)"
    );
    assert.equal(
      canonical.getClaudeCodeClientBillingVersion(),
      `2.1.259.${canonical.CLAUDE_CODE_CLIENT_BUILD_REVISION}`
    );
  });
});

test("#12417 getClaudeCodeClientVersion ignores an unsafe env override", async () => {
  await withEnv({ CLAUDE_CODE_CLIENT_VERSION: "bad version value" }, () => {
    assert.equal(canonical.getClaudeCodeClientVersion(), canonical.CLAUDE_CODE_CLIENT_VERSION);
  });
});

test("#12417 Copilot pin stays the captured 1.0.81-6 CLI", () => {
  assert.equal(copilot.GITHUB_COPILOT_CLI_VERSION, "1.0.81-6");
});

test("#12417 getGitHubCopilotCliVersion falls back to the captured pin", async () => {
  await withEnv({ GITHUB_COPILOT_CLI_VERSION: undefined }, () => {
    assert.equal(copilot.getGitHubCopilotCliVersion(), copilot.GITHUB_COPILOT_CLI_VERSION);
  });
});

test("#12417 getGitHubCopilotChatHeaders honors a safe env override", async () => {
  await withEnv({ GITHUB_COPILOT_CLI_VERSION: "1.0.82" }, () => {
    assert.equal(copilot.getGitHubCopilotCliVersion(), "1.0.82");
    const headers = copilot.getGitHubCopilotChatHeaders();
    assert.equal(headers["user-agent"], "copilot/1.0.82");
    assert.equal(headers["editor-version"], "copilot/1.0.82");
  });
});

test("#12417 getGitHubCopilotCliVersion ignores an unsafe env override", async () => {
  await withEnv({ GITHUB_COPILOT_CLI_VERSION: "not a version" }, () => {
    assert.equal(copilot.getGitHubCopilotCliVersion(), copilot.GITHUB_COPILOT_CLI_VERSION);
  });
});

test("#12417 getClaudeCliHeaders reads the env at call time", async () => {
  await withEnv({ CLAUDE_CODE_CLIENT_VERSION: "2.1.259" }, () => {
    assert.equal(
      claudeHeaders.getClaudeCliHeaders()["User-Agent"],
      "claude-cli/2.1.259 (external, cli)"
    );
  });
});

test("#12417 applyFingerprint Copilot UA follows the env, pin const does not", async () => {
  const fingerprints = await import("../../open-sse/config/cliFingerprints.ts");
  await withEnv({ GITHUB_COPILOT_CLI_VERSION: "1.0.82" }, () => {
    const result = fingerprints.applyFingerprint(
      "copilot",
      { Authorization: "Bearer token", Accept: "application/json" },
      { model: "gpt-4o", messages: [] }
    );
    assert.equal(result.headers["User-Agent"], "GitHubCopilotChat/1.0.82");
    assert.equal(copilot.GITHUB_COPILOT_CHAT_USER_AGENT, "GitHubCopilotChat/1.0.81-6");
  });
});

test("#12417 Claude billing pin stays captured while getter follows env", async () => {
  const hdr = await import("../../open-sse/config/anthropicHeaders.ts");
  await withEnv({ CLAUDE_CODE_CLIENT_VERSION: "2.1.259" }, () => {
    assert.equal(hdr.CLAUDE_CLI_BILLING_VERSION, canonical.CLAUDE_CODE_CLIENT_BILLING_VERSION);
    assert.equal(
      hdr.getClaudeCliBillingVersion(),
      `2.1.259.${canonical.CLAUDE_CODE_CLIENT_BUILD_REVISION}`
    );
  });
});
