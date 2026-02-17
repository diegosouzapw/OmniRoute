"use client";

import { useState, useMemo, useCallback } from "react";
import Card from "../Card";
import { getModelColor } from "@/shared/constants/colors";
import {
  fmtCompact as fmt,
  fmtFull,
  fmtCost,
  formatApiKeyLabel as maskApiKeyLabel,
} from "@/shared/utils/formatting";
import {
  BarChart,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  AreaChart,
  Area,
} from "recharts";

// ── Custom Tooltip for dark theme ──────────────────────────────────────────

function DarkTooltip({
  active,
  payload,
  label,
  formatter,
}: {
  active?: boolean;
  payload?: any[];
  label?: any;
  formatter?: Function;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-surface px-3 py-2 text-xs shadow-lg">
      {label && <div className="font-semibold text-text-main mb-1">{label}</div>}
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-1.5 text-text-muted">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span>{entry.name}:</span>
          <span className="font-mono font-medium text-text-main">
            {formatter ? formatter(entry.value) : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Sort Indicator (shared by tables) ──────────────────────────────────────

export function SortIndicator({ active, sortOrder }: { active: boolean; sortOrder: string }) {
  if (!active) {
    return (
      <span className="material-symbols-outlined text-[12px] opacity-0 group-hover:opacity-30">
        unfold_more
      </span>
    );
  }
  return (
    <span className="material-symbols-outlined text-[12px] text-primary">
      {sortOrder === "asc" ? "expand_less" : "expand_more"}
    </span>
  );
}

// ── StatCard ───────────────────────────────────────────────────────────────

export function StatCard({
  icon,
  label,
  value,
  subValue,
  color = "text-text-main",
}: {
  icon: any;
  label: any;
  value: any;
  subValue?: any;
  color?: string;
}) {
  return (
    <Card className="px-4 py-3 flex flex-col gap-1">
      <div className="flex items-center gap-2 text-text-muted text-xs uppercase font-semibold tracking-wider">
        <span className="material-symbols-outlined text-[16px]">{icon}</span>
        {label}
      </div>
      <span className={`text-2xl font-bold ${color}`}>{value}</span>
      {subValue && <span className="text-xs text-text-muted">{subValue}</span>}
    </Card>
  );
}

// ── ActivityHeatmap ────────────────────────────────────────────────────────

export function ActivityHeatmap({ activityMap }) {
  const cells = useMemo(() => {
    const today = new Date();
    const days = [];
    let maxVal = 0;

    for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      const val = activityMap?.[key] || 0;
      if (val > maxVal) maxVal = val;
      days.push({ date: key, value: val, dayOfWeek: d.getDay() });
    }

    return { days, maxVal };
  }, [activityMap]);

  const weeks = useMemo(() => {
    const w = [];
    let current = [];
    const firstDay = cells.days[0]?.dayOfWeek || 0;
    for (let i = 0; i < firstDay; i++) {
      current.push(null);
    }
    for (const day of cells.days) {
      current.push(day);
      if (current.length === 7) {
        w.push(current);
        current = [];
      }
    }
    if (current.length > 0) w.push(current);
    return w;
  }, [cells]);

  const monthLabels = useMemo(() => {
    const labels = [];
    let lastMonth = -1;
    weeks.forEach((week, weekIdx) => {
      const firstDay = week.find((d) => d !== null);
      if (firstDay) {
        const m = new Date(firstDay.date).getMonth();
        if (m !== lastMonth) {
          const monthNames = [
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
          labels.push({ weekIdx, label: monthNames[m] });
          lastMonth = m;
        }
      }
    });
    return labels;
  }, [weeks]);

  function getCellColor(value) {
    if (!value || value === 0) return "bg-white/[0.04]";
    const intensity = Math.min(value / (cells.maxVal || 1), 1);
    if (intensity < 0.25) return "bg-primary/20";
    if (intensity < 0.5) return "bg-primary/40";
    if (intensity < 0.75) return "bg-primary/60";
    return "bg-primary/90";
  }

  return (
    <Card className="p-4 h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">Activity</h3>
        <span className="text-xs text-text-muted">
          {Object.keys(activityMap || {}).length} active days ·{" "}
          {fmt(Object.values(activityMap || {}).reduce((a: number, b: number) => a + b, 0))} tokens
          · 365 days
        </span>
      </div>

      <div className="flex gap-[3px] mb-1 ml-6" style={{ fontSize: "10px" }}>
        {monthLabels.map((m, i) => (
          <span
            key={i}
            className="text-text-muted"
            style={{
              position: "relative",
              left: `${m.weekIdx * 13}px`,
              marginLeft: i === 0 ? 0 : "-20px",
            }}
          >
            {m.label}
          </span>
        ))}
      </div>

      <div className="flex gap-[3px] overflow-x-auto">
        <div className="flex flex-col gap-[3px] shrink-0 text-[10px] text-text-muted pr-1">
          <span className="h-[10px]"></span>
          <span className="h-[10px] leading-[10px]">Mon</span>
          <span className="h-[10px]"></span>
          <span className="h-[10px] leading-[10px]">Wed</span>
          <span className="h-[10px]"></span>
          <span className="h-[10px] leading-[10px]">Fri</span>
          <span className="h-[10px]"></span>
        </div>

        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day, di) => (
              <div
                key={di}
                title={day ? `${day.date}: ${fmtFull(day.value)} tokens` : ""}
                className={`w-[10px] h-[10px] rounded-[2px] ${day ? getCellColor(day.value) : "bg-transparent"}`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1 mt-2 ml-6 text-[10px] text-text-muted">
        <span>Less</span>
        <div className="w-[10px] h-[10px] rounded-[2px] bg-white/[0.04]" />
        <div className="w-[10px] h-[10px] rounded-[2px] bg-primary/20" />
        <div className="w-[10px] h-[10px] rounded-[2px] bg-primary/40" />
        <div className="w-[10px] h-[10px] rounded-[2px] bg-primary/60" />
        <div className="w-[10px] h-[10px] rounded-[2px] bg-primary/90" />
        <span>More</span>
      </div>
    </Card>
  );
}

// ── DailyTrendChart (Recharts) ─────────────────────────────────────────────

export function DailyTrendChart({ dailyTrend }) {
  const chartData = useMemo(() => {
    return (dailyTrend || []).map((d) => ({
      date: d.date.slice(5),
      Input: d.promptTokens,
      Output: d.completionTokens,
      Cost: d.cost || 0,
    }));
  }, [dailyTrend]);

  const hasCost = useMemo(() => chartData.some((d) => d.Cost > 0), [chartData]);

  if (!chartData.length) {
    return (
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
          Token Trend
        </h3>
        <div className="text-center text-text-muted text-sm py-8">No data</div>
      </Card>
    );
  }

  return (
    <Card className="p-4 flex-1">
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
        Token &amp; Cost Trend
      </h3>
      <ResponsiveContainer width="100%" height={140}>
        <ComposedChart
          data={chartData}
          margin={{ top: 0, right: hasCost ? 40 : 0, left: 0, bottom: 0 }}
        >
          <XAxis
            dataKey="date"
            tick={{ fontSize: 9, fill: "var(--text-muted)" }}
            axisLine={false}
            tickLine={false}
            interval={Math.max(Math.floor(chartData.length / 6), 0)}
          />
          {hasCost && (
            <YAxis
              yAxisId="cost"
              orientation="right"
              tick={{ fontSize: 8, fill: "#f59e0b" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v.toFixed(2)}`}
              width={36}
            />
          )}
          <Tooltip content={<CostTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
          <Bar
            dataKey="Input"
            stackId="a"
            fill="var(--primary)"
            opacity={0.7}
            radius={[0, 0, 0, 0]}
            animationDuration={600}
          />
          <Bar
            dataKey="Output"
            stackId="a"
            fill="#10b981"
            opacity={0.7}
            radius={[3, 3, 0, 0]}
            animationDuration={600}
          />
          {hasCost && (
            <Line
              yAxisId="cost"
              type="monotone"
              dataKey="Cost"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={false}
              animationDuration={600}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-4 mt-2 text-[10px] text-text-muted">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-primary/70" /> Input
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500/70" /> Output
        </span>
        {hasCost && (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500/70" /> Cost ($)
          </span>
        )}
      </div>
    </Card>
  );
}

// ── Cost-aware Tooltip ─────────────────────────────────────────────────────

function CostTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any[];
  label?: any;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-surface px-3 py-2 text-xs shadow-lg">
      {label && <div className="font-semibold text-text-main mb-1">{label}</div>}
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-1.5 text-text-muted">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span>{entry.name}:</span>
          <span className="font-mono font-medium text-text-main">
            {entry.name === "Cost" ? fmtCost(entry.value) : fmt(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── AccountDonut (Recharts) ────────────────────────────────────────────────

export function AccountDonut({ byAccount }) {
  const data = useMemo(() => byAccount || [], [byAccount]);
  const hasData = data.length > 0;

  const pieData = useMemo(() => {
    return data.slice(0, 8).map((item, i) => ({
      name: item.account,
      value: item.totalTokens,
      fill: getModelColor(i),
    }));
  }, [data]);

  if (!hasData) {
    return (
      <Card className="p-4 flex-1">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
          By Account
        </h3>
        <div className="text-center text-text-muted text-sm py-8">No data</div>
      </Card>
    );
  }

  return (
    <Card className="p-4 flex-1">
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
        By Account
      </h3>
      <div className="flex items-center gap-4">
        <ResponsiveContainer width={120} height={120}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={28}
              outerRadius={55}
              paddingAngle={1}
              animationDuration={600}
            >
              {pieData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} stroke="none" />
              ))}
            </Pie>
            <Tooltip content={<DarkTooltip formatter={fmt} />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          {pieData.map((seg, i) => (
            <div key={i} className="flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: seg.fill }}
                />
                <span className="truncate text-text-main">{seg.name}</span>
              </div>
              <span className="font-mono font-medium text-text-muted shrink-0">
                {fmt(seg.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// ── ApiKeyDonut (Recharts) ─────────────────────────────────────────────────

export function ApiKeyDonut({ byApiKey }) {
  const data = useMemo(() => byApiKey || [], [byApiKey]);
  const hasData = data.length > 0;

  const pieData = useMemo(() => {
    return data.slice(0, 8).map((item, i) => ({
      name: maskApiKeyLabel(item.apiKeyName, item.apiKeyId),
      fullName: item.apiKeyName || item.apiKeyId || "unknown",
      value: item.totalTokens,
      fill: getModelColor(i),
    }));
  }, [data]);

  if (!hasData) {
    return (
      <Card className="p-4 flex-1">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
          By API Key
        </h3>
        <div className="text-center text-text-muted text-sm py-8">No data</div>
      </Card>
    );
  }

  return (
    <Card className="p-4 flex-1">
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
        By API Key
      </h3>
      <div className="flex items-center gap-4">
        <ResponsiveContainer width={120} height={120}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={28}
              outerRadius={55}
              paddingAngle={1}
              animationDuration={600}
            >
              {pieData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} stroke="none" />
              ))}
            </Pie>
            <Tooltip content={<DarkTooltip formatter={fmt} />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          {pieData.map((seg, i) => (
            <div
              key={`${seg.fullName}-${i}`}
              className="flex items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: seg.fill }}
                />
                <span className="truncate text-text-main" title={seg.fullName}>
                  {seg.name}
                </span>
              </div>
              <span className="font-mono font-medium text-text-muted shrink-0">
                {fmt(seg.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// ── ApiKeyTable ────────────────────────────────────────────────────────────

export function ApiKeyTable({ byApiKey }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("totalTokens");
  const [sortOrder, setSortOrder] = useState("desc");

  const data = useMemo(() => byApiKey || [], [byApiKey]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (row) =>
        (row.apiKeyName || "").toLowerCase().includes(q) ||
        (row.apiKeyId || "").toLowerCase().includes(q)
    );
  }, [data, query]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const va = a[sortBy] ?? 0;
      const vb = b[sortBy] ?? 0;
      if (typeof va === "string") {
        return sortOrder === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
      }
      return sortOrder === "asc" ? va - vb : vb - va;
    });
    return arr;
  }, [filtered, sortBy, sortOrder]);

  const toggleSort = useCallback(
    (field) => {
      if (sortBy === field) {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
        return;
      }
      setSortBy(field);
      setSortOrder("desc");
    },
    [sortBy]
  );

  const hasData = data.length > 0;

  if (!hasData) {
    return (
      <Card className="p-4 flex-1">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
          API Key Breakdown
        </h3>
        <div className="text-center text-text-muted text-sm py-8">No data</div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
          API Key Breakdown
        </h3>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter API key..."
          className="w-full max-w-[220px] px-3 py-1.5 rounded-lg bg-bg-subtle border border-border text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs text-text-muted uppercase bg-black/[0.02] dark:bg-white/[0.02]">
            <tr>
              <th
                className="px-4 py-2.5 text-left cursor-pointer group"
                onClick={() => toggleSort("apiKeyName")}
              >
                API Key <SortIndicator active={sortBy === "apiKeyName"} sortOrder={sortOrder} />
              </th>
              <th
                className="px-4 py-2.5 text-right cursor-pointer group"
                onClick={() => toggleSort("requests")}
              >
                Requests <SortIndicator active={sortBy === "requests"} sortOrder={sortOrder} />
              </th>
              <th
                className="px-4 py-2.5 text-right cursor-pointer group"
                onClick={() => toggleSort("promptTokens")}
              >
                Input <SortIndicator active={sortBy === "promptTokens"} sortOrder={sortOrder} />
              </th>
              <th
                className="px-4 py-2.5 text-right cursor-pointer group"
                onClick={() => toggleSort("completionTokens")}
              >
                Output{" "}
                <SortIndicator active={sortBy === "completionTokens"} sortOrder={sortOrder} />
              </th>
              <th
                className="px-4 py-2.5 text-right cursor-pointer group"
                onClick={() => toggleSort("totalTokens")}
              >
                Total Tokens{" "}
                <SortIndicator active={sortBy === "totalTokens"} sortOrder={sortOrder} />
              </th>
              <th
                className="px-4 py-2.5 text-right cursor-pointer group"
                onClick={() => toggleSort("cost")}
              >
                Cost <SortIndicator active={sortBy === "cost"} sortOrder={sortOrder} />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sorted.map((row, i) => (
              <tr
                key={`${row.apiKeyId || row.apiKeyName || "key"}-${i}`}
                className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-4 py-2.5">
                  <span className="font-medium" title={row.apiKeyName || row.apiKeyId || "unknown"}>
                    {maskApiKeyLabel(row.apiKeyName, row.apiKeyId)}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-text-muted">
                  {fmtFull(row.requests)}
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-primary">
                  {fmt(row.promptTokens)}
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-emerald-500">
                  {fmt(row.completionTokens)}
                </td>
                <td className="px-4 py-2.5 text-right font-mono font-semibold">
                  {fmt(row.totalTokens)}
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-amber-500">
                  {fmtCost(row.cost)}
                </td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-text-muted">
                  No API key matches this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

// ── WeeklyPattern (Recharts) ───────────────────────────────────────────────

export function WeeklyPattern({ weeklyPattern }) {
  const chartData = useMemo(() => {
    return (weeklyPattern || []).map((w) => ({
      day: w.day.slice(0, 3),
      Tokens: w.totalTokens,
    }));
  }, [weeklyPattern]);

  return (
    <Card className="px-4 py-3">
      <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
        Weekly
      </h3>
      <ResponsiveContainer width="100%" height={48}>
        <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="day"
            tick={{ fontSize: 9, fill: "var(--text-muted)" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={<DarkTooltip formatter={fmt} />}
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
          />
          <Bar
            dataKey="Tokens"
            fill="var(--text-muted)"
            opacity={0.3}
            radius={[3, 3, 0, 0]}
            animationDuration={400}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

// ── MostActiveDay7d ────────────────────────────────────────────────────────

export function MostActiveDay7d({ activityMap }) {
  const data = useMemo(() => {
    if (!activityMap) return null;
    const today = new Date();
    let peakKey = null;
    let peakVal = 0;

    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      const val = activityMap[key] || 0;
      if (val > peakVal) {
        peakVal = val;
        peakKey = key;
      }
    }
    if (!peakKey || peakVal === 0) return null;

    const peakDate = new Date(peakKey + "T12:00:00");
    const weekdays = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
    const months = [
      "jan",
      "fev",
      "mar",
      "abr",
      "mai",
      "jun",
      "jul",
      "ago",
      "set",
      "out",
      "nov",
      "dez",
    ];
    return {
      weekday: weekdays[peakDate.getDay()],
      label: `${peakDate.getDate()} de ${months[peakDate.getMonth()]}`,
      tokens: peakVal,
    };
  }, [activityMap]);

  return (
    <Card className="p-4 flex flex-col justify-center" style={{ flex: 1, minHeight: 0 }}>
      <h3
        className="text-xs font-semibold uppercase tracking-wider mb-2"
        style={{ color: "var(--text-muted)" }}
      >
        Most Active Day
      </h3>
      {data ? (
        <>
          <span className="text-xl font-bold capitalize" style={{ lineHeight: 1.2 }}>
            {data.weekday}
          </span>
          <span className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            {data.label} · {fmt(data.tokens)} tokens
          </span>
        </>
      ) : (
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          Sem dados nos últimos 7 dias
        </span>
      )}
    </Card>
  );
}

// ── WeeklySquares7d ────────────────────────────────────────────────────────

export function WeeklySquares7d({ activityMap }) {
  const days = useMemo(() => {
    if (!activityMap) return [];
    const today = new Date();
    const result = [];
    let maxVal = 0;

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      const val = activityMap[key] || 0;
      if (val > maxVal) maxVal = val;
      const shortDays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
      result.push({ key, val, label: shortDays[d.getDay()] });
    }
    return result.map((d) => ({ ...d, intensity: maxVal > 0 ? d.val / maxVal : 0 }));
  }, [activityMap]);

  function getSquareStyle(intensity) {
    if (intensity === 0) return { background: "rgba(255,255,255,0.04)" };
    const opacity = 0.15 + intensity * 0.75;
    return { background: `rgba(229, 77, 94, ${opacity.toFixed(2)})` };
  }

  return (
    <Card className="p-4 flex flex-col justify-center" style={{ flex: 1, minHeight: 0 }}>
      <h3
        className="text-xs font-semibold uppercase tracking-wider mb-3"
        style={{ color: "var(--text-muted)" }}
      >
        Weekly
      </h3>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, justifyContent: "center" }}>
        {days.map((d, i) => (
          <div
            key={i}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
          >
            <div
              title={`${d.key}: ${fmtFull(d.val)} tokens`}
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                ...getSquareStyle(d.intensity),
                transition: "all 0.2s",
                cursor: "default",
              }}
            />
            <span
              style={{
                fontSize: 9,
                fontWeight: 600,
                color: "var(--text-muted)",
                letterSpacing: "0.03em",
              }}
            >
              {d.label}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── ModelTable ──────────────────────────────────────────────────────────────

export function ModelTable({ byModel, summary }) {
  const [sortBy, setSortBy] = useState("totalTokens");
  const [sortOrder, setSortOrder] = useState("desc");

  const toggleSort = useCallback(
    (field) => {
      if (sortBy === field) {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortBy(field);
        setSortOrder("desc");
      }
    },
    [sortBy]
  );

  const sorted = useMemo(() => {
    const arr = [...(byModel || [])];
    arr.sort((a, b) => {
      const va = a[sortBy] ?? 0;
      const vb = b[sortBy] ?? 0;
      if (typeof va === "string")
        return sortOrder === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
      return sortOrder === "asc" ? va - vb : vb - va;
    });
    return arr;
  }, [byModel, sortBy, sortOrder]);

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
          Model Breakdown
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs text-text-muted uppercase bg-black/[0.02] dark:bg-white/[0.02]">
            <tr>
              <th
                className="px-4 py-2.5 text-left cursor-pointer group"
                onClick={() => toggleSort("model")}
              >
                Model <SortIndicator active={sortBy === "model"} sortOrder={sortOrder} />
              </th>
              <th
                className="px-4 py-2.5 text-right cursor-pointer group"
                onClick={() => toggleSort("requests")}
              >
                Requests <SortIndicator active={sortBy === "requests"} sortOrder={sortOrder} />
              </th>
              <th
                className="px-4 py-2.5 text-right cursor-pointer group"
                onClick={() => toggleSort("promptTokens")}
              >
                Input <SortIndicator active={sortBy === "promptTokens"} sortOrder={sortOrder} />
              </th>
              <th
                className="px-4 py-2.5 text-right cursor-pointer group"
                onClick={() => toggleSort("completionTokens")}
              >
                Output{" "}
                <SortIndicator active={sortBy === "completionTokens"} sortOrder={sortOrder} />
              </th>
              <th
                className="px-4 py-2.5 text-right cursor-pointer group"
                onClick={() => toggleSort("totalTokens")}
              >
                Total <SortIndicator active={sortBy === "totalTokens"} sortOrder={sortOrder} />
              </th>
              <th
                className="px-4 py-2.5 text-right cursor-pointer group"
                onClick={() => toggleSort("cost")}
              >
                Cost <SortIndicator active={sortBy === "cost"} sortOrder={sortOrder} />
              </th>
              <th className="px-4 py-2.5 text-right w-36">Share</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sorted.map((m, i) => (
              <tr
                key={m.model}
                className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: getModelColor(i) }}
                    />
                    <span className="font-medium">{m.model}</span>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-text-muted">
                  {fmtFull(m.requests)}
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-primary">
                  {fmt(m.promptTokens)}
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-emerald-500">
                  {fmt(m.completionTokens)}
                </td>
                <td className="px-4 py-2.5 text-right font-mono font-semibold">
                  {fmt(m.totalTokens)}
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-amber-500">
                  {fmtCost(m.cost)}
                </td>
                <td className="px-4 py-2.5 text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <div className="w-16 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${m.pct}%`, backgroundColor: getModelColor(i) }}
                      />
                    </div>
                    <span className="text-xs font-mono text-text-muted w-10 text-right">
                      {m.pct}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

// ── UsageDetail ────────────────────────────────────────────────────────────

export function UsageDetail({ summary }) {
  const items = [
    { label: "Input", value: summary?.promptTokens, color: "text-primary" },
    { label: "Cache read", value: 0, color: "text-text-muted" },
    { label: "Output", value: summary?.completionTokens, color: "text-emerald-500" },
  ];

  return (
    <Card className="p-4 flex-1">
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
        Usage Detail
      </h3>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className={`text-sm ${item.color}`}>{item.label}</span>
            <span className="font-mono font-medium text-sm">{fmtFull(item.value)}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── ProviderCostDonut ──────────────────────────────────────────────────────

const PROVIDER_COLORS = [
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#10b981",
  "#06b6d4",
  "#ec4899",
  "#f97316",
  "#6366f1",
  "#14b8a6",
  "#a855f7",
];

export function ProviderCostDonut({ byProvider }) {
  const data = useMemo(() => byProvider || [], [byProvider]);
  const hasData = data.length > 0 && data.some((p) => p.cost > 0);

  const pieData = useMemo(() => {
    return data
      .filter((item) => item.cost > 0)
      .sort((a, b) => b.cost - a.cost)
      .slice(0, 8)
      .map((item, i) => ({
        name: item.provider,
        value: item.cost,
        fill: PROVIDER_COLORS[i % PROVIDER_COLORS.length],
      }));
  }, [data]);

  if (!hasData) {
    return (
      <Card className="p-4 flex-1">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
          Cost by Provider
        </h3>
        <div className="text-center text-text-muted text-sm py-8">No cost data</div>
      </Card>
    );
  }

  return (
    <Card className="p-4 flex-1">
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
        Cost by Provider
      </h3>
      <div className="flex items-center gap-4">
        <ResponsiveContainer width={120} height={120}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={28}
              outerRadius={55}
              paddingAngle={1}
              animationDuration={600}
            >
              {pieData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} stroke="none" />
              ))}
            </Pie>
            <Tooltip content={<DarkTooltip formatter={fmtCost} />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          {pieData.map((seg, i) => (
            <div key={i} className="flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: seg.fill }}
                />
                <span className="truncate text-text-main capitalize">{seg.name}</span>
              </div>
              <span className="font-mono font-medium text-amber-500 shrink-0">
                {fmtCost(seg.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// ── ModelOverTimeChart (Stacked Area) ──────────────────────────────────────

export function ModelOverTimeChart({ dailyByModel, modelNames }) {
  const data = useMemo(() => dailyByModel || [], [dailyByModel]);
  const models = useMemo(() => modelNames || [], [modelNames]);

  // Prepare chart data — format dates (must be before early return for rules-of-hooks)
  const chartData = useMemo(() => {
    return data.map((d) => {
      const row = { ...d };
      // Short date label
      if (d.date) {
        const parts = d.date.split("-");
        row.dateLabel = `${parts[1]}/${parts[2]}`;
      }
      return row;
    });
  }, [data]);

  if (!data.length || !models.length) {
    return (
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
          Model Usage Over Time
        </h3>
        <div className="text-center text-text-muted text-sm py-8">No data</div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
        Model Usage Over Time
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="dateLabel"
            tick={{ fontSize: 10, fill: "var(--text-muted)" }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 10, fill: "var(--text-muted)" }}
            tickFormatter={(v) => fmt(v)}
            axisLine={false}
            tickLine={false}
            width={50}
          />
          <Tooltip content={<DarkTooltip formatter={fmt} />} />
          {models.map((m, i) => (
            <Area
              key={m}
              type="monotone"
              dataKey={m}
              stackId="1"
              stroke={getModelColor(i)}
              fill={getModelColor(i)}
              fillOpacity={0.4}
              strokeWidth={1.5}
              animationDuration={600}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[10px] text-text-muted">
        {models.map((m, i) => (
          <span key={m} className="flex items-center gap-1">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: getModelColor(i) }}
            />
            {m}
          </span>
        ))}
      </div>
    </Card>
  );
}

// ── ProviderTable ──────────────────────────────────────────────────────────

export function ProviderTable({ byProvider }) {
  const [sortBy, setSortBy] = useState("totalTokens");
  const [sortOrder, setSortOrder] = useState("desc");

  const data = useMemo(() => byProvider || [], [byProvider]);
  const totalTokens = useMemo(() => data.reduce((acc, p) => acc + p.totalTokens, 0), [data]);

  const toggleSort = useCallback(
    (field) => {
      if (sortBy === field) {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortBy(field);
        setSortOrder("desc");
      }
    },
    [sortBy]
  );

  const sorted = useMemo(() => {
    const arr = [...data];
    arr.sort((a, b) => {
      const va = a[sortBy] ?? 0;
      const vb = b[sortBy] ?? 0;
      if (typeof va === "string")
        return sortOrder === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
      return sortOrder === "asc" ? va - vb : vb - va;
    });
    return arr;
  }, [data, sortBy, sortOrder]);

  if (!data.length) {
    return (
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
          Provider Breakdown
        </h3>
        <div className="text-center text-text-muted text-sm py-8">No data</div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
          Provider Breakdown
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs text-text-muted uppercase bg-black/[0.02] dark:bg-white/[0.02]">
            <tr>
              <th
                className="px-4 py-2.5 text-left cursor-pointer group"
                onClick={() => toggleSort("provider")}
              >
                Provider <SortIndicator active={sortBy === "provider"} sortOrder={sortOrder} />
              </th>
              <th
                className="px-4 py-2.5 text-right cursor-pointer group"
                onClick={() => toggleSort("requests")}
              >
                Requests <SortIndicator active={sortBy === "requests"} sortOrder={sortOrder} />
              </th>
              <th
                className="px-4 py-2.5 text-right cursor-pointer group"
                onClick={() => toggleSort("promptTokens")}
              >
                Input <SortIndicator active={sortBy === "promptTokens"} sortOrder={sortOrder} />
              </th>
              <th
                className="px-4 py-2.5 text-right cursor-pointer group"
                onClick={() => toggleSort("completionTokens")}
              >
                Output{" "}
                <SortIndicator active={sortBy === "completionTokens"} sortOrder={sortOrder} />
              </th>
              <th
                className="px-4 py-2.5 text-right cursor-pointer group"
                onClick={() => toggleSort("totalTokens")}
              >
                Total <SortIndicator active={sortBy === "totalTokens"} sortOrder={sortOrder} />
              </th>
              <th
                className="px-4 py-2.5 text-right cursor-pointer group"
                onClick={() => toggleSort("cost")}
              >
                Cost <SortIndicator active={sortBy === "cost"} sortOrder={sortOrder} />
              </th>
              <th className="px-4 py-2.5 text-right w-36">Share</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sorted.map((p, i) => {
              const pct = totalTokens > 0 ? ((p.totalTokens / totalTokens) * 100).toFixed(1) : "0";
              return (
                <tr
                  key={p.provider}
                  className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: PROVIDER_COLORS[i % PROVIDER_COLORS.length] }}
                      />
                      <span className="font-medium capitalize">{p.provider}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono text-text-muted">
                    {fmtFull(p.requests)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono text-primary">
                    {fmt(p.promptTokens)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono text-emerald-500">
                    {fmt(p.completionTokens)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono font-semibold">
                    {fmt(p.totalTokens)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono text-amber-500">
                    {fmtCost(p.cost)}
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <div className="w-16 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: PROVIDER_COLORS[i % PROVIDER_COLORS.length],
                          }}
                        />
                      </div>
                      <span className="text-xs font-mono text-text-muted w-10 text-right">
                        {pct}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
