import { getModelSpec } from "../../src/shared/constants/modelSpecs.ts";

export const BEDROCK_DEFAULT_REGION = "us-east-1";
export const BEDROCK_DASHBOARD_DEFAULT_REGION = "eu-west-2";

const BEDROCK_REGION_PATTERN = /^[a-z]{2}(?:-gov)?-[a-z]+-\d+$/i;

export function normalizeBedrockRegion(value: unknown, fallback = BEDROCK_DEFAULT_REGION): string {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim().toLowerCase();
  return BEDROCK_REGION_PATTERN.test(trimmed) ? trimmed : fallback;
}

export function extractBedrockRegionFromBaseUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const hostname = new URL(value).hostname;
    const match = hostname.match(/^bedrock(?:-runtime|-mantle)?\.([a-z0-9-]+)\./i);
    return match?.[1] ? normalizeBedrockRegion(match[1], "") || null : null;
  } catch {
    return null;
  }
}

export function resolveBedrockRegion(providerSpecificData: unknown): string {
  const data =
    providerSpecificData && typeof providerSpecificData === "object"
      ? (providerSpecificData as Record<string, unknown>)
      : {};
  const explicit = normalizeBedrockRegion(data.region, "");
  if (explicit) return explicit;

  const baseUrl = typeof data.baseUrl === "string" ? data.baseUrl : null;
  return extractBedrockRegionFromBaseUrl(baseUrl) || BEDROCK_DEFAULT_REGION;
}

export function buildBedrockControlBaseUrl(region: string): string {
  return `https://bedrock.${normalizeBedrockRegion(region)}.amazonaws.com`;
}

export function buildBedrockRuntimeBaseUrl(region: string): string {
  return `https://bedrock-runtime.${normalizeBedrockRegion(region)}.amazonaws.com`;
}

export function buildBedrockNativeModelsUrl(region: string): string {
  return `${buildBedrockControlBaseUrl(region)}/foundation-models?byOutputModality=TEXT`;
}

export function buildBedrockNativeInferenceProfilesUrl(
  region: string,
  options: { nextToken?: string | null; typeEquals?: "SYSTEM_DEFINED" | "APPLICATION" } = {}
): string {
  const url = new URL(`${buildBedrockControlBaseUrl(region)}/inference-profiles`);
  url.searchParams.set("maxResults", "100");
  url.searchParams.set("typeEquals", options.typeEquals || "SYSTEM_DEFINED");
  if (options.nextToken) url.searchParams.set("nextToken", options.nextToken);
  return url.toString();
}

export function buildBedrockNativeConverseUrl(region: string, modelId: string, stream = false) {
  const encodedModel = encodeURIComponent(modelId);
  return `${buildBedrockRuntimeBaseUrl(region)}/model/${encodedModel}/${stream ? "converse-stream" : "converse"}`;
}

function modelIdFromArn(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const marker = ":foundation-model/";
  const idx = value.indexOf(marker);
  if (idx < 0) return null;
  const id = value.slice(idx + marker.length).trim();
  return id || null;
}

export type BedrockDiscoveredModel = {
  id: string;
  name: string;
  source: "foundation" | "inference_profile";
  provider?: string | null;
  supportsStreaming?: boolean;
  supportsVision?: boolean;
  inputTokenLimit?: number;
  outputTokenLimit?: number;
};

export function getBedrockKnownModelLimits(modelId: string): {
  inputTokenLimit?: number;
  outputTokenLimit?: number;
} | null {
  const trimmed = typeof modelId === "string" ? modelId.trim() : "";
  if (!trimmed) return null;

  const unqualified = trimmed.includes("/") ? trimmed.slice(trimmed.indexOf("/") + 1) : trimmed;
  const withoutProfilePrefix = unqualified.replace(/^(?:eu|us|global)\./i, "");
  const withoutProviderPrefix = withoutProfilePrefix.replace(/^anthropic\./i, "");
  const spec =
    getModelSpec(trimmed) ||
    getModelSpec(unqualified) ||
    getModelSpec(withoutProfilePrefix) ||
    getModelSpec(withoutProviderPrefix);

  if (!spec?.contextWindow && !spec?.maxOutputTokens) return null;
  return {
    ...(typeof spec.contextWindow === "number" ? { inputTokenLimit: spec.contextWindow } : {}),
    ...(typeof spec.maxOutputTokens === "number" ? { outputTokenLimit: spec.maxOutputTokens } : {}),
  };
}

function withKnownBedrockLimits(model: BedrockDiscoveredModel): BedrockDiscoveredModel {
  return {
    ...model,
    ...(getBedrockKnownModelLimits(model.id) || {}),
  };
}

export function normalizeBedrockDiscoveredModels(
  foundationModelsResponse: unknown,
  inferenceProfilesResponse: unknown = null
): BedrockDiscoveredModel[] {
  const byId = new Map<string, BedrockDiscoveredModel>();
  const add = (model: BedrockDiscoveredModel) => {
    if (!model.id || byId.has(model.id)) return;
    byId.set(model.id, model);
  };

  const foundationModels =
    foundationModelsResponse && typeof foundationModelsResponse === "object"
      ? (foundationModelsResponse as Record<string, unknown>).modelSummaries
      : null;
  if (Array.isArray(foundationModels)) {
    for (const item of foundationModels) {
      const model = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
      const id = typeof model.modelId === "string" ? model.modelId.trim() : "";
      if (!id) continue;
      const outputModalities = Array.isArray(model.outputModalities) ? model.outputModalities : [];
      const inputModalities = Array.isArray(model.inputModalities) ? model.inputModalities : [];
      add(
        withKnownBedrockLimits({
          id,
          name:
            typeof model.modelName === "string" && model.modelName.trim() ? model.modelName : id,
          source: "foundation",
          provider: typeof model.providerName === "string" ? model.providerName : null,
          supportsStreaming: model.responseStreamingSupported === true,
          supportsVision: inputModalities.includes("IMAGE") || outputModalities.includes("IMAGE"),
        })
      );
    }
  }

  const profiles =
    inferenceProfilesResponse && typeof inferenceProfilesResponse === "object"
      ? (inferenceProfilesResponse as Record<string, unknown>).inferenceProfileSummaries
      : null;
  if (Array.isArray(profiles)) {
    for (const item of profiles) {
      const profile = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
      const id =
        typeof profile.inferenceProfileId === "string" ? profile.inferenceProfileId.trim() : "";
      if (id) {
        add(
          withKnownBedrockLimits({
            id,
            name:
              typeof profile.inferenceProfileName === "string" &&
              profile.inferenceProfileName.trim()
                ? profile.inferenceProfileName
                : id,
            source: "inference_profile",
            supportsStreaming: true,
          })
        );
      }

      const models = Array.isArray(profile.models) ? profile.models : [];
      for (const profileModel of models) {
        const modelRecord =
          profileModel && typeof profileModel === "object"
            ? (profileModel as Record<string, unknown>)
            : {};
        const modelId = modelIdFromArn(modelRecord.modelArn);
        if (modelId) {
          add(
            withKnownBedrockLimits({
              id: modelId,
              name: modelId,
              source: "foundation",
              supportsStreaming: true,
            })
          );
        }
      }
    }
  }

  return [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
}
