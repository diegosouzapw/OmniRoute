"use client";
import type { EncoderComparison } from "./compressionFlowModel";

const fmt = (n: number) => n.toLocaleString("en-US");

export function EncoderComparisonTable({ comparison }: { comparison: EncoderComparison }) {
  if (!comparison || comparison.arraysCompared === 0) return null;
  const rows: Array<{
    key: "gcf" | "toon" | "json";
    label: string;
    size: { bytes: number; tokens: number } | null;
  }> = [
    { key: "gcf", label: "GCF", size: comparison.gcf },
    { key: "toon", label: "TOON", size: comparison.toonAvailable ? comparison.toon : null },
    { key: "json", label: "JSON", size: comparison.json },
  ].sort((a, b) => (a.size?.tokens ?? Infinity) - (b.size?.tokens ?? Infinity));

  return (
    <section data-testid="encoder-comparison" className="rounded border p-2 text-xs">
      <header className="mb-1 font-semibold">
        Encoder A/B — {comparison.arraysCompared} array(s){" "}
        <span data-testid="encoder-winner" className="font-mono">
          vencedor: {comparison.winner}
        </span>
      </header>
      <table className="w-full font-mono">
        <thead>
          <tr className="text-left text-muted-foreground">
            <th>encoder</th>
            <th>bytes</th>
            <th>tokens (cl100k)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key} className={r.key === comparison.winner ? "font-bold" : ""}>
              <td>
                {r.label}
                {r.key === comparison.winner ? " ✓" : ""}
              </td>
              {r.size ? (
                <>
                  <td>{fmt(r.size.bytes)}</td>
                  <td>{fmt(r.size.tokens)}</td>
                </>
              ) : (
                <td colSpan={2} data-testid="encoder-toon-na">
                  n/a
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
