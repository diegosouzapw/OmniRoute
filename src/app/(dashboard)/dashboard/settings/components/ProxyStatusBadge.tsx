"use client";

import { useTranslations } from "next-intl";

interface ProxyStatusBadgeProps {
  status?: string;
}

// Mirrors PROXY_ALIVE_PREDICATE (src/lib/db/proxies/guards.ts) — kept as a small
// client-side duplicate rather than importing the server DB module into a "use
// client" component (same pattern as RELAY_PROXY_TYPES in proxies/mappers.ts).
// Any status in this set (including "dead", written by PROXY_AUTO_DISABLE) is
// excluded from pool/rotation resolution, so it must not render as "Active".
const NOT_ALIVE_STATUSES = new Set(["inactive", "error", "disabled", "dead", "down"]);

export function ProxyStatusBadge({ status }: ProxyStatusBadgeProps) {
  const t = useTranslations("settings");
  const isInactive = NOT_ALIVE_STATUSES.has((status ?? "").toLowerCase());
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
      {isInactive ? t("proxyStatusInactive") : t("proxyStatusActive")}
    </span>
  );
}
