"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";

interface ApiKeyInfo {
  id: string;
  name: string;
}

interface ApiKeyFilterDropdownProps {
  available: ApiKeyInfo[];
  selected: string[];
  onChange: (ids: string[]) => void;
}

function maskKeyName(name: string): string {
  if (!name || name.length <= 8) return name || "unknown";
  return `${name.slice(0, 6)}…${name.slice(-4)}`;
}

export default function ApiKeyFilterDropdown({
  available,
  selected,
  onChange,
}: ApiKeyFilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return available;
    return available.filter(
      (k) => k.name.toLowerCase().includes(q) || k.id.toLowerCase().includes(q)
    );
  }, [available, query]);

  const isAllSelected = selected.length === 0;

  const toggleKey = useCallback(
    (id: string) => {
      if (selected.includes(id)) {
        const next = selected.filter((s) => s !== id);
        onChange(next);
      } else {
        onChange([...selected, id]);
      }
    },
    [selected, onChange]
  );

  const selectAll = useCallback(() => {
    onChange([]);
  }, [onChange]);

  const buttonLabel = useMemo(() => {
    if (isAllSelected) return "All Keys";
    if (selected.length === 1) {
      const key = available.find((k) => k.id === selected[0]);
      return key ? maskKeyName(key.name) : "1 key";
    }
    return `${selected.length} keys`;
  }, [isAllSelected, selected, available]);

  if (available.length === 0) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
          isAllSelected
            ? "border-border/50 bg-black/[0.03] text-text-muted hover:text-text-main dark:bg-white/[0.03]"
            : "border-primary/40 bg-primary/10 text-primary"
        }`}
      >
        <span className="material-symbols-outlined text-[14px]">vpn_key</span>
        {buttonLabel}
        <span
          className={`material-symbols-outlined text-[14px] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-1.5 w-[260px] rounded-xl border border-border/50 bg-surface shadow-xl"
          style={{ backdropFilter: "blur(16px)" }}
        >
          {/* Search */}
          {available.length > 5 && (
            <div className="border-b border-border/30 p-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search keys…"
                className="w-full rounded-md border border-border/30 bg-black/[0.03] px-2.5 py-1.5 text-xs text-text-main placeholder:text-text-muted focus:outline-none focus:border-primary dark:bg-white/[0.03]"
                autoFocus
              />
            </div>
          )}

          <div className="max-h-[280px] overflow-y-auto p-1.5">
            {/* All Keys option */}
            <button
              type="button"
              onClick={selectAll}
              className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs transition-colors ${
                isAllSelected
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-text-muted hover:bg-black/[0.04] hover:text-text-main dark:hover:bg-white/[0.04]"
              }`}
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] ${
                  isAllSelected
                    ? "border-primary bg-primary text-white"
                    : "border-border/60 bg-transparent"
                }`}
              >
                {isAllSelected && (
                  <span className="material-symbols-outlined text-[12px]">check</span>
                )}
              </span>
              All Keys
              <span className="ml-auto text-[10px] text-text-muted font-normal">
                {available.length}
              </span>
            </button>

            {/* Divider */}
            <div className="my-1 h-px bg-border/20" />

            {/* Individual keys */}
            {filtered.map((key) => {
              const isChecked = selected.includes(key.id);

              return (
                <button
                  key={key.id}
                  type="button"
                  onClick={() => toggleKey(key.id)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs transition-colors ${
                    isChecked
                      ? "bg-primary/[0.06] text-text-main"
                      : "text-text-muted hover:bg-black/[0.04] hover:text-text-main dark:hover:bg-white/[0.04]"
                  }`}
                  title={key.name || key.id}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] ${
                      isChecked
                        ? "border-primary bg-primary text-white"
                        : "border-border/60 bg-transparent"
                    }`}
                  >
                    {isChecked && (
                      <span className="material-symbols-outlined text-[12px]">check</span>
                    )}
                  </span>
                  <span className="truncate">{maskKeyName(key.name || key.id)}</span>
                </button>
              );
            })}

            {filtered.length === 0 && (
              <p className="px-2.5 py-3 text-center text-[11px] text-text-muted">No keys match</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
