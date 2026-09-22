/**
 * Muse Code subscription Spark models must resolve to the Responses wire
 * format even though they carry no per-request apiFormat flag: a Chat
 * Completions client calling a Spark model through the gateway must get a
 * translated Responses body at the /responses endpoint, not a Chat payload.
 * Mirrors the opencode-zen/go Spark precedent (#10874, #11046).
 */
import test from "node:test";
import assert from "node:assert/strict";

import { resolveChatCoreTargetFormat } from "../../open-sse/handlers/chatCore/targetFormat.ts";
import { muse_codeProvider } from "../../open-sse/config/providers/registry/muse-code/index.ts";
import { deriveConfigFromRegistryModelsUrl } from "../../src/app/api/providers/[id]/models/discoveryConfig.ts";
import {
  getProviderById,
  AI_PROVIDERS,
  getProviderByAlias,
} from "../../src/shared/constants/providers.ts";
import { resolveStaticProviderCatalogEntry } from "../../src/lib/providers/catalog.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

const SUBSCRIPTION_SPARK_IDS = [
  "muse-spark-1.1",
  "muse-spark-1.2",
  "muse-spark-1.2-contributor",
  "muse-spark-1.3",
  "muse-spark-1.3-contributor",
];

test("subscription Spark models resolve to the Responses format on muse-code", () => {
  for (const id of SUBSCRIPTION_SPARK_IDS) {
    const r = resolveChatCoreTargetFormat({
      provider: "muse-code",
      resolvedModel: id,
      apiFormat: undefined,
      sourceFormat: "openai",
      customModelTargetFormat: undefined,
      providerSpecificData: null,
    });
    assert.equal(
      r.targetFormat,
      "openai-responses",
      `${id} must target the Responses API, not chat/completions`
    );
  }
});

test("subscription Spark models are statically tagged in the muse-code registry", () => {
  for (const id of SUBSCRIPTION_SPARK_IDS) {
    const model = muse_codeProvider.models.find((m) => m.id === id);
    assert.ok(model, `${id} should be registered in the muse-code provider`);
    assert.equal(model?.targetFormat, "openai-responses");
    assert.equal(model?.supportsReasoning, true);
    assert.ok(
      typeof model?.contextLength === "number" && (model?.contextLength ?? 0) > 0,
      `${id} must declare a context window`
    );
  }
});

test("muse-code registry derives a live discovery config for the Spark catalog", () => {
  const config = deriveConfigFromRegistryModelsUrl("muse-code");
  assert.ok(config, "muse-code must expose a discovery config from its registry entry");
  assert.equal(config?.url, "https://api.meta.ai/v1/models");
  assert.equal(config?.method, "GET");
});

test("muse-code keeps opaque reasoning transport for encrypted reasoning", () => {
  assert.equal(muse_codeProvider.reasoningTransport, "opaque");
});

test("muse-code resolves to one canonical OAuth-first catalog entry", () => {
  // The id exists in both the OAuth and API-key catalogs (the registry and
  // executor key on the shared id). Page-level consumers must see the OAuth
  // entry: it owns connection/auth metadata, the subscription-risk notice,
  // and the subscription auth hint, while API-key connections keep working
  // through the dual-auth affordances.
  const catalogEntry = resolveStaticProviderCatalogEntry("muse-code");
  assert.ok(catalogEntry, "muse-code must resolve in the static catalog");
  assert.equal(catalogEntry?.category, "oauth");
  assert.equal(catalogEntry?.displayAuthType, "oauth");
  assert.equal(catalogEntry?.subscriptionRisk, true);
  const byId = getProviderById("muse-code") as
    { id?: string; subscriptionRisk?: boolean } | undefined;
  assert.equal(byId?.id, "muse-code");
  assert.equal(byId?.subscriptionRisk, true);
  const merged = (AI_PROVIDERS as Record<string, { id?: string; subscriptionRisk?: boolean }>)[
    "muse-code"
  ];
  assert.equal(merged?.id, "muse-code");
  assert.equal(merged?.subscriptionRisk, true);
  assert.equal(getProviderByAlias("mc")?.id, "muse-code");
});

test("chat callers dispatch a Responses body for Spark models", () => {
  const translated = translateRequest(
    FORMATS.OPENAI,
    FORMATS.OPENAI_RESPONSES,
    "muse-spark-1.3-contributor",
    {
      model: "muse-spark-1.3-contributor",
      messages: [{ role: "user", content: "hi" }],
      tools: [
        {
          type: "function",
          function: { name: "get_time", description: "t", parameters: { type: "object" } },
        },
      ],
    },
    false,
    null,
    "muse-code"
  ) as Record<string, unknown>;
  assert.equal(translated.model, "muse-spark-1.3-contributor");
  assert.ok(!("messages" in translated), "no Chat payload may reach the Responses endpoint");
  const input = translated.input as Array<Record<string, unknown>>;
  assert.ok(Array.isArray(input) && input.length > 0);
  assert.equal(input[0].type, "message");
  const tools = translated.tools as Array<Record<string, unknown>>;
  assert.equal(tools?.[0]?.type, "function");
  assert.equal(tools?.[0]?.name, "get_time");
  assert.equal(translated.store, false);
});

test("second-turn tool results keep call ids and outputs for Spark models", () => {
  const translated = translateRequest(
    FORMATS.OPENAI,
    FORMATS.OPENAI_RESPONSES,
    "muse-spark-1.3",
    {
      model: "muse-spark-1.3",
      messages: [
        { role: "user", content: "hi" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            { id: "call_1", type: "function", function: { name: "get_time", arguments: "{}" } },
          ],
        },
        { role: "tool", tool_call_id: "call_1", content: "noon" },
      ],
      include: ["reasoning.encrypted_content"],
    },
    false,
    null,
    "muse-code"
  ) as Record<string, unknown>;
  const input = translated.input as Array<Record<string, unknown>>;
  const call = input.find((item) => item.type === "function_call") as
    Record<string, unknown> | undefined;
  const output = input.find((item) => item.type === "function_call_output") as
    Record<string, unknown> | undefined;
  assert.equal(call?.call_id, "call_1");
  assert.equal(call?.name, "get_time");
  assert.equal(output?.call_id, "call_1");
  assert.equal(output?.output, "noon");
  assert.deepEqual(translated.include, ["reasoning.encrypted_content"]);
});
