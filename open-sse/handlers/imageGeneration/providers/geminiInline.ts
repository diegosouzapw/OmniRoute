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
  const rawCandidate =
    (typeof record.image_url === "string" && record.image_url) ||
    (typeof record.image === "string" && record.image) ||
    (typeof record.imageUrl === "string" && record.imageUrl) ||
    (Array.isArray(record.image_urls) && typeof record.image_urls[0] === "string" && record.image_urls[0]) ||
    (Array.isArray(record.imageUrls) && typeof record.imageUrls[0] === "string" && record.imageUrls[0]) ||
    (Array.isArray(record.images) && typeof record.images[0] === "string" && record.images[0]) ||
    null;

  if (rawCandidate) {
    if (rawCandidate.startsWith("data:")) {
      const match = rawCandidate.match(/^data:(image\/[a-zA-Z0-9+-]+);base64,(.+)$/);
      if (match) {
        return {
          inlineData: {
            mimeType: match[1],
            data: match[2],
          },
        };
      }
      return {
        inlineData: {
          mimeType:
            rawCandidate.match(/^data:(image\/[a-zA-Z0-9+-]+);base64,/)?.[1] || "image/png",
          data: rawCandidate.replace(/^data:image\/[a-zA-Z0-9+-]+;base64,/, ""),
        },
      };
    }
    if (/^[A-Za-z0-9+/=]+$/.test(rawCandidate.trim()) && rawCandidate.length > 100) {
      return {
        inlineData: {
          mimeType: mimeType || "image/jpeg",
          data: rawCandidate.trim(),
        },
      };
    }
  }
  return null;
}
