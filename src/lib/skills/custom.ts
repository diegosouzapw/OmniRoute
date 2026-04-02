import { skillRegistry } from "./registry";
import { SkillCreateInputSchema } from "./schemas";

export const CustomSkillSchema = SkillCreateInputSchema;

export async function registerCustomSkill(data: {
  name: string;
  version?: string;
  description?: string;
  schema: { input: Record<string, unknown>; output: Record<string, unknown> };
  handler: string;
  apiKeyId: string;
  enabled?: boolean;
}): Promise<any> {
  const parsed = SkillCreateInputSchema.parse(data);
  return skillRegistry.register({
    ...parsed,
    apiKeyId: data.apiKeyId,
  });
}

export function validateCustomSkill(data: unknown): { valid: boolean; errors?: string[] } {
  const result = CustomSkillSchema.safeParse(data);
  if (result.success) {
    return { valid: true };
  }
  return {
    valid: false,
    errors: result.error.issues.map((e: any) => `${e.path.join(".")}: ${e.message}`),
  };
}

export function listCustomSkills(apiKeyId: string): any[] {
  return skillRegistry.list(apiKeyId);
}

export async function deleteCustomSkill(skillId: string, apiKeyId: string): Promise<boolean> {
  const skill = skillRegistry.getSkill(skillId, apiKeyId);
  if (!skill) return false;
  return skillRegistry.unregister(skill.name, skill.version, apiKeyId);
}
