import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { once } from "node:events";

const networkFetch = globalThis.fetch;

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("suffix-effort-propagation");
const { handleChat, buildRequest, buildOpenAIResponse, seedConnection, combosDb } = harness;
const { persistDiscoveredModels } = await import("../../src/lib/providerModels/modelDiscovery.ts");
const { resolveModelOrError } = await import("../../src/sse/handlers/chatHelpers.ts");

const { setBackgroundDegradationConfig } =
  await import("../../open-sse/services/backgroundTaskDetector.ts");
const { setCustomAliases } = await import("../../open-sse/services/modelDeprecation.ts");

const MODEL = "agnes-3.0-flash";

test.beforeEach(async () => {
  await harness.resetStorage();
  const connection = await seedConnection("agnes");
  await persistDiscoveredModels("agnes", connection.id, [
    { id: MODEL, reasoning: { supported_efforts: ["none", "low", "high", "max"] } },
  ]);
});

test.after(async () => {
  await harness.cleanup();
});

test("resolution retains the validated suffix effort", async () => {
  const result = await resolveModelOrError(`agnes/${MODEL}-max`, {
    messages: [{ role: "user", content: "hello" }],
  });
  assert.equal(result.model, MODEL);
  assert.equal(result.resolvedThinkingEffort, "max");
});

for (const combo of [false, true]) {
  for (const effort of ["none", "max"]) {
    test(`${combo ? "combo" : "direct"} ${effort} suffix reaches the upstream body`, async () => {
      const target = `agnes/${MODEL}-${effort}`;
      const model = combo ? "suffix-effort-combo" : target;
      if (combo) {
        await combosDb.createCombo({ name: model, strategy: "priority", models: [target] });
      }
      const bodies: Record<string, unknown>[] = [];
      globalThis.fetch = async (_input, init) => {
        bodies.push(JSON.parse(String(init?.body)));
        return buildOpenAIResponse("The requested calculation is complete.", MODEL);
      };
      const response = await handleChat(
        buildRequest({
          body: {
            model,
            stream: false,
            messages: [{ role: "user", content: "Compute a short example." }],
          },
        })
      );
      assert.equal(response.status, 200, await response.text());
      assert.equal(bodies.length, 1);
      assert.equal(bodies[0].model, MODEL);
      assert.equal(bodies[0].reasoning_effort, effort);
    });
  }
}

test("explicit client effort still takes precedence over the suffix", async () => {
  let sent: Record<string, unknown> | undefined;
  globalThis.fetch = async (_input, init) => {
    sent = JSON.parse(String(init?.body));
    return buildOpenAIResponse("The requested calculation is complete.", MODEL);
  };
  const response = await handleChat(
    buildRequest({
      body: {
        model: `agnes/${MODEL}-max`,
        stream: false,
        reasoning_effort: "low",
        messages: [{ role: "user", content: "Compute a short example." }],
      },
    })
  );
  assert.equal(response.status, 200, await response.text());
  assert.equal(sent?.reasoning_effort, "low");
});

for (const choice of [{ reasoning: false }, { thinking: { type: "disabled" } }, {}]) {
  test(`unsuffixed or explicit reasoning stays unchanged: ${JSON.stringify(choice)}`, async () => {
    let sent: Record<string, unknown> | undefined;
    globalThis.fetch = async (_input, init) => {
      sent = JSON.parse(String(init?.body));
      return buildOpenAIResponse("The requested calculation is complete.", MODEL);
    };
    const response = await handleChat(
      buildRequest({
        body: {
          model: `agnes/${MODEL}${Object.keys(choice).length ? "-max" : ""}`,
          stream: false,
          ...choice,
          messages: [{ role: "user", content: "Compute a short example." }],
        },
      })
    );
    assert.equal(response.status, 200, await response.text());
    assert.equal(sent?.reasoning_effort, undefined);
    for (const [field, value] of Object.entries(choice)) assert.deepEqual(sent?.[field], value);
  });
}

test("connection default replacement does not inherit a bare alias suffix", async () => {
  await harness.resetStorage();
  const connection = await seedConnection("agnes");
  const { updateProviderConnection } = await import("../../src/lib/db/providers.ts");
  await updateProviderConnection(String(connection.id), {
    defaultModel: "agnes-default-replacement",
  });
  await persistDiscoveredModels("agnes", String(connection.id), [
    { id: MODEL, reasoning: { supported_efforts: ["high", "max"] } },
  ]);
  await harness.settingsDb.updateSettings({
    modelAliases: { "bare-effort-alias": `agnes/${MODEL}-max` },
  });
  let sent: Record<string, unknown> | undefined;
  globalThis.fetch = async (_input, init) => {
    sent = JSON.parse(String(init?.body));
    return buildOpenAIResponse("The replacement answered.", "agnes-default-replacement");
  };
  const resolved = await resolveModelOrError("bare-effort-alias", {
    messages: [{ role: "user", content: "hello" }],
  });
  assert.equal(resolved.resolvedThinkingEffort, "max");
  const response = await handleChat(
    buildRequest({
      body: {
        model: "bare-effort-alias",
        stream: false,
        messages: [{ role: "user", content: "Compute a short example." }],
      },
    })
  );
  assert.equal(response.status, 200, await response.text());
  assert.equal(sent?.model, "agnes-default-replacement");
  assert.equal(sent?.reasoning_effort, undefined);
});

test("a different combo provider does not inherit the original suffix", async () => {
  await seedConnection("openai");
  await combosDb.createCombo({
    name: "redirect-effort",
    strategy: "priority",
    models: [{ id: "redirect", kind: "model", providerId: "openai", model: `agnes/${MODEL}-max` }],
  });
  let sent: Record<string, unknown> | undefined;
  globalThis.fetch = async (_input, init) => {
    sent = JSON.parse(String(init?.body));
    return buildOpenAIResponse("The requested calculation is complete.", MODEL);
  };
  const response = await handleChat(
    buildRequest({
      body: {
        model: "redirect-effort",
        stream: false,
        messages: [{ role: "user", content: "Compute a short example." }],
      },
    })
  );
  assert.equal(response.status, 200, await response.text());
  assert.equal(sent?.reasoning_effort, undefined);
});

for (const redirect of ["background", "alias"]) {
  for (const explicit of [false, true]) {
    test(`${redirect} replacement drops suffix but preserves explicit effort: ${explicit}`, async () => {
      const replacement = "agnes-review-cheap";
      let sent: Record<string, unknown> | undefined;
      globalThis.fetch = async (_input, init) => {
        sent = JSON.parse(String(init?.body));
        return buildOpenAIResponse("The requested calculation is complete.", replacement);
      };
      try {
        if (redirect === "background") {
          setBackgroundDegradationConfig({
            enabled: true,
            degradationMap: { [MODEL]: replacement },
          });
        } else {
          setCustomAliases({ [MODEL]: replacement });
        }
        const response = await handleChat(
          buildRequest({
            headers: redirect === "background" ? { "x-task-type": "background" } : {},
            body: {
              model: `agnes/${MODEL}-max`,
              stream: false,
              ...(explicit ? { reasoning_effort: "low" } : {}),
              messages: [{ role: "user", content: "Compute a short example." }],
            },
          })
        );
        assert.equal(response.status, 200, await response.text());
        assert.equal(sent?.model, replacement);
        assert.equal(sent?.reasoning_effort, explicit ? "low" : undefined);
      } finally {
        setBackgroundDegradationConfig({ enabled: false, degradationMap: {} });
        setCustomAliases({});
      }
    });
  }
}

for (const failure of ["empty"]) {
  for (const mode of ["plain", "explicit", "suffix"]) {
    test(`${failure} family fallback preserves only explicit effort: ${mode}`, async () => {
      const provider = "cheaperinference";
      const model = "claude-sonnet-4.6";
      const fallback = "claude-sonnet-4.5";
      const connection = await seedConnection(provider);
      await persistDiscoveredModels(provider, connection.id, [
        { id: model, reasoning: { supported_efforts: ["low", "high"] } },
        { id: fallback, reasoning: { supported_efforts: ["low", "high"] } },
      ]);
      const bodies: Record<string, unknown>[] = [];
      globalThis.fetch = async (_url, init) => {
        const sent = JSON.parse(String(init?.body));
        bodies.push(sent);
        if (sent.model === model) return buildOpenAIResponse("", model);
        return buildOpenAIResponse("The requested example is complete.", sent.model);
      };
      const response = await handleChat(
        buildRequest({
          body: {
            model: `${provider}/${model}${mode === "suffix" ? "-high" : ""}`,
            stream: false,
            ...(mode === "explicit" ? { reasoning_effort: "low" } : {}),
            messages: [{ role: "user", content: "Explain a small example." }],
          },
        })
      );
      assert.equal(response.status, 200, await response.text());
      assert.equal(bodies[0].model, model);
      assert.equal(bodies.at(-1)?.model, fallback);
      assert.equal(
        bodies[0].reasoning_effort,
        mode === "suffix" ? "high" : mode === "explicit" ? "low" : undefined
      );
      assert.equal(bodies.at(-1)?.reasoning_effort, mode === "explicit" ? "low" : undefined);
    });
  }
}

test("server tool follow-up materializes suffix effort on the fresh translated transcript", async () => {
  const apiKey = await harness.seedApiKey();
  await harness.settingsDb.updateSettings({ skillsEnabled: true });
  const { encodeSkillToolName } = await import("../../src/lib/skills/injection.ts");
  harness.skillExecutor.registerHandler("attempt-weather", async () => ({ forecast: "sunny" }));
  await harness.skillRegistry.register({
    apiKeyId: apiKey.id,
    name: "lookupWeather",
    version: "1.0.0",
    description: "Weather fixture",
    schema: {
      input: { type: "object", properties: { location: { type: "string" } } },
      output: { type: "object" },
    },
    handler: "attempt-weather",
    enabled: true,
  });
  const previous = process.env.SERVER_OWNED_TOOL_LOOP_ENABLED;
  process.env.SERVER_OWNED_TOOL_LOOP_ENABLED = "true";
  const bodies: Record<string, unknown>[] = [];
  globalThis.fetch = async (_input, init) => {
    const sent = JSON.parse(String(init?.body));
    bodies.push(sent);
    if (bodies.length === 1)
      return harness.buildOpenAIToolCallResponse({
        model: MODEL,
        toolCallId: "attempt-weather-call",
        toolName: encodeSkillToolName("lookupWeather", "1.0.0"),
        argumentsObject: { location: "Tokyo" },
      });
    return buildOpenAIResponse("The weather is sunny.", MODEL);
  };
  try {
    const response = await handleChat(
      buildRequest({
        authKey: apiKey.key,
        body: {
          model: `agnes/${MODEL}-high`,
          stream: false,
          messages: [{ role: "user", content: "Use lookupWeather for Tokyo." }],
        },
      })
    );
    assert.equal(response.status, 200);
    const payload = await response.json();
    assert.equal(payload.choices[0].message.content, "The weather is sunny.");
    assert.equal(bodies.length, 2);
    assert.equal(bodies[0].reasoning_effort, "high");
    assert.equal(bodies[1].reasoning_effort, "high");
    const messages = bodies[1].messages as Array<Record<string, unknown>>;
    assert.ok(
      messages.some(
        (message) => message.role === "tool" && message.tool_call_id === "attempt-weather-call"
      )
    );
  } finally {
    if (previous === undefined) delete process.env.SERVER_OWNED_TOOL_LOOP_ENABLED;
    else process.env.SERVER_OWNED_TOOL_LOOP_ENABLED = previous;
  }
});

test("streaming direct refresh retry prepares effort after the pipeline refresh was exhausted", async () => {
  const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
  const bodies: Record<string, unknown>[] = [];
  const headers: Headers[] = [];
  let refreshes = 0;
  globalThis.fetch = async (input, init) => {
    if (String(input).startsWith("https://api.github.com/copilot_internal/v2/token")) {
      refreshes++;
      modelInfo.model = "mutated-caller-model";
      modelInfo.resolvedThinkingEffort = "low";
      return Response.json({
        token: `fixture-refresh-${refreshes}`,
        expires_at: Math.floor(Date.now() / 1000) + 3600,
      });
    }
    bodies.push(JSON.parse(String(init?.body)));
    headers.push(new Headers(init?.headers));
    if (bodies.length < 3)
      return Response.json({ error: { message: "Expired token" } }, { status: 401 });
    return new Response(
      `data: ${JSON.stringify({ id: "refresh-fixture", object: "chat.completion.chunk", choices: [{ index: 0, delta: { role: "assistant", content: "Refresh succeeded." }, finish_reason: "stop" }] })}\n\ndata: [DONE]\n\n`,
      { headers: { "Content-Type": "text/event-stream" } }
    );
  };
  const modelInfo = { provider: "github", model: "gpt-4o-mini", resolvedThinkingEffort: "high" };
  const result = await handleChatCore({
    body: {
      model: "gpt-4o-mini",
      stream: true,
      messages: [{ role: "user", content: "Exercise refresh retry." }],
    },
    modelInfo,
    credentials: {
      accessToken: "fixture-access",
      refreshToken: "fixture-refresh",
      providerSpecificData: { copilotToken: "fixture-initial" },
    },
    log: { debug() {}, info() {}, warn() {}, error() {} },
    onCredentialsRefreshed: async () => {},
    onRequestSuccess: undefined,
    onStreamFailure: undefined,
    onDisconnect: undefined,
    clientRawRequest: undefined,
    connectionId: undefined,
    userAgent: undefined,
    comboName: undefined,
  });
  assert.ok(!(result instanceof Response));
  assert.equal(result.success, true);
  assert.match(await result.response.text(), /Refresh succeeded/);
  assert.equal(bodies.length, 3);
  assert.equal(refreshes, 2);
  for (const body of bodies) assert.equal(body.reasoning_effort, "high");
  assert.equal(headers[2].get("authorization"), "Bearer fixture-refresh-2");
});

for (const pair of [
  ["high", "high"],
  ["low", "high"],
]) {
  test(`overlapping suffix requests ${pair.join("/")} preserve dedup identity over HTTP`, async () => {
    const bodies: Record<string, unknown>[] = [];
    const server = createServer(async (req, res) => {
      let text = "";
      for await (const chunk of req) text += chunk;
      const sent = JSON.parse(text);
      bodies.push(sent);
      await new Promise((resolve) => setTimeout(resolve, 350));
      res.setHeader("Content-Type", "application/json");
      res.end(
        await buildOpenAIResponse(`Completed with ${sent.reasoning_effort} effort.`, MODEL).text()
      );
    });
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    try {
      const address = server.address();
      assert.ok(address && typeof address !== "string");
      globalThis.fetch = (_input, init) =>
        networkFetch(`http://127.0.0.1:${address.port}/v1/chat/completions`, init);
      const responses = await Promise.all(
        pair.map((effort) =>
          handleChat(
            buildRequest({
              body: {
                model: `agnes/${MODEL}-${effort}`,
                stream: false,
                temperature: 0,
                messages: [{ role: "user", content: "Compute an overlapping example." }],
              },
            })
          )
        )
      );
      for (const [index, response] of responses.entries()) {
        assert.equal(response.status, 200);
        const payload = await response.json();
        assert.equal(payload.choices[0].message.content, `Completed with ${pair[index]} effort.`);
      }
      assert.equal(bodies.length, pair[0] === pair[1] ? 1 : 2);
      assert.deepEqual(bodies.map((b) => b.reasoning_effort).sort(), [...new Set(pair)].sort());
      for (const body of bodies) {
        assert.equal(body.originModel, undefined);
        assert.equal(body.resolvedThinkingEffort, undefined);
        assert.equal(body.defaultThinkingEffort, undefined);
        assert.equal(body.trustedContext, undefined);
      }
    } finally {
      server.closeAllConnections();
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve()))
      );
    }
  });
}

for (const pair of [
  ["high", "none"],
  ["none", "high"],
  ["high", "high"],
]) {
  test(`overlapping explicit requests ${pair.join("/")} preserve responses over HTTP`, async () => {
    const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
    const bodies: Record<string, unknown>[] = [];
    let firstArrived!: () => void;
    const arrival = new Promise<void>((resolve) => {
      firstArrived = resolve;
    });
    const server = createServer(async (req, res) => {
      let text = "";
      for await (const chunk of req) text += chunk;
      const sent = JSON.parse(text);
      bodies.push(sent);
      firstArrived();
      await new Promise((resolve) => setTimeout(resolve, 800));
      res.setHeader("Content-Type", "application/json");
      res.end(
        await buildOpenAIResponse(
          `Completed with ${sent.reasoning_effort} effort.`,
          "gpt-5.2"
        ).text()
      );
    });
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    const savedFetch = globalThis.fetch;
    try {
      const address = server.address();
      assert.ok(address && typeof address !== "string");
      globalThis.fetch = (_input, init) =>
        networkFetch(`http://127.0.0.1:${address.port}/v1/chat/completions`, init);
      const send = (reasoning_effort: string) =>
        handleChatCore({
          body: {
            model: "gpt-5.2",
            stream: false,
            temperature: 0,
            reasoning_effort,
            messages: [{ role: "user", content: "Compute an overlapping explicit example." }],
          },
          modelInfo: { provider: "openai", model: "gpt-5.2" },
          credentials: { apiKey: "fixture-explicit-local" },
          log: { debug() {}, info() {}, warn() {}, error() {} },
          onCredentialsRefreshed: undefined,
          onRequestSuccess: undefined,
          onStreamFailure: undefined,
          onDisconnect: undefined,
          clientRawRequest: undefined,
          connectionId: undefined,
          userAgent: undefined,
          comboName: undefined,
        });
      const first = send(pair[0]);
      await arrival;
      const results = await Promise.all([first, send(pair[1])]);
      for (const [index, result] of results.entries()) {
        const response = result instanceof Response ? result : result.response;
        assert.equal(response.status, 200);
        const payload = await response.json();
        assert.equal(payload.choices[0].message.content, `Completed with ${pair[index]} effort.`);
      }
      assert.equal(bodies.length, pair[0] === pair[1] ? 1 : 2);
      assert.deepEqual(
        bodies.map((b) => b.reasoning_effort),
        [...new Set(pair)]
      );
      for (const body of bodies) {
        assert.equal(body.temperature, body.reasoning_effort === "high" ? undefined : 0);
        assert.equal(body.requestIntent, undefined);
        assert.equal(body.trustedContext, undefined);
      }
    } finally {
      globalThis.fetch = savedFetch;
      server.closeAllConnections();
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve()))
      );
    }
  });
}

for (const accountFallback of [false, true]) {
  test(`max suffix survives ${accountFallback ? "account fallback" : "same-account retry"} over HTTP`, async () => {
    await seedConnection("agnes", { name: "agnes-backup", priority: 2 });
    const bodies: Record<string, unknown>[] = [];
    const identities = new Map<string, number>();
    const accountOrdinals: number[] = [];
    const server = createServer(async (req, res) => {
      const auth = String(req.headers.authorization || "");
      if (!identities.has(auth)) identities.set(auth, identities.size + 1);
      accountOrdinals.push(identities.get(auth)!);
      let text = "";
      for await (const chunk of req) text += chunk;
      bodies.push(JSON.parse(text));
      res.setHeader("Content-Type", "application/json");
      if (accountFallback ? identities.get(auth) === 1 : bodies.length === 1) {
        res.writeHead(429);
        res.end(JSON.stringify({ error: { message: "Rate limit exceeded" } }));
      } else {
        res.end(await buildOpenAIResponse("The requested calculation is complete.", MODEL).text());
      }
    });
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    try {
      const address = server.address();
      assert.ok(address && typeof address !== "string");
      globalThis.fetch = (_input, init) =>
        networkFetch(`http://127.0.0.1:${address.port}/v1/chat/completions`, init);
      const response = await handleChat(
        buildRequest({
          body: {
            model: `agnes/${MODEL}-max`,
            stream: false,
            messages: [{ role: "user", content: "Compute a short example." }],
          },
        })
      );
      assert.equal(response.status, 200, await response.text());
      assert.ok(!identities.has(""), "all requests must carry a credential");
      assert.equal(identities.size, accountFallback ? 2 : 1);
      assert.equal(accountOrdinals[0], 1);
      assert.equal(accountOrdinals.at(-1), accountFallback ? 2 : 1);
      if (!accountFallback) assert.equal(bodies.length, 2);
      for (const body of bodies) {
        assert.equal(body.model, MODEL);
        assert.equal(body.reasoning_effort, "max");
      }
    } finally {
      server.closeAllConnections();
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve()))
      );
    }
  });
}
