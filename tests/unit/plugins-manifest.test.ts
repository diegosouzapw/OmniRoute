import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../src/lib/plugins/manifest.ts");

const validMinimal = { name: "my-plugin", version: "1.0.0" };
const validFull = {
  name: "full-plugin",
  version: "2.1.0",
  description: "A full plugin",
  author: "test",
  license: "Apache-2.0",
  main: "handler.js",
  source: "local" as const,
  tags: ["test", "demo"],
  requires: { omniroute: ">=3.0.0", permissions: ["network", "file-read"] as const },
  hooks: { onRequest: true, onResponse: true, onError: false },
  skills: [{ name: "my-skill", description: "does things", input: { q: "string" } }],
  enabledByDefault: true,
  configSchema: { apiKey: { type: "string" as const, default: "abc", description: "API key" } },
};

describe("PluginManifestSchema", () => {
  it("accepts valid minimal manifest", () => {
    const result = mod.PluginManifestSchema.safeParse(validMinimal);
    assert.equal(result.success, true);
  });

  it("accepts valid full manifest", () => {
    const result = mod.PluginManifestSchema.safeParse(validFull);
    assert.equal(result.success, true);
  });

  it("rejects non-kebab-case name", () => {
    const result = mod.PluginManifestSchema.safeParse({ name: "BAD NAME!", version: "1.0.0" });
    assert.equal(result.success, false);
  });

  it("rejects invalid semver", () => {
    const result = mod.PluginManifestSchema.safeParse({ name: "ok-name", version: "nope" });
    assert.equal(result.success, false);
  });

  it("rejects name > 100 chars", () => {
    const result = mod.PluginManifestSchema.safeParse({ name: "a".repeat(101), version: "1.0.0" });
    assert.equal(result.success, false);
  });

  it("rejects description > 500 chars", () => {
    const result = mod.PluginManifestSchema.safeParse({
      name: "ok", version: "1.0.0", description: "x".repeat(501),
    });
    assert.equal(result.success, false);
  });
});

describe("safeValidateManifest", () => {
  it("returns success for valid manifest", () => {
    const result = mod.safeValidateManifest(validMinimal);
    assert.equal(result.success, true);
    if (result.success) assert.equal(result.data.name, "my-plugin");
  });

  it("returns errors for invalid manifest", () => {
    const result = mod.safeValidateManifest({ name: "NOPE!", version: "bad" });
    assert.equal(result.success, false);
    if (!result.success) {
      assert.ok(Array.isArray(result.errors));
      assert.ok(result.errors.length > 0);
    }
  });
});

describe("applyDefaults", () => {
  it("fills all optional fields with defaults", () => {
    const parsed = mod.PluginManifestSchema.parse(validMinimal);
    const result = mod.applyDefaults(parsed);
    assert.equal(result.license, "MIT");
    assert.equal(result.main, "index.js");
    assert.equal(result.source, "local");
    assert.deepEqual(result.tags, []);
    assert.deepEqual(result.requires.permissions, []);
    assert.equal(result.hooks.onRequest, false);
    assert.equal(result.hooks.onResponse, false);
    assert.equal(result.hooks.onError, false);
    assert.deepEqual(result.skills, []);
    assert.equal(result.enabledByDefault, false);
    assert.deepEqual(result.configSchema, {});
  });

  it("preserves explicit values", () => {
    const parsed = mod.PluginManifestSchema.parse(validFull);
    const result = mod.applyDefaults(parsed);
    assert.equal(result.license, "Apache-2.0");
    assert.equal(result.main, "handler.js");
    assert.equal(result.enabledByDefault, true);
  });
});

describe("PermissionSchema", () => {
  it("accepts all valid permissions", () => {
    for (const p of ["network", "file-read", "file-write", "env", "exec"]) {
      assert.equal(mod.PermissionSchema.safeParse(p).success, true, `should accept "${p}"`);
    }
  });

  it("rejects invalid permission", () => {
    assert.equal(mod.PermissionSchema.safeParse("admin").success, false);
  });
});

describe("ConfigFieldSchema", () => {
  it("accepts string type", () => {
    assert.equal(mod.ConfigFieldSchema.safeParse({ type: "string", default: "hi" }).success, true);
  });

  it("accepts number with min/max", () => {
    assert.equal(mod.ConfigFieldSchema.safeParse({ type: "number", min: 0, max: 100 }).success, true);
  });

  it("accepts boolean type", () => {
    assert.equal(mod.ConfigFieldSchema.safeParse({ type: "boolean", default: true }).success, true);
  });

  it("accepts select with enum", () => {
    assert.equal(mod.ConfigFieldSchema.safeParse({ type: "select", enum: ["a", "b"] }).success, true);
  });

  it("rejects invalid type", () => {
    assert.equal(mod.ConfigFieldSchema.safeParse({ type: "invalid" }).success, false);
  });
});

describe("HooksSchema", () => {
  it("accepts all boolean flags", () => {
    assert.equal(mod.HooksSchema.safeParse({ onRequest: true, onResponse: false, onError: true }).success, true);
  });

  it("accepts empty hooks", () => {
    assert.equal(mod.HooksSchema.safeParse({}).success, true);
  });

  it("rejects non-boolean value", () => {
    assert.equal(mod.HooksSchema.safeParse({ onRequest: "yes" }).success, false);
  });
});

describe("ManifestSkillSchema", () => {
  it("accepts minimal skill", () => {
    assert.equal(mod.ManifestSkillSchema.safeParse({ name: "test" }).success, true);
  });

  it("accepts full skill", () => {
    assert.equal(mod.ManifestSkillSchema.safeParse({
      name: "test", description: "desc", input: { q: "string" }, output: { result: "string" },
    }).success, true);
  });

  it("rejects empty name", () => {
    assert.equal(mod.ManifestSkillSchema.safeParse({ name: "" }).success, false);
  });
});

describe("validateManifest", () => {
  it("returns parsed manifest with defaults", () => {
    const result = mod.validateManifest(validMinimal);
    assert.equal(result.name, "my-plugin");
    assert.equal(result.version, "1.0.0");
    assert.equal(result.license, "MIT");
  });

  it("throws on invalid input", () => {
    assert.throws(() => mod.validateManifest({ name: "NOPE!", version: "bad" }));
  });
});
