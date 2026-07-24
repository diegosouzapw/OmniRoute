"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { getHttpStatusStyle } from "@/shared/constants/colors";
import { copyToClipboard } from "@/shared/utils/clipboard";
import RequestLoggerDetail from "@/shared/components/RequestLoggerDetail";

interface TimelineLog {
  id: string;
  timestamp: string;
  status: number;
  model: string | null;
  provider: string | null;
  account: string | null;
  duration: number;
  tokens: { in: number; out: number };
  active?: boolean;
  completed?: boolean;
  error?: string | null;
  path?: string | null;
}

interface Lane {
  startMs: number;
  endMs: number;
}

type ViewMode = "follow" | "live" | "pan";

const VISIBLE_WINDOW_MS = 5 * 60 * 1000;
const BAR_HEIGHT = 28;
const LANE_GAP = 4;
const LANE_HEIGHT = BAR_HEIGHT + LANE_GAP;
const HEADER_HEIGHT = 48;
const AXIS_HEIGHT = 32;
const MIN_BAR_WIDTH = 3;
const POLL_INTERVAL_MS = 2000;
const FOLLOW_LINE_X = 0.75;
const LIVE_LINE_FRACTION = 0.9;

function computeBarRange(log: TimelineLog, nowMs: number): { startMs: number; endMs: number } {
  const ts = new Date(log.timestamp).getTime();
  if (log.active) return { startMs: ts, endMs: nowMs };
  if (log.completed) return { startMs: ts, endMs: ts + (log.duration || 0) };
  return { startMs: ts - (log.duration || 0), endMs: ts };
}

const MODE_META: Record<ViewMode, { label: string; description: string }> = {
  follow: {
    label: "Follow",
    description: "Axis scrolls left, NOW line stays at 75%",
  },
  live: {
    label: "Now",
    description: "Jump to current time, NOW line resets to center",
  },
  pan: {
    label: "Pan",
    description: "Drag to explore, background is frozen",
  },
};

function formatTimeAxis(ms: number): string {
  const d = new Date(ms);
  const h = d.getHours().toString().padStart(2, "0");
  const m = d.getMinutes().toString().padStart(2, "0");
  const s = d.getSeconds().toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function getStatusColor(status: number, active: boolean | undefined): string {
  if (active) return "#6366F1";
  return getHttpStatusStyle(status).bg;
}

function allocateLanes(items: TimelineLog[], nowMs: number): Map<string, number> {
  const lanes: Lane[] = [];
  const laneMap = new Map<string, number>();

  const sorted = [...items].sort((a, b) => {
    const aStart = new Date(a.timestamp).getTime();
    const bStart = new Date(b.timestamp).getTime();
    return aStart - bStart;
  });

  for (const item of sorted) {
    const { startMs, endMs } = computeBarRange(item, nowMs);

    let placed = false;
    for (let i = 0; i < lanes.length; i++) {
      if (lanes[i].endMs < startMs) {
        lanes[i] = { startMs, endMs };
        laneMap.set(item.id, i);
        placed = true;
        break;
      }
    }
    if (!placed) {
      laneMap.set(item.id, lanes.length);
      lanes.push({ startMs, endMs });
    }
  }

  return laneMap;
}

function truncateModel(model: string | null): string {
  if (!model) return "";
  const parts = model.split("/");
  const short = parts[parts.length - 1];
  return short.length > 16 ? short.slice(0, 15) + "\u2026" : short;
}

function formatDateLabel(ms: number): string {
  const d = new Date(ms);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[d.getMonth()]} ${d.getDate()}`;
}

export default function RequestTimeline() {
  const [logs, setLogs] = useState<TimelineLog[]>([]);
  const [mode, setMode] = useState<ViewMode>("follow");
  const [zoom, setZoom] = useState(1);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [nowMs, setNowMs] = useState(0);
  const [canvasWidth, setCanvasWidth] = useState(1200);
  const [panOffsetMs, setPanOffsetMs] = useState(0);
  const [panFrozenMs, setPanFrozenMs] = useState(0);
  const [liveBaseMs, setLiveBaseMs] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartOffset, setDragStartOffset] = useState(0);
  const [selectedLog, setSelectedLog] = useState<TimelineLog | null>(null);
  const [detailData, setDetailData] = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/usage/call-logs?limit=200")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (!cancelled) setLogs(data);
      })
      .catch(() => {});
    const id = setInterval(() => {
      fetch("/api/usage/call-logs?limit=200")
        .then((res) => (res.ok ? res.json() : []))
        .then((data) => setLogs(data))
        .catch(() => {});
    }, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return undefined;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setCanvasWidth(entry.contentRect.width);
      }
    });
    observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let lastUpdate = 0;
    const THROTTLE_MS = mode === "follow" ? 0 : 50;
    const onFrame = (frame: number) => {
      if (frame - lastUpdate >= THROTTLE_MS) {
        lastUpdate = frame;
        setNowMs(Date.now());
      }
      animRef.current = requestAnimationFrame(onFrame);
    };
    animRef.current = requestAnimationFrame(onFrame);
    return () => cancelAnimationFrame(animRef.current);
  }, [mode]);

  const windowMs = VISIBLE_WINDOW_MS / zoom;

  const timeRange = useMemo(() => {
    if (mode === "follow") {
      const end = nowMs + windowMs * (1 - FOLLOW_LINE_X);
      const start = end - windowMs;
      return { start, end };
    }
    if (mode === "live") {
      const base = liveBaseMs || nowMs;
      const elapsed = nowMs - base;
      const snapWindow = windowMs * LIVE_LINE_FRACTION;
      const slot = elapsed % snapWindow;
      const start = nowMs - slot - windowMs * (1 - LIVE_LINE_FRACTION);
      return { start, end: start + windowMs };
    }
    const base = panFrozenMs || nowMs;
    const start = base - windowMs * 0.5 + panOffsetMs;
    return { start, end: start + windowMs };
  }, [mode, nowMs, windowMs, liveBaseMs, panFrozenMs, panOffsetMs]);

  const { start: timeStart, end: timeEnd } = timeRange;

  const nowLineX = useMemo(() => {
    if (mode === "follow") {
      return FOLLOW_LINE_X * 100;
    }
    const totalMs = timeEnd - timeStart;
    if (totalMs <= 0) return 50;
    return Math.max(0, Math.min(100, ((nowMs - timeStart) / totalMs) * 100));
  }, [mode, nowMs, timeStart, timeEnd]);

  const visibleLogs = useMemo(() => {
    return logs.filter((log) => {
      const { startMs, endMs } = computeBarRange(log, nowMs);
      return endMs >= timeStart && startMs <= timeEnd;
    });
  }, [logs, timeStart, timeEnd, nowMs]);

  const laneMap = useMemo(() => allocateLanes(logs, nowMs), [logs, nowMs]);
  const maxLane = useMemo(() => (laneMap.size > 0 ? Math.max(...laneMap.values()) : 0), [laneMap]);

  const barElements = useMemo(() => {
    const totalMs = timeEnd - timeStart;
    return visibleLogs.map((log) => {
      const { startMs, endMs } = computeBarRange(log, nowMs);

      const leftPct = ((startMs - timeStart) / totalMs) * 100;
      const rightPct = ((endMs - timeStart) / totalMs) * 100;
      const widthPct = Math.max(rightPct - leftPct, (MIN_BAR_WIDTH / canvasWidth) * 100);

      const lane = laneMap.get(log.id) ?? 0;
      const topPx = lane * LANE_HEIGHT;
      const color = getStatusColor(log.status, log.active);
      const opacity = log.active ? 0.9 : 0.7;

      return { log, leftPct, widthPct, topPx, color, opacity };
    });
  }, [visibleLogs, timeStart, timeEnd, nowMs, laneMap, canvasWidth]);

  const axisTicks = useMemo(() => {
    const totalMs = timeEnd - timeStart;
    if (totalMs <= 0) return [];

    const MS_MIN = 60 * 1000;
    const MS_10MIN = 10 * MS_MIN;
    const MS_HOUR = 60 * MS_MIN;
    const MS_DAY = 24 * MS_HOUR;

    const startOfHour = (ms: number) => {
      const d = new Date(ms);
      d.setMinutes(0, 0, 0);
      return d.getTime();
    };

    const startOfDay = (ms: number) => {
      const d = new Date(ms);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    };

    const ticks: { pct: number; label: string; kind: "day" | "hour" | "minor" }[] = [];

    const addTick = (ms: number, label: string, kind: "day" | "hour" | "minor") => {
      const pct = ((ms - timeStart) / totalMs) * 100;
      if (pct >= 0 && pct <= 100) {
        ticks.push({ pct, label, kind });
      }
    };

    if (totalMs <= MS_HOUR * 4) {
      const interval = totalMs <= MS_10MIN ? MS_MIN : MS_10MIN;
      const first = Math.ceil(timeStart / interval) * interval;
      for (let ms = first; ms <= timeEnd; ms += interval) {
        const isDay = startOfDay(ms) === ms;
        const isHour = startOfHour(ms) === ms;
        addTick(
          ms,
          isDay ? formatDateLabel(ms) : formatTimeAxis(ms),
          isDay ? "day" : isHour ? "hour" : "minor"
        );
      }
    } else if (totalMs <= MS_DAY) {
      const interval = totalMs <= MS_HOUR * 6 ? MS_10MIN : MS_HOUR;
      const first = Math.ceil(timeStart / interval) * interval;
      for (let ms = first; ms <= timeEnd; ms += interval) {
        const isDay = startOfDay(ms) === ms;
        addTick(ms, isDay ? formatDateLabel(ms) : formatTimeAxis(ms), isDay ? "day" : "hour");
      }
    } else {
      const firstDay = startOfDay(timeStart);
      const start = firstDay < timeStart ? firstDay + MS_DAY : firstDay;
      for (let ms = start; ms <= timeEnd; ms += MS_DAY) {
        addTick(ms, formatDateLabel(ms), "day");
      }
    }

    return ticks;
  }, [timeStart, timeEnd]);

  const contentHeight = Math.max((maxLane + 1) * LANE_HEIGHT + 20, 200);

  const handleBarClick = useCallback((log: TimelineLog) => {
    setSelectedLog(log);
    setDetailData(null);
    setDetailLoading(true);
    fetch(`/api/logs/${log.id}`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setDetailData(data);
      })
      .catch(() => {})
      .finally(() => setDetailLoading(false));
  }, []);

  const handleBarHover = (log: TimelineLog, e: React.MouseEvent) => {
    setHoveredId(log.id);
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const handleBarLeave = () => {
    setHoveredId(null);
    setTooltipPos(null);
  };

  const handleReset = useCallback(() => {
    setPanOffsetMs(0);
    setLiveBaseMs(nowMs);
  }, [nowMs]);

  const handleModeChange = useCallback(
    (newMode: ViewMode) => {
      setMode(newMode);
      setPanOffsetMs(0);
      if (newMode === "pan") setPanFrozenMs(nowMs);
      setLiveBaseMs(nowMs);
    },
    [nowMs]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    if (mode !== "pan") {
      setMode("pan");
      setPanFrozenMs(nowMs);
      setLiveBaseMs(nowMs);
    }
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartOffset(mode === "pan" ? panOffsetMs : 0);
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartX;
      const msPerPx = windowMs / canvasWidth;
      setPanOffsetMs(dragStartOffset - dx * msPerPx);
    },
    [isDragging, dragStartX, dragStartOffset, windowMs, canvasWidth]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) return;
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.25 : 0.8;
    setZoom((z) => Math.max(0.001, Math.min(8, z * factor)));
  }, []);

  const hoveredLog = hoveredId ? logs.find((l) => l.id === hoveredId) : null;

  return (
    <div className="flex flex-col h-full min-h-0 select-none">
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b border-border shrink-0"
        style={{ height: HEADER_HEIGHT }}
      >
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-text-main">Request Timeline</h2>
          <span className="text-[10px] text-text-muted font-mono">
            {visibleLogs.length} visible / {logs.length} total
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Mode selector */}
          <div className="flex items-center rounded-lg border border-border overflow-hidden">
            {(["follow", "live", "pan"] as ViewMode[]).map((m) => (
              <button
                key={m}
                onClick={() => handleModeChange(m)}
                title={MODE_META[m].description}
                className={`px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  mode === m
                    ? "bg-primary text-white"
                    : "bg-bg-subtle text-text-muted hover:text-text-main"
                }`}
              >
                {MODE_META[m].label}
              </button>
            ))}
          </div>
          <button
            onClick={handleReset}
            title={`Jump to current time, NOW line resets to position ${Math.round(nowLineX)}%`}
            className="px-2 py-1 text-[11px] text-text-muted hover:text-text-main bg-bg-subtle rounded-md border border-border transition-colors"
          >
            Reset
          </button>
          {/* Zoom */}
          <div className="flex items-center gap-1 rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => setZoom((z) => Math.max(0.001, z * 0.5))}
              className="px-2 py-1 text-[11px] text-text-muted hover:text-text-main bg-bg-subtle transition-colors"
            >
              -
            </button>
            <span className="px-1 text-[10px] text-text-muted font-mono min-w-[36px] text-center">
              {zoom >= 1 ? `${zoom}x` : `${zoom * 100}%`}
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(8, z * 2))}
              className="px-2 py-1 text-[11px] text-text-muted hover:text-text-main bg-bg-subtle transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className={`flex-1 min-h-0 overflow-hidden relative bg-surface ${
          isDragging ? "cursor-grabbing" : mode === "pan" ? "cursor-grab" : ""
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* Scrollable content area */}
        <div className="absolute left-0 right-0" style={{ height: contentHeight }}>
          {/* Time axis */}
          <div
            className="absolute left-0 right-0 border-b border-border/50 bg-surface/90 backdrop-blur-sm z-5"
            style={{ top: 0, height: AXIS_HEIGHT }}
          >
            {axisTicks.map((axisTick, i) => (
              <div key={i} className="absolute" style={{ left: `${axisTick.pct}%`, top: 0 }}>
                <div className="w-px h-3 bg-border -translate-x-1/2" />
                <span className="block text-[9px] text-text-muted font-mono mt-0.5 whitespace-nowrap -translate-x-1/2 text-center">
                  {axisTick.label}
                </span>
              </div>
            ))}
          </div>

          {/* Horizontal grid lines */}
          {Array.from({ length: maxLane + 1 }).map((_, i) => (
            <div
              key={`grid-${i}`}
              className="absolute left-0 right-0 border-b border-border/20"
              style={{ top: AXIS_HEIGHT + i * LANE_HEIGHT + BAR_HEIGHT }}
            />
          ))}

          {/* Request bars */}
          {barElements.map(({ log, leftPct, widthPct, topPx, color, opacity }) => (
            <div
              key={log.id}
              className="absolute rounded-sm cursor-pointer transition-opacity duration-100"
              style={{
                left: `${leftPct}%`,
                width: `${widthPct}%`,
                top: AXIS_HEIGHT + topPx,
                height: BAR_HEIGHT,
                backgroundColor: color,
                opacity,
                minWidth: MIN_BAR_WIDTH,
                zIndex: 2,
              }}
              onClick={() => handleBarClick(log)}
              onMouseEnter={(e) => handleBarHover(log, e)}
              onMouseMove={(e) => setTooltipPos({ x: e.clientX, y: e.clientY })}
              onMouseLeave={handleBarLeave}
            >
              <div className="w-full h-full flex items-center px-1.5 overflow-hidden">
                <span className="text-[11px] font-mono text-white/90 truncate whitespace-nowrap">
                  {truncateModel(log.model)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* NOW line — full height of the canvas, outside content div */}
        <div
          className="absolute z-10 pointer-events-none"
          style={{
            left: `${nowLineX}%`,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="w-px h-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] -translate-x-1/2" />
          <div className="absolute top-[2px] -translate-x-1/2 bg-red-500 text-white text-[8px] font-mono px-1.5 py-0.5 rounded-b-sm font-bold tracking-wider">
            NOW
          </div>
        </div>

        {/* Vertical lines — full height of the canvas, same position as axis ticks */}
        {axisTicks.map((axisTick) => (
          <div
            key={`vl-${axisTick.pct}`}
            className="absolute top-0 bottom-0 pointer-events-none -translate-x-1/2"
            style={{
              left: `${axisTick.pct}%`,
              width: axisTick.kind === "day" ? 2 : 1,
              backgroundColor:
                axisTick.kind === "day"
                  ? "rgba(99,102,241,0.5)"
                  : axisTick.kind === "hour"
                    ? "rgba(148,163,184,0.45)"
                    : "rgba(148,163,184,0.15)",
              zIndex: 1,
            }}
          />
        ))}
      </div>

      {/* Tooltip */}
      {hoveredLog && tooltipPos && (
        <div
          className="fixed z-50 pointer-events-none bg-surface border border-border rounded-lg shadow-elevated p-3 max-w-[280px]"
          style={{
            left: tooltipPos.x + 12,
            top: tooltipPos.y - 8,
          }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: getStatusColor(hoveredLog.status, hoveredLog.active) }}
            />
            <span className="text-[11px] font-semibold text-text-main">
              {hoveredLog.model || "unknown"}
            </span>
            {hoveredLog.active && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-medium">
                active
              </span>
            )}
          </div>
          <div className="space-y-0.5 text-[10px] text-text-muted font-mono">
            <div className="flex justify-between gap-4">
              <span>Started</span>
              <span>
                {(() => {
                  const ts = new Date(hoveredLog.timestamp).getTime();
                  const startMs =
                    hoveredLog.active || hoveredLog.completed
                      ? ts
                      : ts - (hoveredLog.duration || 0);
                  return new Date(startMs).toLocaleTimeString();
                })()}
              </span>
            </div>
            {!hoveredLog.active && (
              <div className="flex justify-between gap-4">
                <span>Ended</span>
                <span>
                  {new Date(
                    hoveredLog.completed
                      ? new Date(hoveredLog.timestamp).getTime() + (hoveredLog.duration || 0)
                      : new Date(hoveredLog.timestamp).getTime()
                  ).toLocaleTimeString()}
                </span>
              </div>
            )}
            <div className="flex justify-between gap-4">
              <span>Duration</span>
              <span>
                {hoveredLog.active
                  ? `~${Math.round((nowMs - computeBarRange(hoveredLog, nowMs).startMs) / 1000).toLocaleString()}s`
                  : `${hoveredLog.duration.toLocaleString()}ms`}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Status</span>
              <span>{hoveredLog.status || "pending"}</span>
            </div>
            {hoveredLog.provider && (
              <div className="flex justify-between gap-4">
                <span>Provider</span>
                <span>{hoveredLog.provider}</span>
              </div>
            )}
            <div className="flex justify-between gap-4">
              <span>Tokens</span>
              <span>
                {hoveredLog.tokens.in.toLocaleString()} / {hoveredLog.tokens.out.toLocaleString()}
              </span>
            </div>
            {hoveredLog.error && (
              <div className="mt-1 text-red-400 text-[9px] break-all">{hoveredLog.error}</div>
            )}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-3 px-4 py-1.5 border-t border-border text-[9px] shrink-0">
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "#059669" }} />
          <span className="text-text-muted">2xx</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "#D97706" }} />
          <span className="text-text-muted">4xx</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "#DC2626" }} />
          <span className="text-text-muted">5xx</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "#6366F1" }} />
          <span className="text-text-muted">Active</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "#6B7280" }} />
          <span className="text-text-muted">Other</span>
        </div>
        <div className="ml-4 flex items-center gap-1.5 text-text-muted">
          <div className="w-3 border-t border-dashed border-slate-400/40" />
          <span>10min</span>
          <div className="w-3 border-t border-slate-400/60 ml-2" />
          <span>hour</span>
          <div className="w-3 border-t-2 border-accent/40 ml-2" />
          <span>day</span>
        </div>
        <div className="ml-auto text-text-muted italic" title={MODE_META[mode].description}>
          {MODE_META[mode].description}
        </div>
      </div>

      {selectedLog && (
        <RequestLoggerDetail
          log={selectedLog as any}
          detail={detailData}
          loading={detailLoading}
          debugEnabled={false}
          emailsVisible={false}
          onClose={() => {
            setSelectedLog(null);
            setDetailData(null);
          }}
          onCopy={copyToClipboard}
          onPrevious={undefined}
          onNext={undefined}
          relatedLogs={[]}
          onSelectRelated={undefined}
        />
      )}
    </div>
  );
}
