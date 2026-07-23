/**
 * Google AI Studio (Gemini API) Imagen family image-generation provider entry.
 *
 * Uses the dedicated `:predict` endpoint (handled by format "google-imagen"), NOT
 * generateContent — so only imagen-* models belong here; gemini flash-image /
 * nano-banana route through /v1/chat/completions instead. The models are also
 * surfaced live via ListModels; this seed makes them addressable on
 * /v1/images/generations. Note: Imagen requires a billing-enabled Google project —
 * free-tier keys get 403 / quota 0. The handler builds `{baseUrl}/{model}:predict`.
 *
 * Extracted out of imageRegistry.ts (which sits right at the 800-line file-size
 * cap) so the catalog lives in its own semantic family module, following the same
 * pattern as `providers/registry/stability-ai/imageModels.ts` and
 * `providers/registry/segmind/imageModels.ts`. Co-located with the existing
 * `gemini/index.ts` chat-provider entry — same provider id, different
 * modality/consumer (chat registry vs image registry), mirroring the
 * `kie/index.ts` + `kie/imageModels.ts` split.
 */
export const GEMINI_IMAGEN_PROVIDER = {
  id: "gemini",
  alias: "gemini",
  baseUrl: "https://generativelanguage.googleapis.com/v1beta/models",
  authType: "apikey",
  authHeader: "x-goog-api-key",
  format: "google-imagen",
  models: [
    { id: "imagen-4.0-generate-001", name: "Imagen 4" },
    { id: "imagen-4.0-ultra-generate-001", name: "Imagen 4 Ultra" },
    { id: "imagen-4.0-fast-generate-001", name: "Imagen 4 Fast" },
  ],
  supportedSizes: ["1024x1024", "1792x1024", "1024x1792"],
};
