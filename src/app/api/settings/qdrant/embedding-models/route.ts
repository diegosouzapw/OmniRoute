import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { AI_MODELS } from "@/shared/constants/models";
import { getProviderConnections } from "@/lib/db/providers";

type EmbeddingModelOption = {
  value: string;
  label: string;
};

function isLikelyEmbeddingModel(provider: string, model: string, name: string): boolean {
  const haystack = `${provider}/${model} ${name}`.toLowerCase();
  if (haystack.includes("embedding")) return true;
  if (haystack.includes("embed")) return true;
  if (haystack.includes("text-embedding")) return true;
  return false;
}

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const options: EmbeddingModelOption[] = AI_MODELS.filter((m: any) =>
      isLikelyEmbeddingModel(String(m.provider || ""), String(m.model || ""), String(m.name || ""))
    )
      .map((m: any) => ({
        value: `${m.provider}/${m.model}`,
        label: `${m.provider}/${m.model} - ${m.name}`,
      }))
      .sort((a, b) => a.value.localeCompare(b.value));

    // Add OpenRouter account models that explicitly support embeddings.
    try {
      const connections = (await getProviderConnections({
        provider: "openrouter",
        isActive: true,
      })) as Array<Record<string, unknown>>;
      const apiKey = connections.find(
        (c) => typeof c.apiKey === "string" && (c.apiKey as string).trim().length > 0
      )?.apiKey as string | undefined;

      if (apiKey) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 7000);
        let res: Response;
        try {
          res = await fetch("https://openrouter.ai/api/v1/models?output_modalities=embeddings", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
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
            if (options.some((o) => o.value === value)) continue;
            options.push({
              value,
              label: `${value} - ${String(row?.name || id)}`,
            });
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

    options.sort((a, b) => a.value.localeCompare(b.value));

    return NextResponse.json({ models: options });
  } catch (error) {
    return NextResponse.json({ error: String(error), models: [] }, { status: 500 });
  }
}
