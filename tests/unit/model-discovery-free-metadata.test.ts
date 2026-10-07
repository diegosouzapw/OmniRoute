import assert from "node:assert/strict";
import { test } from "node:test";

import { normalizeSyncedAvailableModels } from "@/lib/db/models/synced";
import { normalizeDiscoveredModels } from "@/lib/providerModels/modelDiscovery";

test("normalizeDiscoveredModels records only free evidence present in discovery payloads", () => {
  const models = normalizeDiscoveredModels(
    [
      { id: "declared-free", isFree: true },
      { id: "zero-priced", pricing: { prompt: "0", completion: 0 } },
      { id: "rotating-model:free" },
      { id: "blank-price", pricing: { prompt: "", completion: "" } },
      { id: "paid", pricing: { prompt: "1", completion: "2" } },
    ],
    "example-provider"
  );
  const byId = new Map(models.map((model) => [model.id, model]));

  assert.equal(byId.get("declared-free")?.isFree, true);
  assert.equal(byId.get("zero-priced")?.isFree, true);
  assert.equal(byId.get("rotating-model:free")?.isFree, true);
  assert.equal(byId.get("blank-price")?.isFree, undefined);
  assert.equal(byId.get("paid")?.isFree, undefined);
});

test("normalizeDiscoveredModels reads Vercel AI Gateway input/output pricing and free tags", () => {
  // Shape of https://ai-gateway.vercel.sh/v1/models: `pricing.input` / `pricing.output`
  // (not OpenRouter's prompt/completion) plus an optional `tags` array.
  const models = normalizeDiscoveredModels(
    [
      { id: "stealth/pixel-canary", pricing: { input: "0", output: "0" } },
      { id: "poolside/laguna-s-2.1-free", pricing: { input: "0", output: "0" }, tags: ["free"] },
      { id: "vendor/tagged-no-price", tags: ["tool-use", "free"] },
      { id: "vendor/tagged-but-priced", pricing: { input: "0.1", output: "0.4" }, tags: ["free"] },
      { id: "vendor/half-free", pricing: { input: "0", output: "0.4" } },
      { id: "vendor/paid", pricing: { input: "0.1", output: "0.4" }, tags: ["reasoning"] },
    ],
    "vercel-ai-gateway"
  );
  const byId = new Map(models.map((model) => [model.id, model]));

  assert.equal(byId.get("stealth/pixel-canary")?.isFree, true);
  assert.equal(byId.get("poolside/laguna-s-2.1-free")?.isFree, true);
  assert.equal(byId.get("vendor/tagged-no-price")?.isFree, true);
  // A published non-zero price outranks a tag: never badge a model that bills.
  assert.equal(byId.get("vendor/tagged-but-priced")?.isFree, undefined);
  assert.equal(byId.get("vendor/half-free")?.isFree, undefined);
  assert.equal(byId.get("vendor/paid")?.isFree, undefined);
});

test("normalizeDiscoveredModels honors provider free:false vetoes and non-token billing", () => {
  // Real shapes: Kilo marks per-generation models isFree:false with 0/0 token prices,
  // LLM Gateway marks routers free:false, EUrouter bills per request.
  const models = normalizeDiscoveredModels(
    [
      {
        id: "google/lyria-3-pro-preview",
        isFree: false,
        pricing: { prompt: "0", completion: "0" },
      },
      { id: "auto", free: false, pricing: { prompt: "0", completion: "0", request: "0" } },
      { id: "deepseek-ocr-2", pricing: { prompt: "0", completion: "0", request: "0.02" } },
      { id: "agnes-3-0-flash", pricing: { free: true, input: null, output: null } },
    ],
    "generic-gateway"
  );
  const byId = new Map(models.map((model) => [model.id, model]));

  assert.equal(byId.get("google/lyria-3-pro-preview")?.isFree, undefined);
  assert.equal(byId.get("auto")?.isFree, undefined);
  assert.equal(byId.get("deepseek-ocr-2")?.isFree, undefined);
  assert.equal(byId.get("agnes-3-0-flash")?.isFree, true);
});

test("normalizeSyncedAvailableModels preserves discovery free metadata", () => {
  const [model] = normalizeSyncedAvailableModels([
    { id: "live-free", name: "Live Free", source: "imported", isFree: true },
  ]);

  assert.equal(model?.isFree, true);
});
