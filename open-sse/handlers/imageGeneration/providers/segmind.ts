// Segmind image-generation provider (#6656).
//
// Thin body-builder + response-formatter around the shared Segmind REST
// client (open-sse/utils/segmindClient.ts) — see that module for the wire
// shape (x-api-key auth, raw image bytes response, no JSON envelope).

import { segmindRequest } from "../../../utils/segmindClient.ts";

function parseSegmindSize(size: unknown): { width: number; height: number } {
  if (typeof size === "string" && size.includes("x")) {
    const [w, h] = size.split("x").map(Number);
    if (Number.isFinite(w) && Number.isFinite(h) && w > 0 && h > 0) {
      return { width: w, height: h };
    }
  }
  return { width: 1024, height: 1024 };
}

function buildSegmindImageBody(body: Record<string, unknown>, prompt: string) {
  const { width, height } = parseSegmindSize(body.size);
  const upstreamBody: Record<string, unknown> = {
    prompt,
    width,
    height,
    samples: Number(body.n) > 0 ? Number(body.n) : 1,
  };
  if (typeof body.negative_prompt === "string") upstreamBody.negative_prompt = body.negative_prompt;
  if (typeof body.seed === "number") upstreamBody.seed = body.seed;
  return upstreamBody;
}

function formatSegmindImage(buffer: Buffer, contentType: string, prompt: string, wantsB64: boolean) {
  const base64 = buffer.toString("base64");
  if (wantsB64) return { b64_json: base64, revised_prompt: prompt };
  const mimeType = contentType.startsWith("image/") ? contentType : "image/jpeg";
  return { url: `data:${mimeType};base64,${base64}`, revised_prompt: prompt };
}

export async function handleSegmindImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const token = credentials?.apiKey || credentials?.accessToken || "";
  const prompt = typeof body.prompt === "string" ? body.prompt : String(body.prompt ?? "");
  const upstreamBody = buildSegmindImageBody(body, prompt);

  if (log) {
    log.info("IMAGE", `${provider}/${model} (segmind) | prompt: "${prompt.slice(0, 60)}..."`);
  }

  const result = await segmindRequest({
    baseUrl: providerConfig.baseUrl,
    model,
    token,
    upstreamBody,
    callLogPath: "/v1/images/generations",
    provider,
    scope: "IMAGE",
    log,
  });

  if (!result.ok) {
    return { success: false, status: result.status, error: result.error };
  }

  const image = formatSegmindImage(
    result.buffer,
    result.contentType,
    prompt,
    body.response_format === "b64_json"
  );
  return {
    success: true,
    data: { created: Math.floor(Date.now() / 1000), data: [image] },
  };
}
