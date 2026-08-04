import type { CommandCodeAuthFlowState } from "../../providerPageHelpers";

const COMMAND_CODE_AUTH_PHASE_LABELS: Record<CommandCodeAuthFlowState["phase"], string> = {
  idle: "Ready",
  starting: "Starting…",
  polling: "Waiting for browser…",
  received: "Browser approved",
  applying: "Applying key…",
  applied: "Connected",
  expired: "Link expired",
  error: "Connection failed",
};

export function getCommandCodeAuthPhaseLabel(state?: CommandCodeAuthFlowState) {
  return state ? COMMAND_CODE_AUTH_PHASE_LABELS[state.phase] : null;
}
