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
import { getProviderNodes } from "@/lib/db/providers";

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
    const nodes = await getProviderNodes({ type: "openai-compatible" });
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

  // 1. Bare combo/alias name (no slash): resolve to its single image target, then
  //    prefix-resolve that target (it may itself be a `prefix/model` custom id).
  //    This intentionally precedes built-in aliases so user combos can shadow names
  //    like `gpt-image-2`; explicit `provider/model` ids still bypass this branch.
  if (!modelStr.includes("/")) {
    const target = await resolveSingleImageComboTarget(modelStr);
    if (target && target !== modelStr) return resolveImageModelPrefix(target);
  }

  // 2. Built-in image model (alias or provider/model) — leave untouched.
  if (parseImageModel(modelStr).provider) return modelStr;

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
    const bytes = isBase64
      ? Buffer.from(payload, "base64")
      : Buffer.from(decodeURIComponent(payload), "utf8");
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
      if (typeof entry === "string") candidates.push(entry);
      else if (entry && typeof entry === "object") {
        const e = entry as Record<string, unknown>;
        candidates.push(e.image_url ?? e.url ?? e.b64_json);
      }
    }
  }

  let imageBytes: Buffer | null = null;
  let imageMime: string | null = null;
  for (const candidate of candidates) {
    const parsed = parseDataUrl(candidate);
    if (parsed) {
      imageBytes = parsed.bytes;
      imageMime = parsed.mime;
      break;
    }
  }

  return { prompt, model, size, responseFormat, imageBytes, imageMime };
}
