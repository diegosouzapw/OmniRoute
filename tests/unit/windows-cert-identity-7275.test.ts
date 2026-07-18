/**
 * Regression test for #7275 — Windows cert check/uninstall used a hardcoded
 * legacy hostname (`daily-cloudcode-pa.googleapis.com`) instead of the real
 * generated CA's identity.
 *
 * Root cause: `checkCertInstalledWindows()`/`uninstallCertWindows()` queried
 * the Windows Root store by the literal legacy hostname regardless of the
 * `certPath` passed in — it only "worked" because that hostname happens to be
 * the CA's own `commonName` today (`generate.ts` derives it from
 * `ANTIGRAVITY_TARGET.hosts[0]`), a coincidence with no shared symbol coupling
 * the two. `installCertWindows()` was already correct (keys off `certPath`).
 *
 * Fix: both functions now derive a SHA-1 thumbprint straight from the
 * `certPath` file (via the exported `certutilThumbprint()`, reusing the same
 * `getCertFingerprint()` logic {@link checkCertInstalledMac} already uses) —
 * the same identity `installCertWindows()` installs, independent of
 * `ANTIGRAVITY_TARGET.hosts` ordering/content.
 *
 * Methodology: a real `certutil` stub on PATH captures argv (no
 * `child_process` mocking), with `process.platform` forced to `win32` before
 * the module is imported (`IS_WIN` is a load-time const) and a fake — but
 * real-file — cert so `getCertFingerprint()` runs unmodified.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";

const LEGACY_HARDCODED_HOST = "daily-cloudcode-pa.googleapis.com";

const originalPlatformDescriptor = Object.getOwnPropertyDescriptor(process, "platform")!;
const originalPath = process.env.PATH;

const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7275-"));
const binDir = path.join(tmpRoot, "bin");
fs.mkdirSync(binDir, { recursive: true });
const captureFile = path.join(tmpRoot, "certutil-argv.log");
fs.writeFileSync(captureFile, "");

// A real executable on PATH — not a child_process mock — so
// checkCertInstalledWindows() exercises the genuine execFile() code path.
const certutilStubPath = path.join(binDir, "certutil");
fs.writeFileSync(
  certutilStubPath,
  `#!/usr/bin/env node
const fs = require("fs");
fs.appendFileSync(${JSON.stringify(captureFile)}, process.argv.slice(2).join(" ") + "\\n");
process.exit(0);
`,
  { mode: 0o755 }
);

Object.defineProperty(process, "platform", { value: "win32", configurable: true });
process.env.PATH = `${binDir}${path.delimiter}${originalPath}`;

// Imported AFTER forcing win32: IS_WIN inside install.ts is a load-time const.
const { checkCertInstalled, certutilThumbprint, buildWindowsDelstoreScript } = await import(
  "../../src/mitm/cert/install.ts"
);

test.after(() => {
  Object.defineProperty(process, "platform", originalPlatformDescriptor);
  process.env.PATH = originalPath;
  fs.rmSync(tmpRoot, { recursive: true, force: true });
});

function fakeCertFile(seed: string): string {
  const der = crypto.createHash("sha256").update(seed).digest();
  const pem =
    "-----BEGIN CERTIFICATE-----\n" +
    der.toString("base64").match(/.{1,64}/g)!.join("\n") +
    "\n-----END CERTIFICATE-----\n";
  const certPath = path.join(tmpRoot, `${seed}.crt`);
  fs.writeFileSync(certPath, pem);
  return certPath;
}

test("checkCertInstalledWindows() keys off the real cert's thumbprint, not the legacy hardcoded host", async () => {
  const certPath = fakeCertFile("probe-a");
  const expectedThumbprint = certutilThumbprint(certPath);

  const isInstalled = await checkCertInstalled(certPath);
  assert.equal(isInstalled, true, "the certutil stub always exits 0 → should report installed");

  const capturedArgv = fs.readFileSync(captureFile, "utf8").trim().split("\n").at(-1)!;
  // Exact-equality is strictly stronger than a negative substring check: an argv
  // that IS `-store Root <thumbprint>` cannot also carry the legacy hostname.
  assert.equal(
    capturedArgv,
    `-store Root ${expectedThumbprint}`,
    "certutil must be queried with the real cert's thumbprint, not the legacy hostname"
  );
});

test("checkCertInstalledWindows() tracks certPath — a different cert yields a different query", async () => {
  fs.writeFileSync(captureFile, "");
  const certPathB = fakeCertFile("probe-b");
  const thumbprintA = certutilThumbprint(fakeCertFile("probe-a"));
  const thumbprintB = certutilThumbprint(certPathB);
  assert.notEqual(thumbprintA, thumbprintB, "sanity: distinct cert content → distinct thumbprint");

  await checkCertInstalled(certPathB);
  const capturedArgv = fs.readFileSync(captureFile, "utf8").trim().split("\n").at(-1)!;
  assert.equal(capturedArgv, `-store Root ${thumbprintB}`);
});

test("buildWindowsDelstoreScript() embeds the cert's own thumbprint, not the legacy hardcoded host", () => {
  const certPath = fakeCertFile("probe-c");
  const thumbprint = certutilThumbprint(certPath);
  const script = buildWindowsDelstoreScript(thumbprint);

  // Assert on the certId argument certutil actually receives, rather than on a
  // negative substring scan of the whole script: pinning the extracted value to
  // the real thumbprint proves no other identity (legacy hostname included) can
  // be the one passed to -delstore.
  const certIdArg = script.match(/'-delstore'\s*,\s*'Root'\s*,\s*'([^']+)'/)?.[1];
  assert.equal(
    certIdArg,
    thumbprint,
    "delstore must target the cert's own thumbprint as its certId argument"
  );
});

test("check and uninstall derive identity from the SAME source (certutilThumbprint(certPath)) — immune to ANTIGRAVITY_TARGET.hosts reordering", async () => {
  fs.writeFileSync(captureFile, "");
  const certPath = fakeCertFile("probe-d");

  await checkCertInstalled(certPath);
  const checkArgv = fs.readFileSync(captureFile, "utf8").trim().split("\n").at(-1)!;
  const checkThumbprint = checkArgv.replace("-store Root ", "");

  const delstoreScript = buildWindowsDelstoreScript(certutilThumbprint(certPath));

  assert.ok(
    delstoreScript.includes(checkThumbprint),
    "uninstall must target the exact same identity the check used — " +
      "no coincidence-based coupling through a hardcoded hostname"
  );
});

test("source no longer hardcodes the legacy host for the Windows check/uninstall paths", () => {
  const source = fs.readFileSync(
    new URL("../../src/mitm/cert/install.ts", import.meta.url),
    "utf8"
  );
  // Only allowed inside the doc-comment explaining the historical bug — never
  // as a live argv literal passed to certutil.
  assert.ok(
    !source.includes(`"${LEGACY_HARDCODED_HOST}"`),
    "the legacy hostname must not appear as a string literal anywhere in install.ts"
  );
});
