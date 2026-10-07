/**
 * omniroute setup-5dive — point a 5dive agent fleet at OmniRoute.
 *
 * 5dive (https://5dive.com) manages a fleet of long-running coding agents, each
 * one a systemd unit under its own Unix user. It is not itself a coding CLI, so
 * there is nothing for `omniroute run` to launch — this is a configure-only
 * target.
 *
 * Unlike the other recipes, 5dive does not read a config file out of $HOME. Its
 * credentials live in AUTH PROFILES under /var/lib/5dive/auth-profiles/<name>/,
 * and the supported way to write one is the CLI itself:
 *
 *   5dive agent auth set claude --provider=<id> --base-url=<url> \
 *     --api-key=- --auth-profile=<name> --model=<slug>
 *
 * Four value flags, all four load-bearing (verified against 5dive-cli main,
 * 2026-08-27):
 *   --provider      `--base-url` is refused without it, rather than accepted
 *                   and silently dropped. `openai` here is 5dive's BYO id for
 *                   "a custom Anthropic-compatible endpoint", not a vendor
 *                   choice — override with --byo-provider.
 *   --base-url      OmniRoute's Anthropic surface, ROOT url with no /v1.
 *   --auth-profile  BYO credentials are profile-scoped; required for claude.
 *   --model         `openai` has no row in 5dive's built-in endpoint catalog,
 *                   so there are no per-tier model ids to inherit.
 *
 * The key is handed over on stdin (`--api-key=-`) so it never reaches argv.
 *
 * Two things this recipe cannot do for you, and says so instead of failing
 * obscurely:
 *   1. Writing an auth profile is root-only on the 5dive host. We re-exec
 *      through sudo when we are not root (disable with --no-sudo).
 *   2. `agent auth set` writes the profile and restarts the agents bound to it,
 *      but each seat also carries its OWN runtime model pin, and that pin wins
 *      over the profile's ANTHROPIC_DEFAULT_*_MODEL. Pass --agent <name> (repeatable)
 *      to pin the seats too; otherwise we print the command for them.
 */

import { spawn } from "node:child_process";
import { printHeading, printInfo, printSuccess, printError, createPrompt } from "../io.mjs";
import { resolveActiveContext } from "../contexts.mjs";

const DEFAULT_PROFILE = "omniroute";

/** 5dive's `claude` BYO endpoint is the Anthropic surface ROOT — strip a trailing /v1. */
function stripToRoot(url) {
  const s = String(url || "").replace(/\/+$/, "");
  return s.endsWith("/v1") ? s.slice(0, -3) : s;
}

/** Resolve baseUrl (ROOT, no /v1) + apiKey from flags -> active context -> localhost. */
export function resolveFivediveTarget(opts = {}) {
  let baseUrl;
  if (opts.remote) baseUrl = stripToRoot(opts.remote);
  else {
    try {
      baseUrl = stripToRoot(
        resolveActiveContext(opts.context ?? process.env.OMNIROUTE_CONTEXT)?.baseUrl
      );
    } catch {
      /* no context configured */
    }
    if (!baseUrl)
      baseUrl = `http://localhost:${Number(opts.port ?? process.env.PORT ?? 20128) || 20128}`;
  }
  let apiKey = opts.apiKey ?? opts["api-key"];
  if (!apiKey) {
    try {
      const c = resolveActiveContext(opts.context ?? process.env.OMNIROUTE_CONTEXT);
      apiKey = c?.accessToken || c?.apiKey;
    } catch {
      /* no context configured */
    }
  }
  if (!apiKey) apiKey = process.env.OMNIROUTE_API_KEY || "";
  return { baseUrl, apiKey };
}

/**
 * 5dive refuses a base URL before storing it, and the rule is not the obvious
 * one: the agent's key rides this URL on every request, so https:// is required
 * unless the host is loopback. Reproduce the check here so the operator gets the
 * reason at the point of choosing, not a validation error three commands later.
 */
export function validateFivediveBaseUrl(rawUrl) {
  const url = String(rawUrl || "");
  if (!url) return { ok: false, reason: "A base URL is required." };
  if (url.startsWith("https://")) return { ok: true };
  if (!url.startsWith("http://")) {
    return { ok: false, reason: `Unsupported scheme in '${url}' (expected http:// or https://).` };
  }
  let host = url.slice("http://".length);
  host = host.split("/")[0].split("?")[0];
  host = host.startsWith("[") ? `${host.slice(0, host.indexOf("]"))}]` : host.split(":")[0];
  if (host === "127.0.0.1" || host === "localhost" || host === "[::1]") return { ok: true };
  return {
    ok: false,
    reason:
      `5dive accepts http:// only for a loopback host; '${host}' is off-box, so the agent's ` +
      `API key would travel in plaintext. Serve OmniRoute over https:// and pass ` +
      `--remote https://${host}...`,
  };
}

/** Argv for the profile write. The key is NOT here — it goes in on stdin. */
export function buildFivediveAuthArgs({ baseUrl, profile, model, provider = "openai" }) {
  return [
    "agent",
    "auth",
    "set",
    "claude",
    `--provider=${provider}`,
    `--base-url=${baseUrl}`,
    "--api-key=-",
    `--auth-profile=${profile}`,
    `--model=${model}`,
  ];
}

/** Argv for one seat's runtime model pin, which outranks the profile's env defaults. */
export function buildFivedivePinArgs(agent, model) {
  return ["agent", "config", agent, "set", `model=${model}`];
}

/** Prepend sudo when the profile write needs root and we do not have it. */
export function withPrivilege(bin, args, { isRoot, useSudo }) {
  if (isRoot || !useSudo) return [bin, args];
  return ["sudo", [bin, ...args]];
}

function quote(arg) {
  return /^[A-Za-z0-9_@%+=:,./-]+$/.test(arg) ? arg : `'${String(arg).replace(/'/g, "'\\''")}'`;
}

/** Render argv the way an operator would type it. */
export function renderCommand(bin, args) {
  return [bin, ...args].map(quote).join(" ");
}

function run(bin, args, stdinPayload) {
  return new Promise((resolve) => {
    const child = spawn(bin, args, {
      // sudo reads its password straight from the tty, so stdin stays free for
      // the API key.
      stdio: [stdinPayload === undefined ? "inherit" : "pipe", "inherit", "inherit"],
    });
    child.on("error", (e) => resolve({ code: 1, error: e }));
    child.on("close", (code) => resolve({ code: code ?? 1 }));
    if (stdinPayload !== undefined && child.stdin) {
      child.stdin.end(stdinPayload);
    }
  });
}

async function fetchModelIds(baseUrl, apiKey) {
  try {
    const headers = { "Content-Type": "application/json" };
    if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;
    const res = await fetch(`${baseUrl}/v1/models`, { headers, signal: AbortSignal.timeout(8000) });
    if (!res.ok) return [];
    const body = await res.json();
    const list = Array.isArray(body) ? body : (body.data ?? body.models ?? []);
    return list.map((m) => (typeof m === "string" ? m : m?.id)).filter(Boolean);
  } catch {
    return [];
  }
}

function agentList(opts) {
  const raw = opts.agent ?? opts.agents ?? [];
  return (Array.isArray(raw) ? raw : [raw]).map((a) => String(a).trim()).filter(Boolean);
}

export async function runSetup5diveCommand(opts = {}) {
  const { baseUrl, apiKey } = resolveFivediveTarget(opts);
  const dryRun = Boolean(opts.dryRun ?? opts["dry-run"]);
  const bin = opts.fivediveBin ?? opts["fivedive-bin"] ?? process.env.CLI_5DIVE_BIN ?? "5dive";
  const profile = String(opts.authProfile ?? opts["auth-profile"] ?? opts.name ?? DEFAULT_PROFILE);
  // NOT `opts.provider`: the `configure` picker uses that flag for the
  // OmniRoute model provider to filter on, and it reaches setup recipes
  // verbatim. The 5dive BYO id is its own flag.
  const provider = String(opts.byoProvider ?? opts["byo-provider"] ?? "openai");
  const agents = agentList(opts);

  printHeading("OmniRoute -> 5dive (claude BYO endpoint)");
  printInfo(`Server:  ${baseUrl}`);
  printInfo(`Profile: ${profile}`);

  const urlCheck = validateFivediveBaseUrl(baseUrl);
  if (!urlCheck.ok) {
    printError(urlCheck.reason);
    return 2;
  }

  // 5dive needs one explicit model id: `openai` has no catalog row, so there
  // are no per-tier defaults to fall back to.
  let model = opts.model;
  if (!model) {
    const ids = await fetchModelIds(baseUrl, apiKey);
    if (ids.length && !opts.yes) {
      printInfo(`Examples: ${ids.slice(0, 20).join(", ")}${ids.length > 20 ? " …" : ""}`);
      printInfo("A combo id works here too — that is how you get failover across providers.");
      const prompt = createPrompt();
      try {
        model = await prompt.ask("Model or combo id for the 5dive agents");
      } finally {
        prompt.close();
      }
    }
  }
  if (!model) {
    printError("A model is required. Pass --model <id> (5dive has no model auto-discovery here).");
    return 2;
  }
  if (!apiKey) {
    printError("An OmniRoute API key is required. Pass --api-key, or set OMNIROUTE_API_KEY.");
    return 2;
  }

  const isRoot = typeof process.getuid === "function" ? process.getuid() === 0 : false;
  const useSudo = (opts.sudo ?? true) !== false;
  const authArgs = buildFivediveAuthArgs({ baseUrl, profile, model, provider });
  const [authBin, authArgv] = withPrivilege(bin, authArgs, { isRoot, useSudo });

  if (dryRun) {
    printInfo("\n[dry-run] would run:");
    printInfo(`  ${renderCommand(authBin, authArgv)}`);
    printInfo("  (the API key is written to that command's stdin, never to argv)");
    for (const agent of agents) {
      const [pinBin, pinArgv] = withPrivilege(bin, buildFivedivePinArgs(agent, model), {
        isRoot,
        useSudo,
      });
      printInfo(`  ${renderCommand(pinBin, pinArgv)}`);
    }
    return 0;
  }

  if (!isRoot && !useSudo) {
    printError(
      "Writing a 5dive auth profile needs root on the 5dive host. Re-run as root, drop --no-sudo, " +
        "or run this by hand:"
    );
    printInfo(`  ${renderCommand(bin, authArgs)}`);
    return 1;
  }

  const authResult = await run(authBin, authArgv, apiKey);
  if (authResult.error?.code === "ENOENT") {
    printError(
      `Could not find the '${bin}' CLI on this machine. 5dive's verbs run ON the fleet host — ` +
        "run this there, or point at the binary with --fivedive-bin."
    );
    return 1;
  }
  if (authResult.code !== 0) {
    printError(`'${bin} agent auth set' exited ${authResult.code}.`);
    return authResult.code;
  }
  printSuccess(`Auth profile '${profile}' now points at ${baseUrl}`);

  // The profile carries ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL, but each
  // seat's own runtime pin outranks it — a seat still pinned to a stock model id
  // fails its first turn with "There's an issue with the selected model".
  for (const agent of agents) {
    const [pinBin, pinArgv] = withPrivilege(bin, buildFivedivePinArgs(agent, model), {
      isRoot,
      useSudo,
    });
    const pinResult = await run(pinBin, pinArgv);
    if (pinResult.code !== 0) {
      printError(`Could not pin agent '${agent}' to '${model}' (exit ${pinResult.code}).`);
      return pinResult.code;
    }
    printSuccess(`Agent '${agent}' pinned to ${model}`);
  }

  if (!agents.length) {
    printInfo("\nEach seat also carries its own runtime model pin, and it beats the profile:");
    printInfo(`  ${renderCommand(bin, buildFivedivePinArgs("<agent>", model))}`);
    printInfo("Re-run with --agent <name> to have this command apply it for you.");
  }
  printInfo("\nBind a seat to the profile at creation time with:");
  printInfo(`  ${renderCommand(bin, ["agent", "create", "<name>", `--auth-profile=${profile}`])}`);
  return 0;
}

export function registerSetup5dive(program) {
  program
    .command("setup-5dive")
    .description(
      "Point a 5dive agent fleet's claude seats at OmniRoute (writes a 5dive auth profile)"
    )
    .option("--port <port>", "Local OmniRoute port (ignored when --remote is set)", "20128")
    .option("--remote <url>", "Remote OmniRoute URL, e.g. https://omniroute.example.com")
    .option("--context <name>", "Named local/remote context")
    .option("--api-key <key>", "OmniRoute API key (defaults to the active context/env)")
    .option("--model <id>", "OmniRoute model or combo id the agents should use")
    .option("--byo-provider <id>", "5dive BYO provider id (default: openai)", "openai")
    .option("--auth-profile <name>", "5dive auth profile to write", DEFAULT_PROFILE)
    .option(
      "--agent <name>",
      "Also pin this agent's runtime model (repeatable)",
      (value, previous) => [...(previous || []), value],
      []
    )
    .option("--fivedive-bin <path>", "Path to the 5dive binary (default: 5dive on PATH)")
    .option("--no-sudo", "Do not re-exec through sudo when not running as root")
    .option("--yes", "Non-interactive: do not prompt (requires --model)")
    .option("--dry-run", "Print the commands without running them")
    .action(async (opts) => {
      const code = await runSetup5diveCommand(opts);
      if (code !== 0) process.exit(code);
    });
}
