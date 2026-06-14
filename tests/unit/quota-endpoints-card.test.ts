/**
 * tests/unit/quota-endpoints-card.test.ts
 *
 * Task 7 — source-scan assertions for QuotaEndpointsCard component:
 * - renders /v1/chat/completions base URL
 * - references quotaModelName or builds qtSd/ ids
 * - has a <select> with a previewKeyNone option
 * - fetches /api/quota/keys/{id}/models when a key is selected
 * - QuotaSharePageClient imports + renders <QuotaEndpointsCard
 * - i18n parity for the 5 new keys
 *
 * Pattern mirrors tests/unit/quota-groups-ui.test.ts (source-scan, Node native runner).
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

const CARD_PATH = join(
  ROOT,
  "src/app/(dashboard)/dashboard/costs/quota-share/components/QuotaEndpointsCard.tsx"
);

const PAGE_CLIENT_PATH = join(
  ROOT,
  "src/app/(dashboard)/dashboard/costs/quota-share/QuotaSharePageClient.tsx"
);

const EN_PATH = join(ROOT, "src/i18n/messages/en.json");
const PT_PATH = join(ROOT, "src/i18n/messages/pt-BR.json");

const cardSrc = readFileSync(CARD_PATH, "utf8");
const pageSrc = readFileSync(PAGE_CLIENT_PATH, "utf8");

// ── QuotaEndpointsCard: base URL ───────────────────────────────────────────────

test("QuotaEndpointsCard: renders /v1/chat/completions base URL", () => {
  assert.ok(
    cardSrc.includes("/v1/chat/completions"),
    "QuotaEndpointsCard must render the /v1/chat/completions endpoint"
  );
});

// ── QuotaEndpointsCard: builds qtSd/ model ids ────────────────────────────────

test("QuotaEndpointsCard: references quotaModelName or qtSd/ prefix", () => {
  const refsModelName = cardSrc.includes("quotaModelName");
  const refsQtSd = cardSrc.includes("qtSd/") || cardSrc.includes("qtSd");
  assert.ok(
    refsModelName || refsQtSd,
    "QuotaEndpointsCard must reference quotaModelName or the qtSd/ model prefix"
  );
});

// ── QuotaEndpointsCard: key selector ──────────────────────────────────────────

test("QuotaEndpointsCard: has a <select> for API key preview", () => {
  assert.ok(
    cardSrc.includes("<select"),
    "QuotaEndpointsCard must render a <select> for API key selection"
  );
});

test("QuotaEndpointsCard: has a previewKeyNone leading option", () => {
  assert.ok(
    cardSrc.includes('previewKeyNone') || cardSrc.includes("previewKeyNone"),
    "QuotaEndpointsCard must use the t('previewKeyNone') i18n key for the empty/all option"
  );
});

test("QuotaEndpointsCard: has a leading option with value=\"\" for no-key selection", () => {
  // The leading option must have value="" so that on reset it reverts to all-endpoints view
  assert.ok(
    cardSrc.includes('value=""') || cardSrc.includes("value=''"),
    "QuotaEndpointsCard must have a leading <option value=\"\"> for (all endpoints)"
  );
});

// ── QuotaEndpointsCard: per-key fetch ─────────────────────────────────────────

test("QuotaEndpointsCard: fetches /api/quota/keys/ + /models for key preview", () => {
  assert.ok(
    cardSrc.includes("/api/quota/keys/"),
    "QuotaEndpointsCard must fetch /api/quota/keys/..."
  );
  assert.ok(
    cardSrc.includes("/models"),
    "QuotaEndpointsCard must include /models in the fetch URL"
  );
});

// ── QuotaSharePageClient: imports + renders QuotaEndpointsCard ─────────────────

test("QuotaSharePageClient: imports QuotaEndpointsCard", () => {
  assert.ok(
    pageSrc.includes("QuotaEndpointsCard"),
    "QuotaSharePageClient must import QuotaEndpointsCard"
  );
});

test("QuotaSharePageClient: renders <QuotaEndpointsCard", () => {
  assert.ok(
    pageSrc.includes("<QuotaEndpointsCard"),
    "QuotaSharePageClient must render <QuotaEndpointsCard ..."
  );
});

test("QuotaSharePageClient: passes groups, pools, connections, apiKeys to QuotaEndpointsCard", () => {
  const cardIdx = pageSrc.indexOf("<QuotaEndpointsCard");
  assert.ok(cardIdx >= 0, "<QuotaEndpointsCard must exist in the source");
  // Find the closing tag (allow JSX self-close or regular close)
  const closeIdx = pageSrc.indexOf("/>", cardIdx);
  const block = pageSrc.slice(cardIdx, closeIdx + 2);
  assert.ok(block.includes("groups="), "QuotaEndpointsCard must receive groups prop");
  assert.ok(block.includes("pools="), "QuotaEndpointsCard must receive pools prop");
  assert.ok(block.includes("connections="), "QuotaEndpointsCard must receive connections prop");
  assert.ok(block.includes("apiKeys="), "QuotaEndpointsCard must receive apiKeys prop");
});

// ── i18n parity ───────────────────────────────────────────────────────────────

const ENDPOINTS_KEYS = [
  "endpointsTitle",
  "endpointsHint",
  "previewForKey",
  "previewKeyNone",
  "endpointsBaseUrl",
] as const;

test("i18n: all 5 endpoint keys present in en.json quotaShare namespace", () => {
  const en = JSON.parse(readFileSync(EN_PATH, "utf8")) as Record<string, Record<string, string>>;
  for (const k of ENDPOINTS_KEYS) {
    assert.equal(
      typeof en["quotaShare"]?.[k],
      "string",
      `en.json missing quotaShare.${k}`
    );
  }
});

test("i18n: all 5 endpoint keys present in pt-BR.json quotaShare namespace", () => {
  const pt = JSON.parse(readFileSync(PT_PATH, "utf8")) as Record<string, Record<string, string>>;
  for (const k of ENDPOINTS_KEYS) {
    assert.equal(
      typeof pt["quotaShare"]?.[k],
      "string",
      `pt-BR.json missing quotaShare.${k}`
    );
  }
});

test("i18n: full parity — en and pt-BR both have all 5 endpoint keys", () => {
  const en = JSON.parse(readFileSync(EN_PATH, "utf8")) as Record<string, Record<string, string>>;
  const pt = JSON.parse(readFileSync(PT_PATH, "utf8")) as Record<string, Record<string, string>>;
  for (const k of ENDPOINTS_KEYS) {
    assert.ok(k in (en["quotaShare"] ?? {}), `en.json missing quotaShare.${k}`);
    assert.ok(k in (pt["quotaShare"] ?? {}), `pt-BR.json missing quotaShare.${k}`);
  }
});
