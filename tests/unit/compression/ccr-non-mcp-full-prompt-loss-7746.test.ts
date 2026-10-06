// Regression test for issue #7746.
//
// The CCR ("Content-Compression-Retrieve") engine can replace an ENTIRE
// single-message user prompt with nothing but a bare
// `[CCR retrieve hash=... chars=N]` marker. The MCP tool that could expand
// that marker (`omniroute_ccr_retrieve`) is only ever exposed through
// OmniRoute's own MCP server — never injected into the `tools` array of a
// plain /v1/chat/completions OpenAI-compatible request. So for non-MCP
// clients (OpenCode, Claude Code in "openai-compatible" mode, or any generic
// proxy client), once a large first-turn prompt is compressed, the original
// text becomes permanently unreachable from the model's point of view.
//
// Run: node --import tsx/esm --test tests/unit/compression/ccr-non-mcp-full-prompt-loss-7746.test.ts
import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import {
  ccrEngine,
  getCcrStoreStats,
  resetCcrStore,
  retrieveBlock,
} from "../../../open-sse/services/compression/engines/ccr/index.ts";

// The reporter's actual Playwright-automation prompt, sent as the sole
// message of a brand-new conversation (no prior turns, no `tools` array) —
// the shape of a plain OpenAI-compatible request from OpenCode/Claude Code.
const REPORTER_PROMPT = `I want you to build a Playwright automation script for AgentRouter with the following requirements.

The script must:
1. Launch a Chromium browser instance using Playwright's async API, with headless mode configurable via an environment variable.
2. Navigate to the AgentRouter dashboard login page and authenticate using credentials pulled from environment variables (never hard-coded).
3. Wait for the dashboard to fully load, verified by checking for a specific selector that only appears once the page is interactive.
4. Navigate to the "Providers" section and enumerate every configured provider row, extracting the provider name, status (enabled/disabled), and current rate-limit usage percentage.
5. For any provider whose rate-limit usage exceeds 90%, click into its detail panel and capture a full-page screenshot, saving it to a timestamped file under a "reports/" directory that the script creates if missing.
6. Aggregate all extracted data into a single JSON report with a top-level "generatedAt" ISO timestamp and a "providers" array of objects.
7. Write the JSON report to disk with pretty-printing (2-space indent) and also log a concise summary table to stdout using console.table.
8. Implement robust error handling: if navigation or a selector wait times out, retry up to 3 times with exponential backoff before failing the whole run with a clear error message and non-zero exit code.
9. Add a cleanup step in a try/finally block that always closes the browser context and browser instance, even if an assertion or navigation step throws.
10. Structure the code into clearly separated functions (login, scrapeProviders, screenshotOverLimit, writeReport) rather than one long monolithic script, and add JSDoc comments explaining each function's parameters and return value.
11. Make the script runnable both as a standalone Node script (via a shebang and direct invocation) and importable as a module for reuse in a larger test suite.
12. Include a small README-style comment block at the top of the file explaining prerequisites (Node version, Playwright install command) and how to run the script with the required environment variables.

Please keep the code idiomatic modern JavaScript/TypeScript, avoid unnecessary external dependencies beyond Playwright itself, and make sure timeouts and selectors are configurable constants at the top of the file rather than magic numbers scattered through the logic. Generate production-quality code that is easy to maintain and extend.`;

function makeOpenCodeStyleRequestBody() {
  return {
    model: "hy-3:free",
    messages: [{ role: "user", content: REPORTER_PROMPT }],
    stream: true,
  };
}

describe("issue #7746 — CCR must not reduce the sole user prompt to a bare, unretrievable marker", () => {
  before(() => {
    resetCcrStore();
  });

  it("prompt fixture is realistically sized (>= default 600-char minChars)", () => {
    assert.ok(
      REPORTER_PROMPT.length >= 600,
      `fixture must be >= 600 chars, got ${REPORTER_PROMPT.length}`
    );
  });

  it("non-MCP caller: CCR skips entirely — the sole user prompt passes through verbatim", () => {
    resetCcrStore();
    const body = makeOpenCodeStyleRequestBody();
    const result = ccrEngine.apply(body as Record<string, unknown>, { stepConfig: {} });

    // #7746 follow-up (forge review outage, 2026-08-22): the preamble guard was
    // not enough — a non-MCP caller received "[CCR retrieve hash=...] markers"
    // it had no tool to resolve (upstream saw 112 of ~3.6K tokens). The engine
    // now refuses to replace content at all when tools[] lacks
    // omniroute_ccr_retrieve: compressed=false, message content untouched.
    assert.equal(
      result.compressed,
      false,
      "CCR must not compress for a caller without the retrieve tool"
    );
    assert.equal(result.stats, null, "no stats when the engine is skipped");
    const messages = result.body.messages as Array<{ role: string; content: string }>;
    assert.equal(messages[0].role, "user", "message role must stay user");
    assert.equal(
      messages[0].content,
      REPORTER_PROMPT,
      "sole user prompt must pass through verbatim"
    );
    assert.equal(messages.length, 1, "no protocol instruction may be injected for non-MCP callers");
    // Guard regression check: if callerSupportsCcrRetrieve ever returned true
    // here, the store would silently accumulate blocks no non-MCP caller can
    // retrieve. After a skip the store must hold nothing for this principal.
    assert.equal(getCcrStoreStats().entries, 0, "store must stay empty after a non-MCP skip");
  });

  // tools:[] and unrelated tools are distinct caller shapes that must all be
  // treated as non-MCP: an empty array and a foreign tool list both mean the
  // retrieve tool is unreachable.
  for (const label of ["empty tools array", "unrelated tools"] as const) {
    it(`non-MCP caller with ${label}: CCR skips entirely`, () => {
      resetCcrStore();
      const tools =
        label === "empty tools array"
          ? []
          : [
              { type: "function", function: { name: "get_weather" } },
              { type: "function", function: { name: "web_search" } },
            ];
      const body = { ...makeOpenCodeStyleRequestBody(), tools };
      const result = ccrEngine.apply(body as Record<string, unknown>, { stepConfig: {} });

      assert.equal(result.compressed, false, `${label} must not compress`);
      const messages = result.body.messages as Array<{ role: string; content: string }>;
      assert.equal(messages[0].content, REPORTER_PROMPT, "prompt passes through verbatim");
      assert.equal(messages.length, 1, "no protocol instruction injected");
    });
  }

  // A malformed body (tools as a non-array, or entries of unexpected shape)
  // must fail OPEN — no compression, never a throw into the request pipeline.
  for (const malformed of [
    { tools: "not-an-array" },
    { tools: [null, 42, "x"] },
    { tools: [{}, { type: "function" }] },
  ]) {
    it(`malformed tools payload (${JSON.stringify(malformed.tools)}): engine skips without throwing`, () => {
      resetCcrStore();
      const body = { ...makeOpenCodeStyleRequestBody(), ...malformed };
      const result = ccrEngine.apply(body as Record<string, unknown>, { stepConfig: {} });

      assert.equal(result.compressed, false, "malformed tools must fail open (skip)");
      const messages = result.body.messages as Array<{ role: string; content: string }>;
      assert.equal(messages[0].content, REPORTER_PROMPT, "prompt passes through verbatim");
      assert.equal(
        getCcrStoreStats().entries,
        0,
        "store must stay empty after a malformed-tools skip"
      );
    });
  }

  it("MCP-capable caller (tools[] advertises omniroute_ccr_retrieve): replacement still runs and stays retrievable", () => {
    resetCcrStore();
    const body = {
      ...makeOpenCodeStyleRequestBody(),
      tools: [{ type: "function", function: { name: "omniroute_ccr_retrieve" } }],
    };
    const result = ccrEngine.apply(body as Record<string, unknown>, { stepConfig: {} });

    assert.equal(result.compressed, true, "CCR still compresses for MCP-capable callers");
    const messages = result.body.messages as Array<{ role: string; content: string }>;
    // The protocol instruction is injected as a leading system message, so the
    // compressed conversation is exactly: [instruction, original user message].
    assert.equal(messages.length, 2, "instruction + user message");
    assert.equal(messages[0].role, "system", "instruction is a leading system message");
    assert.ok(
      typeof messages[0].content === "string" && messages[0].content.length > 0,
      "instruction content must be non-empty"
    );
    assert.ok(
      messages[0].content.includes("omniroute_ccr_retrieve"),
      "instruction must teach the retrieve tool contract"
    );
    const compressedContent = messages[1].content;
    const match = compressedContent.match(/\[CCR retrieve hash=([0-9a-f]{24}) chars=\d+\]/);
    assert.ok(match, "compressed content must contain a resolvable CCR marker");
    assert.equal(
      retrieveBlock(match![1]),
      REPORTER_PROMPT,
      "original prompt must be stored verbatim and retrievable"
    );
  });
});
