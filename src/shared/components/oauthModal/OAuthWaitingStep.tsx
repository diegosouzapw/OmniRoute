"use client";

import Button from "@/shared/components/Button";

type OAuthWaitingStepProps = {
  waitingLabel: string;
  completeAuthLabel: string;
  popupClosedHint: string;
  popupBlockedLabel: string;
  onManualInput: () => void;
};

/** Localhost popup-mode waiting panel while the OAuth popup completes. */
export default function OAuthWaitingStep({
  waitingLabel,
  completeAuthLabel,
  popupClosedHint,
  popupBlockedLabel,
  onManualInput,
}: OAuthWaitingStepProps) {
  return (
    <div className="text-center py-6">
      <div className="size-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
        <span className="material-symbols-outlined text-3xl text-primary animate-spin">
          progress_activity
        </span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{waitingLabel}</h3>
      <p className="text-sm text-text-muted mb-2">{completeAuthLabel}</p>
      <p className="text-xs text-text-muted mb-4 opacity-70">{popupClosedHint}</p>
      <Button variant="ghost" onClick={onManualInput}>
        {popupBlockedLabel}
      </Button>
    </div>
  );
}
