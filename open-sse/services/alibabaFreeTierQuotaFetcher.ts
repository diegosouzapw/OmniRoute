/**
 * @file alibabaFreeTierQuotaFetcher.ts
 * @description Fetch Alibaba Model Studio free-tier quota from the Bailian console API.
 *
 * DashScope inference keys cannot list free-tier eligibility. The console exposes
 * `zeldaEasy.bailian-commerce.freeTrial.queryFreeTierQuotaAsyn` with per-model
 * `freeTierOnly`, `quotaStatus`, and `quotaTotal` fields.
 *
 * Auth: browser session cookie (`login_aliyunid_ticket` or full Cookie header) stored
 * on the connection as `providerSpecificData.alibabaConsoleCookie`.
 *
 * Parsing/classification/eligibility-filtering logic lives in
 * `alibabaFreeTierQuotaClassify.ts` and shared types/primitives in
 * `alibabaFreeTierQuotaTypes.ts` (split out to stay under the file-size cap); this file
 * re-exports their public API so existing imports of this module keep working
 * unchanged, and owns the HTTP/console-fetch flow itself.
 *
 * @changes
 * - [2026-07-25] [Composer] - Merge built-in text free-tier allowlist into filter context
 * - [2026-07-25] [Composer] - Propagate shared free-tier eligibility across all Alibaba free connections
 * - [2026-07-25] [Composer] - Add multimodal and audio free-quota classification and console fetch paths
 * - [2026-07-25] [Composer] - Add vision/media free-quota classification for alibabafreevision
 * - [2026-07-25] [Composer] - Add console free-tier quota fetcher for Alibaba Model Studio
 * - [2026-07-25] [Composer] - Use shared toNumberOrNull instead of local coercion helper
 * - [2026-08-05] - Split classification/eligibility logic into alibabaFreeTierQuotaClassify.ts
 *   and alibabaFreeTierQuotaTypes.ts to stay under the file-size cap
 */

import { getAlibabaBillingMode, isAlibabaModelStudioProvider } from "./alibabaFreeTier.ts";
import {
  asRecord,
  getAlibabaFreeTierQuotaLastSyncAt,
  normalizeModelIdList,
  toTrimmedString,
  type AlibabaFreeTierQuotaEntry,
  type AlibabaFreeTierQuotaSnapshot,
} from "./alibabaFreeTierQuotaTypes.ts";
import {
  applyAlibabaSharedFreeTierEligibility,
  classifyAlibabaAudioFreeTierQuotaEntries,
  classifyAlibabaFreeTierQuotaEntries,
  classifyAlibabaMultimodalFreeTierQuotaEntries,
  classifyAlibabaVisionFreeTierQuotaEntries,
  extractAlibabaSharedFreeTierEligibility,
  parseAlibabaFreeTierQuotaEntries,
} from "./alibabaFreeTierQuotaClassify.ts";

// Re-export the shared types + the classification/eligibility public API so existing
// imports of this module (`from "./alibabaFreeTierQuotaFetcher.ts"`) keep working.
export type {
  AlibabaFreeTierQuotaEntry,
  AlibabaFreeTierQuotaClassification,
  AlibabaFreeTierQuotaSnapshot,
} from "./alibabaFreeTierQuotaTypes.ts";
export { getAlibabaFreeTierQuotaLastSyncAt, isAlibabaLiveQuotaSyncAt } from "./alibabaFreeTierQuotaTypes.ts";
export {
  isAlibabaQuotaValidityExpired,
  parseAlibabaFreeTierQuotaEntries,
  classifyAlibabaFreeTierQuotaEntry,
  classifyAlibabaVisionFreeTierQuotaEntry,
  classifyAlibabaVisionFreeTierQuotaEntries,
  classifyAlibabaMultimodalFreeTierQuotaEntries,
  classifyAlibabaAudioFreeTierQuotaEntries,
  classifyAlibabaFreeTierQuotaEntries,
  extractAlibabaSharedFreeTierEligibility,
  applyAlibabaSharedFreeTierEligibility,
  pickCanonicalAlibabaFreeTierConnection,
  buildAlibabaFreeVisionFilterContext,
  buildAlibabaFreeMultimodalFilterContext,
  buildAlibabaFreeAudioFilterContext,
  buildAlibabaFreeTierTextFilterContext,
  getAlibabaFreeTierVisionCapableModels,
  getAlibabaFreeTierVisionDrainedModels,
  getAlibabaNoFreeTierVisionModels,
  isAlibabaFreeTierVisionCapableModel,
  filterAlibabaFreeVisionEligibleModels,
  isAlibabaFreeTierMultimodalCapableModel,
  isAlibabaFreeTierAudioCapableModel,
  filterAlibabaFreeMultimodalEligibleModels,
  filterAlibabaFreeAudioEligibleModels,
  type AlibabaConnectionLike,
  type AlibabaFreeTierEligibilityFields,
} from "./alibabaFreeTierQuotaClassify.ts";

const FREE_TIER_QUOTA_API = "zeldaEasy.bailian-commerce.freeTrial.queryFreeTierQuotaAsyn";
const FREE_TIER_QUOTA_START_API = "zeldaEasy.bailian-commerce.freeTrial.queryFreeTierQuota";
const DEFAULT_TEXT_FE_PATH = "/costing-balance/free-quota";
const DEFAULT_VISION_FE_PATH =
  process.env.ALIBABA_FREE_TIER_VISION_FE_PATH?.trim() || "/costing-balance/free-quota-image-video";
const DEFAULT_MULTIMODAL_FE_PATH =
  process.env.ALIBABA_FREE_TIER_MULTIMODAL_FE_PATH?.trim() ||
  "/costing-balance/free-quota-multimodal";
const DEFAULT_AUDIO_FE_PATH =
  process.env.ALIBABA_FREE_TIER_AUDIO_FE_PATH?.trim() || "/costing-balance/free-quota-audio";

const CONSOLE_GATEWAYS = {
  "global-sg": {
    host: "https://bailian-singapore-cs.alibabacloud.com",
    region: "ap-southeast-1",
    action: "IntlBroadScopeAspnGateway",
    product: "sfm_bailian",
  },
  "china-beijing": {
    host: "https://bailian.console.aliyun.com",
    region: "cn-beijing",
    action: "BroadScopeAspnGateway",
    product: "sfm_bailian",
  },
} as const;

type AlibabaProviderRegion = keyof typeof CONSOLE_GATEWAYS;

function resolveAlibabaConsoleRegion(
  providerSpecificData: Record<string, unknown> | null | undefined
): AlibabaProviderRegion {
  const region = toTrimmedString(asRecord(providerSpecificData).region);
  return region === "china-beijing" ? "china-beijing" : "global-sg";
}

export function normalizeAlibabaConsoleCookie(raw: unknown): string | null {
  const value = toTrimmedString(raw);
  if (!value) return null;

  if (/login_aliyunid_ticket=/i.test(value) || value.includes(";")) {
    return value;
  }

  return `login_aliyunid_ticket=${value}`;
}

export function getAlibabaConsoleCookie(
  providerSpecificData: Record<string, unknown> | null | undefined
): string | null {
  const psd = asRecord(providerSpecificData);
  return (
    normalizeAlibabaConsoleCookie(psd.alibabaConsoleCookie) ||
    normalizeAlibabaConsoleCookie(psd.cookie) ||
    null
  );
}

export function getAlibabaConsoleSecToken(
  providerSpecificData: Record<string, unknown> | null | undefined
): string | null {
  return toTrimmedString(asRecord(providerSpecificData).alibabaConsoleSecToken);
}

export function hasAlibabaConsoleFreeTierAuth(
  providerSpecificData: Record<string, unknown> | null | undefined
): boolean {
  return getAlibabaConsoleCookie(providerSpecificData) !== null;
}

export function mergeAlibabaFreeTierQuotaClassification(
  providerSpecificData: Record<string, unknown> | null | undefined,
  snapshot: AlibabaFreeTierQuotaSnapshot
): Record<string, unknown> {
  const base = asRecord(providerSpecificData);

  const coalesceList = (snapshotList: readonly string[], existingKey: string): string[] =>
    snapshotList.length > 0 ? [...snapshotList] : normalizeModelIdList(base[existingKey]);

  return {
    ...base,
    alibabaFreeTierCapableModels: coalesceList(
      snapshot.text.capableModels,
      "alibabaFreeTierCapableModels"
    ),
    alibabaNoFreeTierModels: coalesceList(
      snapshot.text.noFreeTierModels,
      "alibabaNoFreeTierModels"
    ),
    alibabaFreeDrainedModels: coalesceList(snapshot.text.drainedModels, "alibabaFreeDrainedModels"),
    alibabaFreeTierVisionCapableModels: coalesceList(
      snapshot.vision.capableModels,
      "alibabaFreeTierVisionCapableModels"
    ),
    alibabaNoFreeTierVisionModels: coalesceList(
      snapshot.vision.noFreeTierModels,
      "alibabaNoFreeTierVisionModels"
    ),
    alibabaFreeTierVisionDrainedModels: coalesceList(
      snapshot.vision.drainedModels,
      "alibabaFreeTierVisionDrainedModels"
    ),
    alibabaFreeTierMultimodalCapableModels: coalesceList(
      snapshot.multimodal.capableModels,
      "alibabaFreeTierMultimodalCapableModels"
    ),
    alibabaNoFreeTierMultimodalModels: coalesceList(
      snapshot.multimodal.noFreeTierModels,
      "alibabaNoFreeTierMultimodalModels"
    ),
    alibabaFreeTierMultimodalDrainedModels: coalesceList(
      snapshot.multimodal.drainedModels,
      "alibabaFreeTierMultimodalDrainedModels"
    ),
    alibabaFreeTierAudioCapableModels: coalesceList(
      snapshot.audio.capableModels,
      "alibabaFreeTierAudioCapableModels"
    ),
    alibabaNoFreeTierAudioModels: coalesceList(
      snapshot.audio.noFreeTierModels,
      "alibabaNoFreeTierAudioModels"
    ),
    alibabaFreeTierAudioDrainedModels: coalesceList(
      snapshot.audio.drainedModels,
      "alibabaFreeTierAudioDrainedModels"
    ),
    alibabaFreeTierQuotaEntries: snapshot.entries,
    alibabaFreeTierVisionQuotaEntries: snapshot.vision.entries,
    alibabaFreeTierMultimodalQuotaEntries: snapshot.multimodal.entries,
    alibabaFreeTierAudioQuotaEntries: snapshot.audio.entries,
    alibabaFreeTierQuotaLastSyncAt: new Date().toISOString(),
    alibabaFreeTierDiscoverySource: "console-quota-api",
  };
}

export async function propagateAlibabaFreeTierEligibilityToSiblings(
  provider: string,
  sourceConnectionId: string,
  mergedPsd: Record<string, unknown>
): Promise<void> {
  const shared = extractAlibabaSharedFreeTierEligibility(mergedPsd);
  if (!shared.alibabaFreeTierQuotaLastSyncAt) return;

  const { getProviderConnections, updateProviderConnection } =
    await import("../../src/lib/db/providers.ts");
  const connections = await getProviderConnections({ provider });

  for (const connection of connections) {
    if (connection.id === sourceConnectionId) continue;
    const psd = connection.providerSpecificData as Record<string, unknown> | null | undefined;
    if (getAlibabaBillingMode(psd) !== "free") continue;

    const updated = applyAlibabaSharedFreeTierEligibility(
      asRecord(connection.providerSpecificData),
      shared
    );
    await updateProviderConnection(connection.id as string, { providerSpecificData: updated });
  }
}

function buildGatewayUrl(region: AlibabaProviderRegion, api: string): string {
  const gateway = CONSOLE_GATEWAYS[region];
  const params = new URLSearchParams({
    action: gateway.action,
    product: gateway.product,
    api,
    _v: "undefined",
  });
  return `${gateway.host}/data/api.json?${params.toString()}`;
}

function buildCornerstoneParam(
  region: AlibabaProviderRegion,
  fePath: string = DEFAULT_TEXT_FE_PATH
): Record<string, unknown> {
  const gateway = CONSOLE_GATEWAYS[region];
  const normalizedPath = fePath.startsWith("/") ? fePath : `/${fePath}`;
  return {
    feTraceId: crypto.randomUUID(),
    feURL: `https://modelstudio.console.alibabacloud.com/${gateway.region}?tab=costing-balance#${normalizedPath}`,
    protocol: "V2",
    console: "ONE_CONSOLE",
    productCode: "p_efm",
    switchAgent: 416572,
    switchUserType: 3,
    domain: "modelstudio.console.alibabacloud.com",
    consoleSite: "MODELSTUDIO_ALBABACLOUD",
    userNickName: "",
    userPrincipalName: "",
    xsp_lang: "en-US",
  };
}

function buildRequestBody(
  region: AlibabaProviderRegion,
  api: string,
  taskId?: string | null,
  fePath: string = DEFAULT_TEXT_FE_PATH
): URLSearchParams {
  const gateway = CONSOLE_GATEWAYS[region];
  const request: Record<string, unknown> = {};
  if (taskId) {
    request.queryFreeTierQuotaRequest = { taskId };
  } else {
    request.queryFreeTierQuotaRequest = {};
  }
  request.cornerstoneParam = buildCornerstoneParam(region, fePath);

  const body = new URLSearchParams({
    params: JSON.stringify({
      Api: api,
      V: "1.0",
      Data: request,
    }),
    region: gateway.region,
  });

  return body;
}

async function postConsoleFreeTierQuota(
  region: AlibabaProviderRegion,
  api: string,
  cookie: string,
  secToken: string | null,
  taskId?: string | null,
  fePath: string = DEFAULT_TEXT_FE_PATH
): Promise<unknown> {
  const body = buildRequestBody(region, api, taskId, fePath);
  if (secToken) {
    body.set("sec_token", secToken);
  }

  const response = await fetch(buildGatewayUrl(region, api), {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: cookie,
      Origin: "https://modelstudio.console.alibabacloud.com",
      Referer: "https://modelstudio.console.alibabacloud.com/",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36",
    },
    body: body.toString(),
    signal: AbortSignal.timeout(15_000),
  });

  return response.json();
}

function extractTaskId(payload: unknown): string | null {
  const root = asRecord(payload);
  const dataV2 = asRecord(asRecord(root.data).DataV2 ?? root.DataV2);
  const inner = asRecord(dataV2.data);
  const payloadData = asRecord(inner.data ?? inner);
  return toTrimmedString(payloadData.taskId);
}

function hasQuotaPayload(payload: unknown): boolean {
  return parseAlibabaFreeTierQuotaEntries(payload).length > 0;
}

async function delay(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchAlibabaFreeTierQuotaEntriesForPath(
  providerSpecificData: Record<string, unknown> | null | undefined,
  fePath: string
): Promise<AlibabaFreeTierQuotaEntry[] | null> {
  const cookie = getAlibabaConsoleCookie(providerSpecificData);
  if (!cookie) return null;

  const region = resolveAlibabaConsoleRegion(providerSpecificData);
  const secToken = getAlibabaConsoleSecToken(providerSpecificData);

  let payload = await postConsoleFreeTierQuota(
    region,
    FREE_TIER_QUOTA_START_API,
    cookie,
    secToken,
    null,
    fePath
  );

  if (!hasQuotaPayload(payload)) {
    payload = await postConsoleFreeTierQuota(
      region,
      FREE_TIER_QUOTA_API,
      cookie,
      secToken,
      null,
      fePath
    );
  }

  if (!hasQuotaPayload(payload)) {
    const taskId = extractTaskId(payload);
    if (!taskId) return null;

    for (let attempt = 0; attempt < 8; attempt += 1) {
      if (attempt > 0) {
        await delay(400);
      }
      payload = await postConsoleFreeTierQuota(
        region,
        FREE_TIER_QUOTA_API,
        cookie,
        secToken,
        taskId,
        fePath
      );
      if (hasQuotaPayload(payload)) break;
    }
  }

  const entries = parseAlibabaFreeTierQuotaEntries(payload);
  return entries.length > 0 ? entries : null;
}

export async function fetchAlibabaFreeTierQuotaEntries(
  providerSpecificData: Record<string, unknown> | null | undefined
): Promise<AlibabaFreeTierQuotaEntry[] | null> {
  return fetchAlibabaFreeTierQuotaEntriesForPath(providerSpecificData, DEFAULT_TEXT_FE_PATH);
}

export async function fetchAlibabaFreeTierVisionQuotaEntries(
  providerSpecificData: Record<string, unknown> | null | undefined
): Promise<AlibabaFreeTierQuotaEntry[] | null> {
  return fetchAlibabaFreeTierQuotaEntriesForPath(providerSpecificData, DEFAULT_VISION_FE_PATH);
}

export async function fetchAlibabaFreeTierMultimodalQuotaEntries(
  providerSpecificData: Record<string, unknown> | null | undefined
): Promise<AlibabaFreeTierQuotaEntry[] | null> {
  return fetchAlibabaFreeTierQuotaEntriesForPath(providerSpecificData, DEFAULT_MULTIMODAL_FE_PATH);
}

export async function fetchAlibabaFreeTierAudioQuotaEntries(
  providerSpecificData: Record<string, unknown> | null | undefined
): Promise<AlibabaFreeTierQuotaEntry[] | null> {
  return fetchAlibabaFreeTierQuotaEntriesForPath(providerSpecificData, DEFAULT_AUDIO_FE_PATH);
}

function mergeUniqueQuotaEntries(
  ...entryGroups: Array<readonly AlibabaFreeTierQuotaEntry[]>
): AlibabaFreeTierQuotaEntry[] {
  const merged: AlibabaFreeTierQuotaEntry[] = [];
  const seen = new Set<string>();
  for (const group of entryGroups) {
    for (const entry of group) {
      if (seen.has(entry.model)) continue;
      seen.add(entry.model);
      merged.push(entry);
    }
  }
  return merged;
}

export async function buildAlibabaFreeTierQuotaSnapshot(
  providerSpecificData: Record<string, unknown> | null | undefined
): Promise<AlibabaFreeTierQuotaSnapshot | null> {
  const textEntries = await fetchAlibabaFreeTierQuotaEntries(providerSpecificData);
  if (!textEntries) return null;

  const visionEntries =
    (await fetchAlibabaFreeTierVisionQuotaEntries(providerSpecificData)) || textEntries;
  const multimodalEntries =
    (await fetchAlibabaFreeTierMultimodalQuotaEntries(providerSpecificData)) || textEntries;
  const audioEntries =
    (await fetchAlibabaFreeTierAudioQuotaEntries(providerSpecificData)) || textEntries;

  const text = classifyAlibabaFreeTierQuotaEntries(textEntries, { textOnly: true });
  const vision = classifyAlibabaVisionFreeTierQuotaEntries(visionEntries);
  const multimodal = classifyAlibabaMultimodalFreeTierQuotaEntries(multimodalEntries);
  const audio = classifyAlibabaAudioFreeTierQuotaEntries(audioEntries);

  return {
    text,
    vision,
    multimodal,
    audio,
    entries: mergeUniqueQuotaEntries(textEntries, visionEntries, multimodalEntries, audioEntries),
  };
}

export async function refreshAlibabaFreeTierQuotaClassification(
  provider: string,
  providerSpecificData: Record<string, unknown> | null | undefined
): Promise<Record<string, unknown> | null> {
  if (
    !isAlibabaModelStudioProvider(provider) ||
    getAlibabaBillingMode(providerSpecificData) !== "free"
  ) {
    return null;
  }
  if (!hasAlibabaConsoleFreeTierAuth(providerSpecificData)) {
    return null;
  }

  const snapshot = await buildAlibabaFreeTierQuotaSnapshot(providerSpecificData);
  if (!snapshot) return null;

  return mergeAlibabaFreeTierQuotaClassification(providerSpecificData, snapshot);
}

type QuotaConnection = {
  id: string;
  providerSpecificData?: Record<string, unknown> | null;
};

export function scheduleAlibabaFreeTierQuotaRefresh(
  provider: string,
  connection: QuotaConnection
): void {
  if (!hasAlibabaConsoleFreeTierAuth(connection.providerSpecificData)) return;

  void (async () => {
    try {
      const merged = await refreshAlibabaFreeTierQuotaClassification(
        provider,
        connection.providerSpecificData
      );
      if (!merged) return;
      const { updateProviderConnection } = await import("../../src/lib/db/providers.ts");
      await updateProviderConnection(connection.id, { providerSpecificData: merged });
      await propagateAlibabaFreeTierEligibilityToSiblings(provider, connection.id, merged);
    } catch (error) {
      console.warn("[alibaba-free-tier] console quota refresh failed", {
        connectionId: connection.id,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  })();
}
