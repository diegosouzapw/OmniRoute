/**
 * Gap 9 regression: uninstallCert() was fully implemented but had ZERO
 * production call sites — the OmniRoute root CA stayed trusted machine-wide
 * forever after MITM was disabled. These tests pin the wiring contract:
 *   (a) the cert module exports uninstallCert + checkCertInstalled, and
 *   (b) the cert route now exposes a DELETE handler that performs the removal.
 */
import test from "node:test";
import assert from "node:assert/strict";

const certModule = await import("../../src/mitm/cert/install.ts");
const certRoute = await import(
  "../../src/app/api/tools/agent-bridge/cert/route.ts"
);

test("cert module exports uninstallCert", () => {
  assert.equal(typeof certModule.uninstallCert, "function", "uninstallCert must be exported");
});

test("cert module exports checkCertInstalled for status UX", () => {
  assert.equal(
    typeof certModule.checkCertInstalled,
    "function",
    "checkCertInstalled must be exported"
  );
});

test("cert route exposes a DELETE handler that removes the trusted CA", () => {
  assert.equal(
    typeof certRoute.DELETE,
    "function",
    "the cert route must export a DELETE handler so the CA can be untrusted on demand (Gap 9)"
  );
});
