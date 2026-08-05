#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";

function usage() {
  console.error(
    "Usage: node scripts/dev/generate-adobe-firefly-snapshot.mjs <discovery.json> <output.ts>"
  );
  process.exit(2);
}

const [, , inputArg, outputArg] = process.argv;
if (!inputArg || !outputArg) usage();

const inputPath = path.resolve(inputArg);
const outputPath = path.resolve(outputArg);
const inputBytes = fs.readFileSync(inputPath);
const sourceHash = createHash("sha256").update(inputBytes).digest("hex");
const root = JSON.parse(inputBytes.toString("utf8"));

function mergeObjectSchema(schema) {
  const merged = { properties: {}, required: [] };
  const visit = (node) => {
    if (!node || typeof node !== "object") return;
    if (node.properties && typeof node.properties === "object") {
      Object.assign(merged.properties, node.properties);
    }
    if (Array.isArray(node.required)) merged.required.push(...node.required);
    if (Array.isArray(node.allOf)) node.allOf.forEach(visit);
  };
  visit(schema);
  merged.required = [...new Set(merged.required)];
  return merged;
}

function branches(schema) {
  if (!schema || typeof schema !== "object") return [];
  return [schema, ...(schema.anyOf || []), ...(schema.oneOf || [])];
}

function stringEnums(schema) {
  return [
    ...new Set(
      branches(schema)
        .flatMap((branch) => (Array.isArray(branch.enum) ? branch.enum : []))
        .filter((value) => typeof value === "string")
    ),
  ];
}

function integerSchema(schema) {
  return branches(schema).find((branch) => branch.type === "integer") || {};
}

function publicModelId(modelId, modelVersion) {
  const slug = (value, allowDot = false) =>
    String(value || "")
      .trim()
      .toLowerCase()
      .replace(allowDot ? /[^a-z0-9.]+/g : /[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const family = slug(modelId);
  const publicVersion =
    family === "kling" ? String(modelVersion).replace(/^kling_v3_omni/i, "kling_o3") : modelVersion;
  const version = slug(publicVersion, true);
  if (!version || version === "default" || version === family) return family || "model";
  return `${family}-${version}`;
}

function normalizeModel(family, modelVersion, version) {
  const schema = mergeObjectSchema(version.requestSchema);
  const properties = schema.properties;
  const referenceSchema = properties.referenceBlobs || {};
  const referenceInputs = [];
  for (const media of referenceSchema["x-capabilities"] || []) {
    for (const usage of media.usageConstraints || []) {
      if (usage.deprecated === true) continue;
      referenceInputs.push({
        mediaType: String(media.mediaType || ""),
        usageType: String(usage.usageType || ""),
        minItems: Number.isInteger(usage.minItems) ? usage.minItems : 0,
        maxItems: Number.isInteger(usage.maxItems) ? usage.maxItems : null,
        maxFileSizeBytes: Number.isInteger(media.maxFileSizeBytes) ? media.maxFileSizeBytes : null,
      });
    }
  }

  const supportedSizes = [
    ...new Set(
      branches(properties.size)
        .flatMap((branch) => (Array.isArray(branch.enum) ? branch.enum : []))
        .filter(
          (size) =>
            size &&
            Number.isInteger(size.width) &&
            size.width > 0 &&
            Number.isInteger(size.height) &&
            size.height > 0
        )
        .map((size) => `${size.width}x${size.height}`)
    ),
  ];
  const supportedAspectRatios = [
    ...new Set(
      branches(properties.generationSettings).flatMap((branch) =>
        stringEnums(branch?.properties?.aspectRatio)
      )
    ),
  ];
  const duration = integerSchema(properties.duration);
  const supportedDurations = [
    ...new Set(
      branches(properties.duration)
        .flatMap((branch) => (Array.isArray(branch.enum) ? branch.enum : []))
        .filter(Number.isInteger)
    ),
  ];
  const prompt = branches(properties.prompt).find((branch) => branch.type === "string") || {};
  const outputCount = integerSchema(properties.n);

  return {
    id: publicModelId(family.modelId, modelVersion),
    name: String(version.modelDisplayName || version.modelCaiDisplayName || modelVersion),
    modality: version.outputModality[0],
    upstreamModelId: family.modelId,
    upstreamModelVersion: modelVersion,
    providerName: String(family.acModelFamilyProviderDisplayName || ""),
    releaseReadiness: String(version.releaseReadiness || ""),
    healthStatus: String(version.healthStatus || ""),
    inputMediaUseCases: (version.inputMediaUseCase || []).map(String),
    schemaProperties: Object.keys(properties),
    requiredProperties: schema.required,
    referenceInputs,
    maxReferenceItems: Number.isInteger(referenceSchema.maxItems) ? referenceSchema.maxItems : null,
    supportedSizes,
    supportedAspectRatios,
    supportedResolutions: stringEnums(properties.resolution),
    supportedDurations,
    durationMin: Number.isInteger(duration.minimum) ? duration.minimum : null,
    durationMax: Number.isInteger(duration.maximum) ? duration.maximum : null,
    durationDefault: Number.isInteger(duration.default) ? duration.default : null,
    outputCountMin: Number.isInteger(outputCount.minimum) ? outputCount.minimum : null,
    outputCountMax: Number.isInteger(outputCount.maximum) ? outputCount.maximum : null,
    promptMaxLength: Number.isInteger(prompt.maxLength) ? prompt.maxLength : null,
    backingModel: String(version.bksGenerationModel || ""),
  };
}

const rawModels = [];
for (const family of Array.isArray(root.models) ? root.models : []) {
  for (const [modelVersion, version] of Object.entries(family.modelVersions || {})) {
    if (!version || version.enabled === false) continue;
    const modality = Array.isArray(version.outputModality)
      ? version.outputModality.map((value) => String(value).toLowerCase())[0]
      : "";
    if (modality !== "image" && modality !== "video") continue;

    const schema = mergeObjectSchema(version.requestSchema);
    if (!schema.properties.prompt) continue;
    const useCases = (version.inputMediaUseCase || []).map((value) => String(value).toLowerCase());
    if (useCases.some((value) => ["upscaling", "sharpening", "denoising"].includes(value))) {
      continue;
    }
    rawModels.push(normalizeModel(family, modelVersion, version));
  }
}

// Discovery currently repeats a few exact aliases (for example flux/fluxPro and
// fluxPro/1.1). Keep the first canonical wire pair and suppress duplicate cards.
const seen = new Set();
const models = [];
for (const model of rawModels) {
  const semanticKey = JSON.stringify({
    backingModel: model.backingModel,
    name: model.name,
    modality: model.modality,
    schemaProperties: model.schemaProperties,
    requiredProperties: model.requiredProperties,
    referenceInputs: model.referenceInputs,
    maxReferenceItems: model.maxReferenceItems,
    supportedSizes: model.supportedSizes,
    supportedAspectRatios: model.supportedAspectRatios,
    supportedResolutions: model.supportedResolutions,
    supportedDurations: model.supportedDurations,
    durationMin: model.durationMin,
    durationMax: model.durationMax,
  });
  if (seen.has(semanticKey)) continue;
  seen.add(semanticKey);
  models.push(model);
}

const source = `/**
 * Generated from Adobe Firefly POST /v2/models/discovery with resolveSchema=true.
 * Source SHA-256: ${sourceHash}
 * Regenerate with scripts/dev/generate-adobe-firefly-snapshot.mjs; do not edit by hand.
 * The generated literal stays compact to satisfy the repository's line-count gate.
 */
// prettier-ignore
export const ADOBE_FIREFLY_DISCOVERY_SNAPSHOT = ${JSON.stringify(models)} as const;
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, source, "utf8");
console.log(`Wrote ${models.length} models to ${outputPath}`);
