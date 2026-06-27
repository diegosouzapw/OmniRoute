"use client";
import { useState } from "react";
import { usePreviewCompression, type Lane, type PreviewBatch } from "@/hooks/usePreviewCompression";
import { WaterfallInspector } from "./WaterfallInspector";
import { DiffPane } from "./DiffPane";
import { PlaygroundInput, LANE_ENGINES } from "./PlaygroundInput";
export interface PlayViewProps { text: string; onText: (t: string) => void; laneEngines?: readonly string[]; }

function laneStatus(l: Lane): string {
  return l.error ? "⚠ erro" : l.run ? `−${l.run.savingsPercent}%` : "—";
}

function resolveActiveDiff(batch: PreviewBatch | null, selectedLane: string | null) {
  const run = batch?.lanes.find((l) => l.engine === selectedLane)?.run ?? null;
  return run?.diff ?? batch?.combined?.diff ?? null;
}

function LaneList({ lanes, onSelect }: { lanes: Lane[]; onSelect: (e: string) => void }) {
  return (
    <>
      {lanes.map((l) => (
        <button key={l.engine} data-testid="play-lane" onClick={() => onSelect(l.engine)} className="flex w-full items-center justify-between border-b py-1 text-left font-mono text-xs">
          <span>{l.engine}</span>
          <span>{laneStatus(l)}</span>
        </button>
      ))}
    </>
  );
}

export function PlayView({ text, onText, laneEngines = LANE_ENGINES }: PlayViewProps) {
  const [active, setActive] = useState<string[]>(["rtk", "caveman"]);
  const [selectedLane, setSelectedLane] = useState<string | null>(null);
  const { batch, loading, run } = usePreviewCompression();
  const messages = [{ role: "user", content: text }];
  const toggle = (e: string) => setActive((a) => (a.includes(e) ? a.filter((x) => x !== e) : [...a, e]));
  const onRun = () => run({ messages, laneEngines: [...laneEngines], activeEngines: orderByStack(active, laneEngines) });
  const activeDiff = resolveActiveDiff(batch, selectedLane);
  return (
    <div className="flex h-full gap-3">
      <div className="w-[260px] shrink-0">
        <PlaygroundInput text={text} onText={onText} active={active} onToggleActive={toggle} onRun={onRun} loading={loading} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3 overflow-auto">
        {batch?.combined && (
          <section data-testid="play-combined">
            <header className="text-xs font-semibold">Fluxo combinado — {active.join(" → ")}</header>
            <WaterfallInspector run={batch.combined} />
          </section>
        )}
        <section>
          <header className="text-xs font-semibold">Cada camada sozinha</header>
          <LaneList lanes={batch?.lanes ?? []} onSelect={setSelectedLane} />
        </section>
        {activeDiff && (
          <section>
            <header className="text-xs font-semibold">Diff — {selectedLane ?? "combinado"}</header>
            <DiffPane segments={activeDiff} preservedBlocks={[]} />
          </section>
        )}
      </div>
    </div>
  );
}
function orderByStack(active: string[], order: readonly string[]): string[] { return order.filter((e) => active.includes(e)); }
