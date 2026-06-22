"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/shared/components";
import { useTranslations } from "next-intl";
import ProxyRegistryManager from "../ProxyRegistryManager";
import VercelRelayModal from "./VercelRelayModal";
import DenoRelayModal from "./DenoRelayModal";

export default function ProxyPoolTab() {
  const t = useTranslations("settings");
  const [vercelModalOpen, setVercelModalOpen] = useState(false);
  const [denoModalOpen, setDenoModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const showVercelRelay = process.env.NEXT_PUBLIC_VERCEL_RELAY_ENABLED !== "false";
  const showDenoRelay = process.env.NEXT_PUBLIC_DENO_RELAY_ENABLED !== "false";
  const showAnyRelay = showVercelRelay || showDenoRelay;

  // Close the dropdown on outside click — mirrors the upstream PR-1437
  // grouped-button UX so adding more relay backends does not blow up the
  // toolbar horizontally.
  useEffect(() => {
    if (!menuOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [menuOpen]);

  const handleDeployed = (_poolProxyId: string, relayUrl: string) => {
    alert(`${t("vercelRelaySuccess")}: ${relayUrl}`);
  };

  return (
    <div className="space-y-4">
      {showAnyRelay && (
        <div className="flex justify-end">
          <div className="relative" ref={menuRef}>
            <Button
              size="sm"
              variant="secondary"
              icon="rocket_launch"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {t("deployRelayButton")}
            </Button>
            {menuOpen && (
              <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-md border border-border bg-surface p-1 shadow-xl">
                {showVercelRelay && (
                  <button
                    type="button"
                    onClick={() => {
                      setVercelModalOpen(true);
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm hover:bg-surface-alt"
                  >
                    <span
                      className="material-symbols-outlined text-[20px] text-primary"
                      aria-hidden="true"
                    >
                      cloud_upload
                    </span>
                    {t("vercelRelayButton")}
                  </button>
                )}
                {showDenoRelay && (
                  <button
                    type="button"
                    onClick={() => {
                      setDenoModalOpen(true);
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm hover:bg-surface-alt"
                  >
                    <span
                      className="material-symbols-outlined text-[20px] text-primary"
                      aria-hidden="true"
                    >
                      terminal
                    </span>
                    {t("denoRelayButton")}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <ProxyRegistryManager />
      <VercelRelayModal
        isOpen={vercelModalOpen}
        onClose={() => setVercelModalOpen(false)}
        onDeployed={handleDeployed}
      />
      <DenoRelayModal
        isOpen={denoModalOpen}
        onClose={() => setDenoModalOpen(false)}
        onDeployed={handleDeployed}
      />
    </div>
  );
}
