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
  // #13847: MiMo V2.5 is multimodal across the provider aliases that expose it
  // (including `*-free` variants). Keep the known text-only Pro siblings out in
  // isVisionModelId() below so this shared heuristic stays safe for routing,
  // `/v1/models`, combo projection and lite compression alike.
  "mimo-v2.5",
  // #13847: Step 3.7 Flash is exposed through provider-qualified `:free` routes
  // as well as direct registry entries. The capability must survive that suffix.
  "step-3.7-flash",
  "kimi-vl",
  "glm-4v",
  "glm-4.5v",
  "glm-4.6v",
  "glm-5.3-flash",
  "gpt-4o",
  "gpt-4.1",
  "gpt-4-turbo",
  "gpt-4-vision",
  "gpt-5",
  "gemini-1.5",
  "gemini-2",
  "gemini-3",
  "gemini-exp",
  "claude-3",
  "claude-fable",
  "claude-opus-4",
  "claude-sonnet-4",
  "claude-haiku-4",
  "claude-fable",
  "mistral-medium-3",
  "minimax-m3",
  "kimi-k2.",
  // Naver CLOVA Studio: HCX-005 is the only v3 model with image input. Listed by
  // exact id (not a family fragment) to stay conservative — live-verified on
  // 2026-09-01 that it answers image prompts over both a public URL and a
  // base64 data URI, while HCX-007 and HCX-DASH-002 reject images.
  "hcx-005",
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

  // Xiaomi documents the Pro chat variants as text-only even though the base
  // MiMo V2.5 model is multimodal. Keep these exclusions beside the shared
  // heuristic so every consumer gets the same verdict instead of relying on a
  // resolver-specific exception.
  if (/(?:^|\/)mimo-v2\.5-pro(?:$|[:/])/i.test(normalized)) return false;
  if (/(?:^|\/)mimo-v2-pro(?:$|[:/])/i.test(normalized)) return false;

  return VISION_MODEL_ID_FRAGMENTS.some((fragment) => normalized.includes(fragment));
}
