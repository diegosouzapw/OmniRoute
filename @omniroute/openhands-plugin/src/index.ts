/**
 * @omniroute/openhands-plugin — OpenHands integration for the OmniRoute AI Gateway.
 *
 * Generates the OpenHands environment and Docker Compose / docker run config
 * that wires an OpenHands agent-server to a running OmniRoute instance:
 * model mapping, sandbox privileges, host-gateway networking, persistent
 * conversation state and CORS.
 */
export { buildOpenHandsEnv, serializeOpenHandsEnv } from "./env.ts";
export type { OpenHandsEnvOptions } from "./env.ts";
export { buildOpenHandsCompose, buildOpenHandsDockerRun } from "./docker.ts";
export type { OpenHandsDockerOptions } from "./docker.ts";
export {
  DEFAULT_OPENHANDS_MODEL_MAP,
  resolveOpenHandsModel,
  buildOpenHandsModel,
} from "./model-map.ts";
export type { OpenHandsModelMap } from "./model-map.ts";
