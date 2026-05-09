import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { AI_MODELS } from "@/shared/constants/models";

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

    // Ensure the default always exists as a safe fallback
    if (!options.some((o) => o.value === "openai/text-embedding-3-small")) {
      options.unshift({
        value: "openai/text-embedding-3-small",
        label: "openai/text-embedding-3-small - OpenAI Text Embedding 3 Small",
      });
    }

    return NextResponse.json({ models: options });
  } catch (error) {
    return NextResponse.json({ error: String(error), models: [] }, { status: 500 });
  }
}
