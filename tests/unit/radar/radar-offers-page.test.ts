import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const pagePath = path.resolve(process.cwd(), "src/app/(dashboard)/dashboard/radar/offers/page.tsx");
const radarPagePath = path.resolve(process.cwd(), "src/app/(dashboard)/dashboard/radar/page.tsx");

function pageSource(): string {
  return fs.existsSync(pagePath) ? fs.readFileSync(pagePath, "utf8") : "";
}

test("Radar links to a dedicated supporter offers page", () => {
  assert.ok(fs.existsSync(pagePath), "missing /dashboard/radar/offers page");
  assert.match(fs.readFileSync(radarPagePath, "utf8"), /href="\/dashboard\/radar\/offers"/);
});

test("offers page uses only local settings, sync, and cache routes", () => {
  const source = pageSource();
  assert.match(source, /fetch\("\/api\/radar\/settings"\)/);
  assert.match(source, /fetch\("\/api\/radar\/offers\/sync",\s*\{\s*method:\s*"POST"/);
  assert.match(source, /fetch\("\/api\/radar\/offers"\)/);
  assert.doesNotMatch(source, /RADAR_FEED_URL|radar\.omniroute\.online|localDb|getDbInstance/);
});

test("offers UI is live-key gated, filters expiry, localizes, and labels partnerships", () => {
  const source = pageSource();
  assert.match(source, /hasSupporterKey/);
  assert.match(source, /filterActiveRadarOffers/);
  assert.match(source, /localizeRadarOfferText/);
  assert.match(source, /offer\.partner/);
  assert.match(source, /t\("partnerBadge"\)/);
  assert.match(source, /target="_blank"/);
  assert.match(source, /rel="noopener noreferrer"/);
});

test("every locale carries the complete Radar offers namespace", () => {
  const requiredKeys = [
    "title",
    "subtitle",
    "backToRadar",
    "loading",
    "refresh",
    "refreshing",
    "loadFailed",
    "empty",
    "keyRequiredTitle",
    "keyRequiredDescription",
    "contributorButton",
    "supporterButton",
    "partnerBadge",
    "officialBadge",
    "conditionsLabel",
    "validUntil",
    "noExpiry",
    "openOffer",
    "trialDays",
  ];
  const messagesDir = path.resolve(process.cwd(), "src/i18n/messages");
  const files = fs.readdirSync(messagesDir).filter((file) => file.endsWith(".json"));

  for (const file of files) {
    const messages = JSON.parse(fs.readFileSync(path.join(messagesDir, file), "utf8")) as {
      radarOffersPage?: Record<string, unknown>;
    };
    for (const key of requiredKeys) {
      const value = messages.radarOffersPage?.[key];
      assert.equal(typeof value, "string", `${file}: missing radarOffersPage.${key}`);
      assert.ok((value as string).trim().length > 0, `${file}: empty radarOffersPage.${key}`);
    }
  }
});
