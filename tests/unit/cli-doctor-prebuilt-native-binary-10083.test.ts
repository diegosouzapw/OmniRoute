import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #10083 — `doctor` only looked for the node-gyp layout
// (build/Release/better_sqlite3.node), so every install that resolves a
// prebuilt binary (`npm i -g omniroute`) warned "better-sqlite3 native binary
// was not found" even though the binary was present and loading fine.

const ORIGINAL_DATA_DIR = process.env.DATA_DIR;

interface DoctorCheck {
  name: string;
  status: string;
  message: string;
  details: Record<string, unknown>;
}

function nativeBinaryCheck(result: { checks: DoctorCheck[] }) {
  const check = result.checks.find((c) => c.name === "Native binary");
  assert.ok(check, "expected a 'Native binary' check");
  return check;
}

async function withTempRoot(fn: (rootDir: string) => Promise<void>) {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-prebuild-data-"));
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-prebuild-root-"));
  process.env.DATA_DIR = dataDir;
  try {
    await fn(rootDir);
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    fs.rmSync(rootDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
}

test("prebuiltBinaryName maps platform/arch the way better-sqlite3 ships them", async () => {
  const { prebuiltBinaryName } = await import("../../bin/cli/commands/doctor.mjs");

  assert.equal(prebuiltBinaryName("darwin", "arm64"), "darwin-arm64.node");
  assert.equal(prebuiltBinaryName("win32", "x64"), "win32-x64.node");

  // glibc Linux keeps the plain `linux-` prefix …
  const glibcReport = { getReport: () => ({ header: { glibcVersionRuntime: "2.39" } }) };
  assert.equal(prebuiltBinaryName("linux", "x64", glibcReport), "linux-x64.node");

  // … while musl builds (no glibcVersionRuntime) use `linuxmusl-`.
  const muslReport = { getReport: () => ({ header: {} }) };
  assert.equal(prebuiltBinaryName("linux", "arm64", muslReport), "linuxmusl-arm64.node");
});

test("doctor finds a prebuilt better-sqlite3 binary instead of warning 'not found'", async () => {
  await withTempRoot(async (rootDir) => {
    const { collectDoctorChecks, prebuiltBinaryName } =
      await import("../../bin/cli/commands/doctor.mjs");

    const prebuildDir = path.join(rootDir, "node_modules", "better-sqlite3", "prebuilds");
    fs.mkdirSync(prebuildDir, { recursive: true });
    const binaryPath = path.join(prebuildDir, prebuiltBinaryName());
    fs.writeFileSync(binaryPath, Buffer.alloc(64));

    const result = await collectDoctorChecks({ rootDir }, { skipLiveness: true });
    const check = nativeBinaryCheck(result);

    assert.ok(
      !/was not found/.test(check.message),
      `expected the prebuild to be discovered, got: ${check.message}`
    );
    assert.equal(check.details.binaryPath, binaryPath);
  });
});

test("doctor still warns when neither layout has a binary", async () => {
  await withTempRoot(async (rootDir) => {
    const { collectDoctorChecks } = await import("../../bin/cli/commands/doctor.mjs");

    const result = await collectDoctorChecks({ rootDir }, { skipLiveness: true });
    const check = nativeBinaryCheck(result);

    assert.equal(check.status, "warn");
    assert.match(check.message, /was not found/);
    // Both layouts should be reported so the warning is actionable.
    const candidates = check.details.candidates as string[];
    assert.ok(candidates.some((c) => c.includes(path.join("build", "Release"))));
    assert.ok(candidates.some((c) => c.includes("prebuilds")));
  });
});
