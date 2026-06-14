import test from "node:test";
import assert from "node:assert/strict";

import {
  parseKiroModels,
  resolveKiroRegion,
  buildKiroModelsEndpoints,
  fetchKiroAvailableModels,
} from "../../open-sse/services/kiroModels.ts";

const FALLBACK = [{ id: "auto-kiro", name: "Auto" }, { id: "claude-sonnet-4.6" }];

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

test("parseKiroModels reads CodeWhisperer ListAvailableModels shape", () => {
  const models = parseKiroModels({
    models: [
      { modelId: "auto", modelName: "Auto" },
      { modelId: "claude-sonnet-4.6", modelName: "Claude Sonnet 4.6" },
      { modelId: "claude-sonnet-4.6" }, // duplicate id is ignored
      { modelName: "no id" }, // missing id is skipped
    ],
  });

  assert.deepEqual(
    models.map((m) => m.id),
    ["auto", "claude-sonnet-4.6"]
  );
  assert.equal(models[1].name, "Claude Sonnet 4.6");
  assert.equal(models[0].owned_by, "kiro");
});

test("resolveKiroRegion prefers stored region, then profileArn, else us-east-1", () => {
  assert.equal(resolveKiroRegion({ region: "eu-central-1" }), "eu-central-1");
  assert.equal(
    resolveKiroRegion({ profileArn: "arn:aws:codewhisperer:eu-central-1:123:profile/X" }),
    "eu-central-1"
  );
  assert.equal(resolveKiroRegion({}), "us-east-1");
  assert.equal(resolveKiroRegion(null), "us-east-1");
});

test("buildKiroModelsEndpoints is region-matched with a us-east-1 fallback", () => {
  assert.deepEqual(buildKiroModelsEndpoints("us-east-1"), [
    "https://q.us-east-1.amazonaws.com/ListAvailableModels",
  ]);
  assert.deepEqual(buildKiroModelsEndpoints("eu-central-1"), [
    "https://q.eu-central-1.amazonaws.com/ListAvailableModels",
    "https://q.us-east-1.amazonaws.com/ListAvailableModels",
  ]);
});

test("fetchKiroAvailableModels: simple (Builder ID) account, us-east-1, origin-only", async () => {
  const calls: string[] = [];
  const fetchImpl = (async (url: string) => {
    calls.push(url);
    return jsonResponse({ models: [{ modelId: "claude-sonnet-4.6" }, { modelId: "auto" }] });
  }) as unknown as typeof fetch;

  const result = await fetchKiroAvailableModels({
    accessToken: "tok",
    providerSpecificData: {}, // no region, no profileArn → us-east-1, origin-only
    fetchImpl,
    fallbackModels: FALLBACK,
  });

  assert.equal(result.source, "api");
  assert.deepEqual(result.models.map((m) => m.id).sort(), ["auto", "claude-sonnet-4.6"]);
  assert.deepEqual(calls, [
    "https://q.us-east-1.amazonaws.com/ListAvailableModels?origin=AI_EDITOR",
  ]);
});

test("fetchKiroAvailableModels: IAM Identity Center account, region-matched endpoint", async () => {
  const calls: string[] = [];
  const fetchImpl = (async (url: string) => {
    calls.push(url);
    // First (region-matched) endpoint succeeds.
    return jsonResponse({ models: [{ modelId: "claude-opus-4.8", modelName: "Opus 4.8" }] });
  }) as unknown as typeof fetch;

  const result = await fetchKiroAvailableModels({
    accessToken: "tok",
    providerSpecificData: { region: "eu-central-1" },
    fetchImpl,
    fallbackModels: FALLBACK,
  });

  assert.equal(result.source, "api");
  assert.deepEqual(result.models.map((m) => m.id), ["claude-opus-4.8"]);
  assert.equal(calls[0], "https://q.eu-central-1.amazonaws.com/ListAvailableModels?origin=AI_EDITOR");
});

test("fetchKiroAvailableModels: retries with profileArn when origin-only fails", async () => {
  const calls: string[] = [];
  const fetchImpl = (async (url: string) => {
    calls.push(url);
    if (url.includes("profileArn=")) {
      return jsonResponse({ models: [{ modelId: "claude-sonnet-4.6" }] });
    }
    return jsonResponse({ message: "forbidden" }, 403);
  }) as unknown as typeof fetch;

  const result = await fetchKiroAvailableModels({
    accessToken: "tok",
    providerSpecificData: {
      region: "us-east-1",
      profileArn: "arn:aws:codewhisperer:us-east-1:123:profile/ABC",
    },
    fetchImpl,
    fallbackModels: FALLBACK,
  });

  assert.equal(result.source, "api");
  assert.deepEqual(result.models.map((m) => m.id), ["claude-sonnet-4.6"]);
  // origin-only attempted first, then profileArn retry.
  assert.equal(calls.length, 2);
  assert.ok(calls[0].endsWith("?origin=AI_EDITOR"));
  assert.ok(calls[1].includes("profileArn=arn%3Aaws%3Acodewhisperer"));
});

test("fetchKiroAvailableModels: falls back to static catalog when no token", async () => {
  const result = await fetchKiroAvailableModels({
    accessToken: "",
    providerSpecificData: {},
    fallbackModels: FALLBACK,
  });
  assert.equal(result.source, "fallback");
  assert.deepEqual(result.models.map((m) => m.id), ["auto-kiro", "claude-sonnet-4.6"]);
});

test("fetchKiroAvailableModels: falls back when every upstream attempt fails", async () => {
  const fetchImpl = (async () => jsonResponse({ message: "expired" }, 403)) as unknown as typeof fetch;
  const result = await fetchKiroAvailableModels({
    accessToken: "stale",
    providerSpecificData: { region: "us-east-1" },
    fetchImpl,
    fallbackModels: FALLBACK,
  });
  assert.equal(result.source, "fallback");
  assert.deepEqual(result.models.map((m) => m.id), ["auto-kiro", "claude-sonnet-4.6"]);
});
