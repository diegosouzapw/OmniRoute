/**
 * Single source of truth for the model-id vision heuristic (#4072).
 *
 * Three code paths used to keep their own drifting lists, so the same model id
 * could get up to three different vision verdicts:
 *   - `src/lib/modelCapabilities.ts` — last-resort fallback in `resolveVisionCapability` (#4071)
 *   - `src/app/api/v1/models/catalog.ts` — `/v1/models` listing capability
 *   - `open-sse/services/compression/lite.ts` — gate that decides whether lite
 *     compression strips images
 *
 * Concrete bugs that caused:
 *   - `lite.ts` was missing pixtral / llava / qwen-vl / glm-4v / kimi-vl /
 *     mistral-medium-3, so lite compression stripped images for those real vision
 *     models and blinded them (same class as #4071 / #4012).
 *   - `catalog.ts` was too broad: bare `gemma` (text) and bare `kimi` (e.g.
 *     `kimi-k2`, text) produced false-positive `vision: true` in `/v1/models`.
 *
 * Keep this list CONSERVATIVE: a false positive in routing or compression
 * re-creates #4071 (an image routed to / kept for a model that cannot see it).
 * The zero-touch path for newly released vision models is the models.dev sync
 * (`modalities` / `attachment`), not this fallback — this list only needs the
 * stable, well-known vision families.
 */
export const VISION_MODEL_ID_FRAGMENTS = [
  "pixtral",
  "llava",
  "bakllava",
  "qwen-vl",
  "qwen2-vl",
  "qwen2.5-vl",
  "qwen3-vl",
  "qvq",
  "internvl",
  "minicpm-v",
  "moondream",
  "mimo-vl",
  "kimi-vl",
  "glm-4v",
  "glm-4.5v",
  "glm-4.6v",
  "gpt-4o",
  "gpt-4.1",
  "gpt-4-turbo",
  "gpt-4-vision",
  "gemini-1.5",
  "gemini-2",
  "gemini-3",
  "gemini-exp",
  "claude-3",
  "claude-opus-4",
  "claude-sonnet-4",
  "claude-haiku-4",
  "mistral-medium-3",
  "minimax-m3",
  "-vision",
  "multimodal",
] as const;

/**
 * Whether a model id looks like a vision-capable model. Case-insensitive
 * substring match against {@link VISION_MODEL_ID_FRAGMENTS}. Returns `false` for
 * empty / nullish input.
 */
export function isVisionModelId(modelId: string | null | undefined): boolean {
  if (!modelId) return false;
  const normalized = String(modelId).toLowerCase();
  return VISION_MODEL_ID_FRAGMENTS.some((fragment) => normalized.includes(fragment));
}
