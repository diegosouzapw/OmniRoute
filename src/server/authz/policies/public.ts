import type { AuthOutcome, PolicyContext, RoutePolicy } from "../context";
import { allow } from "../context";
import { hasValidLoopbackCliToken, LOCAL_CLI_SUBJECT } from "../peerContext";

export const publicPolicy: RoutePolicy = {
  routeClass: "PUBLIC",
  async evaluate(ctx: PolicyContext): Promise<AuthOutcome> {
    // PUBLIC never rejects — but the SUBJECT still matters. `runAuthzPipeline`
    // strips CLI_TOKEN_HEADER from the forwarded headers for every route class,
    // so a handler can only learn that a local CLI authenticated from the stamp
    // this policy produces. Some PUBLIC-classified routes intentionally serve a
    // reduced anonymous view and the full one to a management principal (GET
    // /api/monitoring/health, GHSA-mvf8-qc78-5mxm): without this branch the
    // loopback CLI holding a valid machine token was permanently downgraded to
    // the anonymous view: the health payload lost `version`, which is what the
    // check:pack-boot release gate asserts on the packed tarball. Regression
    // introduced by #11040 (GHSA-mvf8-qc78-5mxm hardening).
    // The verdict is strictly loopback + constant-time token comparison, the
    // same gate the MANAGEMENT policy applies.
    if (hasValidLoopbackCliToken(ctx)) {
      return allow({ ...LOCAL_CLI_SUBJECT });
    }
    return allow({ kind: "anonymous", id: "anonymous" });
  },
};
