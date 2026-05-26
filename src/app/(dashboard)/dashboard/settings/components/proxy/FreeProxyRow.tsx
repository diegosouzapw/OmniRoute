"use client";

export interface FreeProxyRowData {
  id: string;
  source: string;
  host: string;
  port: number;
  type: string;
  countryCode: string | null;
  qualityScore: number | null;
  latencyMs: number | null;
  anonymity: string | null;
  inPool: boolean;
}

interface FreeProxyRowProps {
  proxy: FreeProxyRowData;
  selected: boolean;
  onToggleSelect: (id: string) => void;
  onAddToPool: (id: string) => void;
  adding: boolean;
}

export default function FreeProxyRow({
  proxy,
  selected,
  onToggleSelect,
  onAddToPool,
  adding,
}: FreeProxyRowProps) {
  const qualityColor =
    proxy.qualityScore == null
      ? "text-text-muted"
      : proxy.qualityScore >= 80
        ? "text-emerald-400"
        : proxy.qualityScore >= 50
          ? "text-yellow-400"
          : "text-red-400";

  return (
    <tr className="border-b border-border/50 hover:bg-surface-alt/30 text-sm">
      <td className="px-3 py-2">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggleSelect(proxy.id)}
          className="rounded"
          disabled={proxy.inPool}
          aria-label={`Select ${proxy.host}:${proxy.port}`}
        />
      </td>
      <td className="px-3 py-2 text-text-muted text-xs">{proxy.source}</td>
      <td className="px-3 py-2 font-mono text-xs">
        {proxy.host}:{proxy.port}
      </td>
      <td className="px-3 py-2 uppercase text-xs">{proxy.type}</td>
      <td className="px-3 py-2 text-xs">{proxy.countryCode || "—"}</td>
      <td className={`px-3 py-2 text-xs font-semibold ${qualityColor}`}>
        {proxy.qualityScore != null ? proxy.qualityScore : "—"}
      </td>
      <td className="px-3 py-2 text-xs">
        {proxy.latencyMs != null ? `${proxy.latencyMs}ms` : "—"}
      </td>
      <td className="px-3 py-2">
        {proxy.inPool ? (
          <span className="px-2 py-0.5 rounded text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            in pool
          </span>
        ) : (
          <button
            onClick={() => onAddToPool(proxy.id)}
            disabled={adding}
            aria-label={`Add ${proxy.host}:${proxy.port} to pool`}
            className="px-2 py-0.5 rounded text-xs bg-primary/15 text-primary border border-primary/30 hover:bg-primary/25 disabled:opacity-50"
          >
            {adding ? "..." : "⊕"}
          </button>
        )}
      </td>
    </tr>
  );
}
