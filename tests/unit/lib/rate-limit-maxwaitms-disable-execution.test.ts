/**
 * A-1 통합 검증: maxWaitMs=0 disable sentinel 이 withRateLimit 에서
 * Bottleneck execution expiration 을 실제로 끄는지 확인.
 *
 * #4165 테스트는 maxWaitMs=40 + 400ms 작업이 expiration(40ms)에 504 로 죽는
 * 것을 검증(positive). 이 테스트는 그 반대(negative):
 * maxWaitMs=0 + 400ms 작업은 expiration 이 없으므로 504 없이 완료되어야 함.
 * TTB 안전망은 FETCH_TIMEOUT_MS(기본 600s) 가 담당.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rl-disable-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const resilienceSettings = await import("../../../src/lib/resilience/settings.ts");
const rateLimitManager = await import("../../../open-sse/services/rateLimitManager.ts");

function wait(ms: number) {
  const { promise, resolve } = Promise.withResolvers<void>();
  setTimeout(resolve, ms);
  return promise;
}

test.afterEach(async () => {
  await rateLimitManager.__resetRateLimitManagerForTests();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("maxWaitMs=0 은 Bottleneck execution expiration 을 끈다: 400ms 작업이 504 없이 완료", async () => {
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    concurrentRequests: 1,
    requestsPerMinute: 100000,
    minTimeBetweenRequestsMs: 0,
    maxWaitMs: 0, // disable sentinel — expiration off
  });
  rateLimitManager.enableRateLimitProtection("conn-disable");

  // maxWaitMs=0 이면 expiration 없음 → 400ms 작업이 완료되어야 함
  // (대조: #4165 에서 maxWaitMs=40 이면 400ms 작업이 504 로 죽음)
  const result = await rateLimitManager.withRateLimit(
    "openai",
    "conn-disable",
    "gpt-4o",
    async () => {
      await wait(400);
      return "completed-despite-long-job";
    }
  );
  assert.equal(result, "completed-despite-long-job");
});

test("maxWaitMs=0 일 때 RATE_LIMIT_EXECUTION_TIMEOUT 코드가 발생하지 않는다", async () => {
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    concurrentRequests: 1,
    requestsPerMinute: 100000,
    minTimeBetweenRequestsMs: 0,
    maxWaitMs: 0,
  });
  rateLimitManager.enableRateLimitProtection("conn-disable-code");

  let code: string | undefined;
  try {
    await rateLimitManager.withRateLimit("openai", "conn-disable-code", "gpt-4o", async () => {
      await wait(200);
      return "ok";
    });
  } catch (err) {
    code = (err as Error & { code?: string }).code;
  }
  assert.notEqual(
    code,
    "RATE_LIMIT_EXECUTION_TIMEOUT",
    "maxWaitMs=0 일 때는 execution timeout 코드가 나면 안 됨"
  );
});
