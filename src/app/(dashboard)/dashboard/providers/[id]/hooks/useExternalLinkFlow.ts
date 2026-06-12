import { useState, useEffect, useCallback } from "react";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";

type UseExternalLinkFlowParams = {
  providerId: string;
  notify: { success: (msg: string) => void; error: (msg: string) => void };
  fetchConnections: () => Promise<void> | void;
};

export function useExternalLinkFlow({
  providerId,
  notify,
  fetchConnections,
}: UseExternalLinkFlowParams) {
  const [externalLinkModalOpen, setExternalLinkModalOpen] = useState(false);
  const [externalLinkUrl, setExternalLinkUrl] = useState("");
  const [externalLinkToken, setExternalLinkToken] = useState<string | null>(null);
  const [externalLinkLoading, setExternalLinkLoading] = useState(false);
  const [externalLinkError, setExternalLinkError] = useState<string | null>(null);
  const { copied: externalLinkCopied, copy: externalLinkCopy } = useCopyToClipboard();

  // "Adicionar Externo": generate a single-use public link so a third party can
  // complete the Codex device flow in their own browser.
  const openExternalLinkFlow = useCallback(async () => {
    setExternalLinkModalOpen(true);
    setExternalLinkUrl("");
    setExternalLinkToken(null);
    setExternalLinkError(null);
    setExternalLinkLoading(true);
    try {
      const res = await fetch(`/api/oauth/${providerId}/public-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.url) {
        setExternalLinkUrl(data.url);
        setExternalLinkToken(data.token || null);
      } else {
        setExternalLinkError(data?.error || "Falha ao gerar o link.");
      }
    } catch {
      setExternalLinkError("Não foi possível contatar o servidor.");
    } finally {
      setExternalLinkLoading(false);
    }
  }, [providerId]);

  // While the share popup is open, poll the ticket status so the dashboard can
  // notify + refresh the connections the moment the external visitor finishes.
  useEffect(() => {
    if (!externalLinkModalOpen || !externalLinkToken) return;
    let active = true;
    const interval = setInterval(async () => {
      if (!active) return;
      try {
        const res = await fetch(
          `/api/oauth/${providerId}/public-link-status?token=${encodeURIComponent(externalLinkToken)}`
        );
        const data = await res.json().catch(() => ({}));
        if (!active) return;
        if (data?.status === "completed") {
          active = false;
          clearInterval(interval);
          notify.success("Conta Codex conectada pelo link externo.");
          fetchConnections();
          setExternalLinkModalOpen(false);
          setExternalLinkToken(null);
        } else if (data?.status === "expired") {
          active = false;
          clearInterval(interval);
          setExternalLinkError("O link expirou sem ser concluído.");
        }
      } catch {
        /* transient network error — keep polling */
      }
    }, 3000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [externalLinkModalOpen, externalLinkToken, providerId, notify, fetchConnections]);

  return {
    externalLinkModalOpen,
    setExternalLinkModalOpen,
    externalLinkUrl,
    externalLinkToken,
    externalLinkLoading,
    externalLinkError,
    externalLinkCopied,
    externalLinkCopy,
    openExternalLinkFlow,
  };
}
