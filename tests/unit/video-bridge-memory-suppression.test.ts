// tests/unit/video-bridge-memory-suppression.test.ts
// P1b of #12150 (Video Bridge transcript retention) — surface 3 (Memory sink).
//
// chatCore.ts's two Memory-extraction call sites (non-streaming + streaming)
// now each delegate to a single `runMemoryExtractionGate` (extracted so this
// wiring — not just the underlying `shouldExtractMemory` decision — is
// unit-testable against the REAL extractMemoryTextFromRequestBody/
// extractMemoryTextFromResponse, same god-file-decomposition convention as
// chatCore/attemptLogging.ts, chatCore/nonStreamingUsageStats.ts, etc.).
//
// #12150 fix round 1 (adversarial review, Important): a video-bridge-observed
// request must populate NO durable memory from EITHER source — the
// request-derived text (a flattened transcript description) AND the
// response-derived text (the model's own reply, which also received the full
// transcript and can echo it back). Both are gated by the same
// shouldExtractMemory() decision inside runMemoryExtractionGate.
import test from "node:test";
import assert from "node:assert/strict";

import {
  shouldExtractMemory,
  runMemoryExtractionGate,
} from "../../open-sse/handlers/chatCore/memoryExtraction.ts";

// ─── shouldExtractMemory: pure decision table ──────────────────────────────

test("shouldExtractMemory: videoBridgeObserved=true skips extraction even when memory is otherwise enabled", () => {
  assert.equal(
    shouldExtractMemory({
      enabled: true,
      maxTokens: 2000,
      memoryOwnerId: "key-1",
      videoBridgeObserved: true,
    }),
    false
  );
});

test("shouldExtractMemory: videoBridgeObserved=false extracts when memory is enabled (unaffected non-video path)", () => {
  assert.equal(
    shouldExtractMemory({
      enabled: true,
      maxTokens: 2000,
      memoryOwnerId: "key-1",
      videoBridgeObserved: false,
    }),
    true
  );
});

test("shouldExtractMemory: videoBridgeObserved omitted (undefined) behaves like false — additive param default", () => {
  assert.equal(
    shouldExtractMemory({
      enabled: true,
      maxTokens: 2000,
      memoryOwnerId: "key-1",
    }),
    true
  );
});

test("shouldExtractMemory: still false when memory disabled, regardless of videoBridgeObserved", () => {
  assert.equal(
    shouldExtractMemory({
      enabled: false,
      maxTokens: 2000,
      memoryOwnerId: "key-1",
      videoBridgeObserved: false,
    }),
    false
  );
});

test("shouldExtractMemory: still false when maxTokens <= 0, regardless of videoBridgeObserved", () => {
  assert.equal(
    shouldExtractMemory({
      enabled: true,
      maxTokens: 0,
      memoryOwnerId: "key-1",
      videoBridgeObserved: false,
    }),
    false
  );
});

test("shouldExtractMemory: still false when memoryOwnerId is null, regardless of videoBridgeObserved", () => {
  assert.equal(
    shouldExtractMemory({
      enabled: true,
      maxTokens: 2000,
      memoryOwnerId: null,
      videoBridgeObserved: false,
    }),
    false
  );
});

// ─── runMemoryExtractionGate: the REAL chatCore.ts call-site wiring ────────
// No hand-mirrored stub — this imports and calls the exact function both
// chatCore.ts completion paths call. Only `extractFacts` (the DB-writing,
// fire-and-forget side effect) is injected as a spy; extraction of the
// request/response text runs through the real
// extractMemoryTextFromRequestBody/extractMemoryTextFromResponse.

const flattenedVideoRequestBody = {
  messages: [
    {
      role: "user",
      content: "[Video 1]: A person talks. transcript[00:00-00:02]: secret words",
    },
  ],
};

const modelReplyEchoingTranscript = {
  choices: [
    {
      message: {
        content: "Sure — the video shows: secret words",
      },
    },
  ],
};

function spy() {
  const calls: Array<[string, string, string]> = [];
  return {
    calls,
    fn: (text: string, ownerId: string, sessionId: string) => {
      calls.push([text, ownerId, sessionId]);
    },
  };
}

test("runMemoryExtractionGate: zero extractFacts calls (request AND response) for a video-bridge-observed request", () => {
  const extractFacts = spy();
  runMemoryExtractionGate({
    memoryOwnerId: "key-1",
    memorySettings: { enabled: true, maxTokens: 2000 },
    videoBridgeObserved: true,
    pipelineSessionId: "session-1",
    requestBody: flattenedVideoRequestBody,
    responseBody: modelReplyEchoingTranscript,
    extractFacts: extractFacts.fn,
  });
  assert.equal(
    extractFacts.calls.length,
    0,
    "extractFacts must not be called for either source when videoBridgeObserved=true"
  );
});

test("runMemoryExtractionGate: response-derived extraction specifically is skipped when observed (fix round 1 regression)", () => {
  const extractFacts = spy();
  runMemoryExtractionGate({
    memoryOwnerId: "key-1",
    memorySettings: { enabled: true, maxTokens: 2000 },
    videoBridgeObserved: true,
    pipelineSessionId: "session-1",
    // No request-derived text at all (e.g. request body already consumed/
    // reshaped) — isolates the assertion to the response-derived source,
    // which is the one fix round 1 found still leaking into Memory.
    requestBody: { messages: [] },
    responseBody: modelReplyEchoingTranscript,
    extractFacts: extractFacts.fn,
  });
  assert.equal(
    extractFacts.calls.length,
    0,
    "the model's reply (which also received the full transcript) must not be extracted when observed"
  );
});

test("runMemoryExtractionGate: extracts BOTH request and response text when video-bridge was not observed", () => {
  const extractFacts = spy();
  runMemoryExtractionGate({
    memoryOwnerId: "key-1",
    memorySettings: { enabled: true, maxTokens: 2000 },
    videoBridgeObserved: false,
    pipelineSessionId: "session-1",
    requestBody: flattenedVideoRequestBody,
    responseBody: { choices: [{ message: { content: "a normal reply" } }] },
    extractFacts: extractFacts.fn,
  });
  assert.equal(
    extractFacts.calls.length,
    2,
    "both request- and response-derived extraction run on the ordinary (non-video) path"
  );
  assert.match(extractFacts.calls[0][0], /secret words/);
  assert.match(extractFacts.calls[1][0], /a normal reply/);
  assert.equal(extractFacts.calls[0][1], "key-1");
  assert.equal(extractFacts.calls[0][2], "session-1");
});

test("runMemoryExtractionGate: no-ops when memory is disabled, regardless of videoBridgeObserved", () => {
  const extractFacts = spy();
  runMemoryExtractionGate({
    memoryOwnerId: "key-1",
    memorySettings: { enabled: false, maxTokens: 2000 },
    videoBridgeObserved: false,
    pipelineSessionId: "session-1",
    requestBody: flattenedVideoRequestBody,
    responseBody: { choices: [{ message: { content: "a normal reply" } }] },
    extractFacts: extractFacts.fn,
  });
  assert.equal(extractFacts.calls.length, 0);
});

test("runMemoryExtractionGate: no-ops when memoryOwnerId is missing, regardless of videoBridgeObserved", () => {
  const extractFacts = spy();
  runMemoryExtractionGate({
    memoryOwnerId: null,
    memorySettings: { enabled: true, maxTokens: 2000 },
    videoBridgeObserved: false,
    pipelineSessionId: "session-1",
    requestBody: flattenedVideoRequestBody,
    responseBody: { choices: [{ message: { content: "a normal reply" } }] },
    extractFacts: extractFacts.fn,
  });
  assert.equal(extractFacts.calls.length, 0);
});
