import { NextRequest } from "next/server";
import { z } from "zod";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { canInstallTailscaleWithoutSudo, installTailscale } from "@/lib/tunnel/tailscale";
import { generateShortId, loadTunnelState, updateTunnelState } from "@/lib/tunnel/tunnelState";

export const dynamic = "force-dynamic";

const bodySchema = z.object({
  sudoPassword: z.string().max(200).optional(),
});

function sseHeaders() {
  return {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  };
}

function sendSseEvent(
  controller: ReadableStreamDefaultController<Uint8Array>,
  encoder: TextEncoder,
  event: string,
  payload: unknown
) {
  controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`));
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    rawBody = {};
  }

  const validation = validateBody(bodySchema, rawBody);
  if (isValidationFailure(validation)) {
    return validation.response;
  }

  const { sudoPassword = "" } = validation.data;
  if (!canInstallTailscaleWithoutSudo() && !sudoPassword.trim()) {
    return new Response(JSON.stringify({ error: "Sudo password is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const shortId = loadTunnelState()?.shortId || generateShortId();
  updateTunnelState({ shortId });

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const result = await installTailscale(sudoPassword, shortId, (message) => {
          sendSseEvent(controller, encoder, "progress", { message });
        });
        sendSseEvent(controller, encoder, "done", result);
      } catch (error) {
        sendSseEvent(controller, encoder, "error", {
          error: error instanceof Error ? error.message : "Failed to install Tailscale",
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, { headers: sseHeaders() });
}
