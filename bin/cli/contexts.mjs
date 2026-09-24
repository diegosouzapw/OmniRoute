import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { resolveDataDir } from "./data-dir.mjs";
import { writePrivateFileAtomic } from "./private-file.mjs";

const CONFIG_VERSION = 1;
const KEYCHAIN_SERVICE = "omniroute-cli";
const KEYCHAIN_DISABLED = /^(1|true|yes|on)$/i.test(
  String(process.env.OMNIROUTE_CONTEXT_KEYCHAIN_DISABLED || "")
);

// `keytar` is optional and native. Keeping it behind a small interface lets
// headless installs use the same CLI without requiring libsecret/Keychain at
// install time, while tests can inject a deterministic fake backend.
let keychainBackend = null;
let keychainOperational = true;
let warnedPlaintextFallback = false;
const credentialCache = new Map();

function isKeychainBackend(value) {
  return (
    value &&
    typeof value.getPassword === "function" &&
    typeof value.setPassword === "function" &&
    typeof value.deletePassword === "function"
  );
}

async function loadKeychainBackend() {
  if (KEYCHAIN_DISABLED) return null;
  try {
    const imported = await import("keytar");
    const candidate = isKeychainBackend(imported?.default) ? imported.default : imported;
    return isKeychainBackend(candidate) ? candidate : null;
  } catch {
    // Native keychain modules are optional and commonly unavailable in
    // containers. The secure file fallback is handled explicitly below.
    return null;
  }
}

function parseCredential(value) {
  if (!value || typeof value !== "string") return null;
  try {
    const parsed = JSON.parse(value);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    const result = {};
    if (typeof parsed.accessToken === "string" && parsed.accessToken) {
      result.accessToken = parsed.accessToken;
    }
    if (typeof parsed.apiKey === "string" && parsed.apiKey) result.apiKey = parsed.apiKey;
    return result.accessToken || result.apiKey ? result : null;
  } catch {
    // Older/externally managed entries may contain one raw token.
    return { accessToken: value };
  }
}

function credentialForContext(context) {
  const ref = context && typeof context.credentialRef === "string" ? context.credentialRef : "";
  return ref ? credentialCache.get(ref) || null : null;
}

function applyCachedCredential(context) {
  const cached = credentialForContext(context);
  if (!cached) return { ...context };
  return { ...context, ...cached };
}

async function hydrateCredentialCache(cfg) {
  if (!keychainBackend || !keychainOperational) return;
  const contexts = cfg?.contexts || cfg?.profiles || {};
  for (const context of Object.values(contexts)) {
    const ref = context && typeof context === "object" ? context.credentialRef : null;
    if (!ref || credentialCache.has(ref)) continue;
    try {
      const parsed = parseCredential(await keychainBackend.getPassword(KEYCHAIN_SERVICE, ref));
      if (parsed) credentialCache.set(ref, parsed);
    } catch {
      keychainOperational = false;
      break;
    }
  }
}

function warnPlaintextFallback() {
  if (warnedPlaintextFallback) return;
  warnedPlaintextFallback = true;
  process.stderr.write(
    "Warning: OS keychain unavailable; context credentials use config.json mode 0600 fallback.\n"
  );
}

function readConfigFile() {
  try {
    if (!existsSync(configPath())) return defaultConfig();
    const parsed = JSON.parse(readFileSync(configPath(), "utf8"));
    return parsed && typeof parsed === "object" ? parsed : defaultConfig();
  } catch {
    return defaultConfig();
  }
}

// Resolve keychain state before importing commands can call the synchronous
// compatibility helpers below. Credentials themselves stay in memory; only a
// stable reference is persisted in config.json when keytar is available.
keychainBackend = await loadKeychainBackend();
await hydrateCredentialCache(readConfigFile());

export function configPath() {
  return join(resolveDataDir(), "config.json");
}

function defaultConfig() {
  return {
    version: CONFIG_VERSION,
    currentContext: "default",
    contexts: {
      default: { baseUrl: `http://localhost:${process.env.PORT || "20128"}`, apiKey: null },
    },
  };
}

export function loadContexts() {
  return readConfigFile();
}

/**
 * Load contexts for an explicit export operation.
 *
 * The persisted file intentionally contains only `credentialRef` for
 * keychain-backed contexts. Secret-bearing exports therefore have to hydrate
 * every referenced credential first. Fail closed when any reference cannot be
 * resolved so `--include-secrets` never produces a silently incomplete backup.
 */
export async function loadContextsForExport({ includeSecrets = false } = {}) {
  const cfg = readConfigFile();
  if (!includeSecrets) return cfg;

  await hydrateCredentialCache(cfg);
  const out = JSON.parse(JSON.stringify(cfg));
  const contexts = out.contexts || out.profiles || {};
  const unresolved = [];
  for (const [name, context] of Object.entries(contexts)) {
    if (!context || typeof context !== "object" || !context.credentialRef) continue;
    const credential = credentialForContext(context);
    if (!credential) {
      unresolved.push(name);
      continue;
    }
    Object.assign(context, credential);
  }
  if (unresolved.length > 0) {
    throw new Error(`Cannot include keychain credentials for context(s): ${unresolved.join(", ")}`);
  }
  return out;
}

/**
 * Synchronous compatibility writer. New credential-bearing code should use
 * `saveContextsSecure()` so tokens are moved to the OS keychain when possible.
 */
export function saveContexts(cfg) {
  const path = configPath();
  writePrivateFileAtomic(path, JSON.stringify(cfg, null, 2));
}

/** Stable keychain reference; the reference itself is safe to persist in JSON. */
export function contextCredentialRef(name) {
  return `${KEYCHAIN_SERVICE}:context:${encodeURIComponent(String(name))}`;
}

/** Expose a non-secret capability status for diagnostics and tests. */
export function getContextKeychainStatus() {
  return {
    available: Boolean(keychainBackend && keychainOperational),
    disabled: KEYCHAIN_DISABLED,
    fallback: !keychainBackend || !keychainOperational,
  };
}

/**
 * Store context credentials through keytar and write only a credentialRef to
 * config.json. If keytar cannot be used, preserve the credential in the
 * mode-0600 file and emit one explicit warning instead of breaking headless
 * installs.
 */
export async function saveContextsSecure(cfg) {
  const source = cfg && typeof cfg === "object" ? cfg : defaultConfig();
  const next = JSON.parse(JSON.stringify(source));
  next.version = next.version || CONFIG_VERSION;
  if (!next.contexts && next.profiles) {
    next.contexts = next.profiles;
    delete next.profiles;
  }
  next.contexts = next.contexts || {};

  for (const [name, raw] of Object.entries(next.contexts)) {
    const context = raw && typeof raw === "object" ? raw : {};
    const accessToken = typeof context.accessToken === "string" ? context.accessToken : "";
    const apiKey = typeof context.apiKey === "string" ? context.apiKey : "";
    const hasCredential = Boolean(accessToken || apiKey);

    if (hasCredential && keychainBackend && keychainOperational) {
      const ref =
        typeof context.credentialRef === "string" && context.credentialRef
          ? context.credentialRef
          : contextCredentialRef(name);
      try {
        await keychainBackend.setPassword(
          KEYCHAIN_SERVICE,
          ref,
          JSON.stringify({
            ...(accessToken ? { accessToken } : {}),
            ...(apiKey ? { apiKey } : {}),
          })
        );
        credentialCache.set(ref, {
          ...(accessToken ? { accessToken } : {}),
          ...(apiKey ? { apiKey } : {}),
        });
        context.credentialRef = ref;
        delete context.accessToken;
        delete context.apiKey;
      } catch {
        keychainOperational = false;
        warnPlaintextFallback();
      }
    } else if (hasCredential) {
      warnPlaintextFallback();
    }

    next.contexts[name] = context;
  }

  saveContexts(next);
  return {
    usedKeychain: Boolean(keychainBackend && keychainOperational),
    config: next,
  };
}

/** Remove the keychain entry associated with a context, if one exists. */
export async function deleteContextCredential(name, context) {
  const cfg = loadContexts();
  const candidate = context || cfg.contexts?.[name] || cfg.profiles?.[name] || {};
  const ref = candidate.credentialRef || contextCredentialRef(name);
  credentialCache.delete(ref);
  if (!keychainBackend || !keychainOperational) return false;
  try {
    await keychainBackend.deletePassword(KEYCHAIN_SERVICE, ref);
    return true;
  } catch {
    keychainOperational = false;
    return false;
  }
}

/** Explicitly migrate legacy plaintext context credentials. */
export async function migrateContextCredentials() {
  const cfg = loadContexts();
  const pending = Object.values(cfg.contexts || cfg.profiles || {}).some(
    (context) => context?.accessToken || context?.apiKey
  );
  if (!pending) return { migrated: false, pending: false, ...getContextKeychainStatus() };
  const result = await saveContextsSecure(cfg);
  return { migrated: result.usedKeychain, pending: true, ...getContextKeychainStatus() };
}

/** Test-only backend injection; no secret is returned by this function. */
export async function setContextKeychainBackendForTests(backend) {
  keychainBackend = isKeychainBackend(backend) ? backend : null;
  keychainOperational = true;
  credentialCache.clear();
  await hydrateCredentialCache(readConfigFile());
}

/**
 * Resolve the active context for a CLI invocation.
 *
 * Canonical schema is `{ currentContext, contexts }` (written by
 * `omniroute contexts ...`). For backward compatibility we also read the legacy
 * `{ activeProfile, profiles }` shape and a bare top-level `baseUrl` — older
 * configs and `api.mjs::getBaseUrl` used those before remote-mode unified the
 * store. `overrideName` (from `--context`/`OMNIROUTE_CONTEXT`) wins when set.
 *
 * A context may carry `{ baseUrl, accessToken?, apiKey?, scope?, description? }`.
 * `accessToken` is the scoped CLI access token (preferred); `apiKey` is the
 * legacy inference key kept for back-compat.
 */
export function resolveActiveContext(overrideName) {
  const cfg = loadContexts();
  const contexts = cfg.contexts || cfg.profiles || {};
  const name = overrideName || cfg.currentContext || cfg.activeProfile || "default";
  const found = contexts[name] || contexts.default;
  if (found) return applyCachedCredential(found);
  if (cfg.baseUrl) return { baseUrl: cfg.baseUrl };
  return { baseUrl: `http://localhost:${process.env.PORT || "20128"}` };
}

/** Async variant for callers that need to observe a just-created keychain entry. */
export async function resolveActiveContextAsync(overrideName) {
  await hydrateCredentialCache(readConfigFile());
  return resolveActiveContext(overrideName);
}
