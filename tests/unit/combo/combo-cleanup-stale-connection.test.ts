import { describe, it, beforeEach } from "node:test";
import assert from "node:assert";

// Minimal combo DB mock for testing cleanupComboConnectionRefs
const combos = new Map<string, Record<string, unknown>>();

// Mock the combo DB layer
const mockDb = {
  async getCombos() {
    return [...combos.values()];
  },
  async updateCombo(id: string, data: Record<string, unknown>) {
    const existing = combos.get(id);
    if (!existing) return null;
    combos.set(id, { ...existing, ...data });
    return combos.get(id);
  },
};

// Same logic as cleanupComboConnectionRefs in combos.ts
async function cleanupComboConnectionRefs(connectionId: string) {
  const allCombos = await mockDb.getCombos();
  let touched = 0;
  for (const combo of allCombos) {
    if (!Array.isArray(combo.models)) continue;
    let changed = false;
    const models = (combo.models as Record<string, unknown>[]).map((step) => {
      let out = step;
      if (out.connectionId === connectionId) {
        const { connectionId: _, ...rest } = out;
        out = rest;
        changed = true;
      }
      if (Array.isArray(out.allowedConnectionIds)) {
        const filtered = out.allowedConnectionIds.filter(
          (id: string) => id !== connectionId
        );
        if (filtered.length !== out.allowedConnectionIds.length) {
          out = { ...out, allowedConnectionIds: filtered };
          changed = true;
        }
      }
      return out;
    });
    if (changed && typeof combo.id === "string") {
      await mockDb.updateCombo(combo.id, { models });
      touched++;
    }
  }
  return touched;
}

describe("cleanupComboConnectionRefs", () => {
  beforeEach(() => {
    combos.clear();
  });

  it("removes connectionId from combo model steps matching deleted connection", async () => {
    combos.set("combo-1", {
      id: "combo-1",
      name: "test-route",
      models: [
        { id: "s1", kind: "model", model: "gpt-4", connectionId: "conn-keep" },
        { id: "s2", kind: "model", model: "gemini-pro", connectionId: "conn-delete" },
      ],
    });

    const touched = await cleanupComboConnectionRefs("conn-delete");
    assert.equal(touched, 1);

    const combo = combos.get("combo-1")!;
    const models = combo.models as Record<string, unknown>[];
    assert.equal(models[0].connectionId, "conn-keep");
    assert.equal(models[1].connectionId, undefined);
    assert.equal(models[1].model, "gemini-pro");
  });

  it("removes deleted connectionId from allowedConnectionIds array", async () => {
    combos.set("combo-2", {
      id: "combo-2",
      name: "multi-route",
      models: [
        {
          id: "s1",
          kind: "model",
          model: "claude",
          allowedConnectionIds: ["conn-a", "conn-delete", "conn-b"],
        },
      ],
    });

    const touched = await cleanupComboConnectionRefs("conn-delete");
    assert.equal(touched, 1);

    const combo = combos.get("combo-2")!;
    const models = combo.models as Record<string, unknown>[];
    assert.deepEqual(models[0].allowedConnectionIds, ["conn-a", "conn-b"]);
  });

  it("skips combos with no matching connectionId", async () => {
    combos.set("combo-3", {
      id: "combo-3",
      name: "unrelated",
      models: [
        { id: "s1", kind: "model", model: "gpt-4", connectionId: "conn-other" },
      ],
    });

    const touched = await cleanupComboConnectionRefs("conn-delete");
    assert.equal(touched, 0);
  });

  it("skips combos with no models array", async () => {
    combos.set("combo-4", {
      id: "combo-4",
      name: "no-models",
    });

    const touched = await cleanupComboConnectionRefs("conn-delete");
    assert.equal(touched, 0);
  });
});

  it("removes connectionId from both connectionId and allowedConnectionIds on same step", async () => {
    combos.set("combo-5", {
      id: "combo-5",
      name: "dual-ref",
      models: [
        {
          id: "s1",
          kind: "model",
          model: "claude",
          connectionId: "conn-delete",
          allowedConnectionIds: ["conn-delete", "conn-keep"],
        },
      ],
    });

    const touched = await cleanupComboConnectionRefs("conn-delete");
    assert.equal(touched, 1);

    const combo = combos.get("combo-5")!;
    const models = combo.models as Record<string, unknown>[];
    assert.equal(models[0].connectionId, undefined);
    assert.deepEqual(models[0].allowedConnectionIds, ["conn-keep"]);
  });
