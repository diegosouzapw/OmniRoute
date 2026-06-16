import { getSettings } from "@/lib/localDb";
import { isProviderBlockedByIdOrAlias } from "@/shared/utils/noAuthProviders";
import * as log from "../utils/logger";

export async function isNoAuthProviderBlockedBySettings(providerId: string): Promise<boolean> {
  try {
    const settings = await getSettings();
    return isProviderBlockedByIdOrAlias(providerId, settings.blockedProviders);
  } catch (error) {
    log.warn(
      "AUTH",
      `Could not read blocked provider settings for ${providerId}: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    return false;
  }
}
