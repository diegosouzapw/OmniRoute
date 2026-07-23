import { createHash } from "node:crypto";

export function buildKiroApiKeyConnectionName(
  targetProvider: string,
  region: string,
  apiKey: string
): string {
  const label = targetProvider === "amazon-q" ? "Amazon Q" : "Kiro";
  const safeRegion = region || "us-east-1";
  const fingerprint = createHash("sha256").update(apiKey.trim()).digest("hex").slice(0, 8);
  return `${label} API Key (${safeRegion}, ${fingerprint})`;
}

export function isKiroApiKeyImportClientError(error: unknown): boolean {
  const message = (error instanceof Error ? error.message : String(error || "")).toLowerCase();
  return (
    message.includes("api key is required") ||
    message.includes("invalid region") ||
    message.includes("invalid kiro api key") ||
    message.includes("invalid api key") ||
    message.includes("no kiro profile available") ||
    message.includes("failed to list profiles")
  );
}
