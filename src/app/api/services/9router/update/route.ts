import { getSupervisor } from "@/lib/services/registry";
import { getOrInitSupervisor } from "../_lib";
import {
  getInstalledVersion,
  getLatestVersion,
  update as npmUpdate,
} from "@/lib/services/installers/ninerouter";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

export async function POST(): Promise<Response> {
  try {
    const [installed, latest] = await Promise.all([getInstalledVersion(), getLatestVersion()]);

    if (installed && latest && installed === latest) {
      return Response.json({ updated: false, installedVersion: installed, latestVersion: latest });
    }

    const sup = getSupervisor("9router");
    const wasRunning = sup?.getStatus().state === "running";

    if (wasRunning && sup) {
      await sup.stop();
    }

    const result = await npmUpdate();

    if (wasRunning) {
      const freshSup = await getOrInitSupervisor();
      await freshSup.start().catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err);
        console.warn("[Services] Could not restart 9router after update:", msg);
      });
    }

    return Response.json({
      updated: true,
      oldVersion: installed ?? null,
      newVersion: result.installedVersion,
    });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}
