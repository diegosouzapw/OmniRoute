import {
  DEFAULT_ANTIGRAVITY_CLIENT_PROFILE,
  normalizeAntigravityClientProfile,
  type AntigravityClientProfile,
} from "@/shared/constants/antigravityClientProfile";
import { getRuntimeArch, getRuntimePlatform, normalizeCloudCodeArch } from "./cloudCodeHeaders.ts";
import {
  deriveAntigravityMachineId,
  getAntigravityVscodeSessionId,
  type AntigravityCredentialsLike,
} from "./antigravityIdentity.ts";
import {
  antigravityUserAgent,
  ANTIGRAVITY_CREDIT_PROBE_API_CLIENT,
  getAntigravityLoadCodeAssistMetadata,
} from "./antigravityHeaders.ts";
import { getCachedAntigravityVersion } from "./antigravityVersion.ts";

export {
  ANTIGRAVITY_CLIENT_PROFILE_VALUES,
  DEFAULT_ANTIGRAVITY_CLIENT_PROFILE,
  normalizeAntigravityClientProfile,
  type AntigravityClientProfile,
} from "@/shared/constants/antigravityClientProfile";

type AntigravityProfileCredentials = AntigravityCredentialsLike & {
  providerSpecificData?: Record<string, unknown> | null;
};

export function getAntigravityClientProfile(
  credentials?: AntigravityProfileCredentials | null
): AntigravityClientProfile {
  const fromProviderData =
    credentials?.providerSpecificData &&
    typeof credentials.providerSpecificData === "object" &&
    !Array.isArray(credentials.providerSpecificData)
      ? credentials.providerSpecificData.clientProfile
      : undefined;

  return normalizeAntigravityClientProfile(fromProviderData);
}

function getHarnessPlatformArch(): string {
  const platform = getRuntimePlatform() === "win32" ? "windows" : getRuntimePlatform();
  return `${platform}/${normalizeCloudCodeArch(getRuntimeArch())}`;
}

export function antigravityHarnessUserAgent(version = getCachedAntigravityVersion()): string {
  return `antigravity/${version} ${getHarnessPlatformArch()}`;
}

export function antigravityHarnessApiClientHeader(): string {
  return ANTIGRAVITY_CREDIT_PROBE_API_CLIENT;
}

function removeHeaderCaseInsensitive(headers: Record<string, string>, name: string): void {
  const lowerName = name.toLowerCase();
  for (const key of Object.keys(headers)) {
    if (key.toLowerCase() === lowerName) {
      delete headers[key];
    }
  }
}

function getProjectHeaderValue(body: unknown): string | null {
  const project =
    body && typeof body === "object" ? (body as Record<string, unknown>).project : null;
  if (typeof project !== "string" || project.trim().length === 0) return null;
  if (project === "test-project" || project === "project-id") return null;
  return project;
}

/** Headers used by OAuth/bootstrap calls (loadCodeAssist, token refresh). */
export function getAntigravityBootstrapHeaders(
  profile: AntigravityClientProfile,
  accessToken?: string | null
): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  if (profile === "harness") {
    headers["User-Agent"] = antigravityHarnessUserAgent();
    headers["X-Goog-Api-Client"] = antigravityHarnessApiClientHeader();
    headers["Client-Metadata"] = JSON.stringify({
      ideType: "ANTIGRAVITY",
      platform: getRuntimePlatform() === "win32" ? "WINDOWS" : "MACOS",
      pluginType: "GEMINI",
    });
    return headers;
  }

  headers["User-Agent"] = antigravityUserAgent();
  headers["Client-Metadata"] = JSON.stringify(getAntigravityLoadCodeAssistMetadata());
  return headers;
}

/** Apply per-connection client identity to outbound Cloud Code content requests. */
export function applyAntigravityClientProfileHeaders(
  headers: Record<string, string>,
  credentials: AntigravityProfileCredentials | null | undefined,
  body: unknown
): AntigravityClientProfile {
  const profile = getAntigravityClientProfile(credentials);
  const version = getCachedAntigravityVersion();

  if (profile === "harness") {
    headers["User-Agent"] = antigravityHarnessUserAgent(version);
    removeHeaderCaseInsensitive(headers, "X-Goog-Api-Client");
    removeHeaderCaseInsensitive(headers, "x-client-name");
    removeHeaderCaseInsensitive(headers, "x-client-version");
    removeHeaderCaseInsensitive(headers, "x-machine-id");
    removeHeaderCaseInsensitive(headers, "x-vscode-sessionid");
    removeHeaderCaseInsensitive(headers, "Client-Metadata");
  } else {
    headers["User-Agent"] = antigravityUserAgent();
    headers["x-client-name"] = "antigravity";
    headers["x-client-version"] = version;
    const machineId = deriveAntigravityMachineId(credentials);
    if (machineId) {
      headers["x-machine-id"] = machineId;
    } else {
      removeHeaderCaseInsensitive(headers, "x-machine-id");
    }
    headers["x-vscode-sessionid"] = getAntigravityVscodeSessionId();
    removeHeaderCaseInsensitive(headers, "X-Goog-Api-Client");
    removeHeaderCaseInsensitive(headers, "Client-Metadata");
  }

  const project = getProjectHeaderValue(body);
  if (project) {
    headers["x-goog-user-project"] = project;
  } else {
    removeHeaderCaseInsensitive(headers, "x-goog-user-project");
  }

  return profile;
}
