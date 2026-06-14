/**
 * Adaptive keepalive threshold — Unit Tests (PR5 of issue #3368)
 *
 * Run: node --import tsx/esm --test tests/unit/keepalive-threshold.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  resolveKeepaliveThreshold,
  SLOW_KEEPALIVE_PROVIDERS,
} from "../../open-sse/utils/keepaliveThreshold.ts";

describe("resolveKeepaliveThreshold", () => {
  it("returns 2000ms default for undefined model", () => {
    assert.equal(resolveKeepaliveThreshold(undefined), 2000);
  });

  it("returns 2000ms default for null model", () => {
    assert.equal(resolveKeepaliveThreshold(null), 2000);
  });

  it("returns 2000ms default for empty string", () => {
    assert.equal(resolveKeepaliveThreshold(""), 2000);
  });

  it("returns 2000ms default for model without prefix", () => {
    assert.equal(resolveKeepaliveThreshold("gpt-4"), 2000);
  });

  it("returns 2000ms default for normal API-key provider", () => {
    assert.equal(resolveKeepaliveThreshold("openai/gpt-4"), 2000);
    assert.equal(resolveKeepaliveThreshold("anthropic/claude-sonnet-4"), 2000);
    assert.equal(resolveKeepaliveThreshold("deepseek/deepseek-chat"), 2000);
  });

  it("returns 15000ms for anonymous fallback provider (pollinations)", () => {
    assert.equal(resolveKeepaliveThreshold("pollinations/gpt-5"), 15000);
  });

  it("returns 15000ms for anonymous fallback provider alias (pol)", () => {
    assert.equal(resolveKeepaliveThreshold("pol/gpt-5"), 15000);
  });

  it("returns 15000ms for anonymous fallback provider (opencode-zen)", () => {
    assert.equal(resolveKeepaliveThreshold("opencode-zen/gpt-4"), 15000);
  });

  it("returns 15000ms for web-session provider (chatgpt-web)", () => {
    assert.equal(resolveKeepaliveThreshold("chatgpt-web/gpt-5"), 15000);
  });

  it("returns 15000ms for web-session provider (grok-web)", () => {
    assert.equal(resolveKeepaliveThreshold("grok-web/grok-4"), 15000);
  });

  it("returns 15000ms for web-session provider (claude-web)", () => {
    assert.equal(resolveKeepaliveThreshold("claude-web/claude-sonnet-4"), 15000);
  });

  it("SLOW_KEEPALIVE_PROVIDERS set contains expected providers", () => {
    assert.ok(SLOW_KEEPALIVE_PROVIDERS.has("pollinations"));
    assert.ok(SLOW_KEEPALIVE_PROVIDERS.has("pol"));
    assert.ok(SLOW_KEEPALIVE_PROVIDERS.has("opencode-zen"));
    assert.ok(SLOW_KEEPALIVE_PROVIDERS.has("chatgpt-web"));
    assert.ok(SLOW_KEEPALIVE_PROVIDERS.has("grok-web"));
    assert.ok(SLOW_KEEPALIVE_PROVIDERS.has("claude-web"));
  });

  it("SLOW_KEEPALIVE_PROVIDERS does not contain normal providers", () => {
    assert.ok(!SLOW_KEEPALIVE_PROVIDERS.has("openai"));
    assert.ok(!SLOW_KEEPALIVE_PROVIDERS.has("anthropic"));
    assert.ok(!SLOW_KEEPALIVE_PROVIDERS.has("deepseek"));
  });
});
