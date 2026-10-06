import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  DEFAULT_RESILIENCE_SETTINGS,
  mergeResilienceSettings,
  resolveResilienceSettings,
  type ResilienceSettings,
} from "../../src/lib/resilience/settings.ts";
import { updateResilienceSchema } from "../../src/shared/validation/schemas.ts";

function cloneDefaults(): ResilienceSettings {
  return structuredClone(DEFAULT_RESILIENCE_SETTINGS);
}

// --- Schema (PATCH /api/resilience body) ---

test("updateResilienceSchema accepts providerQuotaOverrides entries", () => {
  const parsed = updateResilienceSchema.safeParse({
    providerQuotaOverrides: {
      minimax: { rpm: 30, concurrency: 4, providerConcurrency: 8 },
      nvidia: { rpm: 60 },
    },
  });
  assert.equal(parsed.success, true, "valid override map should parse");
});

test("provider concurrency accepts zero as disabled and survives normalization", () => {
  const resolved = resolveResilienceSettings({
    resilienceSettings: {
      providerQuotaOverrides: {
        codex: { providerConcurrency: 3 },
        claude: { providerConcurrency: 0 },
      },
    },
  });
  assert.equal(resolved.providerQuotaOverrides.codex.providerConcurrency, 3);
  assert.equal(resolved.providerQuotaOverrides.claude.providerConcurrency, 0);
});

test("updateResilienceSchema allows a body containing only providerQuotaOverrides", () => {
  // The superRefine requires at least one field; a lone override map is a
  // legitimate update and must not trigger "Must provide resilience settings".
  const parsed = updateResilienceSchema.safeParse({
    providerQuotaOverrides: { minimax: { rpm: 30 } },
  });
  assert.equal(parsed.success, true);
});

test("updateResilienceSchema rejects non-positive rpm/concurrency", () => {
  assert.equal(
    updateResilienceSchema.safeParse({
      providerQuotaOverrides: { minimax: { rpm: 0 } },
    }).success,
    false,
    "rpm must be >= 1"
  );
  assert.equal(
    updateResilienceSchema.safeParse({
      providerQuotaOverrides: { minimax: { concurrency: -1 } },
    }).success,
    false,
    "concurrency must be >= 1"
  );
});

test("updateResilienceSchema rejects unknown keys inside an override entry", () => {
  assert.equal(
    updateResilienceSchema.safeParse({
      providerQuotaOverrides: { minimax: { rpm: 30, windowMs: 60_000 } },
    }).success,
    false,
    "override entries are .strict() — unknown keys rejected"
  );
});

// --- mergeResilienceSettings ---

test("mergeResilienceSettings stores provider quota overrides", () => {
  const next = mergeResilienceSettings(cloneDefaults(), {
    providerQuotaOverrides: {
      minimax: { rpm: 30, concurrency: 4 },
    },
  });
  assert.deepEqual(next.providerQuotaOverrides, { minimax: { rpm: 30, concurrency: 4 } });
});

test("mergeResilienceSettings preserves existing overrides when patch omits the map", () => {
  const current = mergeResilienceSettings(cloneDefaults(), {
    providerQuotaOverrides: { nvidia: { rpm: 40 } },
  });
  const next = mergeResilienceSettings(current, {
    requestQueue: { maxWaitMs: 60_000 },
  });
  assert.deepEqual(next.providerQuotaOverrides, { nvidia: { rpm: 40 } });
});

test("mergeResilienceSettings drops invalid override entries via normalization", () => {
  const next = mergeResilienceSettings(cloneDefaults(), {
    providerQuotaOverrides: {
      minimax: { rpm: 0 }, // non-positive → dropped by normalizeProviderQuotaOverrideEntry
    } as never,
  });
  assert.deepEqual(next.providerQuotaOverrides, {});
});

// --- resolveResilienceSettings round-trip ---

test("resolveResilienceSettings round-trips stored provider quota overrides", () => {
  const resolved = resolveResilienceSettings({
    resilienceSettings: {
      providerQuotaOverrides: {
        minimax: { rpm: 30, concurrency: 4 },
      },
    },
  });
  assert.deepEqual(resolved.providerQuotaOverrides, { minimax: { rpm: 30, concurrency: 4 } });
});

// --- Route wiring (GET/PATCH response + hot reload) ---

const RESILIENCE_ROUTE_PATH = path.resolve(process.cwd(), "src/app/api/resilience/route.ts");

test("GET /api/resilience returns providerQuotaOverrides", () => {
  const source = fs.readFileSync(RESILIENCE_ROUTE_PATH, "utf8");
  assert.match(
    source,
    /providerQuotaOverrides:\s*resilience\.providerQuotaOverrides\b/,
    "GET response should expose the resolved override map"
  );
});

test("PATCH /api/resilience returns providerQuotaOverrides and propagates it into the merge", () => {
  const source = fs.readFileSync(RESILIENCE_ROUTE_PATH, "utf8");
  assert.match(
    source,
    /providerQuotaOverrides:\s*nextResilience\.providerQuotaOverrides\b/,
    "PATCH response should expose the merged override map"
  );
  assert.match(
    source,
    /body\.providerQuotaOverrides/,
    "PATCH should read providerQuotaOverrides from the validated body"
  );
});

test("syncRuntimeSettings re-applies provider quota overrides on the hot path", () => {
  const source = fs.readFileSync(RESILIENCE_ROUTE_PATH, "utf8");
  assert.match(
    source,
    /setProviderQuotaOverrides\(resilienceSettings\.providerQuotaOverrides\)/,
    "PATCH should hot-reload overrides without a process restart"
  );
});
