"use client";

/**
 * Session Info Card — P-3
 *
 * Displays current session details and provides session management
 * controls (logout, clear sessions) within the Security settings tab.
 */

import { useState, useEffect } from "react";
import { Card, Button } from "@/shared/components";
import { useTranslations } from "next-intl";

interface SessionInfo {
  authenticated: boolean;
  loginTime: string | null;
  sessionAge: string;
  ipAddress: string;
  userAgent: string;
}

export default function SessionInfoCard() {
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("settings");

  useEffect(() => {
    let cancelled = false;

    async function loadSession() {
      // Build session info from client-side data
      const loginTime = sessionStorage.getItem("omniroute_login_time");
      const now = Date.now();

      let sessionAge = t("unknown");
      if (loginTime) {
        const elapsed = now - parseInt(loginTime, 10);
        const hours = Math.floor(elapsed / 3600000);
        const minutes = Math.floor((elapsed % 3600000) / 60000);
        sessionAge = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
      }

      let authenticated = false;
      try {
        const res = await fetch("/api/auth/status", {
          method: "GET",
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          authenticated = data.authenticated === true;
        }
      } catch {
        // Keep unauthenticated fallback on network errors.
      }

      if (cancelled) return;

      setSession({
        authenticated,
        loginTime: loginTime ? new Date(parseInt(loginTime, 10)).toLocaleString() : null,
        sessionAge,
        ipAddress: "—", // Server-side only
        userAgent: navigator.userAgent.split(" ").slice(-2).join(" ") || t("unknown"),
      });
      setLoading(false);
    }

    loadSession();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      sessionStorage.removeItem("omniroute_login_time");
      window.location.href = "/";
    } catch {
      window.location.href = "/";
    }
  };

  const handleClearStorage = () => {
    if (confirm(t("clearLocalDataConfirm"))) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <Card>
        <div className="animate-pulse h-32 bg-black/5 dark:bg-white/5 rounded-lg" />
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            person
          </span>
        </div>
        <h3 className="text-lg font-semibold">{t("session")}</h3>
      </div>

      <div className="flex flex-col gap-3" role="list" aria-label={t("sessionDetailsAria")}>
        <div className="flex justify-between items-center text-sm" role="listitem">
          <span className="text-text-muted">{t("status")}</span>
          <span className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${session?.authenticated ? "bg-green-500" : "bg-yellow-500"}`}
              aria-hidden="true"
            />
            {session?.authenticated ? t("authenticated") : t("guest")}
          </span>
        </div>

        {session?.loginTime && (
          <div className="flex justify-between items-center text-sm" role="listitem">
            <span className="text-text-muted">{t("loginTime")}</span>
            <span className="font-mono text-xs">{session.loginTime}</span>
          </div>
        )}

        <div className="flex justify-between items-center text-sm" role="listitem">
          <span className="text-text-muted">{t("sessionAge")}</span>
          <span className="font-mono text-xs">{session?.sessionAge}</span>
        </div>

        <div className="flex justify-between items-center text-sm" role="listitem">
          <span className="text-text-muted">{t("browser")}</span>
          <span className="font-mono text-xs truncate max-w-[200px]">{session?.userAgent}</span>
        </div>
      </div>

      <div className="flex gap-3 mt-4 pt-4 border-t border-border/50">
        <Button variant="secondary" onClick={handleClearStorage}>
          {t("clearLocalData")}
        </Button>
        {session?.authenticated && (
          <Button variant="danger" onClick={handleLogout}>
            {t("logout")}
          </Button>
        )}
      </div>
    </Card>
  );
}
