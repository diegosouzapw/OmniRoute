import test from "node:test";
import assert from "node:assert/strict";
import { normalizeClaudeUsageQuotas } from "../../open-sse/services/usage/claudeQuota.ts";
import { parseQuotaData } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing.ts";

const activeReset = "2099-09-10T10:00:00.000Z";
const inactiveReset = "2099-09-17T10:00:00.000Z";

function scopedLimit(surface: string, percent: number, resetAt: string, active: boolean) {
  return {
    kind: "weekly_scoped",
    percent,
    resetsAt: resetAt,
    isActive: active,
    severity: active ? "critical" : "normal",
    scope: { model: null, surface: { display_name: surface } },
  };
}

function rowsFor(limits: unknown[]) {
  return parseQuotaData("claude", normalizeClaudeUsageQuotas({ limits }));
}

test("unresolved Claude quota rows keep stable identities when upstream order changes", () => {
  // Surface names are synthetic; the object shape follows Claude Code's cached usage schema.
  const active = scopedLimit("surface-a", 100, activeReset, true);
  const inactive = scopedLimit("surface-b", 20, inactiveReset, false);

  const forward = rowsFor([active, inactive]);
  const reversed = rowsFor([inactive, active]);

  assert.equal(forward.length, 2);
  assert.equal(reversed.length, 2);
  const forwardActive = forward.find((row) => row.resetAt === activeReset);
  const reversedActive = reversed.find((row) => row.resetAt === activeReset);
  assert.ok(forwardActive);
  assert.ok(reversedActive);
  assert.equal(forwardActive.name, reversedActive.name);
  assert.equal(forwardActive.displayName, reversedActive.displayName);
  assert.match(String(forwardActive.displayName), /surface-a/i);
  const forwardInactive = forward.find((row) => row.resetAt === inactiveReset);
  const reversedInactive = reversed.find((row) => row.resetAt === inactiveReset);
  assert.ok(forwardInactive);
  assert.ok(reversedInactive);
  assert.equal(forwardInactive.name, reversedInactive.name);
  assert.notEqual(forwardActive.name, forwardInactive.name);

  const named = normalizeClaudeUsageQuotas({
    limits: [
      {
        ...active,
        scope: {
          model: { displayName: "Fable" },
          surface: { display_name: "surface-a" },
        },
      },
    ],
  });
  assert.deepEqual(Object.keys(named.modelQuotas), ["weekly fable (7d)"]);
});

test("surface identity remains stable when quota values change", () => {
  const initial = rowsFor([scopedLimit("surface-a", 100, activeReset, true)])[0];
  const updated = rowsFor([scopedLimit("surface-a", 35, inactiveReset, false)])[0];

  assert.ok(initial);
  assert.ok(updated);
  assert.equal(initial.name, updated.name);
  assert.equal(initial.displayName, updated.displayName);
});

test("duplicate surface identities retain every row in either order", () => {
  const active = scopedLimit("surface-a", 100, activeReset, true);
  const inactive = scopedLimit("surface-a", 20, inactiveReset, false);
  const forward = rowsFor([active, inactive]);
  const reversed = rowsFor([inactive, active]);

  assert.equal(forward.length, 2);
  assert.equal(reversed.length, 2);
  assert.equal(new Set(forward.map((row) => row.name)).size, 2);
  assert.deepEqual(forward.map((row) => row.name).sort(), reversed.map((row) => row.name).sort());
});

test("surface identity preserves case and punctuation", () => {
  const upper = scopedLimit("Surface-A", 100, activeReset, true);
  const lower = scopedLimit("surface-a!", 20, inactiveReset, false);
  const forward = rowsFor([upper, lower]);
  const reversed = rowsFor([lower, upper]);

  assert.equal(forward.length, 2);
  assert.equal(new Set(forward.map((row) => row.name)).size, 2);
  assert.equal(
    forward.find((row) => row.resetAt === activeReset)?.name,
    reversed.find((row) => row.resetAt === activeReset)?.name
  );
});

test("invalid surface shapes retain anonymous numbered windows", () => {
  for (const surface of [null, "surface-a", {}, { display_name: "" }, { display_name: 42 }]) {
    const base = scopedLimit("ignored", 100, activeReset, true);
    const limits = [
      { ...base, scope: { model: null, surface } },
      { ...base, resetsAt: inactiveReset, scope: { model: null, surface } },
    ];
    const normalized = normalizeClaudeUsageQuotas({ limits });

    assert.deepEqual(Object.keys(normalized.modelQuotas), [
      "weekly scoped (7d) #1",
      "weekly scoped (7d) #2",
    ]);
  }
});
