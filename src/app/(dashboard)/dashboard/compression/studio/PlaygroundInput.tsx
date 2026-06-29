"use client";
export const LANE_ENGINES = ["session-dedup", "ccr", "lite", "rtk", "ionizer", "headroom", "caveman", "aggressive", "ultra"] as const;
export interface PlaygroundInputProps { text: string; onText: (t: string) => void; active: string[]; onToggleActive: (engine: string) => void; onRun: () => void; loading: boolean; fidelityGate: boolean; onToggleFidelity: () => void; fuzzyDedup: boolean; onToggleFuzzy: () => void; riskGate: boolean; onToggleRisk: () => void; quantumLock: boolean; onToggleQuantum: () => void; }
export function PlaygroundInput({ text, onText, active, onToggleActive, onRun, loading, fidelityGate, onToggleFidelity, fuzzyDedup, onToggleFuzzy, riskGate, onToggleRisk, quantumLock, onToggleQuantum }: PlaygroundInputProps) {
  return (
    <div className="flex flex-col gap-3">
      <textarea data-testid="play-input" className="min-h-[160px] w-full rounded border p-2 font-mono text-xs" value={text} onChange={(e) => onText(e.target.value)} placeholder="Cole prompt / tool-output / contexto..." />
      <div>
        <div className="text-[10px] uppercase opacity-60">Ativos no fluxo combinado</div>
        {LANE_ENGINES.map((e) => (<label key={e} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={active.includes(e)} onChange={() => onToggleActive(e)} />{e}</label>))}
        <label className="flex items-center gap-2 text-sm opacity-50"><input type="checkbox" disabled /> llmlingua <span className="text-[10px]">(requer modelo ONNX)</span></label>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" data-testid="fidelity-toggle" checked={fidelityGate} onChange={onToggleFidelity} />
        Verificar fidelidade (rejeitar camada que corromper)
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" data-testid="fuzzy-toggle" checked={fuzzyDedup} onChange={onToggleFuzzy} />
        Fuzzy dedup (near-duplicate → CCR)
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" data-testid="risk-toggle" checked={riskGate} onChange={onToggleRisk} />
        Proteger conteúdo sensível (risk-gate)
      </label>
      <label className="flex items-center gap-1 text-xs">
        <input type="checkbox" data-testid="quantum-toggle" checked={quantumLock} onChange={onToggleQuantum} />
        QuantumLock (stabilize cache prefix)
      </label>
      <button data-testid="play-run" className="rounded bg-blue-500/30 py-2 font-semibold" onClick={onRun} disabled={loading}>{loading ? "Rodando..." : "▶ Run"}</button>
    </div>
  );
}
