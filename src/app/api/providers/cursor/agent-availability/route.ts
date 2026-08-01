import { NextResponse } from "next/server";
import { getCachedCursorAgentAvailability } from "@/lib/cursor/renewal";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

/**
 * GET /api/providers/cursor/agent-availability
 * Credential-free, informational check for whether `cursor-agent` is
 * installed and authenticated on this host — backs the dashboard's
 * dismissible install-nudge banner. Returns ONLY `{ cursorAgentAvailable }`;
 * never tokens/machineId. This is a SEPARATE route from
 * `/api/oauth/cursor/auto-import` (which legitimately returns
 * `accessToken`/`machineId` for its own credential-import purpose) —
 * reusing that route here would hand a live local Cursor OAuth token to a
 * frequently-mounted, purely informational UI component with no legitimate
 * use for it.
 *
 * No in-route auth guard: unlike `/api/oauth/cursor/auto-import` (which is
 * PUBLIC-classified and never reaches the LOCAL_ONLY gate), this route lives
 * under `/api/providers/` — MANAGEMENT-classified — and is itself
 * LOCAL_ONLY (see `LOCAL_ONLY_API_PREFIXES` in
 * `src/server/authz/routeGuard.ts`), so `managementPolicy` already enforces
 * auth + loopback before this handler runs, matching the sibling
 * `/api/providers/[id]/refresh` route (also no in-route auth check). The
 * other sibling, `/api/providers/[id]/login`, does call
 * `requireManagementAuth()` itself — redundant given `managementPolicy`'s
 * enforcement, but not incorrect.
 *
 * 🔒 LOCAL_ONLY — spawns `cursor-agent status --format json` via
 * `checkCursorAgentAvailability()` (Hard Rules #15 + #17).
 */
export async function GET() {
  try {
    const { available } = await getCachedCursorAgentAvailability();
    return NextResponse.json({ cursorAgentAvailable: available });
  } catch (error) {
    // checkCursorAgentAvailability() currently swallows all realistic errors
    // internally (spawn failures, unparseable output) — this catch is
    // defense-in-depth consistency with the rest of this plan's routes, not
    // a currently-reachable path.
    return NextResponse.json(
      {
        cursorAgentAvailable: false,
        error: sanitizeErrorMessage(error instanceof Error ? error.message : String(error)),
      },
      { status: 500 }
    );
  }
}
