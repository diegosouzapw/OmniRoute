import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-grok-reset-credits-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-grok-reset-credits-secret";
process.env.STORAGE_ENCRYPTION_KEY = "grok-reset-credits-test-key-32-bytes-min";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const grokReset = await import("../../src/lib/usage/grokResetCredits.ts");

const originalFetch = globalThis.fetch;
const LIST_URL = "https://grok.com/prod_mc_billing.ConsumerUiSvc/GetRemainingResets";
const REDEEM_URL = "https://grok.com/prod_mc_billing.ConsumerUiSvc/RedeemReset";
const GRANTED = 1786560540;
const EXPIRES = 1789238940;
const TOKEN_ID = "test-token-id";

function encodeVarint(value: number): Buffer {
  const bytes: number[] = [];
  let v = BigInt(value);
  do {
    let byte = Number(v & 0x7fn);
    v >>= 7n;
    if (v !== 0n) byte |= 0x80;
    bytes.push(byte);
  } while (v !== 0n);
  return Buffer.from(bytes);
}

function encodeTag(fieldNumber: number, wireType: number): Buffer {
  return encodeVarint((fieldNumber << 3) | wireType);
}

function encodeLengthDelimited(fieldNumber: number, body: Buffer): Buffer {
  return Buffer.concat([encodeTag(fieldNumber, 2), encodeVarint(body.length), body]);
}

function encodeVarintField(fieldNumber: number, value: number): Buffer {
  return Buffer.concat([encodeTag(fieldNumber, 0), encodeVarint(value)]);
}

function grpcFrame(flag: number, payload: Buffer): Buffer {
  const header = Buffer.alloc(5);
  header[0] = flag;
  header.writeUInt32BE(payload.length, 1);
  return Buffer.concat([header, payload]);
}

function listResponse(tokens: Array<{ id: string; expires: number }>): Response {
  const payload = Buffer.concat(
    tokens.map((token) =>
      encodeLengthDelimited(
        10,
        Buffer.concat([
          encodeLengthDelimited(1, Buffer.from(token.id, "utf8")),
          encodeVarintField(2, GRANTED),
          encodeVarintField(3, token.expires),
        ])
      )
    )
  );
  const trailer = Buffer.from("grpc-status:0\r\n", "utf8");
  return new Response(Buffer.concat([grpcFrame(0x00, payload), grpcFrame(0x80, trailer)]), {
    status: 200,
    headers: { "content-type": "application/grpc-web+proto" },
  });
}

function trailerResponse(status: number, message?: string): Response {
  const lines = [`grpc-status:${status}\r\n`];
  if (message) lines.push(`grpc-message:${encodeURIComponent(message)}\r\n`);
  const trailer = Buffer.from(lines.join(""), "utf8");
  return new Response(Buffer.concat([grpcFrame(0x00, Buffer.alloc(0)), grpcFrame(0x80, trailer)]), {
    status: 200,
    headers: { "content-type": "application/grpc-web+proto" },
  });
}

function usageJsonResponse(): Response {
  return new Response(
    JSON.stringify({
      plan: "SuperGrok Heavy",
      quotas: { weekly: { used: 0, total: 100, remainingPercentage: 100 } },
      bankedResetCredits: 0,
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function createGrokConnection(overrides: Record<string, unknown> = {}) {
  return providersDb.createProviderConnection({
    provider: "grok-cli",
    authType: "oauth",
    name: `Grok Reset ${Date.now()} ${Math.random()}`,
    email: `grok-${Date.now()}-${Math.random()}@example.test`,
    accessToken: "grok-access-token",
    refreshToken: "grok-refresh-token",
    ...overrides,
  });
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("listGrokResetCredits returns public rows without logging token ids in usage", async () => {
  const connection = (await createGrokConnection()) as { id: string };
  globalThis.fetch = async (url) => {
    if (String(url) === LIST_URL) return listResponse([{ id: TOKEN_ID, expires: EXPIRES }]);
    return new Response("unexpected", { status: 500 });
  };

  const result = await grokReset.listGrokResetCredits(connection.id);
  assert.equal(result.availableCount, 1);
  assert.equal(result.credits[0]?.selectionToken, TOKEN_ID);
  assert.equal(result.credits[0]?.expiresAt, new Date(EXPIRES * 1000).toISOString());
});

test("consumeGrokResetCredit posts RedeemReset then refreshes usage", async () => {
  const connection = (await createGrokConnection()) as { id: string };
  const calls: string[] = [];

  globalThis.fetch = async (url, init = {}) => {
    calls.push(String(url));
    if (String(url) === LIST_URL) return listResponse([{ id: TOKEN_ID, expires: EXPIRES }]);
    if (String(url) === REDEEM_URL) {
      const headers = init.headers as Record<string, string>;
      assert.equal(headers.Authorization, ["Bearer", "grok-access-token"].join(" "));
      return trailerResponse(0);
    }
    if (String(url).includes("/user?include=subscription")) {
      return new Response(JSON.stringify({ userId: "u1", subscriptionTier: "SuperGrok Heavy" }), {
        status: 200,
      });
    }
    if (String(url).includes("/billing?format=credits")) {
      return new Response(
        JSON.stringify({
          config: {
            creditUsagePercent: 0,
            currentPeriod: { type: "WEEKLY", end: "2026-09-12T00:00:00.000Z" },
          },
        }),
        { status: 200 }
      );
    }
    if (String(url).includes("/auto-topup-rule")) {
      return new Response(JSON.stringify({}), { status: 200 });
    }
    return usageJsonResponse();
  };

  const result = await grokReset.consumeGrokResetCredit(connection.id, "redeem-1", TOKEN_ID);
  assert.equal(result.outcome, "reset");
  assert.equal(calls.includes(REDEEM_URL), true);
  assert.equal(typeof result.usage, "object");
});

test("consumeGrokResetCredit rejects non-grok connections", async () => {
  const connection = (await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "Codex decoy",
    email: `codex-${Date.now()}@example.test`,
    accessToken: "codex-access-token",
    refreshToken: "codex-refresh-token",
  })) as { id: string };

  await assert.rejects(
    () => grokReset.consumeGrokResetCredit(connection.id, "redeem-wrong"),
    (error: unknown) =>
      error instanceof grokReset.GrokResetCreditError &&
      error.status === 400 &&
      error.code === "grok_provider_required"
  );
});
