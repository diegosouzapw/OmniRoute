import { NextResponse } from "next/server";
import { getTailscaleTunnelStatus, installTailscale } from "@/lib/tailscaleTunnel";
import { parseOptionalJsonBody, requireTailscaleAuth, tailscaleSudoSchema } from "../routeUtils";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const authError = await requireTailscaleAuth(request);
  if (authError) return authError;

  const parsed = await parseOptionalJsonBody(request, tailscaleSudoSchema);
  if ("response" in parsed) return parsed.response;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const pushEvent = (event: string, payload: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`));
      };

      void (async () => {
        try {
          await installTailscale({
            sudoPassword: parsed.data.sudoPassword,
            onProgress: (message) => pushEvent("progress", { message }),
          });

          pushEvent("done", {
            success: true,
            status: await getTailscaleTunnelStatus(),
          });
        } catch (error) {
          pushEvent("error", {
            error: error instanceof Error ? error.message : "Failed to install Tailscale",
          });
        } finally {
          controller.close();
        }
      })();
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
