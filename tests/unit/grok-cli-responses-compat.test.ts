import test from "node:test";
import assert from "node:assert/strict";

import { grok_cliProvider } from "../../open-sse/config/providers/registry/grok-cli/index.ts";
import {
  GROK_BUILD_DEFAULT_CONTEXT_WINDOW,
  getGrokBuildClientVersion,
  getGrokBuildUserAgent,
  GROK_BUILD_MODELS_URL,
} from "../../open-sse/config/grokBuild.ts";
import { getModelTargetFormat } from "../../open-sse/config/providerModels.ts";
import { PROVIDER_MODELS_CONFIG } from "../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts";
import { BaseExecutor } from "../../open-sse/executors/base.ts";
import { GrokCliExecutor } from "../../open-sse/executors/grok-cli.ts";

test("grok-cli exposes the authenticated grok-build model catalog", () => {
  assert.deepEqual(
    grok_cliProvider.models.map(({ id, name, contextLength, targetFormat }) => ({
      id,
      name,
      contextLength,
      targetFormat,
    })),
    [
      {
        id: "grok-4.5",
        name: "Grok 4.5",
        contextLength: 500000,
        targetFormat: "openai-responses",
      },
      {
        id: "grok-composer-2.5-fast",
        name: "Composer 2.5",
        contextLength: 200000,
        targetFormat: "openai-responses",
      },
    ]
  );
  assert.equal(getModelTargetFormat("gc", "grok-4.5"), "openai-responses");
  assert.equal(getModelTargetFormat("gc", "grok-composer-2.5-fast"), "openai-responses");
  assert.equal(grok_cliProvider.modelsUrl, GROK_BUILD_MODELS_URL);
});

test("grok-cli routes both models to the Responses endpoint", () => {
  const executor = new GrokCliExecutor();
  assert.equal(executor.buildUrl("grok-4.5", true), "https://cli-chat-proxy.grok.com/v1/responses");
  assert.equal(
    executor.buildUrl("grok-composer-2.5-fast", false),
    "https://cli-chat-proxy.grok.com/v1/responses"
  );
});

test("grok-cli sends the current grok-build session headers", () => {
  const executor = new GrokCliExecutor();
  const streaming = executor.buildHeaders(
    {
      accessToken: "token",
      providerSpecificData: { userId: "user-123", email: "grok@example.com" },
    },
    true,
    null,
    "grok-4.5"
  );
  assert.equal(streaming.Authorization, "Bearer token");
  assert.equal(streaming.Accept, "text/event-stream");
  assert.equal(streaming["x-grok-client-version"], getGrokBuildClientVersion());
  assert.equal(streaming["x-grok-client-identifier"], "grok-shell");
  assert.equal(streaming["x-grok-client-mode"], "headless");
  assert.equal(streaming["User-Agent"], getGrokBuildUserAgent());
  assert.equal(streaming["X-XAI-Token-Auth"], "xai-grok-cli");
  assert.equal(streaming["x-authenticateresponse"], "authenticate-response");
  assert.equal(streaming["x-grok-model-override"], "grok-4.5");
  assert.equal(streaming["x-userid"], "user-123");
  assert.equal(streaming["x-grok-user-id"], "user-123");
  assert.equal(streaming["x-email"], "grok@example.com");

  const team = executor.buildHeaders(
    {
      accessToken: "token",
      email: "member@example.com",
      providerSpecificData: {
        userId: "team-123",
        principalType: "Team",
      },
    },
    true,
    null,
    "grok-4.5"
  );
  assert.equal(team["x-userid"], "team-123");
  assert.equal("x-email" in team, false);

  const json = executor.buildHeaders({ apiKey: "token" }, false, null, "grok-composer-2.5-fast");
  assert.equal(json.Authorization, "Bearer token");
  assert.equal(json.Accept, "application/json");
  assert.equal(json["x-grok-model-override"], "grok-composer-2.5-fast");
});

test("grok-cli renders the official Windows platform name in its user agent", () => {
  if (process.platform !== "win32") return;
  assert.match(getGrokBuildUserAgent(), /\(windows; /);
});

test("grok-cli inherits BaseExecutor transport instead of buffering its own response", () => {
  assert.equal(Object.hasOwn(GrokCliExecutor.prototype, "execute"), false);
  assert.equal(new GrokCliExecutor().execute, BaseExecutor.prototype.execute);
});

test("grok-cli live model discovery uses the authenticated session contract", () => {
  const config = PROVIDER_MODELS_CONFIG["grok-cli"];
  assert.equal(config.url, GROK_BUILD_MODELS_URL);

  const headers = config.buildHeaders?.("token", {
    providerSpecificData: { userId: "user-123" },
    email: "grok@example.com",
  });
  assert.equal(headers?.Authorization, "Bearer token");
  assert.equal(headers?.["X-XAI-Token-Auth"], "xai-grok-cli");
  assert.equal(headers?.["x-userid"], "user-123");
  assert.equal(headers?.["x-email"], "grok@example.com");
  assert.equal(headers?.["x-grok-client-version"], getGrokBuildClientVersion());

  const teamHeaders = config.buildHeaders?.("token", {
    providerSpecificData: {
      userId: "team-123",
      email: "member@example.com",
      principalType: "Team",
    },
    email: "member@example.com",
  });
  assert.equal(teamHeaders?.["x-userid"], "team-123");
  assert.equal("x-email" in (teamHeaders || {}), false);

  const models = config.parseResponse({
    data: [
      {
        id: "catalog-alias",
        model: "grok-4.5",
        name: "Grok 4.5",
        contextWindow: 500000,
        apiBackend: "responses",
        supportsReasoningEffort: true,
      },
      {
        id: "hidden-experiment",
        model: "hidden-experiment",
        context_window: 1000,
        hidden: true,
      },
      {
        id: "legacy-chat-model",
        model: "legacy-chat-model",
        apiBackend: "chat_completions",
      },
      {
        id: "session-only-alias",
        name: "Session Only",
        apiBackend: "responses",
        supportedInApi: false,
        _meta: { model: "metadata-model-must-not-override-id" },
      },
    ],
  });

  assert.deepEqual(models, [
    {
      id: "grok-4.5",
      name: "Grok 4.5",
      owned_by: "grok-cli",
      inputTokenLimit: 500000,
      supportsThinking: true,
      apiFormat: "responses",
      supportedEndpoints: ["responses"],
    },
    {
      id: "session-only-alias",
      name: "Session Only",
      owned_by: "grok-cli",
      inputTokenLimit: GROK_BUILD_DEFAULT_CONTEXT_WINDOW,
      apiFormat: "responses",
      supportedEndpoints: ["responses"],
    },
  ]);
});
