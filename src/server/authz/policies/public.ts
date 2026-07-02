import type { AuthOutcome, PolicyContext, RoutePolicy } from "../context";
import { allow } from "../context";

export const publicPolicy: RoutePolicy = {
  routeClass: "PUBLIC",
  async evaluate(_ctx: PolicyContext): Promise<AuthOutcome> {
    return allow({ kind: "anonymous", id: "anonymous" });
  },
};
