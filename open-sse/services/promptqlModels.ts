/**
 * PromptQL (prompt.ql.app) model catalog helpers.
 *
 * Live catalog: GraphQL `FetchLlmConfigs` against the playground Hasura endpoint.
 * Fallback: static seed captured 2026-07-20 (display_label / model_reference / model_id).
 */

export interface PromptQlModel {
  /** Client-facing id (model_reference slug, e.g. gemini-3.5-flash). */
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
    id: "vertex-claude-fable-5",
    name: "Claude Fable 5",
    configId: "967e6517-1d6b-4e22-82fb-3463bab239c4",
    modelId: "anthropic/claude-fable-5",
  },
  {
    id: "bedrock-claude-opus-4-8",
    name: "Claude Opus 4.8",
    configId: "e97e7f50-9e4a-4685-bc14-1854f1f79782",
    modelId: "us.anthropic.claude-opus-4-8",
  },
  {
    id: "bedrock-claude-sonnet-4-5",
    name: "Claude Sonnet 4.5",
    configId: "48105d83-9a45-4ec6-8b58-f3cf44094f92",
    modelId: "us.anthropic.claude-sonnet-4-5-20250929-v1:0",
  },
  {
    id: "deepseek-v4-pro",
    name: "DeepSeek V4 Pro",
    configId: "5a23af33-b31b-4215-892c-20ef633a8848",
    modelId: "accounts/fireworks/models/deepseek-v4-pro",
  },
  {
    id: "gemini-3.1-pro-preview",
    name: "Gemini 3.1 Pro Preview",
    configId: "d2bda5cd-881b-4044-aeb9-02a83cc0ca27",
    modelId: "google/gemini-3.1-pro-preview",
  },
  {
    id: "gemini-3.5-flash",
    name: "Gemini 3.5 Flash",
    configId: "c3a25aa0-ca48-4577-b52d-71282aacb687",
    modelId: "google/gemini-3.5-flash",
  },
  {
    id: "glm-5.2",
    name: "GLM 5.2",
    configId: "64a1fa3d-bf2e-4bb9-8c2b-fa76c218d636",
    modelId: "accounts/fireworks/models/glm-5p2",
  },
  {
    id: "gpt-5.5",
    name: "GPT 5.5",
    configId: "1762fbce-d5bf-4bf4-ba3d-8b1201f8e204",
    modelId: "gpt-5.5",
  },
  {
    id: "gpt-5.6-luna",
    name: "GPT-5.6 Luna",
    configId: "a9c45ba7-87fa-49a1-8165-76b0864c3a55",
    modelId: "gpt-5.6-luna",
  },
  {
    id: "gpt-5.6-sol",
    name: "GPT-5.6 Sol",
    configId: "34c80712-def3-4db3-9e7a-f57b0324b43d",
    modelId: "gpt-5.6-sol",
  },
  {
    id: "gpt-5.6-terra",
    name: "GPT-5.6 Terra",
    configId: "04f1a08c-42b2-4371-b6d8-75c50b9bb990",
    modelId: "gpt-5.6-terra",
  },
  {
    id: "xai-grok-4-5",
    name: "Grok 4.5",
    configId: "068b2ef2-e432-422b-98e5-5863a1852c47",
    modelId: "grok-4.5",
  },
  {
    id: "kimi-k2.6",
    name: "Kimi K2.6",
    configId: "placeholder-kimi-k2.6",
    modelId: "accounts/fireworks/models/kimi-k2p6",
  },
  {
    id: "kimi-k2.7-code",
    name: "Kimi K2.7 Code",
    configId: "placeholder-kimi-k2.7-code",
    modelId: "accounts/fireworks/models/kimi-k2p7-code",
  },
  {
    id: "minimax-m3",
    name: "Minimax M3",
    configId: "placeholder-minimax-m3",
    modelId: "accounts/fireworks/models/minimax-m3",
    supportsVision: true,
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
