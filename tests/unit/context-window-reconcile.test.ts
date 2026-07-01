import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  reconcileContextWindows,
  type DiscoveredWindow,
  type ReconcileDeps,
} from "../../src/lib/contextWindowResolver.ts";

// Feature 5004 — pure reconcile logic (auto:discovery overrides), deps injected.

function makeDeps(
  catalog: Record<string, number | null>,
  existing: Record<string, string> = {}
) {
  const writes: Array<[string, string, number]> = [];
  const removes: Array<[string, string]> = [];
  const deps: ReconcileDeps = {
    getCatalogWindow: (p, m) => (`${p}/${m}` in catalog ? catalog[`${p}/${m}`] : null),
    getExistingSource: (p, m) => existing[`${p}/${m}`] ?? null,
    writeAuto: (p, m, w) => writes.push([p, m, w]),
    removeOverride: (p, m) => removes.push([p, m]),
  };
  return { deps, writes, removes };
}

describe("reconcileContextWindows (5004)", () => {
  it("writes an auto override when the discovered window diverges from the catalog", () => {
    const discovered: DiscoveredWindow[] = [{ provider: "openai", modelId: "gpt-x", window: 400000 }];
    const { deps, writes } = makeDeps({ "openai/gpt-x": 128000 });
    const r = reconcileContextWindows(discovered, deps);
    assert.deepEqual(writes, [["openai", "gpt-x", 400000]]);
    assert.equal(r.written, 1);
    assert.equal(r.scanned, 1);
  });

  it("does nothing when the discovered window already matches the catalog", () => {
    const discovered: DiscoveredWindow[] = [{ provider: "openai", modelId: "gpt-x", window: 128000 }];
    const { deps, writes, removes } = makeDeps({ "openai/gpt-x": 128000 });
    const r = reconcileContextWindows(discovered, deps);
    assert.deepEqual(writes, []);
    assert.deepEqual(removes, []);
    assert.equal(r.written, 0);
  });

  it("self-heals: removes a stale auto override once the catalog catches up", () => {
    const discovered: DiscoveredWindow[] = [{ provider: "openai", modelId: "gpt-x", window: 128000 }];
    const { deps, removes } = makeDeps({ "openai/gpt-x": 128000 }, { "openai/gpt-x": "auto:discovery" });
    const r = reconcileContextWindows(discovered, deps);
    assert.deepEqual(removes, [["openai", "gpt-x"]]);
    assert.equal(r.removed, 1);
  });

  it("never overwrites or removes a manual override", () => {
    const discovered: DiscoveredWindow[] = [{ provider: "openai", modelId: "gpt-x", window: 999999 }];
    const { deps, writes, removes } = makeDeps({ "openai/gpt-x": 128000 }, { "openai/gpt-x": "manual" });
    const r = reconcileContextWindows(discovered, deps);
    assert.deepEqual(writes, []);
    assert.deepEqual(removes, []);
    assert.equal(r.skippedManual, 1);
    assert.equal(r.written, 0);
  });

  it("skips invalid windows and empty keys", () => {
    const discovered: DiscoveredWindow[] = [
      { provider: "openai", modelId: "a", window: 0 },
      { provider: "openai", modelId: "b", window: -5 },
      { provider: "openai", modelId: "c", window: 1.5 },
      { provider: "openai", modelId: "d", window: null },
      { provider: "", modelId: "e", window: 100000 },
      { provider: "openai", modelId: "", window: 100000 },
    ];
    const { deps, writes } = makeDeps({});
    const r = reconcileContextWindows(discovered, deps);
    assert.deepEqual(writes, []);
    assert.equal(r.scanned, 6);
    assert.equal(r.written, 0);
  });

  it("writes an override when the catalog does not know the model (catalog null)", () => {
    const discovered: DiscoveredWindow[] = [{ provider: "local", modelId: "my-7b", window: 131072 }];
    const { deps, writes } = makeDeps({}); // catalog null for everything
    const r = reconcileContextWindows(discovered, deps);
    assert.deepEqual(writes, [["local", "my-7b", 131072]]);
    assert.equal(r.written, 1);
  });
});
