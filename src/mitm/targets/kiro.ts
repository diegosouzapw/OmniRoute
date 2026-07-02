/**
 * Kiro IDE target descriptor (#336).
 *
 * Kiro removed its Base URL / API Key UI; we intercept its Anthropic-style
 * traffic via MITM. Provides:
 *  - `KIRO_TARGET`: canonical `MitmTarget` per F1 contract (§3.1).
 *  - `KIRO_MITM_PROFILE`: legacy alias retained for back-compat with
 *    `src/app/api/settings/mitm/route.ts`.
 */
import type { MitmTarget } from "../types";

const HOSTS = ["api.anthropic.com"];
const ENDPOINTS = ["/v1/messages"];
const INSTRUCTIONS = [
  "1. Install OmniRoute's root certificate (Dashboard → AgentBridge → Cert)",
  "2. Start the MITM proxy: `omniroute mitm start --target kiro`",
  "3. Set your system HTTP proxy to 127.0.0.1:20130 (or use transparent MITM via DNS override)",
  "4. Open Kiro IDE — API calls will be automatically routed through OmniRoute.",
  "5. Verify: check the Proxy Logs in OmniRoute dashboard and look for provider=anthropic source=mitm",
];

export const KIRO_TARGET: MitmTarget = {
  id: "kiro",
  name: "Kiro IDE",
  icon: "code_blocks",
  color: "#8B5CF6",
  hosts: HOSTS,
  port: 443,
  endpointPatterns: ENDPOINTS,
  defaultModels: [],
  setupTutorial: {
    steps: INSTRUCTIONS,
    detection: { command: "which kiro", platform: "all" },
  },
  handler: () =>
    import("../handlers/kiro").then((m) => ({
      default: m.KiroHandler,
    })),
  riskNoticeKey: "providers.riskNotice.oauth",
};

export const KIRO_MITM_PROFILE: MitmTarget & {
  description: string;
  targetHost: string;
  targetPort: number;
  localPort: number;
  userAgentPattern: string | null;
  apiEndpoints: string[];
  authHeader: string;
  instructions: string[];
  referenceIde: string;
} = {
  ...KIRO_TARGET,
  description:
    "Intercepts Kiro IDE requests to api.anthropic.com and routes them through OmniRoute.",
  targetHost: HOSTS[0],
  targetPort: 443,
  localPort: 20130,
  userAgentPattern: null,
  apiEndpoints: ENDPOINTS,
  authHeader: "x-api-key",
  instructions: INSTRUCTIONS,
  referenceIde: "antigravity",
};
