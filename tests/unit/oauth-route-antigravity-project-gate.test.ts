/**
 * #11284 — Antigravity OAuth connect-time DEGRADE marking (maintainer
 * direction): when Cloud Code projectId discovery failed, the connection is
 * still saved but with testStatus:"degraded" + typed error markers, so the
 * dashboard never shows a false "Connected" while request-time bootstrap can
 * self-heal the row.
 *
 * Run: node --import tsx/esm --test tests/unit/oauth-route-antigravity-project-gate.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const routeSource = fs.readFileSync(
  path.join(here, "../../src/app/api/oauth/[provider]/[action]/route.ts"),
  "utf8"
);
const persistenceSource = fs.readFileSync(
  path.join(here, "../../src/lib/oauth/connectionPersistence.ts"),
  "utf8"
);

test("degrade gate is wired into both exchange and poll-callback branches", () => {
  const callSites =
    routeSource.match(/antigravityDegradedProjectState\(provider, tokenData\)/g) || [];
  assert.equal(callSites.length, 2, "gate must run in exchange AND poll-callback");
});

test("connects are SAVED with degraded status, not rejected", () => {
  // No 422 rejection in the antigravity project path: the upsert proceeds and
  // the degraded fields flow into both the update and create payloads.
  assert.match(routeSource, /\.\.\.antigravityPersistStatus\(degradedProject\)/);
  assert.match(persistenceSource, /\.\.\.antigravityPersistStatus\(degradedProject\)/);
  assert.match(routeSource, /warning: degradedProject\.warning/);
  // paste-credentials / device-complete used to hardcode testStatus:"active".
  assert.match(
    persistenceSource,
    /const degradedProject = antigravityDegradedProjectState\(provider, tokenData\)/
  );
  assert.match(
    persistenceSource,
    /buildOAuthConnectionCreatePayload\(provider, tokenData, expiresAt, degradedProject\)/
  );
});

test("gate only applies to antigravity and agy, marks typed error fields", () => {
  const gateSource = fs.readFileSync(
    path.join(here, "../../src/lib/oauth/antigravityProjectGate.ts"),
    "utf8"
  );
  assert.match(gateSource, /"antigravity"/);
  assert.match(gateSource, /"agy"/);
  assert.match(gateSource, /testStatus: "degraded"/);
  assert.match(gateSource, /errorCode: "missing_project_id"/);
  assert.match(gateSource, /lastErrorType: "oauth_missing_project_id"/);
});
