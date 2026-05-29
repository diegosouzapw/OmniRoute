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

  // Validate config values against plugin's configSchema
  const configSchema = JSON.parse(plugin.configSchema || "{}");
  if (configSchema && typeof configSchema === "object") {
    for (const [key, def] of Object.entries(configSchema)) {
      const val = parsed.data.config[key];
      if (val === undefined) continue;
      const fieldDef = def as Record<string, unknown>;
      if (fieldDef.type === "string" && typeof val !== "string") {
        return NextResponse.json(
          { error: `Config key '${key}' must be a string` },
          { status: 400, headers: CORS_HEADERS }
        );
      }
      if (fieldDef.type === "number" && typeof val !== "number") {
        return NextResponse.json(
          { error: `Config key '${key}' must be a number` },
          { status: 400, headers: CORS_HEADERS }
        );
      }
      if (fieldDef.type === "boolean" && typeof val !== "boolean") {
        return NextResponse.json(
          { error: `Config key '${key}' must be a boolean` },
          { status: 400, headers: CORS_HEADERS }
        );
      }
      if (fieldDef.enum && !(fieldDef.enum as unknown[]).includes(val)) {
        return NextResponse.json(
          { error: `Config key '${key}' must be one of: ${(fieldDef.enum as string[]).join(", ")}` },
          { status: 400, headers: CORS_HEADERS }
        );
      }
      if (fieldDef.type === "string" && fieldDef.min !== undefined && typeof val === "string" && val.length < (fieldDef.min as number)) {
        return NextResponse.json(
          { error: `Config key '${key}' must be at least ${fieldDef.min} characters` },
          { status: 400, headers: CORS_HEADERS }
        );
      }
      if (fieldDef.type === "number" && fieldDef.min !== undefined && typeof val === "number" && val < (fieldDef.min as number)) {
        return NextResponse.json(
          { error: `Config key '${key}' must be at least ${fieldDef.min}` },
          { status: 400, headers: CORS_HEADERS }
        );
      }
      if (fieldDef.type === "number" && fieldDef.max !== undefined && typeof val === "number" && val > (fieldDef.max as number)) {
        return NextResponse.json(
          { error: `Config key '${key}' must be at most ${fieldDef.max}` },
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
