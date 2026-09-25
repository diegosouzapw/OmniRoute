/**
 * Canonical executable manifest for the OmniRoute CLI command surfaces.
 *
 * One entry per canonical target id. `run.mjs`, `configure.mjs` and
 * `completion.mjs` derive their target lists, alias resolution and model-flag
 * wiring from this table instead of keeping private copies, so a new target
 * (or a renamed alias) is declared exactly once.
 *
 * The package-level JSON contract is intentionally consumable from both this
 * plain Node CLI and TypeScript/Next.js without importing either runtime.
 *
 * Capability semantics:
 * - `run`: launchable through `omniroute run <target>`.
 * - `configure`: supported by the `omniroute configure <target>` picker.
 * - `runModel`: how `run` injects `--model` for the target (`null` when the
 *   model travels via env/provider args instead of a CLI flag).
 */

import rawManifest from "../../config/cli-tools-manifest.json" with { type: "json" };

export const CLI_TARGET_MANIFEST = Object.freeze(
  Object.fromEntries(
    Object.entries(rawManifest.tools).map(([id, entry]) => [
      id,
      Object.freeze({
        description: entry.displayName,
        aliases: Object.freeze([...entry.aliases]),
        run: entry.surfaces.run,
        configure: entry.surfaces.configure,
        configureRecipe: entry.configureRecipe ? Object.freeze({ ...entry.configureRecipe }) : null,
        runModel: entry.runModel ? Object.freeze({ ...entry.runModel }) : null,
        providerAlias: entry.agentBackend?.providerAlias || id,
        platforms: Object.freeze([...rawManifest.runtime.platforms]),
        primaryConfigPaths: Object.freeze([...(rawManifest.runtime.primaryConfigPaths[id] || [])]),
      }),
    ])
  )
);

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
