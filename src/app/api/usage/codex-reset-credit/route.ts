import { NextResponse } from "next/server";
import { CodexResetCreditError, consumeCodexResetCredit } from "@/lib/usage/codexResetCredits";

type RequestBody = {
  connectionId?: unknown;
  idempotencyKey?: unknown;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as RequestBody;
    const connectionId = typeof body.connectionId === "string" ? body.connectionId : "";
    const idempotencyKey = typeof body.idempotencyKey === "string" ? body.idempotencyKey : "";

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
