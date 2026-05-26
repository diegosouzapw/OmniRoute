import { randomBytes } from "node:crypto";
import { encrypt, decrypt } from "@/lib/db/encryption";
import { getServiceRow, updateServiceField } from "@/lib/db/versionManager";

export function generateServiceApiKey(prefix = "nr"): string {
  return `${prefix}_${randomBytes(32).toString("base64url")}`;
}

export async function getOrCreateApiKey(tool: string): Promise<string> {
  const row = await getServiceRow(tool);
  if (row?.apiKey) {
    const decrypted = decrypt(row.apiKey);
    if (decrypted) return decrypted;
  }
  const key = generateServiceApiKey(tool === "9router" ? "nr" : "cp");
  await updateServiceField(tool, "apiKey", encrypt(key) ?? key);
  return key;
}

export function maskApiKey(plainKey: string): string {
  const last4 = plainKey.slice(-4);
  return `nr_••••••••${last4}`;
}
