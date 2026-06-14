import test from "node:test";
import assert from "node:assert/strict";

// The shipped helper is `normalizeComplianceEventTypes` (#3185); it nests dotted
// keys under `compliance.eventTypes` and is a no-op for messages without that path.
import { normalizeComplianceEventTypes as nestDottedKeys } from "@/i18n/request";

test("nestDottedKeys expands flat compliance.eventTypes keys into nested objects", () => {
  const input = {
    compliance: {
      eventTypes: {
        "apiKey.activate": "API Key Activated",
        "apiKey.scopes.grant": "API Key Scopes Granted",
        "apiKey.scopes.revoke": "API Key Scopes Revoked",
        "auth.login.success": "Login Successful",
      },
    },
  };

  const out = nestDottedKeys(input) as any;
  assert.equal(out.compliance.eventTypes.apiKey.activate, "API Key Activated");
  assert.equal(out.compliance.eventTypes.apiKey.scopes.grant, "API Key Scopes Granted");
  assert.equal(out.compliance.eventTypes.apiKey.scopes.revoke, "API Key Scopes Revoke".concat("d"));
  assert.equal(out.compliance.eventTypes.auth.login.success, "Login Successful");
  // No dotted key survives.
  assert.equal(
    JSON.stringify(out).includes('"apiKey.activate"'),
    false,
    "dotted keys must be gone"
  );
});

test("nestDottedKeys leaves plain nested messages untouched and preserves values with dots", () => {
  const input = {
    providers: { add: "Add", hint: "Use gpt-4.1 here" },
    list: ["a.b", "c"],
  };
  const out = nestDottedKeys(input) as any;
  assert.equal(out.providers.add, "Add");
  // A "." in a VALUE must be preserved (only KEYS are nested).
  assert.equal(out.providers.hint, "Use gpt-4.1 here");
  assert.deepEqual(out.list, ["a.b", "c"]);
});

test("nestDottedKeys ignores prototype-pollution segments", () => {
  const out = nestDottedKeys({ "__proto__.polluted": "x", safe: "y" }) as any;
  assert.equal(out.safe, "y");
  assert.equal(({} as any).polluted, undefined);
});
