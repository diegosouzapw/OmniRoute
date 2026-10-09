/** Environment isolation shared by every third-party CLI launcher. */

const SAFE_KEYS = new Set([
  "APPDATA",
  "CI",
  "COLORTERM",
  "ComSpec",
  "EDITOR",
  "FORCE_COLOR",
  "HOME",
  "LANG",
  "LOCALAPPDATA",
  "NO_COLOR",
  "PAGER",
  "PATHEXT",
  "PATH",
  "Path",
  "PWD",
  "SHELL",
  "SSL_CERT_DIR",
  "SSL_CERT_FILE",
  "SystemRoot",
  "TEMP",
  "TERM",
  "TERM_PROGRAM",
  "TERM_PROGRAM_VERSION",
  "TMP",
  "TMPDIR",
  "TZ",
  "USERPROFILE",
  "VISUAL",
  "WSL_DISTRO_NAME",
  "WSL_INTEROP",
  "XDG_CACHE_HOME",
  "XDG_CONFIG_HOME",
  "XDG_DATA_HOME",
  "XDG_RUNTIME_DIR",
  "NODE_EXTRA_CA_CERTS",
]);

function safeKey(key) {
  return SAFE_KEYS.has(key) || key.startsWith("LC_");
}

/**
 * Third-party CLI binaries must not inherit OmniRoute/provider/database secrets
 * merely because the parent loaded its server `.env`. Operators can explicitly
 * opt into the historical full-shell behavior with `--inherit-env`.
 */
export function buildSafeCliLaunchEnv(source = process.env, { inheritEnv = false } = {}) {
  if (inheritEnv) return { ...source };
  return Object.fromEntries(
    Object.entries(source).filter(([key, value]) => safeKey(key) && value !== undefined)
  );
}
