import { NextResponse } from "next/server";
import { skillRegistry } from "@/lib/skills/registry";
import { parsePaginationParams, buildPaginatedResponse } from "@/shared/types/pagination";

export async function GET(request: Request) {
  try {
    await skillRegistry.loadFromDatabase();
    const allSkills = skillRegistry.list();
    const params = parsePaginationParams(new URL(request.url).searchParams);
    const paged = allSkills.slice((params.page - 1) * params.limit, params.page * params.limit);
    return NextResponse.json(buildPaginatedResponse(paged, allSkills.length, params));
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}
