import test from "node:test";
import assert from "node:assert/strict";

import { APIKEY_PROVIDERS_GATEWAYS } from "../../src/shared/constants/providers/apikey/gateways.ts";
import { APIKEY_PROVIDERS } from "../../src/shared/constants/providers/apikey/index.ts";
import { NOAUTH_PROVIDERS } from "../../src/shared/constants/providers/noauth.ts";

test("dahl is registered in APIKEY_PROVIDERS_GATEWAYS with managedAccount", () => {
  const dahl = APIKEY_PROVIDERS_GATEWAYS.dahl;
  assert.ok(dahl, "dahl must exist in APIKEY_PROVIDERS_GATEWAYS");
  assert.equal(dahl.id, "dahl");
  assert.equal(dahl.name, "Dahl");
  assert.equal(dahl.icon, "dahl");
  assert.equal(dahl.website, "https://inference.dahl.global");
  assert.equal(dahl.hasFree, true);
  assert.equal(dahl.managedAccount, true);
});

test("dahl is accessible via the merged APIKEY_PROVIDERS barrel", () => {
  assert.ok(APIKEY_PROVIDERS.dahl, "dahl must exist in APIKEY_PROVIDERS");
  assert.equal(APIKEY_PROVIDERS.dahl.id, "dahl");
});

test("dahl is NOT in NOAUTH_PROVIDERS (uses real apiKey, not synthetic)", () => {
  assert.equal(NOAUTH_PROVIDERS.dahl, undefined, "dahl must not be noAuth");
});
