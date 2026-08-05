import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

/**
 * Accessibility: the topology's animations must honour `prefers-reduced-motion: reduce`.
 *
 * The effect has two halves that have to be disabled separately:
 *   - CSS keyframes (router-core pulse, logo shake, marching/flickering beam strokes) —
 *     switched off by an @media (prefers-reduced-motion: reduce) block in globals.css;
 *   - SMIL animations inside the SVG beam (<animate> / <animateMotion> driving the
 *     turbulence wobble, energy orbs and sparks) — CSS cannot pause these, so
 *     KameBeamEdge must not render them at all.
 *
 * In both cases the STATE must stay legible: an active link keeps its lit border and
 * coloured beam layers, only the movement stops.
 */

const read = (rel: string) => readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");

const globalsCss = read("../../src/app/globals.css");
const kameEdgeSrc = read("../../src/shared/components/flow/KameBeamEdge.tsx");

test("globals.css disables every topology CSS animation under reduced motion", () => {
  const match = globalsCss.match(
    /@media \(prefers-reduced-motion: reduce\)\s*\{[\s\S]*?\n\}/
  );
  assert.ok(match, "a prefers-reduced-motion block must exist");
  const block = match![0];

  for (const cls of [
    "topology-router-core",
    "topology-router-icon",
    "topology-edge-kame",
    "topology-edge-halo",
    "topology-edge-plasma",
  ]) {
    assert.ok(
      block.includes(`.${cls}`),
      `${cls} animates, so it must be listed in the reduced-motion block`
    );
  }
  assert.match(block, /animation:\s*none\s*!important/, "animations must be switched off");
});

test("every animated topology class is covered by the reduced-motion block", () => {
  // Guard against a future class gaining an animation without being added above.
  const animatedClasses = [
    ...globalsCss.matchAll(/\.(topology-[a-z-]+)\s*\{[^}]*animation:/g),
  ].map((m) => m[1]);
  assert.ok(animatedClasses.length > 0, "expected to find animated topology classes");

  const block = globalsCss.match(/@media \(prefers-reduced-motion: reduce\)\s*\{[\s\S]*?\n\}/)![0];
  const uncovered = animatedClasses.filter((cls) => !block.includes(`.${cls}`));
  assert.deepEqual(uncovered, [], "these animated classes are not disabled under reduced motion");
});

test("KameBeamEdge reads the reduced-motion preference reactively", () => {
  assert.match(
    kameEdgeSrc,
    /\(prefers-reduced-motion: reduce\)/,
    "must query the reduced-motion media feature"
  );
  assert.match(
    kameEdgeSrc,
    /addEventListener\("change"/,
    "must follow later changes to the OS setting, not just read it once"
  );
  assert.match(
    kameEdgeSrc,
    /removeEventListener\("change"/,
    "the media-query listener must be cleaned up"
  );
  // The server-side value must be `false` so SSR and first client paint agree. This
  // pinned `useState(false)` literally, but seeding that state from inside an effect is a
  // synchronous setState in an effect (react-hooks/set-state-in-effect — the one warning
  // the lint gate reported) and costs an extra render pass per mounted edge. The media
  // query IS an external store, so it is read through `useSyncExternalStore` with a
  // `false` server snapshot, which satisfies the same requirement. Assert the REQUIREMENT
  // (a false server-side default) rather than the hook that used to implement it.
  assert.match(
    kameEdgeSrc,
    /useSyncExternalStore\([\s\S]*?\)\s*;|useState\(false\)/,
    "the preference must be read through a store subscription (or state seeded false)"
  );
  assert.match(
    kameEdgeSrc,
    /\(\)\s*=>\s*false/,
    "the server-side snapshot must be false to avoid a hydration mismatch"
  );
  assert.doesNotMatch(
    kameEdgeSrc,
    /useEffect\(\(\)\s*=>\s*\{[\s\S]*?setReduced\(/,
    "must not seed the value with a synchronous setState inside an effect"
  );
});

test("KameBeamEdge drops all SMIL motion under reduced motion but keeps the beam visible", () => {
  // The three SMIL sites (turbulence wobble, orbs, sparks) must each be gated.
  const gated = [...kameEdgeSrc.matchAll(/!reducedMotion/g)];
  assert.ok(
    gated.length >= 3,
    `expected the turbulence, orbs and sparks to each be gated; found ${gated.length}`
  );
  // The static beam layers must NOT be gated — an active edge stays clearly visible.
  assert.match(
    kameEdgeSrc,
    /className="topology-edge-kame"/,
    "the core beam layer must still render"
  );
  assert.doesNotMatch(
    kameEdgeSrc,
    /!reducedMotion && \(?\s*<path/,
    "the beam's static stroke layers must not be removed, only the motion"
  );
});
