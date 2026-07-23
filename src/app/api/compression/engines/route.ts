import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { registerBuiltinCompressionEngines } from "@omniroute/open-sse/services/compression/engines/index.ts";
import { listCompressionEngines } from "@omniroute/open-sse/services/compression/engines/registry.ts";

export async function GET(req: Request) {
  const authError = await requireManagementAuth(req);
  if (authError) return authError;
  try {
    registerBuiltinCompressionEngines();
    const engines = listCompressionEngines().map((e) => ({
      id: e.id,
      name: e.name,
      description: e.description,
      icon: e.icon,
      stackable: e.stackable,
      stackPriority: e.stackPriority,
      metadata: e.metadata,
      configSchema: e.getConfigSchema(),
    }));
    return NextResponse.json({ engines });
  } catch {
    return NextResponse.json(buildErrorBody(500, "Failed to list engines"), { status: 500 });
  }
}
