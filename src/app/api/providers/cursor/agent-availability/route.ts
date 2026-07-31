import { NextResponse } from "next/server";
import { getCachedCursorAgentAvailability } from "@/lib/cursor/renewal";

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
 * `/api/providers/[id]/refresh` and `/api/providers/[id]/login` routes
 * (neither perform their own in-route auth check either).
 *
 * 🔒 LOCAL_ONLY — spawns `cursor-agent status --format json` via
 * `checkCursorAgentAvailability()` (Hard Rules #15 + #17).
 */
export async function GET() {
  const { available } = await getCachedCursorAgentAvailability();
  return NextResponse.json({ cursorAgentAvailable: available });
}
