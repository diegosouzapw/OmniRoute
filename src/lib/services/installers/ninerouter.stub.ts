/**
 * Stub for `src/lib/services/installers/ninerouter.ts` activated by
 * `OMNIROUTE_BUILD_PROFILE=minimal`. The 9router install / spawn helpers are
 * removed from the built bundle. See SECURITY.md and
 * docs/security/SOCKET_DEV_FINDINGS.md.
 *
 * BUGFIX (Chat 327): the original stub only exported `installNinerouter`
 * (wrong name -- the real module exports `install`) and `resolveSpawnArgs`,
 * missing getInstalledVersion/getLatestVersion/update/uninstall entirely.
 * Real consumers (app/api/services/9router/{status,install,update}/route.ts)
 * import all of these by name -- under Turbopack's resolveAlias mechanism
 * this produced 9 real "Export X doesn\'t exist in target module" compile
 * errors, meaning OMNIROUTE_BUILD_PROFILE=minimal could not produce a
 * working build via the Turbopack path at all. Every export below matches
 * the real module\'s exact name and signature; each still only throws
 * FeatureDisabledError -- no privileged functionality is restored.
 */
import { featureDisabledError } from "@/lib/build-profile/featureDisabled";

const FEATURE = "9router-installer";

export async function getInstalledVersion(): Promise<string | null> {
  throw featureDisabledError(FEATURE);
}

export async function getLatestVersion(): Promise<string | null> {
  throw featureDisabledError(FEATURE);
}

export async function install(_version = "latest"): Promise<never> {
  throw featureDisabledError(FEATURE);
}

export async function update(): Promise<never> {
  throw featureDisabledError(FEATURE);
}

export async function uninstall(): Promise<never> {
  throw featureDisabledError(FEATURE);
}

export function resolveSpawnArgs(_apiKey: string, _port: number): never {
  throw featureDisabledError(FEATURE);
}
