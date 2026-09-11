// tests/unit/video-bridge-log-redaction.test.ts
// P1b of #12150 (Video Bridge transcript retention) — surface 1 (call-log sink).
// Exercises the real persistAttemptLogs serialization (same harness pattern as
// tests/unit/chatcore-attempt-logging.test.ts): a real temp DB, a poll for the
// async saveCallLog write, and assertions on the persisted requestBody.
//
// Proves: when PersistAttemptLogsContext carries a videoBridgeLogRedaction map
// (P1a's per-part structured-redaction shadow), the PERSISTED requestBody has
// the transcript text swapped for the placeholder — while a control call
// WITHOUT the map (the byte-identical non-video path) keeps the original text,
// and the caller's own `body` object is never mutated in the process (the
// model already received the untouched original earlier in the request
// lifecycle; this call must not reach back and change it).
//
// #12150 fix round 1 (adversarial review, CRITICAL): also proves the
// content-address fix for the positional-drift bug — real request-mutation
// stages (injectSystemPrompt's "no existing system message" branch,
// context-relay handoff injection, reasoning-rule body rewrites) can
// prepend/splice messages between the guardrail's preCall and this log
// write, making a stale (messageIndex, partIndex) point at the wrong message
// or an out-of-bounds slot. applyVideoBridgeLogRedaction must locate the
// video part by matching `fullText` against part text, not by position.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { logClientRawRequestRedacted } from "../../src/lib/guardrails/videoBridgeSnapshotRedaction.ts";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-video-log-redaction-test-"));
process.env.DATA_DIR = testDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const { getCallLogById } = await import("../../src/lib/usage/callLogs.ts");
const { persistAttemptLogs } = await import("../../open-sse/handlers/chatCore/attemptLogging.ts");

const SECRET = "secret words";
const FULL_TEXT = `[Video 1]: A person talks. transcript[00:00-00:02]: ${SECRET}`;
const PLACEHOLDER_TEXT =
  "[Video 1]: A person talks. transcript[00:00-00:02]: [redacted-video-transcript]";

function videoBody() {
  return {
    model: "openai/gpt-x",
    messages: [
      { role: "system", content: "sys" },
      {
        role: "user",
        content: [
          { type: "text", text: "look at this video" },
          {
            type: "text",
            text: FULL_TEXT,
          },
        ],
      },
    ],
  };
}

function baseCtx(overrides: Record<string, unknown> = {}) {
  return {
    provider: "openai",
    connectionId: "conn-1",
    model: "gpt-x",
    skillRequestId: "skill-1",
    detailedLoggingEnabled: false,
    reqLogger: null,
    pendingRequestId: "REPLACE",
    clientRawRequest: { endpoint: "/v1/chat/completions" },
    requestedModel: "gpt-x-requested",
    credentials: { connectionId: "cred-conn" },
    startTime: Date.now(),
    body: videoBody(),
    sourceFormat: "openai",
    targetFormat: "openai",
    comboName: null,
    comboStepId: null,
    comboExecutionKey: null,
    tokensCompressed: 0,
    apiKeyInfo: { id: "key-1", name: "Key One" },
    noLogEnabled: false,
    ...overrides,
  } as Parameters<typeof persistAttemptLogs>[1];
}

// The attempt log is persisted asynchronously, so the row is polled rather than
// read once. The budget is a wall-clock deadline instead of a fixed try count:
// at 120 tries x 20ms the ceiling was 2.4s, and on a loaded runner the SQLite
// write routinely takes longer than that — the poll returned null and the
// assertions failed as "expected: true, actual: false", which reads like a
// redaction defect rather than a starved runner. 30s is far past any healthy
// write while still bounded, and a fast machine still returns on the first pass.
const POLL_DEADLINE_MS = 30_000;

async function pollForCallLog(id: string, deadlineMs = POLL_DEADLINE_MS) {
  const deadline = Date.now() + deadlineMs;
  for (;;) {
    const row = await getCallLogById(id);
    if (row) return row as Record<string, unknown>;
    if (Date.now() >= deadline) return null;
    await new Promise((r) => setTimeout(r, 20));
  }
}

function persistedPartText(requestBody: unknown): string {
  const record = requestBody as {
    messages?: Array<{ content?: Array<{ text?: string }> }>;
  };
  return record?.messages?.[1]?.content?.[1]?.text ?? "";
}

before(async () => {
  await coreDb.ensureDbInitialized();
});

after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("persisted requestBody carries the placeholder and never the raw transcript when a redaction map is present", async () => {
  const id = "video-redacted-1";
  persistAttemptLogs(
    { status: 200, tokens: { input: 1, output: 2 } },
    baseCtx({
      pendingRequestId: id,
      videoBridgeLogRedaction: [
        {
          container: "messages",
          messageIndex: 1,
          partIndex: 1,
          fullText: FULL_TEXT,
          redactedText: PLACEHOLDER_TEXT,
        },
      ],
    })
  );
  const row = await pollForCallLog(id);
  assert.ok(row, "call log row should be persisted");
  const persistedText = persistedPartText(row.requestBody);
  assert.equal(persistedText, PLACEHOLDER_TEXT);
  assert.ok(!persistedText.includes(SECRET), "persisted log must not contain the raw transcript");
  assert.equal(
    JSON.stringify(row.requestBody).includes(SECRET),
    false,
    "raw transcript must not appear anywhere in the persisted requestBody"
  );
});

test("#12150 P2 surface 2: persistAttemptLogs marks the call_logs row video_content_removed=1 when ctx.videoContentRemoved is true", async () => {
  // The continuation fail-closed (resolvePreviousResponseState) depends on this
  // marker being written for any request whose stored client snapshot had its
  // video transcript redacted. This proves the ctx.videoContentRemoved signal
  // reaches the persisted row; the row is the exact thing the continuation store
  // reads back.
  const id = "video-marker-1";
  persistAttemptLogs(
    { status: 200, tokens: { input: 1, output: 2 } },
    baseCtx({ pendingRequestId: id, videoContentRemoved: true })
  );
  const row = await pollForCallLog(id);
  assert.ok(row, "call log row should be persisted");
  const marker = coreDb
    .getDbInstance()
    .prepare("SELECT video_content_removed FROM call_logs WHERE id = ?")
    .get(id) as { video_content_removed: number };
  assert.equal(marker.video_content_removed, 1);
});

test("#12150 P2 surface 2: the marker defaults to 0 for an ordinary (non-video) request", async () => {
  const id = "video-marker-control-1";
  persistAttemptLogs(
    { status: 200, tokens: { input: 1, output: 2 } },
    baseCtx({ pendingRequestId: id })
  );
  const row = await pollForCallLog(id);
  assert.ok(row);
  const marker = coreDb
    .getDbInstance()
    .prepare("SELECT video_content_removed FROM call_logs WHERE id = ?")
    .get(id) as { video_content_removed: number };
  assert.equal(marker.video_content_removed, 0);
});

test("control: without a redaction map the persisted requestBody keeps the original text (model path untouched)", async () => {
  const id = "video-control-1";
  persistAttemptLogs(
    { status: 200, tokens: { input: 1, output: 2 } },
    baseCtx({ pendingRequestId: id })
  );
  const row = await pollForCallLog(id);
  assert.ok(row);
  const persistedText = persistedPartText(row.requestBody);
  assert.ok(
    persistedText.includes(SECRET),
    "control call (no redaction map) must keep the raw transcript text"
  );
});

test("the caller's body object is never mutated by the redaction", async () => {
  const id = "video-nomutate-1";
  const body = videoBody();
  const snapshotBefore = JSON.parse(JSON.stringify(body));
  persistAttemptLogs(
    { status: 200 },
    baseCtx({
      pendingRequestId: id,
      body,
      videoBridgeLogRedaction: [
        {
          container: "messages",
          messageIndex: 1,
          partIndex: 1,
          fullText: FULL_TEXT,
          redactedText: PLACEHOLDER_TEXT,
        },
      ],
    })
  );
  await pollForCallLog(id);
  assert.deepEqual(
    body,
    snapshotBefore,
    "ctx.body must be byte-identical after persistAttemptLogs runs"
  );
});

test("Scenario A (adversarial review): a message prepended AFTER the guardrail built the redaction map does not leak the transcript, and the prepended message is untouched", async () => {
  const id = "video-scenario-a-1";

  // The body exactly as the video-bridge guardrail saw it when it computed
  // the redaction map: a single user message, no system message yet — this
  // is precisely the shape that makes injectSystemPrompt's "no existing
  // system message" branch (open-sse/services/systemPrompt.ts) fire.
  const userMessageWithVideo = {
    role: "user",
    content: [
      { type: "text", text: "look at this video" },
      { type: "text", text: FULL_TEXT },
    ],
  };
  // The map the guardrail built, correct AT THAT MOMENT: the video part was
  // messages[0].content[1].
  const redactionMap = [
    {
      container: "messages" as const,
      messageIndex: 0,
      partIndex: 1,
      fullText: FULL_TEXT,
      redactedText: PLACEHOLDER_TEXT,
    },
  ];

  // Real production shape: AFTER the guardrail ran, injectSystemPrompt found
  // no existing system/developer message and unshifted a brand-new one —
  // `result.messages = [{ role: "system", content: combined }, ...result.messages]`
  // — shifting the video message from index 0 to index 1. The map above is
  // now stale by the time persistAttemptLogs serializes the log: a purely
  // positional lookup at (messageIndex: 0, partIndex: 1) would land on this
  // new system message instead.
  const bodyAfterSystemPromptInjection = {
    messages: [{ role: "system", content: "You are a helpful assistant." }, userMessageWithVideo],
  };

  persistAttemptLogs(
    { status: 200 },
    baseCtx({
      pendingRequestId: id,
      body: bodyAfterSystemPromptInjection,
      videoBridgeLogRedaction: redactionMap,
    })
  );

  const row = await pollForCallLog(id);
  assert.ok(row, "call log row should be persisted");
  const persisted = row.requestBody as {
    messages: Array<{ role: string; content: unknown }>;
  };

  // (A) the leak: the video part, now shifted to index 1, must still be
  // found and redacted by content, not silently skipped.
  const shiftedContent = persisted.messages[1].content as Array<{ text: string }>;
  assert.equal(
    shiftedContent[1].text,
    PLACEHOLDER_TEXT,
    "the shifted video part must still be redacted despite the stale positional map"
  );
  assert.ok(
    !shiftedContent[1].text.includes(SECRET),
    "the shifted video part must not leak the raw transcript"
  );
  assert.equal(JSON.stringify(persisted).includes(SECRET), false);

  // (B) the corruption: the newly prepended system message — which a
  // positional lookup at the stale index would have landed on — must be
  // completely untouched.
  assert.equal(
    persisted.messages[0].content,
    "You are a helpful assistant.",
    "the prepended system message must be untouched"
  );
});

// #12150 P2 surface 1 (the dominant transcript-retention leak): the RAW client-request
// snapshot passed to reqLogger.logClientRawRequest (open-sse/handlers/chatCore.ts's
// "0. Log client raw request" step) is a DIFFERENT sink from persistAttemptLogs above —
// it is captured before the guardrail chain even runs, so it carries the client's raw
// `transcript`/`audioTranscript` FIELDS on a structured video part, not a flattened
// description string. Importing the real chatCore.ts here would pull the full
// request-pipeline dependency graph (executors, providers, combo routing, DB-backed
// settings, ...) into the test just to reach one guarded call a few hundred lines into
// a 5900+ line handler, for no additional proof beyond what's below — so this calls the
// REAL exported `logClientRawRequestRedacted` (the exact function chatCore.ts's call site
// invokes, post file-size-refactor) against a fake logClientRawRequest. The pure redaction
// helper itself has its own thorough suite in
// tests/unit/guardrails/videoBridgeSnapshotRedaction.test.ts.
function fakeReqLogger() {
  const calls: unknown[] = [];
  return {
    calls,
    logClientRawRequest(_endpoint: unknown, body: unknown, _headers?: unknown) {
      calls.push(body);
    },
  };
}

test("surface 2 (raw snapshot): the fake logClientRawRequest receives a redacted snapshot only when videoBridgeObserved is true", () => {
  const rawBody = {
    model: "openai/gpt-x",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "look at this video" },
          {
            type: "input_video",
            video_url: "https://example.com/clip.mp4",
            transcript: { cues: [{ text: SECRET, startSeconds: 0, endSeconds: 2 }] },
          },
        ],
      },
    ],
  };
  const clientRawRequest = { endpoint: "/v1/chat/completions", body: rawBody, headers: {} };

  const observedLogger = fakeReqLogger();
  logClientRawRequestRedacted(observedLogger, clientRawRequest, true);
  const observedSnapshot = observedLogger.calls[0];
  assert.ok(
    !JSON.stringify(observedSnapshot).includes(SECRET),
    "an observed request must not log the raw transcript"
  );
  assert.notEqual(
    observedSnapshot,
    rawBody,
    "the observed path must log a redacted CLONE, not the original reference"
  );
  assert.ok(
    JSON.stringify(rawBody).includes(SECRET),
    "clientRawRequest.body itself must stay untouched for every other consumer (translation/dispatch)"
  );

  const nonObservedLogger = fakeReqLogger();
  logClientRawRequestRedacted(nonObservedLogger, clientRawRequest, false);
  assert.equal(
    nonObservedLogger.calls[0],
    rawBody,
    "the non-observed path must log the exact same object reference — byte-identical, no clone"
  );

  const skippedLogger = fakeReqLogger();
  logClientRawRequestRedacted(skippedLogger, null, true);
  assert.equal(
    skippedLogger.calls.length,
    0,
    "a missing clientRawRequest must not call logClientRawRequest at all (mirrors the old if-guard)"
  );
});
