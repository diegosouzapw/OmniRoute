"use client";
import type { DiffSegment } from "./compressionFlowModel";
export interface DiffPaneProps { segments: DiffSegment[]; preservedBlocks: Array<{ kind: string; preview: string }>; }
const SEG_CLASS: Record<DiffSegment["type"], string> = { same: "opacity-90", removed: "bg-red-500/20 line-through", added: "bg-green-500/20" };
export function DiffPane({ segments, preservedBlocks }: DiffPaneProps) {
  return (
    <div data-testid="diff-pane" className="font-mono text-xs leading-relaxed">
      <div className="mb-2 flex gap-2 text-[10px]">
        <span className="rounded bg-blue-500/20 px-2 py-0.5">inline</span>
        <button type="button" disabled title="split view em breve" className="rounded px-2 py-0.5 opacity-40">
          split (em breve)
        </button>
      </div>
      <div className="whitespace-pre-wrap">
        {segments.map((seg, i) => (<span key={i} data-testid={`diff-${seg.type}`} className={SEG_CLASS[seg.type]}>{seg.text}</span>))}
      </div>
      {preservedBlocks.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1" data-testid="diff-preserved">
          {preservedBlocks.map((b, i) => (<span key={i} className="rounded border border-purple-500/50 px-1 text-[10px]">{b.kind}: {b.preview.slice(0, 40)}</span>))}
        </div>
      )}
    </div>
  );
}
