export const ANTIGRAVITY_CLIENT_PROFILE_VALUES = ["ide", "harness"] as const;

export type AntigravityClientProfile = (typeof ANTIGRAVITY_CLIENT_PROFILE_VALUES)[number];

export const DEFAULT_ANTIGRAVITY_CLIENT_PROFILE: AntigravityClientProfile = "ide";

export type AntigravityClientProfileSetting = AntigravityClientProfile;

export const ANTIGRAVITY_CLIENT_PROFILE_OPTIONS: Array<{
  value: AntigravityClientProfileSetting;
  labelKey: "antigravityClientProfileIde" | "antigravityClientProfileHarness";
}> = [
  { value: "ide", labelKey: "antigravityClientProfileIde" },
  { value: "harness", labelKey: "antigravityClientProfileHarness" },
];

function toNonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

export function normalizeAntigravityClientProfile(value: unknown): AntigravityClientProfile {
  const normalized = toNonEmptyString(value)?.toLowerCase();
  if (normalized === "harness" || normalized === "cli" || normalized === "sdk") {
    return "harness";
  }
  return DEFAULT_ANTIGRAVITY_CLIENT_PROFILE;
}

export const normalizeAntigravityClientProfileSetting = normalizeAntigravityClientProfile;
