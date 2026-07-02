/**
 * Regression test for Codex review-quota plumbing.
 *
 * Upstream parity: decolua/9router PR #836 surfaces the SECONDARY window of
 * `code_review_rate_limit` and supports descriptors that arrive via the
 * `additional_rate_limits` array (some ChatGPT plans report the review limit
 * there rather than in the dedicated `code_review_rate_limit` block).
 *
 * Before this fix:
 *   - `buildCodexUsageQuotas` only emitted `quotas.code_review` from the
 *     primary window of `code_review_rate_limit`, so the WEEKLY review window
 *     was invisible to the dashboard.
 *   - Review limits surfaced under `additional_rate_limits` (with
 *     `limit_name`/`metered_feature` containing "review") were dropped.
 *
 * After this fix:
 *   - The secondary window of `code_review_rate_limit` is emitted as
 *     `quotas.code_review_weekly` (parallel to `session`/`weekly`).
 *   - Review entries inside `additional_rate_limits` populate the same
 *     `code_review`/`code_review_weekly` keys when the dedicated block is
 *     absent.
 *   - The primary `code_review` key is preserved (backward-compat for the
 *     existing dashboard rendering & the usage-service-hardening regression).
 */
import test from "node:test";
import assert from "node:assert/strict";

import { buildCodexUsageQuotas } from "../../open-sse/services/codexUsageQuotas.ts";

test("buildCodexUsageQuotas surfaces the secondary code_review window", () => {
  const { quotas } = buildCodexUsageQuotas({
    rate_limit: {
      primary_window: { used_percent: 25 },
      secondary_window: { used_percent: 50 },
    },
    code_review_rate_limit: {
      primary_window: { used_percent: 40, reset_after_seconds: 45 },
      secondary_window: { used_percent: 70, reset_after_seconds: 6000 },
    },
  });

  // Pre-existing primary window stays under `code_review` (back-compat).
  assert.equal(quotas.code_review?.used, 40);
  assert.equal(quotas.code_review?.remaining, 60);

  // New: secondary window exposed as `code_review_weekly`.
  assert.equal(quotas.code_review_weekly?.used, 70);
  assert.equal(quotas.code_review_weekly?.remaining, 30);
  assert.equal(quotas.code_review_weekly?.total, 100);
  assert.equal(quotas.code_review_weekly?.unlimited, false);
});

test("buildCodexUsageQuotas reads review windows from additional_rate_limits", () => {
  const { quotas } = buildCodexUsageQuotas({
    rate_limit: {
      primary_window: { used_percent: 10 },
    },
    additional_rate_limits: [
      {
        limit_name: "Code Review",
        metered_feature: "code_review",
        rate_limit: {
          primary_window: { used_percent: 33 },
          secondary_window: { used_percent: 55 },
        },
      },
    ],
  });

  assert.equal(quotas.code_review?.used, 33);
  assert.equal(quotas.code_review?.remaining, 67);
  assert.equal(quotas.code_review_weekly?.used, 55);
  assert.equal(quotas.code_review_weekly?.remaining, 45);
});

test("buildCodexUsageQuotas leaves review windows undefined when payload is silent", () => {
  const { quotas } = buildCodexUsageQuotas({
    rate_limit: {
      primary_window: { used_percent: 10 },
      secondary_window: { used_percent: 20 },
    },
  });

  assert.equal(quotas.session?.used, 10);
  assert.equal(quotas.weekly?.used, 20);
  assert.equal(quotas.code_review, undefined);
  assert.equal(quotas.code_review_weekly, undefined);
});

test("buildCodexUsageQuotas prefers dedicated block over additional_rate_limits fallback", () => {
  const { quotas } = buildCodexUsageQuotas({
    code_review_rate_limit: {
      primary_window: { used_percent: 11 },
      secondary_window: { used_percent: 22 },
    },
    additional_rate_limits: [
      {
        limit_name: "review",
        rate_limit: {
          primary_window: { used_percent: 99 },
          secondary_window: { used_percent: 99 },
        },
      },
    ],
  });

  assert.equal(quotas.code_review?.used, 11);
  assert.equal(quotas.code_review_weekly?.used, 22);
});
