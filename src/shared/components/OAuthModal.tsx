"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Input } from "@/shared/components";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";

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
}: any) {
  const [step, setStep] = useState("waiting"); // waiting | input | success | error
  const [authData, setAuthData] = useState(null);
  const [callbackUrl, setCallbackUrl] = useState("");
  const [error, setError] = useState(null);
  const [isDeviceCode, setIsDeviceCode] = useState(false);
  const [deviceData, setDeviceData] = useState(null);
  const [polling, setPolling] = useState(false);
  const popupRef = useRef(null);
  const { copied, copy } = useCopyToClipboard();

  // State for client-only values to avoid hydration mismatch
  const [isLocalhost, setIsLocalhost] = useState(false);
  const [placeholderUrl, setPlaceholderUrl] = useState("/callback?code=...");
  const callbackProcessedRef = useRef(false);
  const flowStartedRef = useRef(false);

  // Detect if running on localhost (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLocalhost(
        window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      );
      setPlaceholderUrl(`${window.location.origin}/callback?code=...`);
    }
  }, []);

  // Define all useCallback hooks BEFORE the useEffects that reference them

  // Exchange tokens
  const exchangeTokens = useCallback(
    async (code, state) => {
      if (!authData) return;
      try {
        const res = await fetch(`/api/oauth/${provider}/exchange`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code,
            redirectUri: authData.redirectUri,
            codeVerifier: authData.codeVerifier,
            state,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        setStep("success");
        onSuccess?.();
      } catch (err) {
        setError(err.message);
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
        provider === "kimi-coding" ||
        provider === "kilocode"
      ) {
        setIsDeviceCode(true);
        setStep("waiting");

        const res = await fetch(`/api/oauth/${provider}/device-code`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        setDeviceData(data);

        // Open verification URL
        const verifyUrl = data.verification_uri_complete || data.verification_uri;
        if (verifyUrl) window.open(verifyUrl, "oauth_verify");

        // Start polling - pass extraData for Kiro (contains _clientId, _clientSecret)
        const extraData =
          provider === "kiro"
            ? { _clientId: data._clientId, _clientSecret: data._clientSecret }
            : null;
        startPolling(data.device_code, data.codeVerifier, data.interval || 5, extraData);
        return;
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
            window.open(serverData.authUrl, "oauth_auth");

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
            setPolling(false);
            setStep("input");
            setError(codexErr.message + " — You can paste the callback URL manually below.");
          }
          return;
        }
        // Remote: fall through to standard auth code flow below
      }

      // Authorization code flow
      // On localhost: use localhost callback so popup/BroadcastChannel/localStorage can relay code.
      // On remote (behind nginx/reverse proxy): use the actual origin so the callback page loads.
      // Codex (OpenAI) requires exactly http://localhost:1455/auth/callback — the registered URI.
      let redirectUri: string;
      if (provider === "codex" || provider === "openai") {
        redirectUri = "http://localhost:1455/auth/callback";
      } else if (!isLocalhost) {
        // Behind reverse proxy: use actual origin (e.g., https://omniroute.example.com/callback)
        // This ensures the OAuth provider redirects to the proxied URL where the callback page loads.
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
      if (!res.ok) throw new Error(data.error);

      setAuthData({ ...data, redirectUri });

      // For non-localhost: use manual input mode (user pastes callback URL)
      if (!isLocalhost) {
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
  }, [provider, isLocalhost, startPolling, onSuccess]);

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

  // Handle manual URL input
  const handleManualSubmit = async () => {
    try {
      setError(null);
      const url = new URL(callbackUrl);
      const code = url.searchParams.get("code");
      const state = url.searchParams.get("state");
      const errorParam = url.searchParams.get("error");

      if (errorParam) {
        throw new Error(url.searchParams.get("error_description") || errorParam);
      }

      if (!code) {
        throw new Error("No authorization code found in URL");
      }

      await exchangeTokens(code, state);
    } catch (err) {
      setError(err.message);
      setStep("error");
    }
  };

  if (!provider || !providerInfo) return null;

  return (
    <Modal isOpen={isOpen} title={`Connect ${providerInfo.name}`} onClose={onClose} size="lg">
      <div className="flex flex-col gap-4">
        {/* Waiting Step (Localhost - popup mode) */}
        {step === "waiting" && !isDeviceCode && (
          <div className="text-center py-6">
            <div className="size-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-primary animate-spin">
                progress_activity
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Waiting for Authorization</h3>
            <p className="text-sm text-text-muted mb-4">
              Complete the authorization in the popup window.
            </p>
            <Button variant="ghost" onClick={() => setStep("input")}>
              Popup blocked? Enter URL manually
            </Button>
          </div>
        )}

        {/* Device Code Flow - Waiting */}
        {step === "waiting" && isDeviceCode && deviceData && (
          <>
            <div className="text-center py-4">
              <p className="text-sm text-text-muted mb-4">
                Visit the URL below and enter the code:
              </p>
              <div className="bg-sidebar p-4 rounded-lg mb-4">
                <p className="text-xs text-text-muted mb-1">Verification URL</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-sm break-all">{deviceData.verification_uri}</code>
                  <Button
                    size="sm"
                    variant="ghost"
                    icon={copied === "verify_url" ? "check" : "content_copy"}
                    onClick={() => copy(deviceData.verification_uri, "verify_url")}
                  />
                </div>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="text-xs text-text-muted mb-1">Your Code</p>
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
                Waiting for authorization...
              </div>
            )}
          </>
        )}

        {/* Manual Input Step */}
        {step === "input" && !isDeviceCode && (
          <>
            <div className="space-y-4">
              {!isLocalhost && (
                <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-3 text-xs text-blue-200">
                  <span className="material-symbols-outlined text-sm align-middle mr-1">info</span>
                  <strong>Remote access:</strong> Since you&apos;re accessing OmniRoute remotely,
                  after authorizing you&apos;ll see an error page (localhost not found). That&apos;s
                  expected — just copy the full URL from your browser&apos;s address bar and paste
                  it below.
                </div>
              )}
              <div>
                <p className="text-sm font-medium mb-2">Step 1: Open this URL in your browser</p>
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
                    Copy
                  </Button>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Step 2: Paste the callback URL here</p>
                <p className="text-xs text-text-muted mb-2">
                  After authorization, copy the full URL from your browser.
                </p>
                <Input
                  value={callbackUrl}
                  onChange={(e) => setCallbackUrl(e.target.value)}
                  placeholder={placeholderUrl}
                  className="font-mono text-xs"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleManualSubmit} fullWidth disabled={!callbackUrl}>
                Connect
              </Button>
              <Button onClick={onClose} variant="ghost" fullWidth>
                Cancel
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
            <h3 className="text-lg font-semibold mb-2">Connected Successfully!</h3>
            <p className="text-sm text-text-muted mb-4">
              Your {providerInfo.name} account has been connected.
            </p>
            <Button onClick={onClose} fullWidth>
              Done
            </Button>
          </div>
        )}

        {/* Error Step */}
        {step === "error" && (
          <div className="text-center py-6">
            <div className="size-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-red-600">error</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Connection Failed</h3>
            <p className="text-sm text-red-600 mb-4">{error}</p>
            <div className="flex gap-2">
              <Button onClick={startOAuthFlow} variant="secondary" fullWidth>
                Try Again
              </Button>
              <Button onClick={onClose} variant="ghost" fullWidth>
                Cancel
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
