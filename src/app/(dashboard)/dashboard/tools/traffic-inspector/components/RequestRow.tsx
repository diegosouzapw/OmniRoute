"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils/cn";
import type { InterceptedRequest } from "@/mitm/inspector/types";
import { ContextColorBar } from "./shared/ContextColorBar";
import { AgentEmoji } from "./shared/AgentEmoji";

interface RequestRowProps {
  request: InterceptedRequest;
  selected: boolean;
  onClick: () => void;
  onSameContext?: (contextKey: string) => void;
  style?: React.CSSProperties;
}

function statusColor(status: InterceptedRequest["status"]): string {
  if (status === "in-flight") return "text-gray-400";
  if (status === "error") return "text-red-400";
  if (typeof status === "number") {
    if (status < 300) return "text-green-400";
    if (status < 400) return "text-yellow-400";
    if (status < 500) return "text-orange-400";
    return "text-red-400";
  }
  return "text-text-muted";
}

function formatSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${bytes}B`;
}

function formatTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString("en", { hour12: false });
  } catch {
    return "";
  }
}

export function RequestRow({ request, selected, onClick, onSameContext, style }: RequestRowProps) {
  const t = useTranslations("trafficInspector");
  const pathShort = request.path.length > 32 ? `…${request.path.slice(-30)}` : request.path;
  const sc = statusColor(request.status);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
      style={style}
      className={cn(
        "flex items-stretch gap-1 border-b border-border/40 cursor-pointer hover:bg-bg-subtle",
        "focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500",
        selected && "bg-surface"
      )}
    >
      <ContextColorBar contextKey={request.contextKey} />
      <div className="flex-1 min-w-0 px-2 py-1.5">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-text-muted shrink-0 font-mono">
            {formatTime(request.timestamp)}
          </span>
          <span className="font-mono font-medium text-text-main shrink-0">{request.method}</span>
          <span className={cn("font-mono font-bold shrink-0", sc)}>{String(request.status)}</span>
          <span className="text-text-muted shrink-0">{formatSize(request.responseSize)}</span>
          <span className="shrink-0">
            <AgentEmoji agentId={request.agent} />
          </span>
          {request.processName && (
            <span
              className="text-text-muted shrink-0 font-mono opacity-70 truncate max-w-[120px]"
              title={request.pid ? `PID ${request.pid}` : undefined}
            >
              ⚙ {request.processName}
            </span>
          )}
        </div>
        <div className="text-xs text-text-muted truncate font-mono mt-0.5">
          {request.host}
          <span className="text-text-main">{pathShort}</span>
        </div>
        {request.contextKey && (
          <button
            type="button"
            className="text-[10px] text-text-muted font-mono opacity-60 hover:opacity-100 hover:text-blue-400 focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 rounded"
            title={t("filterByContext")}
            onClick={(e) => {
              e.stopPropagation();
              onSameContext?.(request.contextKey as string);
            }}
          >
            ctx #{request.contextKey.slice(0, 6)}
          </button>
        )}
      </div>
    </div>
  );
}
