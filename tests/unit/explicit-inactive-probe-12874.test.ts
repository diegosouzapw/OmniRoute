import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { EXPIRED_REPROBE_BLOCKLIST } from "../../src/lib/quota/connectionRecovery.ts";
import {
  EXPLICIT_INACTIVE_PROBE_INTERVAL_MS,
  EXPLICIT_PROBE_BLOCKLIST,
  lastExplicitProbeTime,
  maybeReactivateAfterExplicitProbe,
  noteExplicitProbe,
  resetExplicitProbeMapForTests,
  selectExplicitInactiveProbe,
} from "../../src/sse/services/explicitInactiveProbe.ts";

const pin = {
  id: "c1",
  provider: "siliconflow",
  isActive: false,
  testStatus: "active",
  lastErrorType: null,
  rateLimitedUntil: null,
};

function select(overrides: Partial<Parameters<typeof selectExplicitInactiveProbe>[0]> = {}) {
  return selectExplicitInactiveProbe({
    forcedConnectionId: "c1",
    activeConnections: [],
    pinnedRow: pin,
    providersToSearch: ["siliconflow"],
    allowedConnectionIds: null,
    nowMs: 1_000_000,
    lastProbeAtMs: null,
    intervalMs: 60_000,
    ...overrides,
  });
}

test("P-14 EXPLICIT_PROBE_BLOCKLIST is the same object as EXPIRED_REPROBE_BLOCKLIST", () => {
  assert.equal(EXPLICIT_PROBE_BLOCKLIST, EXPIRED_REPROBE_BLOCKLIST);
});

test("P-1 pin + inactive active -> probe", () => {
  assert.equal(select().kind, "probe");
});
test("P-2 credits_exhausted -> probe", () => {
  assert.equal(select({ pinnedRow: { ...pin, testStatus: "credits_exhausted" } }).kind, "probe");
});
test("P-3 no pin -> skip", () => {
  assert.equal(select({ forcedConnectionId: null }).kind, "skip");
});
test("P-4 live pool already has id -> skip", () => {
  assert.equal(select({ activeConnections: [{ id: "c1" }] }).kind, "skip");
});
test("P-5 banned -> skip", () => {
  assert.equal(select({ pinnedRow: { ...pin, testStatus: "banned" } }).kind, "skip");
});
test("P-6 expired + no_refresh_token -> skip", () => {
  assert.equal(
    select({ pinnedRow: { ...pin, testStatus: "expired", lastErrorType: "no_refresh_token" } }).kind,
    "skip"
  );
});
test("P-7 expired + empty lastErrorType -> probe", () => {
  assert.equal(select({ pinnedRow: { ...pin, testStatus: "expired", lastErrorType: "" } }).kind, "probe");
});
test("P-8 error + unrecoverable_refresh_error -> skip", () => {
  assert.equal(
    select({ pinnedRow: { ...pin, testStatus: "error", lastErrorType: "unrecoverable_refresh_error" } }).kind,
    "skip"
  );
});
test("P-9 last probe within 60s -> suppressed", () => {
  assert.equal(select({ lastProbeAtMs: 1_000_000 - 10_000 }).kind, "suppressed");
});
test("P-10 pin not in allowedConnectionIds -> skip", () => {
  assert.equal(select({ allowedConnectionIds: ["other"] }).kind, "skip");
});
test("P-11 provider not in providersToSearch -> skip", () => {
  assert.equal(select({ providersToSearch: ["openai"] }).kind, "skip");
});
test("P-12 unavailable + future cooldown -> skip", () => {
  assert.equal(
    select({
      pinnedRow: { ...pin, testStatus: "unavailable", rateLimitedUntil: new Date(2_000_000_000).toISOString() },
      nowMs: 1_000_000,
    }).kind,
    "skip"
  );
});
test("P-13 unavailable + elapsed cooldown -> probe", () => {
  assert.equal(
    select({
      pinnedRow: { ...pin, testStatus: "unavailable", rateLimitedUntil: new Date(500_000).toISOString() },
      nowMs: 1_000_000,
    }).kind,
    "probe"
  );
});

test("storm Map note then select within interval is suppressed", () => {
  resetExplicitProbeMapForTests();
  noteExplicitProbe("c1", 1e6);
  assert.equal(lastExplicitProbeTime("c1"), 1e6);
  assert.equal(
    select({ lastProbeAtMs: lastExplicitProbeTime("c1"), nowMs: 1e6 + 10_000 }).kind,
    "suppressed"
  );
});

test("storm Map interval constant is 60s", () => {
  assert.equal(EXPLICIT_INACTIVE_PROBE_INTERVAL_MS, 60_000);
});

test("storm Map reset clears last probe time", () => {
  resetExplicitProbeMapForTests();
  noteExplicitProbe("c1", 1e6);
  resetExplicitProbeMapForTests();
  assert.equal(lastExplicitProbeTime("c1"), null);
});

test("storm Map evicts oldest when over 4096 entries", () => {
  resetExplicitProbeMapForTests();
  for (let i = 0; i < 4096; i++) {
    noteExplicitProbe(`id-${i}`, i);
  }
  noteExplicitProbe("overflow", 4096);
  assert.equal(lastExplicitProbeTime("id-0"), null);
  assert.equal(lastExplicitProbeTime("id-1"), 1);
  assert.equal(lastExplicitProbeTime("overflow"), 4096);
});

test("W-6 openrouter :free does not reactivate", async () => {
  let called = 0;
  await maybeReactivateAfterExplicitProbe(
    {
      connectionId: "c1",
      reactivatedFromInactive: true,
      provider: "openrouter",
      requestedModel: "openrouter/foo:free",
    },
    async () => {
      called += 1;
    }
  );
  assert.equal(called, 0);
});

test("maybeReactivateAfterExplicitProbe calls reactivate on recovered pin", async () => {
  let called = 0;
  let seenId = "";
  await maybeReactivateAfterExplicitProbe(
    {
      connectionId: "c1",
      reactivatedFromInactive: true,
    },
    async (id) => {
      called += 1;
      seenId = id;
    }
  );
  assert.equal(called, 1);
  assert.equal(seenId, "c1");
});

test("maybeReactivateAfterExplicitProbe no-ops without reactivatedFromInactive", async () => {
  let called = 0;
  await maybeReactivateAfterExplicitProbe({ connectionId: "c1" }, async () => {
    called += 1;
  });
  assert.equal(called, 0);
});

test("maybeReactivateAfterExplicitProbe no-ops when explicitProbeSuppressed", async () => {
  let called = 0;
  await maybeReactivateAfterExplicitProbe(
    {
      connectionId: "c1",
      reactivatedFromInactive: true,
      explicitProbeSuppressed: true,
    },
    async () => {
      called += 1;
    }
  );
  assert.equal(called, 0);
});

test("maybeReactivateAfterExplicitProbe no-ops on shadow traffic", async () => {
  let called = 0;
  await maybeReactivateAfterExplicitProbe(
    {
      connectionId: "c1",
      reactivatedFromInactive: true,
      isShadowTraffic: true,
    },
    async () => {
      called += 1;
    }
  );
  assert.equal(called, 0);
});

test("maybeReactivateAfterExplicitProbe no-ops when allowSuppressedConnections", async () => {
  let called = 0;
  await maybeReactivateAfterExplicitProbe(
    {
      connectionId: "c1",
      reactivatedFromInactive: true,
      allowSuppressedConnections: true,
    },
    async () => {
      called += 1;
    }
  );
  assert.equal(called, 0);
});

test("W-7 chatHelpers onRequestSuccess calls maybeReactivateAfterExplicitProbe", async () => {
  const src = fs.readFileSync(new URL("../../src/sse/handlers/chatHelpers.ts", import.meta.url), "utf8");
  assert.match(src, /await maybeReactivateAfterExplicitProbe\(/);
  assert.match(src, /clearAccountError/);
});

test("W-3 clearAccountError update payload has no isActive key", () => {
  const src = fs.readFileSync(new URL("../../src/sse/services/auth.ts", import.meta.url), "utf8");
  const start = src.indexOf("export async function clearAccountError");
  assert.ok(start >= 0, "clearAccountError must exist");
  const next = src.indexOf("\nexport ", start + 1);
  const body = next >= 0 ? src.slice(start, next) : src.slice(start);
  const updateStart = body.indexOf("await updateProviderConnection(");
  assert.ok(updateStart >= 0, "clearAccountError must call updateProviderConnection");
  const brace = body.indexOf("{", updateStart);
  assert.ok(brace >= 0);
  let depth = 0;
  let end = -1;
  for (let i = brace; i < body.length; i++) {
    if (body[i] === "{") depth += 1;
    else if (body[i] === "}") {
      depth -= 1;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  assert.ok(end > brace);
  const literal = body.slice(brace, end + 1);
  assert.equal(/\bisActive\b/.test(literal), false);
});
