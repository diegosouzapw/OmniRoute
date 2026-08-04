"use client";

import { Modal } from "@/shared/components";
import type { ProviderMessageTranslator } from "../providerPageHelpers";

type KimiCodeAuthMethodModalProps = {
  isOpen: boolean;
  onSelectOAuth: () => void;
  onSelectApiKey: () => void;
  onClose: () => void;
  t: ProviderMessageTranslator;
};

export default function KimiCodeAuthMethodModal({
  isOpen,
  onSelectOAuth,
  onSelectApiKey,
  onClose,
  t,
}: KimiCodeAuthMethodModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      title={`${t("addConnection")} · Kimi Code CLI`}
      onClose={onClose}
      size="md"
    >
      <div className="space-y-3">
        <p className="mb-4 text-sm text-text-muted">{t("authMethod")}</p>

        <button
          type="button"
          onClick={onSelectOAuth}
          className="w-full rounded-lg border border-border p-4 text-left transition-colors hover:bg-sidebar"
        >
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined mt-0.5 text-primary">passkey</span>
            <div className="min-w-0 flex-1">
              <h3 className="mb-1 font-semibold">{t("oauthLabel")}</h3>
              <p className="text-sm text-text-muted">{t("oauth2Desc")}</p>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={onSelectApiKey}
          className="w-full rounded-lg border border-border p-4 text-left transition-colors hover:bg-sidebar"
        >
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined mt-0.5 text-primary">key</span>
            <div className="min-w-0 flex-1">
              <h3 className="mb-1 font-semibold">Kimi Code API Key</h3>
              <p className="text-sm text-text-muted">{t("apiKeySecure")}</p>
            </div>
          </div>
        </button>
      </div>
    </Modal>
  );
}
