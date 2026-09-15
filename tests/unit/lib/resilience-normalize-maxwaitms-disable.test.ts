/**
 * maxWaitMs=0 disable sentinel — Bottleneck execution expiration 옵션 1.
 *
 * 현재(수정 전) normalize.ts 의 toInteger min:1 때문에 maxWaitMs=0 이 1 로 올라가,
 * 운영자가 "execution expiration 끔" 의도로 0을 줘도 실제로는 1ms expiration 가
 * 걸려 GLM-5.2 같은 장시간 모델이 즉시 504 로 죽는다(오히려 악화).
 *
 * 옵션 1: min:1 → min:0 으로 완화해 0 을 disable sentinel 로 인정.
 * withRateLimit 는 이미 `expiration > 0 ? {expiration} : {}` 이므로
 * maxWaitMs=0 이면 Bottleneck expiration 이 자동 비활성된다.
 * TTB 안전망은 FETCH_TIMEOUT_MS(기본 600s) 가 담당.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { normalizeRequestQueueSettings } from "../../../src/lib/resilience/settings/normalize.ts";

const fallback = {
  autoEnableApiKeyProviders: true,
  requestsPerMinute: 50,
  minTimeBetweenRequestsMs: 350,
  concurrentRequests: 6,
  maxWaitMs: 15000,
  maxQueueDepth: 0,
};

test("maxWaitMs=0 은 disable sentinel 로 0 으로 유지되어야 한다 (옵션 1)", () => {
  const out = normalizeRequestQueueSettings({ maxWaitMs: 0 }, fallback);
  assert.equal(
    out.maxWaitMs,
    0,
    "maxWaitMs=0 은 1 로 올라가지 않고 0 이어야 함 — withRateLimit 가 expiration 를 끄려면 0 이 전달되어야 함"
  );
});

test("maxWaitMs 누락 시 fallback(15000) 유지 — 기존 동작 보존", () => {
  const out = normalizeRequestQueueSettings({}, fallback);
  assert.equal(out.maxWaitMs, 15000);
});

test("maxWaitMs > 0 은 그대로 전달 — 4165 테스트와 기존 동작 보존", () => {
  const out = normalizeRequestQueueSettings({ maxWaitMs: 40 }, fallback);
  assert.equal(out.maxWaitMs, 40);
  const out2 = normalizeRequestQueueSettings({ maxWaitMs: 480000 }, fallback);
  assert.equal(out2.maxWaitMs, 480000);
});

test("maxWaitMs 음수는 0 으로 정규화(disable) — 1 이 아닌 0", () => {
  const out = normalizeRequestQueueSettings({ maxWaitMs: -1 }, fallback);
  assert.equal(out.maxWaitMs, 0, "음수는 disable(0) 으로 정규화, 1 이 아님");
});

test("maxWaitMs 상한(24h) 클램프 유지 — 기존 동작 보존", () => {
  const over = 24 * 60 * 60 * 1000 + 5000;
  const out = normalizeRequestQueueSettings({ maxWaitMs: over }, fallback);
  assert.equal(out.maxWaitMs, 24 * 60 * 60 * 1000);
});
