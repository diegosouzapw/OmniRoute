import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  ConfigFieldSchema,
  PluginManifestSchema,
  safeValidateManifest,
  applyDefaults,
} from "../../src/lib/plugins/manifest.ts";

const validManifest = {
  name: "test-plugin",
  version: "1.0.0",
};

describe("Plugin config schema validation", () => {
  describe("ConfigFieldSchema", () => {
    it("accepts string config field", () => {
      const result = ConfigFieldSchema.safeParse({
        type: "string",
        default: "hello",
        description: "A string field",
      });
      assert.ok(result.success);
    });

    it("accepts number config field with min/max", () => {
      const result = ConfigFieldSchema.safeParse({
        type: "number",
        default: 5,
        min: 1,
        max: 100,
        description: "A number field",
      });
      assert.ok(result.success);
    });

    it("accepts boolean config field", () => {
      const result = ConfigFieldSchema.safeParse({
        type: "boolean",
        default: true,
        description: "A boolean field",
      });
      assert.ok(result.success);
    });

    it("accepts select config field with enum", () => {
      const result = ConfigFieldSchema.safeParse({
        type: "select",
        options: ["low", "medium", "high"],
        default: "medium",
        description: "A select field",
      });
      assert.ok(result.success);
    });

    it("rejects invalid config type", () => {
      const result = ConfigFieldSchema.safeParse({
        type: "invalid",
        description: "Bad type",
      });
      assert.ok(!result.success);
    });

    it("requires type field", () => {
      const result = ConfigFieldSchema.safeParse({
        default: "hello",
      });
      assert.ok(!result.success);
    });

    it("accepts config without default", () => {
      const result = ConfigFieldSchema.safeParse({
        type: "string",
        description: "No default",
      });
      assert.ok(result.success);
    });
  });

  describe("PluginManifestSchema configSchema", () => {
    it("accepts manifest with configSchema", () => {
      const result = PluginManifestSchema.safeParse({
        ...validManifest,
        configSchema: {
          bannerText: {
            type: "string",
            default: "Welcome!",
            description: "Banner text",
          },
          enabled: {
            type: "boolean",
            default: true,
            description: "Enable banner",
          },
        },
      });
      assert.ok(result.success);
    });

    it("accepts manifest without configSchema", () => {
      const result = PluginManifestSchema.safeParse(validManifest);
      assert.ok(result.success);
    });

    it("applyDefaults fills configSchema defaults", () => {
      const manifest = {
        ...validManifest,
        configSchema: {
          greeting: { type: "string" as const, default: "Hello" },
        },
      };
      const result = applyDefaults(manifest);
      assert.deepEqual(result.configSchema, manifest.configSchema);
    });
  });

  describe("ManifestSkillSchema", () => {
    it("accepts valid skill definition", () => {
      const result = PluginManifestSchema.safeParse({
        ...validManifest,
        skills: [
          {
            name: "test-skill",
            description: "A test skill",
            input: { type: "object" },
            output: { type: "object" },
          },
        ],
      });
      assert.ok(result.success);
    });

    it("accepts manifest without skills", () => {
      const result = PluginManifestSchema.safeParse(validManifest);
      assert.ok(result.success);
    });
  });
});
