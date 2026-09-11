import { protectPipelinePayloads } from "../../src/lib/usage/callLogs/format.ts";
import test from "node:test";
import assert from "node:assert/strict";

const {
  normalizePayloadForLog,
  protectErrorPayloadForLog,
  protectPayloadForLog,
  serializePayloadForStorage,
  parseStoredPayload,
} = await import("../../src/lib/logPayloads.ts");
const {
  createStructuredSSECollector,
  buildStreamSummaryFromEvents,
  compactStructuredStreamPayload,
} = await import("../../open-sse/utils/streamPayloadCollector.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

test("normalizes JSON strings before log protection and redacts sensitive keys", () => {
  const protectedPayload = protectPayloadForLog(
    JSON.stringify({
      authorization: "Bearer secret-token-value",
      "x-goog-api-key": "gemini-test-key",
      nested: {
        apiKey: "top-secret-key",
      },
    })
  );

  assert.deepEqual(protectedPayload, {
    authorization: "[REDACTED]",
    "x-goog-api-key": "[REDACTED]",
    nested: {
      apiKey: "[REDACTED]",
    },
  });
});

test("redacts web-impersonation body credentials but preserves non-secret 'capability' diagnostics", () => {
  const protectedPayload = protectPayloadForLog(
    JSON.stringify({
      // real browser-storage credentials that can land in a body field
      cookie: "ecto_1_sess=abc123",
      storageState: "{...}",
      runtimeKey: "rk_live_secret",
      // non-secret diagnostic fields that happen to be named 'capability' /
      // 'capabilities' — must survive so call-log artifacts stay useful (#10952
      // review: do not blanket-redact the generic word 'capability').
      capability: "Reduced capability (fallback active)",
      model: {
        id: "claude-opus-4.8",
        capabilities: { type: "chat", supports: { vision: true } },
      },
    })
  );

  assert.deepEqual(protectedPayload, {
    cookie: "[REDACTED]",
    storageState: "[REDACTED]",
    runtimeKey: "[REDACTED]",
    capability: "Reduced capability (fallback active)",
    model: {
      id: "claude-opus-4.8",
      capabilities: { type: "chat", supports: { vision: true } },
    },
  });
});

test("redacts challenge and handoff credentials from persistent request logs", () => {
  const protectedPayload = protectPipelinePayloads({
    providerRequest: {
      model: "browser-session-model",
      recaptchaV3Token: "recaptcha-secret",
      nested: {
        recaptchaToken: "recaptcha-alias-secret",
        turnstileToken: "turnstile-secret",
        proofToken: "proof-secret",
        resumeToken: "resume-secret",
        prepare_token: "prepare-secret",
      },
    },
  });

  assert.deepEqual(protectedPayload?.providerRequest, {
    model: "browser-session-model",
    recaptchaV3Token: "[REDACTED]",
    nested: {
      recaptchaToken: "[REDACTED]",
      turnstileToken: "[REDACTED]",
      proofToken: "[REDACTED]",
      resumeToken: "[REDACTED]",
      prepare_token: "[REDACTED]",
    },
  });
});

test("sanitizes pipeline error messages before persistent request logs", () => {
  const protectedPayload = protectPipelinePayloads({
    error: {
      timestamp: "2026-09-02T00:00:00.000Z",
      error:
        "Provider failed access_token=pipeline-secret at /srv/private/provider.json\n" +
        "    at dispatch (/srv/private/dispatcher.ts:42:7)",
      requestBody: {
        max_tokens: 512,
        temperature: 0.2,
        prompt: "Inspect /tmp/example.ts without changing it",
      },
    },
  });
  const serialized = JSON.stringify(protectedPayload);

  assert.doesNotMatch(serialized, /pipeline-secret|srv\/private|dispatcher\.ts|\bat dispatch\b/i);
  assert.deepEqual(protectedPayload?.error?.requestBody, {
    max_tokens: 512,
    temperature: 0.2,
    prompt: "Inspect /tmp/example.ts without changing it",
  });
});

test("sanitizes only nested error and warning subtrees in persisted response bodies", () => {
  const payload = {
    content: "Normal output mentions /tmp/public-example.ts and must remain intact",
    usage: { completion_tokens: 7 },
    error: {
      message: "access_token=response-secret at /srv/private/provider.json",
      stack: "Error: response-secret\n    at dispatch (/srv/private/dispatcher.ts:42:7)",
    },
    warning: "Retry after reading C:\\Users\\admin\\private\\warning.json",
  };

  const protectedLegacyPayload = protectPayloadForLog(payload) as typeof payload;
  const protectedPipeline = protectPipelinePayloads({
    providerResponse: { body: payload },
    clientResponse: { body: payload },
  });
  const serialized = JSON.stringify({ protectedLegacyPayload, protectedPipeline });

  assert.doesNotMatch(
    serialized,
    /response-secret|srv\/private|dispatcher\.ts|C:\\Users|warning\.json/i
  );
  assert.equal(protectedLegacyPayload.content, payload.content);
  assert.deepEqual(protectedLegacyPayload.usage, payload.usage);
  assert.equal(protectedPipeline?.providerResponse?.body?.content, payload.content);
  assert.equal(protectedPipeline?.clientResponse?.body?.content, payload.content);
});

test("sanitizes in-band error marker objects even when an upstream uses HTTP 200", () => {
  const protectedPayload = protectPayloadForLog({
    events: [
      {
        type: "error",
        content:
          "access_token=in-band-secret at /srv/private/in-band.json\n" +
          "    at dispatch (/srv/private/in-band.ts:3:2)",
      },
    ],
    content: "Normal sibling content stays available",
  }) as { events: Array<{ type: string; content: string }>; content: string };

  assert.doesNotMatch(
    JSON.stringify(protectedPayload.events),
    /in-band-secret|srv\/private|in-band\.ts|\bat dispatch\b/i
  );
  assert.equal(protectedPayload.content, "Normal sibling content stays available");
});

test("sanitizes serialized error JSON nested below a neutral payload key", () => {
  const protectedPayload = protectPayloadForLog({
    payload: JSON.stringify({
      type: "error",
      message: "access_token=serialized-secret at /srv/private/serialized.json",
    }),
  }) as { payload: string };

  assert.doesNotMatch(protectedPayload.payload, /serialized-secret|srv\/private/i);
  assert.equal((JSON.parse(protectedPayload.payload) as { type: string }).type, "error");
});

test("preserves deep successful payloads and still sanitizes deep error leaves", () => {
  const successLeaf = { content: "deep successful content", usage: { total_tokens: 2 } };
  const errorLeaf = {
    error: {
      message: "access_token=deep-error-secret at /srv/private/deep.json",
    },
  };
  let deepSuccess: Record<string, unknown> = successLeaf;
  let deepError: Record<string, unknown> = errorLeaf;
  for (let depth = 0; depth < 18; depth += 1) {
    deepSuccess = { [`level_${depth}`]: deepSuccess };
    deepError = { [`level_${depth}`]: deepError };
  }

  assert.deepEqual(protectPayloadForLog(deepSuccess), deepSuccess);
  assert.doesNotMatch(
    JSON.stringify(protectPayloadForLog(deepError)),
    /deep-error-secret|srv\/private/i
  );
});

test("error-mode log protection summarizes opaque binary bodies without enumerating bytes", () => {
  assert.equal(protectErrorPayloadForLog(new Uint8Array([1, 2, 3, 4])), "[binary 4 bytes]");
  assert.equal(protectErrorPayloadForLog(Buffer.from([5, 6, 7])), "[binary 3 bytes]");
});

test("error-mode log protection summarizes nested binary bodies without enumerating bytes", () => {
  assert.deepEqual(
    protectErrorPayloadForLog({
      data: new Uint8Array([11, 22, 33, 44]),
      nested: {
        body: Buffer.from([55, 66, 77]),
        raw: new Uint8Array([88, 99]).buffer,
      },
    }),
    {
      data: "[binary 4 bytes]",
      nested: {
        body: "[binary 3 bytes]",
        raw: "[binary 2 bytes]",
      },
    }
  );
});

test("sanitizes error frames split across persisted SSE chunks", () => {
  const protectedPipeline = protectPipelinePayloads({
    streamChunks: {
      provider: [
        '[12:00:00.000] data: {"error":{"message":"access_token=stream-secret at /srv/private/',
        'provider.json","stack":"Error: stream-secret\\n    at dispatch (/srv/private/dispatcher.ts:42:7)"}}\n\n',
      ],
    },
  });
  const storedChunks = protectedPipeline?.streamChunks?.provider ?? [];
  const serialized = JSON.stringify(storedChunks);

  assert.doesNotMatch(serialized, /stream-secret|srv\/private|dispatcher\.ts|\bat dispatch\b/i);
  assert.match(serialized, /error/);
});

test("sanitizes plaintext SSE error events without treating metadata as data frames", () => {
  const metadata = 'metadata: {"error":{"message":"healthy diagnostic"}}';
  const protectedPipeline = protectPipelinePayloads({
    streamChunks: {
      provider: [
        `${metadata}\nevent: error\ndata: access_token=plain-sse-secret at /srv/private/plain.txt\n\n`,
      ],
    },
  });
  const storedChunks = protectedPipeline?.streamChunks?.provider ?? [];
  const serialized = JSON.stringify(storedChunks);

  assert.doesNotMatch(serialized, /plain-sse-secret|srv\/private|plain\.txt/i);
  assert.match(serialized, /event: error/);
  assert.equal(storedChunks[0].includes(metadata), true);
});

test("sanitizes discriminated SSE and raw NDJSON error records", () => {
  const protectedPipeline = protectPipelinePayloads({
    streamChunks: {
      provider: [
        'data: {"type":"error","message":"access_token=sse-json-secret at /srv/private/sse.json"}\n\n',
        '{"type":"error","subType":"upstream","message":"Bearer ndjson-secret at C:\\\\Users\\\\admin\\\\private.json"}\n',
        '{"type":"error","content":"Error: api_key=lmarena-secret\\n    at dispatch (/srv/private/lmarena.ts:8:2)"}\n',
      ],
    },
  });
  const storedChunks = protectedPipeline?.streamChunks?.provider ?? [];
  const serialized = JSON.stringify(storedChunks);

  assert.doesNotMatch(
    serialized,
    /sse-json-secret|ndjson-secret|lmarena-secret|srv\/private|C:\\\\Users|\bat dispatch\b/i
  );
  assert.equal(storedChunks[0].includes('"type":"error"'), true);
});

test("sanitizes response last_error aliases in objects, SSE, and NDJSON", () => {
  const hostile = "access_token=last-error-secret at /srv/private/last-error.ts";
  const objectPayload = protectPayloadForLog({
    response: { status: "failed", last_error: { message: hostile } },
  });
  const protectedPipeline = protectPipelinePayloads({
    streamChunks: {
      provider: [
        `data: ${JSON.stringify({ response: { status: "failed", last_error: { message: hostile } } })}\n\n`,
        `${JSON.stringify({ response: { status: "failed", lastError: { message: hostile } } })}\n`,
      ],
    },
  });
  const serialized = JSON.stringify({ objectPayload, protectedPipeline });

  assert.doesNotMatch(serialized, /last-error-secret|srv\/private|last-error\.ts/i);
  assert.match(serialized, /last_error|lastError/);
});

test("sanitizes response.failed messages without rewriting unrelated deep diagnostics", () => {
  const hostile = "Bearer response-failed-secret at /srv/private/response-failed.ts:8:2";
  const diagnostics = {
    trace: hostile,
    output: { trace: hostile },
    level1: { level2: { level3: { level4: { level5: { label: "legitimate diagnostic" } } } } },
  };
  const output = [
    {
      type: "message",
      role: "assistant",
      content: [{ type: "output_text", text: "safe direct partial output" }],
    },
    { type: "reasoning", reasoning_content: "private direct reasoning" },
  ];
  const objectPayload = protectPayloadForLog({
    type: "response.failed",
    message: hostile,
    diagnostics,
    output,
  });
  const protectedPipeline = protectPipelinePayloads({
    streamChunks: {
      provider: [
        `event: response.failed\ndata: ${JSON.stringify({ message: hostile, diagnostics })}\n\n`,
        `${JSON.stringify({ type: "response.failed", message: hostile, diagnostics })}\n`,
      ],
    },
  });
  const serialized = JSON.stringify({ objectPayload, protectedPipeline });

  assert.doesNotMatch(serialized, /response-failed-secret|srv\/private|response-failed\.ts/i);
  assert.deepEqual(
    (objectPayload as { diagnostics: typeof diagnostics }).diagnostics.level1,
    diagnostics.level1
  );
  assert.deepEqual((objectPayload as { output: unknown }).output, [
    {
      type: "message",
      role: "assistant",
      content: [{ type: "output_text", text: "safe direct partial output", annotations: [] }],
    },
  ]);
  assert.doesNotMatch(serialized, /private direct reasoning/);
  assert.match(serialized, /response\.failed/);
});

test("projects nested output when the SSE event alone marks response.failed", () => {
  const protectedPipeline = protectPipelinePayloads({
    streamChunks: {
      provider: [
        `event: response.failed\ndata: ${JSON.stringify({
          response: {
            output: [
              {
                type: "message",
                role: "assistant",
                content: [{ type: "output_text", text: "safe event partial output" }],
              },
              { type: "reasoning", reasoning_content: "private event reasoning" },
            ],
          },
        })}\n\n`,
      ],
    },
  });
  const serialized = JSON.stringify(protectedPipeline);

  assert.match(serialized, /safe event partial output/);
  assert.doesNotMatch(serialized, /private event reasoning|"reasoning"/);
});

test("sanitizes response.completed failed siblings in objects, SSE, and NDJSON", () => {
  const hostile = "Bearer completed-failed-secret at /srv/private/completed-failed.ts:8:2";
  const partialOutput = [
    {
      id: "msg_partial",
      type: "message",
      role: "assistant",
      status: "in_progress",
      diagnostics: { trace: hostile },
      content: [
        {
          type: "output_text",
          text: "partial safe output",
          annotations: [{ type: "url_citation", url: "file:///srv/private/citation" }],
        },
        { type: "output_text", phase: "commentary", text: "private commentary" },
        { type: "refusal", refusal: "safe refusal" },
      ],
    },
    {
      id: "msg_roleless",
      type: "message",
      content: [{ type: "output_text", text: "private roleless output" }],
    },
    {
      type: "reasoning",
      reasoning_content: "private chain of thought",
      encrypted_content: "private encrypted reasoning",
    },
    {
      type: "function_call",
      name: "read_private_file",
      arguments: '{"api_key":"private tool argument"}',
    },
  ];
  const projectedOutput = [
    {
      id: "msg_partial",
      type: "message",
      role: "assistant",
      status: "in_progress",
      content: [
        { type: "output_text", text: "partial safe output", annotations: [] },
        { type: "refusal", refusal: "safe refusal" },
      ],
    },
  ];
  const completedFailure = {
    type: "response.completed",
    message: hostile,
    response: {
      status: "failed",
      detail: hostile,
      description: hostile,
      error: { message: "Upstream request failed" },
      output: partialOutput,
    },
  };
  const objectPayload = protectPayloadForLog(completedFailure);
  const protectedPipeline = protectPipelinePayloads({
    streamChunks: {
      provider: [
        `event: response.completed\ndata: ${JSON.stringify({ message: hostile, response: completedFailure.response })}\n\n`,
        `${JSON.stringify(completedFailure)}\n`,
      ],
    },
  });
  const serialized = JSON.stringify({ objectPayload, protectedPipeline });

  assert.doesNotMatch(
    serialized,
    /completed-failed-secret|srv\/private|completed-failed\.ts|private commentary|private roleless|private chain|private encrypted|private tool/i
  );
  assert.match(serialized, /"annotations":\[\]/);
  assert.doesNotMatch(serialized, /"url_citation"|"diagnostics"|"function_call"|"reasoning"/);
  assert.match(serialized, /partial safe output/);
  assert.match(serialized, /safe refusal/);
  assert.deepEqual(
    (objectPayload as { response: { output: typeof projectedOutput } }).response.output,
    projectedOutput
  );
});

test("sanitizes upstream error bodies by status while preserving successful response bodies", () => {
  const successBody = {
    message: "Normal response mentions /tmp/public-example.ts and remains diagnostic content",
    usage: { total_tokens: 3 },
  };
  const protectedJsonError = protectPipelinePayloads({
    providerResponse: {
      status: 502,
      statusText: "Bad Gateway",
      headers: { "content-type": "application/json" },
      body: {
        message: "access_token=json-body-secret at /srv/private/upstream.json",
        detail: "Error: api_key=body-stack-secret\n    at dispatch (/srv/private/body.ts:4:2)",
      },
    },
  });
  const protectedPlaintextError = protectPipelinePayloads({
    providerResponse: {
      status: 503,
      body: "Bearer plaintext-body-secret at C:\\Users\\admin\\upstream.txt",
    },
  });
  const protectedSuccess = protectPipelinePayloads({
    providerResponse: { status: 200, body: successBody },
  });
  const serialized = JSON.stringify({ protectedJsonError, protectedPlaintextError });

  assert.doesNotMatch(
    serialized,
    /json-body-secret|body-stack-secret|plaintext-body-secret|srv\/private|C:\\\\Users|\bat dispatch\b/i
  );
  assert.equal(protectedJsonError?.providerResponse?.status, 502);
  assert.equal(protectedPlaintextError?.providerResponse?.status, 503);
  assert.deepEqual(protectedSuccess?.providerResponse?.body, successBody);
});

test("omits encrypted reasoning values from structured log payloads", () => {
  const encryptedContent = "encrypted".repeat(128);
  const payload = {
    output: [
      {
        type: "reasoning",
        encrypted_content: encryptedContent,
        reasoning_content: "visible diagnostic reasoning",
      },
    ],
  };

  const protectedPayload = protectPayloadForLog(payload) as typeof payload;

  assert.equal(
    protectedPayload.output[0].encrypted_content,
    `[omitted: encrypted reasoning, ${encryptedContent.length} chars]`
  );
  assert.equal(protectedPayload.output[0].reasoning_content, "visible diagnostic reasoning");
  assert.equal(payload.output[0].encrypted_content, encryptedContent);
});

test("omits encrypted reasoning split across captured SSE chunks", () => {
  const encryptedContent = "opaque-replay-state".repeat(128);
  const protectedPipeline = protectPipelinePayloads({
    streamChunks: {
      provider: [
        '[12:00:00.000] data: {"type":"response.completed","response":{"output":[{"type":"reasoning","encrypted_',
        `[12:00:00.001] content":"${encryptedContent}","summary":[]}]}}\n\n`,
      ],
    },
  });

  const storedChunks = protectedPipeline?.streamChunks?.provider ?? [];
  assert.equal(storedChunks.length, 1);
  assert.equal(storedChunks[0].includes(encryptedContent), false);
  assert.equal(storedChunks[0].includes("[omitted: encrypted reasoning]"), true);
  assert.equal(storedChunks[0].includes('"summary":[]'), true);
});

test("wraps raw text payloads in JSON-safe objects", () => {
  const normalized = normalizePayloadForLog("event: ping\ndata: plain-text\n\n");

  assert.deepEqual(normalized, {
    _rawText: "event: ping\ndata: plain-text\n\n",
  });
});

test("serializes truncated payloads as valid JSON objects", () => {
  const stored = serializePayloadForStorage({ text: "x".repeat(200) }, 80);
  const parsed: any = parseStoredPayload(stored);

  assert.equal(parsed._truncated, true);
  assert.equal(parsed._originalSize > 80, true);
  assert.equal(typeof parsed._preview, "string");
});

test("structured SSE collector preserves event order and marks truncation", () => {
  // Each collected event now also carries an ISO `timestamp` field (#5834 observability),
  // which enlarges per-event bytes. Give the byte budget enough headroom so truncation
  // here is driven by maxEvents (drop 1 of 3), which is what this test verifies.
  const collector = createStructuredSSECollector({ maxEvents: 2, maxBytes: 2000 });

  collector.push({ type: "response.created", id: "r1" });
  collector.push({ type: "response.output_text.delta", delta: "hi" });
  collector.push({ type: "response.completed" });

  const payload = collector.build({ done: true });

  assert.equal(payload._streamed, true);
  assert.equal(payload._eventCount, 3);
  assert.equal(payload._truncated, true);
  assert.equal(payload._droppedEvents, 1);
  assert.equal(payload.events.length, 2);
  assert.equal(payload.events[0].event, "response.created");
  assert.equal(payload.events[1].event, "response.output_text.delta");
  assert.deepEqual(payload.summary, { done: true });
});

test("builds compact OpenAI stream summary for detailed logs", () => {
  const collector = createStructuredSSECollector({ stage: "provider_response" });

  collector.push({
    id: "chatcmpl_1",
    object: "chat.completion.chunk",
    created: 123,
    model: "gpt-4.1-mini",
    choices: [{ index: 0, delta: { role: "assistant", content: "Hello " } }],
  });
  collector.push({
    id: "chatcmpl_1",
    object: "chat.completion.chunk",
    created: 123,
    model: "gpt-4.1-mini",
    choices: [{ index: 0, delta: { content: "world" } }],
  });
  collector.push({
    id: "chatcmpl_1",
    object: "chat.completion.chunk",
    created: 123,
    model: "gpt-4.1-mini",
    choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    usage: { prompt_tokens: 5, completion_tokens: 2, total_tokens: 7 },
  });

  const summary = buildStreamSummaryFromEvents(
    collector.getEvents(),
    FORMATS.OPENAI,
    "gpt-4.1-mini"
  );
  const compact: any = compactStructuredStreamPayload(
    collector.build(summary, { includeEvents: false })
  );

  assert.equal(compact.object, "chat.completion");
  assert.equal(compact.choices[0].message.content, "Hello world");
  assert.equal(compact.choices[0].finish_reason, "stop");
  assert.equal(compact._omniroute_stream.stage, "provider_response");
  assert.equal(compact._omniroute_stream.eventCount, 3);
  assert.equal("events" in compact, false);
});

test("builds compact Claude stream summary for detailed logs", () => {
  const collector = createStructuredSSECollector({ stage: "provider_response" });

  collector.push({
    type: "message_start",
    message: {
      id: "msg_1",
      model: "claude-sonnet-4",
      role: "assistant",
      usage: { input_tokens: 11 },
    },
  });
  collector.push({
    type: "content_block_start",
    index: 0,
    content_block: { type: "text", text: "" },
  });
  collector.push({
    type: "content_block_delta",
    index: 0,
    delta: { type: "text_delta", text: "你好" },
  });
  collector.push({
    type: "message_delta",
    delta: { stop_reason: "end_turn" },
    usage: { output_tokens: 7 },
  });

  const summary = buildStreamSummaryFromEvents(
    collector.getEvents(),
    FORMATS.CLAUDE,
    "claude-sonnet-4"
  );
  const compact: any = compactStructuredStreamPayload(
    collector.build(summary, { includeEvents: false })
  );

  assert.equal(compact.type, "message");
  assert.equal(compact.model, "claude-sonnet-4");
  assert.deepEqual(compact.content, [{ type: "text", text: "你好" }]);
  assert.equal(compact.usage.input_tokens, 11);
  assert.equal(compact.usage.output_tokens, 7);
  assert.equal(compact._omniroute_stream.eventCount, 4);
});

test("builds compact OpenAI summary with reasoning alias (delta.reasoning)", () => {
  const collector = createStructuredSSECollector({ stage: "provider_response" });

  collector.push({
    id: "chatcmpl_r1",
    object: "chat.completion.chunk",
    created: 100,
    model: "moonshotai/kimi-k2.5",
    choices: [{ index: 0, delta: { role: "assistant" } }],
  });
  collector.push({
    id: "chatcmpl_r1",
    object: "chat.completion.chunk",
    created: 100,
    model: "moonshotai/kimi-k2.5",
    choices: [{ index: 0, delta: { reasoning: "Let me think..." } }],
  });
  collector.push({
    id: "chatcmpl_r1",
    object: "chat.completion.chunk",
    created: 100,
    model: "moonshotai/kimi-k2.5",
    choices: [{ index: 0, delta: { content: "The answer is 4." } }],
  });
  collector.push({
    id: "chatcmpl_r1",
    object: "chat.completion.chunk",
    created: 100,
    model: "moonshotai/kimi-k2.5",
    choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    usage: { prompt_tokens: 10, completion_tokens: 20, total_tokens: 30 },
  });

  const summary = buildStreamSummaryFromEvents(
    collector.getEvents(),
    FORMATS.OPENAI,
    "moonshotai/kimi-k2.5"
  );
  const compact: any = compactStructuredStreamPayload(
    collector.build(summary, { includeEvents: false })
  );

  assert.equal(compact.object, "chat.completion");
  assert.equal(compact.choices[0].message.content, "The answer is 4.");
  assert.equal(compact.choices[0].message.reasoning_content, "Let me think...");
  assert.equal(compact.choices[0].finish_reason, "stop");
});
