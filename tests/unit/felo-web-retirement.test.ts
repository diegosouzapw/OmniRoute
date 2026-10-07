import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.ts";
import { REGISTRY, getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";
import { getExecutor, hasSpecializedExecutor } from "../../open-sse/executors/index.ts";
import { AI_PROVIDERS } from "../../src/shared/constants/providers.ts";

test("Felo Web provenance-hold integration is absent from runtime dispatch", () => {
  assert.equal(REGISTRY["felo-web"], undefined);
  assert.equal(getRegistryEntry("felo-web"), null);
  assert.equal(getRegistryEntry("felo"), null);
  assert.equal(AI_PROVIDERS["felo-web"], undefined);
  assert.equal(hasSpecializedExecutor("felo-web"), false);
  assert.equal(hasSpecializedExecutor("felo"), false);
});

test("retired Felo ids fail closed instead of falling through to OpenAI", async () => {
  for (const providerId of ["felo-web", "felo", " FeLo-Web ", "\tFELO\n"]) {
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
});

test("Felo Web models are absent from the executable free-model catalog", () => {
  const feloModels = FREE_MODEL_BUDGETS.filter(
    ({ provider, modelId }) => provider === "felo-web" || modelId.startsWith("felo-")
  );

  assert.deepEqual(feloModels, []);
});

test("Felo Web implementation files are absent from the shipped tree", () => {
  const removedPaths = [
    "open-sse/config/providers/registry/felo-web/index.ts",
    "open-sse/executors/felo-web.ts",
  ];

  for (const relativePath of removedPaths) {
    assert.equal(
      fs.existsSync(path.join(process.cwd(), relativePath)),
      false,
      `${relativePath} must not ship`
    );
  }
});
