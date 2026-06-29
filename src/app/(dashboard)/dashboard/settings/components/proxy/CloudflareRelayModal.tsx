"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";

interface CloudflareRelayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeployed: (poolProxyId: string, relayUrl: string) => void;
}

// Mirrors VercelRelayModal — shares the same x-relay-target/x-relay-auth
// header scheme on the wire, only the deployment surface differs.
export default function CloudflareRelayModal({
  isOpen,
  onClose,
  onDeployed,
}: CloudflareRelayModalProps) {
  const t = useTranslations("settings");
  const [accountId, setAccountId] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [projectName, setProjectName] = useState(
    process.env.NEXT_PUBLIC_CLOUDFLARE_RELAY_DEFAULT_PROJECT || "omniroute-relay"
  );
  const [deploying, setDeploying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeploy = async () => {
    if (!accountId.trim() || !apiToken.trim()) {
      setError(t("cloudflareRelayCredsRequired"));
      return;
    }
    setDeploying(true);
    setError(null);
    try {
      const res = await fetch("/api/settings/proxy/cloudflare-deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountId: accountId.trim(),
          apiToken: apiToken.trim(),
          projectName: projectName.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error?.message || t("cloudflareRelayDeployFailed"));
      } else {
        setApiToken("");
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
      aria-labelledby="cloudflare-relay-title"
    >
      <div className="bg-surface rounded-lg shadow-xl p-6 w-full max-w-md space-y-4">
        <div className="flex items-center justify-between">
          <h2
            id="cloudflare-relay-title"
            className="text-lg font-bold flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-primary" aria-hidden="true">
              cloud
            </span>
            {t("cloudflareRelayModalTitle")}
          </h2>
          <button
            onClick={onClose}
            aria-label={t("close")}
            className="text-text-muted hover:text-text"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              close
            </span>
          </button>
        </div>

        <div className="bg-orange-500/10 border border-orange-500/30 rounded p-3 text-xs text-orange-300 space-y-1">
          <p>{t("cloudflareRelayWarning")}</p>
          <p className="text-text-muted">{t("cloudflareRelayTokenHowto")}</p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium mb-1 block" htmlFor="cloudflare-account-id">
              {t("cloudflareRelayAccountIdLabel")}
            </label>
            <input
              id="cloudflare-account-id"
              type="text"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              className="w-full text-sm bg-surface-alt border border-border rounded px-3 py-2 focus:outline-none focus:border-primary"
              placeholder="your-cloudflare-account-id"
              autoComplete="off"
            />
            <p className="text-xs text-text-muted mt-1">
              {t("cloudflareRelayAccountIdHint")}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block" htmlFor="cloudflare-api-token">
              {t("cloudflareRelayApiTokenLabel")}
            </label>
            <input
              id="cloudflare-api-token"
              type="password"
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
              className="w-full text-sm bg-surface-alt border border-border rounded px-3 py-2 focus:outline-none focus:border-primary"
              placeholder="cloudflare-api-token"
              autoComplete="off"
            />
            <p className="text-xs text-text-muted mt-1">
              {t("cloudflareRelayApiTokenHint")}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block" htmlFor="cloudflare-project-name">
              {t("cloudflareRelayProjectNameLabel")}
            </label>
            <input
              id="cloudflare-project-name"
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

        <p className="text-xs text-text-muted">{t("cloudflareRelayFreeTierNote")}</p>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} disabled={deploying}>
            {t("cancel")}
          </Button>
          <Button variant="primary" size="sm" onClick={handleDeploy} disabled={deploying}>
            {deploying ? t("cloudflareRelayDeploying") : t("cloudflareRelayDeploy")}
          </Button>
        </div>
      </div>
    </div>
  );
}
