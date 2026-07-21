/**
 * HyperAgent (hyperagent.com) model catalog.
 *
 * Wire IDs were validated live against PATCH /api/threads/{id} (2026-07-21):
 *   Main modelId: fable-latest | opus-latest | sonnet-latest | claude-fable-5 |
 *                 claude-opus-4-8 | claude-sonnet-5
 *   Subagent (defaultSubagentModel): short family names only — fable | opus | sonnet | haiku
 *
 * Pricing keys like bare "fable" are NOT valid chat modelIds (API returns model_unknown).
 * Model is applied on the THREAD via PATCH, not in the /chat body.
 */

export interface HyperAgentModel {
  /** Wire modelId for PATCH /api/threads/{id}. */
  id: string;
  /** Pretty picker / /v1/models name. */
  name: string;
  /** Short subagent override (defaultSubagentModel). */
  subagent: "fable" | "opus" | "sonnet" | "haiku";
  /** Agent runtime for Claude family models. */
  runtimeId?: string;
}

/** Valid selectable models (live-validated). */
export const HYPERAGENT_FALLBACK_MODELS: HyperAgentModel[] = [
  { id: "fable-latest", name: "Fable 5", subagent: "fable", runtimeId: "claude-agents-sdk" },
  {
    id: "claude-fable-5",
    name: "Claude Fable 5",
    subagent: "fable",
    runtimeId: "claude-agents-sdk",
  },
  {
    id: "opus-latest",
    name: "Claude Opus Latest",
    subagent: "opus",
    runtimeId: "claude-agents-sdk",
  },
  {
    id: "claude-opus-4-8",
    name: "Claude Opus 4.8",
    subagent: "opus",
    runtimeId: "claude-agents-sdk",
  },
  {
    id: "sonnet-latest",
    name: "Claude Sonnet Latest",
    subagent: "sonnet",
    runtimeId: "claude-agents-sdk",
  },
  {
    id: "claude-sonnet-5",
    name: "Claude Sonnet 5",
    subagent: "sonnet",
    runtimeId: "claude-agents-sdk",
  },
];

export function stripHyperAgentModelPrefix(model: string): string {
  let m = (model || "").trim();
  if (m.startsWith("hyperagent/")) m = m.slice("hyperagent/".length);
  else if (m.startsWith("ha/")) m = m.slice(3);
  else if (m.startsWith("hyper/")) m = m.slice("hyper/".length);
  return m;
}

/** Alias / pretty-name / legacy pricing-key → catalog wire id. */
const ALIASES: Record<string, string> = {
  // Fable
  fable: "fable-latest",
  "fable-5": "fable-latest",
  fable5: "fable-latest",
  "claude-fable-5": "claude-fable-5",
  "claude-fable": "fable-latest",
  "fable-latest": "fable-latest",
  // Opus
  opus: "opus-latest",
  "opus-latest": "opus-latest",
  "opus-4-8": "claude-opus-4-8",
  "opus-4.8": "claude-opus-4-8",
  "claude-opus-4-8": "claude-opus-4-8",
  "claude-opus-4.8": "claude-opus-4-8",
  "claude-opus-latest": "opus-latest",
  // Sonnet
  sonnet: "sonnet-latest",
  "sonnet-latest": "sonnet-latest",
  "sonnet-5": "claude-sonnet-5",
  "claude-sonnet-5": "claude-sonnet-5",
  "claude-sonnet-latest": "sonnet-latest",
  // Haiku subagent only — map main requests to sonnet-latest as closest chat model
  haiku: "sonnet-latest",
  "haiku-4": "sonnet-latest",
  "claude-haiku-4": "sonnet-latest",
};

export function resolveHyperAgentModel(model: unknown): HyperAgentModel | null {
  const raw = typeof model === "string" ? stripHyperAgentModelPrefix(model) : "";
  if (!raw) return null;
  const lower = raw.toLowerCase().trim();
  const compact = lower.replace(/[\s_]+/g, "-");
  const catalog = HYPERAGENT_FALLBACK_MODELS;

  // Exact wire id
  const byId = catalog.find((m) => m.id.toLowerCase() === lower || m.id.toLowerCase() === compact);
  if (byId) return byId;

  // Pretty name
  const byName = catalog.find((m) => m.name.toLowerCase() === lower);
  if (byName) return byName;

  // Alias table
  const aliasId = ALIASES[compact] || ALIASES[lower];
  if (aliasId) {
    const hit = catalog.find((m) => m.id === aliasId);
    if (hit) return hit;
  }

  // Partial contains
  return (
    catalog.find((m) => compact.includes(m.id.toLowerCase())) ||
    catalog.find((m) => m.name.toLowerCase().includes(compact.replace(/-/g, " "))) ||
    null
  );
}

/** Client-facing / OpenAI response model id (wire id). */
export function clientFacingHyperAgentModelId(model: unknown): string {
  const resolved = resolveHyperAgentModel(model);
  if (resolved) return resolved.id;
  const stripped = typeof model === "string" ? stripHyperAgentModelPrefix(model) : "";
  return stripped || "opus-latest";
}

/**
 * Wire modelId for PATCH /api/threads/{id}.
 * Never returns bare "fable" (invalid) — maps to fable-latest.
 */
export function wireHyperAgentModelId(model: unknown): string {
  return clientFacingHyperAgentModelId(model);
}

/**
 * Short subagent family for defaultSubagentModel.
 * Live API accepts only: fable | opus | sonnet | haiku (not *-latest).
 * User request: subagent matches the selected model family.
 */
export function wireHyperAgentSubagentModelId(model: unknown): string {
  const resolved = resolveHyperAgentModel(model);
  if (resolved?.subagent) return resolved.subagent;

  const wire = wireHyperAgentModelId(model).toLowerCase();
  if (wire.includes("fable")) return "fable";
  if (wire.includes("sonnet")) return "sonnet";
  if (wire.includes("haiku")) return "haiku";
  if (wire.includes("opus")) return "opus";
  return "opus";
}

export function wireHyperAgentRuntimeId(model: unknown): string {
  const resolved = resolveHyperAgentModel(model);
  return resolved?.runtimeId || "claude-agents-sdk";
}
