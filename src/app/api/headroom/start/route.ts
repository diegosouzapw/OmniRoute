import { getCachedSettings } from "@/lib/db/settings";
import {
  DEFAULT_HEADROOM_URL,
  isLoopbackHeadroomUrl,
  parsePortFromHeadroomUrl,
} from "@/lib/headroom/detect";
import { startHeadroomProxy, HeadroomError } from "@/lib/headroom/process";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

export const dynamic = "force-dynamic";

export async function POST(): Promise<Response> {
  try {
    const settings = await getCachedSettings();
    const url =
      typeof settings.headroomUrl === "string" && settings.headroomUrl
        ? settings.headroomUrl
        : DEFAULT_HEADROOM_URL;

    // Pair commit 50ed79fe: refuse to spawn against a non-loopback URL.
    // External Docker sidecars must be started outside OmniRoute.
    if (!isLoopbackHeadroomUrl(url)) {
      return createErrorResponse({
        status: 400,
        message: "External Headroom proxies must be started outside OmniRoute",
        type: "invalid_request",
      });
    }

    const port = parsePortFromHeadroomUrl(url) ?? 8787;
    const result = await startHeadroomProxy({ port });
    return Response.json({ success: true, ...result });
  } catch (error) {
    if (error instanceof HeadroomError && error.code === "NOT_INSTALLED") {
      return createErrorResponse({
        status: 400,
        message: error.message,
        type: "invalid_request",
        details: { code: error.code },
      });
    }
    return createErrorResponse({
      status: 500,
      message: sanitizeErrorMessage(error),
      type: "server_error",
    });
  }
}
