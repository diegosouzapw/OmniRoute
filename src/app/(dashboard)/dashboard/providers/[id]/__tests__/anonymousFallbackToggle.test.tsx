// @vitest-environment jsdom
import { describe, expect, it } from "vitest";

import {
  computeNoAuthFallbackDisabledProviders,
  isNoAuthFallbackEnabled,
} from "../components/AnonymousFallbackToggle";

describe("AnonymousFallbackToggle list-update helpers", () => {
  it("disabling adds the providerId exactly once and dedupes existing entries", () => {
    const next = computeNoAuthFallbackDisabledProviders(
      ["openai", "openai", "opencode-go"],
      "opencode-go",
      "opencode",
      true
    );
    expect(next).toEqual(["openai", "opencode-go"]);
    expect(next.filter((id) => id === "opencode-go")).toHaveLength(1);
  });

  it("enabling removes both the providerId and its alias", () => {
    const next = computeNoAuthFallbackDisabledProviders(
      ["openai", "opencode-go", "opencode"],
      "opencode-go",
      "opencode",
      false
    );
    expect(next).toEqual(["openai"]);
  });

  it("enabling with only the alias present also removes it", () => {
    const next = computeNoAuthFallbackDisabledProviders(
      ["opencode"],
      "opencode-go",
      "opencode",
      false
    );
    expect(next).toEqual([]);
  });

  it("is enabled by default when the disabled list is absent", () => {
    expect(isNoAuthFallbackEnabled("opencode-go", "opencode", undefined)).toBe(true);
  });

  it("is disabled when the providerId is in the list", () => {
    expect(isNoAuthFallbackEnabled("opencode-go", "opencode", ["opencode-go"])).toBe(false);
  });

  it("is disabled when only the alias is in the list", () => {
    expect(isNoAuthFallbackEnabled("opencode-go", "opencode", ["opencode"])).toBe(false);
  });

  it("is enabled when the list is present but does not contain the provider", () => {
    expect(isNoAuthFallbackEnabled("opencode-go", "opencode", ["openai"])).toBe(true);
  });
});
