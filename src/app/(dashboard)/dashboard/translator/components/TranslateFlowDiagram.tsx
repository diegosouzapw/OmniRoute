"use client";

import { useCallback, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import Tooltip from "@/shared/components/Tooltip";

interface FlowNodeProps {
  icon: string;
  color: "primary" | "orange" | "blue" | "emerald" | "amber" | "purple" | "cyan" | "pink";
  title: string;
  example: string;
  tooltipContent?: string;
}

const COLOR_MAP: Record<
  FlowNodeProps["color"],
  { border: string; bg: string; text: string }
> = {
  primary: { border: "border-primary/30", bg: "bg-primary/5", text: "text-primary" },
  orange: { border: "border-orange-500/30", bg: "bg-orange-500/5", text: "text-orange-500" },
  blue: { border: "border-blue-500/30", bg: "bg-blue-500/5", text: "text-blue-500" },
  emerald: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/5",
    text: "text-emerald-500",
  },
  amber: { border: "border-amber-500/30", bg: "bg-amber-500/5", text: "text-amber-500" },
  purple: {
    border: "border-purple-500/30",
    bg: "bg-purple-500/5",
    text: "text-purple-500",
  },
  cyan: { border: "border-cyan-500/30", bg: "bg-cyan-500/5", text: "text-cyan-500" },
  pink: { border: "border-pink-500/30", bg: "bg-pink-500/5", text: "text-pink-500" },
};

function FlowNode({ icon, color, title, example, tooltipContent }: FlowNodeProps) {
  const c = COLOR_MAP[color];
  const node: ReactNode = (
    <div
      className={`flex flex-col items-center gap-1 rounded-lg border ${c.border} ${c.bg} px-3 py-2 text-center min-w-0`}
    >
      <span className={`material-symbols-outlined text-[20px] ${c.text}`} aria-hidden="true">
        {icon}
      </span>
      <p className="text-[11px] font-semibold text-text-main leading-tight">{title}</p>
      <p className="text-[10px] text-text-muted leading-tight">{example}</p>
    </div>
  );

  return tooltipContent ? (
    <Tooltip content={tooltipContent} position="top" multiline>
      {node}
    </Tooltip>
  ) : (
    node
  );
}

function FlowArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-text-muted">
      <span
        className="material-symbols-outlined text-[20px] rotate-90 sm:rotate-0"
        aria-hidden="true"
      >
        arrow_forward
      </span>
      {label && (
        <span className="text-[9px] uppercase tracking-wide mt-0.5">{label}</span>
      )}
    </div>
  );
}

export default function TranslateFlowDiagram() {
  const t = useTranslations("translator");
  const tr = useCallback(
    (key: string, fallback: string) => {
      try {
        const translated = t(key);
        return translated === key || translated === `translator.${key}` ? fallback : translated;
      } catch {
        return fallback;
      }
    },
    [t],
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-2 sm:gap-3 sm:items-stretch">
      <FlowNode
        icon="smart_toy"
        color="primary"
        title={tr("conceptDiagramAppLabel", "Sua app")}
        example={tr("conceptDiagramExampleApp", "ex: SDK Anthropic")}
      />
      <FlowArrow label={tr("conceptDiagramArrow1", "fala")} />
      <FlowNode
        icon="psychology"
        color="orange"
        title={tr("conceptDiagramSourceLabel", "Formato origem")}
        example={tr("conceptDiagramExampleSource", "claude")}
        tooltipContent={tr(
          "conceptDiagramSourceTooltip",
          "Formato do protocolo de API que sua app fala (ex: Anthropic Messages, OpenAI Chat Completions, Gemini).",
        )}
      />
      <FlowArrow label={tr("conceptDiagramArrow2", "Translator")} />
      <FlowNode
        icon="hub"
        color="emerald"
        title={tr("conceptDiagramHubLabel", "OpenAI (hub)")}
        example={tr("conceptDiagramExampleHub", "formato pivô")}
        tooltipContent={tr(
          "conceptDiagramHubTooltip",
          "Hub intermediário usado pelo translator para converter entre formatos não-compatíveis diretamente. Todos os formatos passam por OpenAI como pivô.",
        )}
      />
      <FlowArrow label={tr("conceptDiagramArrow3", "→")} />
      <FlowNode
        icon="auto_awesome"
        color="blue"
        title={tr("conceptDiagramTargetLabel", "Provider destino")}
        example={tr("conceptDiagramExampleTarget", "Gemini")}
        tooltipContent={tr(
          "conceptDiagramTargetTooltip",
          "Provider conectado em OmniRoute que vai responder de verdade (ex: Google Gemini, Anthropic, etc).",
        )}
      />
    </div>
  );
}
