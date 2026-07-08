import { NextResponse } from "next/server";
import {
  getParamFilterConfig,
  setParamFilterConfig,
  deleteParamFilterConfig,
} from "@/lib/db/paramFilters";

/**
 * GET /api/providers/[id]/param-filters
 * Returns the param filter config for a provider, or null if not configured.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const config = getParamFilterConfig(id);
    return NextResponse.json(config ?? { block: [], allow: [], autoLearn: false });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to read param filter config" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/providers/[id]/param-filters
 * Upsert the param filter config for a provider.
 * Body: { block?: string[], allow?: string[], models?: Record<string, { block?: string[], allow?: string[] }>, autoLearn?: boolean }
 */
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Request body is required" }, { status: 400 });
    }

    const block: string[] = Array.isArray(body.block)
      ? body.block.filter((k: unknown): k is string => typeof k === "string")
      : body.block !== undefined
        ? []
        : [];

    const allow: string[] = Array.isArray(body.allow)
      ? body.allow.filter((k: unknown): k is string => typeof k === "string")
      : body.allow !== undefined
        ? []
        : [];

    const models: Record<string, { block?: string[]; allow?: string[] }> | undefined =
      body.models && typeof body.models === "object" && !Array.isArray(body.models)
        ? body.models
        : undefined;

    const autoLearn = typeof body.autoLearn === "boolean" ? body.autoLearn : false;

    setParamFilterConfig(id, { block, allow, models, autoLearn });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save param filter config" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/providers/[id]/param-filters
 * Remove the param filter config for a provider (reset to no filtering).
 */
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    deleteParamFilterConfig(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete param filter config" },
      { status: 500 }
    );
  }
}
