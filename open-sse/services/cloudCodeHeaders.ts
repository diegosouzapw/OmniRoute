function getPlatform(): string {
  const p = typeof process !== "undefined" ? process.platform : "unknown";
  switch (p) {
    case "win32":
      return "windows";
    case "darwin":
      return "macos";
    default:
      return p;
  }
}

function getArch(): string {
  const a = typeof process !== "undefined" ? process.arch : "unknown";
  switch (a) {
    case "x64":
      return "x64";
    case "ia32":
      return "x86";
    case "arm64":
      return "arm64";
    default:
      return a;
  }
}

export const CLOUD_CODE_GENAI_SDK_VERSION = "1.30.0";
export const CLOUD_CODE_NODE_VERSION = "v22.21.1";

function getNodeVersion(): string {
  const version = typeof process !== "undefined" ? process.version : "";
  return version.replace(/^v/, "") || CLOUD_CODE_NODE_VERSION.replace(/^v/, "");
}

export function getRuntimePlatform(): string {
  return getPlatform();
}

export function getRuntimeArch(): string {
  return getArch();
}

/**
 * X-Goog-Api-Client header value used by Cloud Code generation calls.
 * Example: "google-genai-sdk/1.30.0 gl-node/v22.21.1"
 */
export function googApiClientHeader(): string {
  return `google-genai-sdk/${CLOUD_CODE_GENAI_SDK_VERSION} gl-node/${CLOUD_CODE_NODE_VERSION}`;
}

export function cloudCodeNodeApiClientHeader(): string {
  return `gl-node/${getNodeVersion()}`;
}
