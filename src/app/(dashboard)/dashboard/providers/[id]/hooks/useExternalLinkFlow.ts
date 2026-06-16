import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";
import { providerText } from "../providerPageHelpers";

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
  const t = useTranslations("providers") as any;
  const [externalLinkModalOpen, setExternalLinkModalOpen] = useState(false);
  const [externalLinkUrl, setExternalLinkUrl] = useState("");
  const [externalLinkToken, setExternalLinkToken] = useState<string | null>(null);
  const [externalLinkLoading, setExternalLinkLoading] = useState(false);
  const [externalLinkError, setExternalLinkError] = useState<string | null>(null);
  const { copied: externalLinkCopied, copy: externalLinkCopy } = useCopyToClipboard();

  // External Codex link: generate a single-use public link so a third party can
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
        setExternalLinkError(
          data?.error ||
            providerText(t, "codexExternalLinkCreateFailed", "Failed to generate the link.")
        );
      }
    } catch {
      setExternalLinkError(
        providerText(t, "codexExternalLinkNetworkError", "Could not contact the server.")
      );
    } finally {
      setExternalLinkLoading(false);
    }
  }, [providerId, t]);

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
          notify.success(
            providerText(
              t,
              "codexExternalLinkConnected",
              "Codex account connected through the external link."
            )
          );
          fetchConnections();
          setExternalLinkModalOpen(false);
          setExternalLinkToken(null);
        } else if (data?.status === "expired") {
          active = false;
          clearInterval(interval);
          setExternalLinkError(
            providerText(t, "codexExternalLinkExpired", "The link expired before completion.")
          );
        }
      } catch {
        /* transient network error — keep polling */
      }
    }, 3000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [externalLinkModalOpen, externalLinkToken, providerId, notify, fetchConnections, t]);

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
