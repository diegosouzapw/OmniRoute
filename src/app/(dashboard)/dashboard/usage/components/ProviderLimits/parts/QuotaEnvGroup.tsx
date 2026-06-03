"use client";

import { useState } from "react";
import QuotaCardGrid from "../QuotaCardGrid";

interface Props {
  tag: string;
  connections: any[];
  /** All props piped to the underlying QuotaCardGrid */
  quotaData: Record<string, any>;
  loading: Record<string, boolean>;
  errors: Record<string, string | null>;
  lastRefreshedAt: Record<string, string | undefined>;
  expandedRows: Set<string>;
  emailsVisible: boolean;
  providerLabels: Record<string, string>;
  onToggle: (id: string) => void;
  onRefresh: (id: string, provider: string) => void;
  onOpenCutoff: (connection: any) => void;
  /** Initial open state — defaults to true; UI persistence is out of scope. */
  defaultOpen?: boolean;
}

export default function QuotaEnvGroup({
  tag,
  connections,
  defaultOpen = true,
  ...gridProps
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <details
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
      className="rounded-lg border border-border bg-surface overflow-hidden"
    >
      <summary className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
        <span className="material-symbols-outlined text-[14px] text-text-muted">
          {open ? "expand_less" : "expand_more"}
        </span>
        <span className="text-[13px] font-semibold text-text-main">{tag}</span>
        <span className="text-[11px] text-text-muted tabular-nums">({connections.length})</span>
      </summary>
      <div className="px-3 pb-3">
        <QuotaCardGrid connections={connections} {...gridProps} />
      </div>
    </details>
  );
}
