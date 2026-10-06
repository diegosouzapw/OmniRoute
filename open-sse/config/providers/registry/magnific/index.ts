/**
 * Magnific Mystic image provider registry entry.
 * Extracted into its own module to keep open-sse/config/imageRegistry.ts
 * under the file-size cap (god-file decomposition; semantic split).
 */
export const MAGNIFIC_IMAGE_PROVIDER = {
  id: "magnific",
  // Official Magnific API (docs.magnific.com). The previous OmniRoute slug
  // was `freepik` because Magnific started as Freepik's developer API; keep
  // that id as a legacy alias so old URLs and `freepik/<model>` still resolve.
  alias: "freepik",
  baseUrl: "https://api.magnific.com/v1/ai/mystic",
  statusUrl: "https://api.magnific.com/v1/ai/mystic",
  authType: "apikey",
  authHeader: "x-magnific-api-key",
  format: "magnific-image", // custom: async submit task_id, then poll GET /{task_id}
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
