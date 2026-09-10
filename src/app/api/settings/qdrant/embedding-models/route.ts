import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { getProviderConnections } from "@/lib/db/providers";
import { providerAllowsOptionalApiKey } from "@/shared/constants/providers";
import { getAllEmbeddingModels } from "@omniroute/open-sse/config/embeddingRegistry.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import {
  buildRegistryEmbeddingOptions,
  mergeEmbeddingOptions,
} from "./catalog";

type EmbeddingModelOption = {
  value: string;
  label: string;
  dimensions?: number;
};

function modelLabel(value: string, name: string, dimensions?: number): string {
  return `${value} - ${name}${dimensions ? ` (${dimensions}d)` : ""}`;
}

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const activeConnections = (await getProviderConnections({ isActive: true })) as Array<
      Record<string, unknown>
    >;
    const configuredProviders = new Set(
      activeConnections
        .filter(
          (connection) =>
            (typeof connection.apiKey === "string" && connection.apiKey.trim().length > 0) ||
            connection.authType === "oauth" ||
            // Local/self-hosted providers (ollama-local, lm-studio, etc.) and other
            // no-key-required providers connect with no apiKey and authType "apikey"
            // (see src/app/api/providers/route.ts) — they are still "configured" the
            // moment the connection is active. See issue #11949.
            providerAllowsOptionalApiKey(connection.provider)
        )
        .map((connection) => String(connection.provider || ""))
        .filter(Boolean)
    );

    const options: EmbeddingModelOption[] = getAllEmbeddingModels()
      .filter((model) => configuredProviders.has(model.provider))
      .map((model) => ({
        value: model.id,
        label: modelLabel(model.id, model.name, model.dimensions),
        ...(model.dimensions ? { dimensions: model.dimensions } : {}),
      }))
      .sort((a, b) => a.value.localeCompare(b.value));

    // Add OpenRouter account models that explicitly support embeddings.
    try {
      const apiKey = activeConnections
        .filter((connection) => connection.provider === "openrouter")
        .find(
          (connection) =>
            typeof connection.apiKey === "string" && connection.apiKey.trim().length > 0
        )?.apiKey as string | undefined;

      if (apiKey) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 7000);
        let res: Response;
        try {
          res = await fetch("https://openrouter.ai/api/v1/models?output_modalities=embeddings", {
            method: "GET",
            headers: { Authorization: `Bearer ${apiKey}` },
            cache: "no-store",
            signal: controller.signal,
          });
        } finally {
          clearTimeout(timeout);
        }
        if (res.ok) {
          const data = (await res.json().catch(() => null)) as any;
          const rows = Array.isArray(data?.data) ? data.data : [];
          for (const row of rows) {
            const id = typeof row?.id === "string" ? row.id.trim() : "";
            if (!id) continue;
            const value = `openrouter/${id}`;
            if (options.some((option) => option.value === value)) continue;
            options.push({ value, label: modelLabel(value, String(row?.name || id)) });
          }
        }
      }
    } catch {
      // Best effort only: keep endpoint fast and resilient.
    }

    // Ensure the default always exists as a safe fallback.
    if (!options.some((o) => o.value === "openai/text-embedding-3-small")) {
      options.unshift({
        value: "openai/text-embedding-3-small",
        label: "openai/text-embedding-3-small - OpenAI Text Embedding 3 Small",
      });
    }

    // Merge curated registry models (EMBEDDING_PROVIDERS — cohere, voyage,
    // jina, ...) so the Quick select lists real
    // embedding providers instead of only chat-catalog text matches and
    // OpenRouter live discovery. Registry options dedupe against the above;
    // mergeEmbeddingOptions returns value-sorted options for stable UI order.
    const withRegistry = mergeEmbeddingOptions(options, buildRegistryEmbeddingOptions());

    return NextResponse.json({ models: withRegistry });
  } catch (error) {
    const message = sanitizeErrorMessage(error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: { message }, models: [] }, { status: 500 });
  }
}
