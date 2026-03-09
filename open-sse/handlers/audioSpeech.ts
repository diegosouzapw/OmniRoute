import { getCorsOrigin } from "../utils/cors.ts";
/**
 * Audio Speech Handler (TTS)
 *
 * Handles POST /v1/audio/speech (OpenAI TTS API format).
 * Returns audio binary stream.
 *
 * Supported provider formats:
 * - OpenAI / Qwen3 (openai-compatible): standard JSON → audio stream proxy
 * - Hyperbolic: POST { text } → { audio: base64 }
 * - Deepgram: POST { text } with model via query param, Token auth
 * - ElevenLabs: POST { text, model_id } to /v1/text-to-speech/{voice_id}
 * - Nvidia NIM: POST { input: { text }, voice, model } → audio binary
 * - HuggingFace Inference: POST { inputs: text } to /models/{model_id}
 * - Coqui TTS: POST { text, speaker_id } → WAV audio (local, no auth)
 * - Tortoise TTS: POST { text, voice } → audio binary (local, no auth)
 */

import { getSpeechProvider, parseSpeechModel } from "../config/audioRegistry.ts";
import { buildAuthHeaders } from "../config/registryUtils.ts";
import { errorResponse } from "../utils/error.ts";

/**
 * Return a CORS error response from an upstream fetch failure
 */
function upstreamErrorResponse(res, errText) {
  return new Response(errText, {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": getCorsOrigin(),
    },
  });
}

/**
 * Return a CORS audio stream response
 */
function audioStreamResponse(res, defaultContentType = "audio/mpeg") {
  const contentType = res.headers.get("content-type") || defaultContentType;
  return new Response(res.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": getCorsOrigin(),
      "Transfer-Encoding": "chunked",
    },
  });
}

/**
 * Validate a path segment to prevent path traversal / SSRF.
 * Returns true if safe, false if it contains traversal sequences.
 */
function isValidPathSegment(segment: string): boolean {
  return !segment.includes("..") && !segment.includes("//");
}

/**
 * Handle Hyperbolic TTS (returns base64 audio in JSON)
 */
async function handleHyperbolicSpeech(providerConfig, body, token) {
  const res = await fetch(providerConfig.baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...buildAuthHeaders(providerConfig, token),
    },
    body: JSON.stringify({ text: body.input }),
  });

  if (!res.ok) {
    return upstreamErrorResponse(res, await res.text());
  }

  const data = await res.json();
  // Hyperbolic returns { audio: "<base64>" }, decode to binary
  const audioBuffer = Uint8Array.from(atob(data.audio), (c) => c.charCodeAt(0));

  return new Response(audioBuffer, {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg",
      "Access-Control-Allow-Origin": getCorsOrigin(),
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
      ...buildAuthHeaders(providerConfig, token),
    },
    body: JSON.stringify({ text: body.input }),
  });

  if (!res.ok) {
    return upstreamErrorResponse(res, await res.text());
  }

  return audioStreamResponse(res);
}

/**
 * Handle ElevenLabs TTS
 * POST {baseUrl}/{voice_id} with { text, model_id }
 * voice_id is mapped from the OpenAI `voice` parameter
 */
async function handleElevenLabsSpeech(providerConfig, body, modelId, token) {
  // ElevenLabs uses voice_id in URL path; default to "21m00Tcm4TlvDq8ikWAM" (Rachel)
  const voiceId = body.voice || "21m00Tcm4TlvDq8ikWAM";
  if (!isValidPathSegment(voiceId)) {
    return errorResponse(400, "Invalid voice ID");
  }
  const url = `${providerConfig.baseUrl}/${voiceId}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...buildAuthHeaders(providerConfig, token),
    },
    body: JSON.stringify({
      text: body.input,
      model_id: modelId,
    }),
  });

  if (!res.ok) {
    return upstreamErrorResponse(res, await res.text());
  }

  return audioStreamResponse(res);
}

/**
 * Handle Nvidia NIM TTS
 * POST with { input: { text }, voice, model } → audio binary
 */
async function handleNvidiaTtsSpeech(providerConfig, body, modelId, token) {
  const res = await fetch(providerConfig.baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...buildAuthHeaders(providerConfig, token),
    },
    body: JSON.stringify({
      input: { text: body.input },
      voice: body.voice || "default",
      model: modelId,
    }),
  });

  if (!res.ok) {
    return upstreamErrorResponse(res, await res.text());
  }

  return audioStreamResponse(res, "audio/wav");
}

/**
 * Handle HuggingFace Inference TTS
 * POST {baseUrl}/{model_id} with { inputs: text } → audio binary
 */
async function handleHuggingFaceTtsSpeech(providerConfig, body, modelId, token) {
  if (!isValidPathSegment(modelId)) {
    return errorResponse(400, "Invalid model ID");
  }
  const url = `${providerConfig.baseUrl}/${modelId}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...buildAuthHeaders(providerConfig, token),
    },
    body: JSON.stringify({ inputs: body.input }),
  });

  if (!res.ok) {
    return upstreamErrorResponse(res, await res.text());
  }

  return audioStreamResponse(res, "audio/wav");
}

/**
 * Handle Inworld TTS
 * POST { text, voiceId, modelId, audioConfig } → JSON { audioContent: "<base64>" }
 * Docs: https://docs.inworld.ai/api-reference/ttsAPI/texttospeech/synthesize-speech
 */
async function handleInworldSpeech(providerConfig, body, modelId, token) {
  const res = await fetch(providerConfig.baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${token}`,
    },
    body: JSON.stringify({
      text: body.input,
      voiceId: body.voice || undefined,
      modelId,
      audioConfig: {
        audioEncoding: body.response_format === "wav" ? "LINEAR16" : "MP3",
      },
    }),
  });

  if (!res.ok) {
    return upstreamErrorResponse(res, await res.text());
  }

  const data = await res.json();
  // Decode base64 audioContent to binary
  const audioBuffer = Uint8Array.from(atob(data.audioContent ?? ""), (c) => c.charCodeAt(0));
  const mimeType = body.response_format === "wav" ? "audio/wav" : "audio/mpeg";

  return new Response(audioBuffer, {
    status: 200,
    headers: {
      "Content-Type": mimeType,
      "Access-Control-Allow-Origin": getCorsOrigin(),
    },
  });
}

/**
 * Handle Cartesia TTS
 * POST { model_id, transcript, voice, output_format } → binary audio bytes
 * Docs: https://docs.cartesia.ai/api-reference/tts/bytes
 */
async function handleCartesiaSpeech(providerConfig, body, modelId, token) {
  const outputFormat =
    body.response_format === "wav"
      ? { container: "wav", sample_rate: 44100 }
      : { container: "mp3", bit_rate: 128000, sample_rate: 44100 };

  const res = await fetch(providerConfig.baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": token,
      "Cartesia-Version": "2024-06-10",
    },
    body: JSON.stringify({
      model_id: modelId,
      transcript: body.input,
      ...(body.voice ? { voice: { mode: "id", id: body.voice } } : {}),
      output_format: outputFormat,
    }),
  });

  if (!res.ok) {
    return upstreamErrorResponse(res, await res.text());
  }

  return audioStreamResponse(res);
}

/**
 * Handle PlayHT TTS
 * POST { text, voice, voice_engine, output_format } → audio stream
 * Auth: X-USER-ID header (from token string "userId:apiKey")
 * Docs: https://docs.play.ht/reference/api-generate-tts-audio-stream
 */
async function handlePlayHtSpeech(providerConfig, body, modelId, token) {
  // PlayHT tokens are stored as "userId:apiKey"
  const [userId, apiKey] = (token || ":").split(":");

  const res = await fetch(providerConfig.baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
      "X-USER-ID": userId || "",
      Authorization: `Bearer ${apiKey || token}`,
    },
    body: JSON.stringify({
      text: body.input,
      voice:
        body.voice ||
        "s3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json",
      voice_engine: modelId || "PlayDialog",
      output_format: body.response_format || "mp3",
      speed: body.speed || 1,
    }),
  });

  if (!res.ok) {
    return upstreamErrorResponse(res, await res.text());
  }

  return audioStreamResponse(res);
}

/**
 * Handle Coqui TTS (local, no auth)
 * POST {baseUrl} with { text, speaker_id } → WAV audio
 */
async function handleCoquiSpeech(providerConfig, body) {
  const res = await fetch(providerConfig.baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: body.input,
      speaker_id: body.voice || undefined,
    }),
  });

  if (!res.ok) {
    return upstreamErrorResponse(res, await res.text());
  }

  const contentType = res.headers.get("content-type") || "audio/wav";
  return new Response(res.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": getCorsOrigin(),
    },
  });
}

/**
 * Handle Tortoise TTS (local, no auth)
 * POST {baseUrl} with { text, voice } → audio binary
 */
async function handleTortoiseSpeech(providerConfig, body) {
  const res = await fetch(providerConfig.baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: body.input,
      voice: body.voice || "random",
    }),
  });

  if (!res.ok) {
    return upstreamErrorResponse(res, await res.text());
  }

  const contentType = res.headers.get("content-type") || "audio/wav";
  return new Response(res.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": getCorsOrigin(),
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
/** @returns {Promise<unknown>} */
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
      `No speech provider found for model "${body.model}". Use format provider/model. Available: openai, hyperbolic, deepgram, nvidia, elevenlabs, huggingface, inworld, cartesia, playht, coqui, tortoise, qwen`
    );
  }

  // Skip credential check for local providers (authType: "none")
  const token =
    providerConfig.authType === "none" ? null : credentials?.apiKey || credentials?.accessToken;
  if (providerConfig.authType !== "none" && !token) {
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

    if (providerConfig.format === "elevenlabs") {
      return handleElevenLabsSpeech(providerConfig, body, modelId, token);
    }

    if (providerConfig.format === "nvidia-tts") {
      return handleNvidiaTtsSpeech(providerConfig, body, modelId, token);
    }

    if (providerConfig.format === "huggingface-tts") {
      return handleHuggingFaceTtsSpeech(providerConfig, body, modelId, token);
    }

    if (providerConfig.format === "inworld") {
      return handleInworldSpeech(providerConfig, body, modelId, token);
    }

    if (providerConfig.format === "cartesia") {
      return handleCartesiaSpeech(providerConfig, body, modelId, token);
    }

    if (providerConfig.format === "playht") {
      return handlePlayHtSpeech(providerConfig, body, modelId, token);
    }

    if (providerConfig.format === "coqui") {
      return handleCoquiSpeech(providerConfig, body);
    }

    if (providerConfig.format === "tortoise") {
      return handleTortoiseSpeech(providerConfig, body);
    }

    // Default: OpenAI-compatible JSON → audio stream proxy (also used by Qwen3)
    const res = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...buildAuthHeaders(providerConfig, token),
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
      return upstreamErrorResponse(res, await res.text());
    }

    return audioStreamResponse(res);
  } catch (err) {
    return errorResponse(500, `Speech request failed: ${err.message}`);
  }
}
