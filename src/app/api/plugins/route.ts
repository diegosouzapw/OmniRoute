import { NextRequest, NextResponse } from "next/server";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { listPlugins } from "@/lib/db/plugins";
import { pluginManager } from "@/lib/plugins/manager";
import { z } from "zod";

export async function OPTIONS() {
  return handleCorsOptions();
}

/**
 * GET /api/plugins — List all installed plugins
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const status = url.searchParams.get("status") as any;

  try {
    const plugins = listPlugins(status || undefined);
    return NextResponse.json({ plugins: plugins.map(formatPlugin) }, { headers: CORS_HEADERS });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: CORS_HEADERS });
  }
}

/**
 * POST /api/plugins — Install a plugin from a local path
 */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const schema = z.object({
    path: z.string().min(1),
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
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400, headers: CORS_HEADERS });
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
