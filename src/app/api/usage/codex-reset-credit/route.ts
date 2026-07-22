import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import {
  CodexResetCreditError,
  consumeCodexResetCredit,
  listCodexResetCredits,
} from "@/lib/usage/codexResetCredits";

const ConnectionIdSchema = z.string().trim().min(1).max(256);

const CodexResetCreditBodySchema = z.object({
  connectionId: ConnectionIdSchema,
  idempotencyKey: z.string().trim().min(1).max(256),
  creditId: z.string().trim().min(1).max(512).optional(),
});

function buildErrorResponse(error: unknown) {
  const status = error instanceof CodexResetCreditError ? error.status : 500;
  const code = error instanceof CodexResetCreditError ? error.code : "codex_reset_credit_failed";
  const message =
    error instanceof CodexResetCreditError
      ? sanitizeErrorMessage(error.message) || "Codex reset-credit request failed."
      : "Codex reset-credit request failed.";
  console.error("[API] /api/usage/codex-reset-credit error:", error);
  return NextResponse.json({ ok: false, code, error: message }, { status });
}

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const parsed = ConnectionIdSchema.safeParse(
      new URL(request.url).searchParams.get("connectionId")
    );
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, code: "invalid_connection_id", error: "Invalid connectionId." },
        { status: 400 }
      );
    }
    const result = await listCodexResetCredits(parsed.data);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return buildErrorResponse(error);
  }
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const raw = await request.json().catch(() => ({}));
    const parsed = CodexResetCreditBodySchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, code: "invalid_request_body", error: "Invalid request body." },
        { status: 400 }
      );
    }

    const result = await consumeCodexResetCredit(
      parsed.data.connectionId,
      parsed.data.idempotencyKey,
      parsed.data.creditId
    );
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return buildErrorResponse(error);
  }
}
