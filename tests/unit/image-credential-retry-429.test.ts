import assert from "node:assert/strict";
import test from "node:test";

import { executeImageWithCredentialFallback } from "../../src/sse/services/imageCredentialRetry.ts";

interface MockImageCredentials {
  connectionId: string;
  accessToken: string;
}

interface MockImageResult {
  success: boolean;
  status: number;
  error?: unknown;
  data?: unknown;
  retryable?: boolean;
}

test("executeImageWithCredentialFallback rotates to sibling account on Antigravity's quota-exhausted 429 (#14112)", async () => {
  const account1: MockImageCredentials = {
    connectionId: "conn-antigravity-1",
    accessToken: "token-1",
  };
  const account2: MockImageCredentials = {
    connectionId: "conn-antigravity-2",
    accessToken: "token-2",
  };

  const executedAccounts: string[] = [];

  const mockSelectNextCredentials = async (
    _provider: string,
    _requestedModel: string | null,
    excludedConnectionIds: Set<string>
  ) => {
    if (!excludedConnectionIds.has(account2.connectionId)) {
      return account2;
    }
    return { allRateLimited: true, retryAfter: 60 };
  };

  const mockExecute = async (creds: MockImageCredentials): Promise<MockImageResult> => {
    executedAccounts.push(creds.connectionId);
    if (creds.connectionId === "conn-antigravity-1") {
      // Antigravity's explicit exhausted-quota wording — the one 429 signal
      // isAntigravityImageQuotaExhausted() treats as safe to rotate on.
      return {
        success: false,
        status: 429,
        error: {
          error: {
            message: "Individual quota reached. Contact your administrator to enable overages.",
          },
        },
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

test("executeImageWithCredentialFallback terminates when all accounts return Antigravity's quota-exhausted 429 (#14112)", async () => {
  const account1: MockImageCredentials = {
    connectionId: "conn-antigravity-1",
    accessToken: "token-1",
  };
  const account2: MockImageCredentials = {
    connectionId: "conn-antigravity-2",
    accessToken: "token-2",
  };

  const executedAccounts: string[] = [];

  const mockSelectNextCredentials = async (
    _provider: string,
    _requestedModel: string | null,
    excludedConnectionIds: Set<string>
  ) => {
    if (!excludedConnectionIds.has(account2.connectionId)) {
      return account2;
    }
    return { allRateLimited: true, retryAfter: 60 };
  };

  const mockExecute = async (creds: MockImageCredentials): Promise<MockImageResult> => {
    executedAccounts.push(creds.connectionId);
    return {
      success: false,
      status: 429,
      error: {
        error: {
          message: "Individual quota reached. Contact your administrator to enable overages.",
        },
      },
    };
  };

  const { result } = await executeImageWithCredentialFallback({
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

test("executeImageWithCredentialFallback does not rotate on an ordinary (non-quota-exhausted) 429 (#14112)", async () => {
  const account1: MockImageCredentials = {
    connectionId: "conn-antigravity-1",
    accessToken: "token-1",
  };
  const account2: MockImageCredentials = {
    connectionId: "conn-antigravity-2",
    accessToken: "token-2",
  };

  const executedAccounts: string[] = [];

  const mockSelectNextCredentials = async (
    _provider: string,
    _requestedModel: string | null,
    _excludedConnectionIds: Set<string>
  ) => account2;

  const mockExecute = async (creds: MockImageCredentials): Promise<MockImageResult> => {
    executedAccounts.push(creds.connectionId);
    // Image generation is non-idempotent: an ordinary rate-limit 429 (no
    // quota-exhausted evidence) must NOT trigger account rotation.
    return {
      success: false,
      status: 429,
      error: { error: { message: "RESOURCE_EXHAUSTED: too many requests; retry later" } },
    };
  };

  const { result } = await executeImageWithCredentialFallback({
    provider: "antigravity",
    requestedModel: "gemini-3.1-flash-image",
    credentials: account1,
    execute: mockExecute,
    selectNextCredentials: mockSelectNextCredentials,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 429);
  assert.deepEqual(executedAccounts, ["conn-antigravity-1"]);
});

test("executeImageWithCredentialFallback handles 401 and retryable flags correctly", async () => {
  const account1: MockImageCredentials = { connectionId: "conn-1", accessToken: "token-1" };
  const account2: MockImageCredentials = { connectionId: "conn-2", accessToken: "token-2" };

  const executedAccounts: string[] = [];

  const mockSelectNextCredentials = async (
    _provider: string,
    _requestedModel: string | null,
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
    execute: async (creds: MockImageCredentials): Promise<MockImageResult> => {
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
    execute: async (creds: MockImageCredentials): Promise<MockImageResult> => {
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
    execute: async (creds: MockImageCredentials): Promise<MockImageResult> => {
      executedAccounts.push(creds.connectionId);
      if (creds.connectionId === "conn-1") {
        return {
          success: false,
          status: 400,
          retryable: true,
          error: "Model not supported on this account",
        };
      }
      return { success: true, status: 200, data: { ok: true } };
    },
    selectNextCredentials: mockSelectNextCredentials,
  });

  assert.equal(result400Retryable.result.success, true);
  assert.deepEqual(executedAccounts, ["conn-1", "conn-2"]);
});
