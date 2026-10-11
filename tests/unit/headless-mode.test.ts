/**
 * R0.1 headless mode (rail 3.8.53): `OMNIROUTE_HEADLESS=1` boots only the proxy
 * engine — `/v1/*`, `/api/monitoring/health` and the auth surface keep working,
 * the optional boot subsystems are skipped and the dashboard answers 404.
 *
 * Covers the single source of truth (`src/lib/system/headless.ts`), the route
 * gate in `src/proxy.ts` and the boot gate in `src/instrumentation-node.ts`.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { NextRequest } from "next/server";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-headless-"));
process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.OMNIROUTE_HEADLESS;

const headless = await import("../../src/lib/system/headless.ts");
const core = await import("../../src/lib/db/core.ts");
const { proxy } = await import("../../src/proxy.ts");
const instrumentationNode = await import("../../src/instrumentation-node.ts");

test.after(() => {
  delete process.env.OMNIROUTE_HEADLESS;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function withHeadlessEnv<T>(value: string | undefined, fn: () => Promise<T>): Promise<T> {
  const previous = process.env.OMNIROUTE_HEADLESS;
  if (value === undefined) delete process.env.OMNIROUTE_HEADLESS;
  else process.env.OMNIROUTE_HEADLESS = value;
  return fn().finally(() => {
    if (previous === undefined) delete process.env.OMNIROUTE_HEADLESS;
    else process.env.OMNIROUTE_HEADLESS = previous;
  });
}

async function readHeadlessError(res: Response): Promise<string | null> {
  if (res.status !== 404) return null;
  try {
    const body = (await res.clone().json()) as { error?: unknown };
    return typeof body.error === "string" ? body.error : null;
  } catch {
    return null;
  }
}

// ── isHeadless() ─────────────────────────────────────────────────────────────

test("isHeadless: truthy values enable headless mode", () => {
  for (const value of ["1", "true", "TRUE", "yes", "on", " 1 "]) {
    assert.equal(headless.isHeadless({ OMNIROUTE_HEADLESS: value }), true, `value=${value}`);
  }
});

test("isHeadless: falsy values keep the full server", () => {
  for (const value of ["0", "false", "no", "off", "", "garbage"]) {
    assert.equal(headless.isHeadless({ OMNIROUTE_HEADLESS: value }), false, `value=${value}`);
  }
});

test("isHeadless: an absent variable keeps the full server (default off)", () => {
  assert.equal(headless.isHeadless({}), false);
});

test("isHeadless: reads process.env when no env is injected", async () => {
  await withHeadlessEnv("1", async () => assert.equal(headless.isHeadless(), true));
  await withHeadlessEnv(undefined, async () => assert.equal(headless.isHeadless(), false));
});

// ── Route gate helper ────────────────────────────────────────────────────────

test("isHeadlessDisabledPath: dashboard pages only", () => {
  for (const p of ["/dashboard", "/dashboard/", "/dashboard/providers", "/home", "/home/x"]) {
    assert.equal(headless.isHeadlessDisabledPath(p), true, p);
  }
  for (const p of [
    "/",
    "/v1/models",
    "/v1/chat/completions",
    "/api/monitoring/health",
    "/api/auth/login",
    "/dashboards",
    "/homepage",
    "/api/dashboard",
  ]) {
    assert.equal(headless.isHeadlessDisabledPath(p), false, p);
  }
});

test("headlessGateResponse: 404 JSON for the dashboard when headless", async () => {
  const res = headless.headlessGateResponse("/dashboard", { OMNIROUTE_HEADLESS: "1" });
  assert.ok(res, "a response must be returned");
  assert.equal(res.status, 404);
  assert.match(res.headers.get("content-type") || "", /application\/json/);
  assert.deepEqual(await res.json(), { error: "dashboard disabled (headless)" });
});

test("headlessGateResponse: null when headless is off or the path is not gated", () => {
  assert.equal(headless.headlessGateResponse("/dashboard", {}), null);
  assert.equal(headless.headlessGateResponse("/v1/models", { OMNIROUTE_HEADLESS: "1" }), null);
});

// ── src/proxy.ts ─────────────────────────────────────────────────────────────

test("proxy (headless): /dashboard and /dashboard/* answer 404 JSON", async () => {
  await withHeadlessEnv("1", async () => {
    for (const p of ["/dashboard", "/dashboard/providers", "/home"]) {
      const res = await proxy(new NextRequest(`http://localhost${p}`));
      assert.equal(res.status, 404, p);
      assert.equal(await readHeadlessError(res), "dashboard disabled (headless)", p);
    }
  });
});

test("proxy (headless): /v1/models, /api/monitoring/health and /api/auth/* are not gated", async () => {
  await withHeadlessEnv("1", async () => {
    for (const p of ["/v1/models", "/api/monitoring/health", "/api/auth/login"]) {
      const res = await proxy(new NextRequest(`http://localhost${p}`));
      assert.equal(await readHeadlessError(res), null, `${p} must reach the authz pipeline`);
    }
  });
});

test("proxy (not headless): /dashboard is unchanged (no headless 404)", async () => {
  await withHeadlessEnv(undefined, async () => {
    const res = await proxy(new NextRequest("http://localhost/dashboard"));
    assert.equal(await readHeadlessError(res), null);
  });
});

// ── Boot gate (src/instrumentation-node.ts) ─────────────────────────────────

function fakeSubsystems(names: string[]) {
  const calls: string[] = [];
  const subsystems = names.map((name) => ({
    name,
    start: async () => {
      calls.push(name);
    },
  }));
  return { calls, subsystems };
}

test("boot (headless): optional subsystems are never started", async () => {
  const { calls, subsystems } = fakeSubsystems(["a", "b", "c"]);
  const logs: string[] = [];
  const started = await instrumentationNode.startOptionalBootSubsystems(subsystems, {
    env: { OMNIROUTE_HEADLESS: "1" },
    log: (line: string) => logs.push(line),
  });
  assert.deepEqual(calls, []);
  assert.deepEqual(started, []);
  assert.ok(
    logs.some((line) => line.includes("Headless mode") && line.includes("a, b, c")),
    "the skip must be logged with the subsystem names"
  );
});

test("boot (not headless): every optional subsystem is started", async () => {
  const { calls, subsystems } = fakeSubsystems(["a", "b", "c"]);
  const started = await instrumentationNode.startOptionalBootSubsystems(subsystems, {
    env: {},
    log: () => {},
  });
  assert.deepEqual([...calls].sort(), ["a", "b", "c"]);
  assert.deepEqual([...started].sort(), ["a", "b", "c"]);
});

test("boot (not headless): one failing subsystem does not stop the others", async () => {
  const calls: string[] = [];
  const started = await instrumentationNode.startOptionalBootSubsystems(
    [
      { name: "boom", start: async () => Promise.reject(new Error("boom")) },
      { name: "ok", start: async () => void calls.push("ok") },
    ],
    { env: {}, log: () => {} }
  );
  assert.deepEqual(calls, ["ok"]);
  assert.deepEqual(started, ["ok"]);
});

test("boot: skipInHeadless gates serial optional steps and logs the skip", () => {
  const logs: string[] = [];
  const log = (line: string) => logs.push(line);
  assert.equal(headless.skipInHeadless("cloud-sync", { OMNIROUTE_HEADLESS: "1" }, log), true);
  assert.equal(headless.skipInHeadless("cloud-sync", {}, log), false);
  assert.equal(logs.length, 1);
  assert.match(logs[0], /Headless mode.*cloud-sync/);
});

test("boot: the default optional table holds the optional subsystems, not the proxy core", () => {
  const names = instrumentationNode.OPTIONAL_BOOT_SUBSYSTEMS.map((s) => s.name);
  for (const expected of [
    "embedded-services",
    "embed-ws-proxy",
    "conductor-bridge",
    "arena-elo-sync",
    "radar-sync",
    "pricing-sync",
    "openrouter-provider-stats",
    "models-dev-sync",
    "live-dashboard-ws",
  ]) {
    assert.ok(names.includes(expected), `optional table must include ${expected}`);
  }
  for (const core of [
    "auto-refresh-daemon",
    "connection-recovery",
    "context-window-reconcile",
    // Memory is cross-cutting to the request pipeline (/v1 injects and queries
    // memory), so it is NOT an optional subsystem and must keep running headless.
    "memory-backends",
    "memory-decay-sweep",
  ]) {
    assert.ok(!names.includes(core), `${core} is proxy-engine core and must not be gated`);
  }
});

test("boot wiring: registerNodejs routes optional inits through the headless gates", () => {
  const source = fs.readFileSync("src/instrumentation-node.ts", "utf8");
  const body = source.slice(source.indexOf("export async function registerNodejs"));
  assert.match(body, /startOptionalBootSubsystems\(\)/);
  assert.match(body, /skipInHeadless\("free-proxy-sync"\)/);
  assert.match(body, /skipInHeadless\("cloud-sync"\)/);
});

test("boot (headless): the memory subsystems stay on the core path and still start", () => {
  const source = fs.readFileSync("src/instrumentation-node.ts", "utf8");
  const tableStart = source.indexOf("export const OPTIONAL_BOOT_SUBSYSTEMS");
  const tableEnd = source.indexOf("export async function startOptionalBootSubsystems");
  const table = source.slice(tableStart, tableEnd);
  const body = source.slice(source.indexOf("export async function registerNodejs"));
  for (const mod of ['import("@/lib/memory/index")', 'import("@/lib/memory/typedDecay")']) {
    assert.ok(!table.includes(mod), `${mod} must not be in the headless-skipped table`);
    assert.ok(body.includes(mod), `${mod} must be started inline by registerNodejs`);
  }
  // Inline core inits are not wrapped by any headless guard.
  assert.doesNotMatch(body, /skipInHeadless\("memory/);
});
