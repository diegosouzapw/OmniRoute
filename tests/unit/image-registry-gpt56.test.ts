import test from "node:test";
import assert from "node:assert/strict";

import {
  getAllImageModels,
  IMAGE_PROVIDERS,
  parseImageModel,
} from "../../open-sse/config/imageRegistry.ts";
import { dedupeExactCatalogIds } from "../../src/app/api/v1/models/catalogDedupe.ts";

test("text-only ChatGPT Web and its retired alias stay absent from the image catalog", () => {
  assert.equal(IMAGE_PROVIDERS["chatgpt-web"], undefined);
  assert.deepEqual(parseImageModel("chatgpt-web/gpt-5-5-thinking"), {
    provider: null,
    model: "chatgpt-web/gpt-5-5-thinking",
  });
  assert.deepEqual(parseImageModel("cgpt-web/gpt-5.5"), {
    provider: null,
    model: "cgpt-web/gpt-5.5",
  });
  assert.deepEqual(parseImageModel("gpt-5.5"), {
    provider: null,
    model: "gpt-5.5",
  });
});

test("Codex image catalog separates hosted GPT-5.6/6.1 models from requested image engines", () => {
  assert.deepEqual(IMAGE_PROVIDERS.codex.models, [
    {
      id: "gpt-5.6-sol",
      catalogId: "gpt-5.6-sol-image",
      name: "GPT 5.6 Sol (Codex Image)",
    },
    {
      id: "gpt-5.6-terra",
      catalogId: "gpt-5.6-terra-image",
      name: "GPT 5.6 Terra (Codex Image)",
    },
    {
      id: "gpt-5.6-luna",
      catalogId: "gpt-5.6-luna-image",
      name: "GPT 5.6 Luna (Codex Image)",
    },
    {
      id: "gpt-6.1-sol",
      catalogId: "gpt-6.1-sol-image",
      name: "GPT 6.1 Sol (Codex Image)",
    },
    {
      id: "gpt-image-2",
      name: "GPT Image 2 (Codex requested engine)",
      inputModalities: ["text", "image"],
      description:
        "Dedicated Codex Images request; served engine, account access and actual dimensions remain unverified.",
    },
    {
      id: "gpt-image-2.5-sunburst",
      name: "GPT Image 2.5 Sunburst (Codex requested engine)",
      inputModalities: ["text", "image"],
      description:
        "Explicit Sunburst request through Codex Images; OAuth entitlement and served engine are unknown.",
    },
    {
      id: "gpt-image-2.5-flare",
      name: "GPT Image 2.5 Flare (Codex)",
      inputModalities: ["text", "image"],
    },
  ]);

  for (const model of ["gpt-5.6-sol", "gpt-5.6-terra", "gpt-5.6-luna", "gpt-6.1-sol"]) {
    assert.deepEqual(parseImageModel(`cx/${model}`), { provider: "codex", model });
    assert.deepEqual(parseImageModel(`cx/${model}-image`), { provider: "codex", model });
  }
});

test("Codex image listings do not shadow the hosted chat catalog ids", () => {
  const imageModels = getAllImageModels().filter((model) => model.provider === "codex");
  assert.deepEqual(
    imageModels.map((model) => model.id),
    [
      "codex/gpt-5.6-sol-image",
      "codex/gpt-5.6-terra-image",
      "codex/gpt-5.6-luna-image",
      "codex/gpt-6.1-sol-image",
      "codex/gpt-image-2",
      "codex/gpt-image-2.5-sunburst",
      "codex/gpt-image-2.5-flare",
    ]
  );

  const chat = {
    id: "codex/gpt-5.6-sol",
    context_length: 872000,
    output_modalities: ["text"],
  };
  const image = {
    id: imageModels[0].id,
    type: "image",
    output_modalities: ["image"],
  };
  const deduped = dedupeExactCatalogIds([chat, image]);

  assert.equal(deduped.length, 2);
  assert.ok("context_length" in deduped[0]);
  assert.equal(deduped[0].context_length, 872000);
});
