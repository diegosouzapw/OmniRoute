/**
 * Measurements of the MiLADEiA rug photograph.
 *
 * These describe the physical rug, not the rendering: the knot gauge it was
 * woven at and where the woven inscription sits on it. They are mirrored in
 * `scripts/build/rug-assets/rug-meta.json`; `node scripts/build/gen-rug-weave-assets.mjs --check`
 * re-measures the source and fails if this file and the artwork have drifted apart.
 */
export const RUG_SOURCE = {
  /** The single runtime asset: display artwork, and the no-WebGL fallback image. */
  artwork: "/rug/rug-full.webp",

  /** Width / height of the source photograph. */
  aspectRatio: 0.594345,

  /**
   * Knots across the rug, measured from the source: the knots forming the
   * inscription are ~2.3 source px wide, i.e. ~28 knots per 10 cm — the coarse
   * tribal gauge of this piece. The renderer quantises every motif onto this
   * lattice, which is why the motifs step the way a hand-knotted rug's do.
   */
  knotColumns: 420,

  /**
   * The band of the rug carrying the woven inscription, in normalised coords.
   * Inside it the cream silk of the letters is separated by luminance so the
   * renderer can give "MiLADEiA" the slightly higher, glossier pile it has on
   * the real rug — the letters are woven into the artwork, never drawn on top.
   */
  inscription: {
    text: "MiLADEiA",
    threshold: 0.5,
    x0: 0.262,
    y0: 0.4995,
    x1: 0.732,
    y1: 0.5735,
  },
} as const;

/** Knot rows, derived so the lattice stays square-ish on the rug's aspect. */
export const KNOT_ROWS = Math.round(RUG_SOURCE.knotColumns / RUG_SOURCE.aspectRatio);
