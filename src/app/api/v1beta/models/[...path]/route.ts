import { buildClientRawRequest, handleChat } from "@/sse/handlers/chat";
import { initTranslators } from "@omniroute/open-sse/translator/index.ts";
import {
  convertOpenAIResponseToGemini,
  transformOpenAISSEToGeminiSSE,
} from "@omniroute/open-sse/translator/response/openai-to-gemini-sse";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { v1betaGeminiGenerateSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

let initialized = false;

/**
 * Initialize translators once
 */
async function ensureInitialized() {
  if (!initialized) {
    await initTranslators();
    initialized = true;
    console.log("[SSE] Translators initialized for /v1beta/models");
  }
}

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * POST /v1beta/models/{model}:generateContent        — non-streaming (JSON)
 * POST /v1beta/models/{model}:streamGenerateContent  — streaming (SSE)
 *
 * Streaming intent is determined by the URL action suffix (the canonical
 * Gemini API convention), NOT by a body field. `generationConfig.stream` is
 * not a real Gemini API field and the @google/genai SDK never sets it.
 *
 * The SDK always uses `:streamGenerateContent?alt=sse` for chat. handleChat
 * returns OpenAI SSE; transformOpenAISSEToGeminiSSE() converts it to Gemini
 * SSE on the fly so the SDK doesn't crash on the `[DONE]` sentinel.
 *
 * Ported from upstream decolua/9router#225 by @SteelMorgan.
 */
export async function POST(request, { params }) {
  await ensureInitialized();

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return Response.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const { path } = await params;
    // path = ["provider", "model:action"] or ["model:action"]

    let model;
    let action: ":generateContent" | ":streamGenerateContent";
    if (path.length >= 2) {
      // Format: /v1beta/models/provider/model:action
      const provider = path[0];
      const modelAction = path[1];
      action = modelAction.includes(":streamGenerateContent")
        ? ":streamGenerateContent"
        : ":generateContent";
      const modelName = modelAction
        .replace(":streamGenerateContent", "")
        .replace(":generateContent", "");
      model = `${provider}/${modelName}`;
    } else {
      // Format: /v1beta/models/model:action
      const modelAction = path[0];
      action = modelAction.includes(":streamGenerateContent")
        ? ":streamGenerateContent"
        : ":generateContent";
      model = modelAction
        .replace(":streamGenerateContent", "")
        .replace(":generateContent", "");
    }

    const validation = validateBody(v1betaGeminiGenerateSchema, rawBody);
    if (isValidationFailure(validation)) {
      return Response.json({ error: validation.error }, { status: 400 });
    }
    const body = validation.data;

    // Streaming is determined by URL action suffix:
    //   :streamGenerateContent => stream: true  (SSE)
    //   :generateContent       => stream: false (plain JSON)
    const stream = action === ":streamGenerateContent";

    // Convert Gemini format to OpenAI/internal format
    const convertedBody = convertGeminiToInternal(body, model, stream);

    // Create new request with converted body
    const newRequest = new Request(request.url, {
      method: "POST",
      headers: request.headers,
      body: JSON.stringify(convertedBody),
    });

    const response = await handleChat(newRequest, buildClientRawRequest(request, rawBody));

    if (stream) {
      // Transform OpenAI SSE => Gemini SSE on the fly. The @google/genai SDK
      // always uses :streamGenerateContent?alt=sse and expects Gemini SSE
      // chunks (no [DONE] sentinel — stream just closes).
      return transformOpenAISSEToGeminiSSE(response, model);
    }
    // Convert OpenAI JSON => Gemini GenerateContentResponse JSON.
    return await convertOpenAIResponseToGemini(response, model);
  } catch (error) {
    console.log("Error handling Gemini request:", error);
    return Response.json(
      { error: { message: sanitizeErrorMessage(error), code: 500 } },
      { status: 500 }
    );
  }
}

/**
 * Convert Gemini request format to OpenAI/internal format.
 *
 * @param geminiBody parsed Gemini request body
 * @param model      resolved model string (e.g. "gemini/gemini-pro")
 * @param stream     whether to stream (derived from URL action suffix)
 */
function convertGeminiToInternal(geminiBody, model, stream) {
  const messages = [];

  // Convert system instruction
  if (geminiBody.systemInstruction) {
    const systemText = geminiBody.systemInstruction.parts?.map((p) => p.text).join("\n") || "";
    if (systemText) {
      messages.push({ role: "system", content: systemText });
    }
  }

  // Convert contents to messages
  if (geminiBody.contents) {
    for (const content of geminiBody.contents) {
      const role = content.role === "model" ? "assistant" : "user";
      const text = content.parts?.map((p) => p.text).join("\n") || "";
      messages.push({ role, content: text });
    }
  }

  return {
    model,
    messages,
    stream,
    max_tokens: geminiBody.generationConfig?.maxOutputTokens,
    temperature: geminiBody.generationConfig?.temperature,
    top_p: geminiBody.generationConfig?.topP,
  };
}
