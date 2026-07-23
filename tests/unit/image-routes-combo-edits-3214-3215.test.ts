/**
 * #3214 / #3215 — image routes: combo/alias resolution + OpenAI-compatible edits.
 *
 * Before this change:
 *  - `/v1/images/generations` resolved built-in ids and `prefix/model` custom ids but NOT
 *    a bare combo/alias name (`model: "image"`) — it fell through to "Invalid image model".
 *  - `/v1/images/edits` resolved a base URL only for `/images/generations` and rejected any
 *    non-chatgpt-web provider, so custom OpenAI-compatible providers could not edit, and
 *    JSON/data-URL edit clients got "Invalid multipart body".
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolate the DB to a throwaway DATA_DIR *before* importing any module that pulls in
// src/lib/db/core (its DATA_DIR/SQLITE_FILE consts are resolved eagerly at import), so the
// combo fixture never touches the real ~/.omniroute database. Mirrors a2a-enabled-route.test.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-img-routes-3214-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { resolveImageBaseUrl } = await import("../../open-sse/handlers/imageGeneration.ts");
const {
  parseDataUrl,
  validateCodexImageEditReference,
  validateCodexImageEditReferences,
  extractImageEditInputFromJson,
  resolveSingleImageComboTarget,
  resolveImageRouteModel,
} = await import("../../src/lib/images/imageRouteModel.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { createCombo } = await import("../../src/lib/db/combos.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

test("resolveImageBaseUrl appends /images/edits for the edits endpoint", () => {
  const creds = { providerSpecificData: { baseUrl: "https://img.example.com/v1" } };
  assert.equal(
    resolveImageBaseUrl(creds, "https://fallback/x", "edits"),
    "https://img.example.com/v1/images/edits"
  );
  // generations stays the default and unchanged
  assert.equal(
    resolveImageBaseUrl(creds, "https://fallback/x"),
    "https://img.example.com/v1/images/generations"
  );
});

test("resolveImageBaseUrl rewrites a base URL that points at the other image endpoint", () => {
  const creds = {
    providerSpecificData: { baseUrl: "https://img.example.com/v1/images/generations" },
  };
  assert.equal(
    resolveImageBaseUrl(creds, "https://fallback/x", "edits"),
    "https://img.example.com/v1/images/edits"
  );
});

test("resolveImageBaseUrl falls back when no node base URL is configured", () => {
  assert.equal(
    resolveImageBaseUrl(null, "https://fallback/v1/images/edits", "edits"),
    "https://fallback/v1/images/edits"
  );
});

test("parseDataUrl decodes canonical base64 and rejects malformed payloads", () => {
  const png = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
  const parsed = parseDataUrl(`data:image/png;base64,${png.toString("base64")}`);
  assert.ok(parsed);
  assert.equal(parsed!.mime, "image/png");
  assert.deepEqual([...parsed!.bytes], [...png]);
  assert.equal(parseDataUrl("not-a-data-url"), null);
  assert.equal(parseDataUrl(`data:image/png;base64,`), null);
  assert.equal(parseDataUrl("data:image/png;base64,%%%="), null);
  assert.equal(parseDataUrl("data:image/png;base64,AQI"), null);
});

test("validateCodexImageEditReference enforces MIME, magic bytes, and decoded size", () => {
  const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1]);
  assert.equal(validateCodexImageEditReference({ bytes: png, mime: "image/png" }), null);
  assert.match(
    validateCodexImageEditReference({ bytes: png, mime: "image/jpeg" }) || "",
    /does not match/i
  );
  assert.match(
    validateCodexImageEditReference({ bytes: png, mime: "image/svg+xml" }) || "",
    /PNG, JPEG, or WebP/i
  );
  assert.match(
    validateCodexImageEditReference({ bytes: png, mime: "image/png" }, 8) || "",
    /exceeds/i
  );
});

test("validateCodexImageEditReferences bounds count and aggregate decoded bytes", () => {
  const png = {
    bytes: Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1]),
    mime: "image/png",
  };
  assert.equal(validateCodexImageEditReferences([png, png], 8, 32), null);
  assert.match(validateCodexImageEditReferences(Array(9).fill(png), 8, 1024) ?? "", /at most 8/i);
  assert.match(validateCodexImageEditReferences([png, png], 8, 16) ?? "", /total.*limit/i);
});

test("extractImageEditInputFromJson preserves all valid data-URL images and first-image compatibility", () => {
  const png = Buffer.from([1, 2, 3, 4]);
  const jpeg = Buffer.from([5, 6, 7, 8]);
  const out = extractImageEditInputFromJson({
    model: "image",
    prompt: "make it blue",
    size: "1024x1024",
    response_format: "b64_json",
    images: [
      { image_url: `data:image/webp;base64,${png.toString("base64")}` },
      `data:image/jpeg;base64,${jpeg.toString("base64")}`,
    ],
  });
  assert.equal(out.model, "image");
  assert.equal(out.prompt, "make it blue");
  assert.equal(out.size, "1024x1024");
  assert.equal(out.responseFormat, "b64_json");
  assert.equal(out.imageMime, "image/webp");
  assert.deepEqual([...(out.imageBytes ?? [])], [...png]);
  assert.equal(out.images.length, 2);
  assert.equal(out.imageInputCount, 2);
  assert.deepEqual(
    out.images.map((image) => image.mime),
    ["image/webp", "image/jpeg"]
  );
  assert.deepEqual([...out.images[1].bytes], [...jpeg]);

  // also accepts a top-level `image` data URL string
  const out2 = extractImageEditInputFromJson({
    prompt: "x",
    image: `data:image/png;base64,${png.toString("base64")}`,
  });
  assert.ok(out2.imageBytes && out2.imageBytes.length === 4);
  assert.equal(out2.images.length, 1);
  assert.equal(out2.imageInputCount, 1);

  const malformed = extractImageEditInputFromJson({ images: ["not-a-data-url"] });
  assert.equal(malformed.images.length, 0);
  assert.equal(malformed.imageInputCount, 1);

  const malformedTypes = extractImageEditInputFromJson({
    images: [`data:image/png;base64,${png.toString("base64")}`, null, 7, false],
  });
  assert.equal(malformedTypes.images.length, 1);
  assert.equal(malformedTypes.imageInputCount, 4);
});

test("resolveImageRouteModel resolves a bare combo/alias to its single image target", async () => {
  await createCombo({
    name: "image-alias-3215",
    models: ["myimg/gpt-image-2"],
    strategy: "priority",
  });

  assert.equal(await resolveSingleImageComboTarget("image-alias-3215"), "myimg/gpt-image-2");
  // No openai-compatible node has prefix "myimg" in this test DB, so the prefix step
  // leaves it intact — but the combo name itself is now resolved (was the bug).
  assert.equal(await resolveImageRouteModel("image-alias-3215"), "myimg/gpt-image-2");
});

test("resolveImageRouteModel lets bare combos shadow built-in image aliases", async () => {
  await createCombo({ name: "gpt-image-2", models: ["myimg/gpt-image-2"], strategy: "priority" });

  assert.equal(await resolveSingleImageComboTarget("gpt-image-2"), "myimg/gpt-image-2");
  assert.equal(await resolveImageRouteModel("gpt-image-2"), "myimg/gpt-image-2");
  assert.equal(await resolveImageRouteModel("openai/gpt-image-2"), "openai/gpt-image-2");
});

test("resolveImageRouteModel keeps codex bare aliases over same-name combos", async () => {
  await createCombo({
    name: "gpt-5.6-sol",
    models: ["myimg/gpt-5.6-sol"],
    strategy: "priority",
  });

  assert.equal(await resolveSingleImageComboTarget("gpt-5.6-sol"), "myimg/gpt-5.6-sol");
  assert.equal(await resolveImageRouteModel("gpt-5.6-sol"), "gpt-5.6-sol");
});

test("resolveImageRouteModel leaves built-in / already-resolved ids untouched", async () => {
  assert.equal(await resolveImageRouteModel("cgpt-web/gpt-5.5"), "cgpt-web/gpt-5.5");
  assert.equal(await resolveSingleImageComboTarget("definitely-not-a-combo-3215"), null);
});
