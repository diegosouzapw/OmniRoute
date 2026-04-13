import { z } from "zod";

// ─── skills.sh API response schemas ───

export const SkillsShSkillSchema = z.object({
  id: z.string(),
  skillId: z.string(),
  name: z.string(),
  installs: z.number().optional().default(0),
  source: z.string(),
});

export const SkillsShSearchResponseSchema = z.object({
  query: z.string().optional(),
  searchType: z.string().optional(),
  skills: z.array(SkillsShSkillSchema).default([]),
  count: z.number().optional(),
  duration_ms: z.number().optional(),
});

export type SkillsShSkill = z.infer<typeof SkillsShSkillSchema>;
export type SkillsShSearchResponse = z.infer<typeof SkillsShSearchResponseSchema>;

const SKILLSSH_BASE_URL = "https://skills.sh/api";
const GITHUB_RAW_BASE = "https://raw.githubusercontent.com";
const DEFAULT_SEARCH_LIMIT = 20;
const REQUEST_TIMEOUT_MS = 15_000;

/**
 * Search the skills.sh public directory.
 * No authentication required.
 */
export async function searchSkillsSh(
  query: string,
  limit: number = DEFAULT_SEARCH_LIMIT
): Promise<SkillsShSearchResponse> {
  const url = `${SKILLSSH_BASE_URL}/search?q=${encodeURIComponent(query)}&limit=${limit}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`skills.sh API error: ${res.status} ${body}`);
    }
    const data = await res.json();
    return SkillsShSearchResponseSchema.parse(data);
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Fetch SKILL.md content from GitHub for a skills.sh skill.
 *
 * @param source - GitHub "owner/repo" (e.g. "supabase/agent-skills")
 * @param skillId - Skill name (last segment of the full id, e.g. "supabase-postgres-best-practices")
 */
export async function fetchSkillMd(source: string, skillId: string): Promise<string> {
  const url = `${GITHUB_RAW_BASE}/${source}/main/skills/${skillId}/SKILL.md`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) {
      throw new Error(`Failed to fetch SKILL.md: ${res.status} (${url})`);
    }
    return await res.text();
  } finally {
    clearTimeout(timeout);
  }
}
