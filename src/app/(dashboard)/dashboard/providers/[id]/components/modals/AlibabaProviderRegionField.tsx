"use client";

import { type Dispatch, type SetStateAction, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Input, Modal, Select } from "@/shared/components";
import {
  getDefaultAlibabaProviderRegion,
  isAlibabaRegionalProvider,
  type AlibabaProviderRegion,
} from "@/shared/constants/alibabaProviderRegions";
import { providerText } from "../../providerPageHelpers";

export function getProviderRegionConfig(provider?: string) {
  const isAlibabaRegional = isAlibabaRegionalProvider(provider);
  const isBedrock = provider === "bedrock";
  return {
    defaultRegion: isAlibabaRegional
      ? getDefaultAlibabaProviderRegion(provider)
      : isBedrock
        ? "eu-west-2"
        : "us-central1",
    isAlibabaRegional,
    showsRegion:
      isAlibabaRegional || isBedrock || provider === "vertex" || provider === "vertex-partner",
  };
}

export function AlibabaProviderRegionChoices({
  provider,
  onSelect,
}: {
  provider?: string;
  onSelect: (value: AlibabaProviderRegion) => void;
}) {
  const t = useTranslations("providers");
  const globalRegionLabel = provider === "bailian-coding-plan" ? "Singapore" : "Global";
  const choices: Array<{
    description: string;
    icon: string;
    label: string;
    value: AlibabaProviderRegion;
  }> = [
    {
      value: "china-beijing",
      label: "Beijing",
      description: providerText(t, "alibabaRegionBeijingDesc", "China mainland endpoint"),
      icon: "location_on",
    },
    {
      value: "global-sg",
      label: globalRegionLabel,
      description: providerText(t, "alibabaRegionGlobalDesc", "International endpoint"),
      icon: "public",
    },
  ];

  return (
    <div className="space-y-3" data-testid="alibaba-region-step">
      <p className="mb-4 text-sm text-text-muted">
        {providerText(t, "alibabaRegionPrompt", "Which region are you using?")}
      </p>

      {choices.map((choice) => (
        <button
          key={choice.value}
          type="button"
          data-region={choice.value}
          onClick={() => onSelect(choice.value)}
          className="w-full rounded-lg border border-border p-4 text-left transition-colors hover:bg-sidebar"
        >
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined mt-0.5 text-primary" aria-hidden="true">
              {choice.icon}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="mb-1 font-semibold">{choice.label}</h3>
              <p className="text-sm text-text-muted">{choice.description}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

type RegionFormData = { region: string };

export function useAlibabaProviderRegionStep<T extends RegionFormData>({
  isOpen,
  provider,
  title,
  onClose,
  setFormData,
}: {
  isOpen: boolean;
  provider?: string;
  title: string;
  onClose: () => void;
  setFormData: Dispatch<SetStateAction<T>>;
}) {
  const { defaultRegion, isAlibabaRegional, showsRegion } = getProviderRegionConfig(provider);
  const [stepState, setStepState] = useState({
    complete: !isAlibabaRegional,
    isOpen,
    provider,
  });
  const wasOpenRef = useRef(false);

  if (stepState.isOpen !== isOpen || stepState.provider !== provider) {
    setStepState({ complete: !isOpen || !isAlibabaRegional, isOpen, provider });
  }

  useEffect(() => {
    const wasOpen = wasOpenRef.current;
    wasOpenRef.current = isOpen;
    if (!isOpen || wasOpen) return;
    setFormData((current) => ({
      ...current,
      region: showsRegion ? defaultRegion : "",
    }));
  }, [defaultRegion, isOpen, setFormData, showsRegion]);

  if (!isAlibabaRegional || stepState.complete) return null;
  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose} size="md">
      <AlibabaProviderRegionChoices
        provider={provider}
        onSelect={(region) => {
          setFormData((current) => ({ ...current, region }));
          setStepState((current) => ({ ...current, complete: true }));
        }}
      />
    </Modal>
  );
}

function AlibabaProviderRegionField({
  provider,
  value,
  onChange,
}: {
  provider?: string;
  value: AlibabaProviderRegion;
  onChange: (value: AlibabaProviderRegion) => void;
}) {
  const t = useTranslations("providers");

  return (
    <Select
      label={t("apiRegionLabel")}
      value={value}
      placeholder=""
      options={[
        {
          value: "global-sg",
          label:
            provider === "bailian-coding-plan"
              ? "Singapore"
              : `${t("apiRegionInternational")} (Singapore)`,
        },
        { value: "china-beijing", label: `${t("apiRegionChina")} (Beijing)` },
      ]}
      onChange={(event) => onChange(event.target.value as AlibabaProviderRegion)}
      hint={t("apiRegionHint")}
    />
  );
}

export function ProviderRegionField({
  provider,
  value,
  onChange,
  hideAlibaba = false,
}: {
  provider?: string;
  value: string;
  onChange: (value: string) => void;
  hideAlibaba?: boolean;
}) {
  const t = useTranslations("providers");
  const { defaultRegion, isAlibabaRegional, showsRegion } = getProviderRegionConfig(provider);
  if (!showsRegion || (hideAlibaba && isAlibabaRegional)) return null;
  if (isAlibabaRegional) {
    return (
      <AlibabaProviderRegionField
        provider={provider}
        value={value as AlibabaProviderRegion}
        onChange={onChange}
      />
    );
  }
  return (
    <Input
      label={t("regionLabel")}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={defaultRegion}
      hint={t("regionHint")}
    />
  );
}

export default ProviderRegionField;
