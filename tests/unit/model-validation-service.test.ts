import "./_helpers/modelValidationEnvironment.ts";
import assert from "node:assert/strict";
import test from "node:test";
import {
  createProviderConnection,
  createProviderNode,
  updateProviderConnection,
} from "../../src/lib/db/providers.ts";
import { updateSettings } from "../../src/lib/db/settings.ts";
import { upsertSessionAccountAffinity } from "../../src/lib/db/sessionAccountAffinity.ts";
import { POST } from "../../src/app/api/provider-models/validate-and-add/route.ts";
import { getCustomModels } from "../../src/lib/db/models.ts";
import { getDbInstance } from "../../src/lib/db/core.ts";
import { createApiKey } from "../../src/lib/db/apiKeys.ts";
import {
  acquireExclusiveConnectionLease,
  releaseExclusiveConnectionLease,
} from "../../src/lib/db/exclusiveConnectionLeases.ts";
import { insertPlugin, deletePlugin } from "../../src/lib/db/plugins.ts";
import { registerHook, unregisterHooks, runOnResponse } from "../../src/lib/plugins/hooks.ts";
import { validateAndAddModel } from "../../src/lib/modelValidation/service.ts";

class ProofTransport {
  calls: Array<{
    url: string;
    authorization: string;
    model: string;
    input?: Array<Record<string, unknown>>;
  }> = [];
  wrongNonce = false;
  onDispatch: (() => Promise<void>) | null = null;
  async fetch(url: string | URL | Request, options?: RequestInit) {
    const requestUrl = String(url);
    assert.ok(["api.openai.com", "validation.invalid"].includes(new URL(requestUrl).hostname));
    const body = JSON.parse(String(options?.body)) as {
      model: string;
      stream?: boolean;
      messages: Array<{ role: string; content: string }>;
      input?: Array<Record<string, unknown>>;
      tools?: unknown[];
    };
    this.calls.push({
      url: requestUrl,
      authorization: new Headers(options?.headers).get("authorization"),
      model: body.model,
      input: body.input,
    });
    await this.onDispatch?.();
    const source = JSON.stringify(body.messages ?? body.input);
    const nonce = source.match(/omni_validation_[a-f0-9-]+/)?.[0];
    const receipt = source.match(/omni_receipt_[a-f0-9-]+/)?.[0];
    const message = { role: "assistant", content: receipt ?? nonce };
    if (new URL(requestUrl).pathname.endsWith("/responses")) {
      return this.responses(body, nonce, receipt);
    }
    if (body.stream) {
      const delta = {
        tool_calls: [
          {
            index: 0,
            id: "call_validation",
            type: "function",
            function: {
              name: "omniroute_validation_echo",
              arguments: JSON.stringify({ nonce: this.wrongNonce ? "wrong" : nonce }),
            },
          },
        ],
      };
      return new Response(
        `data: ${JSON.stringify({ id: "test", object: "chat.completion.chunk", choices: [{ index: 0, delta, finish_reason: null }] })}\n\ndata: ${JSON.stringify({ choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }] })}\n\ndata: [DONE]\n\n`,
        { headers: { "content-type": "text/event-stream" } }
      );
    }
    return Response.json({
      id: "test",
      object: "chat.completion",
      choices: [{ index: 0, message, finish_reason: "stop" }],
      usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
    });
  }

  responses(
    body: { model: string; stream?: boolean; tools?: unknown[] },
    nonce: string,
    receipt?: string
  ) {
    const toolStage = !!body.tools?.length;
    const item = toolStage
      ? {
          type: "function_call",
          id: "fc_validation",
          call_id: "call_validation",
          name: "omniroute_validation_echo",
          arguments: JSON.stringify({ nonce }),
          status: "completed",
        }
      : {
          type: "message",
          id: "msg_validation",
          role: "assistant",
          status: "completed",
          content: [{ type: "output_text", text: receipt ?? nonce, annotations: [] }],
        };
    const response = {
      id: "resp_validation",
      object: "response",
      status: "completed",
      model: body.model,
      output: [item],
      usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
    };
    if (!body.stream) return Response.json(response);
    const frames = [
      { type: "response.created", response: { ...response, status: "in_progress", output: [] } },
      {
        type: "response.output_item.added",
        output_index: 0,
        item: { ...item, arguments: "", status: "in_progress" },
      },
      toolStage
        ? {
            type: "response.function_call_arguments.delta",
            item_id: item.id,
            output_index: 0,
            delta: JSON.stringify({ nonce }),
          }
        : {
            type: "response.output_text.delta",
            item_id: item.id,
            output_index: 0,
            content_index: 0,
            delta: receipt ?? nonce,
          },
      { type: "response.output_item.done", output_index: 0, item },
      { type: "response.completed", response },
    ];
    return new Response(
      frames.map((frame) => `event: ${frame.type}\ndata: ${JSON.stringify(frame)}\n\n`).join("") +
        "data: [DONE]\n\n",
      { headers: { "content-type": "text/event-stream" } }
    );
  }
}

const executor = new ProofTransport();
globalThis.fetch = (url, options) => executor.fetch(url, options);
test.beforeEach(() => {
  executor.calls = [];
  executor.wrongNonce = false;
  executor.onDispatch = null;
});

async function fixture(modelId: string, provider = "openai") {
  const connection = await createProviderConnection({
    provider,
    authType: "apikey",
    apiKey: `fake-${modelId}`,
    isActive: true,
  });
  return {
    provider,
    modelId,
    connectionId: String(connection.id),
    allowInference: true as const,
    apiFormat: "chat-completions" as const,
  };
}

test("active plugins are rejected without running their handlers or dispatching", async () => {
  let hooks = 0;
  registerHook("onRequest", "validation-fixture", () => {
    hooks++;
  });
  try {
    const input = await fixture("active-plugin-proof");
    await assert.rejects(() => validateAndAddModel(input, new AbortController().signal), {
      code: "VALIDATION_PLUGINS_UNSUPPORTED",
    });
    assert.equal(hooks, 0);
    assert.equal(executor.calls.length, 0);
    assert.equal(
      (await getCustomModels(input.provider)).some((model) => model.id === input.modelId),
      false
    );
  } finally {
    unregisterHooks("validation-fixture");
  }
});

test("plugins activated during dispatch cannot run or produce a receipt", async () => {
  let hooks = 0;
  executor.onDispatch = async () => {
    registerHook("onResponse", "validation-late-fixture", () => {
      hooks++;
    });
    // Mirror an onResponse hook called asynchronously inside the request's inherited scope.
    await runOnResponse(
      { requestId: "validation", body: {}, model: "model", provider: "openai", metadata: {} },
      {}
    );
  };
  try {
    const input = await fixture("late-plugin-proof");
    await assert.rejects(() => validateAndAddModel(input, new AbortController().signal));
    assert.equal(hooks, 0);
    assert.equal(executor.calls.length, 1);
    assert.equal(
      (await getCustomModels(input.provider)).some((model) => model.id === input.modelId),
      false
    );
  } finally {
    unregisterHooks("validation-late-fixture");
  }
});

test("persisted active plugins are rejected before lazy plugin loading", async () => {
  insertPlugin({
    id: "validation-persisted",
    name: "validation-persisted",
    version: "1.0.0",
    main: "absent.js",
    pluginDir: "/nonexistent-validation-fixture",
    manifest: {},
    status: "active",
    enabled: true,
  });
  try {
    const input = await fixture("persisted-plugin-proof");
    await assert.rejects(() => validateAndAddModel(input, new AbortController().signal), {
      code: "VALIDATION_PLUGINS_UNSUPPORTED",
    });
    assert.equal(executor.calls.length, 0);
    assert.equal(
      (await getCustomModels(input.provider)).some((model) => model.id === input.modelId),
      false
    );
  } finally {
    deletePlugin("validation-persisted");
  }
});

test("enabled compression is never resolved by strict validation; exactly three native sends remain", async (context) => {
  const db = getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('compression', 'enabled', 'true')"
  ).run();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('compression', 'defaultMode', '\"ultra\"')"
  ).run();
  let compressionReads = 0;
  const prepare = db.prepare.bind(db);
  const spy = context.mock.method(db, "prepare", (sql: string) => {
    const statement = prepare(sql);
    if (sql === "SELECT key, value FROM key_value WHERE namespace = ?") {
      const all = statement.all.bind(statement);
      context.mock.method(statement, "all", (...parameters: unknown[]) => {
        if (parameters[0] === "compression") compressionReads++;
        return all(...parameters);
      });
    }
    return statement;
  });
  try {
    const input = await fixture("compression-isolated-proof");
    const result = await validateAndAddModel(input, new AbortController().signal);
    assert.equal(result.persistenceVerified, true);
    assert.equal(compressionReads, 0, "compression settings must not be resolved or prewarmed");
    assert.equal(executor.calls.length, 3);
  } finally {
    spy.mock.restore();
    db.prepare(
      "DELETE FROM key_value WHERE namespace = 'compression' AND key IN ('enabled', 'defaultMode')"
    ).run();
  }
});

test("three fake dispatcher proofs precede persistence and return an exact receipt", async () => {
  const sibling = await fixture("sibling");
  upsertSessionAccountAffinity(
    "unrelated-session",
    "openai",
    sibling.connectionId,
    Date.now(),
    120_000
  );
  const connection = await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "fake-proof-not-a-secret",
    isActive: true,
  });
  const input = {
    provider: "openai",
    modelId: "proof-model",
    connectionId: connection.id,
    allowInference: true as const,
    apiFormat: "chat-completions" as const,
  };
  const result = await validateAndAddModel(input, new AbortController().signal);
  assert.equal(result.persistenceVerified, true);
  assert.equal(executor.calls.length, 3);
  assert.ok(
    executor.calls.every(
      (call) =>
        call.authorization === "Bearer fake-proof-not-a-secret" && call.model === input.modelId
    )
  );
  assert.equal(result.validation.connectionId, connection.id);
  assert.deepEqual(result.validation.stages, {
    generation: "passed",
    toolCall: "passed",
    continuation: "passed",
  });
  assert.equal(
    (await getCustomModels("openai")).find((model) => model.id === input.modelId)?.validation.id,
    result.validation.id
  );
});

test("wrong tool nonce never persists the model", async () => {
  const input = await fixture("wrong-tool-proof");
  executor.wrongNonce = true;
  await assert.rejects(() => validateAndAddModel(input, new AbortController().signal), /proof/);
  assert.equal(executor.calls.length, 2);
  assert.equal(
    (await getCustomModels("openai")).some((model) => model.id === input.modelId),
    false
  );
});

test("unavailable selected connection cannot fall back to a healthy sibling", async () => {
  const input = await fixture("cooling-proof");
  await updateProviderConnection(input.connectionId, {
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
    testStatus: "unavailable",
  });
  await assert.rejects(
    () => validateAndAddModel(input, new AbortController().signal),
    /unavailable/
  );
  assert.equal(executor.calls.length, 0);
});

test("FREE lease-capable connection remains eligible for auxiliary validation", async () => {
  const input = await fixture("free-managed-proof");
  const previousSecret = process.env.API_KEY_SECRET;
  process.env.API_KEY_SECRET = "model-validation-test-fixture-secret";
  try {
    await createApiKey("validation lease capability", "test", ["lease:exclusive"], {
      allowedConnections: [input.connectionId],
    });
    const result = await validateAndAddModel(input, new AbortController().signal);
    assert.equal(result.persistenceVerified, true);
    assert.equal(executor.calls.length, 3);
  } finally {
    if (previousSecret === undefined) delete process.env.API_KEY_SECRET;
    else process.env.API_KEY_SECRET = previousSecret;
  }
});

test("an ACTIVE exclusive lease prevents validation before dispatch or persistence", async () => {
  const input = await fixture("active-managed-proof");
  const leaseOwnerId = `vlo_${"A".repeat(43)}`;
  const apiKeyId = "validation-active-owner";
  const claimed = acquireExclusiveConnectionLease({
    leaseOwnerId,
    apiKeyId,
    provider: input.provider,
    connectionId: input.connectionId,
  });
  assert.equal(claimed.kind, "ACQUIRED");
  if (claimed.kind !== "ACQUIRED") throw new Error("fixture lease was not acquired");
  try {
    await assert.rejects(() => validateAndAddModel(input, new AbortController().signal), {
      code: "VALIDATION_CONNECTION_UNAVAILABLE",
    });
    assert.equal(executor.calls.length, 0);
    assert.equal(
      (await getCustomModels(input.provider)).some((model) => model.id === input.modelId),
      false
    );
  } finally {
    releaseExclusiveConnectionLease({
      leaseOwnerId,
      apiKeyId,
      generation: claimed.lease.generation,
    });
  }
});

test("lease acquired during the first proof prevents subsequent sends and persistence", async () => {
  const input = await fixture("late-managed-proof");
  const leaseOwnerId = `vlo_${"B".repeat(43)}`;
  const apiKeyId = "validation-late-owner";
  let generation: number;
  executor.onDispatch = async () => {
    const claimed = acquireExclusiveConnectionLease({
      leaseOwnerId,
      apiKeyId,
      provider: input.provider,
      connectionId: input.connectionId,
    });
    assert.equal(claimed.kind, "ACQUIRED");
    if (claimed.kind !== "ACQUIRED") throw new Error("fixture lease was not acquired");
    generation = claimed.lease.generation;
  };
  try {
    await assert.rejects(() => validateAndAddModel(input, new AbortController().signal), {
      code: "VALIDATION_CONNECTION_UNAVAILABLE",
    });
    assert.equal(executor.calls.length, 1);
    assert.equal(
      (await getCustomModels(input.provider)).some((model) => model.id === input.modelId),
      false
    );
  } finally {
    if (generation) releaseExclusiveConnectionLease({ leaseOwnerId, apiKeyId, generation });
  }
});

test("credential or settings mutation during a proof aborts before persistence", async () => {
  for (const mutation of ["credentials", "settings"]) {
    executor.calls = [];
    const input = await fixture(`changed-${mutation}`);
    executor.onDispatch = async () => {
      if (mutation === "credentials")
        await updateProviderConnection(input.connectionId, { apiKey: "fake-rotated-value" });
      else await updateSettings({ modelValidationTestSetting: Date.now() });
    };
    await assert.rejects(
      () => validateAndAddModel(input, new AbortController().signal),
      /changed|unavailable/
    );
    assert.equal(executor.calls.length, 1);
    assert.equal(
      (await getCustomModels("openai")).some((model) => model.id === input.modelId),
      false
    );
  }
});

test("custom OpenAI-compatible node preserves exact provider and connection identity", async () => {
  const provider = "openai-compatible-chat-00000000-0000-4000-8000-000000000001";
  await createProviderNode({
    id: provider,
    type: "openai-compatible",
    name: "Validation fixture",
    apiType: "chat",
    baseUrl: "https://validation.invalid/v1",
  });
  const input = await fixture("custom-proof", provider);
  const result = await validateAndAddModel(input, new AbortController().signal);
  assert.equal(result.validation.provider, provider);
  assert.equal(result.validation.connectionId, input.connectionId);
  assert.equal(executor.calls.length, 3);
  assert.ok(
    executor.calls.every(
      (call) =>
        call.url.startsWith("https://validation.invalid/v1/") &&
        call.authorization === "Bearer fake-custom-proof"
    )
  );
});

test("Responses-only custom node validates native tool roundtrip and persists its receipt", async () => {
  const provider = "openai-compatible-responses-00000000-0000-4000-8000-000000000002";
  await createProviderNode({
    id: provider,
    type: "openai-compatible",
    name: "Responses fixture",
    apiType: "responses",
    baseUrl: "https://validation.invalid/v1",
  });
  const input = {
    ...(await fixture("responses-proof", provider)),
    apiFormat: "responses" as const,
  };
  const result = await validateAndAddModel(input, new AbortController().signal);
  assert.equal(result.validation.provider, provider);
  assert.equal(result.validation.connectionId, input.connectionId);
  assert.equal(executor.calls.length, 3);
  assert.ok(
    executor.calls.every(
      (call) =>
        call.url === "https://validation.invalid/v1/responses" &&
        call.authorization === "Bearer fake-responses-proof" &&
        call.model === input.modelId &&
        Array.isArray(call.input)
    )
  );
  assert.ok(
    executor.calls[2].input.some(
      (item) => item.type === "function_call_output" && item.call_id === "call_validation"
    )
  );
  assert.equal(
    (await getCustomModels(provider)).find((model) => model.id === input.modelId)?.validation.id,
    result.validation.id
  );
});

test("cancelled request performs no dispatch or write and real route requires management auth", async () => {
  const input = await fixture("cancelled-proof");
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(() => validateAndAddModel(input, controller.signal), /cancelled|timed out/);
  assert.equal(executor.calls.length, 0);
  const response = await POST(
    new Request("http://localhost/api/provider-models/validate-and-add", {
      method: "POST",
      body: JSON.stringify(input),
    })
  );
  assert.equal(response.status, 401);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(
    (await getCustomModels("openai")).some((model) => model.id === input.modelId),
    false
  );
});

test("synthetic no-auth credentials cannot substitute for an exact stored connection", async () => {
  await assert.rejects(
    () =>
      validateAndAddModel(
        {
          provider: "opencode",
          modelId: "model",
          connectionId: "noauth",
          allowInference: true,
          apiFormat: "chat-completions",
        },
        new AbortController().signal
      ),
    /unavailable/
  );
  assert.equal(executor.calls.length, 0);
});

test("abort during a pending fake dispatch releases the busy guard and cannot persist late", async () => {
  const input = await fixture("busy-release-proof");
  let release: () => void;
  let entered: () => void;
  const started = new Promise<void>((resolve) => {
    entered = resolve;
  });
  const pending = new Promise<void>((resolve) => {
    release = resolve;
  });
  executor.onDispatch = async () => {
    entered();
    await pending;
  };
  const controller = new AbortController();
  const attempt = validateAndAddModel(input, controller.signal);
  await started;
  await assert.rejects(
    () => validateAndAddModel(input, new AbortController().signal),
    /already running/
  );
  controller.abort();
  await assert.rejects(() => attempt, /cancelled|timed out/);
  assert.equal(
    (await getCustomModels("openai")).some((model) => model.id === input.modelId),
    false
  );
  executor.onDispatch = null;
  const result = await validateAndAddModel(input, new AbortController().signal);
  release();
  await pending;
  assert.equal(result.persistenceVerified, true);
  assert.equal(executor.calls.length, 4);
  assert.equal(
    (await getCustomModels("openai")).filter((model) => model.id === input.modelId).length,
    1
  );
});
