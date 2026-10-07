import { getExistingDbInstance } from "./singleton";

export interface RootLayoutSettings {
  instanceName: string;
  customFaviconUrl: string;
  customFaviconBase64: string;
}

type RootLayoutSettingKey = keyof RootLayoutSettings;
type SettingsRow = {
  key?: unknown;
  value?: unknown;
};

const ROOT_LAYOUT_SETTING_KEYS = [
  "instanceName",
  "customFaviconUrl",
  "customFaviconBase64",
] as const satisfies readonly RootLayoutSettingKey[];

const ROOT_LAYOUT_SETTING_KEY_SET = new Set<string>(ROOT_LAYOUT_SETTING_KEYS);

const DEFAULT_ROOT_LAYOUT_SETTINGS: RootLayoutSettings = {
  instanceName: "OmniRoute",
  customFaviconUrl: "",
  customFaviconBase64: "",
};

function parseStoredString(value: unknown): string | null {
  if (typeof value !== "string") return null;

  try {
    const parsed = JSON.parse(value) as unknown;
    return typeof parsed === "string" ? parsed : null;
  } catch {
    return null;
  }
}

/** Read only the settings needed while compiling and rendering the root layout. */
export async function getRootLayoutSettings(): Promise<RootLayoutSettings> {
  const db = getExistingDbInstance();
  if (!db) return { ...DEFAULT_ROOT_LAYOUT_SETTINGS };

  const rows = db
    .prepare(
      `SELECT key, value FROM key_value
       WHERE namespace = 'settings' AND key IN (?, ?, ?)`
    )
    .all(...ROOT_LAYOUT_SETTING_KEYS) as SettingsRow[];
  const settings = { ...DEFAULT_ROOT_LAYOUT_SETTINGS };

  for (const row of rows) {
    if (typeof row.key !== "string" || !ROOT_LAYOUT_SETTING_KEY_SET.has(row.key)) continue;
    const value = parseStoredString(row.value);
    if (value === null) continue;
    settings[row.key as RootLayoutSettingKey] = value;
  }

  if (!settings.instanceName) settings.instanceName = DEFAULT_ROOT_LAYOUT_SETTINGS.instanceName;
  return settings;
}
