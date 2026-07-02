/**
 * Gap 12: capture-pipeline self-test. MITM setups fail silently in many ways
 * (cert not trusted, DNS not spoofed, server down/unreachable) and the user
 * gets no actionable signal. summarizeDiagnostics() is the pure core: given the
 * boolean results of each check, it produces an actionable report with a single
 * `healthy` verdict and a per-failure hint.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { summarizeDiagnostics } from "../../src/mitm/inspector/diagnostics.ts";

test("all checks green → healthy, no hints", () => {
  const report = summarizeDiagnostics({
    serverRunning: true,
    serverReachable: true,
    certExists: true,
    certTrusted: true,
    dnsConfigured: true,
  });
  assert.equal(report.healthy, true);
  assert.equal(report.checks.length, 5);
  assert.ok(report.checks.every((c) => c.ok && c.hint === null));
});

test("cert not trusted → unhealthy with an actionable hint on that check", () => {
  const report = summarizeDiagnostics({
    serverRunning: true,
    serverReachable: true,
    certExists: true,
    certTrusted: false,
    dnsConfigured: true,
  });
  assert.equal(report.healthy, false);
  const certCheck = report.checks.find((c) => c.name === "cert-trusted");
  assert.ok(certCheck, "must include a cert-trusted check");
  assert.equal(certCheck!.ok, false);
  assert.ok(certCheck!.hint && certCheck!.hint.length > 0, "must give an actionable hint");
});

test("server down → unhealthy and the server-running check carries the hint", () => {
  const report = summarizeDiagnostics({
    serverRunning: false,
    serverReachable: false,
    certExists: true,
    certTrusted: true,
    dnsConfigured: true,
  });
  assert.equal(report.healthy, false);
  const runCheck = report.checks.find((c) => c.name === "server-running");
  assert.equal(runCheck?.ok, false);
  assert.ok(runCheck?.hint);
});

test("every failing check has a non-null hint; every passing check has null", () => {
  const report = summarizeDiagnostics({
    serverRunning: false,
    serverReachable: false,
    certExists: false,
    certTrusted: false,
    dnsConfigured: false,
  });
  assert.equal(report.healthy, false);
  assert.ok(report.checks.every((c) => !c.ok && typeof c.hint === "string" && c.hint.length > 0));
});
