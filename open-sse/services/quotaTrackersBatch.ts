/**
 * quotaTrackersBatch.ts — startup registration for the #6850/#6845/#7075 quota-tracker
 * batch (AgentRouter, v0-vercel, freemodel-dev).
 *
 * Kept in a dedicated module (rather than adding 3 more inline calls to
 * `src/sse/handlers/chat.ts`, which is a frozen file at its LOC baseline) so the
 * chokepoint file only needs a single import + a single call.
 */

import { registerAgentrouterQuotaFetcher } from "./agentrouterQuotaFetcher.ts";
import { registerV0QuotaFetcher } from "./v0QuotaFetcher.ts";
import { registerFreeModelQuotaFetcher } from "./freeModelQuotaFetcher.ts";

export function registerQuotaTrackersBatch(): void {
  registerAgentrouterQuotaFetcher();
  registerV0QuotaFetcher();
  registerFreeModelQuotaFetcher();
}

// Side-effect registration at module load, mirroring the sibling
// registerXQuotaFetcher() calls in chat.ts — done here (rather than as an
// additional call line in chat.ts) to keep the frozen chokepoint file's net
// diff to a single import line.
registerQuotaTrackersBatch();
