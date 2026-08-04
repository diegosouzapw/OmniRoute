import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Point the data dir at a throwaway location BEFORE importing the route so we can assert
// the validate-only route never writes the persisted CA-path file. resolveMitmDataDir()
// reads DATA_DIR at call time, so this also governs the route under test.
const DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ca-datadir-"));
process.env.DATA_DIR = DATA_DIR;
// The persisted path used by the real (persisting) POST /upstream-ca route.
const PERSISTED_CA_PATH_FILE = path.join(DATA_DIR, "mitm", "upstream-ca.path");

const { POST } = await import("../../src/app/api/tools/agent-bridge/upstream-ca/test/route.ts");

// #3488 — UpstreamCaField's "Test" button POSTed to /api/tools/agent-bridge/upstream-ca/test,
// which did not exist (404). The new validate-only route checks the CA file exists and is a
// parseable PEM certificate WITHOUT persisting/activating it.

// A throwaway self-signed cert (CN=OmniRoute Test CA), valid to 2036.
const TEST_CA_PEM = `-----BEGIN CERTIFICATE-----
MIIDGTCCAgGgAwIBAgIUISgNKO/v/z0FdUIPoCD4dwgKbacwDQYJKoZIhvcNAQEL
BQAwHDEaMBgGA1UEAwwRT21uaVJvdXRlIFRlc3QgQ0EwHhcNMjYwNjEwMjExNDMx
WhcNMzYwNjA3MjExNDMxWjAcMRowGAYDVQQDDBFPbW5pUm91dGUgVGVzdCBDQTCC
ASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALkubKCA7sgOph0nsKhQZNoH
UaQo+mrodWJ+23yVnxPygBQQay6okO1w5U6yxweinyCC0jB87Y386q30cqYK6NCf
HbAgkNRelhxeoU71DztIjIaKZCTlra5CCjVxVzvIOu4PoP8UgoLy/jOLM15XiM5B
entgjw62qXGRGak2Thiac+dHRzKJAIPxRDnWDrgQFsduNtSb1sGbivjUjLLEabm0
gokYlJpNCYJvS31qvL37aeV8igjt8hsReVEb5qm5RiiAepM9B3gvKvn0fsKvxT2a
rmqgySF+o2aTi+PW3+ZySoWoUL6b7GSA/CpF6Mc3u2qM/DvU4Kr0K8Y5EE+PsYUC
AwEAAaNTMFEwHQYDVR0OBBYEFD/qt9vsjOHNvlfT6Z4j9myR4GJJMB8GA1UdIwQY
MBaAFD/qt9vsjOHNvlfT6Z4j9myR4GJJMA8GA1UdEwEB/wQFMAMBAf8wDQYJKoZI
hvcNAQELBQADggEBAH0WP40mF66cqUxQjamHS2BScRkn5E+SvwoZD12ZvQO/kgj/
wbWu5mZOf5cpuqHrOmfOC+6itIkZb7v6d0CRM19xcoAg1mVWFFSk0iroFCw0qltN
kB5WPvKHI6JRkr7HdUTD1qW9ljveMPfZ/Fm9ZM6QhCOLifzNTP2GMTVyIMAvig6B
TgmL/sn4dw4C2UTMQioMMXHSeJ90OD4Pv3mqX16JKrRSICoTExBoEIF23kWWJL6m
RL5Jiv1pdbFujHL8l9KPI2xmsWtkKutxOL2O5zpdUxP4noNVInDqEmbriK6CKY4y
hWHoQhtd4zf9H6+NIi38SPTCAmCjgU7iVq6mWoE=
-----END CERTIFICATE-----
`;

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ca-test-"));
const validCaPath = path.join(dir, "valid-ca.pem");
const nonPemPath = path.join(dir, "not-a-cert.txt");
fs.writeFileSync(validCaPath, TEST_CA_PEM);
fs.writeFileSync(nonPemPath, "this is not a certificate");

test.after(() => {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.rmSync(DATA_DIR, { recursive: true, force: true });
});

function postJson(body: unknown): Request {
  return new Request("http://localhost/api/tools/agent-bridge/upstream-ca/test", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("#3488 valid PEM cert → 200 ok with subject", async () => {
  const res = await POST(postJson({ path: validCaPath }));
  assert.equal(res.status, 200);
  const json = await res.json();
  assert.equal(json.ok, true);
  assert.match(json.subject, /OmniRoute Test CA/);
});

test("#3488 does NOT persist the CA path (validate-only)", async () => {
  // Real side-effect guard (#3821-review LEDGER-11): the persisting POST /upstream-ca
  // route writes <dataDir>/mitm/upstream-ca.path. After a successful /test call that file
  // must NOT exist — proving the dry-run never persisted/activated the CA.
  assert.ok(
    !fs.existsSync(PERSISTED_CA_PATH_FILE),
    "precondition: persisted CA-path file should not exist before the test"
  );

  const res = await POST(postJson({ path: validCaPath }));
  assert.equal(res.status, 200);
  const json = await res.json();
  assert.equal(json.ok, true);

  assert.ok(
    !fs.existsSync(PERSISTED_CA_PATH_FILE),
    "validate-only /test route must not write the persisted upstream-ca.path file"
  );
  // And it must not advertise activation/persistence in its response shape.
  assert.equal(json.persisted, undefined);
  assert.equal(json.activated, undefined);
});

test("#3488 non-existent path → 400", async () => {
  const res = await POST(postJson({ path: path.join(dir, "nope.pem") }));
  assert.equal(res.status, 400);
});

test("#3488 file that is not a PEM cert → 400", async () => {
  const res = await POST(postJson({ path: nonPemPath }));
  assert.equal(res.status, 400);
});

test("#3488 invalid body (missing path) → 400", async () => {
  const res = await POST(postJson({}));
  assert.equal(res.status, 400);
});

test("#3488 invalid JSON body → 400", async () => {
  const req = new Request("http://localhost/api/tools/agent-bridge/upstream-ca/test", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{not json",
  });
  const res = await POST(req);
  assert.equal(res.status, 400);
});
