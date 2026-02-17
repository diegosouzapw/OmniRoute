/**
 * Audio Speech Handler (TTS)
 *
 * Handles POST /v1/audio/speech (OpenAI TTS API format).
 * Returns audio binary stream.
 *
 * Supported provider formats:
 * - OpenAI: standard JSON → audio stream proxy
 * - Hyperbolic: POST { text } → { audio: base64 }
 * - Deepgram: POST { text } with model via query param, Token auth
 */

import { getSpeechProvider, parseSpeechModel } from "../config/audioRegistry.ts";
import { errorResponse } from "../utils/error.ts";

/**
 * Build auth header for a speech provider
 */
function buildAuthHeader(providerConfig, token) {
  if (providerConfig.authHeader === "token") {
    return { Authorization: `Token ${token}` };
  }
  return { Authorization: `Bearer ${token}` };
}

/**
 * Handle Hyperbolic TTS (returns base64 audio in JSON)
 */
async function handleHyperbolicSpeech(providerConfig, body, token) {
  const res = await fetch(providerConfig.baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...buildAuthHeader(providerConfig, token),
    },
    body: JSON.stringify({ text: body.input }),
  });

  if (!res.ok) {
    const errText = await res.text();
    return new Response(errText, {
      status: res.status,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  const data = await res.json();
  // Hyperbolic returns { audio: "<base64>" }, decode to binary
  const audioBuffer = Uint8Array.from(atob(data.audio), (c) => c.charCodeAt(0));

  return new Response(audioBuffer, {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

/**
 * Handle Deepgram TTS (model via query param, Token auth, returns binary audio)
 */
async function handleDeepgramSpeech(providerConfig, body, modelId, token) {
  const url = new URL(providerConfig.baseUrl);
  url.searchParams.set("model", modelId);

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...buildAuthHeader(providerConfig, token),
    },
    body: JSON.stringify({ text: body.input }),
  });

  if (!res.ok) {
    const errText = await res.text();
    return new Response(errText, {
      status: res.status,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  const contentType = res.headers.get("content-type") || "audio/mpeg";
  return new Response(res.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*",
      "Transfer-Encoding": "chunked",
    },
  });
}

/**
 * Handle audio speech (TTS) request
 *
 * @param {Object} options
 * @param {Object} options.body - JSON request body { model, input, voice, ... }
 * @param {Object} options.credentials - Provider credentials { apiKey }
 * @returns {Response}
 */
/** @returns {Promise<any>} */
export async function handleAudioSpeech({ body, credentials }) {
  if (!body.model) {
    return errorResponse(400, "model is required");
  }
  if (!body.input) {
    return errorResponse(400, "input is required");
  }

  const { provider: providerId, model: modelId } = parseSpeechModel(body.model);
  const providerConfig = providerId ? getSpeechProvider(providerId) : null;

  if (!providerConfig) {
    return errorResponse(
      400,
      `No speech provider found for model "${body.model}". Available: openai, hyperbolic, deepgram`
    );
  }

  const token = credentials?.apiKey || credentials?.accessToken;
  if (!token) {
    return errorResponse(401, `No credentials for speech provider: ${providerId}`);
  }

  try {
    // Route to provider-specific handler
    if (providerConfig.format === "hyperbolic") {
      return handleHyperbolicSpeech(providerConfig, body, token);
    }

    if (providerConfig.format === "deepgram") {
      return handleDeepgramSpeech(providerConfig, body, modelId, token);
    }

    // Default: OpenAI-compatible JSON → audio stream proxy
    const res = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...buildAuthHeader(providerConfig, token),
      },
      body: JSON.stringify({
        model: modelId,
        input: body.input,
        voice: body.voice || "alloy",
        response_format: body.response_format || "mp3",
        speed: body.speed || 1.0,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return new Response(errText, {
        status: res.status,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    // Stream audio response back to client
    const contentType = res.headers.get("content-type") || "audio/mpeg";
    return new Response(res.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (err) {
    return errorResponse(500, `Speech request failed: ${err.message}`);
  }
}
