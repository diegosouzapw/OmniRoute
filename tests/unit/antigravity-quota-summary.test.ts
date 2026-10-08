import test from "node:test";
import assert from "node:assert/strict";

import {
  normalizeAntigravityQuotaWindow,
  parseAntigravityQuotaSummary,
} from "../../open-sse/services/usage/antigravityWeeklyQuota.ts";

test("Antigravity quota summary parses 5h and weekly windows for each family", () => {
  const summary = parseAntigravityQuotaSummary({
    quotaSummary: {
      groups: [
        {
          displayName: "Gemini Models",
          buckets: [
            {
              bucketId: "gemini-5h",
              window: "5h",
              remainingFraction: 0.74,
              resetTime: "2026-09-03T12:00:00Z",
            },
            {
              bucketId: "gemini-weekly",
              window: "weekly",
              remainingFraction: 0.36,
              resetTime: "2026-09-07T12:00:00Z",
            },
          ],
        },
        {
          displayName: "Claude and GPT Models",
          buckets: [
            {
              bucketId: "claude-gpt-session",
              remainingFraction: 0.92,
              resetTime: "2026-09-03T12:00:00Z",
            },
            {
              bucketId: "claude-gpt-7d",
              remainingFraction: 0.68,
              resetTime: "2026-09-07T12:00:00Z",
            },
          ],
        },
      ],
    },
  });

  assert.equal(summary.groups.length, 2);
  assert.equal(summary.quotas.gemini_session.remainingPercentage, 74);
  assert.equal(summary.quotas.gemini_weekly.remainingPercentage, 36);
  assert.equal(summary.quotas.claude_gpt_session.remainingPercentage, 92);
  assert.equal(summary.quotas.claude_gpt_weekly.remainingPercentage, 68);
  assert.equal(summary.quotas.gemini_session.quotaSource, "retrieveUserQuotaSummary");
  assert.equal(summary.quotas.gemini_session.quotaAggregate, true);
});

test("Antigravity quota summary reads retrieveUserQuotaSummary's nested remaining shape", () => {
  const summary = parseAntigravityQuotaSummary({
    groups: [
      {
        displayName: "Gemini Models",
        buckets: [
          {
            bucketId: "gemini-5h",
            window: "5h",
            remaining: { remainingFraction: 0.74, resetTime: "2026-09-03T12:00:00Z" },
          },
          {
            bucketId: "gemini-weekly",
            window: "weekly",
            remaining: { remainingFraction: 0.36, resetTime: "2026-09-07T12:00:00Z" },
          },
        ],
      },
    ],
  });

  assert.equal(summary.groups.length, 1);
  assert.equal(summary.quotas.gemini_session.remainingPercentage, 74);
  assert.equal(summary.quotas.gemini_weekly.remainingPercentage, 36);
  assert.equal(summary.quotas.gemini_weekly.resetAt, "2026-09-07T12:00:00.000Z");
});

test("Antigravity quota summary skips disabled and unreported buckets", () => {
  const summary = parseAntigravityQuotaSummary({
    groups: [
      {
        displayName: "Gemini Models",
        buckets: [
          { bucketId: "gemini-5h", remainingFraction: 0.5, disabled: true },
          { bucketId: "gemini-weekly" },
        ],
      },
    ],
  });

  assert.deepEqual(summary.groups, []);
  assert.deepEqual(summary.quotas, {});
});

test("normalizeAntigravityQuotaWindow supports explicit and legacy bucket shapes", () => {
  assert.equal(normalizeAntigravityQuotaWindow({ window: "5h" }), "session");
  assert.equal(normalizeAntigravityQuotaWindow({ window: "weekly" }), "weekly");
  assert.equal(normalizeAntigravityQuotaWindow({ bucketId: "gemini-five-hour" }), "session");
  assert.equal(normalizeAntigravityQuotaWindow({ displayName: "7d quota" }), "weekly");
  assert.equal(normalizeAntigravityQuotaWindow({ bucketId: "unknown" }), null);
});
