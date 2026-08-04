import assert from "node:assert/strict";
import test from "node:test";

import { getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";

test("Maritalk exposes only the current non-Brazilian-Portuguese model variants", () => {
  const maritalk = getRegistryEntry("maritalk");

  assert.ok(maritalk);
  assert.deepEqual(
    maritalk.models.map((model) => model.id),
    ["sabia-4", "sabia-4-thinking", "sabiazinho-4"]
  );
  assert.ok(maritalk.models.every((model) => !model.id.endsWith("-br-sp")));
});
