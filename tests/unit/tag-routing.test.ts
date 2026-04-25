import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-tag-routing-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { getConnectionRoutingTags, matchesRoutingTags, resolveRequestRoutingTags } =
  await import("../../src/domain/tagRouter.ts");

function createLog() {
  return {
    info() {},
    warn() {},
    debug() {},
    error() {},
  };
}

function okResponse(content: string) {
  return new Response(
    JSON.stringify({
      choices: [{ message: { content } }],
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    }
  );
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(provider: string, name: string, tags: string[]) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name,
    apiKey: `sk-${name}`,
    providerSpecificData: { tags },
    isActive: true,
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("tag router normalizes request metadata and matches connection tags", () => {
  const resolved = resolveRequestRoutingTags({
    metadata: {
      tags: [" Fast ", "cheap", "FAST"],
      tag_match_mode: "all",
    },
  });

  assert.deepEqual(resolved.tags, ["fast", "cheap"]);
  assert.equal(resolved.matchMode, "all");
  assert.deepEqual(getConnectionRoutingTags({ tags: ["Cheap", "EU-Region"] }), [
    "cheap",
    "eu-region",
  ]);
  assert.equal(matchesRoutingTags(["cheap", "fast"], ["cheap"], "any"), true);
  assert.equal(matchesRoutingTags(["cheap"], ["cheap", "fast"], "all"), false);
});

test("handleComboChat filters priority targets by metadata.tags using any-match by default", async () => {
  const reliable = await seedConnection("openai", "reliable", ["reliable", "us-region"]);
  const cheap = await seedConnection("fireworks", "cheap", ["cheap", "fast"]);
  const attempts: Array<{ model: string; allowedConnectionIds: string[] | null }> = [];

  const response = await handleComboChat({
    body: {
      model: "router",
      messages: [{ role: "user", content: "route this cheaply" }],
      metadata: { tags: ["cheap"] },
    },
    combo: {
      name: "router",
      strategy: "priority",
      models: ["openai/gpt-4o-mini", "fireworks/gpt-4o-mini"],
    },
    handleSingleModel: async (_body, modelStr, target) => {
      attempts.push({
        model: modelStr,
        allowedConnectionIds: Array.isArray(target?.allowedConnectionIds)
          ? target.allowedConnectionIds
          : null,
      });
      return okResponse(modelStr);
    },
    log: createLog(),
  });

  const payload = (await response.json()) as any;
  assert.equal(response.status, 200);
  assert.equal(attempts.length, 1);
  assert.equal(attempts[0].model, "fireworks/gpt-4o-mini");
  assert.deepEqual(attempts[0].allowedConnectionIds, [cheap.id]);
  assert.equal(payload.choices[0].message.content, "fireworks/gpt-4o-mini");
  assert.notEqual(reliable.id, cheap.id);
});

test("handleComboChat honors tag_match_mode=all and falls back to the full target set when nothing matches", async () => {
  await seedConnection("openai", "openai-all", ["cheap", "fast"]);
  await seedConnection("fireworks", "fireworks-partial", ["cheap"]);

  const attemptsAll: string[] = [];
  const allModeResponse = await handleComboChat({
    body: {
      model: "router-all",
      messages: [{ role: "user", content: "need cheap and fast" }],
      metadata: { tags: ["cheap", "fast"], tag_match_mode: "all" },
    },
    combo: {
      name: "router-all",
      strategy: "priority",
      models: ["fireworks/gpt-4o-mini", "openai/gpt-4o-mini"],
    },
    handleSingleModel: async (_body, modelStr) => {
      attemptsAll.push(modelStr);
      return okResponse(modelStr);
    },
    log: createLog(),
  });

  assert.equal(allModeResponse.status, 200);
  assert.deepEqual(attemptsAll, ["openai/gpt-4o-mini"]);

  const attemptsFallback: string[] = [];
  const fallbackResponse = await handleComboChat({
    body: {
      model: "router-fallback",
      messages: [{ role: "user", content: "need eu-only" }],
      metadata: { tags: ["eu-only"] },
    },
    combo: {
      name: "router-fallback",
      strategy: "priority",
      models: ["openai/gpt-4o-mini", "fireworks/gpt-4o-mini"],
    },
    handleSingleModel: async (_body, modelStr) => {
      attemptsFallback.push(modelStr);
      return okResponse(modelStr);
    },
    log: createLog(),
  });

  assert.equal(fallbackResponse.status, 200);
  assert.deepEqual(attemptsFallback, ["openai/gpt-4o-mini"]);
});
