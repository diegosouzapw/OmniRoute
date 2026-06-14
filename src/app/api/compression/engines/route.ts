import { NextResponse } from "next/server";
import { registerBuiltinCompressionEngines } from "@omniroute/open-sse/services/compression/engines/index.ts";
import { listCompressionEngines } from "@omniroute/open-sse/services/compression/engines/registry.ts";

export async function GET() {
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
}
