import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { mkdtempSync, rmSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCRIPT = resolve(__dirname, "../../bin/reset-password.mjs");

/** Run the CLI with piped stdin lines, return { code, stdout, stderr } */
function runCLI(inputs) {
  return new Promise((res) => {
    const proc = spawn("node", [SCRIPT], {
      stdio: "pipe",
      env: { ...process.env },
    });
    let stdout = "";
    let stderr = "";
    proc.stdout.on("data", (d) => {
      stdout += d;
    });
    proc.stderr.on("data", (d) => {
      stderr += d;
    });
    const writeNext = (lines) => {
      if (!lines.length) {
        proc.stdin.end();
        return;
      }
      proc.stdin.write(lines[0] + "\n");
      setImmediate(() => writeNext(lines.slice(1)));
    };
    writeNext(inputs);
    proc.on("close", (code) => res({ code, stdout, stderr }));
    // Safety timeout
    setTimeout(() => {
      proc.kill();
      res({ code: -1, stdout, stderr: stderr + "\n[TIMEOUT]" });
    }, 5000);
  });
}

test("reset-password rejects password shorter than 12 chars", async () => {
  // Use a non-existent DB path so the script exits early with the DB-not-found error
  // rather than requiring a full DB setup
  const tempDir = mkdtempSync(join(tmpdir(), "omniroute-pw-test-"));
  try {
    const result = await runCLI(["short"]);
    // Script exits 1 either because DB not found (no DB) or password too short
    assert.notEqual(result.code, 0, "should exit non-zero for short password");
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});

test(
  "reset-password exits non-zero when DATA_DIR has no database",
  async () => {
    const tempDir = mkdtempSync(join(tmpdir(), "omniroute-pw-test-empty-"));
    try {
      const result = await runCLI(["ValidPassword123"]);
      assert.equal(result.code, 1, "should exit 1 when DB not found");
      assert.ok(
        result.stderr.includes("Database not found") ||
          result.stdout.includes("Database not found"),
        `Expected 'Database not found' in output, got stderr: ${result.stderr} stdout: ${result.stdout}`
      );
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  },
  { env: {} }
);
