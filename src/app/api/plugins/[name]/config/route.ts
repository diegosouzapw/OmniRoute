import { NextRequest, NextResponse } from "next/server";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { getPluginByName, updatePluginConfig } from "@/lib/db/plugins";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { z } from "zod";

export async function OPTIONS() {
  return handleCorsOptions();
}

/**
 * GET /api/plugins/[name]/config — Get plugin configuration
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const { name } = await params;
  const plugin = getPluginByName(name);

  if (!plugin) {
    return NextResponse.json(buildErrorBody(404, `Plugin '${name}' not found`), {
      status: 404,
      headers: CORS_HEADERS,
    });
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
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const { name } = await params;
  const body = await request.json();

  const schema = z.object({
    config: z.record(z.string(), z.unknown()),
  });

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(buildErrorBody(400, "Invalid request"), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  const plugin = getPluginByName(name);
  if (!plugin) {
    return NextResponse.json(buildErrorBody(404, `Plugin '${name}' not found`), {
      status: 404,
      headers: CORS_HEADERS,
    });
  }

  // Validate config values against configSchema if defined
  const configSchema = JSON.parse(plugin.configSchema || "{}");
  if (Object.keys(configSchema).length > 0) {
    for (const [key, value] of Object.entries(parsed.data.config)) {
      const field = configSchema[key];
      if (!field) continue; // Allow extra keys
      if (field.type === "number" && typeof value === "number") {
        if (field.min !== undefined && value < field.min) {
          return NextResponse.json(buildErrorBody(400, `Config '${key}' must be >= ${field.min}`), {
            status: 400,
            headers: CORS_HEADERS,
          });
        }
        if (field.max !== undefined && value > field.max) {
          return NextResponse.json(buildErrorBody(400, `Config '${key}' must be <= ${field.max}`), {
            status: 400,
            headers: CORS_HEADERS,
          });
        }
      }
      if (field.type === "select" && field.enum && !field.enum.includes(String(value))) {
        return NextResponse.json(
          buildErrorBody(400, `Config '${key}' must be one of: ${field.enum.join(", ")}`),
          { status: 400, headers: CORS_HEADERS }
        );
      }
    }
  }

  updatePluginConfig(name, parsed.data.config);

  return NextResponse.json(
    { success: true, config: parsed.data.config },
    { headers: CORS_HEADERS }
  );
}
