/**
 * #9442 — Linux MITM CA install inherits umask leaving system cert unreadable.
 *
 * Root cause: `installCertLinux()` runs `sudo cp` to copy the cert into the
 * system trust store but never sets the destination file mode. When the
 * calling service has a restrictive umask (e.g. PM2 `UMask=0077`), the copied
 * cert lands as `0600 root:root` instead of `0644`, so non-root TLS clients
 * (curl, Rust's reqwest, uv, Python requests) scanning `/usr/lib/ssl/certs`
 * emit repeated `Permission denied (os error 13)` warnings.
 *
 * Two gaps:
 *  1. Install gap — `installCertLinux()` never calls `chmod 0644` after `cp`.
 *  2. Repair gap — `installCert()` returns early when the cert fingerprint
 *     already matches, so a previously wrong-mode cert is never repaired.
 *
 * Methodology: real stub executables on PATH capture the argv of every spawned
 * command (`cp`, `mkdir`, `chmod`, `update-ca-certificates`), with
 * `process.platform` forced to `linux` before the module is imported and
 * `OMNIROUTE_NO_SUDO=1` so `sudo -S` is stripped and the underlying commands
 * run directly (same `resolveSudoSpawn` seam tested in
 * `mitm-systemCommands-no-sudo.test.ts`). No `child_process` mocking.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";

const originalPlatformDescriptor = Object.getOwnPropertyDescriptor(process, "platform")!;
const originalPath = process.env.PATH;
const originalNoSudo = process.env.OMNIROUTE_NO_SUDO;
// The global test harness (tests/_setup/isolateDataDir.ts) sets
// OMNIROUTE_SKIP_SYSTEM_TRUST=1 so no test mutates the host trust store —
// which makes installCert() return before issuing any command, so this file
// captures nothing and its install-gap assert can never pass under `npm run
// test:unit` (it only passed when invoked directly, without the harness).
// Clearing it here is safe: every spawned command (cp/mkdir/chmod/update-ca-*)
// is a logging stub on PATH and OMNIROUTE_NO_SUDO=1 strips sudo, so nothing
// touches the real system. Restored in test.after below.
const originalSkipSystemTrust = process.env.OMNIROUTE_SKIP_SYSTEM_TRUST;
delete process.env.OMNIROUTE_SKIP_SYSTEM_TRUST;

const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-9442-"));
const binDir = path.join(tmpRoot, "bin");
fs.mkdirSync(binDir, { recursive: true });
const captureFile = path.join(tmpRoot, "argv.log");

function makeStub(name: string): string {
  const p = path.join(binDir, name);
  fs.writeFileSync(
    p,
    `#!/usr/bin/env node
const fs = require("fs");
fs.appendFileSync(${JSON.stringify(captureFile)}, ${JSON.stringify(name)} + "\\0" + process.argv.slice(2).join("\\0") + "\\n");
process.exit(0);
`,
    { mode: 0o755 }
  );
  return p;
}

for (const cmd of ["cp", "mkdir", "chmod", "update-ca-certificates", "update-ca-trust"]) {
  makeStub(cmd);
}

Object.defineProperty(process, "platform", { value: "linux", configurable: true });
process.env.PATH = `${binDir}${path.delimiter}${originalPath}`;
process.env.OMNIROUTE_NO_SUDO = "1";

// Imported AFTER forcing linux + OMNIROUTE_NO_SUDO=1 so the module-level
// IS_WIN/IS_MAC consts see `linux` and resolveSudoSpawn strips `sudo -S`.
const { installCert, ensureSystemCertMode } = await import("../../src/mitm/cert/install.ts");

test.after(() => {
  Object.defineProperty(process, "platform", originalPlatformDescriptor);
  process.env.PATH = originalPath;
  if (originalNoSudo === undefined) delete process.env.OMNIROUTE_NO_SUDO;
  else process.env.OMNIROUTE_NO_SUDO = originalNoSudo;
  if (originalSkipSystemTrust === undefined) delete process.env.OMNIROUTE_SKIP_SYSTEM_TRUST;
  else process.env.OMNIROUTE_SKIP_SYSTEM_TRUST = originalSkipSystemTrust;
  fs.rmSync(tmpRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function resetCaptured(): void {
  fs.writeFileSync(captureFile, "");
}

function readCaptured(): string[][] {
  const raw = fs.readFileSync(captureFile, "utf8");
  return raw
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split("\0"));
}

function fakeCertFile(seed: string): string {
  const der = crypto.createHash("sha256").update(seed).digest();
  const pem =
    "-----BEGIN CERTIFICATE-----\n" +
    der
      .toString("base64")
      .match(/.{1,64}/g)!
      .join("\n") +
    "\n-----END CERTIFICATE-----\n";
  const certPath = path.join(tmpRoot, `${seed}.crt`);
  fs.writeFileSync(certPath, pem);
  return certPath;
}

test("installCert on linux issues `chmod 0644 <destFile>` after cp (install gap)", async () => {
  resetCaptured();
  const certPath = fakeCertFile("install-gap-9442");
  await installCert("", certPath);

  const cmds = readCaptured();
  const chmodCalls = cmds.filter((argv) => argv[0] === "chmod");
  assert.ok(chmodCalls.length > 0, "installCertLinux must call chmod after cp");
  const chmod = chmodCalls[0];
  assert.equal(chmod[1], "0644", "mode must be 0644 (world-readable)");
  assert.ok(
    chmod[2].endsWith("omniroute-mitm.crt"),
    `chmod must target the system cert, got: ${chmod[2]}`
  );
  // cp must precede chmod (install order: mkdir → cp → chmod → update-ca-*).
  const cpIdx = cmds.findIndex((a) => a[0] === "cp");
  const chmodIdx = cmds.findIndex((a) => a[0] === "chmod");
  assert.ok(cpIdx !== -1, "cp must be issued");
  assert.ok(chmodIdx > cpIdx, "chmod must come after cp");
});

test("ensureSystemCertMode repairs a 0600 cert to 0644 (repair gap)", async () => {
  resetCaptured();
  const destFile = path.join(tmpRoot, "wrong-mode-9442.crt");
  // Create the file with the restrictive mode that a umask 0077 cp produces.
  fs.writeFileSync(destFile, "fake-cert", { mode: 0o600 });
  assert.equal(fs.statSync(destFile).mode & 0o777, 0o600);

  await ensureSystemCertMode(destFile, "");

  const cmds = readCaptured();
  const chmodCalls = cmds.filter((a) => a[0] === "chmod");
  assert.ok(chmodCalls.length === 1, "must chmod exactly once when mode != 0644");
  assert.deepEqual(chmodCalls[0], ["chmod", "0644", destFile]);
});

test("ensureSystemCertMode is a no-op when the cert is already 0644", async () => {
  resetCaptured();
  const destFile = path.join(tmpRoot, "correct-mode-9442.crt");
  fs.writeFileSync(destFile, "fake-cert", { mode: 0o644 });
  assert.equal(fs.statSync(destFile).mode & 0o777, 0o644);

  await ensureSystemCertMode(destFile, "");

  const cmds = readCaptured();
  const chmodCalls = cmds.filter((a) => a[0] === "chmod");
  assert.equal(chmodCalls.length, 0, "must not chmod when mode is already 0644");
});

test("filesystem proof: cp under umask 0077 creates mode 0600 (why the fix is needed)", () => {
  const src = path.join(tmpRoot, "umask-src.crt");
  const dst = path.join(tmpRoot, "umask-dst.crt");
  fs.writeFileSync(src, "cert-body", { mode: 0o644 });

  const oldUmask = process.umask(0o077);
  try {
    // Use the real `cp` (GNU/BSD coreutils) by absolute path — the exact command
    // installCertLinux runs — so the umask actually applies. Node's
    // fs.copyFileSync preserves the source mode, which would mask the bug, and
    // the bare `cp` on PATH below is a logging stub from the install tests.
    // macOS keeps coreutils at /bin/cp; Linux (GNU coreutils) at /usr/bin/cp.
    const realCp = ["/usr/bin/cp", "/bin/cp"].find((p) => fs.existsSync(p));
    assert.ok(realCp, "a real cp binary must exist for this filesystem proof");
    execFileSync(realCp, [src, dst]);
    const mode = fs.statSync(dst).mode & 0o777;
    assert.equal(mode, 0o600, "cp under umask 0077 must produce 0600 — the bug this fix repairs");
  } finally {
    process.umask(oldUmask);
  }
});
