import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { processCopilotChat } from "@/lib/copilot/engine";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { sanitizeErrorMessage, buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

const copilotRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string().min(1, "message content is required"),
      })
    )
    .min(1, "messages array is required"),
});

/**
 * POST /api/copilot/chat
 *
 * OmniRoute Copilot chat endpoint.
 * Accepts user messages about OmniRoute configuration and returns
 * tool-based responses + AI guidance.
 *
 * Body: { messages: [{ role: "user"|"assistant"|"system", content: string }] }
 */
export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const rawBody = await request.json();
    const validation = validateBody(copilotRequestSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json(buildErrorBody(400, validation.error), { status: 400 });
    }

    const response = await processCopilotChat(validation.data);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const message = sanitizeErrorMessage(error);
    return NextResponse.json(buildErrorBody(500, `Copilot error: ${message}`), { status: 500 });
  }
}
