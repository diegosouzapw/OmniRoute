import {
  parseOutboundUrl,
  parseAndValidateNonMetadataUrl,
  parseAndValidatePublicUrl,
} from "../../../src/shared/network/outboundUrlGuard";
import { getProviderValidationGuard } from "../../../src/shared/network/outboundUrlGuardPolicy";

export function embeddingEndpoint(baseUrl: string): string {
  const url = parseOutboundUrl(baseUrl.trim());
  if (url.search || url.hash) throw new Error("Embedding URL must not contain query or fragment");
  const base = url.toString().replace(/\/+$/, "");
  if (base.endsWith("/embeddings")) return base;
  return base.endsWith("/v1") ? `${base}/embeddings` : `${base}/v1/embeddings`;
}

export function embeddingUrlGuard(): "public-only" | "block-metadata" {
  return getProviderValidationGuard() === "public-only" ? "public-only" : "block-metadata";
}

export function validateEmbeddingEndpoint(baseUrl: string): string {
  const endpoint = embeddingEndpoint(baseUrl);
  if (embeddingUrlGuard() === "public-only") parseAndValidatePublicUrl(endpoint);
  else parseAndValidateNonMetadataUrl(endpoint);
  return endpoint;
}

type EmbeddingConnection = { baseUrl?: string; apiKey?: string };

/** A stored connection key belongs to its configured endpoint, never a caller replacement. */
export function resolveEmbeddingCredentials(
  configured: EmbeddingConnection,
  connection: EmbeddingConnection
): EmbeddingConnection {
  const baseUrl = configured.baseUrl || connection.baseUrl;
  if (configured.apiKey) return { baseUrl, apiKey: configured.apiKey };
  let sameEndpoint = !configured.baseUrl;
  if (configured.baseUrl && connection.baseUrl) {
    try {
      sameEndpoint =
        embeddingEndpoint(configured.baseUrl) === embeddingEndpoint(connection.baseUrl);
    } catch {
      sameEndpoint = false;
    }
  }
  return { baseUrl, apiKey: sameEndpoint ? connection.apiKey : undefined };
}
