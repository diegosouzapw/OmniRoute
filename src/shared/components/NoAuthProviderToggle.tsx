"use client";

import { cn } from "@/shared/utils/cn";
import Toggle from "./Toggle";

interface NoAuthProviderToggleProps {
  enabled: boolean;
  saving?: boolean;
  onEnabledChange?: (enabled: boolean) => void;
  className?: string;
}

export default function NoAuthProviderToggle({
  enabled,
  saving = false,
  onEnabledChange,
  className,
}: NoAuthProviderToggleProps) {
  if (!onEnabledChange) return null;

  return (
    <div className={cn("inline-flex items-center gap-2 rounded-md px-1 py-1", className)}>
      <span className="text-sm font-medium text-text-main">
        {saving ? "Saving" : enabled ? "Enabled" : "Disabled"}
      </span>
      <Toggle
        size="lg"
        checked={enabled}
        disabled={saving}
        onChange={onEnabledChange}
        ariaLabel="Toggle no-auth provider"
        title={enabled ? "Disable provider" : "Enable provider"}
      />
    </div>
  );
}
