"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";

interface DenoRelayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeployed: (poolProxyId: string, relayUrl: string) => void;
}

export default function DenoRelayModal({ isOpen, onClose, onDeployed }: DenoRelayModalProps) {
  const t = useTranslations("settings");
  const [denoToken, setDenoToken] = useState("");
  const [orgDomain, setOrgDomain] = useState("");
  const [projectName, setProjectName] = useState(
    process.env.NEXT_PUBLIC_DENO_RELAY_DEFAULT_PROJECT || "omniroute-deno-relay"
  );
  const [deploying, setDeploying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeploy = async () => {
    if (!denoToken.trim()) {
      setError(t("denoRelayTokenRequired"));
      return;
    }
    if (!orgDomain.trim()) {
      setError(t("denoRelayOrgDomainRequired"));
      return;
    }
    setDeploying(true);
    setError(null);
    try {
      const res = await fetch("/api/settings/proxy/deno-deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          denoToken: denoToken.trim(),
          orgDomain: orgDomain.trim(),
          projectName: projectName.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error?.message || t("denoRelayDeployFailed"));
      } else {
        setDenoToken("");
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
      aria-labelledby="deno-relay-title"
    >
      <div className="bg-surface rounded-lg shadow-xl p-6 w-full max-w-md space-y-4">
        <div className="flex items-center justify-between">
          <h2 id="deno-relay-title" className="text-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" aria-hidden="true">
              terminal
            </span>
            {t("denoRelayModalTitle")}
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

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3 text-xs text-yellow-300">
          {t("denoRelayWarning")}
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium mb-1 block" htmlFor="deno-token">
              {t("denoRelayTokenLabel")}
            </label>
            <input
              id="deno-token"
              type="password"
              value={denoToken}
              onChange={(e) => setDenoToken(e.target.value)}
              className="w-full text-sm bg-surface-alt border border-border rounded px-3 py-2 focus:outline-none focus:border-primary"
              placeholder="ddo_..."
              autoComplete="off"
            />
            <p className="text-xs text-text-muted mt-1">{t("denoRelayTokenHint")}</p>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block" htmlFor="deno-org-domain">
              {t("denoRelayOrgDomainLabel")}
            </label>
            <input
              id="deno-org-domain"
              type="text"
              value={orgDomain}
              onChange={(e) => setOrgDomain(e.target.value)}
              className="w-full text-sm bg-surface-alt border border-border rounded px-3 py-2 focus:outline-none focus:border-primary"
              placeholder="your-org.deno.net"
            />
            <p className="text-xs text-text-muted mt-1">{t("denoRelayOrgDomainHint")}</p>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block" htmlFor="deno-project-name">
              {t("denoRelayProjectNameLabel")}
            </label>
            <input
              id="deno-project-name"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full text-sm bg-surface-alt border border-border rounded px-3 py-2 focus:outline-none focus:border-primary"
              placeholder="omniroute-deno-relay"
            />
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded p-2">
            {error}
          </div>
        )}

        <p className="text-xs text-text-muted">{t("denoRelayFreeTierNote")}</p>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} disabled={deploying}>
            {t("cancel")}
          </Button>
          <Button variant="primary" size="sm" onClick={handleDeploy} disabled={deploying}>
            {deploying ? t("denoRelayDeploying") : t("denoRelayDeploy")}
          </Button>
        </div>
      </div>
    </div>
  );
}
