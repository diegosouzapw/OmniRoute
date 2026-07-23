/**
 * tests/integration/gemini-large-context-tpm.test.ts
 *
 * #7360 follow-up: every other live Gemini workload test uses prompts of a
 * few hundred to ~2,000 tokens — nowhere near Gemini's free-tier TPM ceiling
 * (16000 input tokens/min for gemma-4, per the live error text: "Quota
 * exceeded for metric: generate_content_free_tier_input_token_count, limit:
 * 16000"). That means none of them ever exercised a REAL TPM 429 — only the
 * much smaller RPM-style rate limiting. This file sends genuinely large
 * (~12-13k token) prompts back-to-back so two of them together comfortably
 * exceed the 16000/min ceiling, forcing a real TPM 429 from Gemini and
 * exercising the full path end-to-end against production Gemini, not a mock:
 *   - classification (RATE_LIMIT_EXCEEDED, not the QUOTA_EXHAUSTED/midnight
 *     lockout a naive text-match on "quota" would produce — see
 *     accountFallback.ts's Gemini-specific check)
 *   - the comboCooldownWait wait-then-retry path (widened to "auto" combos
 *     and given a 5-minute ceiling — see combo.ts's dispatchWithCooldownRetry
 *     and its lastError/earliestRetryAfter/lastStatus hoisting fix)
 *   - the synthetic startup keep-alive frame on a genuinely slow request
 *     (open-sse/utils/earlyStreamKeepalive.ts)
 *
 * sendAndValidate() already treats a 503 ("all targets exhausted") as a hard,
 * non-retried failure — exactly the regression this suite exists to catch.
 */
import test from "node:test";

import {
  skip,
  sendAndValidate,
  ensureTestEnvironment,
  genHugeContextMessage,
  DELAY_BETWEEN_REQUESTS_MS,
  type Message,
} from "./liveGeminiShared.ts";

test.before(async () => {
  await ensureTestEnvironment();
});

test("large context (~12k tokens): a single huge prompt completes normally", { skip }, async () => {
  await sendAndValidate("huge-01: single large document batch", (): Message[] => [
    genHugeContextMessage(12000),
  ]);
});

test(
  "large context: back-to-back huge prompts exceed the 16000 TPM/min ceiling and still complete (no 503)",
  { skip },
  async () => {
    // Two ~12-13k-token requests within the same 60s window comfortably
    // exceed Gemini's free-tier 16000 TPM ceiling for gemma-4 — this is
    // deliberately adversarial. A slightly different token target per call
    // (and the "Section N" markers inside genHugeContextMessage) keeps the
    // prompts distinct enough to avoid a semantic-cache hit masking a real
    // upstream dispatch on the second call.
    await sendAndValidate("huge-02a: large batch, first of two", (): Message[] => [
      genHugeContextMessage(12000),
    ]);
    await new Promise((r) => setTimeout(r, Math.min(DELAY_BETWEEN_REQUESTS_MS, 2000)));
    await sendAndValidate(
      "huge-02b: large batch, second of two (should push past 16000 TPM)",
      (): Message[] => [genHugeContextMessage(13000)]
    );
  }
);
