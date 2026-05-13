"use client";

import { useState } from "react";

/**
 * Shown when OmniRoute was started with auto-generated secrets (zero-config mode).
 * The banner is dismissable and persists only for the current session.
 */
export default function BootstrapBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  // Determine default data dir hint based on platform hint from user-agent
  const dataDir =
    typeof navigator !== "undefined" && navigator.platform?.startsWith("Win")
      ? "%APPDATA%\\omniroute\\server.env"
      : "~/.omniroute/server.env";

  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-lg border border-amber-300 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 px-4 py-3 text-sm text-amber-900 dark:text-amber-200 mb-4"
    >
      <span className="text-amber-500 dark:text-amber-400 text-base shrink-0 mt-0.5">⚠️</span>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-amber-900 dark:text-amber-300">
          Running in zero-config mode
        </p>
        <p className="mt-0.5 text-amber-800/80 dark:text-amber-200/80">
          OmniRoute auto-generated secure encryption keys on first launch. They are persisted to{" "}
          <code className="font-mono bg-amber-200/50 dark:bg-amber-500/20 px-1 rounded text-xs">
            {dataDir}
          </code>
          . No action is required — your data is encrypted and safe. To use custom keys, add{" "}
          <code className="font-mono bg-amber-200/50 dark:bg-amber-500/20 px-1 rounded text-xs">
            JWT_SECRET
          </code>{" "}
          and{" "}
          <code className="font-mono bg-amber-200/50 dark:bg-amber-500/20 px-1 rounded text-xs">
            STORAGE_ENCRYPTION_KEY
          </code>{" "}
          to that file.
        </p>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="shrink-0 text-amber-600/60 hover:text-amber-700 dark:text-amber-400/60 dark:hover:text-amber-300 transition-colors ml-1"
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  );
}
