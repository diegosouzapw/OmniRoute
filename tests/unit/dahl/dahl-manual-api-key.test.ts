import test from "node:test";
import assert from "node:assert/strict";

import { APIKEY_PROVIDERS_GATEWAYS } from "../../../src/shared/constants/providers/apikey/gateways.ts";

test("dahl freeNote mentions manual API key option", () => {
  const dahl = APIKEY_PROVIDERS_GATEWAYS.dahl;
  assert.ok(dahl.freeNote.includes("manual API key") || dahl.freeNote.includes("your own API key"), "dahl freeNote should mention manual API key option");
});

test("dahl authHint mentions manual API key option", () => {
  const dahl = APIKEY_PROVIDERS_GATEWAYS.dahl;
  assert.ok(dahl.authHint.includes("manual API key") || dahl.authHint.includes("your own API key"), "dahl authHint should mention manual API key option");
});

test("dahl apiHint mentions manual API key option", () => {
  const dahl = APIKEY_PROVIDERS_GATEWAYS.dahl;
  assert.ok(dahl.apiHint.includes("manual API key") || dahl.apiHint.includes("your own API key") || dahl.apiHint.includes("paste"), "dahl apiHint should mention manual API key option");
});

test("dahl notice text mentions manual API key option", () => {
  const dahl = APIKEY_PROVIDERS_GATEWAYS.dahl;
  assert.ok(dahl.notice.text.includes("manual API key") || dahl.notice.text.includes("your own API key"), "dahl notice should mention manual API key option");
});
