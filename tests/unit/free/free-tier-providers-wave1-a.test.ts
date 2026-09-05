import assert from "node:assert/strict";
import test from "node:test";

import { poolsideProvider } from "../../../open-sse/config/providers/registry/poolside/index.ts";
import { unorouterProvider } from "../../../open-sse/config/providers/registry/unorouter/index.ts";
import { zyloApiProvider } from "../../../open-sse/config/providers/registry/zylo-api/index.ts";
import type { RegistryEntry } from "../../../open-sse/config/providers/shared.ts";

const providers: Array<{
  entry: RegistryEntry;
  id: string;
  alias: string;
  chatUrl: string;
  modelsUrl: string;
}> = [
  {
    entry: zyloApiProvider,
    id: "zylo-api",
    alias: "zylo",
    chatUrl: "https://api.zyloai.net/v1/chat/completions",
    modelsUrl: "https://api.zyloai.net/v1/models",
  },
  {
    entry: unorouterProvider,
    id: "unorouter",
    alias: "unorouter",
    chatUrl: "https://api.unorouter.com/v1/chat/completions",
    modelsUrl: "https://api.unorouter.com/v1/models",
  },
  {
    entry: poolsideProvider,
    id: "poolside",
    alias: "poolside",
    chatUrl: "https://inference.poolside.ai/v1/chat/completions",
    modelsUrl: "https://inference.poolside.ai/v1/models",
  },
];

for (const { entry, id, alias, chatUrl, modelsUrl } of providers) {
  test(`${id} uses the standard OpenAI-compatible API-key registry shape`, () => {
    assert.equal(entry.id, id);
    assert.equal(entry.alias, alias);
    assert.equal(entry.format, "openai");
    assert.equal(entry.executor, "default");
    assert.equal(entry.authType, "apikey");
    assert.equal(entry.authHeader, "bearer");
    assert.equal(entry.baseUrl, chatUrl);
    assert.equal(entry.modelsUrl, modelsUrl);
    assert.equal(entry.passthroughModels, true);
  });
}

// zylo-api and unorouter rely on the live catalog with no static seed (#9085).
for (const { entry, id } of providers.filter((p) => p.id !== "poolside")) {
  test(`${id} relies on its live catalog without invented static model ids`, () => {
    assert.deepEqual(entry.models, []);
  });
}

// Poolside ships the two authenticated-probe models (#10216) as static seeds —
// they are the exact IDs the live catalog returns (authenticated probe 2026-08-07,
// #9085), not invented. Assert them explicitly so a future catalog change is a
// deliberate update, not a silent drift.
test("poolside ships the probed Laguna Preview models, not invented ids", () => {
  const models = poolsideProvider.models;
  assert.ok(Array.isArray(models) && models.length > 0, "poolside should seed its probed catalog");
  const ids = models.map((m) => m.id);
  assert.deepEqual(ids, ["poolside/laguna-xs-2.1", "poolside/laguna-s-2.1"]);
});
