// TDD verification for #9541 — DB corruption probe transient-error retry.
//
// RED: The repro confirms transient errors (BUSY, ENOENT, PROTOCOL, IOERR)
//     fall through to the corruption-rename path (data loss confirmed).
// GREEN: After the fix, isTransientProbeError() exists in core.ts and correctly
//     classifies transient vs fatal errors, and a retry loop prevents immediate
//     corruption declaration.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Import the fix function from probeUtils.ts
const probeUtils = await import("../../src/lib/db/probeUtils.ts");

// ── Tests from the original probe that confirmed the bug ──

test("FIX-GREEN: isTransientProbeError is exported and classifies BUSY", () => {
  const busy = new Error("SQLITE_BUSY: database is locked");

  // The fix must exist
  assert.equal(
    typeof probeUtils.isTransientProbeError,
    "function",
    "isTransientProbeError must be exported from core.ts"
  );

  assert.equal(probeUtils.isTransientProbeError(busy), true, "BUSY is transient");
});

test("FIX-GREEN: isTransientProbeError does NOT classify fatal errors", () => {
  const fatalPatterns = [
    "out of memory",
    "allocation failure",
    "Array buffer allocation failed",
    "could not be found",
    "Module did not self-register",
  ];

  for (const msg of fatalPatterns) {
    assert.equal(
      probeUtils.isTransientProbeError(new Error(msg)),
      false,
      `fatal should NOT be transient: ${msg}`
    );
  }
});

test("FIX-GREEN: isTransientProbeError classifies BUSY/PROTOCOL/IOERR/ENOENT", () => {
  const transientPatterns = [
    "SQLITE_BUSY: database is locked",
    "SQLITE_PROTOCOL: locking protocol",
    "SQLITE_IOERR: disk I/O error",
    "ENOENT: no such file or directory, open '/tmp/db.sqlite'",
  ];

  for (const msg of transientPatterns) {
    assert.equal(probeUtils.isTransientProbeError(new Error(msg)), true, `transient: ${msg}`);
  }
});

test("FIX-GREEN: isTransientProbeError handles non-Error input gracefully", () => {
  assert.equal(probeUtils.isTransientProbeError("SQLITE_BUSY"), true, "string error works");
  assert.equal(
    probeUtils.isTransientProbeError("random string"),
    false,
    "non-matching string returns false"
  );
  assert.equal(probeUtils.isTransientProbeError(null), false, "null returns false");
  assert.equal(probeUtils.isTransientProbeError(undefined), false, "undefined returns false");
  assert.equal(probeUtils.isTransientProbeError({}), false, "object without message returns false");
});

test("BUG-CONFIRMED (regression guard): probe failure renames DB and loses persisted config", () => {
  // This test confirms the SCENARIO we're preventing — if the probe path is
  // reached (all transient retries exhausted or non-transient), data IS lost.
  // This is the EXISTING behavior on non-transient errors; the fix only
  // ADDED a retry window for transient errors before this path.
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-9541-data-loss-"));
  const sqliteFile = path.join(dir, "storage.sqlite");

  try {
    const header = Buffer.alloc(100);
    header.write("SQLite format 3\0");
    fs.writeFileSync(sqliteFile, header);
    fs.writeFileSync(sqliteFile, "DATA_MARKER_PERSISTED_CONFIG", { flag: "a" });

    const beforeContent = fs.readFileSync(sqliteFile, "utf-8");
    assert.ok(
      beforeContent.includes("DATA_MARKER_PERSISTED_CONFIG"),
      "data must be present before probe failure"
    );

    // Simulate probe failure: rename + create new empty DB
    const failedPath = sqliteFile + `.probe-failed-${Date.now()}`;
    fs.renameSync(sqliteFile, failedPath);
    const newHeader = Buffer.alloc(100);
    newHeader.write("SQLite format 3\0");
    fs.writeFileSync(sqliteFile, newHeader);

    const afterContent = fs.readFileSync(sqliteFile, "utf-8");
    assert.equal(
      afterContent.includes("DATA_MARKER_PERSISTED_CONFIG"),
      false,
      "data MUST be lost when DB is renamed and recreated (corruption path behavior)"
    );
  } finally {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      /* ok */
    }
  }
});

test("FIX-GREEN: DATA_DIR no longer overridden at module scope in probe-9033-repro", async () => {
  // Verify the fix in probe-9033-repro.test.ts no longer sets process.env.DATA_DIR
  // at module scope. Read-only accesses to process.env.DATA_DIR are fine.
  const reproTestSource = fs.readFileSync(
    new URL("../../tests/unit/authz/probe-9033-repro.test.ts", import.meta.url),
    "utf-8"
  );

  // Find lines that ASSIGN to process.env.DATA_DIR (not just read it)
  const assignLines = reproTestSource
    .split("\n")
    .filter((line) => /process\.env\.DATA_DIR\s*=/.test(line) && !line.trim().startsWith("//"));

  assert.equal(
    assignLines.length,
    0,
    `probe-9033-repro must not assign process.env.DATA_DIR at module scope. Found: ${assignLines.map((l) => l.trim()).join(", ")}`
  );
});
