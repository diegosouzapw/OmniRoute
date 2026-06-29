import { parseResponseBody, getErrorMessage } from "@/shared/utils/api";
import { CREDENTIAL_BLOB_PREFIX } from "@/lib/oauth/credentialBlob";

/**
 * Helpers for the remote-login "paste credentials" path in OAuthModal.
 *
 * Google's native-loopback consent can't complete on a remote install, so the
 * user runs `omniroute login antigravity` locally and pastes the credential blob
 * it prints into the modal's Step 2 field. Extracted from OAuthModal to keep that
 * (god-file) component within its frozen size budget.
 */

/** True if the pasted text is a credential blob (vs a callback URL / auth code). */
export function isCredentialBlob(value: string): boolean {
  return typeof value === "string" && value.trim().startsWith(CREDENTIAL_BLOB_PREFIX);
}

/**
 * POST a pasted credential blob to the paste-credentials endpoint. On success it
 * advances the modal to the success step and fires onSuccess; on failure it
 * THROWS so the caller's existing try/catch surfaces the error (keeps the modal
 * call site to two lines). Decoding + finalize + persist happen server-side.
 */
export async function submitCredentialBlob(
  provider: string,
  blob: string,
  reauthConnection: { id?: string } | null | undefined,
  setStep: (s: string) => void,
  onSuccess?: () => void
): Promise<void> {
  const res = await fetch(`/api/oauth/${provider}/paste-credentials`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ blob: blob.trim(), connectionId: reauthConnection?.id }),
  });
  const data = (await parseResponseBody(res)) as Record<string, unknown>;
  if (!res.ok) {
    throw new Error(getErrorMessage(data, res.status, "Failed to import credentials"));
  }
  setStep("success");
  onSuccess?.();
}
