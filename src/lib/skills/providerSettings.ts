import { getSettings } from "@/lib/db/settings";

export type SkillsProvider = "skillsmp" | "skillssh";

export const DEFAULT_SKILLS_PROVIDER: SkillsProvider = "skillsmp";

export function normalizeSkillsProvider(value: unknown): SkillsProvider {
  return value === "skillssh" || value === "skillsmp" ? value : DEFAULT_SKILLS_PROVIDER;
}

export async function getSkillsProviderSetting(): Promise<SkillsProvider> {
  const settings = (await getSettings()) as Record<string, unknown>;
  return normalizeSkillsProvider(settings.skillsProvider);
}
