export const HIDEABLE_SIDEBAR_GROUP_IDS = [
  "compression-context",
  "tools",
  "integrations",
  "logs",
  "audit",
  "system",
  "gamification",
  "batch",
] as const;

export type HideableSidebarGroupId = (typeof HIDEABLE_SIDEBAR_GROUP_IDS)[number];

export const HIDDEN_SIDEBAR_GROUP_LABELS_SETTING_KEY = "hiddenSidebarGroupLabels";

export function normalizeHiddenSidebarGroupLabels(value: unknown): HideableSidebarGroupId[] {
  if (!Array.isArray(value)) return [];

  const hiddenGroups = new Set<HideableSidebarGroupId>();

  for (const item of value) {
    if (
      typeof item === "string" &&
      HIDEABLE_SIDEBAR_GROUP_IDS.includes(item as HideableSidebarGroupId)
    ) {
      hiddenGroups.add(item as HideableSidebarGroupId);
    }
  }

  return HIDEABLE_SIDEBAR_GROUP_IDS.filter((item) => hiddenGroups.has(item));
}
