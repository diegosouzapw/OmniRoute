/**
 * Shared model resolution for the image routes (#3214 / #3215).
 *
 * `/v1/images/generations` and `/v1/images/edits` must resolve a requested model the
 * same way, and as close as practical to how chat routing resolves models:
 *
 *   1. Bare combo / alias name with no slash (`image`) — resolved to the combo's single
 *      image target, then that target is itself prefix-resolved. Bare combos intentionally
 *      override built-in image aliases with the same name.
 *   2. Built-in image model id / alias (`cgpt-web/...`, `gpt-image-1`, …) — untouched.
 *   3. Custom provider *prefix* form (`myImg/gpt-image-2`) — rewritten to the internal
 *      `<nodeId>/<model>` id (#3205 did this inline in the generations route only).
 *
 * Anything that does not match falls through unchanged, so existing built-in and
 * already-internal ids keep working.
 */
import { parseImageModel } from "@omniroute/open-sse/config/imageRegistry.ts";
import { resolveComboTargets } from "@omniroute/open-sse/services/combo.ts";

import { getComboByName, getCombos } from "@/lib/db/combos";
import { getCachedProviderNodes } from "@/lib/localDb";

/**
 * Rewrite a `prefix/model` custom image model to its internal `<nodeId>/<model>` form.
 * Returns the original string when no openai-compatible node prefix matches (so built-in
 * and already-internal ids pass through). Mirrors `src/sse/services/model.ts` (match on
 * `node.prefix` OR `node.id`).
 */
export async function resolveImageModelPrefix(modelStr: string): Promise<string> {
  if (typeof modelStr !== "string") return modelStr;
  const slash = modelStr.indexOf("/");
  if (slash <= 0) return modelStr;

  const prefixPart = modelStr.slice(0, slash);
  const rest = modelStr.slice(slash + 1);
  if (!rest) return modelStr;

  try {
    const nodes = await getCachedProviderNodes({ type: "openai-compatible" });
    // node.id (internal UUID) is already a valid internal id; only rewrite when a
    // user-defined prefix differs from the node id.
    const matched = nodes.find((node: { prefix?: unknown }) => node.prefix === prefixPart);
    if (matched && typeof matched.id === "string" && matched.id && matched.id !== prefixPart) {
      return `${matched.id}/${rest}`;
    }
  } catch {
    // DB unavailable (pre-migration / tests) — leave the model untouched.
  }
  return modelStr;
}

/**
 * Resolve a bare combo/alias name (e.g. `image`) to its first image model target's
 * model string, or null when the name is not a combo / has no usable target.
 */
export async function resolveSingleImageComboTarget(name: string): Promise<string | null> {
  if (typeof name !== "string" || !name.trim()) return null;
  try {
    const combo = await getComboByName(name);
    if (!combo) return null;
    const allCombos = await getCombos();
    const targets = resolveComboTargets(combo as never, allCombos as never);
    const first = targets.find(
      (t: { modelStr?: unknown }) =>
        typeof t?.modelStr === "string" && (t.modelStr as string).trim()
    );
    return (first?.modelStr as string) ?? null;
  } catch {
    return null;
  }
}

/**
 * Full image-route model resolver. See module header for the resolution order.
 */
export async function resolveImageRouteModel(modelStr: string): Promise<string> {
  if (typeof modelStr !== "string" || !modelStr.trim()) return modelStr;
  const parsedModel = parseImageModel(modelStr);
  const hasSlash = modelStr.includes("/");

  // 1. Bare model name: resolve to its single combo target when safe.
  //    Codex bare models are reserved to avoid shadowing `gpt-5.5`-style aliases used
  //    across image + responses flows.
  if (!hasSlash) {
    if (parsedModel.provider === "codex") return modelStr;

    const target = await resolveSingleImageComboTarget(modelStr);
    if (target && target !== modelStr) return resolveImageModelPrefix(target);
  }

  // 2. Built-in image model (alias or provider/model) — leave untouched.
  if (parsedModel.provider) return modelStr;

  if (!modelStr.includes("/")) return modelStr;

  // 3. Custom provider prefix form — rewrite to internal `<nodeId>/<model>`.
  return resolveImageModelPrefix(modelStr);
}

interface ParsedImageEditInput {
  prompt: string;
  model: string | null;
  size: string | null;
  responseFormat: string | null;
  imageBytes: Buffer | null;
  imageMime: string | null;
  images: Array<{ bytes: Buffer; mime: string }>;
  imageInputCount: number;
}

export const MAX_CODEX_IMAGE_EDIT_BYTES = 20 * 1024 * 1024;
export const MAX_CODEX_IMAGE_EDIT_REFERENCES = 8;
export const MAX_CODEX_IMAGE_EDIT_TOTAL_BYTES = 20 * 1024 * 1024;

const CODEX_IMAGE_MIME_MAGIC: Readonly<Record<string, (bytes: Buffer) => boolean>> = {
  "image/png": (bytes) =>
    bytes.length >= 8 &&
    bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])),
  "image/jpeg": (bytes) =>
    bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff,
  "image/webp": (bytes) =>
    bytes.length >= 12 &&
    bytes.subarray(0, 4).toString("ascii") === "RIFF" &&
    bytes.subarray(8, 12).toString("ascii") === "WEBP",
};

/** Validate one decoded Codex edit reference without trusting the client-supplied MIME. */
export function validateCodexImageEditReference(
  image: { bytes: Buffer; mime: string },
  maxBytes = MAX_CODEX_IMAGE_EDIT_BYTES
): string | null {
  const mime = image.mime.trim().toLowerCase();
  const matchesMagic = CODEX_IMAGE_MIME_MAGIC[mime];
  if (!matchesMagic) return "Codex image edit accepts PNG, JPEG, or WebP references";
  if (image.bytes.length > maxBytes) {
    return `Codex image edit reference exceeds the ${Math.floor(maxBytes / (1024 * 1024))} MiB limit`;
  }
  if (!matchesMagic(image.bytes)) return `Image content does not match declared MIME type: ${mime}`;
  return null;
}

/** Validate a bounded Codex reference set before encoding it into a Responses request. */
export function validateCodexImageEditReferences(
  images: Array<{ bytes: Buffer; mime: string }>,
  maxReferences = MAX_CODEX_IMAGE_EDIT_REFERENCES,
  maxTotalBytes = MAX_CODEX_IMAGE_EDIT_TOTAL_BYTES
): string | null {
  if (images.length > maxReferences) {
    return `Codex image edit accepts at most ${maxReferences} reference images`;
  }

  let totalBytes = 0;
  for (let index = 0; index < images.length; index += 1) {
    const validationError = validateCodexImageEditReference(images[index]);
    if (validationError) return `Reference image ${index + 1}: ${validationError}`;
    totalBytes += images[index].bytes.length;
  }
  if (totalBytes > maxTotalBytes) {
    return `Codex image edit references exceed the ${Math.floor(maxTotalBytes / (1024 * 1024))} MiB total decoded limit`;
  }
  return null;
}

/** Parse a `data:<mime>;base64,<data>` URL into raw bytes + mime, or null when invalid. */
export function parseDataUrl(value: unknown): { bytes: Buffer; mime: string } | null {
  if (typeof value !== "string") return null;
  const match = /^data:([^;,]+)?(;base64)?,(.*)$/s.exec(value.trim());
  if (!match) return null;
  const mime = match[1] || "image/png";
  const isBase64 = Boolean(match[2]);
  const payload = match[3] ?? "";
  try {
    if (isBase64) {
      if (
        payload.length === 0 ||
        payload.length % 4 !== 0 ||
        !/^[A-Za-z0-9+/]*={0,2}$/.test(payload)
      ) {
        return null;
      }
      const bytes = Buffer.from(payload, "base64");
      const canonical = bytes.toString("base64");
      if (canonical !== payload) return null;
      return bytes.length > 0 ? { bytes, mime } : null;
    }

    const bytes = Buffer.from(decodeURIComponent(payload), "utf8");
    if (bytes.length === 0) return null;
    return { bytes, mime };
  } catch {
    return null;
  }
}

/**
 * Extract an OpenAI-compatible image-edit payload from a JSON body. Some clients send
 * edit input as JSON with data-URL images instead of multipart/form-data; accept the
 * common shapes (`image: "data:..."`, `images: [{ image_url: "data:..." }]` or
 * `images: ["data:..."]`) and surface the same fields the multipart reader produces.
 */
export function extractImageEditInputFromJson(body: unknown): ParsedImageEditInput {
  const obj = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const str = (v: unknown): string | null => (typeof v === "string" && v.trim() ? v.trim() : null);

  const prompt = typeof obj.prompt === "string" ? obj.prompt.trim() : "";
  const model = str(obj.model);
  const size = str(obj.size);
  const responseFormat = str(obj.response_format);

  const candidates: unknown[] = [];
  if (obj.image !== undefined) candidates.push(obj.image);
  const images = obj.images;
  if (Array.isArray(images)) {
    for (const entry of images) {
      if (entry && typeof entry === "object") {
        const e = entry as Record<string, unknown>;
        candidates.push(e.image_url ?? e.url ?? e.b64_json);
      } else {
        // Preserve every scalar/null array slot as a submitted candidate. Parsing will
        // reject unsupported values, and the route can detect partial image sets.
        candidates.push(entry);
      }
    }
  } else if (images !== undefined) {
    candidates.push(images);
  }

  const parsedImages: Array<{ bytes: Buffer; mime: string }> = [];
  for (const candidate of candidates) {
    const parsed = parseDataUrl(candidate);
    if (parsed) parsedImages.push(parsed);
  }
  const firstImage = parsedImages[0] ?? null;

  return {
    prompt,
    model,
    size,
    responseFormat,
    imageBytes: firstImage?.bytes ?? null,
    imageMime: firstImage?.mime ?? null,
    images: parsedImages,
    imageInputCount: candidates.length,
  };
}
