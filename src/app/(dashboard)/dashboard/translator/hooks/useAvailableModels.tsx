"use client";

import { useState, useEffect, useCallback } from "react";

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
export function useAvailableModels() {
  const [model, setModel] = useState("");
  const [availableModels, setAvailableModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await fetch("/api/v1/models");
        const data = await res.json();
        const models = (data.data || []).map((m) => m.id).sort((a, b) => a.localeCompare(b));
        setAvailableModels(models);
      } catch {
        setAvailableModels([]);
      } finally {
        setLoading(false);
      }
    };
    fetchModels();
  }, []);

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

  return { model, setModel, availableModels, loading, pickModelForFormat };
}
