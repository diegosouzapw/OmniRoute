"use client";

import { useTranslations } from "next-intl";
import type { ApiKeyDetailsData, DetailsLoadError } from "../useApiKeyDetails";
import { AccountQuotasSection } from "./AccountQuotasSection";
import { KeyQuotaEditor } from "./KeyQuotaEditor";
import { LimitsSection } from "./LimitsSection";
import { SelfServiceSettingsCard } from "./SelfServiceSettingsCard";
import { TokenLimitsEditor } from "./TokenLimitsEditor";
import { UsageLimitCard } from "./UsageLimitCard";
import { UsageSummarySection } from "./UsageSummarySection";
import { VisibilityControls } from "./VisibilityControls";

export type SavedSection = "visibility" | "selfService" | "usageLimit" | "keyQuota" | "tokenLimits";

/** Everything below the header once the page has successfully loaded data at least once. */
export function ApiKeyDetailsContent({
  keyId,
  data,
  error,
  savedSection,
  onSaved,
}: {
  keyId: string;
  data: ApiKeyDetailsData;
  error: DetailsLoadError | null;
  savedSection: SavedSection | null;
  onSaved: (section: SavedSection) => () => Promise<void>;
}) {
  const t = useTranslations("apiKeyDetails");
  const view = data.view;

  return (
    <>
      {error && (
        <p
          role="alert"
          className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-xs text-amber-700 dark:text-amber-300"
        >
          {t("refreshFailed")}
        </p>
      )}
      <UsageSummarySection daily={view.usage.daily} weekly={view.usage.weekly} />
      <LimitsSection limits={view.limits} />
      <AccountQuotasSection
        quotas={view.accountQuotas}
        visibleToKeyHolder={view.visibility.accountQuota}
      />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <VisibilityControls
          keyId={keyId}
          keyConfig={data.keyConfig}
          visibility={view.visibility}
          saved={savedSection === "visibility"}
          onSaved={onSaved("visibility")}
        />
        <SelfServiceSettingsCard
          keyId={keyId}
          settings={view.settings}
          availableProviders={view.availableProviders}
          saved={savedSection === "selfService"}
          onSaved={onSaved("selfService")}
        />
        <UsageLimitCard
          key={`usage:${data.keyConfig?.usageLimitEnabled}:${data.keyConfig?.dailyUsageLimitUsd}:${data.keyConfig?.weeklyUsageLimitUsd}`}
          keyId={keyId}
          keyConfig={data.keyConfig}
          saved={savedSection === "usageLimit"}
          onSaved={onSaved("usageLimit")}
        />
        <KeyQuotaEditor
          key={`quota:${data.keyQuota?.tpmLimit}:${data.keyQuota?.rpmLimit}:${data.keyQuota?.monthlyAmountUsd}`}
          keyId={keyId}
          quota={data.keyQuota}
          saved={savedSection === "keyQuota"}
          onSaved={onSaved("keyQuota")}
        />
      </div>
      <TokenLimitsEditor
        keyId={keyId}
        limits={data.tokenLimits}
        providers={view.availableProviders.map((option) => option.provider)}
        saved={savedSection === "tokenLimits"}
        onSaved={onSaved("tokenLimits")}
      />
    </>
  );
}
