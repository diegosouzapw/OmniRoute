"use client";

import { useState } from "react";
import { Card } from "@/shared/components";
import { useServiceStatus } from "../hooks/useServiceStatus";

const NAME = "9router";

/**
 * G-10: iframe points to our reverse proxy, NOT directly to 127.0.0.1:port.
 * CSP exception (`frame-ancestors 'self'`) is applied to this proxy path in next.config.mjs.
 */
export function NinerouterEmbedFrame() {
  const { data } = useServiceStatus(NAME);
  const [expanded, setExpanded] = useState(false);

  const isRunning = data?.state === "running";

  if (!isRunning) return null;

  return (
    <Card padding="none" className="overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium hover:bg-bg-subtle transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-text-muted">web</span>
          9Router Web UI
          <a
            href="/dashboard/providers/services/9router/embed/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-normal text-primary hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            open in new tab
          </a>
        </div>
        <span className="material-symbols-outlined text-[16px] text-text-muted">
          {expanded ? "expand_less" : "expand_more"}
        </span>
      </button>

      {expanded && (
        <iframe
          src="/dashboard/providers/services/9router/embed/"
          title="9Router Web UI"
          className="h-[600px] w-full border-t border-border"
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      )}
    </Card>
  );
}
