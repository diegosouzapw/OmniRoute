"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import Card from "../Card";
import { getModelColor } from "@/shared/constants/colors";
import {
  fmtCompact as fmt,
  fmtCost,
  formatApiKeyLabel as maskApiKeyLabel,
} from "@/shared/utils/formatting";
import { PROVIDER_COLORS } from "./chartColors";
import { ChartLoadingCard, DarkTooltip, useRecharts } from "./rechartsCore";

function CompactDonutCard({
  pieData,
  title,
  formatter,
  valueClassName = "text-text-muted",
  labelClassName = "",
  getLegendKey,
  getLegendTitle,
}) {
  const recharts = useRecharts();

  if (!recharts) {
    return <ChartLoadingCard />;
  }

  const { Cell, PieChart, Pie, Tooltip, ResponsiveContainer } = recharts;

  return (
    <Card className="p-4 flex-1">
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
        {title}
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
            <Tooltip content={<DarkTooltip formatter={formatter} />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          {pieData.map((seg, i) => (
            <div
              key={getLegendKey ? getLegendKey(seg, i) : i}
              className="flex items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: seg.fill }}
                />
                <span
                  className={`truncate text-text-main ${labelClassName}`.trim()}
                  title={getLegendTitle?.(seg)}
                >
                  {seg.name}
                </span>
              </div>
              <span className={`font-mono font-medium shrink-0 ${valueClassName}`}>
                {formatter(seg.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// ── AccountDonut (Recharts) ────────────────────────────────────────────────

export function AccountDonut({ byAccount }) {
  const t = useTranslations("analytics");
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
          {t("chartByAccount")}
        </h3>
        <div className="text-center text-text-muted text-sm py-8">{t("chartNoData")}</div>
      </Card>
    );
  }

  return <CompactDonutCard pieData={pieData} title={t("chartByAccount")} formatter={fmt} />;
}

// ── ApiKeyDonut (Recharts) ─────────────────────────────────────────────────

export function ApiKeyDonut({ byApiKey }) {
  const t = useTranslations("analytics");
  const data = useMemo(() => byApiKey || [], [byApiKey]);
  const hasData = data.length > 0;

  const pieData = useMemo(() => {
    return data.slice(0, 8).map((item, i) => ({
      name: maskApiKeyLabel(item.apiKeyName, item.apiKeyId),
      fullName: item.apiKeyName || item.apiKeyId || t("unknownApiKey"),
      value: item.totalTokens,
      fill: getModelColor(i),
    }));
  }, [data, t]);

  if (!hasData) {
    return (
      <Card className="p-4 flex-1">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
          {t("chartByApiKey")}
        </h3>
        <div className="text-center text-text-muted text-sm py-8">{t("chartNoData")}</div>
      </Card>
    );
  }

  return (
    <CompactDonutCard
      pieData={pieData}
      title={t("chartByApiKey")}
      formatter={fmt}
      getLegendKey={(seg, i) => `${seg.fullName}-${i}`}
      getLegendTitle={(seg) => seg.fullName}
    />
  );
}

// ── ApiKeyTable ────────────────────────────────────────────────────────────

export function ProviderCostDonut({ byProvider }) {
  const t = useTranslations("analytics");
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
          {t("chartCostByProvider")}
        </h3>
        <div className="text-center text-text-muted text-sm py-8">{t("chartNoCostData")}</div>
      </Card>
    );
  }

  return (
    <CompactDonutCard
      pieData={pieData}
      title={t("chartCostByProvider")}
      formatter={fmtCost}
      valueClassName="text-amber-500"
      labelClassName="capitalize"
    />
  );
}

// ── ModelOverTimeChart (Stacked Area) ──────────────────────────────────────
