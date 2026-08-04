/**
 * tests/integration/combo-failover-e2e.test.ts
 *
 * End-to-end combo routing scenarios that the existing suite left uncovered:
 *   1. A 3-target priority chain that walks past TWO failing targets
 *      (500 then 503) to succeed on the third — the existing suite only
 *      exercised a 2-target (single-hop) failover.
 *   2. A `strategy:"auto"` combo dispatched end-to-end (request → scored
 *      selection → real upstream fetch → 200), closing the gap where auto was
 *      only exercised at the UI layer.
 *   3. A per-target timeout (targetTimeoutMs) on the first target failing over
 *      to a healthy second target — timeout-driven failover had zero coverage.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { createChatPipelineHarness } from "./_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("combo-failover-e2e");
const {
  BaseExecutor,
  buildClaudeResponse,
  buildGeminiResponse,
  buildOpenAIResponse,
  buildRequest,
  combosDb,
  handleChat,
  resetStorage,
  seedConnection,
} = harness;

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
});

test.afterEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = harness.originalRetryDelayMs;
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

function body(model: string, content = `Route ${model}`) {
  return { model, stream: false, messages: [{ role: "user", content }] };
}

test("priority combo walks a 3-target chain: 500 → 503 → success", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-3way" });
  await seedConnection("claude", { apiKey: "sk-claude-3way" });
  await seedConnection("gemini", { apiKey: "sk-gemini-3way" });
  await combosDb.createCombo({
    name: "router-3way",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    models: [
      "openai/gpt-4o-mini",
      "claude/claude-3-5-sonnet-20241022",
      "gemini/gemini-2.5-flash",
    ],
  });

  const attempts: string[] = [];
  globalThis.fetch = async (url) => {
    const target = String(url);
    if (target.includes("/chat/completions")) {
      attempts.push("openai");
      return new Response(JSON.stringify({ error: { message: "primary down" } }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (target.includes("?beta=true")) {
      attempts.push("claude");
      return new Response(JSON.stringify({ error: { message: "secondary overloaded" } }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      });
    }
    attempts.push("gemini");
    return buildGeminiResponse("Third target answered");
  };

  const res = await handleChat(buildRequest({ body: body("router-3way") }));
  const json = (await res.json()) as {
    choices: Array<{ message: { content: string } }>;
  };

  assert.equal(res.status, 200, "request must succeed on the 3rd target");
  assert.deepEqual(attempts, ["openai", "claude", "gemini"], "all three targets attempted in order");
  assert.equal(json.choices[0].message.content, "Third target answered");
});

test("priority combo fails over when the first target exceeds its per-target timeout", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-timeout" });
  await seedConnection("claude", { apiKey: "sk-claude-timeout" });
  await combosDb.createCombo({
    name: "router-timeout",
    strategy: "priority",
    // 80ms per-target ceiling; the first target hangs past it and is aborted.
    config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0, targetTimeoutMs: 80 },
    models: ["openai/gpt-4o-mini", "claude/claude-3-5-sonnet-20241022"],
  });

  const attempts: string[] = [];
  globalThis.fetch = async (url, init: RequestInit = {}) => {
    const target = String(url);
    if (target.includes("/chat/completions")) {
      attempts.push("openai");
      // Hang until the combo's per-target timeout aborts us via the signal.
      return await new Promise<Response>((_resolve, reject) => {
        const signal = init.signal;
        if (signal) {
          signal.addEventListener("abort", () =>
            reject(Object.assign(new Error("aborted by combo timeout"), { name: "AbortError" }))
          );
        }
      });
    }
    attempts.push("claude");
    return buildClaudeResponse("Recovered after timeout");
  };

  const res = await handleChat(buildRequest({ body: body("router-timeout") }));
  const json = (await res.json()) as {
    choices: Array<{ message: { content: string } }>;
  };

  assert.equal(res.status, 200, "must fail over to the second target after the first times out");
  assert.deepEqual(attempts, ["openai", "claude"]);
  assert.equal(json.choices[0].message.content, "Recovered after timeout");
});

test("auto combo selects and dispatches a scored candidate end-to-end", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-auto" });
  await seedConnection("claude", { apiKey: "sk-claude-auto" });
  await combosDb.createCombo({
    name: "router-auto",
    strategy: "auto",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: ["openai/gpt-4o-mini", "claude/claude-3-5-sonnet-20241022"],
  });

  const seen: string[] = [];
  globalThis.fetch = async (url) => {
    const target = String(url);
    if (target.includes("?beta=true")) {
      seen.push("claude");
      return buildClaudeResponse("Auto chose claude");
    }
    seen.push("openai");
    return buildOpenAIResponse("Auto chose openai");
  };

  const res = await handleChat(buildRequest({ body: body("router-auto") }));
  const json = (await res.json()) as {
    choices: Array<{ message: { content: string } }>;
  };

  assert.equal(res.status, 200, "auto combo must dispatch successfully");
  assert.equal(seen.length, 1, "auto selects exactly one target (no needless fan-out)");
  assert.match(json.choices[0].message.content, /Auto chose (openai|claude)/);
});
