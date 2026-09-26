import { noteResilienceAction } from "@/lib/usage/resilienceActionsContext.ts";

/**
 * record a rehydrated previous_response_id continuation as a Responses
 * resume of this attempt. Called inside handleChatCoreInner, under the
 * attempt store — best-effort, never throws.
 */
export function notePreviousResponseResumed(resumed: unknown): void {
  if (resumed !== true) return;
  try {
    noteResilienceAction({ resumed: true });
  } catch {
    /* observability only */
  }
}
