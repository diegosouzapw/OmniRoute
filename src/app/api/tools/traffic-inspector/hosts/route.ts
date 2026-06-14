/**
 * GET  /api/tools/traffic-inspector/hosts — list custom host capture entries
 * POST /api/tools/traffic-inspector/hosts — add a host (DB record + DNS propagation)
 *
 * The DB record enables the MITM proxy to SNI-certify the host on demand.
 * When a cached sudo password is available (MITM proxy running), DNS /etc/hosts
 * entries are also added so OS traffic is redirected to the local proxy.
 *
 * LOCAL_ONLY enforced by routeGuard.
 */

import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { InspectorCustomHostSchema } from "@/shared/schemas/inspector";
import { listCustomHosts, addCustomHost } from "@/lib/db/inspectorCustomHosts";
import { getCachedPassword } from "@/mitm/manager";
import { addDNSEntries } from "@/mitm/dns/dnsConfig";

export async function GET(): Promise<Response> {
  try {
    const hosts = listCustomHosts();
    return Response.json({ hosts });
  } catch (err) {
    const msg = sanitizeErrorMessage(err);
    return new Response(JSON.stringify(buildErrorBody(500, msg || "Failed to list hosts")), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify(buildErrorBody(400, "Invalid JSON body")), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const parsed = InspectorCustomHostSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify(buildErrorBody(400, parsed.error.issues[0]?.message ?? "Validation error")),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  const { host, kind, label } = parsed.data;

  try {
    addCustomHost(host, kind, label ?? undefined);
  } catch (err) {
    const msg = sanitizeErrorMessage(err);
    return new Response(JSON.stringify(buildErrorBody(500, msg || "Failed to add host")), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  // DNS propagation — only possible when the MITM proxy is running (password cached).
  const sudoPassword = getCachedPassword();
  if (sudoPassword) {
    try {
      await addDNSEntries([host], sudoPassword);
    } catch (err) {
      // DNS failure is non-fatal: DB record was saved; warn but do not fail the request.
      const msg = sanitizeErrorMessage(err);
      return Response.json(
        { ok: true, host, warning: `DNS routing entry could not be added: ${msg}` },
        { status: 201 }
      );
    }
    return Response.json({ ok: true, host }, { status: 201 });
  }

  return Response.json(
    {
      ok: true,
      host,
      warning: "DNS routing requires the MITM proxy to be running with a cached sudo password",
    },
    { status: 201 }
  );
}
