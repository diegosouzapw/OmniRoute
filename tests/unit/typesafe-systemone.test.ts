import assert from "node:assert/strict";
import test from "node:test";

import {
  getAllSystemOneModels,
  getSystemOneProvider,
} from "../../open-sse/config/systemoneRegistry.ts";
import {
  handleSystemOneProxy,
  handleTypeSafeModelsProxy,
} from "../../open-sse/handlers/systemone.ts";
import { getExecutor } from "../../open-sse/executors/index.ts";
import {
  isTypesafeJevModelId,
  stripTypesafeModelPrefix,
  toTypesafePublicModelId,
} from "../../src/lib/providers/typesafe.ts";
import { validateTypeSafeProvider } from "../../src/lib/providers/validation/typesafe.ts";
import { v1SystemOneSchema } from "../../src/shared/validation/schemas/apiV1.ts";

const noOpSaveCallLog = async () => {};

test("TypeSafe model helpers strip only the OmniRoute provider prefix", () => {
  assert.equal(stripTypesafeModelPrefix("typesafe/jev-latest"), "jev-latest");
  assert.equal(stripTypesafeModelPrefix("jev-1.13.0"), "jev-1.13.0");
  assert.equal(toTypesafePublicModelId("jev-preview"), "typesafe/jev-preview");
  assert.equal(isTypesafeJevModelId("typesafe/jev-1.13.0"), true);
  assert.equal(isTypesafeJevModelId("openai/gpt-5"), false);
});

test("System One schema accepts all question types and structured/null entries", () => {
  const parsed = v1SystemOneSchema.safeParse({
    state: { ticket: "Payouts have failed for three days" },
    model: "typesafe/jev-latest",
    questions: {
      urgent: {
        type: "noul",
        instructions: null,
        criteria: { true: ["time-sensitive"], false: { meaning: "not urgent" } },
      },
      department: {
        type: "choice",
        instructions: { question: "Which team?" },
        criteria: { billing: "Payments", technical: null },
      },
      frustration: {
        type: "score",
        instructions: "How frustrated is the customer?",
        criteria: ["Calm", { level: "Frustrated" }, ["Very angry"]],
      },
    },
    future_field: { preserved: true },
  });

  assert.equal(parsed.success, true);
  if (parsed.success) assert.deepEqual(parsed.data.future_field, { preserved: true });
});

test("System One schema enforces Choice and Score limits", () => {
  const tooManyChoices = Object.fromEntries(
    Array.from({ length: 256 }, (_, index) => [`option_${index}`, null])
  );
  assert.equal(
    v1SystemOneSchema.safeParse({
      state: "state",
      model: "jev-latest",
      questions: {
        invalid: { type: "choice", instructions: "Pick", criteria: tooManyChoices },
      },
    }).success,
    false
  );
  assert.equal(
    v1SystemOneSchema.safeParse({
      state: "state",
      model: "jev-latest",
      questions: {
        invalid: { type: "score", instructions: "Rate", criteria: ["only one"] },
      },
    }).success,
    false
  );
});

test("System One registry advertises provider-scoped non-chat models", () => {
  assert.equal(getSystemOneProvider("typesafe")?.baseUrl, "https://api.typesafe.ai/v1/systemone");
  assert.deepEqual(
    getAllSystemOneModels().map((model) => model.id),
    ["typesafe/jev-latest", "typesafe/jev-preview"]
  );
});

test("TypeSafe cannot silently fall through to a chat executor", async () => {
  await assert.rejects(getExecutor("typesafe"), (error: Error & { status?: number }) => {
    assert.equal(error.status, 400);
    assert.match(error.message, /System One provider/);
    assert.match(error.message, /\/v1\/systemone/);
    return true;
  });
});

test("System One proxy strips no fields, forwards SDK metadata, and preserves the response", async () => {
  let requestUrl = "";
  let requestBody: unknown;
  let requestHeaders = new Headers();
  const callLogs: Array<Record<string, unknown>> = [];
  const recordedCosts: Array<{
    apiKeyId: string;
    costUsd: number;
    details?: Record<string, unknown>;
  }> = [];
  const fetchImpl: typeof fetch = async (input, init) => {
    requestUrl = String(input);
    requestBody = JSON.parse(String(init?.body));
    requestHeaders = new Headers(init?.headers);
    return new Response(
      JSON.stringify({
        model: "jev-1.13.0",
        answers: { urgent: { type: "noul", noul: 0.95 } },
        usage: { input_tokens: 1000, output_tokens: 20 },
      }),
      {
        status: 200,
        headers: {
          "content-type": "application/json",
          "x-typesafe-request-id": "ts-request-1",
          "x-ratelimit-remaining-requests": "1199",
        },
      }
    );
  };

  const body = {
    state: "Help!",
    model: "jev-latest",
    questions: { urgent: { type: "noul", instructions: "Urgent?" } },
    future_field: { preserved: true },
  };
  const response = await handleSystemOneProxy({
    body,
    credentials: { apiKey: "test-typesafe-key", connectionId: "conn-typesafe-1" },
    provider: "typesafe",
    requestedModel: "typesafe/jev-latest",
    apiKeyId: "key-typesafe-1",
    apiKeyName: "TypeSafe test key",
    forwardedHeaders: {
      "x-typesafe-sdk": "typesafe-sdk/0.6.0",
      "x-typesafe-runtime": "node/24",
    },
    fetchImpl,
    saveCallLogImpl: async (entry: Record<string, unknown>) => {
      callLogs.push(entry);
    },
    recordCostImpl: (apiKeyId: string, costUsd: number, details) => {
      recordedCosts.push({ apiKeyId, costUsd, details });
    },
  });

  assert.equal(requestUrl, "https://api.typesafe.ai/v1/systemone");
  assert.deepEqual(requestBody, body);
  assert.equal(requestHeaders.get("authorization"), "Bearer test-typesafe-key");
  assert.equal(requestHeaders.get("x-typesafe-sdk"), "typesafe-sdk/0.6.0");
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-typesafe-request-id"), "ts-request-1");
  assert.equal(response.headers.get("x-ratelimit-remaining-requests"), "1199");
  assert.deepEqual(await response.json(), {
    model: "jev-1.13.0",
    answers: { urgent: { type: "noul", noul: 0.95 } },
    usage: { input_tokens: 1000, output_tokens: 20 },
  });
  assert.equal(callLogs.length, 1);
  assert.equal(callLogs[0].requestType, "systemone");
  assert.equal(callLogs[0].model, "jev-1.13.0");
  assert.equal(callLogs[0].apiKeyId, "key-typesafe-1");
  assert.equal(callLogs[0].apiKeyName, "TypeSafe test key");
  assert.ok(Math.abs(Number(callLogs[0].costUsd) - 0.000042) < 1e-12);
  assert.equal(recordedCosts.length, 1);
  assert.equal(recordedCosts[0].apiKeyId, "key-typesafe-1");
  assert.ok(Math.abs(recordedCosts[0].costUsd - 0.000042) < 1e-12);
  assert.equal(recordedCosts[0].details?.provider, "typesafe");
  assert.equal(recordedCosts[0].details?.model, "jev-1.13.0");
  assert.deepEqual(recordedCosts[0].details?.tokens, {
    input_tokens: 1000,
    output_tokens: 20,
  });
  assert.equal(recordedCosts[0].details?.success, true);
  assert.equal(typeof recordedCosts[0].details?.requestId, "string");
});

test("System One proxy preserves TypeSafe errors and retry headers", async () => {
  const response = await handleSystemOneProxy({
    body: { state: "state", model: "jev-latest", questions: {} },
    credentials: { apiKey: "test-typesafe-key" },
    fetchImpl: async () =>
      new Response(
        JSON.stringify({ detail: { error_type: "rate_limit_error", message: "Slow down" } }),
        {
          status: 429,
          headers: { "content-type": "application/json", "retry-after-ms": "250" },
        }
      ),
    saveCallLogImpl: noOpSaveCallLog,
  });

  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after-ms"), "250");
  assert.deepEqual(await response.json(), {
    detail: { error_type: "rate_limit_error", message: "Slow down" },
  });
});

test("System One proxy returns TypeSafe-shaped authentication and timeout errors", async () => {
  const noKey = await handleSystemOneProxy({
    body: {},
    credentials: {},
    saveCallLogImpl: noOpSaveCallLog,
  });
  assert.equal(noKey.status, 401);
  const noKeyBody = (await noKey.json()) as { detail: { error_type: string } };
  assert.equal(noKeyBody.detail.error_type, "authentication_error");

  const timeout = await handleSystemOneProxy({
    body: {},
    credentials: { apiKey: "test-typesafe-key" },
    timeoutMs: 5,
    fetchImpl: async (_input, init) =>
      await new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => reject(init.signal?.reason), { once: true });
      }),
    saveCallLogImpl: noOpSaveCallLog,
  });
  assert.equal(timeout.status, 504);
  const timeoutBody = (await timeout.json()) as { detail: { error_type: string } };
  assert.equal(timeoutBody.detail.error_type, "timeout_error");
});

test("native models proxy preserves the TypeSafe {models: [...]} wire shape", async () => {
  const response = await handleTypeSafeModelsProxy({
    credentials: { apiKey: "test-typesafe-key" },
    fetchImpl: async () =>
      Response.json({
        models: [{ name: "jev-latest", description: "Stable Jev", release_date: "2026-09-14" }],
      }),
    saveCallLogImpl: noOpSaveCallLog,
  });
  const json = (await response.json()) as { models: Array<{ name: string }> };
  assert.equal(json.models[0].name, "jev-latest");
});

test("TypeSafe credential validator uses the authenticated, zero-inference models endpoint", async () => {
  let auth = "";
  const valid = await validateTypeSafeProvider({
    apiKey: "test-typesafe-key",
    fetchImpl: async (url, init) => {
      assert.equal(url, "https://api.typesafe.ai/v1/models");
      auth = new Headers(init.headers).get("authorization") || "";
      return Response.json({ models: [] });
    },
  });
  assert.equal(auth, "Bearer test-typesafe-key");
  assert.equal(valid.valid, true);
  assert.equal(valid.method, "typesafe_models");

  const invalid = await validateTypeSafeProvider({
    apiKey: "bad-key",
    fetchImpl: async () => Response.json({ detail: "Unauthorized" }, { status: 401 }),
  });
  assert.equal(invalid.valid, false);
  assert.match(String(invalid.error), /Invalid API key/);
});
