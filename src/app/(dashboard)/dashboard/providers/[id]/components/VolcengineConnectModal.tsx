"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Input, Modal } from "@/shared/components";
import { providerText, type ProviderMessageTranslator } from "../providerPageHelpers";
import { extractErrorMessage } from "@/shared/utils/upstreamError";

/**
 * VolcengineConnectModal — phone/SMS-code login for the Volcano Engine console.
 *
 * Drives the session-based auto login API:
 *   POST /api/providers/volcengine-plan/connect                    {phone}
 *   POST /api/providers/volcengine-plan/connect/{id}/code          {code, captcha?}
 *   GET  /api/providers/volcengine-plan/connect/{id}/status
 *   POST /api/providers/volcengine-plan/connect/{id}/resend
 *   POST /api/providers/volcengine-plan/connect/{id}/cancel
 *
 * Falls back to the legacy manual headful-browser flow (same POST /connect
 * endpoint without a phone) when risk control or a layout change degrades
 * the headless session.
 */

type SessionPhase =
  | "starting"
  | "sending_code"
  | "waiting_code"
  | "captcha_required"
  | "submitting"
  | "mfa_waiting"
  | "identity_required"
  | "success"
  | "error"
  | "timeout"
  | "cancelled"
  | "fallback_manual";

interface SessionView {
  sessionId: string;
  phase: SessionPhase;
  phoneMasked: string;
  error: string | null;
  captchaImage: string | null;
  resendAvailableAt: number;
  mfaRequired?: boolean;
  identityOptions?: Array<{ index: number; label: string }>;
  binding?: {
    results?: Array<{
      plan: string;
      available: boolean;
      ok: boolean;
      error?: string | null;
    }>;
    error?: string;
  };
}

const PHONE_STORAGE_KEY = "omniroute.volcengine.phone";
const TERMINAL_PHASES: SessionPhase[] = [
  "success",
  "error",
  "timeout",
  "cancelled",
  "fallback_manual",
];

function isTerminal(phase: SessionPhase | undefined): boolean {
  return !!phase && TERMINAL_PHASES.includes(phase);
}

function extractModalError(data: unknown, fallback: string): string {
  const record = data && typeof data === "object" ? (data as Record<string, unknown>) : null;
  return (
    extractErrorMessage(record?.error) ||
    (typeof record?.error === "string" ? record.error : null) ||
    (typeof record?.message === "string" ? record.message : null) ||
    fallback
  );
}

type VolcengineConnectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  /** Legacy headful-browser login (opens on the server machine) */
  onFallbackManual: () => void;
  /** Refresh connections after a successful bind */
  onConnected: () => void | Promise<void>;
  notify: {
    success: (message: string, title?: string) => void;
    error: (message: string, title?: string) => void;
  };
  t: ProviderMessageTranslator;
};

export default function VolcengineConnectModal({
  isOpen,
  onClose,
  onFallbackManual,
  onConnected,
  notify,
  t,
}: VolcengineConnectModalProps) {
  // Prefilled from the last successful login via a lazy initializer — reading
  // localStorage inside the open effect required a synchronous setState there.
  const [phone, setPhone] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      return localStorage.getItem(PHONE_STORAGE_KEY) ?? "";
    } catch {
      return "";
    }
  });
  const [code, setCode] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [session, setSession] = useState<SessionView | null>(null);
  const [starting, setStarting] = useState(false);
  const [submittingCode, setSubmittingCode] = useState(false);
  const [resending, setResending] = useState(false);
  const [selectingIdentity, setSelectingIdentity] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  const pollTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  // Latest session, mirrored for the close/unmount cleanup below — that effect
  // only depends on isOpen, so reading the state directly would be stale.
  const sessionRef = useRef<SessionView | null>(null);
  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  // ── lifecycle ────────────────────────────────────────────────────────────

  const stopTimers = useCallback(() => {
    if (pollTimer.current) {
      clearInterval(pollTimer.current);
      pollTimer.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    stopTimers();
    setSession(null);
    setCode("");
    setCaptcha("");
    setResendCountdown(0);
  }, [stopTimers]);

  // Leaving the modal cancels an in-flight session server-side and stops
  // polling. Runs as the cleanup of this open-scoped effect (no setState here).
  useEffect(() => {
    if (!isOpen) return;
    return () => {
      const current = sessionRef.current;
      const active = current && !isTerminal(current.phase) ? current : null;
      if (active) {
        void fetch(`/api/providers/volcengine-plan/connect/${active.sessionId}/cancel`, {
          method: "POST",
        }).catch(() => {});
      }
      stopTimers();
    };
  }, [isOpen, stopTimers]);

  // Local state reset on close — a render-phase adjustment guarded by the
  // previous isOpen value (react.dev "adjusting state when a prop changes")
  // instead of a synchronous setState inside an effect.
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) {
      setSession(null);
      setCode("");
      setCaptcha("");
      setResendCountdown(0);
    }
  }

  useEffect(() => stopTimers, [stopTimers]);

  // resend countdown ticker
  const resendAvailableAt = session?.resendAvailableAt ?? 0;
  const sessionId = session?.sessionId;
  const sessionPhase = session?.phase;
  useEffect(() => {
    if (!sessionId || isTerminal(sessionPhase)) return;
    const tick = () => {
      setResendCountdown(Math.max(0, Math.ceil((resendAvailableAt - Date.now()) / 1000)));
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [sessionId, sessionPhase, resendAvailableAt]);

  // ── status polling ──────────────────────────────────────────────────────

  const startPolling = useCallback(
    (sessionId: string) => {
      stopTimers();
      pollTimer.current = setInterval(async () => {
        try {
          const response = await fetch(
            `/api/providers/volcengine-plan/connect/${sessionId}/status`
          );
          const data = await response.json().catch(() => ({}));
          if (data?.session) {
            setSession((prev) => (prev ? { ...prev, ...data.session } : data.session));
            if (isTerminal(data.session.phase)) {
              stopTimers();
              if (data.session.phase === "success") void onConnected();
            }
          }
        } catch {
          // transient network error — keep polling until phase resolves
        }
      }, 1500);
    },
    [stopTimers, onConnected]
  );

  // ── actions ─────────────────────────────────────────────────────────────

  const handleStart = useCallback(async () => {
    const trimmed = phone.trim();
    if (!trimmed) return;
    setStarting(true);
    try {
      const response = await fetch("/api/providers/volcengine-plan/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: trimmed }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.success || !data?.session) {
        throw new Error(extractModalError(data, "Failed to start Volcano login"));
      }
      setSession(data.session);
      setResendCountdown(
        Math.max(0, Math.ceil((data.session.resendAvailableAt - Date.now()) / 1000))
      );
      localStorage.setItem(PHONE_STORAGE_KEY, trimmed);
      if (data.session.phase === "starting" || data.session.phase === "sending_code") {
        startPolling(data.session.sessionId);
      }
    } catch (error) {
      notify.error(error instanceof Error ? error.message : "Failed to start Volcano login");
    } finally {
      setStarting(false);
    }
  }, [phone, notify, startPolling]);

  const handleSubmitCode = useCallback(async () => {
    if (!session) return;
    setSubmittingCode(true);
    try {
      const payload: { code: string; captcha?: string } = { code: code.trim() };
      if (session.phase === "captcha_required" && captcha.trim()) {
        payload.captcha = captcha.trim();
      }
      const response = await fetch(
        `/api/providers/volcengine-plan/connect/${session.sessionId}/code`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json().catch(() => ({}));
      if (data?.session) {
        setSession((prev) => (prev ? { ...prev, ...data.session } : data.session));
        if (data.session.phase === "mfa_waiting") {
          // A NEW code is required for the MFA step — clear the stale input.
          setCode("");
          setCaptcha("");
        }
        if (
          data.session.phase === "starting" ||
          data.session.phase === "sending_code" ||
          data.session.phase === "submitting"
        ) {
          startPolling(data.session.sessionId);
        } else if (data.session.phase === "success") {
          void onConnected();
        }
      } else {
        throw new Error(extractModalError(data, "Failed to submit verification code"));
      }
    } catch (error) {
      notify.error(error instanceof Error ? error.message : "Failed to submit verification code");
    } finally {
      setSubmittingCode(false);
    }
  }, [session, code, captcha, notify, startPolling, onConnected]);

  const handleSelectIdentity = useCallback(
    async (index: number) => {
      if (!session) return;
      setSelectingIdentity(true);
      try {
        const response = await fetch(
          `/api/providers/volcengine-plan/connect/${session.sessionId}/identity`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ index }),
          }
        );
        const data = await response.json().catch(() => ({}));
        if (data?.session) {
          setSession((prev) => (prev ? { ...prev, ...data.session } : data.session));
          if (
            data.session.phase === "starting" ||
            data.session.phase === "sending_code" ||
            data.session.phase === "submitting"
          ) {
            startPolling(data.session.sessionId);
          } else if (data.session.phase === "success") {
            void onConnected();
          }
        } else {
          throw new Error(data?.error || "Failed to select identity");
        }
      } catch (error) {
        notify.error(error instanceof Error ? error.message : "Failed to select identity");
      } finally {
        setSelectingIdentity(false);
      }
    },
    [session, notify, startPolling, onConnected]
  );

  const handleResend = useCallback(async () => {
    if (!session || resendCountdown > 0) return;
    setResending(true);
    try {
      const response = await fetch(
        `/api/providers/volcengine-plan/connect/${session.sessionId}/resend`,
        { method: "POST" }
      );
      const data = await response.json().catch(() => ({}));
      if (data?.session) {
        setSession((prev) => (prev ? { ...prev, ...data.session } : data.session));
        setResendCountdown(
          Math.max(0, Math.ceil((data.session.resendAvailableAt - Date.now()) / 1000))
        );
        setCode("");
        setCaptcha("");
      }
    } catch {
      notify.error("Failed to resend verification code");
    } finally {
      setResending(false);
    }
  }, [session, resendCountdown, notify]);

  const handleCancelSession = useCallback(async () => {
    if (!session) return;
    try {
      await fetch(`/api/providers/volcengine-plan/connect/${session.sessionId}/cancel`, {
        method: "POST",
      });
    } catch {
      // best-effort
    }
    reset();
  }, [session, reset]);

  // ── derived UI state ────────────────────────────────────────────────────

  const phase = session?.phase;
  const showPhoneStep = !session;
  const showCodeStep =
    phase === "waiting_code" ||
    phase === "captcha_required" ||
    phase === "mfa_waiting" ||
    phase === "identity_required";
  const showPolling = phase === "starting" || phase === "sending_code" || phase === "submitting";
  const done = isTerminal(phase);
  const mfaStep = phase === "mfa_waiting";

  const bindingResults = session?.binding?.results || [];
  const connectedPlans = bindingResults.filter((r) => r?.ok);
  const bindingError = session?.binding?.error;

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // ── render ──────────────────────────────────────────────────────────────

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={providerText(t, "connectVolcengineAccount", "Connect Volcano Account")}
      size="md"
    >
      <div className="space-y-4">
        {showPhoneStep && (
          <>
            <p className="text-sm text-text-muted">
              {providerText(
                t,
                "volcAutoLoginDesc",
                "Enter your phone number. OmniRoute sends a verification code via the Volcano Engine console and extracts the session cookies automatically — no browser interaction needed."
              )}
            </p>
            <Input
              label={providerText(t, "volcPhoneLabel", "Phone number")}
              placeholder="13800000000"
              value={phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") void handleStart();
              }}
              inputMode="numeric"
            />
            <div className="flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={handleClose}>
                {providerText(t, "cancel", "Cancel")}
              </Button>
              <Button size="sm" loading={starting} disabled={!phone.trim()} onClick={handleStart}>
                {providerText(t, "volcSendCode", "Send verification code")}
              </Button>
            </div>
          </>
        )}

        {showCodeStep && (
          <>
            <p className="text-sm text-text-muted">
              {mfaStep
                ? providerText(
                    t,
                    "volcMfaDesc",
                    "Additional verification required (MFA). A NEW 6-digit code was sent to {phone} — enter it below to finish login.",
                    { phone: session?.phoneMasked || "your phone" }
                  )
                : phase === "identity_required"
                  ? providerText(
                      t,
                      "volcIdentityDesc",
                      "Your phone number is linked to multiple Volcano Engine identities. Pick the one you want to log in with:"
                    )
                  : providerText(
                      t,
                      "volcCodeSent",
                      "A verification code was sent to {phone}. Enter it below to finish login.",
                      { phone: session?.phoneMasked || "your phone" }
                    )}
            </p>

            {phase === "identity_required" && session?.identityOptions?.length ? (
              <div className="space-y-2">
                {session.identityOptions.map((option) => (
                  <button
                    key={option.index}
                    type="button"
                    disabled={selectingIdentity}
                    onClick={() => handleSelectIdentity(option.index)}
                    className="w-full rounded-lg border border-border p-3 text-left text-sm transition-colors hover:bg-sidebar disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {selectingIdentity ? (
                      <span className="flex items-center gap-2">
                        <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        {option.label}
                      </span>
                    ) : (
                      option.label
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <>
                {phase === "captcha_required" && session?.captchaImage && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      {providerText(
                        t,
                        "volcCaptchaLabel",
                        "Image captcha (required by the console)"
                      )}
                    </p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={session.captchaImage}
                      alt="captcha"
                      className="max-h-40 rounded border border-border"
                    />
                    <Input
                      placeholder={providerText(t, "volcCaptchaPlaceholder", "Captcha characters")}
                      value={captcha}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCaptcha(e.target.value)
                      }
                    />
                  </div>
                )}

                <Input
                  label={
                    mfaStep
                      ? providerText(t, "volcMfaCodeLabel", "MFA verification code")
                      : providerText(t, "volcCodeLabel", "Verification code")
                  }
                  placeholder="123456"
                  value={code}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") void handleSubmitCode();
                  }}
                  inputMode="numeric"
                  maxLength={6}
                />

                {session?.error && <p className="text-sm text-red-500">{session.error}</p>}

                <div className="flex items-center justify-between">
                  <Button
                    variant="secondary"
                    size="sm"
                    loading={resending}
                    disabled={resendCountdown > 0}
                    onClick={handleResend}
                  >
                    {resendCountdown > 0
                      ? providerText(t, "volcResendIn", "Resend in {s}s", { s: resendCountdown })
                      : providerText(t, "volcResend", "Resend code")}
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" onClick={handleCancelSession}>
                      {providerText(t, "back", "Back")}
                    </Button>
                    <Button
                      size="sm"
                      loading={submittingCode}
                      disabled={code.trim().length < 4}
                      onClick={handleSubmitCode}
                    >
                      {providerText(t, "volcLogin", "Log in")}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {showPolling && (
          <div className="flex items-center gap-3 py-2">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-sm text-text-muted">
              {phase === "submitting"
                ? providerText(
                    t,
                    "volcSubmitting",
                    "Submitting code and extracting console cookies..."
                  )
                : providerText(t, "volcStarting", "Starting Volcano login...")}
            </p>
          </div>
        )}

        {done && phase === "success" && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-green-600">
              {providerText(t, "volcLoginSuccess", "Logged in to the Volcano Engine console")}
            </p>
            {bindingError ? (
              <p className="text-sm text-red-500">
                {providerText(t, "volcBindError", "Plan binding failed: {error}", {
                  error: bindingError,
                })}
              </p>
            ) : (
              <div className="space-y-1 text-sm">
                {connectedPlans.length > 0 ? (
                  connectedPlans.map((item) => (
                    <p key={item.plan} className="text-green-600">
                      ✓ {item.plan} plan connected
                    </p>
                  ))
                ) : (
                  <p className="text-text-muted">
                    {providerText(
                      t,
                      "volcNoPlans",
                      "No Agent/Coding plans were detected on this account."
                    )}
                  </p>
                )}
              </div>
            )}
            <div className="flex justify-end">
              <Button size="sm" onClick={handleClose}>
                {providerText(t, "done", "Done")}
              </Button>
            </div>
          </div>
        )}

        {done && phase !== "success" && (
          <div className="space-y-3">
            <p className="text-sm text-red-500">
              {session?.error ||
                (phase === "timeout"
                  ? providerText(t, "volcTimeout", "Login timed out")
                  : phase === "cancelled"
                    ? providerText(t, "volcCancelled", "Login cancelled")
                    : providerText(t, "volcFailed", "Login failed"))}
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={reset}>
                {providerText(t, "retry", "Retry")}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  onClose();
                  onFallbackManual();
                }}
              >
                {providerText(t, "volcManualLogin", "Manual browser login")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
