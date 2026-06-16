"use client";

import Card from "./Card";
import NoAuthProviderToggle from "./NoAuthProviderToggle";

interface NoAuthProviderCardProps {
  enabled?: boolean;
  saving?: boolean;
  onEnabledChange?: (enabled: boolean) => void;
}

export default function NoAuthProviderCard({
  enabled = true,
  saving = false,
  onEnabledChange,
}: NoAuthProviderCardProps) {
  return (
    <Card>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-green-500/10 text-green-500">
            <span className="material-symbols-outlined text-[20px]">lock_open</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">No authentication required</p>
            <p className="text-xs text-text-muted">
              This provider is ready to use immediately — no signup or API key needed.
            </p>
          </div>
        </div>
        <NoAuthProviderToggle
          className="w-full justify-end sm:w-auto"
          enabled={enabled}
          saving={saving}
          onEnabledChange={onEnabledChange}
        />
      </div>
    </Card>
  );
}
