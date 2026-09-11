/**
 * The scroll-to-weave mapping, the shader's weaving invariants, and the
 * measured constants that keep "MiLADEiA" woven where the artwork has it.
 *
 * The renderer itself needs a GPU, so what is asserted here is everything that
 * decides whether the weave is correct rather than merely pretty: that scroll
 * position maps deterministically and reversibly onto weaving progress, that the
 * shader actually builds the rug out of warp, weft and knots instead of
 * revealing an image, and that the inscription band still lands on the letters.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  approach,
  cameraFocus,
  cameraZoom,
  fitRug,
  scrollProgress,
  tensionLevel,
} from "../../src/shared/components/rug/weaveProgress";
import { KNOT_ROWS, RUG_SOURCE } from "../../src/shared/components/rug/rugSource";
import { detectTier, FrameBudget, lowerTier, QUALITY } from "../../src/shared/components/rug/quality";
import { WEAVE_FS, DERIVE_STRUCTURE_FS } from "../../src/shared/components/rug/weaveShaders";

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");

test("scroll position maps onto weaving progress across the whole track", () => {
  const section = 3200;
  const stage = 1000;
  const travel = section - stage;

  // Before the section reaches the top of the viewport nothing is woven.
  assert.equal(scrollProgress(500, section, stage), 0);
  assert.equal(scrollProgress(0, section, stage), 0);
  // And once the track is used up the rug is finished and stays finished.
  assert.equal(scrollProgress(-travel, section, stage), 1);
  assert.equal(scrollProgress(-travel - 800, section, stage), 1);

  for (const fraction of [0.1, 0.25, 0.5, 0.75, 0.9]) {
    assert.equal(scrollProgress(-travel * fraction, section, stage), fraction);
  }
});

test("scrolling back up runs the weave through exactly the same states", () => {
  const section = 3000;
  const stage = 1000;
  const down: number[] = [];
  const up: number[] = [];
  for (let top = 0; top >= -2000; top -= 100) down.push(scrollProgress(top, section, stage));
  for (let top = -2000; top <= 0; top += 100) up.push(scrollProgress(top, section, stage));
  assert.deepEqual(down, [...up].reverse());
});

test("a section with no travel still resolves to a definite state", () => {
  assert.equal(scrollProgress(10, 1000, 1000), 0);
  assert.equal(scrollProgress(-10, 1000, 1000), 1);
  assert.equal(scrollProgress(0, 800, 1000), 1);
});

test("progress approaches the scroll target and settles exactly on it", () => {
  let value = 0;
  for (let i = 0; i < 200; i++) value = approach(value, 1, 1 / 60);
  assert.equal(value, 1, "must settle exactly, so the render loop can go idle");

  // Frame rate must not change where it ends up, only how many frames it takes.
  let slow = 0;
  for (let i = 0; i < 200; i++) slow = approach(slow, 0.4, 1 / 30);
  assert.equal(slow, 0.4);

  // A stalled frame (backgrounded tab) is capped, never overshoots.
  const stalled = approach(0, 1, 12);
  assert.ok(stalled > 0 && stalled <= 1);

  // Reversing works the same way.
  let back = 1;
  for (let i = 0; i < 200; i++) back = approach(back, 0.2, 1 / 60);
  assert.equal(back, 0.2);

  assert.equal(approach(0.5, 1, 0), 0.5, "a zero delta must not advance the weave");
  assert.equal(approach(0.5, 1, Number.NaN), 0.5);
});

test("the micro-camera drifts in once and never crops outside the rug", () => {
  const maxZoom = 1.16;
  assert.equal(cameraZoom(0, maxZoom), 1);
  assert.equal(cameraZoom(1, maxZoom), 1);
  assert.ok(Math.abs(cameraZoom(0.5, maxZoom) - maxZoom) < 1e-9);

  for (let p = 0; p <= 1.0001; p += 0.05) {
    const zoom = cameraZoom(p, maxZoom);
    assert.ok(zoom >= 1 && zoom <= maxZoom, `zoom ${zoom} out of range at ${p}`);
    const focus = cameraFocus(p, zoom);
    assert.ok(focus >= 0 && focus <= 1, `focus ${focus} out of range at ${p}`);

    // The visible window, in rug coordinates, must stay on the rug.
    const near = focus * (1 - 1 / zoom);
    const far = (1 - focus) / zoom + focus;
    assert.ok(near >= -1e-9 && far <= 1 + 1e-9, `window [${near}, ${far}] leaves the rug at ${p}`);
  }

  // At no magnification there is nothing to hold on to.
  assert.equal(cameraFocus(0.3, 1), 0.5);
});

test("the camera follows the weaving front down the rug", () => {
  const centre = (p: number) => {
    const zoom = cameraZoom(p, 1.16);
    return cameraFocus(p, zoom) * (1 - 1 / zoom) + 0.5 / zoom;
  };
  assert.ok(centre(0.3) < centre(0.5), "the view should follow the work downward");
  assert.ok(centre(0.5) < centre(0.7));
});

test("thread tension holds while the weave moves and then settles", () => {
  assert.equal(tensionLevel(0), 1);
  assert.equal(tensionLevel(2000), 1);
  assert.ok(tensionLevel(2600) > 0 && tensionLevel(2600) < 1);
  assert.equal(tensionLevel(9000), 0, "an idle page must settle so drawing can stop");
});

test("the rug is fitted to the stage without ever being distorted", () => {
  const ar = RUG_SOURCE.aspectRatio;
  for (const [w, h] of [
    [1600, 900],
    [390, 844],
    [1024, 1366],
    [800, 800],
  ]) {
    const fit = fitRug(w, h, ar);
    assert.ok(fit.width <= w + 1e-9 && fit.height <= h + 1e-9, `${w}x${h} overflows the stage`);
    assert.ok(Math.abs(fit.width / fit.height - ar) < 1e-9, `${w}x${h} distorts the rug`);
  }
  assert.deepEqual(fitRug(0, 500, ar), { width: 0, height: 0 });
});

test("the knot lattice matches the gauge measured from the artwork", () => {
  assert.equal(RUG_SOURCE.knotColumns, 420);
  assert.equal(KNOT_ROWS, 707);
  // The lattice must stay square-ish, or knots would render as bricks.
  const knotAspect = RUG_SOURCE.aspectRatio / (RUG_SOURCE.knotColumns / KNOT_ROWS);
  assert.ok(Math.abs(knotAspect - 1) < 0.01, `knots are not square: ${knotAspect}`);
});

test("the inscription band still covers the woven MiLADEiA", () => {
  const { text, x0, y0, x1, y1 } = RUG_SOURCE.inscription;
  assert.equal(text, "MiLADEiA", "the exact capitalisation is part of the rug");

  const meta = JSON.parse(
    fs.readFileSync(path.join(REPO_ROOT, "scripts/build/rug-assets/rug-meta.json"), "utf8")
  );
  assert.equal(meta.inscription.text, "MiLADEiA");
  assert.deepEqual(
    meta.inscription.band,
    { x0, y0, x1, y1 },
    "rugSource.ts and the generated metadata have drifted apart"
  );
  assert.ok(
    meta.inscription.knots > 500,
    `the band covers only ${meta.inscription.knots} knots — it has slipped off the letters`
  );

  // The band sits across the middle of the rug, where the medallion is.
  assert.ok(x0 > 0.2 && x1 < 0.8 && y0 > 0.4 && y1 < 0.65);
  assert.ok(x1 > x0 && y1 > y0);
});

test("the runtime artwork exists and is the only asset the rug needs", () => {
  const artwork = path.join(REPO_ROOT, "public", RUG_SOURCE.artwork.replace(/^\//, ""));
  assert.ok(fs.existsSync(artwork), `missing ${RUG_SOURCE.artwork}`);
  assert.ok(
    fs.statSync(artwork).size < 512 * 1024,
    "the rug artwork has grown past its budget for a single hero asset"
  );
  assert.deepEqual(
    fs.readdirSync(path.join(REPO_ROOT, "public/rug")).sort(),
    ["rug-full.webp"],
    "the knot lattice is derived on the GPU; nothing else should ship"
  );
});

test("the shader builds the rug rather than revealing the artwork", () => {
  // Each of these is load-bearing for the illusion; losing any one of them turns
  // the effect back into a top-to-bottom image wipe.
  for (const marker of [
    "warpAt", // the loom is strung before anything is knotted
    "weftAt", // weft shots are passed and beaten down between rows
    "heightAt", // knots have pile with real height, not just colour
    "float tuft", // a knot presents two tufts
    "fibre", // and the tufts are made of individual strands
    "SHUTTLE_SKEW", // the front leans, because rows are tied in one direction
    "FRONT_WAVE", // and undulates with the tension across the warp
    "FRONT_ROUGH", // and frays at the knot scale
    "PILE_RAMP", // pile grows in behind the front
    "TRIM_RAMP", // and stays shaggy until it is sheared
  ]) {
    assert.ok(WEAVE_FS.includes(marker), `weave shader lost ${marker}`);
  }

  // The dye colour is read at knot centres, which is what quantises the motifs
  // onto the lattice the way hand-knotting does.
  assert.match(WEAVE_FS, /vec2 knotUv = \(cell \+ 0\.5\) \/ uGrid;/);
  assert.match(WEAVE_FS, /vec2 cell = floor\(p\);/);

  // Weaving progress must be a pure function of the scroll uniform: no clock
  // term may reach it, or the weave would drift out of sync with the page.
  const state = WEAVE_FS.slice(
    WEAVE_FS.indexOf("float weavingState"),
    WEAVE_FS.indexOf("float heightAt")
  );
  assert.ok(state.includes("uProgress"), "the weaving front must follow scroll");
  assert.ok(!state.includes("uTime"), "the weaving front must not animate on its own");

  // The inscription gets its own pile and sheen, so the letters are woven in
  // rather than drawn on top.
  assert.ok(DERIVE_STRUCTURE_FS.includes("uInscription"));
  assert.ok(WEAVE_FS.includes("st.b"), "the inscription mask must reach the material");
});

test("the shader compiles as GLSL ES 1.00 for WebGL 1 and 2 alike", () => {
  for (const source of [WEAVE_FS, DERIVE_STRUCTURE_FS]) {
    assert.ok(!source.includes("#version"), "a version directive would break WebGL 1");
    assert.ok(!/\btexture\s*\(/.test(source), "texture() is GLSL ES 3.00 only");
    assert.ok(!/\btexelFetch\b/.test(source), "texelFetch is GLSL ES 3.00 only");
    assert.ok(!/\bout\s+vec4\b/.test(source), "out variables are GLSL ES 3.00 only");
    assert.ok(source.includes("gl_FragColor"));
    assert.ok(source.includes("precision highp float;"));
  }
});

test("detail below the pixel grid is faded rather than left to alias", () => {
  // Without these the weave turns into moire on a low-DPR phone.
  assert.ok(WEAVE_FS.includes("knotDetail()"));
  assert.ok(WEAVE_FS.includes("microDetail()"));
  assert.match(WEAVE_FS, /mix\(0\.5, n, microDetail\(\)\)/);
});

test("quality tiers step down in cost and never claim more than the one above", () => {
  const order = ["high", "medium", "low"] as const;
  for (let i = 1; i < order.length; i++) {
    const above = QUALITY[order[i - 1]];
    const below = QUALITY[order[i]];
    assert.ok(below.maxDpr <= above.maxDpr, `${order[i]} raises the DPR ceiling`);
    assert.ok(below.pixelBudget < above.pixelBudget, `${order[i]} raises the pixel budget`);
    assert.ok(below.octaves <= above.octaves, `${order[i]} raises fibre detail`);
  }
  assert.equal(QUALITY.low.tension, false, "the slowest devices should not animate the front");

  assert.equal(lowerTier("high"), "medium");
  assert.equal(lowerTier("medium"), "low");
  assert.equal(lowerTier("low"), null, "there is nothing below low to fall back to");
});

test("tiering falls back safely when the device tells us nothing", () => {
  assert.ok(["high", "medium", "low"].includes(detectTier()));
});

test("the frame budget trips once on sustained slowness and ignores single stalls", () => {
  const budget = new FrameBudget(24, 45);
  // A one-off stall (a tab switch, a GC pause) is not a slow device.
  assert.equal(budget.record(4000), false);
  for (let i = 0; i < 44; i++) assert.equal(budget.record(40), false, `tripped early at ${i}`);
  assert.equal(budget.record(40), true, "should trip once the window is full and over budget");
  assert.equal(budget.record(40), false, "must not trip repeatedly and flap between tiers");

  const healthy = new FrameBudget(24, 45);
  for (let i = 0; i < 200; i++) assert.equal(healthy.record(12), false);

  budget.reset();
  for (let i = 0; i < 44; i++) budget.record(40);
  assert.equal(budget.record(40), true, "reset should re-arm the watch");
});
