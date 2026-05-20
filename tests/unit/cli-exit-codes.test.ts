import test from "node:test";
import assert from "node:assert/strict";

import { EXIT_CODES } from "../../bin/cli/output.mjs";
import { statusToExitCode, computeBackoff, RETRY_DEFAULTS } from "../../bin/cli/api.mjs";
import { t, resetForTests, setLocale } from "../../bin/cli/i18n.mjs";

// ─── exit code constants ──────────────────────────────────────────────────────

test("EXIT_CODES has expected values", () => {
  assert.equal(EXIT_CODES.SUCCESS, 0);
  assert.equal(EXIT_CODES.ERROR, 1);
  assert.equal(EXIT_CODES.INVALID_ARG, 2);
  assert.equal(EXIT_CODES.SERVER_OFFLINE, 3);
  assert.equal(EXIT_CODES.AUTH, 4);
  assert.equal(EXIT_CODES.RATE_LIMIT, 5);
  assert.equal(EXIT_CODES.TIMEOUT, 124);
});

// ─── statusToExitCode mapping ────────────────────────────────────────────────

test("statusToExitCode maps HTTP statuses correctly", () => {
  assert.equal(statusToExitCode(200), 0, "200 → 0");
  assert.equal(statusToExitCode(201), 0, "201 → 0");
  assert.equal(statusToExitCode(204), 0, "204 → 0");
  assert.equal(statusToExitCode(400), 2, "400 → 2 (bad arg)");
  assert.equal(statusToExitCode(401), 4, "401 → 4 (auth)");
  assert.equal(statusToExitCode(403), 4, "403 → 4 (auth)");
  assert.equal(statusToExitCode(404), 2, "404 → 2 (not found)");
  assert.equal(statusToExitCode(408), 124, "408 → 124 (timeout)");
  assert.equal(statusToExitCode(422), 2, "422 → 2 (validation)");
  assert.equal(statusToExitCode(429), 5, "429 → 5 (rate limit)");
  assert.equal(statusToExitCode(500), 1, "500 → 1 (server error)");
  assert.equal(statusToExitCode(502), 1, "502 → 1 (gateway)");
  assert.equal(statusToExitCode(503), 1, "503 → 1 (unavailable)");
  assert.equal(statusToExitCode(504), 1, "504 → 1 (gateway timeout)");
});

// ─── retry backoff ────────────────────────────────────────────────────────────

test("computeBackoff respects Retry-After header", () => {
  const delay = computeBackoff(1, "10");
  assert.ok(delay <= RETRY_DEFAULTS.maxMs, "capped at maxMs");
  assert.ok(delay <= 10_000, "respects 10s header");
  assert.ok(delay > 0, "positive delay");
});

test("computeBackoff grows exponentially without header", () => {
  const d1 = computeBackoff(1, null, { ...RETRY_DEFAULTS, jitter: false });
  const d2 = computeBackoff(2, null, { ...RETRY_DEFAULTS, jitter: false });
  const d3 = computeBackoff(3, null, { ...RETRY_DEFAULTS, jitter: false });
  assert.ok(d2 > d1, "attempt 2 > attempt 1");
  assert.ok(d3 >= d2, "attempt 3 >= attempt 2 (may cap)");
  assert.ok(d3 <= RETRY_DEFAULTS.maxMs, "capped at maxMs");
});

test("computeBackoff with jitter stays within ±25% of base", () => {
  const base = computeBackoff(1, null, { ...RETRY_DEFAULTS, jitter: false });
  for (let i = 0; i < 20; i++) {
    const jittered = computeBackoff(1, null, RETRY_DEFAULTS);
    const tolerance = base * 0.25 + 1;
    assert.ok(jittered >= base - tolerance, `jitter too low (${jittered} vs ${base})`);
    assert.ok(jittered <= base + tolerance, `jitter too high (${jittered} vs ${base})`);
  }
});

// ─── i18n ────────────────────────────────────────────────────────────────────

test("t() returns key for missing locale entry", () => {
  resetForTests();
  setLocale("en");
  const result = t("nonexistent.key.that.does.not.exist");
  assert.equal(result, "nonexistent.key.that.does.not.exist");
});

test("t() interpolates variables", () => {
  resetForTests();
  setLocale("en");
  const result = t("common.error", { message: "disk full" });
  assert.ok(result.includes("disk full"), `got: ${result}`);
});

test("t() falls back to en for unknown locale", () => {
  resetForTests();
  setLocale("xx-UNKNOWN");
  const result = t("common.success");
  assert.ok(result.length > 0 && result !== "common.success", `fallback failed: ${result}`);
});

test("t() supports pt-BR locale", () => {
  resetForTests();
  setLocale("pt-BR");
  const en = (() => {
    resetForTests();
    setLocale("en");
    return t("common.serverOffline");
  })();
  resetForTests();
  setLocale("pt-BR");
  const ptBR = t("common.serverOffline");
  assert.notEqual(en, ptBR, "pt-BR should differ from en");
  assert.ok(ptBR.length > 0 && ptBR !== "common.serverOffline");
});

test("t() does not expose __proto__ traversal", () => {
  resetForTests();
  setLocale("en");
  const result = t("__proto__.polluted");
  assert.equal(result, "__proto__.polluted", "should return key unchanged");
});
