import {
  fishAudioOptionsResponse,
  isFishAudioVoiceProvider,
  proxyFishAudioRequest,
} from "@/app/api/v1/_shared/fishAudioProxy";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { enforceClientApiRouteAuth } from "@/shared/utils/clientApiRouteAuth";

export async function OPTIONS() {
  return fishAudioOptionsResponse();
}

async function validateProviderAndAuth(request: Request, rawProvider: string): Promise<Response | null> {
  if (!isFishAudioVoiceProvider(rawProvider)) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Voice-model management is not supported for provider: ${rawProvider}`
    );
  }
  return enforceClientApiRouteAuth(request);
}

/** GET /v1/providers/fishaudio/voices — proxy Fish Audio voice-model listing. */
export async function GET(request: Request, { params }: { params: Promise<{ provider: string }> }) {
  const { provider } = await params;
  const rejection = await validateProviderAndAuth(request, provider);
  if (rejection) return rejection;
  return proxyFishAudioRequest(request, "/model", { method: "GET" });
}

/**
 * POST /v1/providers/fishaudio/voices — create a persistent Fish Audio clone.
 * Send Fish's native multipart/form-data fields (`type=tts`, `title`,
 * `train_mode=fast`, one or more `voices` files, optional `texts`, etc.).
 */
export async function POST(request: Request, { params }: { params: Promise<{ provider: string }> }) {
  const { provider } = await params;
  const rejection = await validateProviderAndAuth(request, provider);
  if (rejection) return rejection;

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().startsWith("multipart/form-data")) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      "Fish Audio voice creation requires multipart/form-data"
    );
  }

  return proxyFishAudioRequest(request, "/model", {
    method: "POST",
    body: request.body,
    duplex: "half",
  });
}
