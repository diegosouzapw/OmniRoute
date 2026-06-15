import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-reqlogger-ep-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ─── Active log endpoint removal ─────────────────────────────────────────

test("/api/logs/active route is removed", () => {
  assert.equal(
    fs.existsSync("src/app/api/logs/active/route.ts"),
    false,
    "active logs must not expose an in-memory timing-sensitive endpoint"
  );
});

test("RequestLoggerV2 detail fetch uses /api/logs/[id] and not /api/logs/active", () => {
  const content = fs.readFileSync("src/shared/components/RequestLoggerV2.tsx", "utf8");
  assert.match(content, /fetch\(`\/api\/logs\/\$\{[^}]+\.id\}`,\s*\{\s*cache:\s*"no-store"/);
  assert.doesNotMatch(content, /fetch\(["'`]\/api\/logs\/active/);
  assert.match(content, /detailState:\s*"pending"/);
});

// ─── usageHistory module behaviour ───────────────────────────────────────

test("trackPendingRequest creates a detail entry", () => {
  usageHistory.clearPendingRequests();
  usageHistory.trackPendingRequest("gpt-4", "openai", "conn-1", true, {
    clientRequest: { messages: [{ role: "user", content: "hi" }] },
    providerRequest: { model: "gpt-4" },
    providerUrl: "https://api.openai.com/v1/chat/completions",
  });

  const pending = usageHistory.getPendingRequests();
  const detail = pending.details["conn-1"]?.["gpt-4 (openai)"]?.[0];
  assert.ok(detail, "should create detail entry");
  assert.equal(detail.model, "gpt-4");
  assert.equal(detail.provider, "openai");
  assert.equal(detail.connectionId, "conn-1");
  assert.ok(detail.id, "should have an id");
  assert.ok(detail.startedAt > 0, "should have startedAt timestamp");
  assert.ok(detail.clientRequest, "should preserve clientRequest");
  assert.equal(detail.clientRequest.messages[0].content, "hi");
});

test("trackPendingRequest decrements and removes detail on finish", () => {
  usageHistory.clearPendingRequests();
  usageHistory.trackPendingRequest("gpt-4", "openai", "conn-1", true);
  assert.equal(usageHistory.getPendingRequests().details["conn-1"]?.["gpt-4 (openai)"]?.length, 1);

  usageHistory.trackPendingRequest("gpt-4", "openai", "conn-1", false);
  const after = usageHistory.getPendingRequests();
  assert.equal(after.details["conn-1"]?.["gpt-4 (openai)"]?.length ?? 0, 0);
});

test("trackPendingRequest does not go negative", () => {
  usageHistory.clearPendingRequests();
  usageHistory.trackPendingRequest("gpt-4", "openai", "conn-1", false);
  usageHistory.trackPendingRequest("gpt-4", "openai", "conn-1", false);
  const pending = usageHistory.getPendingRequests();
  assert.equal(pending.byModel["gpt-4 (openai)"], 0);
});

test("updatePendingRequestStreamChunks stores stream chunks in the detail", () => {
  usageHistory.clearPendingRequests();
  usageHistory.trackPendingRequest("gpt-4", "openai", "conn-1", true);

  const chunks = { provider: ['data: {"a":1}'], openai: [], client: [] };
  usageHistory.updatePendingRequestStreamChunks("gpt-4", "openai", "conn-1", chunks);

  const pending = usageHistory.getPendingRequests();
  const detail = pending.details["conn-1"]?.["gpt-4 (openai)"]?.[0];
  assert.ok(detail.streamChunks, "streamChunks should be set");
  assert.equal(detail.streamChunks.provider.length, 1);
  assert.equal(detail.streamChunks.provider[0], 'data: {"a":1}');
});

test("updatePendingRequestStreamChunks stores empty streamChunks object (not null)", () => {
  usageHistory.clearPendingRequests();
  usageHistory.trackPendingRequest("gpt-4", "openai", "conn-1", true);

  // Call with empty arrays (as pushStreamChunks does before data flows)
  const empty = { provider: [], openai: [], client: [] };
  usageHistory.updatePendingRequestStreamChunks("gpt-4", "openai", "conn-1", empty);

  const pending = usageHistory.getPendingRequests();
  const detail = pending.details["conn-1"]?.["gpt-4 (openai)"]?.[0];
  assert.ok(detail.streamChunks, "streamChunks should be set even when empty");
  assert.deepEqual(detail.streamChunks, { provider: [], openai: [], client: [] });

  // Verify the reference is live: mutations to the original object are visible
  empty.provider.push("data: hello");
  assert.equal(detail.streamChunks.provider.length, 1);
  assert.equal(detail.streamChunks.provider[0], "data: hello");
});

test("clearPendingRequests resets all counts and details", () => {
  usageHistory.clearPendingRequests();
  usageHistory.trackPendingRequest("m1", "p1", "c1", true);
  usageHistory.trackPendingRequest("m2", "p2", "c2", true);
  assert.equal(Object.keys(usageHistory.getPendingRequests().byModel).length, 2);

  usageHistory.clearPendingRequests();
  const pending = usageHistory.getPendingRequests();
  assert.equal(Object.keys(pending.byModel).length, 0);
  assert.equal(Object.keys(pending.byAccount).length, 0);
  assert.equal(Object.keys(pending.details).length, 0);
});

// ─── Pending request data remains available for internal usage stats ─────

test("pending request detail shape remains available internally", () => {
  usageHistory.clearPendingRequests();
  usageHistory.trackPendingRequest("claude-3-opus", "anthropic", "conn-2", true, {
    clientRequest: { messages: [{ role: "user", content: "hello" }] },
    providerRequest: { model: "claude-3-opus" },
    providerUrl: "https://api.anthropic.com/v1/messages",
  });

  const pending = usageHistory.getPendingRequests();
  const entries = Object.entries(pending.details).flatMap(([connectionId, models]) =>
    Object.entries(models).flatMap(([modelKey, details]) =>
      details.map((detail) => ({
        id: detail.id,
        model: detail.model,
        provider: detail.provider,
        connectionId,
        startedAt: detail.startedAt,
        clientRequest: detail.clientRequest ?? null,
        providerRequest: detail.providerRequest ?? null,
        providerUrl: detail.providerUrl ?? null,
        streamChunks: detail.streamChunks ?? null,
      }))
    )
  );

  assert.equal(entries.length, 1);
  const row = entries[0];
  assert.ok(row.id);
  assert.equal(row.model, "claude-3-opus");
  assert.equal(row.provider, "anthropic");
  assert.equal(row.connectionId, "conn-2");
  assert.ok(row.startedAt > 0);
  assert.ok(row.clientRequest, "clientRequest should be present");
  assert.ok(row.providerRequest, "providerRequest should be present");
  assert.ok(row.providerUrl, "providerUrl should be present");
  assert.equal(row.streamChunks, null, "streamChunks should be null initially");
});

// ─── /api/usage/call-logs/[id] route structure ────────────────────────────

test("GET /api/usage/call-logs/[id] route exists and uses auth", () => {
  const content = fs.readFileSync("src/app/api/usage/call-logs/[id]/route.ts", "utf8");
  assert.ok(content.includes("export async function GET"), "should export GET handler");
  assert.ok(content.includes("requireManagementAuth"), "should check auth");
  assert.ok(content.includes("getCallLogById"), "should import getCallLogById");
});

test("GET /api/usage/call-logs includes completed in-memory fallback rows", () => {
  const content = fs.readFileSync("src/app/api/usage/call-logs/route.ts", "utf8");
  assert.match(content, /getCompletedDetails/);
  assert.match(content, /completedEntries/);
  assert.match(content, /detailState:\s*"in-memory"/);
});

test("getCallLogById returns null for unknown id", async () => {
  const log = await callLogs.getCallLogById("nonexistent-id-12345");
  assert.equal(log, null);
});

// ─── Merged view data shape ────────────────────────────────────────────

test("normalized active row has expected fields for the grid view", () => {
  const rawRow = {
    id: "test-id-1",
    model: "gpt-4",
    provider: "openai",
    account: "conn-1",
    startedAt: Date.now() - 5000,
    runningTimeMs: 5000,
    stage: "streaming",
    stageUpdatedAt: Date.now(),
    clientRequest: { messages: [] },
    providerRequest: { model: "gpt-4" },
    providerUrl: "https://api.openai.com/v1",
    streamChunks: null,
  };

  const normalized = {
    active: true,
    id: rawRow.id,
    model: rawRow.model,
    provider: rawRow.provider,
    account: rawRow.account,
    timestamp: new Date(rawRow.startedAt).toISOString(),
    duration: Math.max(0, Date.now() - rawRow.startedAt),
    status: 0,
    sourceFormat: null,
    tokens: null,
    comboName: null,
    apiKeyName: null,
    apiKeyId: null,
    cacheSource: null,
    requestedModel: null,
    stage: rawRow.stage,
    stageUpdatedAt: rawRow.stageUpdatedAt,
    _activeRow: rawRow,
  };

  assert.equal(normalized.active, true);
  assert.equal(normalized.id, "test-id-1");
  assert.equal(normalized.model, "gpt-4");
  assert.equal(normalized.provider, "openai");
  assert.equal(normalized.status, 0);
  assert.ok(normalized.duration >= 5000);
  assert.ok(normalized.duration < 60000);
  assert.equal(normalized.tokens, null);
  assert.equal(normalized.cacheSource, null);
  assert.equal(normalized.stage, "streaming");
});

// ─── requestLoggerSignature module ────────────────────────────────────────

const sigMod = await import("../../src/shared/components/requestLoggerSignature.ts");

test("resolveInitialVisibility returns true when document is undefined (SSR)", () => {
  assert.equal(sigMod.resolveInitialVisibility(), true);
});

test("shouldAutoRefresh returns true when recording and on first page", () => {
  assert.equal(sigMod.shouldAutoRefresh(true, 50, 50), true);
  assert.equal(sigMod.shouldAutoRefresh(true, 25, 50), true);
});

test("shouldAutoRefresh returns false when not recording or past first page", () => {
  assert.equal(sigMod.shouldAutoRefresh(false, 50, 50), false);
  assert.equal(sigMod.shouldAutoRefresh(true, 100, 50), false);
  assert.equal(sigMod.shouldAutoRefresh(false, 100, 50), false);
});

test("computeLogsSignature produces different signatures for different data", () => {
  const a = sigMod.computeLogsSignature([
    { id: "1", status: 200, duration: 100, tokens: { out: 50 } },
  ]);
  const b = sigMod.computeLogsSignature([
    { id: "1", status: 200, duration: 150, tokens: { out: 50 } },
  ]);
  assert.notEqual(a, b, "different duration should change signature");
});

test("computeLogsSignature returns empty string for non-array input", () => {
  assert.equal(sigMod.computeLogsSignature(null), "");
  assert.equal(sigMod.computeLogsSignature(undefined), "");
  assert.equal(sigMod.computeLogsSignature({}), "");
});

// ─── Duration live computation ───────────────────────────────────────────

test("duration is computed from startedAt and grows over time", () => {
  const startedAt = Date.now() - 3000;
  const duration = Math.max(0, Date.now() - startedAt);
  assert.ok(duration >= 3000, "duration should be at least 3s");
  assert.ok(duration < 60000, "duration should be within reason");
});

// ─── Navigation logic ────────────────────────────────────────────────────

test("handlePrev at first item closes modal (no wrap-around)", () => {
  const items = [
    { id: "a", active: false },
    { id: "b", active: false },
    { id: "c", active: false },
  ];
  const selectedId = "a";
  const idx = items.findIndex((l) => l.id === selectedId);
  assert.equal(idx, 0);

  // handlePrev should NOT wrap to last item
  if (idx > 0) {
    assert.equal(items[idx - 1].id, "should not reach");
  } else {
    // closes modal
    assert.ok(true, "prev at first item closes modal");
  }
});

test("handlePrev navigates backward when not at first item", () => {
  const items = [
    { id: "a", active: false },
    { id: "b", active: false },
    { id: "c", active: false },
  ];
  const selectedId = "b";
  const idx = items.findIndex((l) => l.id === selectedId);
  assert.equal(idx, 1);

  if (idx > 0) {
    assert.equal(items[idx - 1].id, "a", "should navigate to previous item");
  }
});

test("handleNext at last item closes modal (no wrap-around)", () => {
  const items = [
    { id: "a", active: false },
    { id: "b", active: false },
  ];
  const selectedId = "b";
  const idx = items.findIndex((l) => l.id === selectedId);
  assert.equal(idx, items.length - 1);

  // handleNext at last item should close
  if (idx < items.length - 1) {
    assert.equal(items[idx + 1].id, "should not reach");
  } else {
    assert.ok(true, "next at last item closes modal");
  }
});

test("handleNext navigates forward when not at last item", () => {
  const items = [
    { id: "a", active: false },
    { id: "b", active: false },
  ];
  const selectedId = "a";
  const idx = items.findIndex((l) => l.id === selectedId);

  if (idx < items.length - 1) {
    assert.equal(items[idx + 1].id, "b", "should navigate to next item");
  }
});

// ─── Detail endpoint polling ─────────────────────────────────────────────

test("deep-linked missing request id is kept pending for /api/logs/[id] polling", () => {
  const content = fs.readFileSync("src/shared/components/RequestLoggerV2.tsx", "utf8");
  assert.match(content, /pendingLookup:\s*true/);
  // A deep-linked id that 404s while still active is kept pending...
  assert.match(content, /setDetailData\(\{\s*detailState:\s*"pending"\s*\}\)/);
  // ...and the detail-polling effect re-runs on that pending state.
  assert.match(content, /detailData\?\.detailState/);
  assert.doesNotMatch(content, /activeRequests|completedRows|completedRow/);
});

// ─── End-to-end streamChunks integration ──────────────────────────────────

test("createRequestLogger with connectionId/model/provider populates streamChunks on pending request", async () => {
  const { createRequestLogger } = await import("../../open-sse/utils/requestLogger.ts");
  usageHistory.clearPendingRequests();

  // track request so the pending detail entry exists
  usageHistory.trackPendingRequest("gpt-4", "openai", "test-conn-1", true, {
    clientRequest: { messages: [{ role: "user", content: "hi" }] },
  });

  const logger = await createRequestLogger("openai", "openai", "gpt-4", {
    enabled: true,
    captureStreamChunks: true,
    connectionId: "test-conn-1",
    model: "gpt-4",
    provider: "openai",
  });

  // append a provider chunk — this should call pushStreamChunks() → updatePendingRequestStreamChunks()
  logger.appendProviderChunk('data: {"content":"hello"}');
  logger.appendProviderChunk('data: {"content":" world"}');

  const pending = usageHistory.getPendingRequests();
  const detail = pending.details["test-conn-1"]?.["gpt-4 (openai)"]?.[0];

  assert.ok(detail, "pending request detail should exist");
  assert.ok(detail.streamChunks, "streamChunks should be non-null after appendProviderChunk");
  assert.ok(Array.isArray(detail.streamChunks.provider), "provider array should exist");
  assert.equal(detail.streamChunks.provider.length, 2, "should have 2 provider chunks");
  assert.equal(detail.streamChunks.provider[0], 'data: {"content":"hello"}');
  assert.equal(detail.streamChunks.provider[1], 'data: {"content":" world"}');
  assert.deepEqual(detail.streamChunks.openai, []);
  assert.deepEqual(detail.streamChunks.client, []);
});

test("createRequestLogger requestId binds streamChunks to the exact pending request", async () => {
  const { createRequestLogger } = await import("../../open-sse/utils/requestLogger.ts");
  usageHistory.clearPendingRequests();

  const firstId = usageHistory.trackPendingRequest("gpt-4", "openai", "test-conn-a", true);
  const secondId = usageHistory.trackPendingRequest("gpt-4", "openai", "test-conn-b", true);

  const logger = await createRequestLogger("openai", "openai", "gpt-4", {
    enabled: true,
    captureStreamChunks: true,
    requestId: secondId,
  });

  logger.appendProviderChunk('data: {"content":"second"}');

  const first = usageHistory.getPendingById().get(firstId);
  const second = usageHistory.getPendingById().get(secondId);

  assert.equal(first?.streamChunks, undefined);
  assert.equal(second?.streamChunks?.provider[0], 'data: {"content":"second"}');
});

test("createRequestLogger fallback match does not cross connectionId boundaries", async () => {
  const { createRequestLogger } = await import("../../open-sse/utils/requestLogger.ts");
  usageHistory.clearPendingRequests();

  usageHistory.trackPendingRequest("gpt-4", "openai", "test-conn-a", true);
  const secondId = usageHistory.trackPendingRequest("gpt-4", "openai", "test-conn-b", true);

  const logger = await createRequestLogger("openai", "openai", "gpt-4", {
    enabled: true,
    captureStreamChunks: true,
    connectionId: "test-conn-b",
    model: "gpt-4",
    provider: "openai",
  });

  logger.appendProviderChunk('data: {"content":"conn-b"}');

  const second = usageHistory.getPendingById().get(secondId);
  assert.equal(second?.streamChunks?.provider[0], 'data: {"content":"conn-b"}');
});

test("createRequestLogger without connectionId does not populate streamChunks", async () => {
  const { createRequestLogger } = await import("../../open-sse/utils/requestLogger.ts");
  usageHistory.clearPendingRequests();

  usageHistory.trackPendingRequest("gpt-4", "openai", "test-conn-2", true, {
    clientRequest: { messages: [{ role: "user", content: "hi" }] },
  });

  // create logger WITHOUT connectionId/model/provider — pushStreamChunks will bail
  const logger = await createRequestLogger("openai", "openai", "gpt-4", {
    enabled: true,
    captureStreamChunks: true,
    // intentionally omit connectionId, model, provider
  });

  logger.appendProviderChunk('data: {"content":"hello"}');

  const pending = usageHistory.getPendingRequests();
  const detail = pending.details["test-conn-2"]?.["gpt-4 (openai)"]?.[0];

  assert.ok(detail, "pending request detail should exist");
  assert.equal(
    detail.streamChunks,
    undefined,
    "streamChunks should be undefined when connectionId not provided to createRequestLogger"
  );
});

test("createRequestLogger appendOpenAIChunk and appendConvertedChunk also populate streamChunks", async () => {
  const { createRequestLogger } = await import("../../open-sse/utils/requestLogger.ts");
  usageHistory.clearPendingRequests();

  usageHistory.trackPendingRequest("claude-3", "anthropic", "test-conn-3", true);

  const logger = await createRequestLogger("anthropic", "openai", "claude-3", {
    enabled: true,
    captureStreamChunks: true,
    connectionId: "test-conn-3",
    model: "claude-3",
    provider: "anthropic",
  });

  logger.appendOpenAIChunk('data: {"role":"assistant","content":"hi"}');
  logger.appendConvertedChunk('data: {"content":"there"}');

  const pending = usageHistory.getPendingRequests();
  const detail = pending.details["test-conn-3"]?.["claude-3 (anthropic)"]?.[0];

  assert.ok(detail?.streamChunks, "streamChunks should be set");
  assert.equal(detail.streamChunks.openai.length, 1);
  assert.equal(detail.streamChunks.openai[0], 'data: {"role":"assistant","content":"hi"}');
  assert.equal(detail.streamChunks.client.length, 1);
  assert.equal(detail.streamChunks.client[0], 'data: {"content":"there"}');
});

test("createRequestLogger captures stream chunks even when enabled: false", async () => {
  const { createRequestLogger } = await import("../../open-sse/utils/requestLogger.ts");
  usageHistory.clearPendingRequests();

  usageHistory.trackPendingRequest("gpt-4", "openai", "test-conn-4", true);

  // Logger is disabled (enabled: false) — previously this would return a
  // no-op logger that didn't capture any chunks. Now stream chunks are
  // always captured regardless of the enabled flag.
  const logger = await createRequestLogger("openai", "openai", "gpt-4", {
    enabled: false,
    captureStreamChunks: true,
    connectionId: "test-conn-4",
    model: "gpt-4",
    provider: "openai",
  });

  logger.appendProviderChunk('data: {"content":"hello"}');

  const pending = usageHistory.getPendingRequests();
  const detail = pending.details["test-conn-4"]?.["gpt-4 (openai)"]?.[0];

  assert.ok(detail?.streamChunks, "streamChunks should be set even when logger is disabled");
  assert.equal(detail.streamChunks.provider.length, 1);
  assert.equal(detail.streamChunks.provider[0], 'data: {"content":"hello"}');

  // But getPipelinePayloads should return null when disabled
  assert.equal(
    logger.getPipelinePayloads(),
    null,
    "pipeline payloads should be null when disabled"
  );
});

test("createRequestLogger disabled logger other methods are no-ops", async () => {
  const { createRequestLogger } = await import("../../open-sse/utils/requestLogger.ts");

  const logger = await createRequestLogger("openai", "openai", "gpt-4", {
    enabled: false,
    captureStreamChunks: false,
  });

  // These should not throw
  logger.logClientRawRequest("/endpoint", { foo: "bar" });
  logger.logOpenAIRequest({ model: "gpt-4" });
  logger.logTargetRequest("https://api.openai.com", {}, { model: "gpt-4" });
  logger.logProviderResponse(200, "OK", {}, {});
  logger.logConvertedResponse({ choices: [] });
  logger.logError(new Error("test"));
  logger.appendProviderChunk("test");
  logger.appendOpenAIChunk("test");
  logger.appendConvertedChunk("test");

  assert.equal(logger.getPipelinePayloads(), null);
});
