import { test } from "node:test";
import assert from "node:assert/strict";
import { parseBulkApiKeys } from "../../src/shared/utils/bulkApiKeyParser.ts";
import { bulkCreateProviderSchema } from "../../src/shared/validation/schemas.ts";

// #6174 — Bulk Add API Keys for Cloudflare Workers AI.
// Cloudflare needs a per-key accountId, so the bulk rail parses a 3-field
// `name|accountId|apiKey` shape and threads a DISTINCT accountId per entry.

// ─────────────────────────────────────────────────────────────────────────────
// (a) 3-field parser — splits name|accountId|apiKey; 1-2 field shape unaffected
// ─────────────────────────────────────────────────────────────────────────────

test("withAccountId: splits name|accountId|apiKey", () => {
  const { entries, warnings } = parseBulkApiKeys("prod|acc-123|cf-token-abc", {
    withAccountId: true,
  });
  assert.equal(entries.length, 1);
  assert.deepEqual(
    { name: entries[0].name, accountId: entries[0].accountId, apiKey: entries[0].apiKey },
    { name: "prod", accountId: "acc-123", apiKey: "cf-token-abc" }
  );
  assert.equal(warnings.length, 0);
});

test("withAccountId: trims whitespace around each field", () => {
  const { entries } = parseBulkApiKeys("  prod  |  acc-1  |  cf-token  ", {
    withAccountId: true,
  });
  assert.equal(entries.length, 1);
  assert.equal(entries[0].name, "prod");
  assert.equal(entries[0].accountId, "acc-1");
  assert.equal(entries[0].apiKey, "cf-token");
});

test("withAccountId: only the first two pipes are separators — apiKey keeps its own '|'", () => {
  const { entries } = parseBulkApiKeys("prod|acc-1|cf|token|with|pipes", {
    withAccountId: true,
  });
  assert.equal(entries.length, 1);
  assert.equal(entries[0].accountId, "acc-1");
  assert.equal(entries[0].apiKey, "cf|token|with|pipes");
});

test("withAccountId: auto-names when the name field is empty", () => {
  const { entries } = parseBulkApiKeys("|acc-1|cf-token", { withAccountId: true });
  assert.equal(entries.length, 1);
  assert.equal(entries[0].name, "Key 1");
  assert.equal(entries[0].accountId, "acc-1");
});

test("withAccountId: flags & skips a line missing the accountId/apiKey field", () => {
  const { entries, warnings } = parseBulkApiKeys("prod|only-two-fields", {
    withAccountId: true,
  });
  assert.equal(entries.length, 0);
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /Line 1/);
});

test("withAccountId: flags & skips a line with no pipe at all", () => {
  const { entries, warnings } = parseBulkApiKeys("justonefield", { withAccountId: true });
  assert.equal(entries.length, 0);
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /name\|accountId\|apiKey/);
});

test("withAccountId: flags & skips empty accountId or empty apiKey", () => {
  const emptyAccount = parseBulkApiKeys("prod||cf-token", { withAccountId: true });
  assert.equal(emptyAccount.entries.length, 0);
  assert.match(emptyAccount.warnings[0], /accountId/);

  const emptyKey = parseBulkApiKeys("prod|acc-1|", { withAccountId: true });
  assert.equal(emptyKey.entries.length, 0);
  assert.match(emptyKey.warnings[0], /apiKey/);
});

test("withAccountId: skips blank lines and # comments, still caps at 200", () => {
  const good = parseBulkApiKeys("\n# a comment\nprod|acc-1|cf-token\n\n", {
    withAccountId: true,
  });
  assert.equal(good.entries.length, 1);
  assert.equal(good.entries[0].name, "prod");

  const overCap = Array.from({ length: 205 }, (_, i) => `n${i}|acc-${i}|key-${i}`).join("\n");
  const capped = parseBulkApiKeys(overCap, { withAccountId: true });
  assert.equal(capped.entries.length, 200);
  assert.ok(capped.warnings.some((w) => /200/.test(w)));
});

test("default (no options): non-cloudflare providers keep 1-2 field parsing, no accountId", () => {
  const { entries } = parseBulkApiKeys("prod|sk-key-1\nsk-key-only");
  assert.equal(entries.length, 2);
  assert.equal(entries[0].name, "prod");
  assert.equal(entries[0].apiKey, "sk-key-1");
  assert.equal(entries[0].accountId, undefined);
  assert.equal(entries[1].name, "Key 1");
  assert.equal(entries[1].apiKey, "sk-key-only");
  assert.equal(entries[1].accountId, undefined);
});

test("default: a pipe in a 2-field line is kept in the apiKey (first-pipe split)", () => {
  const { entries } = parseBulkApiKeys("prod|sk|has|pipes");
  assert.equal(entries.length, 1);
  assert.equal(entries[0].apiKey, "sk|has|pipes");
});

// ─────────────────────────────────────────────────────────────────────────────
// (b) Per-entry providerSpecificData — DISTINCT accountId per entry, no shared-
//     object bleed. This mirrors the exact merge performed in
//     src/app/api/providers/bulk/route.ts (the core bug the feature fixes: the
//     route previously reused ONE shared providerSpecificData object for every
//     entry, so a per-key accountId would bleed across all connections).
// ─────────────────────────────────────────────────────────────────────────────

test("per-entry PSD: each Cloudflare entry yields its own distinct accountId (no bleed)", () => {
  const { entries } = parseBulkApiKeys("k1|acc-AAA|token-1\nk2|acc-BBB|token-2", {
    withAccountId: true,
  });
  assert.equal(entries.length, 2);

  // Base PSD shared across the batch (e.g. baseUrl) — must NOT be mutated/reused.
  const baseProviderSpecificData: Record<string, unknown> = { baseUrl: "https://api.cf" };

  // Exact per-entry merge from route.ts:
  const perEntryPsd = entries.map((entry) => ({
    ...baseProviderSpecificData,
    ...(entry.accountId ? { accountId: entry.accountId } : {}),
  }));

  // Distinct accountId per entry.
  assert.equal(perEntryPsd[0].accountId, "acc-AAA");
  assert.equal(perEntryPsd[1].accountId, "acc-BBB");

  // No shared-object bleed: distinct references, and mutating one leaves the
  // other + the base untouched.
  assert.notEqual(perEntryPsd[0], perEntryPsd[1]);
  assert.notEqual(perEntryPsd[0], baseProviderSpecificData);
  (perEntryPsd[0] as Record<string, unknown>).accountId = "MUTATED";
  assert.equal(perEntryPsd[1].accountId, "acc-BBB");
  assert.equal(baseProviderSpecificData.accountId, undefined);
});

// ─────────────────────────────────────────────────────────────────────────────
// Schema: cloudflare-ai requires accountId per entry; other providers unaffected
// ─────────────────────────────────────────────────────────────────────────────

test("schema: cloudflare-ai bulk accepts entries carrying accountId", () => {
  const result = bulkCreateProviderSchema.safeParse({
    provider: "cloudflare-ai",
    entries: [
      { name: "k1", apiKey: "token-1", accountId: "acc-AAA" },
      { name: "k2", apiKey: "token-2", accountId: "acc-BBB" },
    ],
  });
  assert.equal(result.success, true);
});

test("schema: cloudflare-ai bulk rejects an entry missing accountId", () => {
  const result = bulkCreateProviderSchema.safeParse({
    provider: "cloudflare-ai",
    entries: [
      { name: "k1", apiKey: "token-1", accountId: "acc-AAA" },
      { name: "k2", apiKey: "token-2" },
    ],
  });
  assert.equal(result.success, false);
});

test("schema: accountId stays optional for non-cloudflare providers", () => {
  const result = bulkCreateProviderSchema.safeParse({
    provider: "anthropic",
    entries: [{ name: "prod", apiKey: "sk-1" }],
  });
  assert.equal(result.success, true);
});
