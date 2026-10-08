// Rejected wrapper requests leave a queryable call_logs row; admitted ones do not.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ISOLATED_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-wrapper-reject-"));
process.env.DATA_DIR = ISOLATED_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const { ChatAdmissionController } =
  await import("../../src/shared/middleware/chatBodyAdmission.ts");
const { withChatAdmission } = await import("../../src/shared/middleware/withChatAdmission.ts");

type RejectionRow = {
  status?: number;
  model?: string;
  error?: string | null;
  duration?: number;
  correlationId?: string;
  path?: string;
};

async function rowsByCorrelation(correlationId: string): Promise<Array<RejectionRow>> {
  // The wrapper log is fire-and-forget, so poll briefly for the row.
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    await callLogs.waitForCallLogSaves(1_000);
    const found = await callLogs.getCallLogs({ correlationId, limit: 50 });
    const rows = (Array.isArray(found) ? found : []).filter(
      (row: RejectionRow) => row.correlationId === correlationId
    );
    if (rows.length > 0) return rows;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  return [];
}

async function noRowsFor(correlationId: string): Promise<Array<RejectionRow>> {
  await callLogs.waitForCallLogSaves(500);
  const found = await callLogs.getCallLogs({ correlationId, limit: 50 });
  return (Array.isArray(found) ? found : []).filter(
    (row: RejectionRow) => row.correlationId === correlationId
  );
}

function uniqueCorrelationId(label: string): string {
  return `wrapper-reject-${label}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

function wrappedRequest(url: string, body: string, correlationId: string): Request {
  return new Request(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "content-length": String(body.length),
      "x-correlation-id": correlationId,
    },
    body,
  });
}

function smallOptions(controller: ChatAdmissionController, hardMaxBytes = 1024) {
  return { controller, largeBodyBytes: 32, hardMaxBytes, queueMs: 0 };
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(ISOLATED_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("oversize wrapper request leaves one 413 call_logs row and skips the handler", async () => {
  const correlationId = uniqueCorrelationId("oversize");
  const options = smallOptions(new ChatAdmissionController(1, undefined, 0), 10);
  const body = JSON.stringify({ model: "m", messages: [{ role: "user", content: "x" }] });

  let called = false;
  const guarded = withChatAdmission(async () => {
    called = true;
    return new Response("ok");
  }, options);
  const response = await guarded(
    wrappedRequest("http://localhost/v1/messages", body, correlationId)
  );
  assert.equal(response.status, 413);
  assert.equal(called, false);

  const rows = await rowsByCorrelation(correlationId);
  assert.equal(rows.length, 1, "an oversize wrapper request must leave exactly one call_logs row");
  assert.equal(rows[0].status, 413);
  assert.match(rows[0].error ?? "", /admission_|PAYLOAD_TOO_LARGE|unknown/);
  assert.equal(rows[0].model, "-");
  assert.equal(rows[0].duration, 0);
});

test("busy wrapper capacity leaves one 503 call_logs row and skips the handler", async () => {
  const correlationId = uniqueCorrelationId("busy");
  const controller = new ChatAdmissionController(1, undefined, 0);
  const options = smallOptions(controller);
  const body = JSON.stringify({ messages: [{ role: "user", content: "x".repeat(64) }] });
  const holder = controller.tryAcquireHeavy();
  assert.ok(holder);
  const headroom = controller.tryAcquireHealthyHeadroom();
  assert.equal(headroom, null);
  try {
    let called = false;
    const wrapped = withChatAdmission(async () => {
      called = true;
      return new Response("ok");
    }, options);
    const response = await wrapped(
      wrappedRequest("http://localhost/v1/messages", body, correlationId)
    );
    assert.equal(response.status, 503);
    assert.equal(called, false);

    const rows = await rowsByCorrelation(correlationId);
    assert.equal(rows.length, 1, "a shed wrapper request must leave exactly one call_logs row");
    assert.equal(rows[0].status, 503);
    assert.match(rows[0].error ?? "", /admission_|unknown/);
  } finally {
    holder.release();
  }
});

test("repeated wrapper rejections each leave a row with the request path", async () => {
  const controller = new ChatAdmissionController(1, undefined, 0);
  const wrapped = withChatAdmission(async () => new Response("ok"), smallOptions(controller, 10));
  const body = JSON.stringify({ model: "m", messages: [{ role: "user", content: "x" }] });
  const rounds = 3;
  const correlationIds = Array.from({ length: rounds }, (_, i) =>
    uniqueCorrelationId(`burst-${i}`)
  );
  for (const correlationId of correlationIds) {
    const response = await wrapped(
      wrappedRequest("http://localhost/v1/messages", body, correlationId)
    );
    assert.equal(response.status, 413);
  }
  for (const correlationId of correlationIds) {
    const rows = await rowsByCorrelation(correlationId);
    assert.equal(rows.length, 1, "every rejected request must leave exactly one call_logs row");
    assert.equal(rows[0].path, "/v1/messages");
  }
});

test("admitted wrapper requests log no rejection row", async () => {
  const correlationId = uniqueCorrelationId("admitted");
  const body = JSON.stringify({ model: "m", messages: [{ role: "user", content: "hi" }] });
  let executed = false;
  const guarded = withChatAdmission(
    async () => {
      executed = true;
      return new Response("ok", { status: 200 });
    },
    smallOptions(new ChatAdmissionController(1, undefined, 0))
  );
  const response = await guarded(
    wrappedRequest("http://localhost/v1/messages", body, correlationId)
  );
  assert.equal(response.status, 200);
  assert.equal(executed, true);
  const rows = await noRowsFor(correlationId);
  assert.ok(
    rows.every((row) => !(row.duration === 0 && row.error)),
    "no rejection row may appear for an admitted request"
  );
});

test("wrapper rejection keeps the response status and headers unchanged", async () => {
  const correlationId = uniqueCorrelationId("untouched");
  const controller = new ChatAdmissionController(1, undefined, 0);
  const wrapped = withChatAdmission(async () => new Response("ok"), smallOptions(controller, 10));
  const body = JSON.stringify({ model: "m", messages: [{ role: "user", content: "x" }] });
  const response = await wrapped(
    wrappedRequest("http://localhost/v1/messages", body, correlationId)
  );
  assert.equal(response.status, 413);
  assert.match(response.headers.get("content-type") ?? "", /application\/json/);
  const payload = (await response.clone().json()) as { error?: { code?: string } };
  assert.equal(payload.error?.code, "PAYLOAD_TOO_LARGE");
  await rowsByCorrelation(correlationId);
});
