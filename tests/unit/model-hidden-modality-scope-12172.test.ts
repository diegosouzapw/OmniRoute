/**
 * Regression test for #12172 — a model ID collision between the Chat registry and a
 * specialty modality registry (Image) prevented independent visibility toggling,
 * because `modelCompatOverrides` was keyed only by (providerId, modelId) with no
 * modality/endpoint field: hiding the chat model also hid the identically-ID'd
 * image model, and vice versa.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-12172-modality-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "modality-collision-test-secret";

const { setModelIsHidden, getModelIsHidden, getHiddenModelsByProvider } = await import(
  "../../src/lib/db/models.ts"
);
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { codexProvider } = await import(
  "../../open-sse/config/providers/registry/codex/index.ts"
);
const { IMAGE_PROVIDERS } = await import("../../open-sse/config/imageRegistry.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#12172: codex chat and image registries collide on the same model id (premise)", () => {
  const chatModel = codexProvider.models.find((m) => m.id === "gpt-5.6-sol");
  const imageModel = IMAGE_PROVIDERS.codex.models.find((m) => m.id === "gpt-5.6-sol");
  assert.ok(chatModel, "codex chat registry must define gpt-5.6-sol (premise check)");
  assert.ok(imageModel, "codex image registry must define gpt-5.6-sol (premise check)");
});

test("#12172: hiding the codex CHAT model gpt-5.6-sol must not suppress the codex IMAGE model", () => {
  setModelIsHidden("codex", "gpt-5.6-sol", true, "chat");

  const chatHidden = getHiddenModelsByProvider("chat").get("codex");
  const imageHidden = getHiddenModelsByProvider("images").get("codex");

  assert.equal(chatHidden?.has("gpt-5.6-sol"), true, "chat model must be hidden after the toggle");
  assert.equal(
    imageHidden?.has("gpt-5.6-sol") ?? false,
    false,
    "BUG #12172: hiding the chat model must not also hide the identically-ID'd image model"
  );

  assert.equal(getModelIsHidden("codex", "gpt-5.6-sol", "chat"), true);
  assert.equal(getModelIsHidden("codex", "gpt-5.6-sol", "images"), false);
});

test("#12172: unhiding one modality does not affect the other", () => {
  setModelIsHidden("codex", "gpt-5.6-terra", true, "chat");
  setModelIsHidden("codex", "gpt-5.6-terra", true, "images");
  assert.equal(getModelIsHidden("codex", "gpt-5.6-terra", "chat"), true);
  assert.equal(getModelIsHidden("codex", "gpt-5.6-terra", "images"), true);

  setModelIsHidden("codex", "gpt-5.6-terra", false, "chat");
  assert.equal(
    getModelIsHidden("codex", "gpt-5.6-terra", "chat"),
    false,
    "chat toggle must not be affected by the images toggle"
  );
  assert.equal(
    getModelIsHidden("codex", "gpt-5.6-terra", "images"),
    true,
    "images toggle must remain hidden after unhiding chat only"
  );
});

test("#12172: a legacy (no-modality) hide keeps suppressing every modality — backward compatible", () => {
  setModelIsHidden("codex", "gpt-5.6-luna", true);

  assert.equal(getModelIsHidden("codex", "gpt-5.6-luna", "chat"), true);
  assert.equal(getModelIsHidden("codex", "gpt-5.6-luna", "images"), true);
  assert.equal(getHiddenModelsByProvider("chat").get("codex")?.has("gpt-5.6-luna"), true);
  assert.equal(getHiddenModelsByProvider("images").get("codex")?.has("gpt-5.6-luna"), true);
});
