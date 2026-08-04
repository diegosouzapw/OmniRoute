import test from "node:test";
import assert from "node:assert/strict";

import {
  clearFreeModelQuotaState,
  fetchFreeModelQuota,
  FREEMODEL_WINDOW_5H,
  FREEMODEL_WINDOW_7D,
  recordFreeModelRequest,
  registerFreeModelQuotaFetcher,
  resetFreeModelAccount,
} from "../../open-sse/services/freeModelQuotaFetcher.ts";
import { preflightQuota } from "../../open-sse/services/quotaPreflight.ts";
import { clearQuotaMonitors } from "../../open-sse/services/quotaMonitor.ts";

test.afterEach(() => {
  clearFreeModelQuotaState();
  clearQuotaMonitors();
  delete process.env.FREEMODEL_5H_REQUEST_LIMIT;
  delete process.env.FREEMODEL_7D_REQUEST_LIMIT;
});

test("fetchFreeModelQuota returns null for an account with no recorded activity", async () => {
  const quota = await fetchFreeModelQuota(`idle-${Date.now()}`);
  assert.equal(quota, null);
});

test("recordFreeModelRequest accumulates both windows and fetchFreeModelQuota reports them", async () => {
  process.env.FREEMODEL_5H_REQUEST_LIMIT = "10";
  process.env.FREEMODEL_7D_REQUEST_LIMIT = "40";

  const accountId = `acct-${Date.now()}`;
  for (let i = 0; i < 5; i += 1) {
    recordFreeModelRequest(accountId);
  }

  const quota = await fetchFreeModelQuota(accountId);
  assert.ok(quota);
  assert.ok(quota.windows);
  assert.equal(quota.windows![FREEMODEL_WINDOW_5H].percentUsed, 0.5);
  assert.equal(quota.windows![FREEMODEL_WINDOW_7D].percentUsed, 0.125);
  // Worst-case (5h window) drives the top-level percentUsed.
  assert.equal(quota.percentUsed, 0.5);
});

test("recordFreeModelRequest tracks per-account, not globally", async () => {
  process.env.FREEMODEL_5H_REQUEST_LIMIT = "10";

  const accountA = `acct-a-${Date.now()}`;
  const accountB = `acct-b-${Date.now()}`;

  for (let i = 0; i < 3; i += 1) recordFreeModelRequest(accountA);
  recordFreeModelRequest(accountB);

  const quotaA = await fetchFreeModelQuota(accountA);
  const quotaB = await fetchFreeModelQuota(accountB);

  assert.ok(quotaA);
  assert.ok(quotaB);
  assert.equal(quotaA.windows![FREEMODEL_WINDOW_5H].percentUsed, 0.3);
  assert.equal(quotaB.windows![FREEMODEL_WINDOW_5H].percentUsed, 0.1);
});

test("fetchFreeModelQuota caps percentUsed at 1 when over limit", async () => {
  process.env.FREEMODEL_5H_REQUEST_LIMIT = "2";

  const accountId = `acct-over-${Date.now()}`;
  for (let i = 0; i < 5; i += 1) recordFreeModelRequest(accountId);

  const quota = await fetchFreeModelQuota(accountId);
  assert.ok(quota);
  assert.equal(quota.windows![FREEMODEL_WINDOW_5H].percentUsed, 1);
  assert.equal(quota.percentUsed, 1);
});

test("resetFreeModelAccount clears a single account's tracked state", async () => {
  const accountId = `acct-reset-${Date.now()}`;
  recordFreeModelRequest(accountId);
  resetFreeModelAccount(accountId);

  const quota = await fetchFreeModelQuota(accountId);
  assert.equal(quota, null);
});

test("registerFreeModelQuotaFetcher wires into preflightQuota and blocks when exhausted", async () => {
  registerFreeModelQuotaFetcher();
  process.env.FREEMODEL_5H_REQUEST_LIMIT = "1";

  const connectionId = `freemodel-preflight-${Date.now()}`;
  recordFreeModelRequest(connectionId);
  recordFreeModelRequest(connectionId);

  const result = await preflightQuota("freemodel-dev", connectionId, {
    providerSpecificData: { quotaPreflightEnabled: true },
  });

  assert.equal(result.proceed, false);
});
