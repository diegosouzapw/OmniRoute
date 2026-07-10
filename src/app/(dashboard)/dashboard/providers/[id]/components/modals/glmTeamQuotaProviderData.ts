import { GLM_TEAM_QUOTA_ALIAS_KEYS } from "@omniroute/open-sse/config/glmProvider.ts";

export type GlmTeamQuotaFieldValues = {
  glmOrganizationId: string;
  glmProjectId: string;
};

export const EMPTY_GLM_TEAM_QUOTA_FIELDS: GlmTeamQuotaFieldValues = {
  glmOrganizationId: "",
  glmProjectId: "",
};

export function assignGlmTeamQuotaProviderData(
  isGlm: boolean,
  values: GlmTeamQuotaFieldValues,
  target: Record<string, unknown>
) {
  if (!isGlm) return;

  for (const key of GLM_TEAM_QUOTA_ALIAS_KEYS) {
    delete target[key];
  }

  const organizationId = (values.glmOrganizationId || "").trim();
  const projectId = (values.glmProjectId || "").trim();

  if (organizationId) {
    target.glmOrganizationId = organizationId;
  } else {
    delete target.glmOrganizationId;
  }

  if (projectId) {
    target.glmProjectId = projectId;
  } else {
    delete target.glmProjectId;
  }
}
