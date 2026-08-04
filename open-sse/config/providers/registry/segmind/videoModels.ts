/**
 * Segmind video-generation starter model list (#6656).
 *
 * Same `POST /v1/{model}` REST shape as the image models (imageModels.ts) —
 * Segmind's video-capable models (Wan, Hunyuan, LTX, Kling) live under the
 * same host/auth. Slugs verified against
 * https://www.segmind.com/models/wan2.1-t2v/api and
 * https://www.segmind.com/models/wan2.7-i2v/api (2026-07-09); the remaining
 * Hunyuan/LTX/Kling slugs follow the same documented naming convention.
 */
export const SEGMIND_VIDEO_MODELS = [
  { id: "wan2.1-t2v", name: "Wan 2.1 Text-to-Video" },
  { id: "wan2.7-i2v", name: "Wan 2.7 Image-to-Video" },
  { id: "hunyuan-video-t2v", name: "Hunyuan Video Text-to-Video" },
  { id: "ltx-video-t2v", name: "LTX Video Text-to-Video" },
  { id: "kling-video-t2v", name: "Kling Video Text-to-Video" },
];
