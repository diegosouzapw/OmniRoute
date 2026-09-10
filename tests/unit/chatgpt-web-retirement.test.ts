import assert from "node:assert/strict";
import test from "node:test";

import { getRegistryEntry, REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import { getExecutor, hasSpecializedExecutor } from "../../open-sse/executors/index.ts";
import { AI_PROVIDERS } from "../../src/shared/constants/providers.ts";

test("clean-room ChatGPT Web is restored while the legacy alias remains retired", async () => {
  assert.ok(REGISTRY["chatgpt-web"]);
  assert.ok(AI_PROVIDERS["chatgpt-web"]);
  assert.ok(getRegistryEntry("chatgpt-web"));
  assert.equal(hasSpecializedExecutor("chatgpt-web"), true);
  assert.ok(await getExecutor("chatgpt-web"));

  assert.equal(getRegistryEntry("cgpt-web"), null);
  assert.equal(hasSpecializedExecutor("cgpt-web"), false);
  await assert.rejects(
    () => getExecutor("cgpt-web"),
    (error: unknown) => {
      const typed = error as Error & { code?: string; status?: number };
      assert.equal(typed.code, "PROVIDER_RETIRED");
      assert.equal(typed.status, 410);
      assert.equal(typed.message, "Provider is retired and unavailable.");
      return true;
    }
  );

  assert.ok(getRegistryEntry("chatgpt-web-codex"));
  assert.ok(getRegistryEntry("cgpt-codex"));
  assert.equal(hasSpecializedExecutor("chatgpt-web-codex"), true);
  assert.equal(hasSpecializedExecutor("cgpt-codex"), true);
});
