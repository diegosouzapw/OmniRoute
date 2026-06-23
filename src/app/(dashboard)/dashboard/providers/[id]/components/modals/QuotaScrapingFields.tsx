"use client";

import { Input } from "@/shared/components";
import { providerText, type ProviderMessageTranslator } from "../../providerPageHelpers";

export type QuotaScrapingFieldValues = {
  opencodeGoWorkspaceId: string;
  opencodeGoAuthCookie: string;
  ollamaCloudUsageCookie: string;
};

export const EMPTY_QUOTA_SCRAPING_FIELDS: QuotaScrapingFieldValues = {
  opencodeGoWorkspaceId: "",
  opencodeGoAuthCookie: "",
  ollamaCloudUsageCookie: "",
};

export function assignQuotaScrapingProviderData(
  provider: string | undefined,
  values: QuotaScrapingFieldValues,
  target: Record<string, unknown>
) {
  if (provider === "opencode-go") {
    target.opencodeGoWorkspaceId = values.opencodeGoWorkspaceId.trim() || undefined;
    if (values.opencodeGoAuthCookie.trim()) {
      target.opencodeGoAuthCookie = values.opencodeGoAuthCookie.trim();
    }
  } else if (provider === "ollama-cloud" && values.ollamaCloudUsageCookie.trim()) {
    target.ollamaCloudUsageCookie = values.ollamaCloudUsageCookie.trim();
  }
}

type QuotaScrapingFieldsProps = {
  provider?: string;
  values: QuotaScrapingFieldValues;
  onChange: (patch: Partial<QuotaScrapingFieldValues>) => void;
  t: ProviderMessageTranslator;
  editMode?: boolean;
};

export default function QuotaScrapingFields({
  provider,
  values,
  onChange,
  t,
  editMode = false,
}: QuotaScrapingFieldsProps) {
  if (provider === "opencode-go") {
    return (
      <div className="flex flex-col gap-3 rounded-lg border border-border/50 bg-surface/20 p-4">
        <Input
          label={providerText(t, "opencodeGoWorkspaceIdLabel", "OpenCode Go workspace ID")}
          name="opencodeGoWorkspaceId"
          value={values.opencodeGoWorkspaceId}
          onChange={(e) => onChange({ opencodeGoWorkspaceId: e.target.value })}
          placeholder="workspace_..."
          hint={providerText(
            t,
            "opencodeGoWorkspaceIdHint",
            "Required for quota scraping. Copy it from the OpenCode Go workspace URL."
          )}
          autoComplete="off"
          spellCheck={false}
        />
        <Input
          label={providerText(t, "opencodeGoAuthCookieLabel", "OpenCode Go auth cookie")}
          name="opencodeGoAuthCookie"
          type="password"
          value={values.opencodeGoAuthCookie}
          onChange={(e) => onChange({ opencodeGoAuthCookie: e.target.value })}
          placeholder="auth=..."
          hint={providerText(
            t,
            "opencodeGoAuthCookieHint",
            editMode
              ? "Leave blank to keep the stored cookie. Paste auth=... or only the cookie value to replace it."
              : "Paste the auth cookie value from opencode.ai. The auth= prefix is accepted."
          )}
          autoComplete="off"
          spellCheck={false}
          autoCapitalize="off"
        />
      </div>
    );
  }

  if (provider === "ollama-cloud") {
    return (
      <div className="flex flex-col gap-3 rounded-lg border border-border/50 bg-surface/20 p-4">
        <Input
          label={providerText(t, "ollamaCloudUsageCookieLabel", "Ollama Cloud usage cookie")}
          name="ollamaCloudUsageCookie"
          type="password"
          value={values.ollamaCloudUsageCookie}
          onChange={(e) => onChange({ ollamaCloudUsageCookie: e.target.value })}
          placeholder="__Secure-session=..."
          hint={providerText(
            t,
            "ollamaCloudUsageCookieHint",
            editMode
              ? "Leave blank to keep the stored cookie. Paste the __Secure-session cookie value from ollama.com/settings to replace it."
              : "Required for quota scraping. Paste the __Secure-session cookie value from ollama.com/settings."
          )}
          autoComplete="off"
          spellCheck={false}
          autoCapitalize="off"
        />
      </div>
    );
  }

  return null;
}
