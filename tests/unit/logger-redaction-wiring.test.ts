import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Configure file logging BEFORE importing the logger (buildLogger runs at import time).
const dir = mkdtempSync(join(tmpdir(), "omniroute-logredact-"));
const logFile = join(dir, "app.log");
process.env.NODE_ENV = "production"; // JSON to file, no pino-pretty
process.env.APP_LOG_TO_FILE = "true";
process.env.APP_LOG_FILE_PATH = logFile;
process.env.APP_LOG_LEVEL = "debug";

const loggerModule = await import("../../src/shared/utils/logger.ts");
const { createLogger } = loggerModule;

/** Poll the (worker-thread-written) log file until the predicate holds or timeout. */
async function readLogWhen(
  predicate: (contents: string) => boolean,
  timeoutMs = 4000
): Promise<string> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (existsSync(logFile)) {
      const contents = readFileSync(logFile, "utf8");
      if (predicate(contents)) return contents;
    }
    await new Promise((r) => setTimeout(r, 50));
  }
  return existsSync(logFile) ? readFileSync(logFile, "utf8") : "";
}

test("logger redacts a Bearer secret in a free-form message and an error stack (end-to-end)", async () => {
  const log = createLogger("redact-test");

  log.info("upstream call Authorization: Bearer sk-superSecretKey1234567890done");
  const err = new Error("boom while sending Authorization: Bearer sk-anotherSecretABCDEFGH12");
  log.error({ err }, "request failed");

  const contents = await readLogWhen(
    (c) =>
      c.includes("[REDACTED]") &&
      !c.includes("sk-superSecretKey") &&
      !c.includes("sk-anotherSecret")
  );

  assert.match(contents, /\[REDACTED\]/, "redaction marker must appear in the log output");
  assert.doesNotMatch(contents, /sk-superSecretKey/, "message secret must be redacted");
  assert.doesNotMatch(contents, /sk-anotherSecret/, "error-stack secret must be redacted");
});

test("shared logger module exposes named logger helpers", () => {
  assert.equal(typeof loggerModule.logger.info, "function");
  assert.equal(typeof loggerModule.createLogger, "function");
});
