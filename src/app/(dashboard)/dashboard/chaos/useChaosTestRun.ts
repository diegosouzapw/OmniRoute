"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import type { ChaosTestResult } from "./components/ChaosTestResultsPanel";
import type { ChaosPageConfig, ChaosPageMessage } from "./chaosPageTypes";

/**
 * "Test Chaos Mode" run trigger for the Chaos Mode config page. Extracted out
 * of the page component to keep it under the complexity/size ratchet
 * (config/quality/complexity-baseline.json).
 */
export function useChaosTestRun(config: ChaosPageConfig, setMessage: (message: ChaosPageMessage) => void) {
  const t = useTranslations("chaosConfig");
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<ChaosTestResult | null>(null);

  const testChaos = useCallback(async () => {
    setTesting(true);
    setTestResult(null);
    setMessage(null);
    try {
      const res = await fetch("/api/chaos/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: t("testTask"),
          mode: config.defaultMode,
          maxTokens: config.maxTokens,
        }),
      });

      if (res.ok) {
        const data: ChaosTestResult = await res.json();
        setTestResult(data);
      } else {
        const err = await res.json().catch(() => ({ error: "Unknown error" }));
        setMessage({ type: "error", text: err.error || "Test failed" });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Test failed" });
    } finally {
      setTesting(false);
    }
  }, [config.defaultMode, config.maxTokens, setMessage, t]);

  return { testing, testResult, testChaos };
}
