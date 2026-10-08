import { noteResilienceAction } from "@/lib/usage/resilienceActionsContext.ts";

/** only a stitched suffix counts as a resume of the turn. */
export function noteContinuedSuffix(): void {
  noteResilienceAction({ continued: 1 });
}
