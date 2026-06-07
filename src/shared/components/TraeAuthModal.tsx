"use client";

import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";

const TRAE_CLIENT_ID = "en1oxy7wnw8j9n";

function uuid(): string {
  const c = (globalThis.crypto || (globalThis as any).crypto) as Crypto | undefined;
  if (c?.randomUUID) return c.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (ch) => {
    const r = (Math.random() * 16) | 0;
    return (ch === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function randomHex(bytes: number): string {
  const buf = new Uint8Array(bytes);
  (globalThis.crypto || (globalThis as any).crypto).getRandomValues(buf);
  return Array.from(buf, (b) => b.toString(16).padStart(2, "0")).join("");
}

function randomDigits(n: number): string {
  let s = "";
  while (s.length < n) s += Math.floor(Math.random() * 1e10).toString();
  return s.slice(0, n);
}

function buildTraeAuthorizeUrl(callbackUrl: string, traceId: string): string {
  // Per-attempt machine/device IDs — Trae doesn't tie tokens to a specific
  // machine_id, but the field is required and is echoed into provider metadata.
  const machineId = randomHex(32);
  const deviceId = randomDigits(19);
  const params = new URLSearchParams({
    login_version: "1",
    auth_from: "solo",
    login_channel: "native_ide",
    plugin_version: "2.3.24254",
    auth_type: "local",
    client_id: TRAE_CLIENT_ID,
    redirect: "0",
    login_trace_id: traceId,
    auth_callback_url: callbackUrl,
    machine_id: machineId,
    device_id: deviceId,
    x_device_id: deviceId,
    x_machine_id: machineId,
    x_device_brand: "Mac14,7",
    x_device_type: "mac",
    x_os_version: "macOS 26.4.1",
    x_env: "",
    x_app_version: "0.1.7",
    x_app_type: "stable",
    // Match what the SOLO desktop client sends: hide_saas_login=true. With
    // auth_from=solo, trae.ai's authorize page is *only* a confirmation gate
    // for an already-cookied session — so leaving the SaaS sign-in surface
    // visible (false) causes the server to short-circuit to "Login Failed".
    // The user must be signed in on trae.ai in the same browser; we surface
    // that in the modal copy and provide an "Open solo.trae.ai" button.
    hide_saas_login: "true",
  });
  return `https://www.trae.ai/authorization?${params.toString()}`;
}

type TraeAuthModalProps = {
  isOpen: boolean;
  onSuccess?: () => void;
  onClose: () => void;
  reauthConnection?: unknown;
};

/**
 * Trae SOLO Auth Modal — paste the Cloud-IDE-JWT from solo.trae.ai.
 *
 * Trae has no public OAuth or local credential store like Cursor: the user
 * signs in to solo.trae.ai in a browser, copies the JWT sent in the
 * Authorization header (Cloud-IDE-JWT scheme), and pastes it here. JWT
 * lifetime is ~14 days; re-import on expiry.
 */
export default function TraeAuthModal({
  isOpen,
  onSuccess,
  onClose,
  reauthConnection: _,
}: TraeAuthModalProps) {
  const [accessToken, setAccessToken] = useState("");
  const [webId, setWebId] = useState("");
  const [bizUserId, setBizUserId] = useState("");
  const [userUniqueId, setUserUniqueId] = useState("");
  const [scope, setScope] = useState("marscode-us");
  const [tenant, setTenant] = useState("marscode");
  const [region, setRegion] = useState("US-East");
  const [error, setError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [authorizing, setAuthorizing] = useState(false);
  const popupRef = useRef<Window | null>(null);
  const traceIdRef = useRef<string | null>(null);

  // Listen for postMessage from the callback page (window.opener.postMessage).
  // Only act on messages with our type tag, and verify the loginTraceId matches
  // the one we sent in the authorize URL — protects against unrelated postMessages.
  useEffect(() => {
    if (!isOpen) return;
    const onMessage = (ev: MessageEvent) => {
      const m = ev.data as {
        type?: string;
        success?: boolean;
        error?: string;
        loginTraceId?: string;
      } | null;
      if (!m || m.type !== "trae-oauth-callback") return;
      // Accept this window's origin OR the sibling loopback host: the dashboard
      // usually runs on localhost while Trae forces the callback onto 127.0.0.1,
      // so they are different origins by design. Restrict to that known pair
      // (never wildcard), then rely on the random loginTraceId for CSRF.
      const here = window.location;
      const altHost =
        here.hostname === "127.0.0.1"
          ? "localhost"
          : here.hostname === "localhost"
            ? "127.0.0.1"
            : null;
      const allowedOrigins = new Set([here.origin]);
      if (altHost)
        allowedOrigins.add(`${here.protocol}//${altHost}${here.port ? `:${here.port}` : ""}`);
      if (!allowedOrigins.has(ev.origin)) return;
      if (!traceIdRef.current || m.loginTraceId !== traceIdRef.current) return;
      setAuthorizing(false);
      if (m.success) {
        onSuccess?.();
        onClose();
      } else {
        setError(m.error || "Authorization failed");
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [isOpen, onSuccess, onClose]);

  const handleAuthorizeWithBrowser = () => {
    setError(null);
    setAuthorizing(true);
    const traceId = uuid();
    traceIdRef.current = traceId;
    // Trae's authorize endpoint validates two things about auth_callback_url:
    //  1. host must be a loopback IP (127.0.0.1) — "localhost" hostname gets
    //     rejected with "Login Failed".
    //  2. path must end with `/authorize` — any other path (e.g. our earlier
    //     "/api/oauth/trae/callback") also short-circuits to "Login Failed".
    // The receiving handler therefore lives at the app root (src/app/authorize).
    const port = window.location.port || (window.location.protocol === "https:" ? "443" : "80");
    const callbackUrl = `http://127.0.0.1:${port}/authorize`;
    const authUrl = buildTraeAuthorizeUrl(callbackUrl, traceId);
    const w = window.open(authUrl, "trae-oauth", "width=520,height=720");
    if (!w) {
      setAuthorizing(false);
      setError("Popup blocked — allow popups for this site, or paste the token manually below.");
      return;
    }
    popupRef.current = w;
    // If the user closes the popup without completing, drop the spinner.
    const poll = setInterval(() => {
      if (w.closed) {
        clearInterval(poll);
        setAuthorizing((prev) => {
          if (prev) setError("Authorization window was closed before completing.");
          return false;
        });
      }
    }, 700);
  };

  const handleImportToken = async () => {
    if (!accessToken.trim()) {
      setError("Access token is required.");
      return;
    }
    setImporting(true);
    setError(null);
    try {
      const body: Record<string, string> = { accessToken: accessToken.trim() };
      if (webId.trim()) body.webId = webId.trim();
      if (bizUserId.trim()) body.bizUserId = bizUserId.trim();
      if (userUniqueId.trim()) body.userUniqueId = userUniqueId.trim();
      if (scope.trim()) body.scope = scope.trim();
      if (tenant.trim()) body.tenant = tenant.trim();
      if (region.trim()) body.region = region.trim();

      const res = await fetch("/api/oauth/trae/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          typeof data.error === "string" ? data.error : data.error?.message || "Import failed"
        );
      }
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setImporting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} title="Connect Trae SOLO" onClose={onClose}>
      <div className="flex flex-col gap-4">
        {/* Primary path: browser-based OAuth via trae.ai/authorization */}
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <p className="text-sm text-emerald-900 dark:text-emerald-200 mb-2">
            Authorize via <span className="font-mono">trae.ai</span> in a popup. The popup will
            close itself once the token has been imported.
          </p>
          <p className="text-xs text-emerald-800 dark:text-emerald-300 mb-3">
            <strong>Important:</strong> you must be logged in to{" "}
            <span className="font-mono">trae.ai</span> in <em>this</em> browser first. The authorize
            page only confirms an existing session — it cannot sign you in. If you see &quot;Login
            Failed&quot;, click &quot;Open solo.trae.ai&quot;, sign in, then return here.
          </p>
          <div className="flex gap-2">
            <Button onClick={handleAuthorizeWithBrowser} disabled={authorizing} fullWidth>
              {authorizing ? "Waiting for trae.ai…" : "Authorize with Browser"}
            </Button>
            <Button
              onClick={() => window.open("https://solo.trae.ai/", "_blank", "noopener,noreferrer")}
              variant="ghost"
              fullWidth
            >
              Open solo.trae.ai
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-text-muted">
          <span className="flex-1 border-t border-border" />
          or paste a token manually
          <span className="flex-1 border-t border-border" />
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Sign in to <span className="font-mono">solo.trae.ai</span>, open DevTools → Network,
            send any chat message, and copy the JWT from the{" "}
            <span className="font-mono">Authorization: Cloud-IDE-JWT &lt;token&gt;</span> request
            header. JWT lifetime is ~14 days. Optional identity fields come from{" "}
            <span className="font-mono">common_params</span> in the same request body.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Access Token (Cloud-IDE-JWT) <span className="text-red-500">*</span>
          </label>
          <textarea
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            placeholder="eyJhbGciOiJSUzI1NiIs..."
            rows={3}
            className="w-full px-3 py-2 text-sm font-mono border border-border rounded-lg bg-background focus:outline-none focus:border-primary resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">
              Web ID <span className="text-text-muted text-xs">optional</span>
            </label>
            <Input
              value={webId}
              onChange={(e) => setWebId(e.target.value)}
              placeholder="76428..."
              className="font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Biz User ID <span className="text-text-muted text-xs">optional</span>
            </label>
            <Input
              value={bizUserId}
              onChange={(e) => setBizUserId(e.target.value)}
              placeholder="76428..."
              className="font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              User Unique ID <span className="text-text-muted text-xs">optional</span>
            </label>
            <Input
              value={userUniqueId}
              onChange={(e) => setUserUniqueId(e.target.value)}
              placeholder="76428..."
              className="font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Scope</label>
            <Input value={scope} onChange={(e) => setScope(e.target.value)} className="text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tenant</label>
            <Input value={tenant} onChange={(e) => setTenant(e.target.value)} className="text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Region</label>
            <Input value={region} onChange={(e) => setRegion(e.target.value)} className="text-sm" />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={handleImportToken} fullWidth disabled={importing || !accessToken.trim()}>
            {importing ? "Importing…" : "Import Token"}
          </Button>
          <Button onClick={onClose} variant="ghost" fullWidth>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}
