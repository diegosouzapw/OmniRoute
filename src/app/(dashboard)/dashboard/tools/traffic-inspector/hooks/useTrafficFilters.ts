"use client";

import { useCallback, useState } from "react";
import type { ListFilters } from "@/mitm/inspector/types";

export interface FiltersState extends ListFilters {
  sameContextKey?: string;
}

export function useTrafficFilters() {
  const [filters, setFilters] = useState<FiltersState>({ profile: "llm" });

  const setProfile = useCallback((profile: ListFilters["profile"]) => {
    setFilters((prev) => ({ ...prev, profile }));
  }, []);

  const setHost = useCallback((host: string | undefined) => {
    setFilters((prev) => ({ ...prev, host: host || undefined }));
  }, []);

  const setAgent = useCallback((agent: ListFilters["agent"]) => {
    setFilters((prev) => ({ ...prev, agent }));
  }, []);

  const setStatus = useCallback((status: ListFilters["status"]) => {
    setFilters((prev) => ({ ...prev, status }));
  }, []);

  const setSource = useCallback((source: ListFilters["source"]) => {
    setFilters((prev) => ({ ...prev, source }));
  }, []);

  const setSessionId = useCallback((sessionId: string | undefined) => {
    setFilters((prev) => ({ ...prev, sessionId }));
  }, []);

  const setSameContext = useCallback((contextKey: string | undefined) => {
    setFilters((prev) => ({ ...prev, sameContextKey: contextKey }));
  }, []);

  const reset = useCallback(() => {
    setFilters({ profile: "llm" });
  }, []);

  return {
    filters,
    setProfile,
    setHost,
    setAgent,
    setStatus,
    setSource,
    setSessionId,
    setSameContext,
    reset,
  };
}
