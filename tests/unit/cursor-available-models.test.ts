import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  ensureCursorAutoCatalogEntry,
  fetchCursorConnectionAvailableModels,
  normalizeCursorAvailableModelsPayload,
} from "../../src/lib/providerModels/cursorAvailableModels.ts";
import { resolveRequestedModel } from "../../open-sse/utils/cursorAgentProtobuf.ts";
import { __resetCursorApiKeyAuthForTest } from "../../open-sse/services/cursorApiKeyAuth.ts";

describe("normalizeCursorAvailableModelsPayload", () => {
  it("extracts models from models[] with name ids", () => {
    const models = normalizeCursorAvailableModelsPayload({
      models: [
        { name: "claude-opus-5-high", displayName: "Opus 5" },
        { name: "gpt-5.6-sol-high", displayName: "GPT-5.6 Sol" },
        { name: "disabled-model", disabled: true },
      ],
    });
    assert.equal(models[0].id, "auto");
    assert.ok(models.some((m) => m.id === "claude-opus-5-high"));
    assert.ok(models.some((m) => m.id === "claude-opus-5-high-1m"));
    assert.ok(models.some((m) => m.id === "gpt-5.6-sol-high"));
    assert.ok(models.some((m) => m.id === "gpt-5.6-sol-high-1m"));
    assert.ok(models.some((m) => m.id === "auto-cost"));
    assert.equal(models.find((m) => m.id === "claude-opus-5-high")?.name, "Opus 5");
    assert.equal(models.find((m) => m.id === "claude-opus-5-high")?.owned_by, "cursor");
    assert.equal(
      models.some((m) => m.id === "disabled-model"),
      false
    );
  });

  it("accepts string arrays and skips empties", () => {
    const models = normalizeCursorAvailableModelsPayload({
      availableModels: ["auto", "composer-2.5", "auto", ""],
    });
    assert.equal(models[0].id, "auto");
    assert.ok(models.some((m) => m.id === "composer-2.5"));
    assert.ok(models.some((m) => m.id === "auto-balance"));
    // Only one auto entry despite duplicate in payload
    assert.equal(models.filter((m) => m.id === "auto").length, 1);
  });

  it("aliases default to auto and keeps default", () => {
    const models = normalizeCursorAvailableModelsPayload({
      models: [{ name: "default", displayName: "Auto" }, { name: "composer-2.5" }],
    });
    assert.equal(models[0].id, "auto");
    assert.equal(models[0].name, "Auto");
    assert.ok(models.some((m) => m.id === "default"));
    assert.ok(models.some((m) => m.id === "composer-2.5"));
  });

  it("injects auto when payload has neither auto nor default", () => {
    const models = normalizeCursorAvailableModelsPayload({
      models: [{ name: "composer-2.5" }],
    });
    assert.equal(models[0].id, "auto");
    assert.match(models[0].name, /Auto/i);
  });

  it("injects auto into an empty usable list", () => {
    const models = normalizeCursorAvailableModelsPayload({ models: [] });
    assert.deepEqual(
      models.map((m) => m.id),
      ["auto", "auto-cost", "auto-balance", "auto-intelligence"]
    );
  });

  it("injects auto router variants alongside existing models", () => {
    const models = normalizeCursorAvailableModelsPayload({
      models: [{ name: "composer-2.5" }],
    });
    for (const id of ["auto", "auto-cost", "auto-balance", "auto-intelligence", "composer-2.5"]) {
      assert.ok(
        models.some((m) => m.id === id),
        `missing ${id}`
      );
    }
  });
});

describe("ensureCursorAutoCatalogEntry + resolveRequestedModel", () => {
  it("catalog auto stays aligned with wire default", () => {
    const models = ensureCursorAutoCatalogEntry([]);
    assert.equal(models[0].id, "auto");
    assert.deepEqual(resolveRequestedModel("auto"), { modelId: "default", parameters: [] });
  });

  it("auto-cost/balance/intelligence map to default + optimization parameter", () => {
    assert.deepEqual(resolveRequestedModel("auto-cost"), {
      modelId: "default",
      parameters: [{ id: "optimization", value: "cost" }],
    });
    assert.deepEqual(resolveRequestedModel("auto-balance"), {
      modelId: "default",
      parameters: [{ id: "optimization", value: "balance" }],
    });
    assert.deepEqual(resolveRequestedModel("auto-intelligence"), {
      modelId: "default",
      parameters: [{ id: "optimization", value: "intelligence" }],
    });
  });
});

describe("fetchCursorConnectionAvailableModels", () => {
  it("exchanges cursor-api credentials and treats only live account models as authoritative", async () => {
    __resetCursorApiKeyAuthForTest();
    const futureExp = Math.floor(Date.now() / 1000) + 3600;
    const part = (value: object) => Buffer.from(JSON.stringify(value)).toString("base64url");
    const sessionToken = `${part({ alg: "none" })}.${part({ exp: futureExp })}.sig`;
    const calls: Array<{ url: string; authorization: string }> = [];
    const fetchImpl = (async (input: string | URL | Request, init?: RequestInit) => {
      const url = String(input);
      const authorization = new Headers(init?.headers).get("authorization") || "";
      calls.push({ url, authorization });
      if (url.endsWith("/auth/exchange_user_api_key")) {
        return new Response(JSON.stringify({ accessToken: sessionToken, refreshToken: null }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }
      return new Response(
        JSON.stringify({
          models: [
            { name: "default", displayName: "Auto" },
            { name: "gpt-entitled", displayName: "Entitled GPT" },
            { name: "gpt-not-usable", displayName: "Unavailable GPT", usable: false },
          ],
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }) as typeof fetch;

    const models = await fetchCursorConnectionAvailableModels({
      apiKey: "crsr_live_capability_test",
      machineId: "machine-test",
      fetchImpl,
    });

    assert.equal(calls.length, 2);
    assert.match(calls[0].url, /\/auth\/exchange_user_api_key$/);
    assert.equal(calls[0].authorization, "Bearer crsr_live_capability_test");
    assert.doesNotMatch(calls[1].authorization, /crsr_live_capability_test/);
    assert.equal(calls[1].authorization, `Bearer ${sessionToken}`);
    assert.ok(models.some((model) => model.id === "auto"));
    assert.ok(models.some((model) => model.id === "gpt-entitled"));
    assert.equal(
      models.some((model) => model.id === "gpt-not-usable"),
      false
    );
  });
});
