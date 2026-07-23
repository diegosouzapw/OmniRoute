"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";

interface VercelRelayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeployed: (poolProxyId: string, relayUrl: string) => void;
}

export default function VercelRelayModal({ isOpen, onClose, onDeployed }: VercelRelayModalProps) {
  const t = useTranslations("settings");
  const [token, setToken] = useState("");
  const [projectName, setProjectName] = useState(
    process.env.NEXT_PUBLIC_VERCEL_RELAY_DEFAULT_PROJECT || "omniroute-relay"
  );
  const [deploying, setDeploying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeploy = async () => {
    if (!token.trim()) {
      setError(t("vercelRelayTokenRequired"));
      return;
    }
    setDeploying(true);
    setError(null);
    try {
      const res = await fetch("/api/settings/proxy/vercel-deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token.trim(), projectName: projectName.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error?.message || t("vercelRelayDeployFailed"));
      } else {
        setToken("");
        onDeployed(data.poolProxyId as string, data.relayUrl as string);
        onClose();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t("unknownError"));
    } finally {
      setDeploying(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vercel-relay-title"
    >
      <div className="bg-surface rounded-lg shadow-xl p-6 w-full max-w-md space-y-4">
        <div className="flex items-center justify-between">
          <h2 id="vercel-relay-title" className="text-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" aria-hidden="true">
              cloud_upload
            </span>
            {t("vercelRelayModalTitle")}
          </h2>
          <button onClick={onClose} aria-label={t("close")} className="text-text-muted hover:text-text">
            <span className="material-symbols-outlined" aria-hidden="true">
              close
            </span>
          </button>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3 text-xs text-yellow-300">
          {t("vercelRelayWarning")}
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium mb-1 block" htmlFor="vercel-token">
              {t("vercelRelayTokenLabel")}
            </label>
            <input
              id="vercel-token"
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full text-sm bg-surface-alt border border-border rounded px-3 py-2 focus:outline-none focus:border-primary"
              placeholder="vercel_pat_..."
              autoComplete="off"
            />
            <p className="text-xs text-text-muted mt-1">
              {t("vercelRelayTokenHint")}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block" htmlFor="vercel-project-name">
              {t("vercelRelayProjectNameLabel")}
            </label>
            <input
              id="vercel-project-name"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full text-sm bg-surface-alt border border-border rounded px-3 py-2 focus:outline-none focus:border-primary"
              placeholder="omniroute-relay"
            />
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded p-2">
            {error}
          </div>
        )}

        <p className="text-xs text-text-muted">{t("vercelRelayFreeTierNote")}</p>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} disabled={deploying}>
            {t("cancel")}
          </Button>
          <Button variant="primary" size="sm" onClick={handleDeploy} disabled={deploying}>
            {deploying ? t("vercelRelayDeploying") : t("vercelRelayDeploy")}
          </Button>
        </div>
      </div>
    </div>
  );
}
