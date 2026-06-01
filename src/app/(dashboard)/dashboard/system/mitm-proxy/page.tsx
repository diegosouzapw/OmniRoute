"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

/**
 * MITM Proxy page — moved to AgentBridge (plan 11 §12).
 * Shows a "page moved" banner for 2.5 s then redirects.
 */
export default function MitmProxyMovedPage() {
  const router = useRouter();
  const t = useTranslations("agentBridge.pageMoved");

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/dashboard/tools/agent-bridge");
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <div className="rounded-xl border border-amber-500/40 bg-amber-900/20 p-8 text-center max-w-md w-full space-y-4">
        <div className="flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-amber-400 text-[28px]">info</span>
          <h1 className="text-lg font-semibold text-amber-200">{t("title")}</h1>
        </div>
        <p className="text-sm text-amber-300/80">{t("message")}</p>
        <button
          type="button"
          onClick={() => router.replace("/dashboard/tools/agent-bridge")}
          className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/20 text-amber-200 px-4 py-2 text-sm font-medium hover:bg-amber-500/30 transition-colors"
        >
          {t("goNow")}
        </button>
      </div>
    </div>
  );
}
