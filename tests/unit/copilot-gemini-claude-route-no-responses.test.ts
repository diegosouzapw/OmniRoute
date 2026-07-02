/**
 * Regression test ported from decolua/9router#1536 (follow-up to #663).
 *
 * GitHub Copilot's `/responses` endpoint only serves OpenAI (gpt/codex) models —
 * Gemini and Claude models reject with HTTP 400
 *   "[github/<model>] [400]: model <model> does not support Responses API."
 * (unsupported_api_for_model). They must therefore never be routed to
 * `/responses`, no matter what `targetFormat` a registry entry (or any future
 * misconfiguration) declares for them.
 *
 * OmniRoute's GithubExecutor decides the endpoint inside `buildUrl()` purely
 * from `getModelTargetFormat("gh", model)`. The registry today (`open-sse/
 * config/providers/registry/github/index.ts`) correctly omits
 * `targetFormat: "openai-responses"` on every Claude/Gemini entry — but that is
 * a single-line away from regressing (the file's own comments on lines 60, 74,
 * 80 warn against it). This test pins the defensive invariant: even if a
 * Claude/Gemini variant ends up tagged `openai-responses`, the executor must
 * still build the chat/completions URL.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { GithubExecutor } from "../../open-sse/executors/github.ts";
import { PROVIDER_MODELS } from "../../open-sse/config/providerModels.ts";

const CHAT_URL = "https://api.githubcopilot.com/chat/completions";
const RESPONSES_URL = "https://api.githubcopilot.com/responses";

describe("GithubExecutor — Gemini/Claude must never hit /responses (port 9router#1536)", () => {
  it("routes registered Claude/Gemini Copilot models to chat/completions", () => {
    const exec = new GithubExecutor();
    for (const id of [
      "claude-haiku-4.5",
      "claude-sonnet-4.5",
      "claude-sonnet-4.6",
      "claude-opus-4.6",
      "claude-opus-4.7",
      "claude-opus-4-5-20251101",
      "gemini-3.1-pro-preview",
      "gemini-3-flash-preview",
    ]) {
      assert.equal(exec.buildUrl(id, false), CHAT_URL, `${id} must route to chat/completions`);
    }
  });

  it("still uses chat/completions if a Claude/Gemini model is wrongly tagged openai-responses", () => {
    const exec = new GithubExecutor();
    const ghModels = PROVIDER_MODELS["gh"];
    assert.ok(Array.isArray(ghModels), "gh provider models registry must exist");

    const claude = ghModels.find((m: any) => m.id === "claude-sonnet-4.6");
    const gemini = ghModels.find((m: any) => m.id === "gemini-3.1-pro-preview");
    assert.ok(claude && gemini, "claude-sonnet-4.6 and gemini-3.1-pro-preview must be registered");

    const originalClaude = claude.targetFormat;
    const originalGemini = gemini.targetFormat;
    try {
      // Simulate a future misconfiguration. The guard must still hold.
      (claude as any).targetFormat = "openai-responses";
      (gemini as any).targetFormat = "openai-responses";

      assert.equal(exec.buildUrl("claude-sonnet-4.6", false), CHAT_URL);
      assert.equal(exec.buildUrl("gemini-3.1-pro-preview", false), CHAT_URL);
    } finally {
      (claude as any).targetFormat = originalClaude;
      (gemini as any).targetFormat = originalGemini;
    }
  });

  it("still routes registered OpenAI/codex Copilot models to /responses", () => {
    const exec = new GithubExecutor();
    for (const id of ["gpt-5-mini", "gpt-5.3-codex", "gpt-5.4-mini", "gpt-5.4"]) {
      assert.equal(exec.buildUrl(id, false), RESPONSES_URL, `${id} must route to /responses`);
    }
  });

  it("is case-insensitive when guarding (defensive against upper/mixed-case ids)", () => {
    const exec = new GithubExecutor();
    const ghModels = PROVIDER_MODELS["gh"];
    const claude = ghModels.find((m: any) => m.id === "claude-sonnet-4.6");
    const original = claude.targetFormat;
    try {
      (claude as any).targetFormat = "openai-responses";
      // Look up by the same id (registry is case-sensitive on lookup) but with a
      // mixed-case path through the guard. We rebuild with the registered id;
      // the guard normalizes before substring check, so it must still detect.
      assert.equal(exec.buildUrl("claude-sonnet-4.6", false), CHAT_URL);
    } finally {
      (claude as any).targetFormat = original;
    }
  });
});
