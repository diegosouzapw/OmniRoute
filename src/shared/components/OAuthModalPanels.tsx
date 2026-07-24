"use client";

import { useTranslations } from "next-intl";

import type { PkceLoopbackMismatchHint } from "@/lib/oauth/utils/pkceLoopbackWarning";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";

import Button from "./Button";
import Input from "./Input";

export function formatDeviceCodeRemaining(seconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safeSeconds / 60);
  return `${minutes}:${String(safeSeconds % 60).padStart(2, "0")}`;
}

type OAuthDeviceCodePanelProps = {
  deviceData: { user_code: string };
  verificationUrl: string;
  secondsRemaining: number | null;
  polling: boolean;
};

export function OAuthDeviceCodePanel({
  deviceData,
  verificationUrl,
  secondsRemaining,
  polling,
}: OAuthDeviceCodePanelProps) {
  const t = useTranslations("oauthModal");
  const { copied, copy } = useCopyToClipboard();

  return (
    <>
      <div className="text-center py-4">
        <p className="text-sm text-text-muted mb-4">{t("deviceCodeVisitUrl")}</p>
        <div className="bg-sidebar p-4 rounded-lg mb-4">
          <p className="text-xs text-text-muted mb-1">{t("deviceCodeVerificationUrl")}</p>
          <div className="flex items-center gap-2">
            <a
              href={verificationUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-sm break-all text-primary hover:underline"
            >
              {verificationUrl}
            </a>
            <Button
              size="sm"
              variant="ghost"
              icon={copied === "verify_url" ? "check" : "content_copy"}
              onClick={() => copy(verificationUrl, "verify_url")}
            />
          </div>
        </div>
        <div className="bg-primary/10 p-4 rounded-lg">
          <p className="text-xs text-text-muted mb-1">{t("deviceCodeYourCode")}</p>
          <div className="flex items-center justify-center gap-2">
            <p className="text-2xl font-mono font-bold text-primary">{deviceData.user_code}</p>
            <Button
              size="sm"
              variant="ghost"
              icon={copied === "user_code" ? "check" : "content_copy"}
              onClick={() => copy(deviceData.user_code, "user_code")}
            />
          </div>
          {secondsRemaining !== null && (
            <div
              className="mt-3 flex items-center justify-center gap-1 text-xs text-text-muted"
              aria-label={t("deviceCodeWaiting")}
            >
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span>{formatDeviceCodeRemaining(secondsRemaining)}</span>
            </div>
          )}
        </div>
      </div>
      {polling && (
        <div className="flex items-center justify-center gap-2 text-sm text-text-muted">
          <span className="material-symbols-outlined animate-spin">progress_activity</span>
          {t("deviceCodeWaiting")}
        </div>
      )}
    </>
  );
}

type OAuthLoopbackMismatchPanelProps = {
  providerName: string;
  hint: PkceLoopbackMismatchHint;
  onClose: () => void;
};

/**
 * Shown instead of the generic red "Connection failed" step when a
 * PKCE_CALLBACK_SERVER_PROVIDERS login is attempted from a LAN IP (#8046).
 *
 * The flow is not retryable from here — retrying the same origin fails the same
 * way — so the panel spends its space on the diagnosis and the copy-pasteable
 * fix instead of offering a "Try again" button.
 */
export function OAuthLoopbackMismatchPanel({
  providerName,
  hint,
  onClose,
}: OAuthLoopbackMismatchPanelProps) {
  const t = useTranslations("oauthModal");
  const { copied, copy } = useCopyToClipboard();

  const steps = [
    {
      key: "cmd",
      body: t("loopbackMismatchStep1"),
      value: hint.tunnelCommand,
      copyId: "tunnel_cmd",
      // "<user>" is passed as a VALUE, never inlined into the catalog: next-intl
      // parses angle brackets in a message as rich-text tags and would throw.
      note: t("loopbackMismatchStep1Note", { userPlaceholder: "<user>" }),
    },
    {
      key: "url",
      body: t("loopbackMismatchStep2"),
      value: hint.localDashboardUrl,
      copyId: "local_url",
      note: null,
    },
    {
      key: "retry",
      body: t("loopbackMismatchStep3", { providerName }),
      value: null,
      copyId: null,
      note: null,
    },
  ];

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="size-10 shrink-0 rounded-full bg-amber-500/15 flex items-center justify-center">
            <span className="material-symbols-outlined text-xl text-amber-500">lan</span>
          </div>
          <div>
            <h3 className="text-base font-semibold">{t("loopbackMismatchTitle")}</h3>
            <p className="text-xs text-text-muted mt-0.5 font-mono">
              {hint.dashboardHost}:{hint.dashboardPort}
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-500 mb-1">
            {t("loopbackMismatchWhatHappened")}
          </p>
          <p className="text-sm text-text-muted">
            {t.rich("loopbackMismatchExplanation", {
              providerName,
              redirectUri: hint.redirectUri,
              code: (chunks) => <code className="font-mono text-xs">{chunks}</code>,
            })}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">{t("loopbackMismatchHowToFix")}</p>
          <ol className="space-y-3">
            {steps.map((step, index) => (
              <li key={step.key} className="flex gap-3">
                <span className="size-5 shrink-0 mt-0.5 rounded-full bg-primary/15 text-primary text-xs font-semibold flex items-center justify-center">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{step.body}</p>
                  {step.value && (
                    <div className="flex gap-2 mt-1.5">
                      <Input value={step.value} readOnly className="flex-1 font-mono text-xs" />
                      <Button
                        variant="secondary"
                        icon={copied === step.copyId ? "check" : "content_copy"}
                        onClick={() => copy(step.value as string, step.copyId as string)}
                      >
                        {t("copy")}
                      </Button>
                    </div>
                  )}
                  {step.note && <p className="text-xs text-text-muted mt-1">{step.note}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="text-xs text-text-muted">{t("loopbackMismatchAlternative")}</p>
      </div>
      <div className="flex gap-2">
        <Button onClick={onClose} variant="secondary" fullWidth>
          {t("cancel")}
        </Button>
      </div>
    </>
  );
}

function OAuthRemoteAccessNotices({
  isGoogleOAuth,
  isTrueLocalhost,
}: {
  isGoogleOAuth: boolean;
  isTrueLocalhost: boolean;
}) {
  const t = useTranslations("oauthModal");
  if (isTrueLocalhost) return null;

  return (
    <>
      {isGoogleOAuth && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">
          <span className="material-symbols-outlined text-sm align-middle mr-1">warning</span>
          <strong>
            {t.rich("googleOAuthWarning", {
              code: (chunks) => <code className="font-mono">{chunks}</code>,
              a: (chunks) => (
                <a
                  href="https://github.com/diegosouzapw/OmniRoute#oauth-on-a-remote-server"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  {chunks}
                </a>
              ),
            })}
          </strong>
        </div>
      )}
      <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-3 text-xs text-blue-200">
        <span className="material-symbols-outlined text-sm align-middle mr-1">info</span>
        {t("remoteAccessInfo")}
      </div>
    </>
  );
}

type OAuthManualInputPanelProps = {
  provider: string;
  isGoogleOAuth: boolean;
  isTrueLocalhost: boolean;
  authUrl: string;
  callbackUrl: string;
  placeholderUrl: string;
  canSubmit: boolean;
  onCallbackUrlChange: (value: string) => void;
  onSubmit: () => void | Promise<void>;
  onClose: () => void;
};

export function OAuthManualInputPanel({
  provider,
  isGoogleOAuth,
  isTrueLocalhost,
  authUrl,
  callbackUrl,
  placeholderUrl,
  canSubmit,
  onCallbackUrlChange,
  onSubmit,
  onClose,
}: OAuthManualInputPanelProps) {
  const t = useTranslations("oauthModal");
  const { copied, copy } = useCopyToClipboard();

  return (
    <>
      <div className="space-y-4">
        <OAuthRemoteAccessNotices isGoogleOAuth={isGoogleOAuth} isTrueLocalhost={isTrueLocalhost} />
        <div>
          <p className="text-sm font-medium mb-2">{t("step1OpenUrl")}</p>
          <div className="flex gap-2">
            <Input value={authUrl} readOnly className="flex-1 font-mono text-xs" />
            <Button
              variant="secondary"
              icon={copied === "auth_url" ? "check" : "content_copy"}
              onClick={() => copy(authUrl, "auth_url")}
            >
              {t("copy")}
            </Button>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium mb-2">{t("step2PasteCallback")}</p>
          <p className="text-xs text-text-muted mb-2">
            {t.rich("step2Hint", {
              code: (chunks) => <code className="font-mono">{chunks}</code>,
            })}
          </p>
          <Input
            value={callbackUrl}
            onChange={(event) => onCallbackUrlChange(event.target.value)}
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
        <Button onClick={onSubmit} fullWidth disabled={!canSubmit}>
          {t("connect")}
        </Button>
        <Button onClick={onClose} variant="ghost" fullWidth>
          {t("cancel")}
        </Button>
      </div>
    </>
  );
}
