import { stopHeadroomProxy } from "@/lib/headroom/process";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

export const dynamic = "force-dynamic";

export async function POST(): Promise<Response> {
  try {
    const result = stopHeadroomProxy();
    const status = result.stopped ? 200 : 409;
    return Response.json(result, { status });
  } catch (error) {
    return createErrorResponse({
      status: 500,
      message: sanitizeErrorMessage(error),
      type: "server_error",
    });
  }
}
