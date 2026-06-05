"use client";

// src/app/(dashboard)/dashboard/playground/components/ImprovePromptButton.tsx

import { useState } from "react";
import { useImprovePrompt } from "../hooks/useImprovePrompt";
import type { ConfigState } from "./StudioConfigPane";

interface ImprovePromptButtonProps {
  configState: ConfigState;
  setConfigState: (s: ConfigState) => void;
}

/**
 * ImprovePromptButton — "✨ Improve prompt" button with quota-consumption warning.
 *
 * Flow: click → confirmation modal → confirm → calls useImprovePrompt.improve()
 * → on success, updates configState.systemPrompt and/or configState.params.
 *
 * D8: uses the model configured in the Config pane (never overrides with cheap model).
 */
export default function ImprovePromptButton({ configState, setConfigState }: ImprovePromptButtonProps) {
  const { loading, error, improve } = useImprovePrompt();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [improveError, setImproveError] = useState<string | null>(null);

  async function handleConfirm() {
    setConfirmOpen(false);
    setImproveError(null);

    const model = configState.model.trim();
    if (!model) {
      setImproveError("Please set a model in the Config pane first.");
      return;
    }

    const result = await improve({
      system: configState.systemPrompt || undefined,
      model,
    });

    if (result == null) {
      setImproveError(error ?? "Improve prompt failed.");
      return;
    }

    // Apply improved versions if returned
    const next = { ...configState };

    if (result.improvedSystem != null) {
      next.systemPrompt = result.improvedSystem;
    }

    setConfigState(next);
  }

  const isDisabled = loading || !configState.model.trim();

  return (
    <>
      <div className="flex flex-col gap-1">
        <button
          onClick={() => {
            setImproveError(null);
            setConfirmOpen(true);
          }}
          disabled={isDisabled}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded border border-border text-text-muted hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed self-start"
          aria-label="Improve prompt using AI"
          title={!configState.model.trim() ? "Set a model first" : "Improve your prompt with AI"}
        >
          <span className="text-[13px]">✨</span>
          {loading ? "Improving…" : "Improve prompt"}
        </button>

        {improveError && (
          <p className="text-[11px] text-destructive">{improveError}</p>
        )}
      </div>

      {/* Quota confirmation modal */}
      {confirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setConfirmOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Confirm improve prompt"
        >
          <div
            className="bg-surface border border-border rounded-xl p-5 w-80 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3 mb-4">
              <span className="text-[24px] shrink-0">✨</span>
              <div>
                <h3 className="text-sm font-semibold text-text-main mb-1">
                  Improve prompt
                </h3>
                <p className="text-xs text-text-muted">
                  This will send your current system prompt to{" "}
                  <code className="font-mono text-primary">{configState.model}</code>
                  {" "}to generate an improved version.
                </p>
                <p className="text-xs text-text-muted mt-1.5 font-medium">
                  This action will consume model quota.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setConfirmOpen(false)}
                className="text-xs px-3 py-1.5 rounded border border-border text-text-muted hover:text-text-main transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => void handleConfirm()}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                <span className="text-[12px]">✨</span>
                Improve
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
