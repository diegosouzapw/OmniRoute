"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { BATCH_SUPPORTED_PROVIDERS, SUPPORTED_BATCH_ENDPOINTS } from "@/lib/batches/types";
import type { WizardDestination } from "@/lib/batches/types";

interface AvailableProvider {
  id: string;
  name: string;
  models: string[];
}

interface DestinationStepProps {
  destination: WizardDestination | null;
  onChange: (destination: WizardDestination | null) => void;
  availableProviders: AvailableProvider[];
}

export default function DestinationStep({
  destination,
  onChange,
  availableProviders,
}: DestinationStepProps) {
  const t = useTranslations("common");

  // Filter providers to only those with batch support (D16)
  const batchProviders = availableProviders.filter((p) =>
    BATCH_SUPPORTED_PROVIDERS.includes(p.id as (typeof BATCH_SUPPORTED_PROVIDERS)[number])
  );

  if (batchProviders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
        <span className="material-symbols-outlined text-4xl text-[var(--color-text-muted)]">
          cloud_off
        </span>
        <p className="text-sm text-[var(--color-text-muted)] max-w-sm">
          {t("wizardEmptyProviders")}
        </p>
        <Link
          href="/dashboard/providers"
          className="text-sm text-[var(--color-accent)] underline underline-offset-2 hover:opacity-80"
        >
          {t("wizardDestinationConnectProvider")}
        </Link>
      </div>
    );
  }

  const selectedProvider = destination?.provider ?? "";
  const selectedEndpoint = destination?.endpoint ?? "/v1/chat/completions";
  const selectedModel = destination?.model ?? "";

  const providerModels =
    batchProviders.find((p) => p.id === selectedProvider)?.models ?? [];

  function handleProviderChange(providerId: string) {
    if (!providerId) {
      onChange(null);
      return;
    }
    // Validate provider type
    const validProvider = BATCH_SUPPORTED_PROVIDERS.includes(
      providerId as (typeof BATCH_SUPPORTED_PROVIDERS)[number]
    );
    if (!validProvider) return;
    const provider = providerId as WizardDestination["provider"];
    const models = batchProviders.find((p) => p.id === provider)?.models ?? [];
    onChange({
      provider,
      endpoint: selectedEndpoint,
      model: models[0] ?? "",
    });
  }

  function handleEndpointChange(endpoint: string) {
    if (!selectedProvider) return;
    onChange({
      provider: selectedProvider as WizardDestination["provider"],
      endpoint: endpoint as WizardDestination["endpoint"],
      model: selectedModel,
    });
  }

  function handleModelChange(model: string) {
    if (!selectedProvider) return;
    onChange({
      provider: selectedProvider as WizardDestination["provider"],
      endpoint: selectedEndpoint,
      model,
    });
  }

  const selectClass =
    "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-alt)] " +
    "px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none " +
    "focus:ring-1 focus:ring-[var(--color-accent)] disabled:opacity-50";

  return (
    <div className="flex flex-col gap-6">
      {/* Provider */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[var(--color-text-muted)]">
          {t("wizardProviderLabel")}
        </label>
        <select
          className={selectClass}
          value={selectedProvider}
          onChange={(e) => handleProviderChange(e.target.value)}
        >
          <option value="">{t("wizardDestinationSelectProvider")}</option>
          {batchProviders.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Endpoint */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[var(--color-text-muted)]">
          {t("wizardEndpointLabel")}
        </label>
        <select
          className={selectClass}
          value={selectedEndpoint}
          disabled={!selectedProvider}
          onChange={(e) => handleEndpointChange(e.target.value)}
        >
          {SUPPORTED_BATCH_ENDPOINTS.map((ep) => (
            <option key={ep} value={ep}>
              {ep}
            </option>
          ))}
        </select>
      </div>

      {/* Model */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[var(--color-text-muted)]">
          {t("wizardModelLabel")}
        </label>
        <select
          className={selectClass}
          value={selectedModel}
          disabled={!selectedProvider || providerModels.length === 0}
          onChange={(e) => handleModelChange(e.target.value)}
        >
          <option value="">{t("wizardDestinationSelectModel")}</option>
          {providerModels.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
