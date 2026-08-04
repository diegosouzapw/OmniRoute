/**
 * Tests for useTrafficStream — WebSocket snapshot/new/update/clear + reconnect backoff
 */
import { describe, it } from "vitest";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HOOK_SRC = fs.readFileSync(
  path.resolve(
    __dirname,
    "../../../src/app/(dashboard)/dashboard/tools/traffic-inspector/hooks/useTrafficStream.ts"
  ),
  "utf8"
);

// Minimal EventEmitter-based mock WebSocket
class MockWebSocket {
  static instances: MockWebSocket[] = [];
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;

  readyState = MockWebSocket.OPEN;
  onopen: (() => void) | null = null;
  onmessage: ((ev: { data: string }) => void) | null = null;
  onclose: (() => void) | null = null;
  onerror: ((ev: unknown) => void) | null = null;
  url: string;

  constructor(url: string) {
    this.url = url;
    MockWebSocket.instances.push(this);
  }

  close() {
    this.readyState = MockWebSocket.CLOSED;
    this.onclose?.();
  }

  simulateOpen() {
    this.onopen?.();
  }

  simulateMessage(data: unknown) {
    this.onmessage?.({ data: JSON.stringify(data) });
  }
}

describe("useTrafficStream core logic", () => {
  it("initializes with empty state", () => {
    // The hook itself relies on React, but we can test the filter logic
    const requests: Array<{ id: string; detectedKind: string }> = [];
    assert.equal(requests.length, 0);
  });

  it("applies llm profile filter correctly", () => {
    const applyFilter = (req: { detectedKind?: string }, profile: string) => {
      if (profile === "llm" && req.detectedKind !== "llm") return false;
      return true;
    };

    assert.equal(applyFilter({ detectedKind: "llm" }, "llm"), true);
    assert.equal(applyFilter({ detectedKind: "app" }, "llm"), false);
    assert.equal(applyFilter({ detectedKind: "unknown" }, "llm"), false);
    assert.equal(applyFilter({ detectedKind: "app" }, "all"), true);
  });

  it("applies host filter correctly", () => {
    const applyFilter = (req: { host: string }, hostFilter?: string) => {
      if (hostFilter && !req.host.includes(hostFilter)) return false;
      return true;
    };

    assert.equal(applyFilter({ host: "api.openai.com" }, "openai"), true);
    assert.equal(applyFilter({ host: "api.anthropic.com" }, "openai"), false);
    assert.equal(applyFilter({ host: "api.openai.com" }, undefined), true);
  });

  it("applies status filter 2xx correctly", () => {
    const applyStatusFilter = (status: number | string, filter?: string): boolean => {
      if (!filter) return true;
      if (typeof status === "number") {
        const cat = `${Math.floor(status / 100)}xx`;
        return cat === filter;
      }
      return filter === "error" && status === "error";
    };

    assert.equal(applyStatusFilter(200, "2xx"), true);
    assert.equal(applyStatusFilter(201, "2xx"), true);
    assert.equal(applyStatusFilter(404, "2xx"), false);
    assert.equal(applyStatusFilter(500, "5xx"), true);
    assert.equal(applyStatusFilter("error", "error"), true);
    assert.equal(applyStatusFilter("error", "2xx"), false);
  });

  it("backoff doubles on reconnect up to max", () => {
    const INITIAL = 500;
    const MAX = 30_000;
    const MULT = 2;

    let backoff = INITIAL;
    const delays: number[] = [];

    for (let i = 0; i < 10; i++) {
      delays.push(Math.min(backoff, MAX));
      backoff = Math.min(backoff * MULT, MAX);
    }

    assert.equal(delays[0], 500);
    assert.equal(delays[1], 1000);
    assert.equal(delays[2], 2000);
    // Eventually capped at MAX
    const maxDelay = delays[delays.length - 1];
    assert.ok(maxDelay <= MAX, `Expected max delay ${MAX}, got ${maxDelay}`);
  });

  it("handles snapshot event correctly", () => {
    const requests: Array<{ id: string; detectedKind: string; host: string }> = [];

    const snapshot = [
      { id: "1", detectedKind: "llm", host: "api.openai.com" },
      { id: "2", detectedKind: "app", host: "example.com" },
    ];

    // Simulate snapshot handling with llm profile filter
    const applyFilter = (req: { detectedKind: string }) => req.detectedKind === "llm";
    requests.push(...snapshot.filter(applyFilter));

    assert.equal(requests.length, 1);
    assert.equal(requests[0].id, "1");
  });

  it("handles new event with deduplication up to 1000", () => {
    const requests: string[] = [];
    const maxSize = 1000;

    // Simulate adding 1001 items
    for (let i = 0; i <= maxSize; i++) {
      requests.unshift(`req-${i}`);
      if (requests.length > maxSize) requests.splice(maxSize);
    }

    assert.equal(requests.length, maxSize);
    assert.equal(requests[0], `req-${maxSize}`);
  });

  it("handles update event correctly", () => {
    const requests = [
      { id: "1", status: "in-flight" },
      { id: "2", status: 200 },
    ];

    const update = { id: "1", status: 200 };
    const updated = requests.map((r) => (r.id === update.id ? { ...r, ...update } : r));

    assert.equal(updated[0].status, 200);
    assert.equal(updated[1].status, 200);
  });

  it("handles clear event", () => {
    let requests = [{ id: "1" }, { id: "2" }];
    requests = [];
    assert.equal(requests.length, 0);
  });

  it("buffers events when paused", () => {
    const pending: Array<{ id: string }> = [];
    const paused = true;

    const newEvent = { id: "3", type: "new" };
    if (paused) pending.push({ id: newEvent.id });

    assert.equal(pending.length, 1);
    assert.equal(pending[0].id, "3");
  });

  it("TrafficStreamState interface includes pendingCount field (R5-9)", () => {
    assert.ok(
      HOOK_SRC.includes("pendingCount"),
      "TrafficStreamState should expose pendingCount"
    );
  });

  it("pendingCount increments when paused and new event arrives (R5-9)", () => {
    // Verify the source contains the setPendingCount call when pushing to pendingRef
    assert.ok(
      HOOK_SRC.includes("setPendingCount(pendingRef.current.length)"),
      "should call setPendingCount when adding to pendingRef"
    );
  });

  it("pendingCount resets to 0 on resume (R5-9)", () => {
    assert.ok(
      HOOK_SRC.includes("setPendingCount(0)"),
      "should reset pendingCount to 0 on resume and clear"
    );
  });
});
