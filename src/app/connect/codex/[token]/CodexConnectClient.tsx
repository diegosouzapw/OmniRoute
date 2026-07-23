"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Button from "@/shared/components/Button";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";
import {
  runCodexDeviceFlow,
  CodexDeviceFlowError,
  type CodexUserCode,
} from "@/lib/oauth/codexDeviceFlow";

type Status = "validating" | "ready" | "starting" | "awaiting" | "saving" | "success" | "error";

/**
 * Drives the public Codex device flow entirely in the visitor's browser
 * (auth.openai.com blocks datacenter IPs but allows CORS), then posts the final
 * tokens back to the ticket-gated completion endpoint for persistence.
 */
export default function CodexConnectClient({ token }: { token: string }) {
  const [status, setStatus] = useState<Status>("validating");
  const [error, setError] = useState<string | null>(null);
  const [userCode, setUserCode] = useState<CodexUserCode | null>(null);
  const { copied, copy } = useCopyToClipboard();
  const abortRef = useRef<AbortController | null>(null);

  // Validate the link on load so we can show "ready" vs "expired" before starting.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/codex/connect/${token}`);
        if (cancelled) return;
        if (res.ok) {
          setStatus("ready");
        } else {
          const data = await res.json().catch(() => ({}));
          setError(data?.error || "This link is invalid or expired.");
          setStatus("error");
        }
      } catch {
        if (!cancelled) {
          setError("Could not reach the server to validate this link.");
          setStatus("error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  // Abort any in-flight device flow if the visitor leaves.
  useEffect(() => () => abortRef.current?.abort(), []);

  const start = useCallback(async () => {
    setError(null);
    setUserCode(null);
    setStatus("starting");

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const tokens = await runCodexDeviceFlow({
        signal: controller.signal,
        onUserCode: (uc) => {
          setUserCode(uc);
          setStatus("awaiting");
        },
      });

      setStatus("saving");
      const res = await fetch(`/api/codex/connect/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tokens),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.success) {
        setStatus("success");
      } else {
        setError(data?.error || "Could not save the connection. The link may have expired.");
        setStatus("error");
      }
    } catch (err) {
      if (err instanceof CodexDeviceFlowError) {
        setError(
          err.code === "device_disabled"
            ? "Device code login is disabled for this OpenAI account. Enable it in ChatGPT security settings (or ask your workspace admin)."
            : err.code === "timeout"
              ? "Authorization timed out. Click Start again to retry."
              : err.code === "aborted"
                ? "Authentication was cancelled."
                : err.message
        );
      } else {
        setError("Unexpected error during authentication. Please try again.");
      }
      setStatus("error");
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-base px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-border bg-bg-subtle p-8 shadow-sm">
        <div className="mb-6 text-center">
          <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-[28px]">key</span>
          </div>
          <h1 className="text-lg font-semibold text-text-main">Connect OpenAI Codex</h1>
          <p className="mt-1 text-sm text-text-muted">
            Authorize a ChatGPT account to finish setting up this connection.
          </p>
        </div>

        {status === "validating" && (
          <p className="text-center text-sm text-text-muted">Validating link…</p>
        )}

        {status === "ready" && (
          <div className="text-center">
            <p className="mb-4 text-sm text-text-muted">
              Click below to generate a one-time code, then sign in to OpenAI.
            </p>
            <Button onClick={start} icon="login" className="w-full">
              Start
            </Button>
          </div>
        )}

        {status === "starting" && (
          <p className="text-center text-sm text-text-muted">Requesting code from OpenAI…</p>
        )}

        {status === "awaiting" && userCode && (
          <div className="space-y-4">
            <p className="text-sm text-text-muted">
              1. Open the OpenAI verification page and 2. enter this code. This page updates
              automatically once you authorize.
            </p>

            <div className="rounded-lg border border-border bg-bg-base p-3">
              <p className="mb-1 text-xs text-text-muted">Your code</p>
              <div className="flex items-center justify-between gap-2">
                <code className="text-lg font-semibold tracking-widest text-text-main">
                  {userCode.userCode}
                </code>
                <Button
                  size="sm"
                  variant="secondary"
                  icon="content_copy"
                  onClick={() => copy(userCode.userCode, "code")}
                >
                  {copied === "code" ? "Copied" : "Copy"}
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1"
                icon="open_in_new"
                onClick={() => window.open(userCode.verificationUri, "_blank", "noopener")}
              >
                Open verification page
              </Button>
              <Button
                variant="secondary"
                icon="link"
                onClick={() => copy(userCode.verificationUri, "url")}
              >
                {copied === "url" ? "Copied" : "Copy URL"}
              </Button>
            </div>

            <p className="text-center text-xs text-text-muted">Waiting for authorization…</p>
          </div>
        )}

        {status === "saving" && (
          <p className="text-center text-sm text-text-muted">Saving connection…</p>
        )}

        {status === "success" && (
          <div className="text-center">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-green-500">
              <span className="material-symbols-outlined text-[26px]">check_circle</span>
            </div>
            <p className="font-medium text-text-main">Connected!</p>
            <p className="mt-1 text-sm text-text-muted">
              The Codex account was registered. You can close this tab.
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
              <span className="material-symbols-outlined text-[26px]">error</span>
            </div>
            <p className="mb-4 text-sm text-text-muted">{error}</p>
            <Button variant="secondary" icon="refresh" onClick={start} className="w-full">
              Try again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
