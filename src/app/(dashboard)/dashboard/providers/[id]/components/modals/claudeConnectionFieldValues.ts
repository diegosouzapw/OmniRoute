import { isClaudeExtraUsageBlockEnabled } from "@/lib/providers/claudeExtraUsage";
import {
  applyClaudeRawPassthroughSave,
  isConnectionRawPassthrough,
} from "@omniroute/open-sse/utils/cacheControlPolicy.ts";

export type ClaudeConnectionFieldValues = {
  blockExtraUsage: boolean;
  lowPriorityMode: boolean;
  autoLimitReset: boolean;
  rawPassthrough: boolean;
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
    rawPassthrough: isConnectionRawPassthrough(providerSpecificData),
  };
}

/** The same fields on their way back into `providerSpecificData` on save. */
export function claudeConnectionFieldPatch(
  values: ClaudeConnectionFieldValues
): Record<string, unknown> {
  const patch: Record<string, unknown> = {
    blockExtraUsage: values.blockExtraUsage,
    lowPriorityMode: values.lowPriorityMode,
    autoLimitReset: values.autoLimitReset,
  };
  applyClaudeRawPassthroughSave(patch, values.rawPassthrough === true);
  return patch;
}
