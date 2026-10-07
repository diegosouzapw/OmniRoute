/**
 * Per-message effort directive — the beta must travel with the body field
 * (#14746, duplicate #14747).
 *
 * Claude Code switches effort mid-conversation by sending an effort-only system
 * message (`role: "system"`, `content: []`, `output_config: { effort }`) next to
 * the top-level `output_config`. Anthropic gates that message-level field behind
 * the beta header `mid-conversation-output-config-2026-07-01`; without it the
 * whole request is rejected with the exact error from the issue:
 *
 *   400 messages.2.output_config: Extra inputs are not permitted
 *
 * The body field survives the claude→claude passthrough but the client's
 * `anthropic-beta` value did not: it was missing from FORWARDABLE_CLIENT_BETAS,
 * so every allowlist merge dropped it — same failure shape as the `safeguards`
 * pair documented in passthroughHelpers.ts and the tool-search hole (#3974).
 * Opus 5 explicitly supports per-message effort (platform docs: "Claude Opus 5
 * also supports changing effort mid-conversation with a per-message
 * output_config"), and the mid-conversation-system path
 * (`shouldUseMidConversationSystem`) keeps the directive on `messages[]` instead
 * of folding it away — which is why only Opus-shaped requests hit the 400.
 *
 * Holes covered here:
 *   1. FORWARDABLE_CLIENT_BETAS dropped the client-negotiated beta → the
 *      allowlist merge now forwards it (buildHeaders + execute paths), for
 *      both Anthropic's documented token and Claude Code's own wire token
 *      `per-turn-control-2026-07-01` (captured from cc@2.1.282:
 *      C("per_message_effort","per-turn-control-2026-07-01"))
 *   2. clients with no `anthropic-beta` header of their own got no beta at all →
 *      selectBetaFlags now derives it from the body shape (a message carries
 *      output_config), same rule as mid-conversation-system-2026-04-07
 *   3. bodies without a message-level output_config must NOT gain the beta
 *      (fingerprint — "sending the full set on every shape is itself a
 *      fingerprint")
 */

import { describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  FORWARDABLE_CLIENT_BETAS,
  mergeClientAnthropicBeta,
} from "../../open-sse/config/anthropicHeaders.ts";
import { selectBetaFlags } from "../../open-sse/executors/claudeIdentity.ts";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";

const PER_MESSAGE_EFFORT_BETA = "mid-conversation-output-config-2026-07-01";
// Claude Code's own wire token for the same feature — captured from the shipped
// @anthropic-ai/claude-code@2.1.282 binary:
//   C("per_message_effort","per-turn-control-2026-07-01")
// Anthropic documents the canonical token above; AWS Bedrock's
// adaptive-thinking guide additionally lists `mid-conversation-effort-2026-08-01`
// and `per-message-effort-2026-07-01` as aliases — those two are trimmed from
// the allowlist (no known client sends them; OmniRoute's Bedrock executor does
// not negotiate anthropic_beta). Only tokens with a hard source stay.
const CLIENT_WIRE_EFFORT_BETA = "per-turn-control-2026-07-01";
const PER_TURN_EFFORT_BETAS = [PER_MESSAGE_EFFORT_BETA, CLIENT_WIRE_EFFORT_BETA];
const TRIMMED_EFFORT_ALIASES = [
  "mid-conversation-effort-2026-08-01",
  "per-message-effort-2026-07-01",
];

// Shape of the anthropic-beta header a real Claude Code 2.1.282 session sends
// on a per-message-effort request (Claude Code flags + its wire token).
const CC_BETA_HEADER = [
  "claude-code-20250219",
  "oauth-2025-04-20",
  "effort-2025-11-24",
  CLIENT_WIRE_EFFORT_BETA,
].join(",");

/** Opus agent request carrying the effort-only directive at messages[2] (the captured #14746 shape). */
function directiveBody(): Record<string, unknown> {
  return {
    model: "claude-opus-5",
    system: "You are a coding agent.",
    tools: [{ name: "Bash", description: "x", input_schema: { type: "object" } }],
    output_config: { effort: "high" },
    messages: [
      { role: "user", content: "hello" },
      { role: "assistant", content: "hi" },
      { role: "system", content: [], output_config: { effort: "high" } },
      { role: "user", content: "next" },
    ],
  };
}

/** Same agent request without any message-level output_config. */
function plainBody(): Record<string, unknown> {
  return {
    model: "claude-opus-5",
    system: "You are a coding agent.",
    tools: [{ name: "Bash", description: "x", input_schema: { type: "object" } }],
    messages: [{ role: "user", content: "hello" }],
  };
}

function tokens(header: string): string[] {
  return header
    .split(",")
    .map((token) => token.trim())
    .filter(Boolean);
}

describe("#14746 FORWARDABLE_CLIENT_BETAS carries the per-message effort betas", () => {
  for (const beta of PER_TURN_EFFORT_BETAS) {
    test(`FORWARDABLE_CLIENT_BETAS includes ${beta}`, () => {
      assert.ok(
        FORWARDABLE_CLIENT_BETAS.includes(beta),
        `${beta} must be allowlisted so the client's negotiation survives the merge`
      );
    });

    test(`mergeClientAnthropicBeta forwards client-negotiated ${beta}`, () => {
      const clientHeader = ["claude-code-20250219", "effort-2025-11-24", beta].join(",");
      const merged = tokens(
        mergeClientAnthropicBeta("claude-code-20250219,oauth-2025-04-20", clientHeader)
      );
      assert.ok(
        merged.includes(beta),
        `${beta} must reach the upstream alongside the message-level output_config body field`
      );
    });
  }

  test("AWS-only aliases are trimmed — every allowlisted token has a hard source", () => {
    for (const alias of TRIMMED_EFFORT_ALIASES) {
      assert.ok(
        !FORWARDABLE_CLIENT_BETAS.includes(alias),
        `${alias} must stay trimmed (AWS-listed alias, no client sends it through OmniRoute)`
      );
    }
  });

  test("mergeClientAnthropicBeta does not duplicate the beta already in the base set", () => {
    const merged = tokens(
      mergeClientAnthropicBeta(
        `claude-code-20250219,${PER_MESSAGE_EFFORT_BETA}`,
        `${CC_BETA_HEADER},${PER_MESSAGE_EFFORT_BETA}`
      )
    );
    assert.equal(
      merged.filter((token) => token === PER_MESSAGE_EFFORT_BETA).length,
      1,
      "beta must be sent once"
    );
  });

  test("mergeClientAnthropicBeta still drops unknown client betas", () => {
    const merged = mergeClientAnthropicBeta(
      "claude-code-20250219",
      `${CC_BETA_HEADER},totally-made-up-2030-01-01`
    );
    assert.ok(!merged.includes("totally-made-up-2030-01-01"));
  });
});

describe("#14746 selectBetaFlags derives the beta from the body shape", () => {
  test("message-level output_config present → beta emitted (opaque client, no header)", () => {
    const flags = tokens(selectBetaFlags(directiveBody()));
    assert.ok(
      flags.includes(PER_MESSAGE_EFFORT_BETA),
      "a body carrying output_config on a message must ship with its gating beta"
    );
  });

  test("no message-level output_config → beta NOT invented (fingerprint guard)", () => {
    const flags = tokens(selectBetaFlags(plainBody()));
    assert.ok(
      !flags.includes(PER_MESSAGE_EFFORT_BETA),
      "the beta must only travel when the body actually needs it"
    );
  });

  test("native claude pipeline: directive body + Claude Code header → canonical deduped, wire token forwarded", () => {
    const outbound = tokens(
      mergeClientAnthropicBeta(
        selectBetaFlags(directiveBody(), null, CC_BETA_HEADER),
        CC_BETA_HEADER
      )
    );
    assert.equal(
      outbound.filter((token) => token === PER_MESSAGE_EFFORT_BETA).length,
      1,
      "shape-derived canonical beta must dedupe to a single token"
    );
    assert.ok(
      outbound.includes(CLIENT_WIRE_EFFORT_BETA),
      "Claude Code's own per-turn-control token must survive the merge alongside it"
    );
  });

  test("native claude pipeline: directive body without any client header → beta still travels", () => {
    const outbound = tokens(mergeClientAnthropicBeta(selectBetaFlags(directiveBody()), null));
    assert.ok(outbound.includes(PER_MESSAGE_EFFORT_BETA));
  });
});

describe("#14746 DefaultExecutor.buildHeaders / claude provider", () => {
  test("client-negotiated per-message effort beta survives buildHeaders", () => {
    const executor = new DefaultExecutor("claude");

    const headers = executor.buildHeaders({ accessToken: "sk-ant-oat-x" }, true, {
      "anthropic-beta": CC_BETA_HEADER,
    }) as Record<string, string>;

    const key = Object.keys(headers).find((name) => name.toLowerCase() === "anthropic-beta");
    const outbound = key ? tokens(headers[key]) : [];
    assert.ok(
      outbound.includes(CLIENT_WIRE_EFFORT_BETA),
      `Claude Code's wire token missing from outbound beta: ${outbound.join(",")}`
    );
  });

  test("buildHeaders without the client beta does not invent it", () => {
    const executor = new DefaultExecutor("claude");

    const headers = executor.buildHeaders({ accessToken: "sk-ant-oat-x" }, true, {
      "anthropic-beta": "claude-code-20250219,oauth-2025-04-20",
    }) as Record<string, string>;

    const key = Object.keys(headers).find((name) => name.toLowerCase() === "anthropic-beta");
    const outbound = key ? tokens(headers[key]) : [];
    assert.ok(!outbound.includes(PER_MESSAGE_EFFORT_BETA));
  });
});
