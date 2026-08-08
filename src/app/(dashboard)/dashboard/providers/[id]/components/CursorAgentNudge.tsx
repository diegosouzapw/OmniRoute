"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";

const DISMISS_STORAGE_KEY = "omniroute.cursorAgentNudgeDismissed";
// Same-tab signal for the dismiss button, since writing localStorage doesn't
// fire a "storage" event in the tab that wrote it.
const DISMISS_EVENT = "omniroute:cursor-agent-nudge-dismissed";

function isNotDismissed(): boolean {
  try {
    return !localStorage.getItem(DISMISS_STORAGE_KEY);
  } catch {
    return true;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(DISMISS_EVENT, callback);
  return () => window.removeEventListener(DISMISS_EVENT, callback);
}

// SSR has no localStorage, so the server always renders the banner visible;
// useSyncExternalStore reconciles that against the real client-side value
// right after hydration, with no hydration mismatch and no setState-in-effect.
function getServerSnapshot() {
  return true;
}

/**
 * Dismissible dashboard banner suggesting `cursor-agent` installation when
 * it's not detected on the host — without it, Cursor connections need
 * periodic manual reconnection roughly every 24 hours instead of automatic
 * background renewal. Fetches the credential-free, LOCAL_ONLY
 * `/api/providers/cursor/agent-availability` endpoint — NOT
 * `/api/oauth/cursor/auto-import`, which returns a live token/machineId and
 * has no legitimate use here. One global dismissible notice (persisted under
 * a single fixed key) since this is a host-level, not per-connection, fact.
 */
export default function CursorAgentNudge() {
  const t = useTranslations("providers");
  const visible = useSyncExternalStore(subscribe, isNotDismissed, getServerSnapshot);
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/providers/cursor/agent-availability")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data && typeof data.cursorAgentAvailable === "boolean") {
          setAvailable(data.cursorAgentAvailable);
        }
      })
      .catch(() => {
        // Unreachable (e.g. a non-loopback dashboard session gets 403
        // LOCAL_ONLY here) — stay in the "unknown" state rather than nagging
        // a session that simply can't reach the check.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!visible || available !== false) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_STORAGE_KEY, "true");
    } catch {
      // ignore — worst case the banner reappears next visit
    }
    window.dispatchEvent(new Event(DISMISS_EVENT));
  };

  return (
    <div
      role="complementary"
      aria-label={t("cursorAgentNudgeTitle") || "Enable automatic Cursor session renewal"}
      className="flex items-start gap-3 rounded-xl border border-blue-500/30 bg-blue-500/5 px-4 py-3"
    >
      <span className="material-symbols-outlined text-blue-500 shrink-0 mt-0.5">info</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">
          {t("cursorAgentNudgeTitle") || "Enable automatic Cursor session renewal"}
        </p>
        <p className="text-xs text-blue-600/80 dark:text-blue-300/70 mt-0.5">
          {t("cursorAgentNudgeBody") ||
            "Install cursor-agent for automatic session renewal — without it, Cursor connections need periodic manual reconnection roughly every 24 hours."}
        </p>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label={t("cursorAgentNudgeDismiss") || "Dismiss"}
        className="shrink-0 text-blue-500 hover:text-blue-400 transition-colors"
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>
  );
}
