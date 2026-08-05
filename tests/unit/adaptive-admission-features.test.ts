import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { estimateAdmissionCost } from "../../open-sse/services/admission/cost.ts";
import {
  ADMISSION_TOOL_SCAN_BUDGET,
  extractAdmissionCostFeatures,
} from "../../open-sse/services/admission/requestFeatures.ts";

describe("bounded request feature extraction", () => {
  it("does not call JSON.stringify or toJSON", () => {
    let stringifyCalls = 0;
    const original = JSON.stringify;
    JSON.stringify = ((...args: Parameters<typeof JSON.stringify>) => {
      stringifyCalls += 1;
      return original.apply(JSON, args as [unknown]);
    }) as typeof JSON.stringify;
    try {
      const body = {
        toJSON() {
          throw new Error("toJSON must not be invoked");
        },
        messages: [{ role: "user", content: "hello world" }],
        tools: [{ type: "function", function: { name: "x" } }],
        n: 3,
        stream: true,
      };
      const features = extractAdmissionCostFeatures(body);
      assert.ok((features.bodyBytes ?? 0) > 0);
      assert.ok((features.messageCount ?? 0) >= 1);
      assert.ok((features.toolCount ?? 0) >= 1);
      assert.equal(features.requestedFanout, 3);
      assert.equal(features.streaming, true);
      assert.ok((features.estimatedInputTokens ?? 0) > 0);
      assert.equal(stringifyCalls, 0);
    } finally {
      JSON.stringify = original;
    }
  });

  it("extracts production-realistic Chat, Responses, Gemini, and Antigravity shapes", () => {
    // OpenAI Chat Completions — stream omitted defaults false (higher non-stream class).
    const chat = extractAdmissionCostFeatures({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are helpful." },
        { role: "user", content: "Summarize the logs" },
      ],
      tools: [
        {
          type: "function",
          function: { name: "lookup", parameters: { type: "object" } },
        },
        {
          type: "function",
          function: { name: "write", parameters: { type: "object" } },
        },
      ],
      n: 2,
    });
    assert.equal(chat.messageCount, 2);
    assert.equal(chat.toolCount, 2);
    assert.equal(chat.requestedFanout, 2);
    assert.equal(chat.streaming, false);

    // OpenAI Responses API — string input counts as one item; array counts length.
    const responsesString = extractAdmissionCostFeatures({
      model: "gpt-4.1",
      input: "What is the capital of France?",
      tools: [{ type: "web_search_preview" }],
      stream: true,
    });
    assert.equal(responsesString.messageCount, 1);
    assert.equal(responsesString.toolCount, 1);
    assert.equal(responsesString.streaming, true);

    const responsesArray = extractAdmissionCostFeatures({
      model: "gpt-4.1",
      input: [
        { role: "user", content: [{ type: "input_text", text: "q1" }] },
        { role: "user", content: [{ type: "input_text", text: "q2" }] },
      ],
      stream: false,
      n: 3,
    });
    assert.equal(responsesArray.messageCount, 2);
    assert.equal(responsesArray.requestedFanout, 3);
    assert.equal(responsesArray.streaming, false);

    // Empty string input is not a content item.
    const emptyInput = extractAdmissionCostFeatures({ input: "" });
    assert.equal(emptyInput.messageCount, 0);

    // Gemini generateContent — nested generationConfig.candidateCount + functionDeclarations.
    const gemini = extractAdmissionCostFeatures({
      contents: [
        { role: "user", parts: [{ text: "hello" }] },
        { role: "model", parts: [{ text: "world" }] },
      ],
      tools: [
        {
          functionDeclarations: [
            { name: "get_weather", parameters: { type: "OBJECT" } },
            { name: "get_time", parameters: { type: "OBJECT" } },
          ],
        },
      ],
      generationConfig: { candidateCount: 4, temperature: 0.2 },
    });
    assert.equal(gemini.messageCount, 2);
    assert.equal(gemini.toolCount, 2);
    assert.equal(gemini.requestedFanout, 4);
    assert.equal(gemini.streaming, false);

    // Antigravity-style wrapper under `request`.
    const antigravity = extractAdmissionCostFeatures({
      request: {
        contents: [{ role: "user", parts: [{ text: "hi" }] }],
        tools: [
          {
            functionDeclarations: [{ name: "a" }, { name: "b" }, { name: "c" }],
          },
        ],
        generationConfig: { candidateCount: 5 },
        stream: true,
      },
    });
    assert.equal(antigravity.messageCount, 1);
    assert.equal(antigravity.toolCount, 3);
    assert.equal(antigravity.requestedFanout, 5);
    assert.equal(antigravity.streaming, true);

    // Authoritative extraction context wins over body stream inference.
    const overridden = extractAdmissionCostFeatures(
      { messages: [{ role: "user", content: "x" }], stream: false },
      { streaming: true }
    );
    assert.equal(overridden.streaming, true);

    const overriddenOff = extractAdmissionCostFeatures(
      { messages: [{ role: "user", content: "x" }], stream: true },
      { streaming: false }
    );
    assert.equal(overriddenOff.streaming, false);
  });

  it("bounds tool scans and never touches entries beyond the budget (conservative count)", () => {
    // Huge leading string makes estimateSizeFast byte-exit before walking tools,
    // so only countTools can touch the tools proxy — proving its scan bound alone.
    const sizePad = "x".repeat(300_000);

    let accesses = 0;
    const tools = new Proxy([] as unknown[], {
      get(target, prop, receiver) {
        if (prop === "length") return ADMISSION_TOOL_SCAN_BUDGET + 10_000;
        if (typeof prop === "string" && /^[0-9]+$/.test(prop)) {
          const index = Number(prop);
          accesses += 1;
          if (index >= ADMISSION_TOOL_SCAN_BUDGET) {
            throw new Error(`tool entry ${index} must not be touched`);
          }
          return { type: "function", function: { name: `t${index}` } };
        }
        return Reflect.get(target, prop, receiver);
      },
    });

    const features = extractAdmissionCostFeatures({ pad: sizePad, tools });
    // Any uninspected tail saturates the feature so heavier unseen entries cannot undercharge.
    assert.equal(features.toolCount, Number.MAX_SAFE_INTEGER);
    assert.equal(accesses, 0, "known oversized source should saturate before indexed access");

    // functionDeclarations length is O(1); truncated tail still cannot undercharge.
    let declAccesses = 0;
    const geminiTools = new Proxy([] as unknown[], {
      get(target, prop, receiver) {
        if (prop === "length") return ADMISSION_TOOL_SCAN_BUDGET + 50;
        if (typeof prop === "string" && /^[0-9]+$/.test(prop)) {
          const index = Number(prop);
          declAccesses += 1;
          if (index >= ADMISSION_TOOL_SCAN_BUDGET) {
            throw new Error(`gemini tool entry ${index} must not be touched`);
          }
          return {
            functionDeclarations: new Proxy([] as unknown[], {
              get(t, p, r) {
                if (p === "length") return 3;
                if (typeof p === "string" && /^[0-9]+$/.test(p)) {
                  throw new Error("functionDeclarations elements need not be scanned");
                }
                return Reflect.get(t, p, r);
              },
            }),
          };
        }
        return Reflect.get(target, prop, receiver);
      },
    });

    const geminiFeatures = extractAdmissionCostFeatures({ pad: sizePad, tools: geminiTools });
    assert.equal(geminiFeatures.toolCount, Number.MAX_SAFE_INTEGER);
    assert.equal(declAccesses, 0);

    let aliasTouches = 0;
    const sixtyFour = (label: string) =>
      new Proxy([] as unknown[], {
        get(target, prop, receiver) {
          if (prop === "length") return ADMISSION_TOOL_SCAN_BUDGET;
          if (typeof prop === "string" && /^[0-9]+$/.test(prop)) {
            aliasTouches += 1;
            return { name: `${label}-${prop}` };
          }
          return Reflect.get(target, prop, receiver);
        },
      });
    const aliases = extractAdmissionCostFeatures({
      pad: sizePad,
      tools: sixtyFour("tool"),
      functions: sixtyFour("function"),
    });
    assert.equal(aliases.toolCount, Number.MAX_SAFE_INTEGER);
    assert.ok(aliasTouches <= ADMISSION_TOOL_SCAN_BUDGET);

    let wrappedTouches = 0;
    const wrappedTail = new Proxy([] as unknown[], {
      get(target, prop, receiver) {
        if (prop === "length") return ADMISSION_TOOL_SCAN_BUDGET + 1;
        if (typeof prop === "string" && /^[0-9]+$/.test(prop)) {
          wrappedTouches += 1;
          return { functionDeclarations: new Array(1_000).fill(null) };
        }
        return Reflect.get(target, prop, receiver);
      },
    });
    const layered = extractAdmissionCostFeatures({
      pad: sizePad,
      tools: [{ type: "function" }],
      request: { tools: wrappedTail },
    });
    assert.equal(layered.toolCount, Number.MAX_SAFE_INTEGER);
    assert.equal(estimateAdmissionCost(layered), 1_000);
    assert.equal(wrappedTouches, 0);
  });

  it("nested fanout under request wrapper is visible and stream defaults false", () => {
    const features = extractAdmissionCostFeatures({
      request: {
        messages: [{ role: "user", content: "x" }],
        n: 7,
      },
    });
    assert.equal(features.requestedFanout, 7);
    assert.equal(features.streaming, false);
    assert.equal(features.messageCount, 1);
  });
});
