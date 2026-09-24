/**
 * Auto mode classifier pass-through (https://code.claude.com/docs/en/auto-mode-classifier-billing).
 *
 * Claude Code v2.1.278+ negotiates `dangerous-tool-use-2026-09-03` and sends the
 * paired top-level `safeguards` request field. The body field already survives
 * the claude to claude passthrough; the header did not, so the upstream never ran
 * the checks, no `message_delta.delta.safeguard_results` came back, and the client
 * latched onto its own billed classifier requests for the rest of the session.
 *
 * Two holes are covered here:
 *   1. the beta was not on FORWARDABLE_CLIENT_BETAS, so the allowlist merge dropped it
 *   2. an `anthropic-compatible-*` upstream has no static beta set, so `buildHeaders`
 *      skipped the merge entirely and forwarded no client beta at all
 */

import { describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  FORWARDABLE_CLIENT_BETAS,
  mergeClientAnthropicBeta,
} from "../../open-sse/config/anthropicHeaders.ts";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";

const AUTO_MODE_BETA = "dangerous-tool-use-2026-09-03";
const CLAUDE_CODE_BETA_HEADER = [
  "claude-code-20250219",
  "interleaved-thinking-2025-05-14",
  "context-management-2025-06-27",
  "effort-2025-11-24",
  AUTO_MODE_BETA,
].join(",");

const THIRD_PARTY_CREDS = {
  apiKey: "k-third-party",
  providerSpecificData: { baseUrl: "https://gateway.example/v1" },
} as Record<string, unknown>;

describe("mergeClientAnthropicBeta / auto mode classifier beta", () => {
  test("mergeClientAnthropicBeta_ClientNegotiatedAutoModeBeta_IsForwarded", () => {
    const merged = mergeClientAnthropicBeta("claude-code-20250219", CLAUDE_CODE_BETA_HEADER);

    assert.ok(
      merged.split(",").includes(AUTO_MODE_BETA),
      `${AUTO_MODE_BETA} must reach the upstream alongside the safeguards body field`
    );
  });

  test("mergeClientAnthropicBeta_AutoModeBeta_IsOnTheForwardableAllowlist", () => {
    assert.ok(FORWARDABLE_CLIENT_BETAS.includes(AUTO_MODE_BETA));
  });

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
