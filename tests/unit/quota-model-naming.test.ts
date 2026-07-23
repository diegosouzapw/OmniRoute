import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  QUOTA_MODEL_PREFIX,
  quotaPoolSlug,
  quotaGroupSlug,
  quotaModelName,
  parseQuotaModelName,
  isQuotaModelName,
} from "../../src/lib/quota/quotaModelNaming.js";

// ---------------------------------------------------------------------------
// QUOTA_MODEL_PREFIX
// ---------------------------------------------------------------------------

describe("QUOTA_MODEL_PREFIX", () => {
  it("is qtSd/", () => {
    assert.equal(QUOTA_MODEL_PREFIX, "qtSd/");
  });
});

// ---------------------------------------------------------------------------
// quotaGroupSlug (new canonical helper)
// ---------------------------------------------------------------------------

describe("quotaGroupSlug", () => {
  it("strips non-alphanumeric characters and lowercases", () => {
    assert.equal(quotaGroupSlug("Pool Principal"), "poolprincipal");
  });

  it("handles simple lowercase names unchanged", () => {
    assert.equal(quotaGroupSlug("times"), "times");
  });

  it("strips dots and slashes", () => {
    assert.equal(quotaGroupSlug("my.pool/v2"), "mypoolv2");
  });

  it("falls back to 'pool' for empty result (all-symbol name)", () => {
    assert.equal(quotaGroupSlug("---"), "pool");
  });

  it("falls back to 'pool' for empty string", () => {
    assert.equal(quotaGroupSlug(""), "pool");
  });

  it("falls back to 'pool' for symbol-only name", () => {
    assert.equal(quotaGroupSlug("!@#$%"), "pool");
  });
});

// ---------------------------------------------------------------------------
// quotaPoolSlug — backward-compat alias (delegates to quotaGroupSlug)
// ---------------------------------------------------------------------------

describe("quotaPoolSlug", () => {
  it("strips non-alphanumeric characters and lowercases", () => {
    assert.equal(quotaPoolSlug("Time XPT-2"), "timexpt2");
  });

  it("handles simple lowercase names unchanged", () => {
    assert.equal(quotaPoolSlug("times"), "times");
  });

  it("strips dots and slashes", () => {
    assert.equal(quotaPoolSlug("my.pool/v2"), "mypoolv2");
  });

  it("falls back to 'pool' for empty result (all-symbol name)", () => {
    assert.equal(quotaPoolSlug("---"), "pool");
  });

  it("falls back to 'pool' for empty string", () => {
    assert.equal(quotaPoolSlug(""), "pool");
  });

  it("falls back to 'pool' for symbol-only name", () => {
    assert.equal(quotaPoolSlug("!@#$%"), "pool");
  });
});

// ---------------------------------------------------------------------------
// quotaModelName — new qtSd/<group>/<provider>/<model> format
// ---------------------------------------------------------------------------

describe("quotaModelName", () => {
  it("produces the new canonical format with group name", () => {
    assert.equal(quotaModelName("Pool Principal", "codex", "gpt-5.5"), "qtSd/poolprincipal/codex/gpt-5.5");
  });

  it("uses the prefix constant", () => {
    const name = quotaModelName("pool", "openai", "gpt-4");
    assert.ok(name.startsWith(QUOTA_MODEL_PREFIX));
  });

  it("keeps provider and model verbatim (not slugged)", () => {
    const name = quotaModelName("p", "openai", "org/model-x");
    assert.equal(name, "qtSd/p/openai/org/model-x");
  });

  it("provider with dashes is kept verbatim", () => {
    const name = quotaModelName("pool", "some-prov", "m");
    assert.equal(name, "qtSd/pool/some-prov/m");
  });

  it("slugs the group name in the prefix segment", () => {
    assert.equal(quotaModelName("Times", "cx", "gpt-5.5"), "qtSd/times/cx/gpt-5.5");
  });
});

// ---------------------------------------------------------------------------
// parseQuotaModelName — new format: qtSd/<groupSlug>/<provider>/<model>
// ---------------------------------------------------------------------------

describe("parseQuotaModelName", () => {
  it("round-trips a simple model name", () => {
    const name = quotaModelName("Pool Principal", "codex", "gpt-5.5");
    const parsed = parseQuotaModelName(name);
    assert.deepEqual(parsed, { groupSlug: "poolprincipal", provider: "codex", model: "gpt-5.5" });
  });

  it("round-trips a model name with a slash in model", () => {
    const name = quotaModelName("p", "openai", "org/model-x");
    const parsed = parseQuotaModelName(name);
    assert.deepEqual(parsed, { groupSlug: "p", provider: "openai", model: "org/model-x" });
  });

  it("handles model with multiple slashes", () => {
    const parsed = parseQuotaModelName("qtSd/mypoolv2/openai/a/b/c");
    assert.deepEqual(parsed, { groupSlug: "mypoolv2", provider: "openai", model: "a/b/c" });
  });

  it("returns null for a non-quota model name", () => {
    assert.equal(parseQuotaModelName("gpt-4"), null);
  });

  it("returns null for the old quotaShared- format", () => {
    assert.equal(parseQuotaModelName("quotaShared-pool-cx/gpt-5.5"), null);
  });

  it("returns null for too few segments (missing model)", () => {
    assert.equal(parseQuotaModelName("qtSd/group/provider"), null);
  });

  it("returns null for empty provider", () => {
    assert.equal(parseQuotaModelName("qtSd/group//model"), null);
  });

  it("returns null for empty model", () => {
    assert.equal(parseQuotaModelName("qtSd/group/cx/"), null);
  });

  it("returns null for empty groupSlug", () => {
    assert.equal(parseQuotaModelName("qtSd//cx/model"), null);
  });
});

// ---------------------------------------------------------------------------
// isQuotaModelName
// ---------------------------------------------------------------------------

describe("isQuotaModelName", () => {
  it("returns false for plain model names", () => {
    assert.equal(isQuotaModelName("gpt-4"), false);
  });

  it("returns true for valid quota model names", () => {
    assert.equal(isQuotaModelName("qtSd/poolprincipal/codex/gpt-5.5"), true);
  });

  it("returns true for any string starting with the prefix", () => {
    assert.equal(isQuotaModelName("qtSd/"), true);
  });

  it("is consistent with the QUOTA_MODEL_PREFIX constant", () => {
    const name = quotaModelName("pool", "cx", "gpt-4");
    assert.equal(isQuotaModelName(name), true);
  });

  it("returns false for the old quotaShared- format", () => {
    assert.equal(isQuotaModelName("quotaShared-x-codex/gpt-5.5"), false);
  });
});
