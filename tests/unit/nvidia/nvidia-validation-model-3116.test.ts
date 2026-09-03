/**
 * #3116 — NVIDIA key validation probed the first catalog model (`z-ai/glm-5.1`), which
 * requires the "Public API Endpoints" account permission and can hang/be DEGRADED,
 * making a *valid* key fail with a misleading "Upstream Error". The probe now defaults to
 * a lightweight model from the current hosted catalog, with a per-connection override.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  NVIDIA_DEFAULT_VALIDATION_MODEL,
  resolveNvidiaValidationModel,
} from "../../../src/lib/providers/nvidiaValidationModel.ts";

test("defaults to a lightweight model in the current NVIDIA catalog", () => {
  assert.equal(NVIDIA_DEFAULT_VALIDATION_MODEL, "nvidia/nemotron-3.5-lightning-30b-a3b");
  assert.equal(resolveNvidiaValidationModel(), "nvidia/nemotron-3.5-lightning-30b-a3b");
  assert.equal(resolveNvidiaValidationModel({}), "nvidia/nemotron-3.5-lightning-30b-a3b");
  assert.notEqual(resolveNvidiaValidationModel(undefined), "z-ai/glm-5.1");
});

test("honors a per-connection validationModelId override", () => {
  assert.equal(
    resolveNvidiaValidationModel({ validationModelId: "nvidia/llama-3.3-nemotron-super-49b" }),
    "nvidia/llama-3.3-nemotron-super-49b"
  );
  // blank/whitespace override falls back to the default
  assert.equal(
    resolveNvidiaValidationModel({ validationModelId: "  " }),
    NVIDIA_DEFAULT_VALIDATION_MODEL
  );
});
