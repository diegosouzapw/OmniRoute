/**
 * PromptQL (prompt.ql.app) model catalog helpers.
 *
 * Live catalog: GraphQL `FetchLlmConfigs` against the playground Hasura endpoint.
 * Fallback: static seed captured 2026-08-17 (display_label / model_reference / model_id).
 */

export interface PromptQlModel {
  /** Client-facing id (model_reference slug, e.g. gemini-3.7-flash). */
  id: string;
  /** Friendly picker label. */
  name: string;
  /** Hasura llm_config.id (uuid) — used as llmConfigId on start_thread. */
  configId?: string;
  /** Upstream model id string from PromptQL. */
  modelId?: string;
  /** Whether the underlying model accepts image inputs (matches upstream capability). */
  supportsVision?: boolean;
}

/** Offline seed when discovery fails (from live FetchLlmConfigs capture). */
export const PROMPTQL_FALLBACK_MODELS: PromptQlModel[] = [
  {
    id: "bedrock-claude-fable-5",
    name: "Claude Fable 5",
    configId: "c47a1e57-2fca-4cfe-913a-5fb821079f50",
    modelId: "us.anthropic.claude-fable-5",
    supportsVision: true,
  },
  {
    id: "bedrock-claude-opus-5",
    name: "Claude Opus 5",
    configId: "8aed42aa-f7c8-48f9-8238-5046bbc0f4f7",
    modelId: "us.anthropic.claude-opus-5",
    supportsVision: true,
  },
  {
    id: "bedrock-claude-sonnet-4-5",
    name: "Claude Sonnet 4.5",
    configId: "0abcbc61-dbef-4958-96b9-e0cde7e3ad8f",
    modelId: "us.anthropic.claude-sonnet-4-5-20250929-v1:0",
    supportsVision: true,
  },
  {
    id: "deepseek-v4-pro-0813",
    name: "DeepSeek V4 Pro 0813",
    configId: "255de820-3615-4921-a5fe-85b4af9e37a4",
    modelId: "accounts/fireworks/models/deepseek-v4-pro-0813",
    supportsVision: true,
  },
  {
    id: "deepseek-v4-flash-0731",
    name: "DeepSeek V4 Flash 0731",
    configId: "22d8bd9a-3c48-4e27-a4f8-dc67ad2242b7",
    modelId: "accounts/fireworks/models/deepseek-v4-flash-0731",
    supportsVision: true,
  },
  {
    id: "gemini-3.1-pro-preview",
    name: "Gemini 3.1 Pro Preview",
    configId: "17703a97-41a4-469d-b5d4-7356f1c28948",
    modelId: "google/gemini-3.1-pro-preview",
    supportsVision: true,
  },
  {
    id: "gemini-3.7-flash",
    name: "Gemini 3.7 Flash",
    configId: "60754535-a5e8-4ae7-acf2-43d046771700",
    modelId: "google/gemini-3.7-flash",
    supportsVision: true,
  },
  {
    id: "gpt-5.6-sol",
    name: "GPT-5.6 Sol",
    configId: "4914e63d-ea29-45dc-9a85-c367b1ad0be5",
    modelId: "gpt-5.6-sol",
    supportsVision: true,
  },
  {
    id: "gpt-5.6-terra",
    name: "GPT-5.6 Terra",
    configId: "4e627eb9-a199-4a90-8050-b734b6ee5fda",
    modelId: "gpt-5.6-terra",
    supportsVision: true,
  },
  {
    id: "gpt-5.6-luna",
    name: "GPT-5.6 Luna",
    configId: "5eac2efb-7951-4da6-9a32-bfb31b1a7788",
    modelId: "gpt-5.6-luna",
    supportsVision: true,
  },
  {
    id: "xai-grok-4-6",
    name: "Grok 4.6",
    configId: "673e97ba-7b15-4213-8984-9b2477ee3409",
    modelId: "grok-4.6",
    supportsVision: true,
  },
  {
    id: "kimi-k3",
    name: "Kimi K3",
    configId: "2a751e62-e281-4ab0-9be0-b05a6f8603db",
    modelId: "accounts/fireworks/models/kimi-k3",
    supportsVision: true,
  },
  {
    id: "glm-5.2",
    name: "GLM 5.2",
    configId: "d2694d4d-4285-4d3c-ada5-aea5956375d4",
    modelId: "accounts/fireworks/models/glm-5p2",
    supportsVision: false,
  },
  {
    id: "minimax-m3",
    name: "Minimax M3",
    configId: "c4028069-0eb9-4a31-825c-a1cff9e5a085",
    modelId: "accounts/fireworks/models/minimax-m3",
    supportsVision: false,
  },
];

const FETCH_LLM_CONFIGS = `
query FetchLlmConfigs {
  llm_config(
    where: {deleted_at: {_is_null: true}}
    order_by: {display_label: asc}
  ) {
    id
    display_label
    model_reference
    model_id
  }
}`;

export function stripPromptQlModelPrefix(model: string): string {
  let m = (model || "").trim();
  if (m.startsWith("promptql/")) m = m.slice("promptql/".length);
  else if (m.startsWith("pql/")) m = m.slice(4);
  return m;
}

/** Resolve client model slug / display name / config uuid → catalog entry. */
export function resolvePromptQlModel(model: unknown): PromptQlModel | null {
  const raw = typeof model === "string" ? stripPromptQlModelPrefix(model) : "";
  if (!raw) return null;
  const lower = raw.toLowerCase();
  const catalog = PROMPTQL_FALLBACK_MODELS;
  return (
    catalog.find((m) => m.id.toLowerCase() === lower) ||
    catalog.find((m) => m.name.toLowerCase() === lower) ||
    catalog.find((m) => (m.modelId || "").toLowerCase() === lower) ||
    catalog.find((m) => (m.configId || "").toLowerCase() === lower) ||
    catalog.find((m) => lower.includes(m.id.toLowerCase())) ||
    null
  );
}

export function clientFacingPromptQlModelId(model: unknown): string {
  const resolved = resolvePromptQlModel(model);
  if (resolved) return resolved.id;
  const stripped = typeof model === "string" ? stripPromptQlModelPrefix(model) : "";
  return stripped || "promptql-default";
}

export async function discoverPromptQlModels(opts: {
  token: string;
  graphqlEndpoint: string;
  signal?: AbortSignal | null;
}): Promise<PromptQlModel[]> {
  const res = await fetch(opts.graphqlEndpoint, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${opts.token}`,
      origin: "https://prompt.ql.app",
      referer: "https://prompt.ql.app/",
    },
    body: JSON.stringify({ query: FETCH_LLM_CONFIGS, operationName: "FetchLlmConfigs" }),
    signal: opts.signal ?? undefined,
  });
  if (!res.ok) {
    throw new Error(`FetchLlmConfigs HTTP ${res.status}`);
  }
  const json = (await res.json()) as {
    data?: {
      llm_config?: Array<{
        id?: string;
        display_label?: string;
        model_reference?: string;
        model_id?: string;
      }>;
    };
    errors?: Array<{ message?: string }>;
  };
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message || "error").join("; "));
  }
  const rows = json.data?.llm_config || [];
  return rows
    .map((r): PromptQlModel | null => {
      const id = (r.model_reference || r.model_id || r.id || "").trim();
      if (!id) return null;
      return {
        id,
        name: (r.display_label || id).trim(),
        configId: r.id,
        modelId: r.model_id,
      };
    })
    .filter((x): x is PromptQlModel => Boolean(x));
}
