import { createSseTextTransform } from "./sseTextTransform";
import { sanitizePIIChunk } from "./piiSanitizer";

export function createPiiSseTransform(): TransformStream {
  return createSseTextTransform((text) => sanitizePIIChunk(text));
}
