/**
 * tests/integration/live-gemini-workload.test.ts
 *
 * Streaming live Gemini workload test. Reuses shared generators from
 * liveGeminiShared.ts. For non-streaming, see live-gemini-nonstream.test.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  skip,
  randomInt,
  sendAndValidate,
  CASE_BUILDERS,
  ensureTestEnvironment,
  DELAY_BETWEEN_REQUESTS_MS,
  type Message,
} from "./liveGeminiShared.ts";

test.before(async () => {
  await ensureTestEnvironment();
});

// --------------------------------------------------------------------------
// Concurrent load — 5 parallel threads × 15 iterations
// --------------------------------------------------------------------------

test("[26] concurrent load — 2 threads × 2 iterations", { skip }, async () => {
  const THREAD_COUNT = 2;
  const SET_COUNT = 2;
  const TOTAL_REQUESTS = THREAD_COUNT * SET_COUNT;

  console.log(
    `\n  Concurrent load: ${THREAD_COUNT} threads × ${SET_COUNT} iterations = ${TOTAL_REQUESTS} requests`
  );

  const start = performance.now();

  // Shared state for parallel-request detection across threads
  const requestWindows: { cid: string; start: number; end: number }[] = [];
  let parallelViolation: string | null = null;

  const threadResults = await Promise.allSettled(
    Array.from({ length: THREAD_COUNT }, (_, threadIdx) =>
      (async () => {
        const results: {
          status: number;
          duration: number;
          tokens: number;
          contentLength: number;
          correlationId: string;
        }[] = [];
        for (let set = 1; set <= SET_COUNT; set++) {
          if (parallelViolation) break; // another thread detected a violation

          const idx = randomInt(0, CASE_BUILDERS.length - 1);
          const tc = CASE_BUILDERS[idx];
          const label = `t${threadIdx + 1}-i${set}: ${tc.name}`;
          const requestStart = Date.now();
          const r = await sendAndValidate(label, tc.build);
          const requestEnd = Date.now();

          // Check for parallel requests with the same correlationId
          const cid = r.correlationId;
          const myWindow = { cid, start: requestStart, end: requestEnd };
          const siblings = requestWindows.filter((w) => w.cid === cid);
          for (const s of siblings) {
            if (myWindow.start < s.end && s.start < myWindow.end) {
              parallelViolation =
                `PARALLEL REQUEST DETECTED: cid=${cid.slice(0, 12)}… ` +
                `window [${new Date(myWindow.start).toISOString().slice(11, 23)}–${new Date(myWindow.end).toISOString().slice(11, 23)}] ` +
                `overlaps with [${new Date(s.start).toISOString().slice(11, 23)}–${new Date(s.end).toISOString().slice(11, 23)}]`;
              break;
            }
          }
          requestWindows.push(myWindow);
          results.push({ ...r } as any);
        }
        return results;
      })()
    )
  );

  const totalDuration = performance.now() - start;

  const fulfilled = threadResults.filter((r) => r.status === "fulfilled") as PromiseFulfilledResult<
    {
      status: number;
      duration: number;
      tokens: number;
      contentLength: number;
      correlationId: string;
    }[]
  >[];
  const rejected = threadResults.filter((r) => r.status === "rejected") as PromiseRejectedResult[];

  const allResults = fulfilled.flatMap((r) => r.value);
  const totalTokens = allResults.reduce((sum, r) => sum + r.tokens, 0);
  const avgDuration =
    allResults.length > 0
      ? Math.round(allResults.reduce((s, r) => s + r.duration, 0) / allResults.length)
      : 0;

  console.log(
    `\n  Concurrent summary: ${fulfilled.length}/${THREAD_COUNT} threads completed | ` +
      `${allResults.length}/${TOTAL_REQUESTS} requests succeeded | ` +
      `${Math.round(totalDuration)}ms wall clock | ` +
      `${avgDuration}ms avg per request | ` +
      `${totalTokens} total tokens`
  );

  if (rejected.length > 0) {
    for (const r of rejected) {
      const msg = r.reason instanceof Error ? r.message : String(r.reason);
      console.log(`    THREAD FAILED: ${msg}`);
    }
  }

  if (parallelViolation) {
    console.log(`\n  !! ${parallelViolation}`);
  }

  assert.ok(
    fulfilled.length === THREAD_COUNT,
    `expected all ${THREAD_COUNT} threads to complete, ${rejected.length} failed`
  );
  assert.ok(
    allResults.length === TOTAL_REQUESTS,
    `expected ${TOTAL_REQUESTS} total requests, got ${allResults.length}`
  );
  assert.ok(!parallelViolation, parallelViolation);
});

// --------------------------------------------------------------------------
// Single-thread sequential — 1 thread × 5 iterations
// --------------------------------------------------------------------------

test("[27] single-thread sequential — 1 thread × 5 iterations", { skip }, async () => {
  const SET_COUNT = 5;

  console.log(`\n  Single-thread sequential: 1 thread × ${SET_COUNT} iterations`);

  const start = performance.now();
  const results: {
    status: number;
    duration: number;
    tokens: number;
    contentLength: number;
    correlationId: string;
  }[] = [];

  for (let i = 1; i <= SET_COUNT; i++) {
    const idx = randomInt(0, CASE_BUILDERS.length - 1);
    const tc = CASE_BUILDERS[idx];
    const label = `seq-i${i}: ${tc.name}`;
    try {
      if (i > 1) await new Promise((r) => setTimeout(r, DELAY_BETWEEN_REQUESTS_MS));
      const r = await sendAndValidate(label, tc.build);
      results.push(r);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.log(`  ${label.padEnd(45)} FAILED: ${msg}`);
      assert.fail(`iteration ${i} failed: ${msg}`);
    }
  }

  const totalDuration = performance.now() - start;
  const totalTokens = results.reduce((sum, r) => sum + r.tokens, 0);
  const avgDuration =
    results.length > 0
      ? Math.round(results.reduce((s, r) => s + r.duration, 0) / results.length)
      : 0;

  console.log(
    `\n  Sequential summary: ${results.length}/${SET_COUNT} succeeded | ` +
      `${Math.round(totalDuration)}ms wall clock | ` +
      `${avgDuration}ms avg per request | ` +
      `${totalTokens} total tokens`
  );

  // Verify no duplicate correlation IDs (no retries created parallel entries)
  const cids = results.map((r) => r.correlationId);
  const uniqueCids = new Set(cids);
  assert.equal(
    uniqueCids.size,
    cids.length,
    `expected ${cids.length} unique correlation IDs, got ${uniqueCids.size} — duplicates detected`
  );
  assert.equal(results.length, SET_COUNT, `expected ${SET_COUNT} results, got ${results.length}`);
});

// ── Streaming-specific tests ────────────────────────────────────────────

test("[28] streaming: all payloads return content", { skip }, async () => {
  const failures: string[] = [];

  for (let i = 0; i < CASE_BUILDERS.length; i++) {
    const tc = CASE_BUILDERS[i];
    const label = `stream-${String(i + 1).padStart(2, "0")}: ${tc.name}`;
    try {
      const r = await sendAndValidate(label, tc.build);
      if (r.contentLength === 0) {
        failures.push(`${tc.name}: 0 bytes content`);
      }
      if (r.status !== 200) {
        failures.push(`${tc.name}: HTTP ${r.status}`);
      }
    } catch (err) {
      failures.push(`${tc.name}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  if (failures.length > 0) {
    console.log(`\n  Streaming failures (${failures.length}):`);
    for (const f of failures) console.log(`    ${f}`);
  }

  assert.equal(
    failures.length,
    0,
    `${failures.length}/${CASE_BUILDERS.length} streaming payloads failed`
  );
});

test("[29] streaming: correlation IDs are unique per request", { skip }, async () => {
  const cids: string[] = [];
  const count = 5;

  for (let i = 0; i < count; i++) {
    const tc = CASE_BUILDERS[i % CASE_BUILDERS.length];
    const r = await sendAndValidate(`cid-${i + 1}: ${tc.name}`, tc.build);
    cids.push(r.correlationId);
  }

  const unique = new Set(cids);
  assert.equal(
    unique.size,
    count,
    `expected ${count} unique CIDs, got ${unique.size}: ${cids.join(", ")}`
  );
});
