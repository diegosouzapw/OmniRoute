import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { applyCompression } from "../../../open-sse/services/compression/strategySelector.ts";
import { applyRtkCompression } from "../../../open-sse/services/compression/engines/rtk/index.ts";

describe("compression body adapter", () => {
  it("applies Caveman compression to OpenAI Responses input messages", () => {
    const body = {
      model: "gpt-5.5-codex",
      input: [
        {
          type: "message",
          role: "user",
          content: [
            {
              type: "input_text",
              text: "Please could you provide a detailed explanation of this implementation? Thank you so much for your help!",
            },
          ],
        },
        {
          type: "function_call",
          call_id: "call_1",
          name: "read_file",
          arguments: "{}",
        },
      ],
    };

    const result = applyCompression(body, "standard", {
      config: {
        enabled: true,
        defaultMode: "standard",
        autoTriggerTokens: 0,
        cacheMinutes: 5,
        preserveSystemPrompt: true,
        comboOverrides: {},
        cavemanConfig: {
          enabled: true,
          compressRoles: ["user"],
          skipRules: [],
          minMessageLength: 10,
          preservePatterns: [],
          intensity: "full",
        },
      },
    });

    assert.equal(result.compressed, true);
    assert.ok(!("messages" in result.body), "Responses body must not leak synthetic messages");
    const input = result.body.input as typeof body.input;
    assert.equal(input[1], body.input[1], "non-message Responses items should be preserved");
    const text = input[0].content[0].text;
    assert.ok(!text.includes("Please could you"));
    assert.ok(!text.includes("Thank you so much"));
    assert.ok(text.includes("explain"));
  });

  it("applies RTK compression to Responses function_call_output items", () => {
    const repeatedOutput = Array.from({ length: 20 }, () => "same noisy line").join("\n");
    const body = {
      input: [
        {
          type: "function_call_output",
          call_id: "call_1",
          output: repeatedOutput,
        },
      ],
    };

    const result = applyRtkCompression(body);

    assert.equal(result.compressed, true);
    assert.ok(!("messages" in result.body), "Responses body must not leak synthetic messages");
    const input = result.body.input as typeof body.input;
    assert.match(input[0].output, /\[rtk:dropped/);
    assert.equal(input[0].call_id, "call_1");
  });

  it("restores compressed array output on Responses function_call_output items", () => {
    const repeatedOutput = Array.from({ length: 20 }, () => "same noisy line").join("\n");
    const body = {
      input: [
        {
          type: "function_call_output",
          call_id: "call_1",
          output: [{ type: "input_text", text: repeatedOutput }],
        },
      ],
    };

    const result = applyRtkCompression(body);
    const input = result.body.input as typeof body.input;

    assert.equal(result.compressed, true);
    assert.match(input[0].output[0].text, /\[rtk:dropped/);
    assert.ok(!("content" in input[0]), "function_call_output should keep canonical output field");
  });

  it("restores adapted Responses bodies even when no compression is applied", () => {
    const body = {
      input: [
        {
          type: "message",
          role: "user",
          content: [{ type: "input_text", text: "short" }],
        },
      ],
    };

    const result = applyCompression(body, "standard", {
      config: {
        enabled: true,
        defaultMode: "standard",
        autoTriggerTokens: 0,
        cacheMinutes: 5,
        preserveSystemPrompt: true,
        comboOverrides: {},
        cavemanConfig: {
          enabled: true,
          compressRoles: ["user"],
          skipRules: [],
          minMessageLength: 50,
          preservePatterns: [],
          intensity: "full",
        },
      },
    });

    assert.equal(result.compressed, false);
    assert.ok(!("messages" in result.body));
    assert.deepEqual(result.body.input, body.input);
  });

  it("does not misalign Responses input items if an engine removes a synthetic message", () => {
    const body = {
      input: [
        { type: "message", role: "user", content: "duplicate" },
        { type: "message", role: "user", content: "duplicate" },
        { type: "message", role: "user", content: "unique" },
      ],
    };

    const result = applyCompression(body, "lite", {
      config: {
        enabled: true,
        defaultMode: "lite",
        autoTriggerTokens: 0,
        cacheMinutes: 5,
        preserveSystemPrompt: true,
        comboOverrides: {},
      },
    });

    assert.equal(result.compressed, true);
    assert.deepEqual(result.body.input, body.input);
  });

  it("compresses string Responses input without converting the request shape", () => {
    const body = {
      input:
        "Please could you provide a detailed explanation of this implementation? Thank you so much for your help!",
    };

    const result = applyCompression(body, "standard", {
      config: {
        enabled: true,
        defaultMode: "standard",
        autoTriggerTokens: 0,
        cacheMinutes: 5,
        preserveSystemPrompt: true,
        comboOverrides: {},
        cavemanConfig: {
          enabled: true,
          compressRoles: ["user"],
          skipRules: [],
          minMessageLength: 10,
          preservePatterns: [],
          intensity: "full",
        },
      },
    });

    assert.equal(result.compressed, true);
    assert.equal(typeof result.body.input, "string");
    assert.ok(!(result.body.input as string).includes("Please could you"));
  });
});
