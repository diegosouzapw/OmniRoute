import { CORS_HEADERS } from "@/shared/utils/cors";
import { generateProviderPluginManifest } from "@omniroute/open-sse/config/providerPluginManifestRegistry.ts";
import { getServiceRow } from "@/lib/db/versionManager";
import { getServiceModels, type ServiceModel } from "@/lib/db/serviceModels";
import type {
  ProviderPluginManifest,
  ProviderPluginManifestEntry,
  ProviderPluginModel,
} from "@omniroute/open-sse/config/providerPluginManifest.ts";

const SERVICE_BACKEND_PLUGIN_IDS = new Set(["9router", "cliproxyapi"]);
const SERVICE_BACKEND_EXPOSURE_REQUIRED = new Set(["9router", "cliproxyapi"]);
const SERVICE_BACKEND_EXPOSURE_TOOL_BY_PLUGIN_ID = new Map<string, string>([
  ["9router", "9router"],
  ["cliproxyapi", "cliproxy"],
]);

const SERVICE_BACKEND_PROVIDER_TEMPLATE: Record<
  string,
  Pick<ProviderPluginManifestEntry, "format" | "executor" | "auth" | "endpoints" | "capabilities" | "passthroughModels" | "sidecar">
> = {
  "9router": {
    format: "openai",
    executor: "default",
    auth: { type: "none", header: "authorization" },
    endpoints: { modelsUrl: "/v1/models" },
    capabilities: [],
    passthroughModels: true,
    sidecar: { eligible: false, reasons: ["runtime provider"] },
  },
  cliproxyapi: {
    format: "openai",
    executor: "default",
    auth: { type: "none", header: "authorization" },
    endpoints: { modelsUrl: "/v1/models" },
    capabilities: ["passthrough-models"],
    passthroughModels: true,
    sidecar: { eligible: false, reasons: ["runtime provider"] },
  },
};

function createServiceManifestTemplate(providerId: string): ProviderPluginManifestEntry | null {
  const entry = SERVICE_BACKEND_PROVIDER_TEMPLATE[providerId];
  if (!entry) return null;

  return {
    id: providerId,
    format: entry.format,
    executor: entry.executor,
    auth: entry.auth,
    endpoints: entry.endpoints,
    capabilities: [...entry.capabilities],
    passthroughModels: entry.passthroughModels,
    models: [],
    sidecar: entry.sidecar,
  };
}

const SERVICE_MODEL_CACHE_HEADERS = {
  ...CORS_HEADERS,
  "Content-Type": "application/json",
  "Cache-Control": "public, max-age=60",
} as const;

function normalizeServiceModelId(tool: string, rawModelId: string): string {
  if (!rawModelId) return "";
  return rawModelId.includes("/") ? rawModelId : `${tool}/${rawModelId}`;
}

function pickServiceModels(tool: string, reader: (toolName: string) => ServiceModel[]): ProviderPluginModel[] {
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

  const serviceTool = SERVICE_BACKEND_EXPOSURE_TOOL_BY_PLUGIN_ID.get(toolName) ?? toolName;
  const row = await getServiceRow(serviceTool);
  if (!row) return true;
  return row.providerExpose;
}

function shouldInjectBackendPluginModels(provider: ProviderPluginManifestEntry) {
  return SERVICE_BACKEND_PLUGIN_IDS.has(provider.id);
}

export async function injectServiceModelsIntoManifest(
  manifest: ProviderPluginManifest,
  reader: (toolName: string) => ServiceModel[] = getServiceModels,
  exposeReader?: (toolName: string) => Promise<boolean> | boolean
): Promise<ProviderPluginManifest> {
  const providers: ProviderPluginManifestEntry[] = [...manifest.providers];
  for (const providerId of SERVICE_BACKEND_PLUGIN_IDS) {
    const exists = providers.some((provider) => provider.id === providerId);
    if (exists) continue;

    const template = createServiceManifestTemplate(providerId);
    if (template) providers.push(template);
  }

  const providersWithServiceModels = await Promise.all(
    providers.map(async (provider) => {
      if (!shouldInjectBackendPluginModels(provider)) return provider;

      try {
        const shouldExpose = exposeReader
          ? Boolean(await exposeReader(provider.id))
          : await shouldExposeServiceModels(provider.id);
        if (!shouldExpose) return provider;

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
    }),
  );

  return {
    ...manifest,
    providers: providersWithServiceModels,
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
  return new Response(JSON.stringify(await injectServiceModelsIntoManifest(generateProviderPluginManifest())), {
    headers: SERVICE_MODEL_CACHE_HEADERS,
  });
}
