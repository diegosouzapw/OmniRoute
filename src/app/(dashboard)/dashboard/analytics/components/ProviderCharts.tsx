"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ProviderChartsProps {
  chartData: Array<Record<string, unknown>>;
  providers: string[];
  providerColors: Map<string, string>;
  range: string;
  resolveProviderName: (provider: string, _nodeMap: unknown) => string;
  nodeMap: unknown;
  formatTimestamp: (value: string, _range: string) => string;
  formatPercent: (value: number) => string;
  formatTooltipTimestamp: (value: string, _range: string) => string;
}

export default function ProviderCharts({
  chartData,
  providers,
  providerColors,
  range,
  resolveProviderName,
  nodeMap,
  formatTimestamp,
  formatPercent,
  formatTooltipTimestamp,
}: ProviderChartsProps) {
  return (
    <div className="h-80 w-full rounded-xl border border-black/5 bg-black/[0.02] px-3 py-4 dark:border-white/5 dark:bg-white/[0.02]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(value) => formatTimestamp(String(value), range)}
            tick={{ fill: "var(--color-text-muted)", fontSize: 12 }}
            axisLine={{ stroke: "var(--color-border)" }}
            tickLine={{ stroke: "var(--color-border)" }}
            minTickGap={24}
          />
          <YAxis
            domain={[0, 100]}
            tickFormatter={formatPercent}
            tick={{ fill: "var(--color-text-muted)", fontSize: 12 }}
            axisLine={{ stroke: "var(--color-border)" }}
            tickLine={{ stroke: "var(--color-border)" }}
            width={44}
          />
          <Tooltip
            labelFormatter={(value) => formatTooltipTimestamp(String(value), range)}
            formatter={(value: number, name: string) => [formatPercent(value), name]}
            contentStyle={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
              borderRadius: 12,
              color: "var(--color-text-main)",
              boxShadow: "var(--shadow-soft)",
            }}
            itemStyle={{ color: "var(--color-text-main)" }}
            labelStyle={{ color: "var(--color-text-main)", fontWeight: 600 }}
          />
          <Legend />
          {providers.map((provider) => (
            <Line
              key={provider}
              type="monotone"
              dataKey={provider}
              name={resolveProviderName(provider, nodeMap)}
              stroke={providerColors.get(provider) ?? "var(--color-primary)"}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
