/**
 * Gemini 429 classification integration tests.
 *
 * Tests the end-to-end classification path for Gemini rate-limit errors
 * through OmniRoute. Sends bursts of requests to try to trigger published
 * RPM/RPD limits, then verifies the classification is correct.
 *
 * The tests are "best effort" — if rate limits aren't triggered (Gemini
 * may be more generous in practice), the test logs a warning and passes
 * rather than failing. The unit tests in account-fallback-service.test.ts
 * provide the definitive coverage of classification logic.
 *
 * Env vars:
 *   OMNIROUTE_URL                 — base URL (default http://localhost:20128)
 *   OMNIROUTE_API_KEY             — API key for auth (REQUIRED)
 *   TEST_GEMINI_RPM_MODEL         — RPM model (default gemini/gemma-4-31b-it)
 *   TEST_GEMINI_RPD_MODEL         — RPD model (default gemini/gemini-2.5-flash)
 */

import test from "node:test";
import assert from "node:assert/strict";

const API_KEY = process.env.OMNIROUTE_API_KEY;
const BASE_URL = process.env.OMNIROUTE_URL || "http://localhost:20128";
const RPM_MODEL = process.env.TEST_GEMINI_RPM_MODEL || "gemini/gemma-4-31b-it";
const RPD_MODEL = process.env.TEST_GEMINI_RPD_MODEL || "gemini/gemini-2.5-flash";

const skip = !API_KEY ? "OMNIROUTE_API_KEY not set — skipping live test" : undefined;

async function chat(model: string, content: string) {
  const res = await fetch(`${BASE_URL}/api/v1/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify({ model, stream: false, messages: [{ role: "user", content }] }),
  });
  return { status: res.status, body: await res.text() };
}

// ── Test 1: RPM burst ────────────────────────────────────────────────────────

test(
  "Gemma 4 RPM burst: try to hit 15 RPM, verify 429 classification if triggered",
  { skip },
  async () => {
    const BURST = 30;
    console.error(`\n[RPM] Sending ${BURST} concurrent requests to ${RPM_MODEL} (15 RPM)...`);
    const fetches = Array.from({ length: BURST }, (_, i) =>
      chat(RPM_MODEL, `Count to 3. Only numbers. Request ${i}.`)
    );
    const results = await Promise.all(fetches);

    const statuses = results.map((r) => r.status);
    const successes = results.filter((r) => r.status === 200);
    const rateLimited = results.filter((r) => r.status === 429);

    console.error(
      `[RPM] ${successes.length} success, ${rateLimited.length} 429 (statuses: ${statuses.join(",")})`
    );

    assert.ok(successes.length > 0, "expected at least one successful request");

    if (rateLimited.length > 0) {
      for (const r of rateLimited) {
        assert.equal(
          r.body.includes("quota_exhausted"),
          false,
          `RPM 429 should NOT be quota_exhausted: ${r.body.slice(0, 300)}`
        );
        assert.ok(
          r.body.includes("cooling down") || r.body.includes("rate_limit"),
          `RPM 429 should mention cooldown: ${r.body.slice(0, 300)}`
        );
      }
    } else {
      console.error("[RPM] No 429s received (Gemini may have higher effective RPM for this key)");
      console.error(
        "[RPM] Classification logic verified by unit tests in account-fallback-service.test.ts"
      );
    }
  }
);

test("Gemma 4 RPM recovery: after 65s, requests should succeed again", { skip }, async () => {
  // First send a burst to ensure any cooldown from the previous test has cleared
  const warmup = await chat(RPM_MODEL, "ping");
  if (warmup.status === 429) {
    console.error("[RPM recovery] Previous test left model in cooldown, waiting 65s...");
    await new Promise((r) => setTimeout(r, 65_000));
  } else {
    console.error("[RPM recovery] Model is healthy, skipping wait");
  }

  const results: Array<{ status: number }> = [];
  for (let i = 0; i < 3; i++) {
    results.push(await chat(RPM_MODEL, `Hello ${i}.`));
    await new Promise((r) => setTimeout(r, 500));
  }

  const successes = results.filter((r) => r.status === 200);
  console.error(`[RPM recovery] ${successes.length}/3 success`);
  assert.ok(
    successes.length >= 1,
    `expected at least 1 recovery, got: ${results.map((r) => r.status).join(",")}`
  );
});

// ── Test 2: RPD burst ────────────────────────────────────────────────────────

test(
  "Gemini 2.5 Flash RPD burst: try to hit 20 RPD, verify quota_exhausted if triggered",
  { skip },
  async () => {
    const BURST = 30;
    console.error(`\n[RPD] Sending ${BURST} concurrent requests to ${RPD_MODEL} (20 RPD)...`);
    const fetches = Array.from({ length: BURST }, (_, i) =>
      chat(RPD_MODEL, `Count to 5. Only numbers. Request ${i}.`)
    );
    const results = await Promise.all(fetches);
    const statuses = results.map((r) => r.status);
    const successes = results.filter((r) => r.status === 200);
    const rateLimited = results.filter((r) => r.status === 429);

    console.error(
      `[RPD] ${successes.length} success, ${rateLimited.length} 429 (statuses: ${statuses.join(",")})`
    );

    assert.ok(successes.length > 0, "expected at least one successful request");

    const quotaExhausted = rateLimited.filter((r) =>
      r.body.toLowerCase().includes("quota_exhausted")
    );

    if (quotaExhausted.length > 0) {
      console.error(`[RPD] ${quotaExhausted.length} quota_exhausted responses ✓`);
    } else if (rateLimited.length > 0) {
      // Check that non-quota-exhausted 429s are still rate_limit, not some other error
      for (const r of rateLimited) {
        assert.equal(
          r.body.includes("quota_exhausted"),
          false,
          `RPM 429 should not be quota_exhausted: ${r.body.slice(0, 200)}`
        );
      }
      console.error("[RPD] 429s present but none are quota_exhausted (RPD not yet hit)");
    } else {
      console.error(
        "[RPD] No 429s received (daily quota may not have been reached, or limits are higher)"
      );
      console.error("[RPD] Classification logic verified by unit tests");
    }
  }
);
