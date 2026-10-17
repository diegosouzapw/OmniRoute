import { performance } from "node:perf_hooks";
import type { SqliteAdapter } from "./types";

const WARN_EVERY_MS = 10_000;
type Operation =
  | "prepare"
  | "run"
  | "get"
  | "all"
  | "exec"
  | "pragma"
  | "transaction"
  | "immediate"
  | "checkpoint"
  | "close";

export function readSlowSqliteThreshold(value: string | undefined): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 1 ? parsed : null;
}

/** Opt-in synchronous-operation timing; never inspect SQL, bindings, rows or errors. */
export function instrumentSqliteAdapter(
  db: SqliteAdapter,
  options: { thresholdMs?: number | null; now?: () => number; log?: (message: string) => void } = {}
): SqliteAdapter {
  const thresholdMs =
    options.thresholdMs === undefined
      ? readSlowSqliteThreshold(process.env.OMNIROUTE_SQLITE_SLOW_MS)
      : options.thresholdMs;
  if (thresholdMs === null || !Number.isFinite(thresholdMs) || thresholdMs < 1) return db;
  const now = options.now ?? (() => performance.now());
  const log = options.log ?? ((message: string) => console.warn(message));
  let lastWarnAt = -Infinity;
  function measure<T>(operation: Operation, fn: () => T): T {
    const start = now();
    try {
      return fn();
    } finally {
      const end = now();
      const elapsedMs = end - start;
      if (elapsedMs >= thresholdMs! && end - lastWarnAt >= WARN_EVERY_MS) {
        lastWarnAt = end;
        // A diagnostic sink must never mask either a DB result or its original error.
        try {
          log(
            `[SQLITE-SLOW] driver=${db.driver} operation=${operation} elapsedMs=${Math.round(elapsedMs)}`
          );
        } catch {}
      }
    }
  }
  return {
    get driver() {
      return db.driver;
    },
    get open() {
      return db.open;
    },
    get name() {
      return db.name;
    },
    get inTransaction() {
      return db.inTransaction;
    },
    get raw() {
      return db.raw;
    },
    prepare(sql) {
      const stmt = measure("prepare", () => db.prepare(sql));
      return {
        run: (...params) => measure("run", () => stmt.run(...params)),
        get: (...params) => measure("get", () => stmt.get(...params)),
        all: (...params) => measure("all", () => stmt.all(...params)),
      };
    },
    exec(sql) {
      measure("exec", () => db.exec(sql));
    },
    pragma(sql, opts) {
      return measure("pragma", () => db.pragma(sql, opts));
    },
    transaction(fn) {
      const tx = db.transaction(fn);
      // Preserve driver-specific transaction properties and the caller's this/arguments.
      return new Proxy(tx, {
        apply(target, thisArg, args) {
          return measure("transaction", () => Reflect.apply(target, thisArg, args));
        },
      });
    },
    immediate(fn) {
      measure("immediate", () => db.immediate(fn));
    },
    // Async elapsed time is not evidence of blocking the event loop.
    backup(destination) {
      return db.backup(destination);
    },
    checkpoint(mode) {
      measure("checkpoint", () => db.checkpoint(mode));
    },
    close() {
      measure("close", () => db.close());
    },
  };
}
