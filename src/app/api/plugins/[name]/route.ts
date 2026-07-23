import { NextRequest, NextResponse } from "next/server";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { getPluginByName } from "@/lib/db/plugins";
import { pluginManager } from "@/lib/plugins/manager";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function OPTIONS() {
  return handleCorsOptions();
}

/**
 * GET /api/plugins/[name] — Get plugin details
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const { name } = await params;
  const plugin = getPluginByName(name);

  if (!plugin) {
    return NextResponse.json(
      { error: `Plugin '${name}' not found` },
      { status: 404, headers: CORS_HEADERS }
    );
  }

  return NextResponse.json(
    {
      plugin: {
        id: plugin.id,
        name: plugin.name,
        version: plugin.version,
        description: plugin.description,
        author: plugin.author,
        license: plugin.license,
        main: plugin.main,
        source: plugin.source,
        tags: JSON.parse(plugin.tags || "[]"),
        status: plugin.status,
        enabled: plugin.enabled === 1,
        config: JSON.parse(plugin.config || "{}"),
        configSchema: JSON.parse(plugin.configSchema || "{}"),
        hooks: JSON.parse(plugin.hooks || "[]"),
        permissions: JSON.parse(plugin.permissions || "[]"),
        pluginDir: plugin.pluginDir,
        errorMessage: plugin.errorMessage,
        installedAt: plugin.installedAt,
        updatedAt: plugin.updatedAt,
        activatedAt: plugin.activatedAt,
      },
    },
    { headers: CORS_HEADERS }
  );
}

/**
 * DELETE /api/plugins/[name] — Uninstall a plugin
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const { name } = await params;

  try {
    await pluginManager.uninstall(name);
    return NextResponse.json(
      { success: true, message: `Plugin '${name}' uninstalled` },
      { headers: CORS_HEADERS }
    );
  } catch (err: unknown) {
    console.error("[plugins] Failed to uninstall plugin:", err);
    return NextResponse.json(buildErrorBody(400, "Failed to uninstall plugin"), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }
}
