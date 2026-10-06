// #503-fanout: coding-agent fan-out (multiple subagents / CLIs hitting the
// proxy concurrently, often sharing one API key) landed on the legacy
// count-based chat admission gate (default CHAT_MAX_HEAVY_IN_FLIGHT=1) and
// serialized to an effective concurrency of ~1, so a burst of concurrent
// requests mostly hung, retried, and then received 503 chat_admission_busy.
//
// This is the Hard-Rule-#18 TDD regression guard: the first test below
// reproduces the OLD behavior exactly as it shipped (a plain
// `new ChatAdmissionController(1)`, matching the pre-fix production default)
// to document why the bug happened. The remaining tests exercise the SAME
// `admitChatRequest` code path with the controller shape the FIXED
// production singleton now builds (an effectively unlimited legacy count cap
// plus a real, host-derived ingest byte budget) and prove the fan-out no
// longer serializes or 503s.
import test from "node:test";
import assert from "node:assert/strict";

const { ChatAdmissionController, admitChatRequest } = await import(
  "../../src/shared/middleware/chatBodyAdmission.ts"
);

const silentSink = () => {};

function agentBody(bytes = 400_000): string {
  // Shape of a real coding-agent turn: a big system prompt + many tool
  // definitions serialized as one JSON string. The exact content does not
  // matter here — only the byte size, which is what the ingest gate charges.
  const filler = "x".repeat(Math.max(0, bytes - 64));
  return JSON.stringify({ model: "test-model", messages: [{ role: "user", content: filler }] });
}

function agentRequest(body: string): Request {
  return new Request("http://x/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "content-length": String(body.length) },
    body,
  });
}

test("OLD behavior: 8 concurrent agent-fanout requests mostly 503 under the count=1 gate", async () => {
  // Matches the pre-fix production default exactly (CHAT_MAX_HEAVY_IN_FLIGHT
  // defaulted to 1 unconditionally). This documents the bug; it is not
  // expected to change as part of this fix — the legacy count cap still
  // behaves identically when an operator (or a test) constructs it directly.
  const controller = new ChatAdmissionController(1, undefined, 0, silentSink);
  const body = agentBody();
  const requests = Array.from({ length: 8 }, () => agentRequest(body));

  const results = await Promise.all(
    requests.map((request) =>
      admitChatRequest(request, {
        controller,
        sessionId: "same-api-key",
        largeBodyBytes: 1024,
        hardMaxBytes: 10 * 1024 * 1024,
        queueMs: 0,
      })
    )
  );

  const admitted = results.filter((r) => r.admit === true);
  const shed = results.filter((r) => r.admit === false);
  assert.equal(admitted.length, 1, "the count=1 gate admits exactly one of the eight");
  assert.equal(shed.length, 7, "the remaining seven are shed under the old gate");
  for (const result of shed) {
    if (result.admit) continue;
    assert.equal(result.response.status, 503);
    const payload = await result.response.json();
    assert.equal(payload.error.code, "chat_admission_busy");
  }

  for (const result of admitted) {
    if (result.admit) result.lease?.release();
  }
});

test("FIX: the same 8-request agent fan-out all admit under the byte-budget gate", async () => {
  // Shape of the fixed production singleton: legacy count cap disabled
  // (Number.MAX_SAFE_INTEGER — matches resolveLegacyCountCap()'s unset-env
  // default) and a real ingest byte budget generously larger than the burst.
  const controller = new ChatAdmissionController(Number.MAX_SAFE_INTEGER, undefined, 0, silentSink, {
    maxInflightBytes: 8 * 1024 * 1024, // 8 MiB — 8 x ~400 KB bodies fit comfortably
    checkPressureSeverity: () => "normal",
  });
  const body = agentBody();
  const requests = Array.from({ length: 8 }, () => agentRequest(body));

  const start = Date.now();
  const results = await Promise.all(
    requests.map((request) =>
      admitChatRequest(request, {
        controller,
        sessionId: "same-api-key",
        largeBodyBytes: 1024,
        hardMaxBytes: 10 * 1024 * 1024,
        queueMs: 2000,
      })
    )
  );
  const elapsedMs = Date.now() - start;

  const shed = results.filter((r) => r.admit === false);
  assert.equal(shed.length, 0, "no request should be shed once concurrency is byte-budgeted");
  assert.equal(results.length, 8);
  assert.ok(
    elapsedMs < 1000,
    `admission must resolve promptly, not serialize behind the old count=1 gate (took ${elapsedMs}ms)`
  );

  assert.equal(
    controller.inflightBytes,
    body.length * 8,
    "sanity: every one of the eight requests charged its real body size before any release"
  );

  for (const result of results) {
    if (result.admit) result.lease?.release();
  }
  assert.equal(controller.inflightBytes, 0, "every charge is released");
});

test("FIX: distinct sessions in the same fan-out are also all admitted (not just a shared API key)", async () => {
  const controller = new ChatAdmissionController(Number.MAX_SAFE_INTEGER, undefined, 0, silentSink, {
    maxInflightBytes: 8 * 1024 * 1024,
    checkPressureSeverity: () => "normal",
  });
  const body = agentBody();

  const results = await Promise.all(
    Array.from({ length: 8 }, (_, index) =>
      admitChatRequest(agentRequest(body), {
        controller,
        sessionId: `session-${index}`,
        largeBodyBytes: 1024,
        hardMaxBytes: 10 * 1024 * 1024,
        queueMs: 2000,
      })
    )
  );

  assert.equal(
    results.filter((r) => r.admit === false).length,
    0,
    "distinct sessions must not starve each other or the shared budget"
  );

  for (const result of results) {
    if (result.admit) result.lease?.release();
  }
});

test("critical resource pressure still sheds the entire fan-out (the gate is pressure-driven, not removed)", async () => {
  const controller = new ChatAdmissionController(Number.MAX_SAFE_INTEGER, undefined, 0, silentSink, {
    maxInflightBytes: 8 * 1024 * 1024,
    checkPressureSeverity: () => "critical",
  });
  const body = agentBody();

  const results = await Promise.all(
    Array.from({ length: 8 }, () =>
      admitChatRequest(agentRequest(body), {
        controller,
        sessionId: "same-api-key",
        largeBodyBytes: 1024,
        hardMaxBytes: 10 * 1024 * 1024,
        queueMs: 2000,
      })
    )
  );

  assert.equal(
    results.filter((r) => r.admit === true).length,
    0,
    "critical pressure must shed the whole burst, not just serialize it"
  );
  for (const result of results) {
    if (result.admit) continue;
    assert.equal(result.response.status, 503);
    const payload = await result.response.json();
    assert.equal(payload.error.code, "resource_pressure");
  }
});
