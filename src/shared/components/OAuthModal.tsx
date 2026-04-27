"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { useTranslations } from "next-intl";
import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";

const GOOGLE_OAUTH_PROVIDERS = new Set(["antigravity", "gemini-cli"]);

type OAuthModalProps = {
  isOpen: boolean;
  provider?: string;
  providerInfo?: { name: string } | null;
  onSuccess?: () => void;
  onClose: () => void;
  idcConfig?: unknown;
};

/**
 * OAuth Modal Component
 * - Localhost: Auto callback via popup message
 * - Remote: Manual paste callback URL
 */
export default function OAuthModal({
  isOpen,
  provider,
  providerInfo,
  onSuccess,
  onClose,
  idcConfig,
}: OAuthModalProps) {
  const t = useTranslations("oauthModal");
  const [step, setStep] = useState("waiting"); // waiting | input | success | error
  const [authData, setAuthData] = useState(null);
  const [callbackUrl, setCallbackUrl] = useState("");
  const [error, setError] = useState(null);
  const [isDeviceCode, setIsDeviceCode] = useState(false);
  const [deviceData, setDeviceData] = useState(null);
  const [polling, setPolling] = useState(false);
  const popupRef = useRef(null);
  const { copied, copy } = useCopyToClipboard();
  const deviceVerificationUrl =
    deviceData?.verification_uri_complete || deviceData?.verification_uri || "";

  // State for client-only values to avoid hydration mismatch
  const [isLocalhost, setIsLocalhost] = useState(false);
  const [placeholderUrl, setPlaceholderUrl] = useState("/callback?code=...");
  const callbackProcessedRef = useRef(false);
  const flowStartedRef = useRef(false);

  // Detect if running on true localhost vs LAN IP (client-side only)
  // - True localhost (127.0.0.1/localhost): popup auto-callback works
  // - LAN IPs (192.168.x, 10.x, 172.x): redirect URI uses localhost but callback
  //   won't resolve back to the VPS, so use manual paste mode
  const [isTrueLocalhost, setIsTrueLocalhost] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const isLocal =
        hostname === "localhost" ||
        hostname === "127.0.0.1" ||
        hostname.startsWith("192.168.") ||
        hostname.startsWith("10.") ||
        /^172\.(1[6-9]|2\d|3[01])\./.test(hostname);
      const isTrulyLocal = hostname === "localhost" || hostname === "127.0.0.1";
      setIsLocalhost(isLocal);
      setIsTrueLocalhost(isTrulyLocal);
      setPlaceholderUrl(`${window.location.origin}/callback?code=...`);
    }
  }, []);

  // Define all useCallback hooks BEFORE the useEffects that reference them

  // Exchange tokens
  const exchangeTokens = useCallback(
    async (code, state) => {
      if (!authData) return;
      try {
        if (!authData.redirectUri || !authData.codeVerifier) {
          throw new Error(
            "OAuth session is incomplete (missing redirect URI or code verifier). Restart the connection and try again."
          );
        }

        const normalizedState = typeof state === "string" && state.length > 0 ? state : undefined;

        const res = await fetch(`/api/oauth/${provider}/exchange`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code,
            redirectUri: authData.redirectUri,
            codeVerifier: authData.codeVerifier,
            ...(normalizedState ? { state: normalizedState } : {}),
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          const errorObject =
            typeof data.error === "object" && data.error !== null
              ? (data.error as Record<string, unknown>)
              : null;
          const errMsg = errorObject
            ? (errorObject.message as string) || JSON.stringify(errorObject)
            : data.error || "Exchange failed";
          const details = Array.isArray(errorObject?.details)
            ? (errorObject.details as Array<{ field?: string; message?: string }>)
                .map((detail) => {
                  if (!detail?.message) return null;
                  return detail.field ? `${detail.field}: ${detail.message}` : detail.message;
                })
                .filter(Boolean)
                .join("; ")
            : "";
          throw new Error(details ? `${errMsg} (${details})` : errMsg);
        }

        setStep("success");
        onSuccess?.();
      } catch (err) {
        // Provide actionable guidance for redirect_uri_mismatch on Google OAuth providers
        if (
          err.message?.toLowerCase().includes("redirect_uri_mismatch") &&
          GOOGLE_OAUTH_PROVIDERS.has(provider)
        ) {
          setError(
            "redirect_uri_mismatch: The default Google OAuth credentials only work on localhost. " +
              "For remote use, configure your own OAuth credentials via environment variables: " +
              (provider === "antigravity"
                ? "ANTIGRAVITY_OAUTH_CLIENT_ID and ANTIGRAVITY_OAUTH_CLIENT_SECRET"
                : "GEMINI_CLI_OAUTH_CLIENT_ID and GEMINI_CLI_OAUTH_CLIENT_SECRET") +
              ". See the README section 'OAuth on a Remote Server'."
          );
        } else {
          setError(err.message);
        }
        setStep("error");
      }
    },
    [authData, provider, onSuccess]
  );

  // Poll for device code token
  const startPolling = useCallback(
    async (deviceCode, codeVerifier, interval, extraData) => {
      setPolling(true);
      const maxAttempts = 60;

      for (let i = 0; i < maxAttempts; i++) {
        await new Promise((r) => setTimeout(r, interval * 1000));

        try {
          const res = await fetch(`/api/oauth/${provider}/poll`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ deviceCode, codeVerifier, extraData }),
          });

          const data = await res.json();

          if (data.success) {
            setStep("success");
            setPolling(false);
            onSuccess?.();
            return;
          }

          if (data.error === "expired_token" || data.error === "access_denied") {
            throw new Error(data.errorDescription || data.error);
          }

          if (data.error === "slow_down") {
            interval = Math.min(interval + 5, 30);
          }
        } catch (err) {
          setError(err.message);
          setStep("error");
          setPolling(false);
          return;
        }
      }

      setError("Authorization timeout");
      setStep("error");
      setPolling(false);
    },
    [provider, onSuccess]
  );

  // Start OAuth flow
  const startOAuthFlow = useCallback(async () => {
    if (!provider) return;
    try {
      setError(null);

      // Device code flow (GitHub, Qwen, Kiro, Kimi Coding, KiloCode)
      if (
        provider === "github" ||
        provider === "qwen" ||
        provider === "kiro" ||
        provider === "amazon-q" ||
        provider === "kimi-coding" ||
        provider === "kilocode"
      ) {
        setIsDeviceCode(true);
        setStep("waiting");

        const res = await fetch(`/api/oauth/${provider}/device-code`);
        const data = await res.json();
        if (!res.ok) {
          const errMsg =
            typeof data.error === "object" && data.error !== null
              ? ((data.error as Record<string, unknown>).message as string) ||
                JSON.stringify(data.error)
              : data.error || "Request failed";
          throw new Error(errMsg);
        }

        setDeviceData(data);

        // Open verification URL
        const verifyUrl = data.verification_uri_complete || data.verification_uri;
        if (verifyUrl) window.open(verifyUrl, "oauth_verify");

        // Start polling - pass extraData for Kiro (contains _clientId, _clientSecret)
        const extraData =
          provider === "kiro" || provider === "amazon-q"
            ? { _clientId: data._clientId, _clientSecret: data._clientSecret }
            : null;
        startPolling(data.device_code, data.codeVerifier, data.interval || 5, extraData);
        return;
      }

      let forceManual = false;

      // Claude Code and Cline OAuth flows can finish on provider-hosted pages that
      // show an auth code instead of redirecting back to OmniRoute.
      // Start directly in manual mode so users always have an input to paste code/url.
      if (provider === "claude" || provider === "cline") {
        forceManual = true;
      }

      // Codex: on localhost use callback server on port 1455,
      // on remote use standard auth code flow (callback server is unreachable)
      if (provider === "codex") {
        if (isLocalhost) {
          // Localhost: use callback server on port 1455 + polling
          try {
            const serverRes = await fetch(`/api/oauth/codex/start-callback-server`);
            const serverData = await serverRes.json();
            if (!serverRes.ok) throw new Error(serverData.error);

            setAuthData({ ...serverData, redirectUri: serverData.redirectUri });
            setStep("waiting");
            popupRef.current = window.open(serverData.authUrl, "oauth_auth");

            // If browser blocked the popup, switch to manual input step immediately
            if (!popupRef.current) {
              setStep("input");
            }

            setPolling(true);
            const maxAttempts = 150;
            for (let i = 0; i < maxAttempts; i++) {
              await new Promise((r) => setTimeout(r, 2000));

              const pollRes = await fetch(`/api/oauth/codex/poll-callback`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
              });
              const pollData = await pollRes.json();

              if (pollData.success) {
                setStep("success");
                setPolling(false);
                onSuccess?.();
                return;
              }

              if (pollData.error && !pollData.pending) {
                throw new Error(pollData.errorDescription || pollData.error);
              }
            }

            setPolling(false);
            throw new Error("Authorization timeout");
          } catch (codexErr) {
            console.warn(
              "Codex callback server failed, falling back to standard manual flow",
              codexErr
            );
            setPolling(false);
            forceManual = true;
          }
        }
        // Remote: fall through to standard auth code flow below
      }

      // Authorization code flow
      // Redirect URI strategy:
      // - Codex/OpenAI: always port 1455 (registered in OAuth app)
      // - Google OAuth providers (antigravity, gemini-cli): always localhost, regardless of
      //   where OmniRoute is hosted — Google only accepts pre-registered localhost URIs with
      //   the built-in credentials. Remote users must configure their own credentials.
      // - Other providers on remote: use actual origin (supports PUBLIC_URL env var)
      // - Localhost: use localhost:port
      let redirectUri: string;
      if (provider === "codex" || provider === "openai") {
        redirectUri = "http://localhost:1455/auth/callback";
      } else if (GOOGLE_OAUTH_PROVIDERS.has(provider)) {
        // Google OAuth built-in credentials only accept localhost redirect URIs.
        // Even in remote deployments we use localhost — user copies the callback URL manually.
        const port = window.location.port || "20128";
        redirectUri = `http://localhost:${port}/callback`;
      } else if (!isLocalhost) {
        // Behind reverse proxy: use actual origin (e.g., https://omniroute.example.com/callback)
        // Supports PUBLIC_URL env var override, or falls back to window.location.origin.
        const publicUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const origin =
          publicUrl && publicUrl !== "http://localhost:20128"
            ? publicUrl.replace(/\/$/, "")
            : window.location.origin;
        redirectUri = `${origin}/callback`;
      } else {
        const port = window.location.port || (window.location.protocol === "https:" ? "443" : "80");
        redirectUri = `http://localhost:${port}/callback`;
      }

      const res = await fetch(
        `/api/oauth/${provider}/authorize?redirect_uri=${encodeURIComponent(redirectUri)}`
      );
      const data = await res.json();
      if (!res.ok) {
        const errMsg =
          typeof data.error === "object" && data.error !== null
            ? ((data.error as Record<string, unknown>).message as string) ||
              JSON.stringify(data.error)
            : data.error || "Authorization failed";
        throw new Error(errMsg);
      }

      if (!data.authUrl) {
        throw new Error(
          data.error ||
            "Browser OAuth is unavailable for this provider in the current environment. Use the supported auth method instead."
        );
      }

      setAuthData({ ...data, redirectUri });

      // For non-true-localhost (LAN IPs, remote) or manual fallback: use manual input mode (user pastes callback URL)
      if (!isTrueLocalhost || forceManual) {
        setStep("input");
        window.open(data.authUrl, "oauth_auth");
      } else {
        // Localhost: Open popup and wait for message
        setStep("waiting");
        popupRef.current = window.open(data.authUrl, "oauth_popup", "width=600,height=700");

        // Check if popup was blocked
        if (!popupRef.current) {
          setStep("input");
        }
      }
    } catch (err) {
      setError(err.message);
      setStep("error");
    }
  }, [provider, isLocalhost, isTrueLocalhost, startPolling, onSuccess]);

  // Reset guard when modal closes
  useEffect(() => {
    if (!isOpen) {
      flowStartedRef.current = false;
    }
  }, [isOpen]);

  // Reset state and start OAuth when modal opens
  useEffect(() => {
    if (isOpen && provider) {
      if (flowStartedRef.current) return; // Already started, prevent duplicate
      flowStartedRef.current = true;
      setAuthData(null);
      setCallbackUrl("");
      setError(null);
      setIsDeviceCode(false);
      setDeviceData(null);
      setPolling(false);
      // Auto start OAuth
      startOAuthFlow();
    }
  }, [isOpen, provider, startOAuthFlow]);

  // Listen for OAuth callback via multiple methods
  useEffect(() => {
    if (!authData) return;
    callbackProcessedRef.current = false; // Reset when authData changes

    // Handler for callback data - only process once
    const handleCallback = async (data) => {
      if (callbackProcessedRef.current) return; // Already processed

      const { code, state, error: callbackError, errorDescription } = data;

      if (callbackError) {
        callbackProcessedRef.current = true;
        setError(errorDescription || callbackError);
        setStep("error");
        return;
      }

      if (code) {
        callbackProcessedRef.current = true;
        await exchangeTokens(code, state);
      }
    };

    // Method 1: postMessage from popup
    const handleMessage = (event) => {
      // Accept same-origin OR localhost with same port (remote access scenario:
      // dashboard at 192.168.x:port, callback redirects to localhost:port)
      const currentPort = window.location.port;
      const isLocalhostSamePort =
        event.origin.match(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/) &&
        new URL(event.origin).port === currentPort;
      if (event.origin !== window.location.origin && !isLocalhostSamePort) return;
      if (event.data?.type === "oauth_callback") {
        handleCallback(event.data.data);
      }
    };
    window.addEventListener("message", handleMessage);

    // Method 2: BroadcastChannel
    let channel;
    try {
      channel = new BroadcastChannel("oauth_callback");
      channel.onmessage = (event) => handleCallback(event.data);
    } catch (e) {
      console.log("BroadcastChannel not supported");
    }

    // Method 3: localStorage event
    const handleStorage = (event) => {
      if (event.key === "oauth_callback" && event.newValue) {
        try {
          const data = JSON.parse(event.newValue);
          handleCallback(data);
          localStorage.removeItem("oauth_callback");
        } catch (e) {
          console.log("Failed to parse localStorage data");
        }
      }
    };
    window.addEventListener("storage", handleStorage);

    // Also check localStorage on mount (in case callback already happened)
    try {
      const stored = localStorage.getItem("oauth_callback");
      if (stored) {
        const data = JSON.parse(stored);
        // Only use if recent (within 30 seconds)
        if (data.timestamp && Date.now() - data.timestamp < 30000) {
          handleCallback(data);
          localStorage.removeItem("oauth_callback");
        }
      }
    } catch {
      // localStorage may be unavailable or data may be malformed - ignore silently
    }

    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("storage", handleStorage);
      if (channel) channel.close();
    };
  }, [authData, exchangeTokens]);

  // Fix #344: Detect when OAuth popup is closed without completing authorization
  // Some providers (like Qoder) redirect to their own chat UI instead of sending a callback,
  // leaving the modal stuck at "Waiting for Authorization" forever.
  useEffect(() => {
    if (step !== "waiting" || isDeviceCode || !popupRef.current) return;

    let closed = false;
    const popupClosedInterval = setInterval(() => {
      if (callbackProcessedRef.current) {
        clearInterval(popupClosedInterval);
        return;
      }
      try {
        if (popupRef.current?.closed) {
          closed = true;
          clearInterval(popupClosedInterval);
          // Popup was closed without completing OAuth — switch to manual input mode
          // so user can paste the callback URL from their browser address bar
          if (step === "waiting") {
            setStep("input");
          }
        }
      } catch {
        // Cross-origin access may throw — ignore
      }
    }, 1000);

    // Safety timeout: 5 minutes
    const safetyTimeout = setTimeout(
      () => {
        if (!callbackProcessedRef.current && step === "waiting") {
          clearInterval(popupClosedInterval);
          setStep("input");
        }
      },
      5 * 60 * 1000
    );

    return () => {
      clearInterval(popupClosedInterval);
      clearTimeout(safetyTimeout);
    };
  }, [step, isDeviceCode]);

  // Handle manual URL input
  const handleManualSubmit = async () => {
    try {
      setError(null);

      if (!authData) {
        throw new Error(
          "OAuth session not initialized. Restart the connection flow and try again."
        );
      }

      const input = callbackUrl.trim();
      let code = null;
      let state = authData?.state || null;
      let errorParam = null;
      let errorDescription = null;

      try {
        const url = new URL(input);
        code = url.searchParams.get("code");
        state = url.searchParams.get("state") || url.hash.replace(/^#/, "") || state;
        errorParam = url.searchParams.get("error");
        errorDescription = url.searchParams.get("error_description");
      } catch {
        // Claude Code remote auth may provide a raw "Authentication Code" like code#state.
        const [rawCode, rawState] = input.split("#", 2);
        code = rawCode || null;
        state = rawState || state;
      }

      if (errorParam) {
        throw new Error(errorDescription || errorParam);
      }

      if (!code) {
        throw new Error(
          "No authorization code found. Paste the callback URL or the Authentication Code."
        );
      }

      await exchangeTokens(code, state);
    } catch (err) {
      setError(err.message);
      setStep("error");
    }
  };

  if (!provider || !providerInfo) return null;

  return (
    <Modal
      isOpen={isOpen}
      title={t("title", { providerName: providerInfo.name })}
      onClose={onClose}
      size="lg"
    >
      <div className="flex flex-col gap-4">
        {/* Waiting Step (Localhost - popup mode) */}
        {step === "waiting" && !isDeviceCode && (
          <div className="text-center py-6">
            <div className="size-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-primary animate-spin">
                progress_activity
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{t("waiting")}</h3>
            <p className="text-sm text-text-muted mb-2">{t("completeAuthInPopup")}</p>
            <p className="text-xs text-text-muted mb-4 opacity-70">{t("popupClosedHint")}</p>
            <Button variant="ghost" onClick={() => setStep("input")}>
              {t("popupBlocked")}
            </Button>
          </div>
        )}

        {/* Device Code Flow - Waiting */}
        {step === "waiting" && isDeviceCode && deviceData && (
          <>
            <div className="text-center py-4">
              <p className="text-sm text-text-muted mb-4">{t("deviceCodeVisitUrl")}</p>
              <div className="bg-sidebar p-4 rounded-lg mb-4">
                <p className="text-xs text-text-muted mb-1">{t("deviceCodeVerificationUrl")}</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-sm break-all">{deviceVerificationUrl}</code>
                  <Button
                    size="sm"
                    variant="ghost"
                    icon={copied === "verify_url" ? "check" : "content_copy"}
                    onClick={() => copy(deviceVerificationUrl, "verify_url")}
                  />
                </div>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="text-xs text-text-muted mb-1">{t("deviceCodeYourCode")}</p>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-2xl font-mono font-bold text-primary">
                    {deviceData.user_code}
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    icon={copied === "user_code" ? "check" : "content_copy"}
                    onClick={() => copy(deviceData.user_code, "user_code")}
                  />
                </div>
              </div>
            </div>
            {polling && (
              <div className="flex items-center justify-center gap-2 text-sm text-text-muted">
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                {t("deviceCodeWaiting")}
              </div>
            )}
          </>
        )}

        {/* Manual Input Step */}
        {step === "input" && !isDeviceCode && (
          <>
            <div className="space-y-4">
              {/* Remote/LAN server info for Google OAuth providers */}
              {!isTrueLocalhost && GOOGLE_OAUTH_PROVIDERS.has(provider) && (
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">
                  <span className="material-symbols-outlined text-sm align-middle mr-1">
                    warning
                  </span>
                  <strong>
                    {t.rich("googleOAuthWarning", {
                      code: (c) => <code className="font-mono">{c}</code>,
                      a: (c) => (
                        <a
                          href="https://github.com/diegosouzapw/OmniRoute#oauth-on-a-remote-server"
                          target="_blank"
                          rel="noreferrer"
                          className="underline"
                        >
                          {c}
                        </a>
                      ),
                    })}
                  </strong>
                </div>
              )}
              {/* Generic remote info for other providers */}
              {!isTrueLocalhost && !GOOGLE_OAUTH_PROVIDERS.has(provider) && (
                <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-3 text-xs text-blue-200">
                  <span className="material-symbols-outlined text-sm align-middle mr-1">info</span>
                  {t("remoteAccessInfo")}
                </div>
              )}
              <div>
                <p className="text-sm font-medium mb-2">{t("step1OpenUrl")}</p>
                <div className="flex gap-2">
                  <Input
                    value={authData?.authUrl || ""}
                    readOnly
                    className="flex-1 font-mono text-xs"
                  />
                  <Button
                    variant="secondary"
                    icon={copied === "auth_url" ? "check" : "content_copy"}
                    onClick={() => copy(authData?.authUrl, "auth_url")}
                  >
                    {t("copy")}
                  </Button>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">{t("step2PasteCallback")}</p>
                <p className="text-xs text-text-muted mb-2">
                  {t.rich("step2Hint", {
                    code: (c) => <code className="font-mono">{c}</code>,
                  })}
                </p>
                <Input
                  value={callbackUrl}
                  onChange={(e) => setCallbackUrl(e.target.value)}
                  placeholder={
                    provider === "claude" || provider === "cline"
                      ? "code#state or /callback?code=..."
                      : placeholderUrl
                  }
                  className="font-mono text-xs"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleManualSubmit} fullWidth disabled={!callbackUrl || !authData}>
                {t("connect")}
              </Button>
              <Button onClick={onClose} variant="ghost" fullWidth>
                {t("cancel")}
              </Button>
            </div>
          </>
        )}

        {/* Success Step */}
        {step === "success" && (
          <div className="text-center py-6">
            <div className="size-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-green-600">
                check_circle
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{t("success")}</h3>
            <p className="text-sm text-text-muted mb-4">
              {t("successMessage", { providerName: providerInfo.name })}
            </p>
            <Button onClick={onClose} fullWidth>
              {t("done")}
            </Button>
          </div>
        )}

        {/* Error Step */}
        {step === "error" && (
          <div className="text-center py-6">
            <div className="size-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-red-600">error</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{t("error")}</h3>
            <p className="text-sm text-red-600 mb-4">{error}</p>
            <div className="flex gap-2">
              <Button onClick={startOAuthFlow} variant="secondary" fullWidth>
                {t("tryAgain")}
              </Button>
              <Button onClick={onClose} variant="ghost" fullWidth>
                {t("cancel")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

OAuthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  provider: PropTypes.string,
  providerInfo: PropTypes.shape({
    name: PropTypes.string,
  }),
  onSuccess: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};
