"use client";

import Button from "@/shared/components/Button";
import LinkifiedText from "@/shared/components/LinkifiedText";

type OAuthErrorStepProps = {
  error: string | null;
  errorTitle: string;
  tryAgainLabel: string;
  cancelLabel: string;
  /** When true, Try Again returns to the GitLab Duo setup recipe (#8688). */
  returnToGitlabDuoSetup: boolean;
  onReturnToGitlabDuoSetup: () => void;
  onTryAgain: () => void;
  onClose: () => void;
};

/** Shared OAuth error panel — paste-token errors stay inline in OAuthModal. */
export default function OAuthErrorStep({
  error,
  errorTitle,
  tryAgainLabel,
  cancelLabel,
  returnToGitlabDuoSetup,
  onReturnToGitlabDuoSetup,
  onTryAgain,
  onClose,
}: OAuthErrorStepProps) {
  return (
    <div className="text-center py-6">
      <div className="size-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
        <span className="material-symbols-outlined text-3xl text-red-600">error</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{errorTitle}</h3>
      <p className="text-sm text-red-600 mb-4">
        <LinkifiedText text={error} />
      </p>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            // #8688: return to the setup recipe when still unconfigured,
            // instead of immediately re-hitting authorize → same red error.
            if (returnToGitlabDuoSetup) {
              onReturnToGitlabDuoSetup();
              return;
            }
            onTryAgain();
          }}
          variant="secondary"
          fullWidth
        >
          {tryAgainLabel}
        </Button>
        <Button onClick={onClose} variant="ghost" fullWidth>
          {cancelLabel}
        </Button>
      </div>
    </div>
  );
}
