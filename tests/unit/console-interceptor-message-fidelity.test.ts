import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Two defects in the same formatting path, both visible in a real app log:
//
//  - the component was read as the first bracket, so entries from the tagged logger
//    ("[INFO] [TAG] message") were filed under the level and the tag was lost;
//  - printf format strings were not applied, so "%s"/"%d" stayed literal and the values
//    trailed behind them without labels.
//
// Both assertions below fail against the previous implementation.
//
// consoleInterceptor freezes `logToFile` and `logFilePath` at import time, so the env has
// to be set before the module is loaded — hence the dynamic import.

const LOG_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-interceptor-fidelity-"));
const LOG_PATH = path.join(LOG_DIR, "app.log");

process.env.APP_LOG_FILE_PATH = LOG_PATH;
process.env.APP_LOG_TO_FILE = "true";

const { initConsoleInterceptor, __consoleInterceptorInternals } =
  await import("../../src/lib/consoleInterceptor.ts");

function readEntries(): Array<Record<string, unknown>> {
  if (!fs.existsSync(LOG_PATH)) return [];
  return fs
    .readFileSync(LOG_PATH, "utf8")
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .map((line) => JSON.parse(line) as Record<string, unknown>);
}

test("the interceptor keeps the component and substitutes printf formats", () => {
  try {
    initConsoleInterceptor();

    console.log("[INFO] [SKILLS_INJECTION] injected 3 skills");
    console.log("[LiveWS] Client connected: %s (%s) [%d total]", "37cb8f70", "127.0.0.1", 1);
    console.log("plain message", { a: 1 });

    __consoleInterceptorInternals.reset();

    const entries = readEntries();
    assert.ok(entries.length > 0, "interceptor wrote nothing");

    const tagged = entries.find((e) => String(e.message ?? "").includes("SKILLS_INJECTION"));
    assert.ok(tagged, "tagged entry not written");
    assert.equal(tagged.component, "SKILLS_INJECTION");

    const formatted = entries
      .map((e) => String(e.message ?? ""))
      .find((m) => m.includes("Client connected"));
    assert.ok(formatted, "LiveWS entry not written");
    assert.equal(formatted, "[LiveWS] Client connected: 37cb8f70 (127.0.0.1) [1 total]");

    // No format string: the previous join behaviour is preserved verbatim.
    const plain = entries
      .map((e) => String(e.message ?? ""))
      .find((m) => m.startsWith("plain message"));
    assert.equal(plain, 'plain message {"a":1}');
  } finally {
    __consoleInterceptorInternals.reset();
    fs.rmSync(LOG_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("a first argument that coincidentally contains a printf token does not swallow a trailing Error", () => {
  try {
    initConsoleInterceptor();

    // Dynamic, non-format-string content (e.g. a hook/tag name) that happens to contain "%s" —
    // the real defect this guards: util.format() would consume `err` as the %s substitution and
    // drop its message/stack instead of appending them.
    const err = new Error("boom");
    console.error('[Middleware] Failed to compile hook "handler%sname":', err);

    __consoleInterceptorInternals.reset();

    const entries = readEntries();
    const entry = entries
      .map((e) => String(e.message ?? ""))
      .find((m) => m.includes("Failed to compile hook"));

    assert.ok(entry, "entry not written");
    assert.ok(entry.includes("boom"), "Error message was dropped");
    assert.ok(entry.includes(err.stack || ""), "Error stack was dropped");
  } finally {
    __consoleInterceptorInternals.reset();
    fs.rmSync(LOG_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
