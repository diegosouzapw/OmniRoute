"use client";
export const LANE_ENGINES = ["session-dedup", "ccr", "lite", "rtk", "headroom", "caveman", "aggressive", "ultra"] as const;
export interface PlaygroundInputProps { text: string; onText: (t: string) => void; active: string[]; onToggleActive: (engine: string) => void; onRun: () => void; loading: boolean; }
export function PlaygroundInput({ text, onText, active, onToggleActive, onRun, loading }: PlaygroundInputProps) {
  return (
    <div className="flex flex-col gap-3">
      <textarea data-testid="play-input" className="min-h-[160px] w-full rounded border p-2 font-mono text-xs" value={text} onChange={(e) => onText(e.target.value)} placeholder="Cole prompt / tool-output / contexto..." />
      <div>
        <div className="text-[10px] uppercase opacity-60">Ativos no fluxo combinado</div>
        {LANE_ENGINES.map((e) => (<label key={e} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={active.includes(e)} onChange={() => onToggleActive(e)} />{e}</label>))}
        <label className="flex items-center gap-2 text-sm opacity-50"><input type="checkbox" disabled /> llmlingua <span className="text-[10px]">(requer modelo ONNX)</span></label>
      </div>
      <button data-testid="play-run" className="rounded bg-blue-500/30 py-2 font-semibold" onClick={onRun} disabled={loading}>{loading ? "Rodando..." : "▶ Run"}</button>
    </div>
  );
}
