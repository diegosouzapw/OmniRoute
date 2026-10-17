import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  buildProviderResolve,
  compileProviderFilter,
  matchesAllow,
  passesProviderFilter,
  providerOf,
  unknownProviders,
} from "../src/provider-filter.js";

function resolveCcClaude() {
  return buildProviderResolve([{ alias: "cc", canonical: "claude" }], ["claude"]);
}

describe("providerOf", () => {
  it("returns the prefix before the first slash, lowercased", () => {
    assert.equal(providerOf("cc/claude-sonnet-4-6"), "cc");
    assert.equal(providerOf("CC/model"), "cc");
  });

  it("returns undefined for bare ids (no provider claim, always keep)", () => {
    assert.equal(providerOf("plain"), undefined);
    assert.equal(providerOf("auto"), undefined);
  });
});

describe("compileProviderFilter", () => {
  it("absent/empty/blank-only input means inactive (full catalog)", () => {
    assert.equal(compileProviderFilter(undefined), undefined);
    assert.equal(compileProviderFilter([]), undefined);
    assert.equal(compileProviderFilter(["  "]), undefined);
  });

  it("normalizes case, trims, dedupes", () => {
    const filter = compileProviderFilter([" Claude ", "claude", "KIRO"]);
    assert.ok(filter);
    assert.deepEqual([...filter.allow].sort(), ["claude", "kiro"]);
  });
});

describe("matchesAllow alias resolution", () => {
  it("allow canonical matches alias prefix (cc resolves to claude)", () => {
    const filter = compileProviderFilter(["claude"]);
    assert.ok(filter);
    assert.equal(matchesAllow("cc", filter, resolveCcClaude()), true);
    assert.equal(matchesAllow("claude", filter, resolveCcClaude()), true);
    assert.equal(matchesAllow("kiro", filter, resolveCcClaude()), false);
  });

  it("allow alias matches canonical prefix", () => {
    const filter = compileProviderFilter(["cc"]);
    assert.ok(filter);
    const resolve = buildProviderResolve([{ alias: "cc", canonical: "claude" }], ["claude"]);
    assert.equal(matchesAllow("claude", filter, resolve), true);
  });

  it("without a resolve table only direct prefixes match", () => {
    const filter = compileProviderFilter(["claude"]);
    assert.ok(filter);
    assert.equal(matchesAllow("cc", filter, undefined), false);
    assert.equal(matchesAllow("claude", filter, undefined), true);
  });
});

describe("passesProviderFilter", () => {
  it("no filter keeps everything", () => {
    assert.equal(passesProviderFilter("cc/x", undefined, resolveCcClaude()), true);
  });

  it("bare ids always pass", () => {
    const filter = compileProviderFilter(["kiro"]);
    assert.ok(filter);
    assert.equal(passesProviderFilter("plain", filter, resolveCcClaude()), true);
  });

  it("unknown prefixes keep (fail-open)", () => {
    const filter = compileProviderFilter(["claude"]);
    assert.ok(filter);
    assert.equal(passesProviderFilter("mystery/x", filter, resolveCcClaude()), true);
  });

  it("lone unknown allow name keeps known prefixes (fail-open on the NAME)", () => {
    const filter = compileProviderFilter(["nope"]);
    assert.ok(filter);
    assert.equal(passesProviderFilter("cc/x", filter, resolveCcClaude()), true);
    assert.equal(passesProviderFilter("mystery/x", filter, resolveCcClaude()), true);
  });

  it("known-but-excluded prefixes drop", () => {
    const resolve = buildProviderResolve(
      [
        { alias: "cc", canonical: "claude" },
        { alias: "kiro", canonical: "kiro" },
      ],
      ["claude", "kiro"]
    );
    const filter = compileProviderFilter(["claude"]);
    assert.ok(filter);
    assert.equal(passesProviderFilter("kiro/y", filter, resolve), false);
  });
});

describe("unknownProviders", () => {
  it("reports allow entries missing from the vocabulary", () => {
    const filter = compileProviderFilter(["claude", "nope"]);
    assert.ok(filter);
    assert.deepEqual(unknownProviders(filter, resolveCcClaude().known), ["nope"]);
  });
});
