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

let _MUSIC_PROVIDERS: Record<string, MusicProvider> | null = null;

function getOrCreateMusicProviders(): Record<string, MusicProvider> {
  if (!_MUSIC_PROVIDERS) {
    _MUSIC_PROVIDERS = {
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
}
  return _MUSIC_PROVIDERS;
}

export const MUSIC_PROVIDERS: Record<string, MusicProvider> = new Proxy({} as Record<string, MusicProvider>, {
  get(target, key: string) {
    if (key in target) {
      return target[key];
    }
    return getOrCreateMusicProviders()[key];
  },
  set(target, key: string, value) {
    target[key] = value;
    getOrCreateMusicProviders()[key] = value;
    return true;
  },
  deleteProperty(target, key: string) {
    delete target[key];
    delete getOrCreateMusicProviders()[key];
    return true;
  },
  ownKeys(target) {
    const targetKeys = Reflect.ownKeys(target);
    const registryKeys = Reflect.ownKeys(getOrCreateMusicProviders());
    return Array.from(new Set([...targetKeys, ...registryKeys]));
  },
  has(target, key) {
    return key in target || key in getOrCreateMusicProviders();
  },
  getOwnPropertyDescriptor(target, key) {
    if (key in target) {
      return Reflect.getOwnPropertyDescriptor(target, key);
    }
    if (key in getOrCreateMusicProviders()) {
      return { configurable: true, enumerable: true, value: getOrCreateMusicProviders()[key as string] };
    }
    return undefined;
  },
});

export function getMusicProviders(): Record<string, MusicProvider> {
  return MUSIC_PROVIDERS;
}

export function getMusicProvider(providerId: string): MusicProvider | null {
  return MUSIC_PROVIDERS[providerId] || null;
}

export function parseMusicModel(modelStr: string | null) {
  return parseModelFromRegistry(modelStr, MUSIC_PROVIDERS);
}

export function getAllMusicModels() {
  return getAllModelsFromRegistry(MUSIC_PROVIDERS);
}