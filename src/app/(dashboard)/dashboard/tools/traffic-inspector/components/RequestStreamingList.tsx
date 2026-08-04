"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import type { InterceptedRequest } from "@/mitm/inspector/types";
import { useVirtualList } from "../hooks/useVirtualList";
import { RequestRow } from "./RequestRow";

interface RequestStreamingListProps {
  requests: InterceptedRequest[];
  selectedId: string | null;
  onSelect: (req: InterceptedRequest) => void;
  containerHeight: number;
  onSameContext?: (contextKey: string) => void;
  sameContextKey?: string;
  onClearContextFilter?: () => void;
}

export function RequestStreamingList({
  requests,
  selectedId,
  onSelect,
  containerHeight,
  onSameContext,
  sameContextKey,
  onClearContextFilter,
}: RequestStreamingListProps) {
  const t = useTranslations("trafficInspector");
  const { virtualItems, totalHeight, containerRef, rowRef } = useVirtualList(
    requests,
    containerHeight
  );

  if (requests.length === 0) {
    return (
      <div className="h-full flex flex-col">
        {sameContextKey && (
          <div className="shrink-0 flex items-center gap-2 px-2 py-1 bg-blue-900/30 border-b border-blue-500/40 text-xs text-blue-300 font-mono">
            <span>{t("filteringContext", { context: sameContextKey.slice(0, 6) })}</span>
            <button
              type="button"
              onClick={onClearContextFilter}
              className="ml-1 underline hover:text-blue-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-400"
            >
              [{t("clear")}]
            </button>
          </div>
        )}
        <div
          ref={containerRef}
          className="flex-1 flex items-center justify-center text-sm text-text-muted"
        >
          <div className="text-center space-y-2">
            <span
              className="material-symbols-outlined text-[36px] text-text-muted block"
              aria-hidden="true"
            >
              network_check
            </span>
            <p>{t("noRequests")}</p>
            <p className="text-xs">{t("noRequestsDesc")}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {sameContextKey && (
        <div className="shrink-0 flex items-center gap-2 px-2 py-1 bg-blue-900/30 border-b border-blue-500/40 text-xs text-blue-300 font-mono">
          <span>{t("filteringContext", { context: sameContextKey.slice(0, 6) })}</span>
          <button
            type="button"
            onClick={onClearContextFilter}
            className="ml-1 underline hover:text-blue-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-400"
          >
            [{t("clear")}]
          </button>
        </div>
      )}
      <div
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className="flex-1 overflow-y-auto relative"
        style={{ contain: "strict" }}
      >
        <div style={{ height: totalHeight, position: "relative" }}>
          {virtualItems.map(({ index, item, top }) => (
            <div
              key={item.id}
              ref={rowRef(index)}
              style={{ position: "absolute", top, left: 0, right: 0 }}
            >
              <RequestRow
                request={item}
                selected={item.id === selectedId}
                onClick={() => onSelect(item)}
                onSameContext={onSameContext}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
