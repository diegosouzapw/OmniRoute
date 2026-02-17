"use client";

/**
 * Shared status badge for CLI tool cards.
 * Shows the effective config/installation status using batch data,
 * so badges are visible even when cards are collapsed.
 */
export default function CliStatusBadge({ effectiveConfigStatus, batchStatus }) {
  // Determine badge from effectiveConfigStatus or batchStatus
  const status = effectiveConfigStatus || batchStatus?.configStatus || null;

  if (!status) return null;

  const badges = {
    configured: {
      dotClass: "bg-green-500",
      badgeClass: "bg-green-500/10 text-green-600 dark:text-green-400",
      text: "Configured",
    },
    not_configured: {
      dotClass: "bg-yellow-500",
      badgeClass: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
      text: "Not configured",
    },
    not_installed: {
      dotClass: "bg-zinc-400 dark:bg-zinc-500",
      badgeClass: "bg-zinc-500/10 text-zinc-500 dark:text-zinc-400",
      text: "Not installed",
    },
    other: {
      dotClass: "bg-blue-500",
      badgeClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      text: "Custom",
    },
    unknown: {
      dotClass: "bg-zinc-400 dark:bg-zinc-500",
      badgeClass: "bg-zinc-500/10 text-zinc-500 dark:text-zinc-400",
      text: "Unknown",
    },
  };

  const badge = badges[status] || badges.unknown;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium rounded-full ${badge.badgeClass}`}
    >
      <span className={`size-1.5 rounded-full ${badge.dotClass}`} />
      {badge.text}
    </span>
  );
}
