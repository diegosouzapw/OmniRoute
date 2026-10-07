/**
 * Issue #13679 (PR E, item #7) — `/api/free-tier/summary` ships an unconditional
 * `Access-Control-Allow-Origin: "*"` and, until this fix, always included the
 * operator's own local usage numbers (`usedThisMonth` / `remaining`) regardless
 * of whether the caller was authenticated. Combined with the CORS wildcard, any
 * reachable origin's browser JS could read the operator's local token-usage
 * stats — a low-severity but real info leak (the plan-file rates this "low":
 * aggregate usage, not secrets, but still per-operator data that should not be
 * unconditionally public).
 *
 * The catalog itself (perModel, steadyRecurringTokens, …) is intentionally
 * public — the community free-tier catalog is served to everyone by design
 * (see the route's own `serveOverlay` comment) — so this fix scopes down only
 * the operator-specific usage fields, gated behind the same `isAuthenticated()`
 * check the route already uses for the "live" tier, rather than 401-ing the
 * whole endpoint (which would break the intended public-catalog use case).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { PEER_IP_HEADER, VIA_PROXY_HEADER } from "../../src/server/authz/headers.ts";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-freetier-leak-"));

const { GET } = await import("../../src/app/api/free-tier/summary/route.ts");

const STAMP_TOKEN = "issue-13679-free-tier-stamp-token";

/**
 * A remote (non-loopback, non-management-session) caller with no credentials —
 * the same shape a DNS-rebinding / cross-origin attacker page would present.
 * Uses the trusted peer-stamp header (like tests/unit/api-auth.test.ts) so the
 * verdict is deterministic and not dependent on real socket info.
 */
function remoteUnauthenticatedRequest(): Request {
  process.env.OMNIROUTE_PEER_STAMP_TOKEN = STAMP_TOKEN;
  const headers = new Headers();
  headers.set(PEER_IP_HEADER, `${STAMP_TOKEN}|203.0.113.5`);
  headers.set(VIA_PROXY_HEADER, `${STAMP_TOKEN}|0`);
  return new Request("http://localhost/api/free-tier/summary", { headers });
}

test("issue #13679: unauthenticated remote GET must not leak the operator's local usedThisMonth/remaining", async () => {
  const res = await GET(remoteUnauthenticatedRequest());
  assert.equal(res.status, 200);
  const body = await res.json();

  assert.equal(
    body.usedThisMonth,
    null,
    "an unauthenticated remote caller must not learn the operator's local token usage " +
      `(got ${JSON.stringify(body.usedThisMonth)})`
  );
  assert.equal(
    body.remaining,
    null,
    "remaining is derived from usedThisMonth — must also be withheld from unauthenticated callers"
  );

  // The public catalog itself stays public — this endpoint is intentionally
  // served to everyone for the community free-tier catalog.
  assert.ok(
    Array.isArray(body.perModel) && body.perModel.length > 0,
    "the public catalog data must still be served to unauthenticated callers"
  );
  assert.ok(body.steadyRecurringTokens > 0);
});

test.after(() => {
  delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
});
