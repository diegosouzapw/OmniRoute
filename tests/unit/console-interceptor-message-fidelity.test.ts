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

test("clock-prefixed lines file under the real component", () => {
  try {
    initConsoleInterceptor();

    console.log("[19:29:32] 📊 [USAGE] openai | in=10 | out=5 | account=abc");
    console.log("[19:29:32] [WARN] [STREAM] OPENAI | gpt-4 | 12ms | done");
    console.log("[ProxyEgress] upstream refused the connection");
    console.log("plain message without brackets");
    console.log("[99:99:99] [USAGE] strict clock shape skipped as a clock");
    console.log("[12:34:56]");

    __consoleInterceptorInternals.reset();

    const entries = readEntries();
    const byMessage = (part: string) => entries.find((e) => String(e.message ?? "").includes(part));

    const usage = byMessage("[USAGE] openai | in=10");
    assert.ok(usage, "clock-prefixed usage entry not written");
    assert.equal(usage.component, "USAGE");

    const stream = byMessage("[STREAM] OPENAI");
    assert.ok(stream, "clock-plus-level stream entry not written");
    assert.equal(stream.component, "STREAM");

    const egress = byMessage("upstream refused");
    assert.ok(egress, "proxy egress entry not written");
    assert.equal(egress.component, "ProxyEgress");

    const plain = entries
      .map((e) => String(e.message ?? ""))
      .find((m) => m === "plain message without brackets");
    assert.ok(plain, "plain entry not written");
    assert.equal(
      entries.find((e) => String(e.message ?? "") === "plain message without brackets")?.component,
      "app"
    );

    const strict = byMessage("[USAGE] strict clock shape");
    assert.ok(strict, "strict clock entry not written");
    assert.equal(strict.component, "USAGE");

    const lone = entries.map((e) => String(e.message ?? "")).find((m) => m.includes("[12:34:56]"));
    assert.ok(lone, "lone clock entry not written");
    assert.equal(
      entries.find((e) => String(e.message ?? "").includes("[12:34:56]"))?.component,
      "app"
    );
  } finally {
    __consoleInterceptorInternals.reset();
    fs.rmSync(LOG_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("color codes are stripped from the written message but kept on the terminal", () => {
  const terminalWrites: string[] = [];
  const originalStdoutWrite = process.stdout.write.bind(process.stdout);
  const patchedWrite = ((chunk: unknown, ...rest: unknown[]) => {
    terminalWrites.push(String(chunk));
    return (originalStdoutWrite as (...a: unknown[]) => boolean)(chunk, ...rest);
  }) as typeof process.stdout.write;
  process.stdout.write = patchedWrite;
  try {
    initConsoleInterceptor();

    console.log("\x1b[32m[USAGE] openai | in=10 | out=5\x1b[0m");

    __consoleInterceptorInternals.reset();

    const entries = readEntries();
    const entry = entries
      .map((e) => String(e.message ?? ""))
      .find((m) => m.includes("[USAGE] openai"));
    assert.ok(entry, "colored entry not written");
    assert.ok(!entry.includes("\x1b"), "escape codes leaked into the written message");
    assert.equal(entry, "[USAGE] openai | in=10 | out=5");
    assert.equal(
      entries.find((e) => String(e.message ?? "").includes("[USAGE] openai"))?.component,
      "USAGE"
    );
    assert.ok(
      terminalWrites.some((w) => w.includes("\x1b[32m")),
      "terminal output lost its color codes"
    );
  } finally {
    process.stdout.write = originalStdoutWrite;
    __consoleInterceptorInternals.reset();
    fs.rmSync(LOG_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("local color-strip pattern matches the shared stream helper on hostile input", async () => {
  const { stripAnsiCodes } = await import("../../open-sse/utils/streamHelpers.ts");
  const vectors = [
    "\x1b[2K\x1b[1Ahello",
    "\x1b[31mred\x1b[0m",
    "\x1b]0;title\x07text",
    "\x1b]8;;https://x\x1b\\link",
    "a\x00b",
    "a\tb\nc\rd",
  ];
  try {
    initConsoleInterceptor();

    for (const vector of vectors) console.log(`parity ${vector} end`);

    __consoleInterceptorInternals.reset();

    const entries = readEntries();
    for (const vector of vectors) {
      const expected = stripAnsiCodes(`parity ${vector} end`);
      const written = entries
        .map((e) => String(e.message ?? ""))
        .find((m) => m.includes("parity ") && m.includes(" end"));
      assert.ok(written !== undefined, `parity entry missing for ${JSON.stringify(vector)}`);
      assert.ok(
        entries.some((e) => String(e.message ?? "") === expected),
        `local strip diverged from shared helper on ${JSON.stringify(vector)}`
      );
    }
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
