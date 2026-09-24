/**
 * Auto mode classifier pass-through (https://code.claude.com/docs/en/auto-mode-classifier-billing).
 *
 * Claude Code v2.1.278+ negotiates `dangerous-tool-use-2026-09-03` and sends the
 * paired top-level `safeguards` request field. The body field already survives
 * the claude to claude passthrough; the header did not, so the upstream never ran
 * the checks, no `message_delta.delta.safeguard_results` came back, and the client
 * latched onto its own billed classifier requests for the rest of the session.
 *
 * Holes covered here:
 *   1. the beta was not on FORWARDABLE_CLIENT_BETAS, so the allowlist merge dropped it
 *   2. an `anthropic-compatible-*` upstream has no static beta set, so `buildHeaders`
 *      skipped the merge entirely and forwarded no client beta at all
 *   3. `afk-mode-2026-01-31`, the second beta Claude Code sends in auto mode (#14186
 *      header capture), was still dropped on the Claude OAuth path
 *   4. the passthrough stream must hand `message_delta.delta.safeguard_results` and
 *      the upstream tool_use id back to the client unchanged
 */

import { describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  FORWARDABLE_CLIENT_BETAS,
  mergeClientAnthropicBeta,
} from "../../open-sse/config/anthropicHeaders.ts";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { selectBetaFlags } from "../../open-sse/executors/claudeIdentity.ts";
import { createPassthroughStreamWithLogger } from "../../open-sse/utils/stream.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

const AUTO_MODE_BETA = "dangerous-tool-use-2026-09-03";
const AFK_MODE_BETA = "afk-mode-2026-01-31";
const AUTO_MODE_BETAS = [AUTO_MODE_BETA, AFK_MODE_BETA];
const CLAUDE_CODE_BETA_HEADER = [
  "claude-code-20250219",
  "oauth-2025-04-20",
  "interleaved-thinking-2025-05-14",
  "context-management-2025-06-27",
  "effort-2025-11-24",
  AFK_MODE_BETA,
  AUTO_MODE_BETA,
].join(",");

function betaTokens(headers: Record<string, string>): string[] {
  const key = Object.keys(headers).find((name) => name.toLowerCase() === "anthropic-beta");
  return key ? headers[key].split(",").map((token) => token.trim()) : [];
}

const THIRD_PARTY_CREDS = {
  apiKey: "k-third-party",
  providerSpecificData: { baseUrl: "https://gateway.example/v1" },
} as Record<string, unknown>;

describe("mergeClientAnthropicBeta / auto mode classifier beta", () => {
  for (const beta of AUTO_MODE_BETAS) {
    test(`mergeClientAnthropicBeta_ClientNegotiated_${beta}_IsForwarded`, () => {
      const merged = mergeClientAnthropicBeta("claude-code-20250219", CLAUDE_CODE_BETA_HEADER);

      assert.ok(
        merged.split(",").includes(beta),
        `${beta} must reach the upstream alongside the safeguards body field`
      );
      assert.ok(FORWARDABLE_CLIENT_BETAS.includes(beta));
    });
  }

  test("mergeClientAnthropicBeta_AutoModeBetaAlreadyInBase_IsNotDuplicated", () => {
    const merged = mergeClientAnthropicBeta(
      `claude-code-20250219,${AUTO_MODE_BETA}`,
      CLAUDE_CODE_BETA_HEADER
    );

    assert.equal(merged.split(",").filter((token) => token === AUTO_MODE_BETA).length, 1);
  });

  test("mergeClientAnthropicBeta_UnknownClientBeta_IsStillDropped", () => {
    const merged = mergeClientAnthropicBeta(
      "claude-code-20250219",
      `${CLAUDE_CODE_BETA_HEADER},totally-made-up-2030-01-01`
    );

    assert.ok(!merged.includes("totally-made-up-2030-01-01"));
  });
});

describe("DefaultExecutor.buildHeaders / anthropic-compatible client betas", () => {
  test("buildHeaders_AnthropicCompatibleWithClientBeta_ForwardsAllowlistedBetas", () => {
    const executor = new DefaultExecutor("anthropic-compatible-thirdparty");

    const headers = executor.buildHeaders(THIRD_PARTY_CREDS, true, {
      "anthropic-beta": CLAUDE_CODE_BETA_HEADER,
    }) as Record<string, string>;

    const forwarded = (headers["anthropic-beta"] ?? "").split(",");
    assert.ok(
      forwarded.includes(AUTO_MODE_BETA),
      "an anthropic-compatible upstream must receive the client's auto mode beta"
    );
    assert.ok(forwarded.includes("effort-2025-11-24"));
  });

  test("buildHeaders_AnthropicCompatibleWithClientBeta_DropsNonAllowlistedBetas", () => {
    const executor = new DefaultExecutor("anthropic-compatible-thirdparty");

    const headers = executor.buildHeaders(THIRD_PARTY_CREDS, true, {
      "anthropic-beta": `${AUTO_MODE_BETA},totally-made-up-2030-01-01`,
    }) as Record<string, string>;

    const forwarded = (headers["anthropic-beta"] ?? "").split(",");
    assert.ok(forwarded.includes(AUTO_MODE_BETA));
    assert.ok(!forwarded.includes("totally-made-up-2030-01-01"));
  });

  test("buildHeaders_AnthropicCompatibleWithoutClientBeta_SendsNoBetaHeader", () => {
    const executor = new DefaultExecutor("anthropic-compatible-thirdparty");

    const headers = executor.buildHeaders(THIRD_PARTY_CREDS, true) as Record<string, string>;

    assert.equal(
      headers["anthropic-beta"],
      undefined,
      "a gateway must not invent betas the client never negotiated"
    );
  });

  test("buildHeaders_AnthropicCompatibleWithOnlyUnknownBetas_SendsNoEmptyHeader", () => {
    const executor = new DefaultExecutor("anthropic-compatible-thirdparty");

    const headers = executor.buildHeaders(THIRD_PARTY_CREDS, true, {
      "anthropic-beta": "totally-made-up-2030-01-01",
    }) as Record<string, string>;

    assert.equal(headers["anthropic-beta"], undefined);
  });

  test("buildHeaders_OpenAiCompatibleWithClientBeta_IsUnchanged", () => {
    const executor = new DefaultExecutor("openai-compatible-thirdparty");

    const headers = executor.buildHeaders(
      { apiKey: "k", providerSpecificData: { baseUrl: "https://gateway.example/v1" } },
      true,
      { "anthropic-beta": CLAUDE_CODE_BETA_HEADER }
    ) as Record<string, string>;

    assert.equal(
      headers["anthropic-beta"],
      undefined,
      "an OpenAI-format upstream must not start receiving Anthropic beta headers"
    );
  });
});

describe("Claude OAuth path / auto mode betas", () => {
  test("selectBetaFlagsMerge_RealClaudeCodeAutoModeHeader_KeepsBothAutoModeBetas", () => {
    const body = {
      model: "claude-sonnet-5",
      system: "You are a coding agent.",
      tools: [{ name: "Bash", description: "x", input_schema: { type: "object" } }],
    };

    const outbound = mergeClientAnthropicBeta(
      selectBetaFlags(body, null, CLAUDE_CODE_BETA_HEADER),
      CLAUDE_CODE_BETA_HEADER,
      undefined,
      "claude-sonnet-5"
    ).split(",");

    for (const beta of AUTO_MODE_BETAS) {
      assert.equal(outbound.filter((token) => token === beta).length, 1, `${beta} sent once`);
    }
  });

  test("buildHeaders_ClaudeProviderWithAutoModeHeader_KeepsBothAutoModeBetas", () => {
    const executor = new DefaultExecutor("claude");

    const headers = executor.buildHeaders({ accessToken: "sk-ant-oat-x" }, true, {
      "anthropic-beta": CLAUDE_CODE_BETA_HEADER,
    }) as Record<string, string>;

    const outbound = betaTokens(headers);
    for (const beta of AUTO_MODE_BETAS) {
      assert.ok(outbound.includes(beta), `outbound beta missing ${beta}: ${outbound.join(",")}`);
    }
  });

  test("buildHeaders_ClaudeProviderWithoutAutoMode_DoesNotInventAutoModeBetas", () => {
    const executor = new DefaultExecutor("claude");

    const headers = executor.buildHeaders({ accessToken: "sk-ant-oat-x" }, true, {
      "anthropic-beta": "claude-code-20250219,oauth-2025-04-20",
    }) as Record<string, string>;

    const outbound = betaTokens(headers);
    for (const beta of AUTO_MODE_BETAS) {
      assert.ok(!outbound.includes(beta), `${beta} must only travel when the client sent it`);
    }
  });
});

async function pipeThrough(transform: TransformStream<Uint8Array, Uint8Array>, sse: string) {
  const writer = transform.writable.getWriter();
  const pump = writer.write(new TextEncoder().encode(sse)).then(() => writer.close());
  const text = await new Response(transform.readable).text();
  await pump;
  return text;
}

function sseEvent(type: string, data: Record<string, unknown>): string {
  return `event: ${type}\ndata: ${JSON.stringify({ type, ...data })}\n\n`;
}

describe("Claude passthrough stream / auto mode verdicts", () => {
  test("passthrough_SafeguardResultsAndToolUseId_ReachTheClientUnchanged", async () => {
    const toolUseId = "toolu_01AutoModeProbe";
    const safeguardResults = [
      { type: "dangerous_tool_use", tool_use_id: toolUseId, allowed: true },
    ];
    const upstream = [
      sseEvent("message_start", {
        message: {
          id: "msg_auto_mode",
          type: "message",
          role: "assistant",
          model: "claude-sonnet-5",
          content: [],
          stop_reason: null,
          usage: { input_tokens: 12, output_tokens: 1 },
        },
      }),
      sseEvent("content_block_start", {
        index: 0,
        content_block: { type: "tool_use", id: toolUseId, name: "Bash", input: {} },
      }),
      sseEvent("content_block_delta", {
        index: 0,
        delta: { type: "input_json_delta", partial_json: '{"command":"echo ok"}' },
      }),
      sseEvent("content_block_stop", { index: 0 }),
      sseEvent("message_delta", {
        delta: { stop_reason: "tool_use", safeguard_results: safeguardResults },
        usage: { output_tokens: 9 },
      }),
      sseEvent("message_stop", {}),
    ].join("");

    const transform = createPassthroughStreamWithLogger(
      "claude",
      null,
      null,
      "claude-sonnet-5",
      null,
      { stream: true },
      null,
      null,
      null,
      FORMATS.CLAUDE
    );
    const events = (await pipeThrough(transform, upstream))
      .split("\n")
      .filter((line) => line.startsWith("data: "))
      .map((line) => JSON.parse(line.slice("data: ".length)));

    const blockStart = events.find((event) => event.type === "content_block_start");
    const messageDelta = events.find((event) => event.type === "message_delta");
    assert.equal(blockStart?.content_block?.id, toolUseId, "tool_use id must not be rewritten");
    assert.deepEqual(messageDelta?.delta?.safeguard_results, safeguardResults);
  });
});
