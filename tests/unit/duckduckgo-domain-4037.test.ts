import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  DUCKDUCKGO_BASE,
  STATUS_URL,
  CHAT_URL,
  FAKE_HEADERS,
  FE_VERSION_PATTERN,
} from "../../open-sse/executors/duckduckgo-web.ts";

// Regression for GitHub #4037 (DuckDuckGo half only): DuckDuckGo AI Chat returns HTTP 400.
// Root cause 1 (primary): the executor's STATUS_URL/CHAT_URL/Origin/Referer pointed at
// `https://duck.ai` while `Sec-Fetch-Site: same-origin` was sent and the request hit
// duck.ai — an inconsistent same-origin triplet the backend rejects with 400. Every current
// DDG reverse-engineering reference (and the registry baseUrl) uses `https://duckduckgo.com`.
// Root cause 2 (secondary): FE_VERSION_PATTERN required a 40-hex tail, but the real served
// x-fe-version token has a 20-hex tail, so the scrape silently fell back to a hardcoded
// future-dated default.
describe("DuckDuckGo AI Chat domain consistency (#4037)", () => {
  describe("URL/header host is duckduckgo.com (not duck.ai)", () => {
    it("STATUS_URL uses duckduckgo.com", () => {
      assert.ok(
        STATUS_URL.startsWith(`${DUCKDUCKGO_BASE}/`),
        `STATUS_URL should start with ${DUCKDUCKGO_BASE}, got ${STATUS_URL}`
      );
      assert.ok(!STATUS_URL.includes("duck.ai"), `STATUS_URL must not reference duck.ai: ${STATUS_URL}`);
    });

    it("CHAT_URL uses duckduckgo.com", () => {
      assert.ok(
        CHAT_URL.startsWith(`${DUCKDUCKGO_BASE}/`),
        `CHAT_URL should start with ${DUCKDUCKGO_BASE}, got ${CHAT_URL}`
      );
      assert.ok(!CHAT_URL.includes("duck.ai"), `CHAT_URL must not reference duck.ai: ${CHAT_URL}`);
    });

    it("Origin header points at duckduckgo.com", () => {
      assert.equal(FAKE_HEADERS.Origin, "https://duckduckgo.com");
      assert.ok(!FAKE_HEADERS.Origin.includes("duck.ai"), "Origin must not be duck.ai");
    });

    it("Referer header points at duckduckgo.com", () => {
      assert.equal(FAKE_HEADERS.Referer, "https://duckduckgo.com/");
      assert.ok(!FAKE_HEADERS.Referer.includes("duck.ai"), "Referer must not be duck.ai");
    });

    it("keeps Sec-Fetch-Site: same-origin consistent with duckduckgo.com Origin/Referer", () => {
      // The same-origin triplet (request host + Origin + Referer) must all agree.
      assert.equal(FAKE_HEADERS["Sec-Fetch-Site"], "same-origin");
      const originHost = new URL(FAKE_HEADERS.Origin).host;
      const refererHost = new URL(FAKE_HEADERS.Referer).host;
      const statusHost = new URL(STATUS_URL).host;
      const chatHost = new URL(CHAT_URL).host;
      assert.equal(originHost, refererHost, "Origin and Referer hosts must match");
      assert.equal(originHost, statusHost, "Origin host must match STATUS_URL host");
      assert.equal(originHost, chatHost, "Origin host must match CHAT_URL host");
      assert.equal(originHost, "duckduckgo.com");
    });
  });

  describe("FE_VERSION_PATTERN matches the real served token", () => {
    it("matches a real 20-hex-tail token", () => {
      // Real served example from the DDG SERP HTML.
      const realToken = "serp_20250401_100419_ET-19d438eb199b2bf7c300";
      assert.equal(
        FE_VERSION_PATTERN.test(realToken),
        true,
        `FE_VERSION_PATTERN should match the real 20-hex token: ${realToken}`
      );
    });

    it("still matches a 40-hex-tail token (backward compatible)", () => {
      const fortyHexToken =
        "serp_20260424_180649_ET-0bdc33b2a02ebf8f235def65d887787f694720a1";
      assert.equal(
        FE_VERSION_PATTERN.test(fortyHexToken),
        true,
        "FE_VERSION_PATTERN should still match a 40-hex token"
      );
    });

    it("extracts the token from surrounding HTML", () => {
      const html = `<script>window.__fe="serp_20250401_100419_ET-19d438eb199b2bf7c300";</script>`;
      const match = html.match(FE_VERSION_PATTERN)?.[0];
      assert.equal(match, "serp_20250401_100419_ET-19d438eb199b2bf7c300");
    });
  });
});
