import { randomBytes } from "crypto";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { denoDeploySchema } from "@/shared/validation/freeProxySchemas";
import { createProxy } from "@/lib/localDb";
import { encrypt } from "@/lib/db/encryption";

const DENO_API_BASE = process.env.DENO_DEPLOY_API_BASE || "https://api.deno.com/v2";
const POLL_INTERVAL_MS = 2000;
const POLL_MAX_ATTEMPTS = 30; // ~60 s

// Inlined Deno Deploy relay worker. The relayAuth secret is generated
// server-side (no user input); the runtime SSRF guard is inlined into the
// edge function because Deno Deploy isolates each app and cannot import
// Node-side helpers. Mirrors the Vercel-relay guard byte-for-byte so a
// future audit can diff the two and confirm they enforce the same policy.
function buildRelayWorker(relayAuth: string): string {
  return `function isPrivateHostname(h) {
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

Deno.serve(async (request) => {
  const auth = request.headers.get("x-relay-auth");
  if (auth !== "${relayAuth}") return new Response("Unauthorized", { status: 401 });
  const target = request.headers.get("x-relay-target");
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
  const relayPath = request.headers.get("x-relay-path") || "/";
  const headers = new Headers(request.headers);
  ["x-relay-target", "x-relay-path", "x-relay-auth", "host"].forEach(h => headers.delete(h));
  const init = { method: request.method, headers };
  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = request.body;
    init.duplex = "half";
  }
  try {
    const upstream = await fetch(target.replace(/\\/$/, "") + relayPath, init);
    return new Response(upstream.body, { status: upstream.status, headers: upstream.headers });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error && error.message || error) }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }
});`;
}

async function pollRevision(
  revisionId: string,
  token: string
): Promise<"succeeded" | "failed" | "timeout"> {
  for (let i = 0; i < POLL_MAX_ATTEMPTS; i++) {
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
    try {
      const res = await fetch(`${DENO_API_BASE}/revisions/${revisionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) continue;
      const data = (await res.json()) as { status?: string };
      const status = data.status;
      if (status === "succeeded") return "succeeded";
      if (status === "failed" || status === "errored") return "failed";
      // "queued" / "building" — keep polling.
    } catch {
      /* network blip; keep polling */
    }
  }
  return "timeout";
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

  const validation = validateBody(denoDeploySchema, rawBody);
  if (isValidationFailure(validation)) {
    return createErrorResponse({
      status: 400,
      message: validation.error.message,
      type: "invalid_request",
    });
  }

  const { denoToken, orgDomain, projectName } = validation.data;
  const relayAuth = randomBytes(24).toString("hex");
  const relayCode = buildRelayWorker(relayAuth);
  const headers = {
    Authorization: `Bearer ${denoToken}`,
    "Content-Type": "application/json",
  };

  try {
    // 1. Create app slot.
    const createRes = await fetch(`${DENO_API_BASE}/apps`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        slug: projectName,
        labels: { "custom.kind": "omniroute-relay" },
        config: {
          install: "deno install",
          runtime: { type: "dynamic", entrypoint: "main.ts" },
        },
      }),
    });

    if (!createRes.ok) {
      let upstreamMessage = "Deno Deploy API rejected the create-app call";
      try {
        const parsed = (await createRes.json().catch(() => null)) as {
          error?: { message?: string } | string;
          message?: string;
        } | null;
        const candidate =
          (typeof parsed?.error === "object" && parsed?.error?.message) ||
          (typeof parsed?.error === "string" && parsed?.error) ||
          parsed?.message;
        if (typeof candidate === "string" && candidate.trim()) {
          upstreamMessage = candidate.trim().slice(0, 200);
        }
      } catch {
        /* fall through */
      }
      if (createRes.status === 409) {
        return createErrorResponse({
          status: 409,
          message: `Deno Deploy app "${projectName}" already exists. Choose a different name.`,
          type: "conflict",
        });
      }
      return createErrorResponse({
        status: createRes.status,
        message: `Deno Deploy create-app failed: ${upstreamMessage}`,
        type: "upstream_error",
      });
    }

    const app = (await createRes.json()) as { id?: string };
    if (!app.id) {
      return createErrorResponse({
        status: 502,
        message: "Deno Deploy returned no app id",
        type: "upstream_error",
      });
    }

    // 2. Push the relay code as a single-file deployment.
    const deployRes = await fetch(`${DENO_API_BASE}/apps/${app.id}/deploy`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        assets: {
          "main.ts": {
            kind: "file",
            content: relayCode,
            encoding: "utf-8",
          },
        },
      }),
    });

    if (!deployRes.ok) {
      // Best-effort cleanup so a failed deploy does not leave an empty app
      // behind. Mirrors the upstream PR-1437 behaviour.
      await fetch(`${DENO_API_BASE}/apps/${app.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${denoToken}` },
      }).catch(() => {});

      let upstreamMessage = "Deno Deploy rejected the deployment";
      try {
        const parsed = (await deployRes.json().catch(() => null)) as {
          error?: { message?: string } | string;
        } | null;
        const candidate =
          (typeof parsed?.error === "object" && parsed?.error?.message) ||
          (typeof parsed?.error === "string" && parsed?.error);
        if (typeof candidate === "string" && candidate.trim()) {
          upstreamMessage = candidate.trim().slice(0, 200);
        }
      } catch {
        /* fall through */
      }
      return createErrorResponse({
        status: deployRes.status,
        message: `Deno Deploy failed: ${upstreamMessage}`,
        type: "upstream_error",
      });
    }

    const revision = (await deployRes.json()) as { id?: string; status?: string };
    const revisionId = revision.id;
    let finalStatus: "succeeded" | "failed" | "timeout" =
      revision.status === "succeeded"
        ? "succeeded"
        : revision.status === "failed" || revision.status === "errored"
          ? "failed"
          : "timeout";
    if (revisionId && finalStatus !== "succeeded" && finalStatus !== "failed") {
      finalStatus = await pollRevision(revisionId, denoToken);
    }

    if (finalStatus !== "succeeded") {
      await fetch(`${DENO_API_BASE}/apps/${app.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${denoToken}` },
      }).catch(() => {});
      return createErrorResponse({
        status: finalStatus === "timeout" ? 504 : 502,
        message:
          finalStatus === "timeout"
            ? "Deno Deploy did not reach 'succeeded' state within 60 seconds. Check your Deno Deploy dashboard."
            : "Deno Deploy revision failed.",
        type: finalStatus === "timeout" ? "timeout" : "upstream_error",
      });
    }

    // Deno apps are reachable at `https://<slug>.<org-slug>.deno.net`.
    // We accept the user's full org domain ("acme.deno.net") and derive the
    // org slug from it (split on first dot). Tolerates trailing dots / paths
    // by trimming first.
    const cleanOrg = orgDomain.replace(/^https?:\/\//i, "").replace(/\/+$/, "");
    const orgSlug = cleanOrg.split(".")[0];
    const deployHost = `${projectName}.${orgSlug}.deno.net`;

    // Store as proxy registry entry — token is NOT stored. relayAuth is
    // encrypted at rest when STORAGE_ENCRYPTION_KEY is configured.
    const encryptedRelayAuth = encrypt(relayAuth);
    const notesPayload =
      encryptedRelayAuth && encryptedRelayAuth !== relayAuth
        ? { relayAuthEnc: encryptedRelayAuth }
        : { relayAuth };
    const poolProxy = await createProxy({
      name: `Deno Relay (${projectName})`,
      type: "deno",
      host: deployHost,
      port: 443,
      notes: JSON.stringify(notesPayload),
      source: "deno-relay",
    });

    return Response.json({
      success: true,
      relayUrl: `https://${deployHost}`,
      poolProxyId: poolProxy?.id,
    });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Deno Deploy failed");
  }
}
