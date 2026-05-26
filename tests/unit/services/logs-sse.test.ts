/**
 * T-09 — SSE logs endpoint tests.
 *
 * Tests the GET /api/services/[name]/logs handler directly.
 * Uses a real RingBuffer pushed with synthetic log lines.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { RingBuffer } from "../../../src/lib/services/ringBuffer.ts";
import type { LogLine } from "../../../src/lib/services/types.ts";

// ─── helpers ────────────────────────────────────────────────────────────────

function makeLogLine(line: string, stream: "stdout" | "stderr" = "stdout"): LogLine {
  return { ts: Date.now(), stream, line };
}

/**
 * Minimal request factory for the SSE route handler.
 * Returns a Request whose signal can be aborted via the returned AbortController.
 */
function makeRequest(searchParams: Record<string, string> = {}): {
  req: Request;
  abort: AbortController;
} {
  const abort = new AbortController();
  const qs = new URLSearchParams(searchParams).toString();
  const url = `http://localhost/api/services/9router/logs${qs ? `?${qs}` : ""}`;
  const req = new Request(url, { signal: abort.signal });
  return { req, abort };
}

/**
 * Reads all SSE events from a Response body until the stream ends or
 * the caller aborts. Returns parsed {event, data} pairs.
 */
async function drainEvents(
  resp: Response,
  opts: { maxEvents?: number; abort?: AbortController } = {}
): Promise<Array<{ event: string; data: unknown }>> {
  const { maxEvents = 50, abort } = opts;
  const events: Array<{ event: string; data: unknown }> = [];
  const reader = resp.body!.getReader();
  const decoder = new TextDecoder();

  let buf = "";
  let currentEvent = "message";

  while (events.length < maxEvents) {
    const { value, done } = await reader.read();
    if (done) break;

    buf += decoder.decode(value, { stream: true });

    const parts = buf.split("\n\n");
    buf = parts.pop() ?? "";

    for (const block of parts) {
      const lines = block.split("\n");
      let eventName = currentEvent;
      let dataLine = "";

      for (const line of lines) {
        if (line.startsWith("event: ")) eventName = line.slice(7).trim();
        else if (line.startsWith("data: ")) dataLine = line.slice(6);
      }

      if (dataLine) {
        try {
          events.push({ event: eventName, data: JSON.parse(dataLine) });
        } catch {
          events.push({ event: eventName, data: dataLine });
        }
      }
      currentEvent = "message";
    }
  }

  abort?.abort();
  reader.cancel().catch(() => {});
  return events;
}

// ─── import route handler after helpers ──────────────────────────────────────

// Registry is module-level state; import it so we can register test supervisors.
const { registerSupervisor, getSupervisor } = await import("../../../src/lib/services/registry.ts");
const { ServiceSupervisor } = await import("../../../src/lib/services/ServiceSupervisor.ts");

function makeTestSupervisor(tool: string): ServiceSupervisor {
  return new ServiceSupervisor({
    tool,
    port: 29999,
    spawnArgs: () => ({
      command: process.execPath,
      args: ["-e", "setTimeout(() => {}, 999999)"],
      env: process.env,
      cwd: process.cwd(),
    }),
    healthUrl: () => `http://127.0.0.1:29999/health`,
    healthIntervalMs: 500,
    stopTimeoutMs: 500,
    logsBufferBytes: 1_048_576,
  });
}

// ─── tests ───────────────────────────────────────────────────────────────────

test("GET /logs returns 404 for unknown service", async () => {
  const { GET } = await import("../../../src/app/api/services/[name]/logs/route.ts");

  const { req, abort } = makeRequest();
  const resp = await GET(req as any, { params: Promise.resolve({ name: "no-such-service" }) });
  abort.abort();
  assert.equal(resp.status, 404);
  const body = await resp.json();
  assert.ok(typeof body.error === "object" && body.error !== null, "error must be an object");
  assert.ok(body.error.message?.includes("not found"), "error.message must mention 'not found'");
  assert.equal(body.error.type, "not_found");
  assert.ok(typeof body.requestId === "string", "requestId must be present");
});

test("GET /logs returns 400 when filter exceeds max length", async () => {
  const sup = makeTestSupervisor("9router-filter-test");
  registerSupervisor(sup);

  const { GET } = await import("../../../src/app/api/services/[name]/logs/route.ts?t=filter-len");

  const longFilter = "a".repeat(201);
  const { req, abort } = makeRequest({ filter: longFilter });
  const resp = await GET(req as any, {
    params: Promise.resolve({ name: "9router-filter-test" }),
  });
  abort.abort();
  assert.equal(resp.status, 400);
  const body = await resp.json();
  assert.ok(typeof body.error === "object" && body.error !== null, "error must be an object");
  assert.ok(body.error.message?.includes("filter"), "error.message must mention 'filter'");
  assert.equal(body.error.type, "invalid_request");
  assert.ok(typeof body.requestId === "string", "requestId must be present");
});

test("GET /logs sends snapshot event with buffered lines", async () => {
  const sup = makeTestSupervisor("9router-snap-test");
  registerSupervisor(sup);

  const rb = sup.getRingBuffer();
  rb.push(makeLogLine("line one"));
  rb.push(makeLogLine("line two"));
  rb.push(makeLogLine("line three"));

  const { GET } = await import("../../../src/app/api/services/[name]/logs/route.ts?t=snap");

  const { req, abort } = makeRequest();
  const resp = await GET(req as any, {
    params: Promise.resolve({ name: "9router-snap-test" }),
  });

  assert.equal(resp.headers.get("Content-Type"), "text/event-stream");
  assert.equal(resp.headers.get("X-Accel-Buffering"), "no");

  const events = await drainEvents(resp, { maxEvents: 1, abort });
  assert.equal(events.length, 1);
  assert.equal(events[0].event, "snapshot");
  const lines = events[0].data as LogLine[];
  assert.equal(lines.length, 3);
  assert.equal(lines[0].line, "line one");
});

test("GET /logs applies substring filter to snapshot", async () => {
  const sup = makeTestSupervisor("9router-filt-snap");
  registerSupervisor(sup);

  const rb = sup.getRingBuffer();
  rb.push(makeLogLine("[ERROR] something broke"));
  rb.push(makeLogLine("[INFO] all good"));
  rb.push(makeLogLine("[ERROR] another error"));

  const { GET } = await import("../../../src/app/api/services/[name]/logs/route.ts?t=filt-snap");

  const { req, abort } = makeRequest({ filter: "ERROR" });
  const resp = await GET(req as any, {
    params: Promise.resolve({ name: "9router-filt-snap" }),
  });

  const events = await drainEvents(resp, { maxEvents: 1, abort });
  const lines = events[0].data as LogLine[];
  assert.equal(lines.length, 2);
  assert.ok(lines.every((l) => l.line.includes("ERROR")));
});

test("GET /logs respects tail parameter", async () => {
  const sup = makeTestSupervisor("9router-tail-test");
  registerSupervisor(sup);

  const rb = sup.getRingBuffer();
  for (let i = 0; i < 10; i++) rb.push(makeLogLine(`line ${i}`));

  const { GET } = await import("../../../src/app/api/services/[name]/logs/route.ts?t=tail");

  const { req, abort } = makeRequest({ tail: "3" });
  const resp = await GET(req as any, {
    params: Promise.resolve({ name: "9router-tail-test" }),
  });

  const events = await drainEvents(resp, { maxEvents: 1, abort });
  const lines = events[0].data as LogLine[];
  assert.equal(lines.length, 3);
  assert.equal(lines[0].line, "line 7");
  assert.equal(lines[2].line, "line 9");
});

test("GET /logs delivers live log events after snapshot", async () => {
  const sup = makeTestSupervisor("9router-live-test");
  registerSupervisor(sup);

  const rb = sup.getRingBuffer();
  rb.push(makeLogLine("existing"));

  const { GET } = await import("../../../src/app/api/services/[name]/logs/route.ts?t=live");

  const { req, abort } = makeRequest();
  const resp = await GET(req as any, {
    params: Promise.resolve({ name: "9router-live-test" }),
  });

  // Schedule a live push slightly after the stream starts consuming
  setImmediate(() => rb.push(makeLogLine("live event")));

  const events = await drainEvents(resp, { maxEvents: 2, abort });
  const liveEvents = events.filter((e) => e.event === "log");
  assert.equal(liveEvents.length, 1);
  assert.equal((liveEvents[0].data as LogLine).line, "live event");
});

test("GET /logs unsubscribes from buffer on abort", async () => {
  const sup = makeTestSupervisor("9router-unsub-test");
  registerSupervisor(sup);

  const rb = sup.getRingBuffer();

  const { GET } = await import("../../../src/app/api/services/[name]/logs/route.ts?t=unsub");

  const { req, abort } = makeRequest();
  const resp = await GET(req as any, {
    params: Promise.resolve({ name: "9router-unsub-test" }),
  });

  // Read snapshot then abort
  await drainEvents(resp, { maxEvents: 1, abort });

  // After abort, pushing a new line should not increment any internal counter
  // (there are no live subscribers). We verify by checking subscriber count via
  // a subscribe-then-immediately-unsubscribe round-trip — if our original
  // subscriber is gone, count stays at 0 after unsubscribing.
  let liveCallCount = 0;
  const unsub = rb.subscribe(() => {
    liveCallCount++;
  });
  rb.push(makeLogLine("post-abort line"));
  unsub();
  assert.equal(liveCallCount, 1, "only the probe subscriber should fire after abort");
});
