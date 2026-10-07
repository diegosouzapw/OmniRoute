/**
 * Cloudflare Worker source emitter for the OmniRoute proxy relay.
 *
 * Port of upstream decolua/9router PR #1360. The Worker plays the same role
 * the Vercel-relay edge function does (`src/app/api/settings/proxy/vercel-deploy/route.ts`):
 *  - Accepts inbound requests carrying x-relay-target / x-relay-path /
 *    x-relay-auth headers.
 *  - Authorises with the embedded relayAuth secret (so a leaked workers.dev URL
 *    is not an open SSRF proxy).
 *  - Inlines an SSRF guard rejecting RFC1918 / loopback / link-local / IPv6 ULA
 *    targets — the Edge runtime cannot import Node helpers, the guard lives
 *    here as a string.
 *  - Resolves x-relay-path through the SAME `resolveRelayTarget()` the Deno and
 *    Vercel workers use (PR #4643 and its follow-up), instead of concatenating
 *    it onto the target. Concatenation lets the path re-point the request past
 *    the validated host. Bound to a LITERAL const name so the hardcoded call
 *    site still resolves when the SWC-minified standalone build mangles the
 *    source function's own name in `.toString()` output (#6149).
 *  - Strips Host + relay control headers before forwarding upstream.
 *
 * The string template is fed to Cloudflare's PUT /accounts/{id}/workers/scripts/{name}
 * API with main_module=index.js (ESM Workers Modules format).
 *
 * The OmniRoute variant intentionally diverges from the upstream PR:
 *  - The upstream worker had NO auth check, leaving the deployed workers.dev URL
 *    as an open SSRF proxy. We mirror Vercel's x-relay-auth scheme instead so the
 *    same buildVercelRelayHeaders helper (open-sse/utils/proxyDispatcher.ts) and
 *    the same proxyFetch relay short-circuit work unchanged.
 *  - SSRF guard is inlined so a leaked relay URL cannot scan internal IPs.
 */
import { randomUUID } from "crypto";
import { resolveRelayTarget } from "@/app/api/settings/proxy/deno-deploy/route";
import { isPrivateRelayHostname } from "@/lib/proxyRelay/privateHostname";

/**
 * Build the multipart/form-data request body for Cloudflare's Worker
 * script-upload API as a raw `Buffer` with an explicit boundary, instead of
 * relying on the WHATWG `FormData` + `fetch`-derived Content-Type (#6416).
 *
 * In production `globalThis.fetch` is patched (`open-sse/utils/proxyFetch.ts`)
 * with `node_modules/undici`'s own `fetch`, whose `FormData`/`Request` classes
 * differ from the runtime's global `FormData` (same cross-realm class
 * mismatch already fixed for image edits in #3273 —
 * `open-sse/handlers/imageGeneration.ts::handleOpenAIImageEdit`). Passing a
 * native `FormData` instance through that patched fetch makes undici
 * serialize the body as the literal string `"[object FormData]"` with
 * `Content-Type: text/plain;charset=UTF-8` — which Cloudflare's API rejects
 * with "Content-Type must be one of: application/javascript, text/javascript,
 * multipart/form-data". A manually-built `Buffer` body with an explicit
 * `multipart/form-data; boundary=…` header is accepted verbatim by any fetch
 * implementation (patched or native).
 */
export function buildCloudflareWorkerUploadRequest(
  workerScript: string,
  metadata: Record<string, unknown>
): { headers: Record<string, string>; body: Buffer } {
  const boundary = `----OmniRouteCFWorker${randomUUID().replace(/-/g, "")}`;
  const CRLF = "\r\n";
  const parts: Buffer[] = [
    Buffer.from(
      `--${boundary}${CRLF}` +
        `Content-Disposition: form-data; name="index.js"; filename="index.js"${CRLF}` +
        `Content-Type: application/javascript${CRLF}${CRLF}`
    ),
    Buffer.from(workerScript, "utf8"),
    Buffer.from(CRLF),
    Buffer.from(
      `--${boundary}${CRLF}` +
        `Content-Disposition: form-data; name="metadata"; filename="metadata.json"${CRLF}` +
        `Content-Type: application/json${CRLF}${CRLF}` +
        `${JSON.stringify(metadata)}${CRLF}`
    ),
    Buffer.from(`--${boundary}--${CRLF}`),
  ];
  return {
    headers: { "Content-Type": `multipart/form-data; boundary=${boundary}` },
    body: Buffer.concat(parts),
  };
}

export function buildCloudflareWorkerScript(relayAuth: string): string {
  // relayAuth is generated server-side via randomBytes(24).toString("hex") — no
  // user-controlled input ever reaches this template, so direct interpolation
  // into the worker source string is safe.
  return `// OmniRoute Cloudflare Worker proxy relay — generated at deploy time.
const resolveRelayTarget = ${resolveRelayTarget.toString()};

const isPrivateHostname = ${isPrivateRelayHostname.toString()};

async function handleRelay(request) {
  const auth = request.headers.get("x-relay-auth");
  if (auth !== "${relayAuth}") {
    return new Response("Unauthorized", { status: 401 });
  }
  const target = request.headers.get("x-relay-target");
  if (!target) {
    return new Response("missing x-relay-target", { status: 400 });
  }
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
  [
    "host", "connection", "content-length", "keep-alive", "proxy-connection",
    "proxy-authenticate", "proxy-authorization", "transfer-encoding", "te", "trailer", "upgrade",
    "x-relay-target", "x-relay-path", "x-relay-auth",
  ].forEach((h) => headers.delete(h));
  const init = {
    method: request.method,
    headers,
  };
  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = request.body;
    init.duplex = "half";
  }
  const resolved = resolveRelayTarget(target, relayPath);
  if (!resolved.ok) {
    return new Response(resolved.reason, { status: resolved.status });
  }
  try {
    const upstream = await fetch(resolved.url, init);
    return new Response(upstream.body, {
      status: upstream.status,
      headers: upstream.headers,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error && error.message ? error.message : "relay error" }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRelay(event.request));
});
`;
}
