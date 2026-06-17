// Resolution-strategy tests for the providers constants module.
//
// These tests pin down the "first-one-wins" contract shared by every lookup in
// core.ts: when the same id (or alias) appears in more than one section of
// `_PROVIDER_SECTIONS`, the section that comes first in the array wins. This
// mirrors `getProviderById`, which uses `??` over the sections in forward order.
//
// To make the contract deterministic (instead of depending on whatever
// accidental duplicates happen to exist in the real catalog today), we mock
// every definition module + the validator so core.ts loads a tiny, controlled
// set of providers with deliberately duplicated ids and aliases.
//
// Two independent duplicate scenarios are exercised:
//   - "dup-alias-*": shared ALIAS across APIKEY + WEB_COOKIE, with DISTINCT ids.
//     The earlier (APIKEY) section must win for getProviderByAlias and
//     ALIAS_TO_ID. Distinct ids let the ALIAS_TO_ID assertion distinguish
//     first-one-wins from last-one-wins.
//   - "dup-id-*":    shared ID but distinct aliases across APIKEY + WEB_COOKIE.
//     The earlier (APIKEY) section must win for getProviderById and
//     ID_TO_ALIAS. Distinct aliases let the ID_TO_ALIAS assertion distinguish
//     first-one-wins from last-one-wins.
import { beforeEach, describe, expect, it, vi } from "vitest";

// --- Mocks ---------------------------------------------------------------
// Order matters: these must be in place before core.ts is imported.
//
// `vi.mock` factories are hoisted to the top of the file by vitest, so the
// provider objects they return are defined inline (no references to top-level
// consts, which would not yet be initialized when the hoisted factory runs).

vi.mock("../../../validation/providerSchema.ts", () => ({
  // No-op validator so the mocked maps load without zod errors.
  validateProviders: () => {},
}));

vi.mock("../definitions/noauth.ts", () => ({
  NOAUTH_PROVIDERS: {},
}));
vi.mock("../definitions/oauth.ts", () => ({
  OAUTH_PROVIDERS: {},
}));
vi.mock("../definitions/apiKey.ts", () => ({
  // APIKEY comes before WEB_COOKIE in _PROVIDER_SECTIONS, so it must win.
  APIKEY_PROVIDERS: {
    // Shared-alias duplicate: both sections use alias "dup-alias" but distinct
    // ids, so ALIAS_TO_ID can distinguish first-one-wins.
    "dup-alias-provider": {
      id: "dup-alias-provider",
      alias: "dup-alias",
      name: "DupAlias (APIKEY section)",
      icon: "key",
      color: "#000000",
      textIcon: "DA",
    },
    // Shared-id duplicate: same id, distinct alias ("dup-id-alias-a").
    "dup-id-provider": {
      id: "dup-id-provider",
      alias: "dup-id-alias-a",
      name: "DupId (APIKEY section)",
      icon: "key",
      color: "#000000",
      textIcon: "DI",
    },
  },
}));
vi.mock("../definitions/webCookie.ts", () => ({
  WEB_COOKIE_PROVIDERS: {
    // Same alias as the APIKEY entry but a DISTINCT id ("dup-alias-provider-web"),
    // so the ALIAS_TO_ID assertion can tell first-one-wins from last-one-wins.
    "dup-alias-provider-web": {
      id: "dup-alias-provider-web",
      alias: "dup-alias",
      name: "DupAlias (WEB_COOKIE section)",
      icon: "auto_awesome",
      color: "#FFFFFF",
      textIcon: "DW",
    },
    // Same id as the APIKEY entry but a DISTINCT alias ("dup-id-alias-b"), so
    // the ID_TO_ALIAS assertion can tell first-one-wins from last-one-wins.
    "dup-id-provider": {
      id: "dup-id-provider",
      alias: "dup-id-alias-b",
      name: "DupId (WEB_COOKIE section)",
      icon: "auto_awesome",
      color: "#FFFFFF",
      textIcon: "DW",
    },
    // A provider that only lives in this later section, used to confirm normal
    // (non-conflicting) lookups still resolve.
    "only-web": {
      id: "only-web",
      alias: "only-web-alias",
      name: "Only Web",
      icon: "auto_awesome",
      color: "#123456",
      textIcon: "OW",
    },
  },
}));
vi.mock("../definitions/local.ts", () => ({
  LOCAL_PROVIDERS: {},
}));
vi.mock("../definitions/search.ts", () => ({
  SEARCH_PROVIDERS: {},
}));
vi.mock("../definitions/audio.ts", () => ({
  AUDIO_ONLY_PROVIDERS: {},
}));
vi.mock("../definitions/compatible.ts", () => ({
  UPSTREAM_PROXY_PROVIDERS: {},
  CLOUD_AGENT_PROVIDERS: {},
}));
vi.mock("../groups.ts", () => ({
  SYSTEM_PROVIDERS: {},
  // Re-export everything else groups.ts exposes so other consumers don't break,
  // though core.ts only needs SYSTEM_PROVIDERS from it.
  FREE_APIKEY_PROVIDER_IDS: new Set<string>(),
  IMAGE_ONLY_PROVIDER_IDS: new Set<string>(),
  AGGREGATOR_PROVIDER_IDS: new Set<string>(),
  ENTERPRISE_CLOUD_PROVIDER_IDS: new Set<string>(),
  VIDEO_PROVIDER_IDS: new Set<string>(),
  IDE_PROVIDER_IDS: new Set<string>(),
  EMBEDDING_RERANK_PROVIDER_IDS: new Set<string>(),
  BULK_API_KEY_EXCLUDED: new Set<string>(),
  AUTH_METHODS: {},
  USAGE_SUPPORTED_PROVIDERS: [] as string[],
}));

// Import AFTER mocks are registered.
import {
  getProviderById,
  getProviderByAlias,
  ALIAS_TO_ID,
  ID_TO_ALIAS,
} from "../core.ts";

// --- Tests ---------------------------------------------------------------

describe("provider lookup resolution strategy (first-one-wins)", () => {
  beforeEach(() => {
    // Sanity check the mocks actually took; if a mock silently failed to apply
    // the real catalog would leak in and these tests would be meaningless.
    expect(getProviderById("dup-alias-provider")).toBeTruthy();
    expect(getProviderById("dup-id-provider")).toBeTruthy();
  });

  describe("getProviderById", () => {
    it("returns the first match across sections (APIKEY wins over WEB_COOKIE)", () => {
      const provider = getProviderById("dup-id-provider");
      expect(provider).not.toBeNull();
      // The APIKEY section precedes WEB_COOKIE, so its definition must win.
      expect(provider?.name).toBe("DupId (APIKEY section)");
      expect(provider?.alias).toBe("dup-id-alias-a");
    });

    it("returns undefined for an unknown id", () => {
      expect(getProviderById("does-not-exist")).toBeUndefined();
    });

    it("resolves a provider that only exists in a later section", () => {
      const provider = getProviderById("only-web");
      expect(provider?.name).toBe("Only Web");
    });
  });

  describe("getProviderByAlias", () => {
    it("returns the first match by alias across sections", () => {
      const provider = getProviderByAlias("dup-alias");
      expect(provider).not.toBeNull();
      expect(provider?.name).toBe("DupAlias (APIKEY section)");
    });

    it("also resolves by id (alias-or-id lookup)", () => {
      // getProviderByAlias treats the argument as alias OR id.
      const provider = getProviderByAlias("dup-id-provider");
      expect(provider?.name).toBe("DupId (APIKEY section)");
    });

    it("returns null for an unknown alias", () => {
      expect(getProviderByAlias("no-such-alias")).toBeNull();
    });

    it("resolves a provider that only exists in a later section by alias", () => {
      const provider = getProviderByAlias("only-web-alias");
      expect(provider?.name).toBe("Only Web");
    });
  });

  describe("ALIAS_TO_ID (getOrCreateAliasToId)", () => {
    it("maps a conflicting alias to the first section's id", () => {
      // Both sections define alias "dup-alias"; APIKEY wins, so its id
      // ("dup-alias-provider") wins over WEB_COOKIE's ("dup-alias-provider-web").
      expect(ALIAS_TO_ID["dup-alias"]).toBe("dup-alias-provider");
    });

    it("maps a unique alias to its provider id", () => {
      expect(ALIAS_TO_ID["only-web-alias"]).toBe("only-web");
    });
  });

  describe("ID_TO_ALIAS (getOrCreateIdToAlias)", () => {
    it("maps a conflicting id to the first section's alias", () => {
      // Both sections define id "dup-id-provider"; APIKEY wins, so its alias
      // ("dup-id-alias-a") wins over WEB_COOKIE's ("dup-id-alias-b").
      expect(ID_TO_ALIAS["dup-id-provider"]).toBe("dup-id-alias-a");
      // Prove ID_TO_ALIAS stays consistent with the first-one-wins provider
      // lookup: the alias recorded is the one on the provider getProviderById
      // actually returns.
      expect(getProviderById("dup-id-provider")?.alias).toBe(
        ID_TO_ALIAS["dup-id-provider"],
      );
    });

    it("maps a unique id to its alias", () => {
      expect(ID_TO_ALIAS["only-web"]).toBe("only-web-alias");
    });
  });
});