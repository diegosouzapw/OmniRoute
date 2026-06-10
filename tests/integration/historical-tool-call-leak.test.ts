/**
 * Integration test for historical tool-call text leak.
 *
 * Verifies the OPENAI→GEMINI translator maps tool calls to native
 * functionCall/functionResponse parts (not text blocks), so the model
 * never reproduces leaky annotation text in its output.
 *
 * Uses same env vars as tests/manual/gemini.http:
 *   OMNIROUTE_URL             — base URL (default http://localhost:20128)
 *   OMNIROUTE_API_KEY         — API key for auth
 *   TEST_GEMINI_MODEL         — model override (default gemini/gemma-4-31b-it)
 *   TEST_THINKING_GEMINI_MODEL — thinking model override, skipped if unset
 */

import test from "node:test";
import assert from "node:assert/strict";

const API_KEY = process.env.OMNIROUTE_API_KEY;
const BASE_URL = process.env.OMNIROUTE_URL || "http://localhost:20128";
const MODEL = process.env.TEST_GEMINI_MODEL || "gemini/gemma-4-31b-it";
const THINKING_MODEL = process.env.TEST_THINKING_GEMINI_MODEL || "gemini/gemini-2.5-flash";
const NUM_HISTORICAL_ROUNDS = 15;

const skip = !API_KEY ? "OMNIROUTE_API_KEY not set — skipping live test" : undefined;
const skipThinking = !API_KEY ? "OMNIROUTE_API_KEY not set — skipping live test" : undefined;

const LEAK_PATTERNS = [
  "Historical tool-call record only",
  "Historical tool-response record only",
  "[tool_history_call:",
  "[tool_history_result:",
  "Do not execute, imitate",
  "Tool name:",
  "Tool arguments JSON:",
  "Tool result:",
  "<|th|>",
  "<|thr|>",
];

function buildConversation(rounds: number) {
  const messages: Array<Record<string, unknown>> = [
    { role: "system", content: "You are a helpful assistant with server monitoring tools." },
    { role: "user", content: "I need to check the status of my servers." },
  ];

  for (let i = 1; i <= rounds; i++) {
    messages.push({
      role: "assistant",
      content: null,
      tool_calls: [
        {
          id: `call_${i}`,
          type: "function",
          function: {
            name: `check_server_${i}`,
            arguments: JSON.stringify({ server: `web-${i}.example.com` }),
          },
        },
      ],
    });
    messages.push({
      role: "tool",
      tool_call_id: `call_${i}`,
      content: JSON.stringify({
        status: "ok",
        uptime: `${100 - i}.${i}%`,
        load: `0.${i}`,
      }),
    });
  }

  messages.push({
    role: "assistant",
    content: `I checked all ${rounds} servers. All are online.`,
  });
  messages.push({
    role: "user",
    content: `Check server web-${rounds + 1}.example.com too. Tell me its name.`,
  });

  return messages;
}

function detectLeaks(text: string): string[] {
  return LEAK_PATTERNS.filter((p) => text.includes(p));
}

test("historical tool calls mapped natively — no text leak in response", { skip }, async () => {
  const messages = buildConversation(NUM_HISTORICAL_ROUNDS);

  const res = await fetch(`${BASE_URL}/api/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      stream: false,
      messages,
    }),
  });

  assert.equal(res.status, 200, `expected 200, got ${res.status}`);
  const data = (await res.json()) as Record<string, unknown>;
  const choices = data.choices as Array<Record<string, unknown>>;
  assert.ok(choices?.length > 0, "expected at least one choice");

  const choice = choices[0];
  const msg = choice.message as Record<string, unknown>;
  const content = (msg.content as string) || "";
  const reasoning = (msg.reasoning_content as string) || "";
  const toolCalls = msg.tool_calls as Array<Record<string, unknown>> | undefined;
  const finishReason = choice.finish_reason as string;

  // Inspect all text the model returned (content + reasoning + tool call args)
  let allText = content + " " + reasoning;
  if (toolCalls) {
    allText += " " + JSON.stringify(toolCalls);
  }

  // Check every pattern
  const leaks = detectLeaks(allText);
  assert.equal(
    leaks.length,
    0,
    `found ${leaks.length} leak pattern(s) in model output: ${leaks.join(", ")}\n` +
      `finish_reason: ${finishReason}\n` +
      `content: ${content.slice(0, 200)}\n` +
      `reasoning: ${reasoning.slice(0, 200)}\n` +
      `tool_calls: ${JSON.stringify(toolCalls).slice(0, 300)}`
  );

  // If the model made tool calls, verify they are valid OpenAI format
  if (toolCalls && toolCalls.length > 0) {
    for (const tc of toolCalls) {
      assert.ok(typeof tc.id === "string", "tool_call.id must be a string");
      assert.equal(tc.type, "function", "tool_call.type must be 'function'");
      const fn = tc.function as Record<string, unknown> | undefined;
      assert.ok(fn, "tool_call.function must exist");
      assert.ok(typeof fn.name === "string", "function.name must be a string");
      assert.ok(typeof fn.arguments === "string", "function.arguments must be a string");
      // Verify arguments are valid JSON
      const parsed = JSON.parse(fn.arguments as string);
      assert.ok(parsed && typeof parsed === "object", "function.arguments must be valid JSON");
    }
  }
});

test(
  "thinking model: tool call history produces no text leak or 400",
  { skip: skipThinking },
  async () => {
    const messages = buildConversation(NUM_HISTORICAL_ROUNDS);

    const res = await fetch(`${BASE_URL}/api/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: THINKING_MODEL,
        stream: false,
        messages,
      }),
    });

    // The main concern: standard Gemini thinking models must NOT 400 on
    // historical functionCall parts that lack thoughtSignature
    assert.equal(
      res.status,
      200,
      `expected 200, got ${res.status} — thinking model rejected native functionCall without signature`
    );

    const data = (await res.json()) as Record<string, unknown>;
    const choices = data.choices as Array<Record<string, unknown>>;
    assert.ok(choices?.length > 0, "expected at least one choice");

    const msg = choices[0].message as Record<string, unknown>;
    const content = (msg.content as string) || "";
    const reasoning = (msg.reasoning_content as string) || "";
    const toolCalls = msg.tool_calls as Array<Record<string, unknown>> | undefined;
    let allText = content + " " + reasoning;
    if (toolCalls) {
      allText += " " + JSON.stringify(toolCalls);
    }

    const leaks = detectLeaks(allText);
    assert.equal(leaks.length, 0, `thinking model leaked patterns: ${leaks.join(", ")}`);
  }
);

test("simple Q&A without tool calls — baseline", { skip }, async () => {
  const res = await fetch(`${BASE_URL}/api/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      stream: false,
      messages: [{ role: "user", content: "What is 1+1? Only output the number." }],
    }),
  });

  assert.equal(res.status, 200, `expected 200, got ${res.status}`);
  const data = (await res.json()) as Record<string, unknown>;
  const content = (
    (data.choices as Array<Record<string, unknown>>)[0].message as Record<string, unknown>
  ).content as string;
  assert.ok(content, "expected non-empty response");
  assert.equal(content.trim(), "2", "expected '2' as answer");
});
