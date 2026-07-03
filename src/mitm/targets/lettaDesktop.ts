/**
 * Letta Desktop App — MITM target descriptor (stub).
 *
 * Viability is still under investigation. The target is registered
 * Viability is supported! Letta traffic is routed and payloads are translated
 * to/from OpenAI schema.
 */
import type { MitmTarget } from "../types";

export const LETTA_TARGET: MitmTarget = {
  id: "lettaDesktop",
  name: "Letta Desktop App",
  icon: "construction",
  color: "#94A3B8",
  hosts: ["api.letta.com"],
  port: 443,
  endpointPatterns: [],
  defaultModels: [],
  setupTutorial: {
    steps: [
      "Open your Letta Desktop App settings.",
      "Ensure you're logged into a Letta account (if required) so requests execute.",
      "OmniRoute will transparently intercept traffic bound for api.letta.com and redirect it to your selected local model.",
    ],
    detection: { command: "echo 'not detected'", platform: "all" },
  },
  handler: () => import("../handlers/lettaDesktop").then((m) => ({ default: m.LettaHandler })),
  riskNoticeKey: "providers.riskNotice.supported",
  viability: "supported",
};
