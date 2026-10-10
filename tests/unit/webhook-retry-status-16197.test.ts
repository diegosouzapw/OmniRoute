import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import type { AddressInfo } from "node:net";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const previousDataDir = process.env.DATA_DIR;
const previousPrivateUrls = process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-webhook-retry-16197-"));
process.env.DATA_DIR = dataDir;
process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS = "true";

const { deliverWebhook, dispatchEvent } = await import("../../src/lib/webhookDispatcher.ts");
const { createWebhook, deleteWebhook, getWebhook } = await import("../../src/lib/db/webhooks.ts");
const { getDeliveries } = await import("../../src/lib/db/webhookDeliveries.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const received: { headers: http.IncomingHttpHeaders; body: string }[] = [];
const statuses: number[] = [];
const server = http.createServer((request, response) => {
  let body = "";
  request.on("data", (chunk) => (body += chunk));
  request.on("end", () => {
    received.push({ headers: request.headers, body });
    response.writeHead(statuses.shift() ?? 200);
    response.end("ok");
  });
});
await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
const url = `http://127.0.0.1:${(server.address() as AddressInfo).port}/webhook`;
const payload = {
  event: "test.ping" as const,
  timestamp: "2026-10-10T00:00:00.000Z",
  data: { message: "retry status fixture" },
};

test.beforeEach(() => {
  received.length = 0;
  statuses.length = 0;
});

test.after(async () => {
  server.closeAllConnections();
  await new Promise<void>((resolve) => server.close(() => resolve()));
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
  if (previousPrivateUrls === undefined) delete process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;
  else process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS = previousPrivateUrls;
});

test("successful HTTP delivery keeps its status and signed payload", async () => {
  const result = await deliverWebhook(url, payload, "synthetic-webhook-secret", 0);
  assert.deepEqual(result, { success: true, status: 200 });
  assert.equal(received.length, 1);
  assert.equal(received[0].body, JSON.stringify(payload));
  assert.equal(received[0].headers["x-webhook-event"], "test.ping");
  assert.equal(received[0].headers["x-webhook-timestamp"], payload.timestamp);
  assert.equal(
    received[0].headers["x-webhook-signature"],
    `sha256=${createHmac("sha256", "synthetic-webhook-secret").update(received[0].body).digest("hex")}`
  );
});

test("exhausted HTTP retries return the final 502 rather than a network status", async () => {
  statuses.push(500, 502);
  const result = await deliverWebhook(url, payload, null, 1);
  assert.equal(received.length, 2);
  assert.deepEqual(
    received.map((request) => request.body),
    [JSON.stringify(payload), JSON.stringify(payload)]
  );
  assert.deepEqual(result, { success: false, status: 502, error: "Max retries exceeded" });
});

test("zero retries still reports the single terminal HTTP response", async () => {
  statuses.push(503);
  const result = await deliverWebhook(url, payload, null, 0);
  assert.equal(received.length, 1);
  assert.deepEqual(result, { success: false, status: 503, error: "Max retries exceeded" });
});

test("dispatchEvent persists the final HTTP status once after its four real attempts", async () => {
  const secret = "synthetic-dispatch-secret";
  const webhook = createWebhook({ url, events: ["test.ping"], secret, kind: "custom" });
  statuses.push(500, 503, 500, 502);
  try {
    await dispatchEvent("test.ping", { marker: "persisted retry" });
    assert.equal(received.length, 4);
    const bodies = received.map((request) => request.body);
    assert.equal(new Set(bodies).size, 1, "all retries reuse the same event payload");
    assert.deepEqual(JSON.parse(bodies[0]).data, { marker: "persisted retry" });
    for (const request of received) {
      assert.equal(
        request.headers["x-webhook-signature"],
        `sha256=${createHmac("sha256", secret).update(request.body).digest("hex")}`
      );
    }
    const deliveries = getDeliveries(webhook.id, 10);
    assert.equal(deliveries.length, 1);
    assert.equal(deliveries[0].status, "failed");
    assert.equal(deliveries[0].http_status, 502);
    assert.equal(deliveries[0].error, "Max retries exceeded");
    const stored = getWebhook(webhook.id);
    assert.equal(stored?.last_status, 502);
    assert.equal(stored?.failure_count, 1);
    assert.equal(stored?.enabled, true);
    assert.ok(stored?.last_triggered_at);
  } finally {
    deleteWebhook(webhook.id);
  }
});

test("a later HTTP success recovers from a 502", async () => {
  statuses.push(502, 200);
  const result = await deliverWebhook(url, payload, null, 1);
  assert.deepEqual(result, { success: true, status: 200 });
  assert.equal(received.length, 2);
});

test("a later HTTP client error stops retrying with that status", async () => {
  statuses.push(502, 404);
  const result = await deliverWebhook(url, payload, null, 3);
  assert.deepEqual(result, { success: false, status: 404 });
  assert.equal(received.length, 2);
});

// The public DNS/fetch seams model mixed failures deterministically; these three cases
// exercise retry outcomes without claiming a real socket failure or a remote HTTP service.
for (const scenario of [
  {
    name: "network error then terminal HTTP response keeps the HTTP status",
    attempts: [new Error("synthetic network failure"), 502],
    expected: { success: false, status: 502, error: "Max retries exceeded" },
  },
  {
    name: "terminal network failure does not reuse the preceding HTTP status",
    attempts: [502, new Error("synthetic terminal network failure")],
    expected: { success: false, status: 0, error: "synthetic terminal network failure" },
  },
  {
    name: "network-only exhaustion retains the terminal network result",
    attempts: [new Error("synthetic first network failure"), new Error("synthetic final failure")],
    expected: { success: false, status: 0, error: "synthetic final failure" },
  },
]) {
  test(scenario.name, async () => {
    let calls = 0;
    const result = await deliverWebhook("https://webhook.example/hook", payload, null, 1, {
      lookup: async () => [{ address: "93.184.216.34", family: 4 }],
      fetchImpl: async (_input, init) => {
        assert.equal(init?.body, JSON.stringify(payload));
        assert.ok(init?.signal instanceof AbortSignal);
        const next = scenario.attempts[calls++];
        if (next instanceof Error) throw next;
        return new Response("synthetic upstream body", { status: next });
      },
    });
    assert.deepEqual(result, scenario.expected);
    assert.equal(calls, 2);
  });
}

test("metadata targets fail closed before the fetch seam and without retries", async () => {
  let calls = 0;
  const result = await deliverWebhook("http://169.254.169.254/hook", payload, null, 3, {
    fetchImpl: async () => {
      calls++;
      return new Response("must not be called", { status: 502 });
    },
  });
  assert.equal(result.success, false);
  assert.equal(result.status, 0);
  assert.equal(typeof result.error, "string");
  assert.equal(calls, 0);
});
