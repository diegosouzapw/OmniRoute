import { test } from "node:test";
import assert from "node:assert/strict";
import { ensureDbReadyForBoot } from "../../src/instrumentation-node";

// Regression guard for #7773: on Termux/Android, when the whole SQLite driver
// cascade (better-sqlite3 -> node:sqlite -> sql.js) fails at boot,
// ensureDbReadyForBoot() used to re-throw the fatal error WITHOUT ever
// logging it, and this happens before initConsoleInterceptor() runs — so the
// one message that would explain the crash never reached app.log. The server
// kept listening (hence "OmniRoute is running") but every DB-touching route
// 500s forever with a permanently empty log.

function captureConsole(): { captured: string[]; restore: () => void } {
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalLog = console.log;
  const captured: string[] = [];
  const join = (args: unknown[]): string => args.map((arg) => String(arg)).join(" ");
  console.error = (...args: unknown[]) => {
    captured.push(join(args));
  };
  console.warn = (...args: unknown[]) => {
    captured.push(join(args));
  };
  console.log = (...args: unknown[]) => {
    captured.push(join(args));
  };
  return {
    captured,
    restore: () => {
      console.error = originalError;
      console.warn = originalWarn;
      console.log = originalLog;
    },
  };
}

test("issue #7773: a fatal (non-transient) boot-time DB init failure must be logged before it propagates", async () => {
  const { captured, restore } = captureConsole();

  // Mirrors the real message driverFactory.ts's openSqliteDatabase() throws once
  // better-sqlite3 + node:sqlite are both unavailable AND sql.js pre-init itself
  // failed (core.ts:172-176) — the exact shape a Termux install with no working
  // SQLite driver at all would surface.
  const fatalMessage =
    "[DB] Nenhum driver SQLite disponível para '/data/data/com.termux/files/home/.omniroute/storage.sqlite'. " +
    "Drivers testados: better-sqlite3 (falhou), node:sqlite (indisponível), " +
    "sql.js (falhou: ENOENT: no such file or directory, open '.../sql-wasm.wasm').";

  const fakeEnsureDbInitialized = async () => {
    throw new Error(fatalMessage);
  };

  try {
    await assert.rejects(
      () => ensureDbReadyForBoot(fakeEnsureDbInitialized),
      (err: Error) => err.message === fatalMessage
    );

    const loggedRootCause = captured.some((line) => line.includes(fatalMessage));
    assert.equal(
      loggedRootCause,
      true,
      "Expected the fatal boot-time DB init failure to be logged (console.error/warn) " +
        "before propagating, so app.log captures the real driver-cascade failure reason " +
        "instead of staying empty (#7773). It was NOT logged."
    );
  } finally {
    restore();
  }
});

test("issue #7773: a fatal failure on the retry-after-#6560 path must also be logged before it propagates", async () => {
  const { captured, restore } = captureConsole();

  const fatalMessage = "[DB] sql.js pre-init failed: WASM asset missing on retry";
  let calls = 0;
  const fakeEnsureDbInitialized = async () => {
    calls += 1;
    if (calls === 1) {
      // Triggers the existing #6560 transient-retry branch first.
      throw "Database closed";
    }
    throw new Error(fatalMessage);
  };

  try {
    await assert.rejects(
      () => ensureDbReadyForBoot(fakeEnsureDbInitialized),
      (err: Error) => err.message === fatalMessage
    );
    assert.equal(calls, 2, "must have retried exactly once before the fatal retry failure");

    const loggedRootCause = captured.some((line) => line.includes(fatalMessage));
    assert.equal(
      loggedRootCause,
      true,
      "Expected the fatal retry-path DB init failure to also be logged before propagating (#7773)."
    );
  } finally {
    restore();
  }
});

test("ensureDbReadyForBoot does not log anything extra on a clean successful boot", async () => {
  const { captured, restore } = captureConsole();
  const fakeEnsureDbInitialized = async () => {};

  try {
    await assert.doesNotReject(ensureDbReadyForBoot(fakeEnsureDbInitialized));
    assert.equal(captured.length, 0, "a successful boot must not emit any startup DB log lines");
  } finally {
    restore();
  }
});
