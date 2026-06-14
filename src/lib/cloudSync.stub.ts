/**
 * Stub for `src/lib/cloudSync.ts` activated by
 * `OMNIROUTE_BUILD_PROFILE=minimal`. All Cloud Sync code paths
 * (signature verification, remote-credential merge, fetch with timeout) are
 * physically absent from the built bundle. See SECURITY.md and
 * docs/security/SOCKET_DEV_FINDINGS.md.
 */
import { featureDisabledError } from "@/lib/build-profile/featureDisabled";

const FEATURE = "cloud-sync";

export const CLOUD_URL = "";
export const CLOUD_SYNC_TIMEOUT_MS = 0;
export const CLOUD_SYNC_SECRETS_ENABLED = false;

export function verifyCloudSignature(_rawBody: string, _sigHeader: string | null): boolean {
  return false;
}

export async function fetchWithTimeout(): Promise<never> {
  throw featureDisabledError(FEATURE);
}

export async function syncToCloud(
  _machineId: string,
  _createdKey: string | null = null
): Promise<{ error: string }> {
  // Soft-fail instead of throwing so the caller (api/keys/[id]/route.ts) can
  // continue serving the rest of the request — Cloud sync is best-effort.
  return { error: "Cloud Sync is disabled in this build (minimal profile)" };
}
