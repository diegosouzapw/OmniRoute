import crypto from "node:crypto";
import { headers } from "next/headers";

const SALT = "omniroute-cli-auth-v1";
const HEADER_NAME = "x-omniroute-cli-token";

export function isLoopback(ip: string): boolean {
  const normalized = ip.replace(/^::ffff:/, "");
  return normalized === "127.0.0.1" || normalized === "::1" || normalized === "localhost";
}

/**
 * Read a header value preferring the Request's own headers (works in any
 * context — App Router request handlers, unit tests, raw fetch) and falling
 * back to `next/headers` only when the request object isn't carrying them.
 *
 * Calling `headers()` outside a request scope throws (see Next.js
 * `next-dynamic-api-wrong-context`), so we guard the import.
 */
async function readHeader(request: Request, name: string): Promise<string | null> {
  const fromRequest = request.headers?.get(name);
  if (fromRequest != null) return fromRequest;
  try {
    const hdrs = await headers();
    return hdrs.get(name);
  } catch {
    return null;
  }
}

/**
 * Validates the CLI machine-id token sent by the local omniroute CLI.
 * Only accepted from loopback IPs. Disabled via OMNIROUTE_DISABLE_CLI_TOKEN=true.
 */
export async function isCliTokenAuthValid(request: Request): Promise<boolean> {
  if (process.env.OMNIROUTE_DISABLE_CLI_TOKEN === "true") return false;

  const token = await readHeader(request, HEADER_NAME);
  if (!token || token.length !== 32) return false;

  // Only allow loopback origin — check forwarded-for, real-ip, then host header.
  const forwardedFor = (await readHeader(request, "x-forwarded-for")) ?? "";
  const realIp = (await readHeader(request, "x-real-ip")) ?? "";
  const ip = forwardedFor.split(",")[0].trim() || realIp;
  if (ip && !isLoopback(ip)) return false;

  let expected: string;
  try {
    const { machineIdSync } = await import("node-machine-id");
    const mid = machineIdSync();
    expected = crypto
      .createHash("sha256")
      .update(mid + SALT)
      .digest("hex")
      .substring(0, 32);
  } catch {
    return false;
  }

  try {
    return crypto.timingSafeEqual(Buffer.from(token, "utf8"), Buffer.from(expected, "utf8"));
  } catch {
    return false;
  }
}
