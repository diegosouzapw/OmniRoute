import test from "node:test";
import assert from "node:assert/strict";

import { discoverVertexModelsWithApiKey } from "../../src/lib/providerModels/vertexModelDiscovery.ts";
import { parseVertexPublisherModels } from "../../src/lib/providerModels/vertexPublisherModelsParser.ts";

test("generic Vertex publisher parser produces routable IDs for every transport family", () => {
  const cases = [
    ["anthropic", "claude-sonnet-5", "claude", "claude-sonnet-5"],
    ["mistralai", "mistral-medium-3", "openai", "mistral-medium-3"],
    ["xai", "grok-4.6", "openai", "xai/grok-4.6"],
    [
      "meta",
      "llama-4-maverick-17b-128e-instruct-maas",
      "openai",
      "meta/llama-4-maverick-17b-128e-instruct-maas",
    ],
    ["deepseek-ai", "deepseek-v3.2-maas", "openai", "deepseek-ai/deepseek-v3.2-maas"],
    ["future-vendor", "future-chat-maas", "openai", "future-vendor/future-chat-maas"],
  ] as const;

  for (const [publisher, rawId, targetFormat, expectedId] of cases) {
    const models = parseVertexPublisherModels(
      {
        publisherModels: [
          {
            name: `publishers/${publisher}/models/${rawId}`,
            displayName: `Display ${rawId}`,
          },
        ],
      },
      publisher
    );

    assert.deepEqual(models, [
      {
        id: expectedId,
        name: `Display ${rawId}`,
        supportedEndpoints: ["chat"],
        targetFormat,
        owned_by: publisher,
      },
    ]);
  }
});

test("generic Vertex publisher parser accepts models and publisherModels envelopes", () => {
  assert.equal(
    parseVertexPublisherModels(
      { models: [{ id: "publishers/qwen/models/qwen3-next-80b-a3b-instruct-maas" }] },
      "qwen"
    )[0]?.id,
    "qwen/qwen3-next-80b-a3b-instruct-maas"
  );
  assert.deepEqual(parseVertexPublisherModels(null, "xai"), []);
  assert.deepEqual(parseVertexPublisherModels({ publisherModels: [null, {}] }, "xai"), []);
  assert.equal(
    parseVertexPublisherModels({ publisherModels: [{ id: "grok-4.6" }] }, "xai")[0]?.id,
    "xai/grok-4.6"
  );
  assert.deepEqual(
    parseVertexPublisherModels(
      {
        publisherModels: [
          {
            id: "self-deploy-only",
            supportedActions: { deploy: {} },
          },
        ],
      },
      "future-vendor"
    ),
    []
  );
  assert.equal(
    parseVertexPublisherModels(
      {
        publisherModels: [
          {
            name: "publishers/mistralai/models/mistral-medium-3",
            supportedActions: { requestAccess: {} },
          },
        ],
      },
      "mistralai"
    )[0]?.id,
    "mistral-medium-3"
  );
  assert.deepEqual(
    parseVertexPublisherModels(
      {
        publisherModels: [
          {
            name: "publishers/mistralai/models/mistral-ocr-2505",
            supportedActions: { requestAccess: {} },
          },
        ],
      },
      "mistralai"
    ),
    []
  );
});

test("Google publisher discovery keeps current Gemini chat models and filters media or retired IDs", () => {
  const models = parseVertexPublisherModels(
    {
      publisherModels: [
        { name: "publishers/google/models/gemini-3.7-flash" },
        { name: "publishers/google/models/gemini-3.8-flash" },
        { name: "publishers/google/models/gemini-3.1-pro-preview" },
        { name: "publishers/google/models/gemini-3.1-flash-image" },
        { name: "publishers/google/models/gemini-2.5-pro-tts" },
        { name: "publishers/google/models/gemini-1.5-pro-002" },
      ],
    },
    "google"
  );

  assert.deepEqual(
    models.map((model) => model.id),
    ["gemini-3.7-flash", "gemini-3.8-flash", "gemini-3.1-pro-preview"]
  );
  assert.ok(models.every((model) => model.targetFormat === undefined));
});

test("Vertex API-key discovery extracts its consumer project without probing Model Garden", async () => {
  const urls: string[] = [];
  const result = await discoverVertexModelsWithApiKey({
    apiKey: "authorization-key",
    fetchImpl: async (url, init) => {
      urls.push(url);
      assert.equal(new Headers(init.headers).get("x-goog-api-key"), "authorization-key");
      assert.ok(!url.includes("authorization-key"));

      return Response.json(
        {
          error: {
            details: [
              {
                "@type": "type.googleapis.com/google.rpc.ErrorInfo",
                metadata: { consumer: "projects/project-from-key" },
              },
            ],
          },
        },
        { status: 403 }
      );
    },
  });

  assert.deepEqual(result.models, []);
  assert.equal(result.projectId, "project-from-key");
  assert.equal(urls.length, 1);
  assert.ok(urls[0].includes("generativelanguage.googleapis.com"));
  assert.ok(!urls[0].includes("/publishers/"));
});
