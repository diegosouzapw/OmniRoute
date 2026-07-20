import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { listSessions } from "@/lib/vncSession/service";
import { VNC_PROVIDER_MANIFEST } from "@/lib/vncSession/manifest";

/**
 * GET /api/vnc-session
 *
 * List active VNC login sessions and the catalog of providers that support
 * interactive browser login. Management-scoped (same auth as other admin
 * endpoints); no secrets are returned — only session metadata + ports.
 */
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  return NextResponse.json({
    sessions: listSessions().map(({ containerName, ...rest }) => rest),
    providers: Object.values(VNC_PROVIDER_MANIFEST).map((p) => ({
      id: p.id,
      name: p.name,
      url: p.url,
      kind: p.kind,
    })),
  });
}
