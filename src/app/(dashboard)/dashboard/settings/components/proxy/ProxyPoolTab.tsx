"use client";
import { useState } from "react";
import { Button } from "@/shared/components";
import { useTranslations } from "next-intl";
import ProxyRegistryManager from "../ProxyRegistryManager";
import VercelRelayModal from "./VercelRelayModal";

export default function ProxyPoolTab() {
  const t = useTranslations("settings");
  const [relayModalOpen, setRelayModalOpen] = useState(false);

  const showVercelRelay = process.env.NEXT_PUBLIC_VERCEL_RELAY_ENABLED !== "false";

  const handleDeployed = (_poolProxyId: string, relayUrl: string) => {
    alert(`${t("vercelRelaySuccess")}: ${relayUrl}`);
  };

  return (
    <div className="space-y-4">
      {showVercelRelay && (
        <div className="flex justify-end">
          <Button
            size="sm"
            variant="secondary"
            icon="cloud_upload"
            onClick={() => setRelayModalOpen(true)}
          >
            {t("vercelRelayButton")}
          </Button>
        </div>
      )}
      <ProxyRegistryManager />
      <VercelRelayModal
        isOpen={relayModalOpen}
        onClose={() => setRelayModalOpen(false)}
        onDeployed={handleDeployed}
      />
    </div>
  );
}
