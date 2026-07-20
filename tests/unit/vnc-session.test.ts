import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getVncProvider,
  isVncProvider,
  listVncProviders,
  VNC_CONFIG,
} from "@/lib/vncSession/manifest";
import { harvestToCredentials, type HarvestResult } from "@/lib/vncSession/harvest";

test("manifest lookup resolves known providers and rejects unknown", () => {
  assert.equal(isVncProvider("gemini-web"), true);
  assert.equal(isVncProvider("chatgpt-web"), true);
  assert.equal(isVncProvider("not-a-provider"), false);
  assert.equal(getVncProvider(null), null);
  assert.equal(getVncProvider("gemini-web")?.url, "https://gemini.google.com");
});

test("provider list has well-formed URLs, unique IDs, and canonical requirements", () => {
  const providers = listVncProviders();
  assert.ok(providers.length > 0);
  assert.equal(new Set(providers.map((entry) => entry.id)).size, providers.length);

  for (const entry of providers) {
    assert.match(entry.url, /^https:\/\//, `bad url for ${entry.id}`);
    assert.ok(["cookie", "token"].includes(entry.requirement.kind), `bad kind for ${entry.id}`);
    assert.ok(Array.isArray(entry.requirement.storageKeys), `storageKeys not array for ${entry.id}`);
    assert.equal(getVncProvider(entry.id)?.id, entry.id);
  }
});

test("VNC_CONFIG defaults to the bundled Chromium browser image", () => {
  assert.equal(VNC_CONFIG.image, "omniroute-vnc-chromium:local");
  assert.equal(VNC_CONFIG.containerVncPort, 3000);
  assert.equal(VNC_CONFIG.containerCdpPort, 9223);
  assert.equal(VNC_CONFIG.persistProfiles, false);
  assert.match(VNC_CONFIG.chromiumArgs, /--remote-debugging-port=9222/);
});

test("harvestToCredentials builds a cookie header and allowlisted provider data", () => {
  const provider = getVncProvider("claude-web")!;
  const harvest: HarvestResult = {
    cookies: [
      { name: "sessionKey", value: "abc123", domain: ".claude.ai", path: "/" },
      { name: "other", value: "zzz", domain: ".claude.ai", path: "/" },
    ],
    localStorage: {},
    cookieHeader: "sessionKey=abc123; other=zzz",
    hasCredential: true,
  };
  const { providerSpecificData, apiKey } = harvestToCredentials(harvest, provider);
  assert.equal(providerSpecificData.sessionKey, "abc123");
  assert.equal(providerSpecificData.other, undefined);
  assert.equal(providerSpecificData.cookie, "sessionKey=abc123; other=zzz");
  assert.equal(apiKey, null);
});

test("harvestToCredentials extracts a token for token-kind providers", () => {
  const provider = getVncProvider("deepseek-web")!;
  const harvest: HarvestResult = {
    cookies: [{ name: "userToken", value: "tok-xyz", domain: ".deepseek.com", path: "/" }],
    localStorage: { userToken: "tok-xyz" },
    cookieHeader: "",
    hasCredential: true,
  };
  const { providerSpecificData, apiKey } = harvestToCredentials(harvest, provider);
  assert.equal(apiKey, "tok-xyz");
  assert.equal(providerSpecificData.token, "tok-xyz");
  assert.equal(providerSpecificData.userToken, "tok-xyz");
});

test("harvestToCredentials preserves declared multi-cookie credentials", () => {
  const provider = getVncProvider("grok-web")!;
  const harvest: HarvestResult = {
    cookies: [
      { name: "sso", value: "1", domain: ".grok.com", path: "/" },
      { name: "sso-rw", value: "2", domain: ".grok.com", path: "/" },
      { name: "unrelated", value: "3", domain: ".grok.com", path: "/" },
    ],
    localStorage: {},
    cookieHeader: "sso=1; sso-rw=2; unrelated=3",
    hasCredential: true,
  };
  const { providerSpecificData } = harvestToCredentials(harvest, provider);
  assert.equal(providerSpecificData.sso, "1");
  assert.equal(providerSpecificData["sso-rw"], "2");
  assert.equal(providerSpecificData.unrelated, undefined);
  assert.equal(providerSpecificData.cookie, "sso=1; sso-rw=2; unrelated=3");
});
