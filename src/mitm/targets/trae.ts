/**
 * Trae — MITM target descriptor (stub).
 *
 * Viability is still under investigation (see plan 11 §5). The hostname
 * `trae.invalid` is a deliberate non-routable placeholder so the target is
 * registered (UI can list it as "investigating") without ever matching real
 * traffic. The concrete host list will be filled in once we confirm the
 * upstream API surface.
 */
import type { MitmTarget } from "../types";

export const TRAE_TARGET: MitmTarget = {
  id: "trae",
  name: "Trae",
  icon: "construction",
  color: "#94A3B8",
  hosts: ["trae.invalid"],
  port: 443,
  endpointPatterns: [],
  defaultModels: [],
  setupTutorial: {
    steps: [
      "Trae integration is under investigation",
      "Setup steps will be published once the upstream API is confirmed",
    ],
    detection: { command: "which trae", platform: "all" },
  },
  handler: () =>
    import("../handlers/trae").then((m) => ({ default: m.TraeHandler })),
  riskNoticeKey: "providers.riskNotice.investigating",
  viability: "investigating",
};
