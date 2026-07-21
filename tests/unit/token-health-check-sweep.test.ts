/**
 * Regression test: sweep() re-entrancy guard.
 *
 * Bug: initTokenHealthCheck() schedules sweep() on both a one-shot startup
 * timer and a recurring setInterval(sweep, TICK_MS), both fire-and-forget
 * (unawaited). If a sweep is still processing connections (slowed down by
 * many OAuth connections plus the inter-connection stagger delay) when the
 * next tick fires, two sweeps could run concurrently — doubling upstream
 * refresh traffic and racing DB writes for the same connections.
 *
 * Fix: a `sweeping` boolean guard on the shared health-check global state is
 * set synchronously before the first `await` in sweep() and cleared in a
 * `finally` block, so a sweep() call that starts while another is already in
 * flight returns immediately instead of re-entering the loop.
 *
 * This test drives the REAL (unmocked) sweep() against a temp SQLite DB —
 * matching the tests/unit/apikey-connection-health-check.test.ts and
 * tests/unit/token-health-check.test.ts convention — rather than mocking
 * @/lib/localDb, since mock.module() is unavailable in this tsx/ESM + Node
 * native test-runner setup (see tests/unit/proxyfetch-undici-retry.test.ts
 * and tests/unit/rule12-error-sanitization-sweep.test.ts). Connections are
 * created with healthCheckInterval: 0 so checkConnection() is a fast no-op
 * (returns before any network/DB-write work), letting the test control
 * timing purely via the inter-batch HEALTHCHECK_STAGGER_MS delay.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.NODE_ENV = "test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sweep-reentrancy-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { sweep } = await import("../../src/lib/tokenHealthCheck.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error) {
      const code = (error as { code?: string } | undefined)?.code;
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  delete process.env.HEALTHCHECK_STAGGER_MS;
  delete process.env.HEALTHCHECK_JITTER_MIN_MS;
  delete process.env.HEALTHCHECK_JITTER_MAX_MS;
});

/** Read the shared health-check global state's `sweeping` flag. */
function isSweeping(): boolean {
  const hc = (globalThis as Record<string, unknown>).__omnirouteTokenHC as
    { sweeping?: boolean } | undefined;
  return hc?.sweeping ?? false;
}

/** Create `count` distinct OAuth connections whose checkConnection() is a fast no-op. */
async function createNoOpOauthConnections(count: number, namePrefix: string) {
  for (let i = 0; i < count; i++) {
    await providersDb.createProviderConnection({
      provider: "anthropic",
      name: `${namePrefix}-${i}`,
      authType: "oauth",
      isActive: true,
      healthCheckInterval: 0, // disabled — checkConnection() returns immediately (no network/db-write)
    });
  }
}

test("sweep() skips re-entrant calls while a previous sweep is still in flight", async () => {
  await resetStorage();
  process.env.HEALTHCHECK_STAGGER_MS = "300";
  process.env.HEALTHCHECK_JITTER_MIN_MS = "0";
  process.env.HEALTHCHECK_JITTER_MAX_MS = "0";
  await createNoOpOauthConnections(21, "reentrancy");

  const seeded = await providersDb.getProviderConnections({ authType: "oauth" });
  assert.equal(seeded.length, 21, "precondition: 21 oauth connections exist");
  assert.equal(isSweeping(), false, "precondition: no sweep in flight yet");

  const first = sweep();
  // sweep() sets state.sweeping = true synchronously before its first
  // `await`, so this is already true the instant sweep() returns control to
  // us — no microtask boundary needed to observe it.
  assert.equal(isSweeping(), true, "first sweep should mark sweeping=true immediately");

  const start = Date.now();
  await sweep(); // second, concurrent call — must be skipped by the guard
  const elapsedMs = Date.now() - start;

  // With 21 connections and a 300ms inter-batch stagger, a REAL second
  // sweep would take >= 300ms to clear the single batch gap. The guard must
  // make this call return near-
  // instantly instead of re-entering the loop.
  assert.ok(
    elapsedMs < 250,
    `re-entrant sweep() call should short-circuit almost instantly, took ${elapsedMs}ms`
  );

  // The first sweep is still running (its stagger delays haven't elapsed) —
  // proves the second call didn't reset or otherwise interfere with the
  // first sweep's in-flight state.
  assert.equal(isSweeping(), true, "first sweep should still be in flight after the skipped call");

  await first;
  assert.equal(isSweeping(), false, "sweeping flag clears once the in-flight sweep finishes");
});

test("sweep() resets the sweeping flag after a normal completion, allowing the next sweep to run", async () => {
  await resetStorage();
  process.env.HEALTHCHECK_STAGGER_MS = "0";
  await createNoOpOauthConnections(2, "sequential");

  await sweep();
  assert.equal(isSweeping(), false, "flag resets after first sweep completes");

  // A second, fully sequential call must not be skipped by leftover state —
  // it should run and complete normally rather than hang or short-circuit.
  await sweep();
  assert.equal(isSweeping(), false, "flag resets after second sweep completes too");
});

test("sweep() resets the sweeping flag even when there are no connections to process", async () => {
  await resetStorage();
  process.env.HEALTHCHECK_STAGGER_MS = "0";
  // No connections created — sweep() takes the early `connections.length === 0` return.

  await sweep();

  assert.equal(isSweeping(), false, "sweeping flag must be false after an empty sweep");
});
