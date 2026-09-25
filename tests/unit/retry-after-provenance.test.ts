/**
 * #13672 — Retry-After provenance on aggregated unavailable responses, opt-in via
 * RETRY_AFTER_PROVENANCE_ENABLED (default off).
 *
 * Flag off: unavailableResponse keeps the legacy header contract (always present,
 * clamped to >= 1s) and now adds structured retry fields only for a concrete future
 * signal; combo drain paths read those fields without enabling prose parsing.
 * Flag on: no concrete future retry time → no Retry-After header (never a synthetic 1s,
 * never "1" for an elapsed date); body carries error.retry_after_provenance; combo drain
 * paths also read prose hints from JSON and plain-text bodies.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-retry-provenance-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
const FLAG = "RETRY_AFTER_PROVENANCE_ENABLED";
delete process.env[FLAG];

const { unavailableResponse, parseProseRetryDelayMs, readProseRetryAfter } =
  await import("../../open-sse/utils/error.ts");
const { executeTargetAttempt } =
  await import("../../open-sse/services/combo/executeTargetAttempt.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const rrState = await import("../../open-sse/services/combo/rrState.ts");
const dbCore = await import("../../src/lib/db/core.ts");

function withFlag<T>(on: boolean, fn: () => T): T {
  if (on) process.env[FLAG] = "true";
  else delete process.env[FLAG];
  return fn();
}

test.afterEach(() => {
  delete process.env[FLAG];
});

test.after(() => {
  delete process.env[FLAG];
  try {
    dbCore.resetDbInstance();
  } catch {
    /* ignore */
  }
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const HOUR = 3_600_000;
type Input = string | number | Date | null | undefined;
const NO_SIGNAL: Array<[string, Input]> = [
  ["null", null],
  ["undefined", undefined],
  ["zero", 0],
  ["negative", -3],
  ["NaN", Number.NaN],
  ["Infinity", Number.POSITIVE_INFINITY],
  ["numeric string", "5"],
  ["empty string", ""],
  ["garbage string", "abc"],
  ["past ISO", new Date(Date.now() - HOUR).toISOString()],
  ["past Date", new Date(Date.now() - HOUR)],
  ["past epoch ms", Date.now() - HOUR],
];
const SIGNAL: Array<[string, Input]> = [
  ["seconds", 2],
  ["future ISO", new Date(Date.now() + HOUR).toISOString()],
  ["future Date", new Date(Date.now() + HOUR)],
  ["future epoch ms", Date.now() + HOUR],
];

async function readBody(res: Response) {
  return (await res.json()) as { error: Record<string, unknown> };
}

test("flag off: unavailableResponse keeps the legacy header and adds real reset timing", async () => {
  for (const [label, input] of [...NO_SIGNAL, ...SIGNAL]) {
    const res = withFlag(false, () => unavailableResponse(429, "drained", input));
    const header = res.headers.get("Retry-After");
    assert.ok(header !== null && Number(header) >= 1, `legacy header for ${label}: ${header}`);
    const body = await readBody(res);
    assert.equal(body.error.message, "drained", label);
    if (SIGNAL.some(([signalLabel]) => signalLabel === label)) {
      assert.equal(body.error.retry_after, Number(header), label);
      assert.equal(typeof body.error.reset_at, "string", label);
    } else {
      assert.equal("retry_after" in body.error, false, label);
      assert.equal("reset_at" in body.error, false, label);
    }
  }
  const nullRes = withFlag(false, () => unavailableResponse(503, "busy", null));
  assert.equal(nullRes.headers.get("Retry-After"), "1");
  const pastRes = withFlag(false, () =>
    unavailableResponse(429, "drained", new Date(Date.now() - HOUR).toISOString())
  );
  assert.equal(pastRes.headers.get("Retry-After"), "1");
  await nullRes.body?.cancel();
  await pastRes.body?.cancel();
});

test("flag on: no concrete future retry time omits Retry-After and says none", async () => {
  for (const [label, input] of NO_SIGNAL) {
    const res = withFlag(true, () => unavailableResponse(429, "drained", input));
    assert.equal(res.headers.get("Retry-After"), null, `no header for ${label}`);
    const body = await readBody(res);
    assert.equal(body.error.retry_after_provenance, "none", label);
    assert.equal(body.error.message, "drained");
  }
});

test("flag on: a concrete future retry time keeps the legacy header value and says signal", async () => {
  for (const [label, input] of SIGNAL) {
    const legacy = withFlag(false, () => unavailableResponse(429, "drained", input));
    const res = withFlag(true, () => unavailableResponse(429, "drained", input));
    const header = res.headers.get("Retry-After");
    assert.ok(header !== null, `header for ${label}`);
    assert.ok(
      Math.abs(Number(header) - Number(legacy.headers.get("Retry-After"))) <= 1,
      `${label}: ${header} vs legacy ${legacy.headers.get("Retry-After")}`
    );
    assert.equal((await readBody(res)).error.retry_after_provenance, "signal", label);
    await legacy.body?.cancel();
  }
});

test("parseProseRetryDelayMs reads Antigravity and generic prose, caps at 24h", () => {
  assert.equal(
    parseProseRetryDelayMs("Your quota will reset after 2h7m23s."),
    (2 * 3600 + 7 * 60 + 23) * 1000
  );
  assert.equal(parseProseRetryDelayMs("Rate limited. Please retry after 30 seconds"), 30_000);
  assert.equal(parseProseRetryDelayMs("quota will reset after 90h"), 24 * HOUR);
  assert.equal(parseProseRetryDelayMs("<html><body>502 Bad Gateway</body></html>"), null);
  assert.equal(parseProseRetryDelayMs(""), null);
  assert.equal(parseProseRetryDelayMs(undefined), null);
});

test("readProseRetryAfter is inert with the flag off", () => {
  assert.equal(
    withFlag(false, () => readProseRetryAfter("retry after 30s")),
    null
  );
  const iso = withFlag(true, () => readProseRetryAfter("retry after 30s"));
  assert.ok(iso && Math.abs(Date.parse(iso) - (Date.now() + 30_000)) < 5_000);
});

type Logged = { level: string; args: unknown[] };

function attemptFixture(response: () => Response) {
  const logs: Logged[] = [];
  const push =
    (level: string) =>
    (...args: unknown[]) =>
      logs.push({ level, args });
  const target = {
    kind: "model",
    stepId: "s1",
    executionKey: "ek-13672",
    modelStr: "openai/gpt-4o",
    provider: "openai",
    providerId: null,
    connectionId: "c-13672",
    weight: 1,
    label: null,
  };
  const deps = {
    strategy: "priority",
    combo: { name: "t13672", models: [] },
    config: {},
    log: { info: push("info"), warn: push("warn"), debug: push("debug"), error: push("error") },
    settings: null,
    resilienceSettings: { providerCooldown: { enabled: false } },
    sticky: { targets: [], messageHash: null, stuck: false },
    effectiveSessionId: null,
    preScreenMap: new Map(),
    quotaCutoffResetWindowConfig: {},
    maxRetries: 0,
    traceInvocationId: "inv-13672",
    clientRequestedStream: false,
    handleSingleModelWithTimeout: async () => response(),
    body: { messages: [{ role: "user", content: "hi" }] },
    startTime: Date.now(),
    releaseStickyPinOnFailure() {},
    clearStaleLKGP() {},
  };
  const state = {
    orderedTargets: [target],
    fallbackCount: 0,
    recordedAttempts: 0,
    comboErrors: [],
    lastError: null,
    lastStatus: null,
    earliestRetryAfter: null as string | null,
    comboExpired: false,
    exhaustedProviders: new Set(),
    exhaustedConnections: new Set(),
    transientRateLimitedProviders: new Set(),
    abortControllers: new Map([[0, new AbortController()]]),
    dispatchedTargets: new Set(),
    targetFailureTrust: new Map(),
    comboAttemptOrder: [],
    skippedForCircuitOpen: false,
    earliestCircuitOpenRetryMs: 0,
    globalAttempts: 0,
    observedFailure: false,
    allObservedFailuresQuota: true,
    observeFailure() {},
  };
  const run = () =>
    executeTargetAttempt({
      index: 0,
      state,
      deps,
      targetForAttempt: target,
      profile: {},
      protectedPriorityTarget: false,
    } as unknown as Parameters<typeof executeTargetAttempt>[0]);
  return { state, logs, run };
}

const hintLogs = (logs: Logged[], level: string) =>
  logs.filter((l) => l.level === level && /Retry hint unreadable/.test(String(l.args[1])));

const antigravityJson = () =>
  new Response(
    JSON.stringify({
      error: { message: "You have exhausted your capacity. Your quota will reset after 2h7m23s." },
    }),
    { status: 429, headers: { "Content-Type": "application/json" } }
  );
const plainText429 = () =>
  new Response("Too many requests. Please retry after 30s", { status: 429 });

test("drain path: JSON prose hint feeds earliestRetryAfter only with the flag on", async () => {
  const off = attemptFixture(antigravityJson);
  await withFlag(false, off.run);
  assert.equal(off.state.earliestRetryAfter, null, "flag off: legacy ignores prose");

  const on = attemptFixture(antigravityJson);
  await withFlag(true, on.run);
  const expected = Date.now() + (2 * 3600 + 7 * 60 + 23) * 1000;
  assert.ok(on.state.earliestRetryAfter, "flag on: prose hint recorded");
  assert.ok(Math.abs(Date.parse(on.state.earliestRetryAfter) - expected) < 10_000);
});

test("drain path: a plain-text (non-JSON) prose hint is read with the flag on", async () => {
  const off = attemptFixture(plainText429);
  await withFlag(false, off.run);
  assert.equal(off.state.earliestRetryAfter, null);

  const on = attemptFixture(plainText429);
  await withFlag(true, on.run);
  assert.ok(on.state.earliestRetryAfter, "plain-text hint recorded");
  assert.ok(Math.abs(Date.parse(on.state.earliestRetryAfter) - (Date.now() + 30_000)) < 10_000);
});

test("drain path: an HTML 502 page logs at debug, never warn", async () => {
  const html = attemptFixture(
    () => new Response("<html><body><h1>502 Bad Gateway</h1></body></html>", { status: 502 })
  );
  await withFlag(true, html.run);
  assert.equal(hintLogs(html.logs, "warn").length, 0, "no warn for an ordinary non-JSON body");
  assert.equal(hintLogs(html.logs, "debug").length, 1);
  assert.equal(html.state.earliestRetryAfter, null);
});

test("drain path: a failed clone still warns", async () => {
  const bad = new Response("plain 429", { status: 429 });
  Object.defineProperty(bad, "clone", {
    value() {
      throw new Error("clone boom");
    },
  });
  const fx = attemptFixture(() => bad);
  await fx.run();
  assert.equal(hintLogs(fx.logs, "warn").length, 1);
});

test("round-robin drain path: plain-text hint reaches the final Retry-After only with the flag on", async () => {
  const combo = {
    name: "rr13672",
    strategy: "round-robin",
    config: { maxRetries: 0, disableSessionStickiness: true },
    models: [{ kind: "model", provider: "openai", providerId: "openai", model: "m", id: "rr-0" }],
  };
  const dispatch = async () => {
    rrState.rrCounters.clear();
    rrState.rrStickyTargets.clear();
    return (await handleComboChat({
      body: { model: combo.name, messages: [{ role: "user", content: "hi" }], stream: false },
      combo,
      allCombos: [combo],
      isModelAvailable: async () => true,
      relayOptions: undefined,
      signal: undefined,
      settings: {},
      log: { info() {}, warn() {}, debug() {}, error() {} },
      handleSingleModel: async () => plainText429(),
    })) as Response;
  };

  delete process.env[FLAG];
  const off = await dispatch();
  assert.equal(off.headers.get("Retry-After"), null, "flag off: no hint read, legacy JSON error");
  assert.equal((await readBody(off)).error.retry_after_provenance, undefined);

  process.env[FLAG] = "true";
  const on = await dispatch();
  const header = Number(on.headers.get("Retry-After"));
  assert.ok(header >= 25 && header <= 30, `Retry-After from the plain-text hint, got ${header}`);
  assert.equal((await readBody(on)).error.retry_after_provenance, "signal");
});
