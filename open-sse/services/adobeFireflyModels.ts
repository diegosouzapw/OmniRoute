/**
 * Adobe Firefly model discovery and normalized media capabilities.
 *
 * The live discovery schema is authoritative. The generated snapshot is used only
 * when a request cannot perform authenticated discovery (for example /v1/models).
 */

import { ADOBE_FIREFLY_DISCOVERY_SNAPSHOT } from "./adobeFireflyModelSnapshot.ts";

export type AdobeFireflyModality = "image" | "video" | "audio" | "unknown";

export interface AdobeFireflyDiscoveredModel {
  modelId: string;
  modelVersion: string;
  displayName: string;
  modality: AdobeFireflyModality;
  enabled: boolean;
  providerName?: string;
  releaseReadiness?: string;
  healthStatus?: string;
  inputMediaUseCases: string[];
  requestSchema?: Record<string, unknown>;
  backingModel?: string;
}

export interface AdobeFireflyReferenceInputCapability {
  mediaType: string;
  usageType: string;
  minItems: number;
  maxItems: number | null;
  maxFileSizeBytes: number | null;
}

export interface AdobeFireflyMediaCapabilities {
  inputMediaUseCases: string[];
  schemaProperties: string[];
  requiredProperties: string[];
  referenceInputs: AdobeFireflyReferenceInputCapability[];
  maxReferenceItems: number | null;
  supportedSizes: string[];
  supportedAspectRatios: string[];
  supportedResolutions: string[];
  supportedDurations: number[];
  durationMin: number | null;
  durationMax: number | null;
  durationDefault: number | null;
  outputCountMin: number | null;
  outputCountMax: number | null;
  promptMaxLength: number | null;
  releaseReadiness: string;
  healthStatus: string;
}

export interface AdobeFireflyCatalogModel {
  /** Stable API id without the provider prefix. */
  id: string;
  name: string;
  modality: "image" | "video";
  upstreamModelId: string;
  upstreamModelVersion: string;
  providerName: string;
  backingModel: string;
  inputModalities: string[];
  capabilities: AdobeFireflyMediaCapabilities;
}

export interface AdobeFireflyImageModelSpec extends AdobeFireflyCatalogModel {
  modality: "image";
  /** Payload dialect observed for this model family. */
  family: "gemini" | "gpt-image" | "generic";
}

export interface AdobeFireflyVideoModelSpec extends AdobeFireflyCatalogModel {
  modality: "video";
  defaultDuration: number;
  defaultResolution: string;
}

interface MergedObjectSchema {
  properties: Record<string, Record<string, unknown>>;
  required: string[];
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.map((item) => String(item)).filter((item) => item.length > 0)
    : [];
}

function finiteInteger(value: unknown): number | null {
  return Number.isInteger(value) ? (value as number) : null;
}

/** Merge object properties/required keys contributed through JSON Schema allOf. */
export function mergeAdobeObjectSchema(schema: unknown): MergedObjectSchema {
  const merged: MergedObjectSchema = { properties: {}, required: [] };
  const visit = (value: unknown) => {
    const node = asRecord(value);
    const properties = asRecord(node.properties);
    for (const [key, property] of Object.entries(properties)) {
      merged.properties[key] = asRecord(property);
    }
    merged.required.push(...asStringArray(node.required));
    if (Array.isArray(node.allOf)) node.allOf.forEach(visit);
  };
  visit(schema);
  merged.required = [...new Set(merged.required)];
  return merged;
}

function schemaBranches(schema: unknown): Record<string, unknown>[] {
  const root = asRecord(schema);
  if (Object.keys(root).length === 0) return [];
  return [
    root,
    ...(Array.isArray(root.anyOf) ? root.anyOf.map(asRecord) : []),
    ...(Array.isArray(root.oneOf) ? root.oneOf.map(asRecord) : []),
  ];
}

function enumStrings(schema: unknown): string[] {
  return [
    ...new Set(
      schemaBranches(schema)
        .flatMap((branch) => (Array.isArray(branch.enum) ? branch.enum : []))
        .filter((value): value is string => typeof value === "string")
    ),
  ];
}

function integerBranch(schema: unknown): Record<string, unknown> {
  return schemaBranches(schema).find((branch) => branch.type === "integer") || {};
}

/** Stable, collision-resistant public id for an exact upstream model/version pair. */
export function slugifyAdobeModel(modelId: string, modelVersion: string): string {
  const slug = (value: string, allowDot = false) =>
    String(value || "")
      .trim()
      .toLowerCase()
      .replace(allowDot ? /[^a-z0-9.]+/g : /[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const family = slug(modelId);
  // Adobe still uses `kling_v3_omni*` internally, while discovery exposes these
  // products to users as Kling O3. Never leak the obsolete/internal "omni" name
  // into the public API catalog; the untouched upstream version stays in the spec.
  const publicVersion =
    family === "kling" ? modelVersion.replace(/^kling_v3_omni/i, "kling_o3") : modelVersion;
  const version = slug(publicVersion, true);
  if (!version || version === "default" || version === family) return family || "model";
  return `${family}-${version}`;
}

/** Parse POST /v2/models/discovery without discarding its resolved request schema. */
export function parseAdobeModelsDiscovery(body: unknown): AdobeFireflyDiscoveredModel[] {
  const root = asRecord(body);
  const families = Array.isArray(root.models) ? root.models : [];
  const rows: AdobeFireflyDiscoveredModel[] = [];

  for (const familyValue of families) {
    const family = asRecord(familyValue);
    const modelId = String(family.modelId || "").trim();
    if (!modelId) continue;
    for (const [modelVersion, versionValue] of Object.entries(asRecord(family.modelVersions))) {
      const version = asRecord(versionValue);
      if (version.enabled === false) continue;
      const outputModalities = asStringArray(version.outputModality).map((item) =>
        item.toLowerCase()
      );
      const modality: AdobeFireflyModality = outputModalities.includes("image")
        ? "image"
        : outputModalities.includes("video")
          ? "video"
          : outputModalities.includes("audio")
            ? "audio"
            : "unknown";
      rows.push({
        modelId,
        modelVersion,
        displayName: String(
          version.modelDisplayName || version.modelCaiDisplayName || modelVersion
        ),
        modality,
        enabled: version.enabled !== false,
        providerName:
          typeof family.acModelFamilyProviderDisplayName === "string"
            ? family.acModelFamilyProviderDisplayName
            : undefined,
        releaseReadiness:
          typeof version.releaseReadiness === "string" ? version.releaseReadiness : undefined,
        healthStatus: typeof version.healthStatus === "string" ? version.healthStatus : undefined,
        inputMediaUseCases: asStringArray(version.inputMediaUseCase),
        requestSchema: asRecord(version.requestSchema),
        backingModel:
          typeof version.bksGenerationModel === "string" ? version.bksGenerationModel : undefined,
      });
    }
  }
  return rows;
}

function normalizeCapabilities(row: AdobeFireflyDiscoveredModel): AdobeFireflyMediaCapabilities {
  const schema = mergeAdobeObjectSchema(row.requestSchema);
  const referenceSchema = asRecord(schema.properties.referenceBlobs);
  const referenceInputs: AdobeFireflyReferenceInputCapability[] = [];
  const mediaCapabilities = Array.isArray(referenceSchema["x-capabilities"])
    ? referenceSchema["x-capabilities"]
    : [];
  for (const mediaValue of mediaCapabilities) {
    const media = asRecord(mediaValue);
    const maxFileSizeBytes = finiteInteger(media.maxFileSizeBytes);
    const usageConstraints = Array.isArray(media.usageConstraints) ? media.usageConstraints : [];
    for (const usageValue of usageConstraints) {
      const usage = asRecord(usageValue);
      if (usage.deprecated === true) continue;
      const usageType = String(usage.usageType || "");
      const mediaType = String(media.mediaType || "");
      if (!usageType || !mediaType) continue;
      referenceInputs.push({
        mediaType,
        usageType,
        minItems: finiteInteger(usage.minItems) ?? 0,
        maxItems: finiteInteger(usage.maxItems),
        maxFileSizeBytes,
      });
    }
  }

  const supportedSizes = [
    ...new Set(
      schemaBranches(schema.properties.size)
        .flatMap((branch) => (Array.isArray(branch.enum) ? branch.enum : []))
        .map(asRecord)
        .filter((size) => finiteInteger(size.width) !== null && finiteInteger(size.height) !== null)
        .map((size) => `${size.width}x${size.height}`)
    ),
  ];
  const supportedAspectRatios = [
    ...new Set(
      schemaBranches(schema.properties.generationSettings).flatMap((branch) =>
        enumStrings(asRecord(asRecord(branch.properties).aspectRatio))
      )
    ),
  ];
  const duration = integerBranch(schema.properties.duration);
  const outputCount = integerBranch(schema.properties.n);
  const prompt =
    schemaBranches(schema.properties.prompt).find((branch) => branch.type === "string") || {};

  return {
    inputMediaUseCases: [...row.inputMediaUseCases],
    schemaProperties: Object.keys(schema.properties),
    requiredProperties: [...schema.required],
    referenceInputs,
    maxReferenceItems: finiteInteger(referenceSchema.maxItems),
    supportedSizes,
    supportedAspectRatios,
    supportedResolutions: enumStrings(schema.properties.resolution),
    supportedDurations: [
      ...new Set(
        schemaBranches(schema.properties.duration)
          .flatMap((branch) => (Array.isArray(branch.enum) ? branch.enum : []))
          .filter((value): value is number => Number.isInteger(value))
      ),
    ],
    durationMin: finiteInteger(duration.minimum),
    durationMax: finiteInteger(duration.maximum),
    durationDefault: finiteInteger(duration.default),
    outputCountMin: finiteInteger(outputCount.minimum),
    outputCountMax: finiteInteger(outputCount.maximum),
    promptMaxLength: finiteInteger(prompt.maxLength),
    releaseReadiness: row.releaseReadiness || "",
    healthStatus: row.healthStatus || "",
  };
}

function isCallableGenerationModel(row: AdobeFireflyDiscoveredModel): boolean {
  if (row.modality !== "image" && row.modality !== "video") return false;
  if (!mergeAdobeObjectSchema(row.requestSchema).properties.prompt) return false;
  const excluded = new Set(["upscaling", "sharpening", "denoising"]);
  return !row.inputMediaUseCases.some((value) => excluded.has(value.toLowerCase()));
}

function deriveInputModalities(capabilities: AdobeFireflyMediaCapabilities): string[] {
  return ["text", ...new Set(capabilities.referenceInputs.map((reference) => reference.mediaType))];
}

function semanticCatalogKey(model: AdobeFireflyCatalogModel): string {
  return JSON.stringify({
    backingModel: model.backingModel,
    name: model.name,
    modality: model.modality,
    capabilities: model.capabilities,
  });
}

/** Normalize and de-duplicate callable image/video rows from live discovery. */
export function mapDiscoveredToCatalog(
  rows: AdobeFireflyDiscoveredModel[]
): AdobeFireflyCatalogModel[] {
  const output: AdobeFireflyCatalogModel[] = [];
  const seen = new Set<string>();
  for (const row of rows) {
    if (!isCallableGenerationModel(row)) continue;
    const capabilities = normalizeCapabilities(row);
    const model: AdobeFireflyCatalogModel = {
      id: slugifyAdobeModel(row.modelId, row.modelVersion),
      name: row.displayName,
      modality: row.modality as "image" | "video",
      upstreamModelId: row.modelId,
      upstreamModelVersion: row.modelVersion,
      providerName: row.providerName || "",
      backingModel: row.backingModel || "",
      inputModalities: deriveInputModalities(capabilities),
      capabilities,
    };
    const key = semanticCatalogKey(model);
    if (seen.has(key)) continue;
    seen.add(key);
    output.push(model);
  }
  return output;
}

function snapshotCatalog(): AdobeFireflyCatalogModel[] {
  return ADOBE_FIREFLY_DISCOVERY_SNAPSHOT.map((model) => {
    const capabilities: AdobeFireflyMediaCapabilities = {
      inputMediaUseCases: [...model.inputMediaUseCases],
      schemaProperties: [...model.schemaProperties],
      requiredProperties: [...model.requiredProperties],
      referenceInputs: model.referenceInputs.map((reference) => ({ ...reference })),
      maxReferenceItems: model.maxReferenceItems,
      supportedSizes: [...model.supportedSizes],
      supportedAspectRatios: [...model.supportedAspectRatios],
      supportedResolutions: [...model.supportedResolutions],
      supportedDurations: [...model.supportedDurations],
      durationMin: model.durationMin,
      durationMax: model.durationMax,
      durationDefault: model.durationDefault,
      outputCountMin: model.outputCountMin,
      outputCountMax: model.outputCountMax,
      promptMaxLength: model.promptMaxLength,
      releaseReadiness: model.releaseReadiness,
      healthStatus: model.healthStatus,
    };
    return {
      id: model.id,
      name: model.name,
      modality: model.modality,
      upstreamModelId: model.upstreamModelId,
      upstreamModelVersion: model.upstreamModelVersion,
      providerName: model.providerName,
      backingModel: model.backingModel,
      inputModalities: deriveInputModalities(capabilities),
      capabilities,
    };
  });
}

export const ADOBE_FIREFLY_FALLBACK_MODELS: AdobeFireflyCatalogModel[] = snapshotCatalog();

export function getAdobeFireflyFallbackCatalog(
  modality?: "image" | "video"
): AdobeFireflyCatalogModel[] {
  return ADOBE_FIREFLY_FALLBACK_MODELS.filter((model) => !modality || model.modality === modality);
}

function imageFamily(model: AdobeFireflyCatalogModel): AdobeFireflyImageModelSpec["family"] {
  if (model.upstreamModelId === "gemini-flash") return "gemini";
  if (model.upstreamModelId === "gpt-image" || model.upstreamModelId === "gpt-4o-image") {
    return "gpt-image";
  }
  return "generic";
}

export const ADOBE_FIREFLY_IMAGE_MODELS: Record<string, AdobeFireflyImageModelSpec> =
  Object.fromEntries(
    getAdobeFireflyFallbackCatalog("image").map((model) => [
      model.id,
      { ...model, modality: "image" as const, family: imageFamily(model) },
    ])
  );

function defaultDuration(model: AdobeFireflyCatalogModel): number {
  const caps = model.capabilities;
  return caps.durationDefault ?? caps.supportedDurations[0] ?? caps.durationMin ?? 5;
}

function defaultResolution(model: AdobeFireflyCatalogModel): string {
  if (model.capabilities.supportedSizes.some((value) => value.includes("1920x1080"))) {
    return "1080p";
  }
  return "720p";
}

export const ADOBE_FIREFLY_VIDEO_MODELS: Record<string, AdobeFireflyVideoModelSpec> =
  Object.fromEntries(
    getAdobeFireflyFallbackCatalog("video").map((model) => [
      model.id,
      {
        ...model,
        modality: "video" as const,
        defaultDuration: defaultDuration(model),
        defaultResolution: defaultResolution(model),
      },
    ])
  );

const LEGACY_MODEL_ALIASES: Record<string, string> = {
  "nano-banana": "gemini-flash-nano-banana",
  "nano-banana-pro": "gemini-flash-nano-banana-2",
  "nano-banana-2": "gemini-flash-nano-banana-3",
  "gpt-image": "gpt-image-2",
  "gpt-image-2": "gpt-image-2",
  "gpt-image-1.5": "gpt-image-1.5",
  "flux-2": "flux-2",
  "flux-pro": "flux-fluxpro",
  "flux-ultra": "flux-fluxultra",
  "seedream-4": "seedream-seedream-v4",
  "seedream-5-lite": "seedream-seedream-v5-lite",
  "runway-gen4-image": "runway-gen4-image",
  "veo-3.1": "veo-3.1-generate",
  "veo-3.1-fast": "veo-3.1-fast-generate",
  "luma-ray3": "luma-3.0-ray",
  "runway-gen4-turbo": "runway-gen4-turbo",
  // Backward compatibility only; the catalog advertises the exact discovered id.
  "kling-3": "kling-kling-v3-standard-i2v",
};

// Preserve established API aliases when (and only when) they resolve to a model
// that is present in the verified discovery snapshot. These keys are not listed.
for (const [alias, target] of Object.entries(LEGACY_MODEL_ALIASES)) {
  const imageTarget = ADOBE_FIREFLY_IMAGE_MODELS[target];
  if (imageTarget) ADOBE_FIREFLY_IMAGE_MODELS[alias] = imageTarget;
  const videoTarget = ADOBE_FIREFLY_VIDEO_MODELS[target];
  if (videoTarget) ADOBE_FIREFLY_VIDEO_MODELS[alias] = videoTarget;
}

/** Backward-compatible request ids. Kept out of every advertised model catalog. */
export const ADOBE_FIREFLY_IMAGE_ROUTING_ALIASES = Object.freeze(
  Object.entries(LEGACY_MODEL_ALIASES)
    .filter(([, target]) => Boolean(ADOBE_FIREFLY_IMAGE_MODELS[target]))
    .map(([alias]) => alias)
);

function normalizeRequestedId(model: string): string {
  return String(model || "")
    .trim()
    .toLowerCase()
    .replace(/^adobe-firefly\//, "")
    .replace(/^firefly\//, "");
}

function resolveCatalogId(model: string): string {
  const requested = normalizeRequestedId(model);
  return LEGACY_MODEL_ALIASES[requested] || requested;
}

export function resolveAdobeImageModel(model: string): {
  id: string;
  spec: AdobeFireflyImageModelSpec;
} {
  const id = resolveCatalogId(model);
  const spec = ADOBE_FIREFLY_IMAGE_MODELS[id];
  if (!spec) {
    throw new Error(
      `Unknown Adobe Firefly image model: ${normalizeRequestedId(model) || "(empty)"}`
    );
  }
  return { id, spec };
}

export function resolveAdobeVideoModel(model: string): {
  id: string;
  spec: AdobeFireflyVideoModelSpec;
} {
  const id = resolveCatalogId(model);
  const spec = ADOBE_FIREFLY_VIDEO_MODELS[id];
  if (!spec) {
    throw new Error(
      `Unknown Adobe Firefly video model: ${normalizeRequestedId(model) || "(empty)"}`
    );
  }
  return { id, spec };
}

export function toRegistryImageModels(): Array<{
  id: string;
  name: string;
  inputModalities: string[];
  supportedSizes: string[];
  mediaCapabilities: Record<string, unknown>;
}> {
  return getAdobeFireflyFallbackCatalog("image").map((model) => ({
    id: model.id,
    name: `Firefly ${model.name}`,
    inputModalities: model.inputModalities,
    supportedSizes: model.capabilities.supportedSizes,
    mediaCapabilities: toAdobeMediaCapabilitiesApi(model),
  }));
}

export function toRegistryVideoModels(): Array<{
  id: string;
  name: string;
  supportedSizes: string[];
  mediaCapabilities: Record<string, unknown>;
}> {
  return getAdobeFireflyFallbackCatalog("video").map((model) => ({
    id: model.id,
    name: `Firefly ${model.name}`,
    supportedSizes: model.capabilities.supportedSizes,
    mediaCapabilities: toAdobeMediaCapabilitiesApi(model),
  }));
}

/** JSON-safe extension emitted by /v1/models. */
export function toAdobeMediaCapabilitiesApi(
  model: AdobeFireflyCatalogModel
): Record<string, unknown> {
  const caps = model.capabilities;
  return {
    upstream_model_id: model.upstreamModelId,
    upstream_model_version: model.upstreamModelVersion,
    provider_name: model.providerName,
    release_readiness: caps.releaseReadiness,
    health_status: caps.healthStatus,
    input_media_use_cases: caps.inputMediaUseCases,
    reference_inputs: caps.referenceInputs.map((reference) => ({
      media_type: reference.mediaType,
      usage_type: reference.usageType,
      min_items: reference.minItems,
      max_items: reference.maxItems,
      max_file_size_bytes: reference.maxFileSizeBytes,
    })),
    max_reference_items: caps.maxReferenceItems,
    supported_sizes: caps.supportedSizes,
    supported_aspect_ratios: caps.supportedAspectRatios,
    supported_resolutions: caps.supportedResolutions,
    supported_durations: caps.supportedDurations,
    duration_min: caps.durationMin,
    duration_max: caps.durationMax,
    duration_default: caps.durationDefault,
    output_count_min: caps.outputCountMin,
    output_count_max: caps.outputCountMax,
    prompt_max_length: caps.promptMaxLength,
  };
}

export function getAdobeReferenceUploadLimit(
  model: AdobeFireflyCatalogModel,
  mediaType: string
): number {
  if (model.capabilities.maxReferenceItems !== null) {
    return Math.max(1, Math.min(32, model.capabilities.maxReferenceItems));
  }
  const declaredTotal = model.capabilities.referenceInputs
    .filter((reference) => reference.mediaType === mediaType)
    .reduce((total, reference) => total + (reference.maxItems ?? 0), 0);
  return Math.max(1, Math.min(32, declaredTotal || 1));
}
