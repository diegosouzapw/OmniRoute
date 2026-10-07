/**
 * Unit coverage for the #11503 drift gate (`scripts/check/check-model-lifecycle.mjs`).
 *
 * The gate's value is that it goes red when a hand-maintained routing table starts
 * pointing at a model the vendor retired, so each of its four checks is exercised here
 * against small fixtures rather than against the live catalog (which would make the test
 * a duplicate of the gate run itself, and red for reasons unrelated to the logic).
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  collectCatalogIds,
  isRetiredId,
  findRetiredFitnessRows,
  findBadAliasTargets,
  findUnforwardedRetiredIds,
  findRetiredDegradationRows,
} from "../../scripts/check/check-model-lifecycle.mjs";

const RETIRED = new Set(["dead-model-1", "dead-model-2", "gpt-5.2-codex"]);

describe("check-model-lifecycle: catalog extraction", () => {
  it("collects model ids and their aliases", () => {
    const registry = {
      alpha: { models: [{ id: "live-1", aliases: ["live-1-alias"] }, { id: "dead-model-1" }] },
      beta: { models: [{ id: "live-2" }] },
      gamma: {},
    };
    assert.deepEqual(collectCatalogIds(registry).sort(), [
      "dead-model-1",
      "live-1",
      "live-1-alias",
      "live-2",
    ]);
  });

  it("treats a vendor-prefixed id as retired when its bare form is", () => {
    assert.equal(isRetiredId("openai/gpt-5.2-codex", RETIRED), true);
    assert.equal(isRetiredId("GPT-5.2-Codex", RETIRED), true);
    assert.equal(isRetiredId("live-1", RETIRED), false);
  });
});

describe("check-model-lifecycle: (a) retired ids scored by FITNESS_TABLE", () => {
  const scoreFor = (id: string, task: string) =>
    id === "dead-model-1" && task === "coding" ? 0.98 : null;

  it("flags a retired id the table still scores", () => {
    const violations = findRetiredFitnessRows(["dead-model-1"], scoreFor, ["coding", "review"]);
    assert.equal(violations.length, 1);
    assert.match(violations[0], /dead-model-1 scores 0\.98 for "coding"/);
  });

  it("passes when no retired id resolves through the table", () => {
    assert.deepEqual(findRetiredFitnessRows(["dead-model-2"], scoreFor, ["coding"]), []);
  });
});

describe("check-model-lifecycle: (b) alias targets", () => {
  const catalog = ["live-1", "dead-model-1"];

  it("flags a target absent from the catalog", () => {
    const violations = findBadAliasTargets({ old: "not-in-catalog" }, catalog, RETIRED);
    assert.equal(violations.length, 1);
    assert.match(violations[0], /no provider in REGISTRY serves this id/);
  });

  it("flags a target the vendor has retired", () => {
    const violations = findBadAliasTargets({ old: "dead-model-1" }, catalog, RETIRED);
    assert.equal(violations.length, 1);
    assert.match(violations[0], /the vendor has retired this id/);
  });

  it("passes for a live catalog target", () => {
    assert.deepEqual(findBadAliasTargets({ old: "live-1" }, catalog, RETIRED), []);
  });
});

describe("check-model-lifecycle: (c) routable retired ids", () => {
  it("flags a retired id with neither forward nor allowlist entry", () => {
    const violations = findUnforwardedRetiredIds(["dead-model-1"], {}, []);
    assert.equal(violations.length, 1);
    assert.match(violations[0], /retired but still routable/);
  });

  it("accepts an allowlisted id", () => {
    assert.deepEqual(findUnforwardedRetiredIds(["dead-model-1"], {}, ["dead-model-1"]), []);
  });

  it("accepts an id that has a BUILT_IN_ALIASES forward", () => {
    assert.deepEqual(
      findUnforwardedRetiredIds(["dead-model-1"], { "dead-model-1": "live-1" }, []),
      []
    );
  });
});

describe("check-model-lifecycle: (d) DEFAULT_DEGRADATION_MAP rows", () => {
  it("flags a retired source id as a dead row", () => {
    const violations = findRetiredDegradationRows({ "dead-model-1": "live-1" }, RETIRED);
    assert.equal(violations.length, 1);
    assert.match(violations[0], /retired the source id; checkLifecycle rejects it/);
  });

  it("flags a retired target id", () => {
    const violations = findRetiredDegradationRows({ "live-1": "dead-model-1" }, RETIRED);
    assert.equal(violations.length, 1);
    assert.match(violations[0], /retired the target id/);
  });

  it("reports both ends when source and target are retired", () => {
    const violations = findRetiredDegradationRows({ "dead-model-1": "dead-model-2" }, RETIRED);
    assert.equal(violations.length, 2);
  });

  it("treats a vendor-prefixed source as retired when its bare form is", () => {
    const violations = findRetiredDegradationRows({ "openai/gpt-5.2-codex": "live-1" }, RETIRED);
    assert.equal(violations.length, 1);
  });

  it("passes for a map of live ids", () => {
    assert.deepEqual(findRetiredDegradationRows({ "live-1": "live-2" }, RETIRED), []);
    assert.deepEqual(findRetiredDegradationRows({}, RETIRED), []);
  });
});
