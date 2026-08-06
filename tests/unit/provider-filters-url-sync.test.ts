import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  readProviderFiltersFromUrl,
  syncProviderFiltersToUrl,
} from "../../src/app/(dashboard)/dashboard/providers/providerPageUtils.ts";

type MockHistory = {
  state: unknown;
  replaceState(state: unknown, title: string, url: string): void;
};

type MockLocation = { href: string };

type MockWindow = { history: MockHistory; location: MockLocation };

const globals = globalThis as unknown as { window?: MockWindow };

const originalWindow = globals.window;

function mockWindow(href: string): string[] {
  const calls: string[] = [];
  globals.window = {
    history: {
      state: null,
      replaceState(_state: unknown, _title: string, url: string) {
        calls.push(url);
      },
    },
    location: { href },
  };
  return calls;
}

afterEach(() => {
  if (originalWindow === undefined) {
    delete globals.window;
  } else {
    globals.window = originalWindow;
  }
});

describe("readProviderFiltersFromUrl", () => {
  it("parses every supported param", () => {
    const state = readProviderFiltersFromUrl(
      new URLSearchParams("search=openai&model=gpt&mode=compact&cat=free&media=image")
    );
    assert.deepEqual(state, {
      searchQuery: "openai",
      modelSearchQuery: "gpt",
      displayMode: "compact",
      showFreeOnly: true,
      category: null,
      mediaKind: "image",
    });
  });

  it("reads a concrete category and the display mode", () => {
    const state = readProviderFiltersFromUrl(new URLSearchParams("cat=oauth&mode=configured"));
    assert.deepEqual(state, { displayMode: "configured", showFreeOnly: false, category: "oauth" });
  });

  it("ignores invalid category / media / mode values", () => {
    const state = readProviderFiltersFromUrl(
      new URLSearchParams("cat=bogus&mode=unknown&media=audio")
    );
    assert.deepEqual(state, {});
  });

  it("returns empty state for no params", () => {
    assert.deepEqual(readProviderFiltersFromUrl(new URLSearchParams("")), {});
  });
});

describe("syncProviderFiltersToUrl", () => {
  it("does not throw when window is undefined (SSR environment)", () => {
    assert.doesNotThrow(() => {
      syncProviderFiltersToUrl({ displayMode: "compact", category: "oauth" });
    });
  });

  it("writes all active filters via replaceState", () => {
    const calls = mockWindow("http://localhost/dashboard/providers");
    syncProviderFiltersToUrl({
      searchQuery: "openai",
      modelSearchQuery: "gpt",
      displayMode: "compact",
      category: "oauth",
      showFreeOnly: false,
      mediaKind: "image",
    });
    assert.equal(calls.length, 1);
    const url = new URL(calls[0]);
    assert.equal(url.searchParams.get("search"), "openai");
    assert.equal(url.searchParams.get("model"), "gpt");
    assert.equal(url.searchParams.get("mode"), "compact");
    assert.equal(url.searchParams.get("cat"), "oauth");
    assert.equal(url.searchParams.get("media"), "image");
  });

  it("encodes the free-tier filter as cat=free", () => {
    const calls = mockWindow("http://localhost/dashboard/providers");
    syncProviderFiltersToUrl({ showFreeOnly: true, category: null, displayMode: "all" });
    assert.equal(calls.length, 1);
    const url = new URL(calls[0]);
    assert.equal(url.searchParams.get("cat"), "free");
    assert.equal(url.searchParams.has("mode"), false);
  });

  it("drops the display-mode param when set back to All", () => {
    const calls = mockWindow("http://localhost/dashboard/providers?mode=compact");
    syncProviderFiltersToUrl({ displayMode: "all" });
    assert.equal(calls.length, 1);
    assert.equal(new URL(calls[0]).searchParams.has("mode"), false);
  });

  it("removes params whose filters have been cleared", () => {
    const calls = mockWindow(
      "http://localhost/dashboard/providers?mode=compact&cat=oauth&media=image&search=openai"
    );
    syncProviderFiltersToUrl({});
    assert.equal(calls.length, 1);
    const url = new URL(calls[0]);
    assert.equal(url.searchParams.has("mode"), false);
    assert.equal(url.searchParams.has("cat"), false);
    assert.equal(url.searchParams.has("media"), false);
    assert.equal(url.searchParams.has("search"), false);
  });

  it("preserves unrelated URL params and path", () => {
    const calls = mockWindow("http://localhost/dashboard/providers?tab=x&mode=compact");
    syncProviderFiltersToUrl({});
    assert.equal(calls.length, 1);
    const url = new URL(calls[0]);
    assert.equal(url.pathname, "/dashboard/providers");
    assert.equal(url.searchParams.get("tab"), "x");
    assert.equal(url.searchParams.has("mode"), false);
  });

  it("does not replaceState when nothing changed", () => {
    const calls = mockWindow("http://localhost/dashboard/providers?search=openai");
    syncProviderFiltersToUrl({ searchQuery: "openai" });
    assert.equal(calls.length, 0);
  });
});
