/**
 * DELETE /api/tools/traffic-inspector/hosts/[host] — remove a custom host + DNS cleanup
 * PATCH  /api/tools/traffic-inspector/hosts/[host] — toggle enabled flag
 *
 * LOCAL_ONLY enforced by routeGuard.
 */

import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { z } from "zod";
import { removeCustomHost, toggleCustomHost, listCustomHosts } from "@/lib/db/inspectorCustomHosts";
import { getCachedPassword } from "@/mitm/manager";
import { removeDNSEntries } from "@/mitm/dns/dnsConfig";

interface Params {
  params: Promise<{ host: string }>;
}

const PatchBodySchema = z.object({
  enabled: z.boolean(),
});

export async function DELETE(_request: Request, { params }: Params): Promise<Response> {
  const { host } = await params;
  const decodedHost = decodeURIComponent(host);

  try {
    removeCustomHost(decodedHost);
  } catch (err) {
    const msg = sanitizeErrorMessage(err);
    return new Response(JSON.stringify(buildErrorBody(500, msg || "Failed to remove host")), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  // DNS cleanup — only possible when the MITM proxy is running (password cached).
  const sudoPassword = getCachedPassword();
  if (sudoPassword) {
    try {
      await removeDNSEntries([decodedHost], sudoPassword);
    } catch {
      // DNS cleanup failure is non-fatal: DB record was removed.
      // Return 204 with a header warning rather than failing.
      return new Response(null, {
        status: 204,
        headers: {
          "x-dns-warning": `DNS entry for ${decodedHost} could not be removed — restart the proxy or remove manually`,
        },
      });
    }
  } else {
    return new Response(null, {
      status: 204,
      headers: {
        "x-dns-warning":
          "DNS routing requires the MITM proxy to be running with a cached sudo password",
      },
    });
  }

  return new Response(null, { status: 204 });
}

export async function PATCH(request: Request, { params }: Params): Promise<Response> {
  const { host } = await params;
  const decodedHost = decodeURIComponent(host);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify(buildErrorBody(400, "Invalid JSON body")), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const parsed = PatchBodySchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify(buildErrorBody(400, parsed.error.issues[0]?.message ?? "Validation error")),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  try {
    toggleCustomHost(decodedHost, parsed.data.enabled);
    // Return updated record
    const hosts = listCustomHosts();
    const updated = hosts.find((h) => h.host === decodedHost);
    if (!updated) {
      return new Response(JSON.stringify(buildErrorBody(404, "Host not found")), {
        status: 404,
        headers: { "content-type": "application/json" },
      });
    }
    return Response.json(updated);
  } catch (err) {
    const msg = sanitizeErrorMessage(err);
    return new Response(JSON.stringify(buildErrorBody(500, msg || "Failed to toggle host")), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
