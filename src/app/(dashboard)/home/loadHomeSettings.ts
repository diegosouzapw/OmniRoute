import { getSettings } from "@/lib/db/settings";

export type HomeSettings = { setupComplete?: unknown };

/**
 * Settings read for the Home Server Component (#14060).
 *
 * A corrupted `key_value` table makes getSettings() throw, which used to crash the
 * whole Home render with a 500. The degradation lives HERE, in the display-only
 * consumer — never inside getSettings() itself: auth/authz callers such as
 * isAuthRequired() rely on getSettings() rejecting so they fail CLOSED. Swallowing
 * the error at the DB layer would hand them password-less defaults and disable
 * auth for loopback requests.
 */
export async function loadHomeSettings(
  load: () => Promise<HomeSettings> = getSettings
): Promise<HomeSettings> {
  try {
    return await load();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[Home] Failed to load settings; rendering with defaults: ${message}`);
    return { setupComplete: false };
  }
}
