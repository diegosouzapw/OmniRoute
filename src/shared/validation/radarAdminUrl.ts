import { z } from "zod";

function isLoopbackHostname(hostname: string): boolean {
  const normalized = hostname.toLowerCase();
  if (normalized === "localhost" || normalized === "[::1]") return true;

  const octets = normalized.split(".");
  return (
    octets.length === 4 &&
    octets[0] === "127" &&
    octets.every((octet) => /^\d{1,3}$/.test(octet) && Number(octet) <= 255)
  );
}

/**
 * Owner-configured browser destination for the private Radar operations panel.
 * Public/tailnet tunnels must use HTTPS; HTTP is accepted only for an SSH
 * local-forward loopback destination. Credentials are never accepted.
 */
export const radarAdminUrlSchema = z
  .string()
  .trim()
  .min(1)
  .max(2048)
  .url()
  .transform((raw, context) => {
    const url = new URL(raw);
    const safeProtocol =
      url.protocol === "https:" || (url.protocol === "http:" && isLoopbackHostname(url.hostname));

    if (!safeProtocol || url.username || url.password) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Radar Admin URL must be HTTPS or HTTP loopback without credentials",
      });
      return z.NEVER;
    }

    return url.toString();
  });

export function parseRadarAdminUrl(value: unknown): string | null {
  const parsed = radarAdminUrlSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
}
