import test from "node:test";
import assert from "node:assert/strict";

const { claudeToGeminiRequest } =
  await import("../../open-sse/translator/request/claude-to-gemini.ts");
const { DEFAULT_SAFETY_SETTINGS } =
  await import("../../open-sse/translator/helpers/geminiHelper.ts");
const {
  buildGeminiThoughtSignatureKey,
  storeGeminiThoughtSignature,
  clearGeminiThoughtSignatures,
} = await import("../../open-sse/services/geminiThoughtSignatureStore.ts");

test.beforeEach(() => {
  clearGeminiThoughtSignatures();
});

type UnknownRecord = Record<string, unknown>;

function getFunctionDeclarationParameters(parameters: unknown) {
  assert.ok(
    parameters && typeof parameters === "object",
    "expected function declaration parameters"
  );
  return parameters as UnknownRecord & {
    properties?: Record<string, UnknownRecord>;
    examples?: unknown;
  };
}

function getFunctionCall(part: unknown) {
  assert.ok(part && typeof part === "object", "expected Gemini part");
  const functionCall = (part as UnknownRecord).functionCall;
  assert.ok(functionCall && typeof functionCall === "object", "expected functionCall");
  return functionCall as { name: string };
}

function getFunctionResponse(part: unknown) {
  assert.ok(part && typeof part === "object", "expected Gemini part");
  const functionResponse = (part as UnknownRecord).functionResponse;
  assert.ok(functionResponse && typeof functionResponse === "object", "expected functionResponse");
  return functionResponse as { name: string };
}

test("Claude -> Gemini maps system, thinking, tool use, tool result and tools", () => {
  // Native functionCall requires a cached thoughtSignature (#8979 / #3688).
  const ns = "conn-claude-gemini-map";
  storeGeminiThoughtSignature(buildGeminiThoughtSignatureKey(ns, "tu_1"), "SIG_MAP_WEATHER");

  const result = claudeToGeminiRequest(
    "gemini-2.5-pro",
    {
      system: [{ text: "Rules" }],
      messages: [
        {
          role: "assistant",
          content: [
            { type: "thinking", thinking: "need tool" },
            { type: "tool_use", id: "tu_1", name: "weather", input: { city: "Tokyo" } },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: "tu_1",
              content: [{ type: "text", text: "20C" }],
            },
          ],
        },
      ],
      tools: [
        {
          name: "weather",
          description: "Get weather",
          input_schema: {
            type: "object",
            properties: { city: { type: ["string", "null"] } },
          },
        },
      ],
      max_tokens: 256,
      temperature: 0.4,
      top_p: 0.8,
      thinking: { type: "enabled", budget_tokens: 512 },
    },
    false,
    { _signatureNamespace: ns }
  );

  assert.deepEqual(result.systemInstruction, {
    role: "system",
    parts: [{ text: "Rules" }],
  });
  assert.equal(result.contents[0].role, "model");
  assert.deepEqual(result.contents[0].parts[0] as any, { thought: true, text: "need tool" });
  assert.deepEqual(result.contents[0].parts[1] as any, {
    thoughtSignature: "SIG_MAP_WEATHER",
    functionCall: { id: "tu_1", name: "weather", args: { city: "Tokyo" } },
  });
  assert.deepEqual(result.contents[1].parts[0] as any, {
    functionResponse: {
      id: "tu_1",
      name: "weather",
      response: { result: "20C" },
    },
  });
  assert.equal(result.generationConfig.maxOutputTokens, 256);
  assert.match((result as any).tools[0].functionDeclarations[0].name, /^[a-zA-Z0-9_]+$/);
  assert.equal(result.generationConfig.temperature, 0.4);
  assert.equal(result.generationConfig.topP, 0.8);
  assert.deepEqual(result.generationConfig.thinkingConfig, {
    thinkingBudget: 512,
    includeThoughts: true,
  });
  assert.deepEqual(result.safetySettings, DEFAULT_SAFETY_SETTINGS);
  assert.deepEqual((result as any).tools[0].functionDeclarations[0].parameters, {
    type: "object",
    properties: { city: { type: "string" } },
  });
});

test("Claude -> Gemini clamps maxOutputTokens to the model cap", () => {
  const result = claudeToGeminiRequest(
    "gemini-2.5-flash",
    {
      messages: [{ role: "user", content: [{ type: "text", text: "Hello" }] }],
      max_tokens: 999999,
    },
    false
  );

  // #3358 added the gemini-2.5-flash model spec (real cap 65536, not the old
  // 8192 default). An over-cap request clamps to the model's true max output.
  assert.equal(result.generationConfig.maxOutputTokens, 65536);
});

test("Claude -> Gemini preserves requested maxOutputTokens when the model cap is unknown", () => {
  const result = claudeToGeminiRequest(
    "gemini-2.5-pro",
    {
      messages: [{ role: "user", content: [{ type: "text", text: "Hello" }] }],
      max_tokens: 32000,
    },
    false
  );

  assert.equal(result.generationConfig.maxOutputTokens, 32000);
});

test("Claude -> Gemini converts text and base64 images to Gemini parts", () => {
  const result = claudeToGeminiRequest(
    "gemini-2.5-flash",
    {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Hello" },
            {
              type: "image",
              source: { type: "base64", media_type: "image/png", data: "abc" },
            },
          ],
        },
      ],
    },
    false
  );

  assert.deepEqual(result.contents, [
    {
      role: "user",
      parts: [{ text: "Hello" }, { inlineData: { mimeType: "image/png", data: "abc" } }],
    },
  ]);
});

test("Claude -> Gemini omits unsigned functionCall instead of injecting a fake thoughtSignature (#8979)", () => {
  // After #1410 / #8979: never inject a fake signature. Without a cached
  // thoughtSignature, native functionCall parts are omitted (context mode)
  // so Gemini 3+ does not return HTTP 400.
  const result = claudeToGeminiRequest(
    "gemini-2.5-flash",
    {
      messages: [
        {
          role: "assistant",
          content: [{ type: "tool_use", id: "tu_1", name: "read_file", input: {} }],
        },
      ],
    },
    false
  );

  assert.equal(result.contents.length, 0);
  assert.equal(
    JSON.stringify(result).includes('"functionCall"'),
    false,
    "signature-less tool_use must not become a native functionCall"
  );
  assert.equal(
    JSON.stringify(result).includes('"thoughtSignature"'),
    false,
    "the translator must not synthesize a fake thought signature"
  );
  assert.equal(
    JSON.stringify(result).includes("read_file"),
    false,
    "the omitted unsigned call must not leak its tool payload elsewhere"
  );
});

test("Claude -> Gemini sanitizes long tool names and exposes a restore map", () => {
  const longToolName =
    "mcp__filesystem__read_multiple_files_with_validation_and_metadata_bundle_v2";
  const ns = "conn-claude-gemini-long";
  storeGeminiThoughtSignature(buildGeminiThoughtSignatureKey(ns, "tu_long_1"), "SIG_LONG_TOOL");

  const result = claudeToGeminiRequest(
    "gemini-2.5-pro",
    {
      messages: [
        {
          role: "assistant",
          content: [
            { type: "tool_use", id: "tu_long_1", name: longToolName, input: { path: "/tmp/a" } },
          ],
        },
        {
          role: "user",
          content: [{ type: "tool_result", tool_use_id: "tu_long_1", content: "ok" }],
        },
      ],
      tools: [
        {
          name: longToolName,
          description: "Read files",
          input_schema: {
            type: "object",
            properties: {
              path: { type: "string", "x-ui": "hidden" },
            },
            examples: [{ path: "/tmp/a" }],
          },
        },
      ],
    },
    false,
    { _signatureNamespace: ns }
  );

  const sanitizedToolName = (result as any).tools[0].functionDeclarations[0].name as string;
  const parameters = getFunctionDeclarationParameters(
    (result as any).tools[0].functionDeclarations[0].parameters
  );
  assert.ok(longToolName.length > 64);
  assert.equal(sanitizedToolName.length, 64);
  assert.equal((result as any)._toolNameMap.get(sanitizedToolName), longToolName);
  assert.equal(getFunctionCall(result.contents[0].parts[0] as any).name, sanitizedToolName);
  assert.equal(getFunctionResponse(result.contents[1].parts[0] as any).name, sanitizedToolName);
  assert.equal(parameters.examples, undefined);
  assert.equal(parameters.properties?.path?.["x-ui"], undefined);
});

test("Claude -> Gemini handles empty bodies without producing invalid content", () => {
  const result = claudeToGeminiRequest("gemini-2.5-flash", {}, false);

  assert.deepEqual(result.contents, []);
  assert.deepEqual(result.generationConfig, {});
  assert.deepEqual(result.safetySettings, DEFAULT_SAFETY_SETTINGS);
});

test("Claude -> Gemini maps output_config.effort to thinkingConfig when thinking absent", () => {
  // NOTE: max/xhigh previously asserted 131072, but that locked in the OLD
  // no-cap behavior — gemini-2.5-pro is unregistered, so the raw budget sailed
  // to the upstream and 400'd ("thinking_budget must be in the range"). The
  // gemini-substring fallback in capThinkingBudget now clamps unregistered
  // Gemini models to the pro-tier ceiling 32768, which is what the upstream
  // actually accepts. low/medium/high are below the cap and stay unchanged.
  const cases: Array<{ effort: string; expected: number }> = [
    { effort: "low", expected: 1024 },
    { effort: "medium", expected: 10240 },
    { effort: "high", expected: 32768 },
    { effort: "max", expected: 32768 },
    { effort: "xhigh", expected: 32768 },
  ];

  for (const { effort, expected } of cases) {
    const result = claudeToGeminiRequest(
      "gemini-2.5-pro",
      {
        messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
        output_config: { effort },
      },
      false
    );
    assert.deepEqual(
      result.generationConfig.thinkingConfig,
      { thinkingBudget: expected, includeThoughts: true },
      `effort ${effort} should map to budget ${expected}`
    );
  }
});

// Regression for #3842: output_config.effort=high must be clamped to a Flash-tier
// Gemini model's real thinking-budget cap. gemini-2.5-flash's true max is 24576;
// the previous unclamped 32768 made the upstream return HTTP 400. Pro-tier
// (gemini-2.5-pro, real cap 32768) is asserted untouched by the test above.
test("Claude -> Gemini clamps output_config.effort=high to gemini-2.5-flash cap (#3842)", () => {
  const result = claudeToGeminiRequest(
    "gemini-2.5-flash",
    {
      messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
      output_config: { effort: "high" },
    },
    false
  );
  const budget = (result.generationConfig as any).thinkingConfig.thinkingBudget;
  assert.ok(budget <= 24576, `expected <= 24576 (real cap), got ${budget}`);
  assert.equal(budget, 24576);
});

test("Claude -> Gemini prefers thinking.budget_tokens over output_config.effort", () => {
  const result = claudeToGeminiRequest(
    "gemini-2.5-pro",
    {
      messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
      thinking: { type: "enabled", budget_tokens: 4096 },
      output_config: { effort: "high" },
    },
    false
  );

  assert.deepEqual(result.generationConfig.thinkingConfig, {
    thinkingBudget: 4096,
    includeThoughts: true,
  });
});

test("Claude -> Gemini skips thinkingConfig for output_config.effort=none", () => {
  const result = claudeToGeminiRequest(
    "gemini-2.5-pro",
    {
      messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
      output_config: { effort: "none" },
    },
    false
  );

  assert.equal((result.generationConfig as any).thinkingConfig, undefined);
});

// Regression for #3842: thinking.budget_tokens must be capped by the model's
// thinkingBudgetCap, matching the output_config.effort path behavior.
test("Claude -> Gemini thinking.budget_tokens is capped by model thinkingBudgetCap (#3842)", () => {
  // gemini-2.5-flash has thinkingBudgetCap: 24576
  const result = claudeToGeminiRequest(
    "gemini-2.5-flash",
    {
      messages: [{ role: "user", content: [{ type: "text", text: "think hard" }] }],
      thinking: { type: "enabled", budget_tokens: 50000 },
    },
    false
  );
  assert.deepEqual(result.generationConfig.thinkingConfig, {
    thinkingBudget: 24576,
    includeThoughts: true,
  });
});

// #6813: an explicit `budget_tokens: 0` on this path is the client's dynamic-thinking
// sentinel, not an off-switch — includeThoughts must stay true even after capping (see
// tests/unit/claude-to-gemini-budget-tokens-zero-6813.test.ts for the canonical
// regression). This mirrors that contract for a model with an explicit
// thinkingBudgetCap.
test("Claude -> Gemini thinking.budget_tokens=0 preserves dynamic-thinking sentinel after cap (#6813)", () => {
  const result = claudeToGeminiRequest(
    "gemini-2.5-flash",
    {
      messages: [{ role: "user", content: [{ type: "text", text: "no thinking" }] }],
      thinking: { type: "enabled", budget_tokens: 0 },
    },
    false
  );
  assert.deepEqual(result.generationConfig.thinkingConfig, {
    thinkingBudget: 0,
    includeThoughts: true,
  });
});

// Guard: models with thinkingBudgetCap=0 (e.g. gemini-3-flash) must NOT
// receive thinkingConfig even when the caller explicitly sends budget_tokens.
test("Claude -> Gemini skips thinkingConfig for model with thinkingBudgetCap=0", () => {
  const result = claudeToGeminiRequest(
    "gemini-3-flash",
    {
      messages: [{ role: "user", content: [{ type: "text", text: "hello" }] }],
      thinking: { type: "enabled", budget_tokens: 5000 },
    },
    false
  );
  assert.equal(
    (result.generationConfig as any).thinkingConfig,
    undefined,
    "gemini-3-flash (thinkingBudgetCap:0) must not receive thinkingConfig"
  );
});

// Guard: models with thinkingBudgetCap=0 must not receive thinkingConfig
// via the output_config.effort path either.
test("Claude -> Gemini skips effort thinkingConfig for model with thinkingBudgetCap=0", () => {
  const result = claudeToGeminiRequest(
    "gemini-3-flash",
    {
      messages: [{ role: "user", content: [{ type: "text", text: "hello" }] }],
      output_config: { effort: "high" },
    },
    false
  );
  assert.equal(
    (result.generationConfig as any).thinkingConfig,
    undefined,
    "gemini-3-flash (thinkingBudgetCap:0) must not receive effort thinkingConfig"
  );
});

// Guard: models not in MODEL_SPECS (thinkingBudgetCap=undefined) default to allowed.
test("Claude -> Gemini allows thinkingConfig for unknown model (no spec)", () => {
  const result = claudeToGeminiRequest(
    "some-unknown-gemini-model",
    {
      messages: [{ role: "user", content: [{ type: "text", text: "hello" }] }],
      thinking: { type: "enabled", budget_tokens: 5000 },
    },
    false
  );
  assert.deepEqual(result.generationConfig.thinkingConfig, {
    thinkingBudget: 5000,
    includeThoughts: true,
  });
});

// Effort budgets must be capped by the model's thinkingBudgetCap.
// gemini-2.5-flash has thinkingBudgetCap:24576; effort "high" sends 32768
// which must be capped to 24576.
test("Claude -> Gemini effort budget is capped by thinkingBudgetCap", () => {
  const result = claudeToGeminiRequest(
    "gemini-2.5-flash",
    {
      messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
      output_config: { effort: "high" },
    },
    false
  );
  assert.deepEqual(result.generationConfig.thinkingConfig, {
    thinkingBudget: 24576,
    includeThoughts: true,
  });
});

// Non-numeric budget_tokens (e.g. string "auto") must fall through to the
// effort path, not be treated as a numeric budget.
test("Claude -> Gemini non-numeric budget_tokens falls through to effort path", () => {
  const result = claudeToGeminiRequest(
    "gemini-2.5-flash",
    {
      messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
      thinking: { type: "enabled", budget_tokens: "auto" as any },
      output_config: { effort: "low" },
    },
    false
  );
  // Should use effort "low" (1024) instead of trying to use "auto" as budget
  assert.deepEqual(result.generationConfig.thinkingConfig, {
    thinkingBudget: 1024,
    includeThoughts: true,
  });
});

test("Claude -> Gemini maps stop_sequences and stop to generationConfig.stopSequences", () => {
  const result1 = claudeToGeminiRequest(
    "gemini-2.5-pro",
    {
      messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
      stop_sequences: ["STOP", "\nHuman:"],
    },
    false
  );
  assert.deepEqual(result1.generationConfig.stopSequences, ["STOP", "\nHuman:"]);

  const result2 = claudeToGeminiRequest(
    "gemini-2.5-pro",
    {
      messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
      stop: "SINGLE_STOP",
    },
    false
  );
  assert.deepEqual(result2.generationConfig.stopSequences, ["SINGLE_STOP"]);

  const result3 = claudeToGeminiRequest(
    "gemini-2.5-pro",
    {
      messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
    },
    false
  );
  assert.strictEqual(result3.generationConfig.stopSequences, undefined);
});
