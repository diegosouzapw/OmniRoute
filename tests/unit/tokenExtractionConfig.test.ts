/**
 * Tests for open-sse/services/tokenExtractionConfig.ts
 *
 * Validates that all web-cookie provider configs are well-formed,
 * have valid login URLs, and include at least one extraction source.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

const {
  TOKEN_EXTRACTION_CONFIGS,
  getExtractionConfig,
  listExtractionConfigs,
} = await import("../../open-sse/services/tokenExtractionConfig.ts");

describe("tokenExtractionConfig", () => {
  it("exports TOKEN_EXTRACTION_CONFIGS as a Map", () => {
    assert.ok(TOKEN_EXTRACTION_CONFIGS instanceof Map);
  });

  it("has at least 21 registered providers (18 existing + 3 new)", () => {
    assert.ok(TOKEN_EXTRACTION_CONFIGS.size >= 21);
  });

  it("every config has required fields", () => {
    for (const [providerId, cfg] of TOKEN_EXTRACTION_CONFIGS) {
      assert.ok(typeof cfg.providerId === "string", `${providerId}: missing providerId`);
      assert.ok(cfg.providerId.length > 0, `${providerId}: empty providerId`);
      assert.ok(typeof cfg.displayName === "string", `${providerId}: missing displayName`);
      assert.ok(cfg.displayName.length > 0, `${providerId}: empty displayName`);
      assert.ok(
        cfg.loginUrl.startsWith("http"),
        `${providerId}: loginUrl "${cfg.loginUrl}" must start with http`
      );
      assert.ok(
        cfg.homeUrl.startsWith("http"),
        `${providerId}: homeUrl "${cfg.homeUrl}" must start with http`
      );
      assert.ok(Array.isArray(cfg.tokenSources), `${providerId}: tokenSources must be an array`);
      assert.ok(cfg.tokenSources.length > 0, `${providerId}: must have at least one tokenSource`);
      assert.ok(typeof cfg.instructions === "string", `${providerId}: missing instructions`);
      assert.ok(cfg.instructions.length > 0, `${providerId}: empty instructions`);
    }
  });

  it("every tokenSource has a valid type", () => {
    const validTypes = ["cookie", "localStorage", "sessionStorage", "header"];
    for (const [providerId, cfg] of TOKEN_EXTRACTION_CONFIGS) {
      for (const src of cfg.tokenSources) {
        assert.ok(
          validTypes.includes(src.type),
          `${providerId}: invalid tokenSource type "${src.type}"`
        );
        if (src.type === "cookie") {
          assert.ok(typeof src.name === "string", `${providerId}: cookie source missing name`);
          assert.ok(src.name.length > 0, `${providerId}: cookie source has empty name`);
        }
        if (src.type === "localStorage" || src.type === "sessionStorage") {
          assert.ok(typeof src.key === "string", `${providerId}: storage source missing key`);
          assert.ok(src.key.length > 0, `${providerId}: storage source has empty key`);
        }
      }
    }
  });

  it("loginUrl and homeUrl share the same root domain", () => {
    function extractDomain(url: string): string {
      try {
        const u = new URL(url);
        return u.hostname;
      } catch {
        return "";
      }
    }
    for (const [providerId, cfg] of TOKEN_EXTRACTION_CONFIGS) {
      const loginDomain = extractDomain(cfg.loginUrl);
      const homeDomain = extractDomain(cfg.homeUrl);
      // Allow different subdomains but same root
      const loginParts = loginDomain.split(".");
      const homeParts = homeDomain.split(".");
      const loginRoot = loginParts.slice(-2).join(".");
      const homeRoot = homeParts.slice(-2).join(".");
      assert.equal(
        loginRoot,
        homeRoot,
        `${providerId}: loginUrl (${cfg.loginUrl}) and homeUrl (${cfg.homeUrl}) should share the same root domain`
      );
    }
  });

  it("getExtractionConfig returns undefined for unknown provider", () => {
    const result = getExtractionConfig("nonexistent-provider");
    assert.equal(result, undefined);
  });

  it("getExtractionConfig returns config for known providers", () => {
    const providers = ["claude-web", "chatgpt-web", "gemini-web", "grok-web", "deepseek-web"];
    for (const id of providers) {
      const cfg = getExtractionConfig(id);
      assert.ok(cfg !== undefined, `getExtractionConfig("${id}") returned undefined`);
      assert.equal(cfg?.providerId, id);
    }
  });

  it("listExtractionConfigs returns all configs as an array", () => {
    const all = listExtractionConfigs();
    assert.ok(Array.isArray(all));
    assert.equal(all.length, TOKEN_EXTRACTION_CONFIGS.size);
  });

  it("includes the 3 new missing providers", () => {
    const newProviders = ["chatglm-web", "xiaomimimo-web", "manus-web"];
    for (const id of newProviders) {
      const cfg = getExtractionConfig(id);
      assert.ok(cfg !== undefined, `Missing provider "${id}" not found in config`);
    }
  });

  it("every provider ID matches the executor naming convention", () => {
    for (const providerId of TOKEN_EXTRACTION_CONFIGS.keys()) {
      assert.ok(
        providerId.endsWith("-web"),
        `Provider ID "${providerId}" should follow the "-web" naming convention`
      );
    }
  });

  it("each cookie token source has a valid domain when specified", () => {
    for (const [providerId, cfg] of TOKEN_EXTRACTION_CONFIGS) {
      for (const src of cfg.tokenSources) {
        if (src.type === "cookie" && src.domain) {
          assert.ok(
            src.domain.startsWith(".") || src.domain.startsWith("http"),
            `${providerId}: cookie domain "${src.domain}" should start with "." or "http"`
          );
        }
      }
    }
  });

  it("pollingConfig has valid values", () => {
    for (const [providerId, cfg] of TOKEN_EXTRACTION_CONFIGS) {
      assert.ok(
        cfg.pollingConfig.pollInterval >= 100,
        `${providerId}: pollInterval too low (${cfg.pollingConfig.pollInterval})`
      );
      assert.ok(
        cfg.pollingConfig.timeout >= 10000,
        `${providerId}: timeout too low (${cfg.pollingConfig.timeout})`
      );
      assert.ok(
        cfg.pollingConfig.minLoginTime >= 1000,
        `${providerId}: minLoginTime too low (${cfg.pollingConfig.minLoginTime})`
      );
    }
  });
});
