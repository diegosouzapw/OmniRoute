/**
 * VeoAIFreeWebExecutor — Veo AI Free Multi-Tool Provider
 *
 * Routes requests through veoaifree.com's WordPress AJAX API.
 * Supports: text-to-video, image-to-video, image generation, TTS, prompt enhancement.
 *
 * No auth required. Rate limited to 6 requests/hour per IP.
 */
import { BaseExecutor, type ExecuteInput } from "./base.ts";

const BASE_URL = "https://veoaifree.com";
const AJAX_URL = `${BASE_URL}/wp-admin/admin-ajax.php`;
const TTS_URL = `${BASE_URL}/video/googletts.php`;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
const POLL_INTERVAL_MS = 20_000;
const MAX_POLLS = 30; // 10 minutes max

// ─── Helpers ────────────────────────────────────────────────────────────────

async function fetchNonce(): Promise<string> {
  const res = await fetch(BASE_URL, { headers: { "User-Agent": USER_AGENT } });
  const html = await res.text();
  const match = html.match(/nonce":"([a-f0-9]+)"/);
  if (!match) throw new Error("Failed to extract CSRF nonce from veoaifree.com");
  return match[1];
}

async function postAjax(nonce: string, params: Record<string, string>): Promise<string> {
  const body = new URLSearchParams({ action: "veo_video_generator", nonce, ...params });
  const res = await fetch(AJAX_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": USER_AGENT,
      Origin: BASE_URL,
      Referer: `${BASE_URL}/`,
    },
    body: body.toString(),
  });
  return res.text();
}

function jsonResp(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function errResp(message: string, status = 502): Response {
  return jsonResp({ error: { message } }, status);
}

// ─── Intent Detection ───────────────────────────────────────────────────────

type ToolIntent = "video" | "image" | "tts" | "enhance";

export function detectIntent(model?: string, prompt?: string): ToolIntent {
  const m = (model || "").toLowerCase();
  if (m.includes("tts") || m.includes("speech") || m.includes("audio")) return "tts";
  if (m.includes("image") || m.includes("banana") || m.includes("imagen")) return "image";
  if (m.includes("enhance") || m.includes("prompt")) return "enhance";
  if (m.includes("video") || m.includes("veo") || m.includes("seedance")) return "video";
  // Auto-detect from prompt
  const p = (prompt || "").toLowerCase();
  if (p.startsWith("generate image") || p.startsWith("create image") || p.startsWith("draw "))
    return "image";
  if (p.startsWith("enhance") || p.startsWith("improve prompt")) return "enhance";
  return "video"; // default
}

// ─── Tool Handlers ──────────────────────────────────────────────────────────

async function handleVideo(nonce: string, prompt: string, aspectRatio: string): Promise<Response> {
  // Generate
  const genResult = await postAjax(nonce, {
    prompt,
    totalVariations: "1",
    aspectRatio,
    actionType: "full-video-generate",
  });
  const sceneData = genResult.trim();
  if (!sceneData || sceneData === "0" || sceneData.toLowerCase().includes("error")) {
    return errResp("Video generation failed");
  }

  // Poll
  for (let i = 0; i < MAX_POLLS; i++) {
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
    try {
      const pollResult = await postAjax(nonce, {
        sceneData,
        actionType: "final-video-results",
      });
      const trimmed = pollResult.trim();
      if (trimmed && trimmed !== "0" && !trimmed.toLowerCase().includes("error")) {
        const urls = trimmed
          .split(/[,\n]/)
          .map((u) => u.trim())
          .filter((u) => u.startsWith("http"));
        if (urls.length > 0) {
          return jsonResp({
            object: "video.generation",
            data: urls.map((url) => ({ url, type: "video" })),
            status: "completed",
          });
        }
      }
    } catch {
      /* continue polling */
    }
  }
  return errResp("Video generation timed out after 10 minutes", 504);
}

async function handleImage(nonce: string, prompt: string, aspectRatio: string): Promise<Response> {
  const result = await postAjax(nonce, {
    promptIMG: prompt,
    totalVariationsIMG: "1",
    aspectRatioIMG: aspectRatio,
    actionType: "banan-image-generator",
  });
  const trimmed = result.trim();
  if (!trimmed || trimmed === "0" || trimmed.toLowerCase().includes("error")) {
    return errResp("Image generation failed");
  }
  // Response is comma-separated base64 PNGs or URLs
  const parts = trimmed
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const images = parts.map((p) =>
    p.startsWith("http") ? { url: p, type: "image" } : { b64_json: p, type: "image" }
  );
  return jsonResp({ object: "image.generation", data: images, status: "completed" });
}

async function handleTTS(prompt: string, voice?: string, lang?: string): Promise<Response> {
  // Parse prompt for text and optional voice instructions
  const text = prompt;
  const selectedVoice = voice || "en-US-AvaNeural";
  const selectedLang = lang || "en-US";

  const res = await fetch(TTS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT,
      Origin: BASE_URL,
      Referer: `${BASE_URL}/free-ai-text-to-speech/`,
    },
    body: JSON.stringify({
      text: text.slice(0, 10000),
      voice: selectedVoice,
      lang: selectedLang,
      pitch: "0",
      speed: "1.0",
    }),
  });

  if (!res.ok) {
    return errResp(`TTS failed (${res.status})`);
  }

  const contentType = res.headers.get("content-type") || "";
  if (
    contentType.includes("audio") ||
    contentType.includes("octet-stream") ||
    contentType.includes("wav")
  ) {
    // Return audio directly
    return new Response(res.body, {
      headers: {
        "Content-Type": contentType.includes("wav") ? "audio/wav" : "audio/mpeg",
        "Content-Disposition": 'attachment; filename="speech.wav"',
      },
    });
  }

  // JSON response with base64 audio_data
  const data = await res.text();
  try {
    const json = JSON.parse(data);
    if (json.audio_data) {
      return jsonResp({ object: "audio.speech", audio: json.audio_data, status: "completed" });
    }
    if (json.url) {
      return jsonResp({ object: "audio.speech", url: json.url, status: "completed" });
    }
  } catch {
    /* not JSON */
  }
  return errResp("TTS unexpected response format");
}

async function handleEnhance(nonce: string, prompt: string): Promise<Response> {
  const result = await postAjax(nonce, {
    prompt,
    actionType: "main-prompt-generation",
  });
  const trimmed = result.trim();
  if (!trimmed || trimmed === "0") {
    return errResp("Prompt enhancement failed");
  }
  return jsonResp({ object: "prompt.enhancement", enhanced: trimmed, status: "completed" });
}

// ─── Executor ───────────────────────────────────────────────────────────────

export class VeoAIFreeWebExecutor extends BaseExecutor {
  constructor() {
    super("veoaifree-web", { id: "veoaifree-web", baseUrl: BASE_URL });
  }

  async execute(input: ExecuteInput): Promise<{
    response: Response;
    url: string;
    headers: Record<string, string>;
    transformedBody: unknown;
  }> {
    const body = input.body as Record<string, unknown> | undefined;
    const model = input.model || (body?.model as string) || "veo-3.1";

    // Extract prompt
    const messages = (body?.messages as Array<Record<string, unknown>>) || [];
    const userMsg = messages.filter((m) => m.role === "user").pop();
    const systemMsg = messages.filter((m) => m.role === "system").pop();
    const prompt = (userMsg?.content as string) || "";
    const systemText = (systemMsg?.content as string) || "";

    if (!prompt.trim()) {
      return {
        response: errResp("No prompt provided", 400),
        url: AJAX_URL,
        headers: {},
        transformedBody: null,
      };
    }

    // Detect intent
    const intent = detectIntent(model, prompt);

    // TTS doesn't need nonce
    if (intent === "tts") {
      const voiceMatch = systemText.match(/voice:\s*(\S+)/);
      const langMatch = systemText.match(/lang:\s*(\S+)/);
      const resp = await handleTTS(prompt, voiceMatch?.[1], langMatch?.[1]);
      return { response: resp, url: TTS_URL, headers: {}, transformedBody: { intent, model } };
    }

    // Get nonce for AJAX endpoints
    let nonce: string;
    try {
      nonce = await fetchNonce();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to get nonce";
      return { response: errResp(msg), url: BASE_URL, headers: {}, transformedBody: null };
    }

    // Extract aspect ratio from system prompt or default
    const arMatch = systemText.match(/aspect[_-]?ratio:\s*(\S+)/i);
    const aspectRatio = arMatch?.[1] || "VIDEO_ASPECT_RATIO_LANDSCAPE";

    let resp: Response;
    switch (intent) {
      case "image":
        resp = await handleImage(nonce, prompt, aspectRatio.replace("VIDEO_", "IMAGE_"));
        break;
      case "enhance":
        resp = await handleEnhance(nonce, prompt);
        break;
      default:
        resp = await handleVideo(nonce, prompt, aspectRatio);
    }

    return { response: resp, url: AJAX_URL, headers: {}, transformedBody: { intent, model } };
  }
}
