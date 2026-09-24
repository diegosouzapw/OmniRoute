// safeLogEvents forwards the rotation attribution fields (rotationAccount,
// correlationId) to the proxy log entry — each field decoupled so a regression
// on one cannot hide behind the other. RED-first: logProxyEvent must accept and
// persist both new fields.
import test from "node:test";
import assert from "node:assert/strict";

import { logProxyEvent, getProxyLogs } from "../../src/lib/proxyLogger.ts";

test("rotationAccount alone reaches the entry (no correlationId)", () => {
  const entry = logProxyEvent({
    status: "success",
    provider: "opencode",
    targetUrl: "opencode/model",
    connectionId: "noauth",
    account: "noauth",
    rotationAccount: "abcdef12…",
  } as never);
  assert.equal(entry.rotationAccount, "abcdef12…");
  assert.equal(entry.correlationId, null);
  assert.equal(entry.connectionId, "noauth");
});

test("correlationId alone reaches the entry (no rotationAccount)", () => {
  const entry = logProxyEvent({
    status: "success",
    provider: "opencode",
    targetUrl: "opencode/model",
    connectionId: "noauth",
    correlationId: "req-123",
  } as never);
  assert.equal(entry.correlationId, "req-123");
  assert.equal(entry.rotationAccount, null);
});

test("both fields together reach the entry; in-memory query sees them", () => {
  const entry = logProxyEvent({
    status: "error",
    provider: "opencode",
    targetUrl: "opencode/model",
    connectionId: "noauth",
    rotationAccount: "abcdef12…",
    correlationId: "req-456",
  } as never);
  const found = getProxyLogs().find((l) => l.id === entry.id);
  assert.ok(found);
  assert.equal(found!.rotationAccount, "abcdef12…");
  assert.equal(found!.correlationId, "req-456");
});

test("omitting both keeps legacy NULLs (existing readers intact)", () => {
  const entry = logProxyEvent({ status: "success", provider: "opencode" } as never);
  assert.equal(entry.rotationAccount, null);
  assert.equal(entry.correlationId, null);
});
