"use client";

export type WebhookKind = "slack" | "telegram" | "discord" | "custom";

const KIND_ICONS: Record<WebhookKind, string> = {
  slack: "chat",
  telegram: "send",
  discord: "forum",
  custom: "webhook",
};

const KIND_COLORS: Record<WebhookKind, string> = {
  slack: "text-emerald-500",
  telegram: "text-blue-500",
  discord: "text-violet-500",
  custom: "text-amber-500",
};

interface IntegrationCardProps {
  kind: WebhookKind;
  name: string;
  description: string;
  selected: boolean;
  onSelect: (kind: WebhookKind) => void;
}

export function IntegrationCard({
  kind,
  name,
  description,
  selected,
  onSelect,
}: IntegrationCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(kind)}
      className={`flex w-full flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all ${
        selected
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border bg-surface hover:border-primary/40 hover:bg-primary/5"
      }`}
    >
      <span className={`material-symbols-outlined text-[28px] ${KIND_COLORS[kind]}`}>
        {KIND_ICONS[kind]}
      </span>
      <div>
        <p className="text-sm font-semibold text-text-main">{name}</p>
        <p className="mt-0.5 text-xs text-text-muted">{description}</p>
      </div>
      {selected && (
        <span className="ml-auto mt-auto flex size-5 items-center justify-center rounded-full bg-primary">
          <span className="material-symbols-outlined text-[14px] text-white">check</span>
        </span>
      )}
    </button>
  );
}
