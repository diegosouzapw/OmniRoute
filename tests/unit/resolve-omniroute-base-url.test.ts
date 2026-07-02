import assert from "node:assert/strict";
import test from "node:test";

import {
  DEFAULT_OMNIROUTE_BASE_URL,
  resolveOmniRouteBaseUrl,
} from "../../src/shared/utils/resolveOmniRouteBaseUrl.ts";

test("resolveOmniRouteBaseUrl prefers OMNIROUTE_BASE_URL", () => {
  assert.equal(
    resolveOmniRouteBaseUrl({
      OMNIROUTE_BASE_URL: "https://internal.example.com/",
      BASE_URL: "https://base.example.com",
      NEXT_PUBLIC_BASE_URL: "https://public.example.com",
    }),
    "https://internal.example.com"
  );
});

test("resolveOmniRouteBaseUrl falls back to BASE_URL", () => {
  assert.equal(
    resolveOmniRouteBaseUrl({
      BASE_URL: "https://base.example.com/",
      NEXT_PUBLIC_BASE_URL: "https://public.example.com",
    }),
    "https://base.example.com"
  );
});

test("resolveOmniRouteBaseUrl falls back to NEXT_PUBLIC_BASE_URL", () => {
  assert.equal(
    resolveOmniRouteBaseUrl({
      NEXT_PUBLIC_BASE_URL: "https://public.example.com/",
    }),
    "https://public.example.com"
  );
});

test("resolveOmniRouteBaseUrl ignores blank values", () => {
  assert.equal(
    resolveOmniRouteBaseUrl({
      OMNIROUTE_BASE_URL: "   ",
      BASE_URL: "",
      NEXT_PUBLIC_BASE_URL: " https://public.example.com/ ",
    }),
    "https://public.example.com"
  );
});

test("resolveOmniRouteBaseUrl uses the default localhost fallback", () => {
  assert.equal(resolveOmniRouteBaseUrl({}), DEFAULT_OMNIROUTE_BASE_URL);
});
