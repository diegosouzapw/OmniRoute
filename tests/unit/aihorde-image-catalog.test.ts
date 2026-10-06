import test from "node:test";
import assert from "node:assert/strict";

import {
  HordeImageCatalog,
  parseHordeImageModels,
  resetAiHordeImageCatalog,
  getCachedAiHordeImageCatalogEntries,
  aiHordeImageCatalog,
} from "../../open-sse/services/aihordeImageCatalog.ts";
import {
  parseImageModel,
  getImageProvider,
  getAllImageModels,
} from "../../open-sse/config/imageRegistry.ts";

const HORDE_MODELS = [
  {
    name: "FLUX.1-schnell",
    count: 6,
    queued: 2,
    eta: 12,
    performance: 18.5,
    type: "image",
  },
  {
    name: "AlbedoBase XL (SDXL)",
    count: 1,
    queued: 0,
    eta: 4,
    type: "image",
  },
  { name: "DeadModel", count: 0, type: "image" },
  { name: "koboldcpp/Gemma", count: 3, type: "text" },
];

test.afterEach(() => {
  resetAiHordeImageCatalog();
});

test("parseHordeImageModels drops zero-worker and text models", () => {
  const models = parseHordeImageModels(HORDE_MODELS);
  assert.deepEqual(
    models.map((model) => model.name),
    ["AlbedoBase XL (SDXL)", "FLUX.1-schnell"]
  );
  assert.equal(models[1].count, 6);
});

test("parseHordeImageModels rejects a non-array payload", () => {
  assert.throws(() => parseHordeImageModels({ name: "nope" }), /JSON array/);
});

test("refresh keeps the last good snapshot when Horde is down", async () => {
  let calls = 0;
  const catalog = new HordeImageCatalog({
    pollMs: 5_000,
    fetchImpl: async () => {
      calls += 1;
      if (calls === 1) {
        return new Response(JSON.stringify(HORDE_MODELS), { status: 200 });
      }
      return new Response(JSON.stringify({ message: "maintenance" }), { status: 503 });
    },
  });

  await catalog.refresh();
  assert.equal(catalog.isServed("FLUX.1-schnell"), true);
  assert.equal(catalog.snapshot.lastError, null);

  await catalog.refresh();
  assert.equal(catalog.isServed("FLUX.1-schnell"), true);
  assert.equal(catalog.stale, true);
  assert.ok(catalog.snapshot.lastError);
  assert.equal(
    catalog.listModels().some((model) => model.name === "DeadModel"),
    false
  );
});

test("live catalog entries use exact Horde names and the aihorde prefix", async () => {
  aiHordeImageCatalog.setFetch(
    async () => new Response(JSON.stringify(HORDE_MODELS), { status: 200 })
  );
  await aiHordeImageCatalog.refresh();
  const ids = getCachedAiHordeImageCatalogEntries().map((model) => model.id);
  assert.deepEqual(ids, ["aihorde/AlbedoBase XL (SDXL)", "aihorde/FLUX.1-schnell"]);
  const listed = getAllImageModels().map((model) => model.id);
  assert.ok(listed.includes("aihorde/FLUX.1-schnell"));
  assert.equal(listed.includes("aihorde/DeadModel"), false);
});

test("parseImageModel accepts aihorde/ and horde/ prefixes for live names", () => {
  assert.deepEqual(parseImageModel("aihorde/Flux.1-Schnell fp8 (Compact)"), {
    provider: "aihorde",
    model: "Flux.1-Schnell fp8 (Compact)",
  });
  assert.deepEqual(parseImageModel("horde/AlbedoBase XL (SDXL)"), {
    provider: "aihorde",
    model: "AlbedoBase XL (SDXL)",
  });
  assert.equal(getImageProvider("aihorde")?.format, "aihorde");
  assert.equal(getImageProvider("aihorde")?.alias, "horde");
});
