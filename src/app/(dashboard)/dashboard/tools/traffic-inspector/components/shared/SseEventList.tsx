"use client";

import type { SseEvent } from "@/mitm/inspector/sseMerger";

interface SseEventListProps {
  events: SseEvent[];
}

export function SseEventList({ events }: SseEventListProps) {
  return (
    <div className="flex flex-col gap-1 font-mono text-xs overflow-auto max-h-full">
      {events.map((ev, i) => (
        <div key={i} className="flex gap-2 border-b border-border/30 pb-1">
          <span className="text-text-muted shrink-0 w-8 text-right">{i + 1}</span>
          <span className="text-amber-400 shrink-0">{ev.event ?? "data"}</span>
          <span className="text-text-main break-all">{ev.data}</span>
        </div>
      ))}
      {events.length === 0 && (
        <p className="text-text-muted italic">No SSE events</p>
      )}
    </div>
  );
}
