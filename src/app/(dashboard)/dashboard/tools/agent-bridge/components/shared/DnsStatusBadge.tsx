"use client";

interface DnsStatusBadgeProps {
  enabled: boolean;
}

export function DnsStatusBadge({ enabled }: DnsStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
        enabled
          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          : "bg-zinc-500/10 text-zinc-500 dark:text-zinc-400"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${enabled ? "bg-emerald-500" : "bg-zinc-400"}`}
      />
      {enabled ? "DNS on" : "DNS off"}
    </span>
  );
}
