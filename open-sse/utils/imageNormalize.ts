/**
 * Optional-sharp image normalization.
 *
 * Rationale:
 * OpenAI resizes images to a long-edge cap of 2048px server-side, Anthropic applies
 * a similar cap. Downscaling client-side before upload reduces tokens/latency without
 * changing model behavior. `sharp` is loaded via dynamic import so that a platform
 * where its native binary fails to load never crashes the request path — it just
 * falls back to a passthrough (original buffer, unresized).
 */

const DEFAULT_MAX_LONG_EDGE = 2048;

// The callable factory is sharp's default export; `typeof import("sharp")` is the
// module namespace and is not callable under this tsconfig (TS2349).
type SharpModule = (typeof import("sharp"))["default"];
let sharpPromise: Promise<SharpModule | null> | null = null;

async function loadSharp(): Promise<SharpModule | null> {
  if (!sharpPromise) {
    sharpPromise = import("sharp").then((m) => (m.default ?? m) as SharpModule).catch(() => null);
  }
  return sharpPromise;
}

export async function normalizeImageBuffer(
  input: Buffer,
  opts?: { maxLongEdge?: number }
): Promise<{ buffer: Buffer; mime: string | null; resized: boolean }> {
  const maxLongEdge = opts?.maxLongEdge ?? DEFAULT_MAX_LONG_EDGE;
  const sharp = await loadSharp();
  if (!sharp) return { buffer: input, mime: null, resized: false };
  try {
    const img = sharp(input, { failOn: "error" });
    const meta = await img.metadata();
    const long = Math.max(meta.width ?? 0, meta.height ?? 0);
    if (!long || long <= maxLongEdge) {
      return { buffer: input, mime: meta.format ? `image/${meta.format}` : null, resized: false };
    }
    const buffer = await img
      .resize({ width: maxLongEdge, height: maxLongEdge, fit: "inside", withoutEnlargement: true })
      .toBuffer();
    return { buffer, mime: meta.format ? `image/${meta.format}` : null, resized: true };
  } catch {
    return { buffer: input, mime: null, resized: false };
  }
}

export async function normalizeDataUri(
  dataUri: string,
  opts?: { maxLongEdge?: number }
): Promise<string> {
  try {
    const match = /^data:([^;,]+);base64,(.*)$/s.exec(dataUri);
    if (!match) return dataUri;
    const input = Buffer.from(match[2], "base64");
    if (!input.length) return dataUri;
    const out = await normalizeImageBuffer(input, opts);
    if (!out.resized) return dataUri;
    return `data:${match[1]};base64,${out.buffer.toString("base64")}`;
  } catch {
    return dataUri;
  }
}
