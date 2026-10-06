// #11244: visibility for the STRUCTURAL chat admission gate
// (src/shared/middleware/chatBodyAdmission.ts — the bounded heavyweight lease +
// healthy-headroom path from #10110/#10437, NOT the adaptive shadow-mode layer in
// open-sse/services/admission/). The 503 chat_admission_busy shed returns BEFORE
// request logging, so today a shed is invisible: no counter, no log line, and the
// process-wide snapshot (PerConnectionAdmissionController.snapshot()) reports only
// live state (activeHeavy/queuedBytes/waiting/lanes) with no shed history.
//
// These tests pin the observability contract WITHOUT changing admission behavior:
//  (a) every structural shed (503 chat_admission_busy) increments an in-memory
//      counter — total + per reason ("queue_timeout" when the bounded wait expires,
//      "queued_bytes_budget" when the queued-bytes heap valve refuses to park) —
//      while a client abort mid-wait is NOT a shed (capacity was never denied);
//  (b) the process-wide snapshot exposes shedTotal + shedsByReason next to the
//      existing live fields;
//  (c) each shed emits exactly one structured pino warn carrying
//      reason/activeHeavy/waiting and the HMAC session fingerprint — never the raw
//      API key (resolveSessionId already fingerprints the credential).
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Configure the shared pino logger BEFORE importing the admission module — the
// logger builds its transports at import time (see logger-redaction-wiring.test.ts
// for the same pattern). JSON to a temp file keeps test (c)'s capture deterministic.
const logDir = mkdtempSync(join(tmpdir(), "omniroute-admission-11244-"));
const logFile = join(logDir, "app.log");
process.env.NODE_ENV = "production";
process.env.APP_LOG_TO_FILE = "true";
process.env.APP_LOG_FILE_PATH = logFile;

const {
  ChatAdmissionController,
  PerConnectionAdmissionController,
  perConnectionAdmissionController,
  admitChatStructure,
  resolveSessionId,
} = await import("../../src/shared/middleware/chatBodyAdmission.ts");

function heavyBody() {
  return {
    messages: Array.from({ length: 200 }, () => ({ role: "user", content: "x".repeat(40) })),
    tools: [] as unknown[],
  };
}

const heapHealthy = () => false; // "not under pressure" — the healthy-heap fast path
const heapPressured = () => true; // forces the bounded-wait/shed path deterministically
const silentSink = () => {}; // keep non-logging tests off the pino transport

test("#11244 (a): a structural shed after the bounded wait increments shedTotal and shedsByReason", async () => {
  // Primary lease (1) + bounded healthy-headroom (1): two concurrent heavy requests
  // admit on a healthy heap; the third must wait queueMs and then shed with a 503.
  const controller = new ChatAdmissionController(1, undefined, 1, silentSink);

  const first = await admitChatStructure(heavyBody(), null, {
    controller,
    heapPressureCheck: heapHealthy,
    queueMs: 0,
  });
  const second = await admitChatStructure(heavyBody(), null, {
    controller,
    heapPressureCheck: heapHealthy,
    queueMs: 0,
  });
  assert.equal(first.admit, true, "first heavy request takes the primary lease");
  assert.equal(second.admit, true, "second heavy request takes the bounded headroom lease");
  assert.equal(controller.shedTotal, 0, "admitted requests never count as sheds");
  assert.deepEqual(controller.shedsByReason, {});

  const shed = await admitChatStructure(heavyBody(), null, {
    controller,
    heapPressureCheck: heapHealthy,
    queueMs: 50,
  });
  assert.equal(shed.admit, false, "third heavy request must shed once both budgets are busy");
  if (!shed.admit) {
    assert.equal(shed.response.status, 503);
    const payload = await shed.response.json();
    assert.equal(payload.error.code, "chat_admission_busy");
  }

  assert.equal(
    controller.shedTotal,
    1,
    "the shed must be counted even though it skips request logging"
  );
  assert.deepEqual(
    controller.shedsByReason,
    { queue_timeout: 1 },
    "a bounded wait that expires with no freed capacity is a queue_timeout shed"
  );

  // Counters are history, not live state: releasing the leases must not rewind them.
  if (first.admit) first.lease?.release();
  if (second.admit) second.lease?.release();
  assert.equal(controller.shedTotal, 1, "shed history survives lease release");

  // And a subsequently admitted request must not be counted.
  const fourth = await admitChatStructure(heavyBody(), null, {
    controller,
    heapPressureCheck: heapHealthy,
    queueMs: 0,
  });
  assert.equal(fourth.admit, true);
  assert.equal(controller.shedTotal, 1);
  if (fourth.admit) fourth.lease?.release();
});

test("#11244 (a2): the queued-bytes heap valve rejection is counted with its own reason", async () => {
  // maxQueuedBytes smaller than the conservative 256KB structural wait weight: the
  // valve refuses to park and the shed must be distinguishable from a queue timeout.
  const controller = new ChatAdmissionController(1, 1024, 0, silentSink);

  const first = await admitChatStructure(heavyBody(), null, {
    controller,
    heapPressureCheck: heapPressured,
    queueMs: 0,
  });
  assert.equal(first.admit, true);

  const shed = await admitChatStructure(heavyBody(), null, {
    controller,
    heapPressureCheck: heapPressured,
    queueMs: 1000,
  });
  assert.equal(shed.admit, false);
  if (!shed.admit) assert.equal(shed.response.status, 503);
  assert.equal(controller.shedTotal, 1);
  assert.deepEqual(controller.shedsByReason, { queued_bytes_budget: 1 });

  if (first.admit) first.lease?.release();
});

test("#11244 (a3): a client abort while parked is not a shed — capacity was never denied", async () => {
  const controller = new ChatAdmissionController(1, undefined, 0, silentSink);

  const first = await admitChatStructure(heavyBody(), null, {
    controller,
    heapPressureCheck: heapPressured,
    queueMs: 0,
  });
  assert.equal(first.admit, true);

  const abort = new AbortController();
  const pending = admitChatStructure(heavyBody(), null, {
    controller,
    heapPressureCheck: heapPressured,
    queueMs: 5000,
    signal: abort.signal,
  });
  setTimeout(() => abort.abort(), 20);
  const result = await pending;
  assert.equal(
    result.admit,
    false,
    "the caller still answers a (dropped) 503 on the dead connection"
  );
  assert.equal(controller.shedTotal, 0, "an aborted wait frees capacity instead of shedding");
  assert.deepEqual(controller.shedsByReason, {});

  if (first.admit) first.lease?.release();
});

test("#11244 (b): the process-wide snapshot exposes shed counters next to the live fields", async () => {
  const empty = perConnectionAdmissionController.snapshot();
  assert.equal(typeof empty.activeHeavy, "number");
  assert.equal(typeof empty.queuedBytes, "number");
  assert.equal(typeof empty.waiting, "number");
  assert.ok(Array.isArray(empty.lanes));
  assert.equal(
    empty.shedTotal,
    0,
    "no shed happened through the production singleton in this process"
  );
  assert.deepEqual(empty.shedsByReason, {});

  // A shed recorded through a session's controller surfaces in the aggregate snapshot.
  const pc = new PerConnectionAdmissionController(1, { onShed: silentSink });
  const controller = pc.getController("key_visibility11244");
  controller.recordShed("queue_timeout", "key_visibility11244");
  controller.recordShed("queue_timeout", "key_visibility11244");
  controller.recordShed("queued_bytes_budget", "key_visibility11244");

  const snap = pc.snapshot();
  assert.equal(snap.shedTotal, 3);
  assert.deepEqual(snap.shedsByReason, { queue_timeout: 2, queued_bytes_budget: 1 });
});

test("#11244 (c): each shed logs one structured warn with the session fingerprint, never the raw key", async () => {
  const rawKey = "visRAWSECRETtoken11244xyz"; // matches no logRedaction pattern — a leak would show verbatim
  const fingerprint = resolveSessionId(
    new Request("http://localhost/v1/chat/completions", {
      headers: { authorization: `Bearer ${rawKey}` },
    })
  );
  assert.ok(fingerprint.startsWith("key_"), "resolveSessionId returns the HMAC fingerprint");
  assert.ok(!fingerprint.includes(rawKey));

  // Default sink (no injected onShed): the shed must go through the shared pino logger.
  const controller = new ChatAdmissionController(1);
  const primary = controller.tryAcquireHeavy();
  assert.ok(primary);

  const shed = await admitChatStructure(heavyBody(), null, {
    controller,
    heapPressureCheck: heapPressured,
    queueMs: 25,
    sessionId: fingerprint,
  });
  assert.equal(shed.admit, false);
  primary.release();

  // Poll the worker-thread-written log file until the shed line lands.
  const deadline = Date.now() + 4000;
  let contents = "";
  while (Date.now() < deadline) {
    if (existsSync(logFile)) {
      contents = readFileSync(logFile, "utf8");
      if (contents.includes("chat_admission_busy")) break;
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  assert.ok(contents.includes("chat_admission_busy"), "the shed log line names the rejection code");
  assert.match(
    contents,
    /"level":(40|"warn")/,
    "sheds log at warn level (numeric 40 when the file transport strips the level formatter)"
  );
  assert.ok(contents.includes('"module":"chat-admission"'), "the log is scoped to the gate");
  assert.ok(contents.includes('"reason":"queue_timeout"'), "the shed reason is structured");
  assert.ok(contents.includes('"activeHeavy":1'), "live state travels with the log line");
  assert.ok(contents.includes(fingerprint), "the lane fingerprint allows per-key correlation");
  assert.ok(!contents.includes(rawKey), "the raw API key must never reach the shed log");
});
