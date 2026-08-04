"use client";

import type { ChaosPageMessage } from "../chaosPageTypes";

/**
 * Success/error status banner for the Chaos Mode config page. Extracted out
 * of ChaosConfigPageClient.tsx to keep the page component under the
 * complexity/size ratchet (config/quality/complexity-baseline.json).
 */
export function ChaosStatusMessage({ message }: { message: ChaosPageMessage }) {
  if (!message) return null;
  return (
    <div
      className={`p-3 rounded-lg text-sm font-medium ${
        message.type === "success"
          ? "bg-green-500/10 text-green-700 dark:text-green-300 border border-green-500/20"
          : "bg-red-500/10 text-red-700 dark:text-red-300 border border-red-500/20"
      }`}
    >
      {message.text}
    </div>
  );
}
