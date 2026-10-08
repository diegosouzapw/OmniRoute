import { existsSync, writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { homedir } from "node:os";
import { t } from "../i18n.mjs";
import { apiFetch } from "../api.mjs";
import { resolveDataDir } from "../data-dir.mjs";
import { listManifestTargets } from "../cli-manifest.mjs";
import { loadModelCatalog, ModelCommandError } from "./model-api.mjs";

// Target lists shared with `omniroute run` / `omniroute configure` — always
// derived from the canonical manifest so the completion scripts cannot drift.
const RUN_TARGET_WORDS = listManifestTargets("run").join(" ");
const CONFIGURE_TARGET_WORDS = listManifestTargets("configure").join(" ");

const CACHE_TTL_MS = 60 * 60 * 1000; // 1h

function cachePath() {
  return join(resolveDataDir(), "completion-cache.json");
}

function readCache() {
  try {
    const raw = JSON.parse(readFileSync(cachePath(), "utf8"));
    if (raw && typeof raw.ts === "number" && Date.now() - raw.ts < CACHE_TTL_MS) return raw;
  } catch (err) {
    if (process.env.OMNIROUTE_DEBUG_COMPLETION) {
      console.error("[omniroute completion] readCache failed:", err?.message ?? err);
    }
  }
  return null;
}

async function refreshCache(opts = {}) {
  // Fail before replacing the cache when the selected catalog is unavailable.
  const models = (await loadModelCatalog(opts)).map((model) => model.id);
  let combos = [],
    providers = [];
  try {
    const [cr, pr] = await Promise.allSettled([
      apiFetch("/api/combos", opts),
      apiFetch("/api/providers", opts),
    ]);
    if (cr.status === "fulfilled" && cr.value.ok) {
      const j = await cr.value.json();
      combos = (j.combos || j.items || []).map((c) => c.name || c.id).filter(Boolean);
    }
    if (pr.status === "fulfilled" && pr.value.ok) {
      const j = await pr.value.json();
      providers = (j.providers || j.items || []).map((p) => p.id || p.name).filter(Boolean);
    }
  } catch (err) {
    if (process.env.OMNIROUTE_DEBUG_COMPLETION) {
      console.error("[omniroute completion] refreshCache failed:", err?.message ?? err);
    }
  }
  const data = { combos, providers, models, ts: Date.now() };
  try {
    mkdirSync(dirname(cachePath()), { recursive: true });
    writeFileSync(cachePath(), JSON.stringify(data));
  } catch (err) {
    if (process.env.OMNIROUTE_DEBUG_COMPLETION) {
      console.error("[omniroute completion] writeCache failed:", err?.message ?? err);
    }
  }
  return data;
}

function detectShell() {
  const shell = process.env.SHELL || "";
  if (shell.includes("zsh")) return "zsh";
  if (shell.includes("fish")) return "fish";
  return "bash";
}

function installPath(shell) {
  const home = homedir();
  if (shell === "zsh") return join(home, ".zsh", "completions", "_omniroute");
  if (shell === "fish") return join(home, ".config", "fish", "completions", "omniroute.fish");
  return join(home, ".bash_completion.d", "omniroute");
}

function modelSubcommandWords(program) {
  const models = program?.commands.find((command) => command.name() === "models");
  return models?.commands.map((command) => command.name()).join(" ") || "";
}

function generateZshScript(modelCommands) {
  return `#compdef omniroute

# OmniRoute zsh completion (dynamic)
_omniroute_get_cache() {
  local key="$1"
  local cache="$HOME/.omniroute/completion-cache.json"
  local now=$(date +%s 2>/dev/null || echo 0)
  local mtime=0
  if [[ -f "$cache" ]]; then
    mtime=$(stat -c %Y "$cache" 2>/dev/null || stat -f %m "$cache" 2>/dev/null || echo 0)
  fi
  if [[ $((now - mtime)) -gt 3600 ]]; then
    omniroute completion refresh --quiet >/dev/null 2>&1
  fi
  if command -v python3 &>/dev/null && [[ -f "$cache" ]]; then
    python3 -c "import json,sys;d=json.load(open('$cache'));print(' '.join(d.get('$key',[])))" 2>/dev/null
  fi
}

_omniroute() {
  local -a commands
  commands=(
    'serve:Start the OmniRoute server'
    'stop:Stop the server'
    'restart:Restart the server'
    'setup:Configure OmniRoute'
    'doctor:Run health diagnostics'
    'status:Show server status'
    'logs:View application logs'
    'providers:Manage providers'
    'config:Manage config and contexts'
    'keys:Manage API keys'
    'models:Browse available models'
    'combo:Manage routing combos'
    'chat:Send chat completion'
    'stream:Stream chat completion'
    'dashboard:Open dashboard'
    'open:Open UI resource in browser'
    'backup:Create a backup'
    'restore:Restore from backup'
    'health:Show server health'
    'quota:Show provider quotas'
    'cache:Manage response cache'
    'mcp:MCP server management'
    'a2a:A2A server management'
    'tunnel:Tunnel management'
    'env:Environment variables'
    'test:Test provider connection'
    'update:Check for updates'
    'completion:Shell completion'
    'memory:Manage memory store'
    'skills:Manage skills'
    'connect:Connect to a local or remote OmniRoute server'
    'contexts:Manage local and remote server contexts'
    'configure:Configure a supported AI CLI'
    'launch:Launch an AI CLI through OmniRoute'
    'launch-codex:Launch Codex through OmniRoute'
    'run:Run a supported AI CLI through OmniRoute'
    'runtime:Inspect CLI runtime capabilities'
    'repair:Repair native runtime dependencies'
  )

  _arguments -C \\
    '1: :->command' \\
    '*:: :->arg' && return 0

  case $state in
    command) _describe 'command' commands ;;
    arg)
      case $words[1] in
        combo)
          case $words[2] in
            switch|delete|show)
              local -a combos
              combos=($(_omniroute_get_cache combos))
              _describe 'combo' combos ;;
            *) _arguments '1:subcommand:(list switch create delete show suggest)' ;;
          esac ;;
        providers|keys)
          case $words[2] in
            add|remove|test)
              local -a providers
              providers=($(_omniroute_get_cache providers))
              _describe 'provider' providers ;;
            *) _arguments '1:subcommand:(available list test test-all validate rotate status add import auth remove edit metrics metric)' ;;
          esac ;;
        chat|stream)
          _arguments \\
            '--model[Model ID]:model:->models' \\
            '--combo[Combo name]:combo:->combos' \\
            '--system[System prompt]:' \\
            '--max-tokens[Max tokens]:' ;;
        open)
          _arguments '1:resource:(combos providers api-manager cli-tools agents settings logs memory skills evals audit cost resilience)' ;;
        completion) _arguments '1:subcommand:(zsh bash fish install refresh)' ;;
        config) _arguments '1:subcommand:(list get set validate contexts)' ;;
        models) _arguments '1:subcommand:(${modelCommands})' ;;
        contexts) _arguments '1:subcommand:(list add use current show remove rename export import migrate)' ;;
        configure) _arguments '1:target:(${CONFIGURE_TARGET_WORDS})' ;;
        run) _arguments '1:target:(${RUN_TARGET_WORDS})' ;;
        connect) _arguments '1:host:' ;;
        launch|launch-codex) _arguments '--remote[Use a remote server]' '--context[Context name]:' '--model[Model ID]:' ;;
        runtime) _arguments '1:subcommand:(check repair clean)' ;;
        *) ;;
      esac
      case $state in
        models)
          local -a models
          models=($(_omniroute_get_cache models))
          _describe 'model' models ;;
        combos)
          local -a combos
          combos=($(_omniroute_get_cache combos))
          _describe 'combo' combos ;;
      esac ;;
  esac
}

compdef _omniroute omniroute
`;
}

function generateBashScript(modelCommands) {
  return `#!/bin/bash
# OmniRoute CLI bash completion (dynamic)

_omniroute_get_cache() {
  local key="$1"
  local cache="$HOME/.omniroute/completion-cache.json"
  local now
  now=$(date +%s 2>/dev/null || echo 0)
  local mtime=0
  [[ -f "$cache" ]] && mtime=$(stat -c %Y "$cache" 2>/dev/null || stat -f %m "$cache" 2>/dev/null || echo 0)
  if (( now - mtime > 3600 )); then
    omniroute completion refresh --quiet >/dev/null 2>&1
  fi
  if command -v python3 &>/dev/null && [[ -f "$cache" ]]; then
    python3 -c "import json,sys;d=json.load(open('$cache'));print(' '.join(d.get('$key',[])))" 2>/dev/null
  fi
}

_omniroute() {
  local cur prev cmds
  COMPREPLY=()
  cur="\${COMP_WORDS[COMP_CWORD]}"
  prev="\${COMP_WORDS[COMP_CWORD-1]}"
  cmds="setup doctor status logs providers config test update serve stop restart keys models combo chat stream completion dashboard open backup restore health quota cache mcp a2a tunnel env memory skills connect contexts configure launch launch-codex run runtime repair"

  case "\${prev}" in
    combo)       COMPREPLY=($(compgen -W "list switch create delete show suggest" -- "\${cur}")); return 0 ;;
    keys)        COMPREPLY=($(compgen -W "add list remove regenerate revoke reveal usage" -- "\${cur}")); return 0 ;;
    providers)   COMPREPLY=($(compgen -W "available list test test-all validate rotate status add import auth remove edit metrics metric" -- "\${cur}")); return 0 ;;
    config)      COMPREPLY=($(compgen -W "list get set validate contexts" -- "\${cur}")); return 0 ;;
    models)      COMPREPLY=($(compgen -W "${modelCommands}" -- "\${cur}")); return 0 ;;
    completion)  COMPREPLY=($(compgen -W "zsh bash fish install refresh" -- "\${cur}")); return 0 ;;
    open)        COMPREPLY=($(compgen -W "combos providers api-manager cli-tools agents settings logs memory skills evals audit cost resilience" -- "\${cur}")); return 0 ;;
    contexts)    COMPREPLY=($(compgen -W "list add use current show remove rename export import migrate" -- "\${cur}")); return 0 ;;
    configure)   COMPREPLY=($(compgen -W "${CONFIGURE_TARGET_WORDS}" -- "\${cur}")); return 0 ;;
    run)         COMPREPLY=($(compgen -W "${RUN_TARGET_WORDS}" -- "\${cur}")); return 0 ;;
    runtime)     COMPREPLY=($(compgen -W "check repair clean" -- "\${cur}")); return 0 ;;
    --model)
      local models
      models=$(_omniroute_get_cache models)
      COMPREPLY=($(compgen -W "\${models}" -- "\${cur}")); return 0 ;;
    --combo)
      local combos
      combos=$(_omniroute_get_cache combos)
      COMPREPLY=($(compgen -W "\${combos}" -- "\${cur}")); return 0 ;;
    switch|delete)
      local combos
      combos=$(_omniroute_get_cache combos)
      COMPREPLY=($(compgen -W "\${combos}" -- "\${cur}")); return 0 ;;
    *)
      COMPREPLY=($(compgen -W "\${cmds} --help --version --output --quiet" -- "\${cur}")); return 0 ;;
  esac
}

complete -F _omniroute omniroute
`;
}

function generateFishScript(modelCommands) {
  return `# OmniRoute CLI fish completion (dynamic)
complete -c omniroute -f

set -l commands serve stop restart setup doctor status logs providers config keys models combo chat stream completion dashboard open backup restore health quota cache mcp a2a tunnel env memory skills connect contexts configure launch launch-codex update test run runtime repair

for cmd in $commands
  complete -c omniroute -n '__fish_is_nth_token 1' -a $cmd
end

# Subcommands
complete -c omniroute -n '__fish_seen_subcommand_from combo' -a 'list switch create delete show suggest'
complete -c omniroute -n '__fish_seen_subcommand_from keys' -a 'add list remove regenerate revoke reveal usage'
complete -c omniroute -n '__fish_seen_subcommand_from providers' -a 'available list test test-all validate rotate status add import auth remove edit metrics metric'
complete -c omniroute -n '__fish_seen_subcommand_from config' -a 'list get set validate contexts'
complete -c omniroute -n '__fish_seen_subcommand_from models' -a '${modelCommands}'
complete -c omniroute -n '__fish_seen_subcommand_from completion' -a 'zsh bash fish install refresh'
complete -c omniroute -n '__fish_seen_subcommand_from open' -a 'combos providers api-manager cli-tools agents settings logs memory skills evals audit cost resilience'
complete -c omniroute -n '__fish_seen_subcommand_from contexts' -a 'list add use current show remove rename export import migrate'
complete -c omniroute -n '__fish_seen_subcommand_from configure' -a '${CONFIGURE_TARGET_WORDS}'
complete -c omniroute -n '__fish_seen_subcommand_from run' -a '${RUN_TARGET_WORDS}'
complete -c omniroute -n '__fish_seen_subcommand_from runtime' -a 'check repair clean'

# Dynamic completions from cache (requires python3)
function __omniroute_cache_get
  set -l key $argv[1]
  set -l cache "$HOME/.omniroute/completion-cache.json"
  set -l now (date +%s 2>/dev/null; or echo 0)
  set -l mtime 0
  test -f $cache; and set mtime (stat -c %Y $cache 2>/dev/null; or stat -f %m $cache 2>/dev/null; or echo 0)
  if test (math $now - $mtime) -gt 3600
    omniroute completion refresh --quiet >/dev/null 2>&1
  end
  if command -q python3; and test -f $cache
    python3 -c "import json,sys;d=json.load(open('$cache'));print('\\n'.join(d.get('$key',[])))" 2>/dev/null
  end
end

complete -c omniroute -n '__fish_seen_subcommand_from combo; and __fish_seen_subcommand_from switch delete' -a '(__omniroute_cache_get combos)'
complete -c omniroute -l model -a '(__omniroute_cache_get models)'
complete -c omniroute -l combo -a '(__omniroute_cache_get combos)'
`;
}

const generators = { zsh: generateZshScript, bash: generateBashScript, fish: generateFishScript };

export function registerCompletion(program) {
  const comp = program
    .command("completion")
    .description(t("completion.description") || "Generate or install shell completion scripts");

  comp
    .command("zsh")
    .description(t("completion.zsh") || "Print zsh completion script")
    .action(async () => process.stdout.write(generateZshScript(modelSubcommandWords(program))));

  comp
    .command("bash")
    .description(t("completion.bash") || "Print bash completion script")
    .action(async () => process.stdout.write(generateBashScript(modelSubcommandWords(program))));

  comp
    .command("fish")
    .description(t("completion.fish") || "Print fish completion script")
    .action(async () => process.stdout.write(generateFishScript(modelSubcommandWords(program))));

  comp
    .command("install [shell]")
    .description(t("completion.install") || "Install completion script globally for detected shell")
    .action(async (shell, opts, cmd) => {
      const target = shell || detectShell();
      const gen = generators[target];
      if (!gen) {
        process.stderr.write(`Unknown shell: ${target}. Valid: bash, zsh, fish\n`);
        process.exit(2);
      }
      const dest = installPath(target);
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, gen(modelSubcommandWords(program)));
      process.stdout.write(
        `Installed ${target} completion at ${dest}\nRestart your shell or source the file.\n`
      );
    });

  comp
    .command("refresh")
    .description(t("completion.refresh") || "Refresh cache of combos/providers/models")
    .option("--quiet", "Suppress output")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      let data;
      try {
        data = await refreshCache(globalOpts);
      } catch (error) {
        console.error(
          error instanceof ModelCommandError
            ? error.message
            : "Unable to refresh model completions."
        );
        process.exitCode = error.exitCode || 1;
        return;
      }
      if (!opts.quiet && !globalOpts.quiet) {
        process.stdout.write(
          `Cached: ${data.combos.length} combos, ${data.providers.length} providers, ${data.models.length} models\n`
        );
      }
    });

  // Backward-compat: `omniroute completion <shell>` (positional arg form)
  comp
    .command("<shell>")
    .description("Print completion script for shell (bash, zsh, fish)")
    .allowUnknownOption(false)
    .action(async (shell) => {
      const gen = generators[shell];
      if (!gen) {
        process.stderr.write(`Unknown shell: ${shell}. Valid: bash, zsh, fish\n`);
        process.exit(1);
      }
      process.stdout.write(gen(modelSubcommandWords(program)));
    });
}

// Legacy export for backward compatibility
export async function runCompletionCommand(shell, program) {
  const gen = generators[shell];
  if (!gen) {
    process.stderr.write(`Unknown shell: ${shell}. Valid: bash, zsh, fish\n`);
    return 1;
  }
  process.stdout.write(gen(modelSubcommandWords(program)));
  return 0;
}
