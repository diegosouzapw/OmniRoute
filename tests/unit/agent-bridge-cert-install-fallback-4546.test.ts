import test from "node:test";
import assert from "node:assert/strict";

// #4546 — In containers/headless, the system trust store can't be written
// (no sudo / read-only store / no interactive auth), so the cert install
// throws and used to abort the whole Agent Bridge start. These tests pin the
// graceful-fallback contract: a structured result that distinguishes a
// user-canceled auth from an environment failure, plus a platform-specific
// manual-install guide so the operator can trust the MITM root CA themselves.

const { classifyCertInstallError, buildCertManualGuide, installCertResult } = await import(
  "../../src/mitm/cert/install.ts"
);

const DOWNLOAD_URL = "/api/tools/agent-bridge/cert/download";

test("classifyCertInstallError → 'canceled' only when the message says canceled", () => {
  assert.equal(classifyCertInstallError("User canceled authorization"), "canceled");
  assert.equal(classifyCertInstallError("Operation was canceled by the user"), "canceled");
});

test("classifyCertInstallError → 'environment' for trust-store / sudo failures", () => {
  assert.equal(classifyCertInstallError("Certificate install failed"), "environment");
  assert.equal(classifyCertInstallError("sudo: no tty present and no askpass program specified"), "environment");
  assert.equal(classifyCertInstallError("Certificate file not found: /x/server.crt"), "environment");
});

test("buildCertManualGuide(linux) → update-ca-certificates steps + download url + cert path", () => {
  const guide = buildCertManualGuide("/data/mitm/server.crt", "linux");
  assert.equal(guide.platform, "linux");
  assert.equal(guide.certPath, "/data/mitm/server.crt");
  assert.equal(guide.downloadUrl, DOWNLOAD_URL);
  assert.ok(Array.isArray(guide.steps) && guide.steps.length > 0);
  const joined = guide.steps.join("\n");
  assert.ok(joined.includes("update-ca-"), "should mention the distro CA refresh command");
  assert.ok(joined.includes("/data/mitm/server.crt"), "should reference the cert path");
});

test("buildCertManualGuide(darwin) → security add-trusted-cert", () => {
  const guide = buildCertManualGuide("/d/server.crt", "darwin");
  assert.equal(guide.platform, "darwin");
  assert.ok(guide.steps.join("\n").includes("add-trusted-cert"));
});

test("buildCertManualGuide(win32) → certutil -addstore Root", () => {
  const guide = buildCertManualGuide("C:/d/server.crt", "win32");
  assert.equal(guide.platform, "win32");
  assert.ok(guide.steps.join("\n").toLowerCase().includes("certutil"));
});

test("installCertResult → environment skip (not a throw) when install is impossible", async () => {
  // A non-existent cert path makes installCert() throw before any privileged
  // command runs — deterministic, no sudo. The wrapper must convert that into a
  // structured skippable result with a manual guide, never a thrown error.
  const result = await installCertResult("", "/nonexistent/omniroute-4546-server.crt");
  assert.equal(result.installed, false);
  assert.equal(result.skipped, true);
  assert.equal(result.reason, "environment");
  assert.ok(result.manualGuide, "environment skip must carry a manual guide");
  assert.equal(result.manualGuide?.downloadUrl, DOWNLOAD_URL);
  // The message must be a safe string (no stack trace leaked).
  assert.equal(typeof result.message, "string");
  assert.ok(!String(result.message).includes("\n    at "), "must not leak a stack trace");
});
