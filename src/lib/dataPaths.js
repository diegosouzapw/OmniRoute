"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_NAME = void 0;
exports.getLegacyDotDataDir = getLegacyDotDataDir;
exports.getDefaultDataDir = getDefaultDataDir;
exports.resolveDataDir = resolveDataDir;
exports.isSamePath = isSamePath;
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
exports.APP_NAME = "omniroute";
function fallbackHomeDir() {
  const envHome = process.env.HOME || process.env.USERPROFILE;
  if (typeof envHome === "string" && envHome.trim().length > 0) {
    return path_1.default.resolve(envHome);
  }
  return os_1.default.tmpdir();
}
function safeHomeDir() {
  try {
    return os_1.default.homedir();
  } catch {
    return fallbackHomeDir();
  }
}
function normalizeConfiguredPath(dir) {
  if (typeof dir !== "string") return null;
  const trimmed = dir.trim();
  if (!trimmed) return null;
  return path_1.default.resolve(trimmed);
}
function getLegacyDotDataDir() {
  return path_1.default.join(safeHomeDir(), `.${exports.APP_NAME}`);
}
function getDefaultDataDir() {
  const homeDir = safeHomeDir();
  if (process.platform === "win32") {
    const appData = process.env.APPDATA || path_1.default.join(homeDir, "AppData", "Roaming");
    return path_1.default.join(appData, exports.APP_NAME);
  }
  // Support XDG on Linux/macOS when explicitly configured.
  const xdgConfigHome = normalizeConfiguredPath(process.env.XDG_CONFIG_HOME);
  if (xdgConfigHome) {
    return path_1.default.join(xdgConfigHome, exports.APP_NAME);
  }
  return getLegacyDotDataDir();
}
function resolveDataDir({ isCloud = false } = {}) {
  if (isCloud) return "/tmp";
  const configured = normalizeConfiguredPath(process.env.DATA_DIR);
  if (configured) return configured;
  return getDefaultDataDir();
}
function isSamePath(a, b) {
  if (!a || !b) return false;
  const normalizedA = path_1.default.resolve(a);
  const normalizedB = path_1.default.resolve(b);
  if (process.platform === "win32") {
    return normalizedA.toLowerCase() === normalizedB.toLowerCase();
  }
  return normalizedA === normalizedB;
}
