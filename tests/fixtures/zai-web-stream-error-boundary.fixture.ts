import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

assert.ok(process.env.DATA_DIR, "the parent wrapper must provide a synthetic DATA_DIR");
assert.ok(
  process.env.OMNIROUTE_PLUGINS_DIR,
  "the parent wrapper must provide a synthetic plugin directory"
);
assert.ok(process.env.API_KEY_SECRET, "the parent wrapper must provide a synthetic API secret");

fs.mkdirSync(process.env.DATA_DIR, { recursive: true });
fs.mkdirSync(process.env.OMNIROUTE_PLUGINS_DIR, { recursive: true });

const [
  { buildZaiStreamingBody },
  { ensureStreamReadiness },
  { createSSEStream },
  { createStreamController, pipeWithDisconnect },
  { createStreamFailureFinalizers },
  { FORMATS },
  dbCore,
  { closeSharedLoggerResource },
] = await Promise.all([
  import("../../open-sse/executors/zai-web/stream.ts"),
  import("../../open-sse/utils/streamReadiness.ts"),
  import("../../open-sse/utils/stream.ts"),
  import("../../open-sse/utils/streamHandler.ts"),
  import("../../open-sse/utils/streamFailureFinalization.ts"),
  import("../../open-sse/translator/formats.ts"),
  import("../../src/lib/db/core.ts"),
  import("../../src/shared/utils/loggerResource.ts"),
]);

test.after(async () => {
  await closeSharedLoggerResource();
  dbCore.resetDbInstance();
});

const encoder = new TextEncoder();

function upstreamSse(...payloads: Record<string, unknown>[]): ReadableStream<Uint8Array> {
  return new ReadableStream({
    start(controller) {
      for (const payload of payloads) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
      }
      controller.close();
    },
  });
}

function emitOpenAiChunk(
  controller: ReadableStreamDefaultController,
  delta: Record<string, unknown>,
  finish: string | null = null
): void {
  const chunk = {
    id: "chatcmpl-zai-test",
    object: "chat.completion.chunk",
    created: 1,
    model: "glm-5.2",
    choices: [{ index: 0, delta, finish_reason: finish }],
  };
  controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
}

type PipelineResult = {
  output: string;
  completions: Array<{ status: number; errorCode?: string | null; error?: string | null }>;
  persisted: Array<{ status: number; errorCode?: string }>;
  failures: Array<{ status: number; message: string; code?: string; type?: string }>;
};

function jsonDataPayloads(output: string): Array<Record<string, unknown>> {
  return output
    .split(/\r?\n/)
    .filter((line) => line.startsWith("data: ") && line !== "data: [DONE]")
    .map((line) => JSON.parse(line.slice(6)) as Record<string, unknown>);
}

async function runPartialFailurePipeline(clientResponseFormat: string): Promise<PipelineResult> {
  const completions: PipelineResult["completions"] = [];
  const persisted: PipelineResult["persisted"] = [];
  const failures: PipelineResult["failures"] = [];
  const { onPipelineStreamError } = createStreamFailureFinalizers({
    isFailureCompletionRecorded: () => false,
    isStreamCompletionRecorded: () => false,
    onStreamComplete(payload) {
      completions.push({
        status: payload.status,
        errorCode: payload.errorCode,
        error: payload.error,
      });
    },
    persistFailureUsage(status, errorCode) {
      persisted.push({ status, errorCode });
    },
    onStreamFailure(failure) {
      failures.push(failure);
    },
  });

  const zaiStream = buildZaiStreamingBody(
    upstreamSse(
      {
        type: "chat:completion",
        data: { delta_content: "partial answer", phase: "answer" },
      },
      { error: { message: "stream aborted upstream" } }
    ),
    emitOpenAiChunk,
    null
  );
  const passthrough = clientResponseFormat === FORMATS.OPENAI;
  const transform = createSSEStream({
    mode: passthrough ? "passthrough" : "translate",
    targetFormat: FORMATS.OPENAI,
    sourceFormat: passthrough ? FORMATS.OPENAI : clientResponseFormat,
    clientResponseFormat,
    provider: "zai-web",
    model: "glm-5.2",
    body: { messages: [{ role: "user", content: "hello" }] },
  });
  const streamController = createStreamController({
    provider: "zai-web",
    model: "glm-5.2",
    clientResponseFormat,
    onError: onPipelineStreamError,
  });
  const output = await new Response(
    pipeWithDisconnect(
      new Response(zaiStream, { headers: { "Content-Type": "text/event-stream" } }),
      transform,
      streamController,
      { stallTimeoutMs: 0 }
    )
  ).text();

  return { output, completions, persisted, failures };
}

function assertFailureWasPersisted(result: PipelineResult): void {
  assert.deepEqual(result.completions, [
    {
      status: 502,
      errorCode: "stream_pipeline_error",
      error: "Z.ai stream failed: stream aborted upstream",
    },
  ]);
  assert.deepEqual(result.persisted, [{ status: 502, errorCode: "stream_pipeline_error" }]);
  assert.deepEqual(result.failures, [
    {
      status: 502,
      message: "Z.ai stream failed: stream aborted upstream",
      code: "stream_pipeline_error",
      type: "stream_error",
    },
  ]);
}

test("a pre-content Z.ai error fails stream readiness with a sanitized 502", async () => {
  const rawFailure =
    'signature invalid at /srv/omniroute/open-sse/auth.ts:17:9 api_key="sk-private"\n' +
    "    at verify (/srv/omniroute/open-sse/auth.ts:17:9)";
  const stream = buildZaiStreamingBody(
    upstreamSse({ error: { detail: rawFailure } }),
    emitOpenAiChunk,
    null
  );

  const readiness = await ensureStreamReadiness(
    new Response(stream, { headers: { "Content-Type": "text/event-stream" } }),
    { timeoutMs: 100, provider: "zai-web", model: "glm-5.2" }
  );

  if (readiness.ok) {
    await readiness.response.body?.cancel();
    assert.fail("an error-only Z.ai stream must not be accepted as ready model output");
  }

  assert.equal(readiness.response.status, 502);
  assert.equal(readiness.code, "STREAM_EARLY_EOF");
  assert.match(readiness.upstreamDiagnostic ?? "", /Z\.ai stream failed: signature invalid/);

  const publicBody = JSON.stringify(await readiness.response.json());
  assert.doesNotMatch(publicBody, /sk-private|\/srv\/omniroute|auth\.ts/);
  assert.match(publicBody, /<path>/);
});

test("a partial Z.ai failure stays strict Chat and persists as pipeline failure", async () => {
  const result = await runPartialFailurePipeline(FORMATS.OPENAI);
  const payloads = jsonDataPayloads(result.output);
  const terminal = payloads.find((payload) => "error" in payload);

  assert.match(result.output, /partial answer/, "content before the failure is preserved");
  assert.ok(terminal, "the Chat client receives a terminal structured error chunk");
  assert.equal(terminal.object, "chat.completion.chunk");
  assert.deepEqual(Object.keys(terminal).sort(), ["choices", "error", "object"]);
  assert.deepEqual(terminal.choices, [{ index: 0, delta: {}, finish_reason: "error" }]);
  assert.deepEqual(terminal.error, {
    message: "Z.ai stream failed: stream aborted upstream",
    type: "server_error",
    code: "server_error",
  });
  assert.match(result.output, /data: \[DONE\]/);
  assert.doesNotMatch(result.output, /response\.failed|event: response\.failed/);
  assert.doesNotMatch(result.output, /"finish_reason":"stop"/);
  assertFailureWasPersisted(result);
});

test("a partial Z.ai failure is translated to Claude and persists as failure", async () => {
  const result = await runPartialFailurePipeline(FORMATS.CLAUDE);

  assert.match(result.output, /partial answer/, "translated partial content is preserved");
  assert.match(result.output, /event: error\r?\n/);
  assert.match(result.output, /"type":"error"/);
  assert.match(result.output, /"message":"Z\.ai stream failed: stream aborted upstream"/);
  assert.match(result.output, /event: message_stop\r?\n/);
  assert.doesNotMatch(result.output, /response\.failed|event: response\.failed/);
  assert.doesNotMatch(result.output, /finish_reason|data: \[DONE\]/);
  assertFailureWasPersisted(result);
});

test("client cancellation stays non-blocking and cancels a stalled Z.ai body", async () => {
  let markPullStarted: (() => void) | null = null;
  const pullStarted = new Promise<void>((resolve) => {
    markPullStarted = resolve;
  });
  let upstreamCancelCalls = 0;
  const stalledUpstream = new ReadableStream<Uint8Array>({
    pull() {
      markPullStarted?.();
      return new Promise<void>(() => {});
    },
    cancel() {
      upstreamCancelCalls += 1;
      return new Promise<void>(() => {});
    },
  });
  const reader = buildZaiStreamingBody(stalledUpstream, emitOpenAiChunk, null).getReader();
  const pendingRead = reader.read();
  void pendingRead.catch(() => {});
  await pullStarted;

  const outcome = await Promise.race([
    reader.cancel("client closed").then(() => "resolved" as const),
    new Promise<"timeout">((resolve) => setTimeout(() => resolve("timeout"), 100)),
  ]);

  assert.equal(outcome, "resolved", "consumer cancel cannot wait for a stalled upstream body");
  assert.equal(upstreamCancelCalls, 1, "the locked upstream reader receives one cancel request");
});
