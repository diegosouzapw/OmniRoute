import { NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { searchSkillsSh } from "@/lib/skills/skillssh";

export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";
    const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 20, 1), 100);

    const data = await searchSkillsSh(q, limit);
    return NextResponse.json({
      skills: data.skills.map((s) => ({
        id: s.id,
        skillId: s.skillId,
        name: s.name,
        installs: s.installs,
        source: s.source,
      })),
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}
