import type { NextResponse } from "next/server";
import type { LocalCatalogModel } from "@/lib/providers/staticModels";

export interface SyncedModel {
  id: string;
  name: string;
  apiFormat?: string;
  supportedEndpoints?: string[];
}

export interface FallbackOpts {
  cacheWarning?: string;
  localWarning?: string;
}

export interface ResponsePayload {
  provider: string;
  connectionId: string;
  models: unknown[];
  source: string;
  warning?: string;
}

export interface HandlerContext {
  provider: string;
  connectionId: string;
  apiKey: string;
  accessToken: string;
  connection: Record<string, unknown>;
  proxy: unknown;
  excludeHidden: boolean;
  refresh: boolean;
  autoFetchModels: boolean;
  cachedDiscoveryModels: Array<{ id: string; name: string }>;
  registryCatalogModels: Array<LocalCatalogModel | SyncedModel>;
  specialtyCatalogModels: Array<LocalCatalogModel>;
  providerSyncedModels: SyncedModel[] | null;

  // Response builders (closures from GET)
  buildResponse(payload: ResponsePayload, statusConfig?: ResponseInit): NextResponse;
  buildLocalCatalogResponse(warning?: string): NextResponse | null;
  buildCachedDiscoveryResponse(warning?: string): NextResponse;
  buildDiscoveryFallbackResponse(opts?: FallbackOpts): NextResponse | null;
  buildDiscoveryErrorFallbackResponse(
    error: unknown,
    opts?: FallbackOpts
  ): NextResponse | null;
  maybeReturnCachedDiscovery(): NextResponse | null;
  maybeReturnAutoFetchDisabled(): NextResponse | null;
  buildApiDiscoveryResponse(
    models: unknown[],
    warning?: string
  ): Promise<NextResponse>;
  toLocalCatalogModels(): Array<Record<string, unknown>>;
}
