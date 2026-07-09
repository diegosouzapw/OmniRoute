import { getAntigravityModelsDiscoveryUrls } from "@omniroute/open-sse/config/antigravityUpstream.ts";
import { getAntigravityHeaders } from "@omniroute/open-sse/services/antigravityHeaders.ts";
import { parseGeminiModelsList } from "@/lib/providerModels/geminiModelsParser";
import { filterClinepassModels } from "@omniroute/open-sse/services/clinepassModels.ts";
import { normalizeOpenAiLikeModelsResponse } from "./normalizers";

export type ProviderModelsConfigEntry = {
  url: string;
  method: "GET" | "POST";
  headers: Record<string, string>;
  authHeader?: string;
  authPrefix?: string;
  authQuery?: string;
  body?: unknown;
  parseResponse: (data: any) => any;
};

const KIMI_CODING_MODELS_CONFIG: ProviderModelsConfigEntry = {
  url: "https://api.kimi.com/coding/v1/models",
  method: "GET",
  headers: { "Content-Type": "application/json" },
  authHeader: "x-api-key",
  parseResponse: (data) => data.data || data.models || [],
};

// Provider models endpoints configuration
export const PROVIDER_MODELS_CONFIG: Record<string, ProviderModelsConfigEntry> = {
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
  qwen: {
    url: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || [],
  },
  // #3931: qwen-web (cookie provider) was missing here, so its discovery page
  // showed nothing (the OAuth fallback above only fires for provider==="qwen").
  // `chat.qwen.ai/api/v2/models` is public (no auth header configured/sent);
  // shape `{ data: { data: [{ id, name, owned_by }] } }`, flatter `{ data: [] }` fallback.
  "qwen-web": {
    url: "https://chat.qwen.ai/api/v2/models",
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
  // #5858 follow-up: kimi-web (cookie provider) on the international domain.
  // `GetAvailableModels` returns the model list as a plain JSON envelope
  // (no Connect framing on either request or response — only the chat
  // completion endpoint uses the 5-byte envelope). Auth: Bearer JWT extracted
  // from the `kimi-auth` cookie the user pasted. Agent variants
  // (`k2d6-agent*`) need a different scenario + agent fields this executor
  // doesn't shape, so they're filtered out.
  "kimi-web": {
    url: "https://www.kimi.com/apiv2/kimi.gateway.config.v1.ConfigService/GetAvailableModels",
    method: "GET",
    headers: { accept: "application/json, text/plain, */*", "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => {
      const list = (data?.availableModels || []) as Array<{
        key?: string;
        displayName?: string;
        thinking?: boolean;
      }>;
      return list
        .filter((m) => typeof m.key === "string" && !m.key?.includes("agent"))
        .map((m) => ({
          id: m.key as string,
          name: m.displayName || (m.key as string),
          supportsReasoning: !!m.thinking,
          owned_by: "kimi",
        }));
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
  openai: {
    url: "https://api.openai.com/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || [],
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
