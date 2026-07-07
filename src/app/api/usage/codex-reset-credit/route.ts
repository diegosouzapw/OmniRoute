import { NextResponse } from "next/server";
import { z } from "zod";
import { CodexResetCreditError, consumeCodexResetCredit } from "@/lib/usage/codexResetCredits";

const CodexResetCreditBodySchema = z.object({
  connectionId: z.string().optional(),
  idempotencyKey: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const raw = await request.json().catch(() => ({}));
    const parsed = CodexResetCreditBodySchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, code: "invalid_request_body", error: "Invalid request body." },
        { status: 400 }
      );
    }

    const connectionId = parsed.data.connectionId ?? "";
    const idempotencyKey = parsed.data.idempotencyKey ?? "";

    const result = await consumeCodexResetCredit(connectionId, idempotencyKey);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    const status = error instanceof CodexResetCreditError ? error.status : 500;
    const code = error instanceof CodexResetCreditError ? error.code : "codex_reset_credit_failed";
    const message = error instanceof Error ? error.message : "Failed to redeem Codex reset credit.";
    console.error("[API] POST /api/usage/codex-reset-credit error:", error);
    return NextResponse.json({ ok: false, code, error: message }, { status });
  }
}
