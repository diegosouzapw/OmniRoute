"use client";

import { Input } from "@/shared/components";
import { providerText, type ProviderMessageTranslator } from "../../providerPageHelpers";
import type { GlmTeamQuotaFieldValues } from "./glmTeamQuotaProviderData";

export type { GlmTeamQuotaFieldValues };
export {
  EMPTY_GLM_TEAM_QUOTA_FIELDS,
  assignGlmTeamQuotaProviderData,
} from "./glmTeamQuotaProviderData";

type GlmTeamQuotaFieldsProps = {
  values: GlmTeamQuotaFieldValues;
  onChange: (patch: Partial<GlmTeamQuotaFieldValues>) => void;
  t: ProviderMessageTranslator;
};

export default function GlmTeamQuotaFields({ values, onChange, t }: GlmTeamQuotaFieldsProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border/50 bg-surface/20 p-4">
      <Input
        label={providerText(t, "glmOrganizationIdLabel", "GLM team organization ID")}
        name="glmOrganizationId"
        value={values.glmOrganizationId}
        onChange={(e) => onChange({ glmOrganizationId: e.target.value })}
        placeholder="org-xxxxxx"
        hint={providerText(
          t,
          "glmOrganizationIdHint",
          "Optional for team plan quota. Copy bigmodel-organization from the team usage page network request."
        )}
        autoComplete="off"
        spellCheck={false}
      />
      <Input
        label={providerText(t, "glmProjectIdLabel", "GLM team project ID")}
        name="glmProjectId"
        value={values.glmProjectId}
        onChange={(e) => onChange({ glmProjectId: e.target.value })}
        placeholder="proj_xxxxxx"
        hint={providerText(
          t,
          "glmProjectIdHint",
          "Optional for team plan quota. Copy bigmodel-project from the team usage page network request."
        )}
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}
