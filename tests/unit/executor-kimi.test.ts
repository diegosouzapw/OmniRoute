import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  KIMI_CODING_ANTHROPIC_URL,
  KIMI_CODING_OPENAI_URL,
} from "../../open-sse/config/providers/registry/kimi/coding/runtime.ts";
import { REGISTRY } from "../../open-sse/config/providers/index.ts";
import { getExecutor } from "../../open-sse/executors/index.ts";
import { KimiExecutor } from "../../open-sse/executors/kimi.ts";
import { MoonshotExecutor } from "../../open-sse/executors/moonshot.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { resolveStreamFlag } from "../../open-sse/utils/aiSdkCompat.ts";

type TransformedBody = {
  stream?: boolean;
  thinking?: Record<string, unknown>;
  output_config?: Record<string, unknown>;
  context_management?: Record<string, unknown>;
  betas?: unknown[];
  stream_options?: Record<string, unknown>;
  max_tokens?: unknown;
  max_completion_tokens?: unknown;
  reasoning_effort?: unknown;
  messages?: Array<Record<string, unknown>>;
};

function credentials(
  targetFormat: string,
  thinking: Record<string, unknown> = {},
  auth: Record<string, unknown> = { accessToken: "oauth-token" }
) {
  return {
    ...auth,
    providerSpecificData: {
      _omnirouteKimiTargetFormat: targetFormat,
      _omnirouteKimiThinking: thinking,
      deviceId: "123456781234123412341234567890ab",
      deviceName: "test-host",
      deviceModel: "test-model",
      osVersion: "test-os",
    },
  };
}

describe("KimiExecutor", () => {
  it("forces the primary Kimi upstream to stream while preserving JSON client semantics", () => {
    assert.equal(REGISTRY.kimi?.forceStream, true);

    const executor = getExecutor("kimi");
    assert.ok(executor instanceof MoonshotExecutor);
    assert.equal(
      executor.buildUrl("kimi-k2.5", true, 0, credentials(FORMATS.OPENAI)),
      "https://api.moonshot.ai/v1/chat/completions"
    );

    const transformed = executor.transformRequest(
      "kimi-k2.5",
      { stream: false, messages: [{ role: "user", content: "hi" }] },
      true,
      credentials(FORMATS.OPENAI)
    ) as TransformedBody;

    assert.equal(transformed.stream, true);
    assert.equal(resolveStreamFlag(false, "application/json", "openai"), false);
  });

  it("keeps explicit non-stream mode when the executor is not asked to stream", () => {
    const executor = new KimiExecutor();
    const transformed = executor.transformRequest(
      "k3",
      { stream: false, messages: [{ role: "user", content: "hi" }] },
      false,
      credentials(FORMATS.OPENAI)
    ) as TransformedBody;

    assert.equal(transformed.stream, false);
  });

  it("routes OAuth OpenAI models to chat/completions with CLI identity headers", () => {
    const executor = new KimiExecutor();
    const creds = credentials(FORMATS.OPENAI);

    assert.equal(executor.buildUrl("kimi-for-coding", true, 0, creds), KIMI_CODING_OPENAI_URL);
    const headers = executor.buildHeaders(creds);
    assert.equal(headers.Authorization, "Bearer oauth-token");
    assert.equal(headers["x-api-key"], undefined);
    assert.equal(headers["X-Msh-Platform"], "kimi_code_cli");
    assert.equal(headers["X-Msh-Version"], "0.26.0");
    assert.equal(headers["X-Msh-Device-Id"], "12345678-1234-1234-1234-1234567890ab");
    assert.equal(headers["User-Agent"], "kimi-code-cli/0.26.0");
  });

  it("routes Anthropic-protocol models to beta Messages with x-api-key", () => {
    const executor = new KimiExecutor();
    const creds = credentials(FORMATS.CLAUDE);

    assert.equal(executor.buildUrl("kimi-for-coding", true, 0, creds), KIMI_CODING_ANTHROPIC_URL);
    const headers = executor.buildHeaders(creds);
    assert.equal(headers.Authorization, undefined);
    assert.equal(headers["x-api-key"], "oauth-token");
    assert.equal(headers["Anthropic-Version"], "2023-06-01");
  });

  it("normalizes OpenAI thinking, token limits, usage, and preserved history", () => {
    const executor = new KimiExecutor();
    const transformed = executor.transformRequest(
      "kimi-for-coding",
      {
        max_tokens: 4096,
        reasoning_effort: "high",
        messages: [
          { role: "user", content: "hi" },
          {
            role: "assistant",
            tool_calls: [
              {
                id: "call_1",
                type: "function",
                function: { name: "search", arguments: "{}" },
              },
            ],
          },
        ],
      },
      true,
      credentials(FORMATS.OPENAI, {
        supportsThinking: true,
        supportedThinkingEfforts: ["low", "medium", "high"],
      })
    ) as TransformedBody;

    assert.equal(transformed.max_tokens, undefined);
    assert.equal(transformed.max_completion_tokens, 4096);
    assert.deepEqual(transformed.thinking, { type: "enabled", effort: "high", keep: "all" });
    assert.deepEqual(transformed.stream_options, { include_usage: true });
    assert.equal(transformed.reasoning_effort, undefined);
    assert.equal(transformed.messages?.[1]?.reasoning_content, "");
  });

  it("does not backfill OpenAI reasoning_content while thinking is disabled", () => {
    const executor = new KimiExecutor();
    const transformed = executor.transformRequest(
      "kimi-for-coding",
      {
        thinking: { type: "disabled", keep: "all" },
        messages: [
          {
            role: "assistant",
            tool_calls: [
              {
                id: "call_1",
                type: "function",
                function: { name: "search", arguments: "{}" },
              },
            ],
          },
        ],
      },
      false,
      credentials(FORMATS.OPENAI, { supportsThinking: true })
    ) as TransformedBody;

    assert.deepEqual(transformed.thinking, { type: "disabled", keep: "all" });
    assert.equal(Object.hasOwn(transformed.messages?.[0] ?? {}, "reasoning_content"), false);
  });

  it("uses effort rather than budget_tokens on Kimi's Anthropic protocol", () => {
    const executor = new KimiExecutor();
    const transformed = executor.transformRequest(
      "kimi-for-coding",
      {
        thinking: { type: "enabled", budget_tokens: 131072 },
        output_config: { effort: "high" },
        messages: [
          {
            role: "assistant",
            content: [{ type: "tool_use", id: "toolu_1", name: "search", input: {} }],
          },
          { role: "user", content: [{ type: "text", text: "continue" }] },
        ],
      },
      false,
      credentials(FORMATS.CLAUDE, {
        supportsThinking: true,
        supportedThinkingEfforts: ["low", "medium", "high"],
      })
    ) as TransformedBody;

    assert.deepEqual(transformed.thinking, { type: "enabled" });
    assert.deepEqual(transformed.output_config, { effort: "high" });
    assert.deepEqual(transformed.context_management, {
      edits: [{ type: "clear_thinking_20251015", keep: "all" }],
    });
    assert.deepEqual(transformed.betas, ["context-management-2025-06-27"]);
    assert.deepEqual(transformed.messages?.[0]?.content, [
      { type: "thinking", thinking: "" },
      { type: "tool_use", id: "toolu_1", name: "search", input: {} },
    ]);
  });

  it("coerces thinking-off to the discovered default for always-thinking models", () => {
    const executor = new KimiExecutor();
    const transformed = executor.transformRequest(
      "kimi-for-coding",
      { reasoning_effort: "off", messages: [{ role: "user", content: "hi" }] },
      false,
      credentials(FORMATS.OPENAI, {
        supportsThinking: true,
        alwaysThinking: true,
        supportedThinkingEfforts: ["medium", "high"],
        defaultThinkingEffort: "medium",
      })
    ) as TransformedBody;

    assert.deepEqual(transformed.thinking, {
      type: "enabled",
      effort: "medium",
      keep: "all",
    });
  });

  it("defaults Kimi Code k3 to max effort", () => {
    const executor = new KimiExecutor();
    const transformed = executor.transformRequest(
      "k3",
      { messages: [{ role: "user", content: "hi" }] },
      false,
      credentials(FORMATS.CLAUDE, {
        supportsThinking: true,
        supportedThinkingEfforts: ["low", "high", "max"],
        defaultThinkingEffort: "max",
      })
    ) as TransformedBody;

    assert.deepEqual(transformed.thinking, { type: "enabled" });
    assert.deepEqual(transformed.output_config, { effort: "max" });
  });

  it("keeps explicit thinking-off available for Kimi Code k3", () => {
    const executor = new KimiExecutor();
    const transformed = executor.transformRequest(
      "k3",
      { reasoning_effort: "off", messages: [{ role: "user", content: "hi" }] },
      false,
      credentials(FORMATS.OPENAI, {
        supportsThinking: true,
        supportedThinkingEfforts: ["max"],
        defaultThinkingEffort: "max",
      })
    ) as TransformedBody;

    assert.deepEqual(transformed.thinking, { type: "disabled" });
  });
});
