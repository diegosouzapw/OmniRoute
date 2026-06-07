"use client";

import { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { copyToClipboard } from "@/shared/utils/clipboard";

type KiroSocialOAuthModalProps = {
  isOpen: boolean;
  provider: "google" | "github";
  targetProvider?: string;
  providerLabel?: string;
  onSuccess?: () => void;
  onClose: () => void;
};

export default function KiroSocialOAuthModal({
  isOpen,
  provider,
  targetProvider,
  providerLabel = "Kiro",
  onSuccess,
  onClose,
}: KiroSocialOAuthModalProps) {
  const [step, setStep] = useState<"loading" | "polling" | "success" | "error">("loading");
  const [error, setError] = useState<string | null>(null);
  const [userCode, setUserCode] = useState("");
  const [authUrl, setAuthUrl] = useState("");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isOpen || !provider) return;

    const initAuth = async () => {
      try {
        setError(null);
        setStep("loading");

        const res = await fetch(`/api/oauth/kiro/social-authorize?provider=${provider}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to start authorization");
        }

        setUserCode(data.userCode || "");
        setAuthUrl(data.authUrl || "");
        setStep("polling");

        const interval = (data.interval || 5) * 1000;
        pollRef.current = setInterval(async () => {
          try {
            const pollRes = await fetch("/api/oauth/kiro/social-exchange", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ deviceCode: data.deviceCode, provider, targetProvider }),
            });
            const pollData = await pollRes.json();

            if (pollData.success) {
              if (pollRef.current) clearInterval(pollRef.current);
              pollRef.current = null;
              setStep("success");
              onSuccess?.();
            }
          } catch {
            // Network error, keep polling
          }
        }, interval);
      } catch (err: any) {
        setError(err.message);
        setStep("error");
      }
    };

    initAuth();

    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [isOpen, provider]);

  const handleClose = () => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
    onClose();
  };

  const providerName = provider === "google" ? "Google" : "GitHub";

  return (
    <Modal
      isOpen={isOpen}
      title={`Connect ${providerLabel} via ${providerName}`}
      onClose={handleClose}
      size="lg"
    >
      <div className="flex flex-col gap-4">
        {step === "loading" && (
          <div className="text-center py-6">
            <div className="size-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-primary animate-spin">
                progress_activity
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Initializing...</h3>
            <p className="text-sm text-text-muted">Setting up {providerName} authentication</p>
          </div>
        )}

        {step === "polling" && (
          <div className="text-center py-6">
            <div className="size-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-primary animate-pulse">
                open_in_browser
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Open this link in an Incognito window</h3>
            <p className="text-sm text-text-muted mb-3">
              Use an Incognito/Private window to avoid session conflicts with existing accounts.
            </p>
            {authUrl && (
              <div className="mb-4">
                <div className="flex items-center gap-2 justify-center">
                  <a
                    href={authUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-primary underline break-all max-w-md inline-block"
                  >
                    {authUrl.length > 80 ? authUrl.slice(0, 80) + "..." : authUrl}
                  </a>
                  <button
                    onClick={() => copyToClipboard(authUrl)}
                    className="shrink-0 p-1 rounded hover:bg-sidebar"
                    title="Copy link"
                  >
                    <span className="material-symbols-outlined text-base">content_copy</span>
                  </button>
                </div>
              </div>
            )}
            {userCode && (
              <div className="mb-4">
                <p className="text-xs text-text-muted mb-1">Verification code</p>
                <p className="font-mono text-2xl font-bold tracking-widest">{userCode}</p>
              </div>
            )}
            <div className="flex items-center justify-center gap-2 text-sm text-text-muted">
              <span className="material-symbols-outlined text-base animate-spin">
                progress_activity
              </span>
              Waiting for authorization...
            </div>
            <div className="mt-6">
              <Button onClick={handleClose} variant="ghost" fullWidth>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="text-center py-6">
            <div className="size-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-green-600">
                check_circle
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Connected Successfully!</h3>
            <p className="text-sm text-text-muted mb-4">
              Your {providerLabel} account via {providerName} has been connected.
            </p>
            <Button onClick={handleClose} fullWidth>
              Done
            </Button>
          </div>
        )}

        {step === "error" && (
          <div className="text-center py-6">
            <div className="size-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-red-600">error</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Connection Failed</h3>
            <p className="text-sm text-red-600 mb-4">{error}</p>
            <div className="flex gap-2">
              <Button onClick={handleClose} variant="ghost" fullWidth>
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
