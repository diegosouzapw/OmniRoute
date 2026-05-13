import { Buffer } from "node:buffer";
import { randomBytes } from "crypto";

import { NextResponse } from "next/server";
import { z } from "zod";

import { hashCommandCodeAuthState } from "@/lib/db/commandCodeAuth";

export const COMMAND_CODE_AUTH_TTL_MS = 15 * 60 * 1000;
export const COMMAND_CODE_STUDIO_AUTH_URL = "https://commandcode.ai/studio/auth/cli";
export const MAX_CALLBACK_BODY_BYTES = 10 * 1024;
export const COMMAND_CODE_CLI_CALLBACK_PORTS = [
  5959, 5960, 5961, 5962, 5963, 5964, 5965, 5966, 5967, 5968,
] as const;

const LOCAL_CALLBACK_ORIGIN = "http://localhost:3000";
const PRODUCTION_CALLBACK_ORIGINS = ["https://commandcode.ai", "https://staging.commandcode.ai"];

export const commandCodeCallbackSchema = z.object({
  apiKey: z.string().trim().min(1).max(4096),
  state: z.string().trim().min(32).max(512),
  userId: z.string().trim().max(256).optional(),
  userName: z.string().trim().max(256).optional(),
  keyName: z.string().trim().max(256).optional(),
});

export const commandCodeStateSchema = z.object({
  state: z.string().trim().min(32).max(512),
});

export const commandCodeApplySchema = commandCodeStateSchema.extend({
  connectionId: z.string().trim().min(1).max(256).optional(),
  name: z.string().trim().min(1).max(256).optional(),
  setDefault: z.boolean().optional(),
});

export function generateCommandCodeState(): string {
  return randomBytes(32).toString("base64url");
}

export function stateHashFromState(state: string): string {
  return hashCommandCodeAuthState(state);
}

export function noStoreJson(body: unknown, init: ResponseInit = {}): NextResponse {
  return NextResponse.json(body, {
    ...init,
    headers: {
      "Cache-Control": "no-store",
      ...(init.headers || {}),
    },
  });
}

export function getAllowedCallbackOrigin(origin: string | null): string | null {
  const allowed =
    process.env.NODE_ENV === "production"
      ? PRODUCTION_CALLBACK_ORIGINS
      : [...PRODUCTION_CALLBACK_ORIGINS, LOCAL_CALLBACK_ORIGIN];
  return origin && allowed.includes(origin) ? origin : null;
}

export function callbackCorsHeaders(request: Request): HeadersInit {
  const requestHeaders = request.headers.get("access-control-request-headers") || "content-type";
  const origin = getAllowedCallbackOrigin(request.headers.get("origin"));
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": requestHeaders,
    "Access-Control-Allow-Private-Network": "true",
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    Vary: "Origin, Access-Control-Request-Headers",
  };
  if (origin) headers["Access-Control-Allow-Origin"] = origin;
  return headers;
}

export function rejectDisallowedCallbackOrigin(request: Request): Response | null {
  const origin = request.headers.get("origin");
  if (!origin || getAllowedCallbackOrigin(origin)) return null;
  return new Response(JSON.stringify({ success: false, error: "Origin not allowed" }), {
    status: 403,
    headers: callbackCorsHeaders(request),
  });
}

export async function readJsonBodyWithLimit(request: Request, maxBytes: number): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) return request.json();

  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    if (!value) continue;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel();
      throw new Error("BODY_TOO_LARGE");
    }
    chunks.push(value);
  }

  const body = new TextDecoder().decode(Buffer.concat(chunks));
  return JSON.parse(body);
}

export function buildCommandCodeCliCallbackUrl(): string {
  const configuredPort = process.env.COMMAND_CODE_CALLBACK_PORT || "";
  const port = /^\d+$/.test(configuredPort)
    ? Number.parseInt(configuredPort, 10)
    : COMMAND_CODE_CLI_CALLBACK_PORTS[0];
  const safePort = COMMAND_CODE_CLI_CALLBACK_PORTS.includes(
    port as (typeof COMMAND_CODE_CLI_CALLBACK_PORTS)[number]
  )
    ? port
    : COMMAND_CODE_CLI_CALLBACK_PORTS[0];
  return `http://localhost:${safePort}/callback`;
}
