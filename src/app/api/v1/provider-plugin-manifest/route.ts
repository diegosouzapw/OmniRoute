import { createHash } from "node:crypto";

import { CORS_HEADERS } from "@/shared/utils/cors";
import { generateProviderPluginManifest } from "@omniroute/open-sse/config/providerPluginManifestRegistry.ts";

const CACHE_HEADERS = {
  ...CORS_HEADERS,
  "Cache-Control": "public, max-age=60",
} as const;

// The provider registry is module-static; process reloads rebuild this snapshot.
let cachedPayload: { body: string; etag: string } | null = null;

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      ...CORS_HEADERS,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

function createEtag(body: string): string {
  return `"${createHash("sha256").update(body).digest("base64url")}"`;
}

function matchesEtag(ifNoneMatch: string | null, etag: string): boolean {
  return Boolean(
    ifNoneMatch
      ?.split(",")
      .map((value) => value.trim())
      .some((value) => value === "*" || value === etag || value === `W/${etag}`)
  );
}

function getManifestPayload(): { body: string; etag: string } {
  if (cachedPayload) return cachedPayload;

  const body = JSON.stringify(generateProviderPluginManifest());
  cachedPayload = { body, etag: createEtag(body) };
  return cachedPayload;
}

export async function GET(request: Request) {
  const { body, etag } = getManifestPayload();
  const headers = { ...CACHE_HEADERS, ETag: etag };

  if (matchesEtag(request.headers.get("If-None-Match"), etag)) {
    return new Response(null, { status: 304, headers });
  }

  return new Response(body, {
    headers: { ...headers, "Content-Type": "application/json" },
  });
}
