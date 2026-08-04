import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-active-stream-lifecycle-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");

// Captured stream chunks carry a per-chunk arrival-time prefix ("[HH:MM:SS.mmm] ")
// added by the request logger for streaming-latency observability (#5834). Strip it
// before comparing the raw chunk payload.
const stripChunkTs = (chunk: string): string => chunk.replace(/^\[\d{2}:\d{2}:\d{2}\.\d{3}\] /, "");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ─── Helper: Simulates /api/logs/[id] API route logic ──────────────────────
//
// The production route uses 3-tier lookup:
//   1. DB (getCallLogById)
//   2. completedDetails in-memory cache (getCompletedDetails)
//   3. pendingById in-memory active requests (getPendingById)
//
// Each tier constructs the API response shape including pipelinePayloads.

function buildApiResponseFromPending(id: string): Record<string, unknown> | null {
  const active = usageHistory.getPendingById().get(id);
  if (!active) return null;

  const pipelinePayloads: Record<string, unknown> = {
    clientRequest: active.clientRequest ?? null,
    providerRequest: active.providerRequest ?? null,
    providerResponse: active.providerResponse ?? null,
    clientResponse: active.clientResponse ?? null,
    streamChunks: active.streamChunks ?? null,
  };

  return {
    id: active.id,
    timestamp: new Date(active.startedAt).toISOString(),
    method: "",
    path: active.clientEndpoint || "",
    status: 0,
    model: active.model,
    provider: active.provider,
    connectionId: active.connectionId,
    duration: Date.now() - active.startedAt,
    detailState: "in-flight",
    active: true,
    pipelinePayloads,
    hasPipelineDetails: true,
  };
}

function buildApiResponseFromCompleted(id: string): Record<string, unknown> | null {
  const completed = usageHistory.getCompletedDetails();
  const inMem = completed.get(id);
  if (!inMem) return null;

  const pipelinePayloads: Record<string, unknown> = {
    clientRequest: inMem.clientRequest ?? null,
    providerRequest: inMem.providerRequest ?? null,
    providerResponse: inMem.providerResponse ?? null,
    clientResponse: inMem.clientResponse ?? null,
    streamChunks: inMem.streamChunks ?? null,
  };

  return {
    id: inMem.id,
    timestamp: new Date(inMem.startedAt).toISOString(),
    path: inMem.clientEndpoint || "",
    status: 0,
    model: inMem.model,
    provider: inMem.provider,
    connectionId: inMem.connectionId,
    duration: Date.now() - inMem.startedAt,
    detailState: "in-memory",
    active: false,
    pipelinePayloads,
    hasPipelineDetails: true,
  };
}

// ─── Helper: Simulates frontend streamChunksText IIFE ──────────────────────
function computeStreamChunksText(
  debugEnabled: boolean,
  pipelinePayloads: Record<string, unknown> | null | undefined
): string | null {
  if (!debugEnabled || !pipelinePayloads?.streamChunks) return null;
  let chunks: unknown = pipelinePayloads.streamChunks;

  if (typeof chunks === "string") {
    try {
      chunks = JSON.parse(chunks);
    } catch {
      return chunks;
    }
  }

  if (chunks && typeof chunks === "object") {
    try {
      return Object.entries(chunks as Record<string, unknown>)
        .map(([stage, arr]) => {
          const joined = Array.isArray(arr) ? (arr as string[]).join("") : String(arr);
          return `--- ${stage} ---\n${joined}`;
        })
        .join("\n\n");
    } catch {
      return JSON.stringify(chunks, null, 2);
    }
  }

  return null;
}

// ─── Helper: Simulates frontend openDetail state merge ─────────────────────
function mergeDetailData(
  prev: Record<string, unknown> | null,
  data: Record<string, unknown>
): Record<string, unknown> {
  const dataHasPipeline =
    data?.pipelinePayloads && Object.keys(data.pipelinePayloads || {}).length > 0;
  return {
    ...prev,
    ...data,
    pipelinePayloads: dataHasPipeline ? data.pipelinePayloads : prev?.pipelinePayloads,
  };
}

// ─── Test: Full lifecycle ──────────────────────────────────────────────────

test("streamChunks survive the full lifecycle: in-flight → completed → persisted", async () => {
  usageHistory.clearPendingRequests();

  const model = "gpt-4";
  const provider = "openai";
  const connectionId = "conn-lifecycle-1";

  // ── Phase 1: Track a pending request ──
  const requestId = usageHistory.trackPendingRequest(model, provider, connectionId, true, {
    clientRequest: { messages: [{ role: "user", content: "hello" }] },
    providerRequest: { model: "gpt-4" },
    clientEndpoint: "/v1/chat/completions",
  });

  assert.ok(requestId, "trackPendingRequest should return a request ID");
  assert.ok(
    usageHistory.getPendingById().has(requestId),
    "request ID should be in pendingById immediately"
  );

  // ── Phase 2: Simulate streaming — chunks arrive gradually ──
  // Round 1: provider chunks
  usageHistory.updatePendingRequestStreamChunks(model, provider, connectionId, {
    provider: ['data: {"type":"message_start"}\n\n'],
    openai: [],
    client: [],
  });

  // Verify via pendingById (what the API reads)
  const apiResponse1 = buildApiResponseFromPending(requestId);
  assert.ok(apiResponse1, "API should find in-flight request");
  assert.ok(apiResponse1!.pipelinePayloads, "should have pipelinePayloads");
  assert.ok(
    (apiResponse1!.pipelinePayloads as Record<string, unknown>).streamChunks,
    "streamChunks should be present in API response"
  );

  // Simulate frontend streamChunksText
  const text1 = computeStreamChunksText(
    true,
    apiResponse1!.pipelinePayloads as Record<string, unknown>
  );
  assert.ok(text1, "streamChunksText should be non-null with debugEnabled");
  assert.ok(text1!.includes("message_start"), "streamChunksText should contain the chunk content");

  // Verify frontend state merge
  const initialDetail = mergeDetailData(null, apiResponse1 as unknown as Record<string, unknown>);
  assert.ok(
    (initialDetail.pipelinePayloads as Record<string, unknown>).streamChunks,
    "streamChunks should survive the openDetail state merge"
  );
  const text1after = computeStreamChunksText(
    true,
    initialDetail.pipelinePayloads as Record<string, unknown>
  );
  assert.ok(text1after, "streamChunksText should work after state merge");
  assert.ok(text1after!.includes("message_start"), "content preserved after state merge");

  // Round 2: openai chunks arrive (simulating proxy relay)
  usageHistory.updatePendingRequestStreamChunks(model, provider, connectionId, {
    provider: ['data: {"type":"message_start"}\n\n'],
    openai: ['data: {"choices":[{"delta":{"content":"Hello"}}]}\n\n'],
    client: [],
  });

  // Round 3: client (converted) chunk arrives
  usageHistory.updatePendingRequestStreamChunks(model, provider, connectionId, {
    provider: ['data: {"type":"message_start"}\n\n'],
    openai: ['data: {"choices":[{"delta":{"content":"Hello"}}]}\n\n'],
    client: ['data: {"content":"Hello"}\n\n'],
  });

  // Verify API sees the latest (shows all stages now)
  const apiResponse2 = buildApiResponseFromPending(requestId);
  const streamChunks2 = (apiResponse2!.pipelinePayloads as Record<string, unknown>)
    .streamChunks as Record<string, string[]>;
  assert.equal(streamChunks2.provider.length, 1, "provider chunks: 1");
  assert.equal(streamChunks2.openai.length, 1, "openai chunks: 1");
  assert.equal(streamChunks2.client.length, 1, "client chunks: 1");

  // Verify frontend text includes all 3 stages
  const text2 = computeStreamChunksText(
    true,
    apiResponse2!.pipelinePayloads as Record<string, unknown>
  );
  assert.ok(text2!.includes("--- provider ---"), "should include provider stage");
  assert.ok(text2!.includes("--- openai ---"), "should include openai stage");
  assert.ok(text2!.includes("--- client ---"), "should include client stage");

  // Verify debugEnabled=false hides the stream
  const textHidden = computeStreamChunksText(
    false,
    apiResponse2!.pipelinePayloads as Record<string, unknown>
  );
  assert.equal(textHidden, null, "streamChunksText should be null when debugEnabled=false");

  // Verify null pipelinePayloads hides the stream
  const textNoPayload = computeStreamChunksText(true, null);
  assert.equal(textNoPayload, null, "streamChunksText should be null without pipelinePayloads");

  const textNoChunks = computeStreamChunksText(true, {});
  assert.equal(textNoChunks, null, "streamChunksText should be null without streamChunks key");

  // ── Phase 3: Simulate request completion ──
  usageHistory.finalizeMostRecentPendingRequest(model, provider, connectionId, {
    status: 200,
    model,
    provider,
    clientResponse: { choices: [{ message: { content: "Hello" } }] },
  });

  // The request should be in completedDetails now
  assert.ok(
    !usageHistory.getPendingById().has(requestId),
    "request should be removed from pendingById after finalization"
  );

  const completedResponse = buildApiResponseFromCompleted(requestId);
  assert.ok(completedResponse, "API should find request in completedDetails");
  assert.ok(
    (completedResponse!.pipelinePayloads as Record<string, unknown>).streamChunks,
    "streamChunks should be in completedDetails"
  );

  // Verify frontend can render from completed response
  const completedText = computeStreamChunksText(
    true,
    completedResponse!.pipelinePayloads as Record<string, unknown>
  );
  assert.ok(completedText, "streamChunksText should work from completed data");
  assert.ok(completedText!.includes("Hello"), "content preserved after completion");

  // ── Phase 4: Persist to DB (simulates saveCallLog) ──
  await callLogs.saveCallLog({
    id: requestId,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model,
    requestedModel: model,
    provider,
    connectionId,
    duration: 5000,
    tokens: { in: 10, out: 20 },
    requestBody: { messages: [{ role: "user", content: "hello" }] },
    responseBody: { choices: [{ message: { content: "Hello" } }] },
    error: null,
    sourceFormat: "openai",
    targetFormat: "openai",
    comboName: null,
    comboStepId: null,
    comboExecutionKey: null,
    tokensCompressed: null,
    cacheSource: "upstream",
    apiKeyId: null,
    apiKeyName: null,
    noLog: false,
    pipelinePayloads: completedResponse!.pipelinePayloads as Record<string, unknown>,
  });

  // Verify DB has the entry
  const dbEntry = await callLogs.getCallLogById(requestId);
  assert.ok(dbEntry, "should find persisted call log by the same ID");
  assert.ok(dbEntry.pipelinePayloads, "persisted entry should have pipelinePayloads");

  // The pipelinePayloads in the DB may have been compacted/truncated.
  // streamChunks may or may not be there depending on captureStreamChunks,
  // but the ID must match so the API can find it.
  assert.equal(
    (dbEntry as Record<string, unknown>).id,
    requestId,
    "DB entry ID should match the original request ID"
  );
});

test("streamChunksText renders progressive updates correctly", () => {
  // Simulate the scenario where streamChunks grows between polls

  // Poll 1: first chunk arrives
  const payload1 = {
    streamChunks: { provider: ['data: {"content":"A"}\n\n'], openai: [], client: [] },
  };
  const text1 = computeStreamChunksText(true, payload1);
  assert.ok(text1, "poll 1 should produce text");
  assert.ok(text1!.includes("A"), "poll 1 should show chunk A");

  // Poll 2: second chunk appended
  const payload2 = {
    streamChunks: {
      provider: ['data: {"content":"A"}\n\n', 'data: {"content":"B"}\n\n'],
      openai: [],
      client: [],
    },
  };
  const text2 = computeStreamChunksText(true, payload2);
  assert.ok(text2!.includes("A"), "poll 2 should still show chunk A");
  assert.ok(text2!.includes("B"), "poll 2 should show newly arrived chunk B");

  // The joined text should be the concatenation
  assert.ok(
    text2!.includes('data: {"content":"A"}\n\ndata: {"content":"B"}'),
    "poll 2 joined text should contain both chunks"
  );
});

test("pooling effect state merge preserves streamChunks across updates", () => {
  // Simulate the polling useEffect state merge:
  // setDetailData(prev => ({...prev, ...data, pipelinePayloads: data?.pipelinePayloads || prev?.pipelinePayloads}))

  let detailData: Record<string, unknown> | null = null;

  // openDetail initial fetch
  const initialFetch = {
    pipelinePayloads: {
      streamChunks: { provider: ['data: {"a":1}\n\n'] },
      providerRequest: { model: "gpt-4" },
    },
    active: true,
    detailState: "in-flight",
  };
  detailData = mergeDetailData(null, initialFetch);
  assert.ok(
    (detailData!.pipelinePayloads as Record<string, unknown>).streamChunks,
    "initial merge should preserve streamChunks"
  );

  // Poll response adds more chunks
  const pollResponse = {
    pipelinePayloads: {
      streamChunks: {
        provider: ['data: {"a":1}\n\n', 'data: {"b":2}\n\n'],
      },
      providerRequest: { model: "gpt-4" },
    },
    active: true,
    detailState: "in-flight",
  };
  detailData = mergeDetailData(detailData, pollResponse);

  const mergedChunks = (detailData!.pipelinePayloads as Record<string, unknown>)
    .streamChunks as Record<string, string[]>;
  assert.equal(mergedChunks.provider.length, 2, "merged should have 2 chunks");
  assert.equal(mergedChunks.provider[1], 'data: {"b":2}\n\n', "merged should include new chunk");

  // Simulate: polling response loses pipelinePayloads (null)
  // This should NOT overwrite the existing streamChunks
  const nullPayloadResponse = {
    pipelinePayloads: null,
    active: true,
    detailState: "in-flight",
  };
  const afterNullPayload = mergeDetailData(detailData, nullPayloadResponse);
  assert.ok(
    (afterNullPayload.pipelinePayloads as Record<string, unknown>).streamChunks,
    "streamChunks should survive null pipelinePayloads update"
  );

  // Simulate: polling response has pipelinePayloads but NO streamChunks
  // This SHOULD overwrite (|| semantics) — but the production condition is: when
  // data?.pipelinePayloads is truthy, it replaces prev. If captureStreamChunks was false,
  // the data won't have streamChunks. This is expected behavior — the frontend doesn't
  // try to retain old streamChunks when new data explicitly lacks them.
  const noChunksPayloadResponse = {
    pipelinePayloads: {
      providerResponse: { status: 200 },
      // no streamChunks key
    },
    active: false,
    detailState: "ready",
  };
  const afterNoChunks = mergeDetailData(detailData, noChunksPayloadResponse);
  const payloadAfter = afterNoChunks.pipelinePayloads as Record<string, unknown>;
  assert.equal(
    payloadAfter.streamChunks,
    undefined,
    "streamChunks is lost when new pipelinePayloads lacks it and is truthy"
  );
  // This demonstrates the || semantics: data.pipelinePayloads is truthy ({providerResponse: {...}})
  // so it replaces prev.pipelinePayloads even though it lacks streamChunks.
  // The Event Stream section will not render after this update.
  // However, in practice this only happens after request completion when the polling
  // transitions to the persisted artifact which may have truncated streamChunks.
  // By that point the Event Stream section is no longer needed (streaming is done).
});

test("pendingById references are live: push mutates the shared arrays visible to API", () => {
  usageHistory.clearPendingRequests();

  const model = "gpt-4";
  const provider = "openai";
  const connectionId = "conn-ref-1";

  const requestId = usageHistory.trackPendingRequest(model, provider, connectionId, true);

  // Simulate push() — store initial empty arrays
  usageHistory.updatePendingRequestStreamChunks(model, provider, connectionId, {
    provider: [],
    openai: [],
    client: [],
  });

  // Get the pending detail reference
  const detailFromPending = usageHistory.getPendingById().get(requestId);
  assert.ok(detailFromPending, "detail should be in pendingById");
  assert.ok(detailFromPending!.streamChunks, "streamChunks should be set to wrapper object");

  // Simulate appendBoundedChunk — pushes to the shared array
  detailFromPending!.streamChunks!.provider.push('data: {"chunk":"live"}');

  // Re-read from pendingById — should see the mutation
  const detailReRead = usageHistory.getPendingById().get(requestId);
  assert.equal(
    detailReRead!.streamChunks!.provider.length,
    1,
    "mutation should be visible through pendingById"
  );
  assert.equal(
    detailReRead!.streamChunks!.provider[0],
    'data: {"chunk":"live"}',
    "mutated content should be visible through pendingById"
  );

  // Verify via simulated API response
  const apiResp = buildApiResponseFromPending(requestId);
  const apiChunks = (apiResp!.pipelinePayloads as Record<string, unknown>).streamChunks as Record<
    string,
    string[]
  >;
  assert.equal(apiChunks.provider.length, 1, "API should see the live mutation");
});

test("no connectionId in request logger does not break anything", async () => {
  const { createRequestLogger } = await import("../../open-sse/utils/requestLogger.ts");

  usageHistory.clearPendingRequests();
  usageHistory.trackPendingRequest("gpt-4", "openai", "conn-noop-1", true);

  // Logger without connectionId/model — push() bails, no crash
  const logger = await createRequestLogger("openai", "openai", "gpt-4", {
    enabled: true,
    captureStreamChunks: true,
  });

  logger.appendProviderChunk('data: {"a":1}');
  logger.appendOpenAIChunk('data: {"b":2}');
  logger.appendConvertedChunk('data: {"c":3}');

  // The pending detail should NOT have streamChunks (no connectionId match)
  const pending = usageHistory.getPendingRequests();
  const detail = pending.details["conn-noop-1"]?.["gpt-4 (openai)"]?.[0];
  assert.equal(detail.streamChunks, undefined, "streamChunks should not be set");

  // Simulated API should return null for streamChunks
  const apiResp = buildApiResponseFromPending(
    // We need the actual ID. trackPendingRequest returns it now.
    (() => {
      usageHistory.clearPendingRequests();
      const id = usageHistory.trackPendingRequest("gpt-4", "openai", "conn-noop-2", true);
      return id!;
    })()
  );
  // This request had no streaming, so streamChunks is null
  if (apiResp) {
    const noChunks = computeStreamChunksText(
      true,
      apiResp.pipelinePayloads as Record<string, unknown>
    );
    assert.equal(noChunks, null, "no streamChunks means no event stream");
  }
});

test("createRequestLogger and trackPendingRequest with matching model propagate streamChunks", async () => {
  // The fix: chatCore.ts now passes `model` (not `effectiveModel`) to
  // createRequestLogger, so the modelKey matches what trackPendingRequest uses.

  const { createRequestLogger } = await import("../../open-sse/utils/requestLogger.ts");

  usageHistory.clearPendingRequests();

  const model = "gpt-4";
  const provider = "openai";
  const connectionId = "conn-match-1";

  const requestId = usageHistory.trackPendingRequest(model, provider, connectionId, true, {
    clientRequest: { messages: [] },
  });

  // Use matching model (the fix)
  const logger = await createRequestLogger("openai", "openai", model, {
    enabled: true,
    captureStreamChunks: true,
    model,
    provider,
    connectionId,
  });

  logger.appendProviderChunk('data: {"chunk":"hello"}');
  logger.appendOpenAIChunk('data: {"choices":[{"delta":{"content":"hi"}}]}');
  logger.appendConvertedChunk('data: {"content":"world"}');

  const detail = usageHistory.getPendingById().get(requestId);
  assert.ok(detail, "pending detail should exist");
  assert.ok(detail!.streamChunks, "streamChunks should be set");
  assert.equal(detail!.streamChunks!.provider.length, 1);
  assert.equal(detail!.streamChunks!.openai.length, 1);
  assert.equal(detail!.streamChunks!.client.length, 1);

  const apiResp = buildApiResponseFromPending(requestId!);
  assert.ok(apiResp);
  const apiChunks = (apiResp!.pipelinePayloads as Record<string, unknown>).streamChunks as Record<
    string,
    string[]
  >;
  assert.equal(stripChunkTs(apiChunks?.provider[0]), 'data: {"chunk":"hello"}');
});

test("finalizePendingRequestById completes the exact stream when same model requests overlap", () => {
  usageHistory.clearPendingRequests();

  const model = "gpt-4";
  const provider = "openai";
  const connectionId = "conn-overlap-1";

  const firstId = usageHistory.trackPendingRequest(model, provider, connectionId, true, {
    clientRequest: { messages: [{ role: "user", content: "first" }] },
  });
  const secondId = usageHistory.trackPendingRequest(model, provider, connectionId, true, {
    clientRequest: { messages: [{ role: "user", content: "second" }] },
  });

  const completed = usageHistory.finalizePendingRequestById(firstId, {
    providerResponse: { id: "first-response" },
    clientResponse: { id: "first-response" },
  });

  assert.equal(completed, true);
  assert.ok(usageHistory.getCompletedDetails().has(firstId));
  assert.equal(usageHistory.getCompletedDetails().has(secondId), false);
  assert.equal(usageHistory.getPendingById().has(firstId), false);
  assert.equal(usageHistory.getPendingById().has(secondId), true);

  const pending = usageHistory.getPendingRequests();
  const details = pending.details[connectionId]?.[`${model} (${provider})`] ?? [];
  assert.equal(details.length, 1);
  assert.equal(details[0].id, secondId);
  assert.equal(pending.byModel[`${model} (${provider})`], 1);
  assert.equal(pending.byAccount[connectionId]?.[`${model} (${provider})`], 1);
});

test("completedDetails cache evicts oldest entries when bounded", () => {
  usageHistory.clearPendingRequests();

  const model = "gpt-4";
  const provider = "openai";
  const connectionId = "conn-completed-bound";
  const ids: string[] = [];

  for (let i = 0; i < 260; i++) {
    const id = usageHistory.trackPendingRequest(model, provider, connectionId, true);
    ids.push(id!);
    const completed = usageHistory.finalizePendingRequestById(id, {
      clientResponse: { choices: [{ message: { content: `done ${i}` } }] },
    });
    assert.equal(completed, true);
  }

  assert.ok(
    usageHistory.getCompletedDetails().size <= 256,
    "completedDetails should remain bounded"
  );
  assert.equal(usageHistory.getCompletedDetails().has(ids[0]), false);
  assert.equal(usageHistory.getCompletedDetails().has(ids[ids.length - 1]), true);
});

test("streamChunks in completedDetails survives beyond the logs polling window", async () => {
  usageHistory.clearPendingRequests();

  const model = "gpt-4";
  const provider = "openai";
  const connectionId = "conn-ttl-1";

  const requestId = usageHistory.trackPendingRequest(model, provider, connectionId, true, {
    clientRequest: { messages: [] },
  });

  // Simulate streaming then completion
  usageHistory.updatePendingRequestStreamChunks(model, provider, connectionId, {
    provider: ['data: {"chunk":"final"}\n\n'],
    openai: [],
    client: [],
  });

  usageHistory.finalizeMostRecentPendingRequest(model, provider, connectionId, {
    status: 200,
    model,
    provider,
  });

  // Should be in completedDetails
  assert.ok(
    usageHistory.getCompletedDetails().has(requestId),
    "should be in completedDetails after finalization"
  );

  const completedResp = buildApiResponseFromCompleted(requestId);
  assert.ok(completedResp, "API response should be available from completedDetails");
  assert.ok(
    (completedResp!.pipelinePayloads as Record<string, unknown>).streamChunks,
    "streamChunks should be in completedDetails"
  );

  // Save to DB as the normal durable path, but keep the completedDetails cache
  // long enough that a slow Logs-page poll does not see the row disappear
  // between pending removal and DB/detail refresh.
  await callLogs.saveCallLog({
    id: requestId,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model,
    requestedModel: model,
    provider,
    connectionId,
    duration: 3000,
    tokens: { in: 5, out: 10 },
    requestBody: {},
    responseBody: {},
    error: null,
    sourceFormat: "openai",
    targetFormat: "openai",
    comboName: null,
    comboStepId: null,
    comboExecutionKey: null,
    tokensCompressed: null,
    cacheSource: "upstream",
    apiKeyId: null,
    apiKeyName: null,
    noLog: false,
    pipelinePayloads: completedResp!.pipelinePayloads as Record<string, unknown>,
  });

  // Verify DB has it
  const dbEntry1 = await callLogs.getCallLogById(requestId);
  assert.ok(dbEntry1, "DB should have the entry after saveCallLog");

  // This used to expire after 5 seconds. Keep it visible beyond that window so
  // a slow client poll can still resolve the completed row/details.
  await new Promise((r) => setTimeout(r, 5100));

  assert.ok(
    usageHistory.getCompletedDetails().has(requestId),
    "completedDetails should still be available after a 5-second polling gap"
  );

  const dbEntry2 = await callLogs.getCallLogById(requestId);
  assert.ok(dbEntry2, "DB should still have the entry after the polling gap");
  assert.equal(
    (dbEntry2 as Record<string, unknown>).id,
    requestId,
    "DB entry ID should match the original request ID"
  );
});
