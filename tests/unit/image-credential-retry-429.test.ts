import assert from "node:assert/strict";
import test from "node:test";

import { executeImageWithCredentialFallback } from "../../src/sse/services/imageCredentialRetry.ts";

test("executeImageWithCredentialFallback rotates to sibling account when account returns HTTP 429", async () => {
  const account1 = { connectionId: "conn-antigravity-1", accessToken: "token-1" };
  const account2 = { connectionId: "conn-antigravity-2", accessToken: "token-2" };

  const executedAccounts: string[] = [];

  const mockSelectNextCredentials = async (
    provider: string,
    requestedModel: string | null,
    excludedConnectionIds: Set<string>
  ) => {
    if (!excludedConnectionIds.has(account2.connectionId)) {
      return account2;
    }
    return { allRateLimited: true, retryAfter: 60 };
  };

  const mockExecute = async (creds: any) => {
    executedAccounts.push(creds.connectionId);
    if (creds.connectionId === "conn-antigravity-1") {
      return {
        success: false,
        status: 429,
        error: "RESOURCE_EXHAUSTED: Rate limit exceeded",
      };
    }
    return {
      success: true,
      status: 200,
      data: {
        created: Date.now(),
        data: [{ b64_json: "base64-image-data-conn2" }],
      },
    };
  };

  const { credentials, result } = await executeImageWithCredentialFallback({
    provider: "antigravity",
    requestedModel: "gemini-3.1-flash-image",
    credentials: account1,
    execute: mockExecute,
    selectNextCredentials: mockSelectNextCredentials,
  });

  assert.equal(result.success, true);
  assert.equal(result.status, 200);
  assert.deepEqual(executedAccounts, ["conn-antigravity-1", "conn-antigravity-2"]);
  assert.equal(credentials.connectionId, "conn-antigravity-2");
});

test("executeImageWithCredentialFallback terminates when all accounts return HTTP 429", async () => {
  const account1 = { connectionId: "conn-antigravity-1", accessToken: "token-1" };
  const account2 = { connectionId: "conn-antigravity-2", accessToken: "token-2" };

  const executedAccounts: string[] = [];

  const mockSelectNextCredentials = async (
    provider: string,
    requestedModel: string | null,
    excludedConnectionIds: Set<string>
  ) => {
    if (!excludedConnectionIds.has(account2.connectionId)) {
      return account2;
    }
    return { allRateLimited: true, retryAfter: 60 };
  };

  const mockExecute = async (creds: any) => {
    executedAccounts.push(creds.connectionId);
    return {
      success: false,
      status: 429,
      error: "RESOURCE_EXHAUSTED: Quota exceeded",
    };
  };

  const { credentials, result } = await executeImageWithCredentialFallback({
    provider: "antigravity",
    requestedModel: "gemini-3.1-flash-image",
    credentials: account1,
    execute: mockExecute,
    selectNextCredentials: mockSelectNextCredentials,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 429);
  assert.deepEqual(executedAccounts, ["conn-antigravity-1", "conn-antigravity-2"]);
});

test("executeImageWithCredentialFallback handles 401 and retryable flags correctly", async () => {
  const account1 = { connectionId: "conn-1", accessToken: "token-1" };
  const account2 = { connectionId: "conn-2", accessToken: "token-2" };

  const executedAccounts: string[] = [];

  const mockSelectNextCredentials = async (
    provider: string,
    requestedModel: string | null,
    excludedConnectionIds: Set<string>
  ) => {
    if (!excludedConnectionIds.has(account2.connectionId)) {
      return account2;
    }
    return null;
  };

  // 1. Test 401 rotation
  const result401 = await executeImageWithCredentialFallback({
    provider: "codex",
    requestedModel: "gpt-5.6-sol",
    credentials: account1,
    execute: async (creds: any) => {
      executedAccounts.push(creds.connectionId);
      if (creds.connectionId === "conn-1") {
        return { success: false, status: 401, error: "Unauthorized" };
      }
      return { success: true, status: 200, data: { ok: true } };
    },
    selectNextCredentials: mockSelectNextCredentials,
  });

  assert.equal(result401.result.success, true);
  assert.deepEqual(executedAccounts, ["conn-1", "conn-2"]);

  // 2. Non-retryable 400 error does NOT rotate
  executedAccounts.length = 0;
  const result400 = await executeImageWithCredentialFallback({
    provider: "codex",
    requestedModel: "gpt-5.6-sol",
    credentials: account1,
    execute: async (creds: any) => {
      executedAccounts.push(creds.connectionId);
      return { success: false, status: 400, error: "Invalid prompt format" };
    },
    selectNextCredentials: mockSelectNextCredentials,
  });

  assert.equal(result400.result.success, false);
  assert.equal(result400.result.status, 400);
  assert.deepEqual(executedAccounts, ["conn-1"]); // did not rotate

  // 3. Retryable 400 error DOES rotate
  executedAccounts.length = 0;
  const result400Retryable = await executeImageWithCredentialFallback({
    provider: "codex",
    requestedModel: "gpt-5.6-sol",
    credentials: account1,
    execute: async (creds: any) => {
      executedAccounts.push(creds.connectionId);
      if (creds.connectionId === "conn-1") {
        return { success: false, status: 400, retryable: true, error: "Model not supported on this account" };
      }
      return { success: true, status: 200, data: { ok: true } };
    },
    selectNextCredentials: mockSelectNextCredentials,
  });

  assert.equal(result400Retryable.result.success, true);
  assert.deepEqual(executedAccounts, ["conn-1", "conn-2"]);
});
