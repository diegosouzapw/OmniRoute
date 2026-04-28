import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  getStoredClaudeAuthValue,
  normalizeClaudeBaseUrl,
} from "../../src/shared/services/claudeCliConfig.ts";

describe("claudeCliConfig", () => {
  it("keeps the unified Claude gateway root without forcing /v1", () => {
    assert.equal(normalizeClaudeBaseUrl("http://localhost:20128"), "http://localhost:20128");
    assert.equal(normalizeClaudeBaseUrl("http://localhost:20128/"), "http://localhost:20128");
    assert.equal(normalizeClaudeBaseUrl("http://localhost:20128/v1"), "http://localhost:20128/v1");
  });

  it("prefers a stored auth token but can read legacy api key config", () => {
    assert.equal(
      getStoredClaudeAuthValue({ ANTHROPIC_AUTH_TOKEN: "sk-live-token" }),
      "sk-live-token"
    );
    assert.equal(getStoredClaudeAuthValue({ ANTHROPIC_API_KEY: "sk-legacy-key" }), "sk-legacy-key");
    assert.equal(
      getStoredClaudeAuthValue({
        ANTHROPIC_AUTH_TOKEN: "sk-live-token",
        ANTHROPIC_API_KEY: "sk-legacy-key",
      }),
      "sk-live-token"
    );
    assert.equal(getStoredClaudeAuthValue({}), null);
  });
});
