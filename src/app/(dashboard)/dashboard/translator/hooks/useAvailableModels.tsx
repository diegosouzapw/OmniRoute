"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { compareTr } from "@/shared/utils/turkishText";
import type { ModelReasoningCapabilities } from "@/app/(dashboard)/dashboard/playground/components/reasoningControlUtils";

/**
 * Prefix-based format→model matching, used to pick a smart default
 * model from the available models list when the user changes format.
 */
const FORMAT_MODEL_PREFIXES = {
  openai: ["gpt-", "o1-", "o3-", "o4-"],
  "openai-responses": ["gpt-", "o1-", "o3-", "o4-"],
  claude: ["claude-"],
  gemini: ["gemini-"],
};

/**
 * Hook to fetch available models and provide smart default selection.
 *
 * @returns {{
 *   model: string,
 *   setModel: Function,
 *   availableModels: string[],
 *   loading: boolean,
 *   pickModelForFormat: (format: string) => string
 * }}
 */
/**
 * Filter the /v1/models id list to a provider's models. The `provider` key must be the model
 * NAMESPACE used in the catalog: built-in providers use their id (e.g. "openai"), while
 * compatible providers use the node's custom PREFIX (e.g. "myprefix"), NOT the node id — see
 * #3505. Pure + exported for testing.
 */
export function filterModelsByProvider(allModels: string[], provider?: string): string[] {
  return provider
    ? allModels.filter((m) => m.startsWith(`${provider}/`) || m === provider)
    : allModels;
}

export function useAvailableModels(provider?: string) {
  const [model, setModel] = useState("");
  const [allModels, setAllModels] = useState<string[]>([]);
  // #6241: keep the per-model reasoning capability flags (supportsThinking / effort_tiers) the
  // catalog exposes on each entry's `capabilities`, keyed by model id, so callers (Playground)
  // can render the effort/thinking controls only when the selected model supports thinking.
  const [modelCapabilities, setModelCapabilities] = useState<
    Record<string, ModelReasoningCapabilities>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await fetch("/api/v1/models");
        const data = await res.json();
        const entries = data.data || [];
        const models = entries.map((m) => m.id).sort((a, b) => compareTr(a, b));
        const caps: Record<string, ModelReasoningCapabilities> = {};
        for (const entry of entries) {
          if (entry && typeof entry.id === "string" && entry.capabilities) {
            caps[entry.id] = entry.capabilities as ModelReasoningCapabilities;
          }
        }
        setAllModels(models);
        setModelCapabilities(caps);
      } catch {
        setAllModels([]);
        setModelCapabilities({});
      } finally {
        setLoading(false);
      }
    };
    fetchModels();
  }, []);

  const availableModels = useMemo(
    () => filterModelsByProvider(allModels, provider),
    [allModels, provider]
  );

  /**
   * Pick the best model for a given format from the available models.
   * Returns the first model matching the format prefixes, or the first available model.
   */
  const pickModelForFormat = useCallback(
    (format) => {
      if (availableModels.length === 0) return "";
      const prefixes = FORMAT_MODEL_PREFIXES[format] || [];
      for (const prefix of prefixes) {
        const match = availableModels.find((m) => m.startsWith(prefix));
        if (match) return match;
      }
      return availableModels[0];
    },
    [availableModels]
  );

  return { model, setModel, availableModels, modelCapabilities, loading, pickModelForFormat };
}
