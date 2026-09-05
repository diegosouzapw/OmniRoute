import test from "node:test";
import assert from "node:assert/strict";

process.env.API_KEY_SECRET = "test-secret-key-for-unit-tests-123456789";

import * as apiKeys from "../../../src/lib/db/apiKeys";
import * as apiKeyGroups from "../../../src/lib/db/apiKeyGroups";

test("isModelAllowedForKey respects provider parameter in checkKeyModelAccess", async () => {
  const createdKey = await apiKeys.createApiKey(
    "Group Provider Key",
    "test-machine-group-provider"
  );
  assert.ok(createdKey);

  const group = apiKeyGroups.createKeyGroup("Provider Test Group", "Testing provider param");
  assert.ok(group);

  apiKeyGroups.addKeyToGroup(createdKey.id, group.id);

  apiKeyGroups.addGroupPermission(group.id, "gpt-4*", "deny", "openai");
  apiKeyGroups.addGroupPermission(group.id, "*", "allow");

  const res1 = apiKeyGroups.checkKeyModelAccess(createdKey.id, "gpt-4", "openai");
  console.log("checkKeyModelAccess openai/gpt-4:", res1);

  const res2 = apiKeyGroups.checkKeyModelAccess(createdKey.id, "gpt-4", "anthropic");
  console.log("checkKeyModelAccess anthropic/gpt-4:", res2);

  // Model with provider "openai" matching pattern "gpt-4*" should be denied
  const allowedOpenAIDenied = await apiKeys.isModelAllowedForKey(createdKey.key, "openai/gpt-4");
  assert.equal(
    allowedOpenAIDenied,
    false,
    "openai/gpt-4 should be denied by provider-specific rule"
  );

  // Model with provider "anthropic" matching pattern "gpt-4*" should NOT trigger the openai-specific deny rule
  const allowedAnthropicAllowed = await apiKeys.isModelAllowedForKey(
    createdKey.key,
    "anthropic/gpt-4"
  );
  assert.equal(allowedAnthropicAllowed, true, "anthropic/gpt-4 should be allowed");
});
