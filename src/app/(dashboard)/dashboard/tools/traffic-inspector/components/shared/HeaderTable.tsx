"use client";

import { useState } from "react";

interface HeaderTableProps {
  headers: Record<string, string>;
}

export function HeaderTable({ headers }: HeaderTableProps) {
  const [masked, setMasked] = useState(true);
  const SENSITIVE = /authorization|cookie|x-api-key|bearer/i;

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xs text-text-muted">Sensitive headers</span>
        <button
          type="button"
          onClick={() => setMasked((m) => !m)}
          className="text-xs text-blue-400 hover:text-blue-300 focus-ring rounded"
        >
          {masked ? "Show" : "Hide"}
        </button>
      </div>
      <table className="w-full text-xs font-mono border-collapse bg-surface">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left px-2 py-1 text-text-muted font-medium">Name</th>
            <th className="text-left px-2 py-1 text-text-muted font-medium">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(headers).map(([name, value]) => {
            const isSensitive = SENSITIVE.test(name);
            const display = masked && isSensitive ? "••••••••" : value;
            return (
              <tr key={name} className="border-b border-border/50 hover:bg-bg-subtle">
                <td className="px-2 py-1 text-text-muted select-text">{name}</td>
                <td
                  className={`px-2 py-1 break-all select-text ${isSensitive ? "text-amber-400" : "text-text-main"}`}
                >
                  {display}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
