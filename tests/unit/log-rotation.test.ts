import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import {
  existsSync,
  writeFileSync,
  readFileSync,
  statSync,
  readdirSync,
  mkdtempSync,
  rmSync,
  renameSync,
} from "fs";
import { join } from "path";
import { tmpdir } from "os";
import pino from "pino";

// Dynamically import the module under test so we can control env vars per subtest.
const { getAppLogRotationCheckInterval } = await import("../../src/lib/logRotation.ts");

test("getAppLogRotationCheckInterval — default", () => {
  delete process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS;
  assert.equal(getAppLogRotationCheckInterval(), 60_000);
});

test("getAppLogRotationCheckInterval — custom ms", () => {
  process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS = "30000";
  try {
    assert.equal(getAppLogRotationCheckInterval(), 30_000);
  } finally {
    delete process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS;
  }
});

test("getAppLogRotationCheckInterval — invalid value falls back to default", () => {
  process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS = "not-a-number";
  try {
    assert.equal(getAppLogRotationCheckInterval(), 60_000);
  } finally {
    delete process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS;
  }
});

test("getAppLogRotationCheckInterval — zero/negative falls back to default", () => {
  process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS = "0";
  try {
    assert.equal(getAppLogRotationCheckInterval(), 60_000);
  } finally {
    delete process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS;
  }
});

// ── rotateIfNeeded ────────────────────────────────────────────────────────────

test("rotateIfNeeded — skips when file does not exist", async () => {
  const { rotateIfNeeded } = await import("../../src/lib/logRotation.ts");
  rotateIfNeeded("/non/existent/path.log", 50 * 1024 * 1024); // must not throw
});

test("rotateIfNeeded — skips when file is below max size", async () => {
  const { rotateIfNeeded } = await import("../../src/lib/logRotation.ts");
  const dir = mkdtempSync(join(tmpdir(), `rot-test-small-${Date.now()}-`));
  const logPath = join(dir, "app.log");
  writeFileSync(logPath, "small content\n");

  try {
    // Call with explicit maxSize (50 MB) — bypasses any cached env-level config.
    rotateIfNeeded(logPath, 50 * 1024 * 1024);
    // File must still exist and not be rotated
    assert.ok(existsSync(logPath), "log file should still exist");
    // rotated = files that match the rotated pattern AND are NOT the active log itself
    const rotated = readdirSync(dir).filter(
      (f) => f.startsWith("app.") && f.endsWith(".log") && f !== "app.log"
    );
    assert.equal(rotated.length, 0, "no rotated files expected");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("rotateIfNeeded — rotates when file exceeds max size", async () => {
  const { rotateIfNeeded } = await import("../../src/lib/logRotation.ts?ctx=rotates-large");
  const dir = mkdtempSync(join(tmpdir(), `rot-test-large-${Date.now()}-`));
  const logPath = join(dir, "app.log");
  // Write content larger than 100 bytes to trigger rotation (maxSize = 100)
  writeFileSync(logPath, "x".repeat(150));

  try {
    const rotatedPath = rotateIfNeeded(logPath, 100) as unknown as string | null;
    assert.ok(rotatedPath, "rotation must report the rotated file path");
    // Original file must have been renamed
    assert.ok(!existsSync(logPath), "original log file should be renamed");
    const rotated = readdirSync(dir).find(
      (f) => f.startsWith("app.") && f.endsWith(".log") && f !== "app.log"
    );
    assert.ok(rotated, "a rotated file should exist");
    assert.equal(join(dir, rotated as string), rotatedPath, "reported path must match");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

// ── closeLogRotation ───────────────────────────────────────────────────────────

test("closeLogRotation — idempotent (safe to call twice)", async () => {
  // Temporarily set a very short check interval so initLogRotation starts a timer.
  process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS = "10000";
  const { initLogRotation, closeLogRotation } = await import("../../src/lib/logRotation.ts");

  try {
    initLogRotation(); // starts a timer
    closeLogRotation(); // stops it
    closeLogRotation(); // must not throw — idempotent
  } finally {
    delete process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS;
  }
});

// ── Periodic rotation timer — integration ──────────────────────────────────────

test("periodic timer actually fires and rotates a large log", async () => {
  // Use a short interval (250 ms) and small max size to trigger rotation quickly.
  process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS = "250";
  const { initLogRotation, closeLogRotation } = await import("../../src/lib/logRotation.ts");

  const dir = mkdtempSync(join(tmpdir(), `rot-test-periodic-${Date.now()}-`));
  const logPath = join(dir, "app.log");
  // Write a file just under the 1 MB threshold
  writeFileSync(logPath, "y".repeat(900 * 1024));

  try {
    // Override max file size to 1 MB via env (parseFileSize handles the suffix)
    process.env.APP_LOG_MAX_FILE_SIZE = "1M";
    initLogRotation();

    // Append enough to exceed 1 MB — after the next timer tick (≤250 ms)
    // the rotation should trigger.
    await new Promise<void>((resolve) => setTimeout(resolve, 600));
    writeFileSync(logPath, "y".repeat(200 * 1024)); // now 1.1 MB total

    await new Promise<void>((resolve) => setTimeout(resolve, 600));

    const rotatedExists =
      readdirSync(dir).filter((f) => f.startsWith("app.") && f.endsWith(".log")).length > 0;
    assert.ok(
      rotatedExists,
      "a rotated file should exist after periodic check fired on an oversized log"
    );
  } finally {
    closeLogRotation();
    delete process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS;
    delete process.env.APP_LOG_MAX_FILE_SIZE;
    rmSync(dir, { recursive: true, force: true });
  }
});

// (cleanup done inline with rmSync)

// ── Rotation listeners ─────────────────────────────────────────────────────────

test("rotation listeners receive the current path once per rotation", async () => {
  const { rotateIfNeeded, onLogRotation } =
    await import("../../src/lib/logRotation.ts?ctx=listeners-once");
  const dir = mkdtempSync(join(tmpdir(), `rot-test-listeners-${Date.now()}-`));
  const logPath = join(dir, "app.log");
  writeFileSync(logPath, "x".repeat(150));

  const received: string[] = [];
  let unsubscribe: (() => void) | undefined;
  try {
    unsubscribe = onLogRotation((currentPath: string) => {
      received.push(currentPath);
    });
    const rotatedPath = rotateIfNeeded(logPath, 100) as unknown as string | null;
    assert.ok(rotatedPath, "rotation must report the rotated file path");
    assert.deepEqual(received, [logPath], "listener must be called once with the current path");
  } finally {
    unsubscribe?.();
    rmSync(dir, { recursive: true, force: true });
  }
});

test("a failing listener does not block the others", async () => {
  const { rotateIfNeeded, onLogRotation } =
    await import("../../src/lib/logRotation.ts?ctx=listeners-isolated");
  const dir = mkdtempSync(join(tmpdir(), `rot-test-listener-fail-${Date.now()}-`));
  const logPath = join(dir, "app.log");
  writeFileSync(logPath, "x".repeat(150));

  let count = 0;
  let first: (() => void) | undefined;
  let second: (() => void) | undefined;
  try {
    first = onLogRotation(() => {
      throw new Error("listener down");
    });
    second = onLogRotation(() => {
      count += 1;
    });
    const rotatedPath = rotateIfNeeded(logPath, 100) as unknown as string | null;
    assert.ok(rotatedPath, "rotation must still report its path despite a failing listener");
    assert.equal(count, 1, "the healthy listener must still run once");
  } finally {
    first?.();
    second?.();
    rmSync(dir, { recursive: true, force: true });
  }
});

test("no notification when nothing rotated", async () => {
  const { rotateIfNeeded, onLogRotation } =
    await import("../../src/lib/logRotation.ts?ctx=listeners-silent");
  const dir = mkdtempSync(join(tmpdir(), `rot-test-listener-silent-${Date.now()}-`));
  const logPath = join(dir, "app.log");
  writeFileSync(logPath, "small content\n");

  let calls = 0;
  let unsubscribe: (() => void) | undefined;
  try {
    unsubscribe = onLogRotation(() => {
      calls += 1;
    });
    const below = rotateIfNeeded(logPath, 50 * 1024 * 1024) as unknown as string | null;
    assert.equal(below, null, "below the size limit there is nothing to rotate");
    const missing = rotateIfNeeded(join(dir, "missing.log"), 100) as unknown as string | null;
    assert.equal(missing, null, "a missing file has nothing to rotate");
    assert.equal(calls, 0, "no listener call expected without rotation");
  } finally {
    unsubscribe?.();
    rmSync(dir, { recursive: true, force: true });
  }
});

test("duplicate subscription notifies once", async () => {
  const { rotateIfNeeded, onLogRotation } =
    await import("../../src/lib/logRotation.ts?ctx=listeners-duplicate");
  const dir = mkdtempSync(join(tmpdir(), `rot-test-listener-dup-${Date.now()}-`));
  const logPath = join(dir, "app.log");
  writeFileSync(logPath, "x".repeat(150));

  let calls = 0;
  let unsubscribe: (() => void) | undefined;
  try {
    const listener = () => {
      calls += 1;
    };
    const first = onLogRotation(listener);
    onLogRotation(listener);
    unsubscribe = first;
    rotateIfNeeded(logPath, 100);
    assert.equal(calls, 1, "the same listener subscribed twice must run once per rotation");
  } finally {
    unsubscribe?.();
    rmSync(dir, { recursive: true, force: true });
  }
});

test("unsubscribing stops further notifications", async () => {
  const { rotateIfNeeded, onLogRotation } =
    await import("../../src/lib/logRotation.ts?ctx=listeners-unsub");
  const dir = mkdtempSync(join(tmpdir(), `rot-test-listener-unsub-${Date.now()}-`));
  const logPath = join(dir, "app.log");

  let firstCalls = 0;
  let secondCalls = 0;
  let first: (() => void) | undefined;
  let second: (() => void) | undefined;
  try {
    first = onLogRotation(() => {
      firstCalls += 1;
    });
    second = onLogRotation(() => {
      secondCalls += 1;
    });
    writeFileSync(logPath, "x".repeat(150));
    assert.ok(rotateIfNeeded(logPath, 100), "first rotation must happen");
    assert.equal(firstCalls, 1, "first listener must run once");
    assert.equal(secondCalls, 1, "second listener must run once");
    first();
    first = undefined;
    writeFileSync(logPath, "x".repeat(150));
    assert.ok(rotateIfNeeded(logPath, 100), "second rotation must happen");
    assert.equal(firstCalls, 1, "unsubscribed listener must stay silent");
    assert.equal(secondCalls, 2, "remaining listener must run again");
    second();
    second = undefined;
    writeFileSync(logPath, "x".repeat(150));
    assert.ok(rotateIfNeeded(logPath, 100), "third rotation must happen");
    assert.equal(secondCalls, 2, "fully unsubscribed store must stay silent");
  } finally {
    first?.();
    second?.();
    rmSync(dir, { recursive: true, force: true });
  }
});

test("transport error reaches the stderr sink once with its arguments", async () => {
  const { createFileLogger } = await import(
    `../../src/shared/utils/logger.ts?ctx=error-sink-${Date.now()}`
  );
  const dir = mkdtempSync(join(tmpdir(), `rot-test-error-sink-${Date.now()}-`));
  const logPath = join(dir, "app.log");

  const writes: string[] = [];
  const originalWrite = process.stderr.write.bind(process.stderr);
  (process.stderr as unknown as { write: (...args: unknown[]) => boolean }).write = (
    ...args: unknown[]
  ) => {
    writes.push(String(args[0]));
    return true;
  };
  let handle: { close: () => Promise<void> } | null = null;
  try {
    handle = (
      createFileLogger as (path: string) => {
        proxy: EventEmitter & { targetForTest?: unknown };
        close: () => Promise<void>;
      }
    )(logPath) as unknown as { close: () => Promise<void> };
    const proxy = (handle as unknown as { proxy: EventEmitter }).proxy;
    const target = (
      proxy as unknown as {
        target: EventEmitter & { emit(event: string, ...a: unknown[]): boolean };
      }
    ).target;
    const failure = Object.assign(new Error("simulated transport failure"), {
      code: "ENOENT",
    });
    target.emit("error", failure);
    await new Promise((resolveTick) => setTimeout(resolveTick, 50));
    const notices = writes.filter((line) =>
      line.includes("[logger] log transport write failed, dropping log line:")
    );
    assert.equal(notices.length, 1, "one transport failure must write exactly one stderr line");
    assert.ok(
      notices[0].includes("simulated transport failure"),
      "the sink must keep the original error arguments"
    );
  } finally {
    (process.stderr as unknown as { write: typeof originalWrite }).write = originalWrite;
    await handle?.close();
    rmSync(dir, { recursive: true, force: true });
  }
});

test("a once error listener on the proxy receives the original arguments", async () => {
  const { createFileLogger } = await import(
    `../../src/shared/utils/logger.ts?ctx=error-once-${Date.now()}`
  );
  const dir = mkdtempSync(join(tmpdir(), `rot-test-error-once-${Date.now()}-`));
  const logPath = join(dir, "app.log");

  const writes: string[] = [];
  const originalWrite = process.stderr.write.bind(process.stderr);
  (process.stderr as unknown as { write: (...args: unknown[]) => boolean }).write = (
    ...args: unknown[]
  ) => {
    writes.push(String(args[0]));
    return true;
  };
  let handle: { close: () => Promise<void> } | null = null;
  try {
    handle = (
      createFileLogger as (path: string) => {
        proxy: EventEmitter;
        close: () => Promise<void>;
      }
    )(logPath) as unknown as { close: () => Promise<void> };
    const proxy = (handle as unknown as { proxy: EventEmitter }).proxy;
    const seen: unknown[][] = [];
    proxy.once("error", (...args: unknown[]) => {
      seen.push(args);
    });
    const target = (
      proxy as unknown as {
        target: EventEmitter & { emit(event: string, ...a: unknown[]): boolean };
      }
    ).target;
    const failure = Object.assign(new Error("simulated once failure"), { code: "EPIPE" });
    target.emit("error", failure);
    await new Promise((resolveTick) => setTimeout(resolveTick, 50));
    assert.equal(seen.length, 1, "a once listener must fire exactly once");
    assert.equal(seen[0][0], failure, "a once listener must receive the original arguments");
    const notices = writes.filter((line) =>
      line.includes("[logger] log transport write failed, dropping log line:")
    );
    assert.equal(notices.length, 1, "the stderr sink must still fire exactly once");
  } finally {
    (process.stderr as unknown as { write: typeof originalWrite }).write = originalWrite;
    await handle?.close();
    rmSync(dir, { recursive: true, force: true });
  }
});

test("a renamed file notifies listeners on the next check", async () => {
  const stamp = Date.now();
  const rotationModule = await import(`../../src/lib/logRotation.ts?ctx=tick-external-${stamp}`);
  const loggerModule = await import(`../../src/shared/utils/logger.ts?ctx=tick-external-${stamp}`);
  const dir = mkdtempSync(join(tmpdir(), `rot-test-tick-external-${stamp}-`));
  const logPath = join(dir, "app.log");
  writeFileSync(logPath, "x".repeat(10));

  process.env.APP_LOG_TO_FILE = "true";
  process.env.APP_LOG_FILE_PATH = logPath;
  process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS = "50";
  const fileLogger = (
    loggerModule.createFileLogger as (path: string) => {
      logger: { info(entry: Record<string, string>, message: string): void };
      stream: unknown;
      reopen: () => Promise<void>;
      close: () => Promise<void>;
    }
  )(logPath);
  let unsubscribe: (() => void) | undefined;
  let stopCounting: (() => void) | undefined;
  let notifications = 0;
  try {
    // The periodic tick lives in this module instance: subscribe the file
    // logger the way buildLoggerResource does, plus a counting listener.
    unsubscribe = (
      rotationModule.onLogRotation as (listener: (path: string) => void) => () => void
    )(async () => {
      await fileLogger.reopen();
    });
    stopCounting = (
      rotationModule.onLogRotation as (listener: (path: string) => void) => () => void
    )(() => {
      notifications += 1;
    });
    (rotationModule.initLogRotation as () => void)();

    // Another process rotates the file: rename it without calling
    // rotateIfNeeded, so this process learns about it only on its own tick.
    renameSync(logPath, join(dir, "app.external.log"));
    const recreated = await (async () => {
      const start = Date.now();
      while (Date.now() - start < 5000) {
        if (existsSync(logPath)) return true;
        await new Promise((resolveTick) => setTimeout(resolveTick, 50));
      }
      return false;
    })();
    assert.ok(recreated, "the current file must be recreated after an external rotation");
    assert.ok(notifications >= 1, "the tick must notify listeners of the external rotation");

    // Once the current file exists again, further ticks stay quiet: the
    // reopen burst is bounded to the absence window, not one per tick.
    const settled = notifications;
    await new Promise((resolveTick) => setTimeout(resolveTick, 300));
    assert.equal(notifications, settled, "no further notification once the file exists");

    // New lines reach the recreated current file.
    fileLogger.logger.info({ marker: "tick-external-after-line" }, "after external rotation");
    const current = await readWhen(logPath, (contents) =>
      contents.includes("tick-external-after-line")
    );
    assert.ok(
      current.includes("tick-external-after-line"),
      "new lines must reach the current file"
    );
  } finally {
    (rotationModule.closeLogRotation as () => void)();
    stopCounting?.();
    unsubscribe?.();
    delete process.env.APP_LOG_TO_FILE;
    delete process.env.APP_LOG_FILE_PATH;
    delete process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS;
    try {
      await fileLogger.close();
    } catch {
      // Best effort cleanup.
    }
    rmSync(dir, { recursive: true, force: true });
  }
});

test("switching targets twice then closing stays quiet", async () => {
  const { createFileLogger } = await import(
    `../../src/shared/utils/logger.ts?ctx=switch-twice-${Date.now()}`
  );
  const dir = mkdtempSync(join(tmpdir(), `rot-test-switch-${Date.now()}-`));
  const logPath = join(dir, "app.log");
  try {
    const handle = (
      createFileLogger as (path: string) => {
        logger: { info(entry: Record<string, string>, message: string): void };
        reopen: () => Promise<void>;
        close: () => Promise<void>;
      }
    )(logPath);
    await handle.reopen();
    await handle.reopen();
    await handle.close();
    await handle.close();
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

// ── Structured writer across rotation ──────────────────────────────────────────
// The production reader is getLogConfig(): each destination below resolves the
// configured log path through the same reader logger.ts uses at startup.

async function readWhen(
  filePath: string,
  predicate: (contents: string) => boolean,
  timeoutMs = 5000
): Promise<string> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (existsSync(filePath)) {
      const contents = readFileSync(filePath, "utf8");
      if (predicate(contents)) return contents;
    }
    await new Promise((resolveTick) => setTimeout(resolveTick, 50));
  }
  return existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
}

async function writeAndFlush(stream: unknown, line: string): Promise<void> {
  const target = stream as {
    write(chunk: string): unknown;
    flushSync?(): void;
    flush?(done: () => void): void;
  };
  target.write(line);
  try {
    target.flushSync?.();
  } catch {
    // Best effort: fall back to an async flush below.
  }
  if (target.flush) {
    await new Promise<void>((resolveFlush) => {
      try {
        target.flush?.(() => resolveFlush());
      } catch {
        resolveFlush();
      }
    });
  } else {
    await new Promise((resolveTick) => setTimeout(resolveTick, 50));
  }
}

test("structured line, rotation, structured line keeps the second line on the current file", async () => {
  const dir = mkdtempSync(join(tmpdir(), `rot-test-structured-${Date.now()}-`));
  process.env.APP_LOG_TO_FILE = "true";
  process.env.APP_LOG_FILE_PATH = join(dir, "app.log");
  process.env.APP_LOG_LEVEL = "info";
  let stream: unknown = null;
  let rotatedPath: string | null = null;
  let reopen: (() => Promise<void>) | null = null;
  try {
    const rotationModule = await import(
      `../../src/lib/logRotation.ts?ctx=structured-${Date.now()}`
    );
    const loggerModule = await import(
      `../../src/shared/utils/logger.ts?ctx=structured-${Date.now()}`
    );
    const currentPath = (rotationModule.getLogConfig as () => { logFilePath: string })()
      .logFilePath;
    assert.equal(
      currentPath,
      join(dir, "app.log"),
      "production reader must resolve the test log path"
    );
    const fileLogger = (
      loggerModule.createFileLogger as (path: string) => {
        logger: { info(entry: Record<string, string>, message: string): void };
        stream: unknown;
        reopen: () => Promise<void>;
      }
    )(currentPath);
    stream = fileLogger.stream;
    reopen = fileLogger.reopen;
    fileLogger.logger.info({ marker: "before-rotation-line" }, "before rotation");
    await writeAndFlush(stream, "");
    const before = await readWhen(currentPath, (contents) =>
      contents.includes("before-rotation-line")
    );
    assert.ok(before.includes("before-rotation-line"), "first line must reach the current file");

    rotatedPath = (rotationModule.rotateIfNeeded as (path: string, size: number) => string | null)(
      currentPath,
      1
    );
    assert.ok(rotatedPath, "rotation must report the rotated file path");
    await reopen();
    fileLogger.logger.info({ marker: "after-rotation-line" }, "after rotation");
    await writeAndFlush(stream, "");
    const current = await readWhen(currentPath, (contents) =>
      contents.includes("after-rotation-line")
    );
    assert.ok(current.includes("after-rotation-line"), "second line must reach the current file");
    const rotatedContents = existsSync(rotatedPath as string)
      ? readFileSync(rotatedPath as string, "utf8")
      : "";
    assert.ok(
      rotatedContents.includes("before-rotation-line"),
      "first line must stay in the rotated file"
    );
    assert.ok(
      !rotatedContents.includes("after-rotation-line"),
      "second line must not leak into the rotated file"
    );
  } finally {
    delete process.env.APP_LOG_TO_FILE;
    delete process.env.APP_LOG_FILE_PATH;
    delete process.env.APP_LOG_LEVEL;
    try {
      const owned = stream as { end?: () => void } | null;
      owned?.end?.();
    } catch {
      // Best effort cleanup.
    }
    await new Promise((resolveTick) => setTimeout(resolveTick, 50));
    rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("rotated file stops growing after rotation", async () => {
  const dir = mkdtempSync(join(tmpdir(), `rot-test-frozen-${Date.now()}-`));
  process.env.APP_LOG_TO_FILE = "true";
  process.env.APP_LOG_FILE_PATH = join(dir, "app.log");
  process.env.APP_LOG_LEVEL = "info";
  let stream: unknown = null;
  try {
    const stamp = Date.now();
    const rotationModule = await import(`../../src/lib/logRotation.ts?ctx=frozen-${stamp}`);
    const loggerModule = await import(`../../src/shared/utils/logger.ts?ctx=frozen-${stamp}`);
    const currentPath = (rotationModule.getLogConfig as () => { logFilePath: string })()
      .logFilePath;
    const fileLogger = (
      loggerModule.createFileLogger as (path: string) => {
        logger: { info(entry: Record<string, string>, message: string): void };
        stream: unknown;
        reopen: () => Promise<void>;
      }
    )(currentPath);
    stream = fileLogger.stream;
    fileLogger.logger.info({ marker: "frozen-before-line" }, "before rotation");
    await writeAndFlush(stream, "");
    await readWhen(currentPath, (contents) => contents.includes("frozen-before-line"));
    const rotatedPath = (
      rotationModule.rotateIfNeeded as (path: string, size: number) => string | null
    )(currentPath, 1);
    assert.ok(rotatedPath, "rotation must report the rotated file path");
    const rotatedSize = statSync(rotatedPath as string).size;
    await fileLogger.reopen();
    fileLogger.logger.info({ marker: "frozen-after-line" }, "after rotation");
    await writeAndFlush(stream, "");
    await readWhen(currentPath, (contents) => contents.includes("frozen-after-line"));
    // Allow the worker thread a beat: any stray write to the rotated file must show here.
    await new Promise((resolveTick) => setTimeout(resolveTick, 250));
    assert.equal(
      statSync(rotatedPath as string).size,
      rotatedSize,
      "rotated file must stop growing after rotation"
    );
  } finally {
    delete process.env.APP_LOG_TO_FILE;
    delete process.env.APP_LOG_FILE_PATH;
    delete process.env.APP_LOG_LEVEL;
    try {
      const owned = stream as { end?: () => void } | null;
      owned?.end?.();
    } catch {
      // Best effort cleanup.
    }
    await new Promise((resolveTick) => setTimeout(resolveTick, 50));
    rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("sync fallback reopens the current file after rotation", async () => {
  const dir = mkdtempSync(join(tmpdir(), `rot-test-sync-${Date.now()}-`));
  process.env.APP_LOG_TO_FILE = "true";
  process.env.APP_LOG_FILE_PATH = join(dir, "app.log");
  process.env.APP_LOG_LEVEL = "info";
  let destination: unknown = null;
  try {
    const stamp = Date.now();
    const rotationModule = await import(`../../src/lib/logRotation.ts?ctx=sync-${stamp}`);
    const currentPath = (rotationModule.getLogConfig as () => { logFilePath: string })()
      .logFilePath;
    destination = pino.destination({ dest: currentPath, mkdir: true, sync: true });
    const syncLogger = pino({ level: "info" }, destination as pino.DestinationStream);
    syncLogger.info({ marker: "sync-before-line" }, "before rotation");
    assert.ok(
      readFileSync(currentPath, "utf8").includes("sync-before-line"),
      "first line must reach the current file"
    );
    const rotatedPath = (
      rotationModule.rotateIfNeeded as (path: string, size: number) => string | null
    )(currentPath, 1);
    assert.ok(rotatedPath, "rotation must report the rotated file path");
    const reopenable = destination as { reopen?: () => void };
    assert.equal(typeof reopenable.reopen, "function", "sync destination must support reopening");
    reopenable.reopen?.();
    syncLogger.info({ marker: "sync-after-line" }, "after rotation");
    const current = readFileSync(currentPath, "utf8");
    assert.ok(current.includes("sync-after-line"), "second line must reach the current file");
    const rotatedContents = readFileSync(rotatedPath as string, "utf8");
    assert.ok(rotatedContents.includes("sync-before-line"), "first line must stay rotated");
    assert.ok(!rotatedContents.includes("sync-after-line"), "second line must not leak back");
  } finally {
    delete process.env.APP_LOG_TO_FILE;
    delete process.env.APP_LOG_FILE_PATH;
    delete process.env.APP_LOG_LEVEL;
    try {
      const owned = destination as { end?: () => void } | null;
      owned?.end?.();
    } catch {
      // Best effort cleanup.
    }
    rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("below max size keeps behavior unchanged", async () => {
  const { rotateIfNeeded, onLogRotation } =
    await import("../../src/lib/logRotation.ts?ctx=below-max");
  const dir = mkdtempSync(join(tmpdir(), `rot-test-below-${Date.now()}-`));
  const logPath = join(dir, "app.log");
  writeFileSync(logPath, "small content\n");

  let calls = 0;
  let unsubscribe: (() => void) | undefined;
  try {
    unsubscribe = onLogRotation(() => {
      calls += 1;
    });
    const result = rotateIfNeeded(logPath, 50 * 1024 * 1024) as unknown as string | null;
    assert.equal(result, null, "below the size limit there is nothing to rotate");
    assert.ok(existsSync(logPath), "log file should still exist");
    const rotated = readdirSync(dir).filter(
      (f) => f.startsWith("app.") && f.endsWith(".log") && f !== "app.log"
    );
    assert.equal(rotated.length, 0, "no rotated files expected");
    assert.equal(calls, 0, "no listener call expected without rotation");
  } finally {
    unsubscribe?.();
    rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
