/**
 * The API-key beta list shared the Claude Code marker with the OAuth list.
 * Anthropic bills a request carrying claude-code-20250219 against the Claude
 * Code subscription, so a plain API key with no subscription comes back as
 * "credit balance is too low" even when the API balance is fine. The same key
 * without that marker is accepted.
 *
 * OAuth traffic still needs the marker. Only the API-key list drops it.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  ANTHROPIC_BETA_API_KEY,
  ANTHROPIC_BETA_CLAUDE_OAUTH,
} from "../../open-sse/config/anthropicHeaders.ts";

const CLAUDE_CODE_BETA = "claude-code-20250219";

test("API-key beta list does not mark the request as Claude Code", () => {
  const tokens = ANTHROPIC_BETA_API_KEY.split(",");
  assert.equal(tokens.includes(CLAUDE_CODE_BETA), false);
});

test("Claude OAuth beta list keeps the Claude Code marker", () => {
  const tokens = ANTHROPIC_BETA_CLAUDE_OAUTH.split(",");
  assert.equal(tokens.includes(CLAUDE_CODE_BETA), true);
});
