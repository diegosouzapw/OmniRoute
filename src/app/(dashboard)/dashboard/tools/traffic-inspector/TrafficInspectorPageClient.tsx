"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { InterceptedRequest } from "@/mitm/inspector/types";
import { useTrafficStream } from "./hooks/useTrafficStream";
import { useTrafficFilters } from "./hooks/useTrafficFilters";
import { useResizablePanels } from "./hooks/useResizablePanels";
import { useSessionRecorder } from "./hooks/useSessionRecorder";
import { useSystemProxyExitGuard } from "./hooks/useSystemProxyExitGuard";
import { CaptureModesToolbar } from "./components/CaptureModesToolbar";
import { TopBarControls } from "./components/TopBarControls";
import { RequestStreamingList } from "./components/RequestStreamingList";
import { DetailsPanel } from "./components/DetailsPanel";
import { HistoricSessionBanner } from "./components/session/HistoricSessionBanner";

const BUFFER_MAX = 1000;

export function TrafficInspectorPageClient() {
  const [containerHeight, setContainerHeight] = useState(600);
  const listContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<InterceptedRequest | null>(null);
  const {
    filters,
    setProfile,
    setHost,
    setAgent,
    setStatus,
    setSessionId,
    setSameContext,
    toggleLive,
  } = useTrafficFilters();
  const [{ listWidth, collapsed }, { startDrag, toggleCollapse }] = useResizablePanels();
  const [streamState, streamActions] = useTrafficStream(filters);
  const recorder = useSessionRecorder();
  const [captureModes, setCaptureModes] = useState<{ systemProxy?: { applied: boolean } } | null>(
    null
  );

  useEffect(() => {
    let cancelled = false;
    fetch("/api/tools/traffic-inspector/capture-modes")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { systemProxy?: { applied: boolean } } | null) => {
        if (!cancelled) setCaptureModes(data);
      })
      .catch(() => {
        /* best-effort */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useSystemProxyExitGuard({ applied: captureModes?.systemProxy?.applied ?? false });

  const listContainerCallback = useCallback((el: HTMLDivElement | null) => {
    listContainerRef.current = el;
    if (el) setContainerHeight(el.clientHeight);
  }, []);

  const exportHar = useCallback(async () => {
    try {
      const res = await fetch("/api/tools/traffic-inspector/export.har");
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `traffic-${Date.now()}.har`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // ignore
    }
  }, []);

  const handleSessionSelect = useCallback(
    (id: string | undefined) => {
      setSessionId(id);
    },
    [setSessionId]
  );

  const handleRecordStart = useCallback(() => {
    void recorder.start();
  }, [recorder]);

  const handleRecordStop = useCallback(() => {
    void recorder.stop();
  }, [recorder]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Capture modes toolbar */}
      <div className="shrink-0 px-4 pt-4 pb-2">
        <CaptureModesToolbar customHostCount={0} />
      </div>

      {/* Historic session banner */}
      {filters.sessionId !== undefined && (
        <div className="shrink-0 px-4 pb-2">
          <HistoricSessionBanner
            sessionName={
              recorder.sessions.find((s) => s.id === filters.sessionId)?.name ?? null
            }
            onBackToLive={() => setSessionId(undefined)}
          />
        </div>
      )}

      {/* Top bar filter/controls */}
      <div className="shrink-0">
        <TopBarControls
          filters={filters}
          onProfileChange={setProfile}
          onHostChange={setHost}
          onAgentChange={setAgent}
          onStatusChange={setStatus}
          liveOnly={filters.liveOnly ?? false}
          onToggleLive={toggleLive}
          paused={streamState.paused}
          onPause={streamActions.pause}
          onResume={streamActions.resume}
          onClear={streamActions.clear}
          onExport={exportHar}
          connected={streamState.connected}
          total={streamState.total}
          maxSize={BUFFER_MAX}
          pendingCount={streamState.pendingCount}
          recording={recorder.recording}
          session={recorder.session}
          elapsed={recorder.elapsed}
          sessions={recorder.sessions}
          onRecordStart={handleRecordStart}
          onRecordStop={handleRecordStop}
          onSessionSelect={handleSessionSelect}
          onSessionDelete={recorder.deleteSession}
        />
      </div>

      {/* Split pane */}
      <div className="flex flex-1 overflow-hidden">
        {/* List pane */}
        <div
          ref={listContainerCallback}
          className="shrink-0 overflow-hidden border-r border-border flex flex-col"
          style={{ width: listWidth }}
        >
          <div className="flex items-center justify-between px-2 py-1 border-b border-border bg-bg-subtle shrink-0">
            <span className="text-xs text-text-muted font-medium">
              {streamState.total} requests
            </span>
            <button
              type="button"
              onClick={toggleCollapse}
              className="text-text-muted hover:text-text-main focus-ring rounded"
              aria-label={collapsed ? "Expand list" : "Collapse list"}
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                {collapsed ? "chevron_right" : "chevron_left"}
              </span>
            </button>
          </div>

          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <RequestStreamingList
                requests={streamState.requests}
                selectedId={selectedRequest?.id ?? null}
                onSelect={setSelectedRequest}
                containerHeight={containerHeight}
                onSameContext={setSameContext}
                sameContextKey={filters.sameContextKey}
                onClearContextFilter={() => setSameContext(undefined)}
              />
            </div>
          )}

          {collapsed && (
            <div className="flex-1 flex items-start justify-center pt-4">
              <span className="text-xs text-text-muted font-mono" style={{ writingMode: "vertical-rl" }}>
                {streamState.total} reqs
              </span>
            </div>
          )}
        </div>

        {/* Drag handle */}
        <div
          onMouseDown={startDrag}
          className="w-1 bg-border hover:bg-blue-500 cursor-col-resize shrink-0 transition-colors"
          aria-hidden="true"
        />

        {/* Detail pane */}
        <div className="flex-1 overflow-hidden">
          <DetailsPanel request={selectedRequest} allRequests={streamState.requests} />
        </div>
      </div>
    </div>
  );
}
