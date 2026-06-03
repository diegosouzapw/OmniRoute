"use client";

import { useEffect, useReducer } from "react";
import { useTranslations } from "next-intl";
import DestinationStep from "./wizard/DestinationStep";
import InputStep from "./wizard/InputStep";
import JsonlValidationStep from "./wizard/JsonlValidationStep";
import CostEstimateStep from "./wizard/CostEstimateStep";
import type { WizardDestination, WizardInput, ValidationResult, CostEstimate } from "@/lib/batches/types";

// ── State ─────────────────────────────────────────────────────────────────────

interface WizardState {
  step: 1 | 2 | 3 | 4;
  destination: WizardDestination | null;
  input: WizardInput;
  validation: ValidationResult | null;
  cost: CostEstimate | null;
  creating: boolean;
  error: string | null;
}

const initialInput: WizardInput = { kind: "jsonl", fileName: null, rawContent: null };

const initialState: WizardState = {
  step: 1,
  destination: null,
  input: initialInput,
  validation: null,
  cost: null,
  creating: false,
  error: null,
};

// ── Actions ───────────────────────────────────────────────────────────────────

type WizardAction =
  | { type: "SET_DESTINATION"; destination: WizardDestination | null }
  | { type: "SET_INPUT"; input: WizardInput }
  | { type: "SET_VALIDATION_RESULT"; result: ValidationResult }
  | { type: "SET_COST_ESTIMATE"; cost: CostEstimate }
  | { type: "SET_STEP"; step: 1 | 2 | 3 | 4 }
  | { type: "SET_CREATING"; creating: boolean }
  | { type: "SET_ERROR"; error: string | null }
  | { type: "RESET" };

function reducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case "SET_DESTINATION":
      return { ...state, destination: action.destination, error: null };
    case "SET_INPUT":
      return { ...state, input: action.input, validation: null, error: null };
    case "SET_VALIDATION_RESULT":
      return { ...state, validation: action.result, error: null };
    case "SET_COST_ESTIMATE":
      return { ...state, cost: action.cost };
    case "SET_STEP":
      return { ...state, step: action.step, error: null };
    case "SET_CREATING":
      return { ...state, creating: action.creating };
    case "SET_ERROR":
      return { ...state, error: action.error, creating: false };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

// ── Step completion guards ────────────────────────────────────────────────────

function isStep1Valid(state: WizardState): boolean {
  return (
    state.destination !== null &&
    state.destination.provider.length > 0 &&
    state.destination.model.length > 0
  );
}

function isStep2Valid(state: WizardState): boolean {
  if (!state.input.rawContent) return false;
  if (state.input.kind === "csv") {
    // CSV: rawContent is updated to the generated JSONL by CsvMappingStep
    // We detect this by checking the content is valid-looking JSONL (not raw CSV)
    // Simplest heuristic: must contain at least one JSON object line
    return state.input.rawContent.trim().startsWith("{");
  }
  return true;
}

function isStep3Valid(state: WizardState): boolean {
  return state.validation !== null && state.validation.ok;
}

// ── Stepper indicator ─────────────────────────────────────────────────────────

const STEPS = [1, 2, 3, 4] as const;
const STEP_LABELS: Record<number, string> = {
  1: "wizardStep1Destination",
  2: "wizardStep2Input",
  3: "wizardStep3Validate",
  4: "wizardStep4Cost",
};

function StepIndicator({ current, t }: { current: 1 | 2 | 3 | 4; t: ReturnType<typeof useTranslations<"common">> }) {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {STEPS.map((s) => {
        const isDone = s < current;
        const isCurrent = s === current;
        return (
          <div key={s} className="flex items-center gap-1 sm:gap-2">
            <div
              className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium transition-colors
                ${isDone ? "bg-emerald-500 text-white" : isCurrent ? "bg-[var(--color-accent)] text-white" : "bg-[var(--color-border)] text-[var(--color-text-muted)]"}`}
            >
              {isDone ? (
                <span className="material-symbols-outlined text-sm">check</span>
              ) : (
                s
              )}
            </div>
            <span
              className={`hidden sm:inline text-xs ${isCurrent ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)]"}`}
            >
              {t(STEP_LABELS[s] as Parameters<typeof t>[0])}
            </span>
            {s < 4 && (
              <div
                className={`w-6 h-px ${isDone ? "bg-emerald-500" : "bg-[var(--color-border)]"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface NewBatchWizardProps {
  onClose: () => void;
  onCreated: (batchId: string) => void;
  availableProviders: Array<{ id: string; name: string; models: string[] }>;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function NewBatchWizard({
  onClose,
  onCreated,
  availableProviders,
}: NewBatchWizardProps) {
  const t = useTranslations("common");
  const [state, dispatch] = useReducer(reducer, initialState);

  // Escape closes wizard; Enter advances to next step when allowed (A-5).
  // Skip Enter when focus is inside form controls so it doesn't interfere with typing.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (state.creating) return;
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Enter") {
        const tag = (e.target as HTMLElement | null)?.tagName;
        // Skip form controls (typing) AND buttons — a focused button (Next/Back/Cancel/
        // Create) already activates natively on Enter; firing the global Next click too
        // would double-dispatch and conflict with Back/Cancel. Only advance when focus is
        // on a non-interactive element (the modal body).
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || tag === "BUTTON") return;
        const nextBtn = document.querySelector<HTMLButtonElement>(
          'button[data-wizard-next="true"]'
        );
        if (nextBtn && !nextBtn.disabled) nextBtn.click();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, state.creating]);

  // ── Navigation ──────────────────────────────────────────────────────────────

  function handleNext() {
    if (state.step < 4) {
      dispatch({ type: "SET_STEP", step: (state.step + 1) as 1 | 2 | 3 | 4 });
    }
  }

  function handleBack() {
    if (state.step > 1) {
      dispatch({ type: "SET_STEP", step: (state.step - 1) as 1 | 2 | 3 | 4 });
    }
  }

  // ── Batch creation ──────────────────────────────────────────────────────────

  async function handleCreate() {
    if (!state.destination || !state.input.rawContent) return;

    dispatch({ type: "SET_CREATING", creating: true });
    dispatch({ type: "SET_ERROR", error: null });

    try {
      // Step 1: upload input file
      const formData = new FormData();
      formData.append("purpose", "batch");
      formData.append(
        "file",
        new Blob([state.input.rawContent], { type: "application/jsonl" }),
        "batch-input.jsonl"
      );

      const fileRes = await fetch("/api/v1/files", { method: "POST", body: formData });
      if (!fileRes.ok) {
        console.error("[NewBatchWizard] file upload failed:", fileRes.status);
        dispatch({ type: "SET_ERROR", error: t("wizardErrorUpload") });
        return;
      }

      const file = (await fileRes.json()) as { id: string };

      // Step 2: create batch
      const batchRes = await fetch("/api/v1/batches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input_file_id: file.id,
          endpoint: state.destination.endpoint,
          completion_window: "24h",
        }),
      });

      if (!batchRes.ok) {
        console.error("[NewBatchWizard] batch create failed:", batchRes.status);
        dispatch({ type: "SET_ERROR", error: t("wizardErrorCreate") });
        return;
      }

      const batch = (await batchRes.json()) as { id: string };
      onCreated(batch.id);
      onClose();
    } catch (err) {
      // Hard rule #12 — never expose err.message/stack raw
      console.error("[NewBatchWizard] unexpected error:", err);
      dispatch({ type: "SET_ERROR", error: t("wizardErrorCreate") });
    }
  }

  // ── Next button state ───────────────────────────────────────────────────────

  const canGoNext =
    (state.step === 1 && isStep1Valid(state)) ||
    (state.step === 2 && isStep2Valid(state)) ||
    (state.step === 3 && isStep3Valid(state));

  // ── Step content ────────────────────────────────────────────────────────────

  const stepContent = (() => {
    switch (state.step) {
      case 1:
        return (
          <DestinationStep
            destination={state.destination}
            onChange={(dest) => dispatch({ type: "SET_DESTINATION", destination: dest })}
            availableProviders={availableProviders}
          />
        );
      case 2:
        return (
          <InputStep
            input={state.input}
            onChange={(inp) => dispatch({ type: "SET_INPUT", input: inp })}
            destination={state.destination}
          />
        );
      case 3:
        return (
          <JsonlValidationStep
            jsonl={state.input.rawContent ?? ""}
            endpoint={state.destination?.endpoint ?? "/v1/chat/completions"}
            onResult={(r) => dispatch({ type: "SET_VALIDATION_RESULT", result: r })}
          />
        );
      case 4:
        return (
          <CostEstimateStep
            jsonl={state.input.rawContent ?? ""}
            model={state.destination?.model ?? ""}
            endpoint={state.destination?.endpoint ?? "/v1/chat/completions"}
            onCreate={handleCreate}
            creating={state.creating}
            error={state.error}
          />
        );
    }
  })();

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => !state.creating && onClose()}
      />

      {/* Panel */}
      <div
        className="relative w-full sm:max-w-3xl max-h-[90vh] flex flex-col rounded-t-2xl sm:rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-batch-wizard-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[var(--color-border)] shrink-0">
          <div className="flex flex-col gap-2">
            <h2 id="new-batch-wizard-title" className="text-base font-semibold text-[var(--color-text)]">{t("wizardTitle")}</h2>
            <StepIndicator current={state.step} t={t} />
          </div>
          <button
            type="button"
            onClick={() => !state.creating && onClose()}
            disabled={state.creating}
            aria-label={t("wizardClose")}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] disabled:opacity-40 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">{stepContent}</div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-[var(--color-border)] shrink-0">
          <button
            type="button"
            onClick={() => !state.creating && onClose()}
            disabled={state.creating}
            className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] disabled:opacity-40 transition-colors"
          >
            {t("wizardCancel")}
          </button>

          <div className="flex items-center gap-3">
            {state.step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                disabled={state.creating}
                className="rounded-lg px-4 py-2 text-sm font-medium border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-bg-alt)] disabled:opacity-40 transition-colors"
              >
                {t("wizardBack")}
              </button>
            )}

            {state.step < 4 && (
              <button
                type="button"
                data-wizard-next="true"
                onClick={handleNext}
                disabled={!canGoNext}
                className="rounded-lg px-4 py-2 text-sm font-medium bg-[var(--color-accent)] text-white disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                {t("wizardNext")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
