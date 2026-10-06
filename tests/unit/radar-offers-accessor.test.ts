import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { getRadarOffers } from "../../src/lib/radar/index.ts";

async function fixturePayload(): Promise<string> {
  return readFile(new URL("../fixtures/radar-offers-canonical.json", import.meta.url), "utf8");
}

test("offers accessor short-circuits before cache when Radar is disabled", () => {
  let reads = 0;
  const result = getRadarOffers({
    getFlag: () => false,
    getCache: () => {
      reads += 1;
      throw new Error("cache must not be read");
    },
  });

  assert.deepEqual(result, { offers: [], meta: null });
  assert.equal(reads, 0);
});

test("offers accessor fails closed for missing, corrupt, or non-live cache", () => {
  for (const cache of [
    null,
    { version: "x", tier: "live", payload: "not-json", fetchedAt: "now" },
    { version: "x", tier: "community", payload: "{}", fetchedAt: "now" },
  ]) {
    assert.deepEqual(getRadarOffers({ getFlag: () => true, getCache: () => cache }), {
      offers: [],
      meta: null,
    });
  }
});

test("offers accessor revalidates the cache and removes expired entries", async () => {
  const payload = await fixturePayload();
  const result = getRadarOffers({
    getFlag: () => true,
    getCache: () => ({
      version: "2026.08.09.1",
      tier: "live",
      payload,
      fetchedAt: "2026-08-09T12:05:00.000Z",
    }),
    now: () => new Date("2100-01-01T00:00:00.000Z"),
  });

  assert.deepEqual(
    result.offers.map(({ id }) => id),
    ["example-partner-credit"]
  );
  assert.deepEqual(result.meta, {
    version: "2026.08.09.1",
    tier: "live",
    fetchedAt: "2026-08-09T12:05:00.000Z",
  });
});
