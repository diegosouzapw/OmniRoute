/**
 * MaxAI model discovery — live model list + per-model context windows from the
 * web app's own `/models/get_config` endpoint (the signed call the app makes on
 * load). Feeds OmniRoute's model-discovery pipeline so the MaxAI catalog and its
 * per-model context windows self-update instead of relying only on the static
 * catalog (`open-sse/executors/maxai/catalog.ts`).
 *
 * The response's `chat_models[]` carries `model_name` (id), `ui_display_name`,
 * `group`, `max_tokens` (the per-model context window), `is_deprecated`, and a
 * `capabilities` block ({ vision, thinking_mode, artifacts, file_upload }). We
 * map each non-deprecated chat model to a discovery record whose `inputTokenLimit`
 * is `max_tokens`, so `persistDiscoveredModels` → `syncedAvailableModels` →
 * `contextWindowResolver` reconciles the real window as an `auto:discovery`
 * override.
 *
 * Signed + residential like every MaxAI call (see ./maxai/signing.ts). Never
 * throws for the caller's convenience is NOT the contract here — the route wraps
 * it in try/catch and falls back to the curated catalog — but it validates HTTP
 * status and shape and throws a sanitized error on failure so the route logs it.
 */
import { resolveMaxaiCredential } from "../executors/maxai/credentials.ts";
import { buildMaxaiSignedHeaders } from "../executors/maxai/signing.ts";
import { ensureMaxaiConstants } from "../executors/maxai/constantsStore.ts";
import {
  maxaiStaticHeaders,
  MAXAI_BASE_URL,
  MAXAI_MODELS_CONFIG_PATH,
} from "../executors/maxai/protocol.ts";
import { maxaiContextWindow, MAXAI_MODELS } from "../executors/maxai/catalog.ts";

// Re-export the registry-shaped catalog through this service so `src/app` routes
// can consume it WITHOUT importing the executor directly (the no-restricted-imports
// rule: "executor implementations must stay behind an open-sse handler or service
// boundary"). This service IS that boundary, and already owns the catalog import.
export { MAXAI_REGISTRY_MODELS } from "../executors/maxai/catalog.ts";

/** A discovered MaxAI model in the shape persistDiscoveredModels normalizes. */
export interface MaxaiDiscoveredModel {
  id: string;
  name: string;
  /** Per-model context window (chars→tokens handled upstream); the reconciler key. */
  inputTokenLimit: number;
  group?: string;
  supportsReasoning?: boolean;
  supportsVision?: boolean;
  toolCalling: boolean;
}

export interface MaxaiModelDiscoveryInput {
  /** Connection credential material (from providerSpecificData + apiKey). */
  providerSpecificData: Record<string, unknown> | null | undefined;
  accessToken?: string | null;
  signal?: AbortSignal | null;
  /** Injectable fetch (the route passes a proxy/guard-wrapped safeOutboundFetch). */
  fetchImpl?: typeof fetch;
}

export interface MaxaiModelDiscoveryResult {
  models: MaxaiDiscoveredModel[];
  warning?: string;
}

/** The curated paid-model id set — only these are surfaced (quality gate). */
const CURATED_IDS = new Set(MAXAI_MODELS.map((m) => m.id));

interface RawChatModel {
  model_name?: unknown;
  ui_display_name?: unknown;
  type?: unknown;
  group?: unknown;
  max_tokens?: unknown;
  is_deprecated?: unknown;
  capabilities?: {
    vision?: unknown;
    thinking_mode?: unknown;
  } | null;
}

/** Map one raw chat model to a discovery record, or null when it should be dropped. */
function toDiscovered(raw: RawChatModel): MaxaiDiscoveredModel | null {
  const id = typeof raw.model_name === "string" ? raw.model_name : "";
  if (!id) return null;
  if (raw.is_deprecated === true) return null;
  if (raw.type !== undefined && raw.type !== "chat") return null;
  // Quality gate: only surface the curated paid models (the ones catalog.ts offers).
  if (!CURATED_IDS.has(id)) return null;

  const liveWindow =
    typeof raw.max_tokens === "number" && Number.isFinite(raw.max_tokens) && raw.max_tokens > 0
      ? Math.trunc(raw.max_tokens)
      : maxaiContextWindow(id); // fall back to the static catalog window

  const caps = raw.capabilities ?? {};
  return {
    id,
    name: typeof raw.ui_display_name === "string" ? raw.ui_display_name : id,
    inputTokenLimit: liveWindow,
    group: typeof raw.group === "string" ? raw.group : undefined,
    supportsReasoning: caps.thinking_mode === true || undefined,
    supportsVision: caps.vision === true || undefined,
    toolCalling: true, // prompted tool-calling (see maxai.ts + webTools.ts)
  };
}

/**
 * Fetch MaxAI's live model catalog + per-model context windows. Throws a
 * sanitized Error on auth/transport/shape failure (the route catches and falls
 * back to the curated static catalog).
 */
export async function discoverMaxaiModels(
  input: MaxaiModelDiscoveryInput
): Promise<MaxaiModelDiscoveryResult> {
  const doFetch = input.fetchImpl ?? fetch;
  const cred = resolveMaxaiCredential(input.providerSpecificData, input.accessToken);
  if (!cred) {
    throw new Error("MaxAI connection is not configured (missing token/device/user id).");
  }

  const path = MAXAI_MODELS_CONFIG_PATH;
  const constants = await ensureMaxaiConstants({ fetchImpl: doFetch, signal: input.signal });
  if (!constants) {
    throw new Error("MaxAI signing constants unavailable (extraction failed).");
  }
  const res = await doFetch(MAXAI_BASE_URL + path, {
    method: "POST",
    headers: {
      ...maxaiStaticHeaders(),
      ...buildMaxaiSignedHeaders({ path, userId: cred.userId, deviceId: cred.deviceId }, constants),
      Authorization: `Bearer ${cred.accessToken}`,
    },
    body: "{}",
    signal: input.signal ?? undefined,
  });

  if (res.status !== 200) {
    const detail = await res.text().catch(() => "");
    throw new Error(`MaxAI /models/get_config ${res.status}: ${detail.slice(0, 160)}`);
  }

  let parsed: { data?: { chat_models?: unknown }; chat_models?: unknown };
  try {
    parsed = (await res.json()) as typeof parsed;
  } catch {
    throw new Error("MaxAI /models/get_config returned unparseable JSON.");
  }

  const data = parsed?.data ?? parsed;
  const chatModels = (data as { chat_models?: unknown })?.chat_models;
  if (!Array.isArray(chatModels)) {
    throw new Error("MaxAI /models/get_config had no chat_models array.");
  }

  const models: MaxaiDiscoveredModel[] = [];
  for (const raw of chatModels as RawChatModel[]) {
    const mapped = toDiscovered(raw);
    if (mapped) models.push(mapped);
  }

  if (models.length === 0) {
    throw new Error("MaxAI /models/get_config yielded no usable curated models.");
  }

  // Note when the live list dropped a curated model (e.g. MaxAI deprecated it).
  const liveIds = new Set(models.map((m) => m.id));
  const missing = [...CURATED_IDS].filter((id) => !liveIds.has(id));
  const warning =
    missing.length > 0
      ? `MaxAI no longer offers ${missing.length} curated model(s): ${missing.join(", ")}`
      : undefined;

  return { models, warning };
}
