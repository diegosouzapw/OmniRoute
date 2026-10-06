import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.ts";
import { REGISTRY, getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";
import { getExecutor, hasSpecializedExecutor } from "../../open-sse/executors/index.ts";
import { getExtractionConfig } from "../../open-sse/services/tokenExtractionConfig.ts";
import { PROVIDER_MODELS_CONFIG } from "../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts";
import { getLobeProviderIcon } from "../../src/shared/components/lobeProviderIcons.ts";
import { AI_PROVIDERS } from "../../src/shared/constants/providers.ts";
import {
  assertRuntimeProviderAvailable,
  isRuntimeRetiredProviderId,
} from "../../src/shared/constants/providerRetirement.ts";
import { getWebSessionCredentialRequirement } from "../../src/shared/providers/webSessionCredentials.ts";

test("Qwen Web provenance-hold integration is absent from runtime dispatch", () => {
  assert.equal(REGISTRY["qwen-web"], undefined);
  assert.equal(getRegistryEntry("qwen-web"), null);
  assert.equal(getRegistryEntry("qw"), null);
  assert.equal(AI_PROVIDERS["qwen-web"], undefined);
  assert.equal(hasSpecializedExecutor("qwen-web"), false);
  assert.equal(hasSpecializedExecutor("qw"), false);
});

test("retired Qwen Web ids fail closed instead of falling through to OpenAI", async () => {
  for (const providerId of [
    "qwen-web",
    "qw",
    " QwEn-WeB ",
    "\tQW\n",
    "\u00a0QWEN-WEB\uFEFF",
    "\u2003qw\u2029",
  ]) {
    await assert.rejects(
      () => getExecutor(providerId),
      (error: unknown) => {
        const typed = error as Error & { status?: number };
        assert.equal(typed.status, 410);
        assert.match(typed.message, /retired/i);
        return true;
      },
      `${providerId} must never receive DefaultExecutor fallback`
    );
  }

  const rawMixedCaseId = "\tQwEn-WeB\n";
  assert.throws(
    () => assertRuntimeProviderAvailable(rawMixedCaseId),
    (error: unknown) => {
      const typed = error as Error & { status?: number };
      assert.equal(typed.status, 410);
      assert.equal(typed.message.includes(rawMixedCaseId.trim()), false);
      return true;
    }
  );
});

test("Qwen Web admission surfaces are absent from the shipped runtime", () => {
  const qwenWebModels = FREE_MODEL_BUDGETS.filter(({ provider }) => provider === "qwen-web");

  assert.deepEqual(qwenWebModels, []);
  assert.equal(PROVIDER_MODELS_CONFIG["qwen-web"], undefined);
  assert.equal(getExtractionConfig("qwen-web"), undefined);
  assert.equal(getWebSessionCredentialRequirement("qwen-web"), null);
  assert.equal(getLobeProviderIcon("qwen-web"), null);
});

test("official and local Qwen identities remain outside the retirement tombstone", () => {
  for (const providerId of [
    "qwen",
    "qwc",
    "qct",
    "qwen-cloud",
    "qwen-cloud-token-plan",
    "qwen-web-other",
  ]) {
    assert.equal(isRuntimeRetiredProviderId(providerId), false, providerId);
    assert.doesNotThrow(() => assertRuntimeProviderAvailable(providerId), providerId);
  }

  assert.ok(REGISTRY["qwen-cloud"]);
  assert.ok(REGISTRY["qwen-cloud-token-plan"]);
});

test("Qwen Web implementation files are absent from the shipped tree", () => {
  const removedPaths = [
    "open-sse/config/providers/registry/qwen/web/index.ts",
    "open-sse/executors/qwen-web.ts",
  ];

  for (const relativePath of removedPaths) {
    assert.equal(
      fs.existsSync(path.join(process.cwd(), relativePath)),
      false,
      `${relativePath} must not ship`
    );
  }
});
