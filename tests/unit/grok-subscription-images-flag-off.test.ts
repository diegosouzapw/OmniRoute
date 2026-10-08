import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR ??= mkdtempSync(join(tmpdir(), "omniroute-grok-images-off-"));
delete process.env.GROK_SUBSCRIPTION_IMAGES_ENABLED;

const { buildXaiImageRequest } =
  await import("../../open-sse/handlers/imageGeneration/providers/xaiImage.ts");
const { getAllImageModels, getImageProvider, parseImageModel } =
  await import("../../open-sse/config/imageRegistry.ts");
const { FEATURE_FLAG_DEFINITIONS } =
  await import("../../src/shared/constants/featureFlagDefinitions.ts");

const model = "grok-imagine-image-2.0";

test("GROK_SUBSCRIPTION_IMAGES_ENABLED defaults to false and does not flip PII defaults", () => {
  const flag = FEATURE_FLAG_DEFINITIONS.find(
    (entry) => entry.key === "GROK_SUBSCRIPTION_IMAGES_ENABLED"
  );
  assert.ok(flag);
  assert.equal(flag.defaultValue, "false");
  assert.equal(flag.type, "boolean");
  for (const key of ["PII_REDACTION_ENABLED", "PII_RESPONSE_SANITIZATION"]) {
    assert.equal(
      FEATURE_FLAG_DEFINITIONS.find((entry) => entry.key === key)?.defaultValue,
      "false"
    );
  }
});

test("flag off hides xai-oauth/xao and does not map high/hd quality to medium", () => {
  assert.equal(getImageProvider("xai-oauth"), null);
  assert.equal(getImageProvider("xao"), null);
  assert.equal(getImageProvider("grok-cli"), null);
  assert.equal(getImageProvider("gc"), null);
  assert.notEqual(parseImageModel(`xao/${model}`).provider, "xai-oauth");
  assert.notEqual(parseImageModel(`gc/${model}`).provider, "grok-cli");
  assert.ok(
    !getAllImageModels().some(
      (entry) =>
        entry.id.startsWith("xai-oauth/") ||
        entry.id.startsWith("grok-cli/") ||
        entry.provider === "xai-oauth" ||
        entry.provider === "grok-cli"
    )
  );

  const xai = getImageProvider("xai");
  assert.equal(xai?.format, "openai");
  assert.equal(xai?.authType, "apikey");
  assert.deepEqual(
    xai?.models.map((entry) => entry.id),
    ["grok-imagine-image-quality", "grok-imagine-image"]
  );
  assert.deepEqual(xai?.supportedSizes, ["1024x1024", "2048x2048"]);

  for (const quality of ["high", "hd"]) {
    const result = buildXaiImageRequest(model, { prompt: "A chef preparing pho", quality });
    assert.equal(result.success, true);
    if (result.success) assert.equal(result.body.quality, quality);
  }
});
