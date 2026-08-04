"use client";

import { Modal, Button } from "@/shared/components";
import { useTranslations } from "next-intl";

type ExternalLinkModalProps = {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  error: string | null;
  url: string;
  copied: string | false;
  onCopy: (text: string, key: string) => void;
};

export default function ExternalLinkModal({
  isOpen,
  onClose,
  loading,
  error,
  url,
  copied,
  onCopy,
}: ExternalLinkModalProps) {
  const t = useTranslations("providers");
  const tc = useTranslations("common");
  const text = (key: string, fallback: string) =>
    typeof t.has === "function" && t.has(key as never) ? t(key as never) : fallback;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={text("codexExternalLinkModalTitle", "External Codex link")}
    >
      <div className="space-y-4">
        <p className="text-sm text-text-muted">
          {text(
            "codexExternalLinkModalDescription",
            "Share this single-use link with the person who will authenticate the Codex account. They open it in their own browser, complete the OpenAI login, and the connection is registered here. The link expires in 15 minutes."
          )}
        </p>
        {loading ? (
          <p className="text-sm text-text-muted">
            {text("codexExternalLinkGenerating", "Generating link...")}
          </p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : url ? (
          <>
            <div className="rounded-lg border border-border bg-bg-base p-3 break-all text-sm text-text-main">
              {url}
            </div>
            <div className="flex gap-2">
              <Button
                className="flex-1"
                icon="open_in_new"
                onClick={() => window.open(url, "_blank", "noopener")}
              >
                {tc("open")}
              </Button>
              <Button
                variant="secondary"
                icon="content_copy"
                onClick={() => onCopy(url, "extlink")}
              >
                {copied === "extlink" ? tc("copied") : tc("copy")}
              </Button>
            </div>
            <p className="flex items-center gap-2 text-xs text-text-muted">
              <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>
              {text(
                "codexExternalLinkWaiting",
                "Waiting for browser authentication. This window refreshes automatically."
              )}
            </p>
          </>
        ) : null}
      </div>
    </Modal>
  );
}
