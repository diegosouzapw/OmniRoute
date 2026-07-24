/**
 * quotaTrackersBatch.ts — startup registration for batch quota trackers
 * (AgentRouter, v0-vercel, freemodel-dev, grok-cli, xai-oauth).
 *
 * Kept in a dedicated module (rather than adding more inline calls to
 * `src/sse/handlers/chat.ts`, which is a frozen file at its LOC baseline) so the
 * chokepoint file only needs a single import + a single call.
 */

import { registerAgentrouterQuotaFetcher } from "./agentrouterQuotaFetcher.ts";
import { registerV0QuotaFetcher } from "./v0QuotaFetcher.ts";
import { registerFreeModelQuotaFetcher } from "./freeModelQuotaFetcher.ts";
import { registerGrokCliQuotaFetcher } from "./grokCliQuotaFetcher.ts";
import { registerXaiOauthQuotaFetcher } from "./xaiOauthQuotaFetcher.ts";

export function registerQuotaTrackersBatch(): void {
  registerAgentrouterQuotaFetcher();
  registerV0QuotaFetcher();
  registerFreeModelQuotaFetcher();
  registerGrokCliQuotaFetcher();
  registerXaiOauthQuotaFetcher();
}

// Side-effect registration at module load, mirroring the sibling
// registerXQuotaFetcher() calls in chat.ts — done here (rather than as an
// additional call line in chat.ts) to keep the frozen chokepoint file's net
// diff to a single import line.
registerQuotaTrackersBatch();
