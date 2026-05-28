/**
 * Stub for `src/mitm/cert/install.ts` activated by
 * `OMNIROUTE_BUILD_PROFILE=minimal`. Every function throws
 * `FeatureDisabledError("mitm-cert-install")` at runtime so the privileged
 * code paths (root-CA install, NSS DB manipulation, sudo helpers) are
 * physically absent from the built bundle. See SECURITY.md and
 * docs/security/SOCKET_DEV_FINDINGS.md.
 */
import { featureDisabledError } from "@/lib/build-profile/featureDisabled";

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
