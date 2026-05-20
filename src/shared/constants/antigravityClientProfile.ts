import {
  ANTIGRAVITY_CLIENT_PROFILE_VALUES,
  DEFAULT_ANTIGRAVITY_CLIENT_PROFILE,
  normalizeAntigravityClientProfile,
  type AntigravityClientProfile,
} from "@omniroute/open-sse/services/antigravityClientProfile.ts";

export {
  ANTIGRAVITY_CLIENT_PROFILE_VALUES,
  DEFAULT_ANTIGRAVITY_CLIENT_PROFILE,
  type AntigravityClientProfile,
};

export type AntigravityClientProfileSetting = AntigravityClientProfile;

export const ANTIGRAVITY_CLIENT_PROFILE_OPTIONS: Array<{
  value: AntigravityClientProfileSetting;
  labelKey: "antigravityClientProfileIde" | "antigravityClientProfileHarness";
}> = [
  { value: "ide", labelKey: "antigravityClientProfileIde" },
  { value: "harness", labelKey: "antigravityClientProfileHarness" },
];

export const normalizeAntigravityClientProfileSetting = normalizeAntigravityClientProfile;
