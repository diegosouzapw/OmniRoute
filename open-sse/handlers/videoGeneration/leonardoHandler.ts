/**
 * Leonardo AI (Phoenix) video generation: submit → poll → fetch output.
 *
 * Extracted out of the frozen `videoGeneration.ts` god-file (unchanged behavior) to make
 * room for the new DeepInfra video adapter without pushing the file-size ratchet over its
 * baseline — mirrors the existing `googleFlowHandler.ts` extraction.
 */

import { saveCallLog } from "@/lib/usageDb";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function handleLeonardoVideoGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const token = credentials?.apiKey || "";
  const res = await fetch(providerConfig.baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      modelId: "phoenix",
      prompt: body.prompt,
      width: 1024,
      height: 576,
      num_frames: 24,
    }),
  });
  if (!res.ok) {
    const errorText = await res.text();
    saveCallLog({
      method: "POST",
      path: "/v1/videos/generations",
      status: res.status,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: errorText.slice(0, 500),
    }).catch(() => {});
    return { success: false, status: res.status, error: errorText };
  }
  const { sdGenerationJob } = await res.json();
  const genId = sdGenerationJob?.generationId;
  if (!genId) {
    saveCallLog({
      method: "POST",
      path: "/v1/videos/generations",
      status: 502,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: "No generation ID returned",
    }).catch(() => {});
    return { success: false, status: 502, error: "No generation ID returned" };
  }
  const deadline = Date.now() + 300000;
  while (Date.now() < deadline) {
    await sleep(5000);
    const statusRes = await fetch(`${providerConfig.baseUrl}/${genId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const status = await statusRes.json();
    const gen = status.generations_by_pk || status;
    if (gen.status === "COMPLETE") {
      const imgUrl = gen.generated_images?.[0]?.url;
      if (imgUrl) {
        const videoRes = await fetch(imgUrl);
        const buf = await videoRes.arrayBuffer();
        saveCallLog({
          method: "POST",
          path: "/v1/videos/generations",
          status: 200,
          model: `${provider}/${model}`,
          provider,
          duration: Date.now() - startTime,
        }).catch(() => {});
        return {
          success: true,
          data: {
            created: Math.floor(Date.now() / 1000),
            data: [{ b64_json: Buffer.from(buf).toString("base64"), format: "mp4" }],
          },
        };
      }
    }
    if (gen.status === "FAILED") {
      saveCallLog({
        method: "POST",
        path: "/v1/videos/generations",
        status: 502,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: "Leonardo video generation failed",
      }).catch(() => {});
      return { success: false, status: 502, error: "Leonardo video generation failed" };
    }
  }
  saveCallLog({
    method: "POST",
    path: "/v1/videos/generations",
    status: 504,
    model: `${provider}/${model}`,
    provider,
    duration: Date.now() - startTime,
    error: "Leonardo video generation timed out",
  }).catch(() => {});
  return { success: false, status: 504, error: "Leonardo video generation timed out" };
}
