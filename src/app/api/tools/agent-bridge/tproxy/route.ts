/**
 * GET / POST / DELETE /api/tools/agent-bridge/tproxy
 *
 * Drive the decrypt-capable TPROXY capture mode (Epic A, decrypt 4b/N):
 *   - GET    → current status (running / available / interceptCount / onPort)
 *   - POST   → start: apply the TPROXY rules, open the transparent listener, and
 *              install the dynamic CA in the OS trust store (dedicated slot)
 *   - DELETE → stop: close the listener, uninstall the CA, revert the rules
 *
 * LOCAL_ONLY: covered by the "/api/tools/agent-bridge/" prefix in routeGuard.ts.
 * Starting this route applies iptables rules + installs a trust-store CA via
 * child processes, so loopback-only enforcement (Hard Rules #15 + #17) is
 * mandatory — a leaked JWT over a tunnel must not be able to reach it.
 */
import { z } from "zod";
import {
  startCaptureMode,
  stopCaptureMode,
  getCaptureStatus,
} from "@/mitm/tproxy/captureManager";
import { installTproxyCa, uninstallTproxyCa } from "@/mitm/tproxy/caTrust";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { createErrorResponse } from "@/lib/api/errorResponse";

// Exported for unit testing. Next.js only treats GET/POST/DELETE as route
// handlers; additional named exports are ignored by the App Router.
export const StartTproxyBodySchema = z.object({
  dport: z.number().int().min(1).max(65535).default(443),
  mark: z.number().int().min(1).default(0x2333),
  onPort: z.number().int().min(1).max(65535).default(8443),
  routeTable: z.number().int().min(1).default(233),
  bypassMark: z.number().int().min(1).default(0x539),
  // Required on non-root desktops to authorize the trust-store install; ignored
  // when the process is root (the VPS), where sudo is skipped entirely.
  sudoPassword: z.string().optional(),
});

export function GET(): Response {
  return Response.json(getCaptureStatus());
}

export async function POST(request: Request): Promise<Response> {
  const raw = await request.json().catch(() => ({}));
  const parsed = StartTproxyBodySchema.safeParse(raw);
  if (!parsed.success) {
    return createErrorResponse({
      status: 400,
      type: "invalid_request",
      message: "Invalid TPROXY capture config",
    });
  }

  const { sudoPassword, ...cfg } = parsed.data;
  const pwd = sudoPassword ?? "";

  try {
    const status = await startCaptureMode({
      cfg,
      installCa: (caPem) => installTproxyCa(caPem, pwd),
      uninstallCa: () => uninstallTproxyCa(pwd),
    });
    return Response.json({ ok: true, status });
  } catch (err) {
    return createErrorResponse({
      status: 500,
      message: sanitizeErrorMessage(err instanceof Error ? err.message : String(err)),
    });
  }
}

export async function DELETE(): Promise<Response> {
  try {
    const status = await stopCaptureMode();
    return Response.json({ ok: true, status });
  } catch (err) {
    return createErrorResponse({
      status: 500,
      message: sanitizeErrorMessage(err instanceof Error ? err.message : String(err)),
    });
  }
}
