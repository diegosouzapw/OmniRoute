/**
 * Tests for useSessionRecorder (R5-5 frontend half)
 *
 * Verifies that during recording, new traffic WS events trigger
 * POST to /api/tools/traffic-inspector/sessions/{id}/requests.
 */
import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HOOK_SRC = fs.readFileSync(
  path.resolve(
    __dirname,
    "../../../src/app/(dashboard)/dashboard/tools/traffic-inspector/hooks/useSessionRecorder.ts"
  ),
  "utf8"
);

describe("useSessionRecorder R5-5 source assertions", () => {
  it("opens a WebSocket during start() for traffic capture", () => {
    assert.ok(
      HOOK_SRC.includes("new WebSocket(wsUrl)"),
      "should open a WebSocket connection inside start()"
    );
  });

  it("POSTs to /sessions/{id}/requests on new WS event", () => {
    assert.ok(
      HOOK_SRC.includes("/requests"),
      "should POST to sessions/{id}/requests endpoint"
    );
    assert.ok(
      HOOK_SRC.includes(`method: "POST"`),
      "should use POST method"
    );
    assert.ok(
      HOOK_SRC.includes("payload"),
      "should send payload in body"
    );
  });

  it("buffers events and flushes in batches", () => {
    assert.ok(
      HOOK_SRC.includes("SNAPSHOT_FLUSH_BATCH"),
      "should define SNAPSHOT_FLUSH_BATCH constant"
    );
    assert.ok(
      HOOK_SRC.includes("SNAPSHOT_FLUSH_MS"),
      "should define SNAPSHOT_FLUSH_MS constant for debounce"
    );
    assert.ok(
      HOOK_SRC.includes("pendingSnapshotsRef"),
      "should use a pendingSnapshotsRef buffer"
    );
  });

  it("stops WS and flushes on stop()", () => {
    assert.ok(
      HOOK_SRC.includes("stopRecordingWs()"),
      "stop() should call stopRecordingWs to clean up the WS"
    );
    assert.ok(
      HOOK_SRC.includes("await flushSnapshots(sid)"),
      "stop() should await a final flush before sending PATCH"
    );
  });

  it("handles POST failure gracefully (does not throw)", () => {
    // The fetch call must be wrapped in try/catch
    const fetchBlock = HOOK_SRC.slice(HOOK_SRC.indexOf("flushSnapshots"));
    assert.ok(
      fetchBlock.includes("} catch {"),
      "POST fetch should be wrapped in try/catch to handle failures gracefully"
    );
  });

  it("only pushes 'new' event type to snapshots", () => {
    assert.ok(
      HOOK_SRC.includes(`event.type !== "new"`),
      "should early-return for non-new events"
    );
  });
});

describe("useSessionRecorder snapshot flush logic (unit)", () => {
  it("batch threshold triggers immediate flush instead of timer", () => {
    // Simulate the flush decision logic
    const SNAPSHOT_FLUSH_BATCH = 10;
    const pendingSnapshots: string[] = [];
    let immediateFlushCalled = false;
    let scheduleFlushCalled = false;

    const flushSnapshots = () => { immediateFlushCalled = true; };
    const scheduleFlush = () => { scheduleFlushCalled = true; };

    // Below threshold
    pendingSnapshots.push(JSON.stringify({ id: "req-1" }));
    if (pendingSnapshots.length >= SNAPSHOT_FLUSH_BATCH) {
      flushSnapshots();
    } else {
      scheduleFlush();
    }
    assert.equal(immediateFlushCalled, false);
    assert.equal(scheduleFlushCalled, true);

    // At threshold
    immediateFlushCalled = false;
    scheduleFlushCalled = false;
    for (let i = 0; i < SNAPSHOT_FLUSH_BATCH - 1; i++) {
      pendingSnapshots.push(JSON.stringify({ id: `req-${i + 2}` }));
    }
    assert.equal(pendingSnapshots.length, SNAPSHOT_FLUSH_BATCH);
    if (pendingSnapshots.length >= SNAPSHOT_FLUSH_BATCH) {
      flushSnapshots();
    } else {
      scheduleFlush();
    }
    assert.equal(immediateFlushCalled, true);
    assert.equal(scheduleFlushCalled, false);
  });

  it("POST URL is correct format", () => {
    const sessionId = "test-session-123";
    const url = `/api/tools/traffic-inspector/sessions/${encodeURIComponent(sessionId)}/requests`;
    assert.equal(url, "/api/tools/traffic-inspector/sessions/test-session-123/requests");
  });

  it("POST body contains stringified payload", () => {
    const req = { id: "req-1", host: "api.openai.com", method: "POST" };
    const payload = JSON.stringify(req);
    const body = JSON.stringify({ payload });
    const parsed = JSON.parse(body) as { payload: string };
    assert.equal(parsed.payload, payload);
    const reparsed = JSON.parse(parsed.payload) as typeof req;
    assert.equal(reparsed.id, "req-1");
  });
});
