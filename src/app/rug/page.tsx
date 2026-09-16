import type { Metadata } from "next";

import { WeavingRug } from "@/shared/components/rug";

export const metadata: Metadata = {
  title: "MiLADEiA — woven",
  description:
    "A hand-knotted Persian rug, knotted onto the loom as you scroll: warp, weft, and row after row of coloured knots.",
};

/**
 * Gallery presentation for the weaving animation.
 *
 * Deliberately a route of its own: this repository's landing page belongs to a
 * different product, and the weave is a self-contained component
 * (`@/shared/components/rug`) that drops into whichever page should carry it.
 */
export default function RugPage() {
  return (
    <main className="min-h-screen bg-[#0a0908] text-[#e8e2d8] antialiased">
      <section className="mx-auto flex min-h-[70svh] max-w-3xl flex-col justify-center px-6 py-24 sm:px-8">
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.42em] text-[#8a7f70]">
          Hand-knotted · Wool and silk on cotton
        </p>
        <h1 className="mt-8 text-4xl font-light leading-[1.08] tracking-tight sm:text-6xl">
          MiLADEiA
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-[#a89c8c] sm:text-lg">
          Roughly twenty-eight knots to ten centimetres, tied in wool around a pair of cotton
          warps, a weft shot beaten down after every row. The inscription is not applied to the
          rug — it is knotted into it, in the same cream silk, as the weaver reaches the medallion.
        </p>
        <p className="mt-10 text-[0.7rem] uppercase tracking-[0.32em] text-[#6f6558]">
          Scroll to weave
        </p>
      </section>

      <WeavingRug />

      <section className="mx-auto max-w-3xl px-6 pb-40 pt-24 sm:px-8">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-10 border-t border-[#241f1a] pt-12 text-sm sm:grid-cols-4">
          {[
            ["Knot", "Asymmetric, wool pile"],
            ["Gauge", "420 × 707 knots"],
            ["Foundation", "Undyed cotton"],
            ["Inscription", "MiLADEiA"],
          ].map(([term, value]) => (
            <div key={term}>
              <dt className="text-[0.65rem] uppercase tracking-[0.24em] text-[#6f6558]">{term}</dt>
              <dd className="mt-2 text-[#c9bfb0]">{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
