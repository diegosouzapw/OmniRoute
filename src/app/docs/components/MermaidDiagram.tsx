"use client";

import { useEffect, useRef, useId } from "react";

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId().replace(/:/g, "_");
  const renderedRef = useRef(false);

  useEffect(() => {
    if (renderedRef.current || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "default",
          securityLevel: "loose",
          fontFamily: "inherit",
        });

        const { svg } = await mermaid.render(`mermaid-${uniqueId}`, chart);
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
          renderedRef.current = true;
        }
      } catch (error) {
        console.error("Mermaid render error:", error);
        if (containerRef.current) {
          containerRef.current.innerHTML = `<pre class="text-red-500 text-sm p-2">${escapeHtml(chart)}</pre>`;
        }
      }
    };

    renderDiagram();
  }, [chart, uniqueId]);

  return (
    <div
      ref={containerRef}
      className="mermaid-diagram my-6 flex justify-center overflow-x-auto rounded-lg border border-border bg-bg-subtle p-4"
      role="img"
      aria-label="Diagram"
    />
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
