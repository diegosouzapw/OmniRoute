import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { BUILTIN_BADGES } from "../../../src/lib/gamification/badges";

describe("Badge Definitions", () => {
  describe("BUILTIN_BADGES", () => {
    it("has at least 20 badges", () => {
      assert.ok(BUILTIN_BADGES.length >= 20, `Expected >= 20, got ${BUILTIN_BADGES.length}`);
    });

    it("all badges have required fields", () => {
      for (const badge of BUILTIN_BADGES) {
        assert.ok(badge.id, `Badge missing id`);
        assert.ok(badge.name, `Badge ${badge.id} missing name`);
        assert.ok(badge.description, `Badge ${badge.id} missing description`);
        assert.ok(badge.category, `Badge ${badge.id} missing category`);
        assert.ok(badge.rarity, `Badge ${badge.id} missing rarity`);
        assert.ok(badge.criteria, `Badge ${badge.id} missing criteria`);
      }
    });

    it("all badge IDs are unique", () => {
      const ids = BUILTIN_BADGES.map((b) => b.id);
      const unique = new Set(ids);
      assert.equal(ids.length, unique.size, "Duplicate badge IDs found");
    });

    it("all criteria are valid JSON", () => {
      for (const badge of BUILTIN_BADGES) {
        assert.doesNotThrow(
          () => JSON.parse(badge.criteria),
          `Badge ${badge.id} has invalid criteria JSON`
        );
      }
    });

    it("has badges in all categories", () => {
      const categories = new Set(BUILTIN_BADGES.map((b) => b.category));
      assert.ok(categories.has("usage"), "Missing usage category");
      assert.ok(categories.has("sharing"), "Missing sharing category");
      assert.ok(categories.has("contribution"), "Missing contribution category");
      assert.ok(categories.has("streak"), "Missing streak category");
    });

    it("has badges in all rarities", () => {
      const rarities = new Set(BUILTIN_BADGES.map((b) => b.rarity));
      assert.ok(rarities.has("common"), "Missing common rarity");
      assert.ok(rarities.has("uncommon"), "Missing uncommon rarity");
      assert.ok(rarities.has("rare"), "Missing rare rarity");
      assert.ok(rarities.has("legendary"), "Missing legendary rarity");
    });

    it("usage badges have action_count criteria", () => {
      const usageBadges = BUILTIN_BADGES.filter((b) => b.category === "usage");
      for (const badge of usageBadges) {
        const criteria = JSON.parse(badge.criteria);
        assert.equal(
          criteria.type,
          "action_count",
          `Badge ${badge.id} should have action_count type`
        );
        assert.ok(criteria.threshold > 0, `Badge ${badge.id} threshold should be positive`);
      }
    });

    it("streak badges have streak criteria", () => {
      const streakBadges = BUILTIN_BADGES.filter((b) => b.category === "streak");
      for (const badge of streakBadges) {
        const criteria = JSON.parse(badge.criteria);
        assert.equal(criteria.type, "streak", `Badge ${badge.id} should have streak type`);
        assert.ok(criteria.threshold > 0, `Badge ${badge.id} threshold should be positive`);
      }
    });

    it("sharing badges have action_count criteria", () => {
      const sharingBadges = BUILTIN_BADGES.filter((b) => b.category === "sharing");
      for (const badge of sharingBadges) {
        const criteria = JSON.parse(badge.criteria);
        assert.equal(
          criteria.type,
          "action_count",
          `Badge ${badge.id} should have action_count type`
        );
      }
    });
  });
});
