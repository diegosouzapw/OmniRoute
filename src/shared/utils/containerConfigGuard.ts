/**
 * Shared wording for "this config write would vanish with the container".
 *
 * The CLI and the dashboard/API both refuse the same situation, so they share
 * one message: an operator who hits it in the terminal and then again in the UI
 * should read the same two escape routes.
 */

export interface ContainerWriteRefusalOptions {
  /** Human label for the tool being configured, e.g. "Codex". */
  toolLabel?: string;
  /** The command that would fix it from the host, e.g. "omniroute setup-codex". */
  hostCommand?: string;
  /** How to override, worded for the surface that is refusing. */
  overrideHint?: string;
}

/**
 * Opening words of every container refusal. Callers that receive a message
 * rather than a structured result use `isContainerWriteRefusal()` to tell this
 * apart from the other reasons a write can be denied.
 */
const REFUSAL_PREFIX = "Refusing to write";

export function isContainerWriteRefusal(message: string | null | undefined): boolean {
  return typeof message === "string" && message.startsWith(REFUSAL_PREFIX);
}

/** Default override hint for server-side (API) callers. */
export const SERVER_OVERRIDE_HINT =
  "Set OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true to configure the container's own CLIs anyway.";

/** Default override hint for CLI callers. */
export const CLI_OVERRIDE_HINT =
  "Re-run with --allow-container-write to configure the container's own CLIs anyway.";

export function buildContainerWriteRefusal(
  targetPath: string,
  options: ContainerWriteRefusalOptions = {}
): string {
  const { toolLabel, hostCommand, overrideHint = SERVER_OVERRIDE_HINT } = options;
  const subject = toolLabel ? `${toolLabel} config` : "CLI tool config";

  return [
    `${REFUSAL_PREFIX} ${subject} to ${targetPath} — OmniRoute is running in a container ` +
      `and that path is not mounted from the host, so the file would be discarded when the ` +
      `container is recreated and your host CLI would never read it.`,
    "",
    "Configure from the host instead (recommended):",
    "  npm install -g omniroute",
    "  omniroute connect http://localhost:20128",
    `  ${hostCommand || "omniroute setup-<tool>"}`,
    "",
    'Or bind-mount the host config dir into the container (compose profile "host"):',
    '  volumes:     [ "~/.codex:/host-home/.codex:rw" ]',
    '  environment: [ "CLI_CONFIG_HOME=/host-home", "CLI_ALLOW_CONFIG_WRITES=true" ]',
    "",
    overrideHint,
  ].join("\n");
}
