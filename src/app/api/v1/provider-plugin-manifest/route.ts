import { CORS_HEADERS } from "@/shared/utils/cors";
import { generateProviderPluginManifest } from "@omniroute/open-sse/config/providerPluginManifestRegistry.ts";
import {
  type ProviderPluginManifest,
  type ProviderPluginModel,
} from "@omniroute/open-sse/config/providerPluginManifest.ts";
import { getServiceModels, type ServiceModel } from "@/lib/db/serviceModels";
import { getServiceRow } from "@/lib/db/versionManager";

const SERVICE_BACKEND_PLUGIN_IDS = new Set(["9router", "cliproxyapi"]);
const SERVICE_BACKEND_EXPOSURE_REQUIRED = new Set(["9router"]);
const SERVICE_MODEL_CACHE_HEADERS = {
  ...CORS_HEADERS,
  "Content-Type": "application/json",
  "Cache-Control": "public, max-age=60",
} as const;

const JSON_HEADERS = SERVICE_MODEL_CACHE_HEADERS;

function normalizeServiceModelId(tool: string, rawModelId: string): string {
  if (!rawModelId) return "";
  return rawModelId.includes("/") ? rawModelId : `${tool}/${rawModelId}`;
}

function pickServiceModels(
  tool: string,
  reader: (toolName: string) => ServiceModel[]
): ProviderPluginModel[] {
  const models = reader(tool).filter((entry) => {
    if (typeof entry !== "object" || entry === null) return false;
    if (typeof entry.id !== "string" || !entry.id.trim()) return false;
    if (entry.available === false) return false;
    return true;
  });

  const unique = new Map<string, ProviderPluginModel>();
  for (const model of models) {
    const id = normalizeServiceModelId(tool, model.id);
    if (unique.has(id)) continue;

    unique.set(id, {
      id,
      name: typeof model.name === "string" ? model.name : id,
      contextLength:
        typeof model.contextLength === "number" && Number.isFinite(model.contextLength)
          ? model.contextLength
          : undefined,
      maxOutputTokens:
        typeof model.maxOutputTokens === "number" && Number.isFinite(model.maxOutputTokens)
          ? model.maxOutputTokens
          : undefined,
      supportsReasoning: Boolean(model.supportsReasoning),
      supportsVision: Boolean(model.supportsVision),
      unsupportedParams:
        Array.isArray(model.unsupportedParams) && model.unsupportedParams.length > 0
          ? model.unsupportedParams
          : undefined,
      targetFormat: typeof model.targetFormat === "string" ? model.targetFormat : undefined,
    });
  }

  return [...unique.values()];
}

async function shouldExposeServiceModels(toolName: string): Promise<boolean> {
  if (!SERVICE_BACKEND_EXPOSURE_REQUIRED.has(toolName)) return true;

  const row = await getServiceRow(toolName);
  if (!row) return true;
  return row.providerExpose;
}

export async function injectServiceModelsIntoManifest(
  manifest: ProviderPluginManifest,
  reader: (toolName: string) => ServiceModel[] = getServiceModels,
  exposeReader?: (toolName: string) => Promise<boolean> | boolean
): Promise<ProviderPluginManifest> {
  const providers = await Promise.all(
    manifest.providers.map(async (provider) => {
    if (!SERVICE_BACKEND_PLUGIN_IDS.has(provider.id)) return provider;

    try {
      const shouldExpose = exposeReader
        ? Boolean(await exposeReader(provider.id))
        : await shouldExposeServiceModels(provider.id);

      if (!shouldExpose) {
        return provider;
      }

      const models = pickServiceModels(provider.id, reader);
      if (models.length === 0) return provider;

      const mergedModels = [...provider.models];
      const modelIds = new Set(provider.models.map((model) => model.id));
      for (const model of models) {
        if (!modelIds.has(model.id)) {
          mergedModels.push(model);
          modelIds.add(model.id);
        }
      }

      return { ...provider, models: mergedModels };
    } catch {
      return provider;
    }
    })
  );

  return {
    ...manifest,
    providers,
  };
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      ...CORS_HEADERS,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

export async function GET() {
  const manifest = generateProviderPluginManifest();
  const manifestWithServiceModels = await injectServiceModelsIntoManifest(manifest);

  return new Response(JSON.stringify(manifestWithServiceModels), {
    headers: JSON_HEADERS,
  });
}
