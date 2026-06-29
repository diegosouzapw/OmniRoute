import { z } from "zod";
import { install, InstallResult } from "@/lib/services/installers/ninerouter";
import { InstallError, SERVICE_VERSION_PATTERN } from "@/lib/services/installers/utils";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const BodySchema = z.object({
  version: z
    .string()
    .regex(SERVICE_VERSION_PATTERN, "Invalid version: only letters, digits and . _ + - are allowed")
    .optional()
    .default("latest"),
});

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = request.body === null ? {} : await request.json();
  } catch {
    return createErrorResponse({ status: 400, message: "Invalid JSON body" });
  }

  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return createErrorResponse({ status: 400, message: parsed.error.message });
  }

  try {
    const result: InstallResult = await install(parsed.data.version);
    return Response.json({ ok: true, ...result });
  } catch (err) {
    if (err instanceof InstallError) {
      return createErrorResponse({
        status: err.httpStatus,
        message: err.friendly,
      });
    }
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}
