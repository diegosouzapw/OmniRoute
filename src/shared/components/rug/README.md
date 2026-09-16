# Weaving rug

A scroll-driven animation in which the MiLADEiA rug is hand-knotted onto a bare
loom, from the top down, as the page moves.

```tsx
import { WeavingRug } from "@/shared/components/rug";

<WeavingRug />;
```

Self-contained: it brings its own layout CSS, needs no animation library, and
depends on nothing in the host page. A demo route lives at `/rug`.

## What it actually renders

Not a reveal. The rug is rebuilt from its own structure every frame:

| Layer         | What it is                                                                          |
| ------------- | ----------------------------------------------------------------------------------- |
| Warp          | Cotton cords strung down the loom, two per knot column — a Persian knot wraps a pair |
| Weft          | Shots passed over and under alternate warps after each row, then beaten down         |
| Knot          | Two tufts, each shaded as a cylinder, leaning down the nap                           |
| Fibre         | Strands within a tuft, with anisotropic sheen along their length                     |
| Dye           | The artwork, sampled once per knot                                                   |

Because dye is sampled per knot, the motifs quantise onto the lattice exactly as
hand-knotting quantises them — which is what makes them step. The artwork is
never blended in as an image.

The weaving front is not a horizontal edge. It leans (rows are tied in one
direction), undulates (tension varies across the warp) and frays at the knot
scale. Behind it the pile grows over ~14 rows and stays shaggy for another ~55
until it is sheared.

"MiLADEiA" is not drawn on top. It is in the artwork, knotted in cream silk, so
the same weaving front constructs it letter by letter; the only thing the
renderer adds is the slightly higher, glossier pile that silk has.

## Pipeline

One asset ships: `public/rug/rug-full.webp` (~300 KB), which is both the texture
and the no-WebGL fallback image, so it is never downloaded twice.

At init, two GPU passes derive what the weave needs and the full-resolution
artwork is then released:

1. **Knot lattice** — the artwork resampled to 420 × 707, one texel per knot.
2. **Structure** — per knot: pile bias (dark, iron-mordanted wool wears lower),
   motif contour (where the weaver changed yarn), and inscription coverage.

Steady-state VRAM is the two lattice textures, ~2.4 MB.

## Scroll

Progress is a pure function of the section's position in the viewport, so
scrolling up runs the weave backward through the same states and interrupting a
scroll leaves it where the page is, not where an animation had got to. It is
smoothed toward that target frame-rate-independently and settles exactly on it,
after which the loop stops drawing.

## Degradation

- No WebGL, a driver refusal, or `prefers-reduced-motion` → the finished rug as
  a plain image. That image is also what renders before the canvas is ready.
- Quality tiers cap DPR and total pixels and drop fibre octaves; a rolling frame
  budget lowers the tier once if frames come in slow, and never raises it back.
- Detail finer than the pixel grid fades toward its mean rather than aliasing,
  which is what keeps a low-DPR phone looking like textile instead of moiré.
- The WebGL context is created once and kept. Disposing it calls
  `loseContext()`, and a canvas whose context has been force-lost can never hand
  out another — so resizing and scrolling away only pause the loop.

## Regenerating the artwork

```bash
node scripts/build/gen-rug-weave-assets.mjs          # rebuild from the source photograph
node scripts/build/gen-rug-weave-assets.mjs --check  # verify nothing has drifted
```

The source is `scripts/build/rug-assets/miladeia-rug.webp`. The measured
constants — knot gauge, aspect ratio, inscription band — live in `rugSource.ts`
and are checked against the generated metadata by `--check` and by
`tests/unit/rug-weaving.test.ts`.
