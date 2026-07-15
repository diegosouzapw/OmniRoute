// Pure, shared helpers for provider credential copy (labels/hints/titles for
// the API-key and web-session-credential modals). Extracted out of
// providerPageHelpers.ts (Issue #3501 strangler-fig decomposition) — that leaf
// is frozen at its file-size cap, so this cohesive slice (message-translation
// utility + the 4 web-session-credential text builders) lives here instead and
// is re-exported from providerPageHelpers.ts for backward compatibility. Leaf
// module — imports only from @/shared, @/lib and colocated sibling modules.
import { type WebSessionCredentialRequirement } from "./webSessionCredentials";

export type ProviderMessageTranslator = ((
  key: string,
  values?: Record<string, unknown>
) => string) & {
  has?: (key: string) => boolean;
};

export function providerText(
  t: ProviderMessageTranslator,
  key: string,
  fallback: string,
  values?: Record<string, unknown>
): string {
  if (typeof t.has === "function" && t.has(key)) {
    return t(key, values);
  }
  if (values) {
    return Object.entries(values).reduce(
      (acc, [name, value]) => acc.replaceAll(`{${name}}`, String(value)),
      fallback
    );
  }
  return fallback;
}

export function getWebSessionCredentialLabel(
  t: ProviderMessageTranslator,
  requirement: WebSessionCredentialRequirement,
  optional: boolean
): string {
  if (requirement.kind === "none") {
    return providerText(t, "webNoAuthCredentialLabel", "No credential required");
  }
  const baseLabel =
    requirement.kind === "token"
      ? providerText(t, "webTokenCredentialLabel", "Web session token")
      : t("sessionCookieLabel");
  return optional ? `${baseLabel} (${t("optional").toLowerCase()})` : baseLabel;
}

export function getWebSessionCredentialHint(
  t: ProviderMessageTranslator,
  requirement: WebSessionCredentialRequirement,
  providerName: string,
  editing: boolean
): string | undefined {
  if (requirement.kind === "none") return undefined;

  const values = { provider: providerName, credential: requirement.credentialName };
  if (editing) {
    return requirement.kind === "token"
      ? providerText(
          t,
          "webTokenEditHint",
          "Leave blank to keep the current web session token. Credential: {credential}.",
          values
        )
      : providerText(
          t,
          "webCookieEditHint",
          "Leave blank to keep the current session cookie. Required cookie: {credential}.",
          values
        );
  }

  // #5465 — a provider-specific hint (e.g. t3.chat's step-by-step DevTools copy)
  // replaces the generic one-line cookie/token template when that template is
  // unclear for the provider (t3.chat needs a localStorage value AND the Cookie
  // header, so "Required cookie: convex-session-id + Cookie header…" reads
  // circular). The override key ships translated in every locale.
  if (requirement.hintKey) {
    return providerText(
      t,
      requirement.hintKey,
      requirement.hintFallback ??
        "Open the provider's web session in DevTools, copy the required credential(s), and paste them in the fields below.",
      values
    );
  }

  return requirement.kind === "token"
    ? providerText(
        t,
        "webTokenCredentialHint",
        "Credential: {credential}. Paste the token value from your own signed-in {provider} web session, or a DevTools HAR export if the provider supports it.",
        values
      )
    : providerText(
        t,
        "webCookieCredentialHint",
        "Required cookie: {credential}. Paste the Cookie header value from your own signed-in {provider} web session. Do not include the Cookie: prefix.",
        values
      );
}

export function getWebSessionCredentialCheckLabel(
  t: ProviderMessageTranslator,
  requirement: WebSessionCredentialRequirement
): string {
  if (requirement.kind === "token") return providerText(t, "checkWebToken", "Check token");
  return providerText(t, "checkCookie", "Check cookie");
}

export function getAddCredentialModalTitle(
  t: ProviderMessageTranslator,
  providerName: string,
  requirement: WebSessionCredentialRequirement | null
): string {
  if (!requirement) return t("addProviderApiKeyTitle", { provider: providerName });
  if (requirement.kind === "none") {
    return providerText(t, "addProviderConnectionTitle", "Add {provider} connection", {
      provider: providerName,
    });
  }
  if (requirement.kind === "token") {
    return providerText(t, "addProviderWebTokenTitle", "Add {provider} web token", {
      provider: providerName,
    });
  }
  return providerText(t, "addProviderSessionCookieTitle", "Add {provider} session cookie", {
    provider: providerName,
  });
}
