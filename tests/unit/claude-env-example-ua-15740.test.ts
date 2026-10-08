import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { CLAUDE_CODE_CLIENT_VERSION } from "../../src/shared/constants/claudeCodeClient.ts";
import { resolveProviderUserAgentOverride } from "../../open-sse/executors/providerUserAgentOverride.ts";

const ENV_EXAMPLE = path.join(import.meta.dirname, "../../.env.example");

function activeEnvExampleValue(key: string): string | null {
  for (const line of fs.readFileSync(ENV_EXAMPLE, "utf8").split(/\r?\n/)) {
    const m = line.match(new RegExp(`^${key}=(.*)$`));
    if (m) return m[1].trim().replace(/^["']|["']$/g, "");
  }
  return null;
}

test("#15740: .env.example must not actively pin CLAUDE_USER_AGENT to an older version", () => {
  const ua = activeEnvExampleValue("CLAUDE_USER_AGENT");
  if (ua === null) return;
  const v = ua.match(/claude-cli\/(\d+\.\d+\.\d+)/)?.[1];
  assert.equal(v, CLAUDE_CODE_CLIENT_VERSION);
});

test("#15740: stale claude-cli env UA older than the pin is ignored for claude", () => {
  assert.equal(
    resolveProviderUserAgentOverride("claude", "claude-cli/2.1.258 (external, cli)"),
    null
  );
  assert.equal(
    resolveProviderUserAgentOverride(
      "claude",
      `claude-cli/${CLAUDE_CODE_CLIENT_VERSION} (external, cli)`
    ),
    `claude-cli/${CLAUDE_CODE_CLIENT_VERSION} (external, cli)`
  );
  assert.equal(
    resolveProviderUserAgentOverride("claude", "claude-cli/9.9.9 (external, cli)"),
    "claude-cli/9.9.9 (external, cli)"
  );
});

test("#15740: custom and non-claude UAs stay honored", () => {
  assert.equal(resolveProviderUserAgentOverride("claude", "my-agent/2.0"), "my-agent/2.0");
  assert.equal(
    resolveProviderUserAgentOverride("codex", "claude-cli/2.1.258 (external, cli)"),
    "claude-cli/2.1.258 (external, cli)"
  );
  assert.equal(resolveProviderUserAgentOverride("claude", ""), null);
  assert.equal(resolveProviderUserAgentOverride("claude", undefined), null);
});
