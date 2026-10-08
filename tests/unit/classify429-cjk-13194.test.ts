// #13194 — 429 classifier must recognize non-English (CJK) quota-exhaustion
// messages from Chinese providers (z.ai/GLM, Kimi, Qwen, MiniMax),
// Japanese, and Korean providers.

import test from "node:test";
import assert from "node:assert/strict";

import { classify429, looksLikeQuotaExhausted } from "../../src/shared/utils/classify429.ts";

const serial = { concurrency: false };

// ── Chinese (simplified) ────────────────────────────────────────────────

test("#13194 — GLM/z.ai Chinese 5h window → quota_exhausted", serial, () => {
  const body = "已达到 5 小时的使用上限。您的限额将在 2026-09-10 19:01:19 重置。";
  const kind = classify429({ status: 429, body });
  assert.equal(kind, "quota_exhausted", "GLM Chinese body should be classified as quota_exhausted");
  assert.equal(looksLikeQuotaExhausted(body), true);
});

test("#13194 — GLM/z.ai Chinese wrapped in error.message → quota_exhausted", serial, () => {
  const body = {
    error: { message: "已达到 5 小时的使用上限。您的限额将在 2026-09-10 19:01:19 重置。" },
  };
  const kind = classify429({ status: 429, body });
  assert.equal(kind, "quota_exhausted");
});

test("#13194 — Kimi/Moonshot Chinese quota → quota_exhausted", serial, () => {
  const body = "您的账户额度已用尽，请充值后重试。";
  const kind = classify429({ status: 429, body });
  assert.equal(kind, "quota_exhausted", "Kimi Chinese body should be quota_exhausted");
  assert.equal(looksLikeQuotaExhausted(body), true);
});

test("#13194 — Qwen/DashScope Chinese quota → quota_exhausted", serial, () => {
  const body = "当前账户的免费额度已用完，请前往控制台充值。";
  const kind = classify429({ status: 429, body });
  assert.equal(kind, "quota_exhausted", "Qwen Chinese body should be quota_exhausted");
  assert.equal(looksLikeQuotaExhausted(body), true);
});

test("#13194 — MiniMax Chinese daily limit → quota_exhausted", serial, () => {
  const body = "已达到今日调用上限，请明日再试。";
  const kind = classify429({ status: 429, body });
  assert.equal(kind, "quota_exhausted", "MiniMax Chinese body should be quota_exhausted");
  assert.equal(looksLikeQuotaExhausted(body), true);
});

test("#13194 — Generic Chinese quota exceeded → quota_exhausted", serial, () => {
  const body = "超出配额限制，请联系管理员。";
  const kind = classify429({ status: 429, body });
  assert.equal(kind, "quota_exhausted");
});

// ── Japanese ────────────────────────────────────────────────────────────

test("#13194 — Japanese quota reached → quota_exhausted", serial, () => {
  const body = "クォータに達しました。";
  const kind = classify429({ status: 429, body });
  assert.equal(kind, "quota_exhausted", "Japanese body should be quota_exhausted");
  assert.equal(looksLikeQuotaExhausted(body), true);
});

test("#13194 — Japanese usage limit reached → quota_exhausted", serial, () => {
  const body = "使用量の上限に達しました。しばらくしてからお試しください。";
  const kind = classify429({ status: 429, body });
  assert.equal(kind, "quota_exhausted");
});

test("#13194 — Japanese usage restriction reached → quota_exhausted", serial, () => {
  const body = "利用制限に達しました。";
  const kind = classify429({ status: 429, body });
  assert.equal(kind, "quota_exhausted");
});

// ── Korean ──────────────────────────────────────────────────────────────

test("#13194 — Korean quota exceeded → quota_exhausted", serial, () => {
  const body = "할당량을 초과했습니다.";
  const kind = classify429({ status: 429, body });
  assert.equal(kind, "quota_exhausted", "Korean body should be quota_exhausted");
  assert.equal(looksLikeQuotaExhausted(body), true);
});

test("#13194 — Korean usage limit exceeded → quota_exhausted", serial, () => {
  const body = "사용 한도를 초과했습니다. 관리자에게 문의하세요.";
  const kind = classify429({ status: 429, body });
  assert.equal(kind, "quota_exhausted");
});

// ── False positive guard: transient Chinese rate limit should NOT match ─

test("#13194 — Chinese transient rate limit stays rate_limit", serial, () => {
  const body = "请求过于频繁，请稍后重试。";
  const kind = classify429({ status: 429, body });
  assert.equal(kind, "rate_limit", "Chinese transient rate limit must NOT match CJK quota patterns");
});

// ── English patterns still work ─────────────────────────────────────────

test("#13194 — English quota pattern still works", serial, () => {
  const body = {
    error: { message: "You exceeded your current quota, please check your plan." },
  };
  const kind = classify429({ status: 429, body });
  assert.equal(kind, "quota_exhausted");
});
