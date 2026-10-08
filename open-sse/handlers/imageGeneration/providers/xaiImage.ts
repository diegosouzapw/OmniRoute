import { z } from "zod";

import { isGrokSubscriptionImagesEnabled } from "../../../config/imageRegistry.ts";
import { mapImageSize } from "../../../translator/image/sizeMapper.ts";

const aspectRatio = z.enum([
  "auto",
  "1:1",
  "16:9",
  "9:16",
  "4:3",
  "3:4",
  "3:2",
  "2:3",
  "2:1",
  "1:2",
  "19.5:9",
  "9:19.5",
  "20:9",
  "9:20",
  "21:9",
  "5:2",
]);
const imageOptions = z.object({
  prompt: z.string().trim().min(1),
  n: z.number().int().min(1).max(10).optional(),
  response_format: z.enum(["url", "b64_json"]).optional(),
  aspect_ratio: aspectRatio.optional(),
  resolution: z.enum(["1k", "2k"]).optional(),
  quality: z.enum(["auto", "low", "medium", "high", "hd", "standard"]).optional(),
  size: z
    .union([
      aspectRatio,
      z.enum([
        "256x256",
        "512x512",
        "1024x1024",
        "2048x2048",
        "1536x1024",
        "1024x1536",
        "1792x1024",
        "1024x1792",
      ]),
    ])
    .optional(),
});

type XaiImageRequest =
  { success: true; body: Record<string, unknown> } | { success: false; error: string };

/** xAI accepts aspect_ratio/resolution, not OpenAI's pixel size or style.
 * Contract: https://docs.x.ai/developers/model-capabilities/images/generation
 */
export function buildXaiImageRequest(model: string, input: unknown): XaiImageRequest {
  const parsed = imageOptions.safeParse(input);
  if (!parsed.success) {
    const field = parsed.error.issues[0]?.path[0] ?? "options";
    return { success: false, error: `Invalid xAI image ${String(field)}` };
  }
  const { size, quality, ...options } = parsed.data;
  const body: Record<string, unknown> = { model, ...options };
  if (size && options.aspect_ratio === undefined) {
    body.aspect_ratio = aspectRatio.safeParse(size).success ? size : mapImageSize(size);
  }
  if (size === "2048x2048" && options.resolution === undefined) body.resolution = "2k";
  if (quality !== undefined) {
    if (model !== "grok-imagine-image-2.0") {
      return { success: false, error: "xAI image quality requires grok-imagine-image-2.0" };
    }
    body.quality = isGrokSubscriptionImagesEnabled()
      ? quality === "high" || quality === "hd"
        ? "medium"
        : quality === "standard"
          ? "low"
          : quality
      : quality;
  }
  return { success: true, body };
}
