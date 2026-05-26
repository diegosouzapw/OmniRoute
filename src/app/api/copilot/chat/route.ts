import { NextResponse } from "next/server";
import { z } from "zod";
import { processCopilotChat } from "@/lib/copilot/engine";
import type { CopilotRequest } from "@/lib/copilot/engine";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";

const copilotRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string(),
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
  try {
    const raw = await request.json();
    const parsed = copilotRequestSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        buildErrorBody(400, parsed.error.issues[0]?.message ?? "Invalid request"),
        { status: 400 }
      );
    }
    const body = parsed.data as CopilotRequest;

    const response = await processCopilotChat(body);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    // buildErrorBody() routes through sanitizeErrorMessage(), which strips
    // stack traces and absolute file paths. Hard rule #12.
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}
