// Port of decolua/9router#779: GitHub Copilot Agent Mode & Antigravity "Invalid Argument" parity.
//
// Upstream symptom: VS Code GitHub Copilot Chat (in Agent mode) requests
// `maxOutputTokens` values well above what the Antigravity Cloud Code backend
// will accept — the backend rejects the call with HTTP 400 "Invalid Argument"
// even though the request envelope is otherwise valid. The same trigger is
// repeatedly observed in upstream issue reports and in OmniRoute connection
// cooldowns spiking on Copilot traffic.
//
// Fix: hard-cap `generationConfig.maxOutputTokens` to MAX_ANTIGRAVITY_OUTPUT_TOKENS
// (16384) so any oversized client request is silently shrunk to a value the
// upstream accepts. Smaller values are left untouched, and the cap applies
// independently of the thinkingBudget bump logic that already lives in
// `applyAntigravityGenerationDefaults`.

import test from "node:test";
import assert from "node:assert/strict";

import {
  MAX_ANTIGRAVITY_OUTPUT_TOKENS,
  __test_applyAntigravityGenerationDefaults as applyAntigravityGenerationDefaults,
} from "../../open-sse/executors/antigravity.ts";

test("MAX_ANTIGRAVITY_OUTPUT_TOKENS is fixed at 16384 (upstream-accepted ceiling)", () => {
  assert.equal(MAX_ANTIGRAVITY_OUTPUT_TOKENS, 16384);
});

test("Copilot-style oversized maxOutputTokens is clamped to 16384 to avoid Antigravity 400 'Invalid Argument'", () => {
  // Reproduces the upstream-rejected envelope: VS Code GitHub Copilot Chat in
  // Agent mode commonly requests 32K–65K output tokens.
  const request: Record<string, unknown> = {
    generationConfig: {
      maxOutputTokens: 65536,
    },
  };

  applyAntigravityGenerationDefaults(request);

  const gc = request.generationConfig as Record<string, unknown>;
  assert.equal(gc.maxOutputTokens, MAX_ANTIGRAVITY_OUTPUT_TOKENS);
});

test("maxOutputTokens at or below the cap is left untouched", () => {
  const request: Record<string, unknown> = {
    generationConfig: {
      maxOutputTokens: 8192,
    },
  };

  applyAntigravityGenerationDefaults(request);

  const gc = request.generationConfig as Record<string, unknown>;
  assert.equal(gc.maxOutputTokens, 8192);
});

test("maxOutputTokens exactly at the cap is left untouched (boundary)", () => {
  const request: Record<string, unknown> = {
    generationConfig: {
      maxOutputTokens: MAX_ANTIGRAVITY_OUTPUT_TOKENS,
    },
  };

  applyAntigravityGenerationDefaults(request);

  const gc = request.generationConfig as Record<string, unknown>;
  assert.equal(gc.maxOutputTokens, MAX_ANTIGRAVITY_OUTPUT_TOKENS);
});

test("Cap is applied even when no generationConfig is provided initially", () => {
  // The defaults helper synthesises generationConfig — the cap must not crash
  // and must leave a well-formed object behind.
  const request: Record<string, unknown> = {};
  applyAntigravityGenerationDefaults(request);

  const gc = request.generationConfig as Record<string, unknown>;
  assert.equal(typeof gc, "object");
  // No maxOutputTokens was requested — the cap must not invent one.
  assert.equal(gc.maxOutputTokens, undefined);
});

test("Cap interacts safely with thinkingBudget bump: bump still wins when budget exceeds tokens, then the cap still clamps the bumped value", () => {
  // thinkingBudget bumps maxOutputTokens to floor(budget)+1 when it exceeds
  // the requested ceiling; if the bump itself overshoots the AG cap, the cap
  // must still apply.
  const request: Record<string, unknown> = {
    generationConfig: {
      maxOutputTokens: 1000,
      thinkingConfig: { thinkingBudget: 20000 },
    },
  };

  applyAntigravityGenerationDefaults(request);

  const gc = request.generationConfig as Record<string, unknown>;
  assert.equal(gc.maxOutputTokens, MAX_ANTIGRAVITY_OUTPUT_TOKENS);
});
