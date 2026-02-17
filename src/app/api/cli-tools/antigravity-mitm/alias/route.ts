"use server";

import { NextResponse } from "next/server";
import { getMitmAlias, setMitmAliasAll } from "@/models";

// GET - Get MITM aliases for a tool
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const toolName = searchParams.get("tool");
    const aliases = await getMitmAlias(toolName || undefined);
    return NextResponse.json({ aliases });
  } catch (error) {
    console.log("Error fetching MITM aliases:", (error as any).message);
    return NextResponse.json({ error: "Failed to fetch aliases" }, { status: 500 });
  }
}

// PUT - Save MITM aliases for a specific tool
export async function PUT(request) {
  try {
    const { tool, mappings } = await request.json();

    if (!tool || !mappings || typeof mappings !== "object") {
      return NextResponse.json({ error: "tool and mappings required" }, { status: 400 });
    }

    const filtered: Record<string, string> = {};
    for (const [alias, model] of Object.entries(mappings)) {
      if (model && (model as string).trim()) {
        filtered[alias] = (model as string).trim();
      }
    }

    await setMitmAliasAll(tool, filtered);
    return NextResponse.json({ success: true, aliases: filtered });
  } catch (error) {
    console.log("Error saving MITM aliases:", (error as any).message);
    return NextResponse.json({ error: "Failed to save aliases" }, { status: 500 });
  }
}
