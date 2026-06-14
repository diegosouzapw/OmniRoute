/**
 * Stub for `src/lib/services/installers/ninerouter.ts` activated by
 * `OMNIROUTE_BUILD_PROFILE=minimal`. The 9router install / spawn helpers are
 * removed from the built bundle. See SECURITY.md and
 * docs/security/SOCKET_DEV_FINDINGS.md.
 */
import { featureDisabledError } from "@/lib/build-profile/featureDisabled";

const FEATURE = "9router-installer";

export async function installNinerouter(): Promise<never> {
  throw featureDisabledError(FEATURE);
}

export function resolveSpawnArgs(_apiKey: string, _port: number): never {
  throw featureDisabledError(FEATURE);
}
