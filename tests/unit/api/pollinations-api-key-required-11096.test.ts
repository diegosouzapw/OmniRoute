import test from "node:test";
import assert from "node:assert/strict";
import { providerAllowsOptionalApiKey } from "../../../src/shared/constants/providers.js";

test("pollinations provider requires an API key and does not allow optional API key", () => {
  assert.equal(
    providerAllowsOptionalApiKey("pollinations"),
    false,
    "pollinations must require an API key because anonymous completions are no longer supported"
  );
});
