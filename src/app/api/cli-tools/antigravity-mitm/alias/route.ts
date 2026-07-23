"use server";

import { NextResponse } from "next/server";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import { getMitmAlias, setMitmAliasAll } from "@/models";
import { cliMitmAliasUpdateSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { hasInvalidReasoningEffort, normalizeAliasMappings } from "@/mitm/aliasConfig";

// GET - Get MITM aliases for a tool
export async function GET(request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const toolName = searchParams.get("tool");
    const aliases = await getMitmAlias(toolName || undefined);
    // `getMitmAlias(tool)` returns a flat alias→mapping record we can upgrade in place;
    // without a `tool` filter it returns one level deeper (`{ [tool]: { [alias]: value } }`),
    // which is not this shape — only normalize the single-tool response. Upgrades legacy
    // plain-string mappings (every existing install) into the structured
    // `{ model?, reasoningEffort? }` shape the UI/consumers expect — no DB migration
    // required (ported from upstream decolua/9router#2584).
    return NextResponse.json({
      aliases: toolName ? normalizeAliasMappings(aliases) : aliases,
    });
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

    // Reject an unrecognized reasoning-effort value at the API boundary instead of
    // silently dropping it (ported from upstream decolua/9router#2584).
    if (hasInvalidReasoningEffort(mappings)) {
      return NextResponse.json({ error: "Invalid reasoning effort" }, { status: 400 });
    }

    const filtered = normalizeAliasMappings(mappings);

    await setMitmAliasAll(tool, filtered);
    return NextResponse.json({ success: true, aliases: filtered });
  } catch (error) {
    console.log("Error saving MITM aliases:", (error as any).message);
    return NextResponse.json({ error: "Failed to save aliases" }, { status: 500 });
  }
}
