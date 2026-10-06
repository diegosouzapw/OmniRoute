import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";
import pino from "pino";

type LoggerModule = typeof import("../../src/shared/utils/logger.ts");
type LoggerResourceModule = typeof import("../../src/shared/utils/loggerResource.ts");
type LogRotationModule = typeof import("../../src/lib/logRotation.ts");

const loggerUrl = pathToFileURL(join(process.cwd(), "src/shared/utils/logger.ts")).href;
const loggerResourceUrl = pathToFileURL(
  join(process.cwd(), "src/shared/utils/loggerResource.ts")
).href;
const logRotationUrl = pathToFileURL(join(process.cwd(), "src/lib/logRotation.ts")).href;
const envKeys = [
  "NODE_ENV",
  "APP_LOG_TO_FILE",
  "APP_LOG_FILE_PATH",
  "APP_LOG_LEVEL",
  "APP_LOG_ROTATION_CHECK_INTERVAL_MS",
] as const;

function saveEnv(): Record<(typeof envKeys)[number], string | undefined> {
  return Object.fromEntries(envKeys.map((key) => [key, process.env[key]])) as Record<
    (typeof envKeys)[number],
    string | undefined
  >;
}

function restoreEnv(saved: ReturnType<typeof saveEnv>): void {
  for (const key of envKeys) {
    const value = saved[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
}

function closeLoggerStream(logger: LoggerModule["logger"]): void {
  const stream = (logger as unknown as Record<symbol, unknown>)[pino.symbols.streamSym] as
    { flushSync?: () => void; end?: () => void } | undefined;
  try {
    stream?.flushSync?.();
  } catch {}
  try {
    stream?.end?.();
  } catch {}
}

test("logger transport and rotation timer remain process-singletons across HMR module instances", async () => {
  const savedEnv = saveEnv();
  const testDir = mkdtempSync(join(tmpdir(), "omniroute-logger-singleton-12074-"));
  const originalSetInterval = globalThis.setInterval;
  let firstLogger: LoggerModule | undefined;
  let secondLogger: LoggerModule | undefined;
  let firstLoggerResource: LoggerResourceModule | undefined;
  let secondLoggerResource: LoggerResourceModule | undefined;
  let firstRotation: LogRotationModule | undefined;
  let secondRotation: LogRotationModule | undefined;

  process.env.NODE_ENV = "production";
  process.env.APP_LOG_TO_FILE = "true";
  process.env.APP_LOG_FILE_PATH = join(testDir, "application.log");
  process.env.APP_LOG_LEVEL = "debug";
  process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS = "60000";

  try {
    firstRotation = (await import(`${logRotationUrl}?phase4=rotation-a`)) as LogRotationModule;
    secondRotation = (await import(`${logRotationUrl}?phase4=rotation-b`)) as LogRotationModule;
    firstRotation.closeLogRotation();
    secondRotation.closeLogRotation();

    let intervalCreations = 0;
    globalThis.setInterval = ((...args: unknown[]) => {
      intervalCreations++;
      return Reflect.apply(originalSetInterval, globalThis, args);
    }) as typeof setInterval;

    firstRotation.initLogRotation();
    secondRotation.initLogRotation();
    assert.equal(intervalCreations, 1, "HMR reloads must share one log rotation timer");

    globalThis.setInterval = originalSetInterval;
    firstLoggerResource = (await import(
      `${loggerResourceUrl}?phase4=resource-a`
    )) as LoggerResourceModule;
    secondLoggerResource = (await import(
      `${loggerResourceUrl}?phase4=resource-b`
    )) as LoggerResourceModule;
    firstLogger = (await import(`${loggerUrl}?phase4=logger-a`)) as LoggerModule;
    secondLogger = (await import(`${loggerUrl}?phase4=logger-b`)) as LoggerModule;

    assert.equal(firstLogger.logger, secondLogger.logger, "HMR reloads must reuse one logger");
    const firstStream = (firstLogger.logger as unknown as Record<symbol, unknown>)[
      pino.symbols.streamSym
    ];
    const secondStream = (secondLogger.logger as unknown as Record<symbol, unknown>)[
      pino.symbols.streamSym
    ];
    assert.equal(firstStream, secondStream, "HMR reloads must reuse one pino transport");

    const resource = globalThis.__omnirouteLoggerResource;
    assert.ok(resource, "expected the process-wide logger resource to be registered");
    const originalClose = resource.close;
    let closeCalls = 0;
    resource.close = async () => {
      closeCalls++;
      await originalClose();
    };

    await firstLoggerResource.closeSharedLoggerResource();
    await secondLoggerResource.closeSharedLoggerResource();
    assert.equal(closeCalls, 1, "shared logger teardown must be idempotent across HMR modules");
    assert.equal(globalThis.__omnirouteLoggerResource, undefined);
  } finally {
    globalThis.setInterval = originalSetInterval;
    firstRotation?.closeLogRotation();
    secondRotation?.closeLogRotation();
    if (firstLoggerResource) {
      await firstLoggerResource.closeSharedLoggerResource();
    } else {
      if (firstLogger) closeLoggerStream(firstLogger.logger);
      if (secondLogger && secondLogger.logger !== firstLogger?.logger) {
        closeLoggerStream(secondLogger.logger);
      }
    }
    restoreEnv(savedEnv);
    rmSync(testDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
