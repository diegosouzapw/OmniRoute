import crypto from "node:crypto";
import { headers } from "next/headers";

import { getLegacyCliTokenSync, getMachineTokenSync } from "@/lib/machineToken";
import { AUTHZ_HEADER_PEER_LOCALITY } from "@/server/authz/headers";

const HEADER_NAME = "x-omniroute-cli-token";

type RequestWithPeer = Request & {
  ip?: string;
  socket?: { remoteAddress?: string };
};

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

function firstHeaderIp(value: string | null): string | null {
  return value?.split(",")[0]?.trim() || null;
}

function requestPeerAddress(request: RequestWithPeer): string | null {
  return request.ip || request.socket?.remoteAddress || null;
}

async function isLocalCliRequest(request: RequestWithPeer): Promise<boolean> {
  // 1. Direct / non-middleware callers (raw Node, unit tests) may carry a real
  //    socket peer.
  const peerAddress = requestPeerAddress(request);
  if (peerAddress) return isLoopback(peerAddress);

  // 2. A forwarded request came through a proxy → it is not a local CLI call.
  const forwardedPeer =
    firstHeaderIp(await readHeader(request, "cf-connecting-ip")) ||
    firstHeaderIp(await readHeader(request, "x-forwarded-for")) ||
    firstHeaderIp(await readHeader(request, "x-real-ip"));
  if (forwardedPeer) return false;

  // 3. Behind the authz pipeline, trust ONLY the locality verdict the middleware
  //    stamped from the real TCP peer IP. NEVER derive locality from the Host
  //    header (new URL(request.url).hostname) — it is client-controlled, so a
  //    remote caller with a stolen CLI token could send Host: 127.0.0.1 to pass.
  const locality = await readHeader(request, AUTHZ_HEADER_PEER_LOCALITY);
  if (locality !== null) return locality === "loopback";

  // 4. No trusted locality signal → fail closed.
  return false;
}

/**
 * Validates the CLI machine-id token sent by the local omniroute CLI.
 * Only accepted from loopback IPs. Disabled via OMNIROUTE_DISABLE_CLI_TOKEN=true.
 */
export async function isCliTokenAuthValid(request: Request): Promise<boolean> {
  if (process.env.OMNIROUTE_DISABLE_CLI_TOKEN === "true") return false;

  const token = await readHeader(request, HEADER_NAME);
  if (!token) return false;

  if (!(await isLocalCliRequest(request as RequestWithPeer))) return false;

  const expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()].filter(Boolean);
  return expectedTokens.some((expected) => {
    if (token.length !== expected.length) return false;
    try {
      return crypto.timingSafeEqual(Buffer.from(token, "utf8"), Buffer.from(expected, "utf8"));
    } catch {
      return false;
    }
  });
}
