import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { NextRequest } from "next/server";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-a2a-auth-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_OMNIROUTE_API_KEY = process.env.OMNIROUTE_API_KEY;

process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.OMNIROUTE_API_KEY;

const core = await import("../../src/lib/db/core.ts");
const a2aRoute = await import("../../src/app/a2a/route.ts");

const API_KEY = "test-secret";

function makeJsonRpcRequest(token?: string): NextRequest {
  const headers: Record<string, string> = { "content-type": "application/json" };
  if (token !== undefined) headers.authorization = `Bearer ${token}`;
  return new Request("http://localhost/a2a?trace=should-not-be-logged", {
    method: "POST",
    headers,
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "auth-check",
      method: "message/send",
      params: { message: { role: "user", content: "hello" } },
    }),
  }) as unknown as NextRequest;
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  process.env.OMNIROUTE_API_KEY = API_KEY;
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });

  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;

  if (ORIGINAL_OMNIROUTE_API_KEY === undefined) delete process.env.OMNIROUTE_API_KEY;
  else process.env.OMNIROUTE_API_KEY = ORIGINAL_OMNIROUTE_API_KEY;
});

test("a valid bearer token passes auth (reaches the disabled-endpoint check)", async () => {
  // A2A is disabled by default, so a correctly-authenticated request gets past
  // auth and is rejected with -32000 (disabled) rather than -32600 (unauthorized).
  const response = await a2aRoute.POST(makeJsonRpcRequest(API_KEY));
  const body = (await response.json()) as { error?: { code?: number } };

  assert.equal(response.status, 503);
  assert.equal(body.error?.code, -32000);
});

test("a same-length but different token is rejected", async () => {
  // "xxxxxxxxxxx" has the same byte length as "test-secret"; this exercises the
  // timingSafeEqual comparison itself, not just the length pre-check.
  const wrongSameLength = "x".repeat(API_KEY.length);
  assert.equal(wrongSameLength.length, API_KEY.length);

  const response = await a2aRoute.POST(makeJsonRpcRequest(wrongSameLength));
  const body = (await response.json()) as { error?: { code?: number; message?: string } };

  assert.equal(response.status, 400);
  assert.equal(body.error?.code, -32600);
  assert.match(body.error?.message || "", /Unauthorized/i);
});

test("a different-length token is rejected without throwing", async () => {
  // timingSafeEqual throws on unequal-length buffers; the length pre-check must
  // short-circuit so this never surfaces as a 500.
  const response = await a2aRoute.POST(makeJsonRpcRequest("short"));
  const body = (await response.json()) as { error?: { code?: number } };

  assert.equal(response.status, 400);
  assert.equal(body.error?.code, -32600);
});

test("the router does not log the request URL on every call", async () => {
  const original = console.log;
  const logged: string[] = [];
  console.log = (...args: unknown[]) => {
    logged.push(args.map(String).join(" "));
  };

  try {
    await a2aRoute.POST(makeJsonRpcRequest(API_KEY));
  } finally {
    console.log = original;
  }

  assert.ok(
    !logged.some((line) => line.includes("/a2a") || line.includes("HIT A2A ROUTER")),
    `expected no per-request URL logging, got: ${JSON.stringify(logged)}`
  );
});
