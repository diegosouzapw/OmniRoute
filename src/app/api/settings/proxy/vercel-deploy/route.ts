import { randomBytes } from "crypto";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { vercelDeploySchema } from "@/shared/validation/freeProxySchemas";
import { createProxy } from "@/lib/localDb";

const VERCEL_API_BASE = process.env.VERCEL_API_BASE || "https://api.vercel.com";
const POLL_INTERVAL_MS = 3000;
const POLL_MAX_ATTEMPTS = 40; // ~2 min

function buildRelayFunction(relayAuth: string): string {
  // relayAuth is a random hex string generated server-side — no user input
  return `export const config = { runtime: "edge" };
export default async function handler(req) {
  const auth = req.headers.get("x-relay-auth");
  if (auth !== "${relayAuth}") return new Response("Unauthorized", { status: 401 });
  const target = req.headers.get("x-relay-target");
  if (!target) return new Response("missing x-relay-target", { status: 400 });
  const relayPath = req.headers.get("x-relay-path") || "/";
  const headers = new Headers(req.headers);
  ["x-relay-target", "x-relay-path", "x-relay-auth", "host"].forEach(h => headers.delete(h));
  const upstream = await fetch(target.replace(/\\/$/, "") + relayPath, {
    method: req.method,
    headers,
    body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
    duplex: "half",
  });
  return new Response(upstream.body, { status: upstream.status, headers: upstream.headers });
}`;
}

async function pollDeployment(
  deploymentApiUrl: string,
  token: string
): Promise<"READY" | "ERROR"> {
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
      const errText = await deployRes.text().catch(() => "");
      return createErrorResponse({
        status: deployRes.status,
        message: `Vercel deployment failed: ${errText.slice(0, 200)}`,
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

    // Store as proxy pool entry — token is NOT stored; relayAuth is stored in notes (JSON)
    const poolProxy = await createProxy({
      name: `Vercel Relay (${projectName})`,
      type: "vercel",
      host: deployment.url,
      port: 443,
      notes: JSON.stringify({ relayAuth }),
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
