import test from "node:test";
import assert from "node:assert/strict";

// Import the executor directly (not via executors/index.ts) — index pulls in
// the entire provider registry and DB layer which is slow and unnecessary for
// the unit-level behavior we want to exercise here.
const { TraeExecutor } = await import("../../open-sse/executors/trae.ts");

const CREDS = {
  accessToken: "JWT.test.token",
  providerSpecificData: {
    webId: "WID",
    bizUserId: "BUID",
    userUniqueId: "UUID",
    scope: "marscode-us",
    tenant: "marscode",
    region: "US-East",
  },
};

test("issue #12190: buildHeaders sends the current work.trae.ai Origin/Referer, not stale solo.trae.ai", () => {
  const ex = new TraeExecutor();
  const h = ex.buildHeaders(CREDS);
  assert.equal(h.Referer, "https://work.trae.ai/", `Referer should be work.trae.ai, got ${h.Referer}`);
  assert.equal(h.Origin, "https://work.trae.ai", `Origin should be sent, got ${h.Origin}`);
});

test("issue #12190: buildHeaders forwards x-trae-user-timezone from providerSpecificData when present", () => {
  const ex = new TraeExecutor();
  const creds = {
    ...CREDS,
    providerSpecificData: { ...CREDS.providerSpecificData, userTimezone: "America/Recife" },
  };
  const h = ex.buildHeaders(creds);
  assert.equal(
    h["x-trae-user-timezone"],
    "America/Recife",
    `x-trae-user-timezone should be forwarded, got ${h["x-trae-user-timezone"]}`
  );
});

test("issue #12190: buildHeaders omits x-trae-user-timezone when no timezone is known", () => {
  const ex = new TraeExecutor();
  const h = ex.buildHeaders(CREDS);
  assert.equal(
    Object.hasOwn(h, "x-trae-user-timezone"),
    false,
    "no x-trae-user-timezone key should be sent when providerSpecificData has no userTimezone"
  );
});

test("issue #12190: buildHeaders still respects a custom providerSpecificData.userRegion", () => {
  const ex = new TraeExecutor();
  const creds = {
    ...CREDS,
    providerSpecificData: { ...CREDS.providerSpecificData, userRegion: "SG" },
  };
  const h = ex.buildHeaders(creds);
  assert.equal(h["x-user-region"], "SG", `x-user-region should respect a custom region, got ${h["x-user-region"]}`);
});

test("issue #12190: buildHeaders defaults x-user-region to US when none is set", () => {
  const ex = new TraeExecutor();
  const h = ex.buildHeaders(CREDS);
  assert.equal(h["x-user-region"], "US");
});

test("issue #12190: buildHeaders lets a per-connection refererOrigin override the default web origin", () => {
  const ex = new TraeExecutor();
  const creds = {
    ...CREDS,
    providerSpecificData: {
      ...CREDS.providerSpecificData,
      refererOrigin: "https://solo.trae.ai",
    },
  };
  const h = ex.buildHeaders(creds);
  assert.equal(h.Referer, "https://solo.trae.ai/");
  assert.equal(h.Origin, "https://solo.trae.ai");
});
