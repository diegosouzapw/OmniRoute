"use client";

import { useCallback } from "react";
import type { ChaosProviderOverride } from "./components/ChaosProviderOverridesPanel";
import { useChaosConfigData } from "./useChaosConfigData";
import { useChaosConfigPersistence } from "./useChaosConfigPersistence";
import { useChaosTestRun } from "./useChaosTestRun";

export type { ChaosProviderInfo, ChaosPageConfig } from "./chaosPageTypes";
export { DEFAULT_CHAOS_PAGE_CONFIG } from "./chaosPageTypes";

/**
 * All state + handlers for the Chaos Mode config page
 * (src/app/(dashboard)/dashboard/chaos/ChaosConfigPageClient.tsx). Composes
 * useChaosConfigData/useChaosConfigPersistence/useChaosTestRun so the page
 * component itself stays a thin render function under the complexity/size
 * ratchet (config/quality/complexity-baseline.json).
 */
export function useChaosConfigPage() {
  const { config, setConfig, availableProviders, loading } = useChaosConfigData();
  const { t, saving, message, setMessage, saveConfig, resetConfig } = useChaosConfigPersistence(
    config,
    setConfig
  );
  const { testing, testResult, testChaos } = useChaosTestRun(config, setMessage);

  const addOverride = useCallback(() => {
    setConfig((prev) => ({
      ...prev,
      providerOverrides: [...prev.providerOverrides, { providerId: "", modelId: "", enabled: true }],
    }));
  }, [setConfig]);

  const updateOverride = useCallback(
    (index: number, field: keyof ChaosProviderOverride, value: any) => {
      setConfig((prev) => {
        const overrides = [...prev.providerOverrides];
        overrides[index] = { ...overrides[index], [field]: value };
        return { ...prev, providerOverrides: overrides };
      });
    },
    [setConfig]
  );

  const removeOverride = useCallback(
    (index: number) => {
      setConfig((prev) => ({
        ...prev,
        providerOverrides: prev.providerOverrides.filter((_, i) => i !== index),
      }));
    },
    [setConfig]
  );

  return {
    t,
    config,
    setConfig,
    availableProviders,
    loading,
    saving,
    testing,
    testResult,
    message,
    saveConfig,
    resetConfig,
    testChaos,
    addOverride,
    updateOverride,
    removeOverride,
  };
}
