/**
 * Music Generation Provider Registry
 *
 * Defines providers that support the /v1/music/generations endpoint.
 * Currently supports local providers (ComfyUI with audio models).
 */

import { parseModelFromRegistry, getAllModelsFromRegistry } from "./registryUtils.ts";

interface MusicModel {
  id: string;
  name: string;
  isMarket?: boolean;
}

interface MusicProvider {
  id: string;
  baseUrl: string;
  statusUrl?: string;
  authType: string;
  authHeader: string;
  format: string;
  models: MusicModel[];
}

export const MUSIC_PROVIDERS: Record<string, MusicProvider> = {
  kie: {
    id: "kie",
    baseUrl: "https://api.kie.ai",
    statusUrl: "https://api.kie.ai/api/v1/jobs/recordInfo",
    authType: "apikey",
    authHeader: "bearer",
    format: "kie-music",
    models: [
      { id: "suno-v4.0", name: "Suno V4.0" },
      { id: "suno-v3.5", name: "Suno V3.5" },
    ],
  },

  suno: {
    id: "suno",
    baseUrl: "https://studio-api.suno.ai/api/generate/v2/",
    statusUrl: "https://studio-api.suno.ai/api/feed/",
    authType: "cookie",
    authHeader: "cookie",
    format: "suno-music",
    models: [
      { id: "chirp-v3-5", name: "Chirp V3.5" },
      { id: "chirp-v4", name: "Chirp V4" },
    ],
  },
  udio: {
    id: "udio",
    baseUrl: "https://www.udio.com/api/generate-proxy",
    statusUrl: "https://www.udio.com/api/songs",
    authType: "cookie",
    authHeader: "cookie",
    format: "udio-music",
    models: [{ id: "udio-default", name: "Udio Default" }],
  },
  minimax: {
    id: "minimax",
    baseUrl: "https://api.minimax.io/v1/music_generation",
    statusUrl: "https://api.minimax.io/v1/query/music_generation",
    authType: "apikey",
    authHeader: "bearer",
    format: "minimax-music",
    models: [
      { id: "music-2.6", name: "Music 2.6" },
      { id: "music-2.6-free", name: "Music 2.6 Free" },
      { id: "music-cover", name: "Music Cover" },
    ],
  },
  comfyui: {
    id: "comfyui",
    baseUrl: "http://localhost:8188",
    authType: "none",
    authHeader: "none",
    format: "comfyui",
    models: [
      { id: "stable-audio-open", name: "Stable Audio Open" },
      { id: "musicgen-medium", name: "MusicGen Medium" },
    ],
  },
};

/**
 * Get music provider config by ID
 */
export function getMusicProvider(providerId: string): MusicProvider | null {
  return MUSIC_PROVIDERS[providerId] || null;
}

/**
 * Parse music model string (format: "provider/model" or just "model")
 */
export function parseMusicModel(modelStr: string | null) {
  return parseModelFromRegistry(modelStr, MUSIC_PROVIDERS);
}

/**
 * Get all music models as a flat list
 */
export function getAllMusicModels() {
  return getAllModelsFromRegistry(MUSIC_PROVIDERS);
}
