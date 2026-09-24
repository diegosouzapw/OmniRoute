import type { RegistryEntry } from "../../shared.ts";

/**
 * notrack.ai — free consumer chat via cookie-auth web session.
 *
 * Authentication: cookie header (uid + si_usr_id + si_ses_id) — see
 * `open-sse/executors/notrack-web.ts` for parsing. No subscription required,
 * but notrack.ai enforces anonymous usage quotas.
 *
 * All model ids resolve to the upstream dispatch model "C" (notrack's
 * single default assistant persona).
 */
export const notrack_webProvider: RegistryEntry = {
  id: "notrack-web",
  alias: "ntw",
  format: "openai",
  executor: "notrack-web",
  baseUrl: "https://notrack.ai/api/dispatch",
  authType: "apikey",
  authHeader: "cookie",
  models: [
    {
      id: "notrack-c",
      name: "NoTrack C",
      aliases: ["C", "notrack", "ntw"],
      toolCalling: true,
      supportsReasoning: false,
    },
  ],
};
