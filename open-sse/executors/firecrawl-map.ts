import { sanitizeErrorMessage } from "../utils/errorSanitization.ts";

const DEFAULT_BASE_URL = "https://api.firecrawl.dev";

export interface FirecrawlMapCredentials {
  apiKey?: string;
  baseUrl?: string;
  providerSpecificData?: Record<string, unknown>;
}

export interface FirecrawlMapInput {
  url: string;
  limit: number;
  search?: string;
  sitemap?: "skip" | "include" | "only";
  includeSubdomains?: boolean;
  ignoreQueryParameters?: boolean;
  ignoreCache?: boolean;
}

function baseUrl(credentials: FirecrawlMapCredentials): string {
  const fromConnection = credentials.baseUrl ?? credentials.providerSpecificData?.baseUrl;
  const configured = process.env.FIRECRAWL_BASE_URL || fromConnection;
  return typeof configured === "string" && configured.trim()
    ? configured.trim().replace(/\/+$/, "")
    : DEFAULT_BASE_URL;
}

export async function firecrawlMap(
  input: FirecrawlMapInput,
  credentials: FirecrawlMapCredentials
): Promise<{ status: number; data: unknown }> {
  const target = baseUrl(credentials);
  if (target === DEFAULT_BASE_URL && !credentials.apiKey) {
    return { status: 401, data: { error: "Firecrawl API key required" } };
  }

  try {
    const response = await fetch(`${target}/v2/map`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(credentials.apiKey ? { Authorization: `Bearer ${credentials.apiKey}` } : {}),
      },
      body: JSON.stringify(input),
      signal: AbortSignal.timeout(120_000),
    });
    const payload: unknown = await response.json();
    return { status: response.status, data: payload };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { status: 502, data: { error: sanitizeErrorMessage(message) } };
  }
}
