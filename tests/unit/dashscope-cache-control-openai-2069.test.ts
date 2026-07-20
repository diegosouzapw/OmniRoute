import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { translateRequest } from "../../open-sse/translator/index.ts";
import "../../open-sse/translator/bootstrap.ts";
import {
  providerSupportsCaching,
  providerHonorsOpenAIFormatCacheControl,
  shouldPreserveCacheControl,
} from "../../open-sse/utils/cacheControlPolicy.ts";

// Regression for upstream decolua/9router#2069: cache_control markers are stripped
// when routing a Claude-format request to an OpenAI-compatible DashScope provider
// (alibaba / alibaba-cn / qwen-cloud = upstream "alicode"/"alicode-intl"). DashScope's
// OpenAI-compatible API natively honors `cache_control: {type:"ephemeral"}`, so the
// markers must survive translation when preservation is requested for that provider.

function buildClaudeBody() {
  return {
    system: [
      {
        type: "text",
        text: "You are a coding assistant. ".repeat(60),
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "First, some uncached context." },
          { type: "text", text: "Cache me please.", cache_control: { type: "ephemeral" } },
        ],
      },
    ],
  };
}

function hasCacheControl(node: unknown): boolean {
  return JSON.stringify(node).includes("cache_control");
}

describe("DashScope OpenAI-compat cache_control preservation (#2069)", () => {
  test("alibaba is recognized as a prompt-caching provider", () => {
    assert.equal(providerSupportsCaching("alibaba"), true);
    assert.equal(providerSupportsCaching("alibaba-cn"), true);
    assert.equal(providerSupportsCaching("qwen-cloud"), true);
  });

  test("shouldPreserveCacheControl is true for Claude Code → alibaba single model", () => {
    assert.equal(
      shouldPreserveCacheControl({
        userAgent: "claude-cli/2.1.0 (external, sdk-cli)",
        isCombo: false,
        targetProvider: "alibaba",
        targetFormat: "openai",
      }),
      true
    );
  });

  test("preserveCacheControl=true keeps cache_control on system + message text blocks", () => {
    const out = translateRequest(
      "claude",
      "openai",
      "alibaba/qwen3-coder-plus",
      buildClaudeBody(),
      false,
      null,
      "alibaba",
      null,
      { preserveCacheControl: true }
    ) as { messages: Array<Record<string, unknown>> };

    const system = out.messages.find((m) => m.role === "system");
    const user = out.messages.find((m) => m.role === "user");

    assert.ok(system, "system message present");
    assert.ok(user, "user message present");
    assert.equal(hasCacheControl(system), true, "system cache_control preserved");
    assert.equal(hasCacheControl(user), true, "user cache_control preserved");

    // The cache_control marker must land on the exact block the client tagged,
    // not be smeared across uncached blocks.
    const userContent = user!.content as Array<Record<string, unknown>>;
    assert.ok(Array.isArray(userContent), "user content stays an array of blocks");
    const tagged = userContent.find((b) => b.text === "Cache me please.");
    const untagged = userContent.find((b) => b.text === "First, some uncached context.");
    assert.deepEqual(tagged?.cache_control, { type: "ephemeral" });
    assert.equal(untagged?.cache_control, undefined);
  });

  test("preserveCacheControl=false strips cache_control (OmniRoute manages caching)", () => {
    const out = translateRequest(
      "claude",
      "openai",
      "alibaba/qwen3-coder-plus",
      buildClaudeBody(),
      false,
      null,
      "alibaba",
      null,
      { preserveCacheControl: false }
    ) as { messages: Array<Record<string, unknown>> };

    assert.equal(hasCacheControl(out.messages), false, "cache_control stripped when not preserved");
  });

  test("non-caching OpenAI provider still strips cache_control even if asked", () => {
    // A generic OpenAI-compatible provider not on the caching allowlist must NOT
    // receive cache_control passthrough — guards against blast radius. Here the
    // policy gate (shouldPreserveCacheControl) would already be false, but even a
    // direct preserve=true call only matters for caching-capable providers; this
    // asserts we did not turn filterToOpenAIFormat into an unconditional passthrough.
    assert.equal(providerSupportsCaching("groq"), false);
    assert.equal(
      shouldPreserveCacheControl({
        userAgent: "claude-cli/2.1.0",
        isCombo: false,
        targetProvider: "groq",
        targetFormat: "openai",
      }),
      false
    );
  });

  test("explicit-breakpoint predicate is narrow: DashScope/Xiaomi yes, implicit-cache OpenAI no", () => {
    // alibaba / alibaba-cn / qwen-cloud / xiaomi-mimo accept explicit OpenAI-format markers.
    assert.equal(providerHonorsOpenAIFormatCacheControl("alibaba"), true);
    assert.equal(providerHonorsOpenAIFormatCacheControl("alibaba-cn"), true);
    assert.equal(providerHonorsOpenAIFormatCacheControl("qwen-cloud"), true);
    assert.equal(providerHonorsOpenAIFormatCacheControl("xiaomi-mimo"), true);
    // openai / codex / azure are caching providers via AUTOMATIC prefix caching
    // (#3955) — they do NOT take explicit cache_control in the request and must
    // NOT receive passthrough (regression guard for chatcore-translation-paths).
    assert.equal(providerHonorsOpenAIFormatCacheControl("openai"), false);
    assert.equal(providerHonorsOpenAIFormatCacheControl("codex"), false);
    assert.equal(providerHonorsOpenAIFormatCacheControl("azure"), false);
    assert.equal(providerHonorsOpenAIFormatCacheControl(null), false);
  });

  test("mixed string + object system blocks: string text preserved, no crash", () => {
    const body = {
      system: [
        "plain string directive",
        { type: "text", text: "tagged", cache_control: { type: "ephemeral" } },
      ],
      messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
    };
    const out = translateRequest(
      "claude",
      "openai",
      "alibaba/qwen3-coder-plus",
      body,
      false,
      null,
      "alibaba",
      null,
      { preserveCacheControl: true }
    ) as { messages: Array<Record<string, unknown>> };

    const system = out.messages.find((m) => m.role === "system");
    const content = system!.content as Array<Record<string, unknown>>;
    // The plain string element must not be silently dropped.
    assert.equal(
      content.some((b) => b.text === "plain string directive"),
      true,
      "string system element text is preserved"
    );
    // The tagged object keeps its cache_control breakpoint.
    const tagged = content.find((b) => b.text === "tagged");
    assert.deepEqual(tagged?.cache_control, { type: "ephemeral" });
  });

  test("openai provider strips cache_control even with preserveCacheControl=true (implicit cache)", () => {
    // Mirrors tests/unit/chatcore-translation-paths.test.ts: a Claude Code request
    // routed to the `openai` provider must arrive WITHOUT cache_control even though
    // shouldPreserveCacheControl() returns true (openai ∈ CACHING_PROVIDERS).
    assert.equal(providerSupportsCaching("openai"), true);
    const out = translateRequest(
      "claude",
      "openai",
      "openai/gpt-4o-mini",
      buildClaudeBody(),
      false,
      null,
      "openai",
      null,
      { preserveCacheControl: true }
    ) as { messages: Array<Record<string, unknown>> };
    assert.equal(
      hasCacheControl(out.messages),
      false,
      "openai (implicit prefix cache) must not receive explicit cache_control"
    );
  });
});
