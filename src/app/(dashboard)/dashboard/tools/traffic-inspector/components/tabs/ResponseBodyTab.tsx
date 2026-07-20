"use client";

import { useState } from "react";
import type { InterceptedRequest } from "@/mitm/inspector/types";
import { parseSseStream, mergeStream } from "@/mitm/inspector/sseMerger";
import { JsonViewer } from "../shared/JsonViewer";
import { SseEventList } from "../shared/SseEventList";

interface ResponseBodyTabProps {
  request: InterceptedRequest;
}

export function ResponseBodyTab({ request }: ResponseBodyTabProps) {
  const [showRaw, setShowRaw] = useState(false);

  const body = request.responseBody;
  if (!body) {
    return <p className="p-4 text-sm text-text-muted">No response body.</p>;
  }

  const isSSE = body.startsWith("data:") || body.includes("\ndata:");
  const events = isSSE ? parseSseStream(body) : [];
  const merged = isSSE && !showRaw ? mergeStream(events) : null;

  let parsed: unknown = null;
  if (!isSSE) {
    try {
      parsed = JSON.parse(body);
    } catch {
      // not JSON
    }
  }

  return (
    <div className="h-full flex flex-col gap-2 p-2">
      <div className="flex items-center gap-2">
        {isSSE && (
          <button
            type="button"
            onClick={() => setShowRaw((r) => !r)}
            className="text-xs text-text-muted hover:text-text-main border border-border rounded px-2 py-0.5 focus-ring"
          >
            {showRaw ? "Merged view" : "Raw events"}
          </button>
        )}
        <span className="ml-auto text-xs text-text-muted">{request.responseSize} B</span>
        {request.status === "in-flight" && (
          <span className="text-xs text-amber-400 animate-pulse">streaming…</span>
        )}
      </div>
      <div className="flex-1 overflow-auto bg-bg-subtle rounded border border-border p-2">
        {isSSE && showRaw ? (
          <SseEventList events={events} />
        ) : isSSE && merged ? (
          <div className="space-y-2">
            {merged.text && (
              <pre className="text-xs font-mono text-text-main whitespace-pre-wrap break-words">{merged.text}</pre>
            )}
            {merged.toolCalls && merged.toolCalls.length > 0 && (
              <JsonViewer data={merged.toolCalls} />
            )}
          </div>
        ) : parsed ? (
          <JsonViewer data={parsed} />
        ) : (
          <pre className="text-xs font-mono text-text-main whitespace-pre-wrap break-all">{body}</pre>
        )}
      </div>
    </div>
  );
}
