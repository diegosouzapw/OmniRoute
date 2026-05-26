"use client";

export type WebhookKind = "slack" | "telegram" | "discord" | "custom";
export type ComingSoonKind = "email" | "pagerduty" | "teams";
type AnyKind = WebhookKind | ComingSoonKind;

const KIND_ICONS: Record<AnyKind, string> = {
  slack: "chat",
  telegram: "send",
  discord: "forum",
  custom: "webhook",
  email: "email",
  pagerduty: "notifications_active",
  teams: "groups",
};

const KIND_COLORS: Record<AnyKind, string> = {
  slack: "text-emerald-500",
  telegram: "text-blue-500",
  discord: "text-violet-500",
  custom: "text-amber-500",
  email: "text-text-muted",
  pagerduty: "text-text-muted",
  teams: "text-text-muted",
};

interface IntegrationCardProps {
  kind: AnyKind;
  name: string;
  description: string;
  selected: boolean;
  onSelect?: (kind: WebhookKind) => void;
  disabled?: boolean;
  comingSoonLabel?: string;
}

export function IntegrationCard({
  kind,
  name,
  description,
  selected,
  onSelect,
  disabled,
  comingSoonLabel,
}: IntegrationCardProps) {
  return (
    <button
      type="button"
      onClick={!disabled && onSelect ? () => onSelect(kind as WebhookKind) : undefined}
      disabled={disabled}
      className={`relative flex w-full flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
        disabled
          ? "border-border bg-surface"
          : selected
            ? "border-primary bg-primary/5 shadow-sm"
            : "border-border bg-surface hover:border-primary/40 hover:bg-primary/5"
      }`}
    >
      {comingSoonLabel && (
        <span className="absolute right-2 top-2 rounded-full bg-surface px-1.5 py-0.5 text-[10px] font-medium text-text-muted ring-1 ring-border">
          {comingSoonLabel}
        </span>
      )}
      <span className={`material-symbols-outlined text-[28px] ${KIND_COLORS[kind]}`}>
        {KIND_ICONS[kind]}
      </span>
      <div>
        <p className="text-sm font-semibold text-text-main">{name}</p>
        <p className="mt-0.5 text-xs text-text-muted">{description}</p>
      </div>
      {selected && !disabled && (
        <span className="ml-auto mt-auto flex size-5 items-center justify-center rounded-full bg-primary">
          <span className="material-symbols-outlined text-[14px] text-white">check</span>
        </span>
      )}
    </button>
  );
}
