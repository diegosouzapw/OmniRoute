/**
 * TDD regression: `anthropic` / `claude` providers drop the client-negotiated
 * `thinking-binding-controls-2026-08-01` beta, so any request carrying
 * `thinking.block_binding` (Fable 5.1 `prefixMismatchBehavior: "drop_block"`,
 * sent automatically by @ai-sdk/anthropic) is rejected upstream with
 * `thinking.adaptive.block_binding: Extra inputs are not permitted` — even when
 * the client negotiated the beta correctly. Same class covers
 * `thinking-display-updates-2026-08-18` (required for `thinking.display:
 * "updates"` on Fable 5.1).
 *
 * Root cause: FORWARDABLE_CLIENT_BETAS allowlist in
 * open-sse/config/anthropicHeaders.ts did not include either beta, so
 * mergeClientAnthropicBeta() stripped them on both the API-key path
 * (DefaultExecutor.buildHeaders) and the OAuth path (BaseExecutor).
 *
 * Fix: add both flags to FORWARDABLE_CLIENT_BETAS (forwarding only when the
 * client explicitly requests them).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { ANTHROPIC_BETA_API_KEY, mergeClientAnthropicBeta, FORWARDABLE_CLIENT_BETAS } =
  await import("../../open-sse/config/anthropicHeaders.ts");

const BINDING_CONTROLS = "thinking-binding-controls-2026-08-01";
const DISPLAY_UPDATES = "thinking-display-updates-2026-08-18";

// ── allowlist membership ────────────────────────────────────────────────────

test("FORWARDABLE_CLIENT_BETAS must include thinking-binding-controls beta", () => {
  assert.ok(FORWARDABLE_CLIENT_BETAS.includes(BINDING_CONTROLS));
});

test("FORWARDABLE_CLIENT_BETAS must include thinking-display-updates beta", () => {
  assert.ok(FORWARDABLE_CLIENT_BETAS.includes(DISPLAY_UPDATES));
});

// ── client-negotiated beta forwarding ───────────────────────────────────────

test("mergeClientAnthropicBeta must forward client-negotiated thinking-binding-controls beta", () => {
  const out = mergeClientAnthropicBeta(
    ANTHROPIC_BETA_API_KEY,
    `claude-code-20250219,${BINDING_CONTROLS}`
  );
  const tokens = out.split(",").map((s) => s.trim());
  assert.ok(tokens.includes(BINDING_CONTROLS), `client beta dropped: ${out}`);
});

test("mergeClientAnthropicBeta must forward client-negotiated thinking-display-updates beta", () => {
  const out = mergeClientAnthropicBeta(
    ANTHROPIC_BETA_API_KEY,
    `claude-code-20250219,${DISPLAY_UPDATES}`
  );
  const tokens = out.split(",").map((s) => s.trim());
  assert.ok(tokens.includes(DISPLAY_UPDATES), `client beta dropped: ${out}`);
});

test("mergeClientAnthropicBeta forwards both betas together without duplication", () => {
  const out = mergeClientAnthropicBeta(
    `${ANTHROPIC_BETA_API_KEY},${BINDING_CONTROLS}`,
    `claude-code-20250219,${BINDING_CONTROLS},${DISPLAY_UPDATES}`
  );
  const tokens = out.split(",").map((s) => s.trim());
  assert.ok(tokens.includes(BINDING_CONTROLS), `binding-controls missing: ${out}`);
  assert.ok(tokens.includes(DISPLAY_UPDATES), `display-updates missing: ${out}`);
  assert.equal(
    tokens.filter((t) => t.toLowerCase() === BINDING_CONTROLS).length,
    1,
    `binding-controls duplicated: ${out}`
  );
});

// ── guard: allowlist still closed ───────────────────────────────────────────

test("mergeClientAnthropicBeta still ignores non-allowlisted client betas", () => {
  const out = mergeClientAnthropicBeta(
    ANTHROPIC_BETA_API_KEY,
    "some-random-future-beta-2099-01-01"
  );
  assert.ok(!out.includes("some-random-future-beta"), `unknown beta leaked: ${out}`);
});
