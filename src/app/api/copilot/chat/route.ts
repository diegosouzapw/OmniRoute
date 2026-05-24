import { NextResponse } from "next/server";
import { processCopilotChat } from "@/lib/copilot/engine";
import type { CopilotRequest } from "@/lib/copilot/engine";

/**
 * POST /api/copilot/chat
 *
 * OmniRoute Copilot chat endpoint.
 * Accepts user messages about OmniRoute configuration and returns
 * tool-based responses + AI guidance.
 *
 * Body: { messages: [{ role: "user"|"assistant", content: string }] }
 */
export async function POST(request: Request) {
  try {
    const body: CopilotRequest = await request.json();

    if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json({ error: "messages array is required" }, { status: 400 });
    }

    const response = await processCopilotChat(body);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Copilot error: ${message}` }, { status: 500 });
  }
}
