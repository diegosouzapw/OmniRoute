import assert from "node:assert/strict";
import test from "node:test";

import type {
  ComboRepository,
  ModelComboMappingRepository,
} from "../../../src/domain/persistence/comboRepositories.ts";

export interface ComboRepositoryHarness {
  combos: ComboRepository;
  mappings: ModelComboMappingRepository;
  reset(): Promise<void>;
  corruptComboPayload(comboId: string): Promise<void>;
}

export function registerComboRepositoryConformance(
  createHarness: () => Promise<ComboRepositoryHarness>
): void {
  test("combo repository: CRUD, defaults, lookup, count, and pagination", async () => {
    const harness = await createHarness();
    await harness.reset();

    const zulu = await harness.combos.create({
      name: "Zulu",
      models: [{ provider: "openai", model: "gpt-4.1" }],
    });
    const alpha = await harness.combos.create({
      name: "Alpha",
      models: [{ provider: "anthropic", model: "claude-3-7-sonnet" }],
    });

    assert.equal(zulu.version, 2);
    assert.equal(zulu.strategy, "priority");
    assert.equal(zulu.sortOrder, 1);
    assert.equal(alpha.sortOrder, 2);
    assert.equal(await harness.combos.count(), 2);
    assert.deepEqual(await harness.combos.findById(String(zulu.id)), zulu);
    assert.deepEqual(await harness.combos.findByName("Zulu"), zulu);
    assert.equal(await harness.combos.findByName("zulu"), null);
    assert.deepEqual(await harness.combos.findByNameInsensitive("zulu"), zulu);

    const page = await harness.combos.list(1, 1);
    assert.deepEqual(
      page.map((combo) => combo.name),
      ["Alpha"]
    );
  });

  test("combo repository: partial update, explicit null deletion, and missing rows", async () => {
    const harness = await createHarness();
    await harness.reset();

    const created = await harness.combos.create({
      name: "Mutable",
      description: "remove me",
      models: [{ provider: "openai", model: "gpt-4.1" }],
      config: { retries: 1 },
    });

    const updateResult = await harness.combos.update(String(created.id), {
      description: null,
      strategy: "round-robin",
      config: { retries: 3 },
    });

    assert.ok(updateResult);
    const updated = updateResult.combo;
    assert.equal(updated.id, created.id);
    assert.equal(updated.name, "Mutable");
    assert.equal("description" in updated, false);
    assert.equal(updated.strategy, "round-robin");
    assert.deepEqual(updated.config, { retries: 3 });
    assert.equal(updateResult.previousName, "Mutable");
    assert.equal(updateResult.currentName, "Mutable");
    assert.equal(updateResult.modelsFieldProvided, false);
    assert.equal(await harness.combos.update("missing", { strategy: "priority" }), null);
  });

  test("combo repository: reorder is atomic and delete reports affected-row semantics", async () => {
    const harness = await createHarness();
    await harness.reset();

    const alpha = await harness.combos.create({
      name: "Alpha",
      models: [{ provider: "openai", model: "gpt-4.1" }],
    });
    const bravo = await harness.combos.create({
      name: "Bravo",
      models: [{ provider: "anthropic", model: "claude-3-7-sonnet" }],
    });
    const charlie = await harness.combos.create({
      name: "Charlie",
      models: [{ provider: "google", model: "gemini-2.5-pro" }],
    });

    const reorderResult = await harness.combos.reorder([
      String(charlie.id),
      "unknown",
      String(charlie.id),
      String(alpha.id),
    ]);
    const reordered = reorderResult.combos;
    assert.equal(reorderResult.rowsReordered, 3);
    assert.deepEqual(
      reordered.map((combo) => combo.name),
      ["Charlie", "Alpha", "Bravo"]
    );
    assert.deepEqual(
      reordered.map((combo) => combo.sortOrder),
      [1, 2, 3]
    );

    assert.equal(await harness.combos.deleteById("missing"), false);
    assert.equal(await harness.combos.deleteById(String(bravo.id)), true);
    assert.equal(await harness.combos.deleteById(String(bravo.id)), false);

    await harness.corruptComboPayload(String(alpha.id));
    await harness.corruptComboPayload(String(charlie.id));
    const corruptResult = await harness.combos.reorder([String(alpha.id), String(charlie.id)]);
    assert.equal(corruptResult.rowsReordered, 2);
    assert.deepEqual(corruptResult.combos, []);
  });

  test("model mapping repository: CRUD, ordering, pagination, and atomic cascade", async () => {
    const harness = await createHarness();
    await harness.reset();

    const comboA = await harness.combos.create({
      name: "alpha",
      models: [{ provider: "openai", model: "gpt-4o" }],
    });
    const comboB = await harness.combos.create({
      name: "beta",
      models: [{ provider: "openai", model: "gpt-4o-mini" }],
    });

    const first = await harness.mappings.create({
      pattern: "gpt-*",
      comboId: String(comboA.id),
      priority: 20,
      description: "primary",
    });
    const second = await harness.mappings.create({
      pattern: "claude-*",
      comboId: String(comboB.id),
      priority: 10,
      enabled: false,
    });

    const all = await harness.mappings.list();
    assert.equal(all.total, 2);
    assert.deepEqual(
      all.items.map((mapping) => mapping.id),
      [first.id, second.id]
    );
    assert.equal(all.items[0].comboName, "alpha");
    assert.equal(all.items[0].enabled, true);
    assert.equal(all.items[1].comboName, "beta");
    assert.equal(all.items[1].enabled, false);

    const page = await harness.mappings.list({ limit: 1, offset: 1 });
    assert.equal(page.total, 2);
    assert.deepEqual(
      page.items.map((mapping) => mapping.id),
      [second.id]
    );

    const updated = await harness.mappings.update(first.id, {
      pattern: "openai/*",
      comboId: String(comboB.id),
      enabled: false,
      description: "rerouted",
    });
    assert.ok(updated);
    assert.equal(updated.pattern, "openai/*");
    assert.equal(updated.comboId, comboB.id);
    assert.equal(updated.comboName, "beta");
    assert.equal(updated.enabled, false);
    assert.equal(updated.description, "rerouted");
    assert.equal(await harness.mappings.update("missing", { pattern: "*" }), null);

    assert.equal(await harness.mappings.deleteById(first.id), true);
    assert.equal(await harness.mappings.deleteById(first.id), false);

    // The SQLite foreign key performs the combo + related mapping removal in
    // one statement/transaction; portable backends must preserve that behavior.
    assert.equal(await harness.combos.deleteById(String(comboB.id)), true);
    assert.equal(await harness.mappings.findById(second.id), null);
    assert.equal((await harness.mappings.list()).total, 0);
  });

  test("model mapping repository: resolution skips disabled, inactive, and corrupt combos", async () => {
    const harness = await createHarness();
    await harness.reset();

    const broken = await harness.combos.create({
      name: "broken",
      models: [{ provider: "openai", model: "gpt-4o" }],
    });
    const inactive = await harness.combos.create({
      name: "inactive",
      models: [{ provider: "openai", model: "gpt-4.1" }],
      isActive: false,
    });
    const selected = await harness.combos.create({
      name: "selected",
      models: [{ provider: "openai", model: "gpt-4o-mini" }],
    });

    await harness.mappings.create({
      pattern: "gpt-*",
      comboId: String(broken.id),
      priority: 30,
    });
    await harness.mappings.create({
      pattern: "gpt-*",
      comboId: String(inactive.id),
      priority: 20,
    });
    await harness.mappings.create({
      pattern: "gpt-*",
      comboId: String(selected.id),
      priority: 10,
    });
    await harness.mappings.create({
      pattern: "gpt-*",
      comboId: String(selected.id),
      priority: 100,
      enabled: false,
    });

    assert.ok(harness.corruptComboPayload);
    await harness.corruptComboPayload(String(broken.id));

    const resolved = await harness.mappings.resolveForModel("gpt-4o");
    assert.ok(resolved);
    assert.equal(resolved.name, "selected");
    assert.equal(await harness.mappings.resolveForModel("claude-sonnet"), null);
  });
}
