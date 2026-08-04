/**
 * #6269 — venice-web (a web-cookie provider) shipped an executor but no registry
 * `models` and no static-catalog entry, so its model import fell through to the
 * route's tail 400 ("Provider venice-web does not support models listing"). Adding
 * a `venice-web` entry to STATIC_MODEL_PROVIDERS gives the models route a local
 * catalog to serve (same class as the #5569 jules/linkup-search fix).
 *
 * Kept as a standalone unit against the pure `getStaticModelsForProvider` resolver
 * rather than extending the frozen `provider-models-route.test.ts` god-file.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { getStaticModelsForProvider } from "../../src/lib/providers/staticModels.ts";

test("#6269 venice-web resolves a non-empty static local catalog", () => {
  const models = getStaticModelsForProvider("venice-web");
  assert.ok(models && models.length > 0, "venice-web should expose a static catalog");
  const ids = models.map((m) => m.id);
  assert.ok(
    ids.includes("venice-uncensored"),
    `expected venice-uncensored in [${ids.join(", ")}]`
  );
});
