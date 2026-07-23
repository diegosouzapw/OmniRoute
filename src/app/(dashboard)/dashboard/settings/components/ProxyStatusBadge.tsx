"use client";

interface ProxyStatusBadgeProps {
  status?: string;
}

export function ProxyStatusBadge({ status }: ProxyStatusBadgeProps) {
  const isInactive = status === "inactive";
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded border ${
        isInactive
          ? "border-red-500/30 bg-red-500/10 text-red-400"
          : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${isInactive ? "bg-red-400" : "bg-emerald-400"}`}
      />
      {isInactive ? "Inactive" : "Active"}
    </span>
  );
}
