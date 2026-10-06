import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

import {
  RadarOfferSchema,
  RadarOffersFeedSchema,
  filterActiveRadarOffers,
  localizeRadarOfferText,
} from "../../src/lib/radar/offersFeedSchema.ts";

const EXPECTED_FIXTURE_HASH = "f01a4c03a72adbffa944b4bcc8610ad2fec31dc500feaed18bdd9d1af4f06216";

async function canonicalFixture(): Promise<Buffer> {
  return readFile(new URL("../fixtures/radar-offers-canonical.json", import.meta.url));
}

test("offers contract fixture is byte-identical to the private server contract", async () => {
  const bytes = await canonicalFixture();
  assert.equal(createHash("sha256").update(bytes).digest("hex"), EXPECTED_FIXTURE_HASH);

  const feed = RadarOffersFeedSchema.parse(JSON.parse(bytes.toString("utf8")));
  assert.equal(feed.count, 2);
  assert.deepEqual(
    feed.offers.map(({ id, partner }) => ({ id, partner })),
    [
      { id: "example-official-trial", partner: false },
      { id: "example-partner-credit", partner: true },
    ]
  );
});

test("partner offer must be strictly better than a comparable public benefit", async () => {
  const bytes = await canonicalFixture();
  const partner = RadarOffersFeedSchema.parse(JSON.parse(bytes.toString("utf8"))).offers[1]!;

  assert.equal(
    RadarOfferSchema.safeParse({
      ...partner,
      benefit: { kind: "credit", amountMinor: 500, currency: "USD" },
    }).success,
    false
  );
  assert.equal(
    RadarOfferSchema.safeParse({
      ...partner,
      publicBenefit: { kind: "trial_days", days: 30 },
    }).success,
    false
  );
});

test("active projection filters expired offers and localizes with English fallback", async () => {
  const bytes = await canonicalFixture();
  const feed = RadarOffersFeedSchema.parse(JSON.parse(bytes.toString("utf8")));
  const expired = {
    ...feed.offers[0]!,
    id: "expired",
    validUntil: "2026-08-01T00:00:00.000Z",
  };

  assert.deepEqual(
    filterActiveRadarOffers([...feed.offers, expired], new Date("2026-08-09T12:00:00.000Z")).map(
      ({ id }) => id
    ),
    ["example-official-trial", "example-partner-credit"]
  );
  assert.equal(localizeRadarOfferText({ en: "English", pt: "Português" }, "pt-BR"), "Português");
  assert.equal(localizeRadarOfferText({ en: "English" }, "de"), "English");
});
