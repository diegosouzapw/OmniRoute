// src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts
"use client";

import { useState, useCallback } from "react";
import type { ImprovePromptResult } from "@/lib/playground/promptImprover";

export interface UseImprovePromptState {
  loading: boolean;
  error: string | null;
}

export interface UseImprovePrompt extends UseImprovePromptState {
  improve: (req: {
    system?: string;
    prompt?: string;
    model: string;
    tone?: "concise" | "detailed";
  }) => Promise<ImprovePromptResult | null>;
}

/**
 * Hook for calling /api/playground/improve-prompt.
 *
 * Manages loading / error state; returns the parsed result on success.
 * Warning: each call consumes model quota (D8 — uses the model selected by user).
 */
export function useImprovePrompt(): UseImprovePrompt {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const improve = useCallback(
    async (req: {
      system?: string;
      prompt?: string;
      model: string;
      tone?: "concise" | "detailed";
    }): Promise<ImprovePromptResult | null> => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/playground/improve-prompt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(req),
        });
        if (!res.ok) {
          const body = (await res.json().catch(() => ({}))) as {
            error?: { message?: string };
          };
          throw new Error(body.error?.message ?? `HTTP ${res.status}`);
        }
        const result = (await res.json()) as ImprovePromptResult;
        return result;
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    loading,
    error,
    improve,
  };
}
