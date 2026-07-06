import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ArgisMonitor canonical app dir name. The legacy `omniroute` dir is still
// recognized (see `getLegacyDotDataDir`) so existing installs migrate without
// manual data moves. New installs use `argismonitor`. Removal window for the
// legacy lookup: tracked in docs/RENAMES-STRATEGY.md.
const APP_NAME = "argismonitor";
const LEGACY_APP_NAME = "omniroute";

// One-time tombstone marker file: when we emit the legacy-data-dir notice
// to stderr, we also touch a marker inside the legacy dir so subsequent
// runs of `argismonitor` don't repeat the notice. Silenced entirely under
// `CI=1` and `ARGIS_LEGACY_OFF=1`. Removal: when `~/.omniroute` is dropped.
function legacyTombstonePath(homeDir = safeHomeDir()) {
  return path.join(homeDir, `.${LEGACY_APP_NAME}`, ".argismonitor-tombstone");
}

let _tombstoneEmitted = false;
function emitLegacyTombstoneOnce(legacyDir) {
  if (_tombstoneEmitted) return;
  if (process.env.CI === "1") return;
  if (process.env.ARGIS_LEGACY_OFF === "1" || process.env.OMNIROUTE_LEGACY === "1") return;
  _tombstoneEmitted = true;
  const marker = legacyTombstonePath();
  if (fs.existsSync(marker)) return;
  try {
    fs.writeFileSync(
      marker,
      `argismonitor: legacy data dir ${legacyDir} detected at ${new Date().toISOString()}.\n` +
        "This dir will be honored for backward compatibility but is no longer canonical.\n" +
        "To migrate: `argismonitor data-dir --migrate` (no data is lost).\n" +
        "To silence this notice: ARGIS_LEGACY_OFF=1.\n",
      "utf-8"
    );
  } catch {
    // Best-effort marker write; the stderr banner is the user-visible hint.
  }
  process.stderr.write(
    "\x1b[33m⚠ ArgisMonitor: legacy data dir detected at " +
      legacyDir +
      "\x1b[0m\n" +
      "  Your install still works, but the canonical dir is now ~/.argismonitor.\n" +
      "  Migrate with: argismonitor data-dir --migrate\n" +
      "  Silence with:  ARGIS_LEGACY_OFF=1\n" +
      "  See docs/RENAMES-STRATEGY.md for the removal window.\n"
  );
}

function normalizeConfiguredPath(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? path.resolve(trimmed) : null;
}

function safeHomeDir() {
  try {
    return os.homedir();
  } catch {
    return process.env.HOME || process.env.USERPROFILE || os.tmpdir();
  }
}

export function getLegacyDotDataDir(homeDir = safeHomeDir()) {
  // Preserve the legacy `~/.omniroute` path so existing installs don't lose
  // their `storage.sqlite`. This is consumed by `getDefaultDataDir` below.
  return path.join(homeDir, `.${LEGACY_APP_NAME}`);
}

export function getDefaultDataDir() {
  const homeDir = safeHomeDir();

  // ArgisMonitor canonical data dir is `~/.argismonitor` (or platform
  // equivalent on win32). Legacy `~/.omniroute` is honored if present.
  const canonicalDir = path.join(homeDir, `.${APP_NAME}`);
  const legacyDir = getLegacyDotDataDir(homeDir);

  if (fs.existsSync(canonicalDir)) {
    try {
      if (fs.statSync(canonicalDir).isDirectory()) {
        return canonicalDir;
      }
    } catch {
      // Ignore stat errors and continue to the platform default.
    }
  }

  if (fs.existsSync(legacyDir)) {
    try {
      if (fs.statSync(legacyDir).isDirectory()) {
        emitLegacyTombstoneOnce(legacyDir);
        return legacyDir;
      }
    } catch {
      // Ignore stat errors and continue to the platform default.
    }
  }

  if (process.platform === "win32") {
    const appData = process.env.APPDATA || path.join(homeDir, "AppData", "Roaming");
    return path.join(appData, APP_NAME);
  }

  const xdgConfigHome = normalizeConfiguredPath(process.env.XDG_CONFIG_HOME);
  if (xdgConfigHome) return path.join(xdgConfigHome, APP_NAME);

  return canonicalDir;
}

export function resolveDataDir() {
  // ARGIS_DATA_DIR wins over OMNIROUTE_DATA_DIR over DATA_DIR.
  const configured =
    normalizeConfiguredPath(process.env.ARGIS_DATA_DIR) ||
    normalizeConfiguredPath(process.env.OMNIROUTE_DATA_DIR) ||
    normalizeConfiguredPath(process.env.DATA_DIR);
  if (configured) return configured;

  return getDefaultDataDir();
}

export function resolveStoragePath(dataDir = resolveDataDir()) {
  return path.join(dataDir, "storage.sqlite");
}
