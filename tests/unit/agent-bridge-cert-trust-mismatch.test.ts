// Regression test for issue #14070 — "[Windows] AgentBridge reports
// certificate untrusted and DNS off despite manual configuration".
//
// Root cause: the AgentBridge dashboard's cert-trust check
// (/api/tools/agent-bridge/state, /diagnose, and the "trust-cert" manual
// action) always read the LEGACY leaf server.crt from disk and computed its
// OS-trust-store fingerprint from that file — regardless of which cert model
// (cert/migration.ts::decideCertMigration) is actually active for this run.
// startMitmInternal() (src/mitm/manager.ts) picks the correct model per-run
// and, under "use-root-ca", installs/trusts ca.crt instead — a DIFFERENT
// keypair with a DIFFERENT fingerprint.
//
// Fix: src/mitm/cert/activeCert.ts::resolveActiveCertPath() is the single
// source of truth for "which cert file is active for this run", reused by
// manager.ts and by all three AgentBridge route handlers.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

import { decideCertMigration } from "../../src/mitm/cert/migration.ts";
import { loadOrCreateMitmCa } from "../../src/mitm/cert/rootCa.ts";
import { certutilThumbprint } from "../../src/mitm/cert/install.ts";
import { generateCert } from "../../src/mitm/cert/generate.ts";
import { resolveActiveCertPath } from "../../src/mitm/cert/activeCert.ts";

function tmpDataDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agentbridge-"));
}

test("AgentBridge cert-trust check now targets the cert file the active migration decision actually installs (root-CA model)", async () => {
  const dataDir = tmpDataDir();
  const previousDataDir = process.env.DATA_DIR;
  process.env.DATA_DIR = dataDir;

  try {
    const certDir = path.join(dataDir, "mitm");
    fs.mkdirSync(certDir, { recursive: true });

    // Recreate the reporter's on-disk state: a legacy leaf from an earlier
    // run, PLUS a persisted CA pair — the combination that activates the
    // root-CA model this run (decideCertMigration()).
    await generateCert();
    const legacyLeafPath = path.join(certDir, "server.crt");
    assert.equal(fs.existsSync(legacyLeafPath), true, "server.crt must exist for this scenario");

    const ca = await loadOrCreateMitmCa(certDir);
    assert.equal(fs.existsSync(ca.certPath), true, "ca.crt must exist for this scenario");

    const migrationDecision = decideCertMigration(certDir, false);
    assert.equal(
      migrationDecision,
      "use-root-ca",
      "with both a legacy leaf and a CA pair on disk, manager.ts activates the root-CA model this run"
    );
    const actuallyInstalledCertPath = ca.certPath;

    // This is what the dashboard's cert-trust check now resolves to.
    const { certPath: dashboardCheckedCertPath, mode } = resolveActiveCertPath(certDir, false);

    assert.equal(mode, "use-root-ca");
    assert.equal(
      dashboardCheckedCertPath,
      actuallyInstalledCertPath,
      "FIX: the dashboard's cert-trust check must target the same file (ca.crt) manager.ts actually installed/trusted for this run's active cert model"
    );

    const dashboardCheckedThumbprint = certutilThumbprint(dashboardCheckedCertPath);
    const actuallyTrustedThumbprint = certutilThumbprint(actuallyInstalledCertPath);
    assert.equal(
      dashboardCheckedThumbprint,
      actuallyTrustedThumbprint,
      "FIX: the fingerprint the dashboard looks up in the OS store must be the fingerprint of the cert that was actually installed there"
    );
  } finally {
    if (previousDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = previousDataDir;
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
});

test("AgentBridge cert-trust check still targets server.crt for a legacy-only install (no CA pair, no behavior change)", async () => {
  const dataDir = tmpDataDir();
  const previousDataDir = process.env.DATA_DIR;
  process.env.DATA_DIR = dataDir;

  try {
    const certDir = path.join(dataDir, "mitm");
    fs.mkdirSync(certDir, { recursive: true });

    await generateCert();
    const legacyLeafPath = path.join(certDir, "server.crt");
    assert.equal(fs.existsSync(legacyLeafPath), true, "server.crt must exist for this scenario");
    assert.equal(
      fs.existsSync(path.join(certDir, "ca.crt")),
      false,
      "no CA pair must exist for this scenario"
    );

    const { certPath, mode } = resolveActiveCertPath(certDir, false);

    assert.equal(mode, "use-legacy-leaf");
    assert.equal(
      certPath,
      legacyLeafPath,
      "a pre-existing legacy-only install must keep resolving to server.crt — no silent upgrade"
    );
  } finally {
    if (previousDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = previousDataDir;
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
});

test("resolveActiveCertPath: fresh install with the flag on resolves to ca.crt (matches decideCertMigration)", () => {
  const dataDir = tmpDataDir();
  try {
    const certDir = path.join(dataDir, "mitm");
    fs.mkdirSync(certDir, { recursive: true });

    const { certPath, mode } = resolveActiveCertPath(certDir, true);

    assert.equal(mode, "use-root-ca");
    assert.equal(certPath, path.join(certDir, "ca.crt"));
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
});
