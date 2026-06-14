"use client";

import type { InterceptedRequest } from "@/mitm/inspector/types";
import { extractLlmMetadata } from "@/mitm/inspector/llmMetadataExtractor";
import { TokenBadge } from "../shared/TokenBadge";

interface LlmDetailsTabProps {
  request: InterceptedRequest;
}

export function LlmDetailsTab({ request }: LlmDetailsTabProps) {
  const meta = extractLlmMetadata(request);

  if (!meta) {
    return (
      <div className="p-4 text-sm text-text-muted">
        LLM metadata not available for this request.
      </div>
    );
  }

  const rows: Array<{ label: string; value: string | null | undefined }> = [
    { label: "Detected provider", value: meta.provider },
    { label: "API kind", value: meta.apiKind },
    { label: "Model", value: meta.model },
    { label: "Messages", value: meta.messages > 0 ? String(meta.messages) : null },
    { label: "Stream", value: meta.streamed ? "yes (SSE)" : "no" },
    { label: "Mapped to", value: meta.mappedTo },
    {
      label: "Cost estimate",
      value: meta.costEstimateUsd != null ? `$${meta.costEstimateUsd.toFixed(6)}` : null,
    },
  ];

  return (
    <div className="p-4 h-full overflow-auto space-y-4">
      <div className="rounded border border-border bg-bg-subtle">
        <table className="w-full text-sm">
          <tbody>
            {rows.map(({ label, value }) => (
              <tr key={label} className="border-b border-border/50 last:border-b-0">
                <td className="px-3 py-2 text-text-muted font-medium w-[40%]">{label}</td>
                <td className="px-3 py-2 text-text-main font-mono">{value ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2">
        <TokenBadge tokensIn={meta.tokensIn} tokensOut={meta.tokensOut} />
        {(meta.tokensIn != null || meta.tokensOut != null) && (
          <span className="text-xs text-text-muted">
            Total: {(meta.tokensIn ?? 0) + (meta.tokensOut ?? 0)} tokens
          </span>
        )}
      </div>
    </div>
  );
}
