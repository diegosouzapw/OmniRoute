"use client";

import { Input } from "@/shared/components";
import type { ProviderMessageTranslator } from "../../providerPageHelpers";

// #9415 — New-API / One-API / Sub2API aggregator balance detection.
// When a compatible provider node has the aggregator flag set, these fields
// capture the console credentials (System Access Token + New-Api-User id)
// and optional quotaPerUnit override. The generalized fetcher
// (open-sse/services/newApiAggregatorQuotaFetcher.ts) reads these from
// providerSpecificData to query the aggregator's /api/user/self endpoint.
export type NewApiAggregatorFieldValues = {
  consoleApiKey: string;
  newApiUserId: string;
  quotaPerUnit: string;
};

type NewApiAggregatorFieldsProps = {
  enabled: boolean;
  values: NewApiAggregatorFieldValues;
  onChange: (patch: Partial<NewApiAggregatorFieldValues>) => void;
  t: ProviderMessageTranslator;
};

export default function NewApiAggregatorFields({
  enabled,
  values,
  onChange,
  t,
}: NewApiAggregatorFieldsProps) {
  if (!enabled) return null;
  return (
    <>
      <Input
        label={t("consoleApiKeyOracleLabel")}
        value={values.consoleApiKey}
        onChange={(e) => onChange({ consoleApiKey: e.target.value })}
        placeholder={t("consoleApiKeyOraclePlaceholder")}
        hint={t("newApiAggregatorConsoleApiKeyHint")}
        type="password"
      />
      <Input
        label={t("newApiUserIdLabel")}
        value={values.newApiUserId}
        onChange={(e) => onChange({ newApiUserId: e.target.value })}
        placeholder={t("newApiUserIdPlaceholder")}
        hint={t("newApiAggregatorUserIdHint")}
      />
      <Input
        label={t("newApiAggregatorQuotaPerUnitLabel")}
        value={values.quotaPerUnit}
        onChange={(e) => onChange({ quotaPerUnit: e.target.value })}
        placeholder="500000"
        hint={t("newApiAggregatorQuotaPerUnitHint")}
        type="number"
      />
    </>
  );
}
