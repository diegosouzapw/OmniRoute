// Characterization of the validation.ts enterprise-cloud split (god-file decomposition): the 10 cloud
// validators (heroku/databricks/datarobot/snowflake/gigachat/azure-openai/azure-ai/watsonx/oci/sap)
// moved into validation/cloudProviders.ts, and the shared "POST /chat/completions auth probe"
// (validateDirectChatProvider) moved into validation/directChatProbe.ts so the host and the cloud
// module share it without a cycle. Behavior-preserving move — the locks here are module surface +
// the no-cycle wiring. Runtime behavior stays covered by provider-validation-azure-vertex/branches.
import { test } from "node:test";
import assert from "node:assert/strict";

const cloud = await import("../../src/lib/providers/validation/cloudProviders.ts");
const probe = await import("../../src/lib/providers/validation/directChatProbe.ts");
const HOST = await import("../../src/lib/providers/validation.ts");

test("cloudProviders exposes the ten enterprise-cloud validators", () => {
  for (const name of [
    "validateHerokuProvider",
    "validateDatabricksProvider",
    "validateDataRobotProvider",
    "validateSnowflakeProvider",
    "validateGigachatProvider",
    "validateAzureOpenAIProvider",
    "validateAzureAiProvider",
    "validateWatsonxProvider",
    "validateOciProvider",
    "validateSapProvider",
  ]) {
    assert.equal(typeof (cloud as Record<string, unknown>)[name], "function", `missing ${name}`);
  }
});

test("directChatProbe exposes the shared validateDirectChatProvider helper", () => {
  assert.equal(typeof probe.validateDirectChatProvider, "function");
});

test("host dispatcher surface stays intact after the move", () => {
  assert.equal(typeof (HOST as Record<string, unknown>).validateProviderApiKey, "function");
  assert.equal(typeof (HOST as Record<string, unknown>).validateCommandCodeProvider, "function");
});
