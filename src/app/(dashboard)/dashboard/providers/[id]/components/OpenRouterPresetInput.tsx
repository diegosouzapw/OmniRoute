"use client";

import { useCallback, useMemo, useState } from "react";
import { Input } from "@/shared/components";
import { OPENROUTER_PRESET_MAX_LENGTH } from "@/shared/constants/openRouterPreset";
import { providerText, type ProviderMessageTranslator } from "../providerPageHelpers";

interface OpenRouterPresetInputProps {
  value: string;
  onChange: (value: string) => void;
  t: ProviderMessageTranslator;
}

export default function OpenRouterPresetInput({ value, onChange, t }: OpenRouterPresetInputProps) {
  return (
    <Input
      label={providerText(t, "openRouterPresetLabel", "OpenRouter preset")}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="email-copywriter"
      maxLength={OPENROUTER_PRESET_MAX_LENGTH}
      hint={providerText(
        t,
        "openRouterPresetHint",
        "Sends this connection's preset as the OpenRouter top-level preset field."
      )}
    />
  );
}

export function useOpenRouterPresetControl(
  provider: string | null | undefined,
  t: ProviderMessageTranslator
) {
  const [value, setValue] = useState("");
  const isOpenRouter = provider === "openrouter";
  const applyTo = useCallback(
    (data: Record<string, unknown>) => {
      const preset = value.trim();
      if (isOpenRouter && preset) data.preset = preset;
    },
    [isOpenRouter, value]
  );
  const getPatch = useCallback(() => {
    if (!isOpenRouter) return {};
    const preset = value.trim();
    return { preset: preset || null };
  }, [isOpenRouter, value]);
  const input = useMemo(
    () => (isOpenRouter ? <OpenRouterPresetInput t={t} value={value} onChange={setValue} /> : null),
    [isOpenRouter, t, value]
  );
  return { applyTo, getPatch, input, isOpenRouter, setValue };
}
