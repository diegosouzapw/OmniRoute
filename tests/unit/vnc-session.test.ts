import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getVncProvider,
  isVncProvider,
  VNC_PROVIDER_MANIFEST,
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

test("every manifest entry has a well-formed https url and self-consistent id", () => {
  for (const [key, entry] of Object.entries(VNC_PROVIDER_MANIFEST)) {
    assert.equal(entry.id, key, `id mismatch for ${key}`);
    assert.match(entry.url, /^https:\/\//, `bad url for ${key}`);
    assert.ok(["cookie", "token"].includes(entry.kind), `bad kind for ${key}`);
    assert.ok(Array.isArray(entry.cookieNames), `cookieNames not array for ${key}`);
  }
});

test("VNC_CONFIG defaults to the Firefox image with 0.0.0.0-friendly ports", () => {
  assert.match(VNC_CONFIG.image, /firefox/i);
  assert.equal(VNC_CONFIG.containerVncPort, 5800);
  assert.equal(VNC_CONFIG.containerCdpPort, 9222);
});

test("harvestToCredentials builds a cookie header + psd for cookie providers", () => {
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
  // claude-web declares cookieNames: ["sessionKey"] → only that cookie is kept in psd keys
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
    cookieHeader: "userToken=tok-xyz",
    hasCredential: true,
  };
  const { providerSpecificData, apiKey } = harvestToCredentials(harvest, provider);
  assert.equal(apiKey, "tok-xyz");
  assert.equal(providerSpecificData.token, "tok-xyz");
});

test("harvestToCredentials with empty cookieNames keeps the whole jar (grok-web)", () => {
  const provider = getVncProvider("grok-web")!;
  const harvest: HarvestResult = {
    cookies: [
      { name: "sso", value: "1", domain: ".grok.com", path: "/" },
      { name: "sso-rw", value: "2", domain: ".grok.com", path: "/" },
    ],
    localStorage: {},
    cookieHeader: "sso=1; sso-rw=2",
    hasCredential: true,
  };
  const { providerSpecificData } = harvestToCredentials(harvest, provider);
  assert.equal(providerSpecificData.sso, "1");
  assert.equal(providerSpecificData["sso-rw"], "2");
});
