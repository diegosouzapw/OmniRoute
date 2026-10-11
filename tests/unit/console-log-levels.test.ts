import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { updateSettings } from "../../src/lib/db/settings";

const TEST_LOG_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-console-log-levels-"));
const TEST_LOG_PATH = path.join(TEST_LOG_DIR, "app.log");
process.once("exit", () => {
  try {
    fs.rmSync(TEST_LOG_DIR, { recursive: true, force: true, maxRetries: 3, retryDelay: 50 });
  } catch {
    // Best-effort cleanup only; tmpdir residue must not fail otherwise-passing tests.
  }
});

const originalLogFilePath = process.env.APP_LOG_FILE_PATH;
process.env.APP_LOG_FILE_PATH = TEST_LOG_PATH;

const route = await import("../../src/app/api/logs/console/route.ts");

interface ConsoleLogApiEntry {
  level?: string;
  timestamp?: unknown;
  msg?: string;
  message?: string;
  correlationId?: string;
}

test.before(async () => {
  await updateSettings({ requireLogin: false });
});

test.after(async () => {
  await updateSettings({ requireLogin: true });
  if (originalLogFilePath === undefined) {
    delete process.env.APP_LOG_FILE_PATH;
  } else {
    process.env.APP_LOG_FILE_PATH = originalLogFilePath;
  }
});

test("console log API normalizes numeric pino levels correctly", async () => {
  fs.writeFileSync(
    TEST_LOG_PATH,
    [
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 30,
        module: "probe",
        msg: "info entry",
      }),
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 40,
        module: "probe",
        msg: "warn entry",
      }),
    ].join("\n") + "\n",
    "utf8"
  );

  const response = await route.GET(
    new Request("http://localhost/api/logs/console?level=info&limit=10")
  );
  const body = (await response.json()) as ConsoleLogApiEntry[];

  assert.equal(response.status, 200);
  assert.deepEqual(
    body.map((entry) => entry.level),
    ["info", "warn"]
  );
});

test("console log API filters by component, time window, and result limit", async () => {
  fs.writeFileSync(
    TEST_LOG_PATH,
    [
      JSON.stringify({
        time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        level: "warn",
        component: "router",
        msg: "too old",
      }),
      "not-json",
      JSON.stringify({
        time: new Date().toISOString(),
        level: "debug",
        component: "router",
        msg: "below level",
      }),
      JSON.stringify({
        time: new Date().toISOString(),
        level: "error",
        component: "router-core",
        msg: "match one",
      }),
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level: "fatal",
        module: "router-worker",
        msg: "match two",
      }),
    ].join("\n") + "\n",
    "utf8"
  );

  const response = await route.GET(
    new Request("http://localhost/api/logs/console?level=warn&component=router&limit=1")
  );
  const body = (await response.json()) as ConsoleLogApiEntry[];

  assert.equal(response.status, 200);
  assert.equal(body.length, 1);
  assert.equal(body[0].level, "fatal");
  assert.equal(body[0].timestamp !== undefined, true);
});

test("console log API serializes structured messages for the viewer", async () => {
  fs.writeFileSync(
    TEST_LOG_PATH,
    JSON.stringify({
      time: new Date().toISOString(),
      level: 40,
      module: "guardrail",
      msg: {
        detections: [
          { pattern: "system_override", severity: "high" },
          { pattern: "system_prompt_leak", severity: "high" },
        ],
      },
      correlationId: 12345,
    }) + "\n",
    "utf8"
  );

  const response = await route.GET(new Request("http://localhost/api/logs/console?limit=10"));
  const body = (await response.json()) as ConsoleLogApiEntry[];

  assert.equal(response.status, 200);
  assert.equal(typeof body[0].msg, "string");
  assert.match(body[0].msg, /system_override/);
  assert.equal(body[0].message, body[0].msg);
  assert.equal(body[0].correlationId, "12345");
});

test("console log API returns an empty list for a missing file and surfaces read errors", async () => {
  fs.rmSync(TEST_LOG_PATH, { force: true });

  const missingResponse = await route.GET(new Request("http://localhost/api/logs/console"));
  assert.equal(missingResponse.status, 200);
  assert.deepEqual(await missingResponse.json(), []);

  const brokenPath = path.join(TEST_LOG_DIR, "dir-log");
  fs.mkdirSync(brokenPath, { recursive: true });
  process.env.APP_LOG_FILE_PATH = brokenPath;

  try {
    const brokenResponse = await route.GET(new Request("http://localhost/api/logs/console"));
    assert.equal(brokenResponse.status, 500);
    const payload = (await brokenResponse.json()) as { error?: string };
    assert.equal(typeof payload.error, "string");
    assert.equal(payload.error.length > 0, true);
  } finally {
    process.env.APP_LOG_FILE_PATH = TEST_LOG_PATH;
  }
});

const TAIL_CASE_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-console-log-tail-"));
process.once("exit", () => {
  try {
    fs.rmSync(TAIL_CASE_DIR, { recursive: true, force: true, maxRetries: 3, retryDelay: 50 });
  } catch {
    // Best-effort cleanup only.
  }
});

function isolateLogFile(casePath: string): string {
  const previous = process.env.APP_LOG_FILE_PATH;
  process.env.APP_LOG_FILE_PATH = casePath;
  return previous ?? "";
}

function restoreLogFile(previous: string): void {
  if (previous === "") {
    process.env.APP_LOG_FILE_PATH = TEST_LOG_PATH;
  } else {
    process.env.APP_LOG_FILE_PATH = previous;
  }
}

function installReadSpy(counter: { calls: number; bytes: number }): () => void {
  const pristine = fs.readSync;
  let calls = 0;
  let bytes = 0;
  Object.defineProperty(fs, "readSync", {
    configurable: true,
    writable: true,
    value: function (
      fd: number,
      buffer: Buffer,
      offset: number,
      length: number,
      position: number | null
    ): number {
      calls += 1;
      const read = pristine.call(this, fd, buffer, offset, length, position);
      bytes += read;
      return read;
    },
  });
  counter.calls = 0;
  counter.bytes = 0;
  return () => {
    counter.calls = calls;
    counter.bytes = bytes;
    Object.defineProperty(fs, "readSync", {
      configurable: true,
      writable: true,
      value: pristine,
    });
  };
}

function oracleEntries(
  filePath: string,
  options: { level?: string; limit?: number; component?: string }
): ConsoleLogApiEntry[] {
  const LEVEL_ORDER: Record<string, number> = {
    trace: 5,
    debug: 10,
    info: 20,
    warn: 30,
    error: 40,
    fatal: 50,
  };
  const NUMERIC_LEVEL_MAP: Record<number, string> = {
    10: "trace",
    20: "debug",
    30: "info",
    40: "warn",
    50: "error",
    60: "fatal",
  };
  const raw = fs.readFileSync(filePath, "utf-8");
  const lines = raw.trim().split("\n").filter(Boolean);
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  const minLevel = LEVEL_ORDER[options.level ?? "all"] || 0;
  const limit = Math.min(options.limit ?? 500, 2000);
  const entries: ConsoleLogApiEntry[] = [];
  for (const line of lines) {
    try {
      const entry = JSON.parse(line) as Record<string, unknown>;
      const ts = entry["time"] ?? entry["timestamp"];
      if (ts) {
        const entryTime = new Date(ts as string).getTime();
        if (entryTime < oneHourAgo) continue;
      }
      const rawLevel = entry["level"];
      const level =
        typeof rawLevel === "number"
          ? NUMERIC_LEVEL_MAP[rawLevel] || "info"
          : String(rawLevel).toLowerCase();
      entry["level"] = level;
      const msg = (entry["msg"] ?? entry["message"] ?? "") as unknown;
      entry["msg"] = typeof msg === "string" ? msg : JSON.stringify(msg);
      entry["message"] = entry["msg"];
      const entryLevelNum = LEVEL_ORDER[level] || 0;
      if (minLevel > 0 && entryLevelNum < minLevel) continue;
      const component = options.component ?? "";
      if (component) {
        const comp = String(entry["component"] ?? entry["module"] ?? "");
        if (!comp.toLowerCase().includes(component.toLowerCase())) continue;
      }
      if (entry["time"] && !entry["timestamp"]) entry["timestamp"] = entry["time"];
      entries.push(entry as ConsoleLogApiEntry);
    } catch {
      // Skip unparseable lines, like the route.
    }
  }
  return entries.slice(-limit);
}

test("console log API serves the recent tail from a large file without reading the head", async (t) => {
  const casePath = path.join(TAIL_CASE_DIR, `large-${t.name.replace(/\W+/g, "-")}.log`);
  const previous = isolateLogFile(casePath);
  const counter = { calls: 0, bytes: 0 };
  const restoreSpy = installReadSpy(counter);
  const generatedAt = Date.now();
  let size = 0;
  try {
    const now = Date.now();
    const oldStamp = new Date(now - 2 * 60 * 60 * 1000).toISOString();
    const freshStamp = new Date(now).toISOString();
    const headLine = (i: number): string =>
      JSON.stringify({
        time: oldStamp,
        level: "info",
        module: "arch",
        msg: `old ${String(i).padStart(5, "0")} caf\u00e9`,
      });
    const lineBytes = Buffer.byteLength(headLine(0), "utf8");
    const cafeOffset = Buffer.byteLength(
      headLine(0).slice(0, headLine(0).indexOf("caf\u00e9")),
      "utf8"
    );
    const stack = `x=${"y".repeat(8000)}`;
    const top: string[] = [
      JSON.stringify({
        time: oldStamp,
        level: "error",
        module: "arch",
        msg: `long stack ${stack}`,
      }),
      "not-json",
    ];
    const head: string[] = [];
    for (let i = 0; i < 12000; i += 1) {
      head.push(headLine(i));
    }
    const probe = JSON.stringify({
      time: freshStamp,
      level: "info",
      module: "arch",
      msg: "seuil d\u00e9ficit caf\u00e9 intact",
    });
    const tail: string[] = [];
    for (let i = 0; i < 490; i += 1) {
      tail.push(
        JSON.stringify({
          time: freshStamp,
          level: "info",
          module: "arch",
          msg: `recent ${String(i).padStart(5, "0")} d\u00e9ficit caf\u00e9`,
        })
      );
    }
    const firstWindow = 256 * 1024;
    const withoutPad = [...top, ...head, probe, ...tail].join("\n") + "\n";
    const size0 = Buffer.byteLength(withoutPad, "utf8");
    const padOverhead = Buffer.byteLength(
      JSON.stringify({ time: oldStamp, level: "info", module: "arch", msg: "" }),
      "utf8"
    );
    const padFiller =
      (cafeOffset +
        1 -
        (((size0 - firstWindow + padOverhead) % lineBytes) % lineBytes) +
        lineBytes) %
      lineBytes;
    const pad = JSON.stringify({
      time: oldStamp,
      level: "info",
      module: "arch",
      msg: "x".repeat(padFiller),
    });
    fs.writeFileSync(casePath, [...top, ...head, pad, probe, ...tail].join("\n") + "\n", "utf8");
    size = fs.statSync(casePath).size;
    const generationMs = Date.now() - generatedAt;
    console.log(
      `large-file: size=${size} lineCount=${top.length + head.length + 1 + tail.length + 1} generationMs=${generationMs}`
    );

    const response = await route.GET(new Request("http://localhost/api/logs/console?limit=500"));
    const body = (await response.json()) as ConsoleLogApiEntry[];

    assert.equal(response.status, 200);
    assert.equal(body.length, 491);
    assert.equal(body[0].msg, "seuil d\u00e9ficit caf\u00e9 intact");
    assert.equal(body[1].msg, "recent 00000 d\u00e9ficit caf\u00e9");
    assert.equal(body[490].msg, "recent 00489 d\u00e9ficit caf\u00e9");
    assert.equal(
      body.some((entry) => typeof entry.msg === "string" && entry.msg.includes("�")),
      false
    );
    assert.equal(
      body.some(
        (entry) => entry.msg === "old 00000 caf\u00e9" || entry.msg?.startsWith("long stack")
      ),
      false
    );
  } finally {
    restoreSpy();
    console.log(`large-file-bytes: calls=${counter.calls} total=${counter.bytes} size=${size}`);
    restoreLogFile(previous);
    try {
      fs.rmSync(casePath, { force: true });
    } catch {
      // Best-effort cleanup only.
    }
  }
  assert.equal(counter.calls > 0, true);
  assert.equal(counter.bytes < size, true);
});

test("console log API matches the full read for a file smaller than the first window", async (t) => {
  const casePath = path.join(TAIL_CASE_DIR, `small-${t.name.replace(/\W+/g, "-")}.log`);
  const previous = isolateLogFile(casePath);
  const counter = { calls: 0, bytes: 0 };
  const restoreSpy = installReadSpy(counter);
  try {
    const now = Date.now();
    const lines = [
      JSON.stringify({
        time: new Date(now - 30 * 60 * 1000).toISOString(),
        level: 30,
        module: "probe",
        msg: "small one",
      }),
      "not-json",
      JSON.stringify({
        timestamp: new Date(now).toISOString(),
        level: "warn",
        module: "probe",
        msg: "small two",
      }),
    ];
    fs.writeFileSync(casePath, lines.join("\n") + "\n", "utf8");
    const expected = oracleEntries(casePath, { limit: 10 });

    const response = await route.GET(new Request("http://localhost/api/logs/console?limit=10"));
    const body = (await response.json()) as ConsoleLogApiEntry[];

    assert.equal(response.status, 200);
    assert.deepEqual(body, expected);
  } finally {
    restoreSpy();
    restoreLogFile(previous);
    try {
      fs.rmSync(casePath, { force: true });
    } catch {
      // Best-effort cleanup only.
    }
  }
  assert.equal(counter.calls > 0, true);
});

test("console log API climbs past filtered tail entries to older matching lines", async (t) => {
  const casePath = path.join(TAIL_CASE_DIR, `filtered-${t.name.replace(/\W+/g, "-")}.log`);
  const previous = isolateLogFile(casePath);
  const counter = { calls: 0, bytes: 0 };
  const restoreSpy = installReadSpy(counter);
  try {
    const now = Date.now();
    const lines: string[] = [];
    for (let i = 0; i < 40; i += 1) {
      lines.push(
        JSON.stringify({
          time: new Date(now).toISOString(),
          level: "error",
          component: "router",
          msg: `wanted ${i}`,
        })
      );
    }
    for (let i = 0; i < 4000; i += 1) {
      lines.push(
        JSON.stringify({
          time: new Date(now).toISOString(),
          level: "debug",
          component: "router",
          msg: `noise ${i}`,
        })
      );
    }
    fs.writeFileSync(casePath, lines.join("\n") + "\n", "utf8");

    const response = await route.GET(
      new Request("http://localhost/api/logs/console?level=error&component=router&limit=40")
    );
    const body = (await response.json()) as ConsoleLogApiEntry[];

    assert.equal(response.status, 200);
    assert.equal(body.length, 40);
    assert.equal(body[0].msg, "wanted 0");
    assert.equal(body[39].msg, "wanted 39");
  } finally {
    restoreSpy();
    restoreLogFile(previous);
    try {
      fs.rmSync(casePath, { force: true });
    } catch {
      // Best-effort cleanup only.
    }
  }
  assert.equal(counter.calls > 0, true);
});

test("console log API keeps undated lines when an older dated line ends the window", async (t) => {
  const casePath = path.join(TAIL_CASE_DIR, `undated-${t.name.replace(/\W+/g, "-")}.log`);
  const previous = isolateLogFile(casePath);
  const counter = { calls: 0, bytes: 0 };
  const restoreSpy = installReadSpy(counter);
  try {
    const now = Date.now();
    fs.writeFileSync(
      casePath,
      [
        JSON.stringify({ level: "info", module: "probe", msg: "undated kept" }),
        JSON.stringify({
          time: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
          level: "info",
          module: "probe",
          msg: "old dated",
        }),
        JSON.stringify({
          time: new Date(now).toISOString(),
          level: "info",
          module: "probe",
          msg: "fresh dated",
        }),
      ].join("\n") + "\n",
      "utf8"
    );

    const response = await route.GET(new Request("http://localhost/api/logs/console?limit=2000"));
    const body = (await response.json()) as ConsoleLogApiEntry[];

    assert.equal(response.status, 200);
    assert.deepEqual(
      body.map((entry) => entry.msg),
      ["undated kept", "fresh dated"]
    );
  } finally {
    restoreSpy();
    restoreLogFile(previous);
    try {
      fs.rmSync(casePath, { force: true });
    } catch {
      // Best-effort cleanup only.
    }
  }
  assert.equal(counter.calls > 0, true);
});

test("console log API keeps the one-hour window across a daylight change", async (t) => {
  const casePath = path.join(TAIL_CASE_DIR, `dst-${t.name.replace(/\W+/g, "-")}.log`);
  const previous = isolateLogFile(casePath);
  const previousTZ = process.env.TZ;
  process.env.TZ = "Europe/Paris";
  const realNow = Date.now;
  const base = Date.UTC(2026, 9, 25, 0, 30, 0);
  Date.now = () => base;
  try {
    const lines = [
      JSON.stringify({
        time: base - 61 * 60 * 1000,
        level: "info",
        module: "probe",
        msg: "outside window",
      }),
      JSON.stringify({
        time: base - 59 * 60 * 1000,
        level: "info",
        module: "probe",
        msg: "inside window",
      }),
      JSON.stringify({ time: base, level: "info", module: "probe", msg: "at base" }),
    ];
    fs.writeFileSync(casePath, lines.join("\n") + "\n", "utf8");

    const response = await route.GET(new Request("http://localhost/api/logs/console?limit=10"));
    const body = (await response.json()) as ConsoleLogApiEntry[];

    assert.equal(response.status, 200);
    assert.deepEqual(
      body.map((entry) => entry.msg),
      ["inside window", "at base"]
    );
  } finally {
    Date.now = realNow;
    if (previousTZ === undefined) {
      delete process.env.TZ;
    } else {
      process.env.TZ = previousTZ;
    }
    restoreLogFile(previous);
    try {
      fs.rmSync(casePath, { force: true });
    } catch {
      // Best-effort cleanup only.
    }
  }
});

test("console log API keeps the first line when the window starts on a line boundary", async (t) => {
  const casePath = path.join(TAIL_CASE_DIR, `aligned-${t.name.replace(/\W+/g, "-")}.log`);
  const previous = isolateLogFile(casePath);
  const counter = { calls: 0, bytes: 0 };
  const restoreSpy = installReadSpy(counter);
  try {
    const now = Date.now();
    const oldStamp = new Date(now - 2 * 60 * 60 * 1000).toISOString();
    const freshStamp = new Date(now).toISOString();
    const LINE_BYTES = 16384;
    const datedOverhead = Buffer.byteLength(
      JSON.stringify({ time: oldStamp, level: "info", module: "arch", msg: "" }),
      "utf8"
    );
    const undatedOverhead = Buffer.byteLength(
      JSON.stringify({ level: "info", module: "arch", msg: "" }),
      "utf8"
    );
    const makeDated = (stamp: string, marker: string): string => {
      const filler = LINE_BYTES - 1 - datedOverhead - Buffer.byteLength(marker, "utf8");
      assert.equal(filler >= 0, true);
      return JSON.stringify({
        time: stamp,
        level: "info",
        module: "arch",
        msg: marker + "x".repeat(filler),
      });
    };
    const victimMarker = "victim-aligned ";
    const victimFiller = LINE_BYTES - 1 - undatedOverhead - Buffer.byteLength(victimMarker, "utf8");
    assert.equal(victimFiller >= 0, true);
    const victim = JSON.stringify({
      level: "info",
      module: "arch",
      msg: victimMarker + "x".repeat(victimFiller),
    });
    const lines: string[] = [];
    for (let i = 0; i < 4; i += 1) {
      lines.push(makeDated(oldStamp, `old ${String(i).padStart(2, "0")} `));
    }
    lines.push(victim);
    for (let i = 5; i < 9; i += 1) {
      lines.push(makeDated(oldStamp, `old ${String(i).padStart(2, "0")} `));
    }
    for (let i = 9; i < 20; i += 1) {
      lines.push(makeDated(freshStamp, `recent ${String(i).padStart(2, "0")} `));
    }
    for (const line of lines) {
      assert.equal(Buffer.byteLength(line, "utf8") + 1, LINE_BYTES);
    }
    fs.writeFileSync(casePath, lines.join("\n") + "\n", "utf8");
    const size = fs.statSync(casePath).size;
    assert.equal(size, 20 * LINE_BYTES);
    assert.equal(size - 256 * 1024, 4 * LINE_BYTES);

    const response = await route.GET(new Request("http://localhost/api/logs/console?limit=2000"));
    const body = (await response.json()) as ConsoleLogApiEntry[];

    assert.equal(response.status, 200);
    assert.equal(body.length, 12);
    assert.equal(body[0].msg?.startsWith("victim-aligned"), true);
    assert.equal(body[1].msg?.startsWith("recent 09"), true);
    assert.equal(body[11].msg?.startsWith("recent 19"), true);
  } finally {
    restoreSpy();
    restoreLogFile(previous);
    try {
      fs.rmSync(casePath, { force: true });
    } catch {
      // Best-effort cleanup only.
    }
  }
  assert.equal(counter.calls > 0, true);
});
