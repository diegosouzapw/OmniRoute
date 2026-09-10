import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// OmniRoute-native `previous_response_id` virtualization: resolvePreviousResponseState
// resolves a response id back to the full input/output a prior call produced by
// reading the already-persisted call-log artifact, so a later request can be
// reconstructed to full history server-side without duplicating conversation
// content into a second store.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-responses-continuation-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const store = await import("../../src/lib/db/responsesContinuationStore.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function insertCallLog(row: {
  id: string;
  responseId: string | null;
  apiKeyId: string | null;
  detailState: string;
  artifactRelPath: string | null;
  videoContentRemoved?: 0 | 1;
}) {
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO call_logs
      (id, timestamp, method, path, status, model, provider, account, duration,
       tokens_in, tokens_out, api_key_id, detail_state, artifact_relpath, response_id,
       video_content_removed)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    row.id,
    new Date().toISOString(),
    "POST",
    "/v1/responses",
    200,
    "gpt-5.4-pro",
    "openai",
    "acc1",
    100,
    10,
    20,
    row.apiKeyId,
    row.detailState,
    row.artifactRelPath,
    row.responseId,
    row.videoContentRemoved ?? 0
  );
}

function writeArtifact(relPath: string, pipeline: Record<string, unknown>) {
  const absPath = path.join(TEST_DATA_DIR, "call_logs", relPath);
  fs.mkdirSync(path.dirname(absPath), { recursive: true });
  fs.writeFileSync(
    absPath,
    JSON.stringify({
      schemaVersion: 5,
      summary: {},
      requestBody: null,
      responseBody: null,
      error: null,
      pipeline,
    })
  );
}

test("resolvePreviousResponseState reconstructs input/output from the call-log artifact", () => {
  insertCallLog({
    id: "log-1",
    responseId: "resp_abc",
    apiKeyId: "key-1",
    detailState: "ready",
    artifactRelPath: "2026-01-01/log-1.json",
  });
  writeArtifact("2026-01-01/log-1.json", {
    clientRawRequest: { body: { input: [{ type: "message", role: "user", content: "hi" }] } },
    providerRequest: { body: { input: [{ type: "message", role: "user", content: "hi" }] } },
    clientResponse: {
      id: "resp_abc",
      output: [{ type: "message", role: "assistant", content: "hello" }],
    },
  });

  const result = store.resolvePreviousResponseState("resp_abc", "key-1");
  assert.deepEqual(result, {
    input: [{ type: "message", role: "user", content: "hi" }],
    output: [{ type: "message", role: "assistant", content: "hello" }],
  });
});

test("resolvePreviousResponseState reads output from a wrapped (streaming) clientResponse shape", () => {
  // A streaming reply's clientResponse is clientPayloadCollector.build()'s output,
  // which always nests the caller-supplied summary under `.summary` (see
  // createStructuredSSECollector in streamPayloadCollector.ts) rather than
  // carrying `output` at the top level like a non-streaming reply does. This
  // must resolve exactly like the unwrapped shape above -- it was the actual
  // cause of previous_response_id continuation always failing for a streaming
  // Responses-API passthrough connection (fixed alongside the clientPayload
  // builder gap in open-sse/utils/stream.ts).
  insertCallLog({
    id: "log-1-streamed",
    responseId: "resp_streamed",
    apiKeyId: "key-1",
    detailState: "ready",
    artifactRelPath: "2026-01-01/log-1-streamed.json",
  });
  writeArtifact("2026-01-01/log-1-streamed.json", {
    clientRawRequest: { body: { input: [{ type: "message", role: "user", content: "hi" }] } },
    providerRequest: { body: { input: [{ type: "message", role: "user", content: "hi" }] } },
    clientResponse: {
      _streamed: true,
      _format: "sse-json",
      _eventCount: 1,
      summary: {
        id: "resp_streamed",
        object: "response",
        output: [{ type: "message", role: "assistant", content: "hello" }],
      },
    },
  });

  const result = store.resolvePreviousResponseState("resp_streamed", "key-1");
  assert.deepEqual(result, {
    input: [{ type: "message", role: "user", content: "hi" }],
    output: [{ type: "message", role: "assistant", content: "hello" }],
  });
});

test("resolvePreviousResponseState chains off effectiveInput, not the pre-reconstruction clientRawRequest.body", () => {
  // Live incident (2026-09-03): clientRawRequest.body is deliberately captured
  // BEFORE chat.ts's own previous_response_id reconstruction runs
  // (captureDeferredClientRawBody's whole point -- it must reflect the raw
  // client bytes for audit/guardrail purposes, not what OmniRoute rewrote the
  // request into). For a turn that was ITSELF a continuation, body.input is
  // just the client's own trimmed delta -- a handful of tool-call items with
  // no leading system/user message. Chaining a LATER continuation off that
  // instead of the request's real effective input compounds into a
  // progressively truncated reconstruction, which the upstream provider then
  // rejects outright ("Please ensure that function call turn comes
  // immediately after a user turn..."). effectiveInput is captured AFTER
  // reconstruction and must be what this function chains off.
  insertCallLog({
    id: "log-continued-turn",
    responseId: "resp_continued",
    apiKeyId: "key-1",
    detailState: "ready",
    artifactRelPath: "2026-01-01/log-continued-turn.json",
  });
  writeArtifact("2026-01-01/log-continued-turn.json", {
    clientRawRequest: {
      // What the client actually sent this turn: just the new delta, relying
      // on OmniRoute to have reconstructed full history server-side.
      body: {
        input: [{ type: "function_call_output", call_id: "call_1", output: "42" }],
      },
      // What this request ACTUALLY dispatched with, after chat.ts's own
      // reconstruction expanded the prior turn's stored input+output back in.
      effectiveInput: [
        { type: "message", role: "user", content: "hi" },
        { type: "message", role: "assistant", content: "calling a tool" },
        { type: "function_call", call_id: "call_1", name: "get_answer", arguments: "{}" },
        { type: "function_call_output", call_id: "call_1", output: "42" },
      ],
    },
    providerRequest: { body: { input: [] } },
    clientResponse: {
      id: "resp_continued",
      output: [{ type: "message", role: "assistant", content: "the answer is 42" }],
    },
  });

  const result = store.resolvePreviousResponseState("resp_continued", "key-1");
  assert.deepEqual(result, {
    input: [
      { type: "message", role: "user", content: "hi" },
      { type: "message", role: "assistant", content: "calling a tool" },
      { type: "function_call", call_id: "call_1", name: "get_answer", arguments: "{}" },
      { type: "function_call_output", call_id: "call_1", output: "42" },
    ],
    output: [{ type: "message", role: "assistant", content: "the answer is 42" }],
  });
});

test("resolvePreviousResponseState falls back to clientRawRequest.body.input when effectiveInput is absent (pre-fix artifacts)", () => {
  insertCallLog({
    id: "log-legacy-no-effective-input",
    responseId: "resp_legacy",
    apiKeyId: "key-1",
    detailState: "ready",
    artifactRelPath: "2026-01-01/log-legacy-no-effective-input.json",
  });
  writeArtifact("2026-01-01/log-legacy-no-effective-input.json", {
    clientRawRequest: { body: { input: [{ type: "message", role: "user", content: "hi" }] } },
    providerRequest: { body: { input: [{ type: "message", role: "user", content: "hi" }] } },
    clientResponse: {
      id: "resp_legacy",
      output: [{ type: "message", role: "assistant", content: "hello" }],
    },
  });

  const result = store.resolvePreviousResponseState("resp_legacy", "key-1");
  assert.deepEqual(result, {
    input: [{ type: "message", role: "user", content: "hi" }],
    output: [{ type: "message", role: "assistant", content: "hello" }],
  });
});

test("resolvePreviousResponseState returns null for an unknown response id", () => {
  const result = store.resolvePreviousResponseState("resp_does_not_exist", "key-1");
  assert.equal(result, null);
});

test("resolvePreviousResponseState never crosses tenants (scoped by api_key_id)", () => {
  insertCallLog({
    id: "log-2",
    responseId: "resp_tenant_a",
    apiKeyId: "key-a",
    detailState: "ready",
    artifactRelPath: "2026-01-01/log-2.json",
  });
  writeArtifact("2026-01-01/log-2.json", {
    clientRawRequest: { body: { input: [{ role: "user", content: "secret" }] } },
    providerRequest: { body: { input: [{ role: "user", content: "secret" }] } },
    clientResponse: { id: "resp_tenant_a", output: [{ role: "assistant", content: "reply" }] },
  });

  assert.equal(store.resolvePreviousResponseState("resp_tenant_a", "key-b"), null);
  assert.equal(store.resolvePreviousResponseState("resp_tenant_a", null), null);
  assert.notEqual(store.resolvePreviousResponseState("resp_tenant_a", "key-a"), null);
});

test("resolvePreviousResponseState returns null when the artifact is missing on disk", () => {
  insertCallLog({
    id: "log-3",
    responseId: "resp_missing_file",
    apiKeyId: "key-1",
    detailState: "ready",
    artifactRelPath: "2026-01-01/does-not-exist.json",
  });

  assert.equal(store.resolvePreviousResponseState("resp_missing_file", "key-1"), null);
});

test("resolvePreviousResponseState fails closed when the pipeline payload was size-limit-omitted", () => {
  insertCallLog({
    id: "log-4",
    responseId: "resp_omitted",
    apiKeyId: "key-1",
    detailState: "ready",
    artifactRelPath: "2026-01-01/log-4.json",
  });
  // A size-limit-omitted payload is replaced with a placeholder string, not
  // an object -- resolvePreviousResponseState must never try to reconstruct
  // from it and silently drop history.
  writeArtifact("2026-01-01/log-4.json", {
    clientRawRequest: { body: "[omitted: call log artifact size limit exceeded]" },
    clientResponse: { id: "resp_omitted", output: [] },
  });

  assert.equal(store.resolvePreviousResponseState("resp_omitted", "key-1"), null);
});

test("resolvePreviousResponseState resolves input from clientRawRequest when providerRequest was translated to a different upstream wire shape", () => {
  // Real shape from a live auto-routed free-tier connection: OmniRoute
  // translates the client's Responses-API request into Chat Completions
  // (`messages`, no `input` at all) before forwarding upstream. Reading
  // `input` from providerRequest.body made this permanently unresolvable --
  // previous_response_not_found on every attempt -- for any connection where
  // the selected upstream isn't itself a native Responses-API passthrough.
  // The client's own request is always Responses-API shaped (this store only
  // fires for sourceFormat === OPENAI_RESPONSES, see chat.ts), so
  // clientRawRequest is the correct source regardless of upstream shape.
  insertCallLog({
    id: "log-6",
    responseId: "resp_gen-translate-mode",
    apiKeyId: "key-1",
    detailState: "ready",
    artifactRelPath: "2026-01-01/log-6.json",
  });
  writeArtifact("2026-01-01/log-6.json", {
    clientRawRequest: { body: { input: [{ type: "message", role: "user", content: "hi" }] } },
    providerRequest: {
      body: { model: "laguna-s-2.1-free", messages: [{ role: "user", content: "hi" }] },
    },
    clientResponse: {
      summary: {
        id: "resp_gen-translate-mode",
        output: [{ type: "message", role: "assistant", content: "hello" }],
      },
    },
  });

  const result = store.resolvePreviousResponseState("resp_gen-translate-mode", "key-1");
  assert.deepEqual(result, {
    input: [{ type: "message", role: "user", content: "hi" }],
    output: [{ type: "message", role: "assistant", content: "hello" }],
  });
});

test("resolvePreviousResponseState fails closed when the stored input array was log-truncated", () => {
  // Real production shape: cloneBoundedChatLogPayload (chatCore/logTruncation.ts)
  // and cloneBoundedForLog (utils/requestLogger.ts) both prepend an
  // `_omniroute_truncated_array` sentinel in place of the items they dropped
  // once a logged array exceeds their tail-item cap (~24 items) -- routine
  // for any conversation that's been going a while, not an edge case. Reading
  // that sentinel back as a real Responses-API item and forwarding it upstream
  // produced a live 400: "input item type 'missing' cannot be represented in
  // Chat Completions" -- worse than the plain cache-miss this function is
  // otherwise designed to fail into.
  insertCallLog({
    id: "log-7",
    responseId: "resp_gen-truncated-history",
    apiKeyId: "key-1",
    detailState: "ready",
    artifactRelPath: "2026-01-01/log-7.json",
  });
  writeArtifact("2026-01-01/log-7.json", {
    clientRawRequest: {
      body: {
        input: [
          { _omniroute_truncated_array: true, originalLength: 26, retainedTailItems: 24 },
          { type: "function_call_output", call_id: "call_1", output: "ok" },
        ],
      },
    },
    providerRequest: { body: { input: [] } },
    clientResponse: {
      summary: {
        id: "resp_gen-truncated-history",
        output: [{ type: "message", role: "assistant", content: "hello" }],
      },
    },
  });

  assert.equal(store.resolvePreviousResponseState("resp_gen-truncated-history", "key-1"), null);
});

test("resolvePreviousResponseState fails closed when the streaming collector truncated the response", () => {
  // Live incident (2026-09-02): a huge/reasoning-heavy response blew past
  // createStructuredSSECollector's own event-count cap mid-stream. The
  // stored clientResponse then carries `_truncated: true` and
  // `summary.status: "in_progress"` (never reached "completed") with a
  // genuinely empty `summary.output` -- not a bounded array with an
  // `_omniroute_truncated_array` sentinel (that only covers an array capped
  // mid-array, not a collector that stopped before populating output at
  // all). The empty array previously passed every check here and got
  // merged into the next turn's request as this response's entire
  // contribution -- reconstructing to zero real messages, which the
  // upstream provider then rejected outright ("Input required: specify
  // prompt or messages"), breaking the conversation. Measured live: ~22%
  // of a sample of recent successful Ping responses carried this flag.
  insertCallLog({
    id: "log-8",
    responseId: "resp_gen-collector-truncated",
    apiKeyId: "key-1",
    detailState: "ready",
    artifactRelPath: "2026-01-01/log-8.json",
  });
  writeArtifact("2026-01-01/log-8.json", {
    clientRawRequest: { body: { input: [{ type: "message", role: "user", content: "hi" }] } },
    providerRequest: { body: { input: [{ type: "message", role: "user", content: "hi" }] } },
    clientResponse: {
      _streamed: true,
      _truncated: true,
      _droppedEvents: 24,
      summary: { id: "resp_gen-collector-truncated", status: "in_progress", output: [] },
    },
  });

  assert.equal(store.resolvePreviousResponseState("resp_gen-collector-truncated", "key-1"), null);
});

test("resolvePreviousResponseState fails closed on an empty output array even without the _truncated flag", () => {
  // Belt-and-suspenders for the same failure class when the collector
  // truncated without ever setting `_truncated` (or for a non-streaming
  // response that somehow logged zero output items): a response the
  // client actually received as real/successful always has at least one
  // output item, so an empty array here is never a legitimate prior turn
  // to reconstruct from.
  insertCallLog({
    id: "log-9",
    responseId: "resp_gen-empty-output",
    apiKeyId: "key-1",
    detailState: "ready",
    artifactRelPath: "2026-01-01/log-9.json",
  });
  writeArtifact("2026-01-01/log-9.json", {
    clientRawRequest: { body: { input: [{ type: "message", role: "user", content: "hi" }] } },
    providerRequest: { body: { input: [{ type: "message", role: "user", content: "hi" }] } },
    clientResponse: { id: "resp_gen-empty-output", output: [] },
  });

  assert.equal(store.resolvePreviousResponseState("resp_gen-empty-output", "key-1"), null);
});

test("resolvePreviousResponseState fails closed when the row had video content removed (#12150 P2)", () => {
  // #12150 P2 surface 2: the persisted clientRawRequest snapshot had its video
  // transcript cues structurally redacted to [redacted-video-transcript] before
  // storage (videoBridgeSnapshotRedaction). The stored input therefore no longer
  // carries the client's real cue text -- reconstructing a continuation off it
  // would forward the placeholder upstream as if it were genuine history. When the
  // owning row is marked video_content_removed=1 this must fail closed (return
  // null) so the client resends full history, exactly like previous_response_not_found,
  // even though the artifact itself is otherwise a perfectly resolvable 'ready' row.
  insertCallLog({
    id: "log-video-removed",
    responseId: "resp_video_removed",
    apiKeyId: "key-1",
    detailState: "ready",
    artifactRelPath: "2026-01-01/log-video-removed.json",
    videoContentRemoved: 1,
  });
  writeArtifact("2026-01-01/log-video-removed.json", {
    clientRawRequest: {
      body: {
        input: [{ type: "message", role: "user", content: "[redacted-video-transcript]" }],
      },
    },
    providerRequest: { body: { input: [] } },
    clientResponse: {
      id: "resp_video_removed",
      output: [{ type: "message", role: "assistant", content: "hello" }],
    },
  });

  assert.equal(store.resolvePreviousResponseState("resp_video_removed", "key-1"), null);
});

test("resolvePreviousResponseState still resolves a normal row (video_content_removed=0)", () => {
  // Guard the fail-closed above does not over-fire: an ordinary row (the default
  // 0) resolves exactly as before.
  insertCallLog({
    id: "log-video-notremoved",
    responseId: "resp_video_notremoved",
    apiKeyId: "key-1",
    detailState: "ready",
    artifactRelPath: "2026-01-01/log-video-notremoved.json",
    videoContentRemoved: 0,
  });
  writeArtifact("2026-01-01/log-video-notremoved.json", {
    clientRawRequest: { body: { input: [{ type: "message", role: "user", content: "hi" }] } },
    providerRequest: { body: { input: [{ type: "message", role: "user", content: "hi" }] } },
    clientResponse: {
      id: "resp_video_notremoved",
      output: [{ type: "message", role: "assistant", content: "hello" }],
    },
  });

  assert.deepEqual(store.resolvePreviousResponseState("resp_video_notremoved", "key-1"), {
    input: [{ type: "message", role: "user", content: "hi" }],
    output: [{ type: "message", role: "assistant", content: "hello" }],
  });
});

test("resolvePreviousResponseState returns null when detail logging was never captured for this row", () => {
  insertCallLog({
    id: "log-5",
    responseId: "resp_no_detail",
    apiKeyId: "key-1",
    detailState: "none",
    artifactRelPath: null,
  });

  assert.equal(store.resolvePreviousResponseState("resp_no_detail", "key-1"), null);
});
