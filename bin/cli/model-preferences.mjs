import { existsSync, mkdirSync, readFileSync, writeFileSync, chmodSync } from "node:fs";
import { join, dirname } from "node:path";
import { resolveDataDir } from "./data-dir.mjs";

const PREFERENCES_VERSION = 1;
const MAX_RECENT = 12;
const MAX_FAVORITES = 32;

export function modelPreferencesPath() {
  return join(resolveDataDir(), "model-preferences.json");
}

function defaultPreferences() {
  return { version: PREFERENCES_VERSION, targets: {}, contexts: {} };
}

export function loadModelPreferences() {
  try {
    const path = modelPreferencesPath();
    if (!existsSync(path)) return defaultPreferences();
    const parsed = JSON.parse(readFileSync(path, "utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return defaultPreferences();
    }
    return {
      version: PREFERENCES_VERSION,
      targets: parsed.targets && typeof parsed.targets === "object" ? parsed.targets : {},
      contexts: parsed.contexts && typeof parsed.contexts === "object" ? parsed.contexts : {},
    };
  } catch {
    return defaultPreferences();
  }
}

function saveModelPreferences(preferences) {
  const path = modelPreferencesPath();
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(preferences, null, 2));
  try {
    chmodSync(path, 0o600);
  } catch {
    // Best effort on platforms without POSIX modes.
  }
}

function normalizeIds(values) {
  return [...new Set((Array.isArray(values) ? values : []).filter((id) => typeof id === "string"))];
}

function targetState(preferences, target, contextKey) {
  const raw = contextKey
    ? preferences.contexts?.[contextKey]?.[target] ||
      (contextKey === "default" ? preferences.targets?.[target] : undefined)
    : preferences.targets?.[target];
  return {
    favorites: normalizeIds(raw?.favorites),
    recent: normalizeIds(raw?.recent),
  };
}

function writeTargetState(preferences, target, contextKey) {
  if (!contextKey) {
    preferences.targets[target] = targetState(preferences, target);
    return preferences.targets[target];
  }
  preferences.contexts = preferences.contexts || {};
  preferences.contexts[contextKey] = preferences.contexts[contextKey] || {};
  preferences.contexts[contextKey][target] = targetState(preferences, target, contextKey);
  return preferences.contexts[contextKey][target];
}

/** Rank catalog IDs with favorites first, then recent choices, then catalog order. */
export function rankPreferredModels(
  target,
  modelIds,
  preferences = loadModelPreferences(),
  contextKey = ""
) {
  const ids = normalizeIds(modelIds);
  const state = targetState(preferences, target, contextKey);
  const available = new Set(ids);
  const preferred = [...state.favorites, ...state.recent].filter((id) => available.has(id));
  return [...new Set([...preferred, ...ids])];
}

/** Record a successful selection without storing server URLs or credentials. */
export function recordModelPreference(target, modelId, options = {}) {
  if (!target || !modelId) return loadModelPreferences();
  const preferences = loadModelPreferences();
  const state = writeTargetState(preferences, target, options.context || "");
  state.recent = [modelId, ...state.recent.filter((id) => id !== modelId)].slice(0, MAX_RECENT);
  if (options.favorite) {
    state.favorites = [modelId, ...state.favorites.filter((id) => id !== modelId)].slice(
      0,
      MAX_FAVORITES
    );
  }
  if (options.unfavorite) state.favorites = state.favorites.filter((id) => id !== modelId);
  saveModelPreferences(preferences);
  return preferences;
}

export function getModelPreferenceState(
  target,
  preferences = loadModelPreferences(),
  contextKey = ""
) {
  return targetState(preferences, target, contextKey);
}
