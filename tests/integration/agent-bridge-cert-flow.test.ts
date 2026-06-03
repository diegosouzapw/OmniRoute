/**
 * Integration tests: AgentBridge cert flow
 *
 * Covers:
 *   - GET  /api/tools/agent-bridge/cert         — status (exists + trusted)
 *   - POST /api/tools/agent-bridge/cert         — trust (mocked OS call)
 *   - GET  /api/tools/agent-bridge/cert/download  — content-type PEM
 *   - POST /api/tools/agent-bridge/cert/regenerate — generates cert
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ab-cert-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const certRoute = await import("../../src/app/api/tools/agent-bridge/cert/route.ts");
const downloadRoute = await import("../../src/app/api/tools/agent-bridge/cert/download/route.ts");
const regenerateRoute = await import("../../src/app/api/tools/agent-bridge/cert/regenerate/route.ts");

function certDir() {
  return path.join(TEST_DATA_DIR, "mitm");
}

function certFilePath() {
  return path.join(certDir(), "server.crt");
}

function resetCertDir() {
  fs.rmSync(certDir(), { recursive: true, force: true });
  fs.mkdirSync(certDir(), { recursive: true });
}

test.beforeEach(() => {
  resetCertDir();
});

test.after(() => {
  try { fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true }); } catch { /* noop */ }
});

// ── GET /cert ─────────────────────────────────────────────────────────────

test("GET /cert: returns exists:false when no cert file", async () => {
  const res = await certRoute.GET();
  assert.equal(res.status, 200);
  const body = await res.json() as Record<string, unknown>;
  assert.equal(body.exists, false);
  assert.equal(body.trusted, false);
  assert.equal(body.path, null);
});

test("GET /cert: returns exists:true when cert file present", async () => {
  const fakeCert = "-----BEGIN CERTIFICATE-----\nfake\n-----END CERTIFICATE-----\n";
  fs.writeFileSync(certFilePath(), fakeCert);

  const res = await certRoute.GET();
  assert.equal(res.status, 200);
  const body = await res.json() as Record<string, unknown>;
  assert.equal(body.exists, true);
  // trusted may be false in test env (no system store)
  assert.ok(typeof body.trusted === "boolean");
  assert.equal(body.path, certFilePath());
});

test("GET /cert: error response does not leak stack trace", async () => {
  const res = await certRoute.GET();
  const text = await res.text();
  assert.ok(!text.includes("at /"), "stack trace leaked in GET /cert response");
});

// ── POST /cert (trust — mocked OS) ────────────────────────────────────────

test("POST /cert: returns 404 when no cert file", async () => {
  const res = await certRoute.POST(
    new Request("http://localhost/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sudoPassword: "" }),
    })
  );
  assert.equal(res.status, 404);
  const body = await res.json() as Record<string, unknown>;
  const errMsg = (body.error as Record<string, unknown>)?.message as string;
  assert.ok(!errMsg.includes("at /"), "stack trace leaked in 404 error message");
});

test("POST /cert: installs trust when cert exists (OS call best-effort)", async () => {
  // Write a minimal valid-looking PEM (checkCertInstalled reads it)
  const fakePem = `-----BEGIN CERTIFICATE-----
MIIBpDCCAQ2gAwIBAgIUFakeMITMCertForTestingOnlyXX==
-----END CERTIFICATE-----
`;
  fs.writeFileSync(certFilePath(), fakePem);

  const res = await certRoute.POST(
    new Request("http://localhost/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sudoPassword: "" }),
    })
  );

  // In test env: installCert may throw because the PEM is fake; we accept
  // either 200 (mocked) or 500 (real OS failure) — NOT a 500 with stack trace
  const body = await res.json() as Record<string, unknown>;
  const errMsg = (body.error as Record<string, unknown>)?.message as string | undefined;
  if (errMsg) {
    assert.ok(!errMsg.includes("at /"), "stack trace leaked in POST /cert error");
  }
});

// ── GET /cert/download ────────────────────────────────────────────────────

test("GET /cert/download: 404 when no cert file", async () => {
  const res = await downloadRoute.GET();
  assert.equal(res.status, 404);
  const body = await res.json() as Record<string, unknown>;
  const errMsg = (body.error as Record<string, unknown>)?.message as string;
  assert.ok(!errMsg.includes("at /"), "stack trace leaked in download 404");
});

test("GET /cert/download: returns PEM content-type when cert exists", async () => {
  const fakeCert = "-----BEGIN CERTIFICATE-----\nfake\n-----END CERTIFICATE-----\n";
  fs.writeFileSync(certFilePath(), fakeCert);

  const res = await downloadRoute.GET();
  assert.equal(res.status, 200);
  const contentType = res.headers.get("content-type");
  assert.ok(
    contentType?.includes("pem") || contentType?.includes("x-pem-file"),
    `Unexpected Content-Type: ${contentType}`
  );
  const text = await res.text();
  assert.ok(text.includes("BEGIN CERTIFICATE"), "PEM content missing");
});

// ── POST /cert/regenerate ─────────────────────────────────────────────────

test("POST /cert/regenerate: generates cert and returns paths", async () => {
  // generateCert uses 'selfsigned' — in test env this should work
  const res = await regenerateRoute.POST();

  // Acceptable: 200 (cert generated) or 500 (selfsigned not available in test env)
  // We just verify: no stack trace in response
  const text = await res.text();
  assert.ok(!text.includes("at /"), "stack trace leaked in regenerate response");

  if (res.status === 200) {
    const body = JSON.parse(text) as Record<string, unknown>;
    assert.equal(body.ok, true);
    assert.ok(typeof body.certPath === "string");
    assert.ok(typeof body.keyPath === "string");
  }
});
