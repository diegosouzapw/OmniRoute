/**
 * Unit tests — xAI thinking patcher + inbound translators
 *
 * Ported from upstream decolua/9router tests/unit/xai-thinking.test.js
 * and expanded with coverage for claude/gemini/openai-chat/openai-responses translators.
 *
 * Runner: node --import tsx/esm --test tests/unit/xai-translators.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";

const { budgetToEffort, applyThinking } = await import(
  "../../src/lib/providers/xai/thinking.ts"
);
const { chatRequestToXaiResponses, xaiCompletedToChatJson } = await import(
  "../../src/lib/providers/xai/translators/openai-chat.ts"
);
const {
  openaiResponsesRequestToXai,
  xaiCompletedToOpenaiResponses,
  xaiSseEventToOpenaiResponses,
} = await import("../../src/lib/providers/xai/translators/openai-responses.ts");
const { claudeRequestToXaiResponses, xaiCompletedToClaudeJson } = await import(
  "../../src/lib/providers/xai/translators/claude.ts"
);
const { geminiRequestToXaiResponses, xaiCompletedToGeminiJson } = await import(
  "../../src/lib/providers/xai/translators/gemini.ts"
);

// ─── budgetToEffort ──────────────────────────────────────────────────────────

test("budgetToEffort: maps 0 / negative / NaN to undefined", () => {
  assert.equal(budgetToEffort(0), undefined);
  assert.equal(budgetToEffort(-100), undefined);
  assert.equal(budgetToEffort(Number.NaN), undefined);
  assert.equal(budgetToEffort(Number.POSITIVE_INFINITY), undefined);
});

test("budgetToEffort: maps 1–3999 to low", () => {
  assert.equal(budgetToEffort(1), "low");
  assert.equal(budgetToEffort(3999), "low");
});

test("budgetToEffort: maps 4000–15999 to medium", () => {
  assert.equal(budgetToEffort(4000), "medium");
  assert.equal(budgetToEffort(15999), "medium");
});

test("budgetToEffort: maps 16000+ to high", () => {
  assert.equal(budgetToEffort(16000), "high");
  assert.equal(budgetToEffort(64000), "high");
});

// ─── applyThinking ───────────────────────────────────────────────────────────

test("applyThinking: returns clone untouched when nothing matches", () => {
  const req = { model: "grok-4", input: [] };
  const out = applyThinking(req);
  assert.deepStrictEqual(out, req);
  assert.notStrictEqual(out, req); // must be a new object
});

test("applyThinking: honors xAI-native reasoning.effort verbatim", () => {
  const req = { reasoning: { effort: "high" }, foo: 1 };
  const out = applyThinking(req as Parameters<typeof applyThinking>[0]);
  assert.deepStrictEqual(out.reasoning, { effort: "high" });
  assert.equal((out as Record<string, unknown>).foo, 1);
});

test("applyThinking: rewrites OpenAI Chat reasoning_effort into reasoning.effort", () => {
  const req = { reasoning_effort: "medium" };
  const out = applyThinking(req);
  assert.deepStrictEqual(out.reasoning, { effort: "medium" });
  assert.equal(out.reasoning_effort, undefined);
});

test("applyThinking: ignores invalid reasoning_effort values", () => {
  const req = { reasoning_effort: "ultra" };
  const out = applyThinking(req);
  assert.equal(out.reasoning, undefined);
});

test("applyThinking: maps Anthropic thinking enabled with budget_tokens", () => {
  const req = { thinking: { type: "enabled", budget_tokens: 20000 } };
  const out = applyThinking(req);
  assert.deepStrictEqual(out.reasoning, { effort: "high" });
  assert.equal(out.thinking, undefined);
});

test("applyThinking: defaults Anthropic thinking enabled without budget_tokens to medium", () => {
  const req = { thinking: { type: "enabled" } };
  const out = applyThinking(req);
  assert.deepStrictEqual(out.reasoning, { effort: "medium" });
});

test("applyThinking: strips Anthropic thinking type=disabled without setting reasoning", () => {
  const req = { thinking: { type: "disabled" } };
  const out = applyThinking(req);
  assert.equal(out.reasoning, undefined);
  assert.equal(out.thinking, undefined);
});

test("applyThinking: maps Gemini thinkingConfig.thinkingBudget", () => {
  const req = { thinkingConfig: { thinkingBudget: 5000 } };
  const out = applyThinking(req);
  assert.deepStrictEqual(out.reasoning, { effort: "medium" });
  assert.equal(out.thinkingConfig, undefined);
});

test("applyThinking: strips Gemini thinkingConfig with budget=0 without setting reasoning", () => {
  const req = { thinkingConfig: { thinkingBudget: 0 } };
  const out = applyThinking(req);
  assert.equal(out.reasoning, undefined);
  assert.equal(out.thinkingConfig, undefined);
});

test("applyThinking: applies defaultEffort when nothing else is provided", () => {
  const out = applyThinking({}, { defaultEffort: "low" });
  assert.deepStrictEqual(out.reasoning, { effort: "low" });
});

// ─── chatRequestToXaiResponses ────────────────────────────────────────────────

test("chatRequestToXaiResponses: converts system message to instructions", () => {
  const req = {
    model: "grok-4",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Hello" },
    ],
  };
  const out = chatRequestToXaiResponses(req);
  assert.equal(out.instructions, "You are a helpful assistant.");
  assert.equal(out.input.length, 1);
  assert.equal((out.input[0] as Record<string, unknown>).role, "user");
});

test("chatRequestToXaiResponses: converts tool message to function_call_output", () => {
  const req = {
    model: "grok-4",
    messages: [
      { role: "tool", content: "result text", tool_call_id: "call_abc" },
    ],
  };
  const out = chatRequestToXaiResponses(req);
  assert.equal(out.input[0].type, "function_call_output");
  assert.equal(out.input[0].call_id, "call_abc");
  assert.equal(out.input[0].output, "result text");
});

test("chatRequestToXaiResponses: promotes reasoning_effort to reasoning field", () => {
  const req = { model: "grok-4", messages: [], reasoning_effort: "high" };
  const out = chatRequestToXaiResponses(req);
  assert.deepStrictEqual(out.reasoning, { effort: "high" });
});

test("chatRequestToXaiResponses: maps max_tokens to max_output_tokens", () => {
  const req = { model: "grok-4", messages: [], max_tokens: 512 };
  const out = chatRequestToXaiResponses(req);
  assert.equal(out.max_output_tokens, 512);
});

// ─── xaiCompletedToChatJson ──────────────────────────────────────────────────

test("xaiCompletedToChatJson: extracts output_text content into message", () => {
  const completed = {
    id: "resp_1",
    model: "grok-4",
    output: [
      {
        type: "message",
        content: [{ type: "output_text", text: "Hello!" }],
      },
    ],
  };
  const result = xaiCompletedToChatJson(completed) as Record<string, unknown>;
  const choices = result.choices as Array<Record<string, unknown>>;
  assert.equal(choices[0].finish_reason, "stop");
  const message = choices[0].message as Record<string, unknown>;
  assert.equal(message.content, "Hello!");
});

test("xaiCompletedToChatJson: maps function_call to tool_calls with finish_reason=tool_calls", () => {
  const completed = {
    id: "resp_2",
    model: "grok-4",
    output: [
      {
        type: "function_call",
        call_id: "call_1",
        name: "get_weather",
        arguments: '{"location":"London"}',
      },
    ],
  };
  const result = xaiCompletedToChatJson(completed) as Record<string, unknown>;
  const choices = result.choices as Array<Record<string, unknown>>;
  assert.equal(choices[0].finish_reason, "tool_calls");
  const message = choices[0].message as Record<string, unknown>;
  const toolCalls = message.tool_calls as Array<Record<string, unknown>>;
  assert.equal(toolCalls.length, 1);
  assert.equal(toolCalls[0].id, "call_1");
  const fn = toolCalls[0].function as Record<string, unknown>;
  assert.equal(fn.name, "get_weather");
});

// ─── openaiResponsesRequestToXai ─────────────────────────────────────────────

test("openaiResponsesRequestToXai: drops service_tier", () => {
  const req = { model: "grok-4", input: [], service_tier: "default" };
  const out = openaiResponsesRequestToXai(req);
  assert.equal("service_tier" in out, false);
});

test("openaiResponsesRequestToXai: preserves other fields verbatim", () => {
  const req = { model: "grok-4", input: [{ role: "user", content: "hi" }] };
  const out = openaiResponsesRequestToXai(req);
  assert.deepStrictEqual(out.input, req.input);
});

// ─── xaiCompletedToOpenaiResponses ───────────────────────────────────────────

test("xaiCompletedToOpenaiResponses: normalizes object + status fields", () => {
  const completed = { id: "r1", model: "grok-4", output: [] };
  const out = xaiCompletedToOpenaiResponses(completed);
  assert.equal(out.object, "response");
  assert.equal(out.status, "completed");
});

test("xaiCompletedToOpenaiResponses: preserves existing object/status", () => {
  const completed = { id: "r1", object: "custom", status: "in_progress" };
  const out = xaiCompletedToOpenaiResponses(completed);
  assert.equal(out.object, "custom");
  assert.equal(out.status, "in_progress");
});

// ─── xaiSseEventToOpenaiResponses ────────────────────────────────────────────

test("xaiSseEventToOpenaiResponses: drops annotation.added event", () => {
  const ev = {
    event: "response.output_text.annotation.added",
    data: '{"text":"foo"}',
  };
  const result = xaiSseEventToOpenaiResponses(ev);
  assert.equal(result, null);
});

test("xaiSseEventToOpenaiResponses: passes through other events unchanged", () => {
  const ev = { event: "response.output_text.delta", data: '{"delta":"hi"}' };
  const result = xaiSseEventToOpenaiResponses(ev);
  assert.deepStrictEqual(result, ev);
});

// ─── claudeRequestToXaiResponses ─────────────────────────────────────────────

test("claudeRequestToXaiResponses: translates system string to instructions", () => {
  const req = {
    model: "grok-4",
    system: "Be helpful",
    messages: [{ role: "user" as const, content: "Hi" }],
  };
  const out = claudeRequestToXaiResponses(req);
  assert.equal(out.instructions, "Be helpful");
});

test("claudeRequestToXaiResponses: converts text content to input_text block", () => {
  const req = {
    model: "grok-4",
    messages: [{ role: "user" as const, content: "Hello" }],
  };
  const out = claudeRequestToXaiResponses(req);
  assert.equal(out.input.length, 1);
  const inputItem = out.input[0] as Record<string, unknown>;
  const content = inputItem.content as Array<Record<string, unknown>>;
  assert.equal(content[0].type, "input_text");
  assert.equal(content[0].text, "Hello");
});

test("claudeRequestToXaiResponses: extracts tool_result to function_call_output", () => {
  const req = {
    model: "grok-4",
    messages: [
      {
        role: "user" as const,
        content: [
          {
            type: "tool_result",
            tool_use_id: "tu_123",
            content: "result data",
          },
        ],
      },
    ],
  };
  const out = claudeRequestToXaiResponses(req);
  const item = out.input[0] as Record<string, unknown>;
  assert.equal(item.type, "function_call_output");
  assert.equal(item.call_id, "tu_123");
  assert.equal(item.output, "result data");
});

test("claudeRequestToXaiResponses: translates tools from Anthropic to xAI function shape", () => {
  const req = {
    model: "grok-4",
    messages: [],
    tools: [
      {
        name: "search",
        description: "Search the web",
        input_schema: { type: "object", properties: {} },
      },
    ],
  };
  const out = claudeRequestToXaiResponses(req);
  assert.ok(Array.isArray(out.tools));
  const tool = (out.tools as Array<Record<string, unknown>>)[0];
  assert.equal(tool.type, "function");
  const fn = tool.function as Record<string, unknown>;
  assert.equal(fn.name, "search");
});

test("claudeRequestToXaiResponses: maps thinking.enabled with budget to reasoning", () => {
  const req = {
    model: "grok-4",
    messages: [],
    thinking: { type: "enabled", budget_tokens: 8000 },
  };
  const out = claudeRequestToXaiResponses(req);
  assert.deepStrictEqual(out.reasoning, { effort: "medium" });
});

// ─── xaiCompletedToClaudeJson ─────────────────────────────────────────────────

test("xaiCompletedToClaudeJson: converts output_text to text content block", () => {
  const completed = {
    id: "r1",
    model: "grok-4",
    output: [
      {
        type: "message",
        content: [{ type: "output_text", text: "Hello!" }],
      },
    ],
  };
  const result = xaiCompletedToClaudeJson(completed) as Record<string, unknown>;
  assert.equal(result.role, "assistant");
  assert.equal(result.stop_reason, "end_turn");
  const content = result.content as Array<Record<string, unknown>>;
  assert.equal(content[0].type, "text");
  assert.equal(content[0].text, "Hello!");
});

test("xaiCompletedToClaudeJson: converts function_call to tool_use block", () => {
  const completed = {
    id: "r2",
    model: "grok-4",
    output: [
      {
        type: "function_call",
        call_id: "c1",
        name: "lookup",
        arguments: '{"q":"test"}',
      },
    ],
  };
  const result = xaiCompletedToClaudeJson(completed) as Record<string, unknown>;
  assert.equal(result.stop_reason, "tool_use");
  const content = result.content as Array<Record<string, unknown>>;
  assert.equal(content[0].type, "tool_use");
  assert.equal(content[0].name, "lookup");
});

// ─── geminiRequestToXaiResponses ─────────────────────────────────────────────

test("geminiRequestToXaiResponses: converts text parts to input_text blocks", () => {
  const req = {
    contents: [{ role: "user", parts: [{ text: "Hello" }] }],
  };
  const out = geminiRequestToXaiResponses(req, "grok-4");
  assert.equal(out.model, "grok-4");
  const item = out.input[0] as Record<string, unknown>;
  const content = item.content as Array<Record<string, unknown>>;
  assert.equal(content[0].type, "input_text");
  assert.equal(content[0].text, "Hello");
});

test("geminiRequestToXaiResponses: maps systemInstruction to instructions", () => {
  const req = {
    contents: [],
    systemInstruction: { parts: [{ text: "Be helpful" }] },
  };
  const out = geminiRequestToXaiResponses(req);
  assert.equal(out.instructions, "Be helpful");
});

test("geminiRequestToXaiResponses: converts functionDeclarations to xAI tools", () => {
  const req = {
    contents: [],
    tools: [
      {
        functionDeclarations: [
          {
            name: "search",
            description: "Search the web",
            parameters: { type: "object" },
          },
        ],
      },
    ],
  };
  const out = geminiRequestToXaiResponses(req);
  assert.ok(Array.isArray(out.tools));
  const tool = (out.tools as Array<Record<string, unknown>>)[0];
  assert.equal(tool.type, "function");
  const fn = tool.function as Record<string, unknown>;
  assert.equal(fn.name, "search");
});

test("geminiRequestToXaiResponses: maps thinkingBudget to reasoning.effort", () => {
  const req = {
    contents: [],
    generationConfig: { thinkingConfig: { thinkingBudget: 20000 } },
  };
  const out = geminiRequestToXaiResponses(req);
  assert.deepStrictEqual(out.reasoning, { effort: "high" });
});

test("geminiRequestToXaiResponses: converts model role to assistant", () => {
  const req = {
    contents: [{ role: "model", parts: [{ text: "Hi" }] }],
  };
  const out = geminiRequestToXaiResponses(req);
  const item = out.input[0] as Record<string, unknown>;
  assert.equal(item.role, "assistant");
});

// ─── xaiCompletedToGeminiJson ────────────────────────────────────────────────

test("xaiCompletedToGeminiJson: converts output_text to Gemini candidate text part", () => {
  const completed = {
    id: "r1",
    model: "grok-4",
    output: [
      {
        type: "message",
        content: [{ type: "output_text", text: "Hello Gemini!" }],
      },
    ],
  };
  const result = xaiCompletedToGeminiJson(completed) as Record<string, unknown>;
  const candidates = result.candidates as Array<Record<string, unknown>>;
  const content = candidates[0].content as Record<string, unknown>;
  const parts = content.parts as Array<Record<string, unknown>>;
  assert.equal(parts[0].text, "Hello Gemini!");
  assert.equal(candidates[0].finishReason, "STOP");
});

test("xaiCompletedToGeminiJson: converts function_call to functionCall part", () => {
  const completed = {
    id: "r2",
    model: "grok-4",
    output: [
      {
        type: "function_call",
        name: "lookup",
        arguments: '{"q":"test"}',
      },
    ],
  };
  const result = xaiCompletedToGeminiJson(completed) as Record<string, unknown>;
  const candidates = result.candidates as Array<Record<string, unknown>>;
  const content = candidates[0].content as Record<string, unknown>;
  const parts = content.parts as Array<Record<string, unknown>>;
  const fc = parts[0].functionCall as Record<string, unknown>;
  assert.equal(fc.name, "lookup");
  assert.deepStrictEqual(fc.args, { q: "test" });
});

test("xaiCompletedToGeminiJson: maps usage to usageMetadata", () => {
  const completed = {
    model: "grok-4",
    output: [],
    usage: { input_tokens: 10, output_tokens: 20 },
  };
  const result = xaiCompletedToGeminiJson(completed) as Record<string, unknown>;
  const meta = result.usageMetadata as Record<string, unknown>;
  assert.equal(meta.promptTokenCount, 10);
  assert.equal(meta.candidatesTokenCount, 20);
  assert.equal(meta.totalTokenCount, 30);
});
