import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { catalogContentFingerprint, optionalTierFingerprint } from "../src/shared/fingerprint.js";

describe("catalogContentFingerprint", () => {
  it("returns the same hash for two identical catalogs", () => {
    const models = [
      { id: "b", release_date: "2026-01-02" },
      { id: "a", release_date: "2026-01-01" },
    ];
    const combos = [{ id: "combo-b" }, { id: "combo-a" }];
    assert.equal(
      catalogContentFingerprint(models, combos),
      catalogContentFingerprint([...models].reverse(), [...combos].reverse())
    );
  });
  it("returns a different hash when one model id changes", () => {
    const combos = [{ id: "combo-a" }];
    const before = catalogContentFingerprint([{ id: "a" }], combos);
    const after = catalogContentFingerprint([{ id: "a2" }], combos);
    assert.notEqual(before, after);
  });
  it("takes exactly the models and combos entries", () => {
    assert.equal(catalogContentFingerprint.length, 2);
    const models = [{ id: "a" }];
    const combos = [{ id: "combo-a" }];
    assert.equal(
      catalogContentFingerprint(models, combos),
      catalogContentFingerprint([...models], [...combos])
    );
  });
});

describe("optionalTierFingerprint", () => {
  it("takes providers, enrichment, then combos, with no legacy first entry", () => {
    assert.equal(optionalTierFingerprint.length, 2);
    const providers = [{ id: "c1", testStatus: "active", isActive: true }];
    const priced = (input: number) =>
      new Map([["example/model", { name: "Model One", pricing: { input, output: 1 } }]]);
    const first = optionalTierFingerprint(providers, priced(3), [{ id: "combo-a" }]);
    const moved = optionalTierFingerprint(providers, priced(99), [{ id: "combo-a" }]);
    assert.notEqual(first, moved);
  });

  it("moves on a pricing-only change, so stale prices reach the picker", () => {
    const priced = (input: number) =>
      new Map([["example/model", { name: "Model One", pricing: { input, output: 1 } }]]);
    assert.notEqual(
      optionalTierFingerprint([], priced(3)),
      optionalTierFingerprint([], priced(99))
    );
  });

  it("moves when a combo loses a member without changing id", () => {
    const one = [{ id: "combo-a", name: "A", models: [{ model: "m1" }] }];
    const two = [{ id: "combo-a", name: "A", models: [{ model: "m1" }, { model: "m2" }] }];
    assert.notEqual(
      optionalTierFingerprint([], undefined, one),
      optionalTierFingerprint([], undefined, two)
    );
  });

  it("tells providers apart from enrichment by position, not just arity", () => {
    const providers = [{ id: "c1", testStatus: "active", isActive: true }];
    const enrichment = new Map([["example/model", { name: "Model One" }]]);
    assert.notEqual(
      optionalTierFingerprint(providers, undefined),
      optionalTierFingerprint([], enrichment)
    );
  });

  it("moves when a provider goes quiet or gets renamed", () => {
    const active = [{ id: "c1", testStatus: "active", isActive: true }];
    const quiet = [{ id: "c1", testStatus: "active", isActive: false }];
    assert.notEqual(
      optionalTierFingerprint(active, undefined),
      optionalTierFingerprint(quiet, undefined)
    );
  });
});
