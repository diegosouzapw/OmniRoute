import { getSupervisor } from "@/lib/services/registry";
import { getServiceRow } from "@/lib/db/versionManager";
import { getInstalledVersion, getLatestVersion } from "@/lib/services/installers/ninerouter";
import { getOrCreateApiKey, maskApiKey } from "@/lib/services/apiKey";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const TOOL = "9router";

export async function GET(request: Request = new Request("http://localhost/")): Promise<Response> {
  try {
    const url = new URL(request.url);
    const reveal = url.searchParams.get("reveal");
    if (reveal === "key") {
      return createErrorResponse({
        status: 400,
        message: "Use POST /api/services/9router/reveal-key to reveal the API key.",
      });
    }

    const sup = getSupervisor(TOOL);
    const row = await getServiceRow(TOOL);

    const liveStatus = sup?.getStatus() ?? null;
    const installedVersion = await getInstalledVersion();
    const latestVersion = await getLatestVersion();

    const apiKey =
      row?.status !== "not_installed" ? await getOrCreateApiKey(TOOL).catch(() => null) : null;

    const base = {
      tool: TOOL,
      state: liveStatus?.state ?? row?.status ?? "unknown",
      pid: liveStatus?.pid ?? null,
      port: liveStatus?.port ?? row?.port ?? 20130,
      health: liveStatus?.health ?? "unknown",
      startedAt: liveStatus?.startedAt ?? null,
      lastError: liveStatus?.lastError ?? row?.errorMessage ?? null,
      installedVersion: installedVersion ?? row?.installedVersion ?? null,
      latestVersion,
      updateAvailable: !!installedVersion && !!latestVersion && installedVersion !== latestVersion,
      apiKeyMasked: apiKey ? maskApiKey(apiKey) : null,
      autoStart: row?.autoStart ?? false,
      providerExpose: row?.providerExpose ?? false,
    };

    return Response.json(base);
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}
