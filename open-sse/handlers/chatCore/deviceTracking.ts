import { trackDevice, extractIpFromHeaders } from "../../services/deviceTracker.ts";

export function trackRequestDevice(input: {
  apiKeyId?: string | null;
  headers?: Headers | Record<string, string | string[] | undefined> | null;
  userAgent?: string | null;
}) {
  if (!input.apiKeyId) return;
  trackDevice(input.apiKeyId, extractIpFromHeaders(input.headers ?? null), input.userAgent ?? null);
}
