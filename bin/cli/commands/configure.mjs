import os from "node:os";
import path from "node:path";
import { existsSync, mkdirSync, writeFileSync, copyFileSync } from "node:fs";
import { apiFetch } from "../api.mjs";
import { loadContexts, resolveActiveContext } from "../contexts.mjs";
import { createPrompt, printSuccess, printError, printInfo, printHeading } from "../io.mjs";
import { t } from "../i18n.mjs";
import { guardHostConfigTarget } from "../utils/config-home-guard.mjs";
import {
  getModelPreferenceState,
  loadModelPreferences,
  rankPreferredModels,
  recordModelPreference,
} from "../model-preferences.mjs";
import { listManifestTargets, resolveManifestTarget } from "../cli-manifest.mjs";

/**
 * `omniroute configure <cli>` — interactive provider+model picker that writes a
 * local CLI config pointed at the ACTIVE OmniRoute context (local or remote).
 *
 * The model catalog comes from the active context's GET /v1/models, so when you
 * are in remote mode (`omniroute connect ...`) you pick from the remote server's
 * live models and the profile is written on THIS machine.
 *
 * Codex keeps its profile-specific TOML files. Other targets delegate to their
 * existing setup-* recipe after the same provider/model selection, so the
 * picker remains a read-only orchestration layer and does not duplicate config
 * merge logic.
 */

const SUPPORTED = listManifestTargets("configure");

export const SETUP_MODULES = {
  claude: { module: "./setup-claude.mjs", exportName: "runSetupClaudeCommand" },
  opencode: { module: "./setup-opencode.mjs", exportName: "runSetupOpencodeCommand" },
  omp: { module: "./setup-omp.mjs", exportName: "runSetupOmpCommand" },
  qwen: { module: "./setup-qwen.mjs", exportName: "runSetupQwenCommand" },
  aider: { module: "./setup-aider.mjs", exportName: "runSetupAiderCommand" },
  goose: { module: "./setup-goose.mjs", exportName: "runSetupGooseCommand" },
  cline: { module: "./setup-cline.mjs", exportName: "runSetupClineCommand" },
  continue: { module: "./setup-continue.mjs", exportName: "runSetupContinueCommand" },
  kilo: { module: "./setup-kilo.mjs", exportName: "runSetupKiloCommand" },
  "5dive": { module: "./setup-5dive.mjs", exportName: "runSetup5diveCommand" },
};

/**
 * Materialize the active server before delegating to a setup recipe.
 *
 * `apiFetch` knows how to prefer a named context over an ambient
 * `OMNIROUTE_API_KEY`, but the older setup modules receive plain options and
 * resolve those themselves. Passing the resolved URL/key here keeps the
 * picker and the delegated recipe on the same local/remote target, including
 * Claude Code which predates context-aware setup resolution.
 */
export function resolveConfigureTargetOptions(opts = {}) {
  const resolved = { ...opts };
  const ambientKey = process.env.OMNIROUTE_API_KEY || "";
  const explicitRemote = opts.remote || opts.baseUrl;
  let context;
  try {
    context = resolveActiveContext(opts.context ?? process.env.OMNIROUTE_CONTEXT);
  } catch {
    // A missing/corrupt context file should retain the normal local fallback.
  }

  if (!explicitRemote) {
    const localDefault = `http://localhost:${opts.port || process.env.PORT || "20128"}`;
    const contextBase = String(context?.baseUrl || "").replace(/\/+$/, "");
    if (contextBase && contextBase !== localDefault) {
      resolved.remote = contextBase;
      resolved.baseUrl = contextBase;
    } else if (opts.port) {
      resolved.remote = localDefault;
      resolved.baseUrl = localDefault;
    }
  } else {
    // apiFetch resolves only `baseUrl` (then env/context), never `remote`.
    // Keep both fields on the same stripped URL so the picker catalog and
    // the delegated setup recipe talk to the same host.
    const cleaned = String(explicitRemote).replace(/\/+$/, "");
    resolved.remote = cleaned;
    resolved.baseUrl = cleaned;
  }

  const contextKey = context?.accessToken || context?.apiKey;
  if (contextKey && (!opts.apiKey || opts.apiKey === ambientKey)) {
    resolved.apiKey = contextKey;
  }
  return resolved;
}

export function listConfigureTargets() {
  return [...SUPPORTED];
}

export { getModelPreferenceState, rankPreferredModels };

function preferenceContextName(opts = {}) {
  if (opts.context || process.env.OMNIROUTE_CONTEXT) {
    return String(opts.context || process.env.OMNIROUTE_CONTEXT);
  }
  try {
    return String(loadContexts().currentContext || "default");
  } catch {
    return "default";
  }
}

/** Derive a short, filesystem-safe profile name from a model id. */
export function profileNameFromModel(modelId) {
  const afterProvider = String(modelId).includes("/")
    ? String(modelId).split("/").slice(1).join("/")
    : String(modelId);
  return afterProvider.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase() || "model";
}

/** Provider id for a catalog entry: explicit owned_by, else the id prefix. */
function providerOf(entry) {
  if (entry && typeof entry.owned_by === "string" && entry.owned_by) return entry.owned_by;
  const id = typeof entry === "string" ? entry : entry?.id || "";
  return id.includes("/") ? id.split("/")[0] : "(none)";
}

function contextWindowOf(entry) {
  for (const c of [entry?.context_length, entry?.max_context_window_tokens]) {
    if (typeof c === "number" && Number.isFinite(c) && c > 0) return c;
  }
  return null;
}

async function fetchModels(globalOpts) {
  const res = await apiFetch("/v1/models", { ...globalOpts, acceptNotOk: true });
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const b = await res.json();
      msg = b?.error?.message || b?.error || msg;
    } catch {
      /* ignore */
    }
    throw new Error(`Could not fetch models: ${msg}`);
  }
  const body = await res.json();
  const list = Array.isArray(body) ? body : body.data || body.models || [];
  return list.filter((m) => (typeof m === "string" ? m : m?.id));
}

function buildCodexProfile(modelId, ctx) {
  const lines = [
    `# codex --profile ${profileNameFromModel(modelId)}`,
    `# ${modelId} — generated by 'omniroute configure codex'`,
    `model                          = "${modelId}"`,
    `model_provider                 = "omniroute"`,
  ];
  if (ctx && ctx > 0) {
    const compact = Math.floor(ctx * 0.85);
    lines.push(`model_context_window           = ${ctx}`);
    lines.push(`model_auto_compact_token_limit = ${compact}`);
  }
  return lines.join("\n") + "\n";
}

async function configureCodex(modelId, ctxWindow, opts) {
  const codexHome = opts.codexHome || path.join(os.homedir(), ".codex");
  const guard = await guardHostConfigTarget(codexHome, {
    toolLabel: "Codex",
    hostCommand: "omniroute configure codex",
    allowContainerWrite: Boolean(opts.allowContainerWrite ?? opts["allow-container-write"]),
    dryRun: Boolean(opts.dryRun ?? opts["dry-run"]),
  });
  if (guard !== 0) return guard;
  if (opts.dryRun ?? opts["dry-run"]) {
    const profile = opts.name || profileNameFromModel(modelId);
    const filePath = path.join(codexHome, `${profile}.config.toml`);
    printInfo(`[dry-run] would write ${filePath}`);
    return 0;
  }
  if (!existsSync(codexHome)) mkdirSync(codexHome, { recursive: true });
  const profile = opts.name || profileNameFromModel(modelId);
  const filePath = path.join(codexHome, `${profile}.config.toml`);
  if (existsSync(filePath)) {
    copyFileSync(filePath, `${filePath}.bak`);
  }
  writeFileSync(filePath, buildCodexProfile(modelId, ctxWindow), "utf8");
  printSuccess(`Wrote ${filePath}`);
  printInfo(`Use it:  codex --profile ${profile}`);
  printInfo("Prereq: ~/.codex/config.toml must define the [model_providers.omniroute] block");
  printInfo("        (run the Codex setup once — see docs/guides/CODEX-CLI-CONFIGURATION.md).");
  return 0;
}

export async function runConfigureCommand(cli, opts = {}, cmd) {
  const target = resolveManifestTarget(cli, "configure");
  if (!target) {
    printError(`Unsupported CLI '${cli}'. Supported: ${SUPPORTED.join(", ")}.`);
    return 2;
  }
  if (opts.favorite && opts.unfavorite) {
    printError("Choose only one of --favorite or --unfavorite.");
    return 2;
  }
  const globalOpts = cmd ? cmd.optsWithGlobals() : {};
  const requestOpts = resolveConfigureTargetOptions({ ...globalOpts, ...opts });
  const contextKey = preferenceContextName({ ...globalOpts, ...opts });

  let models;
  try {
    models = await fetchModels(requestOpts);
  } catch (e) {
    printError(e instanceof Error ? e.message : String(e));
    return 1;
  }
  if (!models.length) {
    printError("The server returned no models.");
    return 1;
  }

  // Resolve model: explicit flags or interactive pick.
  let chosenId = opts.model;
  if (chosenId && opts.provider && !chosenId.includes("/")) {
    chosenId = `${opts.provider}/${chosenId}`;
  }

  if (!chosenId && !opts.yes) {
    const ids = models.map((m) => (typeof m === "string" ? m : m.id));
    const preferences = loadModelPreferences();
    const rankedIds = rankPreferredModels(target, ids, preferences, contextKey);
    const preferenceState = getModelPreferenceState(target, preferences, contextKey);
    const providers = [...new Set(models.map(providerOf))].sort();
    const prompt = createPrompt();
    try {
      printHeading(`Configure ${target} CLI`);
      let providerList = providers;
      if (opts.provider) {
        providerList = providers.filter((p) => p === opts.provider);
      } else {
        printInfo(`Providers: ${providers.join(", ")}`);
        const p = await prompt.ask("Provider");
        if (p) providerList = providers.filter((x) => x === p);
      }
      const inProvider = rankedIds.filter((id) =>
        providerList.includes(providerOf(byId(models, id)))
      );
      const candidates = inProvider.length ? inProvider : rankedIds;
      if (preferenceState.favorites.length) {
        printInfo(
          `Favorites: ${preferenceState.favorites.filter((id) => ids.includes(id)).join(", ")}`
        );
      }
      if (preferenceState.recent.length) {
        printInfo(`Recent: ${preferenceState.recent.filter((id) => ids.includes(id)).join(", ")}`);
      }
      printInfo(
        `Models: ${candidates.slice(0, 40).join(", ")}${candidates.length > 40 ? " …" : ""}`
      );
      chosenId = await prompt.ask("Model id");
    } finally {
      prompt.close();
    }
  }

  if (!chosenId) {
    printError("No model selected.");
    return 2;
  }
  const entry = byId(models, chosenId);
  if (!entry) {
    printError(`Model '${chosenId}' is not in the catalog.`);
    return 2;
  }
  const ctxWindow = contextWindowOf(entry);

  // Oh My Pi: after the default model is chosen, offer the per-role picker.
  // Enter = same as default (writes a `@default` alias), `skip` = leave the
  // role unset, otherwise `<model id>[:thinkingLevel]`. Non-interactive runs
  // (`--yes`) keep the generic single-model delegation.
  const ompRoleFlags = [];
  if (target === "omp" && !opts.yes) {
    const { OMP_VALID_ROLES } = await import("./setup-omp.mjs");
    const rolePrompt = createPrompt();
    try {
      printInfo(
        "Assign OMP roles: Enter = same as default, 'skip' = leave unset, or <model id>[:thinkingLevel]."
      );
      for (const role of OMP_VALID_ROLES.filter((r) => r !== "default")) {
        for (;;) {
          const answer = String((await rolePrompt.ask(`Role '${role}'`)) || "").trim();
          const parsed = parseOmpRoleAnswer(answer, models);
          if (parsed.kind === "invalid") {
            printError(`'${answer}' is not a catalog model id, @alias, or <id>:<thinkingLevel>.`);
            continue;
          }
          if (parsed.kind !== "skip") ompRoleFlags.push(`${role}=${parsed.flag}`);
          break;
        }
      }
    } finally {
      rolePrompt.close();
    }
  }

  let result;
  if (target === "codex") {
    result = await configureCodex(chosenId, ctxWindow, opts);
  } else {
    const setup = SETUP_MODULES[target];
    if (!setup) {
      printError(`No setup recipe is registered for '${target}'.`);
      return 2;
    }

    try {
      const module = await import(setup.module);
      const runSetup = module[setup.exportName];
      if (typeof runSetup !== "function") {
        printError(`Setup recipe '${target}' is unavailable.`);
        return 1;
      }

      const setupOpts = buildConfigureSetupOpts({
        requestOpts,
        opts,
        chosenId,
        ompRoleFlags,
        target,
      });
      result = await runSetup(setupOpts);
    } catch (error) {
      printError(error instanceof Error ? error.message : String(error));
      return 1;
    }
  }

  if (result === 0 && !(opts.dryRun ?? opts["dry-run"])) {
    recordModelPreference(target, chosenId, {
      favorite: Boolean(opts.favorite),
      unfavorite: Boolean(opts.unfavorite),
      context: contextKey,
    });
  }
  return result;
}

/** Thinking levels documented by OMP 18.x (`omp --help`: --thinking). */
const OMP_THINKING_LEVELS = Object.freeze([
  "off",
  "minimal",
  "low",
  "medium",
  "high",
  "xhigh",
  "max",
  "auto",
]);

/**
 * Classify one per-role picker answer against the live catalog.
 *
 * - ""             -> { kind: "alias", flag: "@default" } (same as default)
 * - "skip" | "s"   -> { kind: "skip" }
 * - "@role"        -> { kind: "alias", flag } — OMP alias, never catalog-checked
 * - "<id>"         -> { kind: "assign", flag } when the id is in the catalog
 * - "<id>:<level>" -> { kind: "assign", flag } when <level> is a documented
 *                     thinking level
 * - anything else  -> { kind: "invalid" }
 *
 * An `omniroute/` prefix is tolerated: the writer re-adds it, so the catalog
 * lookup uses the bare id.
 */
export function parseOmpRoleAnswer(answer, catalog = []) {
  const value = String(answer ?? "").trim();
  if (!value) return { kind: "alias", flag: "@default" };
  if (/^(skip|s)$/i.test(value)) return { kind: "skip" };
  if (value.startsWith("@")) return { kind: "alias", flag: value };

  // Catalog first: an id may legitimately contain a colon
  // (`auto/coding:max`), so an exact match always wins over suffix parsing.
  const bare = (id) => (id.startsWith("omniroute/") ? id.slice("omniroute/".length) : id);
  if (byId(catalog, bare(value))) return { kind: "assign", flag: value };

  // Fallback: `<id>:<documented thinking level>`, split from the RIGHT.
  const cut = value.lastIndexOf(":");
  if (cut <= 0) return { kind: "invalid" };
  const suffix = value.slice(cut + 1);
  if (!OMP_THINKING_LEVELS.includes(suffix)) return { kind: "invalid" };
  const id = value.slice(0, cut);
  if (!id || !byId(catalog, bare(id))) return { kind: "invalid" };
  return { kind: "assign", flag: value };
}

/**
 * Options forwarded from the picker into a setup-* recipe. Pure + testable:
 * omp keeps the user's --yes (legacy-file delete), other recipes force yes.
 * Role flags are passed through as `role: string[]` when nonempty.
 */
export function buildConfigureSetupOpts({ requestOpts, opts, chosenId, ompRoleFlags, target }) {
  return {
    ...requestOpts,
    ...opts,
    model: chosenId,
    ...(ompRoleFlags?.length ? { role: ompRoleFlags } : {}),
    ...(target === "claude" || target === "continue" ? { only: chosenId } : {}),
    yes: target === "omp" ? Boolean(opts.yes) : true,
  };
}

function byId(models, id) {
  for (const m of models) {
    const mid = typeof m === "string" ? m : m.id;
    if (mid === id) return m;
  }
  return null;
}

export function registerConfigure(program) {
  program
    .command("configure <cli>")
    .description(
      t("configure.description") ||
        "Pick a provider+model from the active server and configure a supported local CLI"
    )
    .option("--port <port>", "Local OmniRoute port (ignored when --remote is set)", "20128")
    .option("--remote <url>", "Remote OmniRoute URL")
    .option("--context <name>", "Named local/remote context")
    .option("--api-key <key>", "OmniRoute API key (defaults to the active context/env)")
    .option("--provider <id>", "Provider id (skips the interactive provider prompt)")
    .option("--model <id>", "Model id (skips the interactive model prompt)")
    .option("--name <name>", "Profile name to write (default: derived from model)")
    .option("--codex-home <dir>", "Codex home dir (default: ~/.codex)")
    .option("--yes", "Non-interactive; requires --model")
    .option("--favorite", "Remember the selected model as a favorite for this CLI")
    .option("--unfavorite", "Remove the selected model from this CLI's favorites")
    .option("--dry-run", "Preview the generated config without writing")
    .option(
      "--allow-container-write",
      "Write the config even when OmniRoute runs in a container and the target is not mounted from the host"
    )
    .action(async (cli, opts, cmd) => {
      const code = await runConfigureCommand(cli, opts, cmd);
      if (code !== 0) process.exit(code);
    });
}
