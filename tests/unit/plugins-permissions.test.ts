import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  PermissionSchema,
  safeValidateManifest,
} from "../../src/lib/plugins/manifest.ts";

describe("Plugin permission enforcement", () => {
  describe("PermissionSchema", () => {
    it("accepts valid permission values", () => {
      const valid = ["network", "file-read", "file-write", "env", "exec"];
      for (const perm of valid) {
        const result = PermissionSchema.safeParse(perm);
        assert.ok(result.success, `should accept "${perm}"`);
      }
    });

    it("rejects invalid permission values", () => {
      const invalid = ["admin", "root", "shell", "database", ""];
      for (const perm of invalid) {
        const result = PermissionSchema.safeParse(perm);
        assert.ok(!result.success, `should reject "${perm}"`);
      }
    });

    it("rejects non-string permission values", () => {
      const invalid = [123, true, null, undefined, {}];
      for (const perm of invalid) {
        const result = PermissionSchema.safeParse(perm);
        assert.ok(!result.success, `should reject ${JSON.stringify(perm)}`);
      }
    });
  });

  describe("Manifest permission validation", () => {
    it("accepts manifest with valid permissions", () => {
      const result = safeValidateManifest({
        name: "test-plugin",
        version: "1.0.0",
        requires: { permissions: ["network", "env"] },
      });
      assert.ok(result.success, "should accept valid permissions");
    });

    it("accepts manifest with empty permissions", () => {
      const result = safeValidateManifest({
        name: "test-plugin",
        version: "1.0.0",
        requires: { permissions: [] },
      });
      assert.ok(result.success, "should accept empty permissions");
    });

    it("accepts manifest without requires field", () => {
      const result = safeValidateManifest({
        name: "test-plugin",
        version: "1.0.0",
      });
      assert.ok(result.success, "should accept manifest without requires");
    });
  });
});
