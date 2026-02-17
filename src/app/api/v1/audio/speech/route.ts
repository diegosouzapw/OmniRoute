import { handleAudioSpeech } from "@omniroute/open-sse/handlers/audioSpeech.ts";
import { getProviderCredentials, extractApiKey, isValidApiKey } from "@/sse/services/auth";
import { parseSpeechModel } from "@omniroute/open-sse/config/audioRegistry.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * POST /v1/audio/speech — text-to-speech
 * OpenAI TTS API compatible. Returns audio stream.
 */
export async function POST(request) {
  if (process.env.REQUIRE_API_KEY === "true") {
    const apiKey = extractApiKey(request);
    if (!apiKey) return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Missing API key");
    const valid = await isValidApiKey(apiKey);
    if (!valid) return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Invalid API key");
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

  if (!body.model) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Missing model");
  }

  const { provider } = parseSpeechModel(body.model);
  if (!provider) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Invalid speech model: ${body.model}. Use format: provider/model`
    );
  }

  const credentials = await getProviderCredentials(provider);
  if (!credentials) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, `No credentials for provider: ${provider}`);
  }

  return handleAudioSpeech({ body, credentials });
}
