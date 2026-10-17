import type { ProviderCredentials } from "@omniroute/open-sse/executors/base.ts";

/** Reject diagnostic sentinels before credentials cross an image-adapter boundary. */
export function isUsableImageCredentials(value: unknown): value is ProviderCredentials {
  if (!value || typeof value !== "object") return false;
  const token = "accessToken" in value ? value.accessToken : undefined;
  const key = "apiKey" in value ? value.apiKey : undefined;
  return (typeof token === "string" && token.trim().length > 0) ||
    (typeof key === "string" && key.trim().length > 0);
}
