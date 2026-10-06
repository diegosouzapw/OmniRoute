import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const pagePath = path.resolve(process.cwd(), "src/app/(dashboard)/dashboard/radar/intel/page.tsx");
const radarPagePath = path.resolve(process.cwd(), "src/app/(dashboard)/dashboard/radar/page.tsx");

test("Radar links to a dedicated local-only Intel page", () => {
  assert.ok(fs.existsSync(pagePath));
  assert.match(fs.readFileSync(radarPagePath, "utf8"), /href="\/dashboard\/radar\/intel"/);
  const source = fs.readFileSync(pagePath, "utf8");
  assert.match(source, /fetch\("\/api\/radar\/intel"\)/);
  assert.match(source, /fetch\("\/api\/radar\/intel\/sync",\s*\{\s*method:\s*"POST"/);
  assert.doesNotMatch(source, /RADAR_FEED_URL|radar\.omniroute\.online|omr_|getDbInstance/);
});

test("Intel page exposes methodology, ranking, freshness, trend, and verified supporter badge only", () => {
  const source = fs.readFileSync(pagePath, "utf8");
  for (const marker of [
    "methodology",
    "rankings",
    "freshness",
    "trend",
    "supporterVerified",
    "radar-supporter",
  ]) {
    assert.match(source, new RegExp(marker));
  }
  assert.doesNotMatch(source, /\bhealth\b|\buptime\b|\blatency\b|\btelemetry\b/i);
});

test("Intel UI strings exist in English and Brazilian Portuguese", () => {
  for (const locale of ["en", "pt-BR"]) {
    const messages = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), `src/i18n/messages/${locale}.json`), "utf8")
    ) as { radarIntelPage?: Record<string, unknown>; radarPage?: Record<string, unknown> };
    for (const key of [
      "title",
      "subtitle",
      "methodology",
      "supporterBadge",
      "ranking",
      "freshness",
      "trend",
      "empty",
      "loadFailed",
    ]) {
      assert.equal(typeof messages.radarIntelPage?.[key], "string", `${locale}: ${key}`);
    }
    assert.equal(typeof messages.radarPage?.intel, "string", `${locale}: radarPage.intel`);
  }
});
