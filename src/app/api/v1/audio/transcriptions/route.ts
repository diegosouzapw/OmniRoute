import { handleAudioTranscription } from "@omniroute/open-sse/handlers/audioTranscription.ts";
import { getProviderCredentials, extractApiKey, isValidApiKey } from "@/sse/services/auth";
import { parseTranscriptionModel } from "@omniroute/open-sse/config/audioRegistry.ts";
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
 * POST /v1/audio/transcriptions — transcribe audio files
 * OpenAI Whisper API compatible (multipart/form-data)
 */
export async function POST(request) {
  // Optional API key validation
  if (process.env.REQUIRE_API_KEY === "true") {
    const apiKey = extractApiKey(request);
    if (!apiKey) return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Missing API key");
    const valid = await isValidApiKey(apiKey);
    if (!valid) return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Invalid API key");
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid multipart form data");
  }

  const model = formData.get("model");
  if (!model) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Missing model");
  }

  const { provider } = parseTranscriptionModel(model);
  if (!provider) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Invalid transcription model: ${model}. Use format: provider/model`
    );
  }

  const credentials = await getProviderCredentials(provider);
  if (!credentials) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, `No credentials for provider: ${provider}`);
  }

  return handleAudioTranscription({ formData, credentials });
}
