import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { isPublicApiRoute } from "../../../src/shared/constants/publicApiRoutes.ts";
import { GET } from "../../../src/app/api/health/route.ts";

// Without a root /api/health route, the path fell through to the /api/* catch-all and the
// management-auth boundary answered first: an unauthenticated probe got a 401, the same answer
// a wrong key returns. These assertions fail against the base — the route does not exist and
// isPublicApiRoute("/api/health") is false.
describe("GET /api/health is a public liveness probe", () => {
  it("is reachable without a key, for read methods only", () => {
    assert.equal(isPublicApiRoute("/api/health", "GET"), true);
    assert.equal(isPublicApiRoute("/api/health", "HEAD"), true);
    assert.equal(isPublicApiRoute("/api/health", "POST"), false);
  });

  it("does not open the rest of the health subtree", () => {
    // A prefix entry would have exposed this one, which is authenticated today.
    assert.equal(isPublicApiRoute("/api/health/degradation", "GET"), false);
    assert.equal(isPublicApiRoute("/api/healthzzz", "GET"), false);
  });

  it("is reachable with a trailing slash, like the other exact-match public routes", () => {
    // getRequestPathname() (src/shared/utils/apiAuth.ts) does not strip a trailing slash,
    // unlike classify.ts's normalizePathname() — a raw Set.has() lookup would miss "/api/health/"
    // even though it is the same probe. Same trailing-slash tolerance as PUBLIC_CLOUD_API_ROUTES.
    assert.equal(isPublicApiRoute("/api/health/", "GET"), true);
  });

  it("answers 200 with the minimum an orchestrator needs", async () => {
    const response = await GET();
    const body = (await response.json()) as Record<string, unknown>;

    assert.equal(response.status, 200);
    assert.equal(body.status, "ok");
    assert.equal(typeof body.timestamp, "string");

    // Nothing that should not be public on an exposed instance.
    for (const leak of ["version", "uptime", "memoryUsage", "system", "nodeVersion"]) {
      assert.equal(leak in body, false, `${leak} must not be exposed without a key`);
    }
  });
});
