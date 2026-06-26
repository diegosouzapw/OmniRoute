/**
 * omniroute setup remote — Aggregator that wires the existing connect /
 * tokens / contexts commands into a single guided flow.
 *
 * Why a separate command:
 *   - Users coming from "I want remote mode" land on `omniroute setup`
 *     first. A dedicated `setup remote` subcommand that dispatches to the
 *     correct underlying primitive (connect, tokens create/list/revoke,
 *     contexts list/use/add/remove) means nobody has to know the command
 *     tree in advance.
 *   - The aggregator is intentionally additive: it never rewrites
 *     existing contexts, only surfaces the right next action.
 *
 * Implementation choice — delegate via subprocess:
 *   The existing `registerTokens` / `registerContexts` wire their action
 *   handlers directly into Commander and call `process.exit(...)` on
 *   errors. Re-using them from in-process code would either require
 *   refactoring those files (out of scope for this PR) or racing the
 *   exit. Spawning `bin/omniroute.mjs` is a one-line subprocess shim that
 *   keeps the existing semantics intact and inherits all global flags
 *   (--api-key, --base-url, --context, --output, --quiet) for free.
 *
 * Subcommands:
 *   - (none) / status → summarise current context(s) and print next step
 *   - connect <host>  → delegates to `omniroute connect <host>`
 *   - tokens <create|list|revoke|scopes>  → delegates to `omniroute tokens …`
 *   - contexts <list|add|use|current|show|remove>  → delegates to `omniroute contexts …`
 */

import { spawnSync } from "node:child_process";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

import { printHeading, printInfo, printError } from "../io.mjs";
import { loadContexts } from "../contexts.mjs";
import { t } from "../i18n.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, "..", "..", "..");
const OMNIROUTE_ENTRY = join(REPO_ROOT, "bin", "omniroute.mjs");

export const REMOTE_SUBCOMMANDS = ["status", "connect", "tokens", "contexts", "dispatch"];

/** Actions accepted by `omniroute tokens` (kept in sync with registerTokens). */
export const TOKENS_ACTIONS = ["create", "list", "revoke", "scopes"];

/** Actions accepted by `omniroute contexts` (kept in sync with registerContexts). */
export const CONTEXTS_ACTIONS = ["list", "add", "use", "current", "show", "remove"];

/**
 * Summarise the current context config. Used by `setup remote status`
 * and as the no-arg default.
 *
 * @returns {{ current: string|null, contexts: Array<{name:string, baseUrl:string, scope?:string}> }}
 */
export function summariseRemoteState() {
  const cfg = loadContexts();
  const contexts = cfg?.contexts || {};
  const current = cfg?.currentContext || null;
  const list = Object.entries(contexts).map(([name, c]) => ({
    name,
    baseUrl: c?.baseUrl || "",
    scope: c?.scope || (c?.accessToken ? "token" : "unknown"),
  }));
  return { current, contexts: list };
}

/**
 * Spawn the omniroute entry script with `args` appended, propagating the
 * parent's stdio so output streams through unchanged.
 *
 * @param {string[]} args
 * @returns {number} child exit code (0 on success)
 */
export function delegateToCli(args) {
  const argv = [OMNIROUTE_ENTRY, ...args];
  const res = spawnSync(process.execPath, argv, {
    cwd: REPO_ROOT,
    stdio: "inherit",
    shell: false,
  });
  return typeof res.status === "number" ? res.status : 1;
}

/**
 * Inner action runner. Pure (no Commander coupling).
 *
 * @param {{ sub?: string, args?: string[], json?: boolean, output?: string }} opts
 * @returns {Promise<{ exitCode: number, payload?: object }>}
 */
export async function runSetupRemoteCommand(opts = {}) {
  const wantsJson = Boolean(opts.json || opts.output === "json");
  const sub = opts.sub || "status";
  const rest = Array.isArray(opts.args) ? opts.args : [];

  if (!REMOTE_SUBCOMMANDS.includes(sub)) {
    const msg = `Unknown subcommand '${sub}'. Valid: ${REMOTE_SUBCOMMANDS.join(", ")}`;
    if (wantsJson) return { exitCode: 2, payload: { error: msg, valid: REMOTE_SUBCOMMANDS } };
    printError(msg);
    return { exitCode: 2 };
  }

  if (sub === "status") {
    const { current, contexts } = summariseRemoteState();
    const next =
      contexts.length === 0
        ? "omniroute setup remote connect <host>"
        : current
          ? "omniroute setup remote tokens list  (rotate, revoke, or add tokens)"
          : "omniroute setup remote contexts use <name>";
    const payload = { current, contexts, next };
    if (wantsJson) {
      console.log(JSON.stringify(payload, null, 2));
      return { exitCode: 0, payload };
    }
    printHeading("OmniRoute → Remote mode");
    if (contexts.length === 0) {
      printInfo("No contexts saved yet.");
      printInfo("Next: omniroute setup remote connect <host>");
      return { exitCode: 0 };
    }
    console.log("Saved contexts:");
    for (const c of contexts) {
      const marker = c.name === current ? "*" : " ";
      console.log(`  ${marker} ${c.name.padEnd(20)} ${c.baseUrl}  (scope: ${c.scope})`);
    }
    console.log("");
    if (current) {
      printInfo(`Active context: ${current}`);
      printInfo("Next: omniroute setup remote tokens list  (rotate, revoke, or add tokens)");
    } else {
      printInfo("No active context. Set one with:");
      printInfo("  omniroute setup remote contexts use <name>");
    }
    return { exitCode: 0 };
  }

  if (sub === "connect") {
    const [host, ...connectRest] = rest;
    if (!host) {
      const msg = "connect requires a host. Example: omniroute setup remote connect 192.168.0.15";
      if (wantsJson) return { exitCode: 2, payload: { error: msg } };
      printError(msg);
      return { exitCode: 2 };
    }
    if (!wantsJson)
      printInfo(`Delegating to: omniroute connect ${host} ${connectRest.join(" ")}`.trim());
    const code = delegateToCli(["connect", host, ...connectRest]);
    return { exitCode: code };
  }

  if (sub === "tokens") {
    const [action, ...tokensRest] = rest;
    if (!action) {
      const msg = `tokens requires an action. Valid: ${TOKENS_ACTIONS.join(", ")}`;
      if (wantsJson) return { exitCode: 2, payload: { error: msg, valid: TOKENS_ACTIONS } };
      printError(msg);
      return { exitCode: 2 };
    }
    if (!TOKENS_ACTIONS.includes(action)) {
      const msg = `Unknown tokens action '${action}'. Valid: ${TOKENS_ACTIONS.join(", ")}`;
      if (wantsJson) return { exitCode: 2, payload: { error: msg, valid: TOKENS_ACTIONS } };
      printError(msg);
      return { exitCode: 2 };
    }
    if (!wantsJson)
      printInfo(`Delegating to: omniroute tokens ${action} ${tokensRest.join(" ")}`.trim());
    const code = delegateToCli(["tokens", action, ...tokensRest]);
    return { exitCode: code };
  }

  if (sub === "contexts") {
    const [action, ...ctxRest] = rest;
    if (!action) {
      const msg = `contexts requires an action. Valid: ${CONTEXTS_ACTIONS.join(", ")}`;
      if (wantsJson) return { exitCode: 2, payload: { error: msg, valid: CONTEXTS_ACTIONS } };
      printError(msg);
      return { exitCode: 2 };
    }
    if (!CONTEXTS_ACTIONS.includes(action)) {
      const msg = `Unknown contexts action '${action}'. Valid: ${CONTEXTS_ACTIONS.join(", ")}`;
      if (wantsJson) return { exitCode: 2, payload: { error: msg, valid: CONTEXTS_ACTIONS } };
      printError(msg);
      return { exitCode: 2 };
    }
    if (!wantsJson)
      printInfo(`Delegating to: omniroute contexts ${action} ${ctxRest.join(" ")}`.trim());
    const code = delegateToCli(["contexts", action, ...ctxRest]);
    return { exitCode: code };
  }

  if (sub === "dispatch") {
    // Internal: enumerate the wired dispatch table so tooling/tests can
    // discover what `setup remote` exposes without parsing --help.
    const dispatch = {
      status: "summarise saved contexts + suggest next step (default)",
      connect: "connect to a host and save as the active context",
      tokens: "create / list / revoke scoped access tokens on the active server",
      contexts: "list / add / use / show / remove saved server contexts",
    };
    const payload = {
      dispatch,
      tokenActions: TOKENS_ACTIONS,
      contextActions: CONTEXTS_ACTIONS,
    };
    if (wantsJson) {
      console.log(JSON.stringify(payload, null, 2));
      return { exitCode: 0, payload };
    }
    console.log("Remote-mode dispatch:");
    for (const [k, v] of Object.entries(dispatch)) console.log(`  ${k.padEnd(10)} → ${v}`);
    return { exitCode: 0 };
  }

  // Should never reach here because of the includes() check above.
  return { exitCode: 1 };
}

/**
 * Register the `omniroute setup remote` subcommand on the parent setup
 * command.
 *
 * @param {import("commander").Command} setupCommand
 */
export function registerSetupRemote(setupCommand) {
  const cmd = setupCommand
    .command("remote [sub...]")
    .description(
      t("setup.remote") ||
        "Aggregated remote-mode setup: status (default) | connect | tokens | contexts — wires the existing connect/tokens/contexts primitives together"
    )
    .option("--json", "Emit a structured JSON payload and exit", false)
    .addHelpText(
      "after",
      `\nSubcommands:\n` +
        REMOTE_SUBCOMMANDS.map((s) => `  ${s.padEnd(10)} → ${describeRemoteSub(s)}`).join("\n") +
        `\n\nToken actions:    ${TOKENS_ACTIONS.join(", ")}` +
        `\nContext actions:  ${CONTEXTS_ACTIONS.join(", ")}` +
        `\n\nExamples:\n` +
        `  omniroute setup remote                                # show current state\n` +
        `  omniroute setup remote connect 192.168.0.15 --port 20128\n` +
        `  omniroute setup remote tokens create --name ci --scope write\n` +
        `  omniroute setup remote contexts list\n` +
        `  omniroute setup remote contexts use vps\n` +
        `  omniroute setup remote --json                        # JSON dump of current state\n`
    );

  // Commander parses variadic args via the `[sub...]` syntax; we extract
  // the sub name + remaining argv in the action handler.
  cmd.action(async (subArgs, opts, cmdObj) => {
    const globalOpts = cmdObj.parent?.parent?.optsWithGlobals?.() ?? {};
    const arr = Array.isArray(subArgs) ? subArgs : subArgs ? [subArgs] : [];
    const merged = {
      ...opts,
      sub: arr[0] || "status",
      args: arr.slice(1),
      output: globalOpts.output,
      json: Boolean(opts.json || globalOpts.output === "json"),
    };
    const { exitCode } = await runSetupRemoteCommand(merged);
    if (exitCode !== 0) process.exit(exitCode);
  });
}

function describeRemoteSub(s) {
  switch (s) {
    case "status":
      return "summarise saved contexts + suggest next step (default)";
    case "connect":
      return "connect to a host and save as the active context";
    case "tokens":
      return "create / list / revoke scoped access tokens on the active server";
    case "contexts":
      return "list / add / use / show / remove saved server contexts";
    default:
      return "";
  }
}
