import test from "node:test";
import assert from "node:assert/strict";

import {
  parseSelfProbeConfig,
  shouldSelfProbeExit,
} from "../../scripts/dev/self-probe-watchdog.mjs";

test("self-probe config: enabled by default with sensible values", () => {
  const cfg = parseSelfProbeConfig({});
  assert.equal(cfg.enabled, true);
  assert.ok(cfg.intervalMs >= 5_000);
  assert.ok(cfg.timeoutMs >= 1_000);
  assert.ok(cfg.threshold >= 2);
});

test("self-probe config: explicit off", () => {
  for (const raw of ["0", "false", "no", "off"]) {
    assert.equal(parseSelfProbeConfig({ OMNIROUTE_SELF_PROBE: raw }).enabled, false, raw);
  }
});

test("self-probe config: env overrides clamp to sane minimums", () => {
  const cfg = parseSelfProbeConfig({
    OMNIROUTE_SELF_PROBE_INTERVAL_MS: "500",
    OMNIROUTE_SELF_PROBE_THRESHOLD: "1",
  });
  assert.ok(cfg.intervalMs >= 5_000, "interval must clamp to >= 5s");
  assert.ok(cfg.threshold >= 2, "threshold must clamp to >= 2");
});

test("self-probe exit decision: at threshold and beyond", () => {
  assert.equal(shouldSelfProbeExit(2, 3), false);
  assert.equal(shouldSelfProbeExit(3, 3), true);
  assert.equal(shouldSelfProbeExit(4, 3), true);
  assert.equal(shouldSelfProbeExit(0, 3), false);
});
