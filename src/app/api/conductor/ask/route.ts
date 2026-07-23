/**
 * POST /api/conductor/ask — proxy para o Faro (spokesperson do OmniConductor).
 * O /ask do Faro exige credencial do hub (server-side); o browser fala só com
 * esta rota. Resposta whitelisted {text, pending} — quando `pending` vier, a UI
 * oferece Sim/Não (a trava de confirmação é do motor do Faro; nunca contornada).
 */

import { NextResponse } from "next/server";
import { z } from "zod";

import { createErrorResponse } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { askFaro } from "@/lib/conductor/faroProxy";

const askSchema = z.object({ message: z.string().min(1).max(4000) });

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return createErrorResponse({ status: 400, message: "Invalid JSON body" });
  }
  const parsed = askSchema.safeParse(raw);
  if (!parsed.success) {
    return createErrorResponse({ status: 400, message: "Body must be { message: string (1-4000 chars) }" });
  }

  const answer = await askFaro(parsed.data.message);
  if (!answer.ok) {
    return createErrorResponse({ status: 503, message: "Faro (spokesperson) is offline or refused the request" });
  }
  return NextResponse.json({ text: answer.text, pending: answer.pending });
}
