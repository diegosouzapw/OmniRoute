// #12135: "[BUG] Heavy /v1/responses still 503 chat_admission_busy after MAX_HEAVY is
// raised: QUEUE_MS and Retry-After: 1 are far shorter than SSE occupancy".
//
// A heavyweight admission lease is held for the ENTIRE SSE lifetime (tens of seconds to
// minutes), but the retryable 503 advertised a fixed `Retry-After: 1` (structural path)
// or `Retry-After: 2` (byte-stage path) regardless of how long capacity had actually been
// busy or how long the waiter had already spent in the bounded queue. Clients that honor
// the header (Codex CLI, agent fan-out) re-sent the same ~1 MiB body every second into a
// gate that could not possibly have cleared, producing a `queue_timeout` retry storm.
//
// The maintainer scoped the fix on the issue: "A `Retry-After` derived from observed
// lease age/occupancy would be honest." These tests pin that contract WITHOUT touching
// the queue posture (`OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` default), which the maintainer
// explicitly left as a separate decision:
//  (a) after a `queue_timeout`, `Retry-After` is at least the queue window the waiter
//      already exhausted — never less than what the server itself needed;
//  (b) `Retry-After` reflects the observed age of the in-flight heavy lease (time since
//      heavyweight capacity last turned over), on BOTH the structural and byte-stage 503s;
//  (c) the hint is capped so a multi-minute stream never tells a client to sleep for
//      minutes when another slot may free sooner;
//  (d) an idle gate (fresh lease, no queue) still answers exactly as before (1 s / 2 s),
//      so no existing client behavior changes on a quiet host;
//  (e) with the count cap raised, a third heavy `/v1/responses` request is queued and
//      admitted when a lease frees inside `queueMs` instead of being rejected.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  admitChatRequest,
  admitChatStructure,
  ChatAdmissionController,
  type ChatAdmissionLease,
} from "../../src/shared/middleware/chatBodyAdmission.ts";

/** The reporter's shape: a Codex `/v1/responses` session with ~70 function tools. */
function responsesHeavyBody() {
  const tools = Array.from({ length: 70 }, (_, i) => ({
    type: "function",
    name: `tool_${i}`,
    description: "a".repeat(64),
    parameters: { type: "object", properties: {} },
  }));
  return {
    model: "gpt-5.6-sol",
    input: [{ role: "user", content: "run the plan" }],
    tools,
    stream: true,
  };
}

const NOOP_SHED_SINK = () => {};

function heavyController(maxHeavyInFlight: number): ChatAdmissionController {
  // healthyHeadroom=0 forces the bounded-wait/shed path; the sink keeps pino quiet.
  return new ChatAdmissionController(maxHeavyInFlight, undefined, 0, NOOP_SHED_SINK);
}

type Rejected = { admit: false; response: Response };

function admitStructure(
  controller: ChatAdmissionController,
  queueMs: number
): ReturnType<typeof admitChatStructure> {
  return admitChatStructure(responsesHeavyBody(), null, {
    controller,
    queueMs,
    heapPressureCheck: () => true,
  });
}

async function holdStructural(controller: ChatAdmissionController): Promise<ChatAdmissionLease> {
  const holder = await admitStructure(controller, 0);
  assert.equal(holder.admit, true);
  const lease = (holder as { admit: true; lease: ChatAdmissionLease | null }).lease;
  assert.ok(lease, "the first heavy request must hold the heavyweight lease");
  return lease;
}

/** Let a pending admission park in the queue before the mocked clock advances. */
async function settleMicrotasks(): Promise<void> {
  for (let i = 0; i < 8; i++) await Promise.resolve();
}

test("#12135 (a): structural queue_timeout 503 advertises at least the exhausted queue window", async (t) => {
  t.mock.timers.enable({ apis: ["Date", "setTimeout"] });
  const controller = heavyController(1);
  const lease = await holdStructural(controller);
  try {
    const pending = admitStructure(controller, 5_000);
    await settleMicrotasks();
    assert.equal(controller.waitingCount, 1, "the second heavy request must park, not fail fast");
    t.mock.timers.tick(5_000);
    const result = (await pending) as Rejected;
    assert.equal(result.admit, false);
    assert.equal(result.response.status, 503);
    assert.equal(
      result.response.headers.get("Retry-After"),
      "5",
      "Retry-After must not be shorter than the queue window the waiter already burned"
    );
    const body = await result.response.json();
    assert.equal(body.error?.code, "chat_admission_busy");
    assert.equal(body.error?.reason, "structure_limit");
  } finally {
    lease.release();
  }
});

test("#12135 (b): structural 503 Retry-After reflects the observed age of the in-flight lease", async (t) => {
  t.mock.timers.enable({ apis: ["Date", "setTimeout"] });
  const controller = heavyController(1);
  const lease = await holdStructural(controller);
  try {
    // The holder streams for 45 s; a fast-fail (queueMs=0) arrival must be told to wait
    // on the order of what capacity has demonstrably been busy for, not 1 s.
    t.mock.timers.tick(45_000);
    const result = (await admitStructure(controller, 0)) as Rejected;
    assert.equal(result.admit, false);
    assert.equal(result.response.status, 503);
    assert.equal(result.response.headers.get("Retry-After"), "45");
  } finally {
    lease.release();
  }
});

test("#12135 (b): Retry-After is the age of the YOUNGEST live lease — time since capacity last turned over", async (t) => {
  t.mock.timers.enable({ apis: ["Date", "setTimeout"] });
  const controller = heavyController(2);
  const first = await holdStructural(controller);
  t.mock.timers.tick(40_000);
  const second = await holdStructural(controller);
  try {
    t.mock.timers.tick(7_000);
    const result = (await admitStructure(controller, 0)) as Rejected;
    assert.equal(result.admit, false);
    // first is 47 s old, second is 7 s old: every slot has been continuously held for
    // at least 7 s, so that is the honest occupancy floor — not the 47 s pessimist.
    assert.equal(result.response.headers.get("Retry-After"), "7");
  } finally {
    second.release();
    first.release();
  }
});

test("#12135 (c): the occupancy-derived hint is capped", async (t) => {
  t.mock.timers.enable({ apis: ["Date", "setTimeout"] });
  const controller = heavyController(1);
  const lease = await holdStructural(controller);
  try {
    t.mock.timers.tick(10 * 60_000);
    const result = (await admitStructure(controller, 0)) as Rejected;
    assert.equal(result.admit, false);
    // CHAT_ADMISSION_RETRY_AFTER_MAX_SECONDS: a 10-minute-old stream must not advertise
    // 600 s — another slot may free long before that.
    assert.equal(result.response.headers.get("Retry-After"), "60");
  } finally {
    lease.release();
  }
});

function largeRequest(): Request {
  const body = JSON.stringify({ messages: [{ role: "user", content: "x".repeat(40) }] });
  return new Request("http://localhost/v1/responses", {
    method: "POST",
    headers: { "content-type": "application/json", "content-length": String(body.length) },
    body,
  });
}

test("#12135 (b): byte-stage 503 (admitChatRequest) carries the same occupancy-derived Retry-After", async (t) => {
  t.mock.timers.enable({ apis: ["Date", "setTimeout"] });
  const controller = heavyController(1);
  const options = { controller, largeBodyBytes: 32, hardMaxBytes: 1024, queueMs: 0 };
  const first = await admitChatRequest(largeRequest(), options);
  assert.equal(first.admit, true);
  if (!first.admit) return;
  try {
    t.mock.timers.tick(30_000);
    const second = (await admitChatRequest(largeRequest(), options)) as Rejected;
    assert.equal(second.admit, false);
    assert.equal(second.response.status, 503);
    assert.equal(second.response.headers.get("Retry-After"), "30");
    assert.equal((await second.response.json()).error.code, "chat_admission_busy");
  } finally {
    first.lease?.release();
  }
});

test("#12135 (d): an idle gate keeps the historical 1 s (structural) and 2 s (byte-stage) floors", async () => {
  const structural = heavyController(1);
  const structuralLease = await holdStructural(structural);
  try {
    const result = (await admitStructure(structural, 0)) as Rejected;
    assert.equal(result.admit, false);
    assert.equal(result.response.headers.get("Retry-After"), "1");
  } finally {
    structuralLease.release();
  }

  const byteStage = heavyController(1);
  const options = { controller: byteStage, largeBodyBytes: 32, hardMaxBytes: 1024, queueMs: 0 };
  const first = await admitChatRequest(largeRequest(), options);
  assert.equal(first.admit, true);
  if (!first.admit) return;
  try {
    const second = (await admitChatRequest(largeRequest(), options)) as Rejected;
    assert.equal(second.admit, false);
    assert.equal(second.response.headers.get("Retry-After"), "2");
  } finally {
    first.lease?.release();
  }
});

test("#12135 (e): with the count cap raised, a third heavy /v1/responses request queues and is admitted when a lease frees inside queueMs", async (t) => {
  t.mock.timers.enable({ apis: ["Date", "setTimeout"] });
  const controller = heavyController(2);
  const first = await holdStructural(controller);
  const second = await holdStructural(controller);
  assert.equal(controller.activeHeavy, 2);
  const pending = admitStructure(controller, 10_000);
  await settleMicrotasks();
  assert.equal(controller.waitingCount, 1, "the third request must wait, not 503");
  t.mock.timers.tick(1_000);
  first.release();
  const third = await pending;
  assert.equal(third.admit, true, "a freed lease inside the queue window must admit the waiter");
  if (third.admit) third.lease?.release();
  second.release();
  assert.equal(controller.activeHeavy, 0);
});
