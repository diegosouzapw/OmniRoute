/**
 * chatAdmissionSettings.ts — Persisted settings for the chat admission controller.
 *
 * These values live in `key_value` under the `settings` namespace so they can be
 * edited from the dashboard without touching env files. Env vars still win as
 * operator overrides; DB values are the portable deployment default.
 */

import { getDbInstance } from "./core";
import { invalidateDbCache } from "./readCache";

const NAMESPACE = "settings";
const SETTINGS_KEY = "chatAdmissionSettings";

export interface ChatAdmissionSettings {
  chatMaxHeavyInFlight: number;
  chatAdmissionHeapShedRatio: number;
  chatAdmissionHealthyHeadroom: number;
}

export type ChatAdmissionSettingKey = keyof ChatAdmissionSettings;
export type ChatAdmissionSettingSource = "env" | "db" | "default";

export const DEFAULT_CHAT_ADMISSION_SETTINGS: ChatAdmissionSettings = {
  chatMaxHeavyInFlight: 1,
  chatAdmissionHeapShedRatio: 0.75,
  chatAdmissionHealthyHeadroom: 1,
};

/**
 * Env var backing each tunable. Presence of a non-blank var is what makes the
 * operator override bind — an explicit `=1` must win over a DB value of `1` too,
 * matching `resolveLegacyCountCap()` in `chatBodyAdmission.ts`.
 */
const ENV_KEYS: Record<ChatAdmissionSettingKey, string> = {
  chatMaxHeavyInFlight: "OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT",
  chatAdmissionHeapShedRatio: "OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO",
  chatAdmissionHealthyHeadroom: "OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM",
};

/**
 * Per-field validity predicates, shared by the env and DB paths so the two can
 * never drift: a value a hand-edited DB row would reject must also be rejected
 * when it arrives through the environment, and vice versa.
 */
function isValid(key: ChatAdmissionSettingKey, value: number): boolean {
  switch (key) {
    case "chatMaxHeavyInFlight":
      return Number.isSafeInteger(value) && value >= 1;
    case "chatAdmissionHeapShedRatio":
      return Number.isFinite(value) && value > 0 && value <= 1;
    case "chatAdmissionHealthyHeadroom":
      return Number.isSafeInteger(value) && value >= 0;
  }
}

/**
 * Env parsing mirrors `chatBodyAdmission.ts`: `parseInt` for the integer
 * tunables (so `"5x"` reads as 5), `Number` for the ratio (so `"0.5x"` is
 * rejected rather than silently truncated to 0.5).
 */
function parseSetting(key: ChatAdmissionSettingKey, raw: string): number {
  return key === "chatAdmissionHeapShedRatio" ? Number(raw) : Number.parseInt(raw, 10);
}

function isEnvProvided(key: ChatAdmissionSettingKey): boolean {
  const raw = process.env[ENV_KEYS[key]];
  return raw !== undefined && raw.trim() !== "";
}

/** Env value for one key; the default when unset or malformed. */
function readEnvValue(key: ChatAdmissionSettingKey): number {
  const fallback = DEFAULT_CHAT_ADMISSION_SETTINGS[key];
  if (!isEnvProvided(key)) return fallback;
  const parsed = parseSetting(key, process.env[ENV_KEYS[key]] as string);
  return isValid(key, parsed) ? parsed : fallback;
}

/** A field from an untrusted record, or the default when absent/out-of-range. */
function pickSetting(source: Record<string, unknown>, key: ChatAdmissionSettingKey): number {
  const value = source[key];
  return typeof value === "number" && isValid(key, value)
    ? value
    : DEFAULT_CHAT_ADMISSION_SETTINGS[key];
}

/**
 * The stored row as a raw record, or `null` when absent, unparsable, or not a
 * JSON object. Keeps the malformed-row case distinguishable from "no row" so
 * provenance reporting does not have to guess.
 */
function readStoredSettings(): Record<string, unknown> | null {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(NAMESPACE, SETTINGS_KEY) as { value?: string } | undefined;

  if (!row?.value) return null;

  try {
    const parsed: unknown = JSON.parse(row.value);
    return parsed !== null && typeof parsed === "object"
      ? (parsed as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

/**
 * Coerce an untrusted settings payload (parsed DB row or caller input) into a
 * fully-validated object. Absent or out-of-range fields fall back to defaults,
 * so a bad write can never persist a value the readers would reject anyway.
 */
export function normalizeChatAdmissionSettings(input: unknown): ChatAdmissionSettings {
  const source =
    input !== null && typeof input === "object" ? (input as Record<string, unknown>) : {};
  return {
    chatMaxHeavyInFlight: pickSetting(source, "chatMaxHeavyInFlight"),
    chatAdmissionHeapShedRatio: pickSetting(source, "chatAdmissionHeapShedRatio"),
    chatAdmissionHealthyHeadroom: pickSetting(source, "chatAdmissionHealthyHeadroom"),
  };
}

export function readChatAdmissionSettingsFromEnv(): ChatAdmissionSettings {
  return {
    chatMaxHeavyInFlight: readEnvValue("chatMaxHeavyInFlight"),
    chatAdmissionHeapShedRatio: readEnvValue("chatAdmissionHeapShedRatio"),
    chatAdmissionHealthyHeadroom: readEnvValue("chatAdmissionHealthyHeadroom"),
  };
}

export function readChatAdmissionSettingsFromDb(): ChatAdmissionSettings {
  const stored = readStoredSettings();
  return stored === null ? DEFAULT_CHAT_ADMISSION_SETTINGS : normalizeChatAdmissionSettings(stored);
}

/** DB value wins only where no env override is present — resolved per key. */
export function getEffectiveChatAdmissionSettings(): ChatAdmissionSettings {
  const db = readChatAdmissionSettingsFromDb();
  return {
    chatMaxHeavyInFlight: isEnvProvided("chatMaxHeavyInFlight")
      ? readEnvValue("chatMaxHeavyInFlight")
      : db.chatMaxHeavyInFlight,
    chatAdmissionHeapShedRatio: isEnvProvided("chatAdmissionHeapShedRatio")
      ? readEnvValue("chatAdmissionHeapShedRatio")
      : db.chatAdmissionHeapShedRatio,
    chatAdmissionHealthyHeadroom: isEnvProvided("chatAdmissionHealthyHeadroom")
      ? readEnvValue("chatAdmissionHealthyHeadroom")
      : db.chatAdmissionHealthyHeadroom,
  };
}

/**
 * Per-key provenance for the dashboard: which layer supplies the effective
 * value. A key reports `"db"` only when a row exists AND that field survived
 * validation — a present-but-malformed field reports `"default"` rather than
 * claiming the DB supplies a value it does not.
 */
export function getChatAdmissionSettingsSource(): Record<
  ChatAdmissionSettingKey,
  ChatAdmissionSettingSource
> {
  const stored = readStoredSettings();
  const storedSource = (key: ChatAdmissionSettingKey): ChatAdmissionSettingSource => {
    const value = stored?.[key];
    return typeof value === "number" && isValid(key, value) ? "db" : "default";
  };

  return {
    chatMaxHeavyInFlight: isEnvProvided("chatMaxHeavyInFlight")
      ? "env"
      : storedSource("chatMaxHeavyInFlight"),
    chatAdmissionHeapShedRatio: isEnvProvided("chatAdmissionHeapShedRatio")
      ? "env"
      : storedSource("chatAdmissionHeapShedRatio"),
    chatAdmissionHealthyHeadroom: isEnvProvided("chatAdmissionHealthyHeadroom")
      ? "env"
      : storedSource("chatAdmissionHealthyHeadroom"),
  };
}

/**
 * Persist the tunables and return the newly EFFECTIVE settings — when an env
 * override is present the returned value reflects the override, not `next`, so
 * the caller's response never advertises a value the runtime will not use.
 */
export async function updateChatAdmissionSettings(
  next: ChatAdmissionSettings
): Promise<ChatAdmissionSettings> {
  const db = getDbInstance();

  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    NAMESPACE,
    SETTINGS_KEY,
    JSON.stringify(normalizeChatAdmissionSettings(next))
  );

  invalidateDbCache("settings");
  return getEffectiveChatAdmissionSettings();
}

/** Drop the stored override; effective settings fall back to env/defaults. */
export async function resetChatAdmissionSettings(): Promise<ChatAdmissionSettings> {
  const db = getDbInstance();

  db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(NAMESPACE, SETTINGS_KEY);

  invalidateDbCache("settings");
  return getEffectiveChatAdmissionSettings();
}
