import assert from "node:assert/strict";
import test from "node:test";

import { CircuitBreaker } from "../../src/shared/utils/circuitBreaker.ts";

test("#13836: an unsettled half-open probe releases its lease", (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 1_000 });

  const resetTimeout = 30_000;
  const breaker = new CircuitBreaker(`cb-13836-${process.pid}-${Date.now()}`, {
    failureThreshold: 1,
    resetTimeout,
    halfOpenRequests: 1,
  });

  breaker._onFailure();
  t.mock.timers.tick(resetTimeout);
  assert.equal(breaker.canExecute(), true);

  void breaker.execute(() => new Promise<never>(() => {}));
  assert.equal(breaker.canExecute(), false);

  t.mock.timers.tick(resetTimeout - 1);
  assert.equal(breaker.canExecute(), false);

  t.mock.timers.tick(1);
  assert.equal(breaker.canExecute(), true);
});

test("#13836: an expired probe cannot settle a newer probe generation", async (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 1_000 });

  const resetTimeout = 30_000;
  const breaker = new CircuitBreaker(`cb-13836-stale-${process.pid}-${Date.now()}`, {
    failureThreshold: 1,
    resetTimeout,
    halfOpenRequests: 1,
  });

  breaker._onFailure();
  t.mock.timers.tick(resetTimeout);

  let settleExpiredProbe!: () => void;
  const expiredProbe = breaker.execute(
    () =>
      new Promise<void>((resolve) => {
        settleExpiredProbe = resolve;
      })
  );

  t.mock.timers.tick(resetTimeout);
  assert.equal(breaker.canExecute(), true);

  let settleCurrentProbe!: () => void;
  const currentProbe = breaker.execute(
    () =>
      new Promise<void>((resolve) => {
        settleCurrentProbe = resolve;
      })
  );

  settleExpiredProbe();
  await expiredProbe;
  assert.equal(breaker.state, "HALF_OPEN");
  assert.equal(breaker.canExecute(), false);

  settleCurrentProbe();
  await currentProbe;
  assert.equal(breaker.state, "CLOSED");
});

test("an occupied resolved probe settles once even when ordinary result accounting is ignored", async (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 1_000 });
  const breaker = new CircuitBreaker(`cb-occupied-${process.pid}-${Date.now()}`, {
    failureThreshold: 1,
    resetTimeout: 30_000,
  });
  breaker._onFailure();
  t.mock.timers.tick(30_000);
  let finish!: (value: { success: boolean }) => void;
  let acquired = 0;
  const probe = breaker.execute(
    () =>
      new Promise<{ success: boolean }>((resolve) => {
        finish = resolve;
      }),
    {
      classifyResult: () => "ignore",
      classifyProbeResult: (result) => (result.success ? "success" : "failure"),
      onProbeAcquired: () => {
        acquired++;
      },
    }
  );
  assert.equal(breaker.canExecute(), false);
  finish({ success: true });
  await probe;
  assert.equal(acquired, 1);
  assert.equal(breaker.state, "CLOSED");
  assert.equal(breaker.successCount, 1);
});

test("an expired classified probe cannot settle a newer probe generation", async (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 1_000 });
  const breaker = new CircuitBreaker(`cb-classified-stale-${process.pid}-${Date.now()}`, {
    failureThreshold: 1,
    resetTimeout: 30_000,
  });
  breaker._onFailure();
  t.mock.timers.tick(30_000);
  let finishOld!: (value: { success: boolean }) => void;
  const old = breaker.execute(
    () =>
      new Promise<{ success: boolean }>((resolve) => {
        finishOld = resolve;
      }),
    { classifyProbeResult: (result) => (result.success ? "success" : "failure") }
  );
  t.mock.timers.tick(30_000);
  assert.equal(breaker.canExecute(), true);
  let finishNew!: (value: { success: boolean }) => void;
  const current = breaker.execute(
    () =>
      new Promise<{ success: boolean }>((resolve) => {
        finishNew = resolve;
      }),
    { classifyProbeResult: (result) => (result.success ? "success" : "failure") }
  );
  finishOld({ success: true });
  await old;
  assert.equal(breaker.state, "HALF_OPEN");
  finishNew({ success: false });
  await current;
  assert.equal(breaker.state, "OPEN");
});

test("#13836: an expired probe failure cannot fail a newer probe generation", async (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 1_000 });

  const resetTimeout = 30_000;
  const breaker = new CircuitBreaker(`cb-13836-stale-failure-${process.pid}-${Date.now()}`, {
    failureThreshold: 1,
    resetTimeout,
    halfOpenRequests: 1,
  });

  breaker._onFailure();
  t.mock.timers.tick(resetTimeout);

  let failExpiredProbe!: (error: Error) => void;
  const expiredProbe = breaker.execute(
    () =>
      new Promise<never>((_resolve, reject) => {
        failExpiredProbe = reject;
      })
  );

  t.mock.timers.tick(resetTimeout);
  assert.equal(breaker.canExecute(), true);

  let settleCurrentProbe!: () => void;
  const currentProbe = breaker.execute(
    () =>
      new Promise<void>((resolve) => {
        settleCurrentProbe = resolve;
      })
  );

  failExpiredProbe(new Error("expired probe failed"));
  await assert.rejects(expiredProbe, /expired probe failed/);
  assert.equal(breaker.state, "HALF_OPEN");
  assert.equal(breaker.canExecute(), false);

  settleCurrentProbe();
  await currentProbe;
  assert.equal(breaker.state, "CLOSED");
});
