/**
 * Feature test for #6334 — copilot-m365-web enterprise ("work") tier support.
 *
 * The individual path hardcoded `agent="web"`. Microsoft 365 Copilot for work rides the
 * `agent="work"` BizChat surface with `scenario="officeweb"` + a `Premium` license. This is
 * opt-in via `providerSpecificData.tier="enterprise"` (alias `"work"`), mirroring the EDU
 * tier (#6210). A raw `providerSpecificData.agent` override is also honored. The individual
 * and EDU tuples must remain unchanged.
 *
 * The live round-trip against a real M365 enterprise tenant is the separate Rule #18
 * validation and is NOT possible in this environment — documented as a live-validation
 * follow-up.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  buildWsUrl,
  resolveConnectionParams,
  M365_INDIVIDUAL_DEFAULTS,
  M365_ENTERPRISE_OVERRIDES,
} from "../../open-sse/executors/copilot-m365-connection.ts";

const BASE_PARAMS = {
  host: "substrate.office.com",
  chathubPath: "user-oid@tenant-id",
  accessToken: "tok",
};

// ── buildWsUrl: enterprise tuple ────────────────────────────────────────────

test("buildWsUrl: enterprise params emit agent=work + scenario=officeweb + Premium license [#6334]", () => {
  const url = new URL(
    buildWsUrl({
      ...BASE_PARAMS,
      agent: M365_ENTERPRISE_OVERRIDES.agent,
      scenario: M365_ENTERPRISE_OVERRIDES.scenario,
      licenseType: M365_ENTERPRISE_OVERRIDES.licenseType,
    })
  );
  assert.equal(url.searchParams.get("agent"), "work");
  assert.equal(url.searchParams.get("scenario"), "officeweb");
  assert.equal(url.searchParams.get("licenseType"), "Premium");
});

test("buildWsUrl: individual (default) tier is unchanged — agent=web [#6334]", () => {
  const url = new URL(buildWsUrl(BASE_PARAMS));
  assert.equal(url.searchParams.get("agent"), M365_INDIVIDUAL_DEFAULTS.agent);
  assert.equal(url.searchParams.get("agent"), "web");
  assert.equal(url.searchParams.get("scenario"), M365_INDIVIDUAL_DEFAULTS.scenario);
  assert.equal(url.searchParams.get("isEdu"), "false");
});

// ── resolveConnectionParams: opt-in tier resolution ─────────────────────────

test("resolveConnectionParams: tier='enterprise' selects the enterprise/work tuple [#6334]", () => {
  const params = resolveConnectionParams({
    apiKey: "access_token=tok",
    providerSpecificData: { chathubPath: "user@tenant", tier: "enterprise" },
  } as never);
  assert.ok(!("error" in params), "should resolve without error");
  if (!("error" in params)) {
    assert.equal(params.agent, "work");
    assert.equal(params.scenario, "officeweb");
    assert.equal(params.licenseType, "Premium");
    const url = new URL(buildWsUrl(params));
    assert.equal(url.searchParams.get("agent"), "work");
    assert.equal(url.searchParams.get("scenario"), "officeweb");
    assert.equal(url.searchParams.get("licenseType"), "Premium");
  }
});

test("resolveConnectionParams: tier='work' is an alias for the enterprise tuple [#6334]", () => {
  const params = resolveConnectionParams({
    apiKey: "access_token=tok",
    providerSpecificData: { chathubPath: "user@tenant", tier: "work" },
  } as never);
  assert.ok(!("error" in params));
  if (!("error" in params)) {
    assert.equal(params.agent, "work");
    assert.equal(params.scenario, "officeweb");
  }
});

test("resolveConnectionParams: raw providerSpecificData.agent override flows into the URL [#6334]", () => {
  const params = resolveConnectionParams({
    apiKey: "access_token=tok",
    providerSpecificData: { chathubPath: "user@tenant", agent: "work" },
  } as never);
  assert.ok(!("error" in params));
  if (!("error" in params)) {
    assert.equal(params.agent, "work");
    const url = new URL(buildWsUrl(params));
    assert.equal(url.searchParams.get("agent"), "work");
    // No tier → scenario/licenseType fall back to individual defaults.
    assert.equal(url.searchParams.get("scenario"), M365_INDIVIDUAL_DEFAULTS.scenario);
  }
});

// ── Regressions: individual + EDU paths untouched ───────────────────────────

test("resolveConnectionParams: no tier keeps the individual default agent (web) [#6334]", () => {
  const params = resolveConnectionParams({
    apiKey: "access_token=tok",
    providerSpecificData: { chathubPath: "user@tenant" },
  } as never);
  assert.ok(!("error" in params));
  if (!("error" in params)) {
    // agent unset → buildWsUrl falls back to the individual default.
    assert.equal(params.agent, undefined);
    const url = new URL(buildWsUrl(params));
    assert.equal(url.searchParams.get("agent"), "web");
  }
});

test("resolveConnectionParams: tier='edu' tuple is unchanged and stays on agent=web [#6334]", () => {
  const params = resolveConnectionParams({
    apiKey: "access_token=tok",
    providerSpecificData: { chathubPath: "user@tenant", tier: "edu" },
  } as never);
  assert.ok(!("error" in params));
  if (!("error" in params)) {
    assert.equal(params.scenario, "OfficeWebIncludedCopilot");
    assert.equal(params.isEdu, "true");
    // EDU tier does not touch agent → individual default in the URL.
    assert.equal(params.agent, undefined);
    const url = new URL(buildWsUrl(params));
    assert.equal(url.searchParams.get("agent"), "web");
  }
});
