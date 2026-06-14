export type EmbeddingSource = "remote" | "static" | "transformers" | "auto";

export interface EmbeddingProviderListing {
  provider: string; // e.g. "openai"
  hasKey: boolean;
  models: Array<{
    id: string; // formato `provider/model`, e.g. "openai/text-embedding-3-small"
    name: string;
    dimensions: number | null;
  }>;
}

export interface EmbeddingResolution {
  /** Fonte ativa após resolveEmbeddingSource(settings). null = nenhuma disponível → degrada p/ FTS5. */
  source: "remote" | "static" | "transformers" | null;
  /** Modelo ativo (formato provider/model para remote, "potion-base-8M" para static, "Xenova/all-MiniLM-L6-v2" para transformers). */
  model: string | null;
  /** Dimensão do vetor produzido. null antes da 1ª chamada (lazy probe). */
  dimensions: number | null;
  /** Assinatura única usada como chave do vectorStore para detectar troca de modelo. */
  signature: string; // ${source}:${model}:${dim}
  /** Motivo da escolha (UI exibe no Engine status). */
  reason: string; // e.g. "provider openai com key configurada"
}

export interface EmbeddingResult {
  vector: Float32Array;
  source: "remote" | "static" | "transformers";
  model: string;
  dimensions: number;
  latencyMs: number;
  cached: boolean;
}

export interface EmbeddingError {
  source: "remote" | "static" | "transformers";
  model: string | null;
  reason: "no_key" | "model_load_failed" | "request_failed" | "rate_limited" | "timeout" | "unknown";
  message: string; // ALWAYS via sanitizeErrorMessage()
}
