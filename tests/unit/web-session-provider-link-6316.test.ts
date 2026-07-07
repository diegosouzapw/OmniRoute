import { test } from "node:test";
import assert from "node:assert/strict";

// #6316: the web-session credential guide shows an "Open {host}" link to the
// provider site. The host is derived from the provider's website URL via
// getProviderWebsiteHost — a full URL collapses to its host, a bare/invalid
// string falls back to itself, and an empty value yields null (no link).
const { getProviderWebsiteHost } = await import(
  "../../src/app/(dashboard)/dashboard/providers/[id]/components/WebSessionCredentialGuide.tsx"
);

test("#6316: full URL collapses to host", () => {
  assert.equal(getProviderWebsiteHost("https://chat.qwen.ai/path?x=1"), "chat.qwen.ai");
  assert.equal(getProviderWebsiteHost("https://www.kimi.com"), "www.kimi.com");
});

test("#6316: bare/invalid string falls back to itself", () => {
  assert.equal(getProviderWebsiteHost("kimi.com"), "kimi.com");
  assert.equal(getProviderWebsiteHost("not a url"), "not a url");
});

test("#6316: empty/undefined yields null (no link rendered)", () => {
  assert.equal(getProviderWebsiteHost(undefined), null);
  assert.equal(getProviderWebsiteHost(""), null);
});
