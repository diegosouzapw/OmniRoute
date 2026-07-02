import { NextResponse } from "next/server";
import { getSettings } from "@/lib/db/settings";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { getSkillsProviderSetting } from "@/lib/skills/providerSettings";

const POPULAR_BY_PROVIDER = {
  skillsmp: ["web-search", "file-reader", "sql-assistant", "devops-helper", "docs-assistant"],
  skillssh: ["git", "terminal", "postgres", "kubernetes", "playwright"],
} as const;

export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim() || "";
    const provider = await getSkillsProviderSetting();

    // Return popular skills when query is empty
    if (!q) {
      const popularList = POPULAR_BY_PROVIDER[provider];
      const skills = popularList.map((name) => ({
        name,
        description: `Popular skill: ${name}`,
        installCount: 0,
      }));
      return NextResponse.json({ skills });
    }

    // Search SkillsMP for non-empty queries
    const settings = await getSettings();
    const apiKey = (settings as Record<string, unknown>).skillsmpApiKey;

    if (!apiKey) {
      return NextResponse.json(
        { error: "SkillsMP API key not configured. Add it in Settings → AI." },
        { status: 400 }
      );
    }

    const url = `https://skillsmp.com/api/v1/skills/search?q=${encodeURIComponent(q)}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!res.ok) {
      const body = await res.text();
      return NextResponse.json(
        { error: `SkillsMP error: ${res.status} ${body}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ skills: data.data?.skills || data.skills || [] });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}
