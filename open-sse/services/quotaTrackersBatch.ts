/**
 * quotaTrackersBatch.ts — startup registration for batch quota trackers
 * (AgentRouter, v0-vercel, freemodel-dev, grok-cli, xai-oauth, firecrawl,
 * context7, tavily, llmgateway, lyceum).
 *
 * Do not call `registerQuotaTrackersBatch()` at module scope. Webpack emits
 * `quotaPreflight.ts` as an async module; a top-level call invokes
 * `registerQuotaFetcher` before that live binding is a function
 * (`(0 , e.Zd) is not a function`), rejects the chat-route module, and caches
 * an empty HTTP 500 for every later chat/messages/responses request.
 * Callers must invoke it once imports have resolved: the `chat.ts` module body,
 * and `instrumentation-node.ts` after `await import`.
 */

import { registerAgentrouterQuotaFetcher } from "./agentrouterQuotaFetcher.ts";
import { registerV0QuotaFetcher } from "./v0QuotaFetcher.ts";
import { registerFreeModelQuotaFetcher } from "./freeModelQuotaFetcher.ts";
import { registerGrokCliQuotaFetcher } from "./grokCliQuotaFetcher.ts";
import { registerXaiOauthQuotaFetcher } from "./xaiOauthQuotaFetcher.ts";
import { registerFirecrawlQuotaFetcher } from "./firecrawlQuotaFetcher.ts";
import { registerContext7QuotaFetcher } from "./context7QuotaFetcher.ts";
import { registerTavilyQuotaFetcher } from "./tavilyQuotaFetcher.ts";
import { registerLlmgatewayQuotaFetcher } from "./llmgatewayQuotaFetcher.ts";
import { registerLyceumQuotaFetcher } from "./lyceumQuotaFetcher.ts";

export function registerQuotaTrackersBatch(): void {
  registerAgentrouterQuotaFetcher();
  registerV0QuotaFetcher();
  registerFreeModelQuotaFetcher();
  registerGrokCliQuotaFetcher();
  registerXaiOauthQuotaFetcher();
  registerFirecrawlQuotaFetcher();
  registerContext7QuotaFetcher();
  registerTavilyQuotaFetcher();
  registerLlmgatewayQuotaFetcher();
  registerLyceumQuotaFetcher();
}
