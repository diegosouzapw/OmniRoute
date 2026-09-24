import * as yaml from "js-yaml";

export type ProviderKind = "openai" | "anthropic" | "local";

export interface ProviderConfig {
  id: string;
  kind: ProviderKind;
  baseUrl: string;
  model: string;
  /** API key is runtime-only and is never returned by public helpers. */
  apiKey?: string;
}

export interface ChatRequest {
  messages: Array<Record<string, unknown>>;
  model?: string;
  stream?: boolean;
  [key: string]: unknown;
}

export interface ProviderAdapter {
  readonly kind: ProviderKind;
  complete(
    request: ChatRequest,
    config: ProviderConfig,
    fetchImpl?: typeof fetch
  ): Promise<Response>;
}

const trimUrl = (url: string): string => url.replace(/\/+$/, "");

function authHeaders(config: ProviderConfig): Record<string, string> {
  return config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {};
}

const openaiAdapter: ProviderAdapter = {
  kind: "openai",
  complete: (request, config, fetchImpl = fetch) =>
    fetchImpl(`${trimUrl(config.baseUrl)}/chat/completions`, {
      method: "POST",
      headers: { "content-type": "application/json", ...authHeaders(config) },
      body: JSON.stringify({ ...request, model: request.model || config.model }),
    }),
};

const localAdapter: ProviderAdapter = { ...openaiAdapter, kind: "local" };

const anthropicAdapter: ProviderAdapter = {
  kind: "anthropic",
  complete: (request, config, fetchImpl = fetch) => {
    const { system, ...body } = request as ChatRequest & { system?: unknown };
    const headers: Record<string, string> = {
      "content-type": "application/json",
      "anthropic-version": "2023-06-01",
      ...(config.apiKey ? { "x-api-key": config.apiKey } : {}),
    };
    return fetchImpl(`${trimUrl(config.baseUrl)}/messages`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        ...body,
        ...(system === undefined ? {} : { system }),
        model: request.model || config.model,
      }),
    });
  },
};

const ADAPTERS: Record<ProviderKind, ProviderAdapter> = {
  openai: openaiAdapter,
  anthropic: anthropicAdapter,
  local: localAdapter,
};

export function getProviderAdapter(kind: ProviderKind): ProviderAdapter {
  return ADAPTERS[kind];
}

export interface ProviderConfigFile {
  providers: ProviderConfig[];
}

/** Parse self-hosted YAML without persisting or logging credentials. */
export function parseProviderConfig(source: string): ProviderConfigFile {
  const document = yaml.load(source);
  if (!document || typeof document !== "object" || Array.isArray(document))
    throw new Error("Provider config must be a mapping");
  const providers = (document as Record<string, unknown>).providers;
  if (!Array.isArray(providers)) throw new Error("Provider config requires a providers list");
  const parsed = providers.map((value, index) => {
    if (!value || typeof value !== "object" || Array.isArray(value))
      throw new Error(`Provider ${index} must be a mapping`);
    const item = value as Record<string, unknown>;
    const id = typeof item.id === "string" && item.id.trim();
    const kind = item.kind;
    const baseUrl = typeof item.baseUrl === "string" && item.baseUrl.trim();
    const model = typeof item.model === "string" && item.model.trim();
    if (
      !id ||
      !baseUrl ||
      !model ||
      !(kind === "openai" || kind === "anthropic" || kind === "local")
    )
      throw new Error(`Invalid provider ${index}`);
    const provider: ProviderConfig = {
      id,
      kind,
      baseUrl,
      model,
      ...(typeof item.apiKey === "string" && item.apiKey ? { apiKey: item.apiKey } : {}),
    };
    return provider;
  });
  return { providers: parsed };
}

export function publicProviderConfigs(
  config: ProviderConfigFile
): Array<Omit<ProviderConfig, "apiKey">> {
  return config.providers.map(({ apiKey: _apiKey, ...safe }) => safe);
}

export class ProviderRouter {
  private readonly providers: Map<string, ProviderConfig>;
  constructor(config: ProviderConfigFile) {
    this.providers = new Map(config.providers.map((provider) => [provider.id, provider]));
  }
  select(id?: string): ProviderConfig {
    const selected = id ? this.providers.get(id) : this.providers.values().next().value;
    if (!selected) throw new Error(id ? `Unknown provider: ${id}` : "No providers configured");
    return selected;
  }
  complete(request: ChatRequest, id?: string, fetchImpl?: typeof fetch): Promise<Response> {
    const config = this.select(id);
    return getProviderAdapter(config.kind).complete(request, config, fetchImpl);
  }
}
