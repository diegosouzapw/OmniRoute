// Auto-extracted from open-sse/handlers/imageGeneration.ts in PR-#4582-batch
// Family: leonardo | Module: leonardo | Lines: 3427-3558 (132 LOC)
// Ref: see open-sse/handlers/imageGeneration.ts top-of-file comment for split rationale

import { saveCallLog } from "@/lib/usageDb";
import { sleep } from "../../../utils/sleep.ts";
import { sanitizeErrorMessage } from "../../../utils/error.ts";

export async function handleLeonardoImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const token = credentials?.apiKey || "";
  const prompt = typeof body.prompt === "string" ? body.prompt : String(body.prompt ?? "");
  if (log) {
    log.info("IMAGE", `${provider}/${model} (leonardo) | prompt: "${prompt.slice(0, 60)}..."`);
  }
  try {
    const res = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        modelId: model || "phoenix",
        prompt,
        width: body.width || 1024,
        height: body.height || 1024,
        num_images: 1,
      }),
    });
    if (!res.ok) {
      const errorText = await res.text();
      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
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
        path: "/v1/images/generations",
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
          const imgRes = await fetch(imgUrl);
          if (!imgRes.ok) {
            return {
              success: false,
              status: imgRes.status,
              error: `Failed to download image: ${imgRes.status}`,
            };
          }
          const buf = await imgRes.arrayBuffer();
          saveCallLog({
            method: "POST",
            path: "/v1/images/generations",
            status: 200,
            model: `${provider}/${model}`,
            provider,
            duration: Date.now() - startTime,
          }).catch(() => {});
          return {
            success: true,
            data: {
              created: Math.floor(Date.now() / 1000),
              data: [{ b64_json: Buffer.from(buf).toString("base64") }],
            },
          };
        }
      }
      if (gen.status === "FAILED") {
        saveCallLog({
          method: "POST",
          path: "/v1/images/generations",
          status: 502,
          model: `${provider}/${model}`,
          provider,
          duration: Date.now() - startTime,
          error: "Leonardo image generation failed",
        }).catch(() => {});
        return { success: false, status: 502, error: "Leonardo image generation failed" };
      }
    }
    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 504,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: "Leonardo image generation timed out",
    }).catch(() => {});
    return { success: false, status: 504, error: "Leonardo image generation timed out" };
  } catch (err) {
    if (log) log.error("IMAGE", `${provider} leonardo error: ${err.message}`);
    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 502,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: err.message,
    }).catch(() => {});
    return {
      success: false,
      status: 502,
      error: `Image provider error: ${sanitizeErrorMessage((err as Error).message || err)}`,
    };
  }
}

