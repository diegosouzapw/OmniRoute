import { describe, it, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const moduleDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-model-capability-overrides-"));
process.env.DATA_DIR = moduleDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const caps = await import("../../src/lib/modelCapabilities.ts");
const overrides = await import("../../src/lib/db/modelCapabilityOverrides.ts");
const contextOverrides = await import("../../src/lib/db/modelContextOverrides.ts");
const route = await import("../../src/app/api/model-capability-overrides/route.ts");

beforeEach(() => {
  coreDb.resetDbInstance();
  fs.rmSync(moduleDataDir, { recursive: true, force: true });
  fs.mkdirSync(moduleDataDir, { recursive: true });
  coreDb.getDbInstance();
});

after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(moduleDataDir, { recursive: true, force: true });
});

function patchOverride(key: string, value: unknown) {
  return route.PATCH(
    new Request("http://localhost/api/model-capability-overrides", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ target: "codex/gpt-5.6", key, value }),
    })
  );
}

describe("model capability overrides", () => {
  it("stores, lists, removes, and applies an exact max_output_tokens override", () => {
    const withoutOverride = caps.getResolvedModelCapabilities({
      provider: "openai",
      model: "gpt-4o",
    }).maxOutputTokens;
    const distinct = (withoutOverride ?? 0) + 12345;

    assert.equal(
      overrides.setModelCapabilityOverride("openai/gpt-4o", "max_output_tokens", distinct),
      true
    );
    assert.deepEqual(
      overrides.listModelCapabilityOverrides().map((entry) => ({
        target: entry.target,
        key: entry.key,
        value: entry.value,
      })),
      [{ target: "openai/gpt-4o", key: "max_output_tokens", value: distinct }]
    );
    assert.equal(
      caps.getResolvedModelCapabilities({ provider: "openai", model: "gpt-4o" }).maxOutputTokens,
      distinct
    );
    assert.notEqual(
      caps.getResolvedModelCapabilities({ provider: "anthropic", model: "gpt-4o" }).maxOutputTokens,
      distinct
    );
    assert.equal(
      overrides.removeModelCapabilityOverride("openai/gpt-4o", "max_output_tokens"),
      true
    );
    assert.equal(
      caps.getResolvedModelCapabilities({ provider: "openai", model: "gpt-4o" }).maxOutputTokens,
      withoutOverride
    );
  });

  it("uses exact input/output overrides, clamps input to context, and isolates effort variants", () => {
    const target = "codex/gpt-5.6";
    const variant = "codex/gpt-5.6-high";
    assert.equal(contextOverrides.setModelContextOverride("codex", "gpt-5.6", 372000), true);
    assert.equal(overrides.setModelCapabilityOverride(target, "max_input_tokens", 999999), true);
    assert.equal(overrides.setModelCapabilityOverride(target, "max_output_tokens", 123456), true);

    const base = caps.getResolvedModelCapabilities(target);
    assert.deepEqual(
      {
        contextWindow: base.contextWindow,
        maxInputTokens: base.maxInputTokens,
        maxOutputTokens: base.maxOutputTokens,
      },
      { contextWindow: 372000, maxInputTokens: 372000, maxOutputTokens: 123456 }
    );
    assert.equal(overrides.removeModelCapabilityOverride(target, "max_output_tokens"), true);
    assert.notEqual(caps.getResolvedModelCapabilities(target).maxOutputTokens, 123456);

    const effort = caps.getResolvedModelCapabilities(variant);
    assert.notEqual(effort.contextWindow, 372000);
    assert.notEqual(effort.maxInputTokens, 372000);
    assert.notEqual(effort.maxOutputTokens, 123456);
  });

  it("applies overrides stored under provider-scoped model aliases", () => {
    assert.equal(
      overrides.setModelCapabilityOverride("github/claude-opus-4.5", "max_output_tokens", 77777),
      true
    );
    assert.equal(
      caps.getResolvedModelCapabilities({ provider: "github", model: "claude-opus-4.5" })
        .maxOutputTokens,
      77777
    );
  });

  it("accepts exactly the three public token-limit keys through the API", async () => {
    assert.equal(
      contextOverrides.setModelContextOverride("codex", "gpt-5.6", 272000, "auto:discovery"),
      true
    );
    const discoveredResponse = await route.GET(
      new Request("http://localhost/api/model-capability-overrides")
    );
    const discoveredPayload = (await discoveredResponse.json()) as {
      overrides: Array<{ target: string; key: string; value: number }>;
    };
    assert.ok(
      discoveredPayload.overrides.some(
        (override) =>
          override.target === "codex/gpt-5.6" &&
          override.key === "context_length" &&
          override.value === 272000
      ),
      "the unified surface exposes an auto-discovered context window before manual replacement"
    );

    assert.equal((await patchOverride("context_length", 372000)).status, 200);
    assert.equal((await patchOverride("max_input_tokens", 353400)).status, 200);
    assert.equal((await patchOverride("max_output_tokens", 128000)).status, 200);
    assert.equal((await patchOverride("max_token", 77777)).status, 400, "legacy key");
    assert.equal((await patchOverride("unknown", 1)).status, 400, "unsupported key");
    assert.equal((await patchOverride("max_input_tokens", 0)).status, 400, "non-positive integer");
    assert.equal(
      (await patchOverride("max_input_tokens", Number.POSITIVE_INFINITY)).status,
      400,
      "JSON serializes Infinity as null; route rejects the resulting non-number"
    );

    const response = await route.GET(
      new Request("http://localhost/api/model-capability-overrides")
    );
    const payload = (await response.json()) as {
      overrides: Array<{ target: string; key: string; value: number }>;
    };
    assert.deepEqual(
      payload.overrides
        .map(({ target, key, value }) => ({ target, key, value }))
        .sort((left, right) => left.key.localeCompare(right.key)),
      [
        { target: "codex/gpt-5.6", key: "context_length", value: 372000 },
        { target: "codex/gpt-5.6", key: "max_input_tokens", value: 353400 },
        { target: "codex/gpt-5.6", key: "max_output_tokens", value: 128000 },
      ]
    );

    assert.equal(
      contextOverrides.getModelContextOverrideRecord("codex", "gpt-5.6")?.source,
      "manual"
    );

    const resolved = caps.getResolvedModelCapabilities("codex/gpt-5.6");
    assert.deepEqual(
      {
        contextWindow: resolved.contextWindow,
        maxInputTokens: resolved.maxInputTokens,
        maxOutputTokens: resolved.maxOutputTokens,
      },
      { contextWindow: 372000, maxInputTokens: 353400, maxOutputTokens: 128000 }
    );

    const removed = await route.DELETE(
      new Request(
        "http://localhost/api/model-capability-overrides?target=codex/gpt-5.6&key=context_length",
        { method: "DELETE" }
      )
    );
    assert.equal(removed.status, 200);
    assert.equal(contextOverrides.getModelContextOverride("codex", "gpt-5.6"), null);

    const rejectedDelete = await route.DELETE(
      new Request(
        "http://localhost/api/model-capability-overrides?target=codex/gpt-5.6&key=max_token",
        { method: "DELETE" }
      )
    );
    assert.equal(rejectedDelete.status, 400);
  });

  it("rejects invalid targets and non-positive values", () => {
    assert.equal(overrides.setModelCapabilityOverride("gpt-4o", "max_output_tokens", 1000), false);
    assert.equal(
      overrides.setModelCapabilityOverride("openai/gpt-4o", "max_output_tokens", 0),
      false
    );
    assert.equal(
      overrides.setModelCapabilityOverride("openai/gpt-4o", "max_output_tokens", 1.5),
      false
    );
    assert.deepEqual(overrides.listModelCapabilityOverrides(), []);
  });

  it("migrates legacy max_token rows without replacing a modern output override", () => {
    const db = coreDb.getDbInstance();
    const insert = db.prepare(
      "INSERT INTO model_capability_overrides " +
        "(provider, model_id, override_key, override_value, refreshed_at) VALUES (?, ?, ?, ?, ?)"
    );
    insert.run("legacy", "legacy-only", "max_token", "64000", "2026-01-01 00:00:00");
    insert.run("legacy", "collision", "max_token", "64000", "2026-01-01 00:00:00");
    insert.run("legacy", "collision", "max_output_tokens", "128000", "2026-02-01 00:00:00");

    const migration = fs.readFileSync(
      path.resolve("src/lib/db/migrations/135_migrate_model_capability_max_token.sql"),
      "utf8"
    );
    db.exec(migration);
    db.exec(migration);

    assert.deepEqual(
      db
        .prepare(
          "SELECT provider, model_id, override_key, override_value, refreshed_at " +
            "FROM model_capability_overrides WHERE provider = 'legacy' " +
            "ORDER BY model_id, override_key"
        )
        .all(),
      [
        {
          provider: "legacy",
          model_id: "collision",
          override_key: "max_output_tokens",
          override_value: "128000",
          refreshed_at: "2026-02-01 00:00:00",
        },
        {
          provider: "legacy",
          model_id: "legacy-only",
          override_key: "max_output_tokens",
          override_value: "64000",
          refreshed_at: "2026-01-01 00:00:00",
        },
      ]
    );
  });
});
