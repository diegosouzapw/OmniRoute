"use server";

import { NextResponse } from "next/server";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import { getMitmAlias, setMitmAliasAll } from "@/models";
import { cliMitmAliasUpdateSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

// GET - Get MITM aliases for a tool
export async function GET(request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

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
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(cliMitmAliasUpdateSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { tool, mappings } = validation.data;

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
