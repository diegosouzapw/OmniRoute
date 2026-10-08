/**
 * Inline image part for Gemini-format image generation.
 * Extracted from imageGeneration.ts so SYNTX dispatch can land under the frozen cap.
 */
export function geminiInlineImagePart(
  body: unknown
): { inlineData: { mimeType: string; data: string } } | null {
  if (!body || typeof body !== "object") return null;
  const record = body as Record<string, unknown>;
  const mimeType =
    typeof record.imageMime === "string" && record.imageMime ? record.imageMime : "image/png";
  if (Buffer.isBuffer(record.imageBytes)) {
    return { inlineData: { mimeType, data: record.imageBytes.toString("base64") } };
  }
  if (typeof record.imageBytes === "string" && record.imageBytes.length > 0) {
    return { inlineData: { mimeType, data: record.imageBytes } };
  }
  if (typeof record.image_url === "string" && record.image_url.startsWith("data:")) {
    return {
      inlineData: {
        mimeType:
          record.image_url.match(/^data:(image\/[a-zA-Z0-9+-]+);base64,/)?.[1] || "image/png",
        data: record.image_url.replace(/^data:image\/[a-zA-Z0-9+-]+;base64,/, ""),
      },
    };
  }
  return null;
}
