/**
 * tests/unit/api-manager-quota-keys-section.test.ts
 *
 * Source-level assertions for the API Manager "two separate tables" layout:
 * quota keys (allowedQuotas non-empty) render in their own section, visually
 * differentiated from normal keys (QUOTA pill + group chips + qtSd-only mode).
 * Pattern mirrors api-manager-page-static.test.ts (source-scan + i18n parity).
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const PAGE = join(
  ROOT,
  "src/app/(dashboard)/dashboard/api-manager/ApiManagerPageClient.tsx"
);
const src = readFileSync(PAGE, "utf8");
const en = JSON.parse(readFileSync(join(ROOT, "src/i18n/messages/en.json"), "utf8")) as {
  apiManager: Record<string, string>;
};
const pt = JSON.parse(readFileSync(join(ROOT, "src/i18n/messages/pt-BR.json"), "utf8")) as {
  apiManager: Record<string, string>;
};

test("api-manager splits keys into normal + quota sections", () => {
  assert.ok(src.includes("const isQuotaKey"), "must classify quota keys by allowedQuotas");
  assert.ok(
    src.includes("allowedQuotas") && /allowedQuotas\.length\s*>\s*0/.test(src),
    "quota key = allowedQuotas non-empty"
  );
  assert.ok(src.includes("const quotaKeys") && src.includes("const normalKeys"), "must split the two arrays");
  assert.ok(src.includes("normalKeys.map(renderKeyRow)"), "normal section renders rows");
  assert.ok(src.includes("quotaKeys.map(renderKeyRow)"), "quota section renders rows");
});

test("api-manager differentiates quota keys (pill + groups + mode)", () => {
  assert.ok(src.includes('t("quotaPill")'), "quota section must show the QUOTA pill");
  assert.ok(src.includes('t("quotaModeOnly")'), "quota rows must show the qtSd-only mode chip");
  assert.ok(
    src.includes("quotaGroupsForKey") && src.includes("quotaPoolGroup"),
    "must map a quota key's pools to group names for the chips"
  );
  assert.ok(
    src.includes("/api/quota/pools") && src.includes("/api/quota/groups"),
    "must fetch pools + groups to resolve group names"
  );
});

test("api-manager: new i18n keys exist in both en and pt-BR", () => {
  for (const k of ["normalKeysSection", "quotaKeysSection", "quotaPill", "quotaModeOnly"]) {
    assert.ok(en.apiManager[k], `en apiManager.${k}`);
    assert.ok(pt.apiManager[k], `pt-BR apiManager.${k}`);
  }
});
