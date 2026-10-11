import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-kie-contract-14335-"));
process.env.DATA_DIR = dataDir;
process.env.OMNIROUTE_PLUGINS_DIR = path.join(dataDir, "plugins");
assert.equal(process.env.DATA_DIR, dataDir);

const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");
const { KIE_IMAGE_MODELS } =
  await import("../../open-sse/config/providers/registry/kie/imageModels.ts");
const { IMAGE_PROVIDERS } = await import("../../open-sse/config/imageRegistryData.ts");
const originalFetch = globalThis.fetch;
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

async function captureGeneration(model: string) {
  let created: { url: string; payload: Record<string, unknown> } | undefined;
  let polled = "";
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    if (init?.method === "POST") {
      created = { url, payload: JSON.parse(String(init.body)) };
      return Response.json({ code: 200, data: { taskId: "fixture-task" } });
    }
    polled = url;
    return Response.json({
      code: 200,
      data: { state: "success", response: { resultImageUrl: "https://example.com/fixture.png" } },
    });
  };
  const result = await handleImageGeneration({
    body: { model: `kie/${model}`, prompt: "a paper boat", size: "1024x1024", n: 1 },
    credentials: { apiKey: "fixture-not-a-real-key" },
    log: null,
  });
  assert.equal(result.success, true);
  assert.ok(created);
  return { created, polled };
}

test("Flux Kontext Pro and Max are explicit dedicated-API catalog entries", () => {
  const models = KIE_IMAGE_MODELS as Array<{
    id: string;
    name: string;
    isMarket?: boolean;
    kieFluxKontextModel?: string;
  }>;
  assert.equal(models.find((entry) => entry.id === "flux/kontext")?.isMarket, false);
  assert.equal(
    models.find((entry) => entry.id === "flux/kontext")?.kieFluxKontextModel,
    "flux-kontext-pro"
  );
  assert.equal(
    models.find((entry) => entry.id === "flux/kontext-max")?.kieFluxKontextModel,
    "flux-kontext-max"
  );
});

for (const [id, upstream] of [
  ["flux/kontext", "flux-kontext-pro"],
  ["flux/kontext-max", "flux-kontext-max"],
]) {
  test(`${id} uses the documented dedicated endpoint and its declared tier`, async () => {
    const { created, polled } = await captureGeneration(id);
    assert.equal(created.url, "https://api.kie.ai/api/v1/flux/kontext/generate");
    assert.equal(created.payload.model, upstream);
    assert.equal(created.payload.aspectRatio, "1:1");
    assert.equal(created.payload.prompt, "a paper boat");
    assert.equal(new URL(polled).pathname, "/api/v1/flux/kontext/record-info");
  });
}

for (const id of ["z-image", "z-image/4.0-text-to-image", "z-image/4.5-text-to-image"]) {
  test(`${id} sends the documented z-image Market ID`, async () => {
    assert.ok(KIE_IMAGE_MODELS.some((entry) => entry.id === id));
    const { created, polled } = await captureGeneration(id);
    assert.equal(created.url, "https://api.kie.ai/api/v1/jobs/createTask");
    assert.equal(created.payload.model, "z-image");
    assert.deepEqual(created.payload.input, { prompt: "a paper boat", aspect_ratio: "1:1" });
    assert.equal(new URL(polled).pathname, "/api/v1/jobs/recordInfo");
  });
}

test("legacy Z-Image aliases are not advertised as undocumented upstream versions", () => {
  for (const entry of KIE_IMAGE_MODELS.filter((model) => model.id.startsWith("z-image/"))) {
    assert.match(entry.name, /alias/i);
    assert.doesNotMatch(entry.name, /v4\.[05]/i);
  }
});

test("every registered image format has an explicit dispatch branch or intentional OpenAI adapter", () => {
  const source = fs.readFileSync(
    new URL("../../open-sse/handlers/imageGeneration.ts", import.meta.url),
    "utf8"
  );
  const dispatch = source.slice(
    source.indexOf("export async function handleImageGeneration"),
    source.indexOf("function normalizeKieImageResult")
  );
  const explicit = new Set(
    [...dispatch.matchAll(/providerConfig\.format === "([^"]+)"/g)].map((match) => match[1])
  );
  // xAI and the non-tool Agnes path intentionally reuse the OpenAI handler,
  // which has their payload adaptations. A new format cannot silently join it.
  const openAiAdapters = new Set(["openai", "xai-image", "agnes-image"]);
  for (const provider of Object.values(IMAGE_PROVIDERS)) {
    assert.ok(
      explicit.has(provider.format) || openAiAdapters.has(provider.format),
      `${provider.id}: unclassified image dispatch format ${provider.format}`
    );
  }
  assert.match(dispatch, /return handleOpenAIImageGeneration\(/);
});
