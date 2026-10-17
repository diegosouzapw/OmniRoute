import { z } from "zod";
import { PASTE_CREDENTIAL_PROVIDERS } from "./pasteCredentials";

const tokensSchema = z.object({
  access_token: z.string().trim().min(1),
  refresh_token: z.string().min(1).optional(),
  id_token: z.string().optional(),
  expires_in: z.coerce.number().finite().positive().optional(),
  scope: z.string().optional(),
  token_type: z.string().optional(),
});

const aliases: Record<string, string> = {
  accessToken: "access_token",
  refreshToken: "refresh_token",
  idToken: "id_token",
  expiresIn: "expires_in",
};

export function normalizeImportRecord(account: Record<string, unknown>, provider: string) {
  if (!PASTE_CREDENTIAL_PROVIDERS.has(provider)) return null;
  if (account.provider !== undefined && account.provider !== provider) return null;
  const nested = account.token;
  if (nested !== undefined && (!nested || typeof nested !== "object" || Array.isArray(nested))) {
    return null;
  }
  const merged: Record<string, unknown> = { ...account, ...(nested as Record<string, unknown>) };
  for (const [camel, snake] of Object.entries(aliases)) {
    if (merged[snake] === undefined && merged[camel] !== undefined) merged[snake] = merged[camel];
  }
  if (merged.expires_in === undefined && typeof merged.expiry_timestamp === "number") {
    const seconds = Math.floor((merged.expiry_timestamp - Date.now()) / 1000);
    if (seconds > 0) merged.expires_in = seconds;
  }
  const parsed = tokensSchema.safeParse(merged);
  if (!parsed.success) return null;
  return {
    tokens: parsed.data,
    email: typeof account.email === "string" ? account.email : undefined,
    name: typeof account.name === "string" ? account.name : undefined,
  };
}
