import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { commitManagedProxy } from "@/lib/db/proxies/managedRegistry";
import { inlineProxyAssignmentSchema } from "@/shared/validation/schemas/proxy";
import { AUTHZ_HEADER_PEER_LOCALITY } from "@/server/authz/headers";
import { clearDispatcherCache } from "@omniroute/open-sse/utils/proxyDispatcher";
import {
  managedEntries,
  saveManagedProxy,
  startManagedProxyCore,
  stopManagedProxyCore,
} from "@/lib/services/managedProxy/manager";
import { getSupervisor } from "@/lib/services/registry";

export const runtime = "nodejs";
const CoreSchema = z.enum(["singbox", "xray"]);
const SaveSchema = z
  .object({
    core: CoreSchema,
    name: z.string().trim().min(1).max(120),
    sourceLink: z.string().trim().min(1).max(65536),
    id: z.string().uuid().optional(),
    assignment: inlineProxyAssignmentSchema.optional(),
  })
  .strict();
const LifecycleSchema = z.object({ core: CoreSchema, action: z.enum(["start", "stop"]) }).strict();

async function guard(request: Request): Promise<Response | null> {
  // Central services classification checks the real peer before auth; also fail closed on
  // direct raw-Next invocation where the trusted locality stamp is missing.
  if (request.headers.get(AUTHZ_HEADER_PEER_LOCALITY) !== "loopback")
    return createErrorResponse({
      status: 403,
      message: "Managed proxy cores require local access",
      type: "invalid_request",
    });
  return requireManagementAuth(request, { alwaysRequireAuth: true });
}

function failure(error: unknown): Response {
  // Never expose raw native stderr, decrypted sources, or parser payloads.
  const message =
    error instanceof Error &&
    /^(Unsupported|Invalid|Duplicate|Malformed|TLS|REALITY|Xray|sing-box|Native|Managed|Official|Installed|STORAGE_ENCRYPTION_KEY|No verified|No distinct|Save a|This protocol|Transport options|Proxy upstream|VMess upstream|Shadowsocks password)/.test(
      error.message
    )
      ? error.message
      : "Managed proxy operation failed";
  return createErrorResponse({ status: 400, message, type: "invalid_request" });
}

export async function GET(request: Request) {
  const denied = await guard(request);
  if (denied) return denied;
  try {
    return Response.json({
      cores: ["singbox", "xray"].map((core: "singbox" | "xray") => ({
        core,
        state: getSupervisor(`managed-proxy-${core}`)?.getStatus().state || "stopped",
        entries: managedEntries(core),
      })),
    });
  } catch (error) {
    return failure(error);
  }
}

export async function POST(request: Request) {
  const denied = await guard(request);
  if (denied) return denied;
  try {
    const input = SaveSchema.safeParse(await request.json());
    if (!input.success)
      return createErrorResponse({
        status: 400,
        message: "Invalid managed proxy save fields",
        type: "invalid_request",
      });
    const { assignment, ...save } = input.data;
    const result = await saveManagedProxy(save, (entry) => commitManagedProxy(entry, assignment));
    clearDispatcherCache();
    return Response.json(result, { status: 201 });
  } catch (error) {
    return failure(error);
  }
}

export async function PATCH(request: Request) {
  const denied = await guard(request);
  if (denied) return denied;
  try {
    const input = LifecycleSchema.safeParse(await request.json());
    if (!input.success)
      return createErrorResponse({
        status: 400,
        message: "Invalid managed core lifecycle fields",
        type: "invalid_request",
      });
    if (input.data.action === "stop") await stopManagedProxyCore(input.data.core);
    else await startManagedProxyCore(input.data.core);
    return Response.json({ success: true });
  } catch (error) {
    return failure(error);
  }
}
