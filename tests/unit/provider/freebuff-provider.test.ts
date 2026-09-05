import test from "node:test";
import assert from "node:assert/strict";

import { FreebuffExecutor } from "../../../open-sse/executors/freebuff.ts";
import type { ExecuteInput } from "../../../open-sse/executors/base.ts";
import { freebuffProvider } from "../../../open-sse/config/providers/registry/freebuff/index.ts";
import { APIKEY_PROVIDERS_GATEWAYS } from "../../../src/shared/constants/providers/apikey/gateways.ts";
import { validateFreebuffProvider } from "../../../src/lib/providers/validation.ts";

test("FreebuffExecutor: constructor initializes provider name correctly", () => {
  const executor = new FreebuffExecutor();
  assert.equal(executor.getProvider(), "freebuff");
});

test("FreebuffExecutor: returns 401 response when credentials are missing", async () => {
  const executor = new FreebuffExecutor();
  const res = await executor.execute({
    model: "deepseek/deepseek-v4-flash",
    body: { messages: [{ role: "user", content: "hello" }] },
    stream: false,
    credentials: { apiKey: "" },
  } as unknown as ExecuteInput);

  assert.equal(res.response.status, 401);
  const data = (await res.response.json()) as { error: { message: string } };
  assert.match(data.error.message, /Freebuff Auth Token required/i);
});

test("freebuffProvider: registry entry has valid structure and catalog", () => {
  assert.equal(freebuffProvider.id, "freebuff");
  assert.equal(freebuffProvider.format, "openai");
  assert.equal(freebuffProvider.executor, "freebuff");
  assert.equal(freebuffProvider.baseUrl, "https://www.codebuff.com/api/v1");
  assert.ok(Array.isArray(freebuffProvider.models));
  assert.ok(freebuffProvider.models.length >= 8);

  const flash = freebuffProvider.models.find((m) => m.id === "deepseek/deepseek-v4-flash");
  assert.ok(flash, "deepseek/deepseek-v4-flash must exist in freebuff models");
  assert.equal(flash?.supportsReasoning, true);

  const minimax = freebuffProvider.models.find((m) => m.id === "minimax/minimax-m3");
  assert.ok(minimax, "minimax/minimax-m3 must exist in freebuff models");
  assert.equal(minimax?.supportsVision, true);
});

test("APIKEY_PROVIDERS_GATEWAYS: freebuff gateway metadata is defined", () => {
  const fb = APIKEY_PROVIDERS_GATEWAYS.freebuff;
  assert.ok(fb, "freebuff must be in APIKEY_PROVIDERS_GATEWAYS");
  assert.equal(fb.id, "freebuff");
  assert.equal(fb.name, "Freebuff");
  assert.equal(fb.color, "#10B981");
  assert.equal(fb.hasFree, true);
});

test("validateFreebuffProvider: returns invalid when apiKey is empty", async () => {
  const res = await validateFreebuffProvider({ apiKey: "" });
  assert.equal(res.valid, false);
  assert.match(res.error || "", /Freebuff Auth Token required/i);
});
