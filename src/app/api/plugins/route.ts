import { NextRequest, NextResponse } from "next/server";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { listPlugins } from "@/lib/db/plugins";
import { pluginManager } from "@/lib/plugins/manager";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { z } from "zod";

export async function OPTIONS() {
  return handleCorsOptions();
}

/**
 * GET /api/plugins — List all installed plugins
 */
const StatusSchema = z.enum(["installed", "active", "inactive", "error"]).optional();

export async function GET(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const url = new URL(request.url);
  const statusResult = StatusSchema.safeParse(url.searchParams.get("status"));
  if (!statusResult.success) {
    return NextResponse.json(
      { error: "Invalid status value", details: statusResult.error.issues },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  try {
    const plugins = listPlugins(statusResult.data || undefined);
    return NextResponse.json({ plugins: plugins.map(formatPlugin) }, { headers: CORS_HEADERS });
  } catch (err: unknown) {
    console.error("[plugins] Failed to list plugins:", err);
    return NextResponse.json(buildErrorBody(500, "Failed to list plugins"), {
      status: 500,
      headers: CORS_HEADERS,
    });
  }
}

/**
 * POST /api/plugins — Install a plugin from a local path
 */
export async function POST(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const body = await request.json();
  const schema = z.object({
    path: z.string().min(1).regex(/^\/[^]*$/, "Path must be absolute").refine(
      (p) => !p.includes("\0") && !p.includes(".."),
      "Path must not contain traversal patterns or null bytes"
    ),
  });

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.issues },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  try {
    const plugin = await pluginManager.install(parsed.data.path);
    return NextResponse.json(
      { plugin: formatPlugin(plugin) },
      { status: 201, headers: CORS_HEADERS }
    );
  } catch (err: unknown) {
    console.error("[plugins] Failed to install plugin:", err);
    return NextResponse.json(buildErrorBody(400, "Failed to install plugin"), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }
}

function formatPlugin(row: any) {
  return {
    id: row.id,
    name: row.name,
    version: row.version,
    description: row.description,
    author: row.author,
    status: row.status,
    enabled: row.enabled === 1,
    hooks: JSON.parse(row.hooks || "[]"),
    permissions: JSON.parse(row.permissions || "[]"),
    installedAt: row.installedAt,
    updatedAt: row.updatedAt,
    activatedAt: row.activatedAt,
  };
}
