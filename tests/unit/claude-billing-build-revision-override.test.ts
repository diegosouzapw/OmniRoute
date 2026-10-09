/**
 * The `cc_version=` suffix must be overridable alongside the version, so an
 * operator bumping past Anthropic's model gate does not advertise a
 * `version.revision` pair no real binary emits.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  CLAUDE_CODE_CLIENT_BILLING_VERSION,
  CLAUDE_CODE_CLIENT_BUILD_REVISION,
  CLAUDE_CODE_CLIENT_VERSION,
  getClaudeCodeClientBillingVersion,
  getClaudeCodeClientBuildRevision,
} from "../../src/shared/constants/claudeCodeClient.ts";
import { getDefaultClaudeCodeBuildRevision } from "../../open-sse/services/ccBridgeTransforms.ts";

const ENV_VERSION = "CLAUDE_CODE_CLIENT_VERSION";
const ENV_REVISION = "CLAUDE_CODE_CLIENT_BUILD_REVISION";

async function withEnv<T>(
  entries: Record<string, string | undefined>,
  fn: () => T | Promise<T>
): Promise<T> {
  const previous = new Map<string, string | undefined>();
  for (const [key, value] of Object.entries(entries)) {
    previous.set(key, process.env[key]);
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    return await fn();
  } finally {
    for (const [key, value] of previous.entries()) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

test("captured pin is the fallback when no override is set", async () => {
  await withEnv({ [ENV_REVISION]: undefined }, () => {
    assert.equal(getClaudeCodeClientBuildRevision(), CLAUDE_CODE_CLIENT_BUILD_REVISION);
  });
});

test("CLAUDE_CODE_CLIENT_BUILD_REVISION overrides the captured pin", async () => {
  await withEnv({ [ENV_REVISION]: "a1b" }, () => {
    assert.equal(getClaudeCodeClientBuildRevision(), "a1b");
    assert.equal(getDefaultClaudeCodeBuildRevision(), "a1b");
  });
});

test("a malformed override is ignored rather than put on the wire", async () => {
  await withEnv({ [ENV_REVISION]: "bad revision value" }, () => {
    assert.equal(getClaudeCodeClientBuildRevision(), CLAUDE_CODE_CLIENT_BUILD_REVISION);
  });
});

test("captured pin constants stay fixed so snapshot readers can detect drift", () => {
  assert.equal(CLAUDE_CODE_CLIENT_VERSION, "2.1.280");
  assert.equal(CLAUDE_CODE_CLIENT_BUILD_REVISION, "1e2");
  assert.equal(
    CLAUDE_CODE_CLIENT_BILLING_VERSION,
    `${CLAUDE_CODE_CLIENT_VERSION}.${CLAUDE_CODE_CLIENT_BUILD_REVISION}`
  );
});

test("billing version composes the live version AND the live revision", async () => {
  await withEnv({ [ENV_VERSION]: "2.1.283", [ENV_REVISION]: "a1b" }, () => {
    assert.equal(getClaudeCodeClientBillingVersion(), "2.1.283.a1b");
  });
});

test("overriding only the version still appends the pinned revision", async () => {
  // Documents the footgun this change exists to close: bumping one half of the
  // pair still advertises a combination no binary emits.
  await withEnv({ [ENV_VERSION]: "2.1.283", [ENV_REVISION]: undefined }, () => {
    assert.equal(
      getClaudeCodeClientBillingVersion(),
      `2.1.283.${CLAUDE_CODE_CLIENT_BUILD_REVISION}`
    );
  });
});

test("with no overrides the billing version is exactly the captured pin pair", async () => {
  await withEnv({ [ENV_VERSION]: undefined, [ENV_REVISION]: undefined }, () => {
    assert.equal(getClaudeCodeClientBillingVersion(), "2.1.280.1e2");
    assert.equal(getDefaultClaudeCodeBuildRevision(), "1e2");
  });
});
