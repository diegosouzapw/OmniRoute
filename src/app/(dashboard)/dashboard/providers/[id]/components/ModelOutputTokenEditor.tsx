"use client";
import React, { useEffect, useRef, useState } from "react";
import { parseContextWindowOverrideInput, providerText } from "../providerPageHelpers";

type Props = {
  modelId: string;
  value?: number | null;
  saving?: boolean;
  onSave?: (modelId: string, value: number | null) => Promise<boolean>;
  t: (key: string, values?: Record<string, unknown>) => string;
};

function OutputTokenValue({ value, label }: { value?: number | null; label: string }) {
  if (typeof value !== "number") return null;
  return (
    <span
      className="rounded-full bg-blue-500/15 px-1.5 py-0.5 text-[10px] text-blue-400"
      title={label}
    >
      {value.toLocaleString()}
    </span>
  );
}

export default function ModelOutputTokenEditor({ modelId, value, saving, onSave, t }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!editing) return;
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [editing]);
  const save = async () => {
    if (!onSave || saving) return;
    const parsed = parseContextWindowOverrideInput(draft);
    const invalid =
      parsed.invalid || (parsed.value !== null && !Number.isSafeInteger(parsed.value));
    const accepted = await onSave(modelId, invalid ? Number.NaN : parsed.value);
    if (!invalid && accepted) setEditing(false);
  };
  if (!editing)
    return (
      <>
        <OutputTokenValue value={value} label={t("maxOutputTokenOverrideLabel")} />
        {onSave && (
          <button
            type="button"
            aria-label={t("maxOutputTokenOverrideLabel")}
            title={t("maxOutputTokenOverrideLabel")}
            className="rounded p-0.5 text-text-muted hover:text-primary"
            onClick={() => {
              setDraft(typeof value === "number" ? String(value) : "");
              setEditing(true);
            }}
          >
            <span className="material-symbols-outlined text-sm">output</span>
          </button>
        )}
      </>
    );
  return (
    <span className="flex flex-wrap items-center gap-1">
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        value={draft}
        disabled={saving}
        aria-label={t("maxOutputTokenOverrideLabel")}
        title={t("maxOutputTokenOverrideHint")}
        placeholder="4096"
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            void save();
          }
          if (event.key === "Escape") setEditing(false);
        }}
        className="w-24 rounded border border-border bg-background px-1.5 py-0.5 text-[11px]"
      />
      <button
        type="button"
        disabled={saving}
        title={providerText(t, "save", "Save")}
        onClick={() => void save()}
      >
        <span className="material-symbols-outlined text-sm">check</span>
      </button>
      <button
        type="button"
        disabled={saving}
        title={providerText(t, "cancel", "Cancel")}
        onClick={() => setEditing(false)}
      >
        <span className="material-symbols-outlined text-sm">close</span>
      </button>
      <span className="basis-full text-[10px] text-text-muted">
        {t("maxOutputTokenOverrideHint")}
      </span>
    </span>
  );
}
