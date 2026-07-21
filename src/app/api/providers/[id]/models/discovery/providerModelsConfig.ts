import { getAntigravityModelsDiscoveryUrls } from "@omniroute/open-sse/config/antigravityUpstream.ts";
import {
  GROK_BUILD_DEFAULT_CONTEXT_WINDOW,
  getGrokBuildModelsHeaders,
  GROK_BUILD_MODELS_URL,
} from "@omniroute/open-sse/config/grokBuild.ts";
import { getAntigravityHeaders } from "@omniroute/open-sse/services/antigravityHeaders.ts";
import { parseGeminiModelsList } from "@/lib/providerModels/geminiModelsParser";
import { filterClinepassModels } from "@omniroute/open-sse/services/clinepassModels.ts";
import { buildClaudeCodeCompatibleHeaders } from "@omniroute/open-sse/services/claudeCodeCompatible.ts";
import {
  buildKimiCodeIdentityHeaders,
  getKimiCodeCliUserAgent,
  KIMI_CODING_MODELS_URL,
} from "@omniroute/open-sse/config/providers/registry/kimi/coding/runtime.ts";
import { ALIBABA_MODEL_STUDIO_MODELS } from "@omniroute/open-sse/config/providers/registry/alibaba/index.ts";
import { QWEN_CLOUD_TEXT_MODELS } from "@omniroute/open-sse/config/providers/registry/qwen-cloud/index.ts";
import { extractZaiToken } from "@omniroute/open-sse/executors/zai-web.ts";
import { normalizeOpenAiLikeModelsResponse } from "./normalizers";

const DASHSCOPE_TEXT_MODEL_PREFIXES = [
  "qwen",
  "qwq-",
  "deepseek-",
  "glm-",
  "kimi-",
  "minimax-",
] as const;

// DashScope's OpenAI-compatible /models response contains only the standard
// id/object/owned_by fields for Alibaba and Qwen Cloud, so there is no upstream
// modality field to filter on. Keep known text-generation families and reject IDs
// whose tokenized names identify media, speech, embedding, reranking, or vision-only lines.
const DASHSCOPE_NON_TEXT_MODEL_TOKEN =
  /(?:^|[-_.\/])(?:asr|audio|captioner|embedding|image|livetranslate|omni|ocr|realtime|rerank|s2s|speech|tts|video|vl)(?:$|[-_.\/])/i;
const QWEN_CLOUD_TEXT_MODEL_IDS = new Set(QWEN_CLOUD_TEXT_MODELS.map((model) => model.id));
const ALIBABA_MODEL_STUDIO_MODEL_IDS = new Set(
  ALIBABA_MODEL_STUDIO_MODELS.map((model) => model.id)
);

export function isDashscopeTextModelId(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const modelId = value.trim().toLowerCase();
  if (!modelId || DASHSCOPE_NON_TEXT_MODEL_TOKEN.test(modelId)) return false;
  return DASHSCOPE_TEXT_MODEL_PREFIXES.some((prefix) => modelId.startsWith(prefix));
}

export function parseDashscopeTextModels(data: any): any[] {
  const models = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.models)
      ? data.models
      : [];
  return models.filter((model: any) => isDashscopeTextModelId(model?.id));
}

function parseCuratedDashscopeModels(
  data: any,
  catalogModels: typeof ALIBABA_MODEL_STUDIO_MODELS,
  allowedModelIds: ReadonlySet<string>
): any[] {
  const liveModelsById = new Map(
    parseDashscopeTextModels(data)
      .filter((model: any) => allowedModelIds.has(model.id))
      .map((model: any) => [model.id, model])
  );
  return catalogModels.flatMap((catalogModel) => {
    const liveModel = liveModelsById.get(catalogModel.id);
    return liveModel ? [liveModel] : [];
  });
}

export function parseAlibabaModelStudioModels(data: any): any[] {
  return parseCuratedDashscopeModels(
    data,
    ALIBABA_MODEL_STUDIO_MODELS,
    ALIBABA_MODEL_STUDIO_MODEL_IDS
  );
}

export function parseQwenCloudTextModels(data: any): any[] {
  return parseCuratedDashscopeModels(data, QWEN_CLOUD_TEXT_MODELS, QWEN_CLOUD_TEXT_MODEL_IDS);
}
type ProviderModelsHeaderContext = {
  authType?: string;
  providerSpecificData?: unknown;
  email?: string | null;
};

export type ProviderModelsConfigEntry = {
  url: string;
  method: "GET" | "POST";
  headers: Record<string, string>;
  authHeader?: string;
  authPrefix?: string;
  authQuery?: string;
  body?: unknown;
  buildHeaders?: (
    token: string,
    connection?: ProviderModelsHeaderContext
  ) => Record<string, string>;
  parseResponse: (data: any) => any;
};

const DASHSCOPE_TEXT_MODELS_CONFIG: ProviderModelsConfigEntry = {
  url: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/models",
  method: "GET",
  headers: { "Content-Type": "application/json" },
  authHeader: "Authorization",
  authPrefix: "Bearer ",
  parseResponse: parseDashscopeTextModels,
};

const ALIBABA_MODEL_STUDIO_MODELS_CONFIG: ProviderModelsConfigEntry = {
  ...DASHSCOPE_TEXT_MODELS_CONFIG,
  parseResponse: parseAlibabaModelStudioModels,
};

const QWEN_CLOUD_TEXT_MODELS_CONFIG: ProviderModelsConfigEntry = {
  ...DASHSCOPE_TEXT_MODELS_CONFIG,
  parseResponse: parseQwenCloudTextModels,
};

function getKimiThinkingType(model: any): "only" | "both" | "no" | undefined {
  return model.supports_thinking_type === "only" ||
    model.supports_thinking_type === "both" ||
    model.supports_thinking_type === "no"
    ? model.supports_thinking_type
    : undefined;
}

function getKimiThinkingEfforts(model: any): {
  supportedThinkingEfforts?: string[];
  defaultThinkingEffort?: string;
} {
  const efforts = model.think_efforts;
  const supportedThinkingEfforts =
    efforts?.support === true && Array.isArray(efforts.valid_efforts)
      ? efforts.valid_efforts.filter(
          (effort: unknown): effort is string => typeof effort === "string" && effort.length > 0
        )
      : undefined;
  const defaultThinkingEffort =
    efforts?.support === true && typeof efforts.default_effort === "string"
      ? efforts.default_effort
      : undefined;
  return { supportedThinkingEfforts, defaultThinkingEffort };
}

function normalizeKimiCodingModel(model: any): any {
  const thinkingType = getKimiThinkingType(model);
  const supportsThinking = thinkingType ? thinkingType !== "no" : model.supports_reasoning === true;
  const { supportedThinkingEfforts, defaultThinkingEffort } = getKimiThinkingEfforts(model);
  const isAnthropic = model.protocol === "anthropic";
  const normalized: any = {
    id: model.id,
    name:
      typeof model.display_name === "string" && model.display_name.length > 0
        ? model.display_name
        : model.id,
    owned_by: "kimi-code",
    targetFormat: isAnthropic ? "claude" : "openai",
    upstreamProtocol: isAnthropic ? "anthropic" : "kimi",
    supportsThinking,
    supportsVision: model.supports_image_in === true,
    supportsVideo: model.supports_video_in === true,
    supportsTools: model.supports_tool_use !== false,
  };

  if (typeof model.context_length === "number") normalized.context_length = model.context_length;
  if (thinkingType === "only") normalized.alwaysThinking = true;
  if (supportedThinkingEfforts?.length) {
    normalized.supportedThinkingEfforts = supportedThinkingEfforts;
  }
  if (defaultThinkingEffort) normalized.defaultThinkingEffort = defaultThinkingEffort;
  return normalized;
}

export function parseKimiCodingModels(data: any): any[] {
  const models = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.models)
      ? data.models
      : [];

  return models
    .filter((model: any) => typeof model?.id === "string" && model.id.length > 0)
    .map(normalizeKimiCodingModel);
}

type GrokBuildModelRecord = Record<string, unknown>;

function asGrokBuildRecord(value: unknown): GrokBuildModelRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as GrokBuildModelRecord)
    : {};
}

function grokBuildString(...values: unknown[]): string | undefined {
  return values
    .find((value): value is string => typeof value === "string" && value.trim().length > 0)
    ?.trim();
}

function grokBuildPositiveNumber(...values: unknown[]): number | undefined {
  return values.find(
    (value): value is number => typeof value === "number" && Number.isFinite(value) && value > 0
  );
}

function getGrokBuildModelItems(data: unknown): unknown[] {
  const envelope = asGrokBuildRecord(data);
  if (Array.isArray(data)) return data;
  if (Array.isArray(envelope.data)) return envelope.data;
  return Array.isArray(envelope.models) ? envelope.models : [];
}

function hasGrokBuildReasoning(model: GrokBuildModelRecord, metadata: GrokBuildModelRecord) {
  const flags = [
    model.supportsReasoningEffort,
    model.supports_reasoning_effort,
    metadata.supportsReasoningEffort,
    metadata.supports_reasoning_effort,
  ];
  const effortLists = [
    model.reasoningEfforts,
    model.reasoning_efforts,
    metadata.reasoningEfforts,
    metadata.reasoning_efforts,
  ];
  return (
    flags.some((value) => value === true) ||
    grokBuildString(
      model.reasoningEffort,
      model.reasoning_effort,
      metadata.reasoningEffort,
      metadata.reasoning_effort
    ) !== undefined ||
    effortLists.some((value) => Array.isArray(value) && value.length > 0)
  );
}

function normalizeGrokBuildModel(value: unknown): GrokBuildModelRecord | null {
  const model = asGrokBuildRecord(value);
  const metadata = asGrokBuildRecord(model._meta);
  const catalogId = grokBuildString(model.id);
  const id = grokBuildString(
    model.model,
    model.modelId,
    catalogId,
    metadata.model,
    metadata.modelId
  );
  const hidden = model.hidden === true || metadata.hidden === true;
  // grok-cli always uses OAuth session auth. Official Grok Build visibility
  // keeps supported_in_api=false models available to session users and only
  // hides them from API-key users.
  if (!id || hidden) return null;

  const backend = grokBuildString(
    model.apiBackend,
    model.api_backend,
    metadata.apiBackend,
    metadata.api_backend
  );
  // This provider currently executes against /v1/responses. Grok Build can
  // advertise chat_completions or messages backends too, but exposing those
  // here would route their request shape to the wrong upstream endpoint.
  if (backend !== "responses") return null;

  const inputTokenLimit =
    grokBuildPositiveNumber(
      model.contextWindow,
      model.context_window,
      metadata.contextWindow,
      metadata.totalContextTokens
    ) || GROK_BUILD_DEFAULT_CONTEXT_WINDOW;
  const outputTokenLimit = grokBuildPositiveNumber(
    model.maxCompletionTokens,
    model.max_completion_tokens
  );
  const description = grokBuildString(model.description);

  return {
    id,
    name: grokBuildString(model.name, id) || id,
    owned_by: "grok-cli",
    ...(description ? { description } : {}),
    inputTokenLimit,
    ...(outputTokenLimit ? { outputTokenLimit } : {}),
    ...(hasGrokBuildReasoning(model, metadata) ? { supportsThinking: true } : {}),
    apiFormat: "responses",
    supportedEndpoints: ["responses"],
  };
}

function parseGrokBuildModels(data: unknown): GrokBuildModelRecord[] {
  return getGrokBuildModelItems(data)
    .map(normalizeGrokBuildModel)
    .filter((model): model is GrokBuildModelRecord => model !== null);
}

const KIMI_CODING_MODELS_CONFIG: ProviderModelsConfigEntry = {
  url: KIMI_CODING_MODELS_URL,
  method: "GET",
  headers: { Accept: "application/json" },
  buildHeaders: (token, connection) => {
    if (connection?.authType === "apikey" || connection?.authType === "api_key") {
      return {
        Accept: "application/json",
        "x-api-key": token,
      };
    }

    return {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "User-Agent": getKimiCodeCliUserAgent(),
      ...buildKimiCodeIdentityHeaders(connection?.providerSpecificData || {}),
    };
  },
  parseResponse: parseKimiCodingModels,
};

// Provider models endpoints configuration
export const PROVIDER_MODELS_CONFIG: Record<string, ProviderModelsConfigEntry> = {
  alibaba: ALIBABA_MODEL_STUDIO_MODELS_CONFIG,
  "alibaba-cn": ALIBABA_MODEL_STUDIO_MODELS_CONFIG,
  claude: {
    url: "https://api.anthropic.com/v1/models",
    method: "GET",
    headers: {
      "Anthropic-Version": "2023-06-01",
      "Content-Type": "application/json",
    },
    authHeader: "x-api-key",
    parseResponse: (data) => data.data || [],
  },
  gemini: {
    url: "https://generativelanguage.googleapis.com/v1beta/models?pageSize=1000",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authQuery: "key", // Use query param for API key
    parseResponse: (data) => parseGeminiModelsList(data),
  },
  huggingface: {
    url: "https://router.huggingface.co/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => normalizeOpenAiLikeModelsResponse(data, "huggingface"),
  },
  // #3931: qwen-web (cookie provider) was missing here, so its discovery page
  // showed nothing.
  // `chat.qwen.ai/api/v2/models/` is public (no auth header configured/sent);
  // shape `{ data: { data: [{ id, name, owned_by }] } }`, flatter `{ data: [] }` fallback.
  "qwen-web": {
    url: "https://chat.qwen.ai/api/v2/models/",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    parseResponse: (data) => {
      const innerData = data?.data?.data || data?.data || [];
      return (Array.isArray(innerData) ? innerData : [])
        .map((item: any) => ({
          id: item.id || item.name,
          name: item.name || item.id,
          owned_by: item.owned_by || "qwen",
        }))
        .filter((m: any) => m.id);
    },
  },
  "qwen-cloud": QWEN_CLOUD_TEXT_MODELS_CONFIG,
  // #7678: zai-web (chat.z.ai) had no PROVIDER_MODELS_CONFIG entry so its
  // hardcoded 3-model registry catalog (glm-4.6/glm-4.5/glm-4.5v — one or more
  // now 404 upstream) was the only source; wire live discovery against the
  // undocumented chat.z.ai/api/models endpoint. Same category + shape as
  // qwen-web above: undocumented consumer web-chat endpoint,
  // { data: { data: [...] } } envelope with a flatter { data: [...] } fallback.
  // Bearer token reuses the executor's own extractZaiToken() so discovery and
  // chat parse the stored cookie identically.
  // UNVERIFIED (per /triage-features): no live z.ai session available during
  // research — the exact response shape and whether bare Bearer auth (vs the
  // full Cookie header chat-completions requires) is accepted must be
  // confirmed against a real account before merge (see plan-file Step 4).
  "zai-web": {
    url: "https://chat.z.ai/api/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    buildHeaders: (token) => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${extractZaiToken(token)}`,
    }),
    parseResponse: (data) => {
      const innerData = data?.data?.data || data?.data || [];
      return (Array.isArray(innerData) ? innerData : [])
        .map((item: any) => ({
          id: item.id || item.name,
          name: item.name || item.id,
          owned_by: item.owned_by || "zai-web",
        }))
        .filter((m: any) => m.id);
    },
  },
  antigravity: {
    url: getAntigravityModelsDiscoveryUrls()[0],
    method: "POST",
    headers: getAntigravityHeaders("models"),
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    body: {},
    parseResponse: (data) => data.models || [],
  },
  // #7016: AgentRouter rejects /v1/models unless the request carries the same
  // Claude Code wire image the chat path uses (it adopts the dynamic CC wire
  // image while keeping its own x-api-key auth — see #6056). Without these
  // headers the gateway WAF 4xx's the request and model import silently falls
  // back to the local catalog ("API unavailable — using local catalog").
  agentrouter: {
    url: "https://agentrouter.org/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    buildHeaders: (token: string) => {
      const wire = buildClaudeCodeCompatibleHeaders(token, false, undefined, {});
      const out: Record<string, string> = { ...wire };
      // Keep AgentRouter's own x-api-key auth scheme (#6056); the CC helper
      // adds a Bearer Authorization we must not send.
      for (const key of Object.keys(out)) {
        if (key.toLowerCase() === "authorization") delete out[key];
      }
      if (token) out["x-api-key"] = token;
      return out;
    },
    parseResponse: (data: any) => (Array.isArray(data) ? data : data?.data || data?.models || []),
  },
  openai: {
    url: "https://api.openai.com/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || [],
  },
  "grok-cli": {
    url: GROK_BUILD_MODELS_URL,
    method: "GET",
    headers: {},
    buildHeaders: (token, context) => {
      const providerData = asGrokBuildRecord(context?.providerSpecificData);
      return getGrokBuildModelsHeaders({
        token,
        userId: grokBuildString(providerData.userId),
        email: grokBuildString(context?.email, providerData.email),
        principalType: grokBuildString(providerData.principalType),
      });
    },
    parseResponse: parseGrokBuildModels,
  },
  openrouter: {
    url: "https://openrouter.ai/api/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || [],
  },
  aimlapi: {
    // #5570: AI/ML API's live catalog (400+ models) lives at the public,
    // auth-free /models database endpoint (NOT /v1/models). The registry has no
    // modelsUrl, so without this entry the route fell back to a stale 6-model
    // seed. Response is a bare array of { id, type, info: { name } }.
    url: "https://api.aimlapi.com/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    parseResponse: (data) => {
      const all = Array.isArray(data) ? data : [];
      const chat = all.filter((m) => m?.type === "chat-completion");
      return (chat.length > 0 ? chat : all)
        .map((m) => ({ id: m?.id, name: m?.info?.name || m?.id }))
        .filter((m) => typeof m.id === "string" && m.id);
    },
  },
  thebai: {
    url: "https://api.theb.ai/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  fenayai: {
    url: "https://fenayai.com/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  chutes: {
    url: "https://llm.chutes.ai/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  clarifai: {
    url: "https://api.clarifai.com/v2/ext/openai/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Key ",
    parseResponse: (data) => normalizeOpenAiLikeModelsResponse(data, "clarifai"),
  },
  kimi: {
    url: "https://api.moonshot.ai/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || [],
  },
  "kimi-coding": {
    ...KIMI_CODING_MODELS_CONFIG,
  },
  "kimi-coding-apikey": {
    ...KIMI_CODING_MODELS_CONFIG,
    buildHeaders: (token) => ({
      Accept: "application/json",
      "x-api-key": token,
    }),
  },
  anthropic: {
    url: "https://api.anthropic.com/v1/models",
    method: "GET",
    headers: {
      "Anthropic-Version": "2023-06-01",
      "Content-Type": "application/json",
    },
    authHeader: "x-api-key",
    parseResponse: (data) => data.data || [],
  },
  deepseek: {
    url: "https://api.deepseek.com/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  groq: {
    url: "https://api.groq.com/openai/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  blackbox: {
    url: "https://api.blackbox.ai/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  xai: {
    url: "https://api.x.ai/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  mistral: {
    url: "https://api.mistral.ai/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },

  together: {
    url: "https://api.together.xyz/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  // OpenVecta (https://openvecta.com/) — OpenAI-compatible `/v1/models` returning
  // { object: "list", data: [{ id, context_length, owned_by, … }, …] }. Bearer
  // token with the `ov_sk_…` prefix. Same discovery shape as Together AI /
  // Cerebras / NVIDIA NIM (live-fetch path; registry seed is the offline fallback).
  openvecta: {
    url: "https://api.openvecta.com/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  fireworks: {
    url: "https://api.fireworks.ai/inference/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  cerebras: {
    url: "https://api.cerebras.ai/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  // ClinePass (BYOK apikey gateway) — same host as OAuth `cline`, but only the
  // `cline-pass/*` namespace is surfaced (filterClinepassModels).
  clinepass: {
    url: "https://api.cline.bot/api/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => filterClinepassModels(Array.isArray(data) ? data : data?.data),
  },
  cohere: {
    url: "https://api.cohere.com/v2/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  nvidia: {
    url: "https://integrate.api.nvidia.com/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  nebius: {
    url: "https://api.tokenfactory.nebius.com/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  kilocode: {
    url: "https://api.kilo.ai/api/openrouter/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  "ollama-cloud": {
    url: "https://api.ollama.com/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.models || data.data || [],
  },
  "cloudflare-ai": {
    url: "https://api.cloudflare.com/client/v4/accounts/{accountId}/ai/models/search",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    // #4259: Cloudflare's `/ai/models/search` returns `{ id: "<uuid>", name: "@cf/..." }`.
    // `name` is the usable model slug; `id` is an internal UUID. Map `name`→id so the
    // dashboard/import surfaces callable model ids (`@cf/...`) instead of UUIDs.
    parseResponse: (data) =>
      (data.result || [])
        .map((model: any) => {
          const slug = typeof model?.name === "string" ? model.name : "";
          if (!slug) return null;
          return {
            id: slug,
            name: slug,
            ...(typeof model?.description === "string" && model.description
              ? { description: model.description }
              : {}),
          };
        })
        .filter(Boolean),
  },
  synthetic: {
    url: "https://api.synthetic.new/openai/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  "kilo-gateway": {
    url: "https://api.kilo.ai/api/gateway/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  "command-code": {
    url: "https://api.commandcode.ai/provider/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  "opencode-zen": {
    url: "https://opencode.ai/zen/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  "opencode-go": {
    url: "https://opencode.ai/zen/go/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  "glm-cn": {
    url: "https://open.bigmodel.cn/api/coding/paas/v4/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  gitlawb: {
    url: "https://opengateway.gitlawb.com/v1/xiaomi-mimo/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  "gitlawb-gmi": {
    url: "https://opengateway.gitlawb.com/v1/gmi-cloud/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
};
