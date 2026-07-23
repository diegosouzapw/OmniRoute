import { z } from "zod";

import { createErrorResponse } from "@/lib/api/errorResponse";
import { InstallError, SERVICE_VERSION_PATTERN } from "@/lib/services/installers/utils";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

export type ServiceInstallResult = {
  installedVersion: string;
  installPath: string;
  durationMs: number;
};

export type ServiceInstaller = (version: string) => Promise<ServiceInstallResult>;

const installBodySchema = z.object({
  // Keep the version constrained by SERVICE_VERSION_PATTERN — the per-route schemas
  // enforced this before the extraction (#5474); dropping it here would let strings
  // like "../../malicious" reach the installer (#5495).
  version: z
    .string()
    .regex(SERVICE_VERSION_PATTERN, "Invalid version: only letters, digits and . _ + - are allowed")
    .optional()
    .default("latest"),
});

export async function readServiceInstallVersion(request: Request): Promise<
  | {
      ok: true;
      version: string;
    }
  | {
      ok: false;
      response: Response;
    }
> {
  let body: unknown;
  try {
    body = request.body === null ? {} : await request.json();
  } catch {
    return {
      ok: false,
      response: createErrorResponse({ status: 400, message: "Invalid JSON body" }),
    };
  }

  const parsed = installBodySchema.safeParse(body);
  if (!parsed.success) {
    return {
      ok: false,
      response: createErrorResponse({ status: 400, message: parsed.error.message }),
    };
  }

  return { ok: true, version: parsed.data.version };
}

export async function handleServiceInstall(
  request: Request,
  install: ServiceInstaller
): Promise<Response> {
  const parsed = await readServiceInstallVersion(request);
  if (!parsed.ok) {
    return parsed.response;
  }

  try {
    const result = await install(parsed.version);
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
