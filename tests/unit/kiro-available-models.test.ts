import test, { beforeEach } from "node:test";
import assert from "node:assert/strict";

import {
  parseKiroModels,
  resolveKiroRegion,
  buildKiroModelsEndpoints,
  fetchKiroAvailableModels,
  clearKiroModelCache,
} from "../../open-sse/services/kiroModels.ts";

const FALLBACK = [{ id: "auto-kiro", name: "Auto" }, { id: "claude-sonnet-4.5" }];

beforeEach(() => {
  clearKiroModelCache();
});

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

test("parseKiroModels reads CodeWhisperer ListAvailableModels shape", () => {
  const models = parseKiroModels({
    models: [
      {
        modelId: "auto",
        modelName: "Auto",
        description: "Automatically selects a model",
        rateMultiplier: 1,
        tokenLimits: { maxInputTokens: 1_000_000, maxOutputTokens: 64_000 },
      },
      { modelId: "claude-sonnet-4.5", modelName: "Claude Sonnet 4.5" },
      { modelId: "claude-sonnet-4.5" }, // duplicate id is ignored
      { modelName: "no id" }, // missing id is skipped
    ],
  });

  assert.deepEqual(
    models.map((m) => m.id),
    ["auto", "claude-sonnet-4.5"]
  );
  assert.equal(models[1].name, "Claude Sonnet 4.5");
  assert.equal(models[0].owned_by, "kiro");
  assert.equal(models[0].contextLength, 1_000_000);
  assert.equal(models[0].inputTokenLimit, 1_000_000);
  assert.equal(models[0].outputTokenLimit, 64_000);
  assert.equal(models[0].rateMultiplier, 1);
  assert.equal(models[0].description, "Automatically selects a model");
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

test("buildKiroModelsEndpoints prefers Kiro management and retains Amazon Q fallbacks", () => {
  assert.deepEqual(buildKiroModelsEndpoints("us-east-1"), [
    "https://management.us-east-1.kiro.dev/List-Available-Models",
    "https://q.us-east-1.amazonaws.com/ListAvailableModels",
  ]);
  assert.deepEqual(buildKiroModelsEndpoints("eu-central-1"), [
    "https://management.eu-central-1.kiro.dev/List-Available-Models",
    "https://q.eu-central-1.amazonaws.com/ListAvailableModels",
    "https://q.us-east-1.amazonaws.com/ListAvailableModels",
  ]);
});

test("fetchKiroAvailableModels: simple (Builder ID) account, us-east-1, origin-only", async () => {
  const calls: string[] = [];
  let requestHeaders = new Headers();
  const fetchImpl = (async (url: string, init?: RequestInit) => {
    calls.push(url);
    requestHeaders = new Headers(init?.headers);
    return jsonResponse({ models: [{ modelId: "claude-sonnet-4.5" }, { modelId: "auto" }] });
  }) as unknown as typeof fetch;

  const result = await fetchKiroAvailableModels({
    accessToken: "tok",
    providerSpecificData: {}, // no region, no profileArn → us-east-1, origin-only
    fetchImpl,
    fallbackModels: FALLBACK,
  });

  assert.equal(result.source, "api");
  assert.deepEqual(result.models.map((m) => m.id).sort(), ["auto", "claude-sonnet-4.5"]);
  assert.deepEqual(calls, [
    "https://management.us-east-1.kiro.dev/List-Available-Models?origin=AI_EDITOR",
  ]);
  assert.match(requestHeaders.get("user-agent") || "", /api\/kirocontrolplanebearer#1\.0\.0/);
  assert.match(requestHeaders.get("user-agent") || "", /KiroIDE-1\.0\.116-/);
  assert.match(requestHeaders.get("x-amz-user-agent") || "", /KiroIDE-1\.0\.116-/);
  assert.doesNotMatch(requestHeaders.get("user-agent") || "", /os\/windows#10\.0\.26200/);
});

test("fetchKiroAvailableModels: IAM Identity Center account, region-matched endpoint", async () => {
  const calls: string[] = [];
  const fetchImpl = (async (url: string) => {
    calls.push(url);
    // First (region-matched) endpoint succeeds.
    return jsonResponse({ models: [{ modelId: "claude-haiku-4.5", modelName: "Haiku 4.5" }] });
  }) as unknown as typeof fetch;

  const result = await fetchKiroAvailableModels({
    accessToken: "tok",
    providerSpecificData: { region: "eu-central-1" },
    fetchImpl,
    fallbackModels: FALLBACK,
  });

  assert.equal(result.source, "api");
  assert.deepEqual(
    result.models.map((m) => m.id),
    ["claude-haiku-4.5"]
  );
  assert.equal(
    calls[0],
    "https://management.eu-central-1.kiro.dev/List-Available-Models?origin=AI_EDITOR"
  );
});

test("fetchKiroAvailableModels: sends a stored profileArn on the first management request", async () => {
  const calls: string[] = [];
  const fetchImpl = (async (url: string) => {
    calls.push(url);
    if (url.includes("profileArn=")) {
      return jsonResponse({ models: [{ modelId: "claude-sonnet-4.5" }] });
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
  assert.deepEqual(
    result.models.map((m) => m.id),
    ["claude-sonnet-4.5"]
  );
  assert.equal(calls.length, 1);
  assert.ok(calls[0].startsWith("https://management.us-east-1.kiro.dev/"));
  assert.ok(calls[0].includes("profileArn=arn%3Aaws%3Acodewhisperer"));
});

test("fetchKiroAvailableModels: falls back to static catalog when no token", async () => {
  const result = await fetchKiroAvailableModels({
    accessToken: "",
    providerSpecificData: {},
    fallbackModels: FALLBACK,
  });
  assert.equal(result.source, "fallback");
  assert.deepEqual(
    result.models.map((m) => m.id),
    ["auto-kiro", "claude-sonnet-4.5"]
  );
});

test("fetchKiroAvailableModels: falls back when every upstream attempt fails", async () => {
  const fetchImpl = (async () =>
    jsonResponse({ message: "expired" }, 403)) as unknown as typeof fetch;
  const result = await fetchKiroAvailableModels({
    accessToken: "stale",
    providerSpecificData: { region: "us-east-1" },
    fetchImpl,
    fallbackModels: FALLBACK,
  });
  assert.equal(result.source, "fallback");
  assert.deepEqual(
    result.models.map((m) => m.id),
    ["auto-kiro", "claude-sonnet-4.5"]
  );
});
