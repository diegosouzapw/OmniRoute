import {
  fishAudioOptionsResponse,
  isFishAudioVoiceProvider,
  isSafeFishAudioVoiceId,
  proxyFishAudioRequest,
} from "@/app/api/v1/_shared/fishAudioProxy";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { enforceClientApiRouteAuth } from "@/shared/utils/clientApiRouteAuth";

export async function OPTIONS() {
  return fishAudioOptionsResponse();
}

async function resolveVoiceRequest(
  request: Request,
  params: Promise<{ provider: string; voiceId: string }>
): Promise<{ pathname: string } | { rejection: Response }> {
  const { provider, voiceId } = await params;
  if (!isFishAudioVoiceProvider(provider)) {
    return {
      rejection: errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        `Voice-model management is not supported for provider: ${provider}`
      ),
    };
  }
  if (!isSafeFishAudioVoiceId(voiceId)) {
    return { rejection: errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid Fish Audio voice ID") };
  }
  const authRejection = await enforceClientApiRouteAuth(request);
  if (authRejection) return { rejection: authRejection };
  return { pathname: `/model/${voiceId}` };
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ provider: string; voiceId: string }> }
) {
  const resolved = await resolveVoiceRequest(request, params);
  if ("rejection" in resolved) return resolved.rejection;
  return proxyFishAudioRequest(request, resolved.pathname, { method: "GET" });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ provider: string; voiceId: string }> }
) {
  const resolved = await resolveVoiceRequest(request, params);
  if ("rejection" in resolved) return resolved.rejection;
  return proxyFishAudioRequest(request, resolved.pathname, {
    method: "PATCH",
    body: request.body,
    duplex: "half",
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ provider: string; voiceId: string }> }
) {
  const resolved = await resolveVoiceRequest(request, params);
  if ("rejection" in resolved) return resolved.rejection;
  return proxyFishAudioRequest(request, resolved.pathname, { method: "DELETE" });
}
