"use client";

import dynamic from "next/dynamic";

const MermaidDiagram = dynamic(() => import("./MermaidDiagram").then((mod) => mod.MermaidDiagram), {
  ssr: false,
  loading: () => <div className="my-6 h-32 bg-bg-subtle rounded-lg animate-pulse" />,
});

export function MermaidChartsClient({ charts }: { charts: string[] }) {
  if (charts.length === 0) return null;
  return (
    <div className="mt-6 space-y-4">
      {charts.map((chart, i) => (
        <MermaidDiagram key={i} chart={chart} />
      ))}
    </div>
  );
}
