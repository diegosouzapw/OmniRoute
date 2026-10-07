/**
 * Characterization lock first (RED on divergence): the shared opt-out flag
 * rule ("active unless false/0/no/off") as implemented by parseEnvBoolean.
 *
 * This test locks the semantics the two migration callsites must preserve:
 * every falsy form disables regardless of fallback, every truthy form
 * enables regardless of fallback, and unset/empty/unknown values defer to
 * the caller-provided fallback.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { parseEnvBoolean } from "../../src/shared/utils/envBoolean.ts";

const FALSY = ["false", "FALSE", " False ", "0", "no", "NO", " No ", "off", "OFF", " Off "];
const TRUTHY = ["true", "TRUE", " True ", "1", "yes", "YES", " Yes ", "on", "ON", " On "];
const FALLBACKS = [true, false];

test("characterization lock first (RED on divergence): falsy forms always disable", () => {
  for (const value of FALSY) {
    for (const fallback of FALLBACKS) {
      assert.equal(
        parseEnvBoolean(value, fallback),
        false,
        `value ${JSON.stringify(value)} with fallback ${fallback} must disable`
      );
    }
  }
});

test("characterization lock first (RED on divergence): truthy forms always enable", () => {
  for (const value of TRUTHY) {
    for (const fallback of FALLBACKS) {
      assert.equal(
        parseEnvBoolean(value, fallback),
        true,
        `value ${JSON.stringify(value)} with fallback ${fallback} must enable`
      );
    }
  }
});

test("characterization lock first (RED on divergence): unset/empty/unknown defer to fallback", () => {
  const deferred: Array<string | undefined | null> = [undefined, null, "", "   ", "maybe", "2"];
  for (const value of deferred) {
    for (const fallback of FALLBACKS) {
      assert.equal(
        parseEnvBoolean(value, fallback),
        fallback,
        `value ${JSON.stringify(value)} must defer to fallback ${fallback}`
      );
    }
  }
});

test("characterization lock first (RED on divergence): legacy guard bypass fires only on falsy", () => {
  const bypass = (raw: string | undefined): boolean => !parseEnvBoolean(raw, true);
  for (const value of FALSY) assert.equal(bypass(value), true, `${value} must bypass`);
  for (const value of [...TRUTHY, "", "   ", "maybe", "2"]) {
    assert.equal(bypass(value), false, `${JSON.stringify(value)} must not bypass`);
  }
  assert.equal(bypass(undefined), false, "unset must not bypass");
});
