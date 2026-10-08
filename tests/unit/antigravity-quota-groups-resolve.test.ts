import test from "node:test";
import assert from "node:assert/strict";

import { resolveAntigravityQuotaGroups } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/AntigravityQuotaGroups.tsx";

test("resolveAntigravityQuotaGroups returns rawGroups when already provided", () => {
  const rawGroups = [
    {
      id: "gemini",
      displayName: "Gemini Models",
      windows: { session: { remainingPercentage: 80 } },
      models: ["gemini-3.8-flash-high"],
    },
  ];

  const result = resolveAntigravityQuotaGroups(rawGroups, []);
  assert.equal(result.length, 1);
  assert.equal(result[0].id, "gemini");
  assert.equal(result[0].windows?.session?.remainingPercentage, 80);
});

test("resolveAntigravityQuotaGroups synthesizes groups from cached flat quotas", () => {
  const quotas = [
    { name: "gemini_session", remainingPercentage: 74, resetAt: "2026-09-03T12:00:00Z" },
    { name: "gemini_weekly", remainingPercentage: 36, resetAt: "2026-09-07T12:00:00Z" },
    { modelKey: "gemini-3.8-flash-high", remainingPercentage: 74 },
    { modelKey: "gemini-3.8-flash-medium", remainingPercentage: 74 },
    { name: "claude_gpt_session", remainingPercentage: 92, resetAt: "2026-09-03T12:00:00Z" },
    { name: "claude_gpt_weekly", remainingPercentage: 68, resetAt: "2026-09-07T12:00:00Z" },
    { modelKey: "claude-sonnet-4-6", remainingPercentage: 92 },
  ];

  const result = resolveAntigravityQuotaGroups([], quotas);
  assert.equal(result.length, 2);

  const gemini = result.find((g) => g.id === "gemini");
  assert.ok(gemini);
  assert.equal(gemini.windows?.session?.remainingPercentage, 74);
  assert.equal(gemini.windows?.weekly?.remainingPercentage, 36);
  assert.deepEqual(gemini.models, ["gemini-3.8-flash-high", "gemini-3.8-flash-medium"]);

  const claude = result.find((g) => g.id === "claude_gpt");
  assert.ok(claude);
  assert.equal(claude.windows?.session?.remainingPercentage, 92);
  assert.equal(claude.windows?.weekly?.remainingPercentage, 68);
  assert.deepEqual(claude.models, ["claude-sonnet-4-6"]);
});

test("resolveAntigravityQuotaGroups falls back to per-model session if summary was unavailable", () => {
  const quotas = [
    { name: "gemini_weekly", remainingPercentage: 36, resetAt: "2026-09-07T12:00:00Z" },
    { modelKey: "gemini-3.7-flash-high", remainingPercentage: 80, resetAt: "2026-09-03T10:00:00Z" },
  ];

  const result = resolveAntigravityQuotaGroups(undefined, quotas);
  assert.equal(result.length, 1);
  assert.equal(result[0].id, "gemini");
  assert.equal(result[0].windows?.session?.remainingPercentage, 80);
  assert.equal(result[0].windows?.weekly?.remainingPercentage, 36);
});
