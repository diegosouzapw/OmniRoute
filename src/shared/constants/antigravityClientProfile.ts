export const ANTIGRAVITY_CLIENT_PROFILE_VALUES = ["cli"] as const;

export type AntigravityClientProfile = (typeof ANTIGRAVITY_CLIENT_PROFILE_VALUES)[number];

/**
 * After the CLI consolidation the `antigravity` provider always presents the
 * official Antigravity CLI identity. Legacy persisted values (`ide`, `harness`,
 * `sdk`) are accepted on read and normalized to `cli`.
 */
export const DEFAULT_ANTIGRAVITY_CLIENT_PROFILE: AntigravityClientProfile = "cli";

export function normalizeAntigravityClientProfile(_value: unknown): AntigravityClientProfile {
  return DEFAULT_ANTIGRAVITY_CLIENT_PROFILE;
}

export const normalizeAntigravityClientProfileSetting = normalizeAntigravityClientProfile;
