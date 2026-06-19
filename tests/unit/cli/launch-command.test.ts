import { test } from "node:test";
import assert from "node:assert/strict";
import { buildClaudeEnv } from "../../../bin/cli/commands/launch.mjs";

test("buildClaudeEnv strips ANTHROPIC_* and injects proxy vars", () => {
  const env = buildClaudeEnv({ ANTHROPIC_API_KEY: "leak", ANTHROPIC_BASE_URL: "old", PATH: "/bin" }, 20128, "secret");
  assert.equal(env.ANTHROPIC_API_KEY, undefined);
  assert.equal(env.ANTHROPIC_BASE_URL, "http://localhost:20128");
  assert.equal(env.ANTHROPIC_AUTH_TOKEN, "secret");
  assert.equal(env.CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY, "1");
  assert.equal(env.CLAUDE_CODE_AUTO_COMPACT_WINDOW, "190000");
  assert.equal(env.PATH, "/bin", "non-ANTHROPIC vars are preserved");
});

test("buildClaudeEnv uses a no-auth sentinel when no token is provided (bypasses Claude's login gate)", () => {
  const env = buildClaudeEnv({ PATH: "/bin" }, 20128, undefined);
  assert.equal(env.ANTHROPIC_AUTH_TOKEN, "omniroute-no-auth");
  assert.equal(env.ANTHROPIC_BASE_URL, "http://localhost:20128");
});

test("buildClaudeEnv does not mutate the input env object", () => {
  const input = { ANTHROPIC_API_KEY: "leak", PATH: "/bin" };
  buildClaudeEnv(input, 20128, "x");
  assert.equal(input.ANTHROPIC_API_KEY, "leak");
});
