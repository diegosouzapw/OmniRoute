import assert from "node:assert/strict";
import { test } from "node:test";

import {
  ISSUE_AGENT_BUDGET_BOUNDS,
  ISSUE_AGENT_DEFAULTS,
  normalizeIssueAgentSettings,
} from "../../../../src/lib/issueAgent/settings.ts";

test("settings normalization applies defaults", () => {
  const settings = normalizeIssueAgentSettings();
  assert.equal(settings.mode, ISSUE_AGENT_DEFAULTS.mode);
  assert.equal(settings.maxBudgetUsd, ISSUE_AGENT_DEFAULTS.maxBudgetUsd);
  assert.equal(settings.maxIterations, ISSUE_AGENT_DEFAULTS.maxIterations);
  assert.equal(settings.provider, "omniroute");
  assert.equal(settings.routingPolicy, "default");
  assert.equal(settings.defaultBaseBranch, "main");
  assert.equal(settings.budgets.maxRuntimeSeconds, 900);
});

test("settings normalization clamps budget to supported bounds", () => {
  assert.equal(
    normalizeIssueAgentSettings({ maxBudgetUsd: -25 }).maxBudgetUsd,
    ISSUE_AGENT_BUDGET_BOUNDS.minUsd
  );
  assert.equal(
    normalizeIssueAgentSettings({ maxBudgetUsd: 10_000 }).maxBudgetUsd,
    ISSUE_AGENT_BUDGET_BOUNDS.maxUsd
  );
});

test("settings normalization preserves valid mode and floors iterations", () => {
  const settings = normalizeIssueAgentSettings({
    mode: "triage-and-fix",
    maxBudgetUsd: 12.5,
    maxIterations: 4.9,
    budgets: { maxRuntimeSeconds: 120, maxTokens: 5000, maxCostUsd: 3 },
  });
  assert.equal(settings.mode, "triage-and-fix");
  assert.equal(settings.maxBudgetUsd, 12.5);
  assert.equal(settings.maxIterations, 4);
  assert.equal(settings.budgets.maxRuntimeSeconds, 120);
  assert.equal(settings.budgets.maxTokens, 5000);
  assert.equal(settings.budgets.maxCostUsd, 3);
});
