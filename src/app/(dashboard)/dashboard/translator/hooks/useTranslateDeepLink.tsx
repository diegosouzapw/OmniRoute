"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { AdvancedSlug, TranslateMode, TranslatorTab, TranslateDeepLink } from "../types";

const VALID_TABS: ReadonlySet<TranslatorTab> = new Set(["translate", "monitor"]);
const VALID_MODES: ReadonlySet<TranslateMode> = new Set(["preview", "send"]);
const VALID_ADVANCED: ReadonlySet<AdvancedSlug> = new Set([
  "rawjson",
  "pipeline",
  "streamtransform",
  "testbench",
  "compression",
]);

export interface UseTranslateDeepLinkReturn {
  state: TranslateDeepLink;
  setTab: (tab: TranslatorTab) => void;
  setMode: (mode: TranslateMode) => void;
  setAdvanced: (slug: AdvancedSlug | null) => void;
}

export function useTranslateDeepLink(): UseTranslateDeepLinkReturn {
  const router = useRouter();
  const params = useSearchParams();

  const state = useMemo<TranslateDeepLink>(() => {
    const tab = params.get("tab");
    const mode = params.get("mode");
    const advanced = params.get("advanced");
    return {
      tab: VALID_TABS.has(tab as TranslatorTab) ? (tab as TranslatorTab) : "translate",
      mode: VALID_MODES.has(mode as TranslateMode) ? (mode as TranslateMode) : "send",
      advanced:
        advanced && VALID_ADVANCED.has(advanced as AdvancedSlug)
          ? (advanced as AdvancedSlug)
          : null,
    };
  }, [params]);

  const update = useCallback(
    (patch: Partial<TranslateDeepLink>) => {
      const next = new URLSearchParams(params?.toString() ?? "");
      const merged: TranslateDeepLink = { ...state, ...patch };
      next.set("tab", merged.tab);
      next.set("mode", merged.mode);
      if (merged.advanced) next.set("advanced", merged.advanced);
      else next.delete("advanced");
      router.replace(`?${next.toString()}`, { scroll: false });
    },
    [params, router, state]
  );

  return {
    state,
    setTab: (tab) => update({ tab }),
    setMode: (mode) => update({ mode }),
    setAdvanced: (advanced) => update({ advanced }),
  };
}
