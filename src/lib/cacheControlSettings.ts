/**
 * Cache Control Settings
 *
 * Provides cached access to cache control settings for performance.
 * Settings are fetched once and cached to avoid repeated DB hits.
 */

import { getSettings } from "./db/settings";
import type { CacheControlMode } from "@omniroute/open-sse/utils/cacheControlPolicy";

let cachedSettings: CacheControlMode | null = null;

export async function getCacheControlSettings(): Promise<CacheControlMode> {
  if (cachedSettings !== null) {
    return cachedSettings;
  }

  const settings = await getSettings();
  cachedSettings = (settings.alwaysPreserveClientCache as CacheControlMode) || "auto";
  return cachedSettings;
}

export function invalidateCacheControlSettingsCache() {
  cachedSettings = null;
}
