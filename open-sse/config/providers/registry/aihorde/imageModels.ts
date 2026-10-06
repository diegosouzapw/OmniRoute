/**
 * AI Horde image-generation provider entry.
 *
 * Chat still goes through oai.aihorde.net. Image jobs use the native Horde
 * async API (`/v2/generate/async`). `models` is a live getter so
 * imageRegistry stays under the file-size cap and zero-worker names are
 * never advertised.
 *
 * The live models arrive through `dynamicImageModelSources` rather than a direct
 * import of the catalog service: this entry is reachable from `"use client"` pages
 * via IMAGE_PROVIDERS, and importing the service here pulled the SQLite driver into
 * the browser bundle (#10692). `aihordeImageCatalog` registers itself on import, so
 * every server path that already loads it behaves exactly as before.
 */
import { getDynamicImageModels } from "../../../dynamicImageModelSources.ts";

export const AI_HORDE_IMAGE_PROVIDER = {
  id: "aihorde",
  alias: "horde",
  baseUrl: "https://aihorde.net/api",
  authType: "apikey",
  authHeader: "apikey",
  format: "aihorde",
  get models() {
    return getDynamicImageModels("aihorde");
  },
  supportedSizes: ["512x512", "768x768", "1024x1024", "1024x768", "768x1024"],
};
