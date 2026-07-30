import { CONOL_SESSION_COOKIE_NAME, normalizeConolCookie } from "./conolAuth.ts";

export interface ConolModel {
  id: string;
  name: string;
}

export interface ConolModelDiscovery {
  agentServerId: string;
  defaultModel: string;
  models: ConolModel[];
}

const FALLBACK_MODEL_IDS = [
  "claude-opus-5",
  "claude-opus-4-8",
  "claude-fable-5",
  "claude-opus-4-7",
  "claude-sonnet-5",
  "claude-sonnet-4-6",
  "claude-haiku-4-5",
  "gpt-5.5",
  "gpt-5.5-pro",
  "gpt-5.6-sol",
  "gpt-5.6-terra",
  "gpt-5.6-luna",
  "deepseek/deepseek-v4-pro",
  "openrouter/fusion",
  "z-ai/glm-5.2",
  "z-ai/glm-5.1",
  "tencent/hy3",
  "moonshotai/kimi-k3",
  "moonshotai/kimi-k2.7-code",
  "qwen/qwen3.7-plus",
  "qwen/qwen3.7-max",
  "minimax/minimax-m3",
  "stepfun/step-3.7-flash",
  "google/gemini-3.5-flash",
  "google/gemini-3.1-pro-preview",
  "google/gemini-3.1-flash-lite",
  "x-ai/grok-4.3",
  "deepseek/deepseek-v4-flash",
  "xiaomi/mimo-v2.5",
  "xiaomi/mimo-v2.5-pro",
] as const;

function modelName(id: string): string {
  return id
    .split("/")
    .pop()!
    .split("-")
    .map((part) => {
      const lower = part.toLowerCase();
      if (["gpt", "ai", "glm"].includes(lower)) return lower.toUpperCase();
      return part.length ? part[0]!.toUpperCase() + part.slice(1) : part;
    })
    .join(" ");
}

export const CONOL_FALLBACK_MODELS: ConolModel[] = FALLBACK_MODEL_IDS.map((id) => ({
  id,
  name: modelName(id),
}));

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function toModel(value: unknown): ConolModel | null {
  if (typeof value === "string") {
    const id = value.trim();
    return id ? { id, name: modelName(id) } : null;
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const item = value as Record<string, unknown>;
  const id =
    readString(item.id) ||
    readString(item.modelId) ||
    readString(item.value) ||
    readString(item.name);
  if (!id) return null;
  return {
    id,
    name: readString(item.displayName) || readString(item.name) || modelName(id),
  };
}

export function parseConolAgentServers(payload: unknown): ConolModelDiscovery {
  const root =
    Array.isArray(payload)
      ? payload
      : payload && typeof payload === "object"
        ? ((payload as Record<string, unknown>).agentServers ??
          (payload as Record<string, unknown>).servers ??
          [])
        : [];
  const servers = Array.isArray(root) ? root : [];
  const server = servers.find(
    (value) => value && typeof value === "object" && !Array.isArray(value)
  ) as Record<string, unknown> | undefined;
  const capabilities =
    server?.capabilities &&
    typeof server.capabilities === "object" &&
    !Array.isArray(server.capabilities)
      ? (server.capabilities as Record<string, unknown>)
      : null;
  const agents = Array.isArray(capabilities?.agents) ? capabilities.agents : [];
  const defaultAgent = readString(capabilities?.defaultAgent);
  const agent = (agents.find((value) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return false;
    return readString((value as Record<string, unknown>).name) === defaultAgent;
  }) ?? agents[0]) as Record<string, unknown> | undefined;

  const seen = new Set<string>();
  const rawModels = Array.isArray(agent?.models)
    ? agent.models
    : Array.isArray(server?.models)
      ? server.models
      : [];
  const models = rawModels
    .map(toModel)
    .filter((model): model is ConolModel => {
      if (!model || seen.has(model.id)) return false;
      seen.add(model.id);
      return true;
    });

  return {
    agentServerId: readString(server?.id),
    defaultModel: readString(agent?.defaultModel) || readString(server?.defaultModel),
    models,
  };
}

export type ConolEffort = "low" | "medium" | "high" | "xhigh";

export function resolveConolModelSelection(value: unknown): {
  model: string;
  effort?: ConolEffort;
} {
  let model = readString(value);
  if (model.startsWith("conol-web/")) model = model.slice("conol-web/".length);
  else if (model.startsWith("conol/")) model = model.slice("conol/".length);
  else if (model.startsWith("cnl/")) model = model.slice("cnl/".length);
  model ||= "claude-sonnet-5";

  const effortMatch = model.match(/-(xhigh|high|medium|low)$/);
  if (!effortMatch) return { model };
  return {
    model: model.slice(0, -effortMatch[0].length),
    effort: effortMatch[1] as ConolEffort,
  };
}

export function resolveConolModelId(value: unknown): string {
  return resolveConolModelSelection(value).model;
}

export async function discoverConolModels(options: {
  cookie: string;
  fetchImpl?: typeof fetch;
  signal?: AbortSignal;
}): Promise<ConolModelDiscovery> {
  const cookie = normalizeConolCookie(options.cookie);
  if (!cookie) throw new Error(`Missing ${CONOL_SESSION_COOKIE_NAME} cookie`);

  const response = await (options.fetchImpl ?? fetch)("https://conol.ai/api/agent-servers", {
    method: "GET",
    headers: {
      accept: "application/json",
      cookie,
      referer: "https://conol.ai/home",
    },
    signal: options.signal,
  });
  if (!response.ok) {
    throw new Error(`Conol model discovery returned HTTP ${response.status}`);
  }
  const discovered = parseConolAgentServers(await response.json());
  if (!discovered.models.length) {
    throw new Error("Conol model discovery returned an empty catalog");
  }
  return discovered;
}
