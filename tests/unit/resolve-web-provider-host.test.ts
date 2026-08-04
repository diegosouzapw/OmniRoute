import { test } from "node:test";
import assert from "node:assert/strict";

import {
  resolveWebProviderHost,
  WEB_COOKIE_PROVIDERS,
} from "@/shared/constants/providers/web-cookie";

// Feature #6268 — "Open ‹host› →" link in the "Add session cookie" modal.
// Pure host-resolution helper backing the modal link.

test("known -web provider returns the host derived from its `website`", () => {
  const link = resolveWebProviderHost("chatgpt-web");
  assert.ok(link, "expected a resolved link for chatgpt-web");
  assert.equal(link.host, "chatgpt.com");
  assert.equal(link.url, "https://chatgpt.com");
});

test("website with a path keeps the full URL but exposes the bare host", () => {
  // huggingchat's website is https://huggingface.co/chat
  const link = resolveWebProviderHost("huggingchat");
  assert.ok(link);
  assert.equal(link.host, "huggingface.co");
  assert.equal(link.url, "https://huggingface.co/chat");
});

test("provider with no `website` but a registry baseUrl returns the origin", () => {
  // duckduckgo-web is a real web-session provider that is NOT in
  // WEB_COOKIE_PROVIDERS and has no `website`; the caller supplies its registry
  // baseUrl as a fallback, from which only the origin is kept.
  assert.equal(
    (WEB_COOKIE_PROVIDERS as Record<string, unknown>)["duckduckgo-web"],
    undefined,
    "test premise: duckduckgo-web must be absent from WEB_COOKIE_PROVIDERS"
  );
  const link = resolveWebProviderHost(
    "duckduckgo-web",
    "https://duckduckgo.com/duckchat/v1/chat"
  );
  assert.ok(link);
  assert.equal(link.host, "duckduckgo.com");
  assert.equal(link.url, "https://duckduckgo.com");
});

test("non-web / unknown provider returns null", () => {
  assert.equal(resolveWebProviderHost("openai"), null);
  assert.equal(resolveWebProviderHost("totally-made-up"), null);
  assert.equal(resolveWebProviderHost(null), null);
  assert.equal(resolveWebProviderHost(undefined), null);
  assert.equal(resolveWebProviderHost(""), null);
});

test("unparseable fallback baseUrl yields null instead of throwing", () => {
  assert.equal(resolveWebProviderHost("duckduckgo-web", "not a url"), null);
});
