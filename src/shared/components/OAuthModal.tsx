"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";
import LinkifiedText from "./LinkifiedText";
import { OAuthDeviceCodePanel, OAuthManualInputPanel } from "./OAuthModalPanels";
import { parseResponseBody, getErrorMessage } from "@/shared/utils/api";
import { isCredentialBlob, submitCredentialBlob } from "@/shared/components/oauthBlobSubmit";
import {
  looksLikeCodexSessionJson,
  parseCodexSessionJson,
} from "@/lib/oauth/utils/codexSessionImport";
import GheConfigStep from "@/shared/components/oauthModal/GheConfigStep";

export { formatDeviceCodeRemaining } from "./OAuthModalPanels";

const GOOGLE_OAUTH_PROVIDERS = new Set(["antigravity", "agy"]);

/** Providers that use a local callback server on a random port (PKCE browser flow). */
const PKCE_CALLBACK_SERVER_PROVIDERS = new Set(["codex", "xai-oauth"]);

const DEVICE_CODE_PROVIDERS = new Set([
  "github",
  "kiro",
  "amazon-q",
  "kimi-coding",
  "kilocode",
  "codebuddy-cn",
  "grok-cli",
  "ghe-copilot",
]);

const TOKEN_PASTE_PROVIDERS = new Set(["windsurf", "devin-cli", "grok-cli"]);
const IMPORT_TOKEN_ONLY_PROVIDERS = new Set(["windsurf", "devin-cli"]);

// POST a bare Codex access token to the access-token-only import endpoint
// (#1290); shared by the bare-JWT and session-JSON paste branches (#6636).
async function submitCodexAccessToken(
  accessToken: string,
  name: string | undefined,
  setStep: (s: string) => void,
  onSuccess?: () => void
): Promise<void> {
  const res = await fetch("/api/oauth/codex/import-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accessToken, name }),
  });
  const data = (await parseResponseBody(res)) as Record<string, unknown>;
  if (!res.ok) {
    throw new Error(getErrorMessage(data, res.status, "Failed to import access token"));
  }
  setStep("success");
  onSuccess?.();
}

type OAuthModalProps = {
  isOpen: boolean;
  provider?: string;
  providerInfo?: { name?: string } | null;
  onSuccess?: () => void;
  onClose: () => void;
  idcConfig?: unknown;
  reauthConnection?: null | { id?: string };
};

type DevicePollResult =
  { status: "pending" | "slow_down" | "success" } | { status: "error"; message: string };

function positiveNumberOr(value: unknown, fallback: number): number {
  return Math.max(1, Number(value) || fallback);
}

async function pollDeviceCodeOnce(
  provider: string | undefined,
  payload: Record<string, unknown>
): Promise<DevicePollResult> {
  try {
    const res = await fetch(`/api/oauth/${provider}/poll`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await parseResponseBody(res)) as Record<string, unknown>;

    if (data.success) return { status: "success" };
    if (data.error === "slow_down") return { status: "slow_down" };
    if (data.error && !data.pending) {
      return { status: "error", message: String(data.errorDescription || data.error) };
    }
    return { status: "pending" };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Authorization failed",
    };
  }
}

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
  reauthConnection,
}: OAuthModalProps) {
  const t = useTranslations("oauthModal");
  const [step, setStep] = useState("waiting"); // waiting | input | success | error
  const [authData, setAuthData] = useState(null);
  const [callbackUrl, setCallbackUrl] = useState("");
  const [error, setError] = useState(null);
  const [isDeviceCode, setIsDeviceCode] = useState(false);
  const [deviceData, setDeviceData] = useState(null);
  const [gheUrl, setGheUrl] = useState("");
  const [polling, setPolling] = useState(false);
  const [deviceCodeExpiresAt, setDeviceCodeExpiresAt] = useState<number | null>(null);
  const [deviceCodeSecondsRemaining, setDeviceCodeSecondsRemaining] = useState<number | null>(null);
  // API-key paste mode for direct-token providers.
  const [showPasteToken, setShowPasteToken] = useState(IMPORT_TOKEN_ONLY_PROVIDERS.has(provider));
  const [pasteToken, setPasteToken] = useState("");
  const [savingToken, setSavingToken] = useState(false);

  const supportsTokenPaste = TOKEN_PASTE_PROVIDERS.has(provider);
  const importTokenOnly = IMPORT_TOKEN_ONLY_PROVIDERS.has(provider);
  const popupRef = useRef(null);
  const deviceFlowRunRef = useRef(0);
  const deviceVerificationUrl =
    deviceData?.verification_uri_complete || deviceData?.verification_uri || "";

  // Client-only runtime values
  const runtimeLocation = useMemo(() => {
    if (typeof window === "undefined") {
      return {
        isLocalhost: false,
        isTrueLocalhost: false,
        placeholderUrl: "/callback?code=...",
      };
    }

    const hostname = window.location.hostname;
    const isLocal =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.startsWith("192.168.") ||
      hostname.startsWith("10.") ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(hostname);
    const isTrulyLocal = hostname === "localhost" || hostname === "127.0.0.1";

    return {
      isLocalhost: isLocal,
      isTrueLocalhost: isTrulyLocal,
      placeholderUrl: `${window.location.origin}/callback?code=...`,
    };
  }, []);

  const { isLocalhost, isTrueLocalhost, placeholderUrl } = runtimeLocation;
  const callbackProcessedRef = useRef(false);
  const flowStartedRef = useRef(false);

  const invalidateDeviceFlow = useCallback(() => {
    deviceFlowRunRef.current += 1;
    setPolling(false);
    setDeviceCodeExpiresAt(null);
    setDeviceCodeSecondsRemaining(null);
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
            connectionId: reauthConnection?.id,
            codeVerifier: authData.codeVerifier,
            ...(normalizedState ? { state: normalizedState } : {}),
          }),
        });

        const data = (await parseResponseBody(res)) as Record<string, unknown>;
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
              "ANTIGRAVITY_OAUTH_CLIENT_ID and ANTIGRAVITY_OAUTH_CLIENT_SECRET" +
              ". See the README section 'OAuth on a Remote Server'."
          );
        } else {
          setError(err.message);
        }
        setStep("error");
      }
    },
    [authData, provider, onSuccess, reauthConnection]
  );

  // Save a raw API token directly (windsurf / devin-cli import-token path)
  const handleSaveToken = useCallback(async () => {
    const token = pasteToken.trim();
    if (!token || !provider) return;
    setSavingToken(true);
    setError(null);
    try {
      // POST to /exchange with a synthetic "import_token" payload.
      // The windsurf provider's mapTokens() handles a bare accessToken/apiKey field.
      const res = await fetch(`/api/oauth/${provider}/import-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          connectionId: reauthConnection?.id,
        }),
      });
      const data = (await parseResponseBody(res)) as Record<string, unknown>;
      if (!res.ok) {
        const errMsg = getErrorMessage(data, res.status, "Save failed");
        throw new Error(errMsg);
      }
      setStep("success");
      onSuccess?.();
    } catch (err) {
      // Show error inline inside the paste-token form (don't flip to error step)
      setError(err.message);
    } finally {
      setSavingToken(false);
    }
  }, [pasteToken, provider, onSuccess, reauthConnection]);

  // Poll for device code token
  const startPolling = useCallback(
    async (deviceCode, codeVerifier, interval, expiresIn, extraData) => {
      const runId = ++deviceFlowRunRef.current;
      const safeInterval = positiveNumberOr(interval, 5);
      const safeExpiresIn = positiveNumberOr(expiresIn, safeInterval * 60);
      const deadline = Date.now() + safeExpiresIn * 1000;
      let currentInterval = safeInterval;

      setPolling(true);
      setDeviceCodeExpiresAt(deadline);

      while (Date.now() < deadline) {
        await new Promise((resolve) => setTimeout(resolve, currentInterval * 1000));
        if (runId !== deviceFlowRunRef.current || Date.now() >= deadline) break;

        const result = await pollDeviceCodeOnce(provider, {
          deviceCode,
          connectionId: reauthConnection?.id,
          codeVerifier,
          extraData,
        });
        if (runId !== deviceFlowRunRef.current) return;

        if (result.status === "success") {
          setStep("success");
          setPolling(false);
          setDeviceCodeExpiresAt(null);
          onSuccess?.();
          return;
        }

        if (result.status === "slow_down") {
          currentInterval = Math.min(currentInterval + 5, 30);
          continue;
        }

        if (result.status === "error") {
          setError(result.message);
          setStep("error");
          setPolling(false);
          setDeviceCodeExpiresAt(null);
          return;
        }
      }

      if (runId === deviceFlowRunRef.current) {
        setError("Authorization timeout");
        setStep("error");
        setPolling(false);
        setDeviceCodeExpiresAt(null);
      }
    },
    [provider, onSuccess, reauthConnection]
  );

  // Start OAuth flow
  const startOAuthFlow = useCallback(async () => {
    if (!provider) return;
    try {
      setError(null);

      // Device code flow
      if (DEVICE_CODE_PROVIDERS.has(provider)) {
        invalidateDeviceFlow();
        setIsDeviceCode(true);
        setDeviceData(null);
        setStep("waiting");

        // GHE Copilot needs the enterprise URL collected first (see ghe-config step)
        if (provider === "ghe-copilot" && !gheUrl.trim()) {
          setStep("ghe-config");
          return;
        }

        const deviceCodeUrl = new URL(`/api/oauth/${provider}/device-code`, window.location.origin);
        if (
          (provider === "kiro" || provider === "amazon-q") &&
          idcConfig &&
          typeof idcConfig === "object"
        ) {
          const idc = idcConfig as { startUrl?: string; region?: string };
          if (typeof idc.startUrl === "string" && idc.startUrl.trim()) {
            deviceCodeUrl.searchParams.set("startUrl", idc.startUrl.trim());
          }
          if (typeof idc.region === "string" && idc.region.trim()) {
            deviceCodeUrl.searchParams.set("region", idc.region.trim());
          }
        }
        if (provider === "ghe-copilot" && gheUrl.trim()) {
          deviceCodeUrl.searchParams.set("gheUrl", gheUrl.trim());
        }

        const res = await fetch(deviceCodeUrl.toString());
        const data = (await parseResponseBody(res)) as Record<string, unknown>;
        if (!res.ok) {
          const errMsg = getErrorMessage(data, res.status, "Request failed");
          throw new Error(errMsg);
        }

        setDeviceData(data);

        // Open verification URL
        const verifyUrl = data.verification_uri_complete || data.verification_uri;
        if (typeof verifyUrl === "string" && verifyUrl) window.open(verifyUrl, "oauth_verify");

        // Start polling - pass extraData for Kiro (contains _clientId, _clientSecret)
        const extraData =
          provider === "kiro" || provider === "amazon-q"
            ? {
                _clientId: data._clientId,
                _clientSecret: data._clientSecret,
                _region: data._region,
              }
            : provider === "ghe-copilot" && gheUrl.trim()
              ? { gheUrl: gheUrl.trim() }
              : null;
        startPolling(
          data.device_code,
          data.codeVerifier,
          data.interval || 5,
          data.expires_in,
          extraData
        );
        return;
      }

      let forceManual = false;

      // Claude Code and Cline OAuth flows can finish on provider-hosted pages that
      // show an auth code instead of redirecting back to OmniRoute.
      // Start directly in manual mode so users always have an input to paste code/url.
      // zed-hosted's native-app sign-in always redirects the browser to a local
      // 127.0.0.1:<port> callback that OmniRoute never listens on (the port is
      // arbitrary and unrelated to the dashboard's own port) — nothing can
      // auto-close the popup, so always show the manual paste-URL input.
      if (provider === "claude" || provider === "cline" || provider === "zed-hosted") {
        forceManual = true;
      }

      // PKCE callback server providers (Codex, Windsurf, Devin CLI):
      // On localhost, spin up a local callback server and poll for the result.
      // Codex uses a fixed port 1455; Windsurf/Devin CLI use a random OS-assigned port.
      // On remote the server is unreachable — fall through to standard manual flow.
      if (PKCE_CALLBACK_SERVER_PROVIDERS.has(provider)) {
        if (isTrueLocalhost) {
          try {
            const serverRes = await fetch(`/api/oauth/${provider}/start-callback-server`);
            const serverData = (await parseResponseBody(serverRes)) as Record<string, unknown>;
            if (!serverRes.ok)
              throw new Error(
                getErrorMessage(serverData, serverRes.status, "Failed to start callback server")
              );

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

              const pollRes = await fetch(`/api/oauth/${provider}/poll-callback`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ connectionId: reauthConnection?.id }),
              });
              const pollData = (await parseResponseBody(pollRes)) as Record<string, unknown>;

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
          } catch (pkceErr) {
            console.warn(
              `${provider} callback server failed, falling back to manual flow`,
              pkceErr
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
      // - Windsurf/Devin CLI (remote fallback): use localhost with OmniRoute port + /auth/callback
      //   (on true localhost the callback server handles it; this is only reached on remote)
      // - Google OAuth providers (antigravity/agy): default to loopback so the
      //   bundled native/desktop credentials keep working. Prefer 127.0.0.1 over
      //   localhost for the Google native-app handoff; Google documents that localhost
      //   can run into local firewall/name-resolution edge cases. The authorize route
      //   upgrades this to the public callback when custom Google web credentials plus
      //   NEXT_PUBLIC_BASE_URL or OMNIROUTE_PUBLIC_BASE_URL are configured.
      // - Other providers on remote: use actual origin (supports PUBLIC_URL env var)
      // - Localhost: use localhost:port
      let redirectUri: string;
      if (provider === "codex" || provider === "openai") {
        redirectUri = "http://localhost:1455/auth/callback";
      } else if (provider === "xai-oauth") {
        // xAI registers a fixed native-app loopback callback. On remote installs
        // the browser cannot reach OmniRoute there, so the user pastes the
        // resulting callback URL into the existing manual-flow input.
        redirectUri = "http://127.0.0.1:56121/callback";
      } else if (provider === "windsurf" || provider === "devin-cli") {
        // Remote fallback: use OmniRoute's port with the /auth/callback path Windsurf expects.
        // On true localhost this code is never reached (callback server handles the flow above).
        const port = window.location.port || "20128";
        redirectUri = `http://localhost:${port}/auth/callback`;
      } else if (GOOGLE_OAUTH_PROVIDERS.has(provider)) {
        // Google OAuth built-in credentials only accept loopback redirect URIs.
        // Even in remote deployments we use loopback — user copies the callback URL manually.
        const port = window.location.port || "20128";
        redirectUri = `http://127.0.0.1:${port}/callback`;
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
      const data = (await parseResponseBody(res)) as Record<string, unknown>;
      if (!res.ok) {
        const errMsg = getErrorMessage(data, res.status, "Authorization failed");
        throw new Error(errMsg);
      }

      if (!data.authUrl) {
        throw new Error(
          data.error ||
            "Browser OAuth is unavailable for this provider in the current environment. Use the supported auth method instead."
        );
      }

      setAuthData({ ...data, redirectUri: data.redirectUri || redirectUri });

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
  }, [
    provider,
    isLocalhost,
    isTrueLocalhost,
    startPolling,
    onSuccess,
    reauthConnection,
    idcConfig,
    gheUrl,
    invalidateDeviceFlow,
  ]);

  useEffect(() => {
    if (!deviceCodeExpiresAt) {
      setDeviceCodeSecondsRemaining(null);
      return;
    }

    const updateRemaining = () => {
      setDeviceCodeSecondsRemaining(
        Math.max(0, Math.ceil((deviceCodeExpiresAt - Date.now()) / 1000))
      );
    };
    updateRemaining();
    const timer = window.setInterval(updateRemaining, 1000);
    return () => window.clearInterval(timer);
  }, [deviceCodeExpiresAt]);

  useEffect(() => {
    invalidateDeviceFlow();
    flowStartedRef.current = false;
  }, [provider, invalidateDeviceFlow]);

  useEffect(() => {
    if (!isOpen) {
      invalidateDeviceFlow();
      flowStartedRef.current = false;
    }
  }, [isOpen, invalidateDeviceFlow]);

  useEffect(
    () => () => {
      deviceFlowRunRef.current += 1;
    },
    []
  );

  // Reset state and start OAuth when modal opens
  useEffect(() => {
    if (!isOpen || !provider || flowStartedRef.current) return;
    flowStartedRef.current = true;
    const startsInPasteMode = IMPORT_TOKEN_ONLY_PROVIDERS.has(provider);
    setShowPasteToken(startsInPasteMode);
    setAuthData(null);
    setCallbackUrl("");
    setError(null);
    setIsDeviceCode(false);
    setDeviceData(null);
    setPolling(false);
    if (!startsInPasteMode) startOAuthFlow();
  }, [isOpen, provider, startOAuthFlow]);

  // Listen for OAuth callback via multiple methods
  useEffect(() => {
    if (!authData) return;
    callbackProcessedRef.current = false; // Reset when authData changes

    // Handler for callback data - only process once
    const handleCallback = async (data) => {
      if (callbackProcessedRef.current) return; // Already processed

      const { code, state, error: callbackError, errorDescription } = data;

      if (authData?.state && state && state !== authData.state) {
        callbackProcessedRef.current = true;
        setError("OAuth state mismatch. Restart the connection and try again.");
        setStep("error");
        return;
      }

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
      let isLoopbackOrigin = false;
      let isLocalhostSamePort = false;
      try {
        const eventUrl = new URL(event.origin);
        isLoopbackOrigin = /^(localhost|127\.0\.0\.1|\[::1\]|::1)$/i.test(eventUrl.hostname);
        isLocalhostSamePort = isLoopbackOrigin && eventUrl.port === currentPort;
      } catch {
        // Ignore malformed origins.
      }

      const payload = event.data?.data;
      const hasMatchingState = !!authData?.state && payload?.state === authData.state;
      const isGoogleLoopbackRelay =
        GOOGLE_OAUTH_PROVIDERS.has(provider) && isLoopbackOrigin && hasMatchingState;

      if (
        event.origin !== window.location.origin &&
        !isLocalhostSamePort &&
        !isGoogleLoopbackRelay
      ) {
        return;
      }
      if (event.data?.type === "oauth_callback") {
        handleCallback(payload);
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
  }, [authData, exchangeTokens, provider]);

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
      if (isCredentialBlob(callbackUrl)) {
        await submitCredentialBlob(provider, callbackUrl, reauthConnection, setStep, onSuccess);
        return;
      }

      // Codex: a bare ChatGPT access token (JWT, no refresh token) pasted
      // directly instead of a callback URL/code — mirrors the grok-cli
      // raw-token paste pattern. Routed through the access-token-only import
      // endpoint (#1290) instead of the authorization-code exchange below.
      if (provider === "codex" && /^eyJ/.test(callbackUrl.trim())) {
        await submitCodexAccessToken(callbackUrl.trim(), undefined, setStep, onSuccess);
        return;
      }

      // Codex: full session JSON from chatgpt.com/api/auth/session
      // (`{user, accessToken, expires}`), not just the bare token (#6636).
      if (provider === "codex" && looksLikeCodexSessionJson(callbackUrl)) {
        const result = parseCodexSessionJson(JSON.parse(callbackUrl.trim()));
        if (result.ok === false) {
          setError(result.error);
          return;
        }
        await submitCodexAccessToken(
          result.session.accessToken,
          result.session.email,
          setStep,
          onSuccess
        );
        return;
      }

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

  const handleClose = useCallback(() => {
    invalidateDeviceFlow();
    onClose();
  }, [invalidateDeviceFlow, onClose]);

  const handlePasteMode = useCallback(() => {
    invalidateDeviceFlow();
    setShowPasteToken(true);
  }, [invalidateDeviceFlow]);

  const handleBrowserMode = useCallback(() => {
    setShowPasteToken(false);
    startOAuthFlow();
  }, [startOAuthFlow]);

  if (!provider || !providerInfo) return null;

  return (
    <Modal
      isOpen={isOpen}
      title={t("title", { providerName: providerInfo.name })}
      onClose={handleClose}
      size="lg"
    >
      <div className="flex flex-col gap-4">
        {/* Browser login with an optional token-import fallback. */}
        {supportsTokenPaste && !importTokenOnly && step !== "success" && (
          <div className="flex gap-2 border-b border-border pb-3">
            <button
              className={`text-sm px-3 py-1 rounded-t ${!showPasteToken ? "font-semibold border-b-2 border-primary text-primary" : "text-text-muted"}`}
              onClick={handleBrowserMode}
            >
              Browser Login
            </button>
            <button
              className={`text-sm px-3 py-1 rounded-t ${showPasteToken ? "font-semibold border-b-2 border-primary text-primary" : "text-text-muted"}`}
              onClick={handlePasteMode}
            >
              {provider === "grok-cli" ? "JWT Token" : "Paste API Key"}
            </button>
          </div>
        )}

        {/* Paste-token form (Windsurf / Devin CLI) */}
        {supportsTokenPaste && showPasteToken && step !== "success" && (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-text-muted">
              {provider === "windsurf"
                ? 'In the Windsurf / VS Code IDE, run the "Windsurf: Provide Auth Token" command from the command palette (or click the Jupyter "Get Windsurf Authentication Token" button), then copy the shown token and paste it below. Opening windsurf.com/show-auth-token directly only shows a "Redirecting" page — the IDE must initiate the flow.'
                : provider === "grok-cli"
                  ? 'Paste your Grok Build JWT token from ~/.grok/auth.json (the "key" field value). You can get it by running `grok login` in your terminal.'
                  : 'Provide your WINDSURF_API_KEY (obtained via `devin auth login`, or via the Windsurf IDE "Windsurf: Provide Auth Token" command).'}
            </p>
            <Input
              value={pasteToken}
              onChange={(e) => setPasteToken(e.target.value)}
              placeholder={provider === "grok-cli" ? "eyJ..." : "ws-..."}
              type="password"
              label={provider === "grok-cli" ? "JWT Token" : "API Key / Token"}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex gap-2">
              <Button
                onClick={handleSaveToken}
                fullWidth
                disabled={!pasteToken.trim() || savingToken}
              >
                {savingToken ? "Saving…" : "Save Connection"}
              </Button>
              <Button onClick={handleClose} variant="ghost" fullWidth>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* OAuth flow steps — hidden when paste-token mode is active */}
        {(!supportsTokenPaste || !showPasteToken) && (
          <>
            {/* GHE Copilot: collect the GitHub Enterprise base URL before starting */}
            {provider === "ghe-copilot" && step === "ghe-config" && (
              <GheConfigStep
                gheUrl={gheUrl}
                setGheUrl={setGheUrl}
                error={error}
                setError={setError}
                startOAuthFlow={startOAuthFlow}
              />
            )}

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
              <OAuthDeviceCodePanel
                deviceData={deviceData}
                verificationUrl={deviceVerificationUrl}
                secondsRemaining={deviceCodeSecondsRemaining}
                polling={polling}
              />
            )}

            {/* Manual Input Step */}
            {step === "input" && !isDeviceCode && (
              <OAuthManualInputPanel
                provider={provider}
                isGoogleOAuth={GOOGLE_OAUTH_PROVIDERS.has(provider)}
                isTrueLocalhost={isTrueLocalhost}
                authUrl={typeof authData?.authUrl === "string" ? authData.authUrl : ""}
                callbackUrl={callbackUrl}
                placeholderUrl={placeholderUrl}
                canSubmit={Boolean(callbackUrl && (authData || isCredentialBlob(callbackUrl)))}
                onCallbackUrlChange={setCallbackUrl}
                onSubmit={handleManualSubmit}
                onClose={handleClose}
              />
            )}
          </>
        )}

        {/* Success Step — shown for both OAuth and paste-token flows */}
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
            <Button onClick={handleClose} fullWidth>
              {t("done")}
            </Button>
          </div>
        )}

        {/* Error Step — OAuth errors only; paste-token errors shown inline */}
        {step === "error" && !showPasteToken && (
          <div className="text-center py-6">
            <div className="size-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-red-600">error</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{t("error")}</h3>
            <p className="text-sm text-red-600 mb-4">
              <LinkifiedText text={error} />
            </p>
            <div className="flex gap-2">
              <Button onClick={startOAuthFlow} variant="secondary" fullWidth>
                {t("tryAgain")}
              </Button>
              <Button onClick={handleClose} variant="ghost" fullWidth>
                {t("cancel")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
