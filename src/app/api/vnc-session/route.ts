import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { listVncProviders } from "@/lib/vncSession/manifest";
import { listSessions } from "@/lib/vncSession/service";

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
    sessions: listSessions().map(({ containerName, profileDir, ...rest }) => rest),
    providers: listVncProviders().map((provider) => ({
      id: provider.id,
      name: provider.name,
      url: provider.url,
      kind: provider.requirement.kind,
    })),
  });
}
