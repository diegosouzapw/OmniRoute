import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";

// The uniform egress regime has its own route so a failure there can never
// break the pool screen. These tests pin its shape, its null-on-failure
// contract, its opt-in flag (PROXY_POOL_EGRESS_OBSERVATION, default off) and
// its Zod parameter checks (provider required, hours 1..24 defaulting to 1).
// Rows go through INSERT statements with the columns the readers use.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-uniform-egress-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const observation = await import("../../src/lib/proxyPoolEgressObservation.ts");
const { GET } = await import("../../src/app/api/settings/proxies/pool/uniform-egress/route.ts");

function resetStorage() {
  delete process.env.INITIAL_PASSWORD;
  process.env.PROXY_POOL_EGRESS_OBSERVATION = "true";
  observation.resetUniformEgressRegimeCache();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  delete process.env.PROXY_POOL_EGRESS_OBSERVATION;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function request(base: string, query: Record<string, string>): Request {
  const params = new URLSearchParams(query);
  return new Request(`http://localhost${base}?${params.toString()}`, { method: "GET" });
}

const REGIME_PATH = "/api/settings/proxies/pool/uniform-egress";

function insertLog(
  provider: string,
  host: string,
  upstreamStatus: number | null,
  ageMs = 30 * 60 * 1000
) {
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO proxy_logs (id, timestamp, status, proxy_type, proxy_host, proxy_port, provider, target_url, upstream_status)
       VALUES (?, ?, 'error', 'http', ?, 8080, ?, 'https://api.example.com/v1/chat', ?)`
    )
    .run(randomUUID(), new Date(Date.now() - ageMs).toISOString(), host, provider, upstreamStatus);
}

function seedUniformProvider(provider: string, exits = 15, perExit = 6, failing = 3) {
  for (let exit = 0; exit < exits; exit++) {
    for (let n = 0; n < perExit; n++) {
      insertLog(provider, `10.9.2.${exit + 1}`, n < failing ? 503 : 200);
    }
  }
}

test("returns the regime with exactly the documented keys", async () => {
  seedUniformProvider("acme");
  const response = await GET(request(REGIME_PATH, { provider: "acme" }));
  assert.equal(response.status, 200);
  const body = (await response.json()) as Record<string, unknown>;
  assert.deepEqual(Object.keys(body).sort(), [
    "affectedExits",
    "attempts",
    "exitsTouched",
    "exitsWithTraffic",
    "measured",
    "provider",
    "share5xx",
    "state",
    "uniform",
    "windowHours",
  ]);
  assert.equal(body.provider, "acme");
  assert.equal(body.uniform, true);
  assert.equal(body.state, "measured");
  assert.equal(body.windowHours, 1);
});

test("a single affected exit reads back as not uniform", async () => {
  for (let n = 0; n < 6; n++) insertLog("solo-ish", "10.9.3.1", n < 5 ? 503 : 200);
  for (let exit = 2; exit <= 5; exit++) {
    for (let n = 0; n < 6; n++) insertLog("solo-ish", `10.9.3.${exit}`, 200);
  }
  const response = await GET(request(REGIME_PATH, { provider: "solo-ish" }));
  assert.equal(response.status, 200);
  const body = (await response.json()) as Record<string, unknown>;
  assert.equal(body.uniform, false);
  assert.equal(body.state, "measured");
});

test("an unknown provider reads back as null", async () => {
  const response = await GET(request(REGIME_PATH, { provider: "nobody" }));
  assert.equal(response.status, 200);
  assert.equal(await response.json(), null);
});

test("returns null with status 200 when the read fails", async () => {
  seedUniformProvider("acme");
  const db = core.getDbInstance();
  db.exec("ALTER TABLE proxy_logs RENAME TO proxy_logs_hidden");
  try {
    const response = await GET(request(REGIME_PATH, { provider: "acme" }));
    assert.equal(response.status, 200);
    assert.equal(await response.json(), null);
  } finally {
    db.exec("ALTER TABLE proxy_logs_hidden RENAME TO proxy_logs");
  }
});

test("returns null when the feature flag is at its default (off) or turned off", async () => {
  seedUniformProvider("acme");
  for (const value of [undefined, "false"]) {
    if (value === undefined) delete process.env.PROXY_POOL_EGRESS_OBSERVATION;
    else process.env.PROXY_POOL_EGRESS_OBSERVATION = value;
    observation.resetUniformEgressRegimeCache();
    const response = await GET(request(REGIME_PATH, { provider: "acme" }));
    assert.equal(response.status, 200);
    assert.equal(await response.json(), null, String(value));
  }
});

test("rejects a missing or blank provider with 400", async () => {
  for (const query of [{}, { provider: "" }, { provider: "   " }]) {
    const response = await GET(request(REGIME_PATH, query));
    assert.equal(response.status, 400, JSON.stringify(query));
    const body = (await response.json()) as { error?: { message?: string } };
    assert.equal(typeof body?.error?.message, "string");
    assert.ok(!body.error!.message!.includes("at /"), "no stack trace in the error body");
  }
});

test("defaults hours to 1 and rejects hours outside 1..24", async () => {
  seedUniformProvider("acme");
  const defaulted = await GET(request(REGIME_PATH, { provider: "acme" }));
  assert.equal(((await defaulted.json()) as Record<string, unknown>).windowHours, 1);
  const explicit = await GET(request(REGIME_PATH, { provider: "acme", hours: "3" }));
  assert.equal(((await explicit.json()) as Record<string, unknown>).windowHours, 3);
  for (const hours of ["0", "25", "abc"]) {
    const response = await GET(request(REGIME_PATH, { provider: "acme", hours }));
    assert.equal(response.status, 400, hours);
  }
});
