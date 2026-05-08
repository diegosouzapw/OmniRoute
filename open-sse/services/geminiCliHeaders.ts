import {
  getCloudCodeNodeApiClientHeader,
  normalizeCloudCodeArch,
  normalizeCloudCodePlatform,
} from "./cloudCodeHeaders.ts";

export const GEMINI_CLI_VERSION = "0.40.1";
export const GEMINI_CLI_GOOGLE_API_NODE_CLIENT_VERSION = "9.15.1";

const GEMINI_CLI_LOAD_CODE_ASSIST_METADATA = Object.freeze({
  ideType: "IDE_UNSPECIFIED",
  platform: "PLATFORM_UNSPECIFIED",
  pluginType: "GEMINI",
});

export function getGeminiCliLoadCodeAssistMetadata(): Record<string, string> {
  return { ...GEMINI_CLI_LOAD_CODE_ASSIST_METADATA };
}

export function geminiCliUserAgent(model: string): string {
  const normalizedModel = model || "unknown";
  return `GeminiCLI/${GEMINI_CLI_VERSION}/${normalizedModel} (${normalizeCloudCodePlatform()}; ${normalizeCloudCodeArch()}; terminal) google-api-nodejs-client/${GEMINI_CLI_GOOGLE_API_NODE_CLIENT_VERSION}`;
}

export function geminiCliApiClientHeader(): string {
  return getCloudCodeNodeApiClientHeader();
}

export function getGeminiCliHeaders(
  model: string,
  accessToken: string,
  accept: "application/json" | "*/*"
): Record<string, string> {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "User-Agent": geminiCliUserAgent(model),
    "X-Goog-Api-Client": geminiCliApiClientHeader(),
    Accept: accept,
  };
}
