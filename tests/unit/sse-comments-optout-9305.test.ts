import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const previousDataDir = process.env.DATA_DIR;
const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sse-comments-9305-"));
process.env.DATA_DIR = testDataDir;

const core = await import("../../src/lib/db/core.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const encoder = new TextEncoder();
const EXPECTED_USAGE = {
  prompt_tokens: 2,
  completion_tokens: 1,
};

const EXPECTED_RESPONSE_USAGE = {
  ...EXPECTED_USAGE,
  total_tokens: 3,
};

type CompletionPayload = {
  status: number;
  usage: unknown;
  responseBody?: {
    usage?: unknown;
  };
};

function contentChunk(): string {
  return `data: ${JSON.stringify({
    id: "chatcmpl-sse-comments-9305",
    object: "chat.completion.chunk",
    created: 1700000000,
    model: "test-model",
    choices: [
      {
        index: 0,
        delta: { role: "assistant", content: "ordinary-data" },
        finish_reason: null,
      },
    ],
    usage: EXPECTED_USAGE,
  })}\n\n`;
}

function countOccurrences(value: string, needle: string): number {
  return value.split(needle).length - 1;
}

async function runFinalizationCase({
  envValue,
  upstreamDone,
}: {
  envValue: string | undefined;
  upstreamDone: boolean;
}) {
  const previousComments = process.env.OMNIROUTE_SSE_COMMENTS;
  usageHistory.clearPendingRequests();

  try {
    if (envValue === undefined) delete process.env.OMNIROUTE_SSE_COMMENTS;
    else process.env.OMNIROUTE_SSE_COMMENTS = envValue;

    const provider = "test-provider";
    const model = "test-model";
    const connectionId = `conn-9305-${envValue ?? "default"}-${upstreamDone ? "done" : "eof"}`;
    const requestId = usageHistory.trackPendingRequest(model, provider, connectionId, true);
    const convertedChunks: string[] = [];
    let completion: CompletionPayload | null = null;
    let finalized = false;

    const source = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode(contentChunk()));
        if (upstreamDone) controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    const output = await new Response(
      source.pipeThrough(
        createSSEStream({
          mode: "passthrough",
          sourceFormat: FORMATS.OPENAI,
          provider,
          model,
          connectionId,
          body: { messages: [{ role: "user", content: "hello" }] },
          reqLogger: {
            appendConvertedChunk(value) {
              convertedChunks.push(value);
            },
          },
          onComplete(payload) {
            completion = payload as CompletionPayload;
            finalized = usageHistory.finalizePendingRequestById(requestId, {
              status: payload.status,
              providerResponse: payload.providerPayload,
              clientResponse: payload.clientPayload,
            });
          },
        })
      )
    ).text();

    return {
      output,
      convertedOutput: convertedChunks.join(""),
      completion,
      finalized,
      requestStillPending: usageHistory.getPendingById().has(requestId),
    };
  } finally {
    usageHistory.clearPendingRequests();
    if (previousComments === undefined) delete process.env.OMNIROUTE_SSE_COMMENTS;
    else process.env.OMNIROUTE_SSE_COMMENTS = previousComments;
  }
}

for (const upstreamDone of [true, false]) {
  const finalization = upstreamDone ? "upstream [DONE]" : "natural EOF";

  for (const [label, envValue, commentsExpected] of [
    // #10524: OMNIROUTE_SSE_COMMENTS now defaults to disabled — strict SSE
    // clients (WorkBuddy, etc.) crash on `: x-omniroute-*` comment lines.
    ["default", undefined, false],
    ["explicitly enabled", "yes", true],
    ["disabled", "off", false],
  ] as const) {
    test(`createSSEStream ${finalization} finalization preserves invariants with comments ${label}`, async () => {
      const result = await runFinalizationCase({ envValue, upstreamDone });
      const finishMarker = '"finish_reason":"stop"';
      const metadataMarker = ": x-omniroute-response-cost=";
      const doneMarker = "data: [DONE]";

      assert.match(result.output, /"content":"ordinary-data"/);
      assert.equal(countOccurrences(result.output, finishMarker), 1);
      assert.equal(countOccurrences(result.output, doneMarker), 1);
      assert.equal(result.completion?.status, 200);
      assert.deepEqual(result.completion?.usage, EXPECTED_USAGE);
      assert.deepEqual(result.completion?.responseBody?.usage, EXPECTED_RESPONSE_USAGE);
      assert.equal(result.finalized, true, "onComplete should finalize usage accounting");
      assert.equal(
        result.requestStillPending,
        false,
        "successful finalization should clean pending state"
      );
      assert.equal(
        result.convertedOutput,
        result.output,
        "logger and client should observe the same order"
      );

      const ordinaryIndex = result.output.indexOf('"content":"ordinary-data"');
      const finishIndex = result.output.indexOf(finishMarker);
      const metadataIndex = result.output.indexOf(metadataMarker);
      const doneIndex = result.output.indexOf(doneMarker);
      assert.ok(
        ordinaryIndex < finishIndex,
        "ordinary data should precede the synthetic finish chunk"
      );
      assert.ok(finishIndex < doneIndex, "synthetic finish chunk should precede [DONE]");

      if (commentsExpected) {
        assert.match(result.output, /: x-omniroute-provider=test-provider/);
        assert.ok(metadataIndex > finishIndex, "metadata should follow the finish chunk");
        assert.ok(metadataIndex < doneIndex, "metadata should precede [DONE]");
      } else {
        assert.doesNotMatch(result.output, /: x-omniroute-/);
      }
    });
  }
}

test.after(() => {
  usageHistory.clearPendingRequests();
  core.resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
});
