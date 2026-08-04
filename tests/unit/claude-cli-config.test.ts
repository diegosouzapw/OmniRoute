import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  buildClaudeDiscoverySettingsSnippet,
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

describe("buildClaudeDiscoverySettingsSnippet", () => {
  it("emits a settings.json env block with the gateway URL and the discovery flag", () => {
    const snippet = buildClaudeDiscoverySettingsSnippet({
      baseUrl: "http://192.168.0.111:20128/",
      apiKeyPlaceholder: "<sua chave>",
    });
    const parsed = JSON.parse(snippet);

    // Trailing slash normalized — Claude Code appends /v1/messages itself.
    assert.equal(parsed.env.ANTHROPIC_BASE_URL, "http://192.168.0.111:20128");
    assert.equal(parsed.env.ANTHROPIC_AUTH_TOKEN, "<sua chave>");
    assert.equal(parsed.env.CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY, "1");
  });

  it("never emits a real key — the caller passes the placeholder to render", () => {
    const snippet = buildClaudeDiscoverySettingsSnippet({
      baseUrl: "http://localhost:20128",
      apiKeyPlaceholder: "<paste-your-key>",
    });
    assert.match(snippet, /<paste-your-key>/);
    assert.doesNotMatch(snippet, /sk-/);
  });

  it("carries the auto-compact window only when a window is supplied", () => {
    const without = JSON.parse(
      buildClaudeDiscoverySettingsSnippet({ baseUrl: "http://x", apiKeyPlaceholder: "k" })
    );
    assert.equal("CLAUDE_CODE_AUTO_COMPACT_WINDOW" in without.env, false);

    const withWindow = JSON.parse(
      buildClaudeDiscoverySettingsSnippet({
        baseUrl: "http://x",
        apiKeyPlaceholder: "k",
        autoCompactWindow: 230000,
      })
    );
    // Emitted as a string: Claude Code reads settings env values as strings.
    assert.equal(withWindow.env.CLAUDE_CODE_AUTO_COMPACT_WINDOW, "230000");
  });

  it("ignores a non-positive or non-finite auto-compact window", () => {
    for (const bad of [0, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
      const parsed = JSON.parse(
        buildClaudeDiscoverySettingsSnippet({
          baseUrl: "http://x",
          apiKeyPlaceholder: "k",
          autoCompactWindow: bad,
        })
      );
      assert.equal(
        "CLAUDE_CODE_AUTO_COMPACT_WINDOW" in parsed.env,
        false,
        `window ${bad} must not reach the snippet`
      );
    }
  });

  it("is valid, indented JSON so the operator can paste it straight into settings.json", () => {
    const snippet = buildClaudeDiscoverySettingsSnippet({
      baseUrl: "http://localhost:20128",
      apiKeyPlaceholder: "k",
    });
    assert.match(snippet, /^\{\n {2}"env": \{\n/);
    assert.doesNotThrow(() => JSON.parse(snippet));
  });
});
