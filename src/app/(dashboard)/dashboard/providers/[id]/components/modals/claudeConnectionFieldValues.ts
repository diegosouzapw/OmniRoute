import { isClaudeExtraUsageBlockEnabled } from "@/lib/providers/claudeExtraUsage";

export type ClaudeConnectionFieldValues = {
  blockExtraUsage: boolean;
  lowPriorityMode: boolean;
  autoLimitReset: boolean;
};

/**
 * Per-connection Claude form fields read out of `providerSpecificData`. Both usage-wall
 * opt-ins default to off; `blockExtraUsage` defaults to on for Claude (see
 * `isClaudeExtraUsageBlockEnabled`). Shared by the modal's two initialization sites.
 */
export function claudeConnectionFieldValues(
  provider: string | null | undefined,
  providerSpecificData: Record<string, unknown> | null | undefined
): ClaudeConnectionFieldValues {
  return {
    blockExtraUsage: isClaudeExtraUsageBlockEnabled(provider, providerSpecificData),
    lowPriorityMode: providerSpecificData?.lowPriorityMode === true,
    autoLimitReset: providerSpecificData?.autoLimitReset === true,
  };
}

/** The same three fields on their way back into `providerSpecificData` on save. */
export function claudeConnectionFieldPatch(
  values: ClaudeConnectionFieldValues
): ClaudeConnectionFieldValues {
  return {
    blockExtraUsage: values.blockExtraUsage,
    lowPriorityMode: values.lowPriorityMode,
    autoLimitReset: values.autoLimitReset,
  };
}
