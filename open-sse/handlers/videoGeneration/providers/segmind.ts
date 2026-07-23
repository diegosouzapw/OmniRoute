// Segmind video-generation provider (#6656).
//
// Thin body-builder + response-formatter around the shared Segmind REST
// client (open-sse/utils/segmindClient.ts) — same wire shape as the image
// handler (imageGeneration/providers/segmind.ts): x-api-key auth, raw video
// bytes response (e.g. `video/mp4`) on success, no JSON envelope.

import { segmindRequest } from "../../../utils/segmindClient.ts";

function buildSegmindVideoBody(body: Record<string, unknown>, prompt: string) {
  const upstreamBody: Record<string, unknown> = { prompt };
  if (typeof body.negative_prompt === "string") upstreamBody.negative_prompt = body.negative_prompt;
  if (typeof body.seed === "number") upstreamBody.seed = body.seed;
  if (body.duration != null) upstreamBody.duration = Number(body.duration);
  if (typeof body.aspect_ratio === "string") upstreamBody.aspect_ratio = body.aspect_ratio;
  return upstreamBody;
}

export async function handleSegmindVideoGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const token = credentials?.apiKey || credentials?.accessToken || "";
  const prompt = typeof body.prompt === "string" ? body.prompt : String(body.prompt ?? "");
  const upstreamBody = buildSegmindVideoBody(body, prompt);

  if (log) {
    log.info("VIDEO", `${provider}/${model} (segmind) | prompt: "${prompt.slice(0, 60)}..."`);
  }

  const result = await segmindRequest({
    baseUrl: providerConfig.baseUrl,
    model,
    token,
    upstreamBody,
    callLogPath: "/v1/videos/generations",
    provider,
    scope: "VIDEO",
    log,
  });

  if (!result.ok) {
    return { success: false, status: result.status, error: result.error };
  }

  return {
    success: true,
    data: {
      created: Math.floor(Date.now() / 1000),
      data: [{ b64_json: result.buffer.toString("base64"), format: "mp4" }],
    },
  };
}
