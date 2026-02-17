"use client";

import { useState, useEffect } from "react";
import {
  AI_PROVIDERS,
  OPENAI_COMPATIBLE_PREFIX,
  ANTHROPIC_COMPATIBLE_PREFIX,
} from "@/shared/constants/providers";

/**
 * Hook to fetch and manage provider options for the Translator tools.
 * Fetches active providers from the API and builds a sorted list of options.
 * Falls back to the static AI_PROVIDERS list if the API is unreachable.
 *
 * @param {string} [initialProvider="openai"] - Initial provider value
 * @returns {{ provider: string, setProvider: Function, providerOptions: Array<{value: string, label: string}>, loading: boolean }}
 */
export function useProviderOptions(initialProvider = "openai") {
  const [provider, setProvider] = useState(initialProvider);
  const [providerOptions, setProviderOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const [connRes, nodesRes] = await Promise.all([
          fetch("/api/providers"),
          fetch("/api/provider-nodes"),
        ]);
        const [connData, nodesData] = await Promise.all([connRes.json(), nodesRes.json()]);
        const nodeMap = new Map((nodesData.nodes || []).map((n) => [n.id, n]));
        const activeProviders = new Set(
          (connData.connections || []).filter((c) => c.isActive !== false).map((c) => c.provider)
        );
        const options = [...activeProviders]
          .map((pid) => {
            const info = AI_PROVIDERS[pid];
            const node = nodeMap.get(pid);
            let label = info?.name || node?.name || pid;
            if (!info && pid.startsWith(OPENAI_COMPATIBLE_PREFIX))
              label = node?.name || "OpenAI Compatible";
            if (!info && pid.startsWith(ANTHROPIC_COMPATIBLE_PREFIX))
              label = node?.name || "Anthropic Compatible";
            return { value: pid, label };
          })
          .sort((a, b) => a.label.localeCompare(b.label));

        const nextOptions =
          options.length > 0
            ? options
            : Object.entries(AI_PROVIDERS).map(([id, info]) => ({ value: id, label: info.name }));
        setProviderOptions(nextOptions);
        if (nextOptions.length > 0) {
          setProvider((current) =>
            nextOptions.some((opt) => opt.value === current) ? current : nextOptions[0].value
          );
        }
      } catch {
        const fallbackOptions = Object.entries(AI_PROVIDERS).map(([id, info]) => ({
          value: id,
          label: info.name,
        }));
        setProviderOptions(fallbackOptions);
        if (fallbackOptions.length > 0) {
          setProvider((current) =>
            fallbackOptions.some((opt) => opt.value === current)
              ? current
              : fallbackOptions[0].value
          );
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProviders();
  }, []);

  return { provider, setProvider, providerOptions, loading };
}
