"use client";

import dynamic from "next/dynamic";
import type { PoolUsageSnapshot } from "@/lib/quota/types";

const BurnRateChartInner = dynamic(() => import("./BurnRateChartInner"), {
  ssr: false,
});

export interface BurnRateChartProps {
  usage: PoolUsageSnapshot | null;
}

export default function BurnRateChart({ usage }: BurnRateChartProps) {
  return <BurnRateChartInner usage={usage} />;
}
