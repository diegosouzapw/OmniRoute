"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import ProxyRegistryManager from "../ProxyRegistryManager";
import VercelRelayModal from "./VercelRelayModal";
import DenoRelayModal from "./DenoRelayModal";
import CloudflareRelayModal from "./CloudflareRelayModal";
import type { ProxyItem } from "../proxyRegistryTypes";

export default function ProxyPoolTab() {
  const t = useTranslations("settings");
  const [vercelModalOpen, setVercelModalOpen] = useState(false);
  const [denoModalOpen, setDenoModalOpen] = useState(false);
  const [cloudflareModalOpen, setCloudflareModalOpen] = useState(false);

  const showVercelRelay = process.env.NEXT_PUBLIC_VERCEL_RELAY_ENABLED !== "false";
  const showDenoRelay = process.env.NEXT_PUBLIC_DENO_RELAY_ENABLED !== "false";
  const showCloudflareRelay = process.env.NEXT_PUBLIC_CLOUDFLARE_RELAY_ENABLED !== "false";

  const handleVercelDeployed = (_poolProxyId: string, relayUrl: string) => {
    alert(`${t("vercelRelaySuccess")}: ${relayUrl}`);
  };

  const handleCloudflareDeployed = (_poolProxyId: string, relayUrl: string) => {
    alert(`${t("cloudflareRelaySuccess")}: ${relayUrl}`);
  };
  const handleRedeployRelay = (proxy: ProxyItem) => {
    if (proxy.type === "vercel") setVercelModalOpen(true);
    else if (proxy.type === "deno") setDenoModalOpen(true);
    else if (proxy.type === "cloudflare") setCloudflareModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <ProxyRegistryManager
        onRedeployRelay={handleRedeployRelay}
        showVercelRelay={showVercelRelay}
        showDenoRelay={showDenoRelay}
        showCloudflareRelay={showCloudflareRelay}
        onOpenVercelRelay={() => setVercelModalOpen(true)}
        onOpenDenoRelay={() => setDenoModalOpen(true)}
        onOpenCloudflareRelay={() => setCloudflareModalOpen(true)}
      />
      <VercelRelayModal
        isOpen={vercelModalOpen}
        onClose={() => setVercelModalOpen(false)}
        onDeployed={handleVercelDeployed}
      />
      <DenoRelayModal
        isOpen={denoModalOpen}
        onClose={() => setDenoModalOpen(false)}
        onDeployed={handleVercelDeployed}
      />
      <CloudflareRelayModal
        isOpen={cloudflareModalOpen}
        onClose={() => setCloudflareModalOpen(false)}
        onDeployed={handleCloudflareDeployed}
      />
    </div>
  );
}
