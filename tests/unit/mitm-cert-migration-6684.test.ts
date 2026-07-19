import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { decideCertMigration } from "../../src/mitm/cert/migration.ts";

// #6684: migration gate between the legacy single self-signed leaf and the
// new persisted root-CA model. A trusted MITM CA that can sign a cert for
// ANY host is materially more powerful than the old fixed-SAN leaf, so an
// already-trusted install must never be silently upgraded.

function tmpCertDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "mitm-migration-test-"));
}

function touch(filePath: string): void {
  fs.writeFileSync(filePath, "test");
}

test("decideCertMigration: existing legacy leaf, no CA pair, flag off → stay on legacy leaf", () => {
  const certDir = tmpCertDir();
  try {
    touch(path.join(certDir, "server.crt"));
    touch(path.join(certDir, "server.key"));
    assert.equal(decideCertMigration(certDir, false), "use-legacy-leaf");
  } finally {
    fs.rmSync(certDir, { recursive: true, force: true });
  }
});

test("decideCertMigration: no legacy leaf and no CA pair (fresh install) → use root CA", () => {
  const certDir = tmpCertDir();
  try {
    assert.equal(decideCertMigration(certDir, false), "use-root-ca");
  } finally {
    fs.rmSync(certDir, { recursive: true, force: true });
  }
});

test("decideCertMigration: legacy leaf present but explicit opt-in flag on → use root CA", () => {
  const certDir = tmpCertDir();
  try {
    touch(path.join(certDir, "server.crt"));
    touch(path.join(certDir, "server.key"));
    assert.equal(decideCertMigration(certDir, true), "use-root-ca");
  } finally {
    fs.rmSync(certDir, { recursive: true, force: true });
  }
});

test("decideCertMigration: CA pair already persisted → use root CA even without the flag", () => {
  const certDir = tmpCertDir();
  try {
    touch(path.join(certDir, "server.crt"));
    touch(path.join(certDir, "server.key"));
    touch(path.join(certDir, "ca.crt"));
    touch(path.join(certDir, "ca.key"));
    assert.equal(decideCertMigration(certDir, false), "use-root-ca");
  } finally {
    fs.rmSync(certDir, { recursive: true, force: true });
  }
});

test("decideCertMigration: partial legacy pair (only server.crt) is treated as no legacy install", () => {
  const certDir = tmpCertDir();
  try {
    touch(path.join(certDir, "server.crt"));
    assert.equal(decideCertMigration(certDir, false), "use-root-ca");
  } finally {
    fs.rmSync(certDir, { recursive: true, force: true });
  }
});
