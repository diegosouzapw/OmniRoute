/**
 * Canonical executable manifest for the OmniRoute CLI command surfaces.
 *
 * One entry per canonical target id. `run.mjs`, `configure.mjs` and
 * `completion.mjs` derive their target lists, alias resolution and model-flag
 * wiring from this table instead of keeping private copies, so a new target
 * (or a renamed alias) is declared exactly once.
 *
 * The server-side runtime catalog (`src/shared/services/cliRuntime.ts`) stays
 * the source of truth for binaries, config paths and health checks; the drift
 * test `tests/unit/cli/cli-manifest-drift.test.ts` asserts the two worlds and
 * every consumer surface stay in sync.
 *
 * Capability semantics:
 * - `run`: launchable through `omniroute run <target>`.
 * - `configure`: supported by the `omniroute configure <target>` picker.
 * - `runModel`: how `run` injects `--model` for the target (`null` when the
 *   model travels via env/provider args instead of a CLI flag).
 */

export const CLI_TARGET_MANIFEST = Object.freeze({
  claude: Object.freeze({
    description: "Claude Code",
    aliases: Object.freeze(["claude-code", "cc", "anthropic"]),
    run: true,
    configure: true,
    runModel: null, // injected via ANTHROPIC_MODEL env by the launcher
  }),
  codex: Object.freeze({
    description: "OpenAI Codex CLI",
    aliases: Object.freeze(["codex-cli", "openai-codex", "openai"]),
    run: true,
    configure: true,
    runModel: null, // injected via -c model_providers.omniroute.* args
  }),
  aider: Object.freeze({
    description: "Aider",
    aliases: Object.freeze([]),
    run: true,
    configure: true,
    runModel: Object.freeze({ flag: "--model", prefix: "openai/" }),
  }),
  goose: Object.freeze({
    description: "Goose",
    aliases: Object.freeze(["goose-cli"]),
    run: true,
    configure: true,
    runModel: null, // injected via GOOSE_MODEL env
  }),
  opencode: Object.freeze({
    description: "OpenCode",
    aliases: Object.freeze(["open-code"]),
    run: true,
    configure: true,
    runModel: Object.freeze({ flag: "--model", prefix: "omniroute/" }),
  }),
  omp: Object.freeze({
    description: "Oh My Pi",
    aliases: Object.freeze(["oh-my-pi", "ohmypi"]),
    run: true,
    configure: true,
    runModel: Object.freeze({ flag: "--model", prefix: "omniroute/" }),
  }),
  qwen: Object.freeze({
    description: "Qwen Code",
    aliases: Object.freeze(["qwen-code"]),
    run: true,
    configure: true,
    runModel: Object.freeze({ flag: "--model", prefix: "", required: true }),
  }),
  gemini: Object.freeze({
    // Launch contract verified against @google/gemini-cli 0.50.0:
    // GOOGLE_GEMINI_BASE_URL points the SDK at OmniRoute's /v1beta surface,
    // GEMINI_API_KEY + isolated GEMINI_CLI_HOME (settings selectedType
    // "gemini-api-key") force API-key auth over any stored OAuth session.
    description: "Google Gemini CLI",
    aliases: Object.freeze(["gemini-cli"]),
    run: true,
    configure: false,
    runModel: Object.freeze({ flag: "--model", prefix: "" }),
  }),
  cline: Object.freeze({
    description: "Cline",
    aliases: Object.freeze([]),
    run: false,
    configure: true,
    runModel: null,
  }),
  continue: Object.freeze({
    description: "Continue",
    aliases: Object.freeze(["cn"]),
    run: false,
    configure: true,
    runModel: null,
  }),
  kilo: Object.freeze({
    description: "Kilo Code",
    aliases: Object.freeze(["kilocode", "kilo-code", "kilo_cli"]),
    run: false,
    configure: true,
    runModel: null,
  }),
  "5dive": Object.freeze({
    // 5dive is a fleet manager, not a coding CLI: it points its own `claude`
    // agents at an endpoint. `omniroute run 5dive` would have nothing to
    // launch, so this is configure-only.
    description: "5dive (agent fleet)",
    aliases: Object.freeze(["fivedive", "5dive-cli"]),
    run: false,
    configure: true,
    runModel: null, // travels as the profile's ANTHROPIC_DEFAULT_*_MODEL
  }),
});

/**
 * List canonical target ids, optionally filtered by capability
 * (`"run"` or `"configure"`). Order follows manifest declaration order.
 */
export function listManifestTargets(capability) {
  return Object.entries(CLI_TARGET_MANIFEST)
    .filter(([, entry]) => !capability || entry[capability])
    .map(([id]) => id);
}

/**
 * Resolve a user-supplied target (canonical id or alias) to its canonical id.
 * Returns `undefined` when the target is unknown or lacks the capability.
 */
export function resolveManifestTarget(rawTarget, capability) {
  const normalized = String(rawTarget || "")
    .trim()
    .toLowerCase();
  if (!normalized) return undefined;
  for (const [id, entry] of Object.entries(CLI_TARGET_MANIFEST)) {
    if (id === normalized || entry.aliases.includes(normalized)) {
      if (capability && !entry[capability]) return undefined;
      return id;
    }
  }
  return undefined;
}

/** Model CLI-flag arguments for a `run` target, derived from the manifest. */
export function manifestModelArgs(targetId, model) {
  if (!model) return [];
  const spec = CLI_TARGET_MANIFEST[targetId]?.runModel;
  if (!spec) return [];
  const value = spec.prefix && !model.startsWith(spec.prefix) ? `${spec.prefix}${model}` : model;
  return [spec.flag, value];
}

/** Whether a `run` target refuses to launch without an explicit model. */
export function manifestRequiresModel(targetId) {
  return Boolean(CLI_TARGET_MANIFEST[targetId]?.runModel?.required);
}
