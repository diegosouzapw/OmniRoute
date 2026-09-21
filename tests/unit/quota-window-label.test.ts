import test from "node:test";
import assert from "node:assert/strict";

import {
  formatQuotaUsageReason,
  formatQuotaWindowLabel,
} from "../../open-sse/services/quotaWindowLabel.ts";
import { collectQuotaWindowExclusions } from "../../open-sse/services/combo/quotaSkipDiagnostics.ts";
import { __clearForTests, setQuotaCache } from "../../src/domain/quotaCache.ts";
import { evaluateQuotaLimitPolicy } from "../../src/sse/services/auth.ts";
import { buildCodexUsageQuotas } from "../../open-sse/services/codexUsageQuotas.ts";

test("formatQuotaWindowLabel keeps the routing key when no duration metadata exists", () => {
  assert.equal(formatQuotaWindowLabel({ key: "session" }), "session");
  assert.equal(formatQuotaUsageReason({ key: "session" }, 100), "session usage 100%");
});

test("formatQuotaWindowLabel prefers Monthly for a 30-day window labeled Weekly", () => {
  assert.equal(
    formatQuotaWindowLabel({
      key: "session",
      displayName: "Weekly",
      windowSeconds: 2_592_000,
    }),
    "Monthly (30d)"
  );
});

test("formatQuotaWindowLabel keeps a genuine 5h session label", () => {
  assert.equal(
    formatQuotaWindowLabel({
      key: "session",
      displayName: "Session",
      windowSeconds: 18_000,
    }),
    "Session (5h)"
  );
});

test("buildCodexUsageQuotas labels a 30-day primary window Monthly, not Weekly", () => {
  const { quotas } = buildCodexUsageQuotas({
    rate_limit: {
      primary_window: {
        used_percent: 100,
        limit_window_seconds: 2_592_000,
        reset_after_seconds: 100_000,
      },
    },
  });
  assert.ok(quotas.session);
  assert.equal(quotas.session.displayName, "Monthly");
  assert.equal(quotas.session.windowSeconds, 2_592_000);
});

test("AUTH reasons match usage duration labels for a 30-day Codex session window", () => {
  __clearForTests();
  const connectionId = "quota-label-conn-30d";
  setQuotaCache(connectionId, "codex", {
    session: {
      remainingPercentage: 0,
      resetAt: new Date(Date.now() + 86_400_000).toISOString(),
      displayName: "Weekly",
      windowSeconds: 2_592_000,
    },
  });

  const evaluation = evaluateQuotaLimitPolicy("codex", {
    id: connectionId,
    providerSpecificData: {
      limitPolicy: { enabled: true, thresholdPercent: 99, windows: ["session"] },
      codexLimitPolicy: { use5h: true, useWeekly: false },
    },
  } as never);

  assert.equal(evaluation.blocked, true);
  assert.deepEqual(evaluation.reasons, ["Monthly (30d) usage 100%"]);
});

test("collectQuotaWindowExclusions lists redacted-safe quota windows for 503 bodies", () => {
  __clearForTests();
  const connectionId = "abcd1234-ffff-4000-8000-000000000001";
  setQuotaCache(connectionId, "codex", {
    session: {
      remainingPercentage: 0,
      resetAt: new Date(Date.now() + 86_400_000).toISOString(),
      displayName: "Weekly",
      windowSeconds: 2_592_000,
    },
  });

  const rows = collectQuotaWindowExclusions([
    { provider: "codex", modelStr: "gpt-5.6-sol", connectionId },
  ]);

  assert.equal(rows.length, 1);
  assert.equal(rows[0].provider, "codex");
  assert.equal(rows[0].model, "gpt-5.6-sol");
  assert.match(rows[0].reason, /quota:Monthly \(30d\) 100%/);
  assert.match(rows[0].reason, /conn:abcd1234/);
  assert.equal(rows[0].reason.includes(connectionId), false);
});
