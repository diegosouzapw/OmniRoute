import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { listExtractionConfigs } from "../../open-sse/services/tokenExtractionConfig.ts";
import {
  buildWebSessionContract,
  WEB_SESSION_CONTRACT_VERSION,
} from "../../src/lib/providers/webSessionContract.ts";
import { getWebSessionCredentialRequirement } from "../../src/shared/providers/webSessionCredentials.ts";

test("web-session contract mirrors canonical extraction and credential metadata", () => {
  const contract = buildWebSessionContract();
  assert.equal(contract.version, WEB_SESSION_CONTRACT_VERSION);

  const expected = listExtractionConfigs().flatMap((config) => {
    const requirement = getWebSessionCredentialRequirement(config.providerId);
    return requirement && requirement.kind !== "none" ? [{ config, requirement }] : [];
  });

  assert.equal(contract.providers.length, expected.length);
  assert.equal(
    new Set(contract.providers.map((provider) => provider.providerId)).size,
    expected.length
  );

  for (const { config, requirement } of expected) {
    const published = contract.providers.find(
      (provider) => provider.providerId === config.providerId
    );
    assert.ok(published, `${config.providerId} must be published`);
    assert.equal(published.displayName, config.displayName);
    assert.equal(published.loginUrl, config.loginUrl);
    assert.equal(published.homeUrl, config.homeUrl);
    assert.deepEqual(published.tokenSources, config.tokenSources);
    assert.equal(published.credential.kind, requirement.kind);
    assert.deepEqual(published.credential.storageKeys, [...requirement.storageKeys]);
    assert.equal(published.credential.acceptsFullCookieHeader, requirement.acceptsFullCookieHeader);
  }
});

test("web-session contract preserves representative token and cookie semantics", () => {
  const providers = new Map(
    buildWebSessionContract().providers.map((provider) => [provider.providerId, provider])
  );

  assert.equal(providers.get("deepseek-web")?.credential.kind, "token");
  assert.equal(providers.get("zai-web")?.credential.kind, "token");
  assert.equal(providers.get("gemini-web")?.credential.kind, "cookie");
  assert.equal(providers.get("perplexity-web")?.credential.kind, "cookie");

  assert.ok(
    providers
      .get("deepseek-web")
      ?.tokenSources.some((source) => source.type === "localStorage" && source.key === "userToken")
  );
  assert.ok(
    providers
      .get("gemini-web")
      ?.tokenSources.some(
        (source) =>
          source.type === "cookie" &&
          source.name === "__Secure-1PSID" &&
          source.domain === ".google.com"
      )
  );
});

test("web-session contract excludes credential values and operator-only guidance", () => {
  const serialized = JSON.stringify(buildWebSessionContract());

  for (const forbidden of [
    "placeholder",
    "instructions",
    "pollingConfig",
    "credentialName",
    "guideSteps",
    "guideNote",
  ]) {
    assert.equal(
      serialized.includes(`\"${forbidden}\"`),
      false,
      `${forbidden} must not be published`
    );
  }
});

test("web-session contract route remains management-authenticated", () => {
  const source = readFileSync(
    new URL("../../src/app/api/providers/web-session-contract/route.ts", import.meta.url),
    "utf8"
  );

  const authCall = source.indexOf("requireManagementAuth(request)");
  const responseCall = source.indexOf("NextResponse.json(buildWebSessionContract())");

  assert.ok(authCall >= 0, "route must require management authentication");
  assert.ok(responseCall > authCall, "authentication must run before contract publication");
});
