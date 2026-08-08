import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { providerText, type CommandCodeAuthFlowState } from "../providerPageHelpers";

export type UseCommandCodeAuthParams = {
  providerId: string;
  fetchConnections: () => Promise<void> | void;
  setSiliconFlowInitialBaseUrl: (url: string | undefined) => void;
  setShowAddApiKeyModal: (show: boolean) => void;
  notify: { success: (msg: string) => void; error: (msg: string) => void };
};

export function useCommandCodeAuth({
  fetchConnections,
  setSiliconFlowInitialBaseUrl,
  setShowAddApiKeyModal,
  notify,
}: UseCommandCodeAuthParams) {
  const t = useTranslations("providers");
  const [commandCodeAuthState, setCommandCodeAuthState] = useState<CommandCodeAuthFlowState>({
    phase: "idle",
    state: "",
    authUrl: "",
    callbackUrl: "",
    expiresAt: null,
    message: "",
  });

  const commandCodeAuthWindowRef = useRef<Window | null>(null);
  const commandCodeAuthTimerRef = useRef<number | null>(null);

  const clearCommandCodeAuthTimer = useCallback(() => {
    if (commandCodeAuthTimerRef.current !== null) {
      window.clearTimeout(commandCodeAuthTimerRef.current);
      commandCodeAuthTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearCommandCodeAuthTimer();
      commandCodeAuthWindowRef.current?.close?.();
    };
  }, [clearCommandCodeAuthTimer]);

  const handleCloseAddApiKeyModal = useCallback(() => {
    clearCommandCodeAuthTimer();
    setSiliconFlowInitialBaseUrl(undefined);
    commandCodeAuthWindowRef.current?.close?.();
    commandCodeAuthWindowRef.current = null;
    setCommandCodeAuthState({
      phase: "idle",
      state: "",
      authUrl: "",
      callbackUrl: "",
      expiresAt: null,
      message: "",
    });
    setShowAddApiKeyModal(false);
  }, [clearCommandCodeAuthTimer, setSiliconFlowInitialBaseUrl, setShowAddApiKeyModal]);

  const handleCommandCodeAuthApply = useCallback(
    async (state: string, connectionId?: string, name?: string, setDefault?: boolean) => {
      setCommandCodeAuthState((current) => ({
        ...current,
        phase: "applying",
        message: providerText(t, "commandCodeApplyingKey", "Applying browser-approved key…"),
      }));

      try {
        const res = await fetch("/api/providers/command-code/auth/apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ state, connectionId, name, setDefault }),
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          const errorMessage =
            data.error ||
            providerText(t, "commandCodeApplyFailed", "Failed to apply Command Code auth");
          setCommandCodeAuthState((current) => ({
            ...current,
            phase: "error",
            message: errorMessage,
          }));
          notify.error(errorMessage);
          return false;
        }

        setCommandCodeAuthState((current) => ({
          ...current,
          phase: "applied",
          message: providerText(t, "commandCodeConnected", "Command Code connected"),
        }));
        commandCodeAuthWindowRef.current?.close?.();
        commandCodeAuthWindowRef.current = null;
        await fetchConnections();
        handleCloseAddApiKeyModal();
        notify.success(
          providerText(t, "commandCodeConnectionAdded", "Command Code connection added")
        );
        return true;
      } catch (error) {
        console.error("Error applying Command Code auth:", error);
        setCommandCodeAuthState((current) => ({
          ...current,
          phase: "error",
          message: providerText(t, "commandCodeApplyFailed", "Failed to apply Command Code auth"),
        }));
        notify.error(
          providerText(t, "commandCodeApplyFailed", "Failed to apply Command Code auth")
        );
        return false;
      }
    },
    [fetchConnections, handleCloseAddApiKeyModal, notify, t]
  );

  const handleStartCommandCodeAuth = useCallback(async () => {
    if (commandCodeAuthState.phase === "starting" || commandCodeAuthState.phase === "polling") {
      return;
    }

    clearCommandCodeAuthTimer();
    commandCodeAuthWindowRef.current?.close?.();

    const popup = window.open("about:blank", "_blank");
    setCommandCodeAuthState({
      phase: "starting",
      state: "",
      authUrl: "",
      callbackUrl: "",
      expiresAt: null,
      message: providerText(t, "commandCodeOpeningStudio", "Opening Command Code Studio…"),
    });

    try {
      const res = await fetch("/api/providers/command-code/auth/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.state || !data.authUrl) {
        const errorMessage =
          data.error ||
          providerText(t, "commandCodeStartFailed", "Failed to start Command Code auth");
        setCommandCodeAuthState((current) => ({
          ...current,
          phase: "error",
          message: errorMessage,
        }));
        notify.error(errorMessage);
        popup?.close?.();
        return;
      }

      setCommandCodeAuthState({
        phase: "polling",
        state: data.state,
        authUrl: data.authUrl,
        callbackUrl: data.callbackUrl || "",
        expiresAt: data.expiresAt || null,
        message: providerText(
          t,
          "commandCodeApprovalInstructions",
          "Open the auth URL, approve access, then paste the returned key/JSON/URL below…"
        ),
      });

      if (popup) {
        try {
          popup.opener = null;
        } catch {
          // Ignore opener cleanup failures.
        }
        popup.location.href = data.authUrl;
        commandCodeAuthWindowRef.current = popup;
      } else {
        const fallbackPopup = window.open(data.authUrl, "_blank", "noopener,noreferrer");
        if (!fallbackPopup) {
          setCommandCodeAuthState((current) => ({
            ...current,
            phase: "error",
            message: providerText(
              t,
              "commandCodePopupBlocked",
              "Popup blocked. Please allow popups and try Command Code Connect again."
            ),
          }));
          notify.error(
            providerText(
              t,
              "commandCodePopupBlocked",
              "Popup blocked. Please allow popups and try Command Code Connect again."
            )
          );
          return;
        }
        commandCodeAuthWindowRef.current = fallbackPopup;
      }

      const deadline = data.expiresAt ? new Date(data.expiresAt).getTime() : Date.now() + 180000;
      const poll = async () => {
        if (Date.now() >= deadline) {
          setCommandCodeAuthState((current) => ({
            ...current,
            phase: "expired",
            message: providerText(t, "commandCodeLinkExpired", "Command Code link expired"),
          }));
          commandCodeAuthWindowRef.current?.close?.();
          commandCodeAuthWindowRef.current = null;
          notify.error(providerText(t, "commandCodeAuthExpired", "Command Code auth expired"));
          clearCommandCodeAuthTimer();
          return;
        }

        try {
          const statusRes = await fetch(
            `/api/providers/command-code/auth/status?state=${encodeURIComponent(data.state)}`,
            { method: "GET", cache: "no-store" }
          );
          const statusData = await statusRes.json().catch(() => ({}));
          const status = String(statusData.status || statusData.state || statusData.phase || "")
            .toLowerCase()
            .trim();

          if (status === "expired") {
            setCommandCodeAuthState((current) => ({
              ...current,
              phase: "expired",
              message: providerText(t, "commandCodeLinkExpired", "Command Code link expired"),
            }));
            commandCodeAuthWindowRef.current?.close?.();
            commandCodeAuthWindowRef.current = null;
            notify.error(providerText(t, "commandCodeAuthExpired", "Command Code auth expired"));
            clearCommandCodeAuthTimer();
            return;
          }

          if (status === "applied") {
            setCommandCodeAuthState((current) => ({
              ...current,
              phase: "applied",
              message: providerText(t, "commandCodeConnected", "Command Code connected"),
            }));
            commandCodeAuthWindowRef.current?.close?.();
            commandCodeAuthWindowRef.current = null;
            await fetchConnections();
            handleCloseAddApiKeyModal();
            notify.success(
              providerText(t, "commandCodeConnectionAdded", "Command Code connection added")
            );
            clearCommandCodeAuthTimer();
            return;
          }

          if (status === "received") {
            setCommandCodeAuthState((current) => ({
              ...current,
              phase: "received",
              message: providerText(
                t,
                "commandCodeApplyingApproval",
                "Browser approved, applying…"
              ),
            }));
            clearCommandCodeAuthTimer();
            await handleCommandCodeAuthApply(
              data.state,
              statusData.connectionId,
              statusData.name,
              statusData.setDefault
            );
            return;
          }
        } catch {
          // Keep polling until the contract reports a terminal state or timeout.
        }

        commandCodeAuthTimerRef.current = window.setTimeout(poll, 2000);
      };

      commandCodeAuthTimerRef.current = window.setTimeout(poll, 1000);
    } catch (error) {
      console.error("Error starting Command Code auth:", error);
      setCommandCodeAuthState((current) => ({
        ...current,
        phase: "error",
        message: providerText(t, "commandCodeStartFailed", "Failed to start Command Code auth"),
      }));
      notify.error(providerText(t, "commandCodeStartFailed", "Failed to start Command Code auth"));
      popup?.close?.();
      commandCodeAuthWindowRef.current = null;
      clearCommandCodeAuthTimer();
    }
  }, [
    clearCommandCodeAuthTimer,
    handleCloseAddApiKeyModal,
    commandCodeAuthState.phase,
    fetchConnections,
    handleCommandCodeAuthApply,
    notify,
    t,
  ]);

  const handleOpenCommandCodeConnect = useCallback(() => {
    setShowAddApiKeyModal(true);
    void handleStartCommandCodeAuth();
  }, [handleStartCommandCodeAuth, setShowAddApiKeyModal]);

  return {
    commandCodeAuthState,
    clearCommandCodeAuthTimer,
    handleCloseAddApiKeyModal,
    handleCommandCodeAuthApply,
    handleStartCommandCodeAuth,
    handleOpenCommandCodeConnect,
  };
}
