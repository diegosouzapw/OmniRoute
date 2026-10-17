"use client";
/**
 * Shared inline context-window override editor for model rows (#14337).
 *
 * Used by PassthroughModelRow (compatible providers) and ModelRow (catalog
 * models of native providers). The two rows lay the controls out in different
 * places — badge/input next to the model id, pencil among the action buttons —
 * so the behavior lives in one hook and the markup in two small components.
 *
 * Opt-in: a row without an `onSave` callback renders nothing from this module.
 */
import React, { useEffect, useRef, useState } from "react";
import { parseContextWindowOverrideInput, providerText } from "../providerPageHelpers";

type Translator = (key: string, values?: Record<string, unknown>) => string;

export interface UseContextWindowOverrideEditorArgs {
  modelId: string;
  override?: number | null;
  onSave?: (modelId: string, value: number | null) => Promise<void>;
}

export function useContextWindowOverrideEditor({
  modelId,
  override,
  onSave,
}: UseContextWindowOverrideEditorArgs) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("");

  const start = () => {
    setValue(typeof override === "number" ? String(override) : "");
    setEditing(true);
  };

  const cancel = () => setEditing(false);

  const submit = async () => {
    if (!onSave) return;
    const parsed = parseContextWindowOverrideInput(value);
    // Invalid input keeps the editor open rather than silently discarding the
    // value or writing a wrong one; the section surfaces the message.
    if (parsed.invalid) {
      await onSave(modelId, Number.NaN);
      return;
    }
    await onSave(modelId, parsed.value);
    setEditing(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      void submit();
    }
    if (e.key === "Escape") cancel();
  };

  return { editing, value, setValue, start, cancel, submit, onKeyDown };
}

export type ContextWindowOverrideEditorState = ReturnType<typeof useContextWindowOverrideEditor>;

/** Text input that grabs focus (and selects its seed value) when it mounts. */
function FocusedInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
    ref.current?.select();
  }, []);
  return <input ref={ref} {...props} />;
}

/** The 🪟 badge (when an override exists) or the inline input + save/cancel. */
export function ContextWindowOverrideField({
  editor,
  override,
  saving,
  t,
}: {
  editor: ContextWindowOverrideEditorState;
  override?: number | null;
  saving?: boolean;
  t: Translator;
}) {
  if (editor.editing) {
    return (
      <span className="flex items-center gap-1">
        <FocusedInput
          type="text"
          inputMode="numeric"
          value={editor.value}
          onChange={(e) => editor.setValue(e.target.value)}
          onKeyDown={editor.onKeyDown}
          disabled={saving}
          placeholder={t("contextWindowOverridePlaceholder")}
          title={t("contextWindowOverrideHint")}
          aria-label={t("contextWindowOverrideLabel")}
          className="w-28 rounded border border-border bg-background px-1.5 py-0.5 text-[11px]"
        />
        <button
          onClick={() => void editor.submit()}
          disabled={saving}
          className="rounded p-0.5 text-text-muted hover:bg-sidebar hover:text-primary disabled:opacity-40"
          title={providerText(t, "save", "Save")}
        >
          <span className="material-symbols-outlined text-sm">check</span>
        </button>
        <button
          onClick={editor.cancel}
          disabled={saving}
          className="rounded p-0.5 text-text-muted hover:bg-sidebar hover:text-primary disabled:opacity-40"
          title={providerText(t, "cancel", "Cancel")}
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      </span>
    );
  }
  if (typeof override !== "number") return null;
  return (
    <span
      className="shrink-0 rounded-full bg-orange-500/15 px-1.5 py-0.5 text-[10px] font-medium text-orange-400"
      title={t("contextWindowOverrideHint")}
    >
      {`🪟 ${override.toLocaleString()}`}
    </span>
  );
}

/** The pencil that opens the editor. Hidden while editing. */
export function ContextWindowOverrideEditButton({
  editor,
  t,
}: {
  editor: ContextWindowOverrideEditorState;
  t: Translator;
}) {
  if (editor.editing) return null;
  return (
    <button
      onClick={editor.start}
      className="rounded p-0.5 text-text-muted hover:bg-sidebar hover:text-primary"
      title={t("contextWindowOverrideLabel")}
      aria-label={t("contextWindowOverrideLabel")}
    >
      <span className="material-symbols-outlined text-sm">edit</span>
    </button>
  );
}
