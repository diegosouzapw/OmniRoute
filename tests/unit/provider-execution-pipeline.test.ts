import { test } from "node:test";
import assert from "node:assert/strict";
import type {
  ChatCoreExecutorResult,
  PipelineConnectionContext,
  PipelineStateHooks,
  PipelineTargetContext,
  PipelineWireState,
  ProviderExecutionPipelineInput,
  ProviderExecutionPolicy,
} from "../../open-sse/handlers/chatCore/providerExecutionPipeline.ts";

test("runProviderExecutionPipeline is importable", async () => {
  const mod = await import("../../open-sse/handlers/chatCore/providerExecutionPipeline.ts");
  assert.equal(typeof mod.runProviderExecutionPipeline, "function");
});

function jsonResponse(body: unknown, status: number, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...extraHeaders },
  });
}

function makeAttempt(
  body: unknown,
  status: number,
  extra: Partial<ChatCoreExecutorResult> = {}
): ChatCoreExecutorResult {
  const response = jsonResponse(body, status, extra.headers as Record<string, string> | undefined);
  return {
    response,
    url: extra.url ?? "https://upstream.test/v1/chat/completions",
    headers: extra.headers ?? { "content-type": "application/json" },
    transformedBody: extra.transformedBody ?? { model: "gpt-5" },
    ...extra,
  };
}

function noopState(): PipelineStateHooks {
  return {
    updatePendingStage: () => {},
    recordRateLimitHeaders: () => {},
    recordRateLimitBody: () => {},
    writeTerminalStatus: async () => {},
    persistConnectionPatch: () => {},
    setConnectionRateLimitedUntil: () => {},
    lockModel: () => {},
    recordAntigravityQuotaState: async () => {},
    markAccountSemaphoreBlocked: () => {},
    isolateProbeFailures: () => false,
  };
}

function makeInput(opts: {
  policy: ProviderExecutionPolicy;
  provider: string;
  model?: string;
  stream?: boolean;
  connectionId?: string;
  send: (model: string, allowDedup: boolean) => Promise<ChatCoreExecutorResult>;
  getProviderCredentials?: PipelineConnectionContext["getProviderCredentials"];
  replaceCredentials?: PipelineConnectionContext["replaceCredentials"];
  getCurrentConnectionId?: () => string | undefined;
  refreshCredentials?: PipelineConnectionContext["refreshCredentials"];
  onCredentialsRefreshed?: PipelineConnectionContext["onCredentialsRefreshed"];
  getNextFamilyFallback?: ProviderExecutionPipelineInput["getNextFamilyFallback"];
  state?: Partial<PipelineStateHooks>;
}): ProviderExecutionPipelineInput {
  const model = opts.model ?? "gpt-5";
  const connectionId = opts.connectionId ?? "conn-a";
  let currentId: string | undefined = connectionId;
  let credentials: Record<string, unknown> = { connectionId };
  const target: PipelineTargetContext = {
    provider: opts.provider,
    requestedModel: model,
    sourceFormat: "openai",
    targetFormat: "openai",
    stream: opts.stream ?? false,
  };
  const wire: PipelineWireState = {
    body: { model, messages: [{ role: "user", content: "hi" }] },
    currentModel: model,
    triedModels: new Set([model]),
    setBodyAndModel: (body, nextModel) => {
      wire.body = body;
      wire.currentModel = nextModel;
      wire.triedModels.add(nextModel);
    },
  };
  const connection: PipelineConnectionContext = {
    initialConnectionId: connectionId,
    getCurrentConnectionId: opts.getCurrentConnectionId ?? (() => currentId),
    getCredentials: () => credentials,
    replaceCredentials:
      opts.replaceCredentials ??
      ((next) => {
        credentials = next;
        currentId = typeof next.connectionId === "string" ? next.connectionId : currentId;
      }),
    onCredentialsRefreshed: opts.onCredentialsRefreshed ?? (() => {}),
    assertManagedLeaseFence: () => {},
    refreshCredentials: opts.refreshCredentials,
    getProviderCredentials:
      opts.getProviderCredentials ??
      (async () => {
        throw new Error("getProviderCredentials must not be called in this fixture");
      }),
  };
  return {
    policy: opts.policy,
    target,
    connection,
    wire,
    state: { ...noopState(), ...(opts.state || {}) },
    sendProviderAttempt: opts.send,
    getNextFamilyFallback: opts.getNextFamilyFallback,
  };
}

test("initial Codex 429: rotation resolver>=1 and successful retry", async () => {
  const { runProviderExecutionPipeline } = await import(
    "../../open-sse/handlers/chatCore/providerExecutionPipeline.ts"
  );
  let sendCount = 0;
  let resolverCallCount = 0;
  const input = makeInput({
    policy: { allowAccountRotation: true, allowModelFallback: true, expectedConnectionId: undefined },
    provider: "codex",
    connectionId: "conn-a",
    send: async () => {
      sendCount += 1;
      if (sendCount === 1) {
        return makeAttempt({ error: { message: "rate limited", type: "rate_limit_error" } }, 429, {
          headers: { "retry-after": "1" },
        });
      }
      return makeAttempt({
        id: "chatcmpl-ok",
        choices: [{ message: { role: "assistant", content: "rotated" }, finish_reason: "stop" }],
      }, 200);
    },
    getProviderCredentials: (async () => {
      resolverCallCount += 1;
      return { connectionId: "conn-b", allRateLimited: false };
    }) as PipelineConnectionContext["getProviderCredentials"],
  });

  const outcome = await runProviderExecutionPipeline(input);
  assert.equal(resolverCallCount >= 1, true, "resolver must run on initial Codex 429");
  assert.equal(sendCount, 2, "second send after rotation");
  assert.equal(outcome.kind, "response");
  if (outcome.kind === "response") {
    assert.equal(outcome.connectionId, "conn-b");
    assert.equal(outcome.response.status, 200);
  }
});

test("initial Antigravity 422 gcp_project_required: rotation resolver>=1 and successful retry", async () => {
  const { runProviderExecutionPipeline } = await import(
    "../../open-sse/handlers/chatCore/providerExecutionPipeline.ts"
  );
  let sendCount = 0;
  let resolverCallCount = 0;
  const input = makeInput({
    policy: { allowAccountRotation: true, allowModelFallback: true },
    provider: "antigravity",
    connectionId: "agy-a",
    send: async () => {
      sendCount += 1;
      if (sendCount === 1) {
        return makeAttempt({ error: { message: "gcp_project_required", type: "invalid_request" } }, 422);
      }
      return makeAttempt(
        {
          id: "chatcmpl-ok",
          choices: [{ message: { role: "assistant", content: "rotated" }, finish_reason: "stop" }],
        },
        200
      );
    },
    getProviderCredentials: (async () => {
      resolverCallCount += 1;
      return { connectionId: "agy-b", allRateLimited: false };
    }) as PipelineConnectionContext["getProviderCredentials"],
  });

  const outcome = await runProviderExecutionPipeline(input);
  assert.equal(resolverCallCount >= 1, true, "resolver must run on initial Antigravity BYOP 422");
  assert.equal(sendCount, 2, "second send after BYOP rotation");
  assert.equal(outcome.kind, "response");
  if (outcome.kind === "response") {
    assert.equal(outcome.connectionId, "agy-b");
    assert.equal(outcome.response.status, 200);
  }
});

test("follow-up rotation blocks resolver on Antigravity 422", async () => {
  const { runProviderExecutionPipeline } = await import(
    "../../open-sse/handlers/chatCore/providerExecutionPipeline.ts"
  );
  let sendCount = 0;
  let resolverCallCount = 0;
  const input = makeInput({
    policy: {
      allowAccountRotation: false,
      allowModelFallback: false,
      expectedConnectionId: "agy-a",
    },
    provider: "antigravity",
    connectionId: "agy-a",
    send: async () => {
      sendCount += 1;
      return makeAttempt({ error: { message: "gcp_project_required", type: "invalid_request" } }, 422);
    },
    getProviderCredentials: (async () => {
      resolverCallCount += 1;
      return { connectionId: "agy-b", allRateLimited: false };
    }) as PipelineConnectionContext["getProviderCredentials"],
  });

  const outcome = await runProviderExecutionPipeline(input);
  assert.equal(resolverCallCount, 0, "follow-up must not call credentials resolver");
  assert.equal(sendCount, 1, "follow-up sends once");
  assert.equal(outcome.kind, "error");
  if (outcome.kind === "error") {
    assert.equal(outcome.result.status, 422);
    assert.equal(outcome.connectionId, "agy-a");
  }
});

test("follow-up rotation blocks resolver on Codex 429", async () => {
  const { runProviderExecutionPipeline } = await import(
    "../../open-sse/handlers/chatCore/providerExecutionPipeline.ts"
  );
  let sendCount = 0;
  let resolverCallCount = 0;
  const input = makeInput({
    policy: {
      allowAccountRotation: false,
      allowModelFallback: false,
      expectedConnectionId: "conn-a",
    },
    provider: "codex",
    connectionId: "conn-a",
    send: async () => {
      sendCount += 1;
      return makeAttempt({ error: { message: "rate limited", type: "rate_limit_error" } }, 429);
    },
    getProviderCredentials: (async () => {
      resolverCallCount += 1;
      return { connectionId: "conn-b", allRateLimited: false };
    }) as PipelineConnectionContext["getProviderCredentials"],
  });

  const outcome = await runProviderExecutionPipeline(input);
  assert.equal(resolverCallCount, 0, "follow-up must not call credentials resolver");
  assert.equal(sendCount, 1, "follow-up sends once");
  assert.equal(outcome.kind, "error");
  if (outcome.kind === "error") {
    assert.equal(outcome.result.status, 429);
    assert.equal(outcome.connectionId, "conn-a");
  }
});

test("401 refresh succeeds then retries once on same connection", async () => {
  const { runProviderExecutionPipeline } = await import(
    "../../open-sse/handlers/chatCore/providerExecutionPipeline.ts"
  );
  let sendCount = 0;
  let refreshCount = 0;
  let persistCount = 0;
  let resolverCallCount = 0;
  const input = makeInput({
    policy: { allowAccountRotation: true, allowModelFallback: true },
    provider: "openai",
    connectionId: "conn-a",
    send: async () => {
      sendCount += 1;
      if (sendCount === 1) {
        return makeAttempt({ error: { message: "invalid_api_key", type: "authentication_error" } }, 401);
      }
      return makeAttempt(
        {
          id: "chatcmpl-ok",
          choices: [{ message: { role: "assistant", content: "refreshed" }, finish_reason: "stop" }],
        },
        200
      );
    },
    refreshCredentials: async (creds) => {
      refreshCount += 1;
      return { ...creds, accessToken: "new-token" };
    },
    onCredentialsRefreshed: async () => {
      persistCount += 1;
    },
    getProviderCredentials: (async () => {
      resolverCallCount += 1;
      return { connectionId: "conn-b", allRateLimited: false };
    }) as PipelineConnectionContext["getProviderCredentials"],
  });

  const outcome = await runProviderExecutionPipeline(input);
  assert.equal(refreshCount, 1, "refresh once");
  assert.equal(persistCount, 1, "onCredentialsRefreshed once");
  assert.equal(resolverCallCount, 0, "401 refresh must not rotate accounts");
  assert.equal(sendCount, 2, "retry once after refresh");
  assert.equal(outcome.kind, "response");
  if (outcome.kind === "response") {
    assert.equal(outcome.connectionId, "conn-a");
    assert.equal(outcome.response.status, 200);
  }
});

test("status restatement rewrites agentrouter 403 quota exhaustion to 429 before classification", async () => {
  const { runProviderExecutionPipeline } = await import(
    "../../open-sse/handlers/chatCore/providerExecutionPipeline.ts"
  );
  let sendCount = 0;
  const input = makeInput({
    policy: { allowAccountRotation: true, allowModelFallback: true },
    provider: "agentrouter",
    connectionId: "ar-a",
    send: async () => {
      sendCount += 1;
      return makeAttempt({ error: { message: "用户额度不足", type: "forbidden" } }, 403);
    },
  });

  const outcome = await runProviderExecutionPipeline(input);
  assert.equal(sendCount, 1);
  assert.equal(outcome.kind, "error");
  if (outcome.kind === "error") {
    assert.equal(outcome.result.status, 429, "restated before classification");
    assert.equal(outcome.connectionId, "ar-a");
  }
});

test("thinking-signature recovery returns winning response", async () => {
  const { runProviderExecutionPipeline } = await import(
    "../../open-sse/handlers/chatCore/providerExecutionPipeline.ts"
  );
  let sendCount = 0;
  const input = makeInput({
    policy: { allowAccountRotation: true, allowModelFallback: true },
    provider: "claude",
    connectionId: "cl-a",
    send: async () => {
      sendCount += 1;
      if (sendCount === 1) {
        return makeAttempt(
          { error: { message: "invalid signature in thinking block", type: "invalid_request_error" } },
          400
        );
      }
      return makeAttempt(
        {
          id: "msg-ok",
          type: "message",
          role: "assistant",
          content: [{ type: "text", text: "recovered" }],
        },
        200
      );
    },
  });
  input.wire.body = {
    model: "gpt-5",
    messages: [
      { role: "user", content: "q1" },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "old" },
          { type: "text", text: "a1" },
        ],
      },
      { role: "user", content: "q2" },
    ],
  };

  const outcome = await runProviderExecutionPipeline(input);
  assert.equal(sendCount, 2, "one recovery send after signature error");
  assert.equal(outcome.kind, "response");
  if (outcome.kind === "response") {
    assert.equal(outcome.response.status, 200);
    assert.equal(outcome.connectionId, "cl-a");
  }
});

test("initial model-unavailable falls back to sibling model", async () => {
  const { runProviderExecutionPipeline } = await import(
    "../../open-sse/handlers/chatCore/providerExecutionPipeline.ts"
  );
  let sendCount = 0;
  let fallbackLookupCount = 0;
  const sentModels: string[] = [];
  const input = makeInput({
    policy: { allowAccountRotation: true, allowModelFallback: true },
    provider: "openai",
    model: "gpt-5",
    connectionId: "conn-a",
    send: async (model) => {
      sendCount += 1;
      sentModels.push(model);
      if (model === "gpt-5") {
        return makeAttempt(
          { error: { message: "model is not available", type: "invalid_request_error" } },
          404
        );
      }
      return makeAttempt(
        {
          id: "chatcmpl-ok",
          choices: [{ message: { role: "assistant", content: "fallback" }, finish_reason: "stop" }],
        },
        200
      );
    },
    getNextFamilyFallback: (current) => {
      fallbackLookupCount += 1;
      return current === "gpt-5" ? "gpt-5-mini" : null;
    },
  });

  const outcome = await runProviderExecutionPipeline(input);
  assert.equal(fallbackLookupCount >= 1, true, "family fallback consulted");
  assert.deepEqual(sentModels, ["gpt-5", "gpt-5-mini"]);
  assert.equal(sendCount, 2);
  assert.equal(outcome.kind, "response");
  if (outcome.kind === "response") {
    assert.equal(outcome.model, "gpt-5-mini");
    assert.equal(outcome.response.status, 200);
  }
});

test("follow-up allowModelFallback=false blocks model-unavailable fallback", async () => {
  const { runProviderExecutionPipeline } = await import(
    "../../open-sse/handlers/chatCore/providerExecutionPipeline.ts"
  );
  let sendCount = 0;
  let fallbackLookupCount = 0;
  const input = makeInput({
    policy: {
      allowAccountRotation: false,
      allowModelFallback: false,
      expectedConnectionId: "conn-a",
    },
    provider: "openai",
    model: "gpt-5",
    connectionId: "conn-a",
    send: async () => {
      sendCount += 1;
      return makeAttempt(
        { error: { message: "model is not available", type: "invalid_request_error" } },
        404
      );
    },
    getNextFamilyFallback: () => {
      fallbackLookupCount += 1;
      return "gpt-5-mini";
    },
  });

  const outcome = await runProviderExecutionPipeline(input);
  assert.equal(fallbackLookupCount, 0, "follow-up must not consult family fallback");
  assert.equal(sendCount, 1);
  assert.equal(outcome.kind, "error");
  if (outcome.kind === "error") {
    assert.equal(outcome.result.status, 404);
    assert.equal(outcome.model, "gpt-5");
  }
});

test("Codex 429 rotation calls scope-rate-limit, affinity-clear, and audit hooks", async () => {
  const { runProviderExecutionPipeline } = await import(
    "../../open-sse/handlers/chatCore/providerExecutionPipeline.ts"
  );
  const rateLimited: Array<Record<string, unknown>> = [];
  const affinityCleared: string[] = [];
  const audits: Array<Record<string, unknown>> = [];
  let sendCount = 0;
  const input = makeInput({
    policy: { allowAccountRotation: true, allowModelFallback: true },
    provider: "codex",
    connectionId: "conn-a",
    send: async () => {
      sendCount += 1;
      if (sendCount === 1) {
        return makeAttempt({ error: { message: "rate limited", type: "rate_limit_error" } }, 429, {
          headers: { "retry-after": "2" },
        });
      }
      return makeAttempt(
        {
          id: "chatcmpl-ok",
          choices: [{ message: { role: "assistant", content: "rotated" }, finish_reason: "stop" }],
        },
        200
      );
    },
    getProviderCredentials: (async () => ({
      connectionId: "conn-b",
      allRateLimited: false,
    })) as PipelineConnectionContext["getProviderCredentials"],
    state: {
      onCodexScopeRateLimited: (params) => {
        rateLimited.push(params as unknown as Record<string, unknown>);
      },
      onClearSessionAffinity: (params) => {
        affinityCleared.push(params.failedConnectionId);
      },
      onAuditAccountRotation: (params) => {
        audits.push(params as unknown as Record<string, unknown>);
      },
    },
  });

  const outcome = await runProviderExecutionPipeline(input);
  assert.equal(outcome.kind, "response");
  assert.equal(rateLimited.length, 1, "must persist Codex model-scope cooldown");
  assert.equal(rateLimited[0]?.failedConnectionId, "conn-a");
  assert.deepEqual(affinityCleared, ["conn-a"]);
  assert.equal(audits.length, 1);
  assert.equal(audits[0]?.action, "codex.account_rotation");
  assert.equal(audits[0]?.failedConnectionId, "conn-a");
  assert.equal(audits[0]?.newConnectionId, "conn-b");
});

test("Codex 429 cooldown reads Retry-After from the response, not request headers", async () => {
  const { runProviderExecutionPipeline } = await import(
    "../../open-sse/handlers/chatCore/providerExecutionPipeline.ts"
  );
  const rateLimited: Array<Record<string, unknown>> = [];
  let sendCount = 0;
  const input = makeInput({
    policy: { allowAccountRotation: true, allowModelFallback: true },
    provider: "codex",
    connectionId: "conn-a",
    send: async () => {
      sendCount += 1;
      if (sendCount === 1) {
        // BaseExecutor puts REQUEST headers on attempt.headers (Authorization).
        // Upstream Retry-After lives on the Response. Mixing the two bags is the
        // extract regression: cooldown silently falls back to 60s.
        return {
          response: jsonResponse(
            { error: { message: "rate limited", type: "rate_limit_error" } },
            429,
            { "Retry-After": "5" }
          ),
          url: "https://upstream.test/v1/chat/completions",
          headers: { Authorization: "Bearer request-token", "content-type": "application/json" },
          transformedBody: { model: "gpt-5" },
        };
      }
      return makeAttempt(
        {
          id: "chatcmpl-ok",
          choices: [{ message: { role: "assistant", content: "rotated" }, finish_reason: "stop" }],
        },
        200
      );
    },
    getProviderCredentials: (async () => ({
      connectionId: "conn-b",
      allRateLimited: false,
    })) as PipelineConnectionContext["getProviderCredentials"],
    state: {
      onCodexScopeRateLimited: (params) => {
        rateLimited.push(params as unknown as Record<string, unknown>);
      },
    },
  });

  const outcome = await runProviderExecutionPipeline(input);
  assert.equal(outcome.kind, "response");
  assert.equal(rateLimited.length, 1, "must persist Codex model-scope cooldown");
  const until = new Date(String(rateLimited[0]?.rateLimitedUntil)).getTime();
  const delta = until - Date.now();
  assert.ok(
    delta > 4_000 && delta < 8_000,
    `Retry-After: 5 must yield ~5s cooldown, got ${delta}ms (60s = still reading request headers)`
  );
});

test("Antigravity BYOP 422 rotation persists cooldown via setConnectionRateLimitedUntil", async () => {
  const { runProviderExecutionPipeline } = await import(
    "../../open-sse/handlers/chatCore/providerExecutionPipeline.ts"
  );
  const cooldowns: Array<{ id: string; untilMs: number | null }> = [];
  let sendCount = 0;
  const input = makeInput({
    policy: { allowAccountRotation: true, allowModelFallback: true },
    provider: "antigravity",
    connectionId: "agy-a",
    send: async () => {
      sendCount += 1;
      if (sendCount === 1) {
        return makeAttempt(
          { error: { message: "gcp_project_required", type: "invalid_request" } },
          422
        );
      }
      return makeAttempt(
        {
          id: "chatcmpl-ok",
          choices: [{ message: { role: "assistant", content: "rotated" }, finish_reason: "stop" }],
        },
        200
      );
    },
    getProviderCredentials: (async () => ({
      connectionId: "agy-b",
      allRateLimited: false,
    })) as PipelineConnectionContext["getProviderCredentials"],
    state: {
      setConnectionRateLimitedUntil: (id, untilMs) => {
        cooldowns.push({ id, untilMs });
      },
    },
  });

  const outcome = await runProviderExecutionPipeline(input);
  assert.equal(outcome.kind, "response");
  assert.equal(sendCount, 2);
  assert.equal(cooldowns.length, 1, "BYOP rotate must persist cooldown before picking sibling");
  assert.equal(cooldowns[0]?.id, "agy-a");
  assert.equal(typeof cooldowns[0]?.untilMs, "number");
  assert.equal((cooldowns[0]?.untilMs ?? 0) > Date.now(), true);
});
