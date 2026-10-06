import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { FE_VERSION_PATTERN } from "../../open-sse/executors/duckduckgo-web/models.ts";

// Structural guard (same pattern as duckduckgo-challenge-split.test.ts): this file
// must stay runnable without the full executor dependency graph, so host invariants
// are pinned against the SOURCE instead of runtime imports.
const EXECUTOR_SOURCE = readFileSync(
  fileURLToPath(new URL("../../open-sse/executors/duckduckgo-web.ts", import.meta.url)),
  "utf8"
);

// Regression for GitHub #4037 (DuckDuckGo half only), updated 2026-08-26.
// Original bug: STATUS_URL/CHAT_URL/Origin/Referer formed a MIXED same-origin
// triplet (duck.ai host with duckduckgo.com Origin/Referer), rejected with 400.
// The fix unified everything on duckduckgo.com. Live verification on 2026-08-26
// showed the full status -> challenge -> chat flow also returns 200 with a fully
// consistent duck.ai triplet — and the challenge solver already stamps
// meta.origin = https://duck.ai — so the primary host moved to duck.ai, putting
// host and token origin in agreement by construction.
describe("DuckDuckGo AI Chat domain consistency (#4037)", () => {
  it("primary host is duck.ai", () => {
    assert.match(EXECUTOR_SOURCE, /export const DUCKDUCKGO_BASE = "https:\/\/duck\.ai";/);
  });

  it("all duckchat endpoints derive from DUCKDUCKGO_BASE (triplet consistent by construction)", () => {
    assert.match(
      EXECUTOR_SOURCE,
      /export const STATUS_URL = `\$\{DUCKDUCKGO_BASE\}\/duckchat\/v1\/status`;/
    );
    assert.match(
      EXECUTOR_SOURCE,
      /export const CHAT_URL = `\$\{DUCKDUCKGO_BASE\}\/duckchat\/v1\/chat`;/
    );
    assert.match(
      EXECUTOR_SOURCE,
      /export const MODELS_URL = `\$\{DUCKDUCKGO_BASE\}\/duckchat\/v1\/models`;/
    );
  });

  it("FAKE_HEADERS Origin/Referer derive from DUCKDUCKGO_BASE (no mixed domains)", () => {
    assert.match(EXECUTOR_SOURCE, /Origin: DUCKDUCKGO_BASE,/);
    assert.match(EXECUTOR_SOURCE, /Referer: `\$\{DUCKDUCKGO_BASE\}\/`,/);
    assert.doesNotMatch(EXECUTOR_SOURCE, /Origin: "https:\/\/duckduckgo\.com"/);
    assert.match(EXECUTOR_SOURCE, /"Sec-Fetch-Site": "same-origin"/);
  });

  describe("FE_VERSION_PATTERN matches the real served token", () => {
    it("matches a real 20-hex-tail token", () => {
      const realToken = "serp_20250401_100419_ET-19d438eb199b2bf7c300";
      assert.equal(FE_VERSION_PATTERN.test(realToken), true);
    });

    it("still matches a 40-hex-tail token (backward compatible)", () => {
      const fortyHexToken =
        "serp_20260424_180649_ET-0bdc33b2a02ebf8f235def65d887787f694720a1";
      assert.equal(FE_VERSION_PATTERN.test(fortyHexToken), true);
    });

    it("extracts the token from surrounding HTML", () => {
      const html = `<script>window.__fe="serp_20250401_100419_ET-19d438eb199b2bf7c300";</script>`;
      const match = html.match(FE_VERSION_PATTERN)?.[0];
      assert.equal(match, "serp_20250401_100419_ET-19d438eb199b2bf7c300");
    });
  });
});
