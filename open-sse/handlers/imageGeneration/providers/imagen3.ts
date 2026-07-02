// Auto-extracted from open-sse/handlers/imageGeneration.ts in PR-#4582-batch
// Family: imagen3 | Module: imagen3 | Lines: 3670-3777 (108 LOC)
// Ref: see open-sse/handlers/imageGeneration.ts top-of-file comment for split rationale

import { saveCallLog } from "@/lib/usageDb";
import { mapImageSize } from "../../../translator/image/sizeMapper.ts";

type Imagen3ImageGenArgs = {
  model: string;
  provider: string;
  providerConfig: { baseUrl: string };
  body: { prompt?: string; size?: string; n?: number };
  credentials: { apiKey?: string; accessToken?: string };
  log?: {
    info?: (tag: string, msg: string) => void;
    error?: (tag: string, msg: string) => void;
  } | null;
};

type Imagen3NormalizedImage = {
  b64_json?: unknown;
  url?: unknown;
  revised_prompt?: string;
};

/**
 * Handle Imagen 3 image generation
 */
export async function handleImagen3ImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}: Imagen3ImageGenArgs) {
  const startTime = Date.now();
  const token = credentials.apiKey || credentials.accessToken;
  const aspectRatio = mapImageSize(body.size);

  const upstreamBody = {
    prompt: body.prompt,
    aspect_ratio: aspectRatio,
    number_of_images: body.n ?? 1,
  };

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info(
      "IMAGE",
      `${provider}/${model} (imagen3) | prompt: "${promptPreview}..." | aspect_ratio: ${aspectRatio}`
    );
  }

  try {
    const response = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(upstreamBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (log)
        log.error("IMAGE", `${provider} error ${response.status}: ${errorText.slice(0, 200)}`);

      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
        status: response.status,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: errorText.slice(0, 500),
        requestBody: upstreamBody,
      }).catch(() => {});

      return { success: false, status: response.status, error: errorText };
    }

    const data = await response.json();

    // Normalize response to OpenAI format
    const images: Imagen3NormalizedImage[] = [];
    if (Array.isArray(data.images)) {
      images.push(
        ...data.images.map((img: Record<string, unknown>) => ({
          b64_json: img.image ?? img.b64_json ?? img.url ?? img,
          revised_prompt: body.prompt,
        }))
      );
    } else if (Array.isArray(data.data)) {
      images.push(...data.data);
    } else if (data.url || data.b64_json || data.image) {
      images.push({
        b64_json: data.image || data.b64_json || data.url,
        url: data.url,
        revised_prompt: body.prompt,
      });
    }

    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 200,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      responseBody: { images_count: images.length },
    }).catch(() => {});

    return {
      success: true,
      data: { created: data.created || Math.floor(Date.now() / 1000), data: images },
    };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    if (log) log.error("IMAGE", `${provider} fetch error: ${errMsg}`);

    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 502,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: errMsg,
    }).catch(() => {});

    return { success: false, status: 502, error: `Image provider error: ${errMsg}` };
  }
}

