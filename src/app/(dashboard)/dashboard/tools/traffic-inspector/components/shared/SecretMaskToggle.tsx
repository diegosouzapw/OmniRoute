"use client";

interface SecretMaskToggleProps {
  masked: boolean;
  onToggle: () => void;
}

export function SecretMaskToggle({ masked, onToggle }: SecretMaskToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-main focus-ring rounded px-2 py-0.5 border border-border"
      title={masked ? "Unmask secrets" : "Mask secrets"}
    >
      <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
        {masked ? "visibility_off" : "visibility"}
      </span>
      {masked ? "Show secrets" : "Mask secrets"}
    </button>
  );
}
