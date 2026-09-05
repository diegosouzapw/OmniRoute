/**
 * #10990 — v0-vercel-web (a web-cookie codegen provider) shipped a web-cookie
 * executor but no registry `models`, no discovery config, and no static-catalog
 * entry, so its "Import from /models" fell through to the models route's tail 400
 * ("Provider v0-vercel-web does not support models listing"). Adding a
 * `v0-vercel-web` entry to STATIC_MODEL_PROVIDERS gives the models route a local
 * catalog to serve (same class as the #6269 venice-web / #7820 amazon-q fix).
 *
 * Kept as a standalone unit against the pure `getStaticModelsForProvider` resolver
 * rather than extending the frozen `provider-models-route.test.ts` god-file.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { getStaticModelsForProvider } from "../../../src/lib/providers/staticModels.ts";

test("#10990 v0-vercel-web resolves a non-empty static local catalog", () => {
  const models = getStaticModelsForProvider("v0-vercel-web");
  assert.ok(models && models.length > 0, "v0-vercel-web should expose a static catalog");
  const ids = models.map((m) => m.id);
  assert.ok(
    ids.includes("v0-1.5-lg"),
    `expected v0-1.5-lg in [${ids.join(", ")}]`
  );
});