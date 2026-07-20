import { getCachedSettings } from "@/lib/db/settings";
import { DEFAULT_HEADROOM_URL, getHeadroomStatus } from "@/lib/headroom/detect";
import { getManagedPid } from "@/lib/headroom/process";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  try {
    const settings = await getCachedSettings();
    const url =
      typeof settings.headroomUrl === "string" && settings.headroomUrl
        ? settings.headroomUrl
        : DEFAULT_HEADROOM_URL;
    const status = await getHeadroomStatus(url);
    const managedPid = getManagedPid();
    return Response.json({ ...status, url, managedPid });
  } catch (error) {
    return createErrorResponse({
      status: 500,
      message: sanitizeErrorMessage(error),
      type: "server_error",
    });
  }
}
