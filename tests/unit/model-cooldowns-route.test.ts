import test from "node:test";
import assert from "node:assert/strict";
import {
  getAvailabilityReport,
  clearModelUnavailability,
  resetAllAvailability,
} from "../../src/domain/modelAvailability.ts";
import { lockModel, clearModelLock } from "@omniroute/open-sse/services/accountFallback";

const TEST_CONN = "test-conn-001";

function seed(provider: string, model: string, cooldownMs = 60_000) {
  lockModel(provider, TEST_CONN, model, "quota_exhausted", cooldownMs, {});
}

function cleanup(provider: string, model: string) {
  clearModelLock(provider, TEST_CONN, model);
}

test("getAvailabilityReport: returns empty array when no lockouts", () => {
  const report = getAvailabilityReport();
  const forProvider = report.filter((e) => e.provider === "test-empty-provider");
  assert.equal(forProvider.length, 0);
});

test("getAvailabilityReport: returns active lockout with positive remainingMs", () => {
  seed("test-prov", "test-model");
  try {
    const report = getAvailabilityReport();
    const entry = report.find((e) => e.provider === "test-prov" && e.model === "test-model");
    assert.ok(entry, "lockout should appear in report");
    assert.ok(entry.remainingMs > 0, "remainingMs should be positive");
  } finally {
    cleanup("test-prov", "test-model");
  }
});

test("clearModelUnavailability: removes matching lockout and returns true", () => {
  seed("prov-clear", "model-clear");
  const removed = clearModelUnavailability("prov-clear", "model-clear");
  assert.equal(removed, true);
  const report = getAvailabilityReport();
  const stillThere = report.find((e) => e.provider === "prov-clear" && e.model === "model-clear");
  assert.equal(stillThere, undefined);
});

test("clearModelUnavailability: returns false when no matching lockout", () => {
  const removed = clearModelUnavailability("nonexistent-prov", "nonexistent-model");
  assert.equal(removed, false);
});

test("resetAllAvailability: clears all seeded lockouts", () => {
  seed("reset-prov-a", "reset-model-a");
  seed("reset-prov-b", "reset-model-b");
  resetAllAvailability();
  const report = getAvailabilityReport();
  const a = report.find((e) => e.provider === "reset-prov-a");
  const b = report.find((e) => e.provider === "reset-prov-b");
  assert.equal(a, undefined);
  assert.equal(b, undefined);
});
