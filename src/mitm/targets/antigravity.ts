/**
 * Antigravity IDE target descriptor.
 *
 * Provides:
 *  - `ANTIGRAVITY_TARGET`: canonical `MitmTarget` per F1 contract (§3.1).
 *  - `ANTIGRAVITY_MITM_PROFILE`: legacy alias retained for back-compat with
 *    `src/app/api/settings/mitm/route.ts`. Carries the historical fields
 *    (`targetHost`, `additionalHosts`, `targetPort`, `localPort`,
 *    `apiEndpoints`, `authHeader`, `instructions`) as an augmentation.
 */
import type { MitmTarget } from "../types";

const HOSTS = [
  "daily-cloudcode-pa.googleapis.com",
  "cloudcode-pa.googleapis.com",
  "daily-cloudcode-pa.sandbox.googleapis.com",
  "autopush-cloudcode-pa.sandbox.googleapis.com",
];

const ENDPOINTS = [
  "/v1internal:generateContent",
  "/v1internal:streamGenerateContent",
  "/v1internal:loadCodeAssist",
  "/v1internal:onboardUser",
];

const INSTRUCTIONS = [
  "1. Install OmniRoute's root certificate",
  "2. Start the MITM proxy via Dashboard or CLI",
  "3. Configure model mappings in Dashboard → AgentBridge → Antigravity",
  "4. Open Antigravity IDE — API calls will be routed through OmniRoute",
];

export const ANTIGRAVITY_TARGET: MitmTarget = {
  id: "antigravity",
  name: "Antigravity IDE",
  icon: "rocket_launch",
  color: "#4F46E5",
  hosts: HOSTS,
  port: 443,
  endpointPatterns: ENDPOINTS,
  defaultModels: [],
  setupTutorial: {
    steps: INSTRUCTIONS,
    detection: { command: "which antigravity", platform: "all" },
  },
  handler: () =>
    import("../handlers/antigravity").then((m) => ({
      default: m.AntigravityHandler,
    })),
  riskNoticeKey: "providers.riskNotice.oauth",
};

/**
 * Legacy MITM profile shape — kept for `src/app/api/settings/mitm/route.ts`
 * (and any other consumer that still relies on the pre-AgentBridge fields).
 *
 * The augmentation is intentional: the F1 `MitmTarget` Zod schema does not
 * declare these fields, so we attach them via an intersection type and rely
 * on consumers using property access (no `MitmTargetSchema.parse()` is run on
 * this object — the schema is for runtime-loaded targets only).
 */
export const ANTIGRAVITY_MITM_PROFILE: MitmTarget & {
  description: string;
  targetHost: string;
  targetPort: number;
  localPort: number;
  userAgentPattern: string | null;
  apiEndpoints: string[];
  authHeader: string;
  additionalHosts: string[];
  instructions: string[];
} = {
  ...ANTIGRAVITY_TARGET,
  description:
    "Intercepts Antigravity IDE requests to cloudcode-pa.googleapis.com and routes them through OmniRoute.",
  targetHost: HOSTS[0],
  targetPort: 443,
  localPort: 443,
  userAgentPattern: null,
  apiEndpoints: ENDPOINTS,
  authHeader: "authorization",
  additionalHosts: HOSTS.slice(1),
  instructions: INSTRUCTIONS,
};
