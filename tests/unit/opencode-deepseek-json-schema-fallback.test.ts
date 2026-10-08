import { describe, it } from "node:test";
import assert from "node:assert/strict";

const { OpencodeExecutor } = await import("../../open-sse/executors/opencode.ts");

type TransformedBody = Record<string, unknown> & {
  messages: Array<Record<string, unknown>>;
  response_format?: unknown;
};

function transform(model: string, body: Record<string, unknown>) {
  const executor = new OpencodeExecutor("opencode");

  return executor.transformRequest(model, body, false, {}) as TransformedBody;
}

describe("OpenCode DeepSeek json_schema handling (model-specific fallback removed 2026-10-08)", () => {
  it("passes DeepSeek json_schema through unchanged (fallback removed with the 2026-10-08 delisting)", () => {
    const schema = {
      type: "object",
      additionalProperties: false,
      properties: {
        ok: { type: "boolean" },
      },
      required: ["ok"],
    };

    const responseFormat = {
      type: "json_schema",
      json_schema: {
        name: "desktop_probe",
        strict: true,
        schema,
      },
    };

    const result = transform("deepseek-v4-flash-free", {
      model: "deepseek-v4-flash-free",
      messages: [
        {
          role: "user",
          content: "Return the structured result.",
        },
      ],
      response_format: responseFormat,
    });

    // The model-specific downgrade (json_schema -> json_object + schema-in-instructions)
    // was removed together with the model: the fallback keyed on the now-delisted
    // deepseek-v4-flash-free id and is unreachable for every live model. The request
    // must now pass through untouched — no silent format rewriting.
    assert.deepEqual(result.response_format, responseFormat);

    assert.equal(
      result.messages.some((message: Record<string, unknown>) => message.role === "system"),
      false,
      "no schema-in-instructions system message may be injected"
    );

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

  it("passes json_schema through for the opencode-zen provider too", () => {
    const executor = new OpencodeExecutor("opencode-zen");

    const responseFormat = {
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
        response_format: responseFormat,
      },
      false,
      {}
    ) as TransformedBody;

    assert.deepEqual(result.response_format, responseFormat);
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
