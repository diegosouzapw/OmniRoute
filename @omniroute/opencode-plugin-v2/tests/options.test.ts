import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  integrationIdFor,
  parsePluginOptions,
  PLUGIN_ID,
  providerIdFor,
  resolveTimeouts,
} from "../src/options.js";

describe("parsePluginOptions", () => {
  it("applies defaults for providerId, timeoutMs, usableOnly, enrichment", () => {
    const opts = parsePluginOptions({ baseURL: "https://gw.example.com" });
    assert.equal(opts.providerId, "omniroute");
    assert.equal(opts.timeoutMs, 10000);
    assert.equal(opts.usableOnly, false);
    assert.equal(opts.enrichment, true);
    assert.equal(opts.modelCacheTtlMs, undefined);
  });
  it("accepts a positive modelCacheTtlMs (in-memory TTL cache, default 300s)", () => {
    const opts = parsePluginOptions({ baseURL: "https://gw.example.com", modelCacheTtlMs: 60000 });
    assert.equal(opts.modelCacheTtlMs, 60000);
  });
  it("rejects a non-positive modelCacheTtlMs", () => {
    assert.throws(() =>
      parsePluginOptions({ baseURL: "https://gw.example.com", modelCacheTtlMs: 0 })
    );
  });
  it("requires baseURL", () => {
    assert.throws(() => parsePluginOptions({}), /baseURL/);
  });
  it("rejects a baseURL that is not an http(s) URL", () => {
    // `new URL()` reads "localhost:20128" as the scheme "localhost:" followed
    // by a path, so a gateway address typed without "http://" parses. Every
    // model would then be published with "localhost:20128/v1" as its api url
    // and every call would fail in the client on an unknown scheme, with no
    // request on the wire and nothing in the gateway logs.
    for (const baseURL of [
      "localhost:20128",
      "localhost:20128/v1",
      "ftp://gw.example.com/v1",
      "gw.example.com/v1",
    ]) {
      assert.throws(
        () => parsePluginOptions({ baseURL }),
        /baseURL must be an http\(s\) URL/,
        `expected ${baseURL} to be rejected`
      );
    }
  });
  it("accepts http and https baseURLs, with or without a port or path", () => {
    for (const baseURL of [
      "http://localhost:20128/v1",
      "http://localhost:20128",
      "https://gw.example.com/v1",
      "https://gw.example.com/omniroute/v1",
    ]) {
      assert.equal(parsePluginOptions({ baseURL }).baseURL, baseURL);
      // Padding a copied address is trimmed rather than rejected, matching the
      // treatment `headroomUrl` already gets in the settings schema.
      assert.equal(parsePluginOptions({ baseURL: `  ${baseURL}  ` }).baseURL, baseURL);
    }
  });
  it("rejects unknown top-level keys (strict)", () => {
    assert.throws(() => parsePluginOptions({ baseURL: "https://gw.example.com", bogus: 1 }));
  });
  it("rejects unknown apiFormat keys (strict)", () => {
    assert.throws(() =>
      parsePluginOptions({
        baseURL: "https://gw.example.com",
        apiFormat: { bogus: ["claude"] },
      })
    );
  });
  it("accepts deprecated anthropicPrefixes (warn at resolve time, not parse time)", () => {
    const opts = parsePluginOptions({
      baseURL: "https://gw.example.com",
      apiFormat: { allowAnthropic: true, anthropicPrefixes: ["cc", "claude"] },
    });
    assert.deepEqual(opts.apiFormat, {
      allowAnthropic: true,
      anthropicPrefixes: ["cc", "claude"],
    });
  });
  it("passes apiFormat allowlist through (shared enforces semantics)", () => {
    const opts = parsePluginOptions({
      baseURL: "https://gw.example.com",
      apiFormat: { allowAnthropic: true, anthropicModels: ["anthropic/claude-x"] },
    });
    assert.deepEqual(opts.apiFormat, {
      allowAnthropic: true,
      anthropicModels: ["anthropic/claude-x"],
    });
  });
});

describe("identity table", () => {
  it("maps providerId X to provider X and integration X, under one fixed plugin id", () => {
    assert.equal(providerIdFor("omniroute"), "omniroute");
    assert.equal(integrationIdFor("omniroute"), "omniroute");
    assert.equal(providerIdFor("second-gateway"), "second-gateway");
    // The host reads the plugin id before any option exists, so it never
    // varies with providerId.
    assert.equal(PLUGIN_ID, "omniroute-v2");
  });
});

describe("invalid options say what to fix", () => {
  it("names an unknown key instead of dumping the validator output", () => {
    assert.throws(
      () => parsePluginOptions({ baseURL: "http://gw.example.com", modelCacheTtl: 300000 }),
      (err: Error) => {
        assert.match(err.message, /invalid plugin options/);
        assert.match(err.message, /unknown option "modelCacheTtl"/);
        return true;
      }
    );
  });

  it("names the offending field for a wrong type", () => {
    assert.throws(
      () => parsePluginOptions({ baseURL: 42 }),
      (err: Error) => {
        assert.match(err.message, /baseURL/);
        return true;
      }
    );
  });

  it("accepts the documented option names", () => {
    const parsed = parsePluginOptions({
      baseURL: "http://gw.example.com",
      modelCacheTtlMs: 300000,
      timeouts: { models: 15000, combos: 8000 },
      geminiSanitization: false,
    });
    assert.equal(parsed.modelCacheTtlMs, 300000);
    assert.equal(resolveTimeouts(parsed).models, 15000);
  });
});

describe("providerId is bounded because it reaches a filesystem path", () => {
  it("rejects a traversal attempt instead of writing outside the snapshot directory", () => {
    for (const bad of ["../../etc/cron.d/x", "a/b", "..", "."]) {
      assert.throws(
        () => parsePluginOptions({ baseURL: "https://gw.example.com", providerId: bad }),
        /invalid plugin options/,
        `providerId ${JSON.stringify(bad)} must be rejected`
      );
    }
  });

  it("keeps the ids a user would actually pick", () => {
    for (const ok of ["omniroute", "omniroute-2", "gw.staging", "gw_prod"]) {
      assert.equal(
        parsePluginOptions({ baseURL: "https://gw.example.com", providerId: ok }).providerId,
        ok
      );
    }
  });
});
