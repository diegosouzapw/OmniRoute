"use client";

import { useState } from "react";
import type { SessionInfo } from "../../hooks/useSessionRecorder";

interface SessionPickerProps {
  sessions: SessionInfo[];
  selectedId?: string;
  onSelect: (id: string | undefined) => void;
  onDelete: (id: string) => void;
}

export function SessionPicker({ sessions, selectedId, onSelect, onDelete }: SessionPickerProps) {
  const [open, setOpen] = useState(false);

  const selected = sessions.find((s) => s.id === selectedId);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 rounded border border-border bg-bg-subtle px-2 py-1 text-xs text-text-main hover:bg-surface focus-ring"
      >
        <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
          folder_open
        </span>
        {selected ? selected.name ?? `Session ${selected.id.slice(0, 6)}` : "Sessions"}
        <span className="material-symbols-outlined text-[12px] ml-1" aria-hidden="true">
          {open ? "expand_less" : "expand_more"}
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[200px] rounded-lg border border-border bg-surface shadow-lg py-1">
          <button
            type="button"
            onClick={() => { onSelect(undefined); setOpen(false); }}
            className="w-full text-left px-3 py-1.5 text-xs text-text-muted hover:bg-bg-subtle focus-ring"
          >
            All traffic (no session)
          </button>
          {sessions.length === 0 && (
            <p className="px-3 py-2 text-xs text-text-muted italic">No sessions yet</p>
          )}
          {sessions.map((s) => (
            <div key={s.id} className="flex items-center group">
              <button
                type="button"
                onClick={() => { onSelect(s.id); setOpen(false); }}
                className={`flex-1 text-left px-3 py-1.5 text-xs hover:bg-bg-subtle focus-ring ${
                  selectedId === s.id ? "text-blue-400 font-medium" : "text-text-main"
                }`}
              >
                {s.name ?? `Session ${s.id.slice(0, 6)}`}
                <span className="text-text-muted ml-1">({s.requestCount} reqs)</span>
              </button>
              <button
                type="button"
                onClick={() => { onDelete(s.id); if (selectedId === s.id) onSelect(undefined); }}
                className="px-2 text-text-muted hover:text-red-400 opacity-0 group-hover:opacity-100 focus-ring rounded"
                aria-label="Delete session"
              >
                <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                  delete
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
