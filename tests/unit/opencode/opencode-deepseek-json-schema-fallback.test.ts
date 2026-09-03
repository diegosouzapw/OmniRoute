import { describe, it } from "node:test";
import assert from "node:assert/strict";

const { OpencodeExecutor } = await import("../../../open-sse/executors/opencode.ts");

type TransformedBody = Record<string, unknown> & {
  messages: Array<Record<string, unknown>>;
  response_format?: unknown;
};

function transform(model: string, body: Record<string, unknown>) {
  const executor = new OpencodeExecutor("opencode");

  return executor.transformRequest(model, body, false, {}) as TransformedBody;
}

describe("OpenCode DeepSeek json_schema fallback", () => {
  it("downgrades DeepSeek V4 Flash Free json_schema to json_object and preserves schema in instructions", () => {
    const schema = {
      type: "object",
      additionalProperties: false,
      properties: {
        ok: { type: "boolean" },
      },
      required: ["ok"],
    };

    const result = transform("deepseek-v4-flash-free", {
      model: "deepseek-v4-flash-free",
      messages: [
        {
          role: "user",
          content: "Return the structured result.",
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "desktop_probe",
          strict: true,
          schema,
        },
      },
    });

    assert.deepEqual(result.response_format, { type: "json_object" });

    const system = result.messages.find(
      (message: Record<string, unknown>) => message.role === "system"
    );

    assert.ok(system);
    assert.equal(typeof system.content, "string");

    assert.match(system.content, /strictly follows this JSON schema/i);

    assert.match(system.content, /"ok"/);

    assert.equal(
      result.messages.some(
        (message: Record<string, unknown>) =>
          message.role === "user" && message.content === "Return the structured result."
      ),
      true
    );
  });

  it("leaves DeepSeek V4 Flash Free json_object unchanged", () => {
    const body = {
      model: "deepseek-v4-flash-free",
      messages: [
        {
          role: "user",
          content: "Return JSON.",
        },
      ],
      response_format: {
        type: "json_object",
      },
    };

    const result = transform("deepseek-v4-flash-free", body);

    assert.deepEqual(result.response_format, { type: "json_object" });

    assert.equal(
      result.messages.some((message: Record<string, unknown>) => message.role === "system"),
      false
    );
  });

  it("does not change json_schema for unrelated OpenCode models", () => {
    const schema = {
      type: "object",
      properties: {
        value: { type: "string" },
      },
      required: ["value"],
    };

    const originalFormat = {
      type: "json_schema",
      json_schema: {
        name: "other_model_probe",
        strict: true,
        schema,
      },
    };

    const result = transform("big-pickle", {
      model: "big-pickle",
      messages: [
        {
          role: "user",
          content: "Return the result.",
        },
      ],
      response_format: originalFormat,
    });

    assert.deepEqual(result.response_format, originalFormat);
  });

  it("applies the fallback for the opencode-zen provider", () => {
    const executor = new OpencodeExecutor("opencode-zen");

    const result = executor.transformRequest(
      "deepseek-v4-flash-free",
      {
        model: "deepseek-v4-flash-free",
        messages: [
          {
            role: "user",
            content: "Return the structured result.",
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "zen_probe",
            schema: {
              type: "object",
              properties: {
                ok: { type: "boolean" },
              },
              required: ["ok"],
            },
          },
        },
      },
      false,
      {}
    ) as TransformedBody;

    assert.deepEqual(result.response_format, { type: "json_object" });
  });

  it("does not apply the fallback to opencode-go", () => {
    const executor = new OpencodeExecutor("opencode-go");

    const originalFormat = {
      type: "json_schema",
      json_schema: {
        name: "go_scope_probe",
        schema: {
          type: "object",
          properties: {
            ok: { type: "boolean" },
          },
          required: ["ok"],
        },
      },
    };

    const result = executor.transformRequest(
      "deepseek-v4-flash-free",
      {
        model: "deepseek-v4-flash-free",
        messages: [
          {
            role: "user",
            content: "Return the structured result.",
          },
        ],
        response_format: originalFormat,
      },
      false,
      {}
    ) as TransformedBody;

    assert.deepEqual(result.response_format, originalFormat);
  });

  it("does not alter an ordinary DeepSeek request", () => {
    const result = transform("deepseek-v4-flash-free", {
      model: "deepseek-v4-flash-free",
      messages: [
        {
          role: "user",
          content: "Hello.",
        },
      ],
    });

    assert.equal(result.response_format, undefined);

    assert.equal(
      result.messages.some((message: Record<string, unknown>) => message.role === "system"),
      false
    );
  });
});
