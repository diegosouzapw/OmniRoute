import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { judgeFidelityBatch } from "@omniroute/open-sse/services/compression/eval/fidelityCheck";
import { createPricedJudgeClient } from "@/lib/compression/judgeModelClient";
import type { ProviderCredentials } from "@omniroute/open-sse/executors/base";
import { getProviderCredentials } from "@/sse/services/auth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

export const dynamic = "force-dynamic";

const VerifyRequestSchema = z.object({
  items: z
    .array(z.object({ id: z.string(), original: z.string(), compressed: z.string() }))
    .min(1)
    .max(20),
  provider: z.string().min(1),
  judgeModel: z.string().min(1),
  costCapUsd: z.number().positive().max(5).default(0.1),
});

export async function POST(req: Request) {
  const authError = await requireManagementAuth(req);
  if (authError) return authError;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const parsed = VerifyRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.issues },
      { status: 400 }
    );
  }
  const { items, provider, judgeModel, costCapUsd } = parsed.data;
  try {
    const rawCredentials = await getProviderCredentials(provider);
    if (!rawCredentials) {
      return NextResponse.json(
        { error: `No credentials configured for provider "${provider}"` },
        { status: 400 }
      );
    }
    // Positively require a credential-shaped object before casting. This rejects the
    // current non-credential return shapes ({allRateLimited}, {allExpired}) AND any
    // future error shape, instead of denylisting known ones. The success return from
    // getProviderCredentials is a structural superset of ProviderCredentials; the extra
    // fields (id, provider, email, etc.) are ignored by the executor adapter.
    const looksLikeCredentials =
      typeof rawCredentials === "object" &&
      rawCredentials !== null &&
      "connectionId" in rawCredentials &&
      ("apiKey" in rawCredentials || "accessToken" in rawCredentials);
    if (!looksLikeCredentials) {
      return NextResponse.json(
        { error: `Provider "${provider}" credentials are unavailable` },
        { status: 503 }
      );
    }
    const credentials = rawCredentials as unknown as ProviderCredentials;
    const client = createPricedJudgeClient(provider, credentials);
    const result = await judgeFidelityBatch(client, judgeModel, items, costCapUsd);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/api/compression/compare/verify]", msg);
    return NextResponse.json(
      { error: "Verify failed", details: sanitizeErrorMessage(msg) },
      { status: 500 }
    );
  }
}
