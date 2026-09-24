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

/**
 * Tightest client first-byte watchdog observed against this proxy. Measured from
 * the `oh-my-pi` CLI: its combo requests aborted with an empty response body at
 * 2 011–2 016 ms, while the keepalive first byte landed at the old 2 000 ms
 * threshold — the two 2 s budgets raced and the abort won.
 *
 * The DEFAULT tier is the one that matters here: combos arrive as a bare name
 * with no provider prefix, and a combo handler essentially never resolves inside
 * 2 s, so the default threshold *is* the combo time-to-first-byte.
 */
const OBSERVED_CLIENT_WATCHDOG_MS = 2_000;

const DEFAULT_MS = 1_000;
const SLOW_MS = 15_000;

describe("resolveKeepaliveThreshold", () => {
  it("returns the default threshold for undefined model", () => {
    assert.equal(resolveKeepaliveThreshold(undefined), DEFAULT_MS);
  });

  it("returns the default threshold for null model", () => {
    assert.equal(resolveKeepaliveThreshold(null), DEFAULT_MS);
  });

  it("returns the default threshold for empty string", () => {
    assert.equal(resolveKeepaliveThreshold(""), DEFAULT_MS);
  });

  it("returns the default threshold for model without prefix", () => {
    assert.equal(resolveKeepaliveThreshold("gpt-4"), DEFAULT_MS);
  });

  it("returns the default threshold for a bare combo name (no provider prefix)", () => {
    // Combos reach the resolver as a bare name ("small-stack"), which has no "/"
    // and therefore takes the default tier — the tier that decides whether a
    // combo's client sees its first byte at all.
    assert.equal(resolveKeepaliveThreshold("small-stack"), DEFAULT_MS);
    assert.equal(resolveKeepaliveThreshold("paper-stack"), DEFAULT_MS);
    assert.equal(resolveKeepaliveThreshold("free-stack"), DEFAULT_MS);
  });

  it("returns the default threshold for normal API-key provider", () => {
    assert.equal(resolveKeepaliveThreshold("openai/gpt-4"), DEFAULT_MS);
    assert.equal(resolveKeepaliveThreshold("anthropic/claude-sonnet-4"), DEFAULT_MS);
    assert.equal(resolveKeepaliveThreshold("deepseek/deepseek-chat"), DEFAULT_MS);
    assert.equal(resolveKeepaliveThreshold("nvidia/z-ai/glm-5.3"), DEFAULT_MS);
  });

  it("returns the slow threshold for anonymous fallback provider (pollinations)", () => {
    assert.equal(resolveKeepaliveThreshold("pollinations/gpt-5"), SLOW_MS);
  });

  it("returns the slow threshold for anonymous fallback provider alias (pol)", () => {
    assert.equal(resolveKeepaliveThreshold("pol/gpt-5"), SLOW_MS);
  });

  it("returns the slow threshold for anonymous fallback provider (opencode-zen)", () => {
    assert.equal(resolveKeepaliveThreshold("opencode-zen/gpt-4"), SLOW_MS);
  });

  it("uses a longer threshold for clean-room ChatGPT Web but not its retired alias", () => {
    assert.equal(resolveKeepaliveThreshold("chatgpt-web/gpt-5"), SLOW_MS);
    assert.equal(resolveKeepaliveThreshold("cgpt-web/gpt-5"), DEFAULT_MS);
  });

  it("keeps the longer threshold for ChatGPT Web Codex", () => {
    assert.equal(resolveKeepaliveThreshold("chatgpt-web-codex/high"), SLOW_MS);
  });

  it("returns the slow threshold for web-session provider (grok-web)", () => {
    assert.equal(resolveKeepaliveThreshold("grok-web/grok-4"), SLOW_MS);
  });

  it("returns the slow threshold for web-session provider (claude-web)", () => {
    assert.equal(resolveKeepaliveThreshold("claude-web/claude-sonnet-4"), SLOW_MS);
  });

  it("keeps the default tier strictly below the observed client first-byte watchdog", () => {
    // The regression this pins: the old 2 000 ms default equalled the watchdog, so
    // the keepalive byte and the client's abort raced and the abort won — every
    // combo request died as a 499 with zero bytes written. Assert the invariant,
    // not just the literal, so a future re-tuning cannot silently reintroduce it.
    const defaultTierSamples = [
      undefined,
      "gpt-4",
      "small-stack",
      "paper-stack",
      "free-stack",
      "openai/gpt-4",
      "anthropic/claude-sonnet-4",
      "nvidia/z-ai/glm-5.3",
      "cgpt-web/gpt-5",
    ];
    for (const model of defaultTierSamples) {
      const threshold = resolveKeepaliveThreshold(model);
      assert.equal(
        threshold,
        DEFAULT_MS,
        `${model ?? "<undefined>"} should be priced at the default tier`
      );
      assert.ok(
        threshold < OBSERVED_CLIENT_WATCHDOG_MS,
        `${model ?? "<undefined>"} must commit the keepalive before the client watchdog ` +
          `(got ${threshold}ms, watchdog ${OBSERVED_CLIENT_WATCHDOG_MS}ms)`
      );
    }
  });

  it("SLOW_KEEPALIVE_PROVIDERS set contains expected providers", () => {
    assert.ok(SLOW_KEEPALIVE_PROVIDERS.has("pollinations"));
    assert.ok(SLOW_KEEPALIVE_PROVIDERS.has("pol"));
    assert.ok(SLOW_KEEPALIVE_PROVIDERS.has("opencode-zen"));
    assert.ok(SLOW_KEEPALIVE_PROVIDERS.has("chatgpt-web"));
    assert.ok(SLOW_KEEPALIVE_PROVIDERS.has("chatgpt-web-codex"));
    assert.ok(SLOW_KEEPALIVE_PROVIDERS.has("grok-web"));
    assert.ok(SLOW_KEEPALIVE_PROVIDERS.has("claude-web"));
  });

  it("SLOW_KEEPALIVE_PROVIDERS does not contain normal providers", () => {
    assert.ok(!SLOW_KEEPALIVE_PROVIDERS.has("openai"));
    assert.ok(!SLOW_KEEPALIVE_PROVIDERS.has("anthropic"));
    assert.ok(!SLOW_KEEPALIVE_PROVIDERS.has("deepseek"));
  });
});
