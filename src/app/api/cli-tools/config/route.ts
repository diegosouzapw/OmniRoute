import { NextResponse } from "next/server";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import { generateConfig, generateAllConfigs } from "@/lib/cli-helper/config-generator";

// GET /api/cli-tools/config - List generated configs for all tools
export async function GET(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const baseUrl = searchParams.get("baseUrl") || "http://localhost:20128/v1";
  const apiKey = searchParams.get("apiKey") || "";

  if (!apiKey) {
    return NextResponse.json({ error: "API key is required" }, { status: 400 });
  }

  try {
    const results = await generateAllConfigs({ baseUrl, apiKey });
    return NextResponse.json({ configs: results });
  } catch (error) {
    console.log("Error generating configs:", error);
    return NextResponse.json({ error: "Failed to generate configs" }, { status: 500 });
  }
}

// POST /api/cli-tools/config - Generate config for a specific tool
export async function POST(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const { toolId, baseUrl, apiKey, model } = body;

    if (!toolId) {
      return NextResponse.json({ error: "toolId is required" }, { status: 400 });
    }
    if (!apiKey) {
      return NextResponse.json({ error: "apiKey is required" }, { status: 400 });
    }

    const result = await generateConfig(toolId, {
      baseUrl: baseUrl || "http://localhost:20128/v1",
      apiKey,
      model,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      configPath: result.configPath,
      content: result.content,
    });
  } catch (error) {
    console.log("Error generating config:", error);
    return NextResponse.json({ error: "Failed to generate config" }, { status: 500 });
  }
}
