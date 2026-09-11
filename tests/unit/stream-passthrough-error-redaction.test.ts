import assert from "node:assert/strict";
import test from "node:test";
import { createSSEStream } from "../../open-sse/utils/stream.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

type Failure = { status: number; message: string; code?: string; type?: string };

async function collectUntilFailure(
  chunks: string[],
  sourceFormat: string,
  convertedLog: string[],
  mode: "passthrough" | "translate" = "passthrough",
  targetFormat: string = FORMATS.OPENAI
): Promise<{ output: string; error: unknown; failure: Failure | null }> {
  let failure: Failure | null = null;
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(new TextEncoder().encode(chunk));
      controller.close();
    },
  });
  const reader = source
    .pipeThrough(
      createSSEStream({
        mode,
        ...(mode === "translate" ? { targetFormat } : {}),
        sourceFormat,
        ...(mode === "passthrough" ? { clientResponseFormat: sourceFormat } : {}),
        provider: "hostile-upstream",
        model: "hostile-model",
        body: { input: "hello" },
        reqLogger: {
          appendConvertedChunk(value: string) {
            convertedLog.push(value);
          },
        },
        onFailure(payload) {
          failure = payload;
          return true;
        },
      })
    )
    .getReader();

  let output = "";
  let error: unknown = null;
  try {
    while (true) {
      const result = await reader.read();
      if (result.done) break;
      output += new TextDecoder().decode(result.value);
    }
  } catch (caught) {
    error = caught;
  }
  return { output, error, failure };
}

function assertNoHostileDetail(value: string): void {
  assert.doesNotMatch(value, /private-runtime\.ts/);
  assert.doesNotMatch(value, /sk-stream-secret/);
  assert.doesNotMatch(value, /api_key/);
}

test("translated root error frames notify onFailure and terminate with a public-safe error", async () => {
  const convertedLog: string[] = [];
  const raw = {
    error: {
      type: "server_error",
      code: "opaque-provider-code",
      message:
        "translated failure at /srv/omniroute/private-runtime.ts:47:6 token=sk-stream-secret-xlate",
      api_key: "sk-stream-secret-abcdef",
    },
  };
  const result = await collectUntilFailure(
    [`data: ${JSON.stringify(raw)}\n\n`],
    FORMATS.CLAUDE,
    convertedLog,
    "translate"
  );

  assert.ok(result.error, "a translated upstream error must terminate the stream");
  assert.match(result.output, /event: error/);
  assertNoHostileDetail(result.output);
  assertNoHostileDetail(convertedLog.join("\n"));
  assert.ok(result.failure, "translated failures must reach the internal classifier");
  assert.match(result.failure.message, /private-runtime\.ts/);
  assert.equal(result.failure.code, "opaque-provider-code");
  assertNoHostileDetail(String(result.error));
});

test("translated failed response.completed events cannot become successful Chat completions", async () => {
  const convertedLog: string[] = [];
  const raw = {
    type: "response.completed",
    response: {
      id: "resp_translate_failed",
      status: "failed",
      output: [],
      error: {
        type: "server_error",
        code: "translated_completed_failure",
        message:
          "completed translate failure at /srv/omniroute/private-runtime.ts:58:4 token=sk-stream-secret-completed-translate",
      },
    },
  };
  const result = await collectUntilFailure(
    [`data: ${JSON.stringify(raw)}\n\n`],
    FORMATS.OPENAI,
    convertedLog,
    "translate",
    FORMATS.OPENAI_RESPONSES
  );

  assert.ok(result.error, "a failed Responses completion must terminate translated Chat output");
  assert.match(result.output, /"error"/);
  assert.doesNotMatch(result.output, /"finish_reason":"stop"/);
  assertNoHostileDetail(result.output);
  assertNoHostileDetail(convertedLog.join("\n"));
  assert.ok(result.failure, "the translated failure must reach fallback classification");
  assert.equal(result.failure.code, "translated_completed_failure");
  assert.match(result.failure.message, /private-runtime\.ts/);
  assertNoHostileDetail(String(result.error));
});

test("a translated failed response.completed tail without a newline still terminates", async () => {
  const convertedLog: string[] = [];
  const raw = {
    type: "response.completed",
    response: {
      id: "resp_translate_failed_tail",
      status: "failed",
      output: [],
      error: {
        code: "translated_completed_tail_failure",
        message:
          "completed tail failure at /srv/omniroute/private-runtime.ts:59:4 token=sk-stream-secret-completed-tail",
      },
    },
  };
  const result = await collectUntilFailure(
    [`data: ${JSON.stringify(raw)}`],
    FORMATS.OPENAI,
    convertedLog,
    "translate",
    FORMATS.OPENAI_RESPONSES
  );

  assert.ok(result.error, "a buffered failed Responses completion must terminate in flush");
  assert.match(result.output, /"error"/);
  assert.doesNotMatch(result.output, /"finish_reason":"stop"/);
  assertNoHostileDetail(result.output);
  assertNoHostileDetail(convertedLog.join("\n"));
  assert.ok(result.failure);
  assert.equal(result.failure.code, "translated_completed_tail_failure");
  assert.match(result.failure.message, /private-runtime\.ts/);
  assertNoHostileDetail(String(result.error));
});

test("Responses response.failed is projected before forwarding, logging, and onFailure", async () => {
  const convertedLog: string[] = [];
  const raw = {
    type: "response.failed",
    response: {
      id: "resp_hostile-/srv/omniroute/private-runtime.ts-token=sk-stream-secret-id",
      model: "provider-model token=sk-stream-secret-model",
      status: "failed",
      output: [
        {
          id: "msg_partial",
          type: "message",
          role: "assistant",
          status: "in_progress",
          diagnostics: {
            stack: "at /srv/omniroute/private-runtime.ts:47:2",
            api_key: "sk-stream-secret-output-diagnostics",
          },
          content: [
            {
              type: "output_text",
              text: "safe partial output",
              annotations: [
                {
                  type: "url_citation",
                  url: "https://example.invalid/?token=sk-stream-secret-annotation",
                  title: "at /srv/omniroute/private-runtime.ts:48:2",
                },
              ],
            },
            {
              type: "output_text",
              phase: "commentary",
              text: "hidden nested commentary must not be public",
            },
            { type: "refusal", refusal: "safe refusal" },
          ],
        },
        {
          id: "msg_commentary",
          type: "message",
          role: "assistant",
          phase: "commentary",
          content: [
            {
              type: "output_text",
              text: "hidden commentary at /srv/omniroute/private-runtime.ts:49:2",
            },
          ],
        },
        {
          id: "msg_roleless",
          type: "message",
          content: [
            {
              type: "output_text",
              text: "roleless output must not be public",
              annotations: [],
            },
          ],
        },
        {
          id: "reasoning_private",
          type: "reasoning",
          encrypted_content: "sk-stream-secret-encrypted-reasoning",
          summary: [
            {
              type: "summary_text",
              text: "at /srv/omniroute/private-runtime.ts:50:2",
            },
          ],
        },
        {
          id: "call_private",
          type: "function_call",
          call_id: "call_private",
          name: "read_private_file",
          arguments:
            '{"path":"/srv/omniroute/private-runtime.ts","api_key":"sk-stream-secret-tool"}',
        },
        {
          id: "provider_private",
          type: "provider_diagnostics",
          diagnostics: {
            stack: "at /srv/omniroute/private-runtime.ts:51:2",
            api_key: "sk-stream-secret-unknown-item",
          },
        },
      ],
      error: {
        type: "server_error",
        code: "server_error",
        message: "failed at /srv/omniroute/private-runtime.ts:44:2 token=sk-stream-secret-123456",
        api_key: "sk-stream-secret-abcdef",
      },
      last_error: {
        code: "server_error",
        message:
          "last failure at /srv/omniroute/private-runtime.ts:45:2 token=sk-stream-secret-last",
      },
      message:
        "sibling failure at /srv/omniroute/private-runtime.ts:46:2 token=sk-stream-secret-sibling",
      diagnosis: { stack: "at /srv/omniroute/private-runtime.ts:46:2" },
      settings: { api_key: "sk-stream-secret-response-setting" },
      usage: {
        input_tokens: 4,
        output_tokens: 2,
        total_tokens: 6,
        input_tokens_details: {
          cached_tokens: 1,
          "sk-stream-secret-detail-key": 99,
        },
      },
    },
  };
  const result = await collectUntilFailure(
    [`event: response.failed\ndata: ${JSON.stringify(raw)}\n\n`],
    FORMATS.OPENAI_RESPONSES,
    convertedLog
  );

  assert.ok(result.error, "a failed Responses event must terminate the stream");
  assert.match(result.output, /response\.failed/);
  assert.match(result.output, /"last_error":\{/);
  assert.match(result.output, /safe partial output/);
  assert.match(result.output, /safe refusal/);
  assert.match(result.output, /"annotations":\[\]/);
  assert.doesNotMatch(result.output, /hidden nested commentary must not be public/);
  assert.doesNotMatch(result.output, /roleless output must not be public/);
  assert.match(result.output, /"cached_tokens":1/);
  assert.doesNotMatch(result.output, /\[truncated\]/);
  assertNoHostileDetail(result.output);
  assertNoHostileDetail(convertedLog.join("\n"));
  assert.doesNotMatch(
    result.output,
    /"diagnosis"|"diagnostics"|"settings"|"encrypted_content"|"function_call"|"provider_diagnostics"|"phase"|"url_citation"/
  );
  assert.doesNotMatch(
    convertedLog.join("\n"),
    /"diagnosis"|"diagnostics"|"settings"|"encrypted_content"|"function_call"|"provider_diagnostics"|"phase"|"url_citation"/
  );
  assert.ok(result.failure);
  assert.match(result.failure.message, /private-runtime\.ts/);
  assertNoHostileDetail(String(result.error));
});

test("failed response.completed events omit provider-only diagnostic siblings", async () => {
  const convertedLog: string[] = [];
  const raw = {
    type: "response.completed",
    response: {
      id: "resp_failed_completed",
      object: "response",
      created_at: 1_777_777_777,
      completed_at: 1_777_777_778,
      status: "failed",
      output: [],
      error: {
        code: "server_error",
        message:
          "completed failure at /srv/omniroute/private-runtime.ts:55:2 token=sk-stream-secret-completed",
      },
      diagnosis: { stack: "at /srv/omniroute/private-runtime.ts:55:2" },
      settings: { api_key: "sk-stream-secret-completed-setting" },
    },
  };
  const result = await collectUntilFailure(
    [`event: response.completed\ndata: ${JSON.stringify(raw)}\n\n`],
    FORMATS.OPENAI_RESPONSES,
    convertedLog
  );

  assert.ok(result.error, "a failed response.completed event must terminate the stream");
  assert.match(result.output, /"type":"response\.completed"/);
  assert.match(result.output, /"id":"resp_failed_completed"/);
  assert.match(result.output, /"created_at":1777777777/);
  assert.match(result.output, /"completed_at":1777777778/);
  assertNoHostileDetail(result.output);
  assertNoHostileDetail(convertedLog.join("\n"));
  assert.doesNotMatch(result.output, /"diagnosis"|"settings"/);
  assert.doesNotMatch(convertedLog.join("\n"), /"diagnosis"|"settings"/);
  assert.ok(result.failure);
  assert.match(result.failure.message, /private-runtime\.ts/);
  assertNoHostileDetail(String(result.error));
});

test("OpenAI root error frames without a top-level type remain failures after projection", async () => {
  const convertedLog: string[] = [];
  const raw = {
    error: {
      type: "server_error",
      code: "server_error",
      message: "root failed at /srv/omniroute/private-runtime.ts:48:7 token=sk-stream-secret-root",
      api_key: "sk-stream-secret-abcdef",
    },
  };
  const result = await collectUntilFailure(
    [`data: ${JSON.stringify(raw)}\n\n`],
    FORMATS.OPENAI,
    convertedLog
  );

  assert.ok(result.error, "an OpenAI error envelope must terminate the stream");
  assert.match(result.output, /"error"/);
  assertNoHostileDetail(result.output);
  assertNoHostileDetail(convertedLog.join("\n"));
  assert.ok(result.failure);
  assert.match(result.failure.message, /private-runtime\.ts/);
  assertNoHostileDetail(String(result.error));
});

test("OpenAI string error frames preserve raw classification but publish only safe text", async () => {
  const convertedLog: string[] = [];
  const raw = {
    error: "string failure at /srv/omniroute/private-runtime.ts:49:8 token=sk-stream-secret-string",
  };
  const result = await collectUntilFailure(
    [`data: ${JSON.stringify(raw)}\n\n`],
    FORMATS.OPENAI,
    convertedLog
  );

  assert.ok(result.error, "a string OpenAI error must terminate the stream");
  assertNoHostileDetail(result.output);
  assertNoHostileDetail(convertedLog.join("\n"));
  assert.ok(result.failure);
  assert.match(result.failure.message, /private-runtime\.ts/);
  assertNoHostileDetail(String(result.error));
});

test("Claude type:error is projected before forwarding and terminates the stream", async () => {
  const convertedLog: string[] = [];
  const raw = {
    type: "error",
    error: {
      type: "server_error",
      code: "server_error",
      message:
        "claude failed at /srv/omniroute/private-runtime.ts:51:3 token=sk-stream-secret-123456",
      api_key: "sk-stream-secret-abcdef",
    },
  };
  const result = await collectUntilFailure(
    [`event: error\ndata: ${JSON.stringify(raw)}\n\n`],
    FORMATS.CLAUDE,
    convertedLog
  );

  assert.ok(result.error, "a Claude error event must terminate the stream");
  assert.match(result.output, /event: error/);
  assertNoHostileDetail(result.output);
  assertNoHostileDetail(convertedLog.join("\n"));
  assert.ok(result.failure);
  assert.match(result.failure.message, /private-runtime\.ts/);
  assertNoHostileDetail(String(result.error));
});

test("a final response.failed frame without a trailing newline is projected before flush", async () => {
  const convertedLog: string[] = [];
  const raw = {
    type: "response.failed",
    response: {
      status: "failed",
      error: {
        code: "server_error",
        message:
          "tail failed at /srv/omniroute/private-runtime.ts:61:8 token=sk-stream-secret-123456",
        api_key: "sk-stream-secret-abcdef",
      },
    },
  };
  const result = await collectUntilFailure(
    [`event: response.failed\ndata: ${JSON.stringify(raw)}`],
    FORMATS.OPENAI_RESPONSES,
    convertedLog
  );

  assert.ok(result.error, "a buffered failed event must terminate during flush");
  assert.match(result.output, /response\.failed/);
  assertNoHostileDetail(result.output);
  assertNoHostileDetail(convertedLog.join("\n"));
  assert.ok(result.failure);
  assert.match(result.failure.message, /private-runtime\.ts/);
  assertNoHostileDetail(String(result.error));
});
