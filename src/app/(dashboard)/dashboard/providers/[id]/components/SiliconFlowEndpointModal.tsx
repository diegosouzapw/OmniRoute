"use client";

// Phase 1d extraction — Issue #3501
// SiliconFlowEndpointModal moved out of ProviderDetailPageClient.tsx.

import { useTranslations } from "next-intl";
import { Modal } from "@/shared/components";
import { providerText, SILICONFLOW_ENDPOINTS } from "../providerPageHelpers";

interface SiliconFlowEndpointModalProps {
  isOpen: boolean;
  onSelect: (baseUrl: string) => void;
  onClose: () => void;
}

export default function SiliconFlowEndpointModal({
  isOpen,
  onSelect,
  onClose,
}: SiliconFlowEndpointModalProps) {
  const t = useTranslations("providers");

  return (
    <Modal
      isOpen={isOpen}
      title={providerText(t, "connectSiliconFlow", "Connect SiliconFlow")}
      onClose={onClose}
      size="lg"
    >
      <div className="space-y-3">
        <p className="text-sm text-text-muted mb-4">
          {providerText(t, "chooseSiliconFlowEndpoint", "Choose your SiliconFlow endpoint:")}
        </p>
        {SILICONFLOW_ENDPOINTS.map((endpoint) => (
          <button
            key={endpoint.id}
            type="button"
            onClick={() => onSelect(endpoint.baseUrl)}
            className="w-full p-4 text-left border border-border rounded-lg hover:bg-sidebar transition-colors"
          >
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary mt-0.5">public</span>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">
                  {providerText(
                    t,
                    endpoint.id === "siliconflow" ? "endpointGlobal" : "endpointChina",
                    endpoint.label
                  )}
                </h3>
                <p className="text-sm text-text-muted font-mono">{endpoint.baseUrl}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </Modal>
  );
}
