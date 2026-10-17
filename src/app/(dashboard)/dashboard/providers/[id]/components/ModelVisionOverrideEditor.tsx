"use client";

export default function ModelVisionOverrideEditor({
  modelId,
  value,
  onSave,
  saving,
  t,
}: {
  modelId: string;
  value?: boolean | null;
  onSave?: (modelId: string, value: boolean | null) => Promise<boolean>;
  saving?: boolean;
  t: (key: string) => string;
}) {
  if (!onSave) return null;
  return (
    <label
      className="inline-flex items-center gap-1 text-[11px] text-text-muted"
      title={t("visionCapableHint")}
    >
      <input
        type="checkbox"
        aria-label={t("visionCapableLabel")}
        checked={value === true}
        disabled={saving}
        onChange={(event) => void onSave(modelId, event.target.checked ? true : null)}
        className="accent-primary"
      />
      {t("visionCapableLabel")}
    </label>
  );
}
