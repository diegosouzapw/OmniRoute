/**
 * #10809 — `readCatalogModels` derives `supportsVision` from the unified
 * catalog shape so the Modality Bridge Vision picker can use `modelSource
 * "catalog"` (all configured providers + user-added custom models) while still
 * applying the strict `supportsVision === true` filter (#10703).
 *
 * The unified catalog serializes capability/modality metadata — `capabilities.
 * vision`, `input_modalities` — NOT a top-level `supportsVision` flag, so a
 * naive `model.supportsVision === true` filter would silently drop every
 * catalog model. This module pins the derivation:
 *
 *  1. explicit `capabilities.vision` (boolean) wins — registry/synced-backed
 *     entries, where the shared resolver has already neutralized text-only
 *     overrides like `cmd/gpt-5.3-codex` (#10703);
 *  2. input modalities declaring image/video;
 *  3. the conservative id heuristic ONLY for user-added `custom` models
 *     (no authoritative metadata exists — the operator chose that id);
 *     registry-backed entries without capability data are treated as unknown.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { readCatalogModels } from "../../src/shared/components/ModelSelectField.tsx";

function catalogShape(bucket: Record<string, unknown>): unknown {
  return { catalog: { provider: bucket } };
}

test("#10809: capabilities.vision=true entries are flagged vision-capable", () => {
  const models = readCatalogModels(
    catalogShape({
      models: [
        { id: "gpt-4o", capabilities: { vision: true } },
        { id: "gemini-2.5-flash", capabilities: { vision: true, reasoning: true } },
      ],
    })
  );
  assert.equal(models.length, 2);
  for (const model of models) {
    assert.equal(model.supportsVision, true, `${model.fullModel} must be vision`);
  }
});

test("#10809: capabilities.vision=false entries are NOT flagged vision-capable", () => {
  const models = readCatalogModels(
    catalogShape({
      models: [{ id: "gpt-5.3-codex", capabilities: { vision: false } }],
    })
  );
  assert.equal(models.length, 1);
  assert.equal(models[0].supportsVision, undefined, "vision:false must not be flagged");
});

test("#10809: input_modalities declaring image/video are flagged vision-capable", () => {
  const models = readCatalogModels(
    catalogShape({
      models: [
        {
          id: "claude-4.5-sonnet",
          input_modalities: ["text", "image"],
          output_modalities: ["text"],
        },
        { id: "qwen3-vl", input_modalities: ["image"] },
      ],
    })
  );
  assert.equal(models.length, 2);
  for (const model of models) {
    assert.equal(model.supportsVision, true, `${model.fullModel} modality-derived vision`);
  }
});

test("#10809: text-only input_modalities are NOT flagged vision-capable", () => {
  const models = readCatalogModels(
    catalogShape({
      models: [{ id: "deepseek-v4-pro", input_modalities: ["text"] }],
    })
  );
  assert.equal(models.length, 1);
  assert.equal(models[0].supportsVision, undefined, "text-only modalities must not be flagged");
});

test("registry-backed entries without capability/modality data stay unknown (not heuristic)", () => {
  // No `capabilities`/`input_modalities` and NOT `custom` — must NOT fall back
  // to the id heuristic (which would wrongly flag `gpt-5.3-codex` via `gpt-5`).
  const models = readCatalogModels(
    catalogShape({
      models: [{ id: "gpt-5.3-codex" }],
    })
  );
  assert.equal(models.length, 1);
  assert.equal(models[0].supportsVision, undefined, "bare registry id must stay unknown");
});

test("#10809: user-added custom models fall back to the conservative id heuristic", () => {
  const models = readCatalogModels(
    catalogShape({
      models: [
        { id: "ollama/llava:13b", custom: true },
        { id: "selfhost/qwen3-vl", custom: true },
        { id: "selfhost/plain-model", custom: true },
      ],
    })
  );
  const byId = Object.fromEntries(models.map((m) => [m.fullModel, m]));
  assert.equal(byId["provider/ollama/llava:13b"].supportsVision, true, "llava is vision");
  assert.equal(byId["provider/selfhost/qwen3-vl"].supportsVision, true, "qwen3-vl is vision");
  assert.equal(
    byId["provider/selfhost/plain-model"].supportsVision,
    undefined,
    "plain stays unknown"
  );
});

test("#10809: custom+vision true and custom text-only verbatim entries are respected", () => {
  const models = readCatalogModels(
    catalogShape({
      models: [
        { id: "vllm/my-vision-model", custom: true, capabilities: { vision: true } },
        { id: "vllm/my-text-model", custom: true, capabilities: { vision: false } },
      ],
    })
  );
  const byId = Object.fromEntries(models.map((m) => [m.fullModel, m]));
  assert.equal(byId["provider/vllm/my-vision-model"].supportsVision, true);
  assert.equal(byId["provider/vllm/my-text-model"].supportsVision, undefined);
});
