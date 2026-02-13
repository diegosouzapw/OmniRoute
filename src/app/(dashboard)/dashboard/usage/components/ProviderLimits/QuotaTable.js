"use client";

import { formatResetTime, calculatePercentage } from "./utils";

/**
 * Format reset time display (Today, 12:00 PM)
 */
function formatResetTimeDisplay(resetTime) {
  if (!resetTime) return null;

  try {
    const date = new Date(resetTime);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let dayStr = "";
    if (date >= today && date < tomorrow) {
      dayStr = "Today";
    } else if (date >= tomorrow && date < new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000)) {
      dayStr = "Tomorrow";
    } else {
      dayStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }

    const timeStr = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${dayStr}, ${timeStr}`;
  } catch {
    return null;
  }
}

/**
 * Get color classes based on remaining percentage
 */
function getColorClasses(remainingPercentage) {
  if (remainingPercentage > 70) {
    return {
      text: "text-green-600 dark:text-green-400",
      bg: "bg-green-500",
      bgLight: "bg-green-500/10",
      emoji: "🟢",
    };
  }

  if (remainingPercentage >= 30) {
    return {
      text: "text-yellow-600 dark:text-yellow-400",
      bg: "bg-yellow-500",
      bgLight: "bg-yellow-500/10",
      emoji: "🟡",
    };
  }

  // 0-29% including 0% (out of quota) - show red
  return {
    text: "text-red-600 dark:text-red-400",
    bg: "bg-red-500",
    bgLight: "bg-red-500/10",
    emoji: "🔴",
  };
}

/**
 * Quota Table Component - Table-based display for quota data
 */
export default function QuotaTable({ quotas = [] }) {
  if (!quotas || quotas.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed">
        <colgroup>
          <col className="w-[30%]" /> {/* Model Name */}
          <col className="w-[45%]" /> {/* Limit Progress */}
          <col className="w-[25%]" /> {/* Reset Time */}
        </colgroup>
        <tbody>
          {quotas.map((quota, index) => {
            const remaining =
              quota.remainingPercentage !== undefined
                ? Math.round(quota.remainingPercentage)
                : calculatePercentage(quota.used, quota.total);

            const colors = getColorClasses(remaining);
            const countdown = formatResetTime(quota.resetAt);
            const resetDisplay = formatResetTimeDisplay(quota.resetAt);

            return (
              <tr
                key={index}
                className="border-b border-black/5 dark:border-white/5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
              >
                {/* Model Name with Status Emoji */}
                <td className="py-2 px-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{colors.emoji}</span>
                    <span className="text-sm font-medium text-text-primary">{quota.name}</span>
                  </div>
                </td>

                {/* Limit (Progress + Numbers) */}
                <td className="py-2 px-3">
                  <div className="space-y-1.5">
                    {/* Progress bar - always show with border for visibility */}
                    <div
                      className={`h-1.5 rounded-full overflow-hidden border ${colors.bgLight} ${
                        remaining === 0
                          ? "border-black/10 dark:border-white/10"
                          : "border-transparent"
                      }`}
                    >
                      <div
                        className={`h-full transition-all duration-300 ${colors.bg}`}
                        style={{ width: `${Math.min(remaining, 100)}%` }}
                      />
                    </div>

                    {/* Numbers */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-text-muted">
                        {quota.used.toLocaleString()} /{" "}
                        {quota.total > 0 ? quota.total.toLocaleString() : "∞"}
                      </span>
                      <span className={`font-medium ${colors.text}`}>{remaining}%</span>
                    </div>
                  </div>
                </td>

                {/* Reset Time */}
                <td className="py-2 px-3">
                  {countdown !== "-" || resetDisplay ? (
                    <div className="space-y-0.5">
                      {countdown !== "-" && (
                        <div className="text-sm text-text-primary font-medium">in {countdown}</div>
                      )}
                      {resetDisplay && (
                        <div className="text-xs text-text-muted">{resetDisplay}</div>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm text-text-muted italic">N/A</div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
