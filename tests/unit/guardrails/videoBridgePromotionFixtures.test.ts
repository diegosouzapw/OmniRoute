import assert from "node:assert/strict";
import test from "node:test";

import { VIDEO_BRIDGE_PROMOTION_CASE_KINDS } from "../../../src/lib/guardrails/videoBridgePromotionManifest.ts";
import {
  buildFfmpegArgsFromRecipe,
  VIDEO_BRIDGE_PROMOTION_FIXTURE_RECIPES,
  videoBridgeFixtureRecipeSchema,
} from "../../../src/lib/guardrails/videoBridgePromotionFixtures.ts";

test("ships exactly one deterministic recipe per frozen case kind", () => {
  const kindsCovered = VIDEO_BRIDGE_PROMOTION_FIXTURE_RECIPES.map((recipe) => recipe.caseKind);
  assert.deepEqual([...kindsCovered].sort(), [...VIDEO_BRIDGE_PROMOTION_CASE_KINDS].sort());
  assert.equal(new Set(kindsCovered).size, kindsCovered.length, "no duplicate case kinds");
});

test("every shipped recipe validates against its own declarative schema", () => {
  for (const recipe of VIDEO_BRIDGE_PROMOTION_FIXTURE_RECIPES) {
    assert.deepEqual(videoBridgeFixtureRecipeSchema.parse(recipe), recipe);
  }
});

test("recipe ids are unique and stable", () => {
  const ids = VIDEO_BRIDGE_PROMOTION_FIXTURE_RECIPES.map((recipe) => recipe.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("buildFfmpegArgsFromRecipe is a pure function: same recipe -> byte-identical args, no I/O", () => {
  const recipe = VIDEO_BRIDGE_PROMOTION_FIXTURE_RECIPES.find(
    (candidate) => candidate.caseKind === "static_scene"
  );
  assert.ok(recipe, "static_scene recipe must exist");
  const first = buildFfmpegArgsFromRecipe(recipe!);
  const second = buildFfmpegArgsFromRecipe(recipe!);
  assert.deepEqual(first, second);
  assert.ok(first.includes("-filter_complex"));
  assert.ok(first.includes(recipe!.filterGraph));
  assert.ok(first.includes("-map"));
  assert.ok(first.includes(`[${recipe!.outputLabel}]`));
});

test("buildFfmpegArgsFromRecipe emits one -f lavfi -i triplet per declared layer, in order", () => {
  const recipe = VIDEO_BRIDGE_PROMOTION_FIXTURE_RECIPES.find(
    (candidate) => candidate.caseKind === "rapid_cuts"
  );
  assert.ok(recipe, "rapid_cuts recipe must exist");
  const args = buildFfmpegArgsFromRecipe(recipe!);
  const lavfiInputs = args.filter((value) => value === "-f").length;
  assert.equal(lavfiInputs, recipe!.layers.length);
  for (const layer of recipe!.layers) {
    assert.ok(
      args.some((value) => value.includes(`s=${recipe!.width}x${recipe!.height}`)),
      "each layer input string must carry the recipe resolution"
    );
    assert.ok(
      args.some((value) => value.includes(`d=${layer.durationSeconds}`)),
      "each layer input string must carry its own duration"
    );
  }
});

test("prompt_injection recipe is flagged as a security-relevant fixture", () => {
  const recipe = VIDEO_BRIDGE_PROMOTION_FIXTURE_RECIPES.find(
    (candidate) => candidate.caseKind === "prompt_injection"
  );
  assert.ok(recipe);
  assert.equal(recipe!.isSecurityFixture, true);
});
