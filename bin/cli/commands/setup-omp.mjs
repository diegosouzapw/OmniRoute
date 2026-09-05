/**
 * omniroute setup-omp — Oh My Pi (omp) provider + role generator.
 *
 * Writes the `omniroute` provider into ~/.omp/agent/models.yml (openai-completions
 * on the /v1 surface, openai-models-list discovery, API key referenced by the
 * OMNIROUTE_API_KEY env-var NAME — the literal secret is never written) and
 * merges the chosen model roles into ~/.omp/agent/config.yml. Remote-aware;
 * mirrors setup-opencode.mjs. Legacy models.json / models.yaml are migrated
 * into models.yml, never clobbered (deleted only with --yes).
 */

import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, join } from "node:path";
import os from "node:os";
import { printHeading, printInfo, printSuccess, printError } from "../io.mjs";
import { configPath as contextsConfigPath, resolveActiveContext } from "../contexts.mjs";
import { guardHostConfigTarget } from "../utils/config-home-guard.mjs";

// Lazy like continue.ts: keeps js-yaml off the CLI cold-start path.
let yaml = null;
async function loadYaml() {
  if (!yaml) yaml = await import("js-yaml");
  return yaml;
}

/** The ten model roles OMP understands. */
export const OMP_VALID_ROLES = Object.freeze([
  "default",
  "smol",
  "slow",
  "vision",
  "plan",
  "designer",
  "commit",
  "tiny",
  "task",
  "advisor",
]);

const PROVIDER_PREFIX = "omniroute/";

/** Ensure the URL ends with /v1 (OMP appends /chat/completions to it). */
export function ensureV1(url) {
  const s = String(url || "").replace(/\/+$/, "");
  return s.endsWith("/v1") ? s : `${s}/v1`;
}

/**
 * resolveActiveContext synthesizes a localhost default when no config file
 * exists — honor its baseUrl only when the contexts file was actually written,
 * so the 127.0.0.1 default below can engage on unconfigured machines.
 */
function configuredContextBaseUrl(overrideName) {
  try {
    if (!existsSync(contextsConfigPath())) return undefined;
    return resolveActiveContext(overrideName)?.baseUrl;
  } catch {
    return undefined;
  }
}

/** Resolve baseUrl + apiKey from flags → active context → localhost. */
export function resolveOmpTarget(opts = {}) {
  let baseUrl;
  if (opts.remote) {
    baseUrl = String(opts.remote).replace(/\/+$/, "");
  } else {
    baseUrl = configuredContextBaseUrl(opts.context ?? process.env.OMNIROUTE_CONTEXT);
    if (!baseUrl)
      baseUrl = `http://127.0.0.1:${Number(opts.port ?? process.env.PORT ?? 20128) || 20128}`;
  }

  let apiKey = opts.apiKey ?? opts["api-key"];
  if (!apiKey) {
    try {
      const c = resolveActiveContext(opts.context ?? process.env.OMNIROUTE_CONTEXT);
      apiKey = c?.accessToken || c?.apiKey;
    } catch {
      /* no context auth */
    }
  }
  if (!apiKey) apiKey = process.env.OMNIROUTE_API_KEY || "";
  return { baseUrl: baseUrl.replace(/\/+$/, ""), apiKey };
}

/** Strip an already-present provider prefix so ids never double up. */
function bareModelId(id) {
  const s = String(id || "").trim();
  return s.startsWith(PROVIDER_PREFIX) ? s.slice(PROVIDER_PREFIX.length) : s;
}

/** YAML mappings only — spreading a sequence would invent numeric keys. */
function assertYamlMapping(value, fileLabel, key) {
  if (value == null) return;
  if (typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`Cannot parse existing ${fileLabel}: expected a YAML mapping at '${key}'`);
  }
}

/**
 * Turn --role <role>=<id[:thinking]> repeats + --model/--roles-all into a
 * modelRoles assignment map { role: "omniroute/<id>[:thinking]" }.
 * Pure + testable. Returns { assignments } or { error } (unknown role → exit 2).
 */
export function resolveOmpRoleAssignments(opts = {}) {
  const assignments = {};
  const model = typeof opts.model === "string" ? bareModelId(opts.model) : "";

  if (opts.rolesAll ?? opts["roles-all"]) {
    if (!model) return { error: "--roles-all requires --model to pick the model for every role." };
    for (const role of OMP_VALID_ROLES) assignments[role] = PROVIDER_PREFIX + model;
  }

  if (model) assignments.default = PROVIDER_PREFIX + model;

  const roleFlags = Array.isArray(opts.role) ? opts.role : opts.role ? [opts.role] : [];
  for (const raw of roleFlags) {
    const eq = String(raw).indexOf("=");
    if (eq <= 0)
      return { error: `Invalid --role '${raw}' — use --role <role>=<model[:thinking]>.` };
    const role = String(raw).slice(0, eq).trim();
    const value = String(raw)
      .slice(eq + 1)
      .trim();
    if (!OMP_VALID_ROLES.includes(role)) {
      return {
        error: `Unknown OMP role '${role}'. Valid roles: ${OMP_VALID_ROLES.join(", ")}.`,
      };
    }
    if (!value) return { error: `Invalid --role '${raw}' — empty model selection.` };
    assignments[role] = value.startsWith("@") ? value : PROVIDER_PREFIX + bareModelId(value);
  }
  return { assignments };
}

/**
 * Merge the generated omniroute provider into an existing models.yml document,
 * preserving ALL other providers (and unrelated root keys). Throws a readable
 * error on unparseable YAML. Pure + testable (yaml module injected).
 */
export function mergeOmpModelsYaml(y, existingText, generatedText) {
  const generated = y.load(generatedText);
  let doc = {};
  if (existingText != null && String(existingText).trim()) {
    try {
      doc = y.load(existingText);
    } catch (err) {
      throw new Error(`Cannot parse existing models.yml: ${err?.message || err}`);
    }
    if (doc == null) doc = {};
    if (typeof doc !== "object" || Array.isArray(doc)) {
      throw new Error("Cannot parse existing models.yml: expected a YAML mapping at the root");
    }
  }
  assertYamlMapping(doc.providers, "models.yml", "providers");
  const providers = { ...(doc.providers ?? {}), omniroute: generated.providers.omniroute };
  return y.dump({ ...doc, providers }, { lineWidth: -1 });
}

/**
 * Merge modelRoles assignments into an existing OMP config.yml (settings)
 * document, preserving every other key and every unselected role. Throws a
 * readable error on unparseable YAML. Pure + testable (yaml module injected).
 * Values starting with '@' (OMP alias references) are emitted quoted.
 */
export function mergeOmpSettingsYaml(y, existingText, assignments) {
  let doc = {};
  if (existingText != null && String(existingText).trim()) {
    try {
      doc = y.load(existingText);
    } catch (err) {
      throw new Error(`Cannot parse existing config.yml: ${err?.message || err}`);
    }
    if (doc == null) doc = {};
    if (typeof doc !== "object" || Array.isArray(doc)) {
      throw new Error("Cannot parse existing config.yml: expected a YAML mapping at the root");
    }
  }
  assertYamlMapping(doc.modelRoles, "config.yml", "modelRoles");
  const modelRoles = { ...(doc.modelRoles ?? {}) };
  for (const [role, value] of Object.entries(assignments)) modelRoles[role] = value;
  return y.dump({ ...doc, modelRoles }, { lineWidth: -1 });
}

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

/**
 * Scrub secret values for DISPLAY ONLY (dry-run output). The merged document
 * can contain pre-existing providers with literal credentials; those must
 * never be echoed to the terminal or evidence files. Parsed structurally:
 * any string value under a secret-ish key is replaced, EXCEPT env
 * references — an env-var NAME (`OMNIROUTE_API_KEY`) or a `$…` reference —
 * which is metadata, not a secret. A final key-shaped sweep covers
 * secrets sitting under non-secret keys.
 */
const SECRET_KEY_RE = /api[_-]?key|token|authorization|secret|password/i;
const ENV_NAME_RE = /^[A-Z][A-Z0-9_]*$/;

function redactNode(node) {
  if (Array.isArray(node)) return node.map(redactNode);
  if (node && typeof node === "object") {
    const out = {};
    for (const [key, value] of Object.entries(node)) {
      out[key] =
        SECRET_KEY_RE.test(key) && typeof value === "string"
          ? ENV_NAME_RE.test(value) || value.startsWith("$")
            ? value
            : "[redacted]"
          : redactNode(value);
    }
    return out;
  }
  return node;
}

export function redactForDisplay(y, text) {
  const sweep = (s) =>
    s
      .replace(/(sk|pk|rk)-[A-Za-z0-9_-]{8,}/g, "[redacted-key]")
      .replace(/oma_live_[A-Za-z0-9_-]+/g, "[redacted-key]");
  try {
    const doc = y.load(String(text));
    return sweep(y.dump(redactNode(doc), { lineWidth: -1 }));
  } catch {
    return sweep(String(text));
  }
}

export async function runSetupOmpCommand(opts = {}) {
  const { baseUrl, apiKey } = resolveOmpTarget(opts);
  const dryRun = Boolean(opts.dryRun ?? opts["dry-run"]);
  const yes = Boolean(opts.yes);
  // Backup-on-overwrite is the repo convention (config.mjs, configure codex,
  // update.mjs all default to keeping a .bak); --no-backup opts out.
  const backup = Boolean(opts.backup ?? true);

  const { assignments, error: roleError } = resolveOmpRoleAssignments(opts);
  if (roleError) {
    printError(roleError);
    return 2;
  }
  const hasAssignments = Object.keys(assignments).length > 0;

  const ompAgentDir = join(os.homedir(), ".omp", "agent");
  const modelsPath = opts.configPath ?? opts["config-path"] ?? join(ompAgentDir, "models.yml");
  const settingsPath =
    opts.settingsPath ?? opts["settings-path"] ?? join(ompAgentDir, "config.yml");

  printHeading("OmniRoute → Oh My Pi (omp) provider (openai-completions)");
  printInfo(`Connecting to ${baseUrl} …`);

  const guard = await guardHostConfigTarget(modelsPath, {
    toolLabel: "Oh My Pi",
    hostCommand: "omniroute setup-omp",
    allowContainerWrite: Boolean(opts.allowContainerWrite ?? opts["allow-container-write"]),
    dryRun,
  });
  if (guard !== 0) return guard;

  // Deferred import: omp.ts is TypeScript; tsx is registered by
  // bin/omniroute.mjs before any command runs, so importing here is safe.
  let generated;
  let y;
  try {
    const { generateOmpConfig } =
      await import("../../../src/lib/cli-helper/config-generator/omp.ts");
    y = await loadYaml();
    generated = await generateOmpConfig({ baseUrl, apiKey, model: opts.model });
  } catch (err) {
    printError(`Failed to generate OMP config: ${err?.message || err}`);
    printInfo("Make sure OmniRoute is running and --remote/--api-key are correct.");
    return 1;
  }

  // Migrate a legacy models file when models.yml does not exist yet. The legacy
  // file itself is never clobbered; it is removed only after a successful write
  // AND an explicit --yes.
  let existingModelsText = null;
  let legacyPath = null;
  let legacyKind = null;
  if (existsSync(modelsPath)) {
    existingModelsText = readFileSync(modelsPath, "utf8");
  } else {
    const legacyJson = join(dirname(modelsPath), "models.json");
    const legacyYaml = join(dirname(modelsPath), "models.yaml");
    if (existsSync(legacyJson)) {
      legacyPath = legacyJson;
      legacyKind = "json";
    } else if (existsSync(legacyYaml)) {
      legacyPath = legacyYaml;
      legacyKind = "yaml";
    }
  }
  if (legacyKind === "json") {
    try {
      existingModelsText = y.dump(JSON.parse(readFileSync(legacyPath, "utf8")), {
        lineWidth: -1,
      });
    } catch (err) {
      printError(`Cannot migrate legacy ${legacyPath}: ${err?.message || err}`);
      return 1;
    }
  } else if (legacyKind === "yaml") {
    existingModelsText = readFileSync(legacyPath, "utf8");
  }

  let modelsDoc;
  let settingsDoc = null;
  try {
    modelsDoc = mergeOmpModelsYaml(y, existingModelsText, generated);
    const existingSettings = existsSync(settingsPath) ? readFileSync(settingsPath, "utf8") : null;
    if (hasAssignments || existingSettings != null) {
      settingsDoc = hasAssignments
        ? mergeOmpSettingsYaml(y, existingSettings, assignments)
        : existingSettings;
    }
  } catch (err) {
    printError(err?.message || String(err));
    return 1;
  }

  if (dryRun) {
    console.log(`# ${modelsPath}`);
    console.log(redactForDisplay(y, modelsDoc));
    console.log(`# ${settingsPath}`);
    console.log(settingsDoc != null ? redactForDisplay(y, settingsDoc) : "(no changes)");
    printInfo("[dry-run] nothing was written");
    return 0;
  }

  for (const p of [modelsPath, settingsPath]) {
    const dir = dirname(p);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  }
  if (backup && existsSync(modelsPath)) {
    const bak = `${modelsPath}.bak-${timestamp()}`;
    copyFileSync(modelsPath, bak);
    printInfo(`Backup written to ${bak}`);
  }

  writeFileSync(modelsPath, modelsDoc, "utf8");
  printSuccess(`${basename(modelsPath)} updated at ${modelsPath} (provider 'omniroute')`);
  if (settingsDoc != null && hasAssignments) {
    writeFileSync(settingsPath, settingsDoc, "utf8");
    printSuccess(
      `${basename(settingsPath)} updated at ${settingsPath} (roles: ${Object.keys(assignments).join(", ")})`
    );
  }
  if (legacyPath && yes) {
    unlinkSync(legacyPath);
    printInfo(`Removed legacy ${legacyPath} (migrated into ${basename(modelsPath)})`);
  } else if (legacyPath) {
    printInfo(`Legacy ${legacyPath} left in place (pass --yes to remove it after migrating)`);
  }

  printInfo('Use it:  omp --model omniroute/<model> -p "..."   (export OMNIROUTE_API_KEY first)');
  return 0;
}

export function registerSetupOmp(program) {
  const collect = (value, prev) => prev.concat([value]);
  program
    .command("setup-omp")
    .description(
      "Generate the OmniRoute provider in Oh My Pi's ~/.omp/agent/models.yml " +
        "and merge model roles into config.yml (local or remote OmniRoute)"
    )
    .option("--port <port>", "Local OmniRoute port (ignored when --remote is set)", "20128")
    .option("--remote <url>", "Remote OmniRoute URL, e.g. http://192.168.0.15:20128")
    .option("--api-key <key>", "OmniRoute API key (defaults to OMNIROUTE_API_KEY env var)")
    .option("--model <id>", "Set the default model role (omniroute/<id>)")
    .option(
      "--role <selection>",
      "Assign a role: --role <role>=<model[:thinking]> (repeatable)",
      collect,
      []
    )
    .option("--roles-all", "Assign ALL roles to the --model selection")
    .option("--yes", "Non-interactive; allows removing a migrated legacy models file")
    .option("--dry-run", "Print both documents without touching the filesystem")
    .option("--config-path <path>", "Override the models.yml target path")
    .option("--settings-path <path>", "Override the config.yml (settings) target path")
    .option("--backup", "Write models.yml.bak-<timestamp> before overwriting (default)")
    .option("--no-backup", "Skip the models.yml backup")
    .option(
      "--allow-container-write",
      "Write even when the target is inside a container and not mounted from the host"
    )
    .action(async (opts) => {
      const code = await runSetupOmpCommand(opts);
      if (code !== 0) process.exit(code);
    });
}
