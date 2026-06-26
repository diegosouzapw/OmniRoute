/**
 * TDD for PR-012 — `src/lib/sre/sloDefinitions.ts`.
 *
 * Covers:
 *   - catalog has exactly 5 entries
 *   - every SLO has a valid target in (0, 1]
 *   - every SLO has a recognised sliding window
 *   - lookups by id / tag / owner
 *   - SLO_LABEL_CARDINALITY matches catalog size × window count
 *
 * 10 assertions across 4 describe blocks.
 *
 * Run from the repo root:
 *   node --import tsx --test tests/unit/sre/sloDefinitions.test.ts
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  SLO_BY_ID,
  SLO_CATALOG,
  SLO_CATALOG_SIZE,
  SLO_LABEL_CARDINALITY,
  findSlo,
  findSlosByOwner,
  findSlosByTag,
  windowDays,
} from "../../../src/lib/sre/sloDefinitions.ts";

describe("sloDefinitions: catalog shape", () => {
  it("contains exactly 5 SLOs", () => {
    assert.equal(SLO_CATALOG.length, 5);
    assert.equal(SLO_CATALOG_SIZE, 5);
  });

  it("every SLO has a unique id matching SLO-00X", () => {
    const ids = SLO_CATALOG.map((s) => s.slo_id);
    assert.equal(new Set(ids).size, ids.length);
    for (const id of ids) {
      assert.match(id, /^SLO-00\d$/);
    }
  });

  it("every SLO has a target in (0, 1] and a valid sliding window", () => {
    for (const s of SLO_CATALOG) {
      assert.ok(s.target > 0 && s.target <= 1, `bad target on ${s.slo_id}: ${s.target}`);
      const allowed = ["1h", "6h", "24h", "7d", "30d"] as const;
      assert.ok(
        (allowed as ReadonlyArray<string>).includes(s.window),
        `bad window on ${s.slo_id}: ${s.window}`
      );
      assert.ok(s.objective.length > 0);
      assert.ok(s.description.length > 0);
      assert.ok(s.sli_query.length > 0);
      assert.ok(s.owner.length > 0);
    }
  });

  it("expected SLOs are present in the catalog", () => {
    const ids = new Set(SLO_CATALOG.map((s) => s.slo_id));
    for (const expected of ["SLO-001", "SLO-002", "SLO-003", "SLO-004", "SLO-005"]) {
      assert.ok(ids.has(expected), `missing ${expected}`);
    }
  });
});

describe("sloDefinitions: lookups", () => {
  it("findSlo returns the matching entry by id", () => {
    const slo = findSlo("SLO-001");
    assert.ok(slo);
    assert.equal(slo!.objective, "API availability");
    assert.equal(slo!.target, 0.999);
  });

  it("findSlo returns null for an unknown id", () => {
    assert.equal(findSlo("SLO-999"), null);
    assert.equal(findSlo(""), null);
  });

  it("findSlosByTag returns SLOs tagged accordingly", () => {
    const availability = findSlosByTag("availability");
    assert.ok(availability.length >= 2);
    for (const s of availability) {
      assert.ok(s.tags.includes("availability"));
    }
  });

  it("findSlosByOwner returns SLOs owned by the team", () => {
    const platform = findSlosByOwner("platform");
    assert.ok(platform.length >= 2);
    for (const s of platform) {
      assert.equal(s.owner, "platform");
    }
  });

  it("SLO_BY_ID is consistent with SLO_CATALOG", () => {
    assert.equal(SLO_BY_ID.size, SLO_CATALOG.length);
    for (const s of SLO_CATALOG) {
      assert.equal(SLO_BY_ID.get(s.slo_id)?.slo_id, s.slo_id);
    }
  });
});

describe("sloDefinitions: cardinality", () => {
  it("SLO_LABEL_CARDINALITY matches catalog × window count", () => {
    assert.equal(SLO_LABEL_CARDINALITY, SLO_CATALOG.length * 5);
  });

  it("windowDays maps every sliding window to a positive day count", () => {
    const allowed: ReadonlyArray<["1h" | "6h" | "24h" | "7d" | "30d", number]> = [
      ["1h", 1 / 24],
      ["6h", 0.25],
      ["24h", 1],
      ["7d", 7],
      ["30d", 30],
    ];
    for (const [w, days] of allowed) {
      assert.equal(windowDays(w), days);
    }
  });
});
