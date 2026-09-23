import "./_helpers/modelValidationEnvironment.ts";
import assert from "node:assert/strict";
import { once } from "node:events";
import { createServer, type Server } from "node:http";
import test, { type TestContext } from "node:test";
import { fetch as nativeFetch } from "undici";
import {
  BaseExecutor,
  type ExecuteInput,
  type StrictValidationDispatch,
} from "../../open-sse/executors/base.ts";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { DEFAULT_POOL_CONFIG } from "../../open-sse/services/sessionPool/types.ts";

const credentials = {
  connectionId: "validation-fixture",
  accessToken: "fixture-original-token",
};

function input(): ExecuteInput {
  return {
    model: "fixture-model",
    body: { model: "fixture-model", messages: [{ role: "user", content: "fixture" }] },
    stream: false,
    credentials: { ...credentials },
    skipUpstreamRetry: true,
  };
}

function strictDispatch(): StrictValidationDispatch {
  let attempts = 0;
  function reject(): never {
    throw new Error("strict dispatch rejected");
  }
  return {
    beforeFetch() {
      if (++attempts !== 1) reject();
    },
    reject,
  };
}

class RefreshingExecutor extends BaseExecutor {
  refreshes = 0;
  constructor() {
    super("openai", { baseUrl: "https://validation.invalid/v1/chat/completions" });
  }
  needsRefresh() {
    return true;
  }
  async refreshCredentials() {
    this.refreshes++;
    return { accessToken: "fixture-refreshed-token" };
  }
}

test("strict dispatch rejects proactive refresh before callback swallowing or HTTP", async (t) => {
  const executor = new RefreshingExecutor();
  let httpCalls = 0;
  let persistCalls = 0;
  t.mock.method(globalThis, "fetch", async () => {
    httpCalls++;
    return Response.json({ choices: [{ message: { content: "ok" } }] });
  });
  const request = {
    ...input(),
    validationDispatch: strictDispatch(),
    onCredentialsRefreshed() {
      persistCalls++;
      throw new Error("refresh forbidden");
    },
  };
  const outcome = await executor.execute(request).then(
    () => "accepted",
    (error: Error) => error.message
  );
  assert.deepEqual(
    { outcome, refreshes: executor.refreshes, persistCalls, httpCalls },
    { outcome: "strict dispatch rejected", refreshes: 0, persistCalls: 0, httpCalls: 0 }
  );
});

test("strict dispatch prevents a second physical HTTP call after recoverable 400", async (t) => {
  const executor = new BaseExecutor("openai", {
    baseUrl: "https://validation.invalid/v1/chat/completions",
  });
  let httpCalls = 0;
  t.mock.method(globalThis, "fetch", async () => {
    httpCalls++;
    return httpCalls === 1
      ? Response.json({ error: { message: "unexpected field chat_template" } }, { status: 400 })
      : Response.json({ choices: [{ message: { content: "ok" } }] });
  });
  const request = input();
  request.body = {
    model: request.model,
    messages: [{ role: "user", content: "fixture" }],
    chat_template: "fixture-template",
  };
  request.validationDispatch = strictDispatch();
  const outcome = await executor.execute(request).then(
    () => "accepted",
    (error: Error) => error.message
  );
  assert.deepEqual({ outcome, httpCalls }, { outcome: "strict dispatch rejected", httpCalls: 1 });
});

test("strict dispatch refuses session pools before creating or warming sessions", async (t) => {
  class PooledExecutor extends DefaultExecutor {
    poolAccesses = 0;
    constructor() {
      super("openai");
      this.poolConfig = { ...DEFAULT_POOL_CONFIG };
    }
    protected getPool(): never {
      this.poolAccesses++;
      throw new Error("session pool reached");
    }
  }
  const executor = new PooledExecutor();
  let httpCalls = 0;
  t.mock.method(globalThis, "fetch", async () => {
    httpCalls++;
    return Response.json({});
  });
  const outcome = await executor.execute({ ...input(), validationDispatch: strictDispatch() }).then(
    () => "accepted",
    (error: Error) => error.message
  );
  assert.deepEqual(
    { outcome, poolAccesses: executor.poolAccesses, httpCalls },
    { outcome: "strict dispatch rejected", poolAccesses: 0, httpCalls: 0 }
  );
});

test("strict dispatch refuses extra API keys before rotation mutates selection", async (t) => {
  const executor = new BaseExecutor("openai", {
    baseUrl: "https://validation.invalid/v1/chat/completions",
  });
  let httpCalls = 0;
  t.mock.method(globalThis, "fetch", async () => {
    httpCalls++;
    return Response.json({});
  });
  const request = input();
  request.credentials = {
    connectionId: "validation-rotation-fixture",
    apiKey: "fixture-primary-key",
    providerSpecificData: { extraApiKeys: ["fixture-secondary-key"] },
  };
  request.validationDispatch = strictDispatch();
  const outcome = await executor.execute(request).then(
    () => "accepted",
    (error: Error) => error.message
  );
  assert.deepEqual(
    { outcome, httpCalls, selectedKeyId: request.credentials.providerSpecificData?.selectedKeyId },
    { outcome: "strict dispatch rejected", httpCalls: 0, selectedKeyId: undefined }
  );
});

test("strict observer receives the exact final request before physical dispatch", async (t) => {
  const executor = new BaseExecutor("openai", {
    baseUrl: "https://validation.invalid/v1/chat/completions",
  });
  let observed: Parameters<StrictValidationDispatch["beforeFetch"]>[0] | undefined;
  let httpCalls = 0;
  t.mock.method(globalThis, "fetch", async (url: string, options: RequestInit) => {
    httpCalls++;
    assert.ok(observed);
    assert.equal(observed.provider, "openai");
    assert.equal(observed.model, "fixture-model");
    assert.equal(observed.credentials.connectionId, credentials.connectionId);
    assert.equal(observed.url, url);
    assert.deepEqual(observed.headers, options.headers);
    assert.equal(observed.body, options.body);
    return Response.json({});
  });
  await executor.execute({
    ...input(),
    validationDispatch: {
      ...strictDispatch(),
      beforeFetch(details) {
        observed = details;
      },
    },
  });
  assert.equal(httpCalls, 1);
});

test("cancellation inside the final observer prevents physical dispatch", async (t) => {
  const executor = new BaseExecutor("openai", {
    baseUrl: "https://validation.invalid/v1/chat/completions",
  });
  const controller = new AbortController();
  let httpCalls = 0;
  t.mock.method(globalThis, "fetch", async () => {
    httpCalls++;
    return Response.json({});
  });
  await assert.rejects(
    executor.execute({
      ...input(),
      signal: controller.signal,
      validationDispatch: {
        ...strictDispatch(),
        beforeFetch() {
          controller.abort(new Error("validation deadline expired"));
        },
      },
    }),
    /validation deadline expired/
  );
  assert.equal(httpCalls, 0);
});

test("normal traffic retains recoverable 400 retry without a strict observer", async (t) => {
  const executor = new BaseExecutor("openai", {
    baseUrl: "https://validation.invalid/v1/chat/completions",
  });
  let httpCalls = 0;
  t.mock.method(globalThis, "fetch", async () => {
    httpCalls++;
    return httpCalls === 1
      ? Response.json({ error: { message: "unexpected field chat_template" } }, { status: 400 })
      : Response.json({ choices: [{ message: { content: "ok" } }] });
  });
  const request = input();
  request.body = { model: request.model, chat_template: "fixture-template" };
  const result = await executor.execute(request);
  assert.equal(result.response.status, 200);
  assert.equal(httpCalls, 2);
});

test("normal traffic retains refresh behavior without a strict observer", async (t) => {
  const executor = new RefreshingExecutor();
  let httpCalls = 0;
  let persisted = 0;
  t.mock.method(globalThis, "fetch", async (_url: string, options: RequestInit) => {
    httpCalls++;
    assert.equal(
      new Headers(options.headers).get("authorization"),
      "Bearer fixture-refreshed-token"
    );
    return Response.json({});
  });
  await executor.execute({
    ...input(),
    onCredentialsRefreshed() {
      persisted++;
    },
  });
  assert.deepEqual(
    { refreshes: executor.refreshes, persisted, httpCalls },
    {
      refreshes: 1,
      persisted: 1,
      httpCalls: 1,
    }
  );
});

async function listenLocally(t: TestContext, server: Server) {
  t.after(async () => {
    server.closeAllConnections();
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  assert.ok(address && typeof address === "object");
  return `http://127.0.0.1:${address.port}/v1/chat/completions`;
}

async function redirectFixture(t: TestContext, status: number) {
  const calls = { source: 0, target: 0 };
  const targetUrl = await listenLocally(
    t,
    createServer((request, response) => {
      calls.target++;
      request.resume();
      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify({ choices: [{ message: { content: "fixture" } }] }));
    })
  );
  const sourceUrl = await listenLocally(
    t,
    createServer((request, response) => {
      calls.source++;
      request.resume();
      response.writeHead(status, { location: targetUrl });
      response.end();
    })
  );
  // Use the real HTTP transport only for two ephemeral loopback servers.
  // A genuinely local provider keeps production SSRF rules unchanged.
  t.mock.method(globalThis, "fetch", nativeFetch);
  return {
    calls,
    executor: new BaseExecutor("ollama", { baseUrl: sourceUrl, timeoutMs: 5_000 }),
  };
}

for (const status of [307, 308]) {
  test(`strict dispatch refuses real HTTP ${status} redirects before the second server`, async (t) => {
    const { executor, calls } = await redirectFixture(t, status);
    const outcome = await executor
      .execute({ ...input(), validationDispatch: strictDispatch() })
      .then(
        async (result) => {
          await result.response.text();
          return "accepted";
        },
        () => "rejected"
      );
    assert.deepEqual({ outcome, ...calls }, { outcome: "rejected", source: 1, target: 0 });
  });

  test(`normal dispatch still follows real HTTP ${status} redirects`, async (t) => {
    const { executor, calls } = await redirectFixture(t, status);
    const result = await executor.execute(input());
    await result.response.text();
    assert.equal(result.response.status, 200);
    assert.deepEqual(calls, { source: 1, target: 1 });
  });
}
