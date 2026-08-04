"use client";

import { useInsertionEffect, type ReactNode } from "react";
import { installBasePathFetch } from "@/shared/utils/basePathFetch";

/**
 * Install basePath-aware fetch/EventSource for reverse-proxy subpath deploys.
 * Mount near the root so login + dashboard both pick it up before other effects.
 */
export function BasePathNetworkProvider({ children }: { children: ReactNode }) {
  useInsertionEffect(() => {
    return installBasePathFetch();
  }, []);

  return children;
}
