import test from "node:test";
import assert from "node:assert/strict";

const providerColumns =
  await import("../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/providerColumns.ts");
const utils =
  await import("../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils.tsx");

test("getProviderColumns: Codex surfaces all OpenAI Codex quota columns in fixed order", () => {
  const quotas = utils.parseQuotaData("codex", {
    bankedResetCredits: 2,
    quotas: {
      gpt_5_3_codex_spark_weekly: { used: 100, total: 100, remainingPercentage: 0 },
      weekly: { used: 1, total: 100, remainingPercentage: 99 },
      session: { used: 4, total: 100, remainingPercentage: 96 },
      gpt_5_3_codex_spark_session: { used: 0, total: 100, remainingPercentage: 100 },
    },
  });

  const schema = providerColumns.getProviderColumns("codex", quotas);
  assert.equal(schema.columns.length, 5);
  assert.deepEqual(
    schema.columns.map((column) => column.key),
    [
      "session",
      "weekly",
      "gpt_5_3_codex_spark_session",
      "gpt_5_3_codex_spark_weekly",
      "banked_reset_credits",
    ]
  );
  assert.equal(schema.columns[0].label, "Session");
  assert.equal(schema.columns[0].quota?.name, "session");
  assert.equal(schema.columns[1].key, "weekly");
  assert.equal(schema.columns[1].quota?.name, "weekly");
  assert.equal(schema.columns[2].label, "GPT-5.3-Codex-Spark Session");
  assert.equal(schema.columns[2].quota?.name, "gpt_5_3_codex_spark_session");
  assert.equal(schema.columns[4].label, "Banked Reset Credits");
  assert.equal(schema.columns[4].quota?.name, "banked_reset_credits");
  assert.equal(schema.overflowCount, 0);
});

test("getProviderColumns: missing window for a named column renders as null cell", () => {
  // Codex account that has only a session window (no weekly yet)
  const quotas = utils.parseQuotaData("codex", {
    quotas: {
      session: { used: 4, total: 100, remainingPercentage: 96 },
    },
  });

  const schema = providerColumns.getProviderColumns("codex", quotas);
  assert.equal(schema.columns.length, 5, "schema column count stays stable per provider");
  assert.equal(schema.columns[0].quota?.name, "session");
  assert.equal(schema.columns[1].quota, null, "missing weekly resolves to null, not overflow");
  assert.equal(schema.columns[2].quota, null, "missing Spark session resolves to null");
  assert.equal(schema.columns[3].quota, null, "missing Spark weekly resolves to null");
  assert.equal(schema.columns[4].quota, null, "missing banked reset credits resolves to null");
  assert.equal(schema.overflowCount, 0);
});

test("getProviderColumns: MiniMax `session (5h)` matches the `session` column via normalized label", () => {
  const quotas = utils.parseQuotaData("minimax", {
    quotas: {
      "session (5h)": {
        used: 100,
        total: 100,
        remainingPercentage: 0,
      },
    },
  });

  const schema = providerColumns.getProviderColumns("minimax", quotas);
  assert.equal(schema.columns.length, 1);
  assert.equal(schema.columns[0].key, "session");
  assert.equal(schema.columns[0].label, "Session");
  assert.equal(
    schema.columns[0].quota?.name,
    "session (5h)",
    "the original quota object is attached, not a normalized clone"
  );
  assert.equal(schema.overflowCount, 0);
});

test("getProviderColumns: Antigravity falls back to dynamic schema (first 3 quotas)", () => {
  const quotas = utils.parseQuotaData("antigravity", {
    quotas: {
      "claude-opus-4-6-thinking": { used: 0, total: 100, remainingPercentage: 100 },
      "claude-sonnet-4-6": { used: 0, total: 100, remainingPercentage: 100 },
      "gemini-3.1-pro-low": { used: 0, total: 100, remainingPercentage: 100 },
      "gemini-3.5-flash-low": { used: 0, total: 100, remainingPercentage: 100 },
      "gemini-3.5-flash-medium": { used: 0, total: 100, remainingPercentage: 100 },
      "gemini-3.5-flash-high": { used: 0, total: 100, remainingPercentage: 100 },
    },
  });

  const schema = providerColumns.getProviderColumns("antigravity", quotas);
  assert.equal(schema.columns.length, providerColumns.MAX_DYNAMIC_COLUMNS);
  assert.equal(schema.overflowCount, 3, "6 quotas - 3 visible = 3 overflow");
});

test("getProviderColumns: credits never become columns, always counted toward overflow", () => {
  // DeepSeek surfaces a single credits-balance row
  const quotas = utils.parseQuotaData("deepseek", {
    quotas: {
      credits_usd: { remaining: 47.5, currency: "USD" },
    },
  });

  const schema = providerColumns.getProviderColumns("deepseek", quotas);
  assert.equal(schema.columns.length, 0, "no non-credit quotas means no columns");
  assert.equal(schema.overflowCount, 1, "the credits row is surfaced as overflow");
});

test("getProviderColumns: unknown provider uses dynamic fallback", () => {
  const quotas = [
    { name: "foo", used: 10, total: 100 },
    { name: "bar", used: 20, total: 100 },
  ];

  const schema = providerColumns.getProviderColumns("some-future-provider", quotas);
  assert.equal(schema.columns.length, 2);
  assert.equal(schema.columns[0].key, "foo");
  assert.equal(schema.columns[1].key, "bar");
  assert.equal(schema.overflowCount, 0);
});

test("getProviderColumns: tolerates non-array quotas", () => {
  const schema = providerColumns.getProviderColumns("codex", null);
  assert.equal(schema.columns.length, 5);
  assert.equal(schema.columns[0].quota, null);
  assert.equal(schema.columns[4].quota, null);
  assert.equal(schema.overflowCount, 0);
});

test("groupConnectionsByProvider: preserves input order inside each group", () => {
  const conns = [
    { id: "a", provider: "codex" },
    { id: "b", provider: "antigravity" },
    { id: "c", provider: "codex" },
    { id: "d", provider: "antigravity" },
    { id: "e", provider: "codex" },
  ];

  const groups = providerColumns.groupConnectionsByProvider(conns);
  assert.deepEqual(
    [...groups.keys()],
    ["codex", "antigravity"],
    "group order reflects first appearance"
  );
  assert.deepEqual(
    groups.get("codex")!.map((c) => c.id),
    ["a", "c", "e"]
  );
  assert.deepEqual(
    groups.get("antigravity")!.map((c) => c.id),
    ["b", "d"]
  );
});

test("groupConnectionsByProvider: missing provider key collapses into 'unknown'", () => {
  const conns = [
    { id: "x", provider: "" } as { id: string; provider: string },
    { id: "y" } as unknown as { id: string; provider: string },
  ];

  const groups = providerColumns.groupConnectionsByProvider(conns);
  assert.equal(groups.size, 1);
  assert.deepEqual(
    groups.get("unknown")!.map((c) => c.id),
    ["x", "y"]
  );
});
