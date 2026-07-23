import { randomBytes } from "node:crypto";
import { encrypt, decrypt } from "@/lib/db/encryption";
import { getServiceRow, updateServiceField } from "@/lib/db/versionManager";

export function generateServiceApiKey(prefix = "nr"): string {
  return `${prefix}_${randomBytes(32).toString("base64url")}`;
}

export class ServiceApiKeyDecryptError extends Error {
  constructor(tool: string) {
    super(
      `Stored API key for service '${tool}' could not be decrypted. ` +
        `STORAGE_ENCRYPTION_KEY may have changed, the row may be corrupted, ` +
        `or it was written on a different machine. Reinstall the service ` +
        `or rotate the key via POST /api/services/${tool}/rotate-key.`
    );
    this.name = "ServiceApiKeyDecryptError";
  }
}

export async function getOrCreateApiKey(tool: string): Promise<string> {
  const row = await getServiceRow(tool);
  if (row?.apiKey) {
    const decrypted = decrypt(row.apiKey);
    if (decrypted) return decrypted;
    // Fail loud: silently regenerating would mint a new key the embedded
    // service has never been told, causing every request to 401 with no
    // operator-facing signal.
    throw new ServiceApiKeyDecryptError(tool);
  }
  const prefix = tool === "9router" ? "nr" : tool === "mux" ? "mx" : "cp";
  const key = generateServiceApiKey(prefix);
  await updateServiceField(tool, "apiKey", encrypt(key) ?? key);
  return key;
}

export function maskApiKey(plainKey: string): string {
  const last4 = plainKey.slice(-4);
  return `nr_••••••••${last4}`;
}
