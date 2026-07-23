// Guard: the test suite must NEVER touch the OS trust store. On 2026-07-05 the
// integration test "POST /cert: installs trust when cert exists" ran the REAL
// install path on a persistent self-hosted runner and wrote a 105-byte fake PEM
// into /usr/local/share/ca-certificates — update-ca-certificates then baked the
// invalid entry into ca-certificates.crt and broke ALL system TLS on the VM
// (curl error 77, apt cert failures, corrupted artifact downloads). Hosted
// runners are ephemeral, so the same write went unnoticed for months.
//
// OMNIROUTE_SKIP_SYSTEM_TRUST=1 (set globally in tests/_setup/isolateDataDir.ts)
// makes installCert/uninstallCert no-ops before any filesystem/spawn work.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { installCert } from "../../src/mitm/cert/install.ts";

test("isolateDataDir setup exports the system-trust guard for every test process", () => {
  assert.equal(process.env.OMNIROUTE_SKIP_SYSTEM_TRUST, "1");
});

test("installCert under the guard skips the OS mutation but keeps input contracts", async () => {
  // Contract preserved: a missing cert file still throws (agent-bridge fallback
  // #4546 depends on it to build the environment-skip result).
  await assert.rejects(() => installCert("", "/nonexistent/omniroute-guard-test.pem"));

  // With a REAL (fake-content) cert file, the un-guarded path would go on to
  // sudo/update-ca-certificates — under the guard it must resolve without
  // mutating the OS trust store (this exact write bricked the VM's TLS).
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-trust-guard-"));
  const pem = path.join(dir, "omniroute-guard-test.pem");
  fs.writeFileSync(
    pem,
    "-----BEGIN CERTIFICATE-----\nMIIBpDCCAQ2gAwIBAgIUFakeGuardCertXX==\n-----END CERTIFICATE-----\n"
  );
  try {
    await installCert("", pem);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
