import test from "node:test";
import assert from "node:assert/strict";

import { IMAGE_PROVIDERS } from "../../open-sse/config/imageRegistry.ts";
import { VIDEO_PROVIDERS } from "../../open-sse/config/videoRegistry.ts";
import { toProviderModels } from "../../src/app/(dashboard)/dashboard/cache/media/mediaProviderModels.ts";

function assertAlphabetical(names: string[]) {
  const sorted = [...names].sort((left, right) =>
    left.localeCompare(right, "en", { sensitivity: "base", numeric: true })
  );
  assert.deepEqual(names, sorted);
}

test("media page sorts every provider dropdown alphabetically by display name", () => {
  const imageProviders = toProviderModels(IMAGE_PROVIDERS);
  const videoProviders = toProviderModels(VIDEO_PROVIDERS);

  assertAlphabetical(imageProviders.map((provider) => provider.name));
  assertAlphabetical(videoProviders.map((provider) => provider.name));
  assert.equal(
    imageProviders.some((provider) => provider.id === "alibaba"),
    true
  );
  assert.equal(
    imageProviders.some((provider) => provider.id === "qwen-cloud"),
    true
  );
  assert.equal(
    videoProviders.some((provider) => provider.id === "alibaba"),
    true
  );
  assert.equal(
    videoProviders.some((provider) => provider.id === "qwen-cloud"),
    true
  );
});

test("media page provider mapping preserves provider-scoped model IDs", () => {
  const groups = toProviderModels({
    example: {
      id: "example",
      models: [
        { id: "plain-model", name: "Plain Model" },
        { id: "example/scoped-model", name: "Scoped Model" },
      ],
    },
  });

  assert.deepEqual(groups[0], {
    id: "example",
    name: "example",
    models: [
      { id: "example/plain-model", name: "Plain Model" },
      { id: "example/scoped-model", name: "Scoped Model" },
    ],
  });
});
