import { randomBytes } from "crypto";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { vercelDeploySchema } from "@/shared/validation/freeProxySchemas";
import { createProxy } from "@/lib/localDb";
import { encrypt } from "@/lib/db/encryption";
// Shared SSRF-safe relay-path resolver — the same pure guard embedded in the
// Deno Deploy worker. Both edge relays must enforce identical path validation,
// so they import one source of truth rather than diverging copies.
import { resolveRelayTarget } from "../deno-deploy/route";

const VERCEL_API_BASE = process.env.VERCEL_API_BASE || "https://api.vercel.com";
const POLL_INTERVAL_MS = 3000;
const POLL_MAX_ATTEMPTS = 40; // ~2 min

function buildRelayFunction(relayAuth: string): string {
  // relayAuth is a random hex string generated server-side — no user input.
  // The runtime SSRF guard is inlined into the edge function (cannot import
  // Node-side helpers from the Edge runtime); it blocks RFC1918, loopback,
  // link-local, IPv6 ULA, and embedded credentials on the x-relay-target host.
  // `resolveRelayTarget` (shared with the Deno worker) closes the x-relay-path
  // host-confusion hole and is embedded verbatim via Function#toString.
  return `export const config = { runtime: "edge" };

${resolveRelayTarget.toString()}

function isPrivateHostname(h) {
  if (!h) return true;
  const host = h.trim().toLowerCase().replace(/^\\[|\\]$/g, "");
  if (
    host === "localhost" ||
    host === "0.0.0.0" ||
    host === "127.0.0.1" ||
    host === "::1" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    host.startsWith("::ffff:")
  ) return true;
  const v4 = host.match(/^(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})$/);
  if (v4) {
    const a = +v4[1], b = +v4[2];
    if (a === 0 || a === 10 || a === 127) return true;
    if (a === 169 && b === 254) return true;
    if (a === 192 && b === 168) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 100 && b >= 64 && b <= 127) return true;
    return false;
  }
  if (host.includes(":")) {
    return host === "::1" || host.startsWith("fc") || host.startsWith("fd") || host.startsWith("fe80:");
  }
  return false;
}

export default async function handler(req) {
  const auth = req.headers.get("x-relay-auth");
  if (auth !== "${relayAuth}") return new Response("Unauthorized", { status: 401 });
  const target = req.headers.get("x-relay-target");
  if (!target) return new Response("missing x-relay-target", { status: 400 });
  let targetUrl;
  try { targetUrl = new URL(target); } catch { return new Response("invalid x-relay-target", { status: 400 }); }
  if (targetUrl.protocol !== "http:" && targetUrl.protocol !== "https:") {
    return new Response("forbidden x-relay-target protocol", { status: 403 });
  }
  if (targetUrl.username || targetUrl.password) {
    return new Response("forbidden x-relay-target (embedded credentials)", { status: 403 });
  }
  if (isPrivateHostname(targetUrl.hostname)) {
    return new Response("forbidden x-relay-target (private/loopback host)", { status: 403 });
  }
  const relayPath = req.headers.get("x-relay-path") || "/";
  const resolved = resolveRelayTarget(target, relayPath);
  if (!resolved.ok) {
    return new Response(resolved.reason, { status: resolved.status });
  }
  const headers = new Headers(req.headers);
  ["x-relay-target", "x-relay-path", "x-relay-auth", "host"].forEach(h => headers.delete(h));
  const upstream = await fetch(resolved.url, {
    method: req.method,
    headers,
    body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
    duplex: "half",
  });
  return new Response(upstream.body, { status: upstream.status, headers: upstream.headers });
}`;
}

/**
 * Test-only hook exposing the generated Vercel worker source so the SSRF
 * regression test can assert it no longer string-concatenates the relay path
 * and embeds the shared `resolveRelayTarget` guard. Not part of the route
 * contract.
 */
export const __buildRelayFunctionForTest = buildRelayFunction;

async function pollDeployment(deploymentApiUrl: string, token: string): Promise<"READY" | "ERROR"> {
  for (let i = 0; i < POLL_MAX_ATTEMPTS; i++) {
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
    try {
      const res = await fetch(deploymentApiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) continue;
      const data = (await res.json()) as { readyState?: string };
      if (data.readyState === "READY") return "READY";
      if (data.readyState === "ERROR") return "ERROR";
    } catch {}
  }
  return "ERROR";
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown = {};
  try {
    rawBody = await request.json();
  } catch {
    return createErrorResponse({
      status: 400,
      message: "Invalid JSON body",
      type: "invalid_request",
    });
  }

  const validation = validateBody(vercelDeploySchema, rawBody);
  if (isValidationFailure(validation)) {
    return createErrorResponse({
      status: 400,
      message: validation.error.message,
      type: "invalid_request",
    });
  }

  const { token, projectName } = validation.data;
  // Generate random auth secret for the relay — stored in proxy notes, never returned to client
  const relayAuth = randomBytes(24).toString("hex");
  const relayCode = buildRelayFunction(relayAuth);

  try {
    const deployRes = await fetch(`${VERCEL_API_BASE}/v13/deployments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: projectName,
        files: [
          { file: "api/relay.js", data: relayCode },
          {
            file: "package.json",
            data: JSON.stringify({ name: projectName, version: "1.0.0" }),
          },
          {
            file: "vercel.json",
            data: JSON.stringify({
              rewrites: [{ source: "/(.*)", destination: "/api/relay" }],
            }),
          },
        ],
        projectSettings: { framework: null },
        target: "production",
      }),
    });

    if (!deployRes.ok) {
      // Avoid forwarding 200 bytes of raw Vercel error text — it may contain
      // project IDs, team slugs, deployment hashes or internal Vercel error
      // strings. Parse the canonical { error: { message } } shape and surface
      // only the human-readable message (or a generic fallback).
      let upstreamMessage = "Vercel API rejected the deployment";
      try {
        const parsed = (await deployRes.json().catch(() => null)) as {
          error?: { message?: string };
        } | null;
        const candidate = parsed?.error?.message;
        if (typeof candidate === "string" && candidate.trim()) {
          upstreamMessage = candidate.trim().slice(0, 200);
        }
      } catch {
        /* fall through to generic message */
      }
      return createErrorResponse({
        status: deployRes.status,
        message: `Vercel deployment failed: ${upstreamMessage}`,
        type: "upstream_error",
      });
    }

    const deployment = (await deployRes.json()) as {
      id?: string;
      url?: string;
      projectId?: string;
    };

    if (!deployment.url) {
      return createErrorResponse({
        status: 502,
        message: "Vercel returned no deployment URL",
        type: "upstream_error",
      });
    }

    // Disable Vercel SSO protection so the relay is publicly accessible
    if (deployment.projectId) {
      await fetch(`${VERCEL_API_BASE}/v9/projects/${deployment.projectId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ssoProtection: null }),
      }).catch(() => {});
    }

    // Poll until READY
    const deploymentApiUrl = `${VERCEL_API_BASE}/v13/deployments/${deployment.id}`;
    const readyState = await pollDeployment(deploymentApiUrl, token);

    if (readyState !== "READY") {
      return createErrorResponse({
        status: 504,
        message:
          "Deployment did not reach READY state within 2 minutes. Check your Vercel dashboard.",
        type: "timeout",
      });
    }

    // Store as proxy pool entry — token is NOT stored. relayAuth is encrypted
    // at rest when STORAGE_ENCRYPTION_KEY is configured (encrypt() is a no-op
    // in passthrough mode); the redactor strips both shapes from API responses.
    const encryptedRelayAuth = encrypt(relayAuth);
    const notesPayload =
      encryptedRelayAuth && encryptedRelayAuth !== relayAuth
        ? { relayAuthEnc: encryptedRelayAuth }
        : { relayAuth };
    const poolProxy = await createProxy({
      name: `Vercel Relay (${projectName})`,
      type: "vercel",
      host: deployment.url,
      port: 443,
      notes: JSON.stringify(notesPayload),
      source: "vercel-relay",
    });

    return Response.json({
      success: true,
      relayUrl: `https://${deployment.url}`,
      poolProxyId: poolProxy?.id,
    });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Vercel deploy failed");
  }
}
