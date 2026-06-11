import { NextResponse } from "next/server";
import { pluginManager } from "@/lib/plugins/manager";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "index";

  const plugin = pluginManager.getLoaded(name);
  if (!plugin) {
    return NextResponse.json({ error: "Plugin not loaded/active" }, { status: 404 });
  }

  try {
    const content = await pluginManager.renderPluginPage(name, page);
    return NextResponse.json({ content });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Render failed" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;

  const plugin = pluginManager.getLoaded(name);
  if (!plugin) {
    return NextResponse.json({ error: "Plugin not loaded/active" }, { status: 404 });
  }

  const body = await request.json();
  const { page, params: pageParams } = body;

  try {
    const content = await pluginManager.renderPluginPage(
      name,
      page || "index",
      pageParams
    );
    return NextResponse.json({ content });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Render failed" },
      { status: 500 }
    );
  }
}