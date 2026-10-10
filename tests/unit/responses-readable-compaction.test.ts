import assert from "node:assert/strict";
import test from "node:test";
import { normalizeCodexResponsesInput } from "../../open-sse/utils/responsesInputNormalization.ts";
import { openaiResponsesToOpenAIRequest } from "../../open-sse/translator/request/openai-responses.ts";
import { convertResponsesApiFormat } from "../../open-sse/translator/helpers/responsesApiHelper.ts";
import {
  encodeCompactionSummary,
  SUMMARY_PREFIX,
} from "../../open-sse/vendor/codex-chatgpt-web/responses/compaction.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

test.after(() => resetDbInstance());
const summary = "Keep the prior decision about caf\u00e9 and resume the pending task.";
const message = {
  type: "message",
  role: "user",
  content: [{ type: "input_text", text: "continue" }],
};

function record(value: unknown): Record<string, unknown> {
  assert.ok(value && typeof value === "object" && !Array.isArray(value));
  return value as Record<string, unknown>;
}

function messages(value: unknown): Record<string, unknown>[] {
  const result = record(value).messages;
  assert.ok(Array.isArray(result));
  return result.map(record);
}

for (const type of ["compaction", "compaction_summary", "context_compaction"]) {
  test(`${type} restores readable history in the canonical Chat conversion`, () => {
    const body = {
      input: [{ type, encrypted_content: encodeCompactionSummary(summary) }, message],
    };
    const before = structuredClone(body);
    const result = openaiResponsesToOpenAIRequest("fixture-model", body, true, {});
    const output = messages(result);
    assert.equal(output[0].role, "user");
    assert.deepEqual(output[0].content, [
      { type: "text", text: `${SUMMARY_PREFIX}\n\n${summary}` },
    ]);
    assert.deepEqual(output[1].content, [{ type: "text", text: "continue" }]);
    assert.deepEqual(body, before);
  });

  test(`${type} restores readable history before native Codex normalization`, () => {
    const body = {
      input: [{ type, encrypted_content: encodeCompactionSummary(summary) }, message],
    };
    normalizeCodexResponsesInput(body);
    assert.deepEqual(body.input[0], {
      type: "message",
      role: "user",
      content: [{ type: "input_text", text: `${SUMMARY_PREFIX}\n\n${summary}` }],
    });
    assert.deepEqual(body.input[1], message);
  });
}

test("the conversion helper and translation hub also retain readable context", () => {
  const body = {
    input: [{ type: "compaction", encrypted_content: encodeCompactionSummary(summary) }, message],
  };
  const helper = convertResponsesApiFormat(body, null, "openai", "fixture-model");
  assert.deepEqual(messages(helper)[0].content, [
    { type: "text", text: `${SUMMARY_PREFIX}\n\n${summary}` },
  ]);
  const translated = translateRequest(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI,
    "fixture-model",
    body,
    true,
    null,
    "openai"
  );
  assert.deepEqual(messages(translated)[0].content, [
    { type: "text", text: `${SUMMARY_PREFIX}\n\n${summary}` },
  ]);
});

test("native Codex retains opaque compaction byte-for-byte", () => {
  const encrypted = {
    type: "compaction",
    encrypted_content: "opaque-fixture-no-readable-summary",
    id: "cmp-fixture",
  };
  const body = { input: [encrypted, message] };
  normalizeCodexResponsesInput(body);
  assert.deepEqual(body.input[0], encrypted);
});

test("opaque compaction still rejects translated targets", () => {
  assert.throws(
    () =>
      openaiResponsesToOpenAIRequest(
        "fixture-model",
        {
          input: [{ type: "compaction", encrypted_content: "opaque-fixture" }, message],
        },
        true,
        {}
      ),
    { statusCode: 400, errorType: "unsupported_feature" }
  );
});

test("a bare local compaction marker is removed without removing the following summary", () => {
  const body = { input: [{ type: "context_compaction" }, message] };
  const result = openaiResponsesToOpenAIRequest("fixture-model", body, true, {});
  assert.deepEqual(messages(result)[0].content, [{ type: "text", text: "continue" }]);
  normalizeCodexResponsesInput(body);
  assert.deepEqual(body.input, [message]);
});

test("malformed and non-UTF8 readable envelopes fail explicitly", () => {
  for (const payload of ["%%%", "YWJj=", Buffer.from([0xff, 0xfe]).toString("base64"), ""]) {
    const body = { input: [{ type: "compaction", encrypted_content: `ocx1:${payload}` }, message] };
    assert.throws(() => openaiResponsesToOpenAIRequest("fixture-model", body, true, {}), {
      statusCode: 400,
    });
    assert.throws(() => normalizeCodexResponsesInput(structuredClone(body)), { statusCode: 400 });
  }
});

test("restoration is idempotent and preserves item ordering", () => {
  const body = {
    input: [
      message,
      { type: "compaction", encrypted_content: encodeCompactionSummary(summary) },
      message,
    ],
  };
  normalizeCodexResponsesInput(body);
  const once = structuredClone(body);
  normalizeCodexResponsesInput(body);
  assert.deepEqual(body, once);
  assert.deepEqual(body.input[0], message);
  assert.deepEqual(body.input[2], message);
});

test("a context_compaction payload is not mistaken for an empty marker", () => {
  for (const payload of [
    { encrypted_content: null },
    { summary: "retained payload" },
    { content: "retained payload" },
  ]) {
    const item = { type: "context_compaction", ...payload };
    const body = { input: [item, message] };
    assert.throws(() => openaiResponsesToOpenAIRequest("fixture-model", body, true, {}), {
      statusCode: 400,
    });
    normalizeCodexResponsesInput(body);
    assert.deepEqual(body.input[0], item);
  }
});

test("noncanonical base64 pad bits are rejected without exposing the payload", () => {
  const body = { input: [{ type: "compaction", encrypted_content: "ocx1:AB==" }, message] };
  assert.throws(
    () => normalizeCodexResponsesInput(body),
    (error) => {
      assert.ok(error instanceof Error);
      assert.ok(!error.message.includes("AB=="));
      return true;
    }
  );
});

test("a valid summary preserves its leading UTF-8 BOM", () => {
  const value = "\uFEFFPreserve the exact summary text.";
  const body = {
    input: [{ type: "compaction", encrypted_content: encodeCompactionSummary(value) }],
  };
  normalizeCodexResponsesInput(body);
  assert.deepEqual(body.input[0], {
    type: "message",
    role: "user",
    content: [{ type: "input_text", text: `${SUMMARY_PREFIX}\n\n${value}` }],
  });
});
