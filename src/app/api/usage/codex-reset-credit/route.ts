import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import {
  CodexResetCreditError,
  consumeCodexResetCredit,
  listCodexResetCredits,
} from "@/lib/usage/codexResetCredits";
import {
  GrokResetCreditError,
  consumeGrokResetCredit,
  listGrokResetCredits,
} from "@/lib/usage/grokResetCredits";
import { getProviderConnectionById } from "@/lib/db/providers";

const ConnectionIdSchema = z.string().trim().min(1).max(256);

const CodexResetCreditBodySchema = z.object({
  connectionId: ConnectionIdSchema,
  idempotencyKey: z.string().trim().min(1).max(256),
  creditId: z.string().trim().min(1).max(512).optional(),
});

function isResetCreditError(
  error: unknown
): error is CodexResetCreditError | GrokResetCreditError {
  return error instanceof CodexResetCreditError || error instanceof GrokResetCreditError;
}

function buildErrorResponse(error: unknown) {
  const status = isResetCreditError(error) ? error.status : 500;
  const code = isResetCreditError(error) ? error.code : "reset_credit_failed";
  const message = isResetCreditError(error)
    ? sanitizeErrorMessage(error.message) || "Reset-credit request failed."
    : "Reset-credit request failed.";
  console.error("[API] /api/usage/codex-reset-credit error:", error);
  return NextResponse.json({ ok: false, code, error: message }, { status });
}

function unsupportedResetCreditProvider(provider: string | null) {
  return NextResponse.json(
    {
      ok: false,
      code: provider ? "unsupported_reset_credit_provider" : "connection_not_found",
      error: provider
        ? "Reset credits are only available for Codex and Grok Build accounts."
        : "Connection not found.",
    },
    { status: provider ? 400 : 404 }
  );
}

async function resolveResetCreditProvider(connectionId: string): Promise<string | null> {
  const connection = await getProviderConnectionById(connectionId);
  return connection && typeof connection.provider === "string" ? connection.provider : null;
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
    const provider = await resolveResetCreditProvider(parsed.data);
    if (provider === "grok-cli") {
      const result = await listGrokResetCredits(parsed.data);
      return NextResponse.json({ ok: true, ...result });
    }
    if (provider === "codex") {
      const result = await listCodexResetCredits(parsed.data);
      return NextResponse.json({ ok: true, ...result });
    }
    return unsupportedResetCreditProvider(provider);
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

    const provider = await resolveResetCreditProvider(parsed.data.connectionId);
    if (provider === "grok-cli") {
      const result = await consumeGrokResetCredit(
        parsed.data.connectionId,
        parsed.data.idempotencyKey,
        parsed.data.creditId
      );
      return NextResponse.json({ ok: true, ...result });
    }
    if (provider === "codex") {
      const result = await consumeCodexResetCredit(
        parsed.data.connectionId,
        parsed.data.idempotencyKey,
        parsed.data.creditId
      );
      return NextResponse.json({ ok: true, ...result });
    }
    return unsupportedResetCreditProvider(provider);
  } catch (error) {
    return buildErrorResponse(error);
  }
}
