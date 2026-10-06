import {
  elevenLabsOptionsResponse,
  isSafeElevenLabsVoiceId,
  proxyElevenLabsRequest,
} from "@/app/api/v1/_shared/elevenLabsProxy";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import { CORS_HEADERS } from "@/shared/utils/cors";

export async function OPTIONS() {
  return elevenLabsOptionsResponse();
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ voiceId: string }> }
) {
  const { voiceId } = await params;
  if (!isSafeElevenLabsVoiceId(voiceId)) {
    return new Response(JSON.stringify(buildErrorBody(400, "Invalid ElevenLabs voice ID")), {
      status: 400,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }
  return proxyElevenLabsRequest(request, `/text-to-speech/${voiceId}`, {
    method: "POST",
    body: request.body,
    duplex: "half",
  });
}
