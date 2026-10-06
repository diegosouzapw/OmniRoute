import { printError, printInfo } from "../io.mjs";

/**
 * Container guard for CLI-tool config writes.
 *
 * `omniroute setup-*` writes to `~/.codex`, `~/.claude`, ... — paths that only
 * mean something on the operator's host. Run the same command inside the
 * OmniRoute container and the write "succeeds" into an ephemeral layer that no
 * host CLI ever reads and that disappears with the container. This guard turns
 * that silent no-op into an actionable refusal.
 *
 * Bind-mounted targets (the compose `host` profile) are allowed through: the
 * mount is the operator's explicit statement that the path reaches the host.
 */

const TRUE_VALUES = new Set(["1", "true", "yes", "on"]);

/** Exit code for a refused write — matches the CLI's usage-error convention. */
export const CONTAINER_WRITE_EXIT_CODE = 2;

function envAllowsContainerWrite(env = process.env) {
  return TRUE_VALUES.has(
    String(env.OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE ?? "")
      .trim()
      .toLowerCase()
  );
}

/**
 * Classify a pending config write.
 *
 * @param {string} targetPath Absolute path the command is about to write.
 * @param {{
 *   toolLabel?: string,
 *   hostCommand?: string,
 *   allowContainerWrite?: boolean,
 *   dryRun?: boolean,
 *   env?: NodeJS.ProcessEnv,
 *   deps?: object,
 * }} options
 * @returns {Promise<{ok: boolean, message?: string, warning?: string}>}
 */
export async function assertHostConfigTarget(targetPath, options = {}) {
  const {
    toolLabel,
    hostCommand,
    allowContainerWrite = false,
    dryRun = false,
    env = process.env,
    deps,
  } = options;

  let describeContainerTarget;
  let buildContainerWriteRefusal;
  let CLI_OVERRIDE_HINT;
  try {
    // `.ts` extension is required so the published package (which ships only TS
    // source, resolved through tsx) can load these. See #2509.
    ({ describeContainerTarget } = await import("../../../src/shared/utils/containerEnv.ts"));
    ({ buildContainerWriteRefusal, CLI_OVERRIDE_HINT } =
      await import("../../../src/shared/utils/containerConfigGuard.ts"));
  } catch {
    // Fail open: a guard that cannot load must not block a legitimate host run.
    return { ok: true };
  }

  const info = describeContainerTarget(targetPath, deps);
  if (!info.ephemeral) return { ok: true };

  if (dryRun) {
    return {
      ok: true,
      warning:
        `[dry-run] ${targetPath} is inside the container and is not mounted from the host — ` +
        `a real run would be refused. See --allow-container-write.`,
    };
  }

  if (allowContainerWrite || envAllowsContainerWrite(env)) {
    return {
      ok: true,
      warning:
        `Writing to ${targetPath} inside the container as requested — this file is lost when ` +
        `the container is recreated and host CLIs will not see it.`,
    };
  }

  return {
    ok: false,
    message: buildContainerWriteRefusal(targetPath, {
      toolLabel,
      hostCommand,
      overrideHint: CLI_OVERRIDE_HINT,
    }),
  };
}

/**
 * Container check for commands that write nothing but still print host-oriented
 * instructions (setup-cursor). Fails closed to `false` so a broken import never
 * turns into a spurious warning.
 */
export async function isContainerRuntime(deps) {
  try {
    const { isRunningInContainer } = await import("../../../src/shared/utils/containerEnv.ts");
    return isRunningInContainer(deps);
  } catch {
    return false;
  }
}

/**
 * Guard + report. Returns 0 to continue, or CONTAINER_WRITE_EXIT_CODE when the
 * caller should abort and return that code.
 */
export async function guardHostConfigTarget(targetPath, options = {}) {
  const result = await assertHostConfigTarget(targetPath, options);
  if (result.warning) printInfo(result.warning);
  if (result.ok) return 0;
  printError(result.message);
  return CONTAINER_WRITE_EXIT_CODE;
}
