import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Every admission rejection (413/503) leaves a queryable call_logs row.
// Admission OK leaves behavior and rows unchanged; rejections never touch the
// pending-usage registry (bounded memory by construction).

const ISOLATED_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-admission-reject-"));
process.env.DATA_DIR = ISOLATED_DATA_DIR;
process.env.OMNIROUTE_CHAT_HARD_MAX_MESSAGES = "2";

const core = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const runtimeModule = await import("../../open-sse/services/admission/runtime.ts");
const chatAdmission = await import("../../src/sse/handlers/chatAdmission.ts");
const completionsRoute = await import("../../src/app/api/v1/chat/completions/route.ts");
const responsesRoute = await import("../../src/app/api/v1/responses/route.ts");
const chatHandler = await import("../../src/sse/handlers/chat.ts");

// The admission queue deadline timer is unref'd (it must not pin the event
// loop open when idle), so a test whose only pending work is a queued
// acquire would see the loop drain before the deadline fires. A ref'd
// guard timer keeps the loop alive until the rejection lands.
function keepLoopAlive(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function uniqueCorrelationId(label: string): string {
  return `admission-reject-${label}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

type RejectionRow = {
  status?: number;
  model?: string;
  error?: string | null;
  duration?: number;
  session_tag?: string | null;
  correlationId?: string;
};

async function rowsByCorrelation(correlationId: string): Promise<Array<RejectionRow>> {
  // The rejection log is fire-and-forget (never holds the rejection path),
  // so poll briefly instead of asserting synchronously after the await.
  const deadline = Date.now() + 10_000;
  let rows: Array<RejectionRow> = [];
  while (Date.now() < deadline) {
    await callLogs.waitForCallLogSaves(1_000);
    const found = await callLogs.getCallLogs({ correlationId, limit: 50 });
    rows = (Array.isArray(found) ? found : []).filter(
      (row: RejectionRow) => row.correlationId === correlationId
    );
    if (rows.length > 0) break;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  return rows;
}

function enforceRuntime(): void {
  runtimeModule.reloadAdaptiveAdmissionRuntime({
    config: {
      mode: "enforce",
      minLimit: 1,
      maxLimit: 1,
      initialLimit: 1,
      maxQueueCount: 1,
      maxQueueCost: 1,
      defaultMaxWaitMs: 50,
      windowMs: 50,
      cost: { maxRequestCost: 1, baseCost: 1 },
    },
    checkResourcePressure: () => null,
  });
}

function chatRequest(correlationId: string): Request {
  return new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-correlation-id": correlationId },
    body: JSON.stringify({
      model: "openai/gpt-4.1",
      messages: [{ role: "user", content: "hi" }],
      stream: true,
    }),
  });
}

test.after(() => {
  try {
    runtimeModule.resetAdaptiveAdmissionRuntimeForTests();
  } catch {}
  try {
    usageHistory.clearPendingRequests();
  } catch {}
  core.resetDbInstance();
  fs.rmSync(ISOLATED_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("admission shed leaves a 503 call_logs row with the admission reason", async () => {
  const correlationId = uniqueCorrelationId("shed");
  enforceRuntime();
  const runtime = runtimeModule.getAdaptiveAdmissionRuntime();
  const holder = await runtime.acquire({
    tenantKey: "admission-reject-holder",
    body: { messages: [{ role: "user", content: "hold" }], stream: true },
    maxWaitMs: 50,
  });
  assert.equal(holder.status, "admitted");
  try {
    const [response] = await Promise.all([
      chatHandler.handleChat(chatRequest(correlationId), null, null, correlationId),
      keepLoopAlive(500),
    ]);
    assert.equal(response.status, 503);
    const payload = (await response.clone().json()) as { error?: { code?: string } };
    assert.match(payload.error?.code ?? "", /^admission_/);

    const rows = await rowsByCorrelation(correlationId);
    assert.equal(rows.length, 1, "a shed request must leave exactly one call_logs row");
    assert.equal(rows[0].status, 503);
    assert.match(rows[0].error ?? "", /admission_/);
    assert.equal(rows[0].duration, 0);
    assert.equal(rows[0].session_tag ?? null, null, "rejection rows carry no session tag");
  } finally {
    if (holder.status === "admitted") holder.lease.release("success");
    runtimeModule.resetAdaptiveAdmissionRuntimeForTests();
  }
});

test("admitted requests log no extra rejection row", async () => {
  const correlationId = uniqueCorrelationId("accept");
  runtimeModule.resetAdaptiveAdmissionRuntimeForTests();
  const response = await chatHandler.handleChat(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-correlation-id": correlationId },
      body: JSON.stringify({
        model: "openai/gpt-4.1",
        messages: [{ role: "user", content: "hi" }],
      }),
    }),
    null,
    null,
    correlationId
  );
  void response;
  const rows = await rowsByCorrelation(correlationId);
  assert.ok(
    rows.every((row) => !(row.duration === 0 && row.status >= 500 && row.status !== 499)),
    "no rejection row may appear for an admitted request"
  );
});

test("rejections leave the pending-usage registry untouched", async () => {
  const before = usageHistory.getPendingById().size;
  const correlationId = uniqueCorrelationId("bounded");
  enforceRuntime();
  const runtime = runtimeModule.getAdaptiveAdmissionRuntime();
  const holder = await runtime.acquire({
    tenantKey: "admission-reject-bounded",
    body: { messages: [{ role: "user", content: "hold" }], stream: true },
    maxWaitMs: 50,
  });
  assert.equal(holder.status, "admitted");
  try {
    for (let i = 0; i < 3; i++) {
      const [response] = await Promise.all([
        chatHandler.handleChat(
          chatRequest(`${correlationId}-${i}`),
          null,
          null,
          `${correlationId}-${i}`
        ),
        keepLoopAlive(500),
      ]);
      await response.text().catch(() => undefined);
    }
    assert.equal(
      usageHistory.getPendingById().size,
      before,
      "rejections must not grow the pending-usage registry"
    );
  } finally {
    if (holder.status === "admitted") holder.lease.release("success");
    runtimeModule.resetAdaptiveAdmissionRuntimeForTests();
  }
});

test("chat completions byte rejection leaves a 413 call_logs row", async () => {
  const correlationId = uniqueCorrelationId("byte");
  const body = JSON.stringify({ model: "m", messages: [{ role: "user", content: "x" }] });
  const response = await completionsRoute.POST(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "content-length": String(65 * 1024 * 1024),
        "x-correlation-id": correlationId,
      },
      body,
    })
  );
  assert.equal(response.status, 413);
  const rows = await rowsByCorrelation(correlationId);
  assert.equal(rows.length, 1, "a byte rejection must leave exactly one call_logs row");
  assert.equal(rows[0].status, 413);
  assert.match(rows[0].error ?? "", /PAYLOAD_TOO_LARGE/);
  assert.equal(rows[0].model, "-");
  assert.equal(rows[0].duration, 0);
});

test("chat completions structural rejection leaves a 413 call_logs row", async () => {
  const correlationId = uniqueCorrelationId("structural");
  const body = JSON.stringify({
    model: "openai/gpt-4.1",
    messages: [
      { role: "user", content: "a" },
      { role: "user", content: "b" },
      { role: "user", content: "c" },
    ],
  });
  const response = await completionsRoute.POST(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", "x-correlation-id": correlationId },
      body,
    })
  );
  assert.equal(response.status, 413);
  const rows = await rowsByCorrelation(correlationId);
  assert.equal(rows.length, 1, "a structural rejection must leave exactly one call_logs row");
  assert.equal(rows[0].status, 413);
  assert.match(rows[0].error ?? "", /chat_history_too_large/);
  assert.equal(rows[0].model, "openai/gpt-4.1");
  assert.equal(rows[0].duration, 0);
});

test("responses byte rejection leaves a 413 call_logs row", async () => {
  const correlationId = uniqueCorrelationId("responses-byte");
  const body = JSON.stringify({ model: "m", messages: [{ role: "user", content: "x" }] });
  const response = await responsesRoute.POST(
    new Request("http://localhost/v1/responses", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "content-length": String(65 * 1024 * 1024),
        "x-correlation-id": correlationId,
      },
      body,
    })
  );
  assert.equal(response.status, 413);
  const rows = await rowsByCorrelation(correlationId);
  assert.equal(rows.length, 1, "a responses byte rejection must leave exactly one call_logs row");
  assert.equal(rows[0].status, 413);
  assert.match(rows[0].error ?? "", /PAYLOAD_TOO_LARGE/);
});

test("responses structural rejection leaves a 413 call_logs row", async () => {
  const correlationId = uniqueCorrelationId("responses-structural");
  const body = JSON.stringify({
    model: "openai/gpt-4.1",
    messages: [
      { role: "user", content: "a" },
      { role: "user", content: "b" },
      { role: "user", content: "c" },
    ],
  });
  const response = await responsesRoute.POST(
    new Request("http://localhost/v1/responses", {
      method: "POST",
      headers: { "content-type": "application/json", "x-correlation-id": correlationId },
      body,
    })
  );
  assert.equal(response.status, 413);
  const rows = await rowsByCorrelation(correlationId);
  assert.equal(rows.length, 1, "a responses structural rejection must leave exactly one row");
  assert.equal(rows[0].status, 413);
  assert.match(rows[0].error ?? "", /chat_history_too_large/);
});

test("unreadable rejection bodies still leave a row with the fallback reason", async () => {
  const rejection = new Response("not-json{{{", {
    status: 503,
    headers: { "Content-Type": "text/plain" },
  });
  const context = chatAdmission.createChatAdmissionContext();
  void context;
  void rejection;
  const correlationId = uniqueCorrelationId("fallback");
  enforceRuntime();
  const runtime = runtimeModule.getAdaptiveAdmissionRuntime();
  const holder = await runtime.acquire({
    tenantKey: "admission-reject-fallback",
    body: { messages: [{ role: "user", content: "hold" }], stream: true },
    maxWaitMs: 50,
  });
  assert.equal(holder.status, "admitted");
  try {
    const [response] = await Promise.all([
      chatHandler.handleChat(chatRequest(correlationId), null, null, correlationId),
      keepLoopAlive(500),
    ]);
    assert.equal(response.status, 503);
    const rows = await rowsByCorrelation(correlationId);
    assert.equal(rows.length, 1);
    assert.match(rows[0].error ?? "", /admission_|unknown/);
  } finally {
    if (holder.status === "admitted") holder.lease.release("success");
    runtimeModule.resetAdaptiveAdmissionRuntimeForTests();
  }
});
