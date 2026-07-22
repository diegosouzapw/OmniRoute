"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Card, Badge } from "@/shared/components";
import Collapsible from "@/shared/components/Collapsible";
import { FORMAT_META } from "../../exampleTemplates";
import type { AdvancedAccordionProps, FormatId } from "../../types";

export interface PipelineStep {
  id: string;
  name: string;
  description: string;
  format: FormatId | "openai" | null;
  content: string;
  status: "pending" | "active" | "done" | "error";
}

/** Props specific to PipelineView (extends shared accordion props). */
export interface PipelineViewProps extends Omit<AdvancedAccordionProps, "slug"> {
  slug?: AdvancedAccordionProps["slug"];
  /** Live pipeline steps injected by F9; when undefined, renders demo state. */
  pipelineSteps?: PipelineStep[];
}

/** Default demo steps shown when no real pipeline is running. */
const DEMO_STEPS: PipelineStep[] = [
  {
    id: "1",
    name: "Client Request",
    description: "Request received in client format",
    format: "claude",
    content:
      '{\n  "model": "claude-sonnet-4-20250514",\n  "messages": [\n    { "role": "user", "content": "Hello!" }\n  ]\n}',
    status: "done",
  },
  {
    id: "2",
    name: "Format Detected",
    description: "Auto-detected source format",
    format: "claude",
    content: '{\n  "detectedFormat": "claude",\n  "confidence": "high"\n}',
    status: "done",
  },
  {
    id: "3",
    name: "OpenAI Intermediate",
    description: "Translated to OpenAI hub format",
    format: "openai",
    content:
      '{\n  "model": "claude-sonnet-4-20250514",\n  "messages": [\n    { "role": "user", "content": "Hello!" }\n  ],\n  "stream": true\n}',
    status: "pending",
  },
  {
    id: "4",
    name: "Provider Format",
    description: "Translated to provider target format",
    format: "gemini",
    content:
      '{\n  "model": "gemini-2.5-flash",\n  "contents": [\n    { "role": "user", "parts": [{ "text": "Hello!" }] }\n  ]\n}',
    status: "pending",
  },
  {
    id: "5",
    name: "Provider Response",
    description: "Streaming response from provider",
    format: "openai",
    content:
      'data: {"choices":[{"delta":{"content":"Hello! How can I help you today?"}}]}\ndata: [DONE]',
    status: "pending",
  },
];

/** Maps step status to badge variant. */
function statusVariant(
  status: PipelineStep["status"]
): "default" | "primary" | "success" | "error" | "warning" | "info" {
  switch (status) {
    case "active":
      return "primary";
    case "done":
      return "success";
    case "error":
      return "error";
    default:
      return "default";
  }
}

/** Maps step status to color for the step number circle. */
function statusNumberClass(status: PipelineStep["status"]): string {
  switch (status) {
    case "active":
      return "bg-primary/10 text-primary";
    case "done":
      return "bg-emerald-500/10 text-emerald-500";
    case "error":
      return "bg-red-500/10 text-red-500";
    default:
      return "bg-bg-subtle text-text-muted";
  }
}

/**
 * PipelineView — Advanced accordion for hub-and-spoke pipeline visualization.
 *
 * Refactors the pipeline visualization portion of ChatTesterMode.tsx (steps +
 * status badges + expandable content).  When `pipelineSteps` is not provided,
 * renders a static demo so the accordion is never empty.
 *
 * D7 lazy-render: step cards are NOT mounted until the first open.
 */
export default function PipelineView({
  forceOpen = false,
  onOpenChange,
  defaultOpen = false,
  pipelineSteps,
}: PipelineViewProps) {
  const t = useTranslations("translator");

  /** D7 lazy-render guard: true only after the first open (or when forceOpen/defaultOpen). */
  const [hasOpened, setHasOpened] = useState(Boolean(defaultOpen) || Boolean(forceOpen));
  const [open, setOpen] = useState(Boolean(defaultOpen) || Boolean(forceOpen));
  const [expandedStepId, setExpandedStepId] = useState<string | null>(null);

  // Notify parent on mount when forceOpen=true (deep-link sync).
  useEffect(() => {
    if (forceOpen) {
      onOpenChange?.(true);
    }
    // Only run on mount — forceOpen is treated as an initial deep-link signal.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync forceOpen changes from parent after mount.
  useEffect(() => {
    if (!forceOpen || open) return;
    const openFromDeepLink = setTimeout(() => {
      setOpen(true);
      setHasOpened(true);
    }, 0);
    return () => clearTimeout(openFromDeepLink);
  }, [forceOpen, open]);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      setOpen(next);
      if (next) setHasOpened(true);
      onOpenChange?.(next);
    },
    [onOpenChange]
  );

  const steps = pipelineSteps ?? DEMO_STEPS;

  const tr = (key: string, fallback: string): string => {
    try {
      const v = t(key as Parameters<typeof t>[0]);
      if (v === key || v === `translator.${key}`) return fallback;
      return v as string;
    } catch {
      return fallback;
    }
  };

  return (
    <Collapsible
      title={tr("advancedPipelineTitle", "Pipeline OpenAI intermediário")}
      subtitle={tr("advancedPipelineSubtitle", "Visualize cada passo da tradução (hub-and-spoke).")}
      icon="route"
      defaultOpen={defaultOpen || forceOpen}
      className="border-black/5 dark:border-white/5"
    >
      {/* D7 lazy-render container */}
      <div
        ref={(el) => {
          if (el && !hasOpened) {
            setHasOpened(true);
            handleOpenChange(true);
          }
        }}
        className="space-y-2"
        data-pipeline-container="true"
      >
        {hasOpened && (
          <>
            {/* Demo badge when showing placeholder data */}
            {!pipelineSteps && (
              <div className="flex items-center gap-2 text-xs text-text-muted px-1">
                <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                  info
                </span>
                <span>
                  {tr(
                    "pipelineVisualizationHint",
                    "Envie um request pelo Chat Tester para ver o pipeline em tempo real. Abaixo: exemplo estático."
                  )}
                </span>
              </div>
            )}

            {/* Step list */}
            <div
              className="space-y-1"
              role="list"
              aria-label={tr("pipelineStepsAria", "Pipeline steps")}
            >
              {steps.map((step, i) => {
                const meta = (step.format && FORMAT_META[step.format]) ?? {
                  label: step.format ?? "unknown",
                  color: "gray",
                  icon: "code",
                };
                const isExpanded = expandedStepId === step.id;

                return (
                  <div key={step.id} role="listitem">
                    {/* Connector line between steps */}
                    {i > 0 && (
                      <div className="flex justify-center py-1" aria-hidden="true">
                        <div className="w-px h-3 bg-border" />
                      </div>
                    )}

                    <Card
                      className={
                        step.status === "error"
                          ? "border-red-500/30"
                          : isExpanded
                            ? "border-primary/30"
                            : step.status === "pending"
                              ? "opacity-60"
                              : ""
                      }
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedStepId(isExpanded ? null : step.id)}
                        className="w-full p-3 flex items-center gap-3 text-left"
                        aria-expanded={isExpanded}
                        aria-controls={`pipeline-step-content-${step.id}`}
                      >
                        {/* Step number circle */}
                        <div
                          className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 ${statusNumberClass(step.status)}`}
                          aria-hidden="true"
                        >
                          {step.status === "error" ? "!" : i + 1}
                        </div>

                        {/* Step info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-main">{step.name}</p>
                          {step.description && (
                            <p className="text-[10px] text-text-muted truncate">
                              {step.description}
                            </p>
                          )}
                        </div>

                        {/* Status + format badge */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <Badge variant={statusVariant(step.status)} size="sm">
                            {step.status === "pending"
                              ? "pending"
                              : step.status === "active"
                                ? "active"
                                : step.status === "error"
                                  ? "error"
                                  : (meta.label as string)}
                          </Badge>
                        </div>

                        {/* Expand chevron */}
                        <span
                          className="material-symbols-outlined text-[18px] text-text-muted shrink-0"
                          aria-hidden="true"
                        >
                          {isExpanded ? "expand_less" : "expand_more"}
                        </span>
                      </button>

                      {/* Expanded content — pre-formatted JSON/SSE */}
                      {isExpanded && (
                        <div
                          id={`pipeline-step-content-${step.id}`}
                          className="px-3 pb-3"
                          role="region"
                          aria-label={`${step.name} details`}
                        >
                          <pre className="text-xs text-text-muted bg-bg-subtle border border-border rounded-lg p-3 overflow-x-auto whitespace-pre-wrap break-words max-h-60 overflow-y-auto font-mono">
                            {step.content || tr("noContent", "(no content)")}
                          </pre>
                        </div>
                      )}
                    </Card>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </Collapsible>
  );
}
