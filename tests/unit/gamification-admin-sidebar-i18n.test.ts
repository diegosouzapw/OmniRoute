import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const { SIDEBAR_SECTIONS, HIDEABLE_SIDEBAR_ITEM_IDS, SIDEBAR_ICON_ACCENTS, getSectionItems } =
  await import("../../src/shared/constants/sidebarVisibility.ts");

type Messages = Record<string, unknown>;

function readJson(relativePath: string): Messages {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8")) as Messages;
}

function getMessage(messages: Messages, dottedKey: string): unknown {
  return dottedKey.split(".").reduce<unknown>((value, segment) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
    return (value as Messages)[segment];
  }, messages);
}

const PAGE_PATH = "src/app/(dashboard)/dashboard/gamification/admin/page.tsx";
const SIDEBAR_KEYS = ["sidebar.gamificationAdmin", "sidebar.gamificationAdminSubtitle"];
const NEW_KEYS = ["common.suspicious", ...SIDEBAR_KEYS];

test("gamification anomalies page is reachable from the Gamification sidebar group", () => {
  const section = SIDEBAR_SECTIONS.find((s) => s.id === "other-features");
  assert.ok(section, "other-features section must exist");

  const group = section.children.find((child) => "type" in child && child.id === "gamification");
  assert.ok(group && "items" in group, "gamification group must exist");

  const item = group.items.find((entry) => entry.id === "gamification-admin");
  assert.ok(item, "gamification-admin item must be in the gamification group");
  assert.equal(item.href, "/dashboard/gamification/admin");
  assert.equal(item.i18nKey, "gamificationAdmin");
  assert.equal(item.subtitleKey, "gamificationAdminSubtitle");
  assert.equal(typeof item.icon, "string");
  assert.ok(item.icon.length > 0, "sidebar item needs a Material Symbols icon");

  assert.equal(group.items[group.items.length - 1]?.id, "gamification-admin");
  assert.equal(
    getSectionItems(section).some((entry) => entry.id === "gamification-admin"),
    true
  );
  assert.equal(HIDEABLE_SIDEBAR_ITEM_IDS.includes("gamification-admin"), true);
  assert.match(SIDEBAR_ICON_ACCENTS["gamification-admin"] ?? "", /^#[0-9A-Fa-f]{6}$/);
});

test("every translation key the anomalies page uses resolves in en.json common", () => {
  const source = readFileSync(path.join(repoRoot, PAGE_PATH), "utf8");
  assert.match(source, /useTranslations\("common"\)/);

  const usedKeys = [...source.matchAll(/\bt\("([^"]+)"\)/g)].map((m) => m[1]);
  assert.ok(usedKeys.length >= 10, `expected the page to translate its copy, got ${usedKeys}`);
  for (const key of ["loading", "status", "suspicious", "noAnomaliesDetected"]) {
    assert.ok(usedKeys.includes(key), `page must call t("${key}")`);
  }

  const en = readJson("src/i18n/messages/en.json");
  for (const key of usedKeys) {
    assert.equal(typeof getMessage(en, `common.${key}`), "string", `en.common.${key} must exist`);
  }
  for (const key of SIDEBAR_KEYS) {
    assert.equal(typeof getMessage(en, key), "string", `en.${key} must exist`);
  }
});

test("anomalies page has no hard-coded English copy left in JSX", () => {
  const source = readFileSync(path.join(repoRoot, PAGE_PATH), "utf8");
  assert.doesNotMatch(source, />\s*Loading\.\.\.\s*</);
  assert.doesNotMatch(source, />\s*Status\s*</);
  assert.doesNotMatch(source, />\s*Suspicious\s*</);
});

test("anomalies page loading and empty states are polite status regions", () => {
  const source = readFileSync(path.join(repoRoot, PAGE_PATH), "utf8");
  const statusRegions = source.match(/role="status" aria-live="polite"/g) ?? [];
  assert.equal(statusRegions.length, 2, "loading and empty states must both be live regions");
  assert.match(source, /role="status" aria-live="polite" aria-busy="true"/);
});

test("new anomalies and sidebar keys are propagated to every configured locale", () => {
  const config = readJson("config/i18n.json") as { locales: Array<{ code: string }> };
  const codes = ["en", ...config.locales.map((locale) => locale.code)];
  assert.ok(codes.length > 40, "expected the full locale roster");

  for (const code of codes) {
    const messages = readJson(`src/i18n/messages/${code}.json`);
    for (const key of NEW_KEYS) {
      const value = getMessage(messages, key);
      assert.equal(typeof value, "string", `${code}.${key} must exist`);
      assert.ok((value as string).trim().length > 0, `${code}.${key} must not be empty`);
    }
  }

  // Vietnamese is kept fully translated (see i18n-vi-completeness.test.ts).
  const vi = readJson("src/i18n/messages/vi.json");
  for (const key of NEW_KEYS) {
    assert.doesNotMatch(
      getMessage(vi, key) as string,
      /^__MISSING__:/,
      `vi.${key} must be translated`
    );
  }
});
