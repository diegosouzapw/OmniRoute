"use client";

import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import LinkifiedText from "@/shared/components/LinkifiedText";
import {
  GITLAB_DUO_OAUTH_APPLICATIONS_URL,
  GITLAB_DUO_OAUTH_DEFAULT_REDIRECT_URI,
  GITLAB_DUO_OAUTH_SCOPES,
} from "@/shared/constants/gitlabDuoSetupMessage";

type GitlabDuoSetupStepProps = {
  onContinue: () => void;
  onClose: () => void;
};

/**
 * #8688 — Show GitLab Duo OAuth registration / env-var instructions *before*
 * the authorize call, so operators are not dumped onto a red error step with
 * the only copy of the setup recipe.
 */
export default function GitlabDuoSetupStep({ onContinue, onClose }: GitlabDuoSetupStepProps) {
  const t = useTranslations("oauthModal");

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border border-border bg-muted/40 px-3 py-3 text-left">
        <p className="text-sm font-medium mb-2">{t("gitlabDuoSetupTitle")}</p>
        <p className="text-sm text-text-muted leading-relaxed">
          <LinkifiedText
            text={t("gitlabDuoSetupMessage", {
              applicationsUrl: GITLAB_DUO_OAUTH_APPLICATIONS_URL,
              redirectUri: GITLAB_DUO_OAUTH_DEFAULT_REDIRECT_URI,
              scopes: GITLAB_DUO_OAUTH_SCOPES,
              clientIdEnv: "GITLAB_DUO_OAUTH_CLIENT_ID",
              clientSecretEnv: "GITLAB_DUO_OAUTH_CLIENT_SECRET",
            })}
          />
        </p>
      </div>
      <p className="text-xs text-text-muted">{t("gitlabDuoSetupDescription")}</p>
      <div className="flex gap-2">
        <Button onClick={onContinue} fullWidth>
          {t("continue")}
        </Button>
        <Button onClick={onClose} variant="ghost" fullWidth>
          {t("cancel")}
        </Button>
      </div>
    </div>
  );
}
