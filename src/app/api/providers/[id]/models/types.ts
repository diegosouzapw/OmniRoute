import { NextResponse } from "next/server";

export type HttpProxyConfig = {
  host?: string;
  port?: number;
  protocol?: string;
  auth?: { username: string; password: string };
  [key: string]: unknown;
};

export type JsonRecord = Record<string, unknown>;

export type ProviderModelsConfigEntry = {
  url: string;
  method: "GET" | "POST";
  headers: Record<string, string>;
  authHeader?: string;
  authPrefix?: string;
  authQuery?: string;
  body?: unknown;
  parseResponse: (data: unknown) => unknown;
};

export interface ModelsRequestContext {
  provider: string;
  connectionId: string;
  connection: {
    providerSpecificData?: unknown;
    id?: string;
    apiKey?: string;
    accessToken?: string;
    authType?: string;
    [key: string]: unknown;
  };
  apiKey: string;
  accessToken: string;
  proxy: HttpProxyConfig | undefined;
  id: string;
  maybeReturnCachedDiscovery: () => NextResponse | null;
  maybeReturnAutoFetchDisabled: () => NextResponse | null;
  buildDiscoveryFallbackResponse: (args: {
    cacheWarning?: string;
    localWarning?: string;
    error?: unknown;
  }) => NextResponse | null;
  buildDiscoveryErrorFallbackResponse: (error: unknown, warnings?: { cacheWarning?: string; localWarning?: string }) => NextResponse | null;
  buildApiDiscoveryResponse: (models: unknown[], warning?: string) => Promise<NextResponse>;
  buildResponse: (payload: unknown, statusConfig?: ResponseInit) => NextResponse;
  buildLocalCatalogResponse: (warning?: string) => NextResponse;
}
