import type { RegistryEntry } from "../../shared.ts";
import { codexProvider } from "../codex/index.ts";

/**
 * OpenAI Codex — App-Server transport (sibling of the `codex` provider).
 *
 * This provider drives the Codex CLI's own `codex app-server` over JSON-RPC/
 * WebSocket (executor: "codex-app-server"). Unlike the `codex` provider — which
 * replays the user's ChatGPT/OpenAI OAuth token directly to the Responses API —
 * the app-server process OWNS and self-refreshes its OpenAI auth
 * (~/.codex/auth.json), exactly like an interactive `codex` session. OmniRoute
 * never receives or replays a token, so there is no `authType: "oauth"` and no
 * usage-caveat: `authType: "none"`.
 *
 * The connection target (ws:// URL + capability token) is supplied per-connection
 * via providerSpecificData (codexAppServerUrl / codexAppServerToken[File]) and
 * resolved by resolveAppServerConfig — NOT from `baseUrl` below, which is a
 * documentation sentinel only.
 *
 * Models are shared with the `codex` provider (same underlying ChatGPT Codex
 * backend), imported from codexProvider so the two stay in lockstep.
 */
export const codexAppServerProvider: RegistryEntry = {
  id: "codex-app-server",
  alias: "cxa",
  format: "openai-responses",
  executor: "codex-app-server",
  // Sentinel: the executor dials the WebSocket app-server URL from
  // providerSpecificData, not this baseUrl. Kept for catalog/debug display.
  baseUrl: "codex-app-server://cli/websocket",
  reasoningTransport: "opaque",
  authType: "none",
  authHeader: "none",
  defaultContextLength: 400000,
  models: [...codexProvider.models],
};
