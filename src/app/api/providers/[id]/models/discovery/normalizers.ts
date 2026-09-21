import { SAFE_OUTBOUND_FETCH_PRESETS, safeOutboundFetch } from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuardPolicy";
import {
  getAntigravityModelsDiscoveryUrls,
  getAntigravityFetchAvailableModelsUrls,
} from "@omniroute/open-sse/config/antigravityUpstream.ts";
import { getAntigravityContentHeaders } from "@omniroute/open-sse/services/antigravityHeaders.ts";
import { resolveAntigravityClientVersion } from "@omniroute/open-sse/services/antigravityClientProfile.ts";
import {
  getClientVisibleAntigravityModelName,
  isDiscoverableAntigravityModelId,
  toClientAntigravityModelId,
} from "@omniroute/open-sse/config/antigravityModelAliases.ts";
import {
  getClientVisibleAgyModelName,
  isDiscoverableAgyModelId,
} from "@omniroute/open-sse/config/agyModels.ts";
import { normalizeAntigravityClientProfile } from "@/shared/constants/antigravityClientProfile";
import { ensureAntigravityProjectAssigned } from "@omniroute/open-sse/services/antigravityProjectBootstrap.ts";
import { persistDiscoveredAntigravityProjectId } from "@omniroute/open-sse/services/antigravityProjectPersist.ts";
import { asRecord, toNonEmptyString } from "./helpers";

const antigravityDiscoveryInflight = new Map<
  string,
  Promise<Array<{ id: string; name: string }>>
>();

type AntigravityDiscoveryModel = {
  id: string;
  name: string;
  isInternal?: boolean;
  /** Token window advertised by the upstream discovery payload, when present. */
  inputTokenLimit?: number;
  outputTokenLimit?: number;
};

/**
 * Forward discovery-advertised token windows when the upstream payload carries
 * them. Field names are probed defensively (payload shape is not contractual);
 * absent/non-numeric fields yield no entry, so nothing downstream changes.
 */
function extractDiscoveryTokenLimits(item: Record<string, unknown>): {
  inputTokenLimit?: number;
  outputTokenLimit?: number;
} {
  const limits: { inputTokenLimit?: number; outputTokenLimit?: number } = {};
  const input = item.inputTokenLimit ?? item.contextWindow;
  if (typeof input === "number" && Number.isFinite(input) && input > 0) {
    limits.inputTokenLimit = input;
  }
  const output = item.outputTokenLimit ?? item.maxOutputTokens;
  if (typeof output === "number" && Number.isFinite(output) && output > 0) {
    limits.outputTokenLimit = output;
  }
  return limits;
}

export function normalizeAntigravityModelsResponse(data: unknown): AntigravityDiscoveryModel[] {
  const payload = asRecord(data).models;

  if (Array.isArray(payload)) {
    return payload
      .map((value) => {
        const item = asRecord(value);
        const id =
          typeof item.id === "string"
            ? item.id
            : typeof item.name === "string"
              ? item.name
              : typeof item.model === "string"
                ? item.model
                : "";
        const name =
          typeof item.displayName === "string"
            ? item.displayName
            : typeof item.name === "string"
              ? item.name
              : id;
        return id
          ? {
              id,
              name,
              ...extractDiscoveryTokenLimits(item),
              ...(item.isInternal === true ? { isInternal: true } : {}),
            }
          : null;
      })
      .filter((value): value is AntigravityDiscoveryModel => Boolean(value));
  }

  const modelsById = asRecord(payload);
  return Object.entries(modelsById)
    .map(([id, value]) => {
      const item = asRecord(value);
      const name =
        typeof item.displayName === "string"
          ? item.displayName
          : typeof item.name === "string"
            ? item.name
            : id;
      return id
        ? {
            id,
            name,
            ...extractDiscoveryTokenLimits(item),
            ...(item.isInternal === true ? { isInternal: true } : {}),
          }
        : null;
    })
    .filter((value): value is AntigravityDiscoveryModel => Boolean(value));
}

export function filterUserCallableAntigravityModels(
  models: AntigravityDiscoveryModel[],
  provider: "antigravity" | "agy" = "antigravity"
) {
  return models.filter(
    (model) =>
      model.isInternal !== true &&
      (provider === "agy"
        ? isDiscoverableAgyModelId(model.id)
        : isDiscoverableAntigravityModelId(model.id))
  );
}

export function mapAntigravityModelForClient(
  model: { id: string; name: string; inputTokenLimit?: number; outputTokenLimit?: number },
  provider: "antigravity" | "agy" = "antigravity"
): {
  id: string;
  name: string;
  inputTokenLimit?: number;
  outputTokenLimit?: number;
} {
  const clientId = toClientAntigravityModelId(model.id);
  return {
    id: clientId,
    name:
      provider === "agy"
        ? getClientVisibleAgyModelName(clientId, model.name)
        : getClientVisibleAntigravityModelName(clientId, model.name),
    ...(typeof model.inputTokenLimit === "number"
      ? { inputTokenLimit: model.inputTokenLimit }
      : {}),
    ...(typeof model.outputTokenLimit === "number"
      ? { outputTokenLimit: model.outputTokenLimit }
      : {}),
  };
}

export async function fetchAntigravityDiscoveryModelsCached(
  accessToken: string,
  connectionId: string,
  proxy: unknown,
  providerSpecificData?: unknown,
  provider: "antigravity" | "agy" = "antigravity"
): Promise<
  Array<{ id: string; name: string; inputTokenLimit?: number; outputTokenLimit?: number }>
> {
  const profile = normalizeAntigravityClientProfile(asRecord(providerSpecificData).clientProfile);
  const cacheKey = `${provider}:${connectionId}:${accessToken.substring(0, 16)}:${profile}`;
  const inflight = antigravityDiscoveryInflight.get(cacheKey);
  if (inflight) return inflight;

  const promise = (async () => {
    await resolveAntigravityClientVersion(profile);
    const discovered = await ensureAntigravityProjectAssigned(accessToken, fetch, profile);
    if (discovered) {
      // #8491: persist the recovered id so it survives the next token refresh
      // or process restart instead of being silently rediscovered every time.
      await persistDiscoveredAntigravityProjectId(
        connectionId,
        discovered,
        asRecord(providerSpecificData)
      );
    }

    for (const discoveryUrl of [
      ...getAntigravityFetchAvailableModelsUrls(),
      ...getAntigravityModelsDiscoveryUrls(),
    ]) {
      try {
        const response = await safeOutboundFetch(discoveryUrl, {
          ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
          guard: getProviderOutboundGuard(),
          proxyConfig: proxy,
          method: "POST",
          headers: getAntigravityContentHeaders(profile, accessToken),
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.warn(
            `[models] ${provider} discovery failed at ${discoveryUrl} (${response.status}): ${errorText}`
          );
          continue;
        }

        const models = filterUserCallableAntigravityModels(
          normalizeAntigravityModelsResponse(await response.json()),
          provider
        ).map((model) => mapAntigravityModelForClient(model, provider));
        if (models.length > 0) {
          return models;
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.warn(`[models] ${provider} discovery threw for ${discoveryUrl}: ${message}`);
      }
    }

    return [];
  })().finally(() => {
    antigravityDiscoveryInflight.delete(cacheKey);
  });

  antigravityDiscoveryInflight.set(cacheKey, promise);
  return promise;
}

export function normalizeDataRobotCatalogResponse(
  data: unknown
): Array<{ id: string; name: string }> {
  const items = Array.isArray(asRecord(data).data) ? (asRecord(data).data as unknown[]) : [];

  return items
    .map((value) => {
      const item = asRecord(value);
      const model =
        toNonEmptyString(item.model) || toNonEmptyString(item.id) || toNonEmptyString(item.name);
      if (!model) return null;
      if (item.isActive === false) return null;
      const name = toNonEmptyString(item.label) || toNonEmptyString(item.displayName) || model;
      return { id: model, name };
    })
    .filter((value): value is { id: string; name: string } => Boolean(value));
}

export function normalizeOpenAiLikeModelsResponse(
  data: unknown,
  fallbackOwner: string
): Array<{ id: string; name: string; owned_by: string }> {
  const payload = asRecord(data);
  const items = Array.isArray(data)
    ? data
    : Array.isArray(payload.data)
      ? (payload.data as unknown[])
      : Array.isArray(payload.models)
        ? (payload.models as unknown[])
        : [];

  return items
    .map((value) => {
      const item = asRecord(value);
      const id =
        toNonEmptyString(item.id) || toNonEmptyString(item.model) || toNonEmptyString(item.name);
      if (!id) return null;
      const name =
        toNonEmptyString(item.display_name) ||
        toNonEmptyString(item.displayName) ||
        toNonEmptyString(item.name) ||
        id;
      const ownedBy =
        toNonEmptyString(item.owned_by) || toNonEmptyString(item.provider) || fallbackOwner;
      return { id, name, owned_by: ownedBy };
    })
    .filter((value): value is { id: string; name: string; owned_by: string } => Boolean(value));
}

/**
 * WorkBuddy (www.workbuddy.ai) catalogue.
 *
 * The gateway answers `GET /v3/config` with `{ code, msg, requestId, data }` and
 * the roster under `data.models`. An unauthenticated caller gets `data.models:
 * null`, so a token is required. Observed live (2026-09-19) from the desktop
 * app's own `CloudProductManager` log, an authenticated fetch returns **22**
 * models, all of them chat models: `default-model`, `fast-model`,
 * `balanced-model`, `primary-model`, `deep-model`, `kimi-k2.8-preview`,
 * `deepseek-v4.1-flash`, `deepseek-v4.1-flash-sg`, `gpt-6-astra`,
 * `hy4-preview-f`, `hy4-preview`, `hy3`, `gpt-5.6-sol`, `gpt-5.6-terra`,
 * `gpt-5.6-luna`, `gpt-5.5`, `gpt-5.4`, `gemini-3.5-flash`, `glm-5.3`,
 * `glm-5.2`, `kimi-k3`, `kimi-k2.6`.
 *
 * The item schema (id / name / maxInputTokens / maxOutputTokens /
 * supportsToolCall / supportsImages / supportsReasoning) is the one WorkBuddy's
 * own CLI ships in `cli/product.json`, confirmed against the 26-entry catalogue
 * in the macOS build. That file is a *fallback* layer rather than a base to
 * merge into. The CLI's `CloudProductProvider` runs `mergeModelsById`, which
 * indexes the built-in list by id and then maps over the **cloud** array, so
 * membership comes entirely from the cloud; the built-in layer only supplies
 * field defaults for ids the cloud also names. The effective roster the CLI logs
 * bears this out: with the cloud live it is the 22 above plus local overrides,
 * and the 6 media entries that exist only in `product.json` are absent, while an
 * instance that could not reach the cloud falls back to the built-in 26. The
 * field probes stay defensive regardless, and an item without an id is dropped
 * rather than guessed at.
 *
 * An object map is accepted alongside an array because the same config family
 * ships `relatedModels` keyed by name.
 *
 * The built-in catalogue lists image and video models in the same array as chat
 * models, discriminated only by `tags`. The observed cloud payload contains none
 * of them, so the exclusion below guards the fallback path and any future
 * payload that does list them, rather than repairing a live symptom. See
 * `isWorkbuddyMediaModel`.
 */
export function normalizeWorkbuddyModelsResponse(
  data: unknown
): Array<{ id: string; name: string; owned_by: string }> {
  const root = asRecord(data);
  const inner = asRecord(root.data);
  const payload = inner.models ?? root.models;

  const items: unknown[] = Array.isArray(payload)
    ? payload
    : payload && typeof payload === "object"
      ? Object.entries(asRecord(payload)).map(([id, value]) => ({ id, ...asRecord(value) }))
      : [];

  return items
    .map((value) => {
      const item = asRecord(value);
      const id = toNonEmptyString(item.id) || toNonEmptyString(item.model);
      if (!id) return null;
      if (isWorkbuddyMediaModel(item)) return null;
      const name = toNonEmptyString(item.name) || toNonEmptyString(item.displayName) || id;
      return { id, name, owned_by: "workbuddy" };
    })
    .filter((value): value is { id: string; name: string; owned_by: string } => Boolean(value));
}

/**
 * Media-generation capabilities, as they appear in an entry's `tags`.
 *
 * WorkBuddy lists its image and video models in the same array as its chat
 * models (`gemini-3.0-pro-image`, `hunyuan-image-v3.0`, `hunyuan-video-art` and
 * friends in the shipped catalogue), so the tag is the only thing separating
 * them. They cannot serve a chat completion, so they must not reach a chat
 * roster.
 */
const WORKBUDDY_MEDIA_TAGS = new Set([
  "text-to-image",
  "image-to-image",
  "text-to-video",
  "image-to-video",
]);

/**
 * True when every tag on the entry names a media-generation capability, which
 * makes it unusable for chat completions. An untagged entry, or one carrying any
 * other tag (`lite`, `craft`, `custom`), is kept: only a model that is media and
 * nothing else is dropped.
 */
function isWorkbuddyMediaModel(item: Record<string, unknown>): boolean {
  const tags = item.tags;
  if (!Array.isArray(tags) || tags.length === 0) return false;
  return tags.every((tag) => typeof tag === "string" && WORKBUDDY_MEDIA_TAGS.has(tag));
}

export function normalizeSapModelsResponse(
  data: unknown
): Array<{ id: string; name: string; owned_by: string }> {
  const payload = asRecord(data);
  const items = Array.isArray(payload.resources) ? (payload.resources as unknown[]) : [];

  return items
    .map((value) => {
      const item = asRecord(value);
      const id =
        toNonEmptyString(item.model) || toNonEmptyString(item.id) || toNonEmptyString(item.name);
      if (!id) return null;
      const name =
        toNonEmptyString(item.displayName) ||
        toNonEmptyString(item.display_name) ||
        toNonEmptyString(item.name) ||
        id;
      const ownedBy = toNonEmptyString(item.provider) || "sap";
      return { id, name, owned_by: ownedBy };
    })
    .filter((value): value is { id: string; name: string; owned_by: string } => Boolean(value));
}

export function normalizeAzureModelsResponse(
  data: unknown,
  fallbackOwner = "azure-ai"
): Array<{ id: string; name: string; owned_by: string }> {
  const payload = asRecord(data);
  const items = Array.isArray(data)
    ? data
    : Array.isArray(payload.data)
      ? (payload.data as unknown[])
      : Array.isArray(payload.models)
        ? (payload.models as unknown[])
        : Array.isArray(payload.value)
          ? (payload.value as unknown[])
          : Array.isArray(payload.deployments)
            ? (payload.deployments as unknown[])
            : [];

  return items
    .map((value) => {
      const item = asRecord(value);
      const id =
        toNonEmptyString(item.id) ||
        toNonEmptyString(item.deployment_name) ||
        toNonEmptyString(item.deploymentName) ||
        toNonEmptyString(item.name) ||
        toNonEmptyString(item.model);
      if (!id) return null;
      const name =
        toNonEmptyString(item.display_name) ||
        toNonEmptyString(item.displayName) ||
        toNonEmptyString(item.name) ||
        id;
      const ownedBy =
        toNonEmptyString(item.owned_by) || toNonEmptyString(item.provider) || fallbackOwner;
      return { id, name, owned_by: ownedBy };
    })
    .filter((value): value is { id: string; name: string; owned_by: string } => Boolean(value));
}
