import { z } from "zod";
import { saveCallLog } from "@/lib/usageDb";
import { fetchUntrustedRemoteImage } from "@/shared/network/remoteImageFetch";
import { FetchTimeoutError, fetchWithTimeout } from "@/shared/utils/fetchTimeout";
import { sanitizeErrorMessage } from "../../../utils/error.ts";

const requestSchema = z.object({
  prompt: z.string().trim().min(1),
  n: z.number().int().min(1).optional(),
  size: z
    .string()
    .regex(/^(?:auto|[1-9]\d{0,4}x[1-9]\d{0,4})$/)
    .optional(),
  aspect_ratio: z
    .string()
    .regex(/^[1-9]\d{0,4}:[1-9]\d{0,4}$/)
    .optional(),
  image_size: z.enum(["1K", "2K", "4K"]).optional(),
  response_format: z.enum(["url", "b64_json"]).optional(),
  output_format: z.enum(["png", "jpeg", "webp"]).optional(),
  output_compression: z.number().int().min(0).max(100).optional(),
  quality: z.enum(["auto", "low", "medium", "high"]).optional(),
  background: z.enum(["auto", "transparent", "opaque"]).optional(),
  style: z.string().optional(),
  seed: z.number().int().optional(),
  negative_prompt: z.string().optional(),
});
const imageSchema = z.object({
  b64_json: z.string().optional(),
  url: z.string().url().optional(),
  revised_prompt: z.string().optional(),
});
const openaiResponseSchema = z.object({
  created: z.number().optional(),
  data: z.array(imageSchema),
});
const vertexResponseSchema = z.object({
  predictions: z.array(
    z.object({
      bytesBase64Encoded: z.string().optional(),
      mimeType: z.enum(["image/png", "image/jpeg", "image/webp"]).optional(),
      gcsUri: z.string().optional(),
      prompt: z.string().optional(),
      raiFilteredReason: z.string().optional(),
    })
  ),
});

interface ZenmuxImageArgs {
  model: string;
  provider: string;
  providerConfig: { baseUrl: string };
  body: Record<string, unknown>;
  credentials?: { apiKey?: string; accessToken?: string } | null;
  signal?: AbortSignal | null;
  log?: { error?: (tag: string, message: string) => void } | null;
}

function dimensionsToRatio(size: string): string {
  const [width, height] = size.split("x").map(Number);
  let a = width;
  let b = height;
  while (b) [a, b] = [b, a % b];
  return `${width / a}:${height / a}`;
}

/** ZenMux exposes OpenAI image models via Images API and other publishers via Vertex predict. */
export async function handleZenmuxImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  signal,
  log,
}: ZenmuxImageArgs) {
  const startTime = Date.now();
  const fail = (status: number, message: unknown) => {
    const error = sanitizeErrorMessage(message);
    log?.error?.("IMAGE", `ZenMux: ${error}`);
    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      provider,
      model: `${provider}/${model}`,
      status,
      duration: Date.now() - startTime,
      error,
    }).catch((err: unknown) => log?.error?.("IMAGE", sanitizeErrorMessage(err)));
    return { success: false as const, status, error };
  };

  // These segments become URL path components, including when a custom model was resolved upstream.
  if (
    !/^[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+$/.test(model) ||
    model.endsWith("/.") ||
    model.endsWith("/..")
  ) {
    return fail(400, "ZenMux image models require publisher/model format");
  }
  const token = credentials?.apiKey || credentials?.accessToken;
  if (!token) return fail(401, "ZenMux API key is required");
  if (
    ["image", "images", "image_url", "image_urls", "reference_images", "mask"].some(
      (key) => body[key] !== undefined
    )
  ) {
    return fail(
      400,
      "ZenMux images/generations supports text-to-image only; reference images are not supported"
    );
  }
  if (
    model === "inclusionai/ming-image-0.1-design" &&
    ["size", "aspect_ratio", "image_size"].some((key) => body[key] !== undefined)
  ) {
    return fail(
      400,
      "Ming Image Design chooses its own dimensions; omit size, aspect_ratio and image_size"
    );
  }
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) return fail(400, "Invalid ZenMux image generation parameters");
  const options = parsed.data;
  const isOpenai = model.startsWith("openai/");
  let url: string;
  let upstreamBody: Record<string, unknown>;
  if (isOpenai) {
    if (options.aspect_ratio !== undefined || options.image_size !== undefined) {
      return fail(
        400,
        "Use size rather than aspect_ratio or image_size for ZenMux OpenAI image models"
      );
    }
    if (options.seed !== undefined || options.negative_prompt !== undefined) {
      return fail(
        400,
        "seed and negative_prompt are not supported by the ZenMux OpenAI Images API"
      );
    }
    url = "https://zenmux.ai/api/v1/images/generations";
    upstreamBody = { model, ...options };
  } else {
    if (
      options.quality !== undefined ||
      options.background !== undefined ||
      options.style !== undefined
    ) {
      return fail(400, "quality, background and style are OpenAI-only ZenMux image options");
    }
    const [publisher, name] = model.split("/");
    url = `${providerConfig.baseUrl}/publishers/${publisher}/models/${name}:predict`;
    const parameters: Record<string, unknown> = { sampleCount: options.n ?? 1 };
    const ratio =
      options.aspect_ratio ||
      (options.size && options.size !== "auto" ? dimensionsToRatio(options.size) : undefined);
    if (ratio) parameters.aspectRatio = ratio;
    if (options.image_size) parameters.sampleImageSize = options.image_size;
    if (options.output_format || options.output_compression !== undefined) {
      parameters.outputOptions = {
        mimeType: `image/${options.output_format || "png"}`,
        ...(options.output_compression !== undefined
          ? { compressionQuality: options.output_compression }
          : {}),
      };
    }
    if (options.seed !== undefined) parameters.seed = options.seed;
    if (options.negative_prompt !== undefined) parameters.negativePrompt = options.negative_prompt;
    upstreamBody = { instances: [{ prompt: options.prompt }], parameters };
  }

  try {
    const response = await fetchWithTimeout(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(upstreamBody),
      signal,
      redirect: "error",
    });
    const text = await response.text();
    let payload: unknown;
    try {
      payload = JSON.parse(text);
    } catch {
      return fail(response.ok ? 502 : response.status, "Invalid response from ZenMux image API");
    }
    if (!response.ok) {
      const error = z.object({ error: z.object({ message: z.string() }) }).safeParse(payload);
      return fail(
        response.status,
        error.success
          ? error.data.error.message
          : `ZenMux image API returned HTTP ${response.status}`
      );
    }
    let images: Array<z.infer<typeof imageSchema>>;
    let created: number | undefined;
    if (isOpenai) {
      const result = openaiResponseSchema.safeParse(payload);
      if (!result.success) return fail(502, "Invalid response from ZenMux image API");
      images = result.data.data;
      created = result.data.created;
    } else {
      const result = vertexResponseSchema.safeParse(payload);
      if (!result.success) return fail(502, "Invalid response from ZenMux Vertex image API");
      images = result.data.predictions
        .filter((prediction) => !prediction.raiFilteredReason)
        .map((prediction) => ({
          ...(prediction.bytesBase64Encoded
            ? {
                b64_json: prediction.bytesBase64Encoded,
                ...(options.response_format === "url"
                  ? {
                      url: `data:${prediction.mimeType || "image/png"};base64,${prediction.bytesBase64Encoded}`,
                    }
                  : {}),
              }
            : prediction.gcsUri?.startsWith("https://")
              ? { url: prediction.gcsUri }
              : {}),
          ...(prediction.prompt ? { revised_prompt: prediction.prompt } : {}),
        }));
    }
    images = images.filter((entry) => entry.b64_json || entry.url);
    if (!images.length)
      return fail(502, "No images returned from ZenMux (empty or filtered output)");
    for (const entry of images) {
      if (options.response_format === "url" && !entry.url && entry.b64_json) {
        entry.url = `data:image/${options.output_format || "png"};base64,${entry.b64_json}`;
      }
      if (options.response_format === "b64_json" && !entry.b64_json && entry.url) {
        const remote = await fetchUntrustedRemoteImage(entry.url, { signal });
        entry.b64_json = remote.buffer.toString("base64");
      }
      if (options.response_format === "url" && entry.url) delete entry.b64_json;
      if (options.response_format === "b64_json") delete entry.url;
    }
    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      provider,
      model: `${provider}/${model}`,
      status: 200,
      duration: Date.now() - startTime,
      requestBody: {
        model,
        n: options.n ?? 1,
        size: options.size,
        aspect_ratio: options.aspect_ratio,
        image_size: options.image_size,
      },
      responseBody: { images_count: images.length },
    }).catch((err: unknown) => log?.error?.("IMAGE", sanitizeErrorMessage(err)));
    return {
      success: true as const,
      data: { created: created ?? Math.floor(Date.now() / 1000), data: images },
    };
  } catch (err: unknown) {
    return fail(err instanceof FetchTimeoutError ? 504 : 502, err);
  }
}
