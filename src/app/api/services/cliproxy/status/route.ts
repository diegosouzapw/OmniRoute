import { getSupervisor } from "@/lib/services/registry";
import { getServiceRow } from "@/lib/db/versionManager";
import {
  getInstalledVersion,
  getLatestVersion,
  CLIPROXY_DEFAULT_PORT,
} from "@/lib/services/installers/cliproxy";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const TOOL = "cliproxy";

export async function GET(): Promise<Response> {
  try {
    const sup = getSupervisor(TOOL);
    const row = await getServiceRow(TOOL);

    const liveStatus = sup?.getStatus() ?? null;
    const installedVersion = await getInstalledVersion();
    const latestVersion = await getLatestVersion();

    return Response.json({
      tool: TOOL,
      state: liveStatus?.state ?? row?.status ?? "unknown",
      pid: liveStatus?.pid ?? null,
      port: liveStatus?.port ?? row?.port ?? CLIPROXY_DEFAULT_PORT,
      health: liveStatus?.health ?? "unknown",
      startedAt: liveStatus?.startedAt ?? null,
      lastError: liveStatus?.lastError ?? row?.errorMessage ?? null,
      installedVersion: installedVersion ?? row?.installedVersion ?? null,
      latestVersion,
      updateAvailable: !!installedVersion && !!latestVersion && installedVersion !== latestVersion,
      autoStart: row?.autoStart ?? false,
    });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}
