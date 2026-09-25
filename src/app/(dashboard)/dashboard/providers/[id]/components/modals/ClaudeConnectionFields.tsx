"use client";

import { useTranslations } from "next-intl";
import { Toggle } from "@/shared/components";

type ClaudeConnectionFieldsProps = {
  values: {
    blockExtraUsage: boolean;
    lowPriorityMode: boolean;
    autoLimitReset: boolean;
    rawPassthrough?: boolean;
  };
  /** The usage-wall options only exist for subscription (OAuth) connections. */
  showUsageWallOptions: boolean;
  onChange: (patch: Partial<ClaudeConnectionFieldsProps["values"]>) => void;
};

/**
 * Per-connection Claude options. `blockExtraUsage` steers fallback away from
 * pay-as-you-go overage; the two usage-wall toggles mirror Claude Code's
 * `/low-priority` and `/limit-reset` (see open-sse/services/claudeLowPriority.ts).
 */
export default function ClaudeConnectionFields(props: ClaudeConnectionFieldsProps) {
  const t = useTranslations("providers");

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border/50 bg-surface/20 p-4">
      <Toggle
        checked={props.values.blockExtraUsage}
        onChange={(checked) => props.onChange({ blockExtraUsage: checked })}
        label={t("blockClaudeExtraUsageLabel")}
        description={t("blockClaudeExtraUsageDescription")}
      />
      {props.showUsageWallOptions && (
        <>
          <Toggle
            checked={props.values.lowPriorityMode}
            onChange={(checked) => props.onChange({ lowPriorityMode: checked })}
            label={t("claudeLowPriorityModeLabel")}
            description={t("claudeLowPriorityModeDescription")}
          />
          <Toggle
            checked={props.values.autoLimitReset}
            onChange={(checked) => props.onChange({ autoLimitReset: checked })}
            label={t("claudeAutoLimitResetLabel")}
            description={t("claudeAutoLimitResetDescription")}
          />
          <div className="flex flex-col gap-2">
            <Toggle
              checked={props.values.rawPassthrough === true}
              onChange={(checked) => props.onChange({ rawPassthrough: checked })}
              label={t("rawClaudePassthroughLabel")}
              description={t("rawClaudePassthroughDescription")}
            />
            {props.values.rawPassthrough && (
              <p className="text-xs text-amber-500/90 dark:text-amber-400/90">
                {t("rawClaudePassthroughWarning")}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
