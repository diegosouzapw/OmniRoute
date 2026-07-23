/**
 * Live combo cooldown-wait test — "default" combo (strategy=auto, two gemma-4
 * models), against a real running OmniRoute instance with a real Gemini key.
 *
 * #7360: a request against the "default" combo was crystallizing a 503
 * "all targets exhausted" ~6s after BOTH gemma-4 targets hit a real Gemini
 * TPM/RPM 429 (observed live retry-after ~58s), instead of holding the
 * request and retrying once the lower-cooldown target recovered. The fix
 * widened the combo cooldown-aware retry (open-sse/services/combo.ts,
 * comboCooldownWaitEnabled) to the "auto" strategy and raised its wait
 * ceiling/budget (src/lib/resilience/settings.ts, comboCooldownWait) to
 * cover ~60s Gemini-class windows.
 *
 * This test bursts long-prompt concurrent requests at the "default" combo to
 * try to trip a real TPM 429 on both gemma-4 targets simultaneously, then
 * asserts the client-visible contract: the end user must NEVER see a 503
 * "all targets exhausted" — they should either get a 200 (possibly after a
 * long hold while the combo waits out the shorter cooldown and retries) or,
 * in the worst case, a 429 with a SHORT retry-after (never propagated as a
 * hard combo failure). "Best effort" like gemini-live-429-classification.test.ts:
 * if the burst doesn't trip a real rate limit, the test logs and passes — the
 * hermetic regression guard is tests/unit/combo-quota-share-cooldown-wait.test.ts
 * ("auto strategy (2 models, both rate-limited) → waits for the SHORTER
 * cooldown, then succeeds"), which proves the exact behavior deterministically.
 *
 * Env vars:
 *   OMNIROUTE_URL       — base URL (default http://localhost:20128)
 *   OMNIROUTE_API_KEY   — API key for auth (REQUIRED)
 *   GEMINI_API_KEY      — used by liveGeminiShared to provision a gemini
 *                         connection if one doesn't already exist
 */

import test from "node:test";
import assert from "node:assert/strict";
import {
  API_KEY,
  BASE_URL,
  skip,
  ensureTestEnvironment,
  genLongDocMessage,
  type Message,
} from "./liveGeminiShared.ts";

async function chatDefault(messages: Message[]) {
  const startedAt = Date.now();
  const res = await fetch(`${BASE_URL}/v1/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify({ model: "default", stream: false, messages }),
    signal: AbortSignal.timeout(180_000),
  });
  const body = await res.text();
  return { status: res.status, body, durationMs: Date.now() - startedAt };
}

test(
  "default combo (2 gemma-4 targets): burst never surfaces 503 all-targets-exhausted",
  { skip },
  async () => {
    await ensureTestEnvironment();

    const BURST = 12;
    console.error(
      `\n[COMBO] Sending ${BURST} concurrent long-prompt requests to combo "default" ` +
        `(gemini/gemma-4-31b-it + gemini/gemma-4-26b-a4b-it, TPM 16000 each)...`
    );

    const fetches = Array.from({ length: BURST }, () => chatDefault([genLongDocMessage()]));
    const results = await Promise.all(fetches);

    const statuses = results.map((r) => r.status);
    const durations = results.map((r) => Math.round(r.durationMs));
    const successes = results.filter((r) => r.status === 200);
    const allTargetsExhausted = results.filter(
      (r) => r.status === 503 && r.body.toLowerCase().includes("all targets exhausted")
    );

    console.error(`[COMBO] statuses: ${statuses.join(",")}`);
    console.error(`[COMBO] durations(ms): ${durations.join(",")}`);
    console.error(`[COMBO] ${successes.length}/${BURST} succeeded (200)`);

    assert.equal(
      allTargetsExhausted.length,
      0,
      `client must never see a 503 "all targets exhausted" from the default combo — ` +
        `the combo should hold the request and wait out the shorter cooldown instead. ` +
        `Offending bodies: ${allTargetsExhausted.map((r) => r.body.slice(0, 300)).join(" | ")}`
    );

    const anyLongHold = durations.some((d) => d > 15_000);
    if (anyLongHold) {
      console.error(
        "[COMBO] observed a long-held request (>15s) — cooldown-wait path was exercised live ✓"
      );
    } else {
      console.error(
        "[COMBO] no long-held request observed — burst likely did not trip a real TPM/RPM 429 " +
          "on both targets simultaneously (Gemini limits may be more generous in practice). " +
          "The exact wait/retry-shorter-cooldown behavior is proven deterministically by " +
          "tests/unit/combo-quota-share-cooldown-wait.test.ts."
      );
    }

    assert.ok(successes.length > 0, "expected at least one successful request from the burst");
  }
);
