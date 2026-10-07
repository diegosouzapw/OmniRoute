import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Regression guard for #10348 — default process logs must not leak client/egress IPs
// or the raw account prefix. Storage (in-memory ring buffer + SQLite) stays intact;
// only the process-log emission changes.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-10348-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");

function resetStorage() {
  proxyLogger.clearProxyLogs();
  core.closeDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => resetStorage());
test.after(() => resetStorage());

test("[10348] default ProxyEgress console line redacts client IP, egress IP, and account prefix", () => {
  const captured: string[] = [];
  const origConsole = console.log;
  console.log = (...args: unknown[]) => {
    captured.push(args.map(String).join(" "));
  };
  try {
    proxyLogger.logProxyEvent({
      status: "error",
      provider: "codex",
      clientIp: "198.51.100.7",
      egressIp: "203.0.113.9",
      account: "aabbccdd",
      level: "account",
    });
  } finally {
    console.log = origConsole;
  }
  const line = captured.find((l) => l.includes("[ProxyEgress]"));
  assert.ok(line, "expected a [ProxyEgress] console line");
  assert.ok(line!.includes("codex"), "expected provider in the line");
  assert.ok(line!.includes("status=error"), "expected status=error in the line");
  assert.ok(
    !line!.includes("198.51.100.7"),
    "client IP must be redacted from the console line by default"
  );
  assert.ok(
    !line!.includes("203.0.113.9"),
    "egress IP must be redacted from the console line by default"
  );
  assert.ok(
    !line!.includes("aabbccdd"),
    "account prefix must be redacted from the console line by default"
  );
});
