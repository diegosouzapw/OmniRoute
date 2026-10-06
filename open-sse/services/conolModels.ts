import { CONOL_SESSION_COOKIE_NAME, normalizeConolCookie } from "./conolAuth.ts";

export type ConolEffort = "minimal" | "low" | "medium" | "high" | "xhigh";

/** Ordered weakest → strongest. Used to clamp a requested effort onto a model. */
export const CONOL_EFFORT_ORDER: readonly ConolEffort[] = [
  "minimal",
  "low",
  "medium",
  "high",
  "xhigh",
];

export interface ConolModel {
  id: string;
  name: string;
  supportsVision?: boolean;
  /** Efforts the upstream advertises for this model. Empty means "not tunable". */
  efforts?: ConolEffort[];
}

export interface ConolModelDiscovery {
  agentServerId: string;
  defaultModel: string;
  models: ConolModel[];
  modelPresets: ConolModelPreset[];
}

export interface ConolModelPreset {
  id: string;
  text?: string;
  multimodal?: string;
}

/** Effort ladders observed on https://conol.ai/api/agent-servers (2026-07-30). */
const EFFORTS_XHIGH: ConolEffort[] = ["low", "medium", "high", "xhigh"];
const EFFORTS_STANDARD: ConolEffort[] = ["minimal", "low", "medium", "high"];
const EFFORTS_NO_XHIGH: ConolEffort[] = ["low", "medium", "high"];
const EFFORTS_HIGH_ONLY: ConolEffort[] = ["high", "xhigh"];
const EFFORTS_PRO: ConolEffort[] = ["medium", "high", "xhigh"];

interface FallbackModelSeed {
  id: string;
  vision: boolean;
  efforts: ConolEffort[];
}

const FALLBACK_MODEL_SEEDS: FallbackModelSeed[] = [
  { id: "claude-opus-5", vision: true, efforts: EFFORTS_XHIGH },
  { id: "claude-opus-4-8", vision: true, efforts: EFFORTS_XHIGH },
  { id: "claude-fable-5", vision: true, efforts: EFFORTS_XHIGH },
  { id: "claude-sonnet-5", vision: true, efforts: EFFORTS_NO_XHIGH },
  { id: "claude-sonnet-4-6", vision: true, efforts: EFFORTS_NO_XHIGH },
  { id: "claude-haiku-4-5", vision: true, efforts: EFFORTS_STANDARD },
  { id: "gpt-5.5", vision: true, efforts: EFFORTS_XHIGH },
  { id: "gpt-5.5-pro", vision: true, efforts: EFFORTS_PRO },
  { id: "gpt-5.6-sol", vision: true, efforts: EFFORTS_XHIGH },
  { id: "gpt-5.6-terra", vision: true, efforts: EFFORTS_XHIGH },
  { id: "gpt-5.6-luna", vision: true, efforts: EFFORTS_XHIGH },
  { id: "deepseek/deepseek-v4-pro", vision: false, efforts: EFFORTS_HIGH_ONLY },
  { id: "openrouter/fusion", vision: false, efforts: [] },
  { id: "z-ai/glm-5.2", vision: false, efforts: EFFORTS_STANDARD },
  { id: "tencent/hy3", vision: false, efforts: EFFORTS_STANDARD },
  { id: "moonshotai/kimi-k3", vision: true, efforts: EFFORTS_STANDARD },
  { id: "moonshotai/kimi-k2.7-code", vision: true, efforts: EFFORTS_STANDARD },
  { id: "qwen/qwen3.7-plus", vision: true, efforts: EFFORTS_STANDARD },
  { id: "qwen/qwen3.7-max", vision: false, efforts: EFFORTS_STANDARD },
  { id: "minimax/minimax-m3", vision: true, efforts: EFFORTS_STANDARD },
  { id: "stepfun/step-3.7-flash", vision: true, efforts: EFFORTS_STANDARD },
  { id: "google/gemini-3.7-flash", vision: true, efforts: EFFORTS_STANDARD },
  { id: "google/gemini-3.1-pro-preview", vision: true, efforts: EFFORTS_STANDARD },
  { id: "google/gemini-3.1-flash-lite", vision: true, efforts: EFFORTS_STANDARD },
  { id: "x-ai/grok-4.3", vision: true, efforts: EFFORTS_STANDARD },
  { id: "deepseek/deepseek-v4-flash", vision: false, efforts: EFFORTS_HIGH_ONLY },
  { id: "xiaomi/mimo-v2.5", vision: true, efforts: EFFORTS_STANDARD },
  { id: "xiaomi/mimo-v2.5-pro", vision: false, efforts: EFFORTS_STANDARD },
];

/** Presets exposed by the web client's model picker (id → text/multimodal model). */
export const CONOL_FALLBACK_MODEL_PRESETS: ConolModelPreset[] = [
  { id: "flash", text: "deepseek/deepseek-v4-flash", multimodal: "google/gemini-3.7-flash" },
  { id: "moderate", text: "deepseek/deepseek-v4-pro", multimodal: "claude-sonnet-5" },
  { id: "pro", text: "z-ai/glm-5.2", multimodal: "moonshotai/kimi-k3" },
  { id: "ultra", text: "claude-fable-5", multimodal: "claude-fable-5" },
];

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

export const CONOL_FALLBACK_MODELS: ConolModel[] = FALLBACK_MODEL_SEEDS.map((seed) => ({
  id: seed.id,
  name: modelName(seed.id),
  supportsVision: seed.vision,
  efforts: [...seed.efforts],
}));

const CONOL_FALLBACK_EFFORTS = new Map<string, ConolEffort[]>(
  FALLBACK_MODEL_SEEDS.map((seed) => [seed.id, seed.efforts])
);

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function toEfforts(value: unknown): ConolEffort[] | null {
  if (!Array.isArray(value)) return null;
  const efforts = value
    .map((entry) => readString(entry).toLowerCase())
    .filter((entry): entry is ConolEffort =>
      (CONOL_EFFORT_ORDER as readonly string[]).includes(entry)
    );
  // Normalize to the canonical weakest→strongest order and de-duplicate.
  return CONOL_EFFORT_ORDER.filter((effort) => efforts.includes(effort));
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
  const inputModalities = Array.isArray(item.inputModalities)
    ? item.inputModalities.filter((modality): modality is string => typeof modality === "string")
    : null;
  const efforts = toEfforts(item.efforts);
  return {
    id,
    name: readString(item.displayName) || readString(item.name) || modelName(id),
    ...(inputModalities
      ? { supportsVision: inputModalities.some((modality) => modality.toLowerCase() === "image") }
      : {}),
    ...(efforts ? { efforts } : {}),
  };
}

function toModelPreset(value: unknown): ConolModelPreset | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const item = value as Record<string, unknown>;
  const id = readString(item.id);
  if (!id) return null;
  const text = readString(item.text);
  const multimodal = readString(item.multimodal);
  return { id, ...(text ? { text } : {}), ...(multimodal ? { multimodal } : {}) };
}

/**
 * Clamp a requested effort onto the ladder a model actually advertises.
 * Returns `null` when the model exposes no effort control at all.
 */
export function clampConolEffort(
  requested: ConolEffort,
  supported: readonly ConolEffort[] | undefined
): ConolEffort | null {
  const ladder =
    supported && supported.length
      ? CONOL_EFFORT_ORDER.filter((effort) => supported.includes(effort))
      : [];
  if (!ladder.length) return null;
  if (ladder.includes(requested)) return requested;

  const requestedRank = CONOL_EFFORT_ORDER.indexOf(requested);
  // Prefer the strongest supported effort at or below the request; otherwise the weakest above.
  let below: ConolEffort | null = null;
  for (const effort of ladder) {
    if (CONOL_EFFORT_ORDER.indexOf(effort) <= requestedRank) below = effort;
  }
  return below ?? ladder[0]!;
}

/** Effort ladder for a model id, using discovery data when available. */
export function conolEffortsForModel(
  modelId: string,
  discovered?: readonly ConolModel[]
): ConolEffort[] {
  const fromDiscovery = discovered?.find((model) => model.id === modelId)?.efforts;
  if (fromDiscovery) return [...fromDiscovery];
  return [...(CONOL_FALLBACK_EFFORTS.get(modelId) ?? [])];
}

export function parseConolAgentServers(payload: unknown): ConolModelDiscovery {
  const root = Array.isArray(payload)
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
  const models = rawModels.map(toModel).filter((model): model is ConolModel => {
    if (!model || seen.has(model.id)) return false;
    seen.add(model.id);
    return true;
  });

  const rawPresets = Array.isArray(agent?.modelPresets) ? agent.modelPresets : [];
  const seenPresets = new Set<string>();
  const modelPresets = rawPresets
    .map(toModelPreset)
    .filter((preset): preset is ConolModelPreset => {
      if (!preset || seenPresets.has(preset.id)) return false;
      seenPresets.add(preset.id);
      return true;
    });

  return {
    agentServerId: readString(server?.id),
    defaultModel: readString(agent?.defaultModel) || readString(server?.defaultModel),
    models,
    modelPresets,
  };
}

/**
 * Effort applied when the caller does not pin one via the `-<effort>` model suffix.
 * Clamped per-model, so models without an `xhigh` rung fall back to their strongest rung.
 */
export const CONOL_DEFAULT_EFFORT: ConolEffort = "xhigh";

export function resolveConolModelSelection(value: unknown): {
  model: string;
  effort: ConolEffort;
  /** True when the effort came from an explicit `-<effort>` suffix rather than the default. */
  effortExplicit: boolean;
} {
  let model = readString(value);
  if (model.startsWith("conol-web/")) model = model.slice("conol-web/".length);
  else if (model.startsWith("conol/")) model = model.slice("conol/".length);
  else if (model.startsWith("cnl/")) model = model.slice("cnl/".length);
  model ||= "claude-sonnet-5";

  const effortMatch = model.match(/-(xhigh|high|medium|low|minimal)$/);
  if (!effortMatch) return { model, effort: CONOL_DEFAULT_EFFORT, effortExplicit: false };
  return {
    model: model.slice(0, -effortMatch[0].length),
    effort: effortMatch[1] as ConolEffort,
    effortExplicit: true,
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
