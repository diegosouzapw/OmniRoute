import { decodeJpegFrameDataUri, estimateJpegFrameBytes } from "./videoBridgeFrameContract";
import { VIDEO_FRAME_MAX_BYTES } from "./videoBridgeRuntime";

export interface ContactSheetFrame {
  dataUri: string;
  timestampSeconds: number;
}

export interface ContactSheetOptions {
  columns?: number;
  signal?: AbortSignal;
  timeoutMs?: number;
}

export interface VideoContactSheetResult {
  dataUri?: string;
  fallbackReason?: "CONTACT_SHEET_UNAVAILABLE";
  frames: ContactSheetFrame[];
  height?: number;
  timestamps: number[];
  used: boolean;
  width?: number;
}

const MAX_FRAMES = 16;
const MAX_SHEET_BYTES = 32 * 1024 * 1024;
const LABEL_FONT_SIZE = 32;
const LABEL_HEIGHT = 64;
const LABEL_PADDING = 16;
const TILE_SIZE = 512;

function fallback(frames: readonly ContactSheetFrame[]): VideoContactSheetResult {
  return {
    fallbackReason: "CONTACT_SHEET_UNAVAILABLE",
    frames: frames.map((frame) => ({ ...frame })),
    timestamps: frames.map((frame) => frame.timestampSeconds),
    used: false,
  };
}

function formatContactSheetTimestamp(timestampSeconds: number): string {
  const totalMilliseconds = Math.max(0, Math.round(timestampSeconds * 1000));
  const minutes = Math.floor(totalMilliseconds / 60_000);
  const seconds = Math.floor((totalMilliseconds % 60_000) / 1000);
  const milliseconds = totalMilliseconds % 1000;
  if (minutes > 999) return `t=${timestampSeconds.toExponential(3)}s`;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(3, "0")}`;
}

function buildTimestampLabel(timestampSeconds: number): Buffer {
  const label = formatContactSheetTimestamp(timestampSeconds);
  const labelTop = TILE_SIZE - LABEL_HEIGHT;
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${TILE_SIZE}" height="${TILE_SIZE}" viewBox="0 0 ${TILE_SIZE} ${TILE_SIZE}">
      <rect x="0" y="${labelTop}" width="${TILE_SIZE}" height="${LABEL_HEIGHT}" fill="#000000" fill-opacity="0.82" />
      <text x="${LABEL_PADDING}" y="${labelTop + 42}" fill="#ffffff" font-family="DejaVu Sans Mono, monospace" font-size="${LABEL_FONT_SIZE}" font-weight="700">${label}</text>
    </svg>`
  );
}

/** Build an optional bounded JPEG grid; every failure except abort is fail-safe to individual frames. */
export async function buildVideoContactSheet(
  frames: readonly ContactSheetFrame[],
  options: ContactSheetOptions = {}
): Promise<VideoContactSheetResult> {
  if (options.signal?.aborted) throw new Error("Video contact sheet was aborted");
  if (frames.length < 1 || frames.length > MAX_FRAMES) return fallback(frames);
  if (
    frames.some(
      (frame) =>
        !Number.isFinite(frame.timestampSeconds) || frame.timestampSeconds < 0 || !frame.dataUri
    )
  ) {
    return fallback(frames);
  }
  const columns = Math.min(4, Math.max(1, Math.floor(options.columns ?? 2)), frames.length);
  const rows = Math.ceil(frames.length / columns);
  const controller = new AbortController();
  const timeout = options.timeoutMs
    ? setTimeout(() => controller.abort(), options.timeoutMs)
    : null;
  const signal = options.signal
    ? AbortSignal.any([options.signal, controller.signal])
    : controller.signal;
  try {
    const { default: sharp } = await import("sharp");
    if (signal.aborted) throw new Error("Video contact sheet was aborted");
    const tiles = await Promise.all(
      frames.map(async (frame) => {
        // Reject before decoding: an oversized frame must never reach sharp() just to be
        // discovered later — estimateJpegFrameBytes reads the encoded length only.
        if (estimateJpegFrameBytes(frame.dataUri) > VIDEO_FRAME_MAX_BYTES) {
          throw new Error("Contact sheet frame exceeds the maximum per-frame size");
        }
        return sharp(decodeJpegFrameDataUri(frame.dataUri))
          .resize(TILE_SIZE, TILE_SIZE, { fit: "contain", background: "#000000" })
          .composite([{ input: buildTimestampLabel(frame.timestampSeconds), left: 0, top: 0 }])
          .jpeg({ quality: 80 })
          .toBuffer();
      })
    );
    if (signal.aborted) throw new Error("Video contact sheet was aborted");
    const output = await sharp({
      create: {
        background: "#000000",
        channels: 3,
        height: rows * TILE_SIZE,
        width: columns * TILE_SIZE,
      },
    })
      .composite(
        tiles.map((input, index) => ({
          input,
          left: (index % columns) * TILE_SIZE,
          top: Math.floor(index / columns) * TILE_SIZE,
        }))
      )
      .jpeg({ quality: 80 })
      .toBuffer();
    if (signal.aborted) throw new Error("Video contact sheet was aborted");
    if (output.byteLength > MAX_SHEET_BYTES) return fallback(frames);
    return {
      dataUri: `data:image/jpeg;base64,${output.toString("base64")}`,
      frames: frames.map((frame) => ({ ...frame })),
      height: rows * TILE_SIZE,
      timestamps: frames.map((frame) => frame.timestampSeconds),
      used: true,
      width: columns * TILE_SIZE,
    };
  } catch {
    if (signal.aborted) throw new Error("Video contact sheet was aborted");
    return fallback(frames);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}
