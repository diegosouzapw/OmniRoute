/**
 * Permanent-ban auto-disable for markAccountUnavailable.
 *
 * Extracted from auth.ts so the frozen god-file only keeps the call site.
 * Scope (all vs subscription) lives in shared/utils/autoDisableBanned.ts.
 */

import { getCachedSettings } from "@/lib/db/readCache";
import { updateProviderConnection } from "@/lib/db/providers";
import { resolveProviderId, WEB_COOKIE_PROVIDERS } from "@/shared/constants/providers";
import { shouldAutoDisableBannedConnection } from "@/shared/utils/autoDisableBanned";
import { shouldIsolateProbeFailures } from "@/shared/utils/probeOrigin";
import * as log from "../utils/logger";

/** Deactivate a connection after a permanent ban when settings and scope allow it. */
export async function maybeAutoDisableBannedAccount(input: {
  connectionId: string;
  provider?: string | null;
  authType?: string | null;
  connectionProvider?: string | null;
  permanent?: boolean;
}): Promise<void> {
  if (!input.permanent) return;
  // T-PROBE: a probe-origin failure (model test-all) must never disable a
  // connection — only a real request-path failure deactivates (#9817).
  if (await shouldIsolateProbeFailures()) {
    log.info(
      "AUTH",
      `Skipped auto-disable for ${input.connectionId.slice(0, 8)} — probe origin (permanent failure, connection stays active)`
    );
    return;
  }
  try {
    const settings = await getCachedSettings();
    const scope = settings.autoDisableBannedScope;
    if (
      !shouldAutoDisableBannedConnection({
        enabled: Boolean(settings.autoDisableBannedAccounts),
        scope,
        authType: input.authType,
        providerId: resolveProviderId(input.provider || input.connectionProvider || ""),
        webCookieProviderIds: WEB_COOKIE_PROVIDERS,
      })
    ) {
      if (settings.autoDisableBannedAccounts) {
        log.info(
          "AUTH",
          `Skipped auto-disable for ${input.connectionId.slice(0, 8)} — permanent ban recorded, scope=${scope || "all"} authType=${input.authType || "unknown"}`
        );
      }
      return;
    }
    await updateProviderConnection(input.connectionId, { isActive: false });
    log.info(
      "AUTH",
      `Auto-disabled ${input.connectionId.slice(0, 8)} — permanent ban detected (autoDisableBannedAccounts=true, scope=${settings.autoDisableBannedScope || "all"})`
    );
  } catch (error) {
    log.info("AUTH", `Auto-disable check failed (non-fatal): ${error}`);
  }
}
