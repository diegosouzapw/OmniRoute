import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { catalogContentFingerprint, optionalTierFingerprint } from "../src/shared/fingerprint.js";

describe("catalogContentFingerprint", () => {
  it("returns the same hash for two identical catalogs", () => {
    const models = [
      { id: "b", release_date: "2026-01-02" },
      { id: "a", release_date: "2026-01-01" },
    ];
    assert.equal(
      catalogContentFingerprint(models),
      catalogContentFingerprint([...models].reverse())
    );
  });
  it("returns a different hash when one model id changes", () => {
    const before = catalogContentFingerprint([{ id: "a" }]);
    const after = catalogContentFingerprint([{ id: "a2" }]);
    assert.notEqual(before, after);
  });
  it("takes exactly the models entries", () => {
    assert.equal(catalogContentFingerprint.length, 1);
    const models = [{ id: "a" }];
    assert.equal(catalogContentFingerprint(models), catalogContentFingerprint([...models]));
  });
});

describe("optionalTierFingerprint", () => {
  it("takes providers then enrichment", () => {
    assert.equal(optionalTierFingerprint.length, 2);
    const providers = [{ id: "c1", testStatus: "active", isActive: true }];
    const priced = (input: number) =>
      new Map([["example/model", { name: "Model One", pricing: { input, output: 1 } }]]);
    const first = optionalTierFingerprint(providers, priced(3));
    const moved = optionalTierFingerprint(providers, priced(99));
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

  it("ignores extra trailing arguments the retired caller used to pass", () => {
    const providers = [{ id: "c1", testStatus: "active", isActive: true }];
    assert.equal(
      optionalTierFingerprint(providers, undefined),
      (optionalTierFingerprint as (...args: unknown[]) => string)(providers, undefined, [
        { id: "combo-a" },
      ])
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
