import test from "node:test";
import assert from "node:assert/strict";

// #11016: OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK must be observable.
// Set the kill-switch BEFORE importing the scheduler — the module auto-inits
// on first import.
process.env.OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK = "true";

test("initCredentialHealthCheck returns false when the disable env is set", async () => {
  const { initCredentialHealthCheck } = await import(
    "../../../src/lib/credentialHealth/scheduler.ts"
  );
  assert.equal(initCredentialHealthCheck(), false);
});
