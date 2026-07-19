"use client";

import { useEffect, useState } from "react";
import type { LiveModelsByProviderId } from "../providerPageUtils";

/**
 * useSyncedModelsByProvider — fetch the live/synced model catalog for every
 * provider connection via GET /api/synced-available-models, so the Providers
 * page model-name filter can match against real upstream models (not just
 * the static curated registry). See #7250: aggregator providers (openrouter,
 * kilocode, theoldllm...) declare a single-entry static placeholder, so a
 * search for a real model name never matched and silently hid the provider.
 *
 * Fails soft — a fetch error leaves the map empty, and callers fall back to
 * the static registry only.
 */
export function useSyncedModelsByProvider(): LiveModelsByProviderId {
  const [models, setModels] = useState<LiveModelsByProviderId>({});

  useEffect(() => {
    let cancelled = false;
    fetch("/api/synced-available-models")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data && typeof data === "object") {
          setModels(data as LiveModelsByProviderId);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return models;
}
