/**
 * Freepik (Magnific Mystic) image provider registry entry.
 * Extracted into its own module to keep open-sse/config/imageRegistry.ts
 * under the file-size cap (god-file decomposition; semantic split).
 */
export const FREEPIK_IMAGE_PROVIDER = {
  id: "freepik",
  // Freepik rebranded its API docs to Magnific in April 2026; the Mystic
  // endpoint itself still lives under api.freepik.com as of this writing
  // (docs.freepik.com redirects to docs.magnific.com, but the API host
  // has not moved). Re-verify against live docs if this ever 404s.
  baseUrl: "https://api.freepik.com/v1/ai/mystic",
  statusUrl: "https://api.freepik.com/v1/ai/mystic",
  authType: "apikey",
  authHeader: "x-freepik-api-key",
  format: "freepik-image", // custom: async submit task_id, then poll GET /{task_id}
  models: [
    { id: "realism", name: "Mystic Realism" },
    { id: "fluid", name: "Mystic Fluid (Imagen 3)" },
    { id: "zen", name: "Mystic Zen" },
    { id: "flexible", name: "Mystic Flexible" },
    { id: "super_real", name: "Mystic Super Real" },
    { id: "editorial_portraits", name: "Mystic Editorial Portraits" },
  ],
  supportedSizes: ["1024x1024", "1024x1792", "1792x1024"],
};
