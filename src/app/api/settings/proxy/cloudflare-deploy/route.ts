import { randomBytes } from "crypto";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { cloudflareDeploySchema } from "@/shared/validation/freeProxySchemas";
import { createProxy } from "@/lib/localDb";
import { encrypt } from "@/lib/db/encryption";
import { buildCloudflareWorkerScript } from "@/lib/proxyRelay/cloudflareWorkerScript";

// Port of upstream decolua/9router PR #1360 — Cloudflare Workers proxy relay.
// Architecture mirrors src/app/api/settings/proxy/vercel-deploy/route.ts so the
// shared proxyFetch relay short-circuit, x-relay-auth scheme, and inline SSRF
// guard work unchanged. Only the deployment surface differs (Cloudflare Workers
// API instead of Vercel /v13/deployments).

const CLOUDFLARE_API_BASE = process.env.CLOUDFLARE_API_BASE || "https://api.cloudflare.com/client/v4";

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

  const validation = validateBody(cloudflareDeploySchema, rawBody);
  if (isValidationFailure(validation)) {
    return createErrorResponse({
      status: 400,
      message: validation.error.message,
      type: "invalid_request",
    });
  }

  const { accountId, apiToken, projectName } = validation.data;

  // Generate random auth secret for the relay — stored in proxy notes, never
  // returned to client. Same scheme as the Vercel relay so the deployed worker
  // is not an open SSRF proxy reachable from any third party with the workers.dev URL.
  const relayAuth = randomBytes(24).toString("hex");
  const workerScript = buildCloudflareWorkerScript(relayAuth);

  try {
    // 1. PUT the Worker script — Cloudflare requires multipart/form-data with
    //    main_module + a metadata blob describing the upload.
    const workerScriptUrl = `${CLOUDFLARE_API_BASE}/accounts/${accountId}/workers/scripts/${projectName}`;
    const formData = new FormData();
    formData.append(
      "index.js",
      new Blob([workerScript], { type: "application/javascript+module" }),
      "index.js"
    );
    formData.append(
      "metadata",
      new Blob(
        [
          JSON.stringify({
            main_module: "index.js",
            compatibility_date: "2026-03-20",
            observability: { enabled: true },
          }),
        ],
        { type: "application/json" }
      ),
      "metadata.json"
    );

    const uploadRes = await fetch(workerScriptUrl, {
      method: "PUT",
      headers: { Authorization: `Bearer ${apiToken}` },
      body: formData,
    });

    if (!uploadRes.ok) {
      // Surface only the canonical Cloudflare error message; never forward raw
      // response text (may carry internal IDs / token hints).
      let upstreamMessage = "Cloudflare API rejected the Worker upload";
      try {
        const parsed = (await uploadRes.json().catch(() => null)) as {
          errors?: Array<{ message?: string }>;
        } | null;
        const candidate = parsed?.errors?.[0]?.message;
        if (typeof candidate === "string" && candidate.trim()) {
          upstreamMessage = candidate.trim().slice(0, 200);
        }
      } catch {
        /* fall through to generic message */
      }
      return createErrorResponse({
        status: uploadRes.status,
        message: `Cloudflare Worker upload failed: ${upstreamMessage}`,
        type: "upstream_error",
      });
    }

    // 2. Enable the workers.dev subdomain for this script so it is reachable.
    //    A failure here is non-fatal (some accounts already enable subdomains
    //    by default); the next call surfaces the correct error if anything is
    //    actually missing.
    await fetch(`${workerScriptUrl}/subdomain`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ enabled: true }),
    }).catch(() => {});

    // 3. Look up the account's workers.dev subdomain to build the final URL.
    const subdomainRes = await fetch(
      `${CLOUDFLARE_API_BASE}/accounts/${accountId}/workers/subdomain`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    let deployUrl = "";
    if (subdomainRes.ok) {
      const subdomainData = (await subdomainRes.json().catch(() => null)) as {
        result?: { subdomain?: string };
      } | null;
      const sub = subdomainData?.result?.subdomain;
      if (typeof sub === "string" && sub) {
        deployUrl = `https://${projectName}.${sub}.workers.dev`;
      }
    }

    if (!deployUrl) {
      return createErrorResponse({
        status: 400,
        message:
          "Worker deployed but failed to retrieve workers.dev subdomain. Set up a workers.dev subdomain in the Cloudflare dashboard first.",
        type: "upstream_error",
      });
    }

    // Store as proxy pool entry — apiToken is NOT stored. relayAuth is
    // encrypted at rest when STORAGE_ENCRYPTION_KEY is configured (encrypt() is
    // a no-op in passthrough mode); the redactor strips both shapes from API responses.
    const encryptedRelayAuth = encrypt(relayAuth);
    const notesPayload =
      encryptedRelayAuth && encryptedRelayAuth !== relayAuth
        ? { relayAuthEnc: encryptedRelayAuth }
        : { relayAuth };

    // deployUrl is "https://<name>.<sub>.workers.dev" — strip the protocol so
    // the `host` column matches the Vercel-relay shape (proxyFetch prepends
    // "https://" when routing).
    const hostOnly = deployUrl.replace(/^https?:\/\//, "");
    const poolProxy = await createProxy({
      name: `Cloudflare Relay (${projectName})`,
      type: "cloudflare",
      host: hostOnly,
      port: 443,
      notes: JSON.stringify(notesPayload),
      source: "cloudflare-relay",
    });

    return Response.json({
      success: true,
      relayUrl: deployUrl,
      poolProxyId: poolProxy?.id,
    });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Cloudflare deploy failed");
  }
}
