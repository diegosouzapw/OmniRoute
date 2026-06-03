import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";
import { RetrievePreviewSchema } from "@/shared/schemas/memory";
import { retrievePreview } from "@/lib/memory/retrieval";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { error: { message: "Invalid JSON body", details: [] } },
      { status: 400 },
    );
  }

  const validation = validateBody(RetrievePreviewSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json(validation.error, { status: 400 });
  }

  const { query, strategy, maxTokens, apiKeyId, limit } = validation.data;

  try {
    const bundle = await retrievePreview(apiKeyId ?? null, query, {
      strategy,
      maxTokens,
      limit,
    });

    const memories = bundle.items.map((item) => ({
      id: item.memory.id,
      type: item.memory.type,
      key: item.memory.key ?? "",
      content: item.memory.content,
      score: item.score,
      tokens: item.tokens,
      tier: item.tier,
      vecScore: item.vecScore,
      ftsScore: item.ftsScore,
    }));

    return NextResponse.json({
      memories,
      resolution: bundle.resolution,
      totalTokensUsed: bundle.totalTokens,
      budgetMaxTokens: bundle.budgetMaxTokens,
    });
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}
