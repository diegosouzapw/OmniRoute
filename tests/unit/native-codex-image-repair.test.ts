import test from "node:test";
import assert from "node:assert/strict";

import {
  getAllImageModels,
  getImageModelEntry,
  getImageProvider,
  parseImageModel,
} from "../../open-sse/config/imageRegistry.ts";

test(
  "exact Codex image admission preserves hosted orchestration and requested engine identities",
  { timeout: 1000 },
  () => {
    for (const input of [
      "cx/gpt-6.1-sol",
      "codex/gpt-6.1-sol",
      "gpt-6.1-sol",
      "cx/gpt-6.1-sol-image",
      "codex/gpt-6.1-sol-image",
      "gpt-6.1-sol-image",
    ]) {
      const entry = getImageModelEntry(input);
      assert.ok(entry, `${input} must pass exact registry admission`);
      assert.deepEqual(parseImageModel(input), { provider: "codex", model: "gpt-6.1-sol" });
      assert.equal(entry.provider, "codex");
      assert.equal(entry.model, "gpt-6.1-sol");
    }
    for (const model of ["gpt-image-2", "gpt-image-2.5-sunburst", "gpt-image-2.5-flare"]) {
      for (const prefix of ["cx", "codex"]) {
        const input = `${prefix}/${model}`;
        const entry = getImageModelEntry(input);
        assert.ok(entry, `${input} must pass exact registry admission`);
        assert.deepEqual(parseImageModel(input), { provider: "codex", model });
        assert.equal(entry.provider, "codex");
        assert.equal(entry.model, model);
        assert.deepEqual(entry.inputModalities, ["text", "image"]);
      }
    }
  }
);

test("Codex admission rejects lookalikes and unknown image engines", { timeout: 1000 }, () => {
  for (const model of [
    "gpt-6.1",
    "gpt-6.1-sol-high",
    "gpt-6.1-sol-image-extra",
    "gpt-6.1-terra",
    "gpt-6.1-luna",
    "gpt-image2",
    "gpt-image-2.5",
    "gpt-image-2.5-sunburst-extra",
    "GPT-6.1-SOL",
  ]) {
    const input = `cx/${model}`;
    // Prefix parsing is intentionally permissive; edit admission requires membership.
    assert.deepEqual(parseImageModel(input), { provider: "codex", model });
    assert.equal(getImageModelEntry(input), null);
  }
  for (const input of [
    "cx/../gpt-6.1-sol",
    "cx/gpt-6.1-sol?engine=sunburst",
    "cx/gpt-6.1-sol#image",
    "codex/gpt-6.1-sol%2fextra",
  ]) {
    assert.deepEqual(parseImageModel(input), { provider: null, model: null });
    assert.equal(getImageModelEntry(input), null);
  }
  assert.equal(getImageModelEntry("openai/gpt-6.1-sol"), null);
});

test(
  "Codex catalog separates hosted chat identities from dedicated image engines",
  { timeout: 1000 },
  () => {
    const catalog = getAllImageModels().filter((entry) => entry.provider === "codex");
    assert.deepEqual(
      catalog.map((entry) => entry.id),
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
    const provider = getImageProvider("cx");
    assert.equal(provider.id, "codex");
    assert.equal(provider.format, "codex-responses");
    assert.equal(provider.baseUrl, "https://chatgpt.com/backend-api/codex/responses");
    assert.equal(provider.authType, "oauth");
    assert.deepEqual(provider.supportedSizes, ["1024x1024", "1024x1536", "1536x1024"]);
  }
);
