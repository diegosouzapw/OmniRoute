import { NextRequest, NextResponse } from "next/server";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { getPluginByName, updatePluginConfig } from "@/lib/db/plugins";
import { z } from "zod";

export async function OPTIONS() {
  return handleCorsOptions();
}

/**
 * GET /api/plugins/[name]/config — Get plugin configuration
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
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
      config: JSON.parse(plugin.config || "{}"),
      configSchema: JSON.parse(plugin.configSchema || "{}"),
    },
    { headers: CORS_HEADERS }
  );
}

/**
 * PUT /api/plugins/[name]/config — Update plugin configuration
 */
export async function PUT(request: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const body = await request.json();

  const schema = z.object({
    config: z.record(z.string(), z.unknown()),
  });

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.issues },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const plugin = getPluginByName(name);
  if (!plugin) {
    return NextResponse.json(
      { error: `Plugin '${name}' not found` },
      { status: 404, headers: CORS_HEADERS }
    );
  }

  updatePluginConfig(name, parsed.data.config);

  return NextResponse.json(
    { success: true, config: parsed.data.config },
    { headers: CORS_HEADERS }
  );
}
