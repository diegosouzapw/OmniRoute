import test from "node:test";
import assert from "node:assert/strict";
import { parseUpstreamError } from "../../open-sse/utils/error.ts";
import {
  extractJsonErrorFields,
  unwrapTencentEnvelope,
} from "../../open-sse/utils/tencentEnvelope.ts";

test("parseUpstreamError unwraps Tencent/CodeBuddy nested Response.Error envelope", async () => {
  const body = JSON.stringify({
    Response: {
      Error: {
        Code: "11102",
        Message: "model service info not found",
      },
      RequestId: "req-123",
    },
  });
  const res = new Response(body, { status: 400, headers: { "content-type": "application/json" } });
  const parsed = await parseUpstreamError(res, "codebuddy-intl");
  assert.equal(parsed.message, "model service info not found");
  assert.equal(parsed.errorCode, "11102");
});

test("parseUpstreamError unwraps Tencent nested data.Response.Error envelope", async () => {
  const body = JSON.stringify({
    data: {
      Response: {
        Error: {
          Code: "11103",
          Message: "quota exceeded",
        },
      },
    },
  });
  const res = new Response(body, { status: 400, headers: { "content-type": "application/json" } });
  const parsed = await parseUpstreamError(res, "codebuddy-cn");
  assert.equal(parsed.message, "quota exceeded");
  assert.equal(parsed.errorCode, "11103");
});

test("parseUpstreamError unwraps Tencent top-level code + msg error", async () => {
  const body = JSON.stringify({
    code: 11101,
    msg: "Non-stream chat request is currently not supported",
  });
  const res = new Response(body, { status: 400, headers: { "content-type": "application/json" } });
  const parsed = await parseUpstreamError(res, "codebuddy-intl");
  assert.equal(parsed.message, "Non-stream chat request is currently not supported");
  assert.equal(parsed.errorCode, 11101);
});

test("unwrapTencentEnvelope reads nested Response.Error", () => {
  const fields = unwrapTencentEnvelope({
    Response: { Error: { Code: "11102", Message: "model service info not found" } },
  });
  assert.equal(fields.message, "model service info not found");
  assert.equal(fields.errorCode, "11102");
});

test("unwrapTencentEnvelope reads data.Response.Error", () => {
  const fields = unwrapTencentEnvelope({
    data: { Response: { Error: { Code: "11103", Message: "quota exceeded" } } },
  });
  assert.equal(fields.message, "quota exceeded");
  assert.equal(fields.errorCode, "11103");
});

test("unwrapTencentEnvelope reads top-level code + msg and prefers it over nested Error", () => {
  const fields = unwrapTencentEnvelope({
    code: 11101,
    msg: "Non-stream chat request is currently not supported",
    Response: { Error: { Code: "nested", Message: "nested should lose" } },
  });
  assert.equal(fields.message, "Non-stream chat request is currently not supported");
  assert.equal(fields.errorCode, 11101);
});

test("unwrapTencentEnvelope passes OpenAI / non-object shapes through as empty fields", () => {
  assert.deepEqual(
    unwrapTencentEnvelope({ error: { message: "openai", code: "invalid_request" } }),
    { message: null, errorCode: undefined }
  );
  assert.deepEqual(unwrapTencentEnvelope("plain"), { message: null, errorCode: undefined });
  assert.deepEqual(unwrapTencentEnvelope(null), { message: null, errorCode: undefined });
  assert.deepEqual(unwrapTencentEnvelope([1, 2]), { message: null, errorCode: undefined });
});

test("extractJsonErrorFields prefers OpenAI error.message over a Tencent envelope", () => {
  const fields = extractJsonErrorFields({
    error: { message: "openai wins", code: "invalid_request", type: "invalid_request_error" },
    msg: "tencent should lose",
    Response: { Error: { Code: "11102", Message: "nested should lose" } },
  });
  assert.equal(fields.message, "openai wins");
  assert.equal(fields.errorCode, "invalid_request");
  assert.equal(fields.errorType, "invalid_request_error");
});

test("parseUpstreamError still surfaces OpenAI-shaped error.message", async () => {
  const body = JSON.stringify({
    error: {
      message: "insufficient_quota",
      code: "insufficient_quota",
      type: "insufficient_quota",
    },
  });
  const res = new Response(body, { status: 429, headers: { "content-type": "application/json" } });
  const parsed = await parseUpstreamError(res, "openai");
  assert.equal(parsed.message, "insufficient_quota");
  assert.equal(parsed.errorCode, "insufficient_quota");
  assert.equal(parsed.errorType, "insufficient_quota");
});
