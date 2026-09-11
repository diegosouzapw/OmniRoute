export const JPEG_FRAME_DATA_URI_PREFIX = "data:image/jpeg;base64,";

// Derived from the exported prefix so the two can never drift apart.
const JPEG_FRAME_DATA_URI_PATTERN = new RegExp(
  `^${JPEG_FRAME_DATA_URI_PREFIX.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")}([A-Za-z0-9+/=]+)$`,
  "i"
);

function matchJpegFrame(dataUri: string): string {
  const match = JPEG_FRAME_DATA_URI_PATTERN.exec(dataUri);
  if (!match) throw new Error("Video frame is not a JPEG data URI");
  return match[1];
}

/**
 * Throws on any non-JPEG or base64-invalid input; the single frame decode used by every
 * video module.
 */
export function decodeJpegFrameDataUri(dataUri: string): Buffer {
  return Buffer.from(matchJpegFrame(dataUri), "base64");
}

/** Decoded-byte estimate without materializing the buffer (validation/budget paths). */
export function estimateJpegFrameBytes(dataUri: string): number {
  const encoded = matchJpegFrame(dataUri);
  const padding = encoded.endsWith("==") ? 2 : encoded.endsWith("=") ? 1 : 0;
  return Math.floor((encoded.length * 3) / 4) - padding;
}
