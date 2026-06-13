"use client";

// Issue #3501 Phase 1c — extracted from the god-component.
// Shared by AddApiKeyModal and EditConnectionModal; imports only leaf modules
// (no cycle risk).

import type { WebSessionCredentialRequirement } from "../webSessionCredentials";
import { providerText, type ProviderMessageTranslator } from "../providerPageHelpers";

export interface WebSessionCredentialGuideProps {
  requirement: WebSessionCredentialRequirement;
  providerName: string;
  t: ProviderMessageTranslator;
}

export default function WebSessionCredentialGuide({
  requirement,
  providerName,
  t,
}: WebSessionCredentialGuideProps) {
  if (requirement.kind === "none") {
    return (
      <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-3 py-3 text-sm text-text-muted">
        <div className="flex items-start gap-2">
          <span className="material-symbols-outlined mt-0.5 text-[18px] text-emerald-500">
            check_circle
          </span>
          <div>
            <p className="font-medium text-text-main">
              {providerText(t, "webNoAuthGuideTitle", "No credential required")}
            </p>
            <p className="mt-1">
              {providerText(
                t,
                "webNoAuthGuideBody",
                "{provider} does not need an API key or cookie. Save the connection to use its free web endpoint.",
                { provider: providerName }
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const requiredCredentialKey =
    requirement.kind === "token" ? "webTokenRequiredCredential" : "webCookieRequiredCredential";
  const requiredCredentialFallback =
    requirement.kind === "token" ? "Required token: {credential}" : "Required cookie: {credential}";

  return (
    <div className="rounded-lg border border-purple-500/25 bg-purple-500/10 px-3 py-3 text-sm text-text-muted">
      <div className="flex items-start gap-2">
        <span className="material-symbols-outlined mt-0.5 text-[18px] text-purple-500">cookie</span>
        <div className="space-y-2">
          <div>
            <p className="font-medium text-text-main">
              {providerText(t, "webSessionGuideTitle", "How to get the session credential")}
            </p>
            <p className="mt-1">
              {providerText(
                t,
                "webSessionGuideIntro",
                "{provider} uses a browser web session instead of an API key.",
                { provider: providerName }
              )}
            </p>
          </div>
          <p className="font-medium text-text-main">
            {providerText(t, requiredCredentialKey, requiredCredentialFallback, {
              credential: requirement.credentialName,
            })}
          </p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>
              {providerText(t, "webSessionGuideStep1", "Sign in to {provider} in your browser.", {
                provider: providerName,
              })}
            </li>
            <li>
              {providerText(
                t,
                "webSessionGuideStep2",
                "Open the browser developer tools and inspect a request made by the web app."
              )}
            </li>
            <li>
              {providerText(
                t,
                "webSessionGuideStep3",
                "Copy the required credential from the provider's own domain. For cookies, copy only the Cookie header value and omit Cookie:.",
                { credential: requirement.credentialName }
              )}
            </li>
            <li>
              {providerText(
                t,
                "webSessionGuideStep4",
                "Paste it here and check the connection. If it stops working, sign in again and replace it with a fresh value."
              )}
            </li>
          </ol>
          <p className="text-xs text-amber-700 dark:text-amber-300">
            {providerText(
              t,
              "webSessionSecurityHint",
              "Treat this like a password: it may access your signed-in web account until it expires or is revoked."
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
