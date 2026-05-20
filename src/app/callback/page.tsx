"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

/**
 * OAuth Callback Page
 *
 * Reads URL params via window.location.search (not useSearchParams) to avoid
 * the Next.js Suspense boundary requirement, which can delay hydration in popup
 * windows that navigate back from a cross-origin OAuth page (e.g. Google).
 * Sends the callback data back via three methods in order of reliability:
 *   1. postMessage to window.opener (may be null after COOP cross-origin nav)
 *   2. BroadcastChannel (same-origin, works across browsing context groups)
 *   3. localStorage storage event (works across browsing context groups)
 */
export default function CallbackPage() {
  const [status, setStatus] = useState<"processing" | "success" | "done" | "manual">("processing");
  const [currentUrl, setCurrentUrl] = useState("");
  const t = useTranslations("auth");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");
    const error = params.get("error");
    const errorDescription = params.get("error_description");

    const callbackData = {
      code,
      state,
      error,
      errorDescription,
      fullUrl: window.location.href,
    };

    let sent = false;

    // Method 1: postMessage to opener (popup mode).
    // May be null when Google OAuth's COOP header severs the opener reference.
    if (window.opener) {
      try {
        // Target this origin specifically — popup mode is only used when isTrueLocalhost,
        // so the opener is always on the same origin as the callback page.
        window.opener.postMessage(
          { type: "oauth_callback", data: callbackData },
          window.location.origin
        );
        sent = true;
      } catch (e) {
        console.log("postMessage failed:", e);
      }
    }

    // Method 2: BroadcastChannel — works across browsing context groups for same origin.
    try {
      const channel = new BroadcastChannel("oauth_callback");
      channel.postMessage(callbackData);
      channel.close();
      sent = true;
    } catch (e) {
      console.log("BroadcastChannel failed:", e);
    }

    // Method 3: localStorage — triggers storage event in all same-origin windows,
    // regardless of browsing context group isolation from COOP.
    try {
      localStorage.setItem(
        "oauth_callback",
        JSON.stringify({ ...callbackData, timestamp: Date.now() })
      );
      sent = true;
    } catch (e) {
      console.log("localStorage failed:", e);
    }

    if (sent && (code || error)) {
      if (window.opener) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- initialization effect, window-only
        setStatus("success");
        setTimeout(() => {
          window.close();
          // If close is prevented (browser policy), fall through to manual close prompt.
          setTimeout(() => setStatus("done"), 500);
        }, 1500);
      } else {
        // Opened as new tab or opener severed by COOP — show close prompt.
        setStatus("done");
      }
    } else {
      // No code/error in URL or all send methods failed — show URL for manual copy.
      // Batch the URL and status update so they render together (React 18 auto-batching).
      setCurrentUrl(window.location.href);
      setStatus("manual");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="text-center p-8 max-w-md">
        {status === "processing" && (
          <>
            <div className="size-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-primary animate-spin">
                progress_activity
              </span>
            </div>
            <h1 className="text-xl font-semibold mb-2">{t("processing")}</h1>
            <p className="text-text-muted">{t("pleaseWait")}</p>
          </>
        )}

        {(status === "success" || status === "done") && (
          <>
            <div className="size-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-green-600">
                check_circle
              </span>
            </div>
            <h1 className="text-xl font-semibold mb-2">{t("authSuccess")}</h1>
            <p className="text-text-muted">
              {status === "success" ? t("windowWillClose") : t("closeTabNow")}
            </p>
          </>
        )}

        {status === "manual" && (
          <>
            <div className="size-16 mx-auto mb-4 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-yellow-600">info</span>
            </div>
            <h1 className="text-xl font-semibold mb-2">{t("copyUrl")}</h1>
            <p className="text-text-muted mb-4">{t("copyUrlManual")}</p>
            <div className="bg-surface border border-border rounded-lg p-3 text-left">
              <code className="text-xs break-all">{currentUrl}</code>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
