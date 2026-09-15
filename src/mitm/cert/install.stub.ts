/**
 * Stub for `src/mitm/cert/install.ts` activated by
 * `OMNIROUTE_BUILD_PROFILE=minimal`. Every function throws
 * `FeatureDisabledError("mitm-cert-install")` at runtime so the privileged
 * code paths (root-CA install, NSS DB manipulation, sudo helpers) are
 * physically absent from the built bundle. See SECURITY.md and
 * docs/security/SOCKET_DEV_FINDINGS.md.
 */
import { featureDisabledError } from "../../lib/build-profile/featureDisabled.ts";

const FEATURE = "mitm-cert-install";

export async function checkCertInstalled(_certPath: string): Promise<boolean> {
  return false;
}

export async function installCert(_sudoPassword: string, _certPath: string): Promise<void> {
  throw featureDisabledError(FEATURE);
}

export async function uninstallCert(_sudoPassword: string, _certPath: string): Promise<void> {
  throw featureDisabledError(FEATURE);
}

// BUGFIX (Chat 327): missing entirely -- real consumers
// (agent-bridge/server, agent-bridge/cert route handlers) import
// installCertResult by name. Under Turbopack's resolveAlias this produced
// real "Export installCertResult doesn\'t exist in target module" compile
// errors, meaning OMNIROUTE_BUILD_PROFILE=minimal could not build via the
// Turbopack path. Matches the real module\'s signature; still only throws.
export async function installCertResult(
  _sudoPassword: string,
  _certPath: string
): Promise<never> {
  throw featureDisabledError(FEATURE);
}
