import { getRuntimeArch, getRuntimePlatform } from "./cloudCodeHeaders.ts";

export const GEMINI_CLI_VERSION = "0.40.1";
export const GEMINI_CLI_GOOGLE_API_NODE_CLIENT_VERSION = "9.15.1";

export const GEMINI_CLI_LOAD_CODE_ASSIST_METADATA = Object.freeze({
  ideType: "IDE_UNSPECIFIED",
  platform: "PLATFORM_UNSPECIFIED",
  pluginType: "GEMINI",
});

export function getGeminiCliLoadCodeAssistMetadata(): Record<string, string> {
  return { ...GEMINI_CLI_LOAD_CODE_ASSIST_METADATA };
}

/**
 * Native Gemini CLI User-Agent: "GeminiCLI/VERSION/MODEL (OS; ARCH)".
 * Example: "GeminiCLI/0.40.1/gemini-3-flash-preview (linux; arm64)"
 */
export function geminiCLIUserAgent(model: string): string {
  return `GeminiCLI/${GEMINI_CLI_VERSION}/${model || "unknown"} (${getRuntimePlatform()}; ${getRuntimeArch()}; terminal) google-api-nodejs-client/${GEMINI_CLI_GOOGLE_API_NODE_CLIENT_VERSION}`;
}
