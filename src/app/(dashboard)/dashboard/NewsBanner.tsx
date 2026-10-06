"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";

import {
  NEWS_DISMISS_EVENT,
  NEWS_DISMISS_STORAGE_NAME,
  fetchNewsPayload,
  parseDismissedNewsIds,
  selectActiveNews,
  serializeDismissedNewsIds,
} from "@/shared/utils/releaseNotes";

function subscribeToDismissals(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(NEWS_DISMISS_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(NEWS_DISMISS_EVENT, callback);
  };
}

function readDismissedIds(): string {
  try {
    return localStorage.getItem(NEWS_DISMISS_STORAGE_NAME) ?? "";
  } catch {
    return "";
  }
}

function getServerDismissedIds(): string {
  return "";
}

/**
 * Generic, fail-silent reader for the public announcement feed. Fetching the
 * static JSON is GET-only and does not send product state or telemetry.
 */
export default function NewsBanner() {
  const locale = useLocale();
  const t = useTranslations("common");
  const [payload, setPayload] = useState<unknown>(null);
  const dismissedSnapshot = useSyncExternalStore(
    subscribeToDismissals,
    readDismissedIds,
    getServerDismissedIds
  );
  const dismissedIds = parseDismissedNewsIds(dismissedSnapshot);
  const announcement = selectActiveNews(payload, locale, dismissedIds);

  useEffect(() => {
    const controller = new AbortController();

    void fetchNewsPayload(fetch, controller.signal).then((value) => {
      if (value !== null) setPayload(value);
    });

    return () => controller.abort();
  }, []);

  if (!announcement) return null;

  const dismiss = () => {
    dismissedIds.add(announcement.id);
    try {
      localStorage.setItem(NEWS_DISMISS_STORAGE_NAME, serializeDismissedNewsIds(dismissedIds));
    } catch {
      // Storage is optional; the next announcement fetch remains functional.
    }
    window.dispatchEvent(new Event(NEWS_DISMISS_EVENT));
  };

  return (
    <div
      role="complementary"
      aria-label={announcement.title}
      className="mb-4 flex flex-col gap-3 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <span className="material-symbols-outlined text-[22px] text-primary" aria-hidden="true">
            {announcement.icon}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-text-main">{announcement.title}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-text-muted">{announcement.message}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 self-end sm:self-auto">
        {announcement.link && (
          <a
            href={announcement.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:brightness-110"
          >
            {announcement.linkLabel ?? announcement.title}
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
              open_in_new
            </span>
          </a>
        )}
        <button
          type="button"
          onClick={dismiss}
          aria-label={t("dismissNotification")}
          className="text-text-muted transition-colors hover:text-text-main"
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            close
          </span>
        </button>
      </div>
    </div>
  );
}
