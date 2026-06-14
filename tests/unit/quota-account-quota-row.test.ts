/**
 * Task 6 — AccountQuotaRow structural tests
 *
 * These tests use source-level assertions (readFileSync) so they work with the
 * Node.js native test runner without a DOM / React rendering setup.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

const ACCOUNT_QUOTA_ROW_PATH = join(
  ROOT,
  "src/app/(dashboard)/dashboard/costs/quota-share/components/AccountQuotaRow.tsx"
);

const POOL_CARD_PATH = join(
  ROOT,
  "src/app/(dashboard)/dashboard/costs/quota-share/components/PoolCard.tsx"
);

const EN_PATH = join(ROOT, "src/i18n/messages/en.json");
const PT_PATH = join(ROOT, "src/i18n/messages/pt-BR.json");

// ── Load sources ─────────────────────────────────────────────────────────────

const accountQuotaSrc = readFileSync(ACCOUNT_QUOTA_ROW_PATH, "utf8");
const poolCardSrc = readFileSync(POOL_CARD_PATH, "utf8");

// ── i18n parity ──────────────────────────────────────────────────────────────

const NEW_KEYS = ["accountQuotaTitle", "accountQuotaNone"] as const;

test("i18n: new keys present in en.json", () => {
  const en = JSON.parse(readFileSync(EN_PATH, "utf8")) as Record<string, Record<string, string>>;
  for (const k of NEW_KEYS) {
    assert.equal(
      typeof en["quotaShare"]?.[k],
      "string",
      `en.json missing quotaShare.${k}`
    );
  }
});

test("i18n: new keys present in pt-BR.json", () => {
  const pt = JSON.parse(readFileSync(PT_PATH, "utf8")) as Record<string, Record<string, string>>;
  for (const k of NEW_KEYS) {
    assert.equal(
      typeof pt["quotaShare"]?.[k],
      "string",
      `pt-BR.json missing quotaShare.${k}`
    );
  }
});

test("i18n: parity between en and pt-BR for new keys", () => {
  const en = JSON.parse(readFileSync(EN_PATH, "utf8")) as Record<string, Record<string, string>>;
  const pt = JSON.parse(readFileSync(PT_PATH, "utf8")) as Record<string, Record<string, string>>;
  for (const k of NEW_KEYS) {
    assert.ok(
      k in (en["quotaShare"] ?? {}),
      `en.json missing quotaShare.${k}`
    );
    assert.ok(
      k in (pt["quotaShare"] ?? {}),
      `pt-BR.json missing quotaShare.${k}`
    );
  }
});

// ── AccountQuotaRow structural assertions ────────────────────────────────────

test("AccountQuotaRow: fetches /api/usage/provider-limits endpoint", () => {
  assert.ok(
    accountQuotaSrc.includes("/api/usage/provider-limits"),
    "AccountQuotaRow must fetch the /api/usage/provider-limits endpoint"
  );
});

test("AccountQuotaRow: guards caches with optional chaining (no unguarded dereference)", () => {
  // Must use ?. when accessing caches map
  assert.ok(
    accountQuotaSrc.includes("caches?.["),
    "AccountQuotaRow must use optional chaining when accessing caches (caches?.[connId])"
  );
});

test("AccountQuotaRow: uses Array.isArray guard before relying on connectionIds", () => {
  assert.ok(
    accountQuotaSrc.includes("Array.isArray(connectionIds)"),
    "AccountQuotaRow must guard connectionIds with Array.isArray"
  );
});

test("AccountQuotaRow: uses Array.isArray guard before iterating parsed quotas", () => {
  assert.ok(
    accountQuotaSrc.includes("Array.isArray(parsed)"),
    "AccountQuotaRow must guard parsed result with Array.isArray"
  );
});

test("AccountQuotaRow: fail-soft — renders accountQuotaNone when empty", () => {
  assert.ok(
    accountQuotaSrc.includes("accountQuotaNone"),
    "AccountQuotaRow must render the accountQuotaNone fallback string"
  );
});

test("AccountQuotaRow: uses ProviderIcon from shared components", () => {
  assert.ok(
    accountQuotaSrc.includes("ProviderIcon"),
    "AccountQuotaRow must render a ProviderIcon per connection"
  );
});

test("AccountQuotaRow: cleans up fetch with alive flag to prevent state-after-unmount", () => {
  assert.ok(
    accountQuotaSrc.includes("alive = false"),
    "AccountQuotaRow must set alive = false in useEffect cleanup"
  );
});

// ── PoolCard mounts AccountQuotaRow ──────────────────────────────────────────

test("PoolCard: imports AccountQuotaRow", () => {
  assert.ok(
    poolCardSrc.includes("AccountQuotaRow"),
    "PoolCard.tsx must import and render AccountQuotaRow"
  );
});

test("PoolCard: mounts <AccountQuotaRow in JSX", () => {
  assert.ok(
    poolCardSrc.includes("<AccountQuotaRow"),
    "PoolCard.tsx must render <AccountQuotaRow .../>"
  );
});

test("PoolCard: passes connectionIds prop to AccountQuotaRow", () => {
  assert.ok(
    poolCardSrc.includes("connectionIds={connectionIds}"),
    "PoolCard.tsx must pass connectionIds to AccountQuotaRow"
  );
});

test("PoolCard: declares connectionIds in PoolCardProps interface", () => {
  assert.ok(
    poolCardSrc.includes("connectionIds?:"),
    "PoolCardProps must declare optional connectionIds field"
  );
});
