"use client";

/**
 * ColumnToggle — Shared UI primitive (T-29)
 *
 * Dropdown menu for toggling table column visibility.
 * Used by RequestLoggerV2, ProxyLogger, etc.
 *
 * Usage:
 *   <ColumnToggle
 *     columns={[{ key: 'model', label: 'Model' }, ...]}
 *     visible={{ model: true, provider: false, ... }}
 *     onToggle={(key) => setVisible({...visible, [key]: !visible[key]})}
 *   />
 */

import { useState, useRef, useEffect } from "react";

export default function ColumnToggle({ columns = [], visible = {}, onToggle }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        title="Toggle columns"
        style={{
          padding: "6px 10px",
          borderRadius: "6px",
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.05)",
          color: "var(--text-secondary, #888)",
          fontSize: "13px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <span style={{ fontSize: "14px" }}>⚙️</span>
        Columns
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            marginTop: "4px",
            background: "rgba(20,20,30,0.95)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            padding: "8px",
            zIndex: 50,
            minWidth: "160px",
            backdropFilter: "blur(12px)",
          }}
        >
          {columns.map((col) => (
            <label
              key={col.key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "4px 8px",
                cursor: "pointer",
                fontSize: "12px",
                color: visible[col.key]
                  ? "var(--text-primary, #e0e0e0)"
                  : "var(--text-secondary, #888)",
                borderRadius: "4px",
              }}
            >
              <input
                type="checkbox"
                checked={visible[col.key] ?? true}
                onChange={() => onToggle(col.key)}
                style={{ accentColor: "#6366f1" }}
              />
              {col.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
