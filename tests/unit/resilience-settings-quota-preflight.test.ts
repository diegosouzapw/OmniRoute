import { test } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_RESILIENCE_SETTINGS,
  mergeResilienceSettings,
  resolveResilienceSettings,
  type ResilienceSettings,
} from "../../src/lib/resilience/settings.ts";

function cloneDefaults(): ResilienceSettings {
  return structuredClone(DEFAULT_RESILIENCE_SETTINGS);
}

test("default quotaPreflight thresholds use remaining-% semantics (matches dashboard)", () => {
  const settings = cloneDefaults();
  // Block when only 2% remaining (= 98% used).
  assert.equal(settings.quotaPreflight.defaultThresholdPercent, 2);
  // Warn at 20% remaining (= 80% used).
  assert.equal(settings.quotaPreflight.warnThresholdPercent, 20);
  // Warn fires earlier than block, so warn % > block %.
  assert.ok(
    settings.quotaPreflight.warnThresholdPercent > settings.quotaPreflight.defaultThresholdPercent
  );
});

test("default providerWindowDefaults is empty — all providers share the global default", () => {
  // No factory per-provider seeds; the per-window overrides apply only when
  // operators explicitly set them. This keeps the modal placeholder
  // consistent across providers (always shows the global default).
  const settings = cloneDefaults();
  assert.deepEqual(settings.quotaPreflight.providerWindowDefaults, {});
});

test("resolveResilienceSettings returns defaults when nothing is stored", () => {
  const resolved = resolveResilienceSettings({});
  assert.equal(resolved.quotaPreflight.defaultThresholdPercent, 2);
  assert.equal(resolved.quotaPreflight.warnThresholdPercent, 20);
  assert.deepEqual(resolved.quotaPreflight.providerWindowDefaults, {});
});

test("mergeResilienceSettings: partial defaultThresholdPercent update preserves warnThresholdPercent", () => {
  const current = cloneDefaults();
  const next = mergeResilienceSettings(current, {
    quotaPreflight: { defaultThresholdPercent: 10 },
  });
  assert.equal(next.quotaPreflight.defaultThresholdPercent, 10);
  assert.equal(next.quotaPreflight.warnThresholdPercent, 20);
});

test("mergeResilienceSettings clamps defaultThresholdPercent above 99 to 99", () => {
  // Block at 100% remaining would mean "always block" — clamp to 99 so it's
  // at least conceivable to use the account when it's exactly full.
  const next = mergeResilienceSettings(cloneDefaults(), {
    quotaPreflight: { defaultThresholdPercent: 150 },
  });
  assert.equal(next.quotaPreflight.defaultThresholdPercent, 99);
});

test("warnThresholdPercent is forced ABOVE defaultThresholdPercent when sent in conflict", () => {
  // In remaining-% semantics, warn must be > cutoff so warnings fire BEFORE
  // the block point (more remaining = warn first, less remaining = block).
  const next = mergeResilienceSettings(cloneDefaults(), {
    quotaPreflight: { defaultThresholdPercent: 30, warnThresholdPercent: 10 },
  });
  assert(
    next.quotaPreflight.warnThresholdPercent > next.quotaPreflight.defaultThresholdPercent,
    `expected warn > default, got warn=${next.quotaPreflight.warnThresholdPercent} default=${next.quotaPreflight.defaultThresholdPercent}`
  );
  assert.equal(next.quotaPreflight.defaultThresholdPercent, 30);
  assert.equal(next.quotaPreflight.warnThresholdPercent, 31);
});

test("providerWindowDefaults: arbitrary new provider/window pairs are normalized and stored", () => {
  const next = mergeResilienceSettings(cloneDefaults(), {
    quotaPreflight: {
      providerWindowDefaults: {
        codex: { session: 10, weekly: 30 },
        someprovider: { monthly: 40 },
      },
    },
  });
  assert.deepEqual(next.quotaPreflight.providerWindowDefaults.codex, {
    session: 10,
    weekly: 30,
  });
  assert.deepEqual(next.quotaPreflight.providerWindowDefaults.someprovider, { monthly: 40 });
});

test("providerWindowDefaults: out-of-range values are clamped, garbage is pruned", () => {
  const next = mergeResilienceSettings(cloneDefaults(), {
    quotaPreflight: {
      providerWindowDefaults: {
        codex: {
          session: 150, // clamped to 100
          weekly: -20, // clamped to 0
          // @ts-expect-error: intentionally bogus to ensure pruning
          junk: "not a number",
        },
      },
    },
  });
  assert.equal(next.quotaPreflight.providerWindowDefaults.codex.session, 100);
  assert.equal(next.quotaPreflight.providerWindowDefaults.codex.weekly, 0);
  assert.equal(
    "junk" in next.quotaPreflight.providerWindowDefaults.codex,
    false,
    "non-numeric entries should be pruned"
  );
});

test("resolveResilienceSettings round-trips a stored providerWindowDefaults map", () => {
  const stored = {
    resilienceSettings: {
      quotaPreflight: {
        defaultThresholdPercent: 15,
        warnThresholdPercent: 30,
        providerWindowDefaults: { codex: { session: 12, weekly: 40 } },
      },
    },
  };
  const resolved = resolveResilienceSettings(stored);
  assert.equal(resolved.quotaPreflight.defaultThresholdPercent, 15);
  assert.equal(resolved.quotaPreflight.warnThresholdPercent, 30);
  assert.deepEqual(resolved.quotaPreflight.providerWindowDefaults.codex, {
    session: 12,
    weekly: 40,
  });
});
