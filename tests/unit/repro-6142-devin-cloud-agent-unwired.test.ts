// tests/unit/repro-6142-devin-cloud-agent-unwired.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";

import { validateProviderApiKey } from "../../src/lib/providers/validation";
import { getStaticModelsForProvider } from "../../src/lib/providers/staticModels";

test("#6142 (fixed): saving a Devin cloud-agent API key should not be 'unsupported' by the generic provider flow (parity with jules)", async () => {
  const result = await validateProviderApiKey({
    provider: "devin",
    apiKey: "cog_fake_service_user_token_for_repro",
  });
  assert.notEqual(
    result.error,
    "Provider validation not supported",
    "devin should have a specialty validator wired (like jules), not fall through to 'not supported'"
  );
  assert.notEqual(result.unsupported, true);
});

test("#6142 (fixed): the 'Available Models' UI should have a usable static catalog for devin (parity with jules)", () => {
  const devinStaticModels = getStaticModelsForProvider("devin");
  assert.ok(
    Array.isArray(devinStaticModels) && devinStaticModels.length > 0,
    "devin should expose a static model catalog like jules does"
  );
});
