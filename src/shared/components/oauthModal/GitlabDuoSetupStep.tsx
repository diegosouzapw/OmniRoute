"use client";

import Button from "@/shared/components/Button";
import LinkifiedText from "@/shared/components/LinkifiedText";
import { GITLAB_DUO_OAUTH_SETUP_MESSAGE } from "@/shared/constants/gitlabDuoSetupMessage";

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
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border border-border bg-muted/40 px-3 py-3 text-left">
        <p className="text-sm font-medium mb-2">GitLab Duo OAuth setup</p>
        <p className="text-sm text-text-muted leading-relaxed">
          <LinkifiedText text={GITLAB_DUO_OAUTH_SETUP_MESSAGE} />
        </p>
      </div>
      <p className="text-xs text-text-muted">
        After the application is registered and the env vars are set on this OmniRoute instance,
        click Continue to start the OAuth login.
      </p>
      <div className="flex gap-2">
        <Button onClick={onContinue} fullWidth>
          Continue
        </Button>
        <Button onClick={onClose} variant="ghost" fullWidth>
          Cancel
        </Button>
      </div>
    </div>
  );
}
