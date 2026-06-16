"use client";

import { useTranslations } from "next-intl";
import { Toggle } from "@/shared/components";

type CcCompatibleRequestDefaultsFieldsProps = {
  context1m: boolean;
  redactThinking: boolean;
  onContext1mChange: (checked: boolean) => void;
  onRedactThinkingChange: (checked: boolean) => void;
};

export default function CcCompatibleRequestDefaultsFields({
  context1m,
  redactThinking,
  onContext1mChange,
  onRedactThinkingChange,
}: CcCompatibleRequestDefaultsFieldsProps) {
  const t = useTranslations("providers");

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border/50 bg-surface/20 p-4">
      <Toggle
        checked={context1m}
        onChange={onContext1mChange}
        label={t("ccCompatibleContext1mLabel")}
        description={t("ccCompatibleContext1mDescription")}
      />
      <Toggle
        checked={redactThinking}
        onChange={onRedactThinkingChange}
        label={t("ccCompatibleRedactThinkingLabel")}
        description={t("ccCompatibleRedactThinkingDescription")}
      />
    </div>
  );
}
